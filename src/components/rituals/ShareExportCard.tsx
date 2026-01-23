"use client";

import React, { forwardRef, useState, useEffect } from 'react';

const AYLA_TEXT_LOGO = "/ayla-text-logo.png";
const LOGO_TARGET_HEIGHT = 216;

export interface ShareExportCardProps {
  archetype: {
    name: string;
    enName?: string;
    group?: string;
    enGroup?: string;
    className?: string;
    enClassName?: string;
    description?: string;
    enDescription?: string;
    image?: string;
    imageFull?: string;
  };
  archetypeKey: string;
  userName: string;
  energyData: {
    categories: {
      spiritual: { percentage: number };
      mental: { percentage: number };
      physical: { percentage: number };
      emotional: { percentage: number };
    };
  };
  archetypeSlogan: string;
  language: 'tr' | 'en';
  archetypeImageUrl: string;
}

const IMAGE_AREA_WIDTH = 900;
const IMAGE_AREA_HEIGHT = 800;

export const ShareExportCard = forwardRef<HTMLDivElement, ShareExportCardProps>(
  ({ archetype, archetypeKey, userName, energyData, archetypeSlogan, language, archetypeImageUrl }, ref) => {
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number; left: number; top: number } | null>(null);
    const [logoDimensions, setLogoDimensions] = useState<{ width: number; height: number; left: number; top: number } | null>(null);
    const isEn = language === 'en';
    
    useEffect(() => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        
        const widthRatio = IMAGE_AREA_WIDTH / naturalWidth;
        const heightRatio = IMAGE_AREA_HEIGHT / naturalHeight;
        const scale = Math.min(widthRatio, heightRatio);
        
        const scaledWidth = Math.round(naturalWidth * scale);
        const scaledHeight = Math.round(naturalHeight * scale);
        
        const leftOffset = Math.round((1080 - scaledWidth) / 2);
        const topOffset = Math.round(40 + (IMAGE_AREA_HEIGHT - scaledHeight) / 2);
        
        setImageDimensions({
          width: scaledWidth,
          height: scaledHeight,
          left: leftOffset,
          top: topOffset
        });
      };
      img.onerror = () => {
        setImageDimensions({
          width: IMAGE_AREA_WIDTH,
          height: IMAGE_AREA_HEIGHT,
          left: 90,
          top: 40
        });
      };
      img.src = archetypeImageUrl;
    }, [archetypeImageUrl]);

    useEffect(() => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
    img.onload = () => {
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          const height = LOGO_TARGET_HEIGHT;
          const width = Math.round(height * aspectRatio);
          const left = Math.round((1080 - width) / 2);
          setLogoDimensions({ width, height, left, top: 1650 });
        };
        img.onerror = () => {
          setLogoDimensions({ width: 360, height: LOGO_TARGET_HEIGHT, left: 360, top: 1650 });
        };
      img.src = AYLA_TEXT_LOGO;
    }, []);
    
    const energyLabels = isEn 
      ? { spiritual: "SPIRITUAL", mental: "MENTAL", physical: "PHYSICAL", emotional: "EMOTIONAL" }
      : { spiritual: "RUHSAL", mental: "ZİHİNSEL", physical: "FİZİKSEL", emotional: "DUYGUSAL" };
    
    const defaultUserName = isEn ? "TRAVELER" : "GEZGİN";
    const archetypeName = isEn ? (archetype.enName || archetype.name) : archetype.name;
    const archetypeGroup = isEn ? (archetype.enGroup || archetype.group) : archetype.group;
    const archetypeClassName = isEn ? (archetype.enClassName || archetype.className) : archetype.className;
    const archetypeDescription = isEn ? (archetype.enDescription || archetype.description) : archetype.description;
  
    const titleText = isEn 
      ? `${(userName || defaultUserName).toUpperCase()}, THE ${archetypeName.toUpperCase()}`
      : `${(userName || defaultUserName).toUpperCase()}, ${archetypeName.toUpperCase()}`;

    const sloganMain = archetypeSlogan.includes('(') ? archetypeSlogan.split('(')[0].trim() : archetypeSlogan;
    const sloganSub = archetypeSlogan.includes('(') ? archetypeSlogan.split('(')[1]?.replace(')', '').trim() : null;

    return (
      <div
        ref={ref}
        style={{
          width: '1080px',
          height: '1920px',
          backgroundColor: '#000000',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1080px',
            height: '1920px',
            background: 'radial-gradient(circle at center, rgba(255,215,0,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {imageDimensions && (
          <img
            src={archetypeImageUrl}
            alt={archetype.name}
            crossOrigin="anonymous"
            style={{
              position: 'absolute',
              top: `${imageDimensions.top}px`,
              left: `${imageDimensions.left}px`,
              width: `${imageDimensions.width}px`,
              height: `${imageDimensions.height}px`,
              objectFit: 'fill',
            }}
          />
        )}

        <div
          style={{
            position: 'absolute',
            top: '900px',
            left: '0px',
            width: '1080px',
            textAlign: 'center',
            padding: '0 60px',
            boxSizing: 'border-box',
          }}
        >
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#FFD700',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              lineHeight: '1.2',
              margin: '0 0 12px 0',
            }}
          >
            {titleText}
          </h2>
          <p
            style={{
              fontSize: '24px',
              fontWeight: '500',
              color: 'rgba(255,215,0,0.8)',
              textTransform: 'uppercase',
              letterSpacing: '6px',
              lineHeight: '1.2',
              margin: '0 0 8px 0',
            }}
          >
            {archetypeGroup?.toUpperCase()} • {archetypeKey}
          </p>
          <p
            style={{
              fontSize: '22px',
              fontWeight: '500',
              color: 'rgba(255,215,0,0.7)',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              lineHeight: '1.2',
              margin: '0',
            }}
          >
            {archetypeClassName?.toUpperCase()}
          </p>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '1080px',
            left: '66px',
            width: '948px',
          }}
        >
          <StatBar label={energyLabels.spiritual} value={energyData.categories.spiritual.percentage} color="#A78BFA" left={0} />
          <StatBar label={energyLabels.mental} value={energyData.categories.mental.percentage} color="#60A5FA" left={237} />
          <StatBar label={energyLabels.physical} value={energyData.categories.physical.percentage} color="#FBBF24" left={474} />
          <StatBar label={energyLabels.emotional} value={energyData.categories.emotional.percentage} color="#FB7185" left={711} />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '1200px',
            left: '60px',
            width: '960px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '36px',
              fontStyle: 'italic',
              fontWeight: '400',
              color: '#FFD700',
              lineHeight: '1.3',
              margin: '0 0 8px 0',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            &quot;{sloganMain}&quot;
          </p>
          {sloganSub && (
            <p
              style={{
                fontSize: '20px',
                fontStyle: 'italic',
                fontWeight: '500',
                color: 'rgba(255,215,0,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                lineHeight: '1.2',
                margin: '0',
              }}
            >
              {sloganSub}
            </p>
          )}
        </div>

        <div
          style={{
            position: 'absolute',
            top: '1340px',
            left: '80px',
            width: '920px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '28px',
              fontWeight: '500',
              color: '#FFD700',
              lineHeight: '1.5',
              margin: '0',
            }}
          >
            {archetypeDescription}
          </p>
        </div>

        {logoDimensions && (
          <img
            src={AYLA_TEXT_LOGO}
            alt="ayla.app"
            crossOrigin="anonymous"
            style={{
              position: 'absolute',
              top: `${logoDimensions.top}px`,
              left: `${logoDimensions.left}px`,
              width: `${logoDimensions.width}px`,
              height: `${logoDimensions.height}px`,
              objectFit: 'contain',
              filter: 'invert(1)',
            }}
          />
        )}
      </div>
    );
  }
);

ShareExportCard.displayName = 'ShareExportCard';

function StatBar({ label, value, color, left }: { label: string; value: number; color: string; left: number }) {
  const barWidth = Math.round((value / 100) * 175);
  
  return (
    <div style={{ position: 'absolute', left: `${left}px`, top: '0px', width: '228px' }}>
      <div style={{ position: 'relative', width: '228px', height: '32px' }}>
        <span
          style={{
            position: 'absolute',
            left: '4px',
            top: '0px',
            fontSize: '18px',
            fontWeight: '800',
            color: color,
            letterSpacing: '-0.5px',
          }}
        >
          {label}
        </span>
        <span
          style={{
            position: 'absolute',
            right: '4px',
            top: '0px',
            fontSize: '26px',
            fontWeight: '700',
            color: '#FFD700',
            textShadow: '0 0 6px rgba(255,215,0,0.5)',
          }}
        >
          %{value}
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '0px',
          width: '175px',
          height: '12px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: `${barWidth}px`,
            height: '12px',
            backgroundColor: color,
            borderRadius: '6px',
            boxShadow: '0 0 12px rgba(255,215,0,0.4)',
          }}
        />
      </div>
    </div>
  );
}

export default ShareExportCard;
