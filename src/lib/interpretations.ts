import { 
  TAROT_INTROS, 
  TAROT_BODIES, 
  TAROT_CONCLUSIONS, 
  SYNASTRY_HOUSE_OVERLAYS_EXPANDED 
} from "@/lib/tarot-library";
import { generatePersonalizedReading, TarotTopic } from "./tarot-engine";
import { createBirthChartProfile, generateAIInterpretation } from "./ai-interpretation";

export const ZODIAC_ELEMENTS: Record<string, "Ateş" | "Toprak" | "Hava" | "Su"> = {
  Koç: "Ateş", Aslan: "Ateş", Yay: "Ateş",
  Boğa: "Toprak", Başak: "Toprak", Oğlak: "Toprak",
  İkizler: "Hava", Terazi: "Hava", Kova: "Hava",
  Yengeç: "Su", Akrep: "Su", Balık: "Su",
};

const TOPIC_MAP: Record<string, TarotTopic> = {
  "aşk": "love",
  "love": "love",
  "iş": "career",
  "kariyer": "career",
  "career": "career",
  "para": "money",
  "money": "money",
  "sağlık": "health",
  "health": "health",
  "hepsi": "general",
  "general": "general"
};

const ELEMENT_MAP: Record<string, "Fire" | "Earth" | "Air" | "Water"> = {
  "Ateş": "Fire",
  "Toprak": "Earth",
  "Hava": "Air",
  "Su": "Water"
};

/**
 * Modern blendTarot using the advanced randomized engine.
 */
export async function blendTarot(cards: any[], profile: any, intention: string) {
  const zodiac = profile?.zodiac_sign || "Bilinmiyor";
  const elementStr = ZODIAC_ELEMENTS[zodiac as keyof typeof ZODIAC_ELEMENTS] || "Toprak";
  const dominantElement = ELEMENT_MAP[elementStr] || "Earth";
  
  const topic = TOPIC_MAP[intention.toLowerCase()] || "general";

  // Get Birth Chart Houses for personalization
  let birthChartHouses: any[] = [];
  try {
    if (profile?.birth_date) {
      const birthDate = new Date(profile.birth_date);
      const bcProfile = await createBirthChartProfile(birthDate, profile.birth_time, profile.birth_place);
      const interpretation = await generateAIInterpretation(bcProfile, profile.id);
      
      birthChartHouses = Object.entries(interpretation.houses).map(([num, text]) => ({
        house: parseInt(num),
        interpretation: text
      }));
    }
  } catch (err) {
    console.error("Error getting birth chart for tarot:", err);
  }

  // Use the advanced engine which handles randomization and combinations
  return generatePersonalizedReading({
    cards: cards.map(c => ({
      id: typeof c === 'string' ? c : (c.name_short || c.id),
      name: c.name || "Gizemli Kart",
      englishName: c.englishName || c.name || "Mysterious Card",
      isReversed: c.isReversed || false
    })),
    topic,
    dominantElement,
    birthChartHouses
  });
}

export const SYNASTRY_TEMPLATES = {
  elements: {
    "Ateş-Ateş": "İki volkanın birleşmesi gibi! Tutku, heyecan ve bitmek bilmeyen bir enerji var aranızda. Ancak ikiniz de baskın gelmek isterseniz ortalık biraz karışabilir.",
    "Ateş-Toprak": "Ateş toprağı pişirir ve şekil verir. Biri ilham verirken diğeri bu ilhamı somutlaştırıyor. Bu ilişki, hayallerin gerçeğe dönüştüğü sarsılmaz bir atölye gibi.",
    "Ateş-Hava": "Hava ateşi körükler! Birbirinizi zihinsel ve ruhsal olarak sürekli besliyorsunuz. Fikirler tutkuyla birleşiyor ve ortaya harika bir vizyon çıkıyor.",
    "Ateş-Su": "Buhar enerjisi! Birbirinize zıt olsanız da aranızdaki çekim çok güçlü. Biriniz diğerini sakinleştirirken, diğeri ötekini harekete geçiriyor.",
    "Toprak-Toprak": "Sarsılmaz bir kale inşa ediyorsunuz. Güven, huzur ve kalıcılık bu ilişkinin temeli. Dünyevi konularda muazzam bir uyumunuz var.",
    "Toprak-Hava": "Fikirlerin ete kemiğe büründüğü bir ilişki. Biri düşünüyor, diğeri inşa ediyor. Birbirinize gerçekçi bir bakış açısı katıyorsunuz.",
    "Toprak-Su": "Toprak suyu tutar, su toprağı besler. Muazzam bir verimlilik ve duygusal güven var. Birlikte çok bereketli ve huzurlu bir hayat kurabilirsiniz.",
    "Hava-Hava": "Zihinsel bir şölen! Sürekli konuşan, paylaşan ve dünyayı birlikte keşfeden iki ruh. İletişiminiz bu ilişkinin hayat damarı.",
    "Hava-Su": "Bulutların üzerinde bir dans gibi. Biri hayal kuruyor, diğeri bu hayallere isim koyuyor. Duygular ve fikirler zarifçe harmanlanıyor.",
    "Su-Su": "Derin bir okyanus gibi. Kelimelere ihtiyaç duymadan birbirinizi ruhsal olarak anlıyorsunuz. Empati yeteneğiniz aranızdaki bağı mucizevi kılıyor.",
  },
  scenarios: {
    communication: [
      "İletişim kanallarınız açık görünüyor, birbirinizi sadece sözcüklerle değil, bakışlarla da anlıyorsunuz.",
      "Zaman zaman yanlış anlaşılmalar olsa da, dürüstlükle her düğümü çözebilecek bir enerjiniz var.",
      "Aralarındaki o özel dil, dış dünyadan izole, sadece onlara ait gizli bir evren gibi.",
    ],
    passion: [
      "Aranızdaki çekim kozmik bir patlama gibi, her an yeni bir heyecan doğuruyor.",
      "Sakin ama derinden akan bir tutku var. Birbirinizin varlığı bile içsel bir sıcaklık veriyor.",
      "Tutkunuz, fırtınalı bir deniz gibi; bazen çok hırçın bazen ise büyüleyici bir durgunlukta.",
    ],
    challenges: [
      "Farklı bakış açılarının yarattığı bu zorluklar, aslında birbirinizi daha iyi tanımanız için birer fırsat.",
      "Sabır ve anlayış, bu ilişkideki en büyük sınavınız ve aynı zamanda en büyük anahtarınız.",
      "Bazen birbirinizin üzerine çok fazla düştüğünüzü hissedebilirsiniz, özgürlük alanlarına saygı şifadır.",
    ],
    future: [
      "Yıldızlar, birlikte inşa edeceğiniz sağlam ve uzun vadeli bir geleceği müjdeliyor.",
      "Önünüzdeki yol biraz engebeli olsa da, el eve verdiğinizde aşamayacağınız hiçbir engel yok.",
      "Kaderiniz, ortak bir amaç uğruna birleşmiş. Birlikte dünyayı değiştirebilecek bir gücünüz var.",
    ]
  },
    intros: [
      "Kozmik bir fısıltıyla aranızdaki bağı inceledim, tatlım...",
      "Yıldızların haritanızdaki dansı bana çok şey anlatıyor ruhdaşım...",
      "Ayla olarak, kalplerinizin ritmini gökyüzünün dilinden okudum...",
      "Evrenin gizemli koridorlarında sizin aşk hikayenizin izini sürdüm...",
    ],
    conclusions: [
      "Unutma ki yıldızlar yol gösterir, ama yolu yürüyen sizsiniz. Aşkla kal!",
      "Bu kozmik bağın kıymetini bilin. Evren sizi bir sebeple bir araya getirdi.",
      "Sizin hikayeniz gökyüzünde parlayan eşsiz bir takım yıldızı gibi. Mutluluklar dilerim.",
      "Kalbini dinle, çünkü o en doğru pusuladır. Yıldızlar sana rehber olsun.",
    ],
    houseOverlays: {
      1: "Partnerinin 1. evine dokunuyorsun; onun hayata bakışını ve kimliğini derinden etkiliyorsun.",
      2: "Onun 2. evine yerleşmişsin; partnerinin özdeğer duygusunu ve maddi güvenliğini besliyorsun.",
      3: "3. ev etkileşimi; zihinsel uyumunuz ve iletişiminiz bu ilişkinin en güçlü motoru.",
      4: "4. evde kökleniyorsun; partnerin seninle kendini 'evinde' ve güvende hissediyor.",
      5: "5. ev şenliği; aranızdaki aşk, neşe ve yaratıcılık bir kutlama tadında.",
      6: "6. ev vurgusu; günlük yaşamda ve yardımlaşmada harika bir ekip oluyorsunuz.",
      7: "7. ev uyumu; tam bir 'biz' enerjisi! Evlilik ve uzun vadeli ortaklık için mükemmel bir konum.",
      8: "8. ev derinliği; tutku, dönüşüm ve ruhsal bir birleşme. Aranızdaki bağ çok sarsılmaz.",
      9: "9. ev vizyonu; birbirinizin ufkunu açıyor, hayata daha geniş bir pencereden bakıyorsunuz.",
      10: "10. ev prestiji; toplum önünde parlayan, birbirini başarıya taşıyan bir çiftsiniz.",
      11: "11. ev dostluğu; hem sevgili hem de en yakın arkadaşsınız, ortak hayalleri paylaşıyorsunuz.",
      12: "12. ev mistisizmi; ruhsal bir bağ, rüyalarda buluşma ve karmik bir tamamlanma.",
    }
  };

export function stitchSynastry(p1Data: any, p2Data: any, synastryResult: any) {
  const p1Zodiac = synastryResult.person1Signs.sun;
  const p2Zodiac = synastryResult.person2Signs.sun;
  const p1Element = ZODIAC_ELEMENTS[p1Zodiac as keyof typeof ZODIAC_ELEMENTS] || "Toprak";
  const p2Element = ZODIAC_ELEMENTS[p2Zodiac as keyof typeof ZODIAC_ELEMENTS] || "Toprak";
  
  const elementCombo = `${p1Element}-${p2Element}`;
  const elementText = SYNASTRY_TEMPLATES.elements[elementCombo as keyof typeof SYNASTRY_TEMPLATES.elements] || "Birbirinizi tamamlayan eşsiz bir enerjiniz var.";
  
  const intro = SYNASTRY_TEMPLATES.intros[Math.floor(Math.random() * SYNASTRY_TEMPLATES.intros.length)];
  const conclusion = SYNASTRY_TEMPLATES.conclusions[Math.floor(Math.random() * SYNASTRY_TEMPLATES.conclusions.length)];
  
  const { emotional, physical, intellectual, spiritual } = synastryResult.percentages;

  let result = `## 💘 Kozmik Aşk Haritası: ${p1Data.full_name} & ${p2Data.full_name}\n\n`;
  result += `${intro}\n\n`;

  // 4 Pillars section
  result += `### 📊 Temel Uyum Yüzdeleri\n`;
  result += `| Alan | Uyum | Ağırlık |\n`;
  result += `| :--- | :---: | :---: |\n`;
  result += `| **Ruhsal Bağ** | %${spiritual} | %30 |\n`;
  result += `| **Duygusal Akış** | %${emotional} | %40 |\n`;
  result += `| **Fiziksel Çekim** | %${physical} | %15 |\n`;
  result += `| **Zihinsel Uyum** | %${intellectual} | %15 |\n\n`;
  result += `**🌟 Toplam Kozmik Uyum: %${synastryResult.score}**\n\n`;
  
  result += `### 🌟 Elementlerin Uyumu\n`;
  result += `Siz bir **${p1Element}** ve **${p2Element}** ruhu olarak bir araya geldiniz. ${elementText}\n\n`;
  
  result += `### 🏠 Evden Eve Derin Bakış\n`;
  result += `İkinizin de doğum haritasındaki ev yerleşimlerini karşılıklı olarak incelediğimde şu özel eşleşmeleri görüyorum:\n\n`;

  synastryResult.houseCompatibility.forEach((house: any) => {
    result += `- **${house.houseNumber}. Ev (${house.title}):** ${house.description} (Uyum: %${house.score})\n`;
  });
  result += `\n`;

  if (synastryResult.aspects && synastryResult.aspects.length > 0) {
    result += `### ✨ Gökyüzünün İşaretleri\n`;
    synastryResult.aspects.slice(0, 5).forEach((aspect: any) => {
      result += `- **${aspect.planet1}** ve **${aspect.planet2}** arasındaki ${aspect.aspectName} açısı: ${aspect.description}\n`;
    });
    result += `\n`;
  }
  
  result += `### 💡 Ayla'nın İlişki Sırrı\n`;
  result += `${synastryResult.overallInterpretation} Tatlım, bu ilişkide en önemli şey birbirinizin özgürlük alanlarına saygı duyarken o derin güven bağını korumak. `;
  
  result += `\n\n${conclusion}`;
  
  return result;
}
