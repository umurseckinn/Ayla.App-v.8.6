import React from 'react';
import { ZODIAC_IMAGES } from '@/lib/zodiac-images';
import { getZodiacSymbol } from '@/lib/astrology';

interface ZodiacImageProps {
  sign: string;
  className?: string;
  size?: number;
}

  const ENGLISH_TO_TURKISH_SIGNS: Record<string, string> = {
    "Aries": "Koç", "Taurus": "Boğa", "Gemini": "İkizler", "Cancer": "Yengeç",
    "Leo": "Aslan", "Virgo": "Başak", "Libra": "Terazi", "Scorpio": "Akrep",
    "Sagittarius": "Yay", "Capricorn": "Oğlak", "Aquarius": "Kova", "Pisces": "Balık"
  };

  const TURKISH_TO_ENGLISH_SIGNS: Record<string, string> = {
    "Koç": "Aries", "Boğa": "Taurus", "İkizler": "Gemini", "Yengeç": "Cancer",
    "Aslan": "Leo", "Başak": "Virgo", "Terazi": "Libra", "Akrep": "Scorpio",
    "Yay": "Sagittarius", "Oğlak": "Capricorn", "Kova": "Aquarius", "Balık": "Pisces"
  };

  export function ZodiacImage({ sign, className = "", size = 24 }: ZodiacImageProps) {
    // Normalize sign name for robust lookup
    const normalizedSign = sign ? sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase() : "";
    
    let imageUrl = ZODIAC_IMAGES[normalizedSign] || ZODIAC_IMAGES[sign];

    if (!imageUrl && ENGLISH_TO_TURKISH_SIGNS[normalizedSign]) {
      imageUrl = ZODIAC_IMAGES[ENGLISH_TO_TURKISH_SIGNS[normalizedSign]];
    }

    if (!imageUrl && TURKISH_TO_ENGLISH_SIGNS[normalizedSign]) {
      imageUrl = ZODIAC_IMAGES[TURKISH_TO_ENGLISH_SIGNS[normalizedSign]];
    }


  if (!imageUrl) {
    const emojis: Record<string, string> = {
      "♈": "Koç", "♉": "Boğa", "♊": "İkizler", "♋": "Yengeç",
      "♌": "Aslan", "♍": "Başak", "♎": "Terazi", "♏": "Akrep",
      "♐": "Yay", "♑": "Oğlak", "♒": "Kova", "♓": "Balık"
    };
    const signName = emojis[sign];
    if (signName) {
      imageUrl = ZODIAC_IMAGES[signName];
    }
  }

  if (imageUrl) {
    return (
      <img 
        src={imageUrl} 
        alt={sign} 
        className={className} 
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    );
  }

  const symbol = getZodiacSymbol(sign) || sign;
  return (
    <span className={className} style={{ fontSize: size }}>
      {symbol}
    </span>
  );
}
