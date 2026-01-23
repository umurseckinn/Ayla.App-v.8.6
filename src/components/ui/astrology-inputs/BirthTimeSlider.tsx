"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BirthTimeSliderProps {
  value: string;
  onChange: (value: string) => void;
  onUnknown?: () => void;
  isPartner?: boolean;
}

export function BirthTimeSlider({ value, onChange, onUnknown, isPartner }: BirthTimeSliderProps) {
  const { t, language } = useLanguage();
  const [hour, setHour] = useState(parseInt(value.split(':')[0]) || 12);
  const [minute, setMinute] = useState(parseInt(value.split(':')[1]) || 0);

  const isNight = hour < 6 || hour > 18;
  
  const trackHeightHour = isPartner ? 8 : 10;
  const trackHeightMinute = isPartner ? 7 : 8;
  const thumbSizeHour = Math.round((isPartner ? 12 : 14) * 1.15);
  const thumbSizeMinute = Math.round((isPartner ? 11 : 12) * 1.15);

  const handleHourChange = (newHour: number) => {
    setHour(newHour);
    onChange(`${newHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    if (window.navigator.vibrate) window.navigator.vibrate(5);
  };

  const handleMinuteChange = (newMinute: number) => {
    setMinute(newMinute);
    onChange(`${hour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`);
  };

  return (
    <div className={`flex flex-col items-center w-full space-y-4 md:space-y-8 py-2 md:py-4 ${isPartner ? 'scale-[0.85]' : ''}`}>
      <div className={`relative w-full ${isPartner ? 'h-20 md:h-28' : 'h-32 md:h-48'} flex items-center justify-center`}>
        <motion.div 
          animate={{ 
            backgroundColor: isNight ? "rgba(45, 10, 78, 0.4)" : "rgba(212, 175, 55, 0.2)",
            boxShadow: isNight ? "0 0 60px rgba(45, 10, 78, 0.3)" : "0 0 60px rgba(212, 175, 55, 0.2)"
          }}
          className="absolute inset-0 rounded-full blur-3xl opacity-50"
        />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            key={hour}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${isPartner ? 'text-3xl md:text-4xl' : 'text-5xl md:text-6xl'} font-mystic text-mystic-gold flex items-baseline gap-2`}
          >
            <span>{hour.toString().padStart(2, '0')}</span>
            <span className={`${isPartner ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'} opacity-50`}>:</span>
            <span className={`${isPartner ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl'} opacity-80`}>{minute.toString().padStart(2, '0')}</span>
          </motion.div>
          
          <div className="flex items-center gap-2 mt-2 md:mt-4 text-white/40 uppercase tracking-[0.2em] text-[10px]">
            {isNight ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
            {isNight ? (language === 'en' ? "Night Time" : "Gece Vakti") : (language === 'en' ? "Day Time" : "Gündüz Vakti")}
          </div>
        </div>
      </div>

      <div className="w-full space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-3">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-mystic-gold/50 font-mystic">
            <span>{language === 'en' ? "Hour" : "Saat"}</span>
            <span>{hour}h</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="23" 
            value={hour}
            onChange={(e) => handleHourChange(parseInt(e.target.value))}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className={`w-full bg-white/10 rounded-full appearance-none cursor-pointer accent-mystic-gold
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-mystic-gold [&::-webkit-slider-thumb]:cursor-grab
              [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:shadow-xl [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white/20
              [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:active:scale-110
              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-mystic-gold [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white/20 [&::-moz-range-thumb]:cursor-grab`}
            style={{ 
              touchAction: 'none', 
              WebkitTapHighlightColor: 'transparent',
              height: `${trackHeightHour}px`
            }}
          />
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                height: ${thumbSizeHour}px;
                width: ${thumbSizeHour}px;
              }
              input[type="range"]::-moz-range-thumb {
                height: ${thumbSizeHour}px;
                width: ${thumbSizeHour}px;
              }
            `}</style>
        </div>

        <div className="space-y-2 md:space-y-3">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-mystic-gold/50 font-mystic">
            <span>{language === 'en' ? "Minute" : "Dakika"}</span>
            <span>{minute}m</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="59" 
            value={minute}
            onChange={(e) => handleMinuteChange(parseInt(e.target.value))}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className={`w-full bg-white/10 rounded-full appearance-none cursor-pointer accent-mystic-gold
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-mystic-gold [&::-webkit-slider-thumb]:cursor-grab
              [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20
              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-mystic-gold [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/20 [&::-moz-range-thumb]:cursor-grab`}
            style={{ 
              touchAction: 'pan-x',
              height: `${trackHeightMinute}px`
            }}
          />
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                height: ${thumbSizeMinute}px;
                width: ${thumbSizeMinute}px;
              }
              input[type="range"]::-moz-range-thumb {
                height: ${thumbSizeMinute}px;
                width: ${thumbSizeMinute}px;
              }
            `}</style>
        </div>
      </div>

      <button 
        onClick={() => onUnknown?.()}
        className="text-[10px] text-white/30 uppercase tracking-widest hover:text-mystic-gold transition-colors underline underline-offset-4"
      >
        {isPartner ? t('unknownPartnerTime') : t('unknownTime')}
      </button>
    </div>
  );
}
