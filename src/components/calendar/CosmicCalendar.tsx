"use client";
import { safeJSONParse, safeLocalStorage } from "@/lib/safe-utils";


import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  AlertTriangle,
  Sun,
  Moon,
  Star,
  X,
  Smile,
  Meh,
  Frown,
  Save,
  PenLine,
  Zap,
  Heart,
  Lightbulb,
  RefreshCw,
  Orbit,
  Activity,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Trash2,
  Trash,
  Loader2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { AYLA_IMAGE as CONSTANT_AYLA_IMAGE } from "@/lib/constants";
import {
  calculateTransits,
  findNextMoonPhases,
  PLANET_NAMES_TR,
  PLANET_NAMES_EN
} from "@/lib/astronomy-service";
import { getSunSign } from "@/lib/astrology";
import {
  calculateDailyEnergy,
  getEnergyColor,
  getInterpolatedEnergyColor
} from "@/lib/planetary-energy-service";
import { getHappinessImpact } from "@/lib/happiness-service";
import { PlanetTransitModal } from "@/components/dashboard/PlanetTransitModal";
import { getMoonPhaseInterpretation, formatHouseNumber } from "@/lib/transit-interpretations";
import { UserLifeEvent, calculateLifeEventImpact, LIFE_EVENTS, getCategoryName } from "@/lib/data/life-events";
import { LifeEventsSelector } from "@/components/dashboard/LifeEventsSelector";
import { PersonalTransit, getPlanetEmoji } from "@/lib/transit-engine";
import { ASPECT_INTERPRETATIONS, TRANSIT_COMBINATION_INTERPRETATIONS } from "@/lib/data/transit-aspect-interpretations";
import { getTransitInterpretation } from "@/lib/data/transit-interpretations";
import { getCosmicComment } from "@/lib/cosmic-comments";
import { getPlanetDailyEffect, EffectType } from "@/lib/data/planet-daily-effects";
import * as SliderPrimitive from "@radix-ui/react-slider";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PLANET_IMAGES } from "@/lib/constants";
import { PlanetIcon } from "../ui/PlanetIcon";
import { DailyTransitsDialog } from "./DailyTransitsDialog";
import { useLanguage } from "@/contexts/LanguageContext";

const AYLA_IMAGE = CONSTANT_AYLA_IMAGE || "/ayla-transparent.png";


const HAPPINESS_IMG = "/assets/moods/topic-12.png";

const EMOJI_IMAGES = {
  very_unhappy: "/assets/moods/very-unhappy.png",
  unhappy: "/assets/moods/unhappy.png",
  neutral: "/assets/moods/neutral.png",
  happy: "/assets/moods/happy.png",
  very_happy: "/assets/moods/very-happy.png"
};

const HAPPINESS_BAR = "/assets/moods/happiness-bar.png";

const formatDateToKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface DayDetailDialogProps {
  date: Date;
  energy: number;
  profile: any;
  isOpen: boolean;
  onClose: () => void;
  userLifeEvents: UserLifeEvent[];
  onEventsUpdate: (events: UserLifeEvent[]) => void;
  onHappinessChange: () => void;
  onOpenDailyTransits: (transits: PersonalTransit[], planetFilter?: string | null) => void;
  onOpenDetailedTransit: (transit: PersonalTransit) => void;
}

function DayDetailDialog({ date, energy, profile, isOpen, onClose, userLifeEvents, onEventsUpdate, onHappinessChange, onOpenDailyTransits, onOpenDetailedTransit }: DayDetailDialogProps) {
  const { t, language } = useLanguage();
  const [feelings, setFeelings] = useState("");
  const [happiness, setHappiness] = useState(50); // 0-100
  const [influences, setInfluences] = useState<any[]>([]);
  const [personalTransits, setPersonalTransits] = useState<PersonalTransit[]>([]);

  const PLANET_KEY_TO_NAME: Record<string, string> = {
    Sun: t('Sun'),
    Moon: t('Moon'),
    Mercury: t('Mercury'),
    Venus: t('Venus'),
    Mars: t('Mars'),
    Jupiter: t('Jupiter'),
    Saturn: t('Saturn'),
    Uranus: t('Uranus'),
    Neptune: t('Neptune'),
    Pluto: t('Pluto')
  };

  const TR_TO_KEY: Record<string, string> = {
    "Güneş": "Sun",
    "Ay": "Moon",
    "Merkür": "Mercury",
    "Venüs": "Venus",
    "Mars": "Mars",
    "Jüpiter": "Jupiter",
    "Satürn": "Saturn",
    "Uranüs": "Uranus",
    "Neptün": "Neptune",
    "Plüton": "Pluto",
    "Sun": "Sun",
    "Moon": "Moon",
    "Mercury": "Mercury",
    "Venus": "Venus",
    "Jupiter": "Jupiter",
    "Saturn": "Saturn",
    "Uranus": "Uranus",
    "Neptune": "Neptune",
    "Pluto": "Pluto"
  };

  const getPlanetDisplayName = (trName: string) => {
    const key = TR_TO_KEY[trName] || trName;
    return t(key as any) || trName;
  };

  const [todayTransits, setTodayTransits] = useState<PersonalTransit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPlanetsOpen, setIsPlanetsOpen] = useState(false);
  const [isTransitsOpen, setIsTransitsOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isHappinessOpen, setIsHappinessOpen] = useState(false);


  const [transitFilters, setTransitFilters] = useState<string[]>(["positive", "neutral", "negative"]);

  const [influenceFilters, setInfluenceFilters] = useState<string[]>(["positive", "neutral", "negative"]);

  const toggleTransitFilter = (filter: string) => {
    setTransitFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleInfluenceFilter = (filter: string) => {
    setInfluenceFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const FilterTool = ({ selected, onChange }: { selected: string[], onChange: (val: string) => void }) => (
    <div className="flex gap-1.5 mb-2 px-1">
      <button
        onClick={(e) => { e.stopPropagation(); onChange("positive"); }}
        className={`px-2.5 py-1 rounded-full text-[9px] font-black border transition-all uppercase tracking-wider ${selected.includes("positive")
          ? "bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]"
          : "bg-white/5 border-white/10 text-white/30"
          }`}
      >
        {t('positive')}
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onChange("neutral"); }}
        className={`px-2.5 py-1 rounded-full text-[9px] font-black border transition-all uppercase tracking-wider ${selected.includes("neutral")
          ? "bg-amber-500/20 border-amber-400 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]"
          : "bg-white/5 border-white/10 text-white/30"
          }`}
      >
        {t('neutral')}
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onChange("negative"); }}
        className={`px-2.5 py-1 rounded-full text-[9px] font-black border transition-all uppercase tracking-wider ${selected.includes("negative")
          ? "bg-rose-500/20 border-rose-400 text-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.4)]"
          : "bg-white/5 border-white/10 text-white/30"
          }`}
      >
        {t('negative')}
      </button>
    </div>
  );

  const { posCountTotal, negCountTotal } = useMemo(() => {
    let pos = 0;
    let neg = 0;
    personalTransits.forEach(t => {
      if (t.effect === 'positive') pos++;
      if (t.effect === 'negative') neg++;
    });
    return { posCountTotal: pos, negCountTotal: neg };
  }, [personalTransits]);

  const sectionThemeColor = posCountTotal > negCountTotal ? "emerald" : negCountTotal > posCountTotal ? "rose" : "amber";
  const sectionTextClass = sectionThemeColor === "emerald" ? "text-emerald-400" : sectionThemeColor === "rose" ? "text-rose-400" : "text-amber-400";
  const sectionBorderClass = sectionThemeColor === "emerald" ? "border-emerald-500/30 shadow-emerald-500/10" : sectionThemeColor === "rose" ? "border-rose-500/30 shadow-rose-500/10" : "border-amber-500/30 shadow-amber-500/10";
  const sectionBgClass = sectionThemeColor === "emerald" ? "bg-emerald-950/20" : sectionThemeColor === "rose" ? "bg-rose-950/20" : "bg-amber-950/20";

  const dateKey = formatDateToKey(date);

  const getTransitStatusLabel = (selectedDate: Date, transit: PersonalTransit) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCompare = new Date(selectedDate);
    dateToCompare.setHours(0, 0, 0, 0);

    const isActiveToday = todayTransits.some(t =>
      t.transitPlanetKey === transit.transitPlanetKey &&
      t.natalPlanetKey === transit.natalPlanetKey &&
      t.aspectType === transit.aspectType
    );

    if (isActiveToday) return t('current');

    if (dateToCompare.getTime() < today.getTime()) return t('past');
    if (dateToCompare.getTime() > today.getTime()) return t('future');

    return t('current');
  };


  const currentDayEvents = useMemo(() =>

    userLifeEvents.filter(e => e.event_date === dateKey),
    [userLifeEvents, dateKey]);

  useEffect(() => {
    if (!isOpen) return;

    const saved = safeLocalStorage.getItem(`cosmic_journal_${dateKey}`);
    if (saved) {
      try {
        const parsed = safeJSONParse(saved, {} as any);
        setFeelings(parsed.feelings || "");
        setHappiness(parsed.happiness ?? 50);
      } catch (parseError) {
        console.error('Failed to parse journal data:', parseError);
        setFeelings("");
        setHappiness(50);
      }
    } else {
      setFeelings("");
      setHappiness(50);
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const birthDate = new Date(profile.birth_date);

        const result = await calculateDailyEnergy(date, birthDate, profile.birth_time, undefined, undefined, language as 'tr' | 'en');
        setInfluences(result.planetaryInfluences);
        setPersonalTransits(result.personalTransits || []);

        const todayResult = await calculateDailyEnergy(new Date(), birthDate, profile.birth_time, undefined, undefined, language as 'tr' | 'en');
        setTodayTransits(todayResult.personalTransits || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isOpen, dateKey, date, profile, language]);

  const saveJournal = () => {
    safeLocalStorage.setItem(`cosmic_journal_${dateKey}`, JSON.stringify({ feelings, happiness }));
  };

  const toggleEvent = (eventId: string) => {
    let newEvents: UserLifeEvent[];
    const exists = userLifeEvents.find(e => e.event_id === eventId && e.event_date === dateKey);

    if (exists) {
      newEvents = userLifeEvents.filter(e => !(e.event_id === eventId && e.event_date === dateKey));
    } else {
      newEvents = userLifeEvents.filter(e => e.event_date !== dateKey);
      newEvents.push({ event_id: eventId, event_date: dateKey });
    }

    onEventsUpdate(newEvents);
    localStorage.setItem("ayla_life_events", JSON.stringify(newEvents));
  };

  const getImpactColor = (effect: number) => {
    if (effect > 0) return "bg-emerald-500/20 border-emerald-500/50";
    if (effect < 0) return "bg-rose-500/20 border-rose-500/50";
    return "bg-amber-400/20 border-amber-400/50";
  };

  const categories = ["Social", "Career", "Love", "Health", "Finance"];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm bg-black border-white/10 backdrop-blur-2xl text-white overflow-y-auto max-h-[90vh] custom-scrollbar rounded-[2rem]">
        <DialogHeader>

          <DialogTitle className="font-mystic text-xl text-mystic-gold flex items-center justify-between">
            <span>{date.toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-white/60">{t('energyOfTheDay')}</span>
            <div
              className="px-6 py-3 rounded-2xl text-3xl font-bold shadow-lg border border-white/20"
              style={{ backgroundColor: getInterpolatedEnergyColor(energy, 0.3) }}
            >
              %{energy}
            </div>
          </div>

          <div className={`space-y-3 p-3 rounded-[2rem] border transition-all ${sectionBorderClass} ${sectionBgClass}`}>
            <button
              onClick={() => setIsTransitsOpen(!isTransitsOpen)}
              className={`w-full flex items-center justify-between text-base md:text-lg font-medium hover:opacity-80 transition-opacity ${sectionTextClass}`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> {t('dailyTransits')}
              </div>
              <motion.div
                animate={{ rotate: isTransitsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isTransitsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-1">
                    <div className="flex justify-end mb-2 px-1">
                      <FilterTool selected={transitFilters} onChange={toggleTransitFilter} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
                        ))
                      ) : (
                        personalTransits
                          .filter(t => transitFilters.includes(t.effect || "neutral"))
                          .map((transit, i) => {
                            const statusLabel = getTransitStatusLabel(date, transit);

                            return (
                              <button
                                key={`transit-${transit.transitPlanetKey}-${transit.natalPlanetKey}-${transit.aspectType}-${i}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenDetailedTransit(transit);
                                }}
                                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all min-h-[110px] relative overflow-hidden bg-black shadow-lg ${transit.effect === 'positive' ? 'border-emerald-400 shadow-emerald-400/20' :
                                  transit.effect === 'negative' ? 'border-rose-500 shadow-rose-500/20' :
                                    'border-amber-400 shadow-amber-400/20'
                                  }`}
                              >
                                <div className="flex items-center gap-3 w-full justify-center -mt-2">
                                  <div className="w-10 h-10">
                                    <PlanetIcon name={PLANET_KEY_TO_NAME[transit.transitPlanetKey] || transit.transitPlanetKey} className="w-full h-full" />
                                  </div>
                                  <span className={`text-3xl font-bold drop-shadow-[0_0_8px_currentColor] ${transit.effect === 'positive' ? 'text-emerald-400' :
                                    transit.effect === 'negative' ? 'text-rose-500' :
                                      'text-amber-400'
                                    }`}>{transit.aspectSymbol}</span>
                                  <div className="w-10 h-10">
                                    <PlanetIcon name={PLANET_KEY_TO_NAME[transit.natalPlanetKey] || transit.natalPlanetKey} className="w-full h-full" />
                                  </div>
                                </div>
                                <div className="flex w-full justify-between items-center text-[10px] px-3 absolute bottom-2 left-0 right-0">
                                  <span className={`uppercase tracking-widest font-black drop-shadow-[0_0_5px_currentColor] ${transit.effect === 'positive' ? 'text-emerald-400' :
                                    transit.effect === 'negative' ? 'text-rose-500' :
                                      'text-amber-400'
                                    }`}>{statusLabel}</span>
                                  <span className={`uppercase tracking-widest font-black drop-shadow-[0_0_5px_currentColor] ${transit.effect === 'positive' ? 'text-emerald-400' :
                                    transit.effect === 'negative' ? 'text-rose-500' :
                                      'text-amber-400'
                                    }`}>{formatHouseNumber(transit.house, language)}</span>
                                </div>
                              </button>
                            );
                          })

                      )}

                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={`space-y-3 p-3 rounded-[2rem] border transition-all ${sectionBorderClass} ${sectionBgClass}`}>
            <button
              onClick={() => setIsPlanetsOpen(!isPlanetsOpen)}
              className={`w-full flex items-center justify-between text-base md:text-lg font-medium hover:opacity-80 transition-opacity ${sectionTextClass}`}
            >
              <div className="flex items-center gap-2">
                <Orbit className="w-5 h-5" /> {t('planetPositions')}
              </div>
              <motion.div
                animate={{ rotate: isPlanetsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isPlanetsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-1">
                    <div className="flex justify-end mb-2 px-1">
                      <FilterTool selected={influenceFilters} onChange={toggleInfluenceFilter} />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse" />
                        ))
                      ) : (
                        influences
                          .filter(inf => {
                            const planetKey = TR_TO_KEY[inf.planet] || inf.planet;
                            const planetTransits = personalTransits.filter(t => t.transitPlanetKey === planetKey);
                            const posCount = planetTransits.filter(t => t.effect === 'positive').length;
                            const negCount = planetTransits.filter(t => t.effect === 'negative').length;
                            const effectType = posCount > negCount ? "positive" : negCount > posCount ? "negative" : "neutral";
                            return influenceFilters.includes(effectType);
                          })
                          .map((inf, i) => {
                            const planetKey = TR_TO_KEY[inf.planet] || inf.planet;
                            const planetTransits = personalTransits.filter(t => t.transitPlanetKey === planetKey);
                            const posCount = planetTransits.filter(t => t.effect === 'positive').length;
                            const negCount = planetTransits.filter(t => t.effect === 'negative').length;
                            const effectType = posCount > negCount ? "positive" : negCount > posCount ? "negative" : "neutral";

                            const textClass = effectType === "positive" ? "text-emerald-400" :
                              effectType === "negative" ? "text-rose-400" :
                                "text-amber-400";

                            const borderClass = effectType === "positive" ? "border-emerald-400 shadow-emerald-400/20" :
                              effectType === "negative" ? "border-rose-500 shadow-rose-500/20" :
                                "border-amber-400 shadow-amber-400/20";

                            const displayPlanetName = getPlanetDisplayName(inf.planet);

                            return (
                              <button
                                key={`influence-${inf.planet}-${inf.effect}-${i}`}
                                onClick={() => onOpenDailyTransits(personalTransits, planetKey)}
                                className={`p-4 rounded-xl border flex gap-4 items-start transition-all bg-black text-left w-full hover:scale-[1.02] active:scale-95 ${borderClass}`}
                              >
                                <div className="relative shrink-0">
                                  <div className={`w-14 h-14 filter drop-shadow-[0_0_8px_currentColor] ${textClass}`}>
                                    <PlanetIcon name={planetKey} className="w-full h-full" />
                                  </div>
                                  {inf.isRetrograde && (
                                    <div className="absolute -top-1 -right-1 bg-rose-500 text-[10px] font-black px-1.5 rounded-sm shadow-[0_0_10px_rgba(225,29,72,0.5)]">℞</div>
                                  )}
                                </div>
                                <div className="space-y-1.5 flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className={`text-base font-black uppercase tracking-tight ${textClass}`}>{displayPlanetName}</p>
                                    <p className={`text-[10px] font-black opacity-60 bg-white/5 px-2 py-0.5 rounded border border-white/10 ${textClass}`}>{inf.position}</p>
                                  </div>
                                  <p className={`text-[12px] leading-relaxed font-medium ${textClass} opacity-90`}>
                                    {getPlanetDailyEffect(planetKey, effectType as EffectType, language as 'tr' | 'en') || inf.interpretation}
                                  </p>
                                </div>
                              </button>
                            );
                          })
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <button
              onClick={() => setIsEventsOpen(!isEventsOpen)}
              className="w-full flex items-center justify-between text-sm font-medium text-mystic-gold hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> {t('whatAreYouDoing')}
              </div>
              <motion.div
                animate={{ rotate: isEventsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isEventsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden space-y-4"
                >
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar pt-1">
                    {categories.map(cat => (
                      <Button
                        key={cat}
                        size="sm"
                        variant={selectedCategory === cat ? "default" : "outline"}
                        onClick={() => setSelectedCategory(selectedCategory === (cat as any) ? null : (cat as any))}
                        className={`whitespace-nowrap rounded-full px-4 h-8 text-[11px] ${selectedCategory === cat
                          ? 'bg-mystic-gold text-indigo-950 border-mystic-gold'
                          : 'bg-white/5 border-white/10 text-white/60'
                          }`}
                      >
                        {getCategoryName(cat as any, language)}
                      </Button>
                    ))}
                  </div>

                  {selectedCategory && (
                    <div className="grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {LIFE_EVENTS.filter(e => {
                        const isFuture = new Date(dateKey).getTime() > new Date().setHours(0, 0, 0, 0);
                        if (isFuture) {
                          return e.category === selectedCategory && e.isPlannable;
                        }
                        return e.category === selectedCategory;
                      }).map(event => {
                        const isSelected = currentDayEvents.some(ce => ce.event_id === event.event_id);
                        return (
                          <button
                            key={event.event_id}
                            onClick={() => toggleEvent(event.event_id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left bg-black ${isSelected
                              ? 'border-mystic-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                              : 'border-white/10 hover:bg-white/5'
                              }`}
                          >
                            <span className="text-xl">{event.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-medium ${isSelected ? 'text-mystic-gold' : 'text-white'}`}>
                                {language === 'en' ? event.event_name_en : event.event_name_tr}
                              </p>
                              <p className="text-[9px] text-white/40">
                                {t('effect')}: {event.base_impact_percent > 0 ? '+' : ''}{event.base_impact_percent}%
                              </p>
                            </div>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-mystic-gold" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <button
                onClick={() => setIsJournalOpen(!isJournalOpen)}
                className="w-full flex items-center justify-between text-sm font-medium text-mystic-gold hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-2">
                  <PenLine className="w-4 h-4" /> {t('cosmicJournal')}
                </div>
                <motion.div
                  animate={{ rotate: isJournalOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isJournalOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pt-1"
                  >
                    <Textarea
                      value={feelings}
                      onChange={(e) => setFeelings(e.target.value)}
                      onBlur={saveJournal}
                      placeholder={t('journalPlaceholder')}
                      className="bg-black border-white/10 focus:border-mystic-gold/50 min-h-[100px] text-sm"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setIsHappinessOpen(!isHappinessOpen)}
                className="w-full flex items-center justify-between text-sm font-medium text-mystic-gold hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-2">
                  <Smile className="w-4 h-4" /> {t('happinessLevel')}
                </div>
                <motion.div
                  animate={{ rotate: isHappinessOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isHappinessOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pt-4 pb-6"
                  >
                    <div className="relative space-y-12 px-4 py-4">
                      <div className="relative flex justify-between items-center h-16">
                        {Object.entries(EMOJI_IMAGES).map(([key, img], index) => {
                          const zoneMin = index * 20;
                          const zoneMax = (index + 1) * 20;
                          const isActive = (happiness >= zoneMin && happiness < zoneMax) || (key === 'very_happy' && happiness === 100);

                          return (
                            <motion.div
                              key={key}
                              initial={false}
                              animate={{
                                scale: (isActive ? 1.2 : 0.9) * (key === 'neutral' ? 1.35 : 1),
                                filter: isActive
                                  ? "brightness(1.2) drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))"
                                  : "brightness(0.7) grayscale(0.2)",
                                y: isActive ? -6 : 0
                              }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              className="w-14 h-14 relative flex items-center justify-center transition-all duration-300"
                            >
                              <img
                                src={img}
                                alt={key}
                                className="w-full h-full object-contain opacity-90"
                              />
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="relative">
                        <div className="relative h-[clamp(3rem,8vw,4rem)] px-2">
                          <div
                            className="absolute inset-x-2 inset-y-0 rounded-full overflow-hidden pointer-events-none opacity-70 border border-white/10"
                            style={{
                              backgroundImage: `url(${HAPPINESS_BAR})`,
                              backgroundSize: '100% 100%',
                              backgroundPosition: 'center'
                            }}
                          />

                          <SliderPrimitive.Root
                            value={[happiness]}
                            onValueChange={(vals: number[]) => {
                              const val = vals[0];
                              setHappiness(val);
                            }}
                            onValueCommit={(vals: number[]) => {
                              const val = vals[0];
                              localStorage.setItem(`cosmic_journal_${dateKey}`, JSON.stringify({ feelings, happiness: val }));
                              onHappinessChange();
                              if (window.navigator.vibrate) window.navigator.vibrate(10);
                            }}
                            max={100}
                            step={1}
                            className="relative flex w-full touch-none select-none items-center h-full z-20"
                          >
                            <SliderPrimitive.Track className="relative h-full w-full grow overflow-hidden rounded-full bg-transparent">
                              <SliderPrimitive.Range className="absolute h-full bg-transparent" />
                            </SliderPrimitive.Track>
                            <SliderPrimitive.Thumb
                              className="block h-[clamp(2.5rem,6vw,3rem)] w-[clamp(2.5rem,6vw,3rem)] rounded-full border border-white/20 bg-mystic-gold/90 shadow-[0_0_15px_rgba(212,175,55,0.5)] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                              aria-label="Happiness Level"
                            />
                          </SliderPrimitive.Root>


                        </div>
                      </div>
                    </div>

                  </motion.div>

                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog >

  );
}

interface CosmicCalendarProps {
  onBack: () => void;
  userLifeEvents: UserLifeEvent[];
  onEventsUpdate: (events: UserLifeEvent[]) => void;
  onHappinessUpdate?: () => void;
  initialDate?: Date;
}

export function CosmicCalendar({ onBack, userLifeEvents, onEventsUpdate, onHappinessUpdate, initialDate }: CosmicCalendarProps) {
  const { profile } = useProfile();
  const { language, t } = useLanguage();

  const PLANET_KEY_TO_NAME: Record<string, string> = {
    Sun: t('Sun'),
    Moon: t('Moon'),
    Mercury: t('Mercury'),
    Venus: t('Venus'),
    Mars: t('Mars'),
    Jupiter: t('Jupiter'),
    Saturn: t('Saturn'),
    Uranus: t('Uranus'),
    Neptune: t('Neptune'),
    Pluto: t('Pluto')
  };

  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(initialDate ? initialDate.getDate() : null);
  const [energyData, setEnergyData] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isDailyTransitsOpen, setIsDailyTransitsOpen] = useState(false);
  const [transitPlanetFilter, setTransitPlanetFilter] = useState<string | null>(null);
  const [personalTransits, setPersonalTransits] = useState<PersonalTransit[]>([]);
  const [detailedTransit, setDetailedTransit] = useState<PersonalTransit | null>(null);
  const [aiInterpretations, setAiInterpretations] = useState<Record<string, string>>({});
  const [loadingAI, setLoadingAI] = useState<string | null>(null);

  const fetchAIInterpretation = async (transit: PersonalTransit) => {
    const key = `${transit.transitPlanetKey}-${transit.natalPlanetKey}-${transit.aspectType}-${transit.house}`;
    if (aiInterpretations[key]) return;

    setLoadingAI(key);
    try {
      const response = await fetch('/api/transit-interpretation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transit, profile, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }

      const data = await response.json();
      if (data.interpretation) {
        setAiInterpretations(prev => ({ ...prev, [key]: data.interpretation }));
      }
    } catch (error) {
      console.error('AI Interpretation fetch error:', error);
    } finally {
      setLoadingAI(null);
    }
  };

  useEffect(() => {
    if (detailedTransit) {
      fetchAIInterpretation(detailedTransit);
    }
  }, [detailedTransit]);

  const getActiveAIInterpretation = () => {
    if (!detailedTransit) return null;
    const key = `${detailedTransit.transitPlanetKey}-${detailedTransit.natalPlanetKey}-${detailedTransit.aspectType}-${detailedTransit.house}`;
    return aiInterpretations[key];
  };

  const isCurrentAILoading = () => {
    if (!detailedTransit) return false;
    const key = `${detailedTransit.transitPlanetKey}-${detailedTransit.natalPlanetKey}-${detailedTransit.aspectType}-${detailedTransit.house}`;
    return loadingAI === key;
  };

  const getTransitStatusLabel = (selectedDate: Date, transit: PersonalTransit) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCompare = new Date(selectedDate);
    dateToCompare.setHours(0, 0, 0, 0);

    if (dateToCompare.getTime() < today.getTime()) return t('past');
    if (dateToCompare.getTime() > today.getTime()) return t('future');
    return t('current');
  };

  const [selectedTransit, setSelectedTransit] = useState<{

    planet: string;
    sign: string;
    house: number | null;
    interpretation: string;
    isMoon?: boolean;
    emoji?: string;
    moonPhase?: string;
  } | null>(null);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'tr-TR', { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(2024, i, 1)));
  }, [language]);

  const dayNames = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'tr-TR', { weekday: 'short' });
    return Array.from({ length: 7 }, (_, i) => formatter.format(new Date(2024, 0, i + 1)));
  }, [language]);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  useEffect(() => {
    const loadEnergies = async () => {
      if (!profile?.birth_date) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const birthDate = new Date(profile.birth_date);
      const newEnergyData = new Map<string, number>();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        try {
          const result = await calculateDailyEnergy(date, birthDate, profile.birth_time, undefined, undefined, language as 'tr' | 'en');
          let finalEnergy = result.overallEnergy;

          const lifeEventImpact = calculateLifeEventImpact(date, userLifeEvents);
          if (lifeEventImpact !== 0) {
            finalEnergy = Math.max(0, Math.min(100, Math.round(finalEnergy * (1 + lifeEventImpact / 100))));
          }

          const happinessImpact = getHappinessImpact(date);
          finalEnergy = Math.max(0, Math.min(100, finalEnergy + happinessImpact));

          newEnergyData.set(formatToKey(date), finalEnergy);
        } catch (e) {
          newEnergyData.set(formatToKey(date), 50);
        }
      }

      setEnergyData(newEnergyData);
      setLoading(false);
    };

    const formatToKey = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    loadEnergies();
  }, [currentMonth, currentYear, profile, daysInMonth, userLifeEvents, refreshTrigger, language]);

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDay(null);
  };

  const getEnergyForDay = (day: number): number => {
    const dateKey = formatDateToKey(new Date(currentYear, currentMonth, day));
    return energyData.get(dateKey) || 50;
  };

  const getLifeEventForDay = (day: number): UserLifeEvent | undefined => {
    const dateKey = formatDateToKey(new Date(currentYear, currentMonth, day));
    return userLifeEvents.find(e => e.event_date === dateKey);
  };

  const getEventData = (eventId: string) => {
    return LIFE_EVENTS.find(e => e.event_id === eventId);
  };

  const handleMoonPhaseClick = (phase: any) => {
    const house = profile ? 1 : null;
    const interpretation = getMoonPhaseInterpretation(phase.phase, house, "Gökyüzü");

    setSelectedTransit({
      planet: "Ay",
      sign: phase.phaseName,
      house,
      interpretation,
      isMoon: true,
      emoji: phase.emoji,
      moonPhase: phase.phase
    });
  };

  const upcomingMoons = findNextMoonPhases(new Date(), 4);

  const upcomingUserEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return userLifeEvents
      .filter(e => new Date(e.event_date) >= today)
      .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
  }, [userLifeEvents]);

  const handleDeleteEvent = (eventDate: string, eventId: string) => {
    const newEvents = userLifeEvents.filter(e => !(e.event_date === eventDate && e.event_id === eventId));
    onEventsUpdate(newEvents);
    localStorage.setItem("ayla_life_events", JSON.stringify(newEvents));
  };

  const handleEventClick = (eventDate: string) => {
    const date = new Date(eventDate);
    setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
    setSelectedDay(date.getDate());
  };

  const selectedDateObject = useMemo(() => {
    if (selectedDay === null) return null;
    return new Date(currentYear, currentMonth, selectedDay);
  }, [selectedDay, currentYear, currentMonth]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-mystic-blue via-indigo-950 to-mystic-purple pb-[calc(56px+env(safe-area-inset-bottom)+1.5rem)]">
      {/* Pre-render emojis for performance */}
      <div className="hidden">
        {Object.values(EMOJI_IMAGES).map((img, i) => (
          <img key={i} src={img} alt="" loading="eager" />
        ))}
      </div>

      <header className="sticky top-0 z-40 bg-mystic-blue/95 backdrop-blur-xl border-b border-mystic-gold/10 app-header relative px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-mystic-gold absolute left-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="font-mystic text-lg text-mystic-gold">{t('cosmicCalendarTitle')}</h1>
      </header>

      <div className="px-4 py-4 space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="font-mystic text-xl text-white">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {dayNames.map(day => (
            <div key={day} className="text-xs text-white/40 py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const energy = getEnergyForDay(day);
            const lifeEvent = getLifeEventForDay(day);
            const eventData = lifeEvent ? getEventData(lifeEvent.event_id) : null;
            const isToday = new Date().getDate() === day &&
              new Date().getMonth() === currentMonth &&
              new Date().getFullYear() === currentYear;

            return (
              <motion.button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all relative ${selectedDay === day
                  ? 'ring-2 ring-mystic-gold'
                  : isToday
                    ? 'ring-1 ring-white/30'
                    : ''
                  }`}
                style={{
                  backgroundColor: getInterpolatedEnergyColor(energy, 0.3)
                } as any}
                whileTap={{ scale: 0.95 }}
              >
                {eventData && (
                  <span className="absolute -top-1 -right-1 text-xs">{eventData.icon}</span>
                )}
                <span className={`font-medium ${isToday ? 'text-mystic-gold' : 'text-white'}`}>
                  {day}
                </span>
                {!loading && (
                  <span className="text-[8px] text-white/60">{energy}%</span>
                )}
              </motion.button>
            );
          })}
        </div>

        {selectedDateObject && (
          <DayDetailDialog
            date={selectedDateObject}
            energy={getEnergyForDay(selectedDay!)}
            profile={profile}
            isOpen={selectedDay !== null}
            onClose={() => setSelectedDay(null)}
            userLifeEvents={userLifeEvents}
            onEventsUpdate={onEventsUpdate}
            onHappinessChange={() => {
              setRefreshTrigger(prev => prev + 1);
              onHappinessUpdate?.();
            }}
            onOpenDailyTransits={(transits, planetFilter) => {
              setPersonalTransits(transits);
              setTransitPlanetFilter(planetFilter || null);
              setIsDailyTransitsOpen(true);
            }}
            onOpenDetailedTransit={(transit) => {
              setDetailedTransit(transit);
            }}
          />
        )}


        <div className="pt-4 border-t border-white/5">
          <LifeEventsSelector
            userEvents={userLifeEvents}
            onEventsChange={onEventsUpdate}
          />
        </div>
      </div>

      <PlanetTransitModal
        isOpen={!!selectedTransit}
        onClose={() => setSelectedTransit(null)}
        planetName={selectedTransit?.planet || ""}
        planetSign={selectedTransit?.sign || ""}
        house={selectedTransit?.house || null}
        interpretation={selectedTransit?.interpretation || ""}
        isMoon={selectedTransit?.isMoon}
        moonPhaseEmoji={selectedTransit?.emoji}
        moonPhase={selectedTransit?.moonPhase}
        onShowTransits={(planetName) => {
          const planetKey = Object.keys(PLANET_KEY_TO_NAME).find(key => PLANET_KEY_TO_NAME[key] === planetName) || planetName;
          setTransitPlanetFilter(planetKey);
          setIsDailyTransitsOpen(true);
          setSelectedTransit(null);
        }}
        personalTransits={personalTransits}
      />

      <DailyTransitsDialog
        isOpen={isDailyTransitsOpen}
        onClose={() => setIsDailyTransitsOpen(false)}
        date={selectedDateObject || new Date()}
        transits={personalTransits}
        initialPlanetFilter={transitPlanetFilter}
        profile={profile}
      />

      <Dialog open={!!detailedTransit} onOpenChange={() => setDetailedTransit(null)}>
        <DialogContent className="max-w-sm bg-black border-white/10 backdrop-blur-2xl text-white p-5 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,1)]">
          {detailedTransit && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-[2rem] bg-black border shadow-2xl transition-all ${detailedTransit.effect === 'positive' ? 'border-emerald-400 shadow-emerald-400/20' :
                  detailedTransit.effect === 'negative' ? 'border-rose-500 shadow-rose-500/20' :
                    'border-amber-400 shadow-amber-400/20'
                  }`}>
                  <div className="w-16 h-16">
                    <PlanetIcon name={detailedTransit.transitPlanetKey} className="w-full h-full" />
                  </div>
                </div>
                <span className={`text-5xl font-black drop-shadow-[0_0_15px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                  detailedTransit.effect === 'negative' ? 'text-rose-500' :
                    'text-amber-400'
                  }`}>
                  {detailedTransit.aspectSymbol}
                </span>
                <div className={`p-4 rounded-[2rem] bg-black border shadow-2xl transition-all ${detailedTransit.effect === 'positive' ? 'border-emerald-400 shadow-emerald-400/20' :
                  detailedTransit.effect === 'negative' ? 'border-rose-500 shadow-rose-500/20' :
                    'border-amber-400 shadow-amber-400/20'
                  }`}>
                  <div className="w-16 h-16">
                    <PlanetIcon name={detailedTransit.natalPlanetKey} className="w-full h-full" />
                  </div>
                </div>
              </div>

              <div className={`flex w-full justify-between items-center px-4 py-3 rounded-2xl bg-black text-sm border shadow-lg ${detailedTransit.effect === 'positive' ? 'border-emerald-400/40 shadow-emerald-400/10' :
                detailedTransit.effect === 'negative' ? 'border-rose-500/40 shadow-rose-500/10' :
                  'border-amber-400/40 shadow-amber-400/10'
                }`}>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-black">{t('transitStatus')}</span>
                  <span className={`font-black text-lg uppercase tracking-tight drop-shadow-[0_0_8px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                    detailedTransit.effect === 'negative' ? 'text-rose-500' :
                      'text-amber-400'
                    }`}>{getTransitStatusLabel(selectedDateObject || new Date(), detailedTransit)}</span>
                </div>
                <div className={`h-8 w-px shadow-[0_0_10px_currentColor] ${detailedTransit.effect === 'positive' ? 'bg-emerald-400 text-emerald-400' :
                  detailedTransit.effect === 'negative' ? 'bg-rose-500 text-rose-500' :
                    'bg-amber-400 text-amber-400'
                  }`} />
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-black">{t('position')}</span>
                  <span className={`font-black text-lg uppercase tracking-tight drop-shadow-[0_0_8px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                    detailedTransit.effect === 'negative' ? 'text-rose-500' :
                      'text-amber-400'
                    }`}>{formatHouseNumber(detailedTransit.house, language)}</span>
                </div>
              </div>

              <div className="space-y-4 text-left w-full">
                <div className={`p-4 rounded-2xl bg-black border transition-all space-y-3 shadow-xl ${detailedTransit.effect === 'positive' ? 'border-emerald-400/40 shadow-emerald-400/5' :
                  detailedTransit.effect === 'negative' ? 'border-rose-500/40 shadow-rose-500/5' :
                    'border-amber-400/40 shadow-amber-400/5'
                  }`}>
                  <h5 className={`text-[9px] font-black uppercase tracking-[0.3em] drop-shadow-[0_0_5px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                    detailedTransit.effect === 'negative' ? 'text-rose-500' :
                      'text-amber-400'
                    }`}>{t('cosmicComment')}</h5>

                  {isCurrentAILoading() ? (
                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                      <Loader2 className="w-6 h-6 animate-spin text-mystic-gold" />
                      <p className="text-[10px] text-white/40 uppercase tracking-widest animate-pulse">{t('starsAreWhispering')}</p>
                    </div>
                  ) : (
                    <p className={`text-sm leading-relaxed font-medium ${detailedTransit.effect === 'positive' ? 'text-emerald-400/90' :
                      detailedTransit.effect === 'negative' ? 'text-rose-600/90' :
                        'text-amber-400/90'
                      }`}>
                      {(() => {
                        const cosmicComment = getCosmicComment(
                          detailedTransit.transitPlanetKey,
                          detailedTransit.house,
                          detailedTransit.aspectType,
                          language as 'tr' | 'en'
                        );

                        if (cosmicComment) return cosmicComment;

                        return getActiveAIInterpretation() || getTransitInterpretation(
                          detailedTransit.transitPlanetKey,
                          detailedTransit.house,
                          detailedTransit.houseSign || (language === 'en' ? "Aries" : "Koç"),
                          detailedTransit.aspectType,
                          language as 'tr' | 'en'
                        );
                      })()}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className={`p-3 rounded-xl bg-black border flex flex-col gap-1 shadow-md ${detailedTransit.effect === 'positive' ? 'border-emerald-400/20' :
                    detailedTransit.effect === 'negative' ? 'border-rose-500/20' :
                      'border-amber-400/20'
                    }`}>
                    <span className="text-[8px] text-white/40 uppercase font-bold tracking-wider">{t('status')}</span>
                    <span className={`text-[11px] font-black drop-shadow-[0_0_5px_currentColor] ${detailedTransit.state === 'APPLYING'
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                      }`}>
                      {detailedTransit.state === 'APPLYING' ? t('effectIncreasing') : t('effectDecreasing')}
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl bg-black border flex flex-col gap-1 shadow-md ${detailedTransit.effect === 'positive' ? 'border-emerald-400/20' :
                    detailedTransit.effect === 'negative' ? 'border-rose-500/20' :
                      'border-amber-400/20'
                    }`}>
                    <span className="text-[8px] text-white/40 uppercase font-bold tracking-wider">{t('orb')}</span>
                    <span className={`text-[11px] font-black drop-shadow-[0_0_5px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                      detailedTransit.effect === 'negative' ? 'text-rose-500' :
                        'text-amber-400'
                      }`}>
                      {detailedTransit.orb}°
                    </span>
                  </div>
                  {detailedTransit.state === 'APPLYING' && detailedTransit.exactHitDate && (
                    <div className={`col-span-2 p-3 rounded-xl bg-black border flex flex-col gap-1 shadow-lg ${detailedTransit.effect === 'positive' ? 'border-emerald-400/40 shadow-emerald-400/5' :
                      detailedTransit.effect === 'negative' ? 'border-rose-500/40 shadow-rose-500/5' :
                        'border-amber-400/40 shadow-amber-400/5'
                      }`}>
                      <span className={`text-[8px] uppercase font-bold tracking-wider drop-shadow-[0_0_5px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                        detailedTransit.effect === 'negative' ? 'text-rose-500' :
                          'text-amber-400'
                        }`}>{t('exactHitDate')}</span>
                      <span className={`text-[12px] font-black ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                        detailedTransit.effect === 'negative' ? 'text-rose-500' :
                          'text-amber-400'
                        }`}>
                        {detailedTransit.exactHitDate}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={() => setDetailedTransit(null)}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-95 shadow-2xl ${detailedTransit.effect === 'positive' ? 'bg-emerald-400 hover:bg-emerald-300 text-emerald-950 shadow-emerald-400/40' :
                  detailedTransit.effect === 'negative' ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/40' :
                    'bg-amber-500 hover:bg-amber-400 text-amber-950 shadow-amber-500/40'
                  }`}
              >
                {t('gotCosmicMessage')}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
