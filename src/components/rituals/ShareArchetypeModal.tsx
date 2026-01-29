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

const AYLA_APP_LOGO = "/assets/ayla/ayla_character.png";
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
                width: '450px',
                height: '800px',
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                marginBottom: `${-(800 * (1 - scale))}px`
              }}
            >
              <div
                className="relative bg-black rounded-[2.5rem] border border-mystic-gold/20 shadow-[0_0_40px_rgba(255,215,0,0.1)] overflow-hidden w-full h-full"
              >
                <div
                  id="capture-card-content"
                  className="w-full h-full bg-black overflow-hidden relative"
                >
                  {/* Container for the 1080x1920 content, scaled down to fit 450x800 */}
                  <div 
                    style={{ 
                      width: '1080px', 
                      height: '1920px', 
                      transform: 'scale(0.41666667)', // 450 / 1080
                      transformOrigin: 'top left',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      pointerEvents: 'none' // Prevent interaction with the scaled content
                    }}
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
            </div>

            <div className="w-full flex flex-col gap-3 mt-6 pb-8">
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
  const safeUserName = userName || defaultUserName;
  const archetypeName = isEn ? (archetype.enName || archetype.name) : archetype.name;
  const archetypeGroup = isEn ? (archetype.enGroup || archetype.group) : archetype.group;
  const archetypeClassName = isEn ? (archetype.enClassName || archetype.className) : archetype.className;
  const archetypeDescription = isEn ? (archetype.enDescription || archetype.description) : archetype.description;

  const titleText = isEn
    ? `${safeUserName.toUpperCase()}, THE ${archetypeName.toUpperCase()}`
    : `${safeUserName.toUpperCase()}, ${archetypeName.toUpperCase()}`;

  const sloganMain = archetypeSlogan.includes('(') ? archetypeSlogan.split('(')[0].trim() : archetypeSlogan;
  const sloganSub = archetypeSlogan.includes('(') ? archetypeSlogan.split('(')[1]?.replace(')', '').trim() : null;

  return (
    <div style={{ 
      width: '1080px', 
      height: '1920px', 
      backgroundColor: '#000000', 
      position: 'relative', 
      overflow: 'hidden', 
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" 
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '1080px',
        height: '1920px',
        background: 'radial-gradient(circle at center, rgba(255,215,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      
      {/* Image Area - roughly matching the logic in useArchetypeShare but using flex for centering */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '90px', // (1080 - 900) / 2
        width: '900px',
        height: '800px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src={archetypeImageUrl} 
          alt={archetype.name} 
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
          crossOrigin="anonymous"
        />
      </div>
      
      <div style={{
        position: 'absolute',
        top: '900px',
        left: 0,
        width: '1080px',
        textAlign: 'center',
        padding: '0 60px',
        boxSizing: 'border-box'
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 700,
          color: '#FFD700',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          lineHeight: 1.2,
          margin: '0 0 12px 0'
        }}>{titleText}</h2>
        <p style={{
          fontSize: '24px',
          fontWeight: 500,
          color: 'rgba(255,215,0,0.8)',
          textTransform: 'uppercase',
          letterSpacing: '6px',
          lineHeight: 1.2,
          margin: '0 0 8px 0'
        }}>{archetypeGroup?.toUpperCase()} • {archetypeKey}</p>
        <p style={{
          fontSize: '22px',
          fontWeight: 500,
          color: 'rgba(255,215,0,0.7)',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          lineHeight: 1.2,
          margin: 0
        }}>{archetypeClassName?.toUpperCase()}</p>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '1080px',
        left: '66px',
        width: '948px',
        height: '60px'
      }}>
        <StatBar label={energyLabels.spiritual} value={energyData.categories.spiritual.percentage} color="#A78BFA" left={0} />
        <StatBar label={energyLabels.mental} value={energyData.categories.mental.percentage} color="#60A5FA" left={237} />
        <StatBar label={energyLabels.physical} value={energyData.categories.physical.percentage} color="#FBBF24" left={474} />
        <StatBar label={energyLabels.emotional} value={energyData.categories.emotional.percentage} color="#FB7185" left={711} />
      </div>
      
      <div style={{
        position: 'absolute',
        top: '1200px',
        left: '60px',
        width: '960px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '36px',
          fontStyle: 'italic',
          fontWeight: 400,
          color: '#FFD700',
          lineHeight: 1.3,
          margin: '0 0 8px 0',
          fontFamily: "Georgia,'Times New Roman',serif"
        }}>"{sloganMain}"</p>
        {sloganSub && (
          <p style={{
            fontSize: '20px',
            fontStyle: 'italic',
            fontWeight: 500,
            color: 'rgba(255,215,0,0.7)',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            lineHeight: 1.2,
            margin: 0
          }}>{sloganSub}</p>
        )}
      </div>
      
      <div style={{
        position: 'absolute',
        top: '1340px',
        left: '80px',
        width: '920px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '28px',
          fontWeight: 500,
          color: '#FFD700',
          lineHeight: 1.5,
          margin: 0
        }}>{archetypeDescription}</p>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '1650px',
        width: '1080px',
        display: 'flex',
        justifyContent: 'center',
        left: 0
      }}>
        <img
          src={AYLA_TEXT_LOGO}
          alt="ayla.app"
          style={{
            height: '216px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'invert(1)'
          }}
        />
      </div>
    </div>
  );
}

function StatBar({ label, value, color, left }: { label: string, value: number, color: string, left: number }) {
  const barWidth = Math.round((value / 100) * 175);
  
  return (
    <div style={{ position: 'absolute', left: `${left}px`, top: 0, width: '228px' }}>
      <div style={{ position: 'relative', width: '228px', height: '32px' }}>
        <span style={{
          position: 'absolute',
          left: '4px',
          top: 0,
          fontSize: '18px',
          fontWeight: 800,
          color: color,
          letterSpacing: '-0.5px'
        }}>{label}</span>
        <span style={{
          position: 'absolute',
          right: '4px',
          top: 0,
          fontSize: '26px',
          fontWeight: 700,
          color: '#FFD700',
          textShadow: '0 0 6px rgba(255,215,0,0.5)'
        }}>%{value}</span>
      </div>
      <div style={{
        position: 'absolute',
        top: '40px',
        left: 0,
        width: '175px',
        height: '12px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '6px',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: `${barWidth}px`,
          height: '12px',
          backgroundColor: color,
          borderRadius: '6px',
          boxShadow: '0 0 12px rgba(255,215,0,0.4)'
        }}></div>
      </div>
    </div>
  );
}


