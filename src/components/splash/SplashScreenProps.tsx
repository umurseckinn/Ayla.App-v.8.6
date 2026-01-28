"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

interface SplashScreenProps {
    onComplete: () => void;
}

const SPLASH_BG = "/assets/ayla/ayla_splash_final.JPG";
const AYLA_LOGO = "/assets/ayla/ayla_logo.png";
const LOADING_TEXT = "Yıldızlar hizalanıyor...";

export function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isEnding, setIsEnding] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const img = new window.Image();
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageLoaded(true);
        img.src = SPLASH_BG;
    }, []);

    useEffect(() => {
        if (!imageLoaded) return;
        
        if (charIndex < LOADING_TEXT.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + LOADING_TEXT[charIndex]);
                setCharIndex(prev => prev + 1);
            }, 80);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, imageLoaded]);

    useEffect(() => {
        if (!imageLoaded) return;
        
        const minDisplayTime = setTimeout(() => {
            setIsEnding(true);
            setTimeout(() => {
                onComplete();
            }, 800);
        }, 4000);

        return () => clearTimeout(minDisplayTime);
    }, [imageLoaded, onComplete]);

    return (
        <AnimatePresence mode="wait">
            {!isEnding && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-end bg-black"
                    style={{ width: '100vw', height: '100dvh', maxWidth: '100%', overflow: 'hidden' }}
                >
                    {/* Background Image - telefon ekranına uygun */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <img
                            src={SPLASH_BG}
                            alt="Ayla"
                            className="w-full h-full object-contain object-center"
                            style={{ maxHeight: '100dvh', maxWidth: '100vw' }}
                        />
                        {/* Gradient overlay at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    </motion.div>

                    {/* Bottom Content */}
                    <div className="relative z-10 flex flex-col items-center pb-16 px-4">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                            className="flex justify-center mb-6"
                        >
                            <img
                                src={AYLA_LOGO}
                                alt="ayla.app"
                                className="h-10 w-auto object-contain brightness-0 invert"
                            />
                        </motion.div>

                        {/* Loading Text with typewriter effect */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-white/90 text-sm tracking-[0.3em] font-light"
                        >
                            {displayedText}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            >
                                |
                            </motion.span>
                        </motion.p>
                    </div>

                    {/* Subtle star particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {Array.from({ length: 15 }, (_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white/40 rounded-full"
                                style={{
                                    left: `${(i * 17 + 13) % 100}%`,
                                    top: `${(i * 23 + 7) % 70}%`,
                                }}
                                animate={{
                                    opacity: [0, 0.8, 0],
                                    scale: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 2 + (i % 3),
                                    repeat: Infinity,
                                    delay: (i % 5) * 0.4,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
