"use client";

import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { AYLA_IMAGE as CONSTANT_AYLA_IMAGE } from "@/lib/constants";
import { SplashScreen } from "@/components/splash/SplashScreenProps";

const AYLA_IMAGE = CONSTANT_AYLA_IMAGE || "/assets/ayla/ayla_character.png";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const { profile, loading, refreshProfile } = useProfile();
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [localOnboardingDone, setLocalOnboardingDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const splashShown = sessionStorage.getItem('ayla_splash_shown');
    if (splashShown === 'true') {
      setSplashDone(true);
    }
    const onboardingDone = localStorage.getItem('ayla_onboarding_done');
    if (onboardingDone === 'true') {
      setLocalOnboardingDone(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setSplashDone(true);
    sessionStorage.setItem('ayla_splash_shown', 'true');
  };

  if (!mounted) {
    return (
      <div 
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        style={{ width: '100vw', height: '100dvh', overflow: 'hidden' }}
      >
        <img
          src="/assets/ayla/IMG_1573.JPG"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ maxHeight: '100dvh', maxWidth: '100vw' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>
    );
  }

  if (!splashDone) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const isDone = profile || onboardingComplete || localOnboardingDone;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-mystic-blue via-indigo-950 to-mystic-purple flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-mystic-gold/20 rounded-full blur-3xl animate-pulse" />
          <img
            src={AYLA_IMAGE}
            alt="Ayla"
            className="w-32 h-32 relative z-10 animate-pulse ayla-isolated"
          />
        </div>
        <p className="font-mystic text-xl text-mystic-gold animate-pulse">{t('calculatingDesc')}</p>
      </div>
    );
  }

  if (!isDone) {
    return <OnboardingFlow onComplete={() => {
      setOnboardingComplete(true);
      refreshProfile();
    }} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-mystic-blue via-indigo-950 to-mystic-purple relative overflow-hidden">
      <div className="star-field absolute inset-0 opacity-10 pointer-events-none" />
      <Dashboard profile={profile} />
    </main>
  );
}
