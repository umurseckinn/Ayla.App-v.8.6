import arcanaEn from './data/Tarot_Reading_Arcana_en.json';
import cupsEn from './data/Tarot_Reading_Cups_en.json';
import wandsEn from './data/Tarot_Reading_Wands_en.json';
import swordsEn from './data/Tarot_Reading_Swords_en.json';
import pentaclesEn from './data/Tarot_Reading_Pentacles_en.json';

export interface EnglishTarotCard {
  card_id: number;
  card_name: string;
  upright: {
    ask: { gecmis: string; simdi: string; gelecek: string };
    is: { gecmis: string; simdi: string; gelecek: string };
    para: { gecmis: string; simdi: string; gelecek: string };
    saglik: { gecmis: string; simdi: string; gelecek: string };
    hepsi: { gecmis: string; simdi: string; gelecek: string };
  };
  reversed: {
    ask: { gecmis: string; simdi: string; gelecek: string };
    is: { gecmis: string; simdi: string; gelecek: string };
    para: { gecmis: string; simdi: string; gelecek: string };
    saglik: { gecmis: string; simdi: string; gelecek: string };
    hepsi: { gecmis: string; simdi: string; gelecek: string };
  };
}

const ALL_EN_CARDS: EnglishTarotCard[] = [
  ...(arcanaEn as any[] as EnglishTarotCard[]),
  ...(cupsEn as any[] as EnglishTarotCard[]),
  ...(wandsEn as any[] as EnglishTarotCard[]),
  ...(swordsEn as any[] as EnglishTarotCard[]),
  ...(pentaclesEn as any[] as EnglishTarotCard[])
];

// Mapping from name_short to card_id in JSON (same as TR)
const ID_MAP: Record<string, number> = {
  // Arcana
  "ar00": 0, "ar01": 1, "ar02": 2, "ar03": 3, "ar04": 4, "ar05": 5, "ar06": 6, "ar07": 7,
  "ar08": 8, "ar09": 9, "ar10": 10, "ar11": 11, "ar12": 12, "ar13": 13, "ar14": 14, "ar15": 15,
  "ar16": 16, "ar17": 17, "ar18": 18, "ar19": 19, "ar20": 20, "ar21": 21,
  // Wands
  "waac": 22, "wa02": 23, "wa03": 24, "wa04": 25, "wa05": 26, "wa06": 27, "wa07": 28, "wa08": 29, "wa09": 30, "wa10": 31, "wapa": 32, "wakn": 33, "waqu": 34, "waki": 35,
  // Cups
  "cuac": 36, "cu02": 37, "cu03": 38, "cu04": 39, "cu05": 40, "cu06": 41, "cu07": 42, "cu08": 43, "cu09": 44, "cu10": 45, "cupa": 46, "cukn": 47, "cuqu": 48, "cuki": 49,
  // Swords
  "swac": 50, "sw02": 51, "sw03": 52, "sw04": 53, "sw05": 54, "sw06": 55, "sw07": 56, "sw08": 57, "sw09": 58, "sw10": 59, "swpa": 60, "swkn": 61, "swqu": 62, "swki": 63,
  // Pentacles
  "peac": 64, "pe02": 65, "pe03": 66, "pe04": 67, "pe05": 68, "pe06": 69, "pe07": 70, "pe08": 71, "pe09": 72, "pe10": 73, "pepa": 74, "pekn": 75, "pequ": 76, "peki": 77
};

export function getEnglishTarotCardData(id: string): EnglishTarotCard | undefined {
  const jsonId = ID_MAP[id];
  if (jsonId === undefined) return undefined;
  return ALL_EN_CARDS.find(c => c.card_id === jsonId);
}
