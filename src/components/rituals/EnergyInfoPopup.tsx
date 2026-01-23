"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export type EnergyType = "mental" | "emotional" | "physical" | "spiritual";

interface EnergyInfo {
  titleKey: string;
  color: string;
  bgColor: string;
  planets: { key: string; name: string; enName: string; percentage: number; imagePath: string }[];
  relatedClass: string;
  relatedClassEn: string;
  descKey: string;
}

const ENERGY_DATA: Record<EnergyType, EnergyInfo> = {
  mental: {
    titleKey: 'energyMental',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400',
    planets: [
      { key: 'mercury', name: 'Merkür', enName: 'Mercury', percentage: 45.45, imagePath: '/assets/planets/merkur.png' },
      { key: 'uranus', name: 'Uranüs', enName: 'Uranus', percentage: 27.27, imagePath: '/assets/planets/uranus.png' },
      { key: 'jupiter', name: 'Jüpiter', enName: 'Jupiter', percentage: 13.64, imagePath: '/assets/planets/jupiter.png' },
      { key: 'saturn', name: 'Satürn', enName: 'Saturn', percentage: 13.64, imagePath: '/assets/planets/saturn.png' },
    ],
    relatedClass: 'Stratejistler',
    relatedClassEn: 'Strategists',
    descKey: 'mentalEnergyDesc',
  },
  emotional: {
    titleKey: 'energyEmotional',
    color: 'text-rose-400',
    bgColor: 'bg-rose-400',
    planets: [
      { key: 'moon', name: 'Ay', enName: 'Moon', percentage: 41.67, imagePath: '/assets/planets/ay.png' },
      { key: 'venus', name: 'Venüs', enName: 'Venus', percentage: 25.00, imagePath: '/assets/planets/venus.png' },
      { key: 'neptune', name: 'Neptün', enName: 'Neptune', percentage: 16.67, imagePath: '/assets/planets/neptun.png' },
      { key: 'pluto', name: 'Plüton', enName: 'Pluto', percentage: 16.67, imagePath: '/assets/planets/pluton.png' },
    ],
    relatedClass: 'Diplomatlar',
    relatedClassEn: 'Diplomats',
    descKey: 'emotionalEnergyDesc',
  },
  physical: {
    titleKey: 'energyPhysical',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500',
    planets: [
      { key: 'sun', name: 'Güneş', enName: 'Sun', percentage: 36.36, imagePath: '/assets/planets/gunes.png' },
      { key: 'mars', name: 'Mars', enName: 'Mars', percentage: 36.36, imagePath: '/assets/planets/mars.png' },
      { key: 'moon', name: 'Ay', enName: 'Moon', percentage: 13.64, imagePath: '/assets/planets/ay.png' },
      { key: 'pluto', name: 'Plüton', enName: 'Pluto', percentage: 13.64, imagePath: '/assets/planets/pluton.png' },
    ],
    relatedClass: 'Muhafızlar',
    relatedClassEn: 'Sentinels',
    descKey: 'physicalEnergyDesc',
  },
  spiritual: {
    titleKey: 'energySpiritual',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400',
    planets: [
      { key: 'neptune', name: 'Neptün', enName: 'Neptune', percentage: 29.63, imagePath: '/assets/planets/neptun.png' },
      { key: 'jupiter', name: 'Jüpiter', enName: 'Jupiter', percentage: 22.22, imagePath: '/assets/planets/jupiter.png' },
      { key: 'pluto', name: 'Plüton', enName: 'Pluto', percentage: 18.52, imagePath: '/assets/planets/pluton.png' },
      { key: 'sun', name: 'Güneş', enName: 'Sun', percentage: 14.81, imagePath: '/assets/planets/gunes.png' },
      { key: 'moon', name: 'Ay', enName: 'Moon', percentage: 14.81, imagePath: '/assets/planets/ay.png' },
    ],
    relatedClass: 'Vizyonerler',
    relatedClassEn: 'Visionaries',
    descKey: 'spiritualEnergyDesc',
  },
};

interface EnergyInfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  energyType: EnergyType;
}

export function EnergyInfoPopup({ isOpen, onClose, energyType }: EnergyInfoPopupProps) {
  const { t, language } = useLanguage();
  const data = ENERGY_DATA[energyType];

  const getButtonStyles = (type: EnergyType) => {
    switch (type) {
      case 'mental': return { bg: 'bg-blue-400', text: 'text-black' };
      case 'emotional': return { bg: 'bg-rose-400', text: 'text-black' };
      case 'physical': return { bg: 'bg-amber-500', text: 'text-black' };
      case 'spiritual': return { bg: 'bg-purple-400', text: 'text-black' };
      default: return { bg: 'bg-[#B8860B]', text: 'text-black' };
    }
  };

  const buttonStyles = getButtonStyles(energyType);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[101] max-w-md mx-auto max-h-[85vh] overflow-hidden"
          >
            <div className="bg-black border border-white/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] flex flex-col max-h-[85vh]">
              <div className="p-6 pb-4 space-y-4 overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="flex items-center justify-between">
                  <h3 className={`font-mystic text-xl uppercase tracking-[0.2em] ${data.color}`}>
                    {t(data.titleKey as any)}
                  </h3>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <X className="w-5 h-5 text-white/60" />
                  </button>
                </div>

                <div className="flex justify-center gap-12 py-4">
                  {data.planets
                    .sort((a, b) => b.percentage - a.percentage)
                    .slice(0, 2)
                    .map((planet, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <img
                          src={planet.imagePath}
                          alt={planet.name}
                          className="w-16 h-16 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        />
                        <span className={`text-xs font-black uppercase tracking-widest ${data.color}`}>
                          {language === 'en' ? planet.enName : planet.name}
                        </span>
                        <span className="text-white/80 text-xs font-bold">
                          %{planet.percentage.toFixed(2).replace('.00', '')}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="space-y-1 pt-2 border-t border-white/10">
                  <div className="text-[9px] text-white/60 uppercase tracking-[0.25em] font-black">
                    {t('relatedClass')}
                  </div>
                  <div className={`text-sm font-bold tracking-wide uppercase ${data.color}`}>
                    {language === 'en' ? data.relatedClassEn : data.relatedClass}
                  </div>
                </div>

                <p className="text-white text-[14px] leading-relaxed font-serif italic text-left font-semibold" style={{ textShadow: '0 0 20px rgba(255,255,255,0.15)' }}>
                  {t(data.descKey as any)}
                </p>
              </div>

              <div className="p-6 pt-3 border-t border-white/5 flex-shrink-0">
                <button
                  onClick={onClose}
                  className={`w-full ${buttonStyles.bg} ${buttonStyles.text} hover:opacity-90 font-black uppercase tracking-[0.2em] py-4 rounded-2xl text-xs transition-all active:scale-[0.98] shadow-lg`}
                >
                  {t('gotTheMessage')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
