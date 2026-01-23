import { BirthChart, PlanetPosition, ASPECT_NAMES_TR, ZODIAC_SIGNS_TR } from "./astronomy-service";

export interface EnergyCategory {
  percentage: number;
  level: string;
  dominant_planet: string;
  description: string;
}

export interface EnergyPotentialResult {
  user_id?: string;
  overall_energy: number;
  categories: {
    mental: EnergyCategory;
    emotional: EnergyCategory;
    physical: EnergyCategory;
    spiritual: EnergyCategory;
  };
}

// Normalized weights based on user prompt (each category sums to 1.0)
const WEIGHT_CONFIG: Record<string, Record<string, number>> = {
  "Sun":     { "physical": 0.3636, "spiritual": 0.1481 },
  "Moon":    { "emotional": 0.4167, "physical": 0.1364, "spiritual": 0.1481 },
  "Mercury": { "mental": 0.4545 },
  "Venus":   { "emotional": 0.2500 },
  "Mars":    { "physical": 0.3636 },
  "Jupiter": { "mental": 0.1364, "spiritual": 0.2222 },
  "Saturn":  { "mental": 0.1364 },
  "Uranus":  { "mental": 0.2727 },
  "Neptune": { "emotional": 0.1667, "spiritual": 0.2963 },
  "Pluto":   { "emotional": 0.1667, "physical": 0.1364, "spiritual": 0.1852 }
};

const DIGNITIES: Record<string, { ruler: string[]; exalted: string[]; detriment: string[]; fall: string[] }> = {
  "Sun": { ruler: ["Aslan"], exalted: ["Koç"], detriment: ["Kova"], fall: ["Terazi"] },
  "Moon": { ruler: ["Yengeç"], exalted: ["Boğa"], detriment: ["Oğlak"], fall: ["Akrep"] },
  "Mercury": { ruler: ["İkizler", "Başak"], exalted: ["Başak"], detriment: ["Yay", "Balık"], fall: ["Balık"] },
  "Venus": { ruler: ["Boğa", "Terazi"], exalted: ["Balık"], detriment: ["Akrep", "Koç"], fall: ["Başak"] },
  "Mars": { ruler: ["Koç", "Akrep"], exalted: ["Oğlak"], detriment: ["Terazi", "Boğa"], fall: ["Yengeç"] },
  "Jupiter": { ruler: ["Yay", "Balık"], exalted: ["Yengeç"], detriment: ["İkizler", "Başak"], fall: ["Oğlak"] },
  "Saturn": { ruler: ["Oğlak", "Kova"], exalted: ["Terazi"], detriment: ["Yengeç", "Aslan"], fall: ["Koç"] },
  "Uranus": { ruler: ["Kova"], exalted: ["Akrep"], detriment: ["Aslan"], fall: ["Boğa"] },
  "Neptune": { ruler: ["Balık"], exalted: ["Aslan"], detriment: ["Başak"], fall: ["Kova"] },
  "Pluto": { ruler: ["Akrep"], exalted: ["Koç"], detriment: ["Boğa"], fall: ["Terazi"] }
};

const CATEGORY_DESCRIPTIONS: Record<string, Record<string, string>> = {
  mental: {
    High: "Zihinsel işlemciniz çok hızlı. Merkür'ün güçlü etkisiyle analiz yeteneğiniz ve öğrenme hızınız zirvede.",
    Moderate: "Dengeli bir zihinsel kapasite. Mantık ve sezgi arasında uyumlu bir geçiş yapabiliyoruz.",
    Low: "Zihniniz daha derin ve yavaş işlemeyi tercih ediyor olabilir. Detaylara odaklanmakta zorlanmıyorsunuz."
  },
  emotional: {
    High: "Duygusal derinliğiniz ve empati yeteneğiniz çok yüksek. Ay ve Venüs size güçlü bir his dünyası veriyor.",
    Moderate: "Dengeli bir empati yeteneği. Duygularınızı kontrol altında tutabiliyor ve sağlıklı sınırlar çizebiliyorsunuz.",
    Low: "Duygusal tepkileriniz daha rasyonel ve kontrollü olabilir. Mantığı ön planda tutmayı seviyorsunuz."
  },
  physical: {
    High: "Fiziksel enerjiniz ve dayanıklılığınız çok güçlü. Mars ve Güneş size yüksek bir eylem gücü sağlıyor.",
    Moderate: "Düzenli bir enerji seviyesi. İhtiyacınız olduğunda kendinizi motive edebiliyorsunuz.",
    Low: "Enerji tasarrufu modu. Dinlenmeye daha çok ihtiyaç duyuyor ve enerjinizi seçici harcıyorsunuz."
  },
  spiritual: {
    High: "Sezgisel kanallarınız çok açık. Ruhsal farkındalığınız ve evrensel bağınız oldukça kuvvetli.",
    Moderate: "Ruhsal dünyanızla sağlıklı bir temasınız var. İç sesinizi duymayı biliyorsunuz.",
    Low: "Daha dünyevi ve somut bir bakış açısına sahip olabilirsiniz. Spiritüel konulara rasyonel yaklaşıyorsunuz."
  }
};

const CATEGORY_DESCRIPTIONS_EN: Record<string, Record<string, string>> = {
  mental: {
    High: "Your mental processor is very fast. With Mercury's strong influence, your analytical ability and learning speed are at their peak.",
    Moderate: "A balanced mental capacity. You can smoothly transition between logic and intuition.",
    Low: "Your mind may prefer deeper and slower processing. You have no difficulty focusing on details."
  },
  emotional: {
    High: "Your emotional depth and empathy are very high. Moon and Venus give you a powerful world of feelings.",
    Moderate: "A balanced empathy ability. You can keep your emotions under control and draw healthy boundaries.",
    Low: "Your emotional reactions may be more rational and controlled. You prefer to prioritize logic."
  },
  physical: {
    High: "Your physical energy and endurance are very strong. Mars and Sun provide you with high action power.",
    Moderate: "A steady energy level. You can motivate yourself when needed.",
    Low: "Energy conservation mode. You need more rest and spend your energy selectively."
  },
  spiritual: {
    High: "Your intuitive channels are wide open. Your spiritual awareness and universal connection are quite strong.",
    Moderate: "You have a healthy connection with your spiritual world. You know how to listen to your inner voice.",
    Low: "You may have a more worldly and concrete perspective. You approach spiritual matters rationally."
  }
};

export function getEnergyDescription(category: string, level: string, language: string = 'tr'): string {
  const descriptions = language === 'en' ? CATEGORY_DESCRIPTIONS_EN : CATEGORY_DESCRIPTIONS;
  const levelKey = level.includes("High") ? "High" : level === "Moderate" ? "Moderate" : "Low";
  return descriptions[category]?.[levelKey] || "";
}

export function calculateEnergyPotential(chart: BirthChart, userId?: string): EnergyPotentialResult {
  const planetScores: Record<string, number> = {};
  
  const bodies = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
  
  bodies.forEach(body => {
    const pos = chart.planets[body.toLowerCase()];
    if (!pos) return;

    // 1. Gezegen Güç Skoru (Si) Güncellemesi
    // A. Taban Puan
    const basePoint = 15;
    
    // B. Asalet (Dignity)
    let dignityPoint = 10; // Nötr
    const dignityInfo = DIGNITIES[body];
    if (dignityInfo.ruler.includes(pos.sign)) dignityPoint = 25;
    else if (dignityInfo.exalted.includes(pos.sign)) dignityPoint = 20;
    else if (dignityInfo.detriment.includes(pos.sign) || dignityInfo.fall.includes(pos.sign)) dignityPoint = 5;

    // C. Ev Çarpanı (Multiplier)
    let multiplierHouse = 1.0;
    const planetHouse = getPlanetHouse(pos.longitude, chart.ascendant.longitude);
    
    if ([1, 4, 7, 10].includes(planetHouse)) multiplierHouse = 2.0;
    else if ([2, 5, 8, 11].includes(planetHouse)) multiplierHouse = 1.5;
    else multiplierHouse = 1.0;

    let Si = (basePoint + dignityPoint) * multiplierHouse;

    // D. Retro Etkisi
    if (pos.isRetrograde) {
      Si = Si * 0.95; // Minimize punishment from 0.8 to 0.95
    }

    planetScores[body] = Si;
  });

  const categories = {
    mental: 0,
    emotional: 0,
    physical: 0,
    spiritual: 0
  };

  const dominantPlanets: Record<string, { name: string; score: number }> = {
    mental: { name: "", score: -Infinity },
    emotional: { name: "", score: -Infinity },
    physical: { name: "", score: -Infinity },
    spiritual: { name: "", score: -Infinity }
  };

  bodies.forEach(body => {
    const score = planetScores[body] || 0;
    const weights = WEIGHT_CONFIG[body] || {};
    
    Object.keys(weights).forEach(cat => {
      const weight = weights[cat];
      const contribution = score * weight;
      (categories as any)[cat] += contribution;

      if (contribution > dominantPlanets[cat].score) {
        dominantPlanets[cat] = { name: body, score: contribution };
      }
    });
  });

  // 3. Yeni Normalizasyon ve 'Power Curve' Formülü
  const REF_VALUE = 60;
  const finalCategories: any = {};
  let totalPercentage = 0;

  Object.keys(categories).forEach(cat => {
    const score = (categories as any)[cat];
    // Formül: Final% = (Skor / 60)^0.7 * 100
    let percentage = Math.round(Math.pow(score / REF_VALUE, 0.7) * 100);
    percentage = Math.max(0, Math.min(100, percentage));
    
    const level = percentage > 85 ? "Very High" : percentage > 70 ? "High" : percentage > 50 ? "Moderate" : "Low";
    
    finalCategories[cat] = {
      percentage,
      level,
      dominant_planet: dominantPlanets[cat].name,
      description: CATEGORY_DESCRIPTIONS[cat][level.includes("High") ? "High" : level === "Moderate" ? "Moderate" : "Low"]
    };
    totalPercentage += percentage;
  });

  return {
    user_id: userId,
    overall_energy: Math.round(totalPercentage / 4),
    categories: finalCategories
  };
}

function getPlanetHouse(planetLong: number, ascendantLong: number): number {
  const diff = (planetLong - ascendantLong + 360) % 360;
  return Math.floor(diff / 30) + 1;
}
