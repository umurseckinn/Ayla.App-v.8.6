"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Star, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Offline mode: No Supabase needed
import { toast } from "sonner";
import { AYLA_IMAGE as CONSTANT_AYLA_IMAGE } from "@/lib/constants";
import { BirthDateWheel } from "@/components/ui/astrology-inputs/BirthDateWheel";
import { BirthTimeSlider } from "@/components/ui/astrology-inputs/BirthTimeSlider";
import { CosmicLocationInput } from "@/components/ui/astrology-inputs/CosmicLocationInput";
import { safeLocalStorage } from "@/lib/safe-utils";

const AYLA_IMAGE = CONSTANT_AYLA_IMAGE || "/ayla-transparent.png";

import { useLanguage } from "@/contexts/LanguageContext";

export function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const { t, language, setLanguage } = useLanguage();
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    birth_date: new Date().toISOString().split('T')[0],
    birth_time: "12:00",
    birth_place: "",
    is_birth_time_unknown: false,
  });

  const [loading, setLoading] = useState(false);
  const [isSearchingPlace, setIsSearchingPlace] = useState(false);

  const steps = [
    {
      id: "intro",
      title: t('introTitle'),
      description: t('introDesc'),
    },
    {
      id: "date",
      title: t('dateTitle'),
      description: t('dateDesc'),
    },
    {
      id: "time",
      title: t('timeTitle'),
      description: t('timeDesc'),
    },
    {
      id: "place",
      title: t('placeTitle'),
      description: t('placeDesc'),
    },
    {
      id: "kvkk",
      title: t('legal'),
      description: t('kvkkConfirmation'),
    },
    {
      id: "calculating",
      title: t('calculatingTitle'),
      description: t('calculatingDesc'),
    }
  ];

  const handleNext = () => {
    if (step === 0 && !formData.full_name.trim()) {
      toast.error(t('nameRequired'));
      return;
    }
    if (step === 3 && !formData.birth_place) {
      toast.error(t('allFieldsRequired'));
      return;
    }

    // New Step Logic: 0->1->2->3->4(KVKK)->5(Calculating)
    if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      // KVKK step
      setStep(5);
      handleFinish();
    } else if (step === 5) {
      handleFinish();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      // Offline mode: Always save to localStorage
      const userData = {
        ...formData,
        id: 'guest-' + Date.now(),
        star_dust: 150,
        aura_streak: 1,
        last_login: new Date().toISOString(),
      };

      safeLocalStorage.setItem('ayla_onboarding_done', 'true');
      safeLocalStorage.setItem('ayla_user_data', JSON.stringify(userData));

      setTimeout(() => {
        onComplete();
      }, 3500); // Cinematic delay
    } catch (error: any) {
      toast.error(t('error') + ": " + error.message);
      setStep(5); // Keep on calculating screen to retry
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void-black px-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-y-auto">
      <div className="star-field absolute inset-0 opacity-40" />



      {/* Dynamic Background Gradient based on season/step */}
      <motion.div
        animate={{
          background: step === 2
            ? "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, rgba(5, 5, 5, 1) 100%)"
            : step === 3 || step === 4
              ? "radial-gradient(circle at 50% 50%, rgba(45, 10, 78, 0.2) 0%, rgba(5, 5, 5, 1) 100%)"
              : "radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.3) 0%, rgba(5, 5, 5, 1) 100%)"
        }}
        className="absolute inset-0 z-0"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${step}`}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-12">
            {/* Header Ritual */}
            <div className="space-y-2 md:space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center relative"
              >
                {step > 0 && step < 5 && (
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="absolute left-0 p-0 hover:bg-transparent -ml-4 md:-ml-12 text-mystic-gold/60 hover:text-mystic-gold"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                )}
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-mystic-gold to-transparent mb-2 md:mb-6" />
              </motion.div>

              <h2 className="font-mystic text-mystic-gold tracking-[0.2em] uppercase leading-tight text-3xl md:text-4xl">
                {steps[step].title}
              </h2>

              {step !== 3 && step !== 4 && (
                <p className="text-white/60 font-serif italic text-base md:text-lg max-w-xs mx-auto leading-relaxed">
                  {steps[step].description}
                </p>
              )}

              {step < 5 && step !== 3 && step !== 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="w-full pt-2"
                >
                  <Button
                    onClick={handleNext}
                    className="w-full bg-transparent border border-mystic-gold/30 hover:bg-mystic-gold/5 text-mystic-gold font-mystic h-12 md:h-14 rounded-full group transition-all"
                  >
                    <span className="text-xs tracking-[0.3em] uppercase">{t('continue')}</span>
                    <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </motion.div>
              )}
            </div>


            {/* Input Rituals */}
            <div className={`w-full flex items-center justify-center ${step === 3 ? '' : 'min-h-[150px] md:min-h-[200px]'}`}>
              {step === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full space-y-4"
                >
                  <Input
                    autoFocus
                    placeholder={t('namePlaceholder')}
                    className="bg-transparent border-0 border-b border-mystic-gold/30 text-center text-2xl font-mystic text-white placeholder:text-white/10 h-16 rounded-none focus-visible:ring-0 focus-visible:border-mystic-gold transition-all"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  />
                  <div className="flex justify-center gap-4 pt-4">
                    <button
                      onClick={() => setLanguage('tr')}
                      className={`px-4 py-2 rounded-full text-sm font-mystic tracking-widest transition-all ${language === 'tr' ? 'bg-mystic-gold text-black font-bold' : 'bg-transparent border border-white/20 text-white/50'}`}
                    >
                      TR
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-4 py-2 rounded-full text-sm font-mystic tracking-widest transition-all ${language === 'en' ? 'bg-mystic-gold text-black font-bold' : 'bg-transparent border border-white/20 text-white/50'}`}
                    >
                      EN
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <Star className="w-4 h-4 text-mystic-gold/20 animate-pulse" />
                  </div>
                </motion.div>
              )}


              {step === 1 && (
                <BirthDateWheel
                  value={formData.birth_date}
                  onChange={(val) => setFormData({ ...formData, birth_date: val })}
                />
              )}

              {step === 2 && (
                <BirthTimeSlider
                  value={formData.birth_time}
                  onChange={(val) => setFormData({ ...formData, birth_time: val, is_birth_time_unknown: false })}
                  onUnknown={() => {
                    setFormData({ ...formData, birth_time: "12:00", is_birth_time_unknown: true });
                    setTimeout(() => handleNext(), 300);
                  }}
                />
              )}


              {step === 3 && (
                <div className="w-full flex flex-col" style={{ minHeight: '350px' }}>
                  <CosmicLocationInput
                    value={formData.birth_place}
                    onChange={(val) => setFormData({ ...formData, birth_place: val })}
                    onSearchStateChange={setIsSearchingPlace}
                  />
                  <AnimatePresence>
                    {formData.birth_place && !isSearchingPlace && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4"
                      >
                        <Button
                          onClick={handleNext}
                          className="w-full bg-transparent border border-mystic-gold/30 hover:bg-mystic-gold/5 text-mystic-gold font-mystic h-12 md:h-14 rounded-full group transition-all"
                        >
                          <span className="text-xs tracking-[0.3em] uppercase">{t('completeRitual')}</span>
                          <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {step === 4 && (
                <div className="w-full space-y-6">
                  <div className="h-64 overflow-y-auto bg-white/5 border border-white/10 rounded-xl p-4 text-left">
                    <h4 className="font-bold text-mystic-gold mb-2 text-sm">{t('kvkk')}</h4>
                    <p className="text-xs text-white/70 whitespace-pre-wrap leading-relaxed font-serif">
                      {t('kvkkContent')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-mystic-gold/10 rounded-xl border border-mystic-gold/20">
                    <div className="w-5 h-5 rounded border border-mystic-gold flex items-center justify-center bg-mystic-gold text-black">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                    <span className="text-xs text-mystic-gold font-bold uppercase tracking-wider">{t('readAndApproved')}</span>
                  </div>

                  <Button
                    onClick={handleNext}
                    className="w-full bg-mystic-gold text-black border-none hover:bg-mystic-gold/90 font-mystic h-14 rounded-full group transition-all"
                  >
                    <span className="text-xs tracking-[0.3em] uppercase">{t('approveAndStart')}</span>
                    <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>
              )}

              {step === 5 && (
                <div className="relative flex flex-col items-center">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-48 h-48 border border-mystic-gold/20 rounded-full flex items-center justify-center"
                  >
                    <div className="w-40 h-40 border border-mystic-gold/40 rounded-full flex items-center justify-center">
                      <div className="w-32 h-32 border border-mystic-gold/60 rounded-full flex items-center justify-center">
                        <img src={AYLA_IMAGE} alt="Ayla" className="w-20 h-20 ayla-isolated animate-pulse" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Data points merging effect */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          x: [Math.random() * 200 - 100, 0],
                          y: [Math.random() * 200 - 100, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        className="w-1 h-1 bg-mystic-gold rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Ritual */}
            {step < 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full"
              >
                {/* Progress Indicators */}
                <div className="flex justify-center gap-3 mt-4">
                  {steps.slice(0, 5).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === step ? 'bg-mystic-gold w-4' : 'bg-white/10'}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
