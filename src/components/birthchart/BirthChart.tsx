"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useTime, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Sun,
  Moon,
  Compass,
  Star,
  Orbit,
  Heart,
  Zap,
  Ghost,
  Brain
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import {
  getSunSign,
  getMoonSign,
  getRisingSign,
  calculatePlanetaryPositions,
  getZodiacSymbol,
  getZodiacElement,
  ZODIAC_INTERPRETATIONS
} from "@/lib/astrology";
import {
  createBirthChartProfile,
  generateAIInterpretation,
  calculateEnergyLevels,
  getMonthlyForecast,
  BirthChartProfile,
  CosmicInterpretation
} from "@/lib/ai-interpretation";
import { fetchCosmicEvents } from "@/lib/cosmic-events-service";
import { AYLA_IMAGE as CONSTANT_AYLA_IMAGE } from "@/lib/constants";
import { PlanetIcon } from "../ui/PlanetIcon";
import { NatalPlanetModal } from "./NatalPlanetModal";
import { NatalSignModal } from "./NatalSignModal";
import { PremiumModal } from "@/components/premium/PremiumModal";
import { getNatalPlanetInterpretation } from "@/lib/natal-interpretations";
import { SIGN_INTERPRETATIONS } from "@/lib/sign-interpretations";
import { getEnergyDescription } from "@/lib/energy-potential-service";
import astroKnowledge from "@/lib/data/astro_knowledge_base.json";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ZodiacImage } from "../ui/ZodiacImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatHouseNumber } from "@/lib/transit-interpretations";
import { EnergyInfoPopup, type EnergyType } from "@/components/rituals/EnergyInfoPopup";
import { useInView } from "@/hooks/useInView";
import { InViewMotionDiv } from "@/components/ui/InViewMotionDiv";

const AYLA_IMAGE = CONSTANT_AYLA_IMAGE || "/assets/ayla/ayla_character.png";
import { InViewAnimatedWrapper } from "@/components/ui/InViewAnimatedWrapper";

const MotionCardBase = motion(Card);
const MotionCard = React.forwardRef(({ animate, style, children, ...props }: any, ref) => {
  const { ref: localRef, isInView } = useInView();
  
  React.useImperativeHandle(ref, () => localRef.current);
  
  const activeAnimate = isInView ? animate : undefined;
  
  // Handle style specifically for scale/filter animations used in this file
  const activeStyle = React.useMemo(() => {
    if (isInView) return style;
    if (!style) return style;
    
    // When out of view, sanitize style to remove motion values if they exist
    // and default to static values
    const { scale, filter, ...rest } = style;
    return { ...rest, scale: 1, filter: 'none' };
  }, [isInView, style]);

  return (
    <MotionCardBase
      ref={localRef}
      animate={activeAnimate}
      style={activeStyle}
      {...props}
    >
      {children}
    </MotionCardBase>
  );
});
MotionCard.displayName = "MotionCard";

const MotionButtonBase = motion(Button);
const MotionButton = React.forwardRef(({ animate, style, children, ...props }: any, ref) => {
  const { ref: localRef, isInView } = useInView();
  
  React.useImperativeHandle(ref, () => localRef.current);
  
  const activeAnimate = isInView ? animate : undefined;
  
  return (
    <MotionButtonBase
      ref={localRef}
      animate={activeAnimate}
      style={style}
      {...props}
    >
      {children}
    </MotionButtonBase>
  );
});
MotionButton.displayName = "MotionButton";

const PULSE_ANIMATION = {
  scale: [1, 1.025, 1],
  filter: [
    "drop-shadow(0 0 0px rgba(212,175,55,0))",
    "drop-shadow(0 0 15px rgba(212,175,55,0.6))",
    "drop-shadow(0 0 0px rgba(212,175,55,0))"
  ]
};

const PULSE_TRANSITION = {
  duration: 2,
  repeat: Infinity,
  times: [0, 0.5, 1],
  ease: "easeInOut" as const
};

const INNER_PULSE_ANIMATION = {
  scale: [1, 1.05, 1],
};

interface BirthChartProps {
  onBack: () => void;
  onTabChange?: (tab: any) => void;
}

import { BirthChartWheel } from "./BirthChartWheel";

const PLANET_DATA_CONFIG = [
  { key: "sun", nameKey: "Sun", symbol: "☉", color: "#fbbf24" },
  { key: "moon", nameKey: "Moon", symbol: "☽", color: "#f8fafc" },
  { key: "mercury", nameKey: "Mercury", symbol: "☿", color: "#f59e0b" },
  { key: "venus", nameKey: "Venus", symbol: "♀", color: "#f472b6" },
  { key: "mars", nameKey: "Mars", symbol: "♂", color: "#ef4444" },
  { key: "jupiter", nameKey: "Jupiter", symbol: "♃", color: "#c084fc" },
  { key: "saturn", nameKey: "Saturn", symbol: "♄", color: "#94a3b8" },
  { key: "uranus", nameKey: "Uranus", symbol: "♅", color: "#22d3ee" },
  { key: "neptune", nameKey: "Neptune", symbol: "♆", color: "#6366f1" },
  { key: "pluto", nameKey: "Pluto", symbol: "♇", color: "#a855f7" },
];

const signMap: Record<string, string> = {
  "Koç": "aries",
  "Boğa": "taurus",
  "İkizler": "gemini",
  "Yengeç": "cancer",
  "Aslan": "leo",
  "Başak": "virgo",
  "Terazi": "libra",
  "Akrep": "scorpio",
  "Yay": "sagittarius",
  "Oğlak": "capricorn",
  "Kova": "aquarius",
  "Balık": "pisces"
};

const signMapEnToTr: Record<string, string> = {
  "Aries": "Koç",
  "Taurus": "Boğa",
  "Gemini": "İkizler",
  "Cancer": "Yengeç",
  "Leo": "Aslan",
  "Virgo": "Başak",
  "Libra": "Terazi",
  "Scorpio": "Akrep",
  "Sagittarius": "Yay",
  "Capricorn": "Oğlak",
  "Aquarius": "Kova",
  "Pisces": "Balık"
};

const signMapTrToEn: Record<string, string> = {
  "Koç": "Aries",
  "Boğa": "Taurus",
  "İkizler": "Gemini",
  "Yengeç": "Cancer",
  "Aslan": "Leo",
  "Başak": "Virgo",
  "Terazi": "Libra",
  "Akrep": "Scorpio",
  "Yay": "Sagittarius",
  "Oğlak": "Capricorn",
  "Kova": "Aquarius",
  "Balık": "Pisces",
  "Bilinmiyor": "Unknown"
};

const elementMapTrToEn: Record<string, string> = {
  "Ateş": "Fire",
  "Toprak": "Earth",
  "Hava": "Air",
  "Su": "Water",
  "Bilinmiyor": "Unknown"
};

const getTranslatedSign = (sign: string, lang: string): string => {
  if (lang === 'en') {
    return signMapTrToEn[sign] || sign;
  }
  return sign;
};

const getTranslatedElement = (element: string, lang: string): string => {
  if (lang === 'en') {
    return elementMapTrToEn[element] || element;
  }
  return element;
};

export function BirthChart({ onBack, onTabChange }: BirthChartProps) {
  const { profile, subscriptionStatus } = useProfile();
  const { t, language } = useLanguage();
  const [chartData, setChartData] = useState<any>(null);
  const [birthChartProfile, setBirthChartProfile] = useState<BirthChartProfile | null>(null);
  const [interpretation, setInterpretation] = useState<CosmicInterpretation | null>(null);
  const [energyLevels, setEnergyLevels] = useState<any>(null);

  const [monthlyForecast, setMonthlyForecast] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"overview" | "planets" | "houses" | "interpretation" | "energy">("overview");
  const [selectedPlanet, setSelectedPlanet] = useState<{ name: string; sign: string } | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>("sun");
  const [selectedEnergyType, setSelectedEnergyType] = useState<EnergyType | null>(null);

  // Synchronized animation values
  const time = useTime();
  const pulseScale = useTransform(time, (t) => {
    const cycle = t % 2000;
    if (cycle < 1000) {
      return 1 + (0.025 * (cycle / 1000));
    } else {
      return 1.025 - (0.025 * ((cycle - 1000) / 1000));
    }
  });

  const pulseFilter = useTransform(time, (t) => {
    const cycle = t % 2000;
    let progress;
    if (cycle < 1000) progress = cycle / 1000;
    else progress = 1 - ((cycle - 1000) / 1000);
    
    const blur = 15 * progress;
    const alpha = 0.6 * progress;
    return `drop-shadow(0 0 ${blur}px rgba(212,175,55,${alpha}))`;
  });

  const innerPulseScale = useTransform(time, (t) => {
    const cycle = t % 2000;
    let progress;
    if (cycle < 1000) progress = cycle / 1000;
    else progress = 1 - ((cycle - 1000) / 1000);
    
    return 1 + (0.025 * progress);
  });

  const premiumPulseScale = useTransform(time, (t) => {
    const cycle = t % 2000;
    let progress;
    if (cycle < 1000) progress = cycle / 1000;
    else progress = 1 - ((cycle - 1000) / 1000);
    
    return 1 + (0.05 * progress);
  });

  useEffect(() => {
    const loadData = async () => {
      if (profile?.birth_date) {
        const birthDate = new Date(profile.birth_date);

        const bcProfile = await createBirthChartProfile(birthDate, profile.birth_time, profile.birth_place);
        setBirthChartProfile(bcProfile);

        setChartData({
          sunSign: bcProfile.sunSign,
          moonSign: bcProfile.moonSign,
          risingSign: bcProfile.risingSign,
          planets: bcProfile.planets,
          birthDate: profile.birth_date,
          birthTime: profile.birth_time,
          birthPlace: profile.birth_place
        });

          const [interp, energy, events] = await Promise.all([
            generateAIInterpretation(bcProfile, profile.id, language),
            calculateEnergyLevels(bcProfile, profile.id),
            fetchCosmicEvents()
          ]);

        setInterpretation(interp);
        setEnergyLevels(energy);
        setMonthlyForecast(getMonthlyForecast(bcProfile, events));
      }
    };
    loadData();
  }, [profile, language]);

  if (!chartData) {
    return (
        <InViewMotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-mystic-blue z-50 flex items-center justify-center"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))', paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
        <div className="text-center text-mystic-gold">
          <InViewAnimatedWrapper animationClass="animate-pulse">
            <Sparkles className="w-12 h-12 mx-auto mb-4" />
          </InViewAnimatedWrapper>
          <p className="font-mystic text-xl">{t('computingChart')}</p>
        </div>
      </InViewMotionDiv>
    );
  }

  const sunInterp = ZODIAC_INTERPRETATIONS[chartData.sunSign];
  const moonInterp = ZODIAC_INTERPRETATIONS[chartData.moonSign];
  const risingInterp = ZODIAC_INTERPRETATIONS[chartData.risingSign];

  const handlePlanetSelection = (planetKey: string, planetName: string, planetData: any) => {
    // Sun and Moon are always accessible, others require premium
    const isFreePlanet = planetKey === 'sun' || planetKey === 'moon';
    
    if (!isFreePlanet && subscriptionStatus !== 'premium') {
      setShowPremiumModal(true);
      return;
    }

    setSelectedPlanet({
      name: planetName,
      sign: typeof planetData === 'object' ? planetData.sign : planetData
    });
  };

    const renderOverview = () => {
      const sunSignKey = signMap[chartData.sunSign] || "aries";
      const moonSignKey = signMap[chartData.moonSign] || "aries";
      const risingSignKey = signMap[chartData.risingSign] || "aries";

      const sunInfo = (astroKnowledge.interpretations.sun as any)[sunSignKey];
      const moonInfo = (astroKnowledge.interpretations.moon as any)[moonSignKey];
      const risingInfo = chartData.risingSign !== "Bilinmiyor" ? (astroKnowledge.interpretations.ascendant as any)[risingSignKey] : null;

      return (
        <InViewMotionDiv
          key="overview"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-4"
        >
          <Card className="p-4 !bg-white/5 border-mystic-gold/20">
            <div className="flex items-center gap-4">
              <ZodiacImage sign={chartData.sunSign} size={56} className="shrink-0" />
              <div className="flex-1">
                <div className="mb-2">
                  <p className="text-white/50 text-xs">{t('sunSign')}</p>
                  <p className="text-white font-mystic text-lg">{getTranslatedSign(chartData.sunSign, language)}</p>
                  <p className="text-mystic-gold/70 text-xs">{getTranslatedElement(getZodiacElement(chartData.sunSign), language)} {t('element')}</p>
                </div>

                <p className="text-white/90 text-xs leading-relaxed border-t border-white/5 pt-2">
                    {language === 'en' ? sunInfo?.textEn : sunInfo?.text}
                  </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 !bg-white/5 border-mystic-gold/20">
            <div className="flex items-center gap-4">
              <ZodiacImage sign={chartData.moonSign} size={56} className="shrink-0" />
              <div className="flex-1">
                <div className="mb-2">
                  <p className="text-white/50 text-xs">{t('moonSign')}</p>
                  <p className="text-white font-mystic text-lg">{getTranslatedSign(chartData.moonSign, language)}</p>
                  <p className="text-mystic-gold/70 text-xs">{getTranslatedElement(getZodiacElement(chartData.moonSign), language)} {t('element')}</p>
                </div>

                <p className="text-white/90 text-xs leading-relaxed border-t border-white/5 pt-2">
                    {language === 'en' ? moonInfo?.textEn : moonInfo?.text}
                  </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 !bg-white/5 border-mystic-gold/20">
            <div className="flex items-center gap-4">
              {chartData.risingSign !== "Bilinmiyor" ? (
                <ZodiacImage sign={chartData.risingSign} size={56} className="shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Compass className="w-8 h-8 text-white/20" />
                </div>
              )}
              <div className="flex-1">
                <div className="mb-2">
                  <p className="text-white/50 text-xs">{t('risingSign')}</p>
                  <p className="text-white font-mystic text-lg">{getTranslatedSign(chartData.risingSign, language)}</p>
                  <p className="text-mystic-gold/70 text-xs">{chartData.risingSign !== "Bilinmiyor" ? getTranslatedElement(getZodiacElement(chartData.risingSign), language) + " " + t('element') : t('unknownTime')}</p>
                </div>

                {risingInfo && (
                    <p className="text-white/90 text-xs leading-relaxed border-t border-white/5 pt-2">
                      {language === 'en' ? risingInfo?.textEn : risingInfo?.text}
                    </p>
                  )}
              </div>
            </div>
          </Card>

          <div className="text-center text-white/40 text-xs mt-4">
            <p>{t('birthDate')}: {new Date(chartData.birthDate).toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR')}</p>
            {chartData.birthTime && <p>{t('birthTime')}: {chartData.birthTime}</p>}
            {chartData.birthPlace && <p>{t('birthCity')}: {chartData.birthPlace}</p>}
          </div>
        </InViewMotionDiv>
      );
    };

  const renderPlanets = () => (
    <InViewMotionDiv
      key="planets"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="grid grid-cols-2 gap-3"
    >
      {[
        { nameKey: "Mercury", key: "mercury" },
        { nameKey: "Venus", key: "venus" },
        { nameKey: "Mars", key: "mars" },
        { nameKey: "Jupiter", key: "jupiter" },
        { nameKey: "Saturn", key: "saturn" },
        { nameKey: "Uranus", key: "uranus" },
        { nameKey: "Neptune", key: "neptune" },
        { nameKey: "Pluto", key: "pluto" },
      ].map((planet) => {
        const isFreePlanet = planet.key === 'sun' || planet.key === 'moon';
        const isLocked = subscriptionStatus !== 'premium' && !isFreePlanet;
        
        return (
          <MotionCard
            animate={PULSE_ANIMATION}
            transition={PULSE_TRANSITION}
            key={planet.key}
            className={`p-3 !bg-white/5 border-mystic-gold/20 flex flex-col items-center text-center cursor-pointer hover:bg-white/10 transition-colors relative overflow-hidden`}
            onClick={() => {
              const planetData = chartData.planets[planet.key as keyof typeof chartData.planets];
              handlePlanetSelection(
                planet.key,
                t(planet.nameKey as keyof typeof import('@/locales/tr').tr),
                planetData
              );
            }}
          >
            <InViewMotionDiv 
              className={`w-full flex flex-col items-center`}
              animate={INNER_PULSE_ANIMATION}
              transition={PULSE_TRANSITION}
            >
              <div className="h-16 flex items-center justify-center mb-2">
                <div className={`${planet.key === 'saturn' ? 'w-16 h-16' : 'w-10 h-10'} transition-all`}>
                  <PlanetIcon name={t(planet.nameKey as keyof typeof import('@/locales/tr').tr)} className="w-full h-full" />
                </div>
              </div>
              <p className="text-white/50 text-[10px] uppercase">{t(planet.nameKey as keyof typeof import('@/locales/tr').tr)}</p>
              <div className="flex items-center gap-1">
                <p className="text-mystic-gold font-mystic text-sm">
                  {(() => {
                    const planetData = chartData.planets[planet.key as keyof typeof chartData.planets];
                    const sign = typeof planetData === 'object' ? planetData.sign : planetData;
                    return getTranslatedSign(sign, language);
                  })()}
                </p>
              </div>
            </InViewMotionDiv>
          </MotionCard>
        );
      })}
    </InViewMotionDiv>
  );

  const renderHouses = () => {
    if (!interpretation) return null;
    return (
      <InViewMotionDiv
        key="houses"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="space-y-3"
      >
        {Object.entries(interpretation.houses).map(([num, text]) => {
          const houseIndex = Number(num) - 1;
          const houseSign = birthChartProfile?.houses[houseIndex] || "";
          const isLocked = subscriptionStatus !== 'premium' && (Number(num) !== 1 && Number(num) !== 9);

          return (
              <MotionCard
                key={num}
                className={`p-4 !bg-white/5 border-mystic-gold/20 cursor-pointer hover:bg-white/10 transition-colors relative overflow-hidden ${isLocked ? 'opacity-90' : ''}`}
                style={{
                  scale: (selectedHouse === Number(num)) ? 1 : pulseScale,
                  filter: (selectedHouse === Number(num)) ? "drop-shadow(0 0 0px rgba(212,175,55,0))" : pulseFilter
                }}
                onClick={() => {
                  if (isLocked) {
                    setShowPremiumModal(true);
                  } else {
                    setSelectedHouse(selectedHouse === Number(num) ? null : Number(num));
                  }
                }}
              >
                <InViewMotionDiv 
                  className={`flex items-center justify-center w-full relative ${isLocked ? 'blur-sm select-none' : ''}`}
                  style={{
                    scale: (!isLocked && selectedHouse !== Number(num)) ? innerPulseScale : 1
                  } as any}
                >
                    <div className="relative flex items-center justify-center">
                      <div className="absolute right-full mr-4 flex items-center">
                      <ZodiacImage sign={houseSign} size={40} className="shrink-0" />
                    </div>
                    <p className="text-white font-mystic">{formatHouseNumber(Number(num), language)}: {getTranslatedSign(houseSign, language)}</p>
                    </div>
                </InViewMotionDiv>

                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.img 
                      src="/Premium symbol.png" 
                      alt="Premium" 
                      className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                      style={{ scale: premiumPulseScale }}
                    />
                  </div>
                )}

              {!isLocked && selectedHouse === Number(num) && (
                <InViewMotionDiv
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 pt-3 border-t border-white/10"
                >
                  <p className="text-gray-100 font-sans text-sm leading-relaxed text-center">
                    &quot;{text}&quot;
                  </p>
                </InViewMotionDiv>
              )}
            </MotionCard>
          );
        })}

      </InViewMotionDiv>
    );
  };

  const renderInterpretation = () => {
    const categories = [
      { id: "sun", name: t('Sun'), label: t('labelLifePurpose'), icon: <Sun className="w-5 h-5" />, planet: "sun", sign: chartData.sunSign },
      { id: "moon", name: t('Moon'), label: t('labelEmotionsInner'), icon: <Moon className="w-5 h-5" />, planet: "moon", sign: chartData.moonSign },
      { id: "mercury", name: t('Mercury'), label: t('labelMindCommunication'), icon: <Zap className="w-5 h-5" />, planet: "mercury", sign: chartData.planets.mercury.sign || chartData.planets.mercury },
      { id: "venus", name: t('Venus'), label: t('labelLoveValues'), icon: <Heart className="w-5 h-5" />, planet: "venus", sign: chartData.planets.venus.sign || chartData.planets.venus },
      { id: "mars", name: t('Mars'), label: t('labelActionPower'), icon: <Zap className="w-5 h-5" />, planet: "mars", sign: chartData.planets.mars.sign || chartData.planets.mars },
      { id: "jupiter", name: t('Jupiter'), label: t('labelLuckPhilosophy'), icon: <Star className="w-5 h-5" />, planet: "jupiter", sign: chartData.planets.jupiter.sign || chartData.planets.jupiter },
      { id: "ascendant", name: t('risingSign'), label: t('labelSocialMask'), icon: <Compass className="w-5 h-5" />, planet: "ascendant", sign: chartData.risingSign },
    ];

    return (
      <InViewMotionDiv
        key="interpretation"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-3 mb-4 bg-white/5 p-4 rounded-2xl border border-mystic-gold/20">
          <div className="w-12 h-12 shrink-0">
            <img src={AYLA_IMAGE} alt="Ayla" className="w-full h-full ayla-isolated" />
          </div>
          <div>
            <h3 className="text-mystic-gold font-mystic text-lg">{t('interpretationTitle')}</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">{t('aylaGuidanceDesc')}</p>
          </div>
        </div>

        {categories.map((cat) => {
          const signKey = signMap[cat.sign] || "aries";
          const data = (astroKnowledge.interpretations as any)[cat.planet]?.[signKey];
          const isOpen = openAccordion === cat.id;
          const isLocked = subscriptionStatus !== 'premium' && (cat.id !== 'sun' && cat.id !== 'moon');

          if (!data) return null;

          return (
            <MotionCard 
              key={cat.id} 
              className={`overflow-hidden !bg-white/5 border-mystic-gold/20 relative ${isLocked ? 'opacity-90' : ''}`}
              style={{
                scale: isOpen ? 1 : pulseScale,
                filter: isOpen ? "drop-shadow(0 0 0px rgba(212,175,55,0))" : pulseFilter
              }}
            >
              <button
                onClick={() => {
                  if (isLocked) {
                    setShowPremiumModal(true);
                  } else {
                    setOpenAccordion(isOpen ? null : cat.id);
                  }
                }}
                className="w-full p-4 flex items-center justify-center relative text-left transition-colors hover:bg-white/5"
              >
                <InViewMotionDiv 
                  className={`flex items-center justify-center w-full relative ${isLocked ? 'blur-sm select-none' : ''}`}
                  style={{
                    scale: (!isLocked && !isOpen) ? innerPulseScale : 1
                  } as any}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute right-full mr-4 flex items-center">
                      <ZodiacImage sign={cat.sign} size={40} className="shrink-0" />
                    </div>
                    <p className="text-white font-mystic">{cat.label}</p>
                  </div>
                </InViewMotionDiv>
                {!isLocked && (
                  <div className="absolute right-4">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-mystic-gold" /> : <ChevronDown className="w-5 h-5 text-white/20" />}
                  </div>
                )}
              </button>

              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <motion.img 
                    src="/Premium symbol.png" 
                    alt="Premium" 
                    className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                    style={{ scale: premiumPulseScale }}
                  />
                </div>
              )}

              <AnimatePresence>
                {!isLocked && isOpen && (
                      <InViewMotionDiv
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4"
                      >
                        <div className="pt-3 border-t border-white/10">
                          <h4 className="text-mystic-gold font-mystic mb-2">{language === 'en' ? data.titleEn : data.title}</h4>
                          <p className="text-gray-100 font-sans text-sm leading-relaxed mb-4 not-italic">
                            {language === 'en' ? data.textEn : data.text}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {(language === 'en' ? data.keywordsEn : data.keywords)?.map((kw: string) => (
                              <span key={kw} className="text-[10px] bg-white/5 text-white/80 px-2 py-1 rounded-full border border-white/10">
                                #{kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </InViewMotionDiv>
                )}
              </AnimatePresence>
            </MotionCard>
          );
        })}

      </InViewMotionDiv>
    );
  };

  const renderEnergy = () => {
    if (!energyLevels) return null;

    const energyConfig: Record<string, { color: string; bgColor: string; textColor: string; borderColor: string; shadowColor: string; icon: React.ReactNode; energyType: EnergyType; activePlanets: { name: string; enName: string; percentage: number }[] }> = {
      mental: { 
        color: 'from-blue-500 to-blue-400', 
        bgColor: 'bg-blue-500/10', 
        textColor: 'text-blue-400', 
        borderColor: 'border-blue-400/30', 
        shadowColor: 'shadow-blue-400/20', 
        icon: <Brain className="w-4 h-4" />, 
        energyType: 'mental',
        activePlanets: [
          { name: 'Merkür', enName: 'Mercury', percentage: 45.45 },
          { name: 'Uranüs', enName: 'Uranus', percentage: 27.27 },
          { name: 'Jüpiter', enName: 'Jupiter', percentage: 13.64 },
          { name: 'Satürn', enName: 'Saturn', percentage: 13.64 }
        ]
      },
      emotional: { 
        color: 'from-rose-500 to-rose-400', 
        bgColor: 'bg-rose-500/10', 
        textColor: 'text-rose-400', 
        borderColor: 'border-rose-400/30', 
        shadowColor: 'shadow-rose-400/20', 
        icon: <Heart className="w-4 h-4" />, 
        energyType: 'emotional',
        activePlanets: [
          { name: 'Ay', enName: 'Moon', percentage: 41.67 },
          { name: 'Venüs', enName: 'Venus', percentage: 25.00 },
          { name: 'Neptün', enName: 'Neptune', percentage: 16.67 },
          { name: 'Plüton', enName: 'Pluto', percentage: 16.67 }
        ]
      },
      physical: { 
        color: 'from-amber-500 to-amber-400', 
        bgColor: 'bg-amber-500/10', 
        textColor: 'text-amber-500', 
        borderColor: 'border-amber-400/30', 
        shadowColor: 'shadow-amber-400/20', 
        icon: <Zap className="w-4 h-4" />, 
        energyType: 'physical',
        activePlanets: [
          { name: 'Güneş', enName: 'Sun', percentage: 36.36 },
          { name: 'Mars', enName: 'Mars', percentage: 36.36 },
          { name: 'Ay', enName: 'Moon', percentage: 13.64 },
          { name: 'Plüton', enName: 'Pluto', percentage: 13.64 }
        ]
      },
      spiritual: { 
        color: 'from-purple-500 to-purple-400', 
        bgColor: 'bg-purple-500/10', 
        textColor: 'text-purple-400', 
        borderColor: 'border-purple-400/30', 
        shadowColor: 'shadow-purple-400/20', 
        icon: <Ghost className="w-4 h-4" />, 
        energyType: 'spiritual',
        activePlanets: [
          { name: 'Neptün', enName: 'Neptune', percentage: 29.63 },
          { name: 'Jüpiter', enName: 'Jupiter', percentage: 22.22 },
          { name: 'Plüton', enName: 'Pluto', percentage: 18.52 },
          { name: 'Güneş', enName: 'Sun', percentage: 14.81 },
          { name: 'Ay', enName: 'Moon', percentage: 14.81 }
        ]
      }
    };

    const orderedKeys = ['mental', 'emotional', 'physical', 'spiritual'];

    return (
      <motion.div
        key="energy"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="space-y-4"
      >
        <Card className="p-4 !bg-black/40 border-mystic-gold/30">
          <div className="text-center mb-6">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{t('totalEnergyPotential')}</p>
            <div className="text-4xl font-mystic text-mystic-gold">{energyLevels.overall_energy}%</div>
            <MotionButton
              animate={PULSE_ANIMATION}
              transition={PULSE_TRANSITION}
              onClick={() => onTabChange?.("archetype")}
              className="mt-4 px-6 py-2 bg-black text-[#00ffff] border border-[#00ffff]/30 rounded-xl font-mystic text-[10px] tracking-[0.15em] shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all"
            >
              {t('showArchetype')}
            </MotionButton>
          </div>

          <div className="space-y-5">
            {orderedKeys.map((key) => {
              const data = energyLevels.categories[key];
              if (!data) return null;
              const config = energyConfig[key];
              return (
                <motion.div 
                  animate={PULSE_ANIMATION}
                  transition={PULSE_TRANSITION}
                  key={key} 
                  className={`rounded-2xl border ${config.borderColor} ${config.bgColor} p-4 shadow-lg ${config.shadowColor} transition-all hover:shadow-xl`}
                >
                    <button 
                      onClick={() => setSelectedEnergyType(config.energyType)}
                      className="w-full flex justify-between items-center mb-3 cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <div className="flex items-center gap-2">
                        <span className={config.textColor}>{config.icon}</span>
                        <span className={`font-mystic text-sm uppercase tracking-wider ${config.textColor} drop-shadow-[0_0_8px_currentColor]`}>
                          {key === 'mental' ? t('mental') : key === 'emotional' ? t('emotional') : key === 'physical' ? t('physical') : t('spiritual')}
                        </span>
                      </div>
                      <span className={`text-sm font-black ${config.textColor} drop-shadow-[0_0_5px_currentColor]`}>%{data.percentage}</span>
                    </button>

                  <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/10 mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.percentage}%` }}
                      className={`h-full bg-gradient-to-r ${config.color}`}
                    />
                  </div>

                  <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                    <p className={`${config.textColor} text-xs leading-relaxed font-serif font-bold mb-2`} style={{ textShadow: '0 0 15px currentColor' }}>
                        &quot;{getEnergyDescription(key, data.level, language)}&quot;
                      </p>
                  <div className="flex items-start gap-2">
                    <div className={`w-4 h-4 ${config.textColor} opacity-70 mt-0.5 flex-shrink-0`}>
                      <Star className="w-full h-full" />
                    </div>
                    <p className="text-[10px] text-white/40 flex flex-wrap items-center gap-1">
                      <span className="font-semibold">{t('activePlanets')}:</span>
                      <span className={`${config.textColor} font-mystic`}>
                        {config.activePlanets.map((p, i) => (
                          <span key={p.name}>
                            {language === 'en' ? p.enName : p.name} (%{p.percentage.toFixed(2).replace('.00', '')})
                            {i < config.activePlanets.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </Card>

        <p className="text-[10px] text-white/30 text-center italic px-4">
          *{t('chartCalculatedBasedOn')}
        </p>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-gradient-to-b from-mystic-blue via-indigo-950 to-mystic-purple z-50 overflow-y-auto"
    >
      <div className="max-w-md mx-auto px-4 pb-[calc(56px+env(safe-area-inset-bottom)+1.5rem)]">
        <header className="app-header mb-6 relative">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-mystic-gold absolute left-0">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="font-mystic text-2xl text-mystic-gold">{t('myBirthChart')}</h1>
        </header>

        <div className="relative w-full max-w-[400px] mx-auto mb-8 overflow-hidden p-1">
          <BirthChartWheel
            planets={PLANET_DATA_CONFIG.map(p => ({
              name: t(p.nameKey as keyof typeof import('@/locales/tr').tr),
              symbol: p.symbol,
              color: p.color,
              longitude: (chartData.planets[p.key as keyof typeof chartData.planets] as any)?.longitude || 0
            }))}
            houseCusps={birthChartProfile?.houseCusps || []}
            aspects={birthChartProfile?.aspects.map(a => ({
              p1: a.planet1,
              p2: a.planet2,
              type: a.type
            })) || []}
            onPlanetClick={(planetName) => {
              const config = PLANET_DATA_CONFIG.find(p => t(p.nameKey as keyof typeof import('@/locales/tr').tr) === planetName);
              if (config) {
                const isFreePlanet = config.key === 'sun' || config.key === 'moon';
                if (!isFreePlanet && subscriptionStatus !== 'premium') {
                  setShowPremiumModal(true);
                  return;
                }

                const planetData = chartData.planets[config.key as keyof typeof chartData.planets];
                setActiveTab("planets");
                setSelectedPlanet({
                  name: planetName,
                  sign: typeof planetData === 'object' ? planetData.sign : planetData
                });
              }
            }}
            onSignClick={(signName) => {
              setSelectedSign(signName);
            }}
          />
        </div>



        <div className="flex gap-2 mb-6 overflow-x-auto p-4 no-scrollbar">
          {[
            { id: "overview", label: t('tabSummary') },
            { id: "planets", label: t('tabPlanets') },
            { id: "houses", label: t('tabHouses') },
            { id: "interpretation", label: t('tabAnalysis') },
            { id: "energy", label: t('tabEnergy') }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 h-8 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-black text-mystic-gold border border-mystic-gold shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-105" 
                    : "bg-black text-mystic-gold/70 border border-mystic-gold/30 hover:text-mystic-gold hover:border-mystic-gold"
                }`}
                animate={!isActive ? {
                   scale: [1, 1.05, 1],
                   filter: [
                     "drop-shadow(0 0 0px rgba(212,175,55,0))",
                     "drop-shadow(0 0 5px rgba(212,175,55,0.4))",
                     "drop-shadow(0 0 0px rgba(212,175,55,0))"
                   ]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  times: [0, 0.5, 1],
                  ease: "easeInOut"
                }}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "planets" && renderPlanets()}
          {activeTab === "houses" && renderHouses()}
          {activeTab === "interpretation" && renderInterpretation()}
          {activeTab === "energy" && renderEnergy()}
        </AnimatePresence>

        {selectedPlanet && (
            <NatalPlanetModal
              isOpen={!!selectedPlanet}
              onClose={() => setSelectedPlanet(null)}
              planetName={selectedPlanet.name}
              planetSign={selectedPlanet.sign}
              interpretation={getNatalPlanetInterpretation(selectedPlanet.name, selectedPlanet.sign, language)}
            />
          )}

        {selectedSign && (
          <NatalSignModal
            isOpen={!!selectedSign}
            onClose={() => setSelectedSign(null)}
            signName={selectedSign}
            interpretation={SIGN_INTERPRETATIONS[selectedSign] || ""}
          />
        )}

        <EnergyInfoPopup
          isOpen={selectedEnergyType !== null}
          onClose={() => setSelectedEnergyType(null)}
          energyType={selectedEnergyType || 'mental'}
        />

        <PremiumModal 
          isOpen={showPremiumModal} 
          onClose={() => setShowPremiumModal(false)} 
        />
      </div>
    </motion.div>
  );
}
