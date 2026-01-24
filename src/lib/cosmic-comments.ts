import transitPopUpData from './transit-pop-up.json';
import transitPopUpDataEn from './transit-pop-up-eng.json';

// Types for the JSON data structure
interface CosmicCommentEntryTr {
  "Güncel Gezegen": string;
  "Natal Ev": string;
  "Natal Gezegen": string;
  "Açı Çeşidi": string;
  "Yorumlar": string;
}

interface CosmicCommentEntryEn {
  "Current Planet": string;
  "Natal House": string;
  "Natal Planet": string;
  "Aspect Type": string;
  "Interpretations": string;
}

const cosmicCommentsTr = transitPopUpData as unknown as CosmicCommentEntryTr[];
const cosmicCommentsEn = transitPopUpDataEn as unknown as CosmicCommentEntryEn[];

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

function toTitleCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getOrdinalHouse(house: number): string {
  const j = house % 10,
        k = house % 100;
  if (j === 1 && k !== 11) {
    return house + "st House";
  }
  if (j === 2 && k !== 12) {
    return house + "nd House";
  }
  if (j === 3 && k !== 13) {
    return house + "rd House";
  }
  return house + "th House";
}

/**
 * Retrieves the cosmic comment based on transit planet, house, and aspect.
 * Matches: Güncel Gezegen - Natal Ev - Açı Çeşidi (TR)
 * Matches: Current Planet - Natal House - Aspect Type (EN)
 * 
 * @param transitPlanet - English name of the transit planet (e.g., "Sun", "Moon")
 * @param house - House number (1-12)
 * @param aspectType - English aspect type (e.g., "conjunction", "square")
 * @param language - Language code ('tr' or 'en')
 * @returns The comment string or null if not found
 */
export function getCosmicComment(transitPlanet: string, house: number, aspectType: string, language: 'tr' | 'en' = 'tr'): string | null {
  if (language === 'en') {
    // English Logic
    const enPlanet = toTitleCase(transitPlanet);
    const enHouse = getOrdinalHouse(house);
    const enAspect = toTitleCase(aspectType);

    const entry = cosmicCommentsEn.find(item => 
      item["Current Planet"] === enPlanet &&
      item["Natal House"] === enHouse &&
      item["Aspect Type"] === enAspect
    );

    return entry ? entry["Interpretations"] : null;
  } else {
    // Turkish Logic
    const trPlanet = PLANET_EN_TO_TR[transitPlanet.toLowerCase()] || transitPlanet;
    const trHouse = `${house}. Ev`;
    const trAspect = ASPECT_EN_TO_TR[aspectType.toLowerCase()] || aspectType;

    const entry = cosmicCommentsTr.find(item => 
      item["Güncel Gezegen"] === trPlanet &&
      item["Natal Ev"] === trHouse &&
      item["Açı Çeşidi"] === trAspect
    );

    return entry ? entry["Yorumlar"] : null;
  }
}
