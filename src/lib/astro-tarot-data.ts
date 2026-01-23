export const synastryData: Record<string, { score: number; text: string }> = {
  "Sun_Conjunction_Sun": { score: 90, text: "İnanılmaz bir kişilik uyumu. Birbirinizi doğal olarak anlıyor ve destekliyorsunuz." },
  "Sun_Trine_Sun": { score: 85, text: "Uyumlu ve akışkan bir enerji. Birlikteyken her şey çok daha kolay hissettiriyor." },
  "Sun_Square_Sun": { score: 40, text: "Ego çatışmaları yaşanabilir. Birbirinizin otoritesini sarsmamaya özen göstermelisiniz." },
  "Sun_Opposition_Sun": { score: 50, text: "Zıt kutupların çekimi. Birbirinizi tamamlayabilir veya sürekli karşı karşıya gelebilirsiniz." },
  
  "Moon_Conjunction_Moon": { score: 95, text: "Ruhsal bir bağ. Duygusal ihtiyaçlarınız neredeyse tamamen aynı." },
  "Moon_Trine_Moon": { score: 88, text: "Duygusal huzur ve güven. Birbirinizin yanında kendinizi evinizde hissediyorsunuz." },
  "Moon_Square_Moon": { score: 35, text: "Duygusal tepkileriniz çatışıyor. Birbirinizin hislerini anlamakta zorlanabilirsiniz." },
  "Moon_Opposition_Moon": { score: 45, text: "Duygusal olarak çok farklı uçlardasınız. Empati kurmak için çaba sarf etmelisiniz." },

  "Venus_Conjunction_Mars": { score: 98, text: "Güçlü bir fiziksel ve romantik çekim. Tutkunuz ilişkinin motoru." },
  "Venus_Trine_Mars": { score: 82, text: "Doğal bir çekim ve uyum. İstekleriniz ve sevgi ifadeniz birbirini besliyor." },
  "Venus_Square_Mars": { score: 60, text: "Yüksek gerilim ve tutku. Tartışmalar bile çekimi artırabilir ama yorucu olabilir." },
  "Venus_Opposition_Mars": { score: 65, text: "Sıcak-soğuk dengesi. Çekim çok güçlü ama istikrar sağlamak zaman alabilir." },

  "Sun_Conjunction_Moon": { score: 100, text: "Klasik bir ruh eşi göstergesi. Biri ışık saçarken diğeri onu mükemmel yansıtıyor." },
  "Sun_Trine_Moon": { score: 92, text: "Derin bir anlayış ve destek. Birbirinizin hayat amaçlarını doğal olarak besliyorsunuz." },
  "Sun_Square_Moon": { score: 30, text: "İçsel ihtiyaçlar ile dışsal hedefler çatışıyor. Uyum sağlamak için çok ödün gerekebilir." },
  "Sun_Opposition_Moon": { score: 55, text: "Farklı bakış açıları ama güçlü bir bütünlük arayışı. Dengelenmeyi öğrenmelisiniz." },

  "Ascendant_Conjunction_Ascendant": { score: 85, text: "Dünyayı benzer şekilde algılıyorsunuz. İlk izlenimleriniz ve hayata bakışınız çok yakın." },
  "Venus_Conjunction_Venus": { score: 80, text: "Zevkleriniz ve değer yargılarınız çok benzer. Birlikte vakit geçirmekten büyük keyif alıyorsunuz." },
  "Mars_Conjunction_Mars": { score: 75, text: "Aynı enerji seviyesine sahipsiniz. Birlikte hareket etmek ve hedeflere koşmak sizin için kolay." }
};

export type Element = 'Ateş' | 'Toprak' | 'Hava' | 'Su';

export const astroTarotDeck: Record<string, { name: string; advice: Record<Element, string> }> = {
  "0": {
    name: "Mecnun (The Fool)",
    advice: {
      "Ateş": "Yeni bir maceraya atılmak için mükemmel zaman. Korkusuzca ilerle.",
      "Toprak": "Yeni bir başlangıç yaparken ayaklarını yere sağlam basmayı unutma.",
      "Hava": "Zihnini özgür bırak, yeni fikirler seni beklenmedik yerlere götürecek.",
      "Su": "Kalbini yeni bir yolculuğa aç, sezgilerin seni doğru yönlendirecek."
    }
  },
  "1": {
    name: "Büyücü (The Magician)",
    advice: {
      "Ateş": "Eyleme geçmek için harika zaman. Elindeki tüm kaynakları kullan.",
      "Toprak": "Planlarını gerçeğe dönüştürmek için somut adımlar at.",
      "Hava": "İletişim yeteneğini kullan, zekanla istediğin her şeyi elde edebilirsin.",
      "Su": "İçindeki yaratıcı gücü ortaya çıkar, hislerini bir şeye dönüştür."
    }
  },
  "2": {
    name: "Azize (The High Priestess)",
    advice: {
      "Ateş": "Biraz dur ve bekle. Hareket etmeden önce iç sesini dinle.",
      "Toprak": "Sessizce gözlemle, sırlar yavaş yavaş açığa çıkacak.",
      "Hava": "Görünenin ötesine bak, mantığın yetmediği yerde sezgin devreye girsin.",
      "Su": "Sezgilerini kullanarak yaratıcılığını konuştur. Rüyalarına dikkat et."
    }
  },
  "3": {
    name: "İmparatoriçe (The Empress)",
    advice: {
      "Ateş": "Tutkularını besle, bereketli bir dönemdesin.",
      "Toprak": "Doğayla bağ kur, emeğinin meyvelerini toplama vakti.",
      "Hava": "Çevrene güzellik ve uyum yay, fikirlerin çiçek açıyor.",
      "Su": "Sevgini paylaş, besleyici ve şefkatli enerjinle herkesi etkile."
    }
  },
  "4": {
    name: "İmparator (The Emperor)",
    advice: {
      "Ateş": "Liderliğini göster, disiplin ve irade ile hedeflerine ulaş.",
      "Toprak": "Düzen kur, kurallara uymak ve sınırları belirlemek seni güçlendirir.",
      "Hava": "Mantıklı kararlar al, otoriteni zekice kullan.",
      "Su": "Duygularını kontrol altında tut, içsel otoriteni inşa et."
    }
  },
  "5": {
    name: "Aziz (The Hierophant)",
    advice: {
      "Ateş": "Geleneklerden güç al, inandığın değerler yolunu aydınlatacak.",
      "Toprak": "Bilge kişilere danış, tecrübe en büyük rehberindir.",
      "Hava": "Öğrenmeye ve öğretmeye odaklan, bilgi paylaşımı seni büyütecek.",
      "Su": "Maneviyatını derinleştir, ruhsal bir rehberlik ara."
    }
  },
  "6": {
    name: "Aşıklar (The Lovers)",
    advice: {
      "Ateş": "Kalbinin sesini dinle, cesur bir seçim yapman gerekiyor.",
      "Toprak": "İlişkilerinde dengeyi bul, sadakat ve güvene odaklan.",
      "Hava": "İletişimi açık tut, ortak bir karar vermek için konuşman şart.",
      "Su": "Duygusal bağlarını güçlendir, sevgi dolu bir uyum yakala."
    }
  },
  "7": {
    name: "Araba (The Chariot)",
    advice: {
      "Ateş": "Hızlan ve hedefine odaklan, zafer senin olacak.",
      "Toprak": "Azimle ilerle, zorluklar karşısında direncin seni başarıya götürecek.",
      "Hava": "Zihnini kontrol et, çatışan fikirleri birleştirip yola devam et.",
      "Su": "Duygusal kontrolünü sağla, içindeki gücü doğru yere yönlendir."
    }
  },
  "8": {
    name: "Adalet (Justice)",
    advice: {
      "Ateş": "Dürüstlükten ayrılma, eylemlerinin sonuçlarını göreceksin.",
      "Toprak": "Dengeli bir karar ver, hakkaniyetli olmak en iyisidir.",
      "Hava": "Tarafsız kal, mantığınla adaleti sağla.",
      "Su": "İçsel dengeni bul, vicdanının sesini dinle."
    }
  },
  "9": {
    name: "Ermiş (The Hermit)",
    advice: {
      "Ateş": "İçine dön, kendi ışığını bulmak için sessizliğe ihtiyacın var.",
      "Toprak": "Yavaşla ve düşün, sabırla olgunlaşmayı bekle.",
      "Hava": "Derin bir analiz yap, yalnızlık sana ihtiyacın olan cevabı verecek.",
      "Su": "Ruhsal bir arayışa gir, iç dünyandaki bilgeliği keşfet."
    }
  },
  "10": {
    name: "Kader Çarkı (Wheel of Fortune)",
    advice: {
      "Ateş": "Değişimi kucakla, şans senden yana.",
      "Toprak": "Döngülere güven, her bitiş yeni bir başlangıçtır.",
      "Hava": "Fırsatları kolla, hayatın ritmine ayak uydur.",
      "Su": "Akışa bırak, kaderin getirdiklerini sevgiyle kabul et."
    }
  }
};

// ... (Rest of 78 cards can be simplified or expanded as needed, 
// for brevity in this step I added the first 11 major arcana 
// which are the most common in readings. I will expand if necessary.)
