"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Heart, Zap, Ghost, BookOpen, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const MotionButton = motion(Button);

import { calculateBirthChart } from "@/lib/astronomy-service";
import { calculateEnergyPotential } from "@/lib/energy-potential-service";
import { ARCHETYPES } from "@/lib/data/archetypes";
import { ArchetypeLibrary } from "./ArchetypeLibrary";
import { ShareArchetypeModal } from "./ShareArchetypeModal";
import { AYLA_IMAGE as CONSTANT_AYLA_IMAGE } from "@/lib/constants";
import { Share2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EnergyInfoPopup } from "@/components/rituals/EnergyInfoPopup";
import type { EnergyType } from "@/components/rituals/EnergyInfoPopup";
import { safeLocalStorage } from "@/lib/safe-utils";
import { useInView } from "@/hooks/useInView";

const AYLA_IMAGE = CONSTANT_AYLA_IMAGE || "/assets/ayla/ayla_character.png";

const SQUARE_IMAGE_KEYS = ["Z-R-F-D", "F-D-Z-R", "Z-F-D-R", "R-F-D-Z", "R-D-F-Z", "R-D-Z-F", "R-Z-D-F", "Z-F-R-D", "Z-D-R-F"];

const PulsingShareButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
  const { ref, isInView } = useInView<HTMLButtonElement>({ threshold: 0.1 });
  
  return (
    <MotionButton
      ref={ref}
      onClick={onClick}
      className={`w-full bg-mystic-gold hover:bg-mystic-gold/90 text-black border-none shadow-none font-black uppercase tracking-[0.2em] py-5 rounded-2xl text-xs transition-all flex items-center justify-center gap-3 overflow-hidden brightness-110 ${isInView ? 'animate-pulse-gold' : ''}`}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-center gap-3 animate-pulse-scale">
        {children}
      </div>
    </MotionButton>
  );
};

const capitalizeEveryWord = (str: string, locale: string = 'tr-TR') => {
  return str
    .split(' ')
    .filter(Boolean)
    .map(word => {
      if (word.length === 0) return word;
      // Handle words starting with punctuation like (Word)
      let firstCharIndex = 0;
      while (firstCharIndex < word.length && !/[a-zA-ZçğıöşüÇĞİÖŞÜ]/.test(word[firstCharIndex])) {
        firstCharIndex++;
      }
      if (firstCharIndex >= word.length) return word.toLocaleLowerCase(locale);

      const prefix = word.slice(0, firstCharIndex);
      const mainPart = word.slice(firstCharIndex);
      return prefix + mainPart.charAt(0).toLocaleUpperCase(locale) + mainPart.slice(1).toLocaleLowerCase(locale);
    })
    .join(' ');
};

export function ArchetypeAnalysis({ profile, onBack, onSpend }: { profile: any, onBack: () => void, onSpend: (amount: number) => void }) {
  const { t, language } = useLanguage();
  const [view, setView] = useState<"intro" | "result">("intro");
  const [energyData, setEnergyData] = useState<any>(null);
  const [archetype, setArchetype] = useState<any>(null);
  const [chart, setChart] = useState<any>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [archetypeKey, setArchetypeKey] = useState<string>("");
  const [hasCalculatedBefore, setHasCalculatedBefore] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<"light" | "shadow" | null>("light");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyType | null>(null);

  const currentLocale = language === 'en' ? 'en-US' : 'tr-TR';

  useEffect(() => {
    const seen = safeLocalStorage.getItem("ayla_archetype_intro_seen");
    if (seen === "true") {
      setHasCalculatedBefore(true);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      const birthChart = calculateBirthChart(
        new Date(profile.birth_date),
        profile.birth_time || "12:00",
        profile.latitude || 41.0082,
        profile.longitude || 28.9784
      );
      setChart(birthChart);
    }
  }, [profile]);

  useEffect(() => {
    if (chart) {
      const energy = calculateEnergyPotential(chart);
      setEnergyData(energy);

      const categories = [
        { id: "D", value: energy.categories.emotional.percentage },
        { id: "F", value: energy.categories.physical.percentage },
        { id: "R", value: energy.categories.spiritual.percentage },
        { id: "Z", value: energy.categories.mental.percentage }
      ];

      const sorted = [...categories].sort((a, b) => {
        if (b.value !== a.value) return b.value - a.value;
        return a.id.localeCompare(b.id);
      });

      const hierarchyKey = sorted.map(c => c.id).join("-");
      setArchetypeKey(hierarchyKey);
      setArchetype(ARCHETYPES[hierarchyKey] || ARCHETYPES["R-Z-F-D"]);
    }
  }, [chart]);

  const handleStartDiscovery = () => {
    if (!hasCalculatedBefore) {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setHasCalculatedBefore(true);
        safeLocalStorage.setItem("ayla_archetype_intro_seen", "true");
        setView("result");
      }, 3000);
    } else {
      setView("result");
    }
  };

  if (isCalculating) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-mystic-blue/95 p-8 text-center space-y-8 min-h-screen">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] border border-mystic-gold/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] border border-mystic-gold/5 rounded-full"
          />
          <img
            src={AYLA_IMAGE}
            alt="Ayla"
            className="w-40 h-40 relative z-10 animate-pulse ayla-isolated"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-mystic text-xl text-mystic-gold uppercase tracking-[0.2em] animate-pulse">{t('calculatingEnergies')}</h3>
          <p className="text-[11px] text-white/50 italic font-serif max-w-[240px] mx-auto">
            {t('calculatingEnergiesDesc')}
          </p>
        </div>
      </div>
    );
  }

  if (view === "intro" || showLibrary) {
    return (
      <ArchetypeLibrary
        userArchetypeKey={hasCalculatedBefore ? archetypeKey : undefined}
        onBack={showLibrary ? () => setShowLibrary(false) : onBack}
        mode={showLibrary ? "library" : "system"}
        onStartDiscovery={showLibrary ? undefined : handleStartDiscovery}
      />
    );
  }

  return (
    <div
      className="flex-1 flex flex-col relative overflow-y-auto scrollbar-hide"
    >
      <div className="star-field absolute inset-0 opacity-10 pointer-events-none" />

      <div className="w-full max-w-md mx-auto relative z-10 flex flex-col">
        {/* Header */}
        <header className="app-header mb-2 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setView("intro")}
            className="text-mystic-gold absolute left-4"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h2 className="font-mystic text-base text-mystic-gold uppercase tracking-[0.2em]">{t('navYourArchetype')}</h2>
        </header>


        <div className="px-4 flex-1 space-y-4 pb-4">
          {/* Archetype Info Header */}
          <div className="text-center space-y-1.5">
            <p className="text-mystic-gold/60 text-[10px] font-black uppercase tracking-[0.3em]">
              {language === 'en' ? archetype?.enGroup : archetype?.group} • {archetypeKey}
            </p>
            <h3 className="font-mystic text-3xl gold-text leading-tight uppercase tracking-tight">
              {language === 'en' ? archetype?.enName : archetype?.name}
            </h3>
            <p className="text-white/40 text-[14px] uppercase tracking-[0.25em] font-bold">
              {language === 'en' ? archetype?.enClassName : archetype?.className}
            </p>
          </div>

          {/* Dynamic Visual Area - Maximized */}
          <div className="relative group">
            <div className="relative w-[85%] mx-auto rounded-[2.5rem] overflow-hidden bg-black shadow-[0_0_50px_rgba(255,215,0,0.15)] border-2 border-mystic-gold/30">
              {archetype && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <img
                    src={SQUARE_IMAGE_KEYS.includes(archetypeKey) ? archetype.image : (archetype.imageFull || archetype.image)}
                    alt={archetype.name}
                    className="w-full h-auto object-contain scale-[1.05] py-6"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Archetype Buttons */}
          <div className="space-y-3 pt-2">
            <PulsingShareButton onClick={() => setIsShareModalOpen(true)}>
              <Share2 className="w-4 h-4" />
              {t('shareArchetype')}
            </PulsingShareButton>

            <Button
              onClick={() => setShowLibrary(true)}
              className="w-full bg-mystic-gold hover:bg-mystic-gold/90 text-black border-none shadow-none font-black uppercase tracking-[0.2em] py-5 rounded-2xl text-xs transition-all active:translate-y-0.5 flex items-center justify-center gap-3"
            >
              <BookOpen className="w-4 h-4" />
              {t('archetypeLibrary')}
            </Button>
          </div>

          {archetype && energyData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Energy Stats Grid */}
              <div className="grid grid-cols-2 gap-3 px-1">
                <MiniStat label={t('spiritual')} value={energyData.categories.spiritual.percentage} icon={<Ghost className="w-4 h-4" />} color="text-purple-400" onClick={() => setSelectedEnergy('spiritual')} />
                <MiniStat label={t('mental')} value={energyData.categories.mental.percentage} icon={<Brain className="w-4 h-4" />} color="text-blue-400" onClick={() => setSelectedEnergy('mental')} />
                <MiniStat label={t('physical')} value={energyData.categories.physical.percentage} icon={<Zap className="w-4 h-4" />} color="text-amber-400" onClick={() => setSelectedEnergy('physical')} />
                <MiniStat label={t('emotional')} value={energyData.categories.emotional.percentage} icon={<Heart className="w-4 h-4" />} color="text-rose-400" onClick={() => setSelectedEnergy('emotional')} />
              </div>

              {/* Character Analysis */}
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-5 space-y-2">
                <div className="flex items-center gap-2 text-mystic-gold">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="text-[11px] font-black uppercase tracking-widest">{t('characterAnalysis')}</h4>
                </div>
                <p className="text-white text-[16px] leading-relaxed font-serif italic text-left font-semibold" style={{ textShadow: '0 0 20px rgba(255,255,255,0.15)' }}>
                  {language === 'en' ? archetype.enDescription : archetype.description}
                </p>
              </div>

              {/* Light & Shadow Accordion */}
              <div className="space-y-2">
                {/* Light Side */}
                <div className={`overflow-hidden transition-all duration-300 rounded-[2rem] border ${activeSection === 'light' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'}`}>
                  <button
                    onClick={() => setActiveSection(activeSection === 'light' ? null : 'light')}
                    className="w-full px-6 py-5 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeSection === 'light' ? 'bg-emerald-500 text-mystic-blue' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-[0.25em] transition-colors ${activeSection === 'light' ? 'text-emerald-400' : 'text-white/40'}`}>{t('lightSide')}</span>
                    </div>
                    <div className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${activeSection === 'light' ? 'rotate-180 bg-white/5' : ''}`}>
                      <ChevronLeft className="w-3.5 h-3.5 text-white/40 -rotate-90" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeSection === 'light' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 space-y-3">
                          {(() => {
                            const lightText = language === 'en' ? archetype.enLight : archetype.light;
                            const items = lightText.includes('\n')
                              ? lightText.split('\n').filter(Boolean)
                              : lightText.split(/[,،]\s*/).filter(Boolean);
                            return items.map((line: string, idx: number) => (
                              <div key={idx} className="flex gap-3 text-white group/item items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                                <p className="text-[15px] leading-relaxed font-serif italic font-semibold" style={{ textShadow: '0 0 15px rgba(255,255,255,0.15)' }}>
                                  {capitalizeEveryWord(line.replace(/^[•\-\s]+/, '').trim(), currentLocale)}
                                </p>
                              </div>
                            ));
                          })()}
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Shadow Side */}
                <div className={`overflow-hidden transition-all duration-300 rounded-[2rem] border ${activeSection === 'shadow' ? 'bg-rose-500/10 border-rose-500/30' : 'bg-white/5 border-white/10'}`}>
                  <button
                    onClick={() => setActiveSection(activeSection === 'shadow' ? null : 'shadow')}
                    className="w-full px-6 py-5 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeSection === 'shadow' ? 'bg-rose-500 text-mystic-blue' : 'bg-rose-500/20 text-rose-400'}`}>
                        <Ghost className="w-4 h-4" />
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-[0.25em] transition-colors ${activeSection === 'shadow' ? 'text-rose-400' : 'text-white/40'}`}>{t('shadowSide')}</span>
                    </div>
                    <div className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${activeSection === 'shadow' ? 'rotate-180 bg-white/5' : ''}`}>
                      <ChevronLeft className="w-3.5 h-3.5 text-white/40 -rotate-90" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeSection === 'shadow' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 space-y-3">
                          {(() => {
                            const shadowText = language === 'en' ? archetype.enShadow : archetype.shadow;
                            const items = shadowText.includes('\n')
                              ? shadowText.split('\n').filter(Boolean)
                              : shadowText.split(/[,،]\s*/).filter(Boolean);
                            return items.map((line: string, idx: number) => (
                              <div key={idx} className="flex gap-3 text-white group/item items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0 shadow-[0_0_10px_rgba(251,113,133,0.6)]" />
                                <p className="text-[15px] leading-relaxed font-serif italic font-semibold" style={{ textShadow: '0 0 15px rgba(255,255,255,0.15)' }}>
                                  {capitalizeEveryWord(line.replace(/^[•\-\s]+/, '').trim(), currentLocale)}
                                </p>
                              </div>
                            ));
                          })()}
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Extra bottom spacer to ensure scrollability past nav bar */}
              <div className="h-40" />
            </motion.div>
          )}
        </div>
      </div>

      <ShareArchetypeModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        archetype={archetype}
        energyData={energyData}
        archetypeKey={archetypeKey}
        initialUserName={profile?.full_name}
      />

      <EnergyInfoPopup
        isOpen={selectedEnergy !== null}
        onClose={() => setSelectedEnergy(null)}
        energyType={selectedEnergy || 'mental'}
      />
    </div>
  );
}


function MiniStat({ label, value, icon, color, onClick }: { label: string, value: number, icon: React.ReactNode, color: string, onClick?: () => void }) {
  const fontColorMap: Record<string, string> = {
    'text-purple-400': 'text-purple-400',
    'text-blue-400': 'text-blue-400',
    'text-amber-400': 'text-amber-400',
    'text-rose-400': 'text-rose-400',
  };
  const bgColorMap: Record<string, string> = {
    'text-purple-400': 'bg-purple-400',
    'text-blue-400': 'bg-blue-400',
    'text-amber-400': 'bg-amber-400',
    'text-rose-400': 'bg-rose-400',
  };
  return (
    <button
      onClick={onClick}
      className="bg-black border border-white/10 rounded-2xl p-3 flex flex-col gap-2 shadow-xl hover:border-white/20 transition-colors cursor-pointer"
    >
      <div className={`flex items-center justify-between text-[9px] uppercase tracking-widest font-black ${fontColorMap[color] || color}`}>
        <span className="flex items-center gap-1.5">{icon} {label}</span>
        <span className={`font-bold ${fontColorMap[color] || color}`}>%{value}</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${bgColorMap[color] || 'bg-white'}`}
        />
      </div>
    </button>
  );
}
