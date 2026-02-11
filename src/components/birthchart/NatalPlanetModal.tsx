"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Zap } from "lucide-react";
import { PlanetIcon } from "../ui/PlanetIcon";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ZodiacImage } from "../ui/ZodiacImage";
import { useLanguage } from "@/contexts/LanguageContext";

const signMapTrToEn: Record<string, string> = {
  "Koç": "Aries",
  "Boğa": "Taurus",
  "İkizler": "Gemini",
  "Yengeç": "Cancer",
  "Aslan": "Leo",
  "Başak": "Virgo",
  "Terazi": "Libra",
  "Akrep": "Scorpio",
  "Yay": "Sagittarius",
  "Oğlak": "Capricorn",
  "Kova": "Aquarius",
  "Balık": "Pisces",
  "Bilinmiyor": "Unknown"
};

interface NatalPlanetModalProps {
  isOpen: boolean;
  onClose: () => void;
  planetName: string;
  planetSign: string;
  interpretation: string;
}

export function NatalPlanetModal({
  isOpen,
  onClose,
  planetName,
  planetSign,
  interpretation
}: NatalPlanetModalProps) {
  const { t, language } = useLanguage();

  const getTranslatedSign = (sign: string): string => {
    if (language === 'en') {
      return signMapTrToEn[sign] || sign;
    }
    return sign;
  };

  const birthText = language === 'en' 
    ? <>At birth, in <span className="text-mystic-gold">{getTranslatedSign(planetSign)}</span></>
    : <>Doğumunda <span className="text-mystic-gold">{planetSign}</span> Burcundaydı</>;

  const cosmicLegacyText = language === 'en' ? 'Your Personal Cosmic Legacy' : 'Kişisel Kozmik Mirasın';
  const understoodText = language === 'en' ? 'Got it' : 'Anladım';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <div 
            className="flex-1 flex items-center justify-center px-4 overflow-hidden"
            style={{
              paddingTop: 'max(1rem, env(safe-area-inset-top))',
              paddingBottom: 'max(1rem, env(safe-area-inset-bottom))'
            }}
          >
            <div 
              className="w-full max-w-md bg-black relative rounded-3xl border border-mystic-gold p-6 md:p-8 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mystic-gold/50 to-transparent" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-white/50 hover:bg-white/10 transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col space-y-6 overflow-hidden">
                <div id="natal-planet-details" className="relative w-full h-32 shrink-0 flex items-center justify-center gap-4">
                  <div className="absolute inset-0 bg-mystic-gold/10 rounded-full blur-3xl animate-pulse" />
                  
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 w-24 h-24 flex items-center justify-center p-2"
                  >
                    <PlanetIcon 
                      name={planetName} 
                      className={`w-full h-full filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] ${
                        (planetName === "Satürn" || planetName === "Saturn") ? "scale-[1.8]" : ""
                      }`} 
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 w-24 h-24 flex items-center justify-center"
                  >
                    <ZodiacImage sign={planetSign} size={96} />
                  </motion.div>
                </div>

                <div className="space-y-2 text-center shrink-0">
                  <h2 className="text-3xl font-mystic text-mystic-gold tracking-widest uppercase">
                    {planetName}
                  </h2>
                  <p className="text-xl text-white/80 font-serif">
                    {birthText}
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                  <Card className="p-6 bg-white/5 border-mystic-gold/20 relative overflow-hidden w-full">
                    <div className="absolute -top-4 -right-4 opacity-5">
                      <Sparkles className="w-20 h-20 text-mystic-gold" />
                    </div>
                    <h4 className="text-mystic-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center justify-start gap-2">
                      <Zap className="w-4 h-4" /> {cosmicLegacyText}
                    </h4>
                    <p className="text-mystic-gold text-base leading-relaxed font-medium text-left">
                      {interpretation}
                    </p>
                  </Card>
                </div>

                <Button 
                  onClick={onClose}
                  className="w-full bg-mystic-gold text-mystic-purple hover:bg-mystic-gold/90 h-14 text-lg font-mystic rounded-2xl shadow-lg shadow-mystic-gold/10 shrink-0"
                >
                  {understoodText}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
