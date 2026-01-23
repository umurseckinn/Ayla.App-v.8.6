import { safeJSONParse } from "./safe-utils";

export function getHappinessImpact(date: Date): number {
  if (typeof window === 'undefined') return 0;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;

  const saved = localStorage.getItem(`cosmic_journal_${dateKey}`);
  if (!saved) return 0;

  try {
    const parsed = safeJSONParse(saved, {} as any);
    const happiness = typeof parsed.happiness === 'number' ? parsed.happiness : 50;

    // Formula: (happiness / 10) - 5
    // 100% -> +5
    // 0% -> -5
    // 50% -> 0
    return Math.round((happiness / 10) - 5);
  } catch (e) {
    return 0;
  }
}

export function getHappinessPercentage(date: Date): number {
  if (typeof window === 'undefined') return 50;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;

  const saved = localStorage.getItem(`cosmic_journal_${dateKey}`);
  if (!saved) return 50;

  try {
    const parsed = safeJSONParse(saved, {} as any);
    return typeof parsed.happiness === 'number' ? parsed.happiness : 50;
  } catch (e) {
    return 50;
  }
}

