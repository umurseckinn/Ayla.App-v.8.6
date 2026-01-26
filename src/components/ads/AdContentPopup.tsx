"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PremiumModal } from "@/components/premium/PremiumModal";
import { X } from "lucide-react";

interface AdContentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPremium?: () => void;
  onWatchAd: () => void;
}

export function AdContentPopup({ isOpen, onClose, onOpenPremium, onWatchAd }: AdContentPopupProps) {
  const { language } = useLanguage();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleOpenPremium = () => {
    setShowPremiumModal(true);
    if (onOpenPremium) onOpenPremium();
  };

  const content = language === 'en' ? {
    title: "Unlock Content",
    description: "Watch a short ad or get Premium to access this content.",
    premiumBtn: "Get Premium",
    adBtn: "Watch Ad & Access",
    skip: "Skip"
  } : {
    title: "İçeriği Aç",
    description: "Bu içeriğe erişmek için kısa bir reklam izle veya Premium al.",
    premiumBtn: "Premium'u Edin",
    adBtn: "Reklamı İzle ve İçeriğe Eriş",
    skip: "Atla"
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-none w-full h-full flex items-center justify-center pointer-events-none" showCloseButton={false}>
          <DialogTitle className="sr-only">Ad Content</DialogTitle>
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

              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/ad pop-up.png"
                  alt="Ad Popup Background"
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient Overlay for text readability at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent top-[30%]" />
              </div>

              {/* Content Section */}
              <div className="relative z-10 flex flex-col h-full p-5 justify-end space-y-4">
                
                {/* Title & Description */}
                <div className="text-center text-white space-y-2">
                  <h2 className="text-2xl font-bold italic font-mystic text-[#D4AF37] drop-shadow-[0_2px_0_rgba(0,0,0,1)] stroke-black">{content.title}</h2>
                  <p className="text-sm opacity-90 font-medium leading-relaxed">{content.description}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 w-full">
                  {/* Premium Button */}
                  <Button
                      onClick={handleOpenPremium}
                      className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black border border-white/20 h-14 rounded-xl flex items-center justify-center gap-3 relative overflow-hidden group shadow-lg shadow-[#D4AF37]/20"
                  >
                      <img src="/Premium symbol.png" alt="Premium" className="w-6 h-6 object-contain" />
                      <span className="font-bold text-lg">{content.premiumBtn}</span>
                  </Button>

                  {/* Ad Button */}
                  <Button
                      onClick={onWatchAd}
                      className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black border border-white/20 h-14 rounded-xl flex items-center justify-center gap-3 relative overflow-hidden group shadow-lg shadow-[#D4AF37]/20"
                  >
                      <img src="/Ad-symbol.png" alt="Ad" className="w-6 h-6 object-contain" />
                      <span className="font-bold text-lg">{content.adBtn}</span>
                  </Button>
                </div>

                {/* Skip Button */}
                <button 
                    onClick={onClose}
                    className="w-full py-2 text-[10px] text-white/30 hover:text-white/50 transition-colors font-medium uppercase tracking-widest"
                >
                    {content.skip}
                </button>
              </div>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </>
  );
}
