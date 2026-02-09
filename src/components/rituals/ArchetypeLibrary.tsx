"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Brain, Heart, Zap, Ghost, BookOpen, Check, ChevronLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ARCHETYPES } from "@/lib/data/archetypes";
import { useLanguage } from "@/contexts/LanguageContext";

import { EnergyInfoPopup, type EnergyType } from "./EnergyInfoPopup";

const ENERGY_TYPES = [
  {
    id: "spiritual" as EnergyType,
    nameKey: "energySpiritual",
    descKey: "spiritualEnergyDesc",
    color: "text-purple-400",
    borderColor: "border-purple-400",
    pulseColor: "192, 132, 252",
    bgColor: "bg-purple-500/20",
    planets: [
      { emoji: "🔱", name: "Neptune", weight: 29 },
      { emoji: "♃", name: "Jupiter", weight: 22 },
      { emoji: "♇", name: "Pluto", weight: 19 },
      { emoji: "☉", name: "Sun", weight: 15 },
      { emoji: "☽", name: "Moon", weight: 15 },
    ],
    relatedClass: "VİZYONERLER",
    relatedClassEn: "VISIONARIES",
    relatedLetter: "R"
  },
  {
    id: "mental",
    nameKey: "energyMental",
    descKey: "mentalEnergyDesc",
    color: "text-blue-400",
    borderColor: "border-blue-400",
    pulseColor: "96, 165, 250",
    bgColor: "bg-blue-500/20",
    planets: [
      { emoji: "☿", name: "Mercury", weight: 45 },
      { emoji: "♅", name: "Uranus", weight: 27 },
      { emoji: "♃", name: "Jupiter", weight: 14 },
      { emoji: "♄", name: "Saturn", weight: 14 },
    ],
    relatedClass: "STRATEJİSTLER",
    relatedClassEn: "STRATEGISTS",
    relatedLetter: "Z"
  },
  {
    id: "physical",
    nameKey: "energyPhysical",
    descKey: "physicalEnergyDesc",
    color: "text-amber-500",
    borderColor: "border-amber-500",
    pulseColor: "245, 158, 11",
    bgColor: "bg-amber-500/20",
    planets: [
      { emoji: "☉", name: "Sun", weight: 36 },
      { emoji: "♂", name: "Mars", weight: 36 },
      { emoji: "☽", name: "Moon", weight: 14 },
      { emoji: "♇", name: "Pluto", weight: 14 },
    ],
    relatedClass: "MUHAFIZLAR",
    relatedClassEn: "SENTINELS",
    relatedLetter: "F"
  },
  {
    id: "emotional",
    nameKey: "energyEmotional",
    descKey: "emotionalEnergyDesc",
    color: "text-rose-400",
    borderColor: "border-rose-400",
    pulseColor: "251, 113, 133",
    bgColor: "bg-rose-500/20",
    planets: [
      { emoji: "☽", name: "Moon", weight: 41 },
      { emoji: "♀", name: "Venus", weight: 25 },
      { emoji: "🔱", name: "Neptune", weight: 17 },
      { emoji: "♇", name: "Pluto", weight: 17 },
    ],
    relatedClass: "DİPLOMATLAR",
    relatedClassEn: "DIPLOMATS",
    relatedLetter: "D"
  },
];

const CATEGORIES_KEYS = [
  {
    id: "VİZYONERLER",
    nameKey: "visionaries",
    descKey: "visionariesDesc",
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
    activeBg: "bg-purple-700",
    activeBorder: "border-purple-700",
    glow: "shadow-[0_0_20px_rgba(126,34,206,0.4)]",
    icon: <Ghost className="w-4 h-4" />
  },
  {
    id: "STRATEJİSTLER",
    nameKey: "strategists",
    descKey: "strategistsDesc",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    activeBg: "bg-blue-700",
    activeBorder: "border-blue-700",
    glow: "shadow-[0_0_20px_rgba(29,78,216,0.4)]",
    icon: <Brain className="w-4 h-4" />
  },
  {
    id: "MUHAFIZLAR",
    nameKey: "sentinels",
    descKey: "sentinelsDesc",
    color: "text-amber-700",
    bgColor: "bg-amber-700/10",
    activeBg: "bg-amber-700",
    activeBorder: "border-amber-700",
    glow: "shadow-[0_0_20px_rgba(180,83,9,0.4)]",
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: "DİPLOMATLAR",
    nameKey: "diplomats",
    descKey: "diplomatsDesc",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    activeBg: "bg-pink-600",
    activeBorder: "border-pink-600",
    glow: "shadow-[0_0_20px_rgba(219,39,119,0.4)]",
    icon: <Heart className="w-4 h-4" />
  }
];

const SQUARE_IMAGE_KEYS = ["Z-R-F-D", "F-D-Z-R", "Z-F-D-R", "R-F-D-Z", "R-D-F-Z", "R-D-Z-F", "R-Z-D-F", "Z-F-R-D", "Z-D-R-F"];

interface ArchetypeLibraryProps {
  userArchetypeKey?: string;
  onBack: () => void;
  mode?: "system" | "library";
  onStartDiscovery?: () => void;
}

export function ArchetypeLibrary({ userArchetypeKey, onBack, mode = "system", onStartDiscovery }: ArchetypeLibraryProps) {
  const { t, language } = useLanguage();
  const [selectedArchetype, setSelectedArchetype] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<"light" | "shadow" | null>("light");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [revealedArchetype, setRevealedArchetype] = useState(false);
  const [selectedEnergy, setSelectedEnergy] = useState<typeof ENERGY_TYPES[0] | null>(null);

  const filteredArchetypes = useMemo(() => {
    const all = Object.entries(ARCHETYPES);
    if (activeCategory === "ALL") return all;
    return all.filter(([_, arch]) => arch.group === activeCategory);
  }, [activeCategory]);

  const handleDiscoveryClick = () => {
    setRevealedArchetype(true);
    if (onStartDiscovery) {
      onStartDiscovery();
    }
  };

  const getLocalizedArchetypeData = (arch: any) => {
    if (language === 'en') {
      return {
        ...arch,
        name: arch.enName || arch.name,
        description: arch.enDescription || arch.description,
        light: arch.enLight || arch.light,
        shadow: arch.enShadow || arch.shadow,
        className: arch.enClassName || arch.className, // Fallback to TR if EN missing
        group: arch.enGroup || arch.group
      };
    }
    return arch;
  };

  return (
    <div className="flex-1 flex flex-col relative min-h-screen bg-mystic-blue/95 overflow-y-auto pb-20 scrollbar-hide pt-[env(safe-area-inset-top)] w-full">
      <div className="star-field absolute inset-0 opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="px-4 pt-4 space-y-6 w-full">
        <div className="flex items-center justify-between relative">
          <Button variant="ghost" onClick={onBack} className="p-0 hover:bg-transparent absolute left-0 z-10">
            <ChevronLeft className="w-6 h-6 text-mystic-gold/60" />
          </Button>
          <h2 className="font-mystic text-xl text-mystic-gold uppercase tracking-[0.2em] text-center w-full">
            {mode === "system" ? t('systemTitle') : t('libraryTitle')}
          </h2>
        </div>

        {mode === "system" && (
          <div
            className="bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-4 animate-fade-in-up"
          >
            <div className="flex items-center gap-2 text-mystic-gold">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-[10px] font-black uppercase tracking-widest">{t('aboutSystem')}</h4>
            </div>
            <p className="text-white text-[16px] leading-relaxed font-serif italic text-left font-semibold" style={{ textShadow: '0 0 20px rgba(255,255,255,0.15)' }}>
              {t('aboutSystemDesc')}
            </p>
          </div>
        )}

        {mode === "system" && (
          <div className="grid grid-cols-4 gap-2 mt-4">
            {ENERGY_TYPES.map((energy) => (
              <button
                key={energy.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedEnergy(energy);
                }}
                className={`flex flex-col items-center justify-center py-3 px-1 rounded-xl bg-black border ${energy.borderColor} transition-transform animate-pulse-colored active:scale-95`}
                style={{ '--pulse-color': energy.pulseColor } as React.CSSProperties}
              >
                <span className={`text-[10px] font-black uppercase tracking-wider ${energy.color}`}>
                  {t(energy.nameKey as any)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {mode === "system" ? (

        /* SYSTEM VIEW: Single Filterable List */
        <div className="mt-8 flex flex-col flex-1 w-full">
          <div className="px-4 flex flex-col gap-6 w-full">
            {onStartDiscovery && (
              <Button
                onClick={handleDiscoveryClick}
                className="w-full bg-mystic-gold hover:bg-mystic-gold/90 text-black border-none shadow-none font-black uppercase tracking-[0.2em] py-5 rounded-2xl text-xs transition-transform animate-pulse-gold active:scale-[0.98]"
              >
                {t('whatIsYourArchetype')}
              </Button>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-mystic text-sm uppercase tracking-[0.2em] text-mystic-gold/80">
                  {t('archetypes')}
                </h3>
              </div>

              {/* Category Filter Buttons */}
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-4 px-4 w-[calc(100%+2rem)]">
                <button
                  onClick={() => setActiveCategory("ALL")}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${activeCategory === "ALL" ? "bg-mystic-gold border-mystic-gold text-black" : "bg-white/5 border-white/10 text-white/40"
                    }`}
                >
                  {t('all')}
                </button>
                {CATEGORIES_KEYS.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${activeCategory === cat.id
                      ? `${cat.activeBg} ${cat.activeBorder} text-white`
                      : "bg-white/5 border-white/10 text-white/40"
                      }`}
                  >
                    {t(cat.nameKey as any)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-12 mt-6 scrollbar-hide w-full">
            {filteredArchetypes.map(([key, rawArch]) => {
              const arch = getLocalizedArchetypeData(rawArch);
              const isUserArchetype = key === userArchetypeKey;
              const shouldHighlight = isUserArchetype && revealedArchetype;
              const category = CATEGORIES_KEYS.find(c => c.id === arch.group);
              const categoryBorder = category ? category.activeBorder : 'border-white/10';
              const categoryGlow = category ? category.glow : 'shadow-2xl';

              return (
                <div
                  key={key}
                  className="relative flex-shrink-0 w-[85%] md:w-[280px] aspect-[4/5] snap-center animate-fade-in-up"
                >
                  <div
                    onClick={() => setSelectedArchetype({ ...arch, key })}
                    className={`w-full h-full rounded-[2.5rem] overflow-hidden cursor-pointer border transition-transform animate-pulse-gold active:scale-[0.98] ${shouldHighlight
                      ? 'border-mystic-gold ring-4 ring-mystic-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.6)] z-20'
                      : `${categoryBorder} ${categoryGlow}`
                      } bg-black/40`}
                  >
                    <img
                      src={arch.image}
                      alt={arch.name}
                      className={`w-full h-full object-cover opacity-70 ${(key === 'R-D-Z-F' || key === 'R-D-F-Z') ? 'object-[center_30%]' : 'object-[center_15%]'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                      {shouldHighlight && (
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="bg-mystic-gold text-mystic-blue text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" />
                            {t('yourArchetype')}
                          </div>
                        </div>
                      )}

                      <div className="space-y-0.5">
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block">
                          {key}
                        </span>
                        <h4 className="text-lg font-mystic text-white leading-tight uppercase gold-text">
                          {arch.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* LIBRARY VIEW: 4 Classes with descriptions */
        <div className="mt-8 flex flex-col flex-1 space-y-12 w-full">
          {CATEGORIES_KEYS.map((category) => {
            const categoryArchetypes = Object.entries(ARCHETYPES).filter(([_, arch]) => arch.group === category.id);

            return (
              <div key={category.id} className="space-y-4 w-full">
                <div className="px-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={category.color}>{category.icon}</span>
                    <h4 className={`font-mystic text-xs uppercase tracking-[0.2em] ${category.color}`}>
                      {t(category.nameKey as any)}
                    </h4>
                  </div>
                  <p className="text-white text-[13px] leading-relaxed font-serif italic font-semibold" style={{ textShadow: '0 0 15px rgba(255,255,255,0.15)' }}>
                    {t(category.descKey as any)}
                  </p>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 scrollbar-hide w-full">
                  {categoryArchetypes.map(([key, rawArch]) => {
                    const arch = getLocalizedArchetypeData(rawArch);
                    const isUserArchetype = key === userArchetypeKey;
                    const shouldHighlight = isUserArchetype; // In library mode, highlight if it's user's archetype

                    return (
                      <div
                        key={key}
                        onClick={() => setSelectedArchetype({ ...arch, key })}
                        className={`relative flex-shrink-0 w-[85%] md:w-[280px] aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-pointer border transition-transform animate-pulse-gold active:scale-[0.98] snap-center ${shouldHighlight
                          ? 'border-mystic-gold ring-4 ring-mystic-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.6)] z-20'
                          : `${category.activeBorder} ${category.glow}`
                          } bg-black/40`}
                      >
                        <img
                          src={arch.image}
                          alt={arch.name}
                          className={`w-full h-full object-cover opacity-70 ${(key === 'R-D-Z-F' || key === 'R-D-F-Z') ? 'object-[center_30%]' : 'object-[center_15%]'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                          {shouldHighlight && (
                            <div className="flex items-center gap-1.5 mb-2">
                              <div className="bg-mystic-gold text-mystic-blue text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1">
                                <Check className="w-2.5 h-2.5" />
                                {t('yourArchetype')}
                              </div>
                            </div>
                          )}

                          <div className="space-y-0.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block">
                              {key}
                            </span>
                            <h4 className="text-lg font-mystic text-white leading-tight uppercase gold-text">
                              {arch.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      <Dialog open={!!selectedArchetype} onOpenChange={() => setSelectedArchetype(null)}>
        <DialogContent className="max-w-md w-[90vw] bg-black/95 border-mystic-gold/20 backdrop-blur-2xl text-white p-0 rounded-[2.5rem] overflow-hidden max-h-[90vh]">
          {selectedArchetype && (
            <div className="flex flex-col overflow-y-auto scrollbar-hide max-h-[85vh]">
              <div className="relative w-[50%] mx-auto mt-6 rounded-[2rem] overflow-hidden bg-black/50 flex-shrink-0">
                <img
                  src={SQUARE_IMAGE_KEYS.includes(selectedArchetype.key) ? selectedArchetype.image : (selectedArchetype.imageFull || selectedArchetype.image)}
                  alt={selectedArchetype.name}
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <Button
                variant="ghost"
                onClick={() => setSelectedArchetype(null)}
                className="absolute top-4 right-4 rounded-full bg-black/40 backdrop-blur-md p-2 hover:bg-black/60 z-20"
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="px-8 pt-4 pb-0 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20">
                    {selectedArchetype.key}
                  </div>
                  <div className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20">
                    {selectedArchetype.group}
                  </div>
                </div>
                <h2 className="text-3xl font-mystic gold-text leading-none uppercase">
                  {selectedArchetype.name}
                </h2>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">
                  {selectedArchetype.className}
                </p>
              </div>

              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-mystic-gold">
                    <BookOpen className="w-4 h-4" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">{t('characterAnalysis')}</h4>
                  </div>
                  <p className="text-white text-[16px] leading-relaxed font-serif text-left italic font-semibold" style={{ textShadow: '0 0 20px rgba(255,255,255,0.15)' }}>
                    {selectedArchetype.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className={`overflow-hidden transition-all duration-300 rounded-[2rem] border ${activeSection === 'light' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'}`}>
                    <button
                      onClick={() => setActiveSection(activeSection === 'light' ? null : 'light')}
                      className="w-full px-6 py-5 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeSection === 'light' ? 'bg-emerald-500 text-mystic-blue' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${activeSection === 'light' ? 'text-emerald-400' : 'text-white/40'}`}>{t('lightSide')}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${activeSection === 'light' ? 'rotate-180 bg-white/5' : ''}`}>
                        <ChevronLeft className="w-3 h-3 text-white/40 -rotate-90" />
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
                            {selectedArchetype.light.split(/\n/).filter(Boolean).map((line: string, idx: number) => (
                              <div key={idx} className="flex gap-3 text-white group/item items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                                <p className="text-[15px] leading-relaxed font-serif italic font-semibold" style={{ textShadow: '0 0 15px rgba(255,255,255,0.15)' }}>
                                  {line.replace(/^[•\-\s]+/, '').trim().split(' ').map(word => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR')).join(' ')}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 rounded-[2rem] border ${activeSection === 'shadow' ? 'bg-rose-500/10 border-rose-500/30' : 'bg-white/5 border-white/10'}`}>
                    <button
                      onClick={() => setActiveSection(activeSection === 'shadow' ? null : 'shadow')}
                      className="w-full px-6 py-5 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeSection === 'shadow' ? 'bg-rose-500 text-mystic-blue' : 'bg-rose-500/20 text-rose-400'}`}>
                          <Ghost className="w-4 h-4" />
                        </div>
                        <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${activeSection === 'shadow' ? 'text-rose-400' : 'text-white/40'}`}>{t('shadowSide')}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${activeSection === 'shadow' ? 'rotate-180 bg-white/5' : ''}`}>
                        <ChevronLeft className="w-3 h-3 text-white/40 -rotate-90" />
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
                            {selectedArchetype.shadow.split(/\n/).filter(Boolean).map((line: string, idx: number) => (
                              <div key={idx} className="flex gap-3 text-white group/item items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(251,113,133,0.6)]" />
                                <p className="text-[15px] leading-relaxed font-serif italic font-semibold" style={{ textShadow: '0 0 15px rgba(255,255,255,0.15)' }}>
                                  {line.replace(/^[•\-\s]+/, '').trim().split(' ').map(word => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR')).join(' ')}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/10">
                  {selectedArchetype.key.split("-").map((code: string, i: number) => {
                    const icons: any = { "R": <Ghost className="w-3 h-3" />, "Z": <Brain className="w-3 h-3" />, "F": <Zap className="w-3 h-3" />, "D": <Heart className="w-3 h-3" /> };
                    const labels: any = { "R": t('elementSpirit'), "Z": t('elementMind'), "F": t('elementBody'), "D": t('elementEmotion') };
                    return (
                      <div key={i} className="flex flex-col items-center gap-2 opacity-90">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          {icons[code]}
                        </div>
                        <span className="text-[8px] font-black uppercase">{labels[code]}</span>
                      </div>
                    );
                  })}
                </div>

                <Button
                  onClick={() => setSelectedArchetype(null)}
                  className="w-full bg-white/5 hover:bg-white/10 text-white/60 font-black uppercase tracking-widest py-6 rounded-2xl border border-white/10"
                >
                  {t('close')}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <EnergyInfoPopup
        isOpen={!!selectedEnergy}
        onClose={() => setSelectedEnergy(null)}
        energyType={(selectedEnergy?.id || 'mental') as EnergyType}
      />
    </div>
  );
}

