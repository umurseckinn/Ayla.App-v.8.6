"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Globe } from "lucide-react";
import { CitySelector } from "@/components/ui/CitySelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface CosmicLocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearchStateChange?: (active: boolean) => void;
  placeholder?: string;
}

export function CosmicLocationInput({ value, onChange, onSearchStateChange, placeholder }: CosmicLocationInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="relative w-full py-8">
      {/* Background Globe Visualization */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full border border-mystic-gold/20 relative"
        >
          <div className="absolute inset-0 border-t border-mystic-gold/40 rounded-full rotate-45" />
          <div className="absolute inset-0 border-l border-mystic-gold/40 rounded-full -rotate-45" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-mystic-gold rounded-full animate-ping" />
          </div>
        </motion.div>

        {/* Decorative Constellation Dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            } as any}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className={`w-full transition-all duration-500 ${isFocused ? 'scale-105' : 'scale-100'}`}>
          <Label label={t('placeTitle')} />
          <CitySelector
            value={value}
            onChange={onChange}
            onSearchStateChange={onSearchStateChange}
            placeholder={placeholder || t('searchLocation')}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: value ? 1 : 0 }}
          className="mt-6 flex items-center gap-2 text-[10px] text-mystic-gold uppercase tracking-widest font-mystic"
        >
          <MapPin className="w-3 h-3 animate-bounce" />
          <span>{t('locationSelected')}</span>
        </motion.div>
      </div>
    </div>
  );
}

function Label({ label }: { label: string }) {
  return (
    <div className="text-[10px] uppercase tracking-widest text-mystic-gold/50 mb-4 font-mystic text-center w-full">
      {label}
    </div>
  );
}
