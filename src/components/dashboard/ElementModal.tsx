"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Zap } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ZodiacImage } from "../ui/ZodiacImage";
import { NatalSignModal } from "../birthchart/NatalSignModal";
import { SIGN_INTERPRETATIONS } from "@/lib/sign-interpretations";

import { useLanguage } from "@/contexts/LanguageContext";

interface ElementModalProps {
  isOpen: boolean;
  onClose: () => void;
  elementName: string;
  signs: string[];
  title: string;
  description: string;
}

const elementBackgrounds: Record<string, string> = {
  "Ateş": "rgba(180, 80, 40, 0.85)",
  "Toprak": "rgba(60, 80, 50, 0.85)",
  "Hava": "rgba(160, 150, 220, 0.9)",
  "Su": "rgba(40, 80, 120, 0.85)"
};

const ELEMENT_NAME_TO_KEY: Record<string, string> = {
  "Ateş": "elementFire",
  "Toprak": "elementEarth",
  "Hava": "elementAir",
  "Su": "elementWater"
};

export function ElementModal({
  isOpen,
  onClose,
  elementName,
  signs,
  title,
  description
}: ElementModalProps) {
  const { t } = useLanguage();
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [showNatalModal, setShowNatalModal] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const isHoldingRef = useRef(false);

  const displayElementName = t((ELEMENT_NAME_TO_KEY[elementName] || elementName) as keyof TranslationKeys);

  const handlePointerDown = (e: React.PointerEvent, sign: string) => {
    startTimeRef.current = Date.now();
    isHoldingRef.current = false;
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.bottom + 10;

    holdTimerRef.current = setTimeout(() => {
      isHoldingRef.current = true;
      setTooltip(sign);
      setTooltipPos({ x, y });
    }, 300);
  };

  const handlePointerUp = (sign: string) => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    const duration = Date.now() - startTimeRef.current;
    if (duration < 300 && !isHoldingRef.current) {
      setSelectedSign(sign);
      setShowNatalModal(true);
    }
    setTooltip(null);
  };

  const handlePointerLeave = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setTooltip(null);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+1rem)]"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm relative rounded-[2rem] border border-white/20 p-5 shadow-2xl"
              onClick={e => e.stopPropagation()}
              style={{ backgroundColor: elementBackgrounds[elementName] }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-[calc(env(safe-area-inset-top)+1rem)] right-4 p-2 rounded-full bg-black/10 text-white/50 hover:bg-black/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex justify-between w-full px-4 items-center gap-2">
                  {signs.map((sign) => (
                    <div
                      key={sign}
                      className="relative group cursor-pointer flex-1 flex justify-center"
                      onPointerDown={(e) => handlePointerDown(e, sign)}
                      onPointerUp={() => handlePointerUp(sign)}
                      onPointerLeave={handlePointerLeave}
                      style={{ touchAction: "none" }}
                    >
                      <ZodiacImage
                        sign={sign}
                        size={60}
                        className="filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform hover:scale-110 active:scale-95 w-full max-w-[60px] aspect-square object-contain"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-mystic text-white tracking-[0.25em] uppercase font-[900] drop-shadow-lg">
                      {displayElementName}
                    </h2>
                    <p className="text-[10px] font-mystic text-white font-[800] uppercase tracking-widest opacity-90">
                      ({signs.join(", ").toUpperCase()})
                    </p>
                  </div>
                  <Card className="p-4 bg-black/10 border-white/10 relative overflow-hidden backdrop-blur-md">
                      <div className="absolute -top-4 -right-4 opacity-10">
                        <Sparkles className="w-20 h-20 text-white" />
                      </div>
                      <p className="text-white text-sm md:text-base leading-relaxed font-[800] drop-shadow-md text-left brightness-125">
                        {description}
                      </p>
                    </Card>
                </div>

                <Button
                  onClick={onClose}
                  className="w-full bg-white text-black hover:bg-white/90 h-12 text-base font-mystic rounded-2xl shadow-xl font-bold"
                >
                  {t('gotTheMessage')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="fixed z-[250] px-4 py-2 bg-white text-black rounded-xl font-extrabold shadow-2xl pointer-events-none text-xs uppercase tracking-wider border border-black/10"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: 'translateX(-50%)'
            }}
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedSign && (
        <NatalSignModal
          isOpen={showNatalModal}
          onClose={() => {
            setShowNatalModal(false);
            // We keep selectedSign for a moment to avoid flickers if needed, 
            // but the conditional AnimatePresence above uses showNatalModal now.
            setTimeout(() => setSelectedSign(null), 300);
          }}
          signName={selectedSign}
          interpretation={SIGN_INTERPRETATIONS[selectedSign] || ""}
        />
      )}
    </>
  );
}
