import natalPlanetSignTr from './data/birthchart_planet_sign_tr.json';
import natalPlanetSignEn from './data/birthchart_planet_sign_eng.json';

const planetMap: Record<string, { tr: string, en: string }> = {
  'güneş': { tr: 'Gunes', en: 'Sun' },
  'sun': { tr: 'Gunes', en: 'Sun' },
  'ay': { tr: 'Ay', en: 'Moon' },
  'moon': { tr: 'Ay', en: 'Moon' },
  'merkür': { tr: 'Merkur', en: 'Mercury' },
  'mercury': { tr: 'Merkur', en: 'Mercury' },
  'venüs': { tr: 'Venus', en: 'Venus' },
  'venus': { tr: 'Venus', en: 'Venus' },
  'mars': { tr: 'Mars', en: 'Mars' },
  'jüpiter': { tr: 'Jupiter', en: 'Jupiter' },
  'jupiter': { tr: 'Jupiter', en: 'Jupiter' },
  'satürn': { tr: 'Saturn', en: 'Saturn' },
  'saturn': { tr: 'Saturn', en: 'Saturn' },
  'uranüs': { tr: 'Uranus', en: 'Uranus' },
  'uranus': { tr: 'Uranus', en: 'Uranus' },
  'neptün': { tr: 'Neptun', en: 'Neptune' },
  'neptune': { tr: 'Neptun', en: 'Neptune' },
  'plüton': { tr: 'Pluton', en: 'Pluto' },
  'pluto': { tr: 'Pluton', en: 'Pluto' }
};

const signMap: Record<string, { tr: string, en: string }> = {
  'koç': { tr: 'Koc', en: 'Aries' },
  'aries': { tr: 'Koc', en: 'Aries' },
  'boğa': { tr: 'Boga', en: 'Taurus' },
  'taurus': { tr: 'Boga', en: 'Taurus' },
  'ikizler': { tr: 'Ikizler', en: 'Gemini' },
  'gemini': { tr: 'Ikizler', en: 'Gemini' },
  'yengeç': { tr: 'Yengec', en: 'Cancer' },
  'cancer': { tr: 'Yengec', en: 'Cancer' },
  'aslan': { tr: 'Aslan', en: 'Leo' },
  'leo': { tr: 'Aslan', en: 'Leo' },
  'başak': { tr: 'Basak', en: 'Virgo' },
  'virgo': { tr: 'Basak', en: 'Virgo' },
  'terazi': { tr: 'Terazi', en: 'Libra' },
  'libra': { tr: 'Terazi', en: 'Libra' },
  'akrep': { tr: 'Akrep', en: 'Scorpio' },
  'scorpio': { tr: 'Akrep', en: 'Scorpio' },
  'yay': { tr: 'Yay', en: 'Sagittarius' },
  'sagittarius': { tr: 'Yay', en: 'Sagittarius' },
  'oğlak': { tr: 'Oglak', en: 'Capricorn' },
  'capricorn': { tr: 'Oglak', en: 'Capricorn' },
  'kova': { tr: 'Kova', en: 'Aquarius' },
  'aquarius': { tr: 'Kova', en: 'Aquarius' },
  'balık': { tr: 'Balik', en: 'Pisces' },
  'pisces': { tr: 'Balik', en: 'Pisces' }
};

export function getNatalPlanetInterpretation(planet: string, sign: string, language: string = 'tr'): string {
  const normalizedPlanet = planet.toLowerCase();
  const normalizedSign = sign.toLowerCase();
  
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
