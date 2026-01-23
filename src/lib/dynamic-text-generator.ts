export interface TextContext {
  userName?: string;
  zodiacSign?: string;
  element?: "Fire" | "Earth" | "Air" | "Water" | "Ateş" | "Toprak" | "Hava" | "Su";
  topic?: string;
  mood?: "positive" | "neutral" | "challenging";
  timeOfDay?: "morning" | "afternoon" | "evening" | "night";
  season?: "spring" | "summer" | "autumn" | "winter";
}

const SENTENCE_TEMPLATES = {
  greetings: {
    morning: [
      "Günaydın {name}, yıldızlar bugün senin için parlıyor!",
      "Günaydın ruhdaşım {name}, kozmik enerjiler seninle!",
      "Bugüne güzel bir başlangıç yapıyorsun {name}!",
      "Sabahın ilk ışıklarıyla birlikte {name}, enerji senin yanında!"
    ],
    afternoon: [
      "Merhaba {name}, günün ortasında sana bir mesaj var!",
      "İyi günler {name}, yıldızlar mesajını iletiyor!",
      "{name}, öğleden sonranın enerjisi seninle!"
    ],
    evening: [
      "İyi akşamlar {name}, günün yorgunluğunu at üzerinden!",
      "Akşamın huzuru seninle olsun {name}!",
      "{name}, gün batımı enerjisi seni sarmalıyor!"
    ],
    night: [
      "İyi geceler {name}, rüyalarında cevapları bulacaksın!",
      "Gecenin sessizliğinde {name}, yıldızlar seninle konuşuyor!",
      "{name}, ay ışığı ruhunu aydınlatsın!"
    ]
  },

  transitions: {
    positive: [
      "Bu muazzam enerji hayatını güzelleştirecek.",
      "Evren tam da senin hayrına çalışıyor.",
      "Kozmik rüzgarlar seni destekliyor.",
      "Yıldızlar senin için gülümsüyor.",
      "Bu döngü bereketli ve parlak görünüyor.",
      "Enerji akışı tamamen senin lehine."
    ],
    neutral: [
      "Bu bir değerlendirme ve denge dönemi.",
      "Olayları farklı açılardan görme vakti.",
      "Her şeyin bir sebebi var, gözlemle.",
      "Bu geçiş dönemi seni hazırlıyor.",
      "Sabırlı ol, açılımlar yolda.",
      "Bekle ve gözlemle, zamanı gelecek."
    ],
    challenging: [
      "Zorluklar aslında birer öğretmen.",
      "Bu engeller seni güçlendirmek için var.",
      "Fırtınadan sonra güneş daha parlak doğar.",
      "Karanlık, ışığın değerini anlatan bir öğretmen.",
      "Her düşüş, bir yükseliş için hazırlık.",
      "Bu sınav seni bir üst seviyeye taşıyacak."
    ]
  },

  advice: {
    Fire: [
      "Tutkunu takip et ama öfkeni kontrol altında tut.",
      "Harekete geç, cesaret senin doğanda var.",
      "Enerjini doğru yöne kanalize et.",
      "Liderlik et ama dinlemeyi unutma.",
      "Ateşin yakmasın, aydınlatsın."
    ],
    Earth: [
      "Sabırlı ol, emeklerin meyvesini verecek.",
      "Somut adımlar at, planlı ilerle.",
      "Güvendiğin temeller üzerine inşa et.",
      "Maddi güvenliğini ihmal etme.",
      "Ayaklarını yere sağlam bas."
    ],
    Air: [
      "İletişim kur, fikirlerini paylaş.",
      "Yeni bilgilere açık ol.",
      "Sosyal bağlarını güçlendir.",
      "Zihnini besle, öğrenmeye devam et.",
      "Sözlerin gücünü unutma."
    ],
    Water: [
      "Sezgilerine güven, onlar senin pusulan.",
      "Duygularını bastırma, ifade et.",
      "Empati yeteneğini kullan.",
      "İç dünyana kulak ver.",
      "Rüyalarına dikkat et, mesajlar var."
    ],
    "Ateş": [
      "Tutkunu takip et ama öfkeni kontrol altında tut.",
      "Harekete geç, cesaret senin doğanda var.",
      "Enerjini doğru yöne kanalize et.",
      "Liderlik et ama dinlemeyi unutma.",
      "Ateşin yakmasın, aydınlatsın."
    ],
    "Toprak": [
      "Sabırlı ol, emeklerin meyvesini verecek.",
      "Somut adımlar at, planlı ilerle.",
      "Güvendiğin temeller üzerine inşa et.",
      "Maddi güvenliğini ihmal etme.",
      "Ayaklarını yere sağlam bas."
    ],
    "Hava": [
      "İletişim kur, fikirlerini paylaş.",
      "Yeni bilgilere açık ol.",
      "Sosyal bağlarını güçlendir.",
      "Zihnini besle, öğrenmeye devam et.",
      "Sözlerin gücünü unutma."
    ],
    "Su": [
      "Sezgilerine güven, onlar senin pusulan.",
      "Duygularını bastırma, ifade et.",
      "Empati yeteneğini kullan.",
      "İç dünyana kulak ver.",
      "Rüyalarına dikkat et, mesajlar var."
    ]
  },

  conclusions: {
    positive: [
      "Yıldızlar senin için parlıyor, ışığın bol olsun!",
      "Evren seni destekliyor, güvenle ilerle!",
      "Mucizelere hazır ol, kapında duruyorlar!",
      "Sen en iyisini hak ediyorsun, bunu unutma!",
      "Işıkla kal, Ayla her zaman yanında!"
    ],
    neutral: [
      "Yıldızlar yol gösterir, yolu yürüyen sensin.",
      "Akışa güven, her şey yerli yerine oturacak.",
      "Kalbinin sesini dinle, o asla yanıltmaz.",
      "Sabırlı ol, zamanı geldiğinde her şey netleşecek.",
      "Gözlemle ve bekle, cevaplar gelecek."
    ],
    challenging: [
      "Karanlık geçecek, güneş mutlaka doğacak.",
      "Bu fırtına seni güçlendirecek, dayanıklısın.",
      "Her zorluk bir öğretmendir, dersini al.",
      "Düşsen de kalkacaksın, bu senin doğanda var.",
      "Umudunu kaybetme, yeni bir gün geliyor."
    ]
  },

  topicIntros: {
    love: [
      "Aşk hayatın hakkında evrenin mesajları var...",
      "Duygusal dünyanla ilgili yıldızlar konuşuyor...",
      "Kalbinin sesine kulak verme vakti...",
      "İlişkilerin hakkında kozmik bir bakış..."
    ],
    career: [
      "Kariyer yolculuğun hakkında önemli mesajlar...",
      "İş hayatında yeni bir sayfa açılıyor...",
      "Mesleki hedeflerinle ilgili yıldızlar ne diyor?",
      "Başarı yolunda sana rehberlik edecek bilgiler..."
    ],
    health: [
      "Sağlığın ve esenliğin hakkında kozmik mesajlar...",
      "Beden ve ruh dengen için rehberlik...",
      "Şifa enerjisi senin için aktif...",
      "Fiziksel ve zihinsel sağlığın için ipuçları..."
    ],
    money: [
      "Maddi konular hakkında evrenin fısıltıları...",
      "Finansal bolluk kapında olabilir...",
      "Para ve bereket konusunda yıldızlar ne diyor?",
      "Maddi güvenliğin için kozmik rehberlik..."
    ],
    general: [
      "Genel yaşam enerjin hakkında bir bakış...",
      "Hayatının akışı hakkında evrenin mesajları...",
      "Kozmik bir panorama sunan genel yorum...",
      "Tüm alanlarda sana rehberlik edecek bilgiler..."
    ]
  },

  zodiacPhrases: {
    "Koç": [
      "cesur ruhunla", "öncü enerjinle", "kararlı duruşunla", "ateşli yapınla"
    ],
    "Boğa": [
      "sabırlı yapınla", "sarsılmaz kararlılığınla", "pratik bakış açınla", "güvenilir duruşunla"
    ],
    "İkizler": [
      "meraklı zihninle", "çok yönlü yeteneklerinle", "iletişim gücünle", "hızlı düşüncelerinle"
    ],
    "Yengeç": [
      "şefkatli kalbinle", "sezgisel derinliğinle", "korumacı doğanla", "duygusal zekânla"
    ],
    "Aslan": [
      "karizmatik enerjinle", "cömert kalbinle", "liderlik vasıflarınla", "yaratıcı ruhunla"
    ],
    "Başak": [
      "analitik zekânla", "titiz yaklaşımınla", "yardımsever doğanla", "düzenli yapınla"
    ],
    "Terazi": [
      "adalet duygunla", "diplomatik yeteneğinle", "uyumlu enerjinle", "estetik bakışınla"
    ],
    "Akrep": [
      "tutkulu ruhunla", "dönüştürücü gücünle", "sezgisel derinliğinle", "kararlı iradenle"
    ],
    "Yay": [
      "macera dolu ruhunla", "iyimser bakışınla", "özgür düşüncelerinle", "vizyon gücünle"
    ],
    "Oğlak": [
      "disiplinli yapınla", "hırslı doğanla", "stratejik zekânla", "sabırlı karakterinle"
    ],
    "Kova": [
      "yenilikçi fikirlerinle", "özgür ruhunla", "insancıl bakışınla", "orijinal perspektifenle"
    ],
    "Balık": [
      "sezgisel dehanla", "empatik kalbinle", "yaratıcı hayal gücünle", "ruhsal derinliğinle"
    ]
  },

  seasonalPhrases: {
    spring: [
      "Bahar enerjisi yenilenmeyi destekliyor.",
      "Doğanın uyanışı gibi sen de yenileniyorsun.",
      "Yeni başlangıçlar için mükemmel bir dönem."
    ],
    summer: [
      "Yaz güneşi enerjini şarj ediyor.",
      "Yaratıcılığın ve tutku en parlak döneminde.",
      "Aksiyona geçmek için ideal enerji."
    ],
    autumn: [
      "Sonbahar hasat zamanı, emeğinin meyvelerini topla.",
      "Değişim rüzgarları esiyor, hazırlan.",
      "İç gözlem ve değerlendirme dönemi."
    ],
    winter: [
      "Kışın sessizliği içsel bilgeliği destekliyor.",
      "Dinlenme ve yenilenme için uygun bir dönem.",
      "Tohumlar toprağın altında büyüyor, sabırlı ol."
    ]
  }
};

const FILLER_PHRASES = [
  "Bu dönemde", "Şu an", "Bugün", "Yakın zamanda",
  "Önümüzdeki günlerde", "Bu hafta", "Bu süreçte", "Şu aralar"
];

const INTENSITY_MODIFIERS = {
  high: ["çok", "oldukça", "son derece", "muazzam", "inanılmaz", "muazzam derecede"],
  medium: ["biraz", "bir miktar", "orta seviyede", "makul ölçüde"],
  low: ["hafif", "az da olsa", "ufak", "küçük"]
};

const CONNECTORS = [
  "Ayrıca,", "Bunun yanı sıra,", "Öte yandan,", "Bununla birlikte,",
  "Dahası,", "Ek olarak,", "Üstelik,", "Ancak,"
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function replaceTemplateVars(template: string, context: TextContext): string {
  let result = template;
  result = result.replace(/{name}/g, context.userName || "tatlım");
  result = result.replace(/{zodiac}/g, context.zodiacSign || "ruhdaş");
  result = result.replace(/{element}/g, String(context.element || "kozmik"));
  result = result.replace(/{topic}/g, context.topic || "genel");
  return result;
}

export function generateGreeting(context: TextContext): string {
  const timeOfDay = context.timeOfDay || "morning";
  const templates = SENTENCE_TEMPLATES.greetings[timeOfDay];
  return replaceTemplateVars(pickRandom(templates), context);
}

export function generateTransition(mood: "positive" | "neutral" | "challenging" = "neutral"): string {
  return pickRandom(SENTENCE_TEMPLATES.transitions[mood]);
}

export function generateAdvice(element?: string): string {
  if (!element) return pickRandom(SENTENCE_TEMPLATES.advice.Water);
  const advice = SENTENCE_TEMPLATES.advice[element as keyof typeof SENTENCE_TEMPLATES.advice];
  return advice ? pickRandom(advice) : pickRandom(SENTENCE_TEMPLATES.advice.Water);
}

export function generateConclusion(mood: "positive" | "neutral" | "challenging" = "positive"): string {
  return pickRandom(SENTENCE_TEMPLATES.conclusions[mood]);
}

export function generateTopicIntro(topic: string = "general"): string {
  const intros = SENTENCE_TEMPLATES.topicIntros[topic as keyof typeof SENTENCE_TEMPLATES.topicIntros];
  return intros ? pickRandom(intros) : pickRandom(SENTENCE_TEMPLATES.topicIntros.general);
}

export function getZodiacPhrase(zodiacSign: string): string {
  const phrases = SENTENCE_TEMPLATES.zodiacPhrases[zodiacSign as keyof typeof SENTENCE_TEMPLATES.zodiacPhrases];
  return phrases ? pickRandom(phrases) : "kozmik enerjinle";
}

export function getSeasonalPhrase(season?: string): string {
  if (!season) return "";
  const phrases = SENTENCE_TEMPLATES.seasonalPhrases[season as keyof typeof SENTENCE_TEMPLATES.seasonalPhrases];
  return phrases ? pickRandom(phrases) : "";
}

export function addIntensity(text: string, level: "high" | "medium" | "low" = "medium"): string {
  const modifier = pickRandom(INTENSITY_MODIFIERS[level]);
  return `${modifier} ${text}`;
}

export function getConnector(): string {
  return pickRandom(CONNECTORS);
}

export function getFiller(): string {
  return pickRandom(FILLER_PHRASES);
}

export function buildDynamicSentence(parts: {
  subject?: string;
  verb?: string;
  object?: string;
  modifier?: string;
  context?: TextContext;
}): string {
  const { subject, verb, object, modifier, context } = parts;

  let sentence = "";

  if (subject) sentence += subject + " ";
  if (verb) sentence += verb + " ";
  if (modifier) sentence += modifier + " ";
  if (object) sentence += object;

  sentence = sentence.trim();

  if (context?.userName) {
    sentence = sentence.replace(/sen/gi, context.userName);
  }

  if (!sentence.endsWith(".") && !sentence.endsWith("!") && !sentence.endsWith("?")) {
    sentence += ".";
  }

  return sentence;
}

export function generateDynamicParagraph(context: TextContext): string {
  const parts: string[] = [];

  parts.push(generateGreeting(context));

  if (context.topic) {
    parts.push(generateTopicIntro(context.topic));
  }

  if (context.zodiacSign) {
    const zodiacPhrase = getZodiacPhrase(context.zodiacSign);
    parts.push(`${context.zodiacSign} burcu ${zodiacPhrase} bu dönemde öne çıkıyor.`);
  }

  const mood = context.mood || "neutral";
  parts.push(generateTransition(mood));

  if (context.element) {
    parts.push(generateAdvice(context.element));
  }

  const season = context.season;
  if (season) {
    const seasonalPhrase = getSeasonalPhrase(season);
    if (seasonalPhrase) parts.push(seasonalPhrase);
  }

  parts.push(generateConclusion(mood));

  return parts.join(" ");
}

export function createVariedReading(
  baseContent: string,
  context: TextContext,
  variationLevel: "low" | "medium" | "high" = "medium"
): string {
  let result = baseContent;

  if (variationLevel === "high" || variationLevel === "medium") {
    result = generateGreeting(context) + "\n\n" + result;
  }

  if (context.zodiacSign && (variationLevel === "high" || variationLevel === "medium")) {
    const zodiacPhrase = getZodiacPhrase(context.zodiacSign);
    result = result.replace(
      /(\.\s)/,
      `. ${context.zodiacSign} burcu ${zodiacPhrase} bu dönemde özellikle etkili. `
    );
  }

  if (variationLevel === "high" && context.season) {
    const seasonalPhrase = getSeasonalPhrase(context.season);
    if (seasonalPhrase) {
      result += `\n\n${seasonalPhrase}`;
    }
  }

  const mood = context.mood || "neutral";
  result += `\n\n${generateConclusion(mood)}`;

  return result;
}

export const AYLA_PERSONALITY_PHRASES = {
  caring: [
    "canım", "tatlım", "güzelim", "sevgili ruhdaşım", "kalbim",
    "prensesim", "prensim", "yıldızım", "güzel kalplim"
  ],
  mystical: [
    "kozmik enerji", "yıldızların dansı", "evrenin fısıltısı", "kaderin ipleri",
    "gökyüzünün mesajı", "ruhsal bağ", "mistik işaretler", "kozmik akış"
  ],
  empowering: [
    "içindeki güç", "potansiyelinin sınırsızlığı", "ruhunun ışığı", "kalbinin bilgeliği",
    "doğal yeteneğin", "sezgisel dehan", "yaratıcı enerjin", "kararlılığın"
  ],
  supportive: [
    "yanındayım", "seninle", "destekliyorum", "güvenebilirsin", "inan bana",
    "yalnız değilsin", "her zaman buradayım", "sana güveniyorum"
  ]
};

export function getAylaPhrase(category: keyof typeof AYLA_PERSONALITY_PHRASES): string {
  return pickRandom(AYLA_PERSONALITY_PHRASES[category]);
}

export function personalizeText(text: string, context: TextContext): string {
  let result = text;

  if (context.userName) {
    const caringPhrase = getAylaPhrase("caring");
    result = result.replace(/\{caring\}/g, caringPhrase);
    result = result.replace(/tatlım/g, `${context.userName}, ${caringPhrase}`);
  }

  result = result.replace(/\{mystical\}/g, getAylaPhrase("mystical"));
  result = result.replace(/\{empowering\}/g, getAylaPhrase("empowering"));
  result = result.replace(/\{supportive\}/g, getAylaPhrase("supportive"));

  return result;
}

export {
  SENTENCE_TEMPLATES,
  FILLER_PHRASES,
  INTENSITY_MODIFIERS,
  CONNECTORS
};
