"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ChevronDown, Loader2, PlayCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PersonalTransit } from "@/lib/transit-engine";
import { PlanetIcon } from "../ui/PlanetIcon";
import { getTransitInterpretation, getTransitInterpretationAsJSON, TransitInterpretationJSON, TransitSlot } from "@/lib/data/transit-interpretations";
import { getPlanetTransitInterpretation } from "@/lib/transit-interpretations";
import { getCosmicComment } from "@/lib/cosmic-comments";
import { formatHouseNumber } from "@/lib/transit-interpretations";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle, CheckCircle, Target, Lightbulb, TrendingUp, TrendingDown, Activity } from "lucide-react";

interface DailyTransitsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  transits: PersonalTransit[];
  initialPlanetFilter?: string | null;
  profile?: any;
  subscriptionStatus?: string;
  onShowPremium?: () => void;
  onShowAd?: (planetKey: string) => void;
  unlockedPlanets?: string[];
}

export function DailyTransitsDialog({
  isOpen,
  onClose,
  date,
  transits,
  initialPlanetFilter,
  profile,
  subscriptionStatus,
  onShowPremium,
  onShowAd,
  unlockedPlanets = []
}: DailyTransitsDialogProps) {
  const { t, language } = useLanguage();
  const [filters, setFilters] = useState<string[]>(["positive", "neutral", "negative"]);
  const [detailedTransit, setDetailedTransit] = useState<PersonalTransit | null>(null);
  const [aiInterpretations, setAiInterpretations] = useState<Record<string, string>>({});
  const [loadingAI, setLoadingAI] = useState<string | null>(null);

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

  const filteredTransits = transits.filter(t => {
    const matchesEffect = filters.includes(t.effect || "neutral");
    const matchesPlanet = initialPlanetFilter
      ? t.transitPlanetKey === initialPlanetFilter || t.natalPlanetKey === initialPlanetFilter
      : true;
    return matchesEffect && matchesPlanet;
  });

  const planetTransits = initialPlanetFilter
    ? transits.filter(t => t.transitPlanetKey === initialPlanetFilter || t.natalPlanetKey === initialPlanetFilter)
    : [];
  const posCount = planetTransits.filter(t => t.effect === 'positive').length;
  const negCount = planetTransits.filter(t => t.effect === 'negative').length;

  const themeColor = initialPlanetFilter ? (posCount > negCount ? "emerald" : negCount > posCount ? "rose" : "amber") : "amber";
  const borderClass = themeColor === "emerald" ? "border-emerald-500 shadow-emerald-500/20" : themeColor === "rose" ? "border-rose-500 shadow-rose-500/20" : "border-white/10";
  const titleColorClass = themeColor === "emerald" ? "text-emerald-500" : themeColor === "rose" ? "text-rose-500" : "text-mystic-gold";

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
  }, [detailedTransit, profile, language]);

  const toggleFilter = (filter: string) => {
    setFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const getTransitStatusLabel = (selectedDate: Date, transit: PersonalTransit) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCompare = new Date(selectedDate);
    dateToCompare.setHours(0, 0, 0, 0);

    if (dateToCompare.getTime() === today.getTime()) return t('current');
    if (dateToCompare.getTime() < today.getTime()) return t('past');
    return t('future');
  };

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

  const handleTransitClick = (transit: PersonalTransit) => {
    setDetailedTransit(transit);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className={`max-w-sm bg-black backdrop-blur-2xl text-white overflow-y-auto max-h-[90vh] custom-scrollbar rounded-[2rem] border shadow-2xl ${borderClass}`} style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}>
          <DialogHeader>
            <DialogTitle className={`font-mystic text-xl flex items-center justify-between ${titleColorClass}`}>
              <span>{t('dailyTransits')}</span>
            </DialogTitle>
            <p className="text-[10px] text-white/40 uppercase tracking-widest text-left">
              {date.toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex gap-1.5">
                {["positive", "neutral", "negative"].map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFilter(f)}
                    className={`px-2.5 py-1 rounded-full text-[9px] font-black border transition-all uppercase tracking-wider ${filters.includes(f)
                      ? f === "positive" ? "bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]" :
                        f === "negative" ? "bg-rose-500/20 border-rose-400 text-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.4)]" :
                          "bg-amber-500/20 border-amber-400 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]"
                      : "bg-white/5 border-white/10 text-white/30"
                      }`}
                  >
                    {f === "positive" ? t('positive') : f === "negative" ? t('negative') : t('neutral')}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {filteredTransits.length > 0 ? (
                filteredTransits.map((transit, i) => {
                  const statusLabel = getTransitStatusLabel(date, transit);
                  // Strict Premium: No blur, no lock icon, but click triggers premium
                  const isLocked = subscriptionStatus !== 'premium';

                  return (
                      <button
                        key={`daily-transit-${transit.transitPlanetKey}-${transit.natalPlanetKey}-${transit.aspectType}-${i}`}
                        onClick={() => {
                          if (isLocked && !initialPlanetFilter) {
                            if (onShowPremium) {
                              onShowPremium();
                            }
                            return;
                          }

                          handleTransitClick(transit);
                        }}
                        className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all min-h-[130px] relative overflow-hidden bg-black shadow-lg ${transit.effect === 'positive' ? 'border-emerald-400 shadow-emerald-400/20' :
                        transit.effect === 'negative' ? 'border-rose-500 shadow-rose-500/20' :
                          'border-amber-400 shadow-amber-400/20'
                        }`}
                    >
                      <div className={`w-full h-full flex flex-col items-center justify-center gap-1 transition-all duration-300`}>
                        <div className="flex items-center gap-2 w-full justify-center text-[8px] font-black uppercase tracking-wide">
                          <span className={`${transit.effect === 'positive' ? 'text-emerald-400/80' :
                            transit.effect === 'negative' ? 'text-rose-400/80' :
                              'text-amber-400/80'
                            }`}>{PLANET_KEY_TO_NAME[transit.transitPlanetKey]?.substring(0, 4) || transit.transitPlanetKey.substring(0, 4)}</span>
                          <span className="text-white/30">×</span>
                          <span className={`${transit.effect === 'positive' ? 'text-emerald-400/80' :
                            transit.effect === 'negative' ? 'text-rose-400/80' :
                              'text-amber-400/80'
                            }`}>{PLANET_KEY_TO_NAME[transit.natalPlanetKey]?.substring(0, 4) || transit.natalPlanetKey.substring(0, 4)}</span>
                        </div>
                        <div className="flex items-center gap-2 w-full justify-center">
                          <div className="w-9 h-9">
                            <PlanetIcon name={transit.transitPlanetKey} className="w-full h-full" />
                          </div>
                          <span className={`text-2xl font-bold drop-shadow-[0_0_8px_currentColor] ${transit.effect === 'positive' ? 'text-emerald-400' :
                            transit.effect === 'negative' ? 'text-rose-500' :
                              'text-amber-400'
                            }`}>{transit.aspectSymbol}</span>
                          <div className="w-9 h-9">
                            <PlanetIcon name={transit.natalPlanetKey} className="w-full h-full" />
                          </div>
                        </div>
                        <div className="flex w-full justify-between items-center text-[9px] px-2 absolute bottom-2 left-0 right-0">
                          <span className={`uppercase tracking-widest font-black drop-shadow-[0_0_5px_currentColor] ${transit.effect === 'positive' ? 'text-emerald-400' :
                            transit.effect === 'negative' ? 'text-rose-500' :
                              'text-amber-400'
                            }`}>{statusLabel}</span>
                          <span className={`font-black whitespace-nowrap truncate max-w-[50%] ${transit.effect === 'positive' ? 'text-emerald-400' :
                            transit.effect === 'negative' ? 'text-rose-500' :
                              'text-amber-400'
                            }`}>{formatHouseNumber(transit.house, language)}</span>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="col-span-2 py-8 text-center">
                  <p className="text-white/40 text-xs italic">{t('noTransitsFound')}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!detailedTransit} onOpenChange={() => setDetailedTransit(null)}>
        <DialogContent
          className="max-w-[min(92vw,24rem)] bg-black border-white/10 backdrop-blur-2xl text-white p-0 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          style={{
            maxHeight: 'calc(100vh - 80px)',
            height: 'auto'
          }}
        >
          {detailedTransit && (
            <div className="flex flex-col h-full min-h-0">
              <div className="flex-shrink-0 px-4 pt-5 pb-3 border-b border-white/5 bg-black rounded-t-[2rem]">
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
                    <h3 className={`text-base font-black uppercase tracking-wide text-center ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                      detailedTransit.effect === 'negative' ? 'text-rose-400' :
                        'text-amber-400'
                      }`}>
                      {headerJSON.headline}
                    </h3>
                  );
                })()}
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4 space-y-3" style={{ WebkitOverflowScrolling: 'touch', overflowY: 'scroll', touchAction: 'pan-y' }}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-[8px] font-black uppercase tracking-widest ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                        detailedTransit.effect === 'negative' ? 'text-rose-400' :
                          'text-amber-400'
                        }`}>
                        {PLANET_KEY_TO_NAME[detailedTransit.transitPlanetKey] || detailedTransit.transitPlanetKey}
                      </span>
                      <div className={`p-2 rounded-xl bg-black border shadow-lg transition-all ${detailedTransit.effect === 'positive' ? 'border-emerald-400 shadow-emerald-400/20' :
                        detailedTransit.effect === 'negative' ? 'border-rose-500 shadow-rose-500/20' :
                          'border-amber-400 shadow-amber-400/20'
                        }`}>
                        <div className="w-10 h-10">
                          <PlanetIcon name={detailedTransit.transitPlanetKey} className="w-full h-full" />
                        </div>
                      </div>
                    </div>
                    <span className={`text-3xl font-black drop-shadow-[0_0_15px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                      detailedTransit.effect === 'negative' ? 'text-rose-500' :
                        'text-amber-400'
                      }`}>
                      {detailedTransit.aspectSymbol}
                    </span>
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-[8px] font-black uppercase tracking-widest ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                        detailedTransit.effect === 'negative' ? 'text-rose-400' :
                          'text-amber-400'
                        }`}>
                        {PLANET_KEY_TO_NAME[detailedTransit.natalPlanetKey] || detailedTransit.natalPlanetKey}
                      </span>
                      <div className={`p-2 rounded-xl bg-black border shadow-lg transition-all ${detailedTransit.effect === 'positive' ? 'border-emerald-400 shadow-emerald-400/20' :
                        detailedTransit.effect === 'negative' ? 'border-rose-500 shadow-rose-500/20' :
                          'border-amber-400 shadow-amber-400/20'
                        }`}>
                        <div className="w-10 h-10">
                          <PlanetIcon name={detailedTransit.natalPlanetKey} className="w-full h-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`flex w-full justify-between items-center px-4 py-3 rounded-2xl bg-black text-sm border shadow-lg ${detailedTransit.effect === 'positive' ? 'border-emerald-400/40 shadow-emerald-400/10' :
                  detailedTransit.effect === 'negative' ? 'border-rose-500/40 shadow-rose-500/10' :
                    'border-amber-400/40 shadow-amber-400/10'
                  }`}>
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-black">{t('transitStatus')}</span>
                    <span className={`font-black text-[clamp(0.875rem,3.5vw,1.125rem)] uppercase tracking-tight drop-shadow-[0_0_8px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
                      detailedTransit.effect === 'negative' ? 'text-rose-500' :
                        'text-amber-400'
                      }`}>{getTransitStatusLabel(date, detailedTransit)}</span>
                  </div>
                  <div className={`h-8 w-px shadow-[0_0_10px_currentColor] ${detailedTransit.effect === 'positive' ? 'bg-emerald-400' :
                    detailedTransit.effect === 'negative' ? 'bg-rose-500' :
                      'bg-amber-400'
                    }`} />
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-black">{t('position')}</span>
                    <span className={`font-black text-[clamp(0.875rem,3.5vw,1.125rem)] uppercase tracking-tight drop-shadow-[0_0_8px_currentColor] ${detailedTransit.effect === 'positive' ? 'text-emerald-400' :
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
                        detailedTransit.effect === 'negative' ? 'text-rose-400/90' :
                          'text-amber-400/90'
                        }`}>
                        {(() => {
                          // Try to get interpretation from cosmic comments (transit-pop-up.json)
                          const cosmicComment = getCosmicComment(
                            detailedTransit.transitPlanetKey,
                            detailedTransit.house,
                            detailedTransit.aspectType,
                            language as 'tr' | 'en'
                          );

                          if (cosmicComment) return cosmicComment;

                          // Try to get specific aspect interpretation from new Excel data
                          const excelInterpretation = getPlanetTransitInterpretation(
                            detailedTransit.transitPlanetKey,
                            detailedTransit.house,
                            detailedTransit.houseSign || (language === 'en' ? "Aries" : "Koç"),
                            detailedTransit.effect, // Use effect from transit (positive/negative/neutral)
                            false, // isRetrograde - usually not false for transits but detailedTransit doesn't seem to have it easily, assume false for now or check state
                            language as 'tr' | 'en'
                          );

                          // Priority: Cosmic Comment > Excel Interpretation > AI Interpretation > Old Static Interpretation
                          return excelInterpretation || getActiveAIInterpretation() || getTransitInterpretation(
                            detailedTransit.transitPlanetKey,
                            detailedTransit.house,
                            detailedTransit.houseSign || (language === 'en' ? "Aries" : "Koç"),
                            detailedTransit.aspectType,
                            language as 'tr' | 'en',
                            detailedTransit.natalPlanetKey
                          );
                        })()}
                      </p>
                    )}
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
                      <div className={`p-4 rounded-2xl border ${slotBorderClass} ${slotBgClass} space-y-3`}>
                        <h5 className={`text-[9px] font-black uppercase tracking-[0.3em] ${slotTextClass} flex items-center gap-2`}>
                          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : isNegative ? <TrendingDown className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
                          {t('transitImpactDetails')}
                        </h5>

                        <div className="space-y-2.5">
                          <div className="flex items-start gap-2.5">
                            <div className={`mt-0.5 p-1 rounded-lg ${slotBgClass}`}>
                              <Activity className={`w-3.5 h-3.5 ${slotIconClass}`} />
                            </div>
                            <div>
                              <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5">{t('behaviorPattern')}</span>
                              <p className={`text-xs leading-relaxed ${slotTextClass}`}>{slot.behavior}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5">
                            <div className={`mt-0.5 p-1 rounded-lg ${slotBgClass}`}>
                              <Target className={`w-3.5 h-3.5 ${slotIconClass}`} />
                            </div>
                            <div>
                              <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5">{t('expectedEffect')}</span>
                              <p className={`text-xs leading-relaxed ${slotTextClass}`}>{slot.effect}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5">
                            <div className={`mt-0.5 p-1 rounded-lg ${slotBgClass}`}>
                              <Lightbulb className={`w-3.5 h-3.5 ${slotIconClass}`} />
                            </div>
                            <div>
                              <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5">{t('suggestion')}</span>
                              <p className={`text-xs leading-relaxed ${slotTextClass}`}>{slot.suggestion}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

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
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 px-4 py-4 border-t border-white/5 bg-black rounded-b-[2rem]">
                <Button
                  onClick={() => setDetailedTransit(null)}
                  className={`w-full py-3 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl ${detailedTransit.effect === 'positive' ? 'bg-emerald-400 hover:bg-emerald-300 text-emerald-950 shadow-emerald-400/40' :
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
    </>
  );
}
