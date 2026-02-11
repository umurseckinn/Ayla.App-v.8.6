import natalPlanetSignTr from './data/birthchart_planet_sign_tr.json';
import natalPlanetSignEn from './data/birthchart_planet_sign_eng.json';
import houseSignTr from './data/house_sign_tr.json';
import houseSignEn from './data/house_sign_eng.json';

const planetMap: Record<string, { tr: string, en: string }> = {
  'gunes': { tr: 'Gunes', en: 'Sun' },
  'güneş': { tr: 'Gunes', en: 'Sun' },
  'sun': { tr: 'Gunes', en: 'Sun' },
  'ay': { tr: 'Ay', en: 'Moon' },
  'moon': { tr: 'Ay', en: 'Moon' },
  'merkur': { tr: 'Merkur', en: 'Mercury' },
  'merkür': { tr: 'Merkur', en: 'Mercury' },
  'mercury': { tr: 'Merkur', en: 'Mercury' },
  'venus': { tr: 'Venus', en: 'Venus' },
  'venüs': { tr: 'Venus', en: 'Venus' },
  'mars': { tr: 'Mars', en: 'Mars' },
  'jupiter': { tr: 'Jupiter', en: 'Jupiter' },
  'jüpiter': { tr: 'Jupiter', en: 'Jupiter' },
  'saturn': { tr: 'Saturn', en: 'Saturn' },
  'satürn': { tr: 'Saturn', en: 'Saturn' },
  'uranus': { tr: 'Uranus', en: 'Uranus' },
  'uranüs': { tr: 'Uranus', en: 'Uranus' },
  'neptun': { tr: 'Neptun', en: 'Neptune' },
  'neptün': { tr: 'Neptun', en: 'Neptune' },
  'pluton': { tr: 'Pluton', en: 'Pluto' },
  'plüton': { tr: 'Pluton', en: 'Pluto' },
  'pluto': { tr: 'Pluton', en: 'Pluto' },
  'ascendant': { tr: 'Asc', en: 'Asc' },
  'rising': { tr: 'Asc', en: 'Asc' },
  'yukselen': { tr: 'Asc', en: 'Asc' }
};

const signMap: Record<string, { tr: string, en: string }> = {
  'koc': { tr: 'Koc', en: 'Aries' },
  'koç': { tr: 'Koc', en: 'Aries' },
  'aries': { tr: 'Koc', en: 'Aries' },
  'boga': { tr: 'Boga', en: 'Taurus' },
  'boğa': { tr: 'Boga', en: 'Taurus' },
  'taurus': { tr: 'Boga', en: 'Taurus' },
  'ikizler': { tr: 'Ikizler', en: 'Gemini' },
  'gemini': { tr: 'Ikizler', en: 'Gemini' },
  'yengec': { tr: 'Yengec', en: 'Cancer' },
  'yengeç': { tr: 'Yengec', en: 'Cancer' },
  'cancer': { tr: 'Yengec', en: 'Cancer' },
  'aslan': { tr: 'Aslan', en: 'Leo' },
  'leo': { tr: 'Aslan', en: 'Leo' },
  'basak': { tr: 'Basak', en: 'Virgo' },
  'başak': { tr: 'Basak', en: 'Virgo' },
  'virgo': { tr: 'Basak', en: 'Virgo' },
  'terazi': { tr: 'Terazi', en: 'Libra' },
  'libra': { tr: 'Terazi', en: 'Libra' },
  'akrep': { tr: 'Akrep', en: 'Scorpio' },
  'scorpio': { tr: 'Akrep', en: 'Scorpio' },
  'yay': { tr: 'Yay', en: 'Sagittarius' },
  'sagittarius': { tr: 'Yay', en: 'Sagittarius' },
  'oglak': { tr: 'Oglak', en: 'Capricorn' },
  'oğlak': { tr: 'Oglak', en: 'Capricorn' },
  'capricorn': { tr: 'Oglak', en: 'Capricorn' },
  'kova': { tr: 'Kova', en: 'Aquarius' },
  'aquarius': { tr: 'Kova', en: 'Aquarius' },
  'balik': { tr: 'Balik', en: 'Pisces' },
  'balık': { tr: 'Balik', en: 'Pisces' },
  'pisces': { tr: 'Balik', en: 'Pisces' }
};

/**
 * Normalizes sign and planet names to handle Turkish characters and case sensitivity
 */
function normalizeName(name: string): string {
  if (!name) return "";
  return name.toLowerCase()
    .replace(/i̇/g, 'i') // handle dotted i
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim();
}

export function getNatalPlanetInterpretation(planet: string, sign: string, language: string = 'tr'): string {
  const normalizedPlanet = normalizeName(planet);
  const normalizedSign = normalizeName(sign);
  
  const planetKey = planetMap[normalizedPlanet]?.[language === 'en' ? 'en' : 'tr'];
  const signKey = signMap[normalizedSign]?.[language === 'en' ? 'en' : 'tr'];

  if (!planetKey || !signKey) {
    return language === 'en' ? "Interpretation not found." : "Yorum bulunamadı.";
  }

  const data = language === 'en' ? natalPlanetSignEn : natalPlanetSignTr;
  const signData = (data as any)[signKey];
  
  if (!signData) return language === 'en' ? "Interpretation not found for this sign." : "Bu burç için yorum bulunamadı.";
  
  return signData[planetKey] || (language === 'en' ? "Interpretation not found for this planet match." : "Bu gezegen eşleşmesi için yorum bulunamadı.");
}

export function getHouseInterpretation(houseNumber: number, sign: string, language: string = 'tr'): string {
  const normalizedSign = normalizeName(sign);
  
  // Sign key mapping for houses (using the same signMap as planets)
  const signEntry = signMap[normalizedSign];
  if (!signEntry) {
    return language === 'en' ? "Interpretation not found." : "Yorum bulunamadı.";
  }

  const signKey = (language === 'en' ? signEntry.en : signEntry.tr).toLowerCase();

  const isEn = language === 'en';
  const data = isEn ? houseSignEn : houseSignTr;
  
  // JSON key format: "1_ev" for TR, "1_house" for EN
  const houseKey = isEn ? `${houseNumber}_house` : `${houseNumber}_ev`;
  
  // Database root key: "astroloji_yorum_veritabani" for TR, "astrology_database_en" for EN
  const database = isEn 
    ? (data as any).astrology_database_en 
    : (data as any).astroloji_yorum_veritabani;
  
  if (!database) return isEn ? "Database not found." : "Veritabanı bulunamadı.";

  const houseData = database[houseKey];
  if (!houseData) return isEn ? "Interpretation not found for this house." : "Bu ev için yorum bulunamadı.";

  return houseData[signKey] || (isEn ? "Interpretation not found for this sign in this house." : "Bu evde bu burç için yorum bulunamadı.");
}


