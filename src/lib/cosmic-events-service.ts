// Offline mode: No Supabase needed - all data calculated locally
import {
  Observer,
  SearchMoonQuarter,
  NextMoonQuarter,
  Body,
  Equator,
  Ecliptic,
  MakeTime,
  FlexibleDateTime,
  AstroTime,
  MoonQuarter
} from "astronomy-engine";

export interface CosmicEvent {
  id: string;
  event_name: string;
  event_type: string;
  start_date: string;
  end_date: string;
  planet: string;
  description: string;
  general_impact: string;
}

export interface MoonPhaseData {
  phase: string;
  date: string;
  time: string;
}

/**
 * Safely creates an Astronomy.AstroTime object from various date inputs.
 */
function safeMakeTime(date: FlexibleDateTime): AstroTime {
  if (date && typeof date === 'object' && 'ut' in date) {
    return date as AstroTime;
  }

  let d: Date;
  if (date instanceof Date && !isNaN(date.getTime())) {
    d = date;
  } else {
    d = new Date(date as any);
    if (isNaN(d.getTime())) d = new Date();
  }

  return MakeTime(d);
}

function getPlanetEclipticLongitude(body: Body, date: Date): number {
  const time = safeMakeTime(date);
  const equ = Equator(body, time, new Observer(0, 0, 0), true, true);
  const ecl = Ecliptic(equ.vec);
  return ecl.elon;
}

// Helper to convert AstroTime to JS Date
function astroTimeToDate(astroTime: AstroTime): Date {
  if (astroTime.date instanceof Date) {
    return astroTime.date;
  }
  // Fallback: Convert UT (days since J2000) to JS Date
  const J2000_EPOCH = Date.UTC(2000, 0, 1, 12, 0, 0);
  return new Date(J2000_EPOCH + astroTime.ut * 86400000);
}

// Astronomy Engine based moon phase fetching using SearchMoonQuarter
export async function fetchMoonPhases(startDate: Date, numPhases: number = 4): Promise<MoonPhaseData[]> {
  const phases: MoonPhaseData[] = [];
  const currentDate = startDate instanceof Date && !isNaN(startDate.getTime()) ? startDate : new Date();

  const phaseNames = ["Yeniay", "İlk Dördün", "Dolunay", "Son Dördün"];

  try {
    // Get the first moon quarter
    let mq: MoonQuarter = SearchMoonQuarter(currentDate);

    for (let i = 0; i < numPhases; i++) {
      const jsDate = astroTimeToDate(mq.time);

      if (isNaN(jsDate.getTime())) {
        console.warn("Invalid date from moon phase, stopping.");
        break;
      }

      phases.push({
        phase: phaseNames[mq.quarter % 4] || "Ay Fazı",
        date: jsDate.toISOString().split('T')[0],
        time: jsDate.toISOString().split('T')[1].substring(0, 5)
      });

      // Get next moon quarter
      mq = NextMoonQuarter(mq);
    }
  } catch (e) {
    console.error("Error fetching moon phases:", e);
  }

  return phases;
}

import { calculatePlanetPosition } from './astronomy-service';

export function getCurrentRetrogrades(date: Date = new Date(), language: 'tr' | 'en' = 'tr'): Array<{ planet: string; sign: string }> {
  const bodies = ["Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
  
  const retrogrades: Array<{ planet: string; sign: string }> = [];
  
  bodies.forEach(body => {
    try {
      const position = calculatePlanetPosition(body, date, language);
      if (position.isRetrograde) {
        retrogrades.push({
          planet: position.planet,
          sign: position.sign
        });
      }
    } catch (e) {
      console.error(`Error calculating retrograde for ${body}:`, e);
    }
  });

  return retrogrades;
}

function getZodiacSign(longitude: number, language: 'tr' | 'en' = 'tr'): string {
  const signsTR = [
    "Koç", "Boğa", "İkizler", "Yengeç",
    "Aslan", "Başak", "Terazi", "Akrep",
    "Yay", "Oğlak", "Kova", "Balık"
  ];
  const signsEN = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  const signs = language === 'en' ? signsEN : signsTR;
  const index = Math.floor(longitude / 30) % 12;
  return signs[index];
}

export async function fetchCosmicEvents(): Promise<CosmicEvent[]> {
  // Offline mode: No Supabase, return empty array
  // Moon phases and retrogrades are calculated locally
  return [];
}

export async function getUnifiedCosmicData(): Promise<CosmicEvent[]> {
  const today = new Date();
  const moonPhases = await fetchMoonPhases(today, 4);
  const dbEvents = await fetchCosmicEvents();

  const moonEvents: CosmicEvent[] = moonPhases.map((moon, idx) => ({
    id: `moon-${idx}`,
    event_name: moon.phase,
    event_type: "moon_phase",
    start_date: moon.date,
    end_date: moon.date,
    planet: "Ay",
    description: `${moon.phase} gerçekleşiyor.`,
    general_impact: "Duygusal Döngü"
  }));

  const retros = getCurrentRetrogrades(today);
  const retroEvents: CosmicEvent[] = retros.map((r, idx) => ({
    id: `retro-${idx}`,
    event_name: `${r.planet} Retrosu`,
    event_type: "retrograde",
    start_date: today.toISOString().split('T')[0],
    end_date: today.toISOString().split('T')[0], // Approximation
    planet: r.planet,
    description: `${r.planet} şu an ${r.sign} burcunda geri harekette.`,
    general_impact: "İçe Dönüş ve Revizyon"
  }));

  return [...dbEvents, ...moonEvents, ...retroEvents].sort((a, b) =>
    new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  );
}

export function isInRetrograde(planet: string): boolean {
  const retros = getCurrentRetrogrades();
  return retros.some(r => r.planet === planet);
}
