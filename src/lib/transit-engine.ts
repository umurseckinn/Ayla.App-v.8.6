import { PlanetPosition, calculateTransits, calculatePlanetPosition } from "./astronomy-service";

export interface PersonalTransit {
  transitPlanet: string;
  transitPlanetKey: string;
  natalPlanet: string;
  natalPlanetKey: string;
  aspectType: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile';
  aspectSymbol: string;
  orb: number;
  state: 'APPLYING' | 'SEPARATING';
  exactHitDate: string;
  house: number;
  houseSign: string;
  effect: 'positive' | 'neutral' | 'negative';
}

const ASPECT_CONFIG = [
  { type: 'conjunction' as const, angle: 0, orb: 8, symbol: '☌', effect: 'neutral' as const },
  { type: 'opposition' as const, angle: 180, orb: 8, symbol: '☍', effect: 'negative' as const },
  { type: 'trine' as const, angle: 120, orb: 7, symbol: '△', effect: 'positive' as const },
  { type: 'square' as const, angle: 90, orb: 7, symbol: '□', effect: 'negative' as const },
  { type: 'sextile' as const, angle: 60, orb: 5, symbol: '⚹', effect: 'positive' as const },
];

const PLANET_EMOJIS: Record<string, string> = {
  sun: "☀️",
  moon: "🌙",
  mercury: "💬",
  venus: "♀️",
  mars: "♂️",
  jupiter: "♃",
  saturn: "♄",
  uranus: "♅",
  neptune: "♆",
  pluto: "♇"
};

export function getPlanetEmoji(key: string): string {
  return PLANET_EMOJIS[key.toLowerCase()] || "✨";
}

export function calculatePersonalTransits(
  targetDate: Date,
  natalPositions: Record<string, PlanetPosition>,
  natalHouses: { house: number; longitude: number; sign?: string }[]
): PersonalTransit[] {
  const transits = calculateTransits(targetDate);
  const activeTransits: PersonalTransit[] = [];

  const transitPlanets = transits.planets;
  const natalPlanetKeys = Object.keys(natalPositions);

  for (const tPlanet of transitPlanets) {
    for (const nKey of natalPlanetKeys) {
      const nPlanet = natalPositions[nKey];
      
      // 1. GEOMETRIC ANALYSIS
      let delta = Math.abs(tPlanet.longitude - nPlanet.longitude);
      if (delta > 180) delta = 360 - delta;

      for (const aspect of ASPECT_CONFIG) {
        const currentOrb = Math.abs(delta - aspect.angle);
        if (currentOrb <= aspect.orb) {
          // 2. VECTOR & VELOCITY LOGIC
          const tomorrow = new Date(targetDate.getTime() + 24 * 60 * 60 * 1000);
          const tPlanetTomorrow = calculatePlanetPosition(tPlanet.planetKey, tomorrow);
          
          let deltaNext = Math.abs(tPlanetTomorrow.longitude - nPlanet.longitude);
          if (deltaNext > 180) deltaNext = 360 - deltaNext;

          const state = deltaNext < delta ? 'APPLYING' : 'SEPARATING';

          // 3. CHRONOMETRIC INTERPOLATION (Exact Hit)
          let exactHitDate = "";
          if (state === 'APPLYING') {
            const dailyMotion = Math.abs(tPlanetTomorrow.longitude - tPlanet.longitude);
            const gap = Math.abs(delta - aspect.angle);
            if (dailyMotion > 0) {
              const daysToHit = gap / dailyMotion;
              const hitDate = new Date(targetDate.getTime() + daysToHit * 24 * 60 * 60 * 1000);
              exactHitDate = hitDate.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            }
          }

          // Determine natal planet house and house sign
          const houseData = natalHouses.find((h, idx) => {
            const nextH = natalHouses[(idx + 1) % 12];
            let long = nPlanet.longitude;
            let start = h.longitude;
            let end = nextH.longitude;
            
            if (start > end) { // Spans 0/360
              return long >= start || long < end;
            }
            return long >= start && long < end;
          });
          
          const house = houseData?.house || 1;
          const houseSign = houseData?.sign || "Koç";

            // Capitalize first letter helper
            const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
            const tKey = capitalize(tPlanet.planetKey);
            const nKeyNormalized = capitalize(nKey);

            activeTransits.push({
              transitPlanet: tPlanet.planet,
              transitPlanetKey: tKey,
              natalPlanet: nPlanet.planet,
              natalPlanetKey: nKeyNormalized,
              aspectType: aspect.type,
              aspectSymbol: aspect.symbol,
            orb: Math.round(currentOrb * 100) / 100,
            state,
            exactHitDate,
            house,
            houseSign,
            effect: aspect.effect
          });
          
          break; // Match only one aspect per pair
        }
      }
    }
  }

  return activeTransits;
}
