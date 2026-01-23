import natalInterpretations from './natal-interpretations.json';
import natalInterpretationsEn from './natal-interpretations-en.json';

export function getNatalPlanetInterpretation(planet: string, sign: string, language: string = 'tr'): string {
  const planetKey = planet.charAt(0).toUpperCase() + planet.slice(1).toLowerCase();
  
  const data = language === 'en' ? natalInterpretationsEn : natalInterpretations;
  const planetData = (data as any)[planetKey];
  if (!planetData) return language === 'en' ? "No interpretation found for this planet." : "Bu gezegen için yorum bulunamadı.";
  
  return planetData[sign] || (language === 'en' ? "No interpretation found for this sign match." : "Bu burç eşleşmesi için yorum bulunamadı.");
}
