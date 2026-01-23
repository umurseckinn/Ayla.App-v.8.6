import {
  getTarotEngineCard,
  AstroModifier,
  INTRO_FRAGMENTS,
  TRANSITION_FRAGMENTS,
  CONCLUSION_FRAGMENTS
} from "./tarot-engine-data";
import {
  getTarotEngineCardEN,
  INTRO_FRAGMENTS_EN,
  TRANSITION_FRAGMENTS_EN,
  CONCLUSION_FRAGMENTS_EN
} from "./tarot-engine-data-en";
import { formatHouseNumber } from "./transit-interpretations";

export type TarotTopic = "love" | "career" | "health" | "money" | "general";
export type TarotPosition = "past" | "present" | "future";

const HOUSE_INTERPRETATIONS_EN: Record<number, string> = {
  1: "The first house is the 'I Am' house. It determines your outlook on life, the first impression you give to the outside world, and your vital energy. The sign placed here tells how you view life and how others perceive you.",
  2: "The second house represents your self-worth and material resources. It's not just about money, but also about the talents you possess and your sense of security in life. We see here what you base your value on.",
  3: "The third house is about your mind's workings and immediate environment. Siblings, neighbors, and short trips fall under this house. Your communication style, learning approach, and areas of curiosity are governed here.",
  4: "The fourth house represents your roots, family, and inner world. It symbolizes your deepest sense of security and the emotional heritage from your childhood. It's what 'home' means to you.",
  5: "The fifth house is about your joy of living and creativity. Your love life, hobbies, relationship with children, and capacity for risk-taking are hidden here. We discover what makes your heart beat and how you shine.",
  6: "The sixth house is about your daily routines and health. How you work, how you serve, and how you take care of your body are responsibilities of this house. Discipline and productivity come alive here.",
  7: "The seventh house is the 'We' house. Partnerships, marriage, alliances, and open enemies are the subjects of this house. It represents how you see yourself in another's mirror and what you expect from relationships.",
  8: "The eighth house is about transformation and shared resources. Besides material matters like inheritance and taxes, it covers sexuality and death/rebirth cycles. It's the crisis-ridden but transformative area of life.",
  9: "The ninth house is your life philosophy and vision. Higher education, beliefs, foreign travel, and your desire for expansion reside here. Everything that grows your soul and expands your horizons is here.",
  10: "The tenth house is your career and social status. It symbolizes the peak you want to reach in life, your relationship with bosses, and how you want to be remembered for success by the outside world.",
  11: "The eleventh house is about your ideals and social circle. Friend groups, organizations you belong to, and hopes for the future are governed here. It's about what you want to do for society.",
  12: "The twelfth house is your subconscious and hidden aspects. Dreams, spiritual work, and moments of withdrawal relate to this house. Karma and spiritual purification lie in its depths."
};

const HOUSE_INTERPRETATIONS_TR: Record<number, string> = {
  1: "Birinci ev, 'Ben Varım' evidir. Hayata bakışını, dış dünyaya verdiğin ilk izlenimi ve yaşam enerjini belirler. Buraya yerleşen burç, hayatı nasıl gördüğünü ve başkalarının seni nasıl algıladığını anlatır.",
  2: "İkinci ev, özdeğerini ve maddi kaynaklarını temsil eder. Sadece para değil, sahip olduğun yetenekler ve hayattaki güvenlik hissini de kapsar. Değerini neye dayandırdığını burada görürüz.",
  3: "Üçüncü ev, zihnin işleyişi ve yakın çevren hakkındadır. Kardeşler, komşular ve kısa seyahatler bu evin altına düşer. İletişim tarzın, öğrenme yaklaşımın ve merak alanların burada yönetilir.",
  4: "Dördüncü ev, köklerini, aileni ve iç dünyanı temsil eder. En derin güvenlik duygunu ve çocukluktan gelen duygusal mirasını simgeler. Senin için 'ev'in ne anlama geldiğidir.",
  5: "Beşinci ev, yaşama sevincin ve yaratıcılığın hakkındadır. Aşk hayatın, hobilerin, çocuklarla ilişkin ve risk alma kapasitenin burada gizlidir. Kalbini ne heyecanlandırır ve nasıl parlarsın keşfederiz.",
  6: "Altıncı ev, günlük rutinlerin ve sağlığın hakkındadır. Nasıl çalıştığın, nasıl hizmet ettiğin ve bedenine nasıl baktığın bu evin sorumluluklarıdır. Disiplin ve verimlilik burada hayat bulur.",
  7: "Yedinci ev, 'Biz' evidir. İkili ilişkiler, evlilik, ortaklıklar ve açık düşmanlıklar bu evin konusudur. Kendini bir başkasının aynasında nasıl gördüğünü ve ilişkilerinden ne beklediğini temsil eder.",
  8: "Sekizinci ev, dönüşüm ve ortak kaynaklarla ilgilidir. Miras ve vergiler gibi maddi konuların yanı sıra cinsellik ve ölüm/yeniden doğuş döngülerini kapsar. Kriz dolu ama dönüştürücü bir yaşam alanıdır.",
  9: "Dokuzuncu ev, hayat felsefendir ve vizyonundur. Yüksek öğrenim, inançlar, yabancı seyahatler ve genişleme arzun burada bulunur. Ruhunu büyüten ve ufkunu genişleten her şey buradadır.",
  10: "Onuncu ev, kariyerin ve toplumsal statündür. Hayatta ulaşmak istediğin zirveyi, patronlarla ilişkini ve dış dünya tarafından başarıyla nasıl hatırlanmak istediğini simgeler.",
  11: "On birinci ev, ideallerin ve sosyal çevren hakkındadır. Arkadaş grupları, ait olduğun organizasyonlar ve gelecek için umutlar burada yönetilir. Toplum için ne yapmak istediğinle ilgilidir.",
  12: "On ikinci ev, bilinçaltın ve gizli yönlerindir. Rüyalar, ruhsal çalışmalar ve içe çekilme anları bu evle ilgilidir. Karma ve ruhsal arınma derinliklerinde yatar."
};

export interface PersonalizedReadingParams {
  cards: Array<{
    id: string;
    name: string; // Turkish name
    englishName: string; // Added English name
    isReversed: boolean;
  }>;
  topic: TarotTopic;
  dominantElement: keyof AstroModifier;
  birthChartHouses?: Array<{
    house: number;
    interpretation: string;
  }>;
  language?: 'tr' | 'en';
}


/**
 * Generates a highly personalized and varied tarot reading.
 */
export function generatePersonalizedReading({
  cards,
  topic,
  dominantElement,
  birthChartHouses,
  language = 'tr'
}: PersonalizedReadingParams): string {
  const validElements: (keyof AstroModifier)[] = ["Fire", "Earth", "Air", "Water"];
  const element = validElements.includes(dominantElement) ? dominantElement : "Water";

  // Random picker helper
  const pick = (val: string | string[]) => {
    if (Array.isArray(val)) {
      return val[Math.floor(Math.random() * val.length)];
    }
    return val;
  };

  // Select language-specific data
  const introFragments = language === 'en' ? INTRO_FRAGMENTS_EN : INTRO_FRAGMENTS;
  const transitionFragments = language === 'en' ? TRANSITION_FRAGMENTS_EN : TRANSITION_FRAGMENTS;
  const conclusionFragments = language === 'en' ? CONCLUSION_FRAGMENTS_EN : CONCLUSION_FRAGMENTS;
  const getCardData = language === 'en' ? getTarotEngineCardEN : getTarotEngineCard;

  const intro = pick(introFragments);
  const transition = pick(transitionFragments);
  const conclusion = pick(conclusionFragments);

  const sectionTitle = language === 'en' ? "## Ayla's Cosmic Guidance" : "## Ayla'nın Kozmik Rehberliği";
  let interpretation = `${sectionTitle}\n\n${intro}\n\n`;

  cards.forEach((card, idx) => {
    const position: TarotPosition = idx === 0 ? "past" : idx === 1 ? "present" : "future";
    const cardData = getCardData(card.id, language === 'en' ? card.englishName : card.name);

    let topicMeaning = "";
    if (topic === "general") {
      topicMeaning = pick(cardData.topicMeanings.general);
    } else {
      topicMeaning = pick(cardData.topicMeanings[topic]) || pick(cardData.topicMeanings.general);
    }

    const positionalContext = pick(cardData.positionalNuance[position]);
    const astroModifier = pick(cardData.astroModifiers[element]);

    const stateData = card.isReversed ? cardData.reversed : cardData.upright;
    const cardIntro = pick(stateData.intros);
    const cardMeaning = pick(stateData.meanings);
    const cardGuidance = pick(stateData.guidance);

    let cardText = `${cardIntro} ${topicMeaning} ${cardMeaning} ${positionalContext} ${astroModifier} ${cardGuidance}`;

    // Header format: English Name (Turkish Name) (Reversed)
    const reversedLabel = language === 'en' ? '(Reversed)' : '(Ters)';
    interpretation += `### ${card.englishName} (${card.name})${card.isReversed ? ` ${reversedLabel}` : ''}\n`;

    interpretation += `${cardText}\n\n`;

  });

  interpretation += `${transition}\n\n`;

    // Dynamic House Selection
    if (birthChartHouses && birthChartHouses.length > 0) {
      const allRelevantHouses = cards.flatMap(c => getCardData(c.id, language === 'en' ? c.englishName : c.name).relevantHouses || []);
      let selectedHouse = birthChartHouses.find(h => allRelevantHouses.includes(h.house));

      if (!selectedHouse) {
        const topicToHouse: Record<string, number[]> = {
          love: [7, 5, 8],
          career: [10, 6, 2],
          money: [2, 8, 10],
          health: [6, 1, 12],
          general: [1, 9, 11]
        };
        const preferred = topicToHouse[topic] || [1];
        selectedHouse = birthChartHouses.find(h => preferred.includes(h.house)) || birthChartHouses[0];
      }

      if (selectedHouse) {
          const houseInterp = language === 'en' 
            ? HOUSE_INTERPRETATIONS_EN[selectedHouse.house]
            : HOUSE_INTERPRETATIONS_TR[selectedHouse.house];
          
          const houseLabel = formatHouseNumber(selectedHouse.house, language);
          if (language === 'en') {
            interpretation += `### Effect in Your Star Chart (${houseLabel})\n`;
            interpretation += `The interpretation of ${houseLabel} in your birth chart says: "${houseInterp}" When this effect combines with the energy of your chosen cards, it triggers a much more concrete and prominent transformation in your life.\n\n`;
          } else {
            interpretation += `### Yıldız Haritandaki Etki (${houseLabel})\n`;
            interpretation += `Doğum haritandaki ${houseLabel} yorumun diyor ki: "${houseInterp}" Bu etki, seçtiğin kartların enerjisiyle birleştiğinde hayatında çok daha somut ve belirgin bir dönüşümü tetikliyor.\n\n`;
          }
        }
    }

  const finalNoteTitle = language === 'en' ? "### Ayla's Final Note" : "### Ayla'nın Son Notu";
  interpretation += `${finalNoteTitle}\n`;
  interpretation += `${conclusion}`;

  return interpretation
    .replace(/undefined/g, "")
    .replace(/\*\*/g, "")
    .replace(/###/g, "### ")
    .replace(/## /g, "##")
    .replace(/##/g, "## ")
    .trim();
}
