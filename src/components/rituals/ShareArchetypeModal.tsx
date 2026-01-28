"use client";
import { safeJSONParse } from "@/lib/safe-utils";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Loader2, X, ImageDown, FolderDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArchetypeSlogan } from "@/lib/data/archetype-slogans";
import { useLanguage } from "@/contexts/LanguageContext";
import { Capacitor } from '@capacitor/core';
import { useArchetypeShare, ShareArchetypeParams } from "@/hooks/useArchetypeShare";

interface ShareArchetypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  archetype: any;
  energyData: any;
  archetypeKey: string;
  initialUserName?: string;
}

const AYLA_APP_LOGO = "/assets/ayla/ayla-transparent.PNG";
const AYLA_TEXT_LOGO = "/ayla-text-logo.png";
const SQUARE_IMAGE_KEYS = ["Z-R-F-D", "F-D-Z-R", "Z-F-D-R", "R-F-D-Z", "R-D-F-Z", "R-D-Z-F", "R-Z-D-F", "Z-F-R-D", "Z-D-R-F"];

export function ShareArchetypeModal({ isOpen, onClose, archetype, energyData, archetypeKey, initialUserName }: ShareArchetypeModalProps) {
  const { language } = useLanguage();
  const { shareWithParams, saveToPhotos, saveToFiles } = useArchetypeShare();
  const [isExporting, setIsExporting] = useState(false);
  const [exportAction, setExportAction] = useState<'share' | 'photos' | 'files' | null>(null);
  const [userName, setUserName] = useState(initialUserName || "");
  const [scale, setScale] = useState(1);
  const isNative = Capacitor.isNativePlatform();

  const archetypeSlogan = getArchetypeSlogan(archetypeKey, language);
  const archetypeImageUrl = SQUARE_IMAGE_KEYS.includes(archetypeKey) ? archetype.image : (archetype.imageFull || archetype.image);

  useEffect(() => {
    if (isOpen) {
      const guestData = localStorage.getItem('ayla_user_data') || localStorage.getItem('maya_user_data') || localStorage.getItem('user_profile') || localStorage.getItem('ayla_onboarding_data');
      if (guestData) {
        try {
          const parsed = safeJSONParse(guestData, {} as any);
          const name = parsed.full_name || parsed.name || parsed.firstName || "";
          if (name) setUserName(name);
        } catch (e) {
          console.error("Error parsing user data", e);
        }
      }

      const handleResize = () => {
        const width = window.innerWidth;
        const targetWidth = 450;
        const padding = 20;
        if (width < targetWidth + padding) {
          const newScale = (width - padding) / targetWidth;
          setScale(newScale);
        } else {
          setScale(1);
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isOpen]);

  const getShareParams = (): ShareArchetypeParams => ({
    archetype: {
      name: archetype.name,
      enName: archetype.enName,
      group: archetype.group,
      enGroup: archetype.enGroup,
      className: archetype.className,
      enClassName: archetype.enClassName,
      description: archetype.description,
      enDescription: archetype.enDescription,
      image: archetype.image,
      imageFull: archetype.imageFull,
    },
    archetypeKey,
    userName,
    energyData: {
      categories: {
        spiritual: { percentage: energyData.categories.spiritual.percentage },
        mental: { percentage: energyData.categories.mental.percentage },
        physical: { percentage: energyData.categories.physical.percentage },
        emotional: { percentage: energyData.categories.emotional.percentage },
      },
    },
    archetypeSlogan,
    language: language as 'tr' | 'en',
    archetypeImageUrl,
  });

  const handleShare = async () => {
    setIsExporting(true);
    setExportAction('share');
    await shareWithParams(getShareParams(), 'share');
    setIsExporting(false);
    setExportAction(null);
  };

  const handleSaveToPhotos = async () => {
    setIsExporting(true);
    setExportAction('photos');
    await saveToPhotos(getShareParams());
    setIsExporting(false);
    setExportAction(null);
  };

  const handleSaveToFiles = async () => {
    setIsExporting(true);
    setExportAction('files');
    await saveToFiles(getShareParams());
    setIsExporting(false);
    setExportAction(null);
  };

  if (!isOpen || !archetype) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl overflow-y-auto pt-[calc(env(safe-area-inset-top)+4rem)] pb-[calc(env(safe-area-inset-bottom)+2.5rem)] px-4 flex flex-col items-center"
        >
          <button
            onClick={onClose}
            className="fixed top-[calc(env(safe-area-inset-top)+1rem)] right-4 z-[110] w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all active:scale-90"
          >
            <X className="w-7 h-7" />
          </button>

          <div className="w-full max-w-[450px] relative flex flex-col items-center">
            <div
              style={{
                width: '100%',
                aspectRatio: '9/16',
                transform: `scale(${scale})`,
                transformOrigin: 'center top',
                marginBottom: `${-(1 - scale) * (window.innerWidth / 9 * 16)}px`
              }}
            >
              <div
                className="relative bg-black rounded-[2.5rem] border border-mystic-gold/20 shadow-[0_0_40px_rgba(255,215,0,0.1)] overflow-hidden w-full h-full"
              >
                <div
                  id="capture-card-content"
                  className="w-full h-full bg-black text-mystic-gold relative flex flex-col items-center p-8 pt-4 text-center overflow-hidden"
                >
                  <CardContent
                    archetype={archetype}
                    archetypeKey={archetypeKey}
                    userName={userName}
                    energyData={energyData}
                    archetypeSlogan={archetypeSlogan}
                    language={language}
                    archetypeImageUrl={archetypeImageUrl}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3 mt-6">
              <Button
                onClick={handleShare}
                disabled={isExporting}
                className="w-full rounded-full bg-mystic-gold text-black hover:bg-mystic-gold/90 h-14 text-base font-bold flex items-center justify-center gap-3 shadow-xl shadow-mystic-gold/20 active:scale-[0.98] transition-transform"
              >
                {isExporting && exportAction === 'share' ? <Loader2 className="w-6 h-6 animate-spin" /> : <Share2 className="w-6 h-6" />}
                {isExporting && exportAction === 'share' ? (language === 'en' ? "Preparing..." : "Hazırlanıyor...") : (language === 'en' ? "Share" : "Paylaş")}
              </Button>

              {isNative && (
                <div className="flex gap-3">
                  <Button
                    onClick={handleSaveToPhotos}
                    disabled={isExporting}
                    variant="outline"
                    className="flex-1 rounded-full border-mystic-gold/40 text-mystic-gold hover:bg-mystic-gold/10 h-12 text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                  >
                    {isExporting && exportAction === 'photos' ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageDown className="w-5 h-5" />}
                    {language === 'en' ? "Photos" : "Fotoğraflar"}
                  </Button>
                  <Button
                    onClick={handleSaveToFiles}
                    disabled={isExporting}
                    variant="outline"
                    className="flex-1 rounded-full border-mystic-gold/40 text-mystic-gold hover:bg-mystic-gold/10 h-12 text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                  >
                    {isExporting && exportAction === 'files' ? <Loader2 className="w-5 h-5 animate-spin" /> : <FolderDown className="w-5 h-5" />}
                    {language === 'en' ? "Files" : "Dosyalar"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CardContent({ archetype, archetypeKey, userName, energyData, archetypeSlogan, language = 'tr', archetypeImageUrl }: any) {
  const isEn = language === 'en';
  const energyLabels = isEn
    ? { spiritual: "SPIRITUAL", mental: "MENTAL", physical: "PHYSICAL", emotional: "EMOTIONAL" }
    : { spiritual: "RUHSAL", mental: "ZİHİNSEL", physical: "FİZİKSEL", emotional: "DUYGUSAL" };

  const defaultUserName = isEn ? "TRAVELER" : "GEZGİN";
  const archetypeName = isEn ? (archetype.enName || archetype.name) : archetype.name;
  const archetypeGroup = isEn ? (archetype.enGroup || archetype.group) : archetype.group;
  const archetypeClassName = isEn ? (archetype.enClassName || archetype.className) : archetype.className;
  const archetypeDescription = isEn ? (archetype.enDescription || archetype.description) : archetype.description;

  const titleText = isEn
    ? `${userName.toUpperCase() || defaultUserName}, THE ${archetypeName.toUpperCase()}`
    : `${userName.toUpperCase() || defaultUserName}, ${archetypeName.toUpperCase()}`;

  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,215,0,0.08) 0%, transparent 70%)',
          border: 'none',
          margin: '0',
          padding: '0'
        }}
      />

      <div
        className="relative z-10 flex flex-col w-full h-full items-center"
        style={{
          border: 'none',
          margin: '0',
          boxSizing: 'border-box'
        }}
      >
        <div className="w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden mt-2">
          <div className="w-[75%] h-full relative flex items-center justify-center">
            <img
              src={archetypeImageUrl}
              alt={archetype.name}
              className="w-full h-full object-contain"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-0.5 mb-4 px-4 text-center">
          <h2 className="text-[18px] font-mystic uppercase tracking-wider leading-tight" style={{ color: '#FFD700' }}>
            {titleText}
          </h2>
          <p className="text-[12px] font-mystic uppercase tracking-[0.2em] leading-tight" style={{ color: 'rgba(255,215,0,0.8)' }}>
            {archetypeGroup?.toUpperCase()} • {archetypeKey}
          </p>
          <p className="text-[11px] font-mystic uppercase tracking-[0.15em] leading-tight mt-1" style={{ color: 'rgba(255,215,0,0.7)' }}>
            {archetypeClassName?.toUpperCase()}
          </p>
        </div>

        <div
          className="w-full grid grid-cols-4 gap-3 mb-6 px-4"
        >
          <MiniStat label={energyLabels.spiritual} value={energyData.categories.spiritual.percentage} color="#A78BFA" />
          <MiniStat label={energyLabels.mental} value={energyData.categories.mental.percentage} color="#60A5FA" />
          <MiniStat label={energyLabels.physical} value={energyData.categories.physical.percentage} color="#FBBF24" />
          <MiniStat label={energyLabels.emotional} value={energyData.categories.emotional.percentage} color="#FB7185" />
        </div>

        <div className="w-full flex flex-col items-center mt-auto pb-4">
          <div className="px-6 text-center mb-2">
            <p className="text-[16px] font-serif italic leading-tight" style={{ color: '#FFD700' }}>
              &quot;{archetypeSlogan.includes('(') ? archetypeSlogan.split('(')[0].trim() : archetypeSlogan}&quot;
            </p>
            {archetypeSlogan.includes('(') && (
              <p className="text-[10px] font-mystic uppercase tracking-widest italic leading-tight mt-0.5" style={{ color: 'rgba(255,215,0,0.7)' }}>
                {archetypeSlogan.split('(')[1].replace(')', '').trim()}
              </p>
            )}
          </div>
          <div className="px-8">
            <p className="text-[12.5px] leading-snug font-medium text-center" style={{ color: '#FFD700' }}>
              {archetypeDescription}
            </p>
          </div>

          <div
            className="flex items-center justify-center gap-[1px]"
            style={{ marginTop: '6px' }}
          >
            <img
              src={AYLA_APP_LOGO}
              alt="Ayla"
              style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'invert(1)' }}
            />
            <img
              src={AYLA_TEXT_LOGO}
              alt="ayla.app"
              style={{ height: '142px', width: 'auto', objectFit: 'contain', filter: 'invert(1)' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      className="flex flex-col gap-1.5"
    >
      <div
        className="flex justify-between items-center px-0.5"
      >
        <span className="text-[7.5px] font-black tracking-tighter" style={{ color }}>{label}</span>
        <span className="text-[11px] font-bold" style={{ color: '#FFD700', textShadow: '0 0 3px rgba(255,215,0,0.5)' }}>%{value}</span>
      </div>
      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color, boxShadow: '0 0 8px rgba(255,215,0,0.4)' }}
        />
      </div>
    </div>
  );
}
