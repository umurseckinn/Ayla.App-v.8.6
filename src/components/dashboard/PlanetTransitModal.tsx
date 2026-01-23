"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Zap, Droplets, Wind, Flame, Loader2 } from "lucide-react";
import { PlanetIcon } from "../ui/PlanetIcon";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { getPlanetSignAIInterpretation, getMoonPhaseAIInterpretation, getPlanetTransitInterpretation } from "@/lib/transit-interpretations";
import { ZodiacImage } from "../ui/ZodiacImage";
import { ElementModal } from "./ElementModal";
import { useLanguage } from "@/contexts/LanguageContext";

interface PlanetTransitModalProps {
  isOpen: boolean;
  onClose: () => void;
  planetName: string;
  planetSign: string;
  house: number | null;
  interpretation: string;
  isMoon?: boolean;
  moonPhaseEmoji?: string;
  moonPhase?: string;
  moonPhaseName?: string;
  isRetrograde?: boolean;
  onShowTransits?: (planet: string) => void;
  profile?: any;
  personalTransits?: any[];
}

const PLANET_NAME_TO_KEY: Record<string, string> = {
  "Güneş": "Sun",
  "Ay": "Moon",
  "Merkür": "Mercury",
  "Venüs": "Venus",
  "Mars": "Mars",
  "Jüpiter": "Jupiter",
  "Satürn": "Saturn",
  "Uranüs": "Uranus",
  "Neptün": "Neptune",
  "Plüton": "Pluto"
};

const PLANET_KEY_TO_NAME_TR: Record<string, string> = {
  "Sun": "Güneş",
  "Moon": "Ay",
  "Mercury": "Merkür",
  "Venus": "Venüs",
  "Mars": "Mars",
  "Jupiter": "Jüpiter",
  "Saturn": "Satürn",
  "Uranus": "Uranüs",
  "Neptune": "Neptün",
  "Pluto": "Plüton"
};

export function PlanetTransitModal({
  isOpen,
  onClose,
  planetName,
  planetSign,
  house,
  interpretation,
  isMoon,
  moonPhaseEmoji,
  moonPhase,
  moonPhaseName,
  isRetrograde = false,
  onShowTransits,
  profile,
  personalTransits = []
}: PlanetTransitModalProps) {
  const { t, language } = useLanguage();
  const [selectedElement, setSelectedElement] = useState<{
    name: string;
    signs: string[];
    title: string;
    description: string;
  } | null>(null);

  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const planetKey = PLANET_NAME_TO_KEY[planetName] || planetName;
  const planetTransits = (personalTransits || []).filter(t => t.transitPlanetKey === planetKey);
  const posCount = planetTransits.filter(t => t.effect === 'positive').length;
  const negCount = planetTransits.filter(t => t.effect === 'negative').length;
  const effectType: "positive" | "negative" | "neutral" = posCount > negCount ? "positive" : negCount > posCount ? "negative" : "neutral";

  const themeColor = effectType === "positive" ? "emerald" : effectType === "negative" ? "rose" : "amber";
  const themeClass = themeColor === "emerald" ? "emerald" : themeColor === "rose" ? "rose" : "amber";

  const colorHex = themeColor === "emerald" ? "#10b981" : themeColor === "rose" ? "#f43f5e" : "#fbbf24";
  const borderClass = themeColor === "emerald" ? "border-emerald-500 shadow-emerald-500/20" : themeColor === "rose" ? "border-rose-500 shadow-rose-500/20" : "border-amber-400 shadow-amber-400/20";
  const textClass = themeColor === "emerald" ? "text-emerald-500" : themeColor === "rose" ? "text-rose-500" : "text-amber-400";
  const bgClass = themeColor === "emerald" ? "bg-emerald-950/40" : themeColor === "rose" ? "bg-rose-950/40" : "bg-amber-950/40";

  const dynamicInterpretation = isMoon ? interpretation : getPlanetTransitInterpretation(planetName, house, planetSign, effectType, isRetrograde, language as 'tr' | 'en');


  useEffect(() => {
    if (isOpen && !isMoon) {
      const fetchAI = async () => {
        setLoadingAI(true);
        try {
          const transit = {
            transitPlanet: language === 'en' ? (planetKey) : (PLANET_KEY_TO_NAME_TR[planetKey] || planetName),
            transitPlanetKey: planetKey,
            aspectType: "conjunction",
            house: house || 1,
            houseSign: planetSign
          };
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
            setAiInterpretation(data.interpretation);
          }
        } catch (error) {
          console.error('AI fetch error:', error);
        } finally {
          setLoadingAI(false);
        }
    };
    fetchAI();
  }
}, [isOpen, planetName, planetSign, house, isMoon, profile, language]);

  const aiInfo: any = isMoon && moonPhase
    ? getMoonPhaseAIInterpretation(moonPhase, language as 'tr' | 'en')
    : getPlanetSignAIInterpretation(planetKey, planetSign, isRetrograde, language as 'tr' | 'en');


  const elementData: Record<string, { signs: string[]; title: string; description: string }> = {
    "Ateş": {
      signs: [t('aries') || "Koç", t('leo') || "Aslan", t('sagittarius') || "Yay"],
      title: t('elementFireTitle'),
      description: t('elementFireDesc')
    },
    "Toprak": {
      signs: [t('taurus') || "Boğa", t('virgo') || "Başak", t('capricorn') || "Oğlak"],
      title: t('elementEarthTitle'),
      description: t('elementEarthDesc')
    },
    "Hava": {
      signs: [t('gemini') || "İkizler", t('libra') || "Terazi", t('aquarius') || "Kova"],
      title: t('elementAirTitle'),
      description: t('elementAirDesc')
    },
    "Su": {
      signs: [t('cancer') || "Yengeç", t('scorpio') || "Akrep", t('pisces') || "Balık"],
      title: t('elementWaterTitle'),
      description: t('elementWaterDesc')
    }
  };

  const elementSigns: Record<string, string> = {
    "Ateş": `(${t('aries') || "KOÇ"}, ${t('leo') || "ASLAN"}, ${t('sagittarius') || "YAY"})`,
    "Toprak": `(${t('taurus') || "BOĞA"}, ${t('virgo') || "BAŞAK"}, ${t('capricorn') || "OĞLAK"})`,
    "Hava": `(${t('gemini') || "İKİZLER"}, ${t('libra') || "TERAZİ"}, ${t('aquarius') || "KOVA"})`,
    "Su": `(${t('cancer') || "YENGEÇ"}, ${t('scorpio') || "AKREP"}, ${t('pisces') || "BALIK"})`
  };

  const elementIcons: Record<string, React.ReactElement> = {
    "Ateş": <Flame className="w-4 h-4 text-white" />,
    "Toprak": <Zap className="w-4 h-4 text-white" />,
    "Hava": <Wind className="w-4 h-4 text-white" />,
    "Su": <Droplets className="w-4 h-4 text-white" />
  };

  const getLocalizedElementName = (element: string) => {
    switch (element) {
      case "Ateş": return t('elementFire').toUpperCase();
      case "Toprak": return t('elementEarth').toUpperCase();
      case "Hava": return t('elementAir').toUpperCase();
      case "Su": return t('elementWater').toUpperCase();
      default: return element.toUpperCase();
    }
  };

  return (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-xl"
              onClick={onClose}
            >
              <div 
                className="flex-1 flex flex-col items-center justify-center px-3 py-4 min-h-0 overflow-hidden"
                style={{
                  paddingTop: 'calc(var(--sat, env(safe-area-inset-top, 0px)) + 0.75rem)',
                  paddingBottom: 'calc(var(--sab, env(safe-area-inset-bottom, 0px)) + 0.75rem)'
                }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className={`w-full max-w-sm relative rounded-[2rem] shadow-2xl border bg-black flex flex-col ${borderClass}`}
                  style={{ 
                    maxHeight: 'calc(100vh - var(--sat, env(safe-area-inset-top, 0px)) - var(--sab, env(safe-area-inset-bottom, 0px)) - 3rem)'
                  }}
                  onClick={e => e.stopPropagation()}
                >
                    <div className="flex-shrink-0 relative px-4 pb-2 pt-5">
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${themeClass}-500/50 to-transparent`} />
                    <button
                      id="tutorial-transit-close"
                      onClick={onClose}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-white/50 hover:bg-white/10 transition-colors z-20"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <div className="text-center pb-2">
                      <h2 className={`text-lg font-mystic tracking-[0.15em] uppercase ${textClass}`}>
                        {t(planetKey as any) || planetName} {isRetrograde && `(${t('retro')})`}
                      </h2>
                    </div>
                  </div>

                  <div 
                    className="flex-1 overflow-y-auto overscroll-contain px-4 min-h-0"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                  >
                <div className="flex flex-col items-center text-center space-y-3 pb-4">
                  <div id="tutorial-transit-details" className="relative w-full max-w-[220px] h-24 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse bg-${themeClass}-900/30`} />

                    {isMoon ? (
                      <div className="relative z-10 flex items-center justify-center">
                        <div className="text-4xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                          {moonPhaseEmoji || "🌙"}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <div className="relative z-10 w-14 h-14 flex items-center justify-center">
                          <div className="w-full h-full p-1">
                            <PlanetIcon name={planetKey} className={`w-full h-full filter drop-shadow-[0_0_30px_${colorHex}80]`} />
                          </div>
                        </div>
                        <div className="relative z-10 w-14 h-14 flex items-center justify-center">
                          <ZodiacImage sign={planetSign} size={56} />
                        </div>
                      </div>
                    )}
                  </div>


                  <div className="space-y-1">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-sm text-white/80 font-serif">
                          {isMoon && moonPhaseName ? (
                            <>
                              {t('currentMoonPhase').split('{phase}')[0]}
                              <span className={textClass}>{moonPhaseName}</span>
                              {t('currentMoonPhase').split('{phase}')[1]}
                            </>
                          ) : (
                            <>
                              {t('currentPlanetSign').split('{sign}')[0]}
                              <span className={textClass}>{planetSign}</span>
                              {t('currentPlanetSign').split('{sign}')[1]}
                            </>
                          )}
                        </p>
                      </div>
                      {house && (
                        <div className="flex items-center justify-center">
                          <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-mystic uppercase tracking-wider ${bgClass} border-${themeClass}-900/40 ${textClass}`}>
                            {t('planetInHouse', { house })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full space-y-3">
                    <Card className={`p-4 relative overflow-hidden text-left border bg-black shadow-lg ${borderClass}`}>
                    <div className="absolute -top-4 -right-4 opacity-5">
                      <Sparkles className={`w-20 h-20 ${textClass}`} />
                    </div>
                    <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2 ${textClass}`}>
                      <Sparkles className="w-3.5 h-3.5" /> {t('cosmicGuidance')}
                    </h4>
                    <div className="space-y-3 relative z-10">
                      {loadingAI ? (
                        <div className="flex flex-col items-center justify-center py-6 gap-3">
                          <Loader2 className="w-6 h-6 animate-spin text-mystic-gold" />
                          <p className="text-[10px] text-white/40 uppercase tracking-widest animate-pulse">{t('starsAreWhispering')}</p>
                        </div>
                      ) : isRetrograde ? (
                        aiInfo.retrogradeComment && (
                          <p className="text-rose-500 text-sm md:text-base leading-relaxed font-bold border-l-2 border-rose-500 pl-3">
                            {aiInfo.retrogradeComment}
                          </p>
                        )
                      ) : (
                          <div className="space-y-3">
                            {aiInfo.comment && (
                              <p className="text-white/95 text-sm md:text-base leading-relaxed">
                                {aiInfo.comment}
                              </p>
                            )}
                            {dynamicInterpretation && !aiInfo.comment?.includes(dynamicInterpretation) && (
                              <p className="text-white/90 text-xs md:text-sm italic leading-relaxed border-t border-white/5 pt-2">
                                {dynamicInterpretation}
                              </p>
                            )}
                          </div>
                      )}

                      {onShowTransits && (
                        <div className="pt-3 border-t border-white/5">
                          <Button
                            variant="outline"
                            onClick={() => onShowTransits(planetName)}
                            className={`w-full h-10 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all bg-black ${borderClass} ${textClass} hover:shadow-[0_0_25px_${colorHex}cc] hover:scale-[1.02] active:scale-[0.98]`}
                          >
                            {t('whatDoesThisMean')}
                          </Button>
                        </div>
                      )}

                    </div>
                  </Card>

                  <div className="space-y-2 text-left">
                    <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 px-1 ${textClass}`}>
                      <Zap className="w-3.5 h-3.5" /> {t('elementEffects')}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(aiInfo.elements).map(([element, effect]: [string, any]) => {
                        if (isRetrograde && (!aiInfo.retrogradeElements || !aiInfo.retrogradeElements[element])) return null;

                        const elementNeonStyle = isRetrograde
                          ? "border-rose-500 shadow-rose-500/20"
                          : element === "Ateş" ? "border-orange-500 shadow-orange-500/20"
                            : element === "Toprak" ? "border-amber-500 shadow-amber-500/20"
                              : element === "Hava" ? "border-cyan-400 shadow-cyan-400/20"
                                : "border-teal-400 shadow-teal-400/20";

                        return (
                          <div
                            key={element}
                            className={`p-3 border rounded-2xl flex flex-col gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] bg-black ${elementNeonStyle}`}
                            onClick={() => {
                              const data = elementData[element];
                              if (data) {
                                setSelectedElement({
                                  name: element,
                                  ...data
                                });
                              }
                            }}
                          >
                          <div className="flex items-start gap-3">
                                <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${isRetrograde ? "bg-rose-950/30" : "bg-white/5"}`}>
                                  {isRetrograde ? React.cloneElement(elementIcons[element], { className: "w-4 h-4 text-rose-500" } as any) : elementIcons[element]}
                                </div>
                                <div>
                                  <span className="text-[9px] uppercase tracking-widest block mb-0.5" style={{ color: "#ffffff", fontWeight: "800" }}>
                                    {getLocalizedElementName(element)} {elementSigns[element]}
                                  </span>
                                  {!isRetrograde && <p className="text-[11px] leading-relaxed text-white/95">{effect}</p>}
                                  {aiInfo.retrogradeElements && aiInfo.retrogradeElements[element] && (
                                    <p className="text-[11px] leading-relaxed font-bold mt-1 text-rose-500">
                                      {aiInfo.retrogradeElements[element]}
                                    </p>
                                  )}
                                </div>
                              </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  </div>
                </div>
              </div>

                  <div className="flex-shrink-0 px-4 pt-2 pb-4">
                    <Button
                    onClick={onClose}
                    className={`w-full h-14 text-sm font-mystic rounded-2xl shadow-lg bg-${themeClass}-500 text-black hover:bg-${themeClass}-400 shadow-${themeClass}-900/20`}
                    style={{ backgroundColor: colorHex }}
                  >
                    {isRetrograde ? t('gotTheWarning') : t('gotTheMessage')}
                  </Button>
                </div>
              </motion.div>
              </div>
            </motion.div>
          )}
        <ElementModal
          isOpen={!!selectedElement}
          onClose={() => setSelectedElement(null)}
          elementName={selectedElement?.name || ""}
          signs={selectedElement?.signs || []}
          title={selectedElement?.title || ""}
          description={selectedElement?.description || ""}
        />
      </AnimatePresence>
  );
}
