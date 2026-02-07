"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, AlertTriangle, Zap, MessageSquare, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GuidanceData } from "@/lib/dynamic-affirmation-service";
import { getInterpolatedEnergyColor } from "@/lib/planetary-energy-service";
import { useLanguage } from "@/contexts/LanguageContext";
import { Capacitor } from "@capacitor/core";
import { InViewAnimatedWrapper } from "@/components/ui/InViewAnimatedWrapper";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Swiper instance type for TypeScript
import { Swiper as SwiperType } from 'swiper/types';


interface GuidanceCarouselProps {
  data: GuidanceData;
  loading?: boolean;
  todayEnergy?: number;
  luckyColor?: string;
  luckyColorHex?: string;
  onEnergyClick?: () => void;
}

// Helper to determine text color based on background luminance
const getContrastTextColor = (rgba: string) => {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return "text-white";
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.8 ? "text-black" : "text-white";
};

const getHexContrastTextColor = (hex?: string) => {
  if (!hex) return "text-white";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "text-black" : "text-white";
};


export function GuidanceCarousel({ data, loading, todayEnergy, luckyColor, luckyColorHex, onEnergyClick }: GuidanceCarouselProps) {
  const { t } = useLanguage();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    setIsAndroid(Capacitor.getPlatform() === 'android');
  }, []);

  const energyColor = todayEnergy !== undefined ? getInterpolatedEnergyColor(todayEnergy, 0.3) : "rgba(255, 255, 255, 0.1)";
  const energyTextColor = getContrastTextColor(energyColor);
  const luckyTextColor = getHexContrastTextColor(luckyColorHex);

  const cards = [
    ...(todayEnergy !== undefined ? [{
      title: t('dailyCosmicEnergy'),
      content: "",
      icon: <Zap className="w-4 h-4" />,
      backgroundColor: energyColor,
      textColor: energyTextColor,
      borderColor: "border-white/20",
      onClick: onEnergyClick,
      customRender: (
        <div className="flex-1 flex flex-col items-center justify-center -mt-1">
          <span className={`text-5xl font-black tracking-tighter ${energyTextColor}`}>
            %{todayEnergy}
          </span>
        </div>
      )
    }] : []),
    ...(luckyColor ? [{
      title: t('dailyLuckyColor'),
      content: "",
      icon: <Heart className="w-4 h-4" />,
      backgroundColor: luckyColorHex || "rgba(0,0,0,0.4)",
      textColor: luckyTextColor,
      borderColor: "border-white/20",
      customRender: (
        <div className="flex-1 flex flex-col items-center justify-center mt-1">
          <span className={`text-3xl font-black tracking-tight uppercase ${luckyTextColor}`}>
            {luckyColor}
          </span>
        </div>
      )
    }] : []),
    {
      title: t('aylaGuidance'),
      content: data.guidance,
      icon: <Sparkles className="w-4 h-4" />,
      gradient: "from-mystic-purple/40 to-indigo-900/40",
      borderColor: "border-mystic-gold/30",
      textColor: "text-white"
    },
    {
      title: t('dailyAffirmation'),
      content: data.affirmation,
      icon: <MessageSquare className="w-4 h-4" />,
      gradient: "from-rose-900/30 to-mystic-purple/30",
      borderColor: "border-rose-500/30",
      textColor: "text-white"
    },
    {
      title: t('cosmicWarning'),
      content: data.warning,
      icon: <AlertTriangle className="w-4 h-4" />,
      gradient: "from-amber-900/30 to-black/40",
      borderColor: "border-amber-500/30",
      textColor: "text-white"
    },
    {
      title: t('dailyFocus'),
      content: data.focus,
      icon: <Zap className="w-4 h-4" />,
      gradient: "from-cyan-900/30 to-indigo-950/40",
      borderColor: "border-cyan-500/30",
      textColor: "text-white"
    },
    {
      title: t('dayToDay'),
      content: data.dayToDay,
      icon: <Sparkles className="w-4 h-4" />,
      gradient: "from-indigo-900/30 to-mystic-blue/40",
      borderColor: "border-indigo-500/30",
      textColor: "text-white"
    },
    {
      title: t('eventToEvent'),
      content: data.eventImpact,
      icon: <Zap className="w-4 h-4" />,
      gradient: "from-emerald-900/30 to-teal-950/40",
      borderColor: "border-emerald-500/30",
      textColor: "text-white"
    },
    {
      title: t('happinessLevel'),
      content: data.emotionImpact,
      icon: <MessageSquare className="w-4 h-4" />,
      gradient: "from-pink-900/30 to-rose-950/40",
      borderColor: "border-pink-500/30",
      textColor: "text-white"
    }
  ];

  return (
    <div className="relative w-full space-y-4">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1.1}
          centeredSlides={false}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          // Android-specific friction settings
          touchRatio={isAndroid ? 0.7 : 1} // Reduces touch sensitivity on Android
          resistanceRatio={isAndroid ? 0.65 : 0.85} // Increases resistance to pulls
          touchAngle={45}
          className="w-full !overflow-visible"
        >
          {cards.map((card: any, idx) => (
            <SwiperSlide key={idx} className="h-full">
              <Card
                onClick={card.onClick}
                className={`p-3 min-h-[90px] h-full flex flex-col justify-between border backdrop-blur-md relative overflow-hidden group ${card.backgroundColor ? '' : '!bg-transparent'} ${card.gradient ? `bg-gradient-to-br ${card.gradient}` : ''} ${card.borderColor} ${card.onClick ? 'cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all' : ''}`}
                style={{
                  backgroundColor: card.backgroundColor || undefined,
                }}
              >
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  {React.cloneElement(card.icon as React.ReactElement<any>, { className: "w-10 h-10" })}
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-center mb-3 relative">
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${card.textColor || 'text-white/60'} relative text-center`}>
                      <div className="absolute right-full mr-[1em] top-1/2 -translate-y-1/2 flex items-center justify-center">
                        {React.cloneElement(card.icon as React.ReactElement<any>, { className: "w-3.5 h-3.5" })}
                      </div>
                      {card.title}
                    </span>
                  </div>

                  {loading ? (
                    <div className="space-y-2 flex-1 flex flex-col justify-center">
                      <InViewAnimatedWrapper className="h-3 w-full bg-white/5 rounded" animationClass="animate-pulse" />
                      <InViewAnimatedWrapper className="h-3 w-2/3 bg-white/5 rounded" animationClass="animate-pulse" />
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-center">
                      {card.content && (
                        <p className={`${card.textColor || 'text-white/90'} text-xs leading-relaxed font-medium text-center px-1`}>
                          {card.content}
                        </p>
                      )}
                      {card.customRender}
                    </div>
                  )}
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {!isEnd && (
          <InViewAnimatedWrapper animationClass="animate-pulse" className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 opacity-60 pointer-events-none">
            <ChevronRight className="w-5 h-5 text-mystic-gold" />
          </InViewAnimatedWrapper>
        )}
        {!isBeginning && (
          <InViewAnimatedWrapper animationClass="animate-pulse" className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 opacity-60 pointer-events-none">
            <ChevronLeft className="w-5 h-5 text-mystic-gold" />
          </InViewAnimatedWrapper>
        )}
      </div>
    </div>
  );
}
