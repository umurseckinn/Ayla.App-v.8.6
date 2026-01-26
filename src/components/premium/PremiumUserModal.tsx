"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { X } from "lucide-react";

interface PremiumUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PremiumUserModal({ isOpen, onClose }: PremiumUserModalProps) {
  const { language } = useLanguage();

  const content = language === 'en' ? {
    accessText: "You have access to Premium content",
    continueBtn: "Continue"
  } : {
    accessText: "Premium içeriklere erişim hakkına sahipsiniz",
    continueBtn: "Devam Et"
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-none w-full h-full flex items-center justify-center pointer-events-none" showCloseButton={false}>
        <DialogTitle className="sr-only">Premium User</DialogTitle>
        <div className="pointer-events-auto w-full flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-sm relative rounded-[2rem] overflow-hidden shadow-2xl bg-indigo-950/50 border border-mystic-gold/30 flex flex-col h-[600px]"
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
                src="/premium_user.png"
                alt="Premium User Background"
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay for text readability at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent top-[50%]" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 flex flex-col h-full p-6 justify-end space-y-6 pb-12">
              
              {/* Access Text */}
              <div className="text-center px-4">
                <h2 className="text-xl font-bold italic text-[#D4AF37] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-relaxed">
                  {content.accessText}
                </h2>
              </div>

              {/* Continue Button */}
              <Button
                  onClick={onClose}
                  className="w-full bg-black hover:bg-black/90 text-[#D4AF37] font-bold text-lg h-14 rounded-xl border border-[#B8860B]/30 shadow-lg shadow-black/50"
              >
                  {content.continueBtn}
              </Button>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
