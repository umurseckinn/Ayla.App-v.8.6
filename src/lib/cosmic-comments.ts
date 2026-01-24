import transitPopUpData from './transit-pop-up.json';
import transitPopUpDataEn from './transit-pop-up-en.json';

// Types for the JSON data structure
interface CosmicCommentEntry {
  "Güncel Gezegen": string;
  "Natal Ev": string;
  "Natal Gezegen": string;
  "Açı Çeşidi": string;
  "Yorumlar": string;
}

const cosmicCommentsTr = transitPopUpData as CosmicCommentEntry[];
const cosmicCommentsEn = transitPopUpDataEn as CosmicCommentEntry[];

// Mapping dictionaries
const PLANET_EN_TO_TR: Record<string, string> = {
  "sun": "Güneş",
  "moon": "Ay",
  "mercury": "Merkür",
  "venus": "Venüs",
  "mars": "Mars",
  "jupiter": "Jüpiter",
  "saturn": "Satürn",
  "uranus": "Uranüs",
  "neptune": "Neptün",
  "pluto": "Plüton"
};

const ASPECT_EN_TO_TR: Record<string, string> = {
  "conjunction": "Kavuşum",
  "sextile": "Altmışlık",
  "square": "Kare",
  "trine": "Üçgen",
  "opposition": "Karşıt"
};

/**
 * Retrieves the cosmic comment based on transit planet, house, and aspect.
 * Matches: Güncel Gezegen - Natal Ev - Açı Çeşidi
 * 
 * @param transitPlanet - English name of the transit planet (e.g., "Sun", "Moon")
 * @param house - House number (1-12)
 * @param aspectType - English aspect type (e.g., "conjunction", "square")
 * @param language - Language code ('tr' or 'en')
 * @returns The comment string or null if not found
 */
export function getCosmicComment(transitPlanet: string, house: number, aspectType: string, language: 'tr' | 'en' = 'tr'): string | null {
  // Convert inputs to Turkish format used in JSON (both files use TR keys for lookups)
  const trPlanet = PLANET_EN_TO_TR[transitPlanet.toLowerCase()] || transitPlanet;
  const trHouse = `${house}. Ev`;
  const trAspect = ASPECT_EN_TO_TR[aspectType.toLowerCase()] || aspectType;

  const dataset = language === 'en' ? cosmicCommentsEn : cosmicCommentsTr;

  const entry = dataset.find(item => 
    item["Güncel Gezegen"] === trPlanet &&
    item["Natal Ev"] === trHouse &&
    item["Açı Çeşidi"] === trAspect
  );

  return entry ? entry["Yorumlar"] : null;
}
