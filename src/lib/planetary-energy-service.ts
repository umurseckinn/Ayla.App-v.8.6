import { getSunSign, getMoonSign, getRisingSign, getZodiacElement } from "./astrology";
import { calculateTransits, calculateBirthChart } from "./astronomy-service";
import transitInterpretations from "./data/transit-interpretations.json";
import { calculatePersonalTransits, PersonalTransit } from "./transit-engine";

type Language = 'tr' | 'en';

export interface PlanetaryPosition {
  planet: string;
  longitude: number;
  sign: string;
  degree: number;
  isRetrograde?: boolean;
}

export interface DailyEnergyResult {
  overallEnergy: number;
  planetaryInfluences: {
    planet: string;
    effect: number;
    description: string;
    position: string;
    interpretation: string;
    isRetrograde?: boolean;
  }[];
  personalTransits: PersonalTransit[];
  moonPhaseInterpretation?: string;
  aspects: {
    planet1: string;
    planet2: string;
    aspectType: string;
    effect: number;
  }[];
  warnings: string[];
  positives: string[];
}

const ZODIAC_SIGNS_TR = [
  "Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak",
  "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"
];

const SIGN_ELEMENTS_TR: Record<string, string> = {
  "Koç": "Ateş", "Aslan": "Ateş", "Yay": "Ateş",
  "Boğa": "Toprak", "Başak": "Toprak", "Oğlak": "Toprak",
  "İkizler": "Hava", "Terazi": "Hava", "Kova": "Hava",
  "Yengeç": "Su", "Akrep": "Su", "Balık": "Su"
};

const SIGN_ELEMENTS_EN: Record<string, string> = {
  "Aries": "Fire", "Leo": "Fire", "Sagittarius": "Fire",
  "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
  "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
  "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water"
};

const PLANET_NAMES_TR: Record<string, string> = {
  "Sun": "Güneş", "Moon": "Ay", "Mercury": "Merkür", "Venus": "Venüs", "Mars": "Mars",
  "Jupiter": "Jüpiter", "Saturn": "Satürn", "Uranus": "Uranüs", "Neptune": "Neptün", "Pluto": "Plüton"
};

const PLANET_NAMES_EN: Record<string, string> = {
  "Sun": "Sun", "Moon": "Moon", "Mercury": "Mercury", "Venus": "Venus", "Mars": "Mars",
  "Jupiter": "Jupiter", "Saturn": "Saturn", "Uranus": "Uranus", "Neptune": "Neptune", "Pluto": "Pluto"
};

const EN_TO_TR_SIGNS: Record<string, string> = {
  "Aries": "Koç", "Taurus": "Boğa", "Gemini": "İkizler", "Cancer": "Yengeç",
  "Leo": "Aslan", "Virgo": "Başak", "Libra": "Terazi", "Scorpio": "Akrep",
  "Sagittarius": "Yay", "Capricorn": "Oğlak", "Aquarius": "Kova", "Pisces": "Balık"
};

function getSignDistance(sign1: string, sign2: string, language: Language = 'tr'): number {
  const signs = language === 'en' ?
    ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"] :
    ZODIAC_SIGNS_TR;

  const idx1 = signs.indexOf(sign1);
  const idx2 = signs.indexOf(sign2);
  if (idx1 === -1 || idx2 === -1) return 6;
  const diff = Math.abs(idx1 - idx2);
  return Math.min(diff, 12 - diff);
}

export async function calculateDailyEnergy(
  date: Date,
  birthDate: Date,
  birthTime?: string,
  birthPlace?: string,
  extraContext?: { mood?: string; forecast?: string; interpretation?: string },
  language: Language = 'tr'
): Promise<DailyEnergyResult> {
  const userSunSign = getSunSign(birthDate, language);
  const userMoonSign = getMoonSign(birthDate, birthTime, language);
  const userElement = getZodiacElement(userSunSign, language);

  const transits = calculateTransits(date, language);
  const planetPositions = transits.planets;
  const moonPhase = transits.moonPhase;

  let kes = 50;
  const planetaryInfluences: DailyEnergyResult["planetaryInfluences"] = [];
  const aspects: DailyEnergyResult["aspects"] = [];
  const warnings: string[] = [];
  const positives: string[] = [];

  const signElements = language === 'en' ? SIGN_ELEMENTS_EN : SIGN_ELEMENTS_TR;
  const planetNames = language === 'en' ? PLANET_NAMES_EN : PLANET_NAMES_TR;
  const fire = language === 'en' ? "Fire" : "Ateş";
  const air = language === 'en' ? "Air" : "Hava";
  const earth = language === 'en' ? "Earth" : "Toprak";
  const water = language === 'en' ? "Water" : "Su";

  // 1. P_Güneş (Güneş Uyumu - Öz Enerji)
  const currentSun = planetPositions.find(p => p.planetKey === "Sun");
  if (currentSun) {
    const currentSunElement = signElements[currentSun.sign];
    let pSun = 0;
    if (currentSunElement === userElement) {
      pSun = 10;
      positives.push(language === 'en' ? "Sun is in perfect harmony with your element; your core energy is very high." : "Güneş senin elementinle tam uyumda; öz enerjin çok yüksek.");
    } else if (
      (userElement === fire && currentSunElement === air) ||
      (userElement === air && currentSunElement === fire) ||
      (userElement === earth && currentSunElement === water) ||
      (userElement === water && currentSunElement === earth)
    ) {
      pSun = 5;
      positives.push(language === 'en' ? "Sun is in a compatible element with you; you will feel supported." : "Güneş seninle uyumlu bir elementte; desteklendiğini hissedeceksin.");
    }
    kes += pSun * 2;
  }

  // 2. P_Ay (Ay Fazı ve Duygu)
  const currentMoon = planetPositions.find(p => p.planetKey === "Moon");
  let pMoon = 0;

  if (currentMoon && currentMoon.sign === userMoonSign) {
    if (moonPhase.phase === "new_moon" || moonPhase.phase === "full_moon") {
      pMoon = 10;
      positives.push(language === 'en' ? `You are experiencing a ${moonPhase.phaseName} in your own sign; emotional intensity and awareness are at their peak.` : `Kendi burcunda bir ${moonPhase.phaseName} yaşıyorsun; duygusal yoğunluk ve farkındalık zirvede.`);
    }
  } else if (moonPhase.phase.includes("waxing")) {
    pMoon = 5;
    positives.push(language === 'en' ? "Moon is waxing; a good time for gathering energy and taking new steps." : "Ay büyüyor; enerji toplama ve yeni adımlar için uygun bir zaman.");
  } else if (moonPhase.phase.includes("waning")) {
    pMoon = -5;
    warnings.push(language === 'en' ? "Moon is waning; a time to turn your energy inward and let go." : "Ay küçülüyor; enerjini içe döndürme ve bırakma zamanı.");
  }
  kes += pMoon * 1.5;

  // 3 & 4. T_destek ve T_zorlu (Transit Etkileri)
  let tSupport = 0;
  let tChallenge = 0;

  for (const pos of planetPositions) {
    const dist = getSignDistance(userSunSign, pos.sign, language);
    const isSupport = dist === 4 || dist === 2; // Üçgen veya Sekstil
    const isChallenge = dist === 3 || dist === 6; // Kare veya Karşıt

    if (pos.planetKey === "Jupiter") {
      if (isSupport) {
        tSupport += 15;
        positives.push(language === 'en' ? "Jupiter is opening doors of luck and growth." : "Jüpiter şans ve büyüme kapılarını aralıyor.");
      }
    } else if (pos.planetKey === "Venus") {
      if (isSupport) {
        tSupport += 10;
        positives.push(language === 'en' ? "Venus brings pleasure and abundance energy." : "Venüs keyif ve bolluk enerjisi getiriyor.");
      }
    } else if (pos.planetKey === "Mars") {
      if (isSupport) {
        tSupport += 10;
        positives.push(language === 'en' ? "Mars increases your action power and courage." : "Mars eylem gücünü ve cesaretini artırıyor.");
      }
      if (isChallenge) {
        tChallenge += 5;
        warnings.push(language === 'en' ? "Mars may create some tension and conflict today." : "Mars bugün biraz gerginlik ve çatışma yaratabilir.");
      }
    } else if (pos.planetKey === "Saturn") {
      if (isChallenge) {
        tChallenge += 15;
        warnings.push(language === 'en' ? "Saturn is testing you with responsibilities and obstacles." : "Satürn sorumluluklar ve engellerle seni sınıyor.");
      }
    } else if (pos.planetKey === "Uranus") {
      if (isChallenge) {
        tChallenge += 10;
        warnings.push(language === 'en' ? "Uranus may surprise you with sudden and unexpected changes." : "Uranüs ani ve beklenmedik değişimlerle seni şaşırtabilir.");
      }
      if (isSupport) {
        tSupport += 5;
        positives.push(language === 'en' ? "Uranus whispers liberating and innovative ideas to you today." : "Uranüs bugün sana özgürleştirici ve yenilikçi fikirler fısıldıyor.");
      }
    } else if (pos.planetKey === "Neptune") {
      if (isChallenge) {
        tChallenge += 10;
        warnings.push(language === 'en' ? "Neptune may create confusion and uncertainty today." : "Neptün bugün kafa karışıklığı ve belirsizlik yaratabilir.");
      }
      if (isSupport) {
        tSupport += 5;
        positives.push(language === 'en' ? "Neptune strengthens your intuition and imagination." : "Neptün sezgilerini ve hayal gücünü güçlendiriyor.");
      }
    } else if (pos.planetKey === "Pluto") {
      if (isChallenge) {
        tChallenge += 10;
        warnings.push(language === 'en' ? "Pluto whispers energy of deep transformation and crisis." : "Plüton derin bir dönüşüm ve kriz enerjisi fısıldıyor.");
      }
    }

    // Helper to pick random interpretation with language support
    const getRandomInterp = (data: any, lang: Language) => {
      if (!data) return "";
      if (data.tr && data.en) {
        const langData = data[lang] || data.tr;
        if (Array.isArray(langData)) {
          return langData[Math.floor(Math.random() * langData.length)];
        }
        return langData || "";
      }
      if (Array.isArray(data)) {
        return data[Math.floor(Math.random() * data.length)];
      }
      return data || "";
    };

    let interpretation = "";
    const planetData = (transitInterpretations.planets as any)[pos.planetKey];
    const signKeyForJson = EN_TO_TR_SIGNS[pos.sign] || pos.sign;
    if (planetData && planetData[signKeyForJson]) {
      interpretation = getRandomInterp(planetData[signKeyForJson], language);
    }

    const effectLabel = isSupport ? "positive" : (isChallenge ? "negative" : "neutral");
    const impactData = (transitInterpretations.impacts as any)[effectLabel];
    if (impactData && impactData[pos.planetKey]) {
      const impactStr = getRandomInterp(impactData[pos.planetKey], language);
      interpretation += " " + impactStr;
    }

    planetaryInfluences.push({
      planet: planetNames[pos.planetKey] || pos.planet,
      effect: isSupport ? 10 : (isChallenge ? -10 : 0),
      position: `${pos.sign} ${pos.degree}°`,
      description: language === 'en' ? `${planetNames[pos.planetKey]} in ${pos.sign}` : `${planetNames[pos.planetKey]} ${pos.sign} burcunda`,
      interpretation: interpretation.trim(),
      isRetrograde: pos.isRetrograde
    });
  }
  kes += (tSupport - tChallenge);

  // 5. R_retro (Retrograde Cezası)
  let rRetro = 0;
  for (const pos of planetaryInfluences) {
    if (pos.isRetrograde) {
      if (pos.planet === "Merkür" || pos.planet === "Mercury") {
        rRetro += 5;
        warnings.push(language === 'en' ? "Mercury retrograde may cloud your mind, pay attention to details." : "Merkür retrosu zihnini bulandırabilir, detaylara dikkat.");
      } else if (pos.planet === "Mars") {
        rRetro += 10;
        warnings.push(language === 'en' ? "Mars retrograde may drain your energy, you should slow down." : "Mars retrosu enerjini emebilir, yavaşlamalısın.");
      }
    }
  }
  kes -= rRetro;

  if (extraContext?.mood) {
    const positiveMoods = language === 'en' ? ["Happy", "Energetic", "Confident", "Excited"] : ["Mutlu", "Enerjik", "Özgüvenli", "Heyecanlı"];
    const negativeMoods = language === 'en' ? ["Sad", "Anxious", "Restless", "Tired"] : ["Hüzünlü", "Endişeli", "Huzursuz", "Yorgun"];
    if (positiveMoods.includes(extraContext.mood)) kes += 5;
    if (negativeMoods.includes(extraContext.mood)) kes -= 5;
  }

  const getRandomMoonInterp = (phase: string, lang: Language) => {
    const data = (transitInterpretations.moon_phases as any)[phase];
    if (!data) return "";
    if (data.tr && data.en) {
      const langData = data[lang] || data.tr;
      if (Array.isArray(langData)) {
        return langData[Math.floor(Math.random() * langData.length)];
      }
      return langData || "";
    }
    if (Array.isArray(data)) {
      return data[Math.floor(Math.random() * data.length)];
    }
    return data || "";
  };

  // 6. Personal Transits Calculation
  let personalTransits: PersonalTransit[] = [];
  try {
    const lat = 41.0082;
    const lng = 28.9784;
    const natalChart = calculateBirthChart(birthDate, birthTime || "12:00", lat, lng, language);
    personalTransits = calculatePersonalTransits(date, natalChart.planets, natalChart.houses);
  } catch (error) {
    console.error("Personal transit calculation failed:", error);
  }

  kes = Math.max(5, Math.min(95, Math.round(kes)));

  return {
    overallEnergy: kes,
    planetaryInfluences,
    personalTransits,
    moonPhaseInterpretation: getRandomMoonInterp(moonPhase.phase, language),
    aspects,
    warnings: Array.from(new Set(warnings)).slice(0, 3),
    positives: Array.from(new Set(positives)).slice(0, 3)
  };
}

export function getEnergyColorDiscrete(energy: number): "red" | "yellow" | "green" {
  if (energy <= 40) return "red";
  if (energy <= 70) return "yellow";
  return "green";
}

export function getInterpolatedEnergyColor(energy: number, opacity: number = 0.2): string {
  const breakpoints = [
    { p: 0, r: 0, g: 0, b: 0 },
    { p: 33, r: 255, g: 0, b: 0 },
    { p: 66, r: 255, g: 255, b: 0 },
    { p: 100, r: 0, g: 255, b: 0 }
  ];

  let lower = breakpoints[0];
  let upper = breakpoints[breakpoints.length - 1];

  for (let i = 0; i < breakpoints.length - 1; i++) {
    if (energy >= breakpoints[i].p && energy <= breakpoints[i + 1].p) {
      lower = breakpoints[i];
      upper = breakpoints[i + 1];
      break;
    }
  }

  const range = upper.p - lower.p;
  const fraction = range === 0 ? 0 : (energy - lower.p) / range;

  const r = Math.round(lower.r + (upper.r - lower.r) * fraction);
  const g = Math.round(lower.g + (upper.g - lower.g) * fraction);
  const b = Math.round(lower.b + (upper.b - lower.b) * fraction);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function getEnergyColor(energy: number): string {
  return getInterpolatedEnergyColor(energy, 1);
}

export function getEnergyColorClass(energy: number): string {
  const color = getEnergyColorDiscrete(energy);
  if (color === "red") return "bg-rose-500";
  if (color === "yellow") return "bg-amber-400";
  return "bg-emerald-500";
}

export function getEnergyBgClass(energy: number | undefined): string {
  if (energy === undefined) return "bg-white/5 border-white/10";
  const color = getEnergyColorDiscrete(energy);
  if (color === "red") return "bg-rose-500/20 border-rose-500/30 hover:bg-rose-500/30";
  if (color === "yellow") return "bg-amber-400/20 border-amber-400/30 hover:bg-amber-400/30";
  return "bg-emerald-500/20 border-emerald-500/30 hover:bg-emerald-500/30";
}

export function getEnergyLabel(energy: number, language: Language = 'tr'): string {
  if (energy <= 40) return language === 'en' ? "Caution" : "Dikkat";
  if (energy <= 70) return language === 'en' ? "Balanced" : "Dengeli";
  return language === 'en' ? "Powerful" : "Güçlü";
}

export function getEnergyDescription(energy: number, language: Language = 'tr'): string {
  if (language === 'en') {
    if (energy <= 20) return "Your energy is very low today. Rest and take time for yourself.";
    if (energy <= 40) return "It could be a challenging day. Postpone major decisions.";
    if (energy <= 55) return "Moderate energy level. Proceed with caution.";
    if (energy <= 70) return "A balanced day. Continue with your normal routine.";
    if (energy <= 85) return "A beautiful day! Advance your projects.";
    if (energy <= 95) return "Energy is high! Ideal for taking important steps.";
    return "A magnificent day! Everything will go well.";
  }
  if (energy <= 20) return "Bugün enerjin çok düşük. Dinlen ve kendine zaman ayır.";
  if (energy <= 40) return "Zorlu bir gün olabilir. Büyük kararları ertele.";
  if (energy <= 55) return "Orta düzeyde enerji. Temkinli ilerle.";
  if (energy <= 70) return "Dengeli bir gün. Normal rutinine devam et.";
  if (energy <= 85) return "Güzel bir gün! Projelerini ilerlet.";
  if (energy <= 95) return "Enerji yüksek! Önemli adımlar atmak için ideal.";
  return "Muhteşem bir gün! Her şey yolunda gidecek.";
}

export function calculateDayEnergySync(
  transits: any,
  userSunSign: string,
  userMoonSign?: string
): number {
  const userElement = SIGN_ELEMENTS_TR[userSunSign] || SIGN_ELEMENTS_EN[userSunSign];
  const planetPositions = transits.planets;

  let kes = 50;

  const currentSun = planetPositions.find((p: any) => p.planetKey === "Sun");
  if (currentSun) {
    const currentSunElement = SIGN_ELEMENTS_TR[currentSun.sign] || SIGN_ELEMENTS_EN[currentSun.sign];
    let pSun = 0;
    if (currentSunElement === userElement) {
      pSun = 10;
    } else if (
      (userElement === "Ateş" && currentSunElement === "Hava") ||
      (userElement === "Hava" && currentSunElement === "Ateş") ||
      (userElement === "Toprak" && currentSunElement === "Su") ||
      (userElement === "Su" && currentSunElement === "Toprak") ||
      (userElement === "Fire" && currentSunElement === "Air") ||
      (userElement === "Air" && currentSunElement === "Fire") ||
      (userElement === "Earth" && currentSunElement === "Water") ||
      (userElement === "Water" && currentSunElement === "Earth")
    ) {
      pSun = 5;
    }
    kes += pSun * 2;
  }

  const moonPhase = transits.moonPhase;
  let pMoon = 0;

  if (moonPhase.phase.includes("waxing")) {
    pMoon = 5;
  } else if (moonPhase.phase.includes("waning")) {
    pMoon = -5;
  }
  kes += pMoon * 1.5;

  let tSupport = 0;
  let tChallenge = 0;

  for (const pos of planetPositions) {
    const dist = getSignDistance(userSunSign, pos.sign);
    const isSupport = dist === 4 || dist === 2;
    const isChallenge = dist === 3 || dist === 6;

    if (pos.planetKey === "Jupiter") {
      if (isSupport) tSupport += 15;
    } else if (pos.planetKey === "Venus") {
      if (isSupport) tSupport += 10;
    } else if (pos.planetKey === "Mars") {
      if (isSupport) tSupport += 10;
      if (isChallenge) tChallenge += 5;
    } else if (pos.planetKey === "Saturn") {
      if (isChallenge) tChallenge += 15;
    } else if (pos.planetKey === "Uranus") {
      if (isChallenge) tChallenge += 10;
      if (isSupport) tSupport += 5;
    } else if (pos.planetKey === "Neptune") {
      if (isChallenge) tChallenge += 10;
      if (isSupport) tSupport += 5;
    } else if (pos.planetKey === "Pluto") {
      if (isChallenge) tChallenge += 10;
    }
  }
  kes += (tSupport - tChallenge);

  let rRetro = 0;
  for (const pos of planetPositions) {
    if (pos.isRetrograde) {
      if (pos.planetKey === "Mercury") rRetro += 5;
      else if (pos.planetKey === "Mars") rRetro += 10;
    }
  }
  kes -= rRetro;

  return Math.max(5, Math.min(95, Math.round(kes)));
}
