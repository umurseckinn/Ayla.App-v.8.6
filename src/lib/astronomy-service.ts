import * as Astronomy from 'astronomy-engine';

export const ZODIAC_SIGNS_TR = [
  "Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak",
  "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"
];

export const ZODIAC_SIGNS_EN: Record<string, string> = {
  "Koç": "Aries", "Boğa": "Taurus", "İkizler": "Gemini", "Yengeç": "Cancer",
  "Aslan": "Leo", "Başak": "Virgo", "Terazi": "Libra", "Akrep": "Scorpio",
  "Yay": "Sagittarius", "Oğlak": "Capricorn", "Kova": "Aquarius", "Balık": "Pisces"
};

export const PLANET_NAMES_TR: Record<string, string> = {
  "Sun": "Güneş",
  "Moon": "Ay",
  "Mercury": "Merkür",
  "Venus": "Venüs",
  "Mars": "Mars",
  "Jupiter": "Jüpiter",
  "Saturn": "Satürn",
  "Uranus": "Uranüs",
  "Neptune": "Neptün",
  "Pluto": "Plüton"
};

export const PLANET_NAMES_EN: Record<string, string> = {
  "Sun": "Sun",
  "Moon": "Moon",
  "Mercury": "Mercury",
  "Venus": "Venus",
  "Mars": "Mars",
  "Jupiter": "Jupiter",
  "Saturn": "Saturn",
  "Uranus": "Uranus",
  "Neptune": "Neptune",
  "Pluto": "Pluto"
};

export const ASPECT_NAMES_TR: Record<string, string> = {
  "conjunction": "Kavuşum",
  "opposition": "Karşıt",
  "trine": "Üçgen",
  "square": "Kare",
  "sextile": "Altmışlık"
};

export const ASPECT_NAMES_EN: Record<string, string> = {
  "conjunction": "Conjunction",
  "opposition": "Opposition",
  "trine": "Trine",
  "square": "Square",
  "sextile": "Sextile"
};

export interface PlanetPosition {
  planet: string;
  planetKey: string;
  longitude: number;
  latitude: number;
  distance: number;
  sign: string;
  signIndex: number;
  degree: number;
  minute: number;
  isRetrograde: boolean;
  formattedPosition: string;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  aspectType: string;
  aspectName: string;
  orb: number;
  exactAngle: number;
  actualAngle: number;
}

export interface MoonPhaseInfo {
  phase: string;
  phaseName: string;
  illumination: number;
  age: number;
  emoji: string;
}

export interface TransitData {
  date: Date;
  planets: PlanetPosition[];
  moonPhase: MoonPhaseInfo;
  aspects: Aspect[];
  retrogrades: { planet: string; isRetro: boolean }[];
}

export interface BirthChart {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  planets: Record<string, PlanetPosition>;
  ascendant: { longitude: number; sign: string; degree: number };
  houses: { house: number; sign: string; degree: number; longitude: number }[];
  aspects: Aspect[];
}

function eclipticToZodiac(longitude: number, language: 'tr' | 'en' = 'tr'): { sign: string; signIndex: number; degree: number; minute: number } {
  const normalizedLong = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalizedLong / 30);
  const signDegree = normalizedLong % 30;
  const degree = Math.floor(signDegree);
  const minute = Math.floor((signDegree - degree) * 60);

  const zodiacSigns = language === 'en' ? Object.values(ZODIAC_SIGNS_EN) : ZODIAC_SIGNS_TR;

  return {
    sign: zodiacSigns[signIndex],
    signIndex,
    degree,
    minute
  };
}

function formatPosition(sign: string, degree: number, minute: number): string {
  return `${degree}°${minute}' ${sign}`;
}

function ensureDate(date: any): Date {
  if (!date) return new Date();
  if (date instanceof Date && !isNaN(date.getTime())) return date;
  const d = new Date(date);
  if (isNaN(d.getTime())) return new Date();
  return d;
}

/**
 * Safely creates an Astronomy.Time object from various date inputs.
 * Ensures we pass a finite number or a recognized Date object to MakeTime.
 */
function safeMakeTime(date: any) {
  if (date && typeof date === 'object' && 'ut' in date) {
    return date;
  }

  const d = ensureDate(date);
  let timestamp = d.getTime();

  // Safety check for extreme dates that astronomy-engine might not like
  // Limit to years 1900-2100 if something goes wild, but let's be more flexible
  if (isNaN(timestamp)) {
    timestamp = Date.now();
  }

  try {
    // Try passing Date object first, but some environments prefer numeric
    return Astronomy.MakeTime(d);
  } catch (e) {
    // Robust fallback to Julian Date number
    // JD = (Unix Timestamp / 86400000) + 2440587.5
    const jd = timestamp / 86400000 + 2440587.5;
    return Astronomy.MakeTime(jd);
  }
}

function getPlanetEclipticLongitude(body: Astronomy.Body, date: Date): { longitude: number; latitude: number; distance: number } {
  const time = safeMakeTime(date);

  // Use a default observer for geocentric positions (standard for tropical astrology)
  // Some versions of astronomy-engine require a valid Observer instance
  const observer = new Astronomy.Observer(0, 0, 0);
  const equ = Astronomy.Equator(body, time, observer, true, true);
  const ecl = Astronomy.Ecliptic(equ.vec);

  return {
    longitude: ecl.elon,
    latitude: ecl.elat,
    distance: equ.dist
  };
}

function isPlanetRetrograde(body: Astronomy.Body, date: Date): boolean {
  const safeDate = ensureDate(date);

  try {
    const pos1 = getPlanetEclipticLongitude(body, safeDate);
    const nextDay = new Date(safeDate.getTime() + 24 * 60 * 60 * 1000);
    const pos2 = getPlanetEclipticLongitude(body, nextDay);

    let diff = pos2.longitude - pos1.longitude;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    return diff < 0;
  } catch {
    return false;
  }
}

export function calculatePlanetPosition(bodyName: string, date: Date, language: 'tr' | 'en' = 'tr'): PlanetPosition {
  const safeDate = ensureDate(date);
  const bodyMap: Record<string, Astronomy.Body> = {
    "Sun": Astronomy.Body.Sun,
    "Moon": Astronomy.Body.Moon,
    "Mercury": Astronomy.Body.Mercury,
    "Venus": Astronomy.Body.Venus,
    "Mars": Astronomy.Body.Mars,
    "Jupiter": Astronomy.Body.Jupiter,
    "Saturn": Astronomy.Body.Saturn,
    "Uranus": Astronomy.Body.Uranus,
    "Neptune": Astronomy.Body.Neptune,
    "Pluto": Astronomy.Body.Pluto
  };

  const body = bodyMap[bodyName];
  if (body === undefined) {
    throw new Error(`Unknown body: ${bodyName}`);
  }

  const ecliptic = getPlanetEclipticLongitude(body, safeDate);
  const zodiac = eclipticToZodiac(ecliptic.longitude, language);
  const isRetrograde = bodyName !== "Sun" && bodyName !== "Moon" ? isPlanetRetrograde(body, safeDate) : false;

  const planetName = language === 'en' ? (PLANET_NAMES_EN[bodyName] || bodyName) : (PLANET_NAMES_TR[bodyName] || bodyName);

  return {
    planet: planetName,
    planetKey: bodyName,
    longitude: ecliptic.longitude,
    latitude: ecliptic.latitude,
    distance: ecliptic.distance,
    sign: zodiac.sign,
    signIndex: zodiac.signIndex,
    degree: zodiac.degree,
    minute: zodiac.minute,
    isRetrograde,
    formattedPosition: formatPosition(zodiac.sign, zodiac.degree, zodiac.minute)
  };
}

function calculateAspect(long1: number, long2: number, language: 'tr' | 'en' = 'tr'): Aspect | null {
  let diff = Math.abs(long1 - long2);
  if (diff > 180) diff = 360 - diff;

  const aspects = [
    { name: "conjunction", angle: 0, orb: 10 },
    { name: "opposition", angle: 180, orb: 10 },
    { name: "trine", angle: 120, orb: 8 },
    { name: "square", angle: 90, orb: 8 },
    { name: "sextile", angle: 60, orb: 6 }
  ];

  const aspectNames = language === 'en' ? ASPECT_NAMES_EN : ASPECT_NAMES_TR;

  for (const aspect of aspects) {
    const orbDiff = Math.abs(diff - aspect.angle);
    if (orbDiff <= aspect.orb) {
      return {
        planet1: "",
        planet2: "",
        aspectType: aspect.name,
        aspectName: aspectNames[aspect.name] || aspect.name,
        orb: Math.round(orbDiff * 100) / 100,
        exactAngle: aspect.angle,
        actualAngle: diff
      };
    }
  }

  return null;
}

export function calculateAllAspects(positions: PlanetPosition[], language: 'tr' | 'en' = 'tr'): Aspect[] {
  const aspects: Aspect[] = [];

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const p1 = positions[i];
      const p2 = positions[j];

      const aspect = calculateAspect(p1.longitude, p2.longitude, language);
      if (aspect) {
        aspect.planet1 = p1.planet;
        aspect.planet2 = p2.planet;
        aspects.push(aspect);
      }
    }
  }

  return aspects;
}

export function calculateMoonPhase(date: Date, language: 'tr' | 'en' = 'tr'): MoonPhaseInfo {
  const time = safeMakeTime(date);
  let moonPhase = Astronomy.MoonPhase(time);
  const illumination = Astronomy.Illumination(Astronomy.Body.Moon, time);

  if (isNaN(moonPhase)) moonPhase = 0;

  let phase: string;
  let phaseName: string;
  let emoji: string;

  // Correct moon phase angles (0=New, 90=1st Q, 180=Full, 270=Last Q)
  if (moonPhase < 22.5 || moonPhase >= 337.5) {
    phase = "new_moon";
    phaseName = language === 'en' ? "New Moon" : "Yeniay";
    emoji = "🌑";
  } else if (moonPhase < 67.5) {
    phase = "waxing_crescent";
    phaseName = language === 'en' ? "Waxing Crescent" : "Hilal (Büyüyen)";
    emoji = "🌒";
  } else if (moonPhase < 112.5) {
    phase = "first_quarter";
    phaseName = language === 'en' ? "First Quarter" : "İlk Dördün";
    emoji = "🌓";
  } else if (moonPhase < 157.5) {
    phase = "waxing_gibbous";
    phaseName = language === 'en' ? "Waxing Gibbous" : "Şişkin Ay (Büyüyen)";
    emoji = "🌔";
  } else if (moonPhase < 202.5) {
    phase = "full_moon";
    phaseName = language === 'en' ? "Full Moon" : "Dolunay";
    emoji = "🌕";
  } else if (moonPhase < 247.5) {
    phase = "waning_gibbous";
    phaseName = language === 'en' ? "Waning Gibbous" : "Şişkin Ay (Azalan)";
    emoji = "🌖";
  } else if (moonPhase < 292.5) {
    phase = "last_quarter";
    phaseName = language === 'en' ? "Last Quarter" : "Son Dördün";
    emoji = "🌗";
  } else if (moonPhase < 337.5) {
    phase = "waning_crescent";
    phaseName = language === 'en' ? "Waning Crescent" : "Hilal (Azalan)";
    emoji = "🌘";
  } else {
    phase = "new_moon";
    phaseName = language === 'en' ? "New Moon" : "Yeniay";
    emoji = "🌑";
  }

  const age = (moonPhase / 360) * 29.53;

  return {
    phase,
    phaseName,
    illumination: Math.round(illumination.phase_fraction * 100 * 10) / 10,
    age: Math.round(age * 10) / 10,
    emoji
  };
}

export function calculateTransits(date: Date, language: 'tr' | 'en' = 'tr'): TransitData {
  const safeDate = ensureDate(date);
  const bodies = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

  const planets: PlanetPosition[] = bodies.map(body => calculatePlanetPosition(body, safeDate, language));
  const moonPhase = calculateMoonPhase(safeDate, language);
  const aspects = calculateAllAspects(planets, language);

  const retrogrades = planets.map(p => ({
    planet: p.planet,
    isRetro: p.isRetrograde
  }));

  return {
    date: safeDate,
    planets,
    moonPhase,
    aspects,
    retrogrades
  };
}

export function calculateAscendant(date: Date, latitude: number, longitude: number, language: 'tr' | 'en' = 'tr'): { longitude: number; sign: string; degree: number } {
  const time = safeMakeTime(date);
  const lst = Astronomy.SiderealTime(time);

  const lstHours = ((lst + longitude / 15) % 24 + 24) % 24;
  const lstDegrees = lstHours * 15;

  const latRad = latitude * Math.PI / 180;
  const obliquity = 23.4393 * Math.PI / 180;

  const ascRad = Math.atan2(
    Math.cos(lstDegrees * Math.PI / 180),
    -(Math.sin(lstDegrees * Math.PI / 180) * Math.cos(obliquity) + Math.tan(latRad) * Math.sin(obliquity))
  );

  let ascDegrees = ascRad * 180 / Math.PI;
  if (ascDegrees < 0) ascDegrees += 360;

  const zodiac = eclipticToZodiac(ascDegrees, language);

  return {
    longitude: ascDegrees,
    sign: zodiac.sign,
    degree: zodiac.degree
  };
}

export function calculateHouses(ascendantLong: number, language: 'tr' | 'en' = 'tr'): { house: number; sign: string; degree: number; longitude: number }[] {
  const houses: { house: number; sign: string; degree: number; longitude: number }[] = [];

  for (let i = 0; i < 12; i++) {
    const houseLong = (ascendantLong + i * 30) % 360;
    const zodiac = eclipticToZodiac(houseLong, language);
    houses.push({
      house: i + 1,
      sign: zodiac.sign,
      degree: zodiac.degree,
      longitude: houseLong
    });
  }

  return houses;
}

export function calculateBirthChart(
  birthDate: Date,
  birthTime: string,
  latitude: number,
  longitude: number,
  language: 'tr' | 'en' = 'tr'
): BirthChart {
  const safeBirthDate = ensureDate(birthDate);
  const [hour, minute] = birthTime.split(':').map(Number);
  const dateWithTime = new Date(safeBirthDate);
  dateWithTime.setHours(hour || 0, minute || 0, 0, 0);

  const bodies = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
  const planets: Record<string, PlanetPosition> = {};
  const positions: PlanetPosition[] = [];

  for (const body of bodies) {
    const pos = calculatePlanetPosition(body, dateWithTime, language);
    planets[body.toLowerCase()] = pos;
    positions.push(pos);
  }

  const ascendant = calculateAscendant(dateWithTime, latitude, longitude, language);
  const houses = calculateHouses(ascendant.longitude, language);
  const aspects = calculateAllAspects(positions, language);

  return {
    sunSign: planets.sun.sign,
    moonSign: planets.moon.sign,
    risingSign: ascendant.sign,
    planets,
    ascendant,
    houses,
    aspects
  };
}

export function findNextMoonPhases(startDate: Date, count: number = 8): { date: Date; phase: string; phaseName: string; emoji: string }[] {
  const phases: { date: Date; phase: string; phaseName: string; emoji: string }[] = [];
  let currentDate = ensureDate(startDate);
  let lastPhase = "";

  const majorPhases = ["new_moon", "first_quarter", "full_moon", "last_quarter"];
  let iterations = 0;
  const MAX_ITERATIONS = 500; // Safety break

  while (phases.length < count && iterations < MAX_ITERATIONS) {
    iterations++;
    const moonData = calculateMoonPhase(currentDate);

    if (moonData.phase !== lastPhase && majorPhases.includes(moonData.phase)) {
      phases.push({
        date: new Date(currentDate),
        phase: moonData.phase,
        phaseName: moonData.phaseName,
        emoji: moonData.emoji
      });
      lastPhase = moonData.phase;
    }

    currentDate = new Date(currentDate.getTime() + 12 * 60 * 60 * 1000);
  }

  return phases;
}

export function calculatePersonalDayEnergy(
  transitData: TransitData,
  userSunSign: string,
  userMoonSign?: string,
  language: 'tr' | 'en' = 'tr'
): { score: number; positives: string[]; warnings: string[]; summary: string } {
  let score = 50;
  const positives: string[] = [];
  const warnings: string[] = [];

  for (const planet of transitData.planets) {
    if (planet.isRetrograde) {
      if (planet.planetKey === "Mercury") {
        score -= 10;
        warnings.push(language === 'en' ? "Mercury retrograde may cause communication glitches." : "Merkür retrosu iletişimde aksaklıklar yaratabilir.");
      } else if (planet.planetKey === "Venus") {
        score -= 8;
        warnings.push(language === 'en' ? "Venus retrograde may raise past relationship issues." : "Venüs retrosu ilişkilerde geçmiş konuları gündeme getirebilir.");
      } else if (planet.planetKey === "Mars") {
        score -= 12;
        warnings.push(language === 'en' ? "Mars retrograde might lower your energy levels." : "Mars retrosu enerji seviyeni düşürebilir.");
      }
    }

    if (planet.sign === userSunSign) {
      if (planet.planetKey === "Jupiter") {
        score += 15;
        positives.push(language === 'en' ? "Jupiter is in your sign! A period of luck and expansion." : "Jüpiter senin burcunda! Şans ve genişleme dönemi.");
      } else if (planet.planetKey === "Saturn") {
        score -= 5;
        warnings.push(language === 'en' ? "Saturn in your sign brings responsibility and maturation." : "Satürn senin burcunda sorumluluk ve olgunlaşma getiriyor.");
      } else if (planet.planetKey === "Mars") {
        score += 8;
        positives.push(language === 'en' ? "Mars energy is high, take action!" : "Mars enerjin yüksek, harekete geç!");
      } else if (planet.planetKey === "Venus") {
        score += 10;
        positives.push(language === 'en' ? "Venus is in your sign, your charm is at its peak." : "Venüs senin burcunda, çekiciliğin dorukta.");
      }
    }

    if (userMoonSign && planet.planetKey === "Moon" && planet.sign === userMoonSign) {
      score += 12;
      positives.push(language === 'en' ? "Moon is passing through your Moon sign, your intuition is strong." : "Ay senin Ay burcundan geçiyor, sezgilerin güçlü.");
    }
  }

  if (transitData.moonPhase.phase === "full_moon") {
    score += 5;
    positives.push(language === 'en' ? "Full Moon energy is at its peak, emotional awareness is high." : "Dolunay enerjisi dorukta, duygusal farkındalık yüksek.");
  } else if (transitData.moonPhase.phase === "new_moon") {
    score += 3;
    positives.push(language === 'en' ? "New Moon is ideal for new beginnings." : "Yeniay yeni başlangıçlar için ideal.");
  }

  for (const aspect of transitData.aspects) {
    const jupiterName = language === 'en' ? "Jupiter" : "Jüpiter";
    const marsName = language === 'en' ? "Mars" : "Mars";
    const saturnName = language === 'en' ? "Saturn" : "Satürn";

    if (aspect.aspectType === "conjunction" && (aspect.planet1 === jupiterName || aspect.planet2 === jupiterName)) {
      score += 8;
      positives.push(language === 'en' ? `${aspect.planet1} and ${aspect.planet2} conjunction brings luck.` : `${aspect.planet1} ve ${aspect.planet2} kavuşumu şans getiriyor.`);
    }
    if (aspect.aspectType === "square" && (aspect.planet1 === marsName || aspect.planet1 === saturnName || aspect.planet2 === marsName || aspect.planet2 === saturnName)) {
      score -= 5;
      warnings.push(language === 'en' ? `${aspect.planet1}-${aspect.planet2} square can create tension.` : `${aspect.planet1}-${aspect.planet2} karesi gerginlik yaratabilir.`);
    }
    if (aspect.aspectType === "trine") {
      score += 3;
    }
    if (aspect.aspectType === "sextile") {
      score += 2;
    }
  }

  score = Math.max(5, Math.min(95, score));

  let summary = "";
  if (score >= 75) {
    summary = language === 'en' ? "Great day! The stars are with you." : "Harika bir gün! Yıldızlar seninle.";
  } else if (score >= 60) {
    summary = language === 'en' ? "Positive energies prevail. Make good use of it." : "Olumlu enerjiler hakim. İyi değerlendir.";
  } else if (score >= 45) {
    summary = language === 'en' ? "A balanced day. Stay in the flow." : "Dengeli bir gün. Akışta kal.";
  } else if (score >= 30) {
    summary = language === 'en' ? "Might be a bit challenging. Be patient." : "Biraz zorlu olabilir. Sabırlı ol.";
  } else {
    summary = language === 'en' ? "Be careful and rest. This energy is temporary." : "Dikkatli ol ve dinlen. Bu enerji geçici.";
  }

  return {
    score,
    positives: positives.slice(0, 3),
    warnings: warnings.slice(0, 3),
    summary
  };
}

export function getZodiacSignForDate(date: Date): string {
  const safeDate = ensureDate(date);
  const sunPosition = calculatePlanetPosition("Sun", safeDate);
  return sunPosition.sign;
}

export const getSunSign = getZodiacSignForDate;
