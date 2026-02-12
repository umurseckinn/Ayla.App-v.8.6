
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
  ...(arcanaTr as TurkishTarotCard[]),
  ...(cupsTr as TurkishTarotCard[]),
  ...(wandsTr as TurkishTarotCard[]),
  ...(swordsTr as TurkishTarotCard[]),
  ...(pentaclesTr as TurkishTarotCard[])
];

// Mapping from name_short to card_id in JSON
const ID_MAP: Record<string, number> = {
  // Arcana
  "ar00": 0, "ar01": 1, "ar02": 2, "ar03": 3, "ar04": 4, "ar05": 5, "ar06": 6, "ar07": 7,
  "ar08": 8, "ar09": 9, "ar10": 10, "ar11": 11, "ar12": 12, "ar13": 13, "ar14": 14, "ar15": 15,
  "ar16": 16, "ar17": 17, "ar18": 18, "ar19": 19, "ar20": 20, "ar21": 21,
  // Wands
  "waac": 22, "wa02": 23, "wa03": 24, "wa04": 25, "wa05": 26, "wa08": 27, "wa09": 28, "wakn": 29, "waqu": 30, "waki": 31,
  // Cups
  "cuac": 32, "cu02": 33, "cu03": 34, "cu04": 35, "cu05": 36, "cu06": 37, "cu07": 38, "cu08": 39, "cu09": 40, "cu10": 41, "cupa": 42, "cuki": 43,
  // Swords
  "swac": 44, "sw02": 45, "sw03": 46, "sw04": 47, "sw05": 48, "sw06": 49, "sw07": 50, "sw08": 51, "sw09": 52, "sw10": 53, "swpa": 54, "swkn": 55, "swqu": 56, "swki": 57,
  // Pentacles
  "peac": 58, "pe02": 59, "pe03": 60, "pe04": 61, "pe05": 62, "pe06": 63, "pe07": 64, "pe08": 65, "pe09": 66, "pe10": 67, "pepa": 68, "pekn": 69, "pequ": 70, "peki": 71
};

export function getTurkishTarotCardData(id: string): TurkishTarotCard | undefined {
  const jsonId = ID_MAP[id];
  if (jsonId === undefined) return undefined;
  return ALL_TR_CARDS.find(c => c.card_id === jsonId);
}
