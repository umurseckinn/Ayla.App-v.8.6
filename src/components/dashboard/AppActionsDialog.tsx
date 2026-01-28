"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Share2, Mail, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export function AppActionsDialog({ open, onOpenChange }: { open?: boolean; onOpenChange?: (open: boolean) => void }) {
    const { t } = useLanguage();
    const [internalOpen, setInternalOpen] = useState(false);
    
    const isOpen = open !== undefined ? open : internalOpen;
    const handleOpenChange = (newOpen: boolean) => {
        if (onOpenChange) {
            onOpenChange(newOpen);
        } else {
            setInternalOpen(newOpen);
        }
    };

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const openStore = () => {
        if (navigator.userAgent.match(/Android/i)) {
            window.open("market://details?id=com.ayla_app_v8.app", "_blank");
        } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            window.open("https://apps.apple.com/app/idYOUR_APP_ID", "_blank");
        } else {
            window.open("https://play.google.com/store/apps/details?id=com.ayla_app_v8.app", "_blank");
        }
    };

    const handleRateUs = (starIndex: number) => {
        setRating(starIndex);
        openStore();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Ayla',
                    text: t('shareAppDesc'),
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing', error);
            }
        } else {
            // Fallback copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            // Optional: Show toast
        }
    };

    const handleContact = () => {
        window.location.href = "mailto:destek@ayla.app?subject=Ayla App Feedback";
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-mystic-gold/70 hover:text-mystic-gold hover:bg-mystic-gold/10 transition-colors"
                >
                    <Star className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent 
                showCloseButton={false} 
                className="max-w-xs w-[85%] bg-black border border-mystic-gold/30 text-mystic-gold p-0 overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.15)] rounded-[2rem] flex flex-col h-auto min-h-[500px]"
            >
                {/* Header Actions - Absolute Top Right */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleShare}
                        className="rounded-full w-8 h-8 text-mystic-gold/60 hover:text-mystic-gold hover:bg-mystic-gold/10 transition-all"
                        title={t('shareApp')}
                    >
                        <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleContact}
                        className="rounded-full w-8 h-8 text-mystic-gold/60 hover:text-mystic-gold hover:bg-mystic-gold/10 transition-all"
                        title={t('contactUs')}
                    >
                        <Mail className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenChange(false)}
                        className="rounded-full w-8 h-8 text-mystic-gold/60 hover:text-red-400 hover:bg-red-400/10 transition-all ml-1"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Title - Centered Top */}
                <div className="w-full text-center pt-20 pb-2 z-20 relative">
                    <h2 className="text-xl font-mystic text-mystic-gold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        Bizi Değerlendir
                    </h2>
                </div>

                {/* Content Container */}
                <div className="flex-1 flex flex-col relative">
                    {/* Ayla Image - Background/Integrated */}
                    <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none">
                         <img 
                            src="/assets/ayla/ayla-transparent.PNG" 
                            alt="Ayla" 
                            className="w-full h-full object-contain object-bottom scale-125 translate-y-[5%]"
                        />
                    </div>
                    
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0 h-full w-full opacity-80" />

                    {/* Interactive Elements */}
                    <div className="relative z-10 flex-1 flex flex-col justify-end items-center px-6 pb-8 gap-6">
                        
                        {/* Stars */}
                        <div className="flex gap-2" onMouseLeave={() => setHoverRating(0)}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                    key={star}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleRateUs(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    className="relative focus:outline-none"
                                >
                                    <Star 
                                        className={`w-8 h-8 transition-all duration-300 ${
                                            star <= (hoverRating || rating)
                                                ? "fill-mystic-gold text-mystic-gold drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" 
                                                : "text-mystic-gold/30 fill-transparent"
                                        }`}
                                        strokeWidth={1.5}
                                    />
                                </motion.button>
                            ))}
                        </div>

                        {/* Comment Area */}
                        <div className="w-full relative group">
                            <textarea 
                                className="w-full h-24 bg-black/60 backdrop-blur-md border border-mystic-gold/30 rounded-xl p-4 text-sm text-mystic-gold placeholder:text-mystic-gold/50 focus:outline-none focus:border-mystic-gold/60 transition-all resize-none shadow-lg"
                                placeholder="Düşüncelerinizi paylaşın..."
                            />
                            <div className="absolute bottom-3 right-3">
                                <Button 
                                    size="sm" 
                                    onClick={openStore}
                                    className="h-7 text-xs bg-mystic-gold text-black hover:bg-mystic-gold/90 border border-mystic-gold font-semibold"
                                >
                                    Gönder
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
