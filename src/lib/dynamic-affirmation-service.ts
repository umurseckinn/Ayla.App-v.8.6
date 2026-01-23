import { UserLifeEvent, LIFE_EVENTS, LifeEvent } from "./data/life-events";
import { TransitData } from "./astronomy-service";
import { 
  COSMIC_LOGIC, 
  generateAffirmation, 
  calculatePersonalImpact,
  ImpactLevel 
} from "./astrology";
import lifeEventInterpretations from "./data/life-event-interpretations.json";
import { 
  EVENT_AFFIRMATIONS, 
  FOCUS_AFFIRMATIONS, 
  DAY_TO_DAY_AFFIRMATIONS, 
  GENERAL_AFFIRMATIONS 
} from "./data/event-affirmations";
import {
  MASSIVE_GENERAL_AFFIRMATIONS,
  MASSIVE_COSMIC_WARNINGS,
  MASSIVE_FOCUS_OF_THE_DAY,
  MASSIVE_DAY_TO_DAY
} from "./data/massive-affirmations";
import { getEnglishGuidance } from "./data/affirmations-en";

interface AffirmationContext {
  activeEvents: LifeEvent[];
  transits: TransitData | null;
  sunSign: string;
  targetDate?: Date;
  userEvents?: UserLifeEvent[];
  language?: 'tr' | 'en';
}

export interface GuidanceData {
  guidance: string;
  affirmation: string;
  warning: string;
  focus: string;
  emotionImpact: string;
  eventImpact: string;
  dayToDay: string;
  luckyColor: string;
}

const CATEGORY_PLANET_MAP: Record<string, string> = {
  Love: "Venüs",
  Career: "Satürn",
  Finance: "Jüpiter",
  Health: "Mars",
  Social: "Merkür"
};

type EventPhase = "far_future" | "near_future" | "now" | "recent_past" | "far_past";

// Turkish grammar helpers
const trLower = (s: string) => s.toLocaleLowerCase('tr-TR');
const capitalize = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

function getSuffix(word: string, type: 'gen' | 'acc' | 'loc' | 'dir' | 'poss1s', isProper?: boolean): string {
  if (!word) return "";
  const lastVowel = word.match(/[aeıioöuü][^aeıioöuü]*$/i)?.[0]?.[0]?.toLowerCase();
  const endsWithVowel = /[aeıioöuü]$/i.test(word);
  
  if (!lastVowel) return "";

  const planets = ["Venüs", "Satürn", "Jüpiter", "Mars", "Merkür", "Güneş", "Ay", "Plüton", "Neptün", "Uranüs"];
  const shouldAddApostrophe = isProper || planets.includes(word);
  const prefix = shouldAddApostrophe ? "'" : "";

  if (type === 'gen') { // -in, -nin
    if (endsWithVowel) {
      if (['a', 'ı'].includes(lastVowel)) return prefix + "nın";
      if (['e', 'i'].includes(lastVowel)) return prefix + "nin";
      if (['o', 'u'].includes(lastVowel)) return prefix + "nun";
      if (['ö', 'ü'].includes(lastVowel)) return prefix + "nün";
    } else {
      if (['a', 'ı'].includes(lastVowel)) return prefix + "ın";
      if (['e', 'i'].includes(lastVowel)) return prefix + "in";
      if (['o', 'u'].includes(lastVowel)) return prefix + "un";
      if (['ö', 'ü'].includes(lastVowel)) return prefix + "ün";
    }
  }
  
  if (type === 'acc') { // -i, -yi
    if (endsWithVowel) {
      if (['a', 'ı'].includes(lastVowel)) return prefix + "yı";
      if (['e', 'i'].includes(lastVowel)) return prefix + "yi";
      if (['o', 'u'].includes(lastVowel)) return prefix + "yu";
      if (['ö', 'ü'].includes(lastVowel)) return prefix + "yü";
    } else {
      if (['a', 'ı'].includes(lastVowel)) return prefix + "ı";
      if (['e', 'i'].includes(lastVowel)) return prefix + "i";
      if (['o', 'u'].includes(lastVowel)) return prefix + "u";
      if (['ö', 'ü'].includes(lastVowel)) return prefix + "ü";
    }
  }

  if (type === 'loc') { // -de, -da
      if (['a', 'ı', 'o', 'u'].includes(lastVowel)) return prefix + "da";
      return prefix + "de";
  }

  if (type === 'dir') { // -e, -ye
    if (endsWithVowel) {
      if (['a', 'ı', 'o', 'u'].includes(lastVowel)) return prefix + "ya";
      return prefix + "ye";
    } else {
      if (['a', 'ı', 'o', 'u'].includes(lastVowel)) return prefix + "a";
      return prefix + "e";
    }
  }

  if (type === 'poss1s') { // -im, -ım
    if (endsWithVowel) {
      return prefix + "m";
    } else {
      if (['a', 'ı'].includes(lastVowel)) return prefix + "ım";
      if (['e', 'i'].includes(lastVowel)) return prefix + "im";
      if (['o', 'u'].includes(lastVowel)) return prefix + "um";
      if (['ö', 'ü'].includes(lastVowel)) return prefix + "üm";
    }
  }
  
  return "";
}

function getEventPhase(daysDiff: number): EventPhase {
  if (daysDiff === 0) return "now";
  if (daysDiff < 0) {
    if (daysDiff >= -2) return "near_future";
    return "far_future";
  } else {
    if (daysDiff <= 3) return "recent_past";
    return "far_past";
  }
}

function getDetailedTimeContext(daysDiff: number): string {
  if (daysDiff === 0) return "bugün tam şu an";
  if (daysDiff === -1) return "yarınki büyük güne bir kala";
  if (daysDiff === -2) return "iki gün sonraki o önemli ana hazırlanırken";
  if (daysDiff === 1) return "dünkü o önemli anın hemen ardından";
  if (daysDiff === 2) return "iki gün önceki o büyük olayın yankıları sürerken";
  if (daysDiff === 3) return "üç gün önceki o dönüm noktasının etkileriyle";
  return daysDiff < 0 ? "yaklaşan o özel güne doğru" : "geçmişteki o önemli anın izinde";
}

export function generateDynamicAffirmation(context: AffirmationContext): string {
  const { activeEvents, transits, sunSign, targetDate, userEvents } = context;

  const dominantEvent = activeEvents.length > 0 
    ? activeEvents.reduce((prev, curr) => 
        Math.abs(curr.base_impact_percent) > Math.abs(prev.base_impact_percent) ? curr : prev
      )
    : null;

  if (!dominantEvent) {
    return generateAffirmation("neutral", "transit", "Güneş");
  }

  let phase: EventPhase = "now";
  let daysDiff = 0;
  if (targetDate && userEvents) {
    const userEvent = userEvents.find(ue => ue.event_id === dominantEvent.event_id);
    if (userEvent) {
      const eventDate = new Date(userEvent.event_date);
      eventDate.setHours(0, 0, 0, 0);
      const target = new Date(targetDate);
      target.setHours(0, 0, 0, 0);
      daysDiff = Math.floor((target.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
      phase = getEventPhase(daysDiff);
    }
  }

  const targetPlanetTr = CATEGORY_PLANET_MAP[dominantEvent.category] || "Güneş";
  
  // Check new database first
  const eventAffs = EVENT_AFFIRMATIONS[dominantEvent.event_id];
  if (eventAffs && eventAffs[phase]) {
    const text = getRandom(eventAffs[phase].affirmations);
    return text.replace(/\"/g, ""); // Clean any quotes
  }

  const interpretation = (lifeEventInterpretations as any)[dominantEvent.event_id];
  
  if (interpretation && interpretation[phase]) {
    let text = interpretation[phase].affirmation;
    text = text.replace("{planet}", targetPlanetTr).replace(/\"/g, "");
    
    const planetAdvice = getPlanetGenericAdvice(targetPlanetTr, dominantEvent.polarity === "Positive" ? "positive" : "negative");
    return `${text} ${planetAdvice}`;
  }

  const impactLevel: ImpactLevel = dominantEvent.polarity === "Positive" ? "positive" : "negative";
  const pool = (COSMIC_LOGIC as any)[dominantEvent.category]?.[impactLevel] || [];
  
  if (pool.length > 0) {
    return pool[Math.floor(Math.random() * pool.length)].replace("${event}", trLower(dominantEvent.event_name_tr));
  }

  return generateAffirmation(impactLevel, "transit", targetPlanetTr);
}

export function generateHighDimensionalGuidance(context: AffirmationContext, happiness: number, energyLevel: number = 50): GuidanceData {
  const { activeEvents, userEvents, targetDate, language = 'tr' } = context;
  
  const dominantEvent = activeEvents.length > 0 
    ? activeEvents.reduce((prev, curr) => 
        Math.abs(curr.base_impact_percent) > Math.abs(prev.base_impact_percent) ? curr : prev
      )
    : null;

  const isHappy = happiness >= 70;
  const isSad = happiness <= 30;
  const isHighEnergy = energyLevel >= 70;
  const isLowEnergy = energyLevel <= 30;
  const isPositiveEvent = dominantEvent ? dominantEvent.polarity === "Positive" : true;

  // Planet name mappings
  const PLANET_EN_MAP: Record<string, string> = {
    "Venüs": "Venus",
    "Satürn": "Saturn",
    "Jüpiter": "Jupiter",
    "Mars": "Mars",
    "Merkür": "Mercury",
    "Güneş": "Sun"
  };

  const planetTr = dominantEvent ? (CATEGORY_PLANET_MAP[dominantEvent.category] || "Güneş") : "Güneş";
  const planetEn = PLANET_EN_MAP[planetTr] || "Sun";

  // For English, use the English guidance generator
  if (language === 'en') {
    const eventNameEn = dominantEvent?.event_name_en || dominantEvent?.event_name_tr || "cosmic journey";
    return getEnglishGuidance(
      isHappy,
      isSad,
      isHighEnergy,
      isLowEnergy,
      isPositiveEvent,
      !!dominantEvent,
      eventNameEn,
      planetEn
    );
  }

  // Turkish version continues below
  const planet = planetTr;
  const rawEventName = dominantEvent ? dominantEvent.event_name_tr : "gökyüzü seyri";
  const eventName = trLower(rawEventName);

  let daysDiff = 0;
  let phase: EventPhase = "now";
  if (dominantEvent && targetDate && userEvents) {
    const userEvent = userEvents.find(ue => ue.event_id === dominantEvent.event_id);
    if (userEvent) {
      const eventDate = new Date(userEvent.event_date);
      eventDate.setHours(0, 0, 0, 0);
      const target = new Date(targetDate);
      target.setHours(0, 0, 0, 0);
      daysDiff = Math.floor((target.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
      phase = getEventPhase(daysDiff);
    }
  }

  const timeCtx = getDetailedTimeContext(daysDiff);

  if (!dominantEvent) {
    return {
      guidance: isSad && isLowEnergy 
        ? "Bugün ruhun biraz yorgun ve gökyüzü de sessiz. Kendine şefkat göstermekten başka hiçbir zorunluluğun yok, bırak dünya seni beklesin."
        : isHappy && isHighEnergy
        ? "İçindeki neşe ve kozmik boşluk harika bir ikili oluşturuyor. Bugün kendi kurallarını koyup, hiçbir plan yapmadan parlamaya hazırsın!"
        : "Gökyüzü bugün durağan bir seyir izliyor. Kendi iç dünyanda bir keşfe çıkmak için en huzurlu anlardasın.",
      affirmation: getRandom(MASSIVE_GENERAL_AFFIRMATIONS),
      warning: getRandom(MASSIVE_COSMIC_WARNINGS),
      focus: getRandom([...FOCUS_AFFIRMATIONS, ...MASSIVE_FOCUS_OF_THE_DAY]),
      emotionImpact: isHappy ? "İyimserliğin çevrendekilere bulaşıyor." : isSad ? "Hüznün seni derinleştirecek." : "Dengeli bir gün.",
      eventImpact: "Şu an odak noktan kendin olmalısın.",
      dayToDay: getRandom([...DAY_TO_DAY_AFFIRMATIONS, ...MASSIVE_DAY_TO_DAY]),
      luckyColor: "Sezgilerin sana rengini fısıldayacak."
    };
  }

  // Guidance (Narrative)
  let guidance = "";
  if (isSad && isLowEnergy && !isPositiveEvent) {
    guidance = `Bugün ${timeCtx}, ruhunun biraz karardığını ve bedeninin yorgun düştüğünü hissediyorum. ${capitalize(eventName)}${getSuffix(rawEventName, 'gen')} etkileri seni zorluyor olabilir ancak unutma ki ${planet}${getSuffix(planet, 'gen')} ışığı en karanlık anlarda bile seninle. Sadece dinlen ve fırtınanın dinmesini bekle.`;
  } else if (isSad && isHighEnergy && isPositiveEvent) {
    guidance = `Kalbinde bir hüzün olsa da ${timeCtx} içindeki hayat enerjisi hala çok canlı. ${capitalize(eventName)}${getSuffix(rawEventName, 'gen')} etkisi sana muazzam bir fırsat sunuyor; bu yüksek potansiyeli yaratıcılığa dönüştür. ${planet}${getSuffix(planet, 'gen')} fısıltısı sana yeni bir yol gösterecek.`;
  } else if (isHappy && isLowEnergy && isPositiveEvent) {
    guidance = `Yüzündeki gülümseme harika ancak ${timeCtx} bedenin 'yavaşla' diyor. ${capitalize(eventName)} sürecinde şans senden yana olsa da ${planet}${getSuffix(planet, 'gen')} bugün enerjini tasarruflu kullanmanı öneriyor. Küçük adımlarla büyük zaferlere ulaşabilirsin.`;
  } else if (isHappy && isHighEnergy && isPositiveEvent) {
    guidance = `Kozmik bir zirvedesin! ${timeCtx} hem neşen hem de gücün yerinde, üstelik ${eventName}${getSuffix(rawEventName, 'gen')} rüzgarını arkana aldın. Bugün önüne çıkan her engeli ${planet}${getSuffix(planet, 'gen')} desteğiyle kolayca aşabilir, hayallerini gerçeğe dönüştürebilirsin.`;
  } else if (isSad && isPositiveEvent) {
    guidance = `Bugün çok mutsuz olduğunu görüyorum, belki ${timeCtx} ${eventName}${getSuffix(rawEventName, 'acc')} ertelemek isteyebilirsin ancak ${planet} mutsuz da olsan bu süreçte başarılı olacağını söylüyor.`;
  } else if (isLowEnergy && !isPositiveEvent) {
    guidance = `Enerjinin çekildiğini ve ${timeCtx} ${eventName}${getSuffix(rawEventName, 'gen')} seni gerdiğini duyumsuyorum. ${planet} bugün sana sessizce geri çekilmeyi öğütlüyor; bazen en büyük zaferler sessizce bekleyerek kazanılır.`;
  } else {
    guidance = `${capitalize(eventName)}${getSuffix(rawEventName, 'gen')} etkisi ${timeCtx} hayatında yepyeni bir sayfa açarken, ${planet} sana ruhsal dengeni korumanı hatırlatıyor. Eğer bu akışa kendini bırakırsan, sürecin sonunda güçlenerek çıkacaksın.`;
  }

  // Warning
  let warning = "";
  const warningPool = [
    `${planet}${getSuffix(planet, 'gen')} uyarısı: ${eventName} sürecinde fevri kararlardan kaçın.`,
    `Dikkatini dağıtacak dış etkenlere karşı ${planet} seni uyarıyor; ${eventName} odağını bozmasın.`,
    `Bugün ${timeCtx}, başkalarının enerjisinin seni aşağı çekmesine izin verme.`,
    `${planet} diyor ki: "Gerçekleri gör, illüzyonlara kapılma."`,
    `${eventName} süresince kendi sınırlarını ihlal etmemeye özen göster.`,
    ...MASSIVE_COSMIC_WARNINGS
  ];
  
  if (isHighEnergy && !isPositiveEvent) {
    warning = `Yüksek motivasyonun seni ${eventName}${getSuffix(rawEventName, 'dir')} dair fevri kararlara sürüklemesin. ${planet}${getSuffix(planet, 'gen')} uyarısı net: Sabırlı ol ve öfkenin vizyonunu bulandırmasına izin verme.`;
  } else if (isLowEnergy && isPositiveEvent) {
    warning = `Güzel fırsatlar kapını çalıyor ama sen kapıyı açacak kadar güçlü hissetmeyebilirsin. ${planet}, bugün sadece en kritik olan tek bir işe odakmanmanı, enerjini dağıtmamanı istiyor.`;
  } else if (isSad && !isPositiveEvent) {
    warning = `Zihnindeki karanlık bulutlar ${eventName} etkisini olduğundan daha büyük gösterebilir. ${planet} sana gerçeği fısıldıyor: Korkuların sadece birer gölgeden ibaret, üzerine yürü.`;
  } else {
    warning = getRandom(warningPool);
  }

  // Affirmation
  let affirmation = "";
  if (isSad) {
    const sadAffs = [
      `${planet}${getSuffix(planet, 'gen', true)} şifalı ışığıyla hüznümü güce dönüştürüyorum. ${capitalize(eventName)}${getSuffix(rawEventName, 'poss1s')} benim dönüşüm yolumdur.`,
      "Gözyaşlarım ruhumu temizliyor, her damlada daha da güçleniyorum.",
      "Karanlığın içindeki ışığı görmeyi seçiyor, kendime şefkatle yaklaşıyorum.",
      "Bu hüzün geçici, içimdeki kozmik güç ise sonsuz ve sarsılmaz.",
      "Ruhumun bu derinleşme sürecine güveniyor, akışla beraber iyileşiyorum.",
      ...MASSIVE_GENERAL_AFFIRMATIONS.filter((_, i) => i % 10 === 0).slice(0, 50)
    ];
    affirmation = getRandom(sadAffs);
  } else if (isHappy) {
    const happyAffs = [
      `İçimdeki neşe evrenin şarkısıdır. ${capitalize(eventName)}${getSuffix(rawEventName, 'loc')} parlamaya devam ediyorum.`,
      "Mutluluğum yıldızlarla yankılanıyor, her anım mucizelerle dolu.",
      "Pozitif enerjim çevreme ışık saçarak, evrenle tam bir uyum içindeyim.",
      "Hayatın her rengini coşkuyla kucaklıyor, neşemi cömertçe paylaşıyorum.",
      "Varlığımın her hücresi sevgi ve neşeyle titreşiyor.",
      ...MASSIVE_GENERAL_AFFIRMATIONS.filter((_, i) => i % 10 === 5).slice(0, 50)
    ];
    affirmation = getRandom(happyAffs);
  } else {
    affirmation = getRandom(MASSIVE_GENERAL_AFFIRMATIONS);
  }

  // Focus
  let focus = "";
  if (isLowEnergy) {
    focus = "Sadelik ve ruhsal arınma. Bugün sadece var olmanın tadını çıkar ve tüm karmaşayı dışarıda bırak.";
  } else if (isHighEnergy) {
    focus = `Harekete geç ve tamamlanmamış işlerini bitir. Bugün yarım kalan her şeyi ${planet}${getSuffix(planet, 'gen')} desteğiyle sonuçlandırabilirsin.`;
  } else if (isHappy) {
    focus = `${capitalize(eventName)} getirdiği neşeyi çevrendekilerle paylaşmaya ve sosyal bağlarını güçlendirmeye odaklan.`;
  } else {
    focus = getRandom([...FOCUS_AFFIRMATIONS, ...MASSIVE_FOCUS_OF_THE_DAY]);
  }

  // Day to Day
  let dayToDay = "";
  if (isHappy && isHighEnergy) {
    dayToDay = `Dünden gelen pozitif ivme bugün ${timeCtx} zirve yapıyor; evrenin sana sunduğu her kapıyı cesaretle çal.`;
  } else if (isSad && isLowEnergy) {
    dayToDay = `Dünün yorgunluğu bugün yerini kabullenişe bırakıyor; ${timeCtx} gökyüzü seni dinlenmeye davet ediyor.`;
  } else {
    dayToDay = getRandom([...DAY_TO_DAY_AFFIRMATIONS, ...MASSIVE_DAY_TO_DAY]);
  }

  // Event Impact
  let eventImpact = "";
  const eventAffs = EVENT_AFFIRMATIONS[dominantEvent.event_id];
  if (eventAffs && eventAffs[phase]) {
    eventImpact = getRandom(eventAffs[phase].affirmations);
  } else if (isPositiveEvent) {
    const positiveFallbacks = [
      `${capitalize(eventName)} sürecinin getirdiği bu olumlu rüzgar, hayatında kalıcı güzellikler yaratacak.`,
      "Yıldızlar bu dönemde seni her adımda destekliyor ve parlamanı sağlıyor.",
      "Bu güzel akışın içinde ruhun huzur buluyor ve potansiyelin açığa çıkıyor.",
      "Gelecek olan müjdeli haberlere ve sürprizlere kalbini sonuna kadar aç.",
      `Bu süreç hayatının en unutulmaz ve bereketli dönemlerinden biri olmaya aday.`
    ];
    eventImpact = getRandom(positiveFallbacks);
  } else {
    const negativeFallbacks = [
      `${capitalize(eventName)} süreci seni zorlasa da içindeki gerçek gücü keşfetmeni sağlıyor.`,
      "Fırtınalar sadece köklerini daha sağlamlaştırmak için varlar; sabırlı ol.",
      "Bu deneyim, ruhunun bilgeliğe giden yolundaki en önemli sınavlarından biri.",
      "Karanlıktan sonra gelen aydınlığın ne kadar parlak olacağını hayal et.",
      "Şu an yaşanan her zorluk, gelecekteki sarsılmaz karakterinin bir parçasıdır."
    ];
    eventImpact = getRandom(negativeFallbacks);
  }

  // Emotion Impact
  let emotionImpact = "";
  if (isHappy && isHighEnergy) {
    emotionImpact = "Bugün auran o kadar parlak ki, en karanlık odaları bile aydınlatabilirsin. Mutluluğun bulaşıcı!";
  } else if (isSad && isLowEnergy) {
    emotionImpact = "Duyguların derin bir okyanus gibi; bugün sadece o derinlikte huzurla süzülmene izin ver.";
  } else if (isHappy) {
    emotionImpact = "İçindeki neşe, karşılaştığın her zorluğu bir çocuk oyuncağına dönüştürecek kadar güçlü.";
  } else if (isSad) {
    emotionImpact = "Hüznün, ruhunun en saf ve en gerçek halini yansıtıyor. Kendine bu alanı tanımanın gücünü yaşa.";
  } else {
    emotionImpact = "Duygusal dengen, bugün karşılaştığın her duruma asaletle yanıt vermeni sağlıyor.";
  }

  // Clean all strings from quotes
  const clean = (s: string) => s.replace(/\"/g, "");

  return { 
    guidance: clean(guidance), 
    affirmation: clean(affirmation), 
    warning: clean(warning), 
    focus: clean(focus),
    emotionImpact: clean(emotionImpact),
    eventImpact: clean(eventImpact),
    dayToDay: clean(dayToDay),
    luckyColor: "Bugün auranı ve ruhunu yansıtan o özel rengi üzerinde taşımalısın."
  };
}

function getPlanetGenericAdvice(planet: string, level: ImpactLevel): string {
  const advice: Record<string, Record<ImpactLevel, string>> = {
    "Venüs": {
      positive: "Sevgi ve değer duygusu kalbini dolduruyor.",
      negative: "Kendi değerini başkalarının gözünde arama.",
      neutral: "Dengeli ilişkiler kurma zamanı."
    },
    "Merkür": {
      positive: "Zihnin berrak, kararların keskin olsun.",
      negative: "Kelimelerin gücünü doğru kullan, yanlış anlaşılmalara dikkat.",
      neutral: "İletişim kanallarını açık tut."
    },
    "Mars": {
      positive: "Cesaretin ve enerjin yolunu açıyor.",
      negative: "Öfkeni yaratıcı bir güce dönüştür, fevri olma.",
      neutral: "Harekete geçmek için doğru anı bekle."
    },
    "Satürn": {
      positive: "Disiplinin ve sabrın meyvelerini topluyorsun.",
      negative: "Sorumlulukların seni ezmesin, sadece olgunlaştırıyor.",
      neutral: "Temellerini sağlam at."
    },
    "Jüpiter": {
      positive: "Bolluk ve şans kapında, kalbini aç.",
      negative: "Aşırılıklardan kaçın, elindekilerin kıymetini bil.",
      neutral: "Vizyonunu genişlet."
    }
  };

  return advice[planet]?.[level] || "Evrenin akışına güven.";
}

export function getActiveLifeEvents(userEvents: UserLifeEvent[], targetDate: Date): LifeEvent[] {
  const active: LifeEvent[] = [];
  
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  for (const ue of userEvents) {
    const eventData = LIFE_EVENTS.find(e => e.event_id === ue.event_id);
    if (!eventData) continue;

    const eventDate = new Date(ue.event_date);
    eventDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((target.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      active.push(eventData);
    } else if (daysDiff < 0 && Math.abs(daysDiff) <= eventData.anticipation_window) {
      active.push(eventData);
    } else if (daysDiff > 0 && daysDiff <= eventData.recovery_window) {
      active.push(eventData);
    }
  }

  return active;
}
