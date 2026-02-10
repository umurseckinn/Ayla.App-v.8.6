"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  RefreshCw,
  ArrowRight,
  X
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calculateSynastry, SynastryResult, HouseCompatibility, generateAylaGuide } from "@/lib/synastry-service";
import { stitchSynastry } from "@/lib/interpretations";
import { toast } from "sonner";
import { AYLA_IMAGE } from "@/lib/constants";
import { ZodiacImage } from "@/components/ui/ZodiacImage";
import { BirthDateWheel } from "@/components/ui/astrology-inputs/BirthDateWheel";
import { BirthTimeSlider } from "@/components/ui/astrology-inputs/BirthTimeSlider";
import { CosmicLocationInput } from "@/components/ui/astrology-inputs/CosmicLocationInput";
import { useLanguage } from "@/contexts/LanguageContext";
import { PremiumModal } from "../premium/PremiumModal";
import { AdContentPopup } from "../ads/AdContentPopup";
import { useProfile } from "@/hooks/useProfile";


interface PersonData {
  full_name: string;
  birth_date: string;
  birth_time: string;
  birth_place: string;
}

function getScoreColorHelper(score: number): { bg: string; border: string; text: string; glow: string } {
  if (score < 30) return {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
    glow: "shadow-[0_0_15px_rgba(239,68,68,0.2)]"
  };
  if (score < 60) return {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    glow: "shadow-[0_0_15px_rgba(234,179,8,0.2)]"
  };
  return {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.2)]"
  };
}

function getBarColorHelper(score: number): string {
  if (score < 30) return "bg-gradient-to-r from-red-600 to-red-400";
  if (score < 60) return "bg-gradient-to-r from-yellow-600 to-yellow-400";
  return "bg-gradient-to-r from-emerald-600 to-emerald-400";
}

const HOUSE_ICONS: Record<number, string> = {
  1: "👤", 2: "💰", 3: "🗣️", 4: "🏠", 5: "❤️", 6: "🌿",
  7: "🤝", 8: "🗝️", 9: "🌍", 10: "🏆", 11: "✨", 12: "🌙"
};

function HouseDetailModal({
  house,
  onClose,
  userName,
  partnerName
}: {
  house: HouseCompatibility;
  onClose: () => void;
  userName: string;
  partnerName: string;
}) {
  const { t, language } = useLanguage();
  const { subscriptionStatus } = useProfile();
  const colors = getScoreColorHelper(house.score);
  const aylaGuide = generateAylaGuide(house.houseNumber, house.person1Sign, house.person2Sign, house.score, language as 'tr' | 'en');

  // Security check - though parent handles it, double check here
  const isUnlocked = subscriptionStatus === 'premium' || house.houseNumber === 1 || house.houseNumber === 2;
  
  if (!isUnlocked) {
    onClose();
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pt-[calc(max(1rem,env(safe-area-inset-top)))] pb-[calc(max(3rem,env(safe-area-inset-bottom)))]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md bg-black ${colors.border} border-2 rounded-3xl p-6 ${colors.glow} max-h-[80vh] flex flex-col`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-mystic-gold/60 hover:text-mystic-gold transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-6 overflow-y-auto flex-1 pb-4 no-scrollbar">
          <div className="flex justify-center items-center gap-6">
            <div className="text-center">
              <ZodiacImage sign={house.person1Sign} size={64} className="mb-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] mx-auto" />
              <p className={`text-[10px] ${colors.text} font-medium`}>{userName}</p>
            </div>
            <span className="text-5xl drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">{house.icon}</span>
            <div className="text-center">
              <ZodiacImage sign={house.person2Sign} size={64} className="mb-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] mx-auto" />
              <p className={`text-[10px] ${colors.text} font-medium`}>{partnerName}</p>
            </div>
          </div>

          <div>
            <h3 className={`text-2xl font-mystic ${colors.text} font-bold`}>{house.title}</h3>
            <p className={`text-sm ${colors.text} opacity-70 uppercase tracking-[0.2em] font-semibold px-4`}>{house.theme}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>{house.tierLabel}</span>
              <span className={`text-2xl font-mystic font-bold ${colors.text}`}>%{house.score}</span>
            </div>
            <div className="w-full bg-mystic-gold/10 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${house.score}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full ${getBarColorHelper(house.score)}`}
              />
            </div>
          </div>

          <div className={`${colors.bg} rounded-2xl p-5 border ${colors.border}`}>
            <p className={`text-lg ${colors.text} font-bold leading-relaxed font-serif italic`}>
              {house.description}
            </p>
          </div>

          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className={`h-[1px] flex-1 ${colors.border.replace('border-', 'bg-')}`} />
              <div className="flex items-center gap-2">
                <img src={AYLA_IMAGE} alt="Ayla" className="w-6 h-6 ayla-isolated" />
                <span className={`text-[10px] uppercase tracking-widest ${colors.text} font-mystic font-bold`}>{t('aylaGuidance')}</span>
              </div>
              <div className={`h-[1px] flex-1 ${colors.border.replace('border-', 'bg-')}`} />
            </div>

            <div className={`${colors.bg} rounded-2xl p-5 border ${colors.border}`}>
              <p className={`text-lg ${colors.text} font-bold leading-relaxed font-serif`}>
                {aylaGuide}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 pb-[env(safe-area-inset-bottom)]">
          <Button
            onClick={onClose}
            className={`w-full ${colors.bg} ${colors.border} border ${colors.text} hover:opacity-80 font-mystic h-14 rounded-full tracking-widest transition-all flex-shrink-0 shadow-lg`}
          >
            {t('gotTheMessage')}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LoveCompatibility({ profile }: { profile: any }) {
  const { t, language } = useLanguage();
  const { subscriptionStatus } = useProfile();
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [inputStep, setInputStep] = useState(0);
  const [loadingText, setLoadingText] = useState("");
  const [useUserProfile, setUseUserProfile] = useState(true);
  const [synastryResult, setSynastryResult] = useState<SynastryResult | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<HouseCompatibility | null>(null);
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isWaitingForPremium, setIsWaitingForPremium] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (step === "loading") {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? "" : prev + ".");
      }, 500);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Auto-open logic
  useEffect(() => {
    if (subscriptionStatus === 'premium' && isWaitingForPremium && step === "input" && inputStep === 3) {
      setIsWaitingForPremium(false);
      proceedCalculate();
    }
  }, [subscriptionStatus, isWaitingForPremium, step, inputStep]);

  const [person1Data, setPerson1Data] = useState<PersonData>({
    full_name: "",
    birth_date: new Date().toISOString().split('T')[0],
    birth_time: "12:00",
    birth_place: "",
  });

  const [partnerData, setPartnerData] = useState<PersonData>({
    full_name: "",
    birth_date: new Date().toISOString().split('T')[0],
    birth_time: "12:00",
    birth_place: "",
  });

  const loadingSteps = useMemo(() => [
    t('computingChart'),
    t('calculatingEnergies'),
    t('analyzingSynastry'),
    t('determiningCompatibility'),
    t('aylaInterpreting')
  ], [t]);

  const currentUserData = useUserProfile ? {
    full_name: profile?.full_name || t('you'),
    birth_date: profile?.birth_date || "",
    birth_time: profile?.birth_time || "12:00",
    birth_place: profile?.birth_place || "",
  } : person1Data;

  // Silent update when profile changes
  const prevProfileRef = useRef(profile);

  useEffect(() => {
    const prev = prevProfileRef.current;
    const curr = profile;
    
    // Check if meaningful changes occurred
    const hasChanged = prev?.birth_date !== curr?.birth_date || 
                       prev?.birth_time !== curr?.birth_time || 
                       prev?.birth_place !== curr?.birth_place ||
                       prev?.full_name !== curr?.full_name;

    if (hasChanged && step === 'result' && useUserProfile && curr && partnerData.full_name) {
       const updatedUserData = {
         full_name: curr.full_name || t('you'),
         birth_date: curr.birth_date || "",
         birth_time: curr.birth_time || "12:00",
         birth_place: curr.birth_place || "",
       };

       try {
         const result = calculateSynastry(
           {
             birthDate: new Date(updatedUserData.birth_date),
             birthTime: updatedUserData.birth_time,
             birthPlace: updatedUserData.birth_place
           },
           {
             birthDate: new Date(partnerData.birth_date),
             birthTime: partnerData.birth_time,
             birthPlace: partnerData.birth_place
           },
           language as 'tr' | 'en'
         );
         setSynastryResult(result);
         stitchSynastry(updatedUserData, partnerData, result);
         toast.success(language === 'en' ? 'Compatibility updated with new profile info.' : 'Uyumluluk yeni profil bilgileriyle güncellendi.');
       } catch (e) {
         console.error("Silent recalc error", e);
       }
    }
    prevProfileRef.current = curr;
  }, [profile, step, useUserProfile, partnerData, language, t]);

  const handleCalculate = async () => {
    if (!partnerData.full_name || !partnerData.birth_date || !partnerData.birth_place) {
      toast.error(t('fillPartnerInfo'));
      return;
    }

    if (subscriptionStatus !== 'premium') {
      setIsWaitingForPremium(true);
      setShowAdPopup(true);
      return;
    }

    proceedCalculate();
  };

  const proceedCalculate = async () => {
    setStep("loading");

    try {
      const result = calculateSynastry(
        {
          birthDate: new Date(currentUserData.birth_date),
          birthTime: currentUserData.birth_time,
          birthPlace: currentUserData.birth_place
        },
        {
          birthDate: new Date(partnerData.birth_date),
          birthTime: partnerData.birth_time,
          birthPlace: partnerData.birth_place
        },
        language as 'tr' | 'en'
      );

      setSynastryResult(result);
      stitchSynastry(currentUserData, partnerData, result);

      let currentIdx = 0;
      const stepInterval = setInterval(() => {
        if (currentIdx < loadingSteps.length) {
          setLoadingText(loadingSteps[currentIdx]);
          currentIdx++;
        } else {
          clearInterval(stepInterval);
          setStep("result");
        }
      }, 800);

    } catch (error) {
      console.error("Synastry calculation error:", error);
      toast.error(t('calculationError'));
      setStep("input");
    }
  };

  const handleAdComplete = () => {
    setShowAdPopup(false);
    proceedCalculate();
  };

  const nextInputStep = () => {
    if (inputStep === 0 && !partnerData.full_name) {
      toast.error(t('needPartnerName'));
      return;
    }
    if (inputStep === 3) {
      handleCalculate();
    } else {
      setInputStep(inputStep + 1);
    }
  };

  return (
    <div className="px-4 py-6 pt-[calc(var(--sat,env(safe-area-inset-top))+1.5rem)] pb-[calc(75px+var(--sab,env(safe-area-inset-bottom))+1.5rem)] min-h-[60vh]">
      <AnimatePresence mode="wait">
        {step === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-mystic text-mystic-gold uppercase tracking-[0.2em]">{t('loveCompatibility')}</h2>
              <div className="w-16 h-[1px] bg-mystic-gold/30 mx-auto" />
              <p className="text-mystic-gold/60 font-serif italic">{t('loveCompatDesc')}</p>
            </div>

            <Card className="p-8 bg-black border-mystic-gold/20 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-mystic-gold/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(inputStep / 3) * 100}%` }}
                  className="h-full bg-mystic-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={inputStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 min-h-[300px] flex flex-col justify-center"
                >
                  {inputStep === 0 && (
                    <div className="space-y-6 text-center">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-mystic-gold/50 font-mystic">{t('step1Name')}</span>
                      <h3 className="text-xl text-mystic-gold font-mystic">{t('whoAreWeChecking')}</h3>
                      <Input
                        placeholder={t('whatsTheirName')}
                        className="bg-transparent border-0 border-b border-mystic-gold/30 text-center text-2xl font-mystic text-mystic-gold placeholder:text-mystic-gold/20 h-16 rounded-none focus-visible:ring-0 focus-visible:border-mystic-gold transition-all"
                        value={partnerData.full_name}
                        onChange={(e) => setPartnerData({ ...partnerData, full_name: e.target.value })}
                      />
                    </div>
                  )}

                  {inputStep === 1 && (
                    <div className="space-y-6 text-center">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-mystic-gold/50 font-mystic">{t('step2Date')}</span>
                      <h3 className="text-xl text-mystic-gold font-mystic">{t('whenBorn', { name: partnerData.full_name })}</h3>
                      <BirthDateWheel
                        value={partnerData.birth_date}
                        onChange={(val) => setPartnerData({ ...partnerData, birth_date: val })}
                      />
                    </div>
                  )}

                  {inputStep === 2 && (
                    <div className="space-y-6 text-center">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-mystic-gold/50 font-mystic">{t('step3Time')}</span>
                      <h3 className="text-xl text-mystic-gold font-mystic">{t('whatTimeBorn')}</h3>
                      <BirthTimeSlider
                        value={partnerData.birth_time}
                        onChange={(val) => setPartnerData({ ...partnerData, birth_time: val })}
                        isPartner={true}
                        onUnknown={() => {
                          setPartnerData({ ...partnerData, birth_time: "12:00" });
                          nextInputStep();
                        }}
                      />
                    </div>
                  )}

                  {inputStep === 3 && (
                    <div className="space-y-6 text-center">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-mystic-gold/50 font-mystic">{t('step4Place')}</span>
                      <h3 className="text-xl text-mystic-gold font-mystic">{t('whereBorn')}</h3>
                      <CosmicLocationInput
                        value={partnerData.birth_place}
                        onChange={(val) => setPartnerData({ ...partnerData, birth_place: val })}
                        placeholder={t('birthCityPlaceholder')}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <Button
                onClick={nextInputStep}
                className="w-full mt-8 bg-transparent border border-mystic-gold/30 hover:bg-mystic-gold/5 text-mystic-gold font-mystic h-16 rounded-full group transition-all"
              >
                <span className="text-sm tracking-[0.3em] uppercase">{inputStep === 3 ? t('calculateCompatibility') : t('continue')}</span>
                <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Card>

            {!useUserProfile && (
              <Button
                variant="link"
                onClick={() => setUseUserProfile(true)}
                className="w-full text-[10px] text-mystic-gold/40 uppercase tracking-widest"
              >
                {t('useMyProfile')}
              </Button>
            )}

            <AdContentPopup
              isOpen={showAdPopup}
              onClose={() => setShowAdPopup(false)}
              onWatchAd={handleAdComplete}
              onOpenPremium={() => {
                setShowAdPopup(false);
                setShowPremiumModal(true);
              }}
              title={language === 'en' ? 'Love Compatibility' : 'Aşk Uyumu'}
              backgroundImage="/love-compatibility-ad-popup.png"
              imageClassName="object-center"
            />
          </motion.div>
        )}

        {step === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
          >
             {/* Full Screen Background Image */}
             <div className="absolute inset-0 z-0">
               <img
                 src="/assets/ayla/love_compat_wait.png"
                 alt="Love Compatibility Waiting"
                 className="w-full h-full object-cover opacity-80"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
             </div>

             {/* Center Content */}
             <div className="relative z-10 flex flex-col items-center justify-center space-y-12 w-full h-full pb-20">
                {/* Abstract Loader Rings with Heart */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                   <motion.div
                     animate={{ rotate: 360 }}
                     transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 border border-mystic-gold/30 rounded-full"
                   />
                   <motion.div
                     animate={{ rotate: -360 }}
                     transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-4 border border-mystic-gold/20 rounded-full"
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-mystic-gold animate-pulse fill-mystic-gold/50 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                   </div>
                </div>

               <div className="space-y-4 text-center px-6">
                  <h3 className="font-mystic text-2xl text-mystic-gold uppercase tracking-[0.2em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    {t('calculatingLoveCompatibility')}
                    <span className="inline-block w-[2ch] text-left">{dots}</span>
                  </h3>
                  <p className="text-sm text-mystic-gold/90 italic font-serif max-w-[280px] mx-auto drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] leading-relaxed">
                    {loadingText}
                  </p>
                </div>
             </div>
          </motion.div>
        )}

        {step === "result" && synastryResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="text-center">
              <div className="inline-block relative mb-6">
                <div className="absolute inset-0 bg-mystic-gold/20 rounded-full blur-2xl animate-pulse" />
                <img src={AYLA_IMAGE} alt="Ayla" className="w-28 h-28 relative z-10 ayla-isolated object-contain" />
              </div>
              <h2 className="text-3xl font-mystic text-mystic-gold tracking-widest uppercase">{t('cosmicLoveAnalysis')}</h2>
              <p className="text-mystic-gold/50 text-[10px] uppercase tracking-[0.3em] mt-2">{t('starsWrittenForYou')}</p>
            </div>

            <Card className="p-8 bg-black border-mystic-gold/30 relative overflow-hidden glass-morphism">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Heart className="w-48 h-48 text-mystic-gold fill-mystic-gold" />
              </div>

              <div className="relative z-10 space-y-10">
                <div className="flex items-center justify-center gap-12">
                  <div className="text-center group">
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-mystic-gold/10 rounded-full group-hover:scale-125 transition-transform" />
                      <ZodiacImage sign={synastryResult.person1Signs.sun} size={64} />
                    </div>
                    <p className="text-[10px] text-mystic-gold/50 uppercase font-bold tracking-widest">{t('you')}</p>
                  </div>

                  <div className="text-center relative">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <span className="text-5xl font-mystic text-mystic-gold">{synastryResult.score}%</span>
                      <p className="text-[8px] text-mystic-gold/50 uppercase tracking-[0.2em]">{t('cosmicCompatibility')}</p>
                    </motion.div>
                    <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-mystic-gold/5 fill-mystic-gold/5 animate-pulse" />
                  </div>

                  <div className="text-center group">
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-mystic-gold/10 rounded-full group-hover:scale-125 transition-transform" />
                      <ZodiacImage sign={synastryResult.person2Signs.sun} size={64} />
                    </div>
                    <p className="text-[10px] text-mystic-gold/50 uppercase font-bold tracking-widest">{partnerData.full_name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(synastryResult.percentages).map(([key, value]) => {
                    const colors = getScoreColorHelper(value);
                    return (
                      <div key={key} className={`${colors.bg} p-4 rounded-2xl border ${colors.border} backdrop-blur-md`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] uppercase tracking-widest text-mystic-gold/50">
                          {t(key as any)}
                        </span>
                          <span className={`text-xs font-bold ${colors.text}`}>{value}%</span>
                        </div>
                        <div className="w-full bg-mystic-gold/10 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`h-full ${getBarColorHelper(value)}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-mystic-gold" />
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-mystic-gold font-mystic font-bold">{t('houseSynastry')}</h3>
                  </div>

                  <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar -mx-8 px-8 snap-x">
                    {synastryResult.houseCompatibility.map((house, i) => {
                      const colors = getScoreColorHelper(house.score);
                      const isUnlocked = subscriptionStatus === 'premium' || house.houseNumber === 1 || house.houseNumber === 2;
                      
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex-shrink-0 w-[280px] snap-center cursor-pointer"
                          onClick={() => {
                            if (isUnlocked) {
                              setSelectedHouse(house);
                            } else {
                              setShowPremiumModal(true);
                            }
                          }}
                        >
                          <Card className={`p-6 bg-black ${colors.border} border backdrop-blur-xl h-full flex flex-col justify-between group hover:scale-[1.02] transition-all ${colors.glow} relative overflow-hidden`}>
                            <div className={`space-y-4 ${!isUnlocked ? "blur-md opacity-60 pointer-events-none" : ""}`}>
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <span className="text-4xl group-hover:scale-110 transition-transform block drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
                                      {HOUSE_ICONS[house.houseNumber]}
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className={`${colors.text} font-mystic text-base leading-tight font-semibold`}>{house.title}</h4>
                                    <p className={`text-[9px] ${colors.text} opacity-50 uppercase tracking-tighter`}>{house.theme}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className={`text-sm font-mystic ${colors.text} font-bold`}>%{house.score}</span>
                                  <p className={`text-[8px] ${colors.text} opacity-70 font-bold uppercase`}>{house.tierLabel}</p>
                                </div>
                              </div>

                              <div className="w-full bg-mystic-gold/10 h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${house.score}%` }}
                                  className={`h-full ${getBarColorHelper(house.score)}`}
                                />
                              </div>

                              <p className={`text-[15px] ${colors.text} font-bold leading-relaxed font-serif italic line-clamp-3`}>
                                {house.description}
                              </p>

                              <p className={`text-[9px] ${colors.text} opacity-40 text-center pt-2`}>{t('tapForDetails')}</p>
                            </div>

                            {!isUnlocked && (
                              <div className="absolute inset-0 flex items-center justify-center z-10">
                                <img 
                                  src="/Premium symbol.png" 
                                  alt="Premium Content" 
                                  className="w-40 h-40 object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] animate-pulse"
                                />
                              </div>
                            )}
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            <Button
              onClick={() => {
                setStep("input");
                setInputStep(0);
                setPartnerData({
                  full_name: "",
                  birth_date: new Date().toISOString().split('T')[0],
                  birth_time: "12:00",
                  birth_place: "",
                });
                setSynastryResult(null);
              }}
              variant="outline"
              className="w-full border-mystic-gold/30 text-mystic-gold hover:bg-mystic-gold/5 rounded-full h-14 font-mystic tracking-widest transition-all"
            >
              <RefreshCw className="w-4 h-4 mr-3" /> {t('recalculate')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedHouse && (
          <HouseDetailModal
            house={selectedHouse}
            onClose={() => setSelectedHouse(null)}
            userName={currentUserData.full_name}
            partnerName={partnerData.full_name}
          />
        )}
      </AnimatePresence>

      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </div>
  );
}
