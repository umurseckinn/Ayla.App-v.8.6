export const TAROT_IMAGE_BASE_URL = "/assets/tarot/";

/**
 * Maps tarotapi.dev short names to metabismuth/tarot-json filenames
 * 
 * tarotapi.dev names:
 * Major: ar00 - ar21
 * Wands: wa01 - wa10, wapa, wakn, waqu, waki
 * Cups: cu01 - cu10, cupa, cukn, cuqu, cuki
 * Swords: sw01 - sw10, swpa, swkn, swqu, swki
 * Pentacles: pe01 - pe10, pepa, pekan, pequ, peki
 */
export function getTarotImageUrl(nameShort: string): string {
  // Major Arcana
  if (nameShort.startsWith("ar")) {
    const num = nameShort.slice(2);
    return `${TAROT_IMAGE_BASE_URL}m${num}.jpg`;
  }

  // Suits
  const suitMap: Record<string, string> = {
    wa: "w",
    cu: "c",
    sw: "s",
    pe: "p"
  };

  const suitCode = nameShort.slice(0, 2);
  const rankPart = nameShort.slice(2);
  const suitChar = suitMap[suitCode] || "w";

  let rankNum = "";
  if (rankPart === "pa") rankNum = "11";
  else if (rankPart === "kn") rankNum = "12";
  else if (rankPart === "qu") rankNum = "13";
  else if (rankPart === "ki") rankNum = "14";
  else rankNum = rankPart; // 01, 02, etc.

  return `${TAROT_IMAGE_BASE_URL}${suitChar}${rankNum}.jpg`;
}
