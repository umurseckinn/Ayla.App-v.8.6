import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPlanetWithSuffix(planetName: string, language: string): string {
  if (language !== 'tr') return planetName;

  const suffixes: Record<string, string> = {
    'Güneş': "'in",
    'Ay': "'ın",
    'Merkür': "'ün",
    'Venüs': "'ün",
    'Mars': "'ın",
    'Jüpiter': "'in",
    'Satürn': "'ün",
    'Uranüs': "'ün",
    'Neptün': "'ün",
    'Plüton': "'un"
  };

  return `${planetName}${suffixes[planetName] || "'in"}`;
}
