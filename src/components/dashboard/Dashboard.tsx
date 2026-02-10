"use client";
import { safeJSONParse, safeLocalStorage } from "@/lib/safe-utils";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Moon,
  Star,
  MessageSquare,
  Home,
  Calendar,
  Sun,
  AlertTriangle,
  Shield,
  Heart,
  Zap,
  ChevronDown,
  Activity,
  Target,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Crown
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AylaGreeting } from "./AylaGreeting";
import { TarotReading } from "../rituals/TarotReading";
import { ArchetypeAnalysis } from "../rituals/ArchetypeAnalysis";
import { EarnDust } from "../economy/EarnDust";
import { useProfile } from "@/hooks/useProfile";
import { BirthChart } from "../birthchart/BirthChart";
import { CosmicCalendar } from "../calendar/CosmicCalendar";
import { LoveCompatibility } from "./LoveCompatibility";
import {
  getSunSign,
  calculatePersonalImpact,
  getImpactColor,
  getImpactTextColor,
  generateAffirmation,
  generateImpactReason,
  ImpactLevel,
  getZodiacElement,
  getDailyAylaAdvice,
  getPlanetImpactColor,
  getHouseForLongitude
} from "@/lib/astrology";
import {
  getEnergyColor,
  getInterpolatedEnergyColor,
  calculateDailyEnergy
} from "@/lib/planetary-energy-service";
import { getHappinessImpact, getHappinessPercentage } from "@/lib/happiness-service";
import { getUnifiedCosmicData, CosmicEvent, getCurrentRetrogrades } from "@/lib/cosmic-events-service";
import { generatePersonalizedDailyForecast } from "@/lib/daily-horoscope-service";
import { calculateTransits, TransitData, calculateBirthChart, findNextMoonPhases, calculatePersonalDayEnergy } from "@/lib/astronomy-service";
import { AYLA_IMAGE as CONSTANT_AYLA_IMAGE } from "@/lib/constants";

import { PlanetIcon } from "../ui/PlanetIcon";
import { ZodiacImage } from "../ui/ZodiacImage";
import { PlanetTransitModal } from "./PlanetTransitModal";
import { getPlanetTransitInterpretation, getMoonPhaseInterpretation, formatHouseNumber } from "@/lib/transit-interpretations";
import { LifeEventsSelector } from "./LifeEventsSelector";
import { GuidanceCarousel } from "./GuidanceCarousel";
import { UserLifeEvent, calculateLifeEventImpact, LIFE_EVENTS } from "@/lib/data/life-events";
import { generateHighDimensionalGuidance, getActiveLifeEvents, GuidanceData } from "@/lib/dynamic-affirmation-service";
import { PersonalTransit } from "@/lib/transit-engine";
import { getTransitInterpretation, getTransitInterpretationAsJSON } from "@/lib/data/transit-interpretations";
import { getCosmicComment } from "@/lib/cosmic-comments";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DailyTransitsDialog } from "../calendar/DailyTransitsDialog";
import { SettingsDialog } from "../settings/SettingsDialog";
import { AppActionsDialog } from "./AppActionsDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { scheduleEnergyNotifications } from "@/lib/notifications";
import { Settings } from "lucide-react";
import { PremiumModal } from "../premium/PremiumModal";
import { PremiumUserModal } from "../premium/PremiumUserModal";
import { AdContentPopup } from "../ads/AdContentPopup";
import { PersistenceManager } from "@/lib/persistence";
import { useInView } from "@/hooks/useInView";
import { InViewAnimatedWrapper } from "@/components/ui/InViewAnimatedWrapper";
import { RetrogradePlanetButton, CosmicAgendaMoon, CosmicAgendaPlanet } from "./AnimatedElements";


const AYLA_IMAGE = CONSTANT_AYLA_IMAGE || "/assets/ayla/ayla_character.png";

const LUCKY_COLOR_MAP: Record<string, string> = {
  "Altın": "#FFD700",
  "Gümüş": "#C0C0C0",
  "Turkuaz": "#40E0D0",
  "Eflatun": "#663399",
  "Mercan": "#FF7F50",
  "Safir": "#0F52BA",
  "Zümrüt": "#50C878",
  "Yakut": "#E0115F",
  "Mor": "#800080"
};

type TabId = "home" | "birthchart" | "calendar" | "love_compatibility" | "tarot" | "archetype";

export function Dashboard({ profile: initialProfile }: { profile: any }) {
  const { t, language } = useLanguage();
  const { profile, updateStarDust, subscriptionStatus } = useProfile();

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

  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [isEarning, setIsEarning] = useState(false);
  const [events, setEvents] = useState<CosmicEvent[]>([]);
  const [userSunSign, setUserSunSign] = useState<string>("");
  const [retrogrades, setRetrogrades] = useState<Array<{ planet: string; sign: string }>>([]);
  const [dailyForecast, setDailyForecast] = useState<any>(null);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [currentTransits, setCurrentTransits] = useState<TransitData | null>(null);
  const [userBirthChart, setUserBirthChart] = useState<any>(null);
  const [todayEnergy, setTodayEnergy] = useState<number>(50);
  const [baseEnergy, setBaseEnergy] = useState<number>(50);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [userLifeEvents, setUserLifeEvents] = useState<UserLifeEvent[]>([]);
  const [calendarInitialDate, setCalendarInitialDate] = useState<Date | undefined>(undefined);
  const [personalTransits, setPersonalTransits] = useState<PersonalTransit[]>([]);
  const [todayInfluences, setTodayInfluences] = useState<any[]>([]);
  const [transitFilters, setTransitFilters] = useState<string[]>(["positive", "neutral", "negative"]);
  const [detailedTransit, setDetailedTransit] = useState<PersonalTransit | null>(null);
  const [isDailyTransitsOpen, setIsDailyTransitsOpen] = useState(false);
  const [transitPlanetFilter, setTransitPlanetFilter] = useState<string | null>(null);
  const [isCosmicAgendaOpen, setIsCosmicAgendaOpen] = useState(true);
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(true);
  const [isRetrogradesOpen, setIsRetrogradesOpen] = useState(true);
  const [isDailyTransitsOpenSection, setIsDailyTransitsOpenSection] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showPremiumUserModal, setShowPremiumUserModal] = useState(false);
  const [showRateUsModal, setShowRateUsModal] = useState(false);
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [adTarget, setAdTarget] = useState<string | null>(null);
  const [unlockedPlanets, setUnlockedPlanets] = useState<string[]>([]);
  const [isRetrogradeListOpen, setIsRetrogradeListOpen] = useState(false);

  useEffect(() => {
    if (profile?.birth_date) {
      scheduleEnergyNotifications(
        new Date(profile.birth_date),
        profile.birth_time || "12:00",
        profile.birth_place || "Istanbul",
        language as 'tr' | 'en'
      ).catch((err: any) => console.error("Failed to sync notifications:", err));
    }
  }, [profile, language]);

  useEffect(() => {
    setUnlockedPlanets(PersistenceManager.getUnlockedContent());
  }, []);

  const handleShowAd = (planetKey: string) => {
    setAdTarget(planetKey);
    setShowAdPopup(true);
  };

  const handleAdComplete = () => {
    if (adTarget) {
      PersistenceManager.unlockContent(adTarget);
      setUnlockedPlanets(PersistenceManager.getUnlockedContent());
      setAdTarget(null);
    }
    setShowAdPopup(false);
  };

  useEffect(() => {
    // If premium, don't show premium offer
    if (subscriptionStatus === 'premium') return;

    const hasSeen = safeLocalStorage.getItem("hasSeenPremiumOffer");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setShowPremiumModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [subscriptionStatus]);

  const handlePremiumClose = () => {
    setShowPremiumModal(false);
    safeLocalStorage.setItem("hasSeenPremiumOffer", "true");
    
    // Open Rate Us modal after Premium closes only if NOT premium
    if (subscriptionStatus !== 'premium') {
        setTimeout(() => setShowRateUsModal(true), 500);
    }
  };


  const [selectedTransit, setSelectedTransit] = useState<{
    planet: string;
    sign: string;
    house: number | null;
    interpretation: string;
    isMoon?: boolean;
    emoji?: string;
    moonPhase?: string;
    moonPhaseName?: string;
    isRetrograde?: boolean;
  } | null>(null);

  const currentProfile = profile || initialProfile;
  const profileBirthDate = currentProfile?.birth_date;
  const profileBirthTime = currentProfile?.birth_time;
  const profileBirthPlace = currentProfile?.birth_place;
  const profileLatitude = currentProfile?.latitude;
  const profileLongitude = currentProfile?.longitude;

  useEffect(() => {
    const savedEvents = safeLocalStorage.getItem("ayla_life_events");
    if (savedEvents) {
      try {
        setUserLifeEvents(safeJSONParse(savedEvents, []));
      } catch (e) {
        console.error("Failed to parse life events", e);
      }
    }
  }, []);

  const handleLifeEventsChange = (events: UserLifeEvent[]) => {
    setUserLifeEvents(events);
    safeLocalStorage.setItem("ayla_life_events", JSON.stringify(events));
  };

  const profileId = currentProfile?.id;

  // Load user's sun sign
  useEffect(() => {
    if (profileBirthDate) {
      const sign = getSunSign(new Date(profileBirthDate), language as 'tr' | 'en');
      setUserSunSign(sign);
    }
  }, [profileBirthDate, language]);

  useEffect(() => {
    const loadData = async () => {
      setLoadingForecast(true);
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const cosmicData = await getUnifiedCosmicData();
        setEvents(cosmicData);
        setRetrogrades(getCurrentRetrogrades(today, language as 'tr' | 'en'));

        const transits = calculateTransits(today, language as 'tr' | 'en');
        setCurrentTransits(transits);

        // Calculate personal daily energy
        if (userSunSign) {
          setDailyForecast(calculatePersonalDayEnergy(transits, userSunSign, currentProfile?.moon_sign, language as 'tr' | 'en'));
        }

        if (profileBirthDate) {
          const energyResult = await calculateDailyEnergy(
            today,
            new Date(profileBirthDate),
            profileBirthTime
          );

          setBaseEnergy(energyResult.overallEnergy);
          setPersonalTransits(energyResult.personalTransits || []);
          setTodayInfluences(energyResult.planetaryInfluences || []);
        }
      } catch (error) {
        console.error("Forecast load error:", error);
      } finally {
        setLoadingForecast(false);
      }
    };
    loadData();
  }, [profileId, profileBirthDate, profileBirthTime, profileBirthPlace, profileLatitude, profileLongitude, activeTab, userSunSign, language, currentProfile?.moon_sign]);

  // Separate effect for quick energy updates (events, happiness) without full reload
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let finalEnergy = baseEnergy;
    const lifeEventImpact = calculateLifeEventImpact(today, userLifeEvents);

    if (lifeEventImpact !== 0) {
      finalEnergy = Math.max(0, Math.min(100, Math.round(finalEnergy * (1 + lifeEventImpact / 100))));
    }

    const happinessImpact = getHappinessImpact(today);
    finalEnergy = Math.max(0, Math.min(100, finalEnergy + happinessImpact));

    setTodayEnergy(finalEnergy);
  }, [baseEnergy, userLifeEvents, refreshTrigger]);

  const handlePlanetClick = (planet: any) => {
    const planetKey = planet.planetKey || Object.keys(PLANET_KEY_TO_NAME).find(key => PLANET_KEY_TO_NAME[key] === planet.planet) || planet.planet;

    // Access Control: Sun is free (Moon Phase is handled separately). Others require Premium or Ad Unlock.
    const isFreePlanet = planetKey === 'Sun';
    const isUnlocked = isFreePlanet || subscriptionStatus === 'premium' || PersistenceManager.isContentUnlocked(planetKey);

    if (!isUnlocked) {
      setAdTarget(planetKey);
      setShowAdPopup(true);
      return;
    }

    const house = userBirthChart ? getHouseForLongitude(planet.longitude, userBirthChart.houses) : null;
    const planetTransits = personalTransits.filter(t => t.transitPlanetKey === planetKey);
    const posCount = planetTransits.filter(t => t.effect === 'positive').length;
    const negCount = planetTransits.filter(t => t.effect === 'negative').length;
    const effectType: "positive" | "negative" | "neutral" = posCount > negCount ? "positive" : negCount > posCount ? "negative" : "neutral";

    const interpretation = getPlanetTransitInterpretation(planet.planet, house, planet.sign, effectType, planet.isRetrograde);

    setSelectedTransit({
      planet: planet.planet,
      sign: planet.sign,
      house,
      interpretation,
      isRetrograde: planet.isRetrograde
    });
  };

  const handleMoonClick = () => {
    if (!currentTransits) return;

    const moon = currentTransits.planets.find(p => p.planet === "Ay" || p.planet === "Moon" || p.planetKey === "Moon");
    if (!moon) return;

    const house = userBirthChart ? getHouseForLongitude(moon.longitude, userBirthChart.houses) : null;
    const interpretation = getMoonPhaseInterpretation(currentTransits.moonPhase.phase, house, moon.sign, language as 'tr' | 'en');

    setSelectedTransit({
      planet: language === 'en' ? "Moon" : "Ay",
      sign: moon.sign,
      house,
      interpretation,
      isMoon: true,
      emoji: currentTransits.moonPhase.emoji,
      moonPhase: currentTransits.moonPhase.phase,
      moonPhaseName: currentTransits.moonPhase.phaseName,
      isRetrograde: moon.isRetrograde
    });
  };

  const handleMoonPhaseClick = (phase: any) => {
    const house = userBirthChart ? 1 : null;
    const moonSign = language === 'en' ? "Sky" : "Gökyüzü";
    const interpretation = getMoonPhaseInterpretation(phase.phase, house, moonSign, language as 'tr' | 'en');

    setSelectedTransit({
      planet: t('Moon'),
      sign: phase.phaseName,
      house,
      interpretation,
      isMoon: true,
      emoji: phase.emoji,
      moonPhase: phase.phase
    });
  };

  const handleSpend = (amount: number) => {
    updateStarDust(-amount);
  };

  const handleEarn = (amount: number) => {
    updateStarDust(amount);
    setIsEarning(false);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events.filter(e => new Date(e.end_date) >= today).slice(0, 5);
  };

  const getActiveWarnings = () => {
    const today = new Date();
    return events.filter(e => {
      const start = new Date(e.start_date);
      const end = new Date(e.end_date);
      const isActive = today >= start && today <= end;
      const impact = calculatePersonalImpact(userSunSign, e.planet, e.event_type);
      return isActive && impact === "negative";
    });
  };

  const { posCountTotal, negCountTotal } = useMemo(() => {
    let pos = 0;
    let neg = 0;
    personalTransits.forEach(t => {
      if (t.effect === 'positive') pos++;
      if (t.effect === 'negative') neg++;
    });
    return { posCountTotal: pos, negCountTotal: neg };
  }, [personalTransits]);

  const sectionThemeColor = (posCountTotal > negCountTotal) ? "emerald" : (negCountTotal > posCountTotal) ? "rose" : "amber";
  const sectionTextClass = sectionThemeColor === "emerald" ? "text-emerald-400" : sectionThemeColor === "rose" ? "text-rose-400" : "text-amber-400";
  const sectionBorderClass = sectionThemeColor === "emerald" ? "border-emerald-500/30 shadow-emerald-500/10" : sectionThemeColor === "rose" ? "border-rose-500/30 shadow-rose-500/10" : "border-amber-500/30 shadow-amber-500/10";
  const sectionBgClass = sectionThemeColor === "emerald" ? "bg-emerald-950/20" : sectionThemeColor === "rose" ? "bg-rose-950/20" : "bg-amber-950/20";

  const renderHomeContent = () => {
    const todayHappiness = getHappinessPercentage(new Date());
    const activeLifeEvents = getActiveLifeEvents(userLifeEvents, new Date());
    const guidance = generateHighDimensionalGuidance({
      activeEvents: activeLifeEvents,
      transits: currentTransits,
      sunSign: userSunSign,
      targetDate: new Date(),
      userEvents: userLifeEvents,
      language: language as 'tr' | 'en'
    }, todayHappiness, todayEnergy);

    return (
      <div className="px-[clamp(0.75rem,4vw,1rem)] pt-[calc(clamp(0.75rem,4vw,1rem)+var(--sat))] space-y-[clamp(0.75rem,3vw,1rem)] pb-[calc(56px+env(safe-area-inset-bottom)+1.5rem)]">
        <div id="tutorial-guidance" className="space-y-0 relative z-30">
          <div className="flex items-center justify-between w-full px-1 mb-[-1.5rem] relative min-h-[3rem] z-30">
            {/* Logo Container - Flex Centered between left and buttons */}
            <div className="flex-1 flex justify-center items-center pl-2 pr-4 z-10">
              <button
                onClick={() => setIsGuidanceOpen(!isGuidanceOpen)}
                className="relative group transition-transform hover:scale-105 active:scale-95 translate-y-[-0.25rem]"
              >
                <img 
                  src="/assets/IMG_1557.PNG" 
                  alt="Ayla Logo" 
                  className="h-[clamp(8.25rem,24vw,11.25rem)] w-auto object-contain" 
                />
              </button>
            </div>

            {/* Buttons Container - Right aligned */}
            <div className="flex items-center justify-end gap-2 shrink-0 z-20">
              <InViewAnimatedWrapper
                className="rounded-lg"
                animationClass="animate-pulse-premium"
              >
                <Button
                  onClick={() => {
                    if (subscriptionStatus === 'premium') {
                      setShowPremiumUserModal(true);
                    } else {
                      setShowPremiumModal(true);
                    }
                  }}
                  className="h-8 px-3 bg-gradient-to-r from-[#B8860B] to-[#DAA520] hover:from-[#DAA520] hover:to-[#FFD700] text-indigo-950 font-black text-xs rounded-lg border-none transition-all flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5" />
                  PREMIUM
                </Button>
              </InViewAnimatedWrapper>
              <AppActionsDialog open={showRateUsModal} onOpenChange={setShowRateUsModal} />
              <SettingsDialog />
              <button
                onClick={() => setIsGuidanceOpen(!isGuidanceOpen)}
                className="p-1"
              >
                <ChevronDown className={`w-5 h-5 text-mystic-gold/60 transition-transform ${isGuidanceOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isGuidanceOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <GuidanceCarousel
                  data={guidance}
                  loading={loadingForecast}
                  todayEnergy={todayEnergy}
                  luckyColor={dailyForecast?.luckyColor}
                  luckyColorHex={dailyForecast?.luckyColor ? LUCKY_COLOR_MAP[dailyForecast.luckyColor] : undefined}
                  onEnergyClick={() => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    setCalendarInitialDate(today);
                    setActiveTab("calendar");
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div >

        {
          retrogrades.length > 0 && (
            <div id="tutorial-retrogrades" className="space-y-2">
              <button
                onClick={() => setIsRetrogradeListOpen(true)}
                className="w-full flex items-center justify-between px-1 group"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <h3 className="font-mystic text-[10px] text-rose-600 uppercase tracking-widest">
                    {t('activeRetrogrades')}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] text-rose-600/60 uppercase tracking-widest font-bold group-hover:text-rose-600 transition-colors">
                    {language === 'tr' ? 'TÜMÜNÜ GÖR' : 'VIEW ALL'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-rose-600/60 -rotate-90" />
                </div>
              </button>
              <AnimatePresence>
                {isRetrogradesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Card className="py-2 px-4 bg-black border-rose-900/50 shadow-[0_0_20px_rgba(225,29,72,0.2)] gap-0">
                      <div className="flex flex-wrap gap-1 py-1">
                        {retrogrades.map((r, i) => {
                          const matchingPlanet = currentTransits?.planets.find(p => p.planet === r.planet);
                          return (
                            <RetrogradePlanetButton
                              key={`retrograde-${r.planet}-${r.sign}-${i}`}
                              planetName={r.planet}
                              sign={r.sign}
                              onClick={() => matchingPlanet && handlePlanetClick(matchingPlanet)}
                            />
                          );
                        })}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        }

        {
          currentTransits && (
            <div className={`space-y-3 p-3 py-4 rounded-[2rem] border transition-all -mx-2 px-2 md:mx-0 md:px-3 ${sectionBorderClass} ${sectionBgClass}`}>
              <div className="w-full flex items-center justify-between mb-1 relative px-2">
                <button
                  onClick={() => setIsCosmicAgendaOpen(!isCosmicAgendaOpen)}
                  className="flex items-center gap-2 group flex-1 text-left"
                >
                  <Sparkles className={`w-4 h-4 ${sectionTextClass}`} />
                  <h3 className={`font-mystic text-[10px] uppercase tracking-widest ${sectionTextClass}`}>
                    {t('planetPositions')}
                  </h3>
                  <ChevronDown className={`w-4 h-4 transition-transform ${sectionTextClass} opacity-50 ${isCosmicAgendaOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <AnimatePresence>
                {isCosmicAgendaOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-2 px-4 pt-2">
                      <CosmicAgendaMoon
                        id="tutorial-moon"
                        onClick={handleMoonClick}
                      >
                        <div className="text-[clamp(2rem,8vw,2.5rem)] mb-1 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.4)] group-hover:scale-105 transition-transform">
                          {currentTransits.moonPhase.emoji}
                        </div>
                        <div className="text-center">
                          <p className="text-amber-400 font-mystic text-[11px] font-black uppercase tracking-wider">{t('Moon')}</p>
                          <p className="text-amber-400/60 text-[8px] mt-0.5 font-bold uppercase tracking-widest">{currentTransits.moonPhase.phaseName}</p>
                        </div>
                      </CosmicAgendaMoon>

                      {currentTransits.planets.map((planet, i) => {
                        const planetKey = planet.planetKey || Object.keys(PLANET_KEY_TO_NAME).find(key => PLANET_KEY_TO_NAME[key] === planet.planet) || planet.planet;
                        const planetTransits = personalTransits.filter(t => t.transitPlanetKey === planetKey);
                        const posCount = planetTransits.filter(t => t.effect === 'positive').length;
                        const negCount = planetTransits.filter(t => t.effect === 'negative').length;
                        let effectType: "positive" | "negative" | "neutral" = posCount > negCount ? "positive" : negCount > posCount ? "negative" : "neutral";
                        const colorClass = effectType === "positive" ? "text-emerald-400" : effectType === "negative" ? "text-rose-400" : "text-amber-400";
                        // borderClass and shadowClass are replaced by animation
                        
                        // Access Control Check
                        const isFreePlanet = planetKey === 'Sun';
                        const isUnlocked = isFreePlanet || subscriptionStatus === 'premium' || unlockedPlanets.includes(planetKey);

                        const glowColor = effectType === "positive" ? "16, 185, 129" : effectType === "negative" ? "244, 63, 94" : "251, 191, 36";

                        return (
                          <CosmicAgendaPlanet
                            key={`planet-${planet.planet || 'unknown'}-${i}`}
                            onClick={() => handlePlanetClick(planet)}
                            glowColor={glowColor}
                            className={`flex flex-col items-center justify-center group transition-all cursor-pointer p-2 bg-black rounded-[2.5rem] border border-transparent hover:bg-white/10 min-w-[clamp(100px,28vw,130px)] h-[clamp(100px,28vw,130px)] relative overflow-hidden`}
                          >
                            <div className={`flex flex-col items-center justify-center w-full h-full`}>
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <div className={`w-[clamp(2rem,5vw,2.5rem)] h-[clamp(2rem,5vw,2.5rem)] flex items-center justify-center group-hover:scale-105 transition-transform filter drop-shadow-[0_0_15px_currentColor] ${colorClass}`}>
                                  <PlanetIcon name={planet.planet} className="w-full h-full" />
                                </div>
                                <div className="w-[clamp(1.5rem,4vw,2rem)] h-[clamp(1.5rem,4vw,2rem)] group-hover:scale-105 transition-transform">
                                  <ZodiacImage sign={planet.sign} size={32} />
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-0.5">
                                  <p className={`${colorClass} font-mystic text-[11px] font-black uppercase tracking-wider truncate`}>{t(planet.planet as any) || planet.planet}</p>
                                  {planet.isRetrograde && (
                                    <span className="text-rose-400 text-[9px] font-bold">℞</span>
                                  )}
                                </div>
                                <p className={`${colorClass} opacity-60 text-[8px] mt-0.5 font-bold uppercase tracking-widest`}>{planet.sign}</p>
                              </div>
                            </div>
                          </CosmicAgendaPlanet>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        }

        <div className={`space-y-3 p-3 py-4 rounded-[2rem] border transition-all -mx-2 px-2 md:mx-0 md:px-3 shadow-2xl ${sectionBorderClass} ${sectionBgClass}`}>
          <div className="w-full flex items-center justify-between mb-1 relative px-2">
            <button
              onClick={() => setIsDailyTransitsOpenSection(!isDailyTransitsOpenSection)}
              className="flex items-center gap-2 group flex-1 text-left"
            >
              <Activity className={`w-4 h-4 ${sectionTextClass}`} />
              <h3 className={`font-mystic text-[10px] uppercase tracking-widest ${sectionTextClass}`}>
                {t('dailyTransits')}
              </h3>
              <ChevronDown className={`w-4 h-4 transition-transform ${sectionTextClass} opacity-50 ${isDailyTransitsOpenSection ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDailyTransitsOpenSection && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-1"
                >
                  {["positive", "neutral", "negative"].map((filter) => (
                    <button
                      key={filter}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTransitFilters(prev =>
                          prev.includes(filter)
                            ? prev.filter(f => f !== filter)
                            : [...prev, filter]
                        );
                      }}
                      className={`px-2 py-1 rounded-full text-[7px] font-black border transition-all uppercase tracking-wider ${transitFilters.includes(filter)
                        ? filter === "positive" ? "bg-emerald-500/30 border-emerald-400 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]" :
                          filter === "negative" ? "bg-rose-500/30 border-rose-400 text-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.4)]" :
                            "bg-amber-500/30 border-amber-400 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]"
                        : "bg-white/5 border-white/10 text-white/30"
                        }`}
                    >
                      {filter === "positive" ? t('positiveShort') : filter === "negative" ? t('negativeShort') : t('neutralShort')}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isDailyTransitsOpenSection && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-2 px-4 items-center pt-2">
                  {personalTransits
                    .filter(t => transitFilters.includes(t.effect || "neutral"))
                    .length > 0 ? (
                    personalTransits
                      .filter(t => transitFilters.includes(t.effect || "neutral"))
                      .map((transit, i) => {
                        const isUnlocked = subscriptionStatus === 'premium';
                        
                        const glowColor = transit.effect === "positive" ? "16, 185, 129" : transit.effect === "negative" ? "244, 63, 94" : "251, 191, 36";

                        return (
                          <motion.button
                            key={`dashboard-transit-${transit.transitPlanetKey}-${transit.natalPlanetKey}-${transit.aspectType}-${i}`}
                            onClick={() => {
                              if (!isUnlocked) {
                                setShowPremiumModal(true);
                              } else {
                                setDetailedTransit(transit);
                              }
                            }}
                            animate={{
                              scale: [1, 1.05, 1]
                            }}
                            style={{
                              boxShadow: `0 0 0 2px rgba(${glowColor}, 0.6), 0 0 20px rgba(${glowColor}, 0.3)`
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className={`p-2 rounded-[2.5rem] border-none flex flex-col items-center justify-center gap-2 transition-all min-w-[clamp(100px,28vw,130px)] h-[clamp(100px,28vw,130px)] relative overflow-hidden bg-black shrink-0 group hover:scale-105 active:scale-95`}
                          >
                            <div className={`flex flex-col items-center justify-center w-full h-full`}>
                              <div className="flex items-center gap-2 w-full justify-center -mt-1 mb-2">
                                <div className="w-[clamp(1.5rem,4vw,1.75rem)] h-[clamp(1.5rem,4vw,1.75rem)] group-hover:scale-105 transition-transform">
                                  <PlanetIcon name={PLANET_KEY_TO_NAME[transit.transitPlanetKey] || transit.transitPlanetKey} className="w-full h-full" />
                                </div>
                                <span className={`text-[clamp(1rem,4vw,1.125rem)] font-black drop-shadow-[0_0_15px_currentColor] ${transit.effect === 'positive' ? 'text-emerald-400' :
                                  transit.effect === 'negative' ? 'text-rose-500' :
                                    'text-amber-400'
                                  }`}>{transit.aspectSymbol}</span>
                                <div className="w-[clamp(1.5rem,4vw,1.75rem)] h-[clamp(1.5rem,4vw,1.75rem)] group-hover:scale-105 transition-transform">
                                  <PlanetIcon name={PLANET_KEY_TO_NAME[transit.natalPlanetKey] || transit.natalPlanetKey} className="w-full h-full" />
                                </div>
                              </div>
                              <div className="flex w-full justify-center items-center text-[8px] px-3 absolute bottom-4 left-0 right-0">
                                <span className={`font-black uppercase tracking-[0.2em] truncate ${transit.effect === 'positive' ? 'text-emerald-400' :
                                  transit.effect === 'negative' ? 'text-rose-500' :
                                    'text-amber-400'
                                  }`}>{formatHouseNumber(transit.house, language)}</span>
                              </div>
                              <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none ${transit.effect === 'positive' ? 'bg-emerald-400' :
                                transit.effect === 'negative' ? 'bg-rose-500' :
                                  'bg-amber-400'
                                }`} />
                            </div>
                          </motion.button>
                        );
                      })
                  ) : (
                    <div className="w-full flex items-center justify-center h-24">
                      <p className="text-white/20 text-[10px] uppercase tracking-widest italic text-center px-6">{t('noTransits')}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <LifeEventsSelector
          userEvents={userLifeEvents}
          onEventsChange={handleLifeEventsChange}
        />
      </div >
    );
  };

  return (
    <div className="w-full min-h-screen relative">
      <PremiumModal 
        isOpen={showPremiumModal} 
        onClose={handlePremiumClose} 
        onPurchaseSuccess={() => {
            setShowPremiumModal(false);
            setShowPremiumUserModal(true);
        }}
      />
      <PremiumUserModal 
        isOpen={showPremiumUserModal} 
        onClose={() => setShowPremiumUserModal(false)} 
      />
      {/* Background layer - edge-to-edge */}
      <div className="fixed inset-0 bg-gradient-to-b from-mystic-blue via-indigo-950 to-mystic-purple -z-10" />

      {/* Content layer - safe area aware */}
      <div className="relative flex-col w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full relative"
            >

              {renderHomeContent()}
            </motion.div>
          )}

          {activeTab === "birthchart" && (
            <motion.div
              key="birthchart"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <BirthChart onBack={() => setActiveTab("home")} onTabChange={(tab) => setActiveTab(tab)} />
            </motion.div>
          )}

          {activeTab === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <CosmicCalendar
                onBack={() => setActiveTab("home")}
                userLifeEvents={userLifeEvents}
                onEventsUpdate={handleLifeEventsChange}
                onHappinessUpdate={() => setRefreshTrigger(prev => prev + 1)}
                initialDate={calendarInitialDate}
              />
            </motion.div>
          )}

          {activeTab === "love_compatibility" && (
            <motion.div
              key="love_compatibility"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <LoveCompatibility profile={currentProfile} />
            </motion.div>
          )}

          {activeTab === "archetype" && (
            <motion.div
              key="archetype"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <ArchetypeAnalysis profile={currentProfile} onBack={() => setActiveTab("home")} onSpend={handleSpend} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Persistent Tarot Tab - Always mounted for instant loading */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: activeTab === "tarot" ? 1 : 0,
            x: activeTab === "tarot" ? 0 : 20,
            pointerEvents: activeTab === "tarot" ? 'auto' : 'none',
            zIndex: activeTab === "tarot" ? 50 : -1
          }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 w-full h-full"
          style={{ visibility: activeTab === "tarot" || activeTab === "home" ? 'visible' : 'hidden' }} // Optimization: hide when far away, but keep visible during transition
        >
           <TarotReading 
             onBack={() => setActiveTab("home")} 
             onSpend={handleSpend} 
           />
        </motion.div>

        <AnimatePresence>
          {isEarning && (
            <EarnDust onComplete={handleEarn} onCancel={() => setIsEarning(false)} />
          )}
        </AnimatePresence>

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
          moonPhaseName={selectedTransit?.moonPhaseName}
          isRetrograde={selectedTransit?.isRetrograde}
          personalTransits={personalTransits}
          onShowTransits={(planetName) => {
            const planetKey = Object.keys(PLANET_KEY_TO_NAME).find(key => PLANET_KEY_TO_NAME[key] === planetName) || planetName;
            setTransitPlanetFilter(planetKey);
            setIsDailyTransitsOpen(true);
            setSelectedTransit(null);
          }}
        />

        <Dialog open={isRetrogradeListOpen} onOpenChange={setIsRetrogradeListOpen}>
          <DialogContent
            showCloseButton={false}
            className="max-w-[min(90vw,24rem)] w-full bg-black border-rose-900/50 backdrop-blur-2xl text-white rounded-[2rem] shadow-[0_0_50px_rgba(225,29,72,0.3)] p-0 overflow-hidden flex flex-col"
            style={{
              maxHeight: 'calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 2rem)',
              height: 'auto',
              top: 'calc(50% + env(safe-area-inset-top, 0px) / 2 - env(safe-area-inset-bottom, 0px) / 2)'
            }}
          >
            <div className="flex flex-col h-full max-h-[calc(100dvh-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px)-2rem)]">
              {/* Header */}
              <div className="flex-shrink-0 text-center border-b border-rose-900/30 p-4 pt-[calc(1rem+env(safe-area-inset-top,0px))]">
                <div className="flex items-center justify-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                  <h3 className="text-base font-black uppercase tracking-wide text-rose-500">
                    {t('activeRetrogrades')}
                  </h3>
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {retrogrades.map((r, i) => {
                  const matchingPlanet = currentTransits?.planets.find(p => p.planet === r.planet);
                  return (
                    <button
                      key={`retro-modal-${r.planet}-${i}`}
                      onClick={() => {
                        if (matchingPlanet) {
                          setIsRetrogradeListOpen(false);
                          handlePlanetClick(matchingPlanet);
                        }
                      }}
                      className="w-full flex items-center gap-4 p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 hover:bg-rose-900/30 transition-all group"
                    >
                      <div className="w-12 h-12 flex items-center justify-center text-rose-500 filter drop-shadow-[0_0_10px_rgba(225,29,72,0.4)] bg-black/50 rounded-full border border-rose-900/30">
                        <PlanetIcon name={r.planet} className="w-8 h-8" />
                      </div>
                      
                      <div className="flex-1 text-left">
                         <div className="flex items-center gap-2">
                           <span className="font-mystic font-bold text-rose-400 uppercase tracking-wider text-sm">{t(r.planet as any) || r.planet}</span>
                           <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold">Rx</span>
                         </div>
                         <div className="flex items-center gap-1 text-rose-400/60 text-xs uppercase tracking-widest mt-0.5">
                            <span className="font-bold">{r.sign}</span>
                            <span className="text-[10px] opacity-70">{language === 'tr' ? 'Burcunda' : 'in Sign'}</span>
                          </div>
                      </div>
                      
                      <div className="text-rose-500/50 group-hover:text-rose-500 transition-colors bg-black/30 p-2 rounded-full">
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Footer */}
              <div className="p-4 border-t border-rose-900/30 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
                <Button 
                  onClick={() => setIsRetrogradeListOpen(false)}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black uppercase tracking-widest shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                >
                  {t('close') || (language === 'tr' ? 'KAPAT' : 'CLOSE')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <DailyTransitsDialog
          key={`daily-transits-${language}`}
          isOpen={isDailyTransitsOpen}
          onClose={() => setIsDailyTransitsOpen(false)}
          date={new Date()}
          transits={personalTransits}
          initialPlanetFilter={transitPlanetFilter}
          subscriptionStatus={subscriptionStatus}
          onShowPremium={() => setShowPremiumModal(true)}
          onShowAd={handleShowAd}
          unlockedPlanets={unlockedPlanets}
        />

        <AdContentPopup
          isOpen={showAdPopup}
          onClose={() => setShowAdPopup(false)}
          onWatchAd={handleAdComplete}
          onOpenPremium={() => {
            setShowAdPopup(false);
            setShowPremiumModal(true);
          }}
        />

        <Dialog open={!!detailedTransit} onOpenChange={() => setDetailedTransit(null)}>
          <DialogContent
            showCloseButton={false}
            className="max-w-[min(90vw,24rem)] w-full bg-black border-white/10 backdrop-blur-2xl text-white rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,1)] p-0 overflow-hidden flex flex-col"
            style={{
              maxHeight: 'calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 2rem)',
              height: 'auto',
              top: 'calc(50% + env(safe-area-inset-top, 0px) / 2 - env(safe-area-inset-bottom, 0px) / 2)'
            }}
          >
            {detailedTransit && (
              <div className="flex flex-col h-full max-h-[calc(100dvh-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px)-2rem)]">
                {/* Fixed Header */}
                <div
                  className="flex-shrink-0 text-center border-b border-white/5"
                  style={{
                    padding: 'clamp(0.875rem, 3vw, 1rem)',
                    paddingTop: 'calc(clamp(0.875rem, 3vw, 1rem) + env(safe-area-inset-top, 0px))'
                  }}
                >
                  {(() => {
                    const headerJSON = getTransitInterpretationAsJSON(
                      detailedTransit.transitPlanetKey,
                      detailedTransit.natalPlanetKey,
                      detailedTransit.houseSign || (language === 'en' ? "Aries" : "Koç"),
                      detailedTransit.aspectType,
                      detailedTransit.house,
                      detailedTransit.state === 'APPLYING' ? 'applying' : 'separating',
                      language as 'tr' | 'en',
                      detailedTransit.effect
                    );
                    return (
                      <h3 className={`text-base font-black uppercase tracking-wide ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                        detailedTransit.effect === 'negative' ? 'text-rose-400' :
                          'text-amber-400'
                        }`}>
                        {headerJSON.headline}
                      </h3>
                    );
                  })()}
                </div>

                {/* Scrollable Content */}
                <div
                  className="flex-1 overflow-y-auto overscroll-contain min-h-0"
                  style={{
                    padding: 'clamp(0.75rem, 3vw, 1rem)',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex items-center gap-[clamp(0.5rem,2vw,0.75rem)]">
                      <div className="flex flex-col items-center gap-0">
                        <span className={`text-[8px] font-black uppercase tracking-widest ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                          detailedTransit.effect === 'negative' ? 'text-rose-400' :
                            'text-amber-400'
                          } mb-0.5`}>
                          {t('current')}
                        </span>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                          detailedTransit.effect === 'negative' ? 'text-rose-400' :
                            'text-amber-400'
                          } mb-1`}>
                          {PLANET_KEY_TO_NAME[detailedTransit.transitPlanetKey] || detailedTransit.transitPlanetKey}
                        </span>
                        <div className={`p-[clamp(0.5rem,2vw,0.75rem)] rounded-[1.5rem] bg-black border shadow-xl transition-all ${detailedTransit.effect === 'positive' ? 'border-emerald-400 shadow-emerald-400/20' :
                          detailedTransit.effect === 'negative' ? 'border-rose-500 shadow-rose-500/20' :
                            'border-amber-400 shadow-amber-400/20'
                          }`}>
                          <div className="w-[clamp(2rem,6vw,2.5rem)] h-[clamp(2rem,6vw,2.5rem)]">
                            <PlanetIcon name={PLANET_KEY_TO_NAME[detailedTransit.transitPlanetKey] || detailedTransit.transitPlanetKey} className="w-full h-full" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-[9px] font-black uppercase tracking-widest drop-shadow-[0_0_5px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                          detailedTransit.effect === 'negative' ? 'text-rose-500' :
                            'text-amber-400'
                          }`}>
                          {t(detailedTransit.aspectType as any) || detailedTransit.aspectType}
                        </span>
                        <span className={`text-[clamp(1.5rem,6vw,2rem)] font-black drop-shadow-[0_0_15px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                          detailedTransit.effect === 'negative' ? 'text-rose-500' :
                            'text-amber-400'
                          }`}>
                          {detailedTransit.aspectSymbol}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-0">
                        <span className={`text-[8px] font-black uppercase tracking-widest ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                          detailedTransit.effect === 'negative' ? 'text-rose-400' :
                            'text-amber-400'
                          } mb-0.5`}>
                          {t('natal')}
                        </span>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                          detailedTransit.effect === 'negative' ? 'text-rose-400' :
                            'text-amber-400'
                          } mb-1`}>
                          {PLANET_KEY_TO_NAME[detailedTransit.natalPlanetKey] || detailedTransit.natalPlanetKey}
                        </span>
                        <div className={`p-[clamp(0.5rem,2vw,0.75rem)] rounded-[1.5rem] bg-black border shadow-xl transition-all ${detailedTransit.effect === 'positive' ? 'border-emerald-400 shadow-emerald-400/20' :
                          detailedTransit.effect === 'negative' ? 'border-rose-500 shadow-rose-500/20' :
                            'border-amber-400 shadow-amber-400/20'
                          }`}>
                          <div className="w-[clamp(2rem,6vw,2.5rem)] h-[clamp(2rem,6vw,2.5rem)]">
                            <PlanetIcon name={PLANET_KEY_TO_NAME[detailedTransit.natalPlanetKey] || detailedTransit.natalPlanetKey} className="w-full h-full" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`flex w-full justify-between items-center px-3 py-2 rounded-xl bg-black text-sm border shadow-lg ${detailedTransit.effect === 'positive' ? 'border-emerald-400/40 shadow-emerald-400/10' :
                      detailedTransit.effect === 'negative' ? 'border-rose-500/40 shadow-rose-500/10' :
                        'border-amber-400/40 shadow-amber-400/10'
                      }`}>
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="text-[8px] text-white/40 uppercase tracking-[0.15em] font-black">{t('transitStatus')}</span>
                        <span className={`font-black text-[clamp(0.75rem,3vw,0.875rem)] uppercase tracking-tight drop-shadow-[0_0_8px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                          detailedTransit.effect === 'negative' ? 'text-rose-500' :
                            'text-amber-400'
                          }`}>{t('current')}</span>
                      </div>
                      <div className={`h-6 w-px shadow-[0_0_10px_currentColor] ${detailedTransit.effect === 'positive' ? 'bg-emerald-400 text-emerald-400' :
                        detailedTransit.effect === 'negative' ? 'bg-rose-500 text-rose-500' :
                          'bg-amber-400 text-amber-400'
                        }`} />
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="text-[8px] text-white/40 uppercase tracking-[0.15em] font-black">{t('position')}</span>
                        <span className={`font-black text-[clamp(0.75rem,3vw,0.875rem)] uppercase tracking-tight drop-shadow-[0_0_8px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                          detailedTransit.effect === 'negative' ? 'text-rose-500' :
                            'text-amber-400'
                          }`}>{formatHouseNumber(detailedTransit.house, language)}</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-left w-full">
                      <div className={`p-3 rounded-xl bg-black border transition-all space-y-2 shadow-lg ${detailedTransit.effect === 'positive' ? 'border-emerald-400/40 shadow-emerald-400/5' :
                        detailedTransit.effect === 'negative' ? 'border-rose-500/40 shadow-rose-500/5' :
                          'border-amber-400/40 shadow-amber-400/5'
                        }`}>
                        <h5 className={`text-[8px] font-black uppercase tracking-[0.2em] drop-shadow-[0_0_5px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                          detailedTransit.effect === 'negative' ? 'text-rose-500' :
                            'text-amber-400'
                          }`}>{t('cosmicComment')}</h5>
                        <p className={`text-xs leading-relaxed font-medium ${detailedTransit.effect === 'positive' ? 'text-emerald-400/90' :
                          detailedTransit.effect === 'negative' ? 'text-rose-600/90' :
                            'text-amber-400/90'
                          }`}>
                          {getCosmicComment(
                            detailedTransit.transitPlanetKey,
                            detailedTransit.house,
                            detailedTransit.aspectType,
                            language as 'tr' | 'en'
                          ) || getTransitInterpretation(
                            detailedTransit.transitPlanetKey,
                            detailedTransit.house,
                            detailedTransit.houseSign || (language === 'en' ? "Aries" : "Koç"),
                            detailedTransit.aspectType,
                            language as 'tr' | 'en',
                            detailedTransit.natalPlanetKey
                          )}
                        </p>
                      </div>

                      {(() => {
                        const interpretationJSON = getTransitInterpretationAsJSON(
                          detailedTransit.transitPlanetKey,
                          detailedTransit.natalPlanetKey,
                          detailedTransit.houseSign || (language === 'en' ? "Aries" : "Koç"),
                          detailedTransit.aspectType,
                          detailedTransit.house,
                          detailedTransit.state === 'APPLYING' ? 'applying' : 'separating',
                          language as 'tr' | 'en',
                          detailedTransit.effect
                        );
                        const slot = detailedTransit.effect === 'positive'
                          ? interpretationJSON.slots?.positive
                          : detailedTransit.effect === 'negative'
                            ? interpretationJSON.slots?.negative
                            : (interpretationJSON.slots?.positive || interpretationJSON.slots?.negative);

                        if (!slot) return null;

                        const isPositive = detailedTransit.effect === 'positive';
                        const isNegative = detailedTransit.effect === 'negative';
                        const slotBorderClass = isPositive ? 'border-emerald-400/30' : isNegative ? 'border-rose-500/30' : 'border-amber-400/30';
                        const slotBgClass = isPositive ? 'bg-emerald-950/20' : isNegative ? 'bg-rose-950/20' : 'bg-amber-950/20';
                        const slotTextClass = isPositive ? 'text-emerald-400' : isNegative ? 'text-rose-400' : 'text-amber-400';
                        const slotIconClass = isPositive ? 'text-emerald-400' : isNegative ? 'text-rose-400' : 'text-amber-400';

                        return (
                          <div className={`p-3 rounded-xl border ${slotBorderClass} ${slotBgClass} space-y-2`}>
                            <h5 className={`text-[8px] font-black uppercase tracking-[0.2em] ${slotTextClass} flex items-center gap-1.5`}>
                              {isPositive ? <TrendingUp className="w-3 h-3" /> : isNegative ? <TrendingDown className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                              {t('transitImpactDetails')}
                            </h5>

                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <div className={`mt-0.5 p-1 rounded-md ${slotBgClass}`}>
                                  <Activity className={`w-3 h-3 ${slotIconClass}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[8px] text-white/40 uppercase tracking-widest block mb-0.5">{t('behaviorPattern')}</span>
                                  <p className={`text-[11px] leading-relaxed ${slotTextClass}`}>{slot.behavior}</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-2">
                                <div className={`mt-0.5 p-1 rounded-md ${slotBgClass}`}>
                                  <Target className={`w-3 h-3 ${slotIconClass}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[8px] text-white/40 uppercase tracking-widest block mb-0.5">{t('expectedEffect')}</span>
                                  <p className={`text-[11px] leading-relaxed ${slotTextClass}`}>{slot.effect}</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-2">
                                <div className={`mt-0.5 p-1 rounded-md ${slotBgClass}`}>
                                  <Lightbulb className={`w-3 h-3 ${slotIconClass}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[8px] text-white/40 uppercase tracking-widest block mb-0.5">{t('suggestion')}</span>
                                  <p className={`text-[11px] leading-relaxed ${slotTextClass}`}>{slot.suggestion}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      <div className="grid grid-cols-2 gap-2">
                        <div className={`p-2 rounded-lg bg-black border flex flex-col gap-0.5 shadow-md ${detailedTransit.effect === 'positive' ? 'border-emerald-400/20' :
                          detailedTransit.effect === 'negative' ? 'border-rose-500/20' :
                            'border-amber-400/20'
                          }`}>
                          <span className="text-[7px] text-white/40 uppercase font-bold tracking-wider">{t('status')}</span>
                          <span className={`text-[10px] font-black drop-shadow-[0_0_5px_currentColor] ${detailedTransit.state === 'APPLYING'
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                            }`}>
                            {detailedTransit.state === 'APPLYING' ? t('effectIncreasing') : t('effectDecreasing')}
                          </span>
                        </div>
                        <div className={`p-2 rounded-lg bg-black border flex flex-col gap-0.5 shadow-md ${detailedTransit.effect === 'positive' ? 'border-emerald-400/20' :
                          detailedTransit.effect === 'negative' ? 'border-rose-500/20' :
                            'border-amber-400/20'
                          }`}>
                          <span className="text-[7px] text-white/40 uppercase font-bold tracking-wider">{t('orb')}</span>
                          <span className={`text-[10px] font-black drop-shadow-[0_0_5px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                            detailedTransit.effect === 'negative' ? 'text-rose-500' :
                              'text-amber-400'
                            }`}>
                            {detailedTransit.orb}°
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed Footer Button */}
                <div
                  className="flex-shrink-0 border-t border-white/5"
                  style={{
                    padding: 'clamp(0.75rem, 3vw, 1rem)',
                    paddingBottom: 'calc(clamp(0.75rem, 3vw, 1rem) + env(safe-area-inset-bottom, 0px))'
                  }}
                >
                  <Button
                    onClick={() => setDetailedTransit(null)}
                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-[0.15em] transition-all active:scale-95 shadow-xl ${detailedTransit.effect === 'positive' ? 'bg-emerald-400 hover:bg-emerald-300 text-emerald-950 shadow-emerald-400/40' :
                      detailedTransit.effect === 'negative' ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/40' :
                        'bg-amber-500 hover:bg-amber-400 text-amber-950 shadow-amber-500/40'
                      }`}
                  >
                    {t('gotCosmicMessage')}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="app-bottom-nav bg-gradient-to-t from-black via-black/98 to-black/90 backdrop-blur-2xl border-t border-white/5 z-50">
          <div className="max-w-md mx-auto app-bottom-nav-inner">
            <div className="flex justify-between items-center relative w-full">
              <NavButton
                icon={<Home />}
                label={t('navHome')}
                active={activeTab === "home"}
                onClick={() => { setActiveTab("home"); }}
                activeColor="mystic-gold"
              />
              <NavButton
                icon={<Moon />}
                label={t('navOracle')}
                active={activeTab === "tarot"}
                onClick={() => setActiveTab("tarot")}
                activeColor="purple"
              />
              <NavButton
                icon={<Sun />}
                label={t('navChart')}
                active={activeTab === "birthchart"}
                onClick={() => setActiveTab("birthchart")}
                activeColor="amber"
              />
              <NavButton
                icon={<Calendar />}
                label={t('navCalendar')}
                active={activeTab === "calendar"}
                onClick={() => {
                  setCalendarInitialDate(undefined);
                  setActiveTab("calendar");
                }}
                activeColor="emerald"
              />
              <NavButton
                icon={<Zap />}
                label={t('navArchetype')}
                active={activeTab === "archetype"}
                onClick={() => setActiveTab("archetype")}
                activeColor="cyan"
              />
              <NavButton
                icon={<Heart />}
                label={t('navCompatibility')}
                active={activeTab === "love_compatibility"}
                onClick={() => setActiveTab("love_compatibility")}
                activeColor="rose"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick, activeColor }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, activeColor?: string }) {
  const colorMap: Record<string, { text: string; bg: string; glow: string }> = {
    'mystic-gold': { text: 'text-mystic-gold', bg: 'bg-mystic-gold/15', glow: 'rgba(212, 175, 55, 0.4)' },
    'purple': { text: 'text-purple-400', bg: 'bg-purple-500/15', glow: 'rgba(168, 85, 247, 0.4)' },
    'amber': { text: 'text-amber-400', bg: 'bg-amber-500/15', glow: 'rgba(245, 158, 11, 0.4)' },
    'emerald': { text: 'text-emerald-400', bg: 'bg-emerald-500/15', glow: 'rgba(52, 211, 153, 0.4)' },
    'cyan': { text: 'text-cyan-400', bg: 'bg-cyan-500/15', glow: 'rgba(34, 211, 238, 0.4)' },
    'rose': { text: 'text-rose-400', bg: 'bg-rose-500/15', glow: 'rgba(251, 113, 133, 0.4)' },
  };

  const colors = colorMap[activeColor || 'mystic-gold'] || colorMap['mystic-gold'];
  const textColor = active ? colors.text : 'text-white/40';
  const bgColor = active ? colors.bg : '';
  const glowColor = active ? colors.glow : '';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-200 min-w-[52px] w-full h-[52px] ${textColor}`}
    >
      <div
        className={`p-1.5 rounded-xl transition-all duration-200 ${bgColor}`}
        style={active ? { boxShadow: `0 0 12px ${glowColor}` } : {}}
      >
        {React.cloneElement(icon as React.ReactElement<{ className?: string; strokeWidth?: number }>, {
          className: "w-[22px] h-[22px]",
          strokeWidth: active ? 2.5 : 1.5
        })}
      </div>
      <span className={`text-[10px] font-bold tracking-wide whitespace-nowrap leading-none transition-all ${active ? 'opacity-100' : 'opacity-60'}`}>
        {label}
      </span>
    </button>
  );
}
