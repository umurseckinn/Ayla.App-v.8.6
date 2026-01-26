"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { safeLocalStorage } from "@/lib/safe-utils";
import { X } from "lucide-react";
import { useProfileContext } from "@/contexts/ProfileContext";
import { PersistenceManager } from "@/lib/persistence";

// Inline icons to avoid import issues
const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

export function PremiumModal({ isOpen, onClose, onPurchaseSuccess }: { isOpen: boolean; onClose: () => void; onPurchaseSuccess?: () => void }) {
  const { language } = useLanguage();
  const { setSubscriptionStatus } = useProfileContext();

  const handlePurchase = async () => {
      // Simulate successful purchase
      PersistenceManager.setPremiumStatus(true);
      await setSubscriptionStatus('premium');
      if (onPurchaseSuccess) {
        onPurchaseSuccess();
      } else {
        onClose();
      }
  };

  const features = language === 'en' ? [
    "One-time payment, lifetime validity",
    "Unlimited access to all features",
    "Ad-free experience"
  ] : [
    "Tek ödeme, ömür boyu geçerli",
    "Tüm özelliklere sınırsız erişim",
    "Reklamsız uygulama keyfi"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-none w-full h-full flex items-center justify-center pointer-events-none" showCloseButton={false}>
        <DialogTitle className="sr-only">Premium</DialogTitle>
        <div className="pointer-events-auto w-full flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-sm relative rounded-[2rem] overflow-hidden shadow-2xl bg-indigo-950/50 border border-mystic-gold/30 flex flex-col h-[80vh] max-h-[650px]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
              <img
                src="/assets/ayla/premium_bg.png"
                alt="Ayla Premium"
                className="w-full h-full object-cover object-top scale-[1.15] origin-top"
              />
              {/* Gradient Overlay - Started lower to show background image more */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent top-[30%]" />
            </div>

            {/* Content - Pushed to bottom (Waist level start) */}
            <div className="relative z-10 flex flex-col h-full p-5 justify-end">
              
              {/* Spacer to push content down - leaves top ~40-45% empty for the image */}
              <div className="flex-1 min-h-[40%]" />

              {/* Title */}
              <div className="text-center mb-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-2xl font-black tracking-widest text-mystic-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.8)] font-mystic mb-1.5">
                    AYLA PREMIUM
                  </h1>
                  <div className="w-16 h-0.5 bg-mystic-gold mx-auto rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                </motion.div>
              </div>

              {/* Features List */}
              <div className="space-y-2 mb-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-2.5 bg-black/40 backdrop-blur-sm p-2 rounded-xl border border-white/5"
                  >
                    <div className="bg-mystic-gold/20 p-1 rounded-full flex-shrink-0">
                      <CheckIcon className="w-3 h-3 text-mystic-gold" />
                    </div>
                    <span className="text-white/90 font-medium text-xs leading-snug">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Price Offer */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-4 text-center"
              >
                <div className="inline-block bg-gradient-to-r from-mystic-gold/10 to-mystic-purple/10 p-2.5 px-4 rounded-2xl border border-mystic-gold/20 backdrop-blur-md">
                  <p className="text-white/60 text-[10px] uppercase tracking-widest mb-0.5">
                    {language === 'en' ? 'Limited Time Offer' : 'Sınırlı Süre İçin'}
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-white/40 text-lg font-bold line-through decoration-rose-500/80 decoration-2">
                      {language === 'en' ? '$20' : '₺800'}
                    </span>
                    <span className="text-2xl font-black text-mystic-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                      {language === 'en' ? '$13.85' : '₺600'}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <div className="space-y-2">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    onClick={handlePurchase}
                    className="w-full h-12 bg-[#B8860B] hover:bg-[#DAA520] text-indigo-950 font-black text-base tracking-wide rounded-xl shadow-[0_0_15px_rgba(184,134,11,0.4)] border-t border-white/20 transform active:scale-95 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4" />
                      {language === 'en' ? 'Get Premium Now!' : "Premium'u Şimdi Edin!"}
                    </div>
                  </Button>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  onClick={onClose}
                  className="w-full py-1.5 text-white/40 text-xs font-medium hover:text-white/60 transition-colors underline decoration-white/20 underline-offset-4"
                >
                  {language === 'en' ? 'Skip' : 'Atla'}
                </motion.button>
              </div>

            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
