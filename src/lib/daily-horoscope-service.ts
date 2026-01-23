// Offline mode: No Supabase needed - all data stored in localStorage
import { safeJSONParse } from "./safe-utils";
import { getSunSign, getMoonSign, getZodiacElement, COSMIC_LOGIC } from "./astrology";
import { getCurrentRetrogrades } from "./cosmic-events-service";
import { calculateTransits, calculatePersonalDayEnergy } from "./astronomy-service";
import {
  PLANET_SIGN_INTERPRETATIONS,
  SIGN_PHRASES,
  DAILY_PLANET_EFFECTS
} from "./astrology-interpretations";

export interface DailyHoroscope {
  date: string;
  sign: string;
  horoscope: string;
  mood?: string;
  color?: string;
  luckyNumber?: string;
  luckyTime?: string;
  compatibility?: string;
}

// Helper to get day of year
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Completely Offline Daily Horoscope Engine based on Planet Positions
export async function fetchDailyHoroscope(sign: string, date: Date = new Date()): Promise<DailyHoroscope | null> {
  const transits = calculateTransits(date);
  const dayOfYear = getDayOfYear(date);
  const element = getZodiacElement(sign);

  // Find interesting transits for this sign
  const sunTransit = transits.planets.find(p => p.planetKey === "Sun");
  const moonTransit = transits.planets.find(p => p.planetKey === "Moon");
  const mercuryTransit = transits.planets.find(p => p.planetKey === "Mercury");

  const sunInSign = sunTransit ? PLANET_SIGN_INTERPRETATIONS["Güneş"]?.[sunTransit.sign]?.[0] : "";
  const moonInSign = moonTransit ? PLANET_SIGN_INTERPRETATIONS["Ay"]?.[moonTransit.sign]?.[0] : "";
  const mercuryInSign = mercuryTransit ? PLANET_SIGN_INTERPRETATIONS["Merkür"]?.[mercuryTransit.sign]?.[0] : "";

  // Deterministic but varied results based on sign and day
  const luckyNumbers = ["3", "7", "9", "11", "22", "33", "44", "5"];
  const luckyTimes = ["10:00", "14:30", "18:15", "21:00", "08:45", "12:00"];
  const colors = ["Altın", "Gümüş", "Turkuaz", "Eflatun", "Mercan", "Safir", "Zümrüt", "Yakut"];
  const moods = ["İyimser", "Odaklanmış", "Yaratıcı", "Huzurlu", "Enerjik", "Dengeli", "Maceracı"];

  const seed = (dayOfYear + sign.length) % 100;

  const phrases = SIGN_PHRASES[sign] || ["Yıldızlar senin için parlıyor."];
  const phrase = phrases[seed % phrases.length];

  // Construct a meaningful horoscope from transits
  let horoscope = `${phrase} `;
  if (sunTransit?.sign === sign) {
    horoscope += "Güneş senin burcunda parlıyor, bu senin dönemin! ";
  } else if (sunInSign) {
    horoscope += `${sunInSign} `;
  }

  if (moonTransit?.sign === sign) {
    horoscope += "Ay burcunda süzülürken duyguların derinleşiyor. ";
  } else if (moonInSign) {
    horoscope += `${moonInSign} `;
  }

  if (mercuryTransit?.isRetrograde) {
    horoscope += "Merkür retrosu iletişimde dikkatli olman gerektiğini fısıldıyor. ";
  } else if (mercuryInSign && seed % 2 === 0) {
    horoscope += `${mercuryInSign} `;
  }

  horoscope += "Bugün evrenin ritmine uyum sağlamak sana huzur getirecek.";

  return {
    date: date.toISOString().split('T')[0],
    sign,
    horoscope,
    mood: moods[seed % moods.length],
    color: colors[seed % colors.length],
    luckyNumber: luckyNumbers[seed % luckyNumbers.length],
    luckyTime: luckyTimes[seed % luckyTimes.length],
    compatibility: "Tüm Burçlar"
  };
}

export async function fetchMonthlyHoroscope(sign: string): Promise<any | null> {
  const currentMonth = new Date().toLocaleDateString('tr-TR', { month: 'long' });
  const element = getZodiacElement(sign);

  const monthlyBase: Record<string, string> = {
    "Ateş": "Bu ay senin için tam bir eylem ve zafer ayı olacak. Kariyerinde parlayacağın fırsatlara hazır ol.",
    "Toprak": "Maddi ve manevi olarak kökleneceğin, huzur ve bereketi en derinden hissedeceğin bir dönemdesin.",
    "Hava": "Zihinsel bir devrim yaşıyorsun. Yeni fikirler ve sosyal bağlantılar hayatını tamamen değiştirebilir.",
    "Su": "Ruhsal bir uyanış ve duygusal şifalanma ayı. Sezgilerin seni hayallerine bir adım daha yaklaştıracak."
  };

  return {
    sign,
    month: currentMonth,
    horoscope: monthlyBase[element] || "Yıldızlar bu ay senin için uyum ve denge fısıldıyor."
  };
}

export async function generatePersonalizedDailyForecast(
  birthDate: Date,
  birthTime?: string,
  birthPlace?: string,
  userId?: string,
  targetDate: Date = new Date()
): Promise<PersonalizedDailyForecast> {
  const sunSign = getSunSign(birthDate);
  const moonSign = getMoonSign(birthDate, birthTime);
  const element = getZodiacElement(sunSign);
  const dayOfYear = getDayOfYear(targetDate);

  const [sunHoroscope, moonHoroscope] = await Promise.all([
    fetchDailyHoroscope(sunSign, targetDate),
    sunSign !== moonSign ? fetchDailyHoroscope(moonSign, targetDate) : Promise.resolve(null)
  ]);

  // Offline mode: Get mood from localStorage instead of Supabase
  let recentMood = "";
  if (typeof window !== 'undefined' && userId) {
    try {
      const journalData = localStorage.getItem(`ayla_journal_${userId}`);
      if (journalData) {
        const journal = safeJSONParse(journalData, { mood: "" });
        recentMood = journal.mood || "";
      }
    } catch (e) { }
  }

  const transits = calculateTransits(targetDate);
  const personalEnergy = calculatePersonalDayEnergy(transits, sunSign, moonSign);

  const energyLevel = personalEnergy.score;
  const warnings = personalEnergy.warnings;
  const affirmation = personalEnergy.summary;

  const generalHoroscope = sunHoroscope?.horoscope || "";
  const sunSignForecast = generalHoroscope;
  const moonSignForecast = moonHoroscope?.horoscope || "Duygusal dengeni koru.";

  const combinedInterpretation = personalEnergy.summary + " " + generateCombinedInterpretation(
    sunSign,
    moonSign,
    element,
    targetDate,
    recentMood,
    generalHoroscope
  );

  const dailyAdvice = personalEnergy.summary;

  return {
    date: targetDate.toISOString().split('T')[0],
    generalHoroscope,
    sunSignForecast,
    moonSignForecast,
    combinedInterpretation,
    dailyAdvice,
    energyLevel,
    luckyColor: sunHoroscope?.color || "Mor",
    luckyNumber: sunHoroscope?.luckyNumber || String((dayOfYear % 9) + 1),
    warnings,
    affirmation,
    houseActivations: {},
    transitEffects: transits.planets.map(p => `${p.planet}: ${p.sign}`)
  };
}

function generateCombinedInterpretation(
  sunSign: string,
  moonSign: string,
  element: string,
  date: Date,
  recentMood: string,
  generalHoroscope: string
): string {
  const dayOfMonth = date.getDate();
  const month = date.toLocaleDateString('tr-TR', { month: 'long' });

  let interpretation = `${month} ayının ${dayOfMonth}. günü, ${sunSign} güneşin ve ${moonSign} ayın birleşik enerjisiyle başlıyor. `;
  interpretation += `${element} elementi bugün ${element === "Ateş" ? "harekete geçmeni" : element === "Toprak" ? "sağlam temeller atmani" : element === "Hava" ? "iletişime odaklanmanı" : "sezgilerine güvenmeni"} istiyor. `;

  return interpretation;
}


// Offline mode: Cache to localStorage instead of Supabase
export async function cacheDailyHoroscope(userId: string, forecast: PersonalizedDailyForecast): Promise<void> {
  try {
    if (typeof window !== 'undefined') {
      const cacheKey = `ayla_horoscope_cache_${userId}_${forecast.date}`;
      localStorage.setItem(cacheKey, JSON.stringify({
        forecast_data: forecast,
        updated_at: new Date().toISOString()
      }));
    }
  } catch (error) {
    console.error("Error caching daily horoscope:", error);
  }
}

export async function getCachedDailyHoroscope(userId: string, date: string): Promise<PersonalizedDailyForecast | null> {
  try {
    if (typeof window !== 'undefined') {
      const cacheKey = `ayla_horoscope_cache_${userId}_${date}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const data = safeJSONParse<any>(cached, null);
        return data ? (data.forecast_data as PersonalizedDailyForecast) : null;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export interface PersonalizedDailyForecast {
  date: string;
  generalHoroscope: string;
  sunSignForecast: string;
  moonSignForecast: string;
  combinedInterpretation: string;
  dailyAdvice: string;
  energyLevel: number;
  luckyColor: string;
  luckyNumber: string;
  warnings: string[];
  affirmation: string;
  houseActivations: Record<string, string>;
  transitEffects: string[];
}
