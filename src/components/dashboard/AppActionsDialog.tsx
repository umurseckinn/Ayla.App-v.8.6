"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Share2, Mail, X, Gift, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export function AppActionsDialog() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const handleRateUs = () => {
        // Platform specific logic would go here.
        // For web, maybe redirect to a store link or show a thank you.
        if (navigator.userAgent.match(/Android/i)) {
            window.open("market://details?id=com.ayla_app_v8.app", "_blank");
        } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            // Replace with actual App Store ID when available
            window.open("https://apps.apple.com/app/idYOUR_APP_ID", "_blank");
        } else {
            window.open("https://play.google.com/store/apps/details?id=com.ayla_app_v8.app", "_blank");
        }
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
            // Fallback
            console.log('Web Share API not supported');
        }
    };

    const handleContact = () => {
        window.location.href = "mailto:destek@ayla.app?subject=Ayla App Feedback";
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-mystic-gold/70 hover:text-mystic-gold hover:bg-mystic-gold/10 transition-colors"
                >
                    <Star className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="max-w-xs w-[85%] bg-black/80 backdrop-blur-xl border border-mystic-gold/20 text-mystic-gold p-0 overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.1)] rounded-[2rem]">
                <div className="flex flex-col">
                    {/* Header */}
                    <div className="p-5 flex items-center justify-between z-10 bg-gradient-to-b from-white/5 to-transparent border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-mystic text-mystic-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] tracking-widest uppercase">
                                Ayla
                            </h2>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="rounded-full hover:bg-white/10 w-8 h-8 text-white/50 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="p-4 space-y-3">
                        {/* Rate Us */}
                        <Button
                            variant="ghost"
                            onClick={handleRateUs}
                            className="w-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white justify-between h-16 rounded-2xl px-4 border border-white/5 group"
                        >
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-10 h-10 rounded-full bg-mystic-gold/10 flex items-center justify-center text-mystic-gold group-hover:scale-110 transition-transform flex-shrink-0">
                                    <Star className="w-5 h-5 fill-mystic-gold/20" />
                                </div>
                                <div>
                                    <span className="font-medium text-sm block text-mystic-gold">{t('rateUs')}</span>
                                    <span className="text-[10px] text-white/50 block font-normal">{t('rateUsDesc')}</span>
                                </div>
                            </div>
                        </Button>

                        {/* Share */}
                        <Button
                            variant="ghost"
                            onClick={handleShare}
                            className="w-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white justify-between h-16 rounded-2xl px-4 border border-white/5 group"
                        >
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform flex-shrink-0">
                                    <Share2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="font-medium text-sm block text-indigo-300">{t('shareApp')}</span>
                                    <span className="text-[10px] text-white/50 block font-normal">{t('shareAppDesc')}</span>
                                </div>
                            </div>
                        </Button>

                        {/* Contact */}
                        <Button
                            variant="ghost"
                            onClick={handleContact}
                            className="w-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white justify-between h-16 rounded-2xl px-4 border border-white/5 group"
                        >
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform flex-shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="font-medium text-sm block text-rose-300">{t('contactUs')}</span>
                                    <span className="text-[10px] text-white/50 block font-normal">{t('contactUsDesc')}</span>
                                </div>
                            </div>
                        </Button>
                    </div>

                    <div className="px-4 pb-6 pt-2 flex justify-center opacity-40">
                        <Gift className="w-4 h-4 text-mystic-gold animate-pulse" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
