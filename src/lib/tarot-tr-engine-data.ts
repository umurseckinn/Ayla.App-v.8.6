
import arcanaTr from './data/Tarot_Reading_Arcana_tr.json';
import cupsTr from './data/Tarot_Reading_Cups_tr.json';
import wandsTr from './data/Tarot_Reading_Wands_tr.json';
import swordsTr from './data/Tarot_Reading_Swords_tr.json';
import pentaclesTr from './data/Tarot_Reading_Pentacles_tr.json';

export interface TurkishTarotCard {
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

const ALL_TR_CARDS: TurkishTarotCard[] = [
  ...(arcanaTr as any[] as TurkishTarotCard[]),
  ...(cupsTr as any[] as TurkishTarotCard[]),
  ...(wandsTr as any[] as TurkishTarotCard[]),
  ...(swordsTr as any[] as TurkishTarotCard[]),
  ...(pentaclesTr as any[] as TurkishTarotCard[])
];

// Mapping from name_short to card_id in JSON
const ID_MAP: Record<string, number> = {
  // Arcana
  "ar00": 0, "ar01": 1, "ar02": 2, "ar03": 3, "ar04": 4, "ar05": 5, "ar06": 6, "ar07": 7,
  "ar08": 8, "ar09": 9, "ar10": 10, "ar11": 11, "ar12": 12, "ar13": 13, "ar14": 14, "ar15": 15,
  "ar16": 16, "ar17": 17, "ar18": 18, "ar19": 19, "ar20": 20, "ar21": 21,
  // Wands (22-35)
  "waac": 22, "wa02": 23, "wa03": 24, "wa04": 25, "wa05": 26, "wa06": 27, "wa07": 28, "wa08": 29, "wa09": 30, "wa10": 31, "wapa": 32, "wakn": 33, "waqu": 34, "waki": 35,
  // Cups (36-49)
  "cuac": 36, "cu02": 37, "cu03": 38, "cu04": 39, "cu05": 40, "cu06": 41, "cu07": 42, "cu08": 43, "cu09": 44, "cu10": 45, "cupa": 46, "cukn": 47, "cuqu": 48, "cuki": 49,
  // Swords (50-63)
  "swac": 50, "sw02": 51, "sw03": 52, "sw04": 53, "sw05": 54, "sw06": 55, "sw07": 56, "sw08": 57, "sw09": 58, "sw10": 59, "swpa": 60, "swkn": 61, "swqu": 62, "swki": 63,
  // Pentacles (64-77)
  "peac": 64, "pe02": 65, "pe03": 66, "pe04": 67, "pe05": 68, "pe06": 69, "pe07": 70, "pe08": 71, "pe09": 72, "pe10": 73, "pepa": 74, "pekn": 75, "pequ": 76, "peki": 77
};

export function getTurkishTarotCardData(id: string): TurkishTarotCard | undefined {
  const jsonId = ID_MAP[id];
  if (jsonId === undefined) return undefined;
  return ALL_TR_CARDS.find(c => c.card_id === jsonId);
}
