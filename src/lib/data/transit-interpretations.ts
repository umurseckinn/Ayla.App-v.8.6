export type AspectType = 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile';
export type OrbStatus = 'applying' | 'separating';
export type ZodiacSign = string;
export type Planet = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto';
export type NatalPlanet = Planet;
export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface TransitSlot {
  behavior: string;
  effect: string;
  suggestion: string;
}

export interface TransitInterpretationJSON {
  headline: string;
  main_text: string;
  action_advice: string;
  keyword_tags: string[];
  slots?: {
    positive?: TransitSlot;
    negative?: TransitSlot;
  };
}

const PLANET_NAME_TR: Record<Planet, string> = {
  Sun: "Güneş", Moon: "Ay", Mercury: "Merkür", Venus: "Venüs", Mars: "Mars",
  Jupiter: "Jüpiter", Saturn: "Satürn", Uranus: "Uranüs", Neptune: "Neptün", Pluto: "Plüton"
};

const PLANET_NAME_EN: Record<Planet, string> = {
  Sun: "Sun", Moon: "Moon", Mercury: "Mercury", Venus: "Venus", Mars: "Mars",
  Jupiter: "Jupiter", Saturn: "Saturn", Uranus: "Uranus", Neptune: "Neptune", Pluto: "Pluto"
};

const SIGN_TR_TO_EN: Record<string, string> = {
  'Koç': 'Aries', 'Boğa': 'Taurus', 'İkizler': 'Gemini', 'Yengeç': 'Cancer',
  'Aslan': 'Leo', 'Başak': 'Virgo', 'Terazi': 'Libra', 'Akrep': 'Scorpio',
  'Yay': 'Sagittarius', 'Oğlak': 'Capricorn', 'Kova': 'Aquarius', 'Balık': 'Pisces'
};

const SIGN_EN_TO_TR: Record<string, string> = {
  'Aries': 'Koç', 'Taurus': 'Boğa', 'Gemini': 'İkizler', 'Cancer': 'Yengeç',
  'Leo': 'Aslan', 'Virgo': 'Başak', 'Libra': 'Terazi', 'Scorpio': 'Akrep',
  'Sagittarius': 'Yay', 'Capricorn': 'Oğlak', 'Aquarius': 'Kova', 'Pisces': 'Balık'
};

export const ASPECT_DATA = {
  conjunction: {
    tr: { name: "kavuşum", tone: "yoğunluk", keywords: ["Yeni Döngü", "Güç", "Odaklanma"] },
    en: { name: "conjunction", tone: "intensity", keywords: ["New Cycle", "Power", "Focus"] }
  },
  opposition: {
    tr: { name: "karşıt", tone: "yüzleşme", keywords: ["Farkındalık", "Denge", "Gerilim"] },
    en: { name: "opposition", tone: "confrontation", keywords: ["Awareness", "Balance", "Tension"] }
  },
  trine: {
    tr: { name: "üçgen", tone: "akış", keywords: ["Şans", "Kolaylık", "Uyum"] },
    en: { name: "trine", tone: "flow", keywords: ["Luck", "Ease", "Harmony"] }
  },
  square: {
    tr: { name: "kare", tone: "kriz", keywords: ["Meydan Okuma", "Gerilim", "Büyüme"] },
    en: { name: "square", tone: "crisis", keywords: ["Challenge", "Tension", "Growth"] }
  },
  sextile: {
    tr: { name: "altmışlık", tone: "fırsat", keywords: ["Potansiyel", "İşbirliği", "Destek"] },
    en: { name: "sextile", tone: "opportunity", keywords: ["Potential", "Cooperation", "Support"] }
  }
};

const HOUSE_THEMES = {
  1: { tr: { theme: "benlik", area: "kimliğin" }, en: { theme: "self", area: "identity" } },
  2: { tr: { theme: "değerler", area: "maddi dünyan" }, en: { theme: "values", area: "material world" } },
  3: { tr: { theme: "iletişim", area: "yakın çevren" }, en: { theme: "communication", area: "immediate environment" } },
  4: { tr: { theme: "yuva", area: "ailevi kökler" }, en: { theme: "home", area: "family roots" } },
  5: { tr: { theme: "yaratıcılık", area: "aşk ve keyif" }, en: { theme: "creativity", area: "love and pleasure" } },
  6: { tr: { theme: "sağlık", area: "günlük rutinler" }, en: { theme: "health", area: "daily routines" } },
  7: { tr: { theme: "ilişkiler", area: "ortaklıklar" }, en: { theme: "relationships", area: "partnerships" } },
  8: { tr: { theme: "dönüşüm", area: "derin bağlar" }, en: { theme: "transformation", area: "deep bonds" } },
  9: { tr: { theme: "bilgelik", area: "felsefi görüş" }, en: { theme: "wisdom", area: "philosophical view" } },
  10: { tr: { theme: "kariyer", area: "toplumsal statü" }, en: { theme: "career", area: "social status" } },
  11: { tr: { theme: "idealler", area: "gelecek umutlar" }, en: { theme: "ideals", area: "future hopes" } },
  12: { tr: { theme: "ruhsallık", area: "bilinçaltı" }, en: { theme: "spirituality", area: "subconscious" } }
};

export const PLANET_ENERGY = {
  Sun: { tr: "özgüven ve benlik", en: "confidence and self" },
  Moon: { tr: "duygular ve sezgi", en: "emotions and intuition" },
  Mercury: { tr: "iletişim ve düşünce", en: "communication and thought" },
  Venus: { tr: "aşk ve güzellik", en: "love and beauty" },
  Mars: { tr: "eylem ve tutku", en: "action and passion" },
  Jupiter: { tr: "genişleme ve şans", en: "expansion and luck" },
  Saturn: { tr: "disiplin ve sınırlar", en: "discipline and boundaries" },
  Uranus: { tr: "devrim ve özgürlük", en: "revolution and freedom" },
  Neptune: { tr: "hayal gücü ve ruhsallık", en: "imagination and spirituality" },
  Pluto: { tr: "dönüşüm ve güç", en: "transformation and power" }
};

interface PlanetHouseSlots {
  positive: {
    tr: TransitSlot;
    en: TransitSlot;
  };
  negative: {
    tr: TransitSlot;
    en: TransitSlot;
  };
}

type PlanetHouseSlotsDB = Record<Planet, Record<HouseNumber, PlanetHouseSlots>>;

export const PLANET_HOUSE_SLOTS: PlanetHouseSlotsDB = {
  Sun: {
    1: {
      positive: {
        tr: { behavior: "Kendine güvenin artar, liderlik vasıfların öne çıkar", effect: "İnsanlar sana doğal olarak çekilir, karizma yayarsın", suggestion: "Yeni bir imaj veya kişisel projeye başla" },
        en: { behavior: "Your confidence increases, leadership qualities emerge", effect: "People naturally gravitate toward you, you radiate charisma", suggestion: "Start a new image or personal project" }
      },
      negative: {
        tr: { behavior: "Ego şişmesi, başkalarını dinlememe eğilimi", effect: "Çevrendekilerle sürtüşmeler, yalnızlaşma", suggestion: "Alçakgönüllülüğü pratik et, geri bildirim al" },
        en: { behavior: "Ego inflation, tendency to not listen to others", effect: "Friction with those around you, isolation", suggestion: "Practice humility, seek feedback" }
      }
    },
    2: {
      positive: {
        tr: { behavior: "Yeteneklerinin farkına varırsın, öz değerini keşfedersin", effect: "Maddi fırsatlar belirir, gelir artışı", suggestion: "Yeni bir gelir kaynağı araştır" },
        en: { behavior: "You recognize your talents, discover self-worth", effect: "Material opportunities appear, income increase", suggestion: "Research a new income source" }
      },
      negative: {
        tr: { behavior: "Aşırı harcama, materyalizme kapılma", effect: "Finansal stres, değer kaybı hissi", suggestion: "Bütçe yap ve gerçek ihtiyaçlarına odaklan" },
        en: { behavior: "Overspending, getting caught up in materialism", effect: "Financial stress, feeling of lost value", suggestion: "Create a budget and focus on real needs" }
      }
    },
    3: {
      positive: {
        tr: { behavior: "Fikirlerini net ifade edersin, öğrenmeye açık olursun", effect: "İletişimde başarı, yeni bilgiler edinirsin", suggestion: "Bir kursa yazıl veya blog yaz" },
        en: { behavior: "You express ideas clearly, open to learning", effect: "Success in communication, acquiring new knowledge", suggestion: "Enroll in a course or start blogging" }
      },
      negative: {
        tr: { behavior: "Dedikoduya kapılma, sözlerinde keskinlik", effect: "Kardeş veya komşu kavgaları, yanlış anlaşılma", suggestion: "Konuşmadan önce düşün, empati kur" },
        en: { behavior: "Getting caught up in gossip, sharp words", effect: "Sibling or neighbor disputes, misunderstandings", suggestion: "Think before speaking, practice empathy" }
      }
    },
    4: {
      positive: {
        tr: { behavior: "Aileye zaman ayırırsın, köklerinle bağ kurarsın", effect: "Ev ortamında huzur, güvenlik hissi", suggestion: "Evde küçük bir kutlama düzenle" },
        en: { behavior: "You spend time with family, connect with roots", effect: "Peace at home, sense of security", suggestion: "Organize a small celebration at home" }
      },
      negative: {
        tr: { behavior: "Ailevi otoriteyle çatışma, eve kapanma", effect: "Ev içi gerginlik, duygusal tıkanıklık", suggestion: "Geçmişle barış, sınır koy" },
        en: { behavior: "Conflict with family authority, withdrawing home", effect: "Tension at home, emotional blockage", suggestion: "Make peace with the past, set boundaries" }
      }
    },
    5: {
      positive: {
        tr: { behavior: "Yaratıcılığın patlar, aşkta cesurlaşırsın", effect: "Romantik fırsatlar, sanatsal başarı", suggestion: "Yeni bir hobi veya flört başlat" },
        en: { behavior: "Your creativity explodes, become bold in love", effect: "Romantic opportunities, artistic success", suggestion: "Start a new hobby or romantic pursuit" }
      },
      negative: {
        tr: { behavior: "Aşırı dramatizasyon, kumara yatkınlık", effect: "Kalp kırıklığı, riskli yatırım kayıpları", suggestion: "Eğlencede ölçülü ol, kalbini koru" },
        en: { behavior: "Over-dramatization, tendency toward gambling", effect: "Heartbreak, risky investment losses", suggestion: "Be moderate in fun, protect your heart" }
      }
    },
    6: {
      positive: {
        tr: { behavior: "İş disiplinin artar, sağlık rutinlerine önem verirsin", effect: "İş yerinde takdir, fiziksel iyileşme", suggestion: "Yeni bir egzersiz programı başlat" },
        en: { behavior: "Work discipline increases, value health routines", effect: "Recognition at work, physical improvement", suggestion: "Start a new exercise program" }
      },
      negative: {
        tr: { behavior: "Mükemmeliyetçilik, iş bağımlılığı", effect: "Stres kaynaklı rahatsızlıklar, tükenmişlik", suggestion: "Dinlenme zamanı ayır, kusuru kabul et" },
        en: { behavior: "Perfectionism, work addiction", effect: "Stress-related ailments, burnout", suggestion: "Schedule rest time, accept imperfection" }
      }
    },
    7: {
      positive: {
        tr: { behavior: "İlişkilerde denge ararsın, işbirliğine açıksın", effect: "Ortaklıklarda uyum, sevgi alışverişi", suggestion: "Önemli bir görüşme veya anlaşma yap" },
        en: { behavior: "Seek balance in relationships, open to cooperation", effect: "Harmony in partnerships, exchange of love", suggestion: "Have an important meeting or make an agreement" }
      },
      negative: {
        tr: { behavior: "Bağımlılık, onay arayışı", effect: "İlişkide güç savaşı, kimlik kaybı", suggestion: "Kendi ihtiyaçlarını da savun" },
        en: { behavior: "Dependency, seeking approval", effect: "Power struggle in relationship, identity loss", suggestion: "Advocate for your own needs too" }
      }
    },
    8: {
      positive: {
        tr: { behavior: "Derinlere dalarsın, dönüşüme açıksın", effect: "Miras veya ortak kazançlar, psikolojik şifa", suggestion: "Terapi veya içsel çalışma başlat" },
        en: { behavior: "You dive deep, open to transformation", effect: "Inheritance or joint gains, psychological healing", suggestion: "Start therapy or inner work" }
      },
      negative: {
        tr: { behavior: "Kontrol takıntısı, gizlilik", effect: "Güç savaşları, finansal bağımlılık", suggestion: "Kontrol ihtiyacını serbest bırak" },
        en: { behavior: "Control obsession, secrecy", effect: "Power struggles, financial dependency", suggestion: "Release the need for control" }
      }
    },
    9: {
      positive: {
        tr: { behavior: "Ufkunu genişletirsin, öğrenmeye heveslisin", effect: "Seyahat fırsatları, felsefi aydınlanma", suggestion: "Yeni bir kültürü keşfet veya yurtdışı planla" },
        en: { behavior: "You expand horizons, eager to learn", effect: "Travel opportunities, philosophical enlightenment", suggestion: "Explore a new culture or plan abroad" }
      },
      negative: {
        tr: { behavior: "Dogmatizm, başkalarına vaaz verme", effect: "Kültürel çatışmalar, hukuki sorunlar", suggestion: "Farklı bakış açılarına saygı göster" },
        en: { behavior: "Dogmatism, preaching to others", effect: "Cultural conflicts, legal issues", suggestion: "Respect different viewpoints" }
      }
    },
    10: {
      positive: {
        tr: { behavior: "Kariyer hedeflerine odaklanırsın, otoriter görünürsün", effect: "Terfi, kamuoyu takdiri", suggestion: "Büyük bir profesyonel adım at" },
        en: { behavior: "Focus on career goals, appear authoritative", effect: "Promotion, public recognition", suggestion: "Take a major professional step" }
      },
      negative: {
        tr: { behavior: "İş hırsı yüzünden diğer alanlara ihmal", effect: "Şöhret kaybı riski, otoriteyle çatışma", suggestion: "İş-yaşam dengesini gözden geçir" },
        en: { behavior: "Neglecting other areas due to work ambition", effect: "Risk of reputation loss, conflict with authority", suggestion: "Review work-life balance" }
      }
    },
    11: {
      positive: {
        tr: { behavior: "Sosyal vizyonun genişler, gruplarda liderlik edersin", effect: "Yeni dostluklar, hayallere ulaşma", suggestion: "Bir topluluk projesine katıl" },
        en: { behavior: "Social vision expands, lead in groups", effect: "New friendships, reaching dreams", suggestion: "Join a community project" }
      },
      negative: {
        tr: { behavior: "Grupların içinde kaybolma, gerçekçi olmayan hayaller", effect: "Yanlış arkadaş seçimi, hayal kırıklığı", suggestion: "Hayallerini somutlaştır, dostlarını seç" },
        en: { behavior: "Getting lost in groups, unrealistic dreams", effect: "Wrong friend choices, disappointment", suggestion: "Make dreams concrete, choose friends wisely" }
      }
    },
    12: {
      positive: {
        tr: { behavior: "İçe dönersin, spiritüel pratiklere yönelirsin", effect: "Ruhsal huzur, gizli destekler", suggestion: "Meditasyon veya inziva zamanı ayır" },
        en: { behavior: "Turn inward, engage in spiritual practices", effect: "Spiritual peace, hidden support", suggestion: "Schedule meditation or retreat time" }
      },
      negative: {
        tr: { behavior: "Kaçış davranışları, kendini sabote etme", effect: "Yalnızlık hissi, gizli düşmanlar", suggestion: "Bilinçaltı korkularını işle" },
        en: { behavior: "Escapist behaviors, self-sabotage", effect: "Feelings of loneliness, hidden enemies", suggestion: "Process subconscious fears" }
      }
    }
  },
  Moon: {
    1: {
      positive: {
        tr: { behavior: "Duygularını özgürce ifade edersin, sezgilerin güçlenir", effect: "Çevrendekiler seni anlayışlı bulur", suggestion: "Günlük tut veya duygularını paylaş" },
        en: { behavior: "Express emotions freely, intuition strengthens", effect: "Others find you understanding", suggestion: "Keep a journal or share your feelings" }
      },
      negative: {
        tr: { behavior: "Aşırı hassasiyet, ruh hali dalgalanmaları", effect: "Çevreni yorarsın, alınganlık", suggestion: "Duygusal düzenleme teknikleri öğren" },
        en: { behavior: "Over-sensitivity, mood swings", effect: "You exhaust those around you, touchiness", suggestion: "Learn emotional regulation techniques" }
      }
    },
    2: {
      positive: {
        tr: { behavior: "Maddi güvenlik arayışın artar", effect: "Duygusal huzur için gerekli kaynakları bulursun", suggestion: "Rahatlatıcı bir ortam yarat" },
        en: { behavior: "Search for material security increases", effect: "Find resources needed for emotional peace", suggestion: "Create a comforting environment" }
      },
      negative: {
        tr: { behavior: "Duygusal yeme, alışveriş bağımlılığı", effect: "Finansal stres, değer eksikliği hissi", suggestion: "Duygusal boşluğu başka yollarla doldur" },
        en: { behavior: "Emotional eating, shopping addiction", effect: "Financial stress, feeling of worthlessness", suggestion: "Fill emotional voids in other ways" }
      }
    },
    3: {
      positive: {
        tr: { behavior: "Empatik iletişim, sezgisel anlayış", effect: "Kardeşlerle yakınlaşma, derin sohbetler", suggestion: "Sevdiğin birini ara ve içini dök" },
        en: { behavior: "Empathic communication, intuitive understanding", effect: "Closeness with siblings, deep conversations", suggestion: "Call someone you love and open up" }
      },
      negative: {
        tr: { behavior: "Söylentilere kulak verme, duygusal tepkiler", effect: "Yanlış anlaşılmalar, gerginlik", suggestion: "Söylediklerini mantık süzgecinden geçir" },
        en: { behavior: "Listening to rumors, emotional reactions", effect: "Misunderstandings, tension", suggestion: "Filter what you say through logic" }
      }
    },
    4: {
      positive: {
        tr: { behavior: "Aile bağları güçlenir, eve bağlılık", effect: "Yuva huzuru, güvenlik hissi", suggestion: "Ev dekorasyonu veya aile yemeği düzenle" },
        en: { behavior: "Family bonds strengthen, home attachment", effect: "Home peace, sense of security", suggestion: "Decorate home or organize family dinner" }
      },
      negative: {
        tr: { behavior: "Geçmişe takılma, anne figürüyle çatışma", effect: "Duygusal tıkanıklık, ev içi huzursuzluk", suggestion: "Geçmişi bırak, şimdiye odaklan" },
        en: { behavior: "Stuck in the past, conflict with mother figure", effect: "Emotional blockage, home unrest", suggestion: "Let go of the past, focus on now" }
      }
    },
    5: {
      positive: {
        tr: { behavior: "Yaratıcı ilham, çocuksu neşe", effect: "Aşkta romantizm, sanatsal üretkenlik", suggestion: "Yaratıcı bir proje başlat" },
        en: { behavior: "Creative inspiration, childlike joy", effect: "Romance in love, artistic productivity", suggestion: "Start a creative project" }
      },
      negative: {
        tr: { behavior: "Aşırı duygusal bağlanma, drama arayışı", effect: "Kırılganlık, hayal kırıklığı", suggestion: "Beklentilerini gerçekçi tut" },
        en: { behavior: "Over-emotional attachment, seeking drama", effect: "Fragility, disappointment", suggestion: "Keep expectations realistic" }
      }
    },
    6: {
      positive: {
        tr: { behavior: "Başkalarına şefkatle yaklaşırsın", effect: "İş ortamında uyum, sağlıklı rutinler", suggestion: "Sağlıklı yemekler hazırla" },
        en: { behavior: "Approach others with compassion", effect: "Harmony at work, healthy routines", suggestion: "Prepare healthy meals" }
      },
      negative: {
        tr: { behavior: "Kaygı, psikosomatik belirtiler", effect: "Sağlık sorunları, iş stresi", suggestion: "Gevşeme teknikleri uygula" },
        en: { behavior: "Anxiety, psychosomatic symptoms", effect: "Health issues, work stress", suggestion: "Practice relaxation techniques" }
      }
    },
    7: {
      positive: {
        tr: { behavior: "Duygusal destek verirsin, uyum ararsın", effect: "İlişkilerde derinleşme, bağ kurma", suggestion: "Partnerinle kaliteli vakit geçir" },
        en: { behavior: "Provide emotional support, seek harmony", effect: "Deepening relationships, bonding", suggestion: "Spend quality time with partner" }
      },
      negative: {
        tr: { behavior: "Başkalarının ruh haline bağımlılık", effect: "İlişki gerginliği, duygusal talepler", suggestion: "Kendi duygusal ihtiyaçlarını da karşıla" },
        en: { behavior: "Dependency on others' moods", effect: "Relationship tension, emotional demands", suggestion: "Meet your own emotional needs too" }
      }
    },
    8: {
      positive: {
        tr: { behavior: "Derin duygusal işleme, sezgisel kavrayış", effect: "Dönüşüm, şifalanma", suggestion: "Terapi veya derin sohbet yap" },
        en: { behavior: "Deep emotional processing, intuitive grasp", effect: "Transformation, healing", suggestion: "Have therapy or deep conversation" }
      },
      negative: {
        tr: { behavior: "Obsesif duygular, kıskançlık", effect: "Manipülasyon, güven sorunları", suggestion: "Bırakma pratiği yap" },
        en: { behavior: "Obsessive emotions, jealousy", effect: "Manipulation, trust issues", suggestion: "Practice letting go" }
      }
    },
    9: {
      positive: {
        tr: { behavior: "Ruhsal arayış, felsefi düşünce", effect: "Anlam bulma, genişleme hissi", suggestion: "Spiritüel bir kitap oku" },
        en: { behavior: "Spiritual seeking, philosophical thinking", effect: "Finding meaning, expansion feeling", suggestion: "Read a spiritual book" }
      },
      negative: {
        tr: { behavior: "Duygusal kaçış, aşırı idealizm", effect: "Gerçeklikten kopma, restlessness", suggestion: "Ayaklarını yere bas" },
        en: { behavior: "Emotional escape, excessive idealism", effect: "Disconnection from reality, restlessness", suggestion: "Stay grounded" }
      }
    },
    10: {
      positive: {
        tr: { behavior: "Kariyer hedeflerine duygusal bağlılık", effect: "Kamuoyu sempatisi, başarı motivasyonu", suggestion: "Profesyonel hedeflerini gözden geçir" },
        en: { behavior: "Emotional commitment to career goals", effect: "Public sympathy, success motivation", suggestion: "Review professional goals" }
      },
      negative: {
        tr: { behavior: "İş ve duygular arası çatışma", effect: "Kamusal imaj kaygısı, stres", suggestion: "İş ve özel hayatı ayır" },
        en: { behavior: "Conflict between work and emotions", effect: "Public image anxiety, stress", suggestion: "Separate work and personal life" }
      }
    },
    11: {
      positive: {
        tr: { behavior: "Arkadaşlıklara duygusal yatırım", effect: "Topluluk aidiyeti, ortak hayaller", suggestion: "Sosyal bir etkinliğe katıl" },
        en: { behavior: "Emotional investment in friendships", effect: "Community belonging, shared dreams", suggestion: "Attend a social event" }
      },
      negative: {
        tr: { behavior: "Grupların etkisinde kalma, duygusal bağımlılık", effect: "Yanlış arkadaşlıklar, hayal kırıklığı", suggestion: "Kendi sesini dinle" },
        en: { behavior: "Being influenced by groups, emotional dependency", effect: "Wrong friendships, disappointment", suggestion: "Listen to your own voice" }
      }
    },
    12: {
      positive: {
        tr: { behavior: "Derin sezgi, spiritüel bağlantı", effect: "Ruhsal huzur, şifalanma", suggestion: "Meditasyon veya rüya çalışması yap" },
        en: { behavior: "Deep intuition, spiritual connection", effect: "Spiritual peace, healing", suggestion: "Practice meditation or dream work" }
      },
      negative: {
        tr: { behavior: "Melankolik eğilim, kaçış", effect: "Yalnızlık, bilinçaltı korkular", suggestion: "Profesyonel destek al" },
        en: { behavior: "Melancholic tendency, escape", effect: "Loneliness, subconscious fears", suggestion: "Seek professional support" }
      }
    }
  },
  Mercury: {
    1: {
      positive: {
        tr: { behavior: "Düşüncelerini net ifade edersin, zeki görünürsün", effect: "İletişimde başarı, yeni fikirler", suggestion: "Önemli bir konuşma veya sunum yap" },
        en: { behavior: "Express thoughts clearly, appear intelligent", effect: "Success in communication, new ideas", suggestion: "Make an important speech or presentation" }
      },
      negative: {
        tr: { behavior: "Aşırı konuşkanlık, nervöz enerji", effect: "Yanlış anlaşılma, dağınıklık", suggestion: "Konuşmadan önce düşün" },
        en: { behavior: "Over-talkativeness, nervous energy", effect: "Misunderstanding, scattered", suggestion: "Think before speaking" }
      }
    },
    2: {
      positive: {
        tr: { behavior: "Finansal planlama, pratik düşünce", effect: "Maddi fikirler somutlaşır", suggestion: "Bir yatırım planı araştır" },
        en: { behavior: "Financial planning, practical thinking", effect: "Material ideas materialize", suggestion: "Research an investment plan" }
      },
      negative: {
        tr: { behavior: "Para endişesi, aşırı hesap yapma", effect: "Finansal kararsızlık", suggestion: "Uzman görüşü al" },
        en: { behavior: "Money worries, over-calculating", effect: "Financial indecision", suggestion: "Seek expert opinion" }
      }
    },
    3: {
      positive: {
        tr: { behavior: "Hızlı öğrenme, etkili yazışma", effect: "Eğitimde başarı, sosyal ağ genişler", suggestion: "Yeni bir şey öğren veya öğret" },
        en: { behavior: "Quick learning, effective correspondence", effect: "Success in education, social network expands", suggestion: "Learn or teach something new" }
      },
      negative: {
        tr: { behavior: "Yüzeysel iletişim, dedikodu", effect: "Kardeş sürtüşmeleri, mesaj karışıklığı", suggestion: "Derinlikli sohbetlere yönel" },
        en: { behavior: "Superficial communication, gossip", effect: "Sibling friction, message confusion", suggestion: "Engage in deeper conversations" }
      }
    },
    4: {
      positive: {
        tr: { behavior: "Aile ile iletişim, ev işlerini planlama", effect: "Evde düzen, nostalji", suggestion: "Aile arşivini düzenle" },
        en: { behavior: "Family communication, planning home tasks", effect: "Order at home, nostalgia", suggestion: "Organize family archives" }
      },
      negative: {
        tr: { behavior: "Ev içi tartışmalar, geçmişe takılma", effect: "Aile gerginliği", suggestion: "Geçmişi tartışmak yerine çözüme odaklan" },
        en: { behavior: "Home arguments, stuck in past", effect: "Family tension", suggestion: "Focus on solutions, not past debates" }
      }
    },
    5: {
      positive: {
        tr: { behavior: "Yaratıcı yazarlık, oyuncu zeka", effect: "Eğlenceli iletişim, flört başarısı", suggestion: "Yaratıcı bir metin yaz" },
        en: { behavior: "Creative writing, playful wit", effect: "Fun communication, flirt success", suggestion: "Write a creative text" }
      },
      negative: {
        tr: { behavior: "Abartılı sözler, riskli iletişim", effect: "Yanlış anlaşılan flört, kayıp", suggestion: "Sözlerini ölç" },
        en: { behavior: "Exaggerated words, risky communication", effect: "Misunderstood flirtation, loss", suggestion: "Measure your words" }
      }
    },
    6: {
      positive: {
        tr: { behavior: "Analitik düşünce, detaylara dikkat", effect: "İş verimliliği, sağlık bilinci", suggestion: "To-do listesi oluştur" },
        en: { behavior: "Analytical thinking, attention to details", effect: "Work efficiency, health awareness", suggestion: "Create a to-do list" }
      },
      negative: {
        tr: { behavior: "Aşırı endişe, kritik yapma", effect: "Stres, iş arkadaşlarıyla sürtüşme", suggestion: "Mükemmeli değil, yeterliliği hedefle" },
        en: { behavior: "Over-worrying, being critical", effect: "Stress, friction with colleagues", suggestion: "Aim for good enough, not perfect" }
      }
    },
    7: {
      positive: {
        tr: { behavior: "Diplomatik iletişim, müzakere yeteneği", effect: "Anlaşmalar başarılı, ilişkide diyalog", suggestion: "Önemli bir görüşme ayarla" },
        en: { behavior: "Diplomatic communication, negotiation skill", effect: "Successful agreements, dialogue in relationship", suggestion: "Arrange an important meeting" }
      },
      negative: {
        tr: { behavior: "Kararsızlık, başkalarının etkisinde kalma", effect: "İlişkide yanlış anlaşılma", suggestion: "Kendi fikrini net ifade et" },
        en: { behavior: "Indecision, being influenced by others", effect: "Misunderstanding in relationship", suggestion: "Express your own opinion clearly" }
      }
    },
    8: {
      positive: {
        tr: { behavior: "Araştırmacı zeka, sırları çözme", effect: "Derin kavrayış, finansal strateji", suggestion: "Bir gizemi araştır" },
        en: { behavior: "Investigative mind, solving secrets", effect: "Deep understanding, financial strategy", suggestion: "Research a mystery" }
      },
      negative: {
        tr: { behavior: "Obsesif düşünceler, şüphecilik", effect: "Paranoya, güven sorunları", suggestion: "Düşüncelerine meydan oku" },
        en: { behavior: "Obsessive thoughts, suspicion", effect: "Paranoia, trust issues", suggestion: "Challenge your thoughts" }
      }
    },
    9: {
      positive: {
        tr: { behavior: "Felsefi tartışma, kültürlerarası iletişim", effect: "Zihinsel genişleme, yayıncılık fırsatı", suggestion: "Yeni bir dil öğrenmeye başla" },
        en: { behavior: "Philosophical discussion, cross-cultural communication", effect: "Mental expansion, publishing opportunity", suggestion: "Start learning a new language" }
      },
      negative: {
        tr: { behavior: "Dogmatik söylem, her şeyi bilme tavrı", effect: "Tartışmalar, hukuki sorunlar", suggestion: "Dinlemeyi öğren" },
        en: { behavior: "Dogmatic speech, know-it-all attitude", effect: "Arguments, legal issues", suggestion: "Learn to listen" }
      }
    },
    10: {
      positive: {
        tr: { behavior: "Profesyonel iletişim, stratejik düşünce", effect: "Kariyer fırsatları, tanınma", suggestion: "LinkedIn profilini güncelle" },
        en: { behavior: "Professional communication, strategic thinking", effect: "Career opportunities, recognition", suggestion: "Update your LinkedIn profile" }
      },
      negative: {
        tr: { behavior: "İş jargonuna gömülme, soğuk iletişim", effect: "Otorite ile çatışma", suggestion: "İnsan tarafını da göster" },
        en: { behavior: "Buried in work jargon, cold communication", effect: "Conflict with authority", suggestion: "Show your human side too" }
      }
    },
    11: {
      positive: {
        tr: { behavior: "Yenilikçi fikirler, sosyal ağ kurma", effect: "Grup projeleri başarılı", suggestion: "Online bir topluluğa katıl" },
        en: { behavior: "Innovative ideas, networking", effect: "Group projects successful", suggestion: "Join an online community" }
      },
      negative: {
        tr: { behavior: "Marjinal fikirlere kapılma", effect: "Arkadaşlarla fikir ayrılığı", suggestion: "Pratikliği de düşün" },
        en: { behavior: "Getting caught up in fringe ideas", effect: "Disagreements with friends", suggestion: "Consider practicality too" }
      }
    },
    12: {
      positive: {
        tr: { behavior: "Sezgisel düşünce, medyumvari algı", effect: "Yaratıcı ilham, rüya mesajları", suggestion: "Rüya günlüğü tut" },
        en: { behavior: "Intuitive thinking, psychic perception", effect: "Creative inspiration, dream messages", suggestion: "Keep a dream journal" }
      },
      negative: {
        tr: { behavior: "Zihinsel bulanıklık, unutkanlık", effect: "Yanlış anlaşılma, gizli kaygılar", suggestion: "Meditasyonla zihni temizle" },
        en: { behavior: "Mental fog, forgetfulness", effect: "Misunderstandings, hidden anxieties", suggestion: "Clear mind with meditation" }
      }
    }
  },
  Venus: {
    1: {
      positive: {
        tr: { behavior: "Çekiciliğin artar, şirin ve sempatik görünürsün", effect: "Sosyal başarı, aşk fırsatları", suggestion: "İmajını yenile" },
        en: { behavior: "Your attractiveness increases, appear charming", effect: "Social success, love opportunities", suggestion: "Refresh your image" }
      },
      negative: {
        tr: { behavior: "Kendine hayranlık, yüzeysellik", effect: "Sahte ilişkiler, değer kaybı", suggestion: "İç güzelliğe odaklan" },
        en: { behavior: "Self-admiration, superficiality", effect: "Fake relationships, loss of value", suggestion: "Focus on inner beauty" }
      }
    },
    2: {
      positive: {
        tr: { behavior: "Maddi zevklere yöneliş, şımartma", effect: "Finansal artış, konfor", suggestion: "Kendinle güzel bir şey yap" },
        en: { behavior: "Turn to material pleasures, indulgence", effect: "Financial increase, comfort", suggestion: "Do something nice for yourself" }
      },
      negative: {
        tr: { behavior: "Aşırı harcama, materyalizm", effect: "Finansal sıkıntı", suggestion: "Bütçe belirle" },
        en: { behavior: "Overspending, materialism", effect: "Financial trouble", suggestion: "Set a budget" }
      }
    },
    3: {
      positive: {
        tr: { behavior: "Tatlı dil, diplomatik iletişim", effect: "Kardeşlerle uyum, keyifli sohbetler", suggestion: "Sevgi dolu bir mesaj gönder" },
        en: { behavior: "Sweet words, diplomatic communication", effect: "Harmony with siblings, pleasant conversations", suggestion: "Send a loving message" }
      },
      negative: {
        tr: { behavior: "Yalan dolan, yüzeysel ilişkiler", effect: "Güvensizlik", suggestion: "Dürüst ol" },
        en: { behavior: "Lies, superficial relationships", effect: "Distrust", suggestion: "Be honest" }
      }
    },
    4: {
      positive: {
        tr: { behavior: "Eve güzellik katma, aile sevgisi", effect: "Evde huzur, estetik ortam", suggestion: "Evini güzelleştir" },
        en: { behavior: "Adding beauty to home, family love", effect: "Peace at home, aesthetic environment", suggestion: "Beautify your home" }
      },
      negative: {
        tr: { behavior: "Aşırı bağımlılık, pasiflik", effect: "Ailevi sorunlar", suggestion: "Bağımsızlığını koru" },
        en: { behavior: "Over-dependency, passivity", effect: "Family problems", suggestion: "Maintain your independence" }
      }
    },
    5: {
      positive: {
        tr: { behavior: "Romantik cesaret, yaratıcı tutku", effect: "Aşk başarısı, sanatsal ilham", suggestion: "Romantik bir sürpriz planla" },
        en: { behavior: "Romantic courage, creative passion", effect: "Love success, artistic inspiration", suggestion: "Plan a romantic surprise" }
      },
      negative: {
        tr: { behavior: "Aşırı dramatik, flört bağımlılığı", effect: "Kalp kırıklığı", suggestion: "Gerçek bağlara değer ver" },
        en: { behavior: "Over-dramatic, flirt addiction", effect: "Heartbreak", suggestion: "Value real connections" }
      }
    },
    6: {
      positive: {
        tr: { behavior: "İş ortamında uyum, estetik çalışma", effect: "Meslektaşlarla iyi ilişkiler", suggestion: "Çalışma alanını düzenle" },
        en: { behavior: "Harmony at work, aesthetic workspace", effect: "Good relations with colleagues", suggestion: "Organize your workspace" }
      },
      negative: {
        tr: { behavior: "İş yerinde flört, standart düşürme", effect: "Profesyonellik kaybı", suggestion: "Sınırları koru" },
        en: { behavior: "Flirting at work, lowering standards", effect: "Loss of professionalism", suggestion: "Maintain boundaries" }
      }
    },
    7: {
      positive: {
        tr: { behavior: "İlişkide uyum arayışı, romantizm", effect: "Evlilik veya ortaklık fırsatı", suggestion: "Partnerinle kaliteli vakit geçir" },
        en: { behavior: "Seeking harmony in relationship, romance", effect: "Marriage or partnership opportunity", suggestion: "Spend quality time with partner" }
      },
      negative: {
        tr: { behavior: "Aşırı fedakarlık, kimlik kaybı", effect: "İlişki bağımlılığı", suggestion: "Kendi ihtiyaçlarını da karşıla" },
        en: { behavior: "Over-sacrifice, identity loss", effect: "Relationship dependency", suggestion: "Meet your own needs too" }
      }
    },
    8: {
      positive: {
        tr: { behavior: "Derin tutku, duygusal dönüşüm", effect: "Yoğun bağ, ortak kazançlar", suggestion: "Partnerinle finansı konuş" },
        en: { behavior: "Deep passion, emotional transformation", effect: "Intense bond, joint gains", suggestion: "Discuss finances with partner" }
      },
      negative: {
        tr: { behavior: "Kıskançlık, obsesif aşk", effect: "Güç savaşları, bağımlılık", suggestion: "Güven inşa et" },
        en: { behavior: "Jealousy, obsessive love", effect: "Power struggles, dependency", suggestion: "Build trust" }
      }
    },
    9: {
      positive: {
        tr: { behavior: "Yabancı kültürlere ilgi, felsefi aşk", effect: "Uzak diyarlardan aşk, eğitim fırsatı", suggestion: "Bir kültür gezisi planla" },
        en: { behavior: "Interest in foreign cultures, philosophical love", effect: "Love from far lands, education opportunity", suggestion: "Plan a cultural trip" }
      },
      negative: {
        tr: { behavior: "Gerçekçi olmayan romantizm", effect: "Uzak mesafe sorunları", suggestion: "Ayaklarını yere bas" },
        en: { behavior: "Unrealistic romanticism", effect: "Long-distance problems", suggestion: "Stay grounded" }
      }
    },
    10: {
      positive: {
        tr: { behavior: "Profesyonel çekicilik, diplomasi", effect: "Kariyer başarısı, takdir", suggestion: "Networking etkinliğine katıl" },
        en: { behavior: "Professional charm, diplomacy", effect: "Career success, appreciation", suggestion: "Attend a networking event" }
      },
      negative: {
        tr: { behavior: "İş aşkı karışımı, şöhret düşkünlüğü", effect: "İmaj kaybı", suggestion: "Profesyonelliği koru" },
        en: { behavior: "Mixing work and love, fame obsession", effect: "Image loss", suggestion: "Maintain professionalism" }
      }
    },
    11: {
      positive: {
        tr: { behavior: "Dostluklara değer verme, sosyalleşme", effect: "Yeni arkadaşlıklar, hayallere destek", suggestion: "Grup aktivitesine katıl" },
        en: { behavior: "Valuing friendships, socializing", effect: "New friendships, support for dreams", suggestion: "Join a group activity" }
      },
      negative: {
        tr: { behavior: "Yüzeysel arkadaşlıklar", effect: "Hayal kırıklığı", suggestion: "Kaliteli dostluklar kur" },
        en: { behavior: "Superficial friendships", effect: "Disappointment", suggestion: "Build quality friendships" }
      }
    },
    12: {
      positive: {
        tr: { behavior: "Şefkat, gizli aşk, ruhsal bağ", effect: "İçsel huzur, şifalanma", suggestion: "Yalnız kalıp kendini sev" },
        en: { behavior: "Compassion, secret love, spiritual bond", effect: "Inner peace, healing", suggestion: "Spend time alone loving yourself" }
      },
      negative: {
        tr: { behavior: "Yasak aşk, kendini feda etme", effect: "Gizli acılar", suggestion: "Sağlıklı sınırlar koy" },
        en: { behavior: "Forbidden love, self-sacrifice", effect: "Hidden pains", suggestion: "Set healthy boundaries" }
      }
    }
  },
  Mars: {
    1: {
      positive: {
        tr: { behavior: "Enerjin patlar, girişimcilik ruhu", effect: "Liderlik, hedeflere ulaşma", suggestion: "Yeni bir spora başla" },
        en: { behavior: "Your energy explodes, entrepreneurial spirit", effect: "Leadership, reaching goals", suggestion: "Start a new sport" }
      },
      negative: {
        tr: { behavior: "Saldırganlık, sabırsızlık", effect: "Kavgalar, kazalar", suggestion: "Enerjiyi sporra yönlendir" },
        en: { behavior: "Aggression, impatience", effect: "Fights, accidents", suggestion: "Channel energy to sports" }
      }
    },
    2: {
      positive: {
        tr: { behavior: "Maddi hedefler için mücadele", effect: "Gelir artışı, kararlılık", suggestion: "Yeni bir iş fırsatı kovala" },
        en: { behavior: "Fighting for material goals", effect: "Income increase, determination", suggestion: "Chase a new business opportunity" }
      },
      negative: {
        tr: { behavior: "Agresif harcama, sahiplenme", effect: "Finansal kayıp", suggestion: "Sabırlı ol, bekleme stratejisi uygula" },
        en: { behavior: "Aggressive spending, possessiveness", effect: "Financial loss", suggestion: "Be patient, apply waiting strategy" }
      }
    },
    3: {
      positive: {
        tr: { behavior: "Cesur iletişim, ikna gücü", effect: "Tartışma başarısı, hızlı öğrenme", suggestion: "Fikirlerini savun" },
        en: { behavior: "Bold communication, persuasion power", effect: "Argument success, quick learning", suggestion: "Defend your ideas" }
      },
      negative: {
        tr: { behavior: "Keskin dil, kavgacı tutum", effect: "Kardeş kavgaları, trafik sorunları", suggestion: "Sakin kal, sözlerine dikkat et" },
        en: { behavior: "Sharp tongue, combative attitude", effect: "Sibling fights, traffic issues", suggestion: "Stay calm, watch your words" }
      }
    },
    4: {
      positive: {
        tr: { behavior: "Ev için mücadele, aileyi koruma", effect: "Ev iyileştirmeleri, güvenlik", suggestion: "Ev tadilatı başlat" },
        en: { behavior: "Fighting for home, protecting family", effect: "Home improvements, security", suggestion: "Start home renovation" }
      },
      negative: {
        tr: { behavior: "Aile içi öfke, otoriterlik", effect: "Ev kavgaları", suggestion: "Öfkeni dışarıda boşalt" },
        en: { behavior: "Anger at home, authoritarianism", effect: "Home fights", suggestion: "Release anger outside" }
      }
    },
    5: {
      positive: {
        tr: { behavior: "Tutkulu aşk, yaratıcı enerji", effect: "Romantik fetih, spor başarısı", suggestion: "Cesur bir adım at" },
        en: { behavior: "Passionate love, creative energy", effect: "Romantic conquest, sports success", suggestion: "Take a bold step" }
      },
      negative: {
        tr: { behavior: "Aşırı rekabet, kumar", effect: "Kalp kırıklığı, kayıp", suggestion: "Ölçülü risk al" },
        en: { behavior: "Excessive competition, gambling", effect: "Heartbreak, loss", suggestion: "Take measured risks" }
      }
    },
    6: {
      positive: {
        tr: { behavior: "Çok çalışma, verimlilik", effect: "İş başarısı, fiziksel güç", suggestion: "Zorlu bir egzersiz yap" },
        en: { behavior: "Hard work, productivity", effect: "Work success, physical strength", suggestion: "Do a challenging workout" }
      },
      negative: {
        tr: { behavior: "İş stresi, meslektaşlarla çatışma", effect: "Tükenmişlik, sağlık sorunları", suggestion: "Dinlenmeye vakit ayır" },
        en: { behavior: "Work stress, conflict with colleagues", effect: "Burnout, health issues", suggestion: "Make time for rest" }
      }
    },
    7: {
      positive: {
        tr: { behavior: "İlişki için savaşma, aktif ortaklık", effect: "Güçlü bağ, ortak hedefler", suggestion: "Birlikte spor yapın" },
        en: { behavior: "Fighting for relationship, active partnership", effect: "Strong bond, joint goals", suggestion: "Exercise together" }
      },
      negative: {
        tr: { behavior: "İlişkide kavgalar, rekabet", effect: "Ayrılık riski", suggestion: "Uzlaşma yolu bul" },
        en: { behavior: "Fights in relationship, competition", effect: "Separation risk", suggestion: "Find a compromise" }
      }
    },
    8: {
      positive: {
        tr: { behavior: "Dönüşüm için mücadele, tutku", effect: "Yeniden doğuş, finansal güç", suggestion: "Korkularınla yüzleş" },
        en: { behavior: "Fighting for transformation, passion", effect: "Rebirth, financial power", suggestion: "Face your fears" }
      },
      negative: {
        tr: { behavior: "Kontrol savaşları, intikam hissi", effect: "Kriz, şiddet riski", suggestion: "Terapiye git" },
        en: { behavior: "Control battles, revenge feeling", effect: "Crisis, violence risk", suggestion: "Go to therapy" }
      }
    },
    9: {
      positive: {
        tr: { behavior: "İnançlar için mücadele, macera ruhu", effect: "Seyahat, felsefi kazanım", suggestion: "Maceraya atıl" },
        en: { behavior: "Fighting for beliefs, adventure spirit", effect: "Travel, philosophical gain", suggestion: "Embark on adventure" }
      },
      negative: {
        tr: { behavior: "Fanatizm, tartışmacılık", effect: "Hukuki sorunlar", suggestion: "Açık fikirli ol" },
        en: { behavior: "Fanaticism, argumentativeness", effect: "Legal issues", suggestion: "Be open-minded" }
      }
    },
    10: {
      positive: {
        tr: { behavior: "Kariyer hırsı, liderlik", effect: "Terfi, başarı", suggestion: "Büyük bir profesyonel adım at" },
        en: { behavior: "Career ambition, leadership", effect: "Promotion, success", suggestion: "Take a major professional step" }
      },
      negative: {
        tr: { behavior: "Otoriteyle çatışma, aşırı hırs", effect: "İtibar kaybı", suggestion: "Stratejik ol" },
        en: { behavior: "Conflict with authority, excessive ambition", effect: "Reputation loss", suggestion: "Be strategic" }
      }
    },
    11: {
      positive: {
        tr: { behavior: "Grup içinde liderlik, aktivizm", effect: "Hedeflere ulaşma, sosyal etki", suggestion: "Bir davaya öncülük et" },
        en: { behavior: "Leadership in group, activism", effect: "Reaching goals, social impact", suggestion: "Lead a cause" }
      },
      negative: {
        tr: { behavior: "Arkadaşlarla çatışma, aşırılık", effect: "Yalnızlaşma", suggestion: "Takım oyunu öğren" },
        en: { behavior: "Conflict with friends, extremism", effect: "Isolation", suggestion: "Learn teamwork" }
      }
    },
    12: {
      positive: {
        tr: { behavior: "Gizli düşmanlarla mücadele, içsel güç", effect: "Bilinçaltı şifa", suggestion: "Dövüş sanatları öğren" },
        en: { behavior: "Fighting hidden enemies, inner strength", effect: "Subconscious healing", suggestion: "Learn martial arts" }
      },
      negative: {
        tr: { behavior: "Bastırılmış öfke, kendini sabote etme", effect: "Gizli sorunlar", suggestion: "Öfkeyi sağlıklı yollarla ifade et" },
        en: { behavior: "Suppressed anger, self-sabotage", effect: "Hidden problems", suggestion: "Express anger in healthy ways" }
      }
    }
  },
  Jupiter: {
    1: {
      positive: {
        tr: { behavior: "İyimserlik, özgüven patlaması", effect: "Şans kapıları açılır, büyüme", suggestion: "Yeni bir girişim başlat" },
        en: { behavior: "Optimism, confidence explosion", effect: "Doors of luck open, growth", suggestion: "Start a new venture" }
      },
      negative: {
        tr: { behavior: "Aşırı güven, abartı", effect: "Hayal kırıklığı, kilo alma", suggestion: "Ölçülü ol" },
        en: { behavior: "Overconfidence, exaggeration", effect: "Disappointment, weight gain", suggestion: "Be moderate" }
      }
    },
    2: {
      positive: {
        tr: { behavior: "Maddi genişleme, değer artışı", effect: "Finansal bolluk", suggestion: "Yatırım yap" },
        en: { behavior: "Material expansion, value increase", effect: "Financial abundance", suggestion: "Make investments" }
      },
      negative: {
        tr: { behavior: "Savurganlık, aşırı tüketim", effect: "Finansal şişkinlik", suggestion: "Bütçeye sadık kal" },
        en: { behavior: "Extravagance, overconsumption", effect: "Financial bloating", suggestion: "Stick to budget" }
      }
    },
    3: {
      positive: {
        tr: { behavior: "Öğrenme iştahı, pozitif iletişim", effect: "Eğitim fırsatları, iyi haberler", suggestion: "Yeni bir kurs al" },
        en: { behavior: "Learning appetite, positive communication", effect: "Education opportunities, good news", suggestion: "Take a new course" }
      },
      negative: {
        tr: { behavior: "Abartılı söylemler, yayılma", effect: "Bilgi kirliliği", suggestion: "Kaliteye odaklan" },
        en: { behavior: "Exaggerated claims, spreading thin", effect: "Information pollution", suggestion: "Focus on quality" }
      }
    },
    4: {
      positive: {
        tr: { behavior: "Aile genişlemesi, ev büyütme", effect: "Ev saadeti, miras", suggestion: "Aile toplantısı düzenle" },
        en: { behavior: "Family expansion, home enlargement", effect: "Home happiness, inheritance", suggestion: "Organize family gathering" }
      },
      negative: {
        tr: { behavior: "Aşırı korumacılık, köklere takılma", effect: "Durağanlık", suggestion: "Yeni deneyimlere açıl" },
        en: { behavior: "Over-protectiveness, stuck in roots", effect: "Stagnation", suggestion: "Open to new experiences" }
      }
    },
    5: {
      positive: {
        tr: { behavior: "Yaratıcı bolluk, aşkta şans", effect: "Romantik başarı, sanatsal tanınma", suggestion: "Yaratıcılığını sergile" },
        en: { behavior: "Creative abundance, luck in love", effect: "Romantic success, artistic recognition", suggestion: "Showcase your creativity" }
      },
      negative: {
        tr: { behavior: "Aşırı risk alma, kumar", effect: "Kayıplar", suggestion: "Şansını zorlama" },
        en: { behavior: "Excessive risk-taking, gambling", effect: "Losses", suggestion: "Don't push your luck" }
      }
    },
    6: {
      positive: {
        tr: { behavior: "İş fırsatları, sağlıkta iyileşme", effect: "Verimlilik, terfi", suggestion: "Becerilerini geliştir" },
        en: { behavior: "Work opportunities, health improvement", effect: "Productivity, promotion", suggestion: "Develop your skills" }
      },
      negative: {
        tr: { behavior: "İş yükü artışı, ihmal", effect: "Yorgunluk", suggestion: "Sınırlar koy" },
        en: { behavior: "Workload increase, negligence", effect: "Fatigue", suggestion: "Set boundaries" }
      }
    },
    7: {
      positive: {
        tr: { behavior: "İlişkide büyüme, evlilik şansı", effect: "Mutlu ortaklıklar", suggestion: "Birlikte seyahat et" },
        en: { behavior: "Growth in relationship, marriage luck", effect: "Happy partnerships", suggestion: "Travel together" }
      },
      negative: {
        tr: { behavior: "Aşırı beklenti, idealizasyon", effect: "Hayal kırıklığı", suggestion: "Gerçekçi ol" },
        en: { behavior: "Excessive expectations, idealization", effect: "Disappointment", suggestion: "Be realistic" }
      }
    },
    8: {
      positive: {
        tr: { behavior: "Derin dönüşüm, ortak kazançlar", effect: "Miras, psikolojik büyüme", suggestion: "Yatırımları gözden geçir" },
        en: { behavior: "Deep transformation, joint gains", effect: "Inheritance, psychological growth", suggestion: "Review investments" }
      },
      negative: {
        tr: { behavior: "Aşırı güç hırsı, manipülasyon", effect: "Güç savaşları", suggestion: "Dürüst ol" },
        en: { behavior: "Excessive power hunger, manipulation", effect: "Power struggles", suggestion: "Be honest" }
      }
    },
    9: {
      positive: {
        tr: { behavior: "Felsefi genişleme, seyahat şansı", effect: "Eğitim başarısı, yayıncılık", suggestion: "Yurtdışı planla" },
        en: { behavior: "Philosophical expansion, travel luck", effect: "Education success, publishing", suggestion: "Plan abroad trip" }
      },
      negative: {
        tr: { behavior: "Dogmatizm, aşırı idealizm", effect: "Gerçeklikten kopma", suggestion: "Pratik kal" },
        en: { behavior: "Dogmatism, excessive idealism", effect: "Disconnection from reality", suggestion: "Stay practical" }
      }
    },
    10: {
      positive: {
        tr: { behavior: "Kariyer zirvesi, sosyal statü", effect: "Terfi, kamuoyu takdiri", suggestion: "Büyük hedefler koy" },
        en: { behavior: "Career peak, social status", effect: "Promotion, public recognition", suggestion: "Set big goals" }
      },
      negative: {
        tr: { behavior: "Aşırı hırs, ego şişmesi", effect: "İtibar kaybı riski", suggestion: "Alçakgönüllü kal" },
        en: { behavior: "Excessive ambition, ego inflation", effect: "Reputation loss risk", suggestion: "Stay humble" }
      }
    },
    11: {
      positive: {
        tr: { behavior: "Sosyal genişleme, hayallere ulaşma", effect: "Yeni dostluklar, gruplardan destek", suggestion: "Bir topluluğa katıl" },
        en: { behavior: "Social expansion, reaching dreams", effect: "New friendships, group support", suggestion: "Join a community" }
      },
      negative: {
        tr: { behavior: "Aşırı sosyalleşme, gerçekçi olmayan hayaller", effect: "Dağılma", suggestion: "Odaklan" },
        en: { behavior: "Over-socializing, unrealistic dreams", effect: "Scattering", suggestion: "Focus" }
      }
    },
    12: {
      positive: {
        tr: { behavior: "Spiritüel genişleme, şifalanma", effect: "İçsel huzur, gizli yardımlar", suggestion: "Retreat'e katıl" },
        en: { behavior: "Spiritual expansion, healing", effect: "Inner peace, hidden help", suggestion: "Join a retreat" }
      },
      negative: {
        tr: { behavior: "Kaçış, aşırı fedakarlık", effect: "Enerji kaybı", suggestion: "Sınırlar koy" },
        en: { behavior: "Escape, over-sacrifice", effect: "Energy loss", suggestion: "Set boundaries" }
      }
    }
  },
  Saturn: {
    1: {
      positive: {
        tr: { behavior: "Disiplin, olgunluk, sorumluluk alma", effect: "Sağlam temeller, saygınlık", suggestion: "Uzun vadeli plan yap" },
        en: { behavior: "Discipline, maturity, taking responsibility", effect: "Solid foundations, respect", suggestion: "Make long-term plans" }
      },
      negative: {
        tr: { behavior: "Aşırı ciddiyet, kendine sertlik", effect: "Depresif ruh hali, yalnızlık", suggestion: "Kendine şefkat göster" },
        en: { behavior: "Over-seriousness, hardness on self", effect: "Depressive mood, loneliness", suggestion: "Show self-compassion" }
      }
    },
    2: {
      positive: {
        tr: { behavior: "Finansal disiplin, biriktirme", effect: "Maddi güvenlik, kalıcı değer", suggestion: "Tasarruf planı oluştur" },
        en: { behavior: "Financial discipline, saving", effect: "Material security, lasting value", suggestion: "Create savings plan" }
      },
      negative: {
        tr: { behavior: "Para kaygısı, cimrilik", effect: "Kısıtlanmışlık hissi", suggestion: "Bol düşün" },
        en: { behavior: "Money anxiety, stinginess", effect: "Feeling of restriction", suggestion: "Think abundantly" }
      }
    },
    3: {
      positive: {
        tr: { behavior: "Yapısal düşünce, ciddi çalışma", effect: "Akademik başarı, kalıcı öğrenme", suggestion: "Sertifika programına katıl" },
        en: { behavior: "Structured thinking, serious study", effect: "Academic success, lasting learning", suggestion: "Join certification program" }
      },
      negative: {
        tr: { behavior: "Karamsar düşünceler, iletişim blokajı", effect: "Yalnızlaşma, gecikmeler", suggestion: "Pozitif düşünmeyi dene" },
        en: { behavior: "Pessimistic thoughts, communication block", effect: "Isolation, delays", suggestion: "Try positive thinking" }
      }
    },
    4: {
      positive: {
        tr: { behavior: "Aile sorumluluğu, köklere bağlılık", effect: "Ev güvenliği, kalıcı bağlar", suggestion: "Aile mirasını koru" },
        en: { behavior: "Family responsibility, root connection", effect: "Home security, lasting bonds", suggestion: "Preserve family heritage" }
      },
      negative: {
        tr: { behavior: "Ailevi yükler, geçmişe hapsolma", effect: "Duygusal ağırlık", suggestion: "Geçmişle barış yap" },
        en: { behavior: "Family burdens, trapped in past", effect: "Emotional heaviness", suggestion: "Make peace with past" }
      }
    },
    5: {
      positive: {
        tr: { behavior: "Ciddi yaratıcılık, olgun aşk", effect: "Kalıcı eser, derin bağ", suggestion: "Uzun vadeli bir proje başlat" },
        en: { behavior: "Serious creativity, mature love", effect: "Lasting work, deep bond", suggestion: "Start a long-term project" }
      },
      negative: {
        tr: { behavior: "Eğlenceyi engelleyen blokaj, korku", effect: "Keyifsizlik, kalp açılamaması", suggestion: "İç çocuğunu keşfet" },
        en: { behavior: "Blocks preventing fun, fear", effect: "Joylessness, heart not opening", suggestion: "Discover your inner child" }
      }
    },
    6: {
      positive: {
        tr: { behavior: "İş disiplini, sağlık rutinleri", effect: "Kariyer sağlamlığı, fiziksel dayanıklılık", suggestion: "Rutinlerini optimize et" },
        en: { behavior: "Work discipline, health routines", effect: "Career stability, physical endurance", suggestion: "Optimize your routines" }
      },
      negative: {
        tr: { behavior: "İş baskısı, sağlık ihmal", effect: "Kronik sorunlar, tükenmişlik", suggestion: "Sağlık kontrolü yaptır" },
        en: { behavior: "Work pressure, health neglect", effect: "Chronic issues, burnout", suggestion: "Get health checkup" }
      }
    },
    7: {
      positive: {
        tr: { behavior: "İlişkide bağlılık, ciddi ortaklık", effect: "Kalıcı evlilik, sadakat", suggestion: "Sözleşme veya anlaşma yap" },
        en: { behavior: "Commitment in relationship, serious partnership", effect: "Lasting marriage, loyalty", suggestion: "Make contract or agreement" }
      },
      negative: {
        tr: { behavior: "İlişki testleri, mesafe", effect: "Ayrılık tehdidi, soğukluk", suggestion: "İletişimi açık tut" },
        en: { behavior: "Relationship tests, distance", effect: "Separation threat, coldness", suggestion: "Keep communication open" }
      }
    },
    8: {
      positive: {
        tr: { behavior: "Derin dönüşüm, finansal sorumluluk", effect: "Kalıcı değişim, miras yönetimi", suggestion: "Vergi ve miras işlerini düzenle" },
        en: { behavior: "Deep transformation, financial responsibility", effect: "Lasting change, inheritance management", suggestion: "Organize tax and estate matters" }
      },
      negative: {
        tr: { behavior: "Korku, kontrol takıntısı", effect: "Krizler, kayıplar", suggestion: "Kontrolü bırak" },
        en: { behavior: "Fear, control obsession", effect: "Crises, losses", suggestion: "Let go of control" }
      }
    },
    9: {
      positive: {
        tr: { behavior: "Felsefi derinlik, ciddi öğrenme", effect: "Bilgelik, akademik başarı", suggestion: "İleri eğitim planla" },
        en: { behavior: "Philosophical depth, serious learning", effect: "Wisdom, academic success", suggestion: "Plan advanced education" }
      },
      negative: {
        tr: { behavior: "Dogmatizm, seyahat engelleri", effect: "Dar görüşlülük", suggestion: "Farklı fikirlere açıl" },
        en: { behavior: "Dogmatism, travel obstacles", effect: "Narrow-mindedness", suggestion: "Open to different ideas" }
      }
    },
    10: {
      positive: {
        tr: { behavior: "Kariyer zirvesi, otorite", effect: "Kalıcı başarı, liderlik", suggestion: "Büyük sorumluluk üstlen" },
        en: { behavior: "Career peak, authority", effect: "Lasting success, leadership", suggestion: "Take on big responsibility" }
      },
      negative: {
        tr: { behavior: "Otorite baskısı, aşırı iş yükü", effect: "İtibar krizi, düşüş korkusu", suggestion: "Delegasyon yap" },
        en: { behavior: "Authority pressure, excessive workload", effect: "Reputation crisis, fear of fall", suggestion: "Delegate tasks" }
      }
    },
    11: {
      positive: {
        tr: { behavior: "Kalıcı dostluklar, sosyal sorumluluk", effect: "Gerçek arkadaşlar, hedeflere ulaşma", suggestion: "Mentor bul veya ol" },
        en: { behavior: "Lasting friendships, social responsibility", effect: "True friends, reaching goals", suggestion: "Find or be a mentor" }
      },
      negative: {
        tr: { behavior: "Sosyal izolasyon, hayal kırıklığı", effect: "Yalnızlık, umutların sönmesi", suggestion: "Topluluk bul" },
        en: { behavior: "Social isolation, disappointment", effect: "Loneliness, fading hopes", suggestion: "Find community" }
      }
    },
    12: {
      positive: {
        tr: { behavior: "Spiritüel disiplin, içsel çalışma", effect: "Karma temizliği, olgunluk", suggestion: "Meditasyon pratiği geliştir" },
        en: { behavior: "Spiritual discipline, inner work", effect: "Karma cleansing, maturity", suggestion: "Develop meditation practice" }
      },
      negative: {
        tr: { behavior: "Gizli korkular, suçluluk", effect: "Depresyon, izolasyon", suggestion: "Profesyonel destek al" },
        en: { behavior: "Hidden fears, guilt", effect: "Depression, isolation", suggestion: "Get professional support" }
      }
    }
  },
  Uranus: {
    1: {
      positive: {
        tr: { behavior: "Özgünlük, yenilikçilik, bağımsızlık", effect: "Kimlik devrimi, özgürleşme", suggestion: "Radikal bir değişiklik dene" },
        en: { behavior: "Originality, innovation, independence", effect: "Identity revolution, liberation", suggestion: "Try a radical change" }
      },
      negative: {
        tr: { behavior: "Dengesizlik, beklenmedik tepkiler", effect: "Kaos, istikrarsızlık", suggestion: "Topraklama pratikleri yap" },
        en: { behavior: "Instability, unexpected reactions", effect: "Chaos, instability", suggestion: "Do grounding practices" }
      }
    },
    2: {
      positive: {
        tr: { behavior: "Yenilikçi gelir kaynakları", effect: "Beklenmedik kazançlar", suggestion: "Kripto veya yeni teknolojileri araştır" },
        en: { behavior: "Innovative income sources", effect: "Unexpected gains", suggestion: "Research crypto or new technologies" }
      },
      negative: {
        tr: { behavior: "Finansal dalgalanmalar", effect: "Ani kayıplar", suggestion: "Acil durum fonu oluştur" },
        en: { behavior: "Financial fluctuations", effect: "Sudden losses", suggestion: "Create emergency fund" }
      }
    },
    3: {
      positive: {
        tr: { behavior: "Dahiyane fikirler, özgün bakış", effect: "İnovatif çözümler", suggestion: "Fikirlerni paylaş" },
        en: { behavior: "Genius ideas, original perspective", effect: "Innovative solutions", suggestion: "Share your ideas" }
      },
      negative: {
        tr: { behavior: "Sinirli iletişim, şok edici haberler", effect: "Karışıklık", suggestion: "Net ol" },
        en: { behavior: "Nervous communication, shocking news", effect: "Confusion", suggestion: "Be clear" }
      }
    },
    4: {
      positive: {
        tr: { behavior: "Evde devrim, aile dinamiklerinde değişim", effect: "Özgürleştirici değişimler", suggestion: "Evi yeniden tasarla" },
        en: { behavior: "Revolution at home, change in family dynamics", effect: "Liberating changes", suggestion: "Redesign home" }
      },
      negative: {
        tr: { behavior: "Ev istikrarsızlığı, ani değişimler", effect: "Köksüzlük hissi", suggestion: "İç huzur bul" },
        en: { behavior: "Home instability, sudden changes", effect: "Rootlessness feeling", suggestion: "Find inner peace" }
      }
    },
    5: {
      positive: {
        tr: { behavior: "Özgün yaratıcılık, sıra dışı aşk", effect: "Heyecan verici deneyimler", suggestion: "Sınırları zorla" },
        en: { behavior: "Original creativity, unconventional love", effect: "Exciting experiences", suggestion: "Push boundaries" }
      },
      negative: {
        tr: { behavior: "Kararsız aşk, riskli eğlence", effect: "Ani kopuşlar", suggestion: "Tutarlı ol" },
        en: { behavior: "Unstable love, risky fun", effect: "Sudden breaks", suggestion: "Be consistent" }
      }
    },
    6: {
      positive: {
        tr: { behavior: "Yenilikçi iş yöntemleri", effect: "Verimlilik artışı", suggestion: "Yeni bir sistem kur" },
        en: { behavior: "Innovative work methods", effect: "Productivity increase", suggestion: "Establish new system" }
      },
      negative: {
        tr: { behavior: "İş istikrarsızlığı, sağlıkta dalgalanma", effect: "Stres", suggestion: "Esneklik öğren" },
        en: { behavior: "Work instability, health fluctuation", effect: "Stress", suggestion: "Learn flexibility" }
      }
    },
    7: {
      positive: {
        tr: { behavior: "Özgür ilişki, yenilikçi ortaklık", effect: "Heyecan verici bağlar", suggestion: "Kalıpları kır" },
        en: { behavior: "Free relationship, innovative partnership", effect: "Exciting bonds", suggestion: "Break patterns" }
      },
      negative: {
        tr: { behavior: "İlişkide ani şoklar", effect: "Ani ayrılıklar", suggestion: "Esneklik göster" },
        en: { behavior: "Sudden shocks in relationship", effect: "Sudden separations", suggestion: "Show flexibility" }
      }
    },
    8: {
      positive: {
        tr: { behavior: "Derin dönüşüm, tabularla yüzleşme", effect: "Özgürleşme, yenilenme", suggestion: "Eski kalıpları bırak" },
        en: { behavior: "Deep transformation, facing taboos", effect: "Liberation, renewal", suggestion: "Let go of old patterns" }
      },
      negative: {
        tr: { behavior: "Finansal şoklar, kontrol kaybı", effect: "Kriz", suggestion: "Adapte ol" },
        en: { behavior: "Financial shocks, loss of control", effect: "Crisis", suggestion: "Adapt" }
      }
    },
    9: {
      positive: {
        tr: { behavior: "Radikal felsefe, yenilikçi öğrenme", effect: "Uyanış, özgür düşünce", suggestion: "Yeni bir dünya görüşü keşfet" },
        en: { behavior: "Radical philosophy, innovative learning", effect: "Awakening, free thinking", suggestion: "Explore new worldview" }
      },
      negative: {
        tr: { behavior: "Aşırı özgürlük, istikrarsızlık", effect: "Kaos", suggestion: "Köklere bağlan" },
        en: { behavior: "Excessive freedom, instability", effect: "Chaos", suggestion: "Connect to roots" }
      }
    },
    10: {
      positive: {
        tr: { behavior: "Kariyer devrimi, yenilikçi liderlik", effect: "Radikal başarı", suggestion: "Cesur kararlar al" },
        en: { behavior: "Career revolution, innovative leadership", effect: "Radical success", suggestion: "Make bold decisions" }
      },
      negative: {
        tr: { behavior: "Kariyer istikrarsızlığı", effect: "Ani değişimler", suggestion: "Planı esnek tut" },
        en: { behavior: "Career instability", effect: "Sudden changes", suggestion: "Keep plan flexible" }
      }
    },
    11: {
      positive: {
        tr: { behavior: "Yenilikçi topluluklar, devrimci fikirler", effect: "Geleceği şekillendirme", suggestion: "Bir harekete katıl" },
        en: { behavior: "Innovative communities, revolutionary ideas", effect: "Shaping the future", suggestion: "Join a movement" }
      },
      negative: {
        tr: { behavior: "Aşırı radikal, arkadaş kaybı", effect: "Yalnızlaşma", suggestion: "Denge bul" },
        en: { behavior: "Overly radical, friend loss", effect: "Isolation", suggestion: "Find balance" }
      }
    },
    12: {
      positive: {
        tr: { behavior: "Spiritüel uyanış, bilinçaltı keşfi", effect: "Derin özgürleşme", suggestion: "Alternatif terapiler dene" },
        en: { behavior: "Spiritual awakening, subconscious discovery", effect: "Deep liberation", suggestion: "Try alternative therapies" }
      },
      negative: {
        tr: { behavior: "Kaçış, kaotik bilinçaltı", effect: "İstikrarsızlık", suggestion: "Topraklan" },
        en: { behavior: "Escape, chaotic subconscious", effect: "Instability", suggestion: "Stay grounded" }
      }
    }
  },
  Neptune: {
    1: {
      positive: {
        tr: { behavior: "Sezgisel, sanatsal, empatik", effect: "İlham verici varlık, şifa", suggestion: "Sanatsal ifadeye yönel" },
        en: { behavior: "Intuitive, artistic, empathic", effect: "Inspiring presence, healing", suggestion: "Turn to artistic expression" }
      },
      negative: {
        tr: { behavior: "Kimlik bulanıklığı, yanılsama", effect: "Kendin olamamak", suggestion: "Sınırları netleştir" },
        en: { behavior: "Identity fog, illusion", effect: "Cannot be yourself", suggestion: "Clarify boundaries" }
      }
    },
    2: {
      positive: {
        tr: { behavior: "Spiritüel değerler, sanatsal gelir", effect: "İlham verici kazançlar", suggestion: "Yaratıcı işlere yönel" },
        en: { behavior: "Spiritual values, artistic income", effect: "Inspiring gains", suggestion: "Turn to creative work" }
      },
      negative: {
        tr: { behavior: "Finansal yanılsama, kayıplar", effect: "Maddi belirsizlik", suggestion: "Danışman al" },
        en: { behavior: "Financial illusion, losses", effect: "Material uncertainty", suggestion: "Get advisor" }
      }
    },
    3: {
      positive: {
        tr: { behavior: "Şiirsel iletişim, sezgisel anlayış", effect: "Yaratıcı ilham", suggestion: "Yazı yaz veya şiir oku" },
        en: { behavior: "Poetic communication, intuitive understanding", effect: "Creative inspiration", suggestion: "Write or read poetry" }
      },
      negative: {
        tr: { behavior: "Bulanık iletişim, yanlış anlama", effect: "Kafa karışıklığı", suggestion: "Netlik iste" },
        en: { behavior: "Foggy communication, misunderstanding", effect: "Confusion", suggestion: "Ask for clarity" }
      }
    },
    4: {
      positive: {
        tr: { behavior: "Rüya gibi ev, spiritüel aile", effect: "İç huzur", suggestion: "Evi kutsal alan yap" },
        en: { behavior: "Dreamy home, spiritual family", effect: "Inner peace", suggestion: "Make home a sacred space" }
      },
      negative: {
        tr: { behavior: "Aile yanılsamaları, belirsizlik", effect: "Köksüzlük", suggestion: "Gerçekleri gör" },
        en: { behavior: "Family illusions, uncertainty", effect: "Rootlessness", suggestion: "See reality" }
      }
    },
    5: {
      positive: {
        tr: { behavior: "Romantik rüya, sanatsal yaratıcılık", effect: "İlham dolu aşk", suggestion: "Sanat yap" },
        en: { behavior: "Romantic dream, artistic creativity", effect: "Inspired love", suggestion: "Create art" }
      },
      negative: {
        tr: { behavior: "Gerçekçi olmayan aşk, aldatılma", effect: "Hayal kırıklığı", suggestion: "Gerçekçi ol" },
        en: { behavior: "Unrealistic love, deception", effect: "Disappointment", suggestion: "Be realistic" }
      }
    },
    6: {
      positive: {
        tr: { behavior: "Şifalı hizmet, spiritüel sağlık", effect: "Holistic iyileşme", suggestion: "Alternatif tıbbı dene" },
        en: { behavior: "Healing service, spiritual health", effect: "Holistic healing", suggestion: "Try alternative medicine" }
      },
      negative: {
        tr: { behavior: "İş bulanıklığı, sağlık yanılsaması", effect: "Belirsizlik", suggestion: "Teşhis koy" },
        en: { behavior: "Work fog, health illusion", effect: "Uncertainty", suggestion: "Get diagnosis" }
      }
    },
    7: {
      positive: {
        tr: { behavior: "Ruh eşi bağı, spiritüel ilişki", effect: "Derin birlik", suggestion: "Spiritüel aktivite paylaş" },
        en: { behavior: "Soulmate bond, spiritual relationship", effect: "Deep unity", suggestion: "Share spiritual activity" }
      },
      negative: {
        tr: { behavior: "İlişki yanılsaması, bağımlılık", effect: "Aldatılma riski", suggestion: "Gözlerini aç" },
        en: { behavior: "Relationship illusion, dependency", effect: "Deception risk", suggestion: "Open your eyes" }
      }
    },
    8: {
      positive: {
        tr: { behavior: "Derin şifa, spiritüel dönüşüm", effect: "Transandantal deneyim", suggestion: "Derin meditasyon yap" },
        en: { behavior: "Deep healing, spiritual transformation", effect: "Transcendental experience", suggestion: "Do deep meditation" }
      },
      negative: {
        tr: { behavior: "Gizli bağımlılıklar, belirsizlik", effect: "Kayıp, manipülasyon", suggestion: "Dürüst ol" },
        en: { behavior: "Hidden addictions, uncertainty", effect: "Loss, manipulation", suggestion: "Be honest" }
      }
    },
    9: {
      positive: {
        tr: { behavior: "Spiritüel arayış, mistik öğrenme", effect: "Evrensel bilgelik", suggestion: "Spiritüel seyahat planla" },
        en: { behavior: "Spiritual search, mystical learning", effect: "Universal wisdom", suggestion: "Plan spiritual travel" }
      },
      negative: {
        tr: { behavior: "Aşırı idealizm, gerçeklikten kopma", effect: "Yanılsama", suggestion: "Ayakları yere bas" },
        en: { behavior: "Excessive idealism, disconnection", effect: "Illusion", suggestion: "Stay grounded" }
      }
    },
    10: {
      positive: {
        tr: { behavior: "İlham verici liderlik, sanatsal kariyer", effect: "Vizyoner başarı", suggestion: "Hayalini kariyer yap" },
        en: { behavior: "Inspiring leadership, artistic career", effect: "Visionary success", suggestion: "Make dream your career" }
      },
      negative: {
        tr: { behavior: "Kariyer yanılsaması, skandal riski", effect: "İtibar kaybı", suggestion: "Şeffaf ol" },
        en: { behavior: "Career illusion, scandal risk", effect: "Reputation loss", suggestion: "Be transparent" }
      }
    },
    11: {
      positive: {
        tr: { behavior: "İdealist topluluklar, hayalci dostlar", effect: "Ortak vizyon", suggestion: "Spiritüel gruba katıl" },
        en: { behavior: "Idealist communities, dreamy friends", effect: "Shared vision", suggestion: "Join spiritual group" }
      },
      negative: {
        tr: { behavior: "Yanlış arkadaşlar, yanıltıcı gruplar", effect: "Hayal kırıklığı", suggestion: "Dikkatli ol" },
        en: { behavior: "Wrong friends, deceptive groups", effect: "Disappointment", suggestion: "Be careful" }
      }
    },
    12: {
      positive: {
        tr: { behavior: "Derin spiritüellik, mistik deneyim", effect: "Evrenle birlik", suggestion: "İnzivaya çekil" },
        en: { behavior: "Deep spirituality, mystical experience", effect: "Unity with universe", suggestion: "Retreat" }
      },
      negative: {
        tr: { behavior: "Kaçış, bağımlılık, kurban psikolojisi", effect: "Kaybolmuşluk", suggestion: "Yardım al" },
        en: { behavior: "Escape, addiction, victim mentality", effect: "Lost feeling", suggestion: "Get help" }
      }
    }
  },
  Pluto: {
    1: {
      positive: {
        tr: { behavior: "Dönüşüm gücü, karizmatik varlık", effect: "Yeniden doğuş, güç", suggestion: "Korkusuzca değiş" },
        en: { behavior: "Transformation power, charismatic presence", effect: "Rebirth, power", suggestion: "Change fearlessly" }
      },
      negative: {
        tr: { behavior: "Kontrol takıntısı, yoğunluk", effect: "Güç savaşları", suggestion: "Bırakma pratiği yap" },
        en: { behavior: "Control obsession, intensity", effect: "Power struggles", suggestion: "Practice letting go" }
      }
    },
    2: {
      positive: {
        tr: { behavior: "Finansal dönüşüm, derin değer bilinci", effect: "Güçlü kaynaklar", suggestion: "Yatırımları yeniden yapılandır" },
        en: { behavior: "Financial transformation, deep value awareness", effect: "Powerful resources", suggestion: "Restructure investments" }
      },
      negative: {
        tr: { behavior: "Sahiplenme, maddi obsesyon", effect: "Kayıp ve yeniden kazanç döngüsü", suggestion: "Tutkunumu kontrol et" },
        en: { behavior: "Possessiveness, material obsession", effect: "Loss and gain cycle", suggestion: "Control attachment" }
      }
    },
    3: {
      positive: {
        tr: { behavior: "Derin araştırma, dönüştürücü iletişim", effect: "Gerçekleri ortaya çıkarma", suggestion: "Derinlemesine araştır" },
        en: { behavior: "Deep research, transformative communication", effect: "Revealing truths", suggestion: "Research in depth" }
      },
      negative: {
        tr: { behavior: "Obsesif düşünceler, manipülatif dil", effect: "Kardeş çatışmaları", suggestion: "Dürüst ol" },
        en: { behavior: "Obsessive thoughts, manipulative speech", effect: "Sibling conflicts", suggestion: "Be honest" }
      }
    },
    4: {
      positive: {
        tr: { behavior: "Ailevi dönüşüm, kök şifası", effect: "Yeni başlangıç", suggestion: "Aile terapisi düşün" },
        en: { behavior: "Family transformation, root healing", effect: "New beginning", suggestion: "Consider family therapy" }
      },
      negative: {
        tr: { behavior: "Ev içi güç savaşları, geçmiş travmalar", effect: "Kriz", suggestion: "Profesyonel destek al" },
        en: { behavior: "Home power struggles, past traumas", effect: "Crisis", suggestion: "Get professional support" }
      }
    },
    5: {
      positive: {
        tr: { behavior: "Tutkulu yaratıcılık, dönüştürücü aşk", effect: "Yoğun deneyimler", suggestion: "Sanatla dönüş" },
        en: { behavior: "Passionate creativity, transformative love", effect: "Intense experiences", suggestion: "Transform through art" }
      },
      negative: {
        tr: { behavior: "Obsesif aşk, kontrol eden ilişki", effect: "Drama, kayıp", suggestion: "Sağlıklı sınırlar koy" },
        en: { behavior: "Obsessive love, controlling relationship", effect: "Drama, loss", suggestion: "Set healthy boundaries" }
      }
    },
    6: {
      positive: {
        tr: { behavior: "İş dönüşümü, sağlık yenilenmesi", effect: "Güçlü değişim", suggestion: "Rutinleri kökten değiştir" },
        en: { behavior: "Work transformation, health renewal", effect: "Powerful change", suggestion: "Radically change routines" }
      },
      negative: {
        tr: { behavior: "İş yerinde güç oyunları, sağlık krizi", effect: "Stres", suggestion: "Kendine iyi bak" },
        en: { behavior: "Power games at work, health crisis", effect: "Stress", suggestion: "Take care of yourself" }
      }
    },
    7: {
      positive: {
        tr: { behavior: "İlişkide dönüşüm, derin bağ", effect: "Güçlü birliktelik", suggestion: "Birlikte terapi düşün" },
        en: { behavior: "Transformation in relationship, deep bond", effect: "Powerful union", suggestion: "Consider couples therapy" }
      },
      negative: {
        tr: { behavior: "İlişkide güç savaşları, manipülasyon", effect: "Yıkıcı döngüler", suggestion: "Dürüst ol ve sınır koy" },
        en: { behavior: "Power struggles in relationship, manipulation", effect: "Destructive cycles", suggestion: "Be honest and set boundaries" }
      }
    },
    8: {
      positive: {
        tr: { behavior: "Derin dönüşüm, ruhsal güç", effect: "Yeniden doğuş", suggestion: "Gölge çalışması yap" },
        en: { behavior: "Deep transformation, spiritual power", effect: "Rebirth", suggestion: "Do shadow work" }
      },
      negative: {
        tr: { behavior: "Obsesyon, kontrol, gizli krizler", effect: "Yoğun mücadele", suggestion: "Profesyonel yardım al" },
        en: { behavior: "Obsession, control, hidden crises", effect: "Intense struggle", suggestion: "Get professional help" }
      }
    },
    9: {
      positive: {
        tr: { behavior: "Felsefi dönüşüm, derin öğrenme", effect: "Bilgelik, uyanış", suggestion: "Dünya görüşünü yeniden şekillendir" },
        en: { behavior: "Philosophical transformation, deep learning", effect: "Wisdom, awakening", suggestion: "Reshape worldview" }
      },
      negative: {
        tr: { behavior: "Fanatizm, ideolojik savaşlar", effect: "Çatışma", suggestion: "Açık fikirli ol" },
        en: { behavior: "Fanaticism, ideological wars", effect: "Conflict", suggestion: "Be open-minded" }
      }
    },
    10: {
      positive: {
        tr: { behavior: "Kariyer dönüşümü, güçlü liderlik", effect: "Kalıcı etki", suggestion: "Gücünü sorumlu kullan" },
        en: { behavior: "Career transformation, powerful leadership", effect: "Lasting impact", suggestion: "Use power responsibly" }
      },
      negative: {
        tr: { behavior: "Otoriteyle çatışma, kariyer krizi", effect: "Düşüş ve yükseliş", suggestion: "Adaptasyon öğren" },
        en: { behavior: "Conflict with authority, career crisis", effect: "Fall and rise", suggestion: "Learn adaptation" }
      }
    },
    11: {
      positive: {
        tr: { behavior: "Toplumsal dönüşüm, güçlü ağlar", effect: "Değişimi başlatma", suggestion: "Bir harekete öncülük et" },
        en: { behavior: "Social transformation, powerful networks", effect: "Initiating change", suggestion: "Lead a movement" }
      },
      negative: {
        tr: { behavior: "Grup içi güç savaşları, manipülasyon", effect: "Arkadaş kaybı", suggestion: "Dürüstlükle ilerle" },
        en: { behavior: "Power struggles within groups, manipulation", effect: "Friend loss", suggestion: "Proceed with honesty" }
      }
    },
    12: {
      positive: {
        tr: { behavior: "Bilinçaltı dönüşümü, spiritüel güç", effect: "Derin şifa", suggestion: "Terapi veya meditasyon yoğunlaştır" },
        en: { behavior: "Subconscious transformation, spiritual power", effect: "Deep healing", suggestion: "Intensify therapy or meditation" }
      },
      negative: {
        tr: { behavior: "Gizli korkular, kendini sabote etme", effect: "Karanlık dönem", suggestion: "Işığa yürü" },
        en: { behavior: "Hidden fears, self-sabotage", effect: "Dark period", suggestion: "Walk toward light" }
      }
    }
  }
};

interface TransitHeadlinesDB {
  [transitPlanet: string]: {
    [natalPlanet: string]: {
      [aspect: string]: {
        tr: string;
        en: string;
      };
    };
  };
}

const TRANSIT_HEADLINES: TransitHeadlinesDB = {
  Sun: {
    Moon: {
      conjunction: { tr: "Duygusal Aydınlanma", en: "Emotional Illumination" },
      opposition: { tr: "İç-Dış Çatışması", en: "Inner-Outer Conflict" },
      trine: { tr: "Duygusal Uyum", en: "Emotional Harmony" },
      square: { tr: "Ego ve Duygu Krizi", en: "Ego vs Emotion Crisis" },
      sextile: { tr: "Duygusal Netlik", en: "Emotional Clarity" }
    },
    Mercury: {
      conjunction: { tr: "Zihinsel Parlaklık", en: "Mental Brilliance" },
      opposition: { tr: "Düşünce Çatışması", en: "Thought Conflict" },
      trine: { tr: "Akıcı İletişim", en: "Flowing Communication" },
      square: { tr: "İfade Engeli", en: "Expression Block" },
      sextile: { tr: "Yaratıcı Fikirler", en: "Creative Ideas" }
    },
    Venus: {
      conjunction: { tr: "Aşk Işığı", en: "Love Light" },
      opposition: { tr: "Değer Çatışması", en: "Value Conflict" },
      trine: { tr: "Romantik Akış", en: "Romantic Flow" },
      square: { tr: "Aşkta Gerilim", en: "Tension in Love" },
      sextile: { tr: "Sosyal Çekicilik", en: "Social Charm" }
    },
    Mars: {
      conjunction: { tr: "Enerji Patlaması", en: "Energy Burst" },
      opposition: { tr: "İrade Savaşı", en: "Will Power Battle" },
      trine: { tr: "Cesur Adımlar", en: "Bold Steps" },
      square: { tr: "Öfke Krizi", en: "Anger Crisis" },
      sextile: { tr: "Harekete Geç", en: "Take Action" }
    },
    Jupiter: {
      conjunction: { tr: "Şans Kapısı", en: "Door of Luck" },
      opposition: { tr: "Aşırılık Uyarısı", en: "Excess Warning" },
      trine: { tr: "Bolluk Akışı", en: "Abundance Flow" },
      square: { tr: "Egona Yenik Düşme", en: "Check Your Ego" },
      sextile: { tr: "Büyüme Fırsatı", en: "Growth Opportunity" }
    },
    Saturn: {
      conjunction: { tr: "Olgunluk Sınavı", en: "Maturity Test" },
      opposition: { tr: "Otorite ile Yüzleşme", en: "Authority Confrontation" },
      trine: { tr: "Sağlam Temeller", en: "Solid Foundations" },
      square: { tr: "Engellerle Savaş", en: "Fighting Obstacles" },
      sextile: { tr: "Disiplinli İlerleme", en: "Disciplined Progress" }
    },
    Uranus: {
      conjunction: { tr: "Kimlik Devrimi", en: "Identity Revolution" },
      opposition: { tr: "Beklenmedik Kriz", en: "Unexpected Crisis" },
      trine: { tr: "Özgürleşme Zamanı", en: "Time to Break Free" },
      square: { tr: "Şok Dalgası", en: "Shock Wave" },
      sextile: { tr: "Yenilikçi Atılım", en: "Innovative Breakthrough" }
    },
    Neptune: {
      conjunction: { tr: "Ruhsal Uyanış", en: "Spiritual Awakening" },
      opposition: { tr: "Gerçeklik Bulanıklığı", en: "Reality Blur" },
      trine: { tr: "İlham Akışı", en: "Inspiration Flow" },
      square: { tr: "Hayal Kırıklığı", en: "Disillusion" },
      sextile: { tr: "Yaratıcı Vizyon", en: "Creative Vision" }
    },
    Pluto: {
      conjunction: { tr: "Derin Dönüşüm", en: "Deep Transformation" },
      opposition: { tr: "Güç Savaşı", en: "Power Struggle" },
      trine: { tr: "İçsel Güç", en: "Inner Power" },
      square: { tr: "Kontrol Krizi", en: "Control Crisis" },
      sextile: { tr: "Dönüşüm Fırsatı", en: "Transformation Chance" }
    },
    Sun: {
      conjunction: { tr: "Benlik Odağı", en: "Self Focus" },
      opposition: { tr: "Kimlik Çatışması", en: "Identity Conflict" },
      trine: { tr: "Özgüven Akışı", en: "Confidence Flow" },
      square: { tr: "Ego Krizi", en: "Ego Crisis" },
      sextile: { tr: "Kişisel Gelişim", en: "Personal Growth" }
    }
  },
  Moon: {
    Sun: {
      conjunction: { tr: "Duygusal Başlangıç", en: "Emotional Beginning" },
      opposition: { tr: "İç Çatışma", en: "Inner Conflict" },
      trine: { tr: "Ruh Huzuru", en: "Soul Peace" },
      square: { tr: "Hassas Dönem", en: "Sensitive Period" },
      sextile: { tr: "Duygusal Denge", en: "Emotional Balance" }
    },
    Moon: {
      conjunction: { tr: "Duygusal Yoğunluk", en: "Emotional Intensity" },
      opposition: { tr: "Duygu Fırtınası", en: "Emotional Storm" },
      trine: { tr: "İç Huzur", en: "Inner Peace" },
      square: { tr: "Ruh Hali Değişimi", en: "Mood Swings" },
      sextile: { tr: "Duygusal Açıklık", en: "Emotional Openness" }
    },
    Mercury: {
      conjunction: { tr: "Sezgisel Düşünce", en: "Intuitive Thinking" },
      opposition: { tr: "Duygu-Mantık Çatışması", en: "Heart-Mind Conflict" },
      trine: { tr: "Akıcı İfade", en: "Fluid Expression" },
      square: { tr: "Zihinsel Huzursuzluk", en: "Mental Restlessness" },
      sextile: { tr: "Empatik İletişim", en: "Empathic Communication" }
    },
    Venus: {
      conjunction: { tr: "Sevgi Dolu Anlar", en: "Loving Moments" },
      opposition: { tr: "İlişki Gerginliği", en: "Relationship Tension" },
      trine: { tr: "Romantik Huzur", en: "Romantic Peace" },
      square: { tr: "Duygusal İhtiyaçlar", en: "Emotional Needs" },
      sextile: { tr: "Şefkat Zamanı", en: "Time for Tenderness" }
    },
    Mars: {
      conjunction: { tr: "Duygusal Ateş", en: "Emotional Fire" },
      opposition: { tr: "Tepkisellik Uyarısı", en: "Reactivity Warning" },
      trine: { tr: "Cesur Duygular", en: "Brave Emotions" },
      square: { tr: "Öfke Patlaması", en: "Anger Outburst" },
      sextile: { tr: "Duygusal Güç", en: "Emotional Strength" }
    },
    Jupiter: {
      conjunction: { tr: "Duygusal Genişleme", en: "Emotional Expansion" },
      opposition: { tr: "Aşırı Duygusallık", en: "Over-Emotionality" },
      trine: { tr: "Şükran Zamanı", en: "Time for Gratitude" },
      square: { tr: "Duygusal Abartı", en: "Emotional Exaggeration" },
      sextile: { tr: "İyimser Ruh Hali", en: "Optimistic Mood" }
    },
    Saturn: {
      conjunction: { tr: "Duygusal Olgunluk", en: "Emotional Maturity" },
      opposition: { tr: "Duygusal Sorumluluk", en: "Emotional Responsibility" },
      trine: { tr: "Dengeli Duygular", en: "Balanced Emotions" },
      square: { tr: "Duygusal Baskı", en: "Emotional Pressure" },
      sextile: { tr: "Duygusal Disiplin", en: "Emotional Discipline" }
    },
    Uranus: {
      conjunction: { tr: "Ani Duygu Değişimi", en: "Sudden Mood Change" },
      opposition: { tr: "Duygusal Şok", en: "Emotional Shock" },
      trine: { tr: "Özgür Duygular", en: "Free Emotions" },
      square: { tr: "Huzursuz Ruh", en: "Restless Soul" },
      sextile: { tr: "Duygusal Yenilenme", en: "Emotional Renewal" }
    },
    Neptune: {
      conjunction: { tr: "Rüya Gibi", en: "Like a Dream" },
      opposition: { tr: "Duygusal Yanılsama", en: "Emotional Illusion" },
      trine: { tr: "Sezgisel Akış", en: "Intuitive Flow" },
      square: { tr: "Kafa Karışıklığı", en: "Confusion" },
      sextile: { tr: "Spiritüel Bağ", en: "Spiritual Connection" }
    },
    Pluto: {
      conjunction: { tr: "Derin Duygusal Dönüşüm", en: "Deep Emotional Shift" },
      opposition: { tr: "Yoğun Duygular", en: "Intense Emotions" },
      trine: { tr: "Duygusal Güçlenme", en: "Emotional Empowerment" },
      square: { tr: "Obsesif Duygular", en: "Obsessive Emotions" },
      sextile: { tr: "Duygusal Şifalanma", en: "Emotional Healing" }
    }
  },
  Mercury: {
    Sun: {
      conjunction: { tr: "Zihinsel Aydınlanma", en: "Mental Enlightenment" },
      opposition: { tr: "Düşünce Çatışması", en: "Thought Conflict" },
      trine: { tr: "Net İfade", en: "Clear Expression" },
      square: { tr: "İletişim Engeli", en: "Communication Block" },
      sextile: { tr: "Yaratıcı Fikirler", en: "Creative Ideas" }
    },
    Moon: {
      conjunction: { tr: "Sezgisel Zeka", en: "Intuitive Intelligence" },
      opposition: { tr: "Mantık-Duygu Gerilimi", en: "Logic-Emotion Tension" },
      trine: { tr: "Empatik Anlayış", en: "Empathic Understanding" },
      square: { tr: "Zihinsel Yorgunluk", en: "Mental Fatigue" },
      sextile: { tr: "Duygusal Zeka", en: "Emotional Intelligence" }
    },
    Mercury: {
      conjunction: { tr: "Zihinsel Odak", en: "Mental Focus" },
      opposition: { tr: "Fikir Çatışması", en: "Idea Conflict" },
      trine: { tr: "Keskin Zeka", en: "Sharp Mind" },
      square: { tr: "Aşırı Düşünme", en: "Overthinking" },
      sextile: { tr: "Hızlı Öğrenme", en: "Quick Learning" }
    },
    Venus: {
      conjunction: { tr: "Tatlı Sözler", en: "Sweet Words" },
      opposition: { tr: "Değer Tartışması", en: "Value Debate" },
      trine: { tr: "Zarif İletişim", en: "Graceful Communication" },
      square: { tr: "Yanlış Anlaşılma", en: "Misunderstanding" },
      sextile: { tr: "Sosyal Zerafet", en: "Social Grace" }
    },
    Mars: {
      conjunction: { tr: "Keskin Dil", en: "Sharp Tongue" },
      opposition: { tr: "Söz Kavgası", en: "Word Battle" },
      trine: { tr: "İkna Gücü", en: "Persuasive Power" },
      square: { tr: "Agresif İletişim", en: "Aggressive Communication" },
      sextile: { tr: "Cesur Fikirler", en: "Bold Ideas" }
    },
    Jupiter: {
      conjunction: { tr: "Büyük Fikirler", en: "Big Ideas" },
      opposition: { tr: "Abartılı Söylemler", en: "Exaggerated Claims" },
      trine: { tr: "Felsefi Derinlik", en: "Philosophical Depth" },
      square: { tr: "Detay Kaçırma", en: "Missing Details" },
      sextile: { tr: "Öğrenme Fırsatı", en: "Learning Opportunity" }
    },
    Saturn: {
      conjunction: { tr: "Ciddi Düşünceler", en: "Serious Thoughts" },
      opposition: { tr: "Otorite ile İletişim", en: "Authority Communication" },
      trine: { tr: "Yapılandırılmış Zihin", en: "Structured Mind" },
      square: { tr: "Zihinsel Blokaj", en: "Mental Block" },
      sextile: { tr: "Bilgelik Kazanımı", en: "Wisdom Gained" }
    },
    Uranus: {
      conjunction: { tr: "Dahi Fikirler", en: "Genius Ideas" },
      opposition: { tr: "Şok Edici Haberler", en: "Shocking News" },
      trine: { tr: "Yenilikçi Düşünce", en: "Innovative Thinking" },
      square: { tr: "Zihinsel Kaos", en: "Mental Chaos" },
      sextile: { tr: "Orijinal Bakış", en: "Original Perspective" }
    },
    Neptune: {
      conjunction: { tr: "Hayalci Zihin", en: "Dreamy Mind" },
      opposition: { tr: "İletişim Bulanıklığı", en: "Communication Blur" },
      trine: { tr: "Şiirsel İfade", en: "Poetic Expression" },
      square: { tr: "Aldatıcı Bilgi", en: "Deceptive Information" },
      sextile: { tr: "Sanatsal İlham", en: "Artistic Inspiration" }
    },
    Pluto: {
      conjunction: { tr: "Dönüştürücü Söz", en: "Transformative Words" },
      opposition: { tr: "Zihinsel Güç Savaşı", en: "Mental Power Struggle" },
      trine: { tr: "Derin Kavrayış", en: "Deep Understanding" },
      square: { tr: "Obsesif Düşünce", en: "Obsessive Thoughts" },
      sextile: { tr: "Araştırmacı Zeka", en: "Investigative Mind" }
    }
  },
  Venus: {
    Sun: {
      conjunction: { tr: "Aşk Parıltısı", en: "Love Sparkle" },
      opposition: { tr: "Değer Çatışması", en: "Value Conflict" },
      trine: { tr: "Çekicilik Zamanı", en: "Time of Attraction" },
      square: { tr: "Aşkta Sınav", en: "Test in Love" },
      sextile: { tr: "Sosyal Başarı", en: "Social Success" }
    },
    Moon: {
      conjunction: { tr: "Şefkat Dolu", en: "Full of Tenderness" },
      opposition: { tr: "Duygusal Talep", en: "Emotional Demand" },
      trine: { tr: "Romantik Huzur", en: "Romantic Peace" },
      square: { tr: "Sevgi İhtiyacı", en: "Need for Love" },
      sextile: { tr: "Duygusal Bağ", en: "Emotional Bond" }
    },
    Mercury: {
      conjunction: { tr: "Tatlı Sözler", en: "Sweet Words" },
      opposition: { tr: "İlişki Tartışması", en: "Relationship Discussion" },
      trine: { tr: "Uyumlu Diyalog", en: "Harmonious Dialogue" },
      square: { tr: "Yanlış Anlaşılma", en: "Misunderstanding" },
      sextile: { tr: "Çekici İletişim", en: "Charming Communication" }
    },
    Venus: {
      conjunction: { tr: "Aşk Zirvede", en: "Love at Peak" },
      opposition: { tr: "İlişki Aynası", en: "Relationship Mirror" },
      trine: { tr: "Güzellik Akışı", en: "Beauty Flow" },
      square: { tr: "Değer Krizi", en: "Value Crisis" },
      sextile: { tr: "Sosyal Armoni", en: "Social Harmony" }
    },
    Mars: {
      conjunction: { tr: "Tutku Ateşi", en: "Passion Fire" },
      opposition: { tr: "Çekim-İtim", en: "Push-Pull" },
      trine: { tr: "Tutkulu Uyum", en: "Passionate Harmony" },
      square: { tr: "Aşk Savaşı", en: "Love War" },
      sextile: { tr: "Romantik Macera", en: "Romantic Adventure" }
    },
    Jupiter: {
      conjunction: { tr: "Bolluk ve Aşk", en: "Abundance and Love" },
      opposition: { tr: "Aşırı Beklenti", en: "Excessive Expectations" },
      trine: { tr: "Şanslı Aşk", en: "Lucky Love" },
      square: { tr: "Savurganlık Riski", en: "Risk of Extravagance" },
      sextile: { tr: "Sosyal Genişleme", en: "Social Expansion" }
    },
    Saturn: {
      conjunction: { tr: "Ciddi İlişkiler", en: "Serious Relationships" },
      opposition: { tr: "İlişki Sınavı", en: "Relationship Test" },
      trine: { tr: "Kalıcı Bağlar", en: "Lasting Bonds" },
      square: { tr: "Aşkta Engeller", en: "Obstacles in Love" },
      sextile: { tr: "Olgun Sevgi", en: "Mature Love" }
    },
    Uranus: {
      conjunction: { tr: "Sıra Dışı Aşk", en: "Unconventional Love" },
      opposition: { tr: "Ani Çekim", en: "Sudden Attraction" },
      trine: { tr: "Özgür Sevgi", en: "Free Love" },
      square: { tr: "İlişkide Şok", en: "Relationship Shock" },
      sextile: { tr: "Heyecanlı Flört", en: "Exciting Flirt" }
    },
    Neptune: {
      conjunction: { tr: "Ruhani Aşk", en: "Soulmate Love" },
      opposition: { tr: "Aşk İllüzyonu", en: "Love Illusion" },
      trine: { tr: "Romantik Rüya", en: "Romantic Dream" },
      square: { tr: "Aldatıcı Çekim", en: "Deceptive Attraction" },
      sextile: { tr: "Sanatsal Aşk", en: "Artistic Love" }
    },
    Pluto: {
      conjunction: { tr: "Dönüştürücü Aşk", en: "Transformative Love" },
      opposition: { tr: "Obsesif Çekim", en: "Obsessive Attraction" },
      trine: { tr: "Derin Bağ", en: "Deep Bond" },
      square: { tr: "Kıskançlık Krizi", en: "Jealousy Crisis" },
      sextile: { tr: "Tutkulu Dönüşüm", en: "Passionate Transformation" }
    }
  },
  Mars: {
    Sun: {
      conjunction: { tr: "Güç Birleşimi", en: "Power Union" },
      opposition: { tr: "İrade Çatışması", en: "Will Conflict" },
      trine: { tr: "Başarı Enerjisi", en: "Success Energy" },
      square: { tr: "Öfke Patlaması", en: "Anger Explosion" },
      sextile: { tr: "Cesaret Zamanı", en: "Time for Courage" }
    },
    Moon: {
      conjunction: { tr: "Duygusal Ateş", en: "Emotional Fire" },
      opposition: { tr: "Tepkisel Davranış", en: "Reactive Behavior" },
      trine: { tr: "Koruyucu Güç", en: "Protective Strength" },
      square: { tr: "Sinirlilik", en: "Irritability" },
      sextile: { tr: "Duygusal Cesaret", en: "Emotional Courage" }
    },
    Mercury: {
      conjunction: { tr: "Keskin Zeka", en: "Sharp Wit" },
      opposition: { tr: "Söz Savaşı", en: "War of Words" },
      trine: { tr: "İkna Kabiliyeti", en: "Persuasion Ability" },
      square: { tr: "Agresif Dil", en: "Aggressive Language" },
      sextile: { tr: "Hızlı Karar", en: "Quick Decision" }
    },
    Venus: {
      conjunction: { tr: "Tutku Zirvesi", en: "Peak of Passion" },
      opposition: { tr: "Aşk-Savaş", en: "Love-War" },
      trine: { tr: "Çekici Enerji", en: "Attractive Energy" },
      square: { tr: "Duygusal Gerilim", en: "Emotional Tension" },
      sextile: { tr: "Romantik Cesaret", en: "Romantic Courage" }
    },
    Mars: {
      conjunction: { tr: "Enerji Patlaması", en: "Energy Explosion" },
      opposition: { tr: "Çatışma Riski", en: "Conflict Risk" },
      trine: { tr: "Güçlü Performans", en: "Strong Performance" },
      square: { tr: "Saldırganlık", en: "Aggression" },
      sextile: { tr: "Aktif Dönem", en: "Active Period" }
    },
    Jupiter: {
      conjunction: { tr: "Büyük Cesaret", en: "Great Courage" },
      opposition: { tr: "Aşırı Güven", en: "Over-Confidence" },
      trine: { tr: "Başarı Fırsatı", en: "Success Opportunity" },
      square: { tr: "Riskli Hamleler", en: "Risky Moves" },
      sextile: { tr: "Genişleyen Enerji", en: "Expanding Energy" }
    },
    Saturn: {
      conjunction: { tr: "Kontrollü Güç", en: "Controlled Power" },
      opposition: { tr: "Engellerle Mücadele", en: "Fighting Obstacles" },
      trine: { tr: "Disiplinli Eylem", en: "Disciplined Action" },
      square: { tr: "Frustrasyon", en: "Frustration" },
      sextile: { tr: "Stratejik Hareket", en: "Strategic Move" }
    },
    Uranus: {
      conjunction: { tr: "Beklenmedik Eylem", en: "Unexpected Action" },
      opposition: { tr: "Ani Kriz", en: "Sudden Crisis" },
      trine: { tr: "Yenilikçi Hamle", en: "Innovative Move" },
      square: { tr: "Kontrolsüz Enerji", en: "Uncontrolled Energy" },
      sextile: { tr: "Özgün Cesaret", en: "Original Courage" }
    },
    Neptune: {
      conjunction: { tr: "Bulanık Eylem", en: "Blurred Action" },
      opposition: { tr: "Motivasyon Kaybı", en: "Lost Motivation" },
      trine: { tr: "İlham Verici Hareket", en: "Inspired Action" },
      square: { tr: "Yanlış Yönlendirme", en: "Misdirection" },
      sextile: { tr: "Spiritüel Güç", en: "Spiritual Strength" }
    },
    Pluto: {
      conjunction: { tr: "Mutlak Güç", en: "Absolute Power" },
      opposition: { tr: "Güç Savaşı", en: "Power War" },
      trine: { tr: "Dönüştürücü Eylem", en: "Transformative Action" },
      square: { tr: "Kontrol Mücadelesi", en: "Control Struggle" },
      sextile: { tr: "Stratejik Dönüşüm", en: "Strategic Transformation" }
    }
  },
  Jupiter: {
    Sun: {
      conjunction: { tr: "Şans Kapısı", en: "Gate of Luck" },
      opposition: { tr: "Aşırılık Uyarısı", en: "Excess Warning" },
      trine: { tr: "Altın Dönem", en: "Golden Period" },
      square: { tr: "Büyüme Sancısı", en: "Growing Pains" },
      sextile: { tr: "Fırsat Penceresi", en: "Window of Opportunity" }
    },
    Moon: {
      conjunction: { tr: "Duygusal Bolluk", en: "Emotional Abundance" },
      opposition: { tr: "Aşırı Duygusallık", en: "Over-Emotionality" },
      trine: { tr: "İç Huzur", en: "Inner Peace" },
      square: { tr: "Duygusal Şişkinlik", en: "Emotional Bloating" },
      sextile: { tr: "İyimser Ruh", en: "Optimistic Spirit" }
    },
    Mercury: {
      conjunction: { tr: "Vizyoner Düşünce", en: "Visionary Thought" },
      opposition: { tr: "Abartılı Planlar", en: "Exaggerated Plans" },
      trine: { tr: "Bilgelik Akışı", en: "Wisdom Flow" },
      square: { tr: "Detay Körlüğü", en: "Detail Blindness" },
      sextile: { tr: "Büyük Fikirler", en: "Big Ideas" }
    },
    Venus: {
      conjunction: { tr: "Aşkta Şans", en: "Luck in Love" },
      opposition: { tr: "Aşırı Beklenti", en: "Excessive Expectations" },
      trine: { tr: "Romantik Bolluk", en: "Romantic Abundance" },
      square: { tr: "Değer Enflasyonu", en: "Value Inflation" },
      sextile: { tr: "Sosyal Genişleme", en: "Social Expansion" }
    },
    Mars: {
      conjunction: { tr: "Cesur Genişleme", en: "Bold Expansion" },
      opposition: { tr: "Aşırı Hırs", en: "Excessive Ambition" },
      trine: { tr: "Başarı Motivasyonu", en: "Success Motivation" },
      square: { tr: "Kontrolsüz Enerji", en: "Uncontrolled Energy" },
      sextile: { tr: "Aktif Fırsatlar", en: "Active Opportunities" }
    },
    Jupiter: {
      conjunction: { tr: "Büyük Genişleme", en: "Great Expansion" },
      opposition: { tr: "Aşırılık Zirvesi", en: "Peak of Excess" },
      trine: { tr: "Evrensel Destek", en: "Universal Support" },
      square: { tr: "Büyüme Krizi", en: "Growth Crisis" },
      sextile: { tr: "Şanslı Dönem", en: "Lucky Period" }
    },
    Saturn: {
      conjunction: { tr: "Dengeli Büyüme", en: "Balanced Growth" },
      opposition: { tr: "Genişleme-Kısıtlama", en: "Expansion-Restriction" },
      trine: { tr: "Kalıcı Başarı", en: "Lasting Success" },
      square: { tr: "İnanç Sınavı", en: "Faith Test" },
      sextile: { tr: "Gerçekçi Umutlar", en: "Realistic Hopes" }
    },
    Uranus: {
      conjunction: { tr: "Devrimci Fırsatlar", en: "Revolutionary Opportunities" },
      opposition: { tr: "Beklenmedik Şans", en: "Unexpected Luck" },
      trine: { tr: "Yenilikçi Büyüme", en: "Innovative Growth" },
      square: { tr: "Ani Değişimler", en: "Sudden Changes" },
      sextile: { tr: "Özgün Fırsatlar", en: "Unique Opportunities" }
    },
    Neptune: {
      conjunction: { tr: "Spiritüel Genişleme", en: "Spiritual Expansion" },
      opposition: { tr: "Hayali Umutlar", en: "Illusory Hopes" },
      trine: { tr: "İlahi Bereket", en: "Divine Blessing" },
      square: { tr: "Gerçeklik Kaybı", en: "Reality Loss" },
      sextile: { tr: "Ruhsal Büyüme", en: "Soul Growth" }
    },
    Pluto: {
      conjunction: { tr: "Dönüştürücü Şans", en: "Transformative Luck" },
      opposition: { tr: "Güç Genişlemesi", en: "Power Expansion" },
      trine: { tr: "Derin Zenginlik", en: "Deep Wealth" },
      square: { tr: "Aşırı Güç Hırsı", en: "Excessive Power Hunger" },
      sextile: { tr: "Stratejik Fırsat", en: "Strategic Opportunity" }
    }
  },
  Saturn: {
    Sun: {
      conjunction: { tr: "Ciddi Dönem", en: "Serious Period" },
      opposition: { tr: "Otorite Sınavı", en: "Authority Test" },
      trine: { tr: "Kalıcı Başarı", en: "Lasting Achievement" },
      square: { tr: "Engeller Zamanı", en: "Time of Obstacles" },
      sextile: { tr: "Disiplin Meyvesi", en: "Fruit of Discipline" }
    },
    Moon: {
      conjunction: { tr: "Duygusal Olgunluk", en: "Emotional Maturity" },
      opposition: { tr: "Duygusal Mesafe", en: "Emotional Distance" },
      trine: { tr: "Dengeli Duygular", en: "Balanced Emotions" },
      square: { tr: "Duygusal Baskı", en: "Emotional Pressure" },
      sextile: { tr: "Duygusal Yapılanma", en: "Emotional Structuring" }
    },
    Mercury: {
      conjunction: { tr: "Derin Düşünce", en: "Deep Thought" },
      opposition: { tr: "İletişim Engeli", en: "Communication Block" },
      trine: { tr: "Mantıklı Planlama", en: "Logical Planning" },
      square: { tr: "Zihinsel Yük", en: "Mental Burden" },
      sextile: { tr: "Pratik Zeka", en: "Practical Intelligence" }
    },
    Venus: {
      conjunction: { tr: "Ciddi Aşk", en: "Serious Love" },
      opposition: { tr: "İlişki Sınavı", en: "Relationship Test" },
      trine: { tr: "Kalıcı Sevgi", en: "Lasting Love" },
      square: { tr: "Aşkta Engel", en: "Obstacle in Love" },
      sextile: { tr: "Olgun İlişki", en: "Mature Relationship" }
    },
    Mars: {
      conjunction: { tr: "Kontrollü Güç", en: "Controlled Strength" },
      opposition: { tr: "Frustrasyon", en: "Frustration" },
      trine: { tr: "Disiplinli Eylem", en: "Disciplined Action" },
      square: { tr: "Engellenmiş Enerji", en: "Blocked Energy" },
      sextile: { tr: "Stratejik Hareket", en: "Strategic Movement" }
    },
    Jupiter: {
      conjunction: { tr: "Gerçekçi Büyüme", en: "Realistic Growth" },
      opposition: { tr: "Umut-Gerçek", en: "Hope vs Reality" },
      trine: { tr: "Kalıcı Genişleme", en: "Lasting Expansion" },
      square: { tr: "Büyüme Engeli", en: "Growth Obstacle" },
      sextile: { tr: "Dengeli İlerleme", en: "Balanced Progress" }
    },
    Saturn: {
      conjunction: { tr: "Satürn Dönüşü", en: "Saturn Return" },
      opposition: { tr: "Yapısal Kriz", en: "Structural Crisis" },
      trine: { tr: "Sağlam Temeller", en: "Solid Foundations" },
      square: { tr: "Sorumluluk Yükü", en: "Burden of Responsibility" },
      sextile: { tr: "Olgunlaşma", en: "Maturation" }
    },
    Uranus: {
      conjunction: { tr: "Yapı Yıkımı", en: "Structure Breakdown" },
      opposition: { tr: "Eski-Yeni Çatışması", en: "Old-New Conflict" },
      trine: { tr: "Yenilikçi Düzen", en: "Innovative Order" },
      square: { tr: "Kriz ve Değişim", en: "Crisis and Change" },
      sextile: { tr: "Kontrollü Değişim", en: "Controlled Change" }
    },
    Neptune: {
      conjunction: { tr: "Yapı Çözülmesi", en: "Structure Dissolution" },
      opposition: { tr: "Gerçeklik Sınavı", en: "Reality Test" },
      trine: { tr: "Spiritüel Yapı", en: "Spiritual Structure" },
      square: { tr: "Belirsizlik Krizi", en: "Uncertainty Crisis" },
      sextile: { tr: "Hayali Hedefler", en: "Ideal Goals" }
    },
    Pluto: {
      conjunction: { tr: "Derin Yapılanma", en: "Deep Restructuring" },
      opposition: { tr: "Güç-Yapı Çatışması", en: "Power-Structure Conflict" },
      trine: { tr: "Kalıcı Dönüşüm", en: "Lasting Transformation" },
      square: { tr: "Otorite Krizi", en: "Authority Crisis" },
      sextile: { tr: "Stratejik Yeniden Yapılanma", en: "Strategic Restructuring" }
    }
  },
  Uranus: {
    Sun: {
      conjunction: { tr: "Kimlik Devrimi", en: "Identity Revolution" },
      opposition: { tr: "Beklenmedik Değişim", en: "Unexpected Change" },
      trine: { tr: "Özgürleşme", en: "Liberation" },
      square: { tr: "Şok Dalgası", en: "Shock Wave" },
      sextile: { tr: "Yenilik Fırsatı", en: "Innovation Opportunity" }
    },
    Moon: {
      conjunction: { tr: "Duygusal Devrim", en: "Emotional Revolution" },
      opposition: { tr: "Ani Ruh Hali", en: "Sudden Mood" },
      trine: { tr: "Özgür Duygular", en: "Free Emotions" },
      square: { tr: "Huzursuz Ruh", en: "Restless Soul" },
      sextile: { tr: "Duygusal Yenilenme", en: "Emotional Renewal" }
    },
    Mercury: {
      conjunction: { tr: "Dahi Fikirler", en: "Genius Ideas" },
      opposition: { tr: "Zihinsel Şok", en: "Mental Shock" },
      trine: { tr: "Yenilikçi Düşünce", en: "Innovative Thinking" },
      square: { tr: "Kaotik Zihin", en: "Chaotic Mind" },
      sextile: { tr: "Özgün Bakış", en: "Original Perspective" }
    },
    Venus: {
      conjunction: { tr: "Elektrik Çekim", en: "Electric Attraction" },
      opposition: { tr: "İlişkide Şok", en: "Relationship Shock" },
      trine: { tr: "Özgür Aşk", en: "Free Love" },
      square: { tr: "Ani Kopuş", en: "Sudden Break" },
      sextile: { tr: "Heyecanlı Flört", en: "Exciting Romance" }
    },
    Mars: {
      conjunction: { tr: "Ani Eylem", en: "Sudden Action" },
      opposition: { tr: "Kontrolsüz Patlama", en: "Uncontrolled Explosion" },
      trine: { tr: "Yenilikçi Hareket", en: "Innovative Action" },
      square: { tr: "Kaza Riski", en: "Accident Risk" },
      sextile: { tr: "Cesur Değişim", en: "Bold Change" }
    },
    Jupiter: {
      conjunction: { tr: "Büyük Devrim", en: "Great Revolution" },
      opposition: { tr: "Ani Fırsatlar", en: "Sudden Opportunities" },
      trine: { tr: "Özgürlük Büyümesi", en: "Freedom Growth" },
      square: { tr: "Aşırı Değişim", en: "Excessive Change" },
      sextile: { tr: "Yenilikçi Genişleme", en: "Innovative Expansion" }
    },
    Saturn: {
      conjunction: { tr: "Yapı Devrimi", en: "Structure Revolution" },
      opposition: { tr: "Eski-Yeni Çatışması", en: "Old-New Clash" },
      trine: { tr: "Kontrollü Devrim", en: "Controlled Revolution" },
      square: { tr: "Gerilim ve Kırılma", en: "Tension and Breaking" },
      sextile: { tr: "Yenilikçi Yapılanma", en: "Innovative Structuring" }
    },
    Uranus: {
      conjunction: { tr: "Radikal Değişim", en: "Radical Change" },
      opposition: { tr: "Şok Üstüne Şok", en: "Shock After Shock" },
      trine: { tr: "Özgürleşme Dalgası", en: "Wave of Liberation" },
      square: { tr: "Kaotik Değişim", en: "Chaotic Change" },
      sextile: { tr: "Yenilik Fırsatları", en: "Innovation Opportunities" }
    },
    Neptune: {
      conjunction: { tr: "Ruhsal Devrim", en: "Spiritual Revolution" },
      opposition: { tr: "İlham-Kaos", en: "Inspiration-Chaos" },
      trine: { tr: "Özgür Spiritüellik", en: "Free Spirituality" },
      square: { tr: "Belirsiz Değişim", en: "Uncertain Change" },
      sextile: { tr: "Vizyoner Yenilik", en: "Visionary Innovation" }
    },
    Pluto: {
      conjunction: { tr: "Dönüşüm Devrimi", en: "Transformation Revolution" },
      opposition: { tr: "Güç Şoku", en: "Power Shock" },
      trine: { tr: "Derin Özgürlük", en: "Deep Freedom" },
      square: { tr: "Kontrol Kaybı", en: "Loss of Control" },
      sextile: { tr: "Stratejik Devrim", en: "Strategic Revolution" }
    }
  },
  Neptune: {
    Sun: {
      conjunction: { tr: "Ruhsal Uyanış", en: "Spiritual Awakening" },
      opposition: { tr: "Kimlik Bulanıklığı", en: "Identity Blur" },
      trine: { tr: "İlham Akışı", en: "Inspiration Flow" },
      square: { tr: "Hayal Kırıklığı", en: "Disillusionment" },
      sextile: { tr: "Yaratıcı Vizyon", en: "Creative Vision" }
    },
    Moon: {
      conjunction: { tr: "Rüya Gibi", en: "Dreamlike" },
      opposition: { tr: "Duygusal Yanılsama", en: "Emotional Illusion" },
      trine: { tr: "Sezgisel Akış", en: "Intuitive Flow" },
      square: { tr: "Duygusal Kafa Karışıklığı", en: "Emotional Confusion" },
      sextile: { tr: "Spiritüel Bağ", en: "Spiritual Connection" }
    },
    Mercury: {
      conjunction: { tr: "Şiirsel Zihin", en: "Poetic Mind" },
      opposition: { tr: "İletişim Bulanıklığı", en: "Communication Fog" },
      trine: { tr: "Sanatsal İfade", en: "Artistic Expression" },
      square: { tr: "Aldatıcı Düşünceler", en: "Deceptive Thoughts" },
      sextile: { tr: "Yaratıcı İlham", en: "Creative Inspiration" }
    },
    Venus: {
      conjunction: { tr: "İlahi Aşk", en: "Divine Love" },
      opposition: { tr: "Aşk Yanılsaması", en: "Love Illusion" },
      trine: { tr: "Romantik Rüya", en: "Romantic Dream" },
      square: { tr: "Aldatıcı Çekim", en: "Deceptive Attraction" },
      sextile: { tr: "Sanatsal Aşk", en: "Artistic Love" }
    },
    Mars: {
      conjunction: { tr: "Bulanık Eylem", en: "Foggy Action" },
      opposition: { tr: "Motivasyon Kaybı", en: "Lost Motivation" },
      trine: { tr: "İlham Verici Hareket", en: "Inspired Movement" },
      square: { tr: "Yanlış Yönlendirme", en: "Misdirection" },
      sextile: { tr: "Spiritüel Güç", en: "Spiritual Power" }
    },
    Jupiter: {
      conjunction: { tr: "Sınırsız Umut", en: "Boundless Hope" },
      opposition: { tr: "Aşırı İdealizm", en: "Excessive Idealism" },
      trine: { tr: "İlahi Bereket", en: "Divine Blessing" },
      square: { tr: "Gerçeklikten Kopuş", en: "Disconnection from Reality" },
      sextile: { tr: "Ruhsal Genişleme", en: "Soul Expansion" }
    },
    Saturn: {
      conjunction: { tr: "Hayal-Gerçek", en: "Dream-Reality" },
      opposition: { tr: "Yapı Erimesi", en: "Structure Melting" },
      trine: { tr: "Spiritüel Disiplin", en: "Spiritual Discipline" },
      square: { tr: "Belirsizlik Krizi", en: "Uncertainty Crisis" },
      sextile: { tr: "Hayali Yapılar", en: "Imaginary Structures" }
    },
    Uranus: {
      conjunction: { tr: "Ruhsal Devrim", en: "Spiritual Revolution" },
      opposition: { tr: "Kaotik İlham", en: "Chaotic Inspiration" },
      trine: { tr: "Vizyoner Özgürlük", en: "Visionary Freedom" },
      square: { tr: "Belirsiz Şok", en: "Uncertain Shock" },
      sextile: { tr: "Yenilikçi Ruhsallık", en: "Innovative Spirituality" }
    },
    Neptune: {
      conjunction: { tr: "Sonsuz Rüya", en: "Endless Dream" },
      opposition: { tr: "Yanılsama Zirvesi", en: "Illusion Peak" },
      trine: { tr: "Evrensel Birlik", en: "Universal Unity" },
      square: { tr: "Gerçeklik Kaybı", en: "Reality Loss" },
      sextile: { tr: "Spiritüel Akış", en: "Spiritual Flow" }
    },
    Pluto: {
      conjunction: { tr: "Derin Şifalanma", en: "Deep Healing" },
      opposition: { tr: "Bilinçaltı Krizi", en: "Subconscious Crisis" },
      trine: { tr: "Ruhsal Dönüşüm", en: "Soul Transformation" },
      square: { tr: "Gizli Güç Savaşı", en: "Hidden Power Struggle" },
      sextile: { tr: "Mistik Fırsat", en: "Mystic Opportunity" }
    }
  },
  Pluto: {
    Sun: {
      conjunction: { tr: "Kimlik Dönüşümü", en: "Identity Transformation" },
      opposition: { tr: "Güç Mücadelesi", en: "Power Struggle" },
      trine: { tr: "İçsel Güç", en: "Inner Power" },
      square: { tr: "Ego Krizi", en: "Ego Crisis" },
      sextile: { tr: "Dönüşüm Fırsatı", en: "Transformation Opportunity" }
    },
    Moon: {
      conjunction: { tr: "Duygusal Yeniden Doğuş", en: "Emotional Rebirth" },
      opposition: { tr: "Yoğun Duygular", en: "Intense Emotions" },
      trine: { tr: "Duygusal Güçlenme", en: "Emotional Empowerment" },
      square: { tr: "Obsesif Duygular", en: "Obsessive Emotions" },
      sextile: { tr: "Duygusal Şifa", en: "Emotional Healing" }
    },
    Mercury: {
      conjunction: { tr: "Dönüştürücü Fikirler", en: "Transformative Ideas" },
      opposition: { tr: "Zihinsel Güç Savaşı", en: "Mental Power War" },
      trine: { tr: "Derin Anlayış", en: "Deep Understanding" },
      square: { tr: "Obsesif Düşünceler", en: "Obsessive Thoughts" },
      sextile: { tr: "Araştırmacı Zeka", en: "Investigative Mind" }
    },
    Venus: {
      conjunction: { tr: "Tutkulu Dönüşüm", en: "Passionate Transformation" },
      opposition: { tr: "Obsesif Aşk", en: "Obsessive Love" },
      trine: { tr: "Derin Bağ", en: "Deep Connection" },
      square: { tr: "Kıskançlık", en: "Jealousy" },
      sextile: { tr: "Dönüştürücü Sevgi", en: "Transformative Love" }
    },
    Mars: {
      conjunction: { tr: "Mutlak Güç", en: "Absolute Power" },
      opposition: { tr: "Güç Savaşı", en: "Power Battle" },
      trine: { tr: "Stratejik Güç", en: "Strategic Power" },
      square: { tr: "Kontrol Mücadelesi", en: "Control Struggle" },
      sextile: { tr: "Güçlü İrade", en: "Strong Will" }
    },
    Jupiter: {
      conjunction: { tr: "Dönüştürücü Şans", en: "Transformative Fortune" },
      opposition: { tr: "Aşırı Güç", en: "Excessive Power" },
      trine: { tr: "Derin Zenginlik", en: "Deep Wealth" },
      square: { tr: "Güç Açgözlülüğü", en: "Power Greed" },
      sextile: { tr: "Stratejik Büyüme", en: "Strategic Growth" }
    },
    Saturn: {
      conjunction: { tr: "Yapısal Dönüşüm", en: "Structural Transformation" },
      opposition: { tr: "Otorite Krizi", en: "Authority Crisis" },
      trine: { tr: "Kalıcı Değişim", en: "Lasting Change" },
      square: { tr: "Güç-Yapı Gerilimi", en: "Power-Structure Tension" },
      sextile: { tr: "Disiplinli Dönüşüm", en: "Disciplined Transformation" }
    },
    Uranus: {
      conjunction: { tr: "Radikal Dönüşüm", en: "Radical Transformation" },
      opposition: { tr: "Devrim-Dönüşüm", en: "Revolution-Transformation" },
      trine: { tr: "Özgürleştirici Güç", en: "Liberating Power" },
      square: { tr: "Kaotik Dönüşüm", en: "Chaotic Transformation" },
      sextile: { tr: "Yenilikçi Dönüşüm", en: "Innovative Transformation" }
    },
    Neptune: {
      conjunction: { tr: "Ruhsal Dönüşüm", en: "Spiritual Transformation" },
      opposition: { tr: "Bilinçaltı Deşifre", en: "Subconscious Decoded" },
      trine: { tr: "Mistik Güç", en: "Mystic Power" },
      square: { tr: "Gizli Kriz", en: "Hidden Crisis" },
      sextile: { tr: "Şifalı Dönüşüm", en: "Healing Transformation" }
    },
    Pluto: {
      conjunction: { tr: "Yeniden Doğuş", en: "Rebirth" },
      opposition: { tr: "Derin Kriz", en: "Deep Crisis" },
      trine: { tr: "Evrimsel Güç", en: "Evolutionary Power" },
      square: { tr: "Dönüşüm Sancısı", en: "Transformation Pain" },
      sextile: { tr: "Dönüşüm Potansiyeli", en: "Transformation Potential" }
    }
  }
};

function getHeadline(transitPlanet: string, natalPlanet: string, aspect: AspectType, lang: 'tr' | 'en'): string {
  const transitData = TRANSIT_HEADLINES[transitPlanet];
  if (!transitData) return lang === 'tr' ? "Kozmik Etki" : "Cosmic Effect";

  const natalData = transitData[natalPlanet];
  if (!natalData) return lang === 'tr' ? "Gezegen Etkileşimi" : "Planetary Interaction";

  const aspectData = natalData[aspect];
  if (!aspectData) return lang === 'tr' ? "Transit Etkisi" : "Transit Effect";

  return aspectData[lang];
}

function generateMainText(
  transitPlanet: Planet,
  natalPlanet: Planet,
  sign: string,
  aspect: AspectType,
  house: HouseNumber,
  orbStatus: OrbStatus,
  lang: 'tr' | 'en',
  slots?: { positive?: TransitSlot; negative?: TransitSlot },
  headline?: string
): string {
  const aspectInfo = ASPECT_DATA[aspect][lang];
  const houseInfo = HOUSE_THEMES[house][lang];
  const transitName = lang === 'tr' ? PLANET_NAME_TR[transitPlanet] : PLANET_NAME_EN[transitPlanet];
  const natalName = lang === 'tr' ? PLANET_NAME_TR[natalPlanet] : PLANET_NAME_EN[natalPlanet];
  const signName = lang === 'tr' ? (SIGN_EN_TO_TR[sign] || sign) : (SIGN_TR_TO_EN[sign] || sign);
  const planetEnergy = PLANET_ENERGY[transitPlanet]?.[lang] || "";
  const natalEnergy = PLANET_ENERGY[natalPlanet]?.[lang] || "";

  const slot = slots?.negative || slots?.positive;
  const isPositive = !!slots?.positive && !slots?.negative;
  const isNegative = !!slots?.negative && !slots?.positive;

  if (lang === 'tr') {
    if (slot) {
      let behaviorText = slot.behavior.replace(/\.$/, '').trim();
      let effectText = slot.effect.replace(/\.$/, '').trim();
      let suggestionText = slot.suggestion.replace(/\.$/, '').trim();

      if (behaviorText.charAt(0) === behaviorText.charAt(0).toUpperCase()) {
        behaviorText = behaviorText.charAt(0).toLowerCase() + behaviorText.slice(1);
      }
      if (effectText.charAt(0) === effectText.charAt(0).toUpperCase()) {
        effectText = effectText.charAt(0).toLowerCase() + effectText.slice(1);
      }

      const orbPhrase = orbStatus === 'applying' ? "Yükselen bu enerjini" : "Hafiflemeye başlayan bu etkiyi";

      if (aspect === 'square' || aspect === 'opposition') {
        return `${signName} burcundaki ${transitName}'in natal ${natalName}'inle kurduğu ${aspectInfo.name} açı, ${house}. evindeki ${houseInfo.theme} alanında zorlayıcı bir enerji oluşturuyor. Bu dönemde ${behaviorText} durumlarıyla karşılaşabilir ve bunun getireceği zorluklarla yüzleşmek durumunda kalabilirsin. Bu etkileşim, ${effectText} konularında dikkatli ve temkinli olmanı gerektirir. ${orbPhrase} yönetmek için ${suggestionText.charAt(0).toLowerCase() + suggestionText.slice(1)} ve fevri kararlardan uzak durarak farkındalığını korumalısın.`;
      } else if (aspect === 'trine' || aspect === 'sextile') {
        return `${signName} burcundaki ${transitName}'in natal ${natalName}'inle kurduğu ${aspectInfo.name} açı, ${house}. evindeki ${houseInfo.theme} alanında destekleyici bir akış sunuyor. Bu dönemde ${behaviorText} deneyimleyebilirsin. Bu uyumlu etkileşim beraberinde ${effectText} getirecektir. ${orbPhrase} değerlendirmek için ${suggestionText.charAt(0).toLowerCase() + suggestionText.slice(1)} ve önüne çıkan fırsatları değerlendirmek için harekete geç.`;
      } else {
        return `${signName} burcundaki ${transitName}'in natal ${natalName}'inle buluştuğu bu ${aspectInfo.name}, ${house}. evindeki ${houseInfo.theme} alanında güçlü bir döngü başlatıyor. Bu birleşim sayesinde ${behaviorText} yaşayabilirsin. Bu yoğun etkileşim sonucunda ${effectText} bekleniyor. ${orbPhrase} yönlendirmek için ${suggestionText.charAt(0).toLowerCase() + suggestionText.slice(1)} ve bu güçlü enerjiden en iyi şekilde yararlan.`;
      }
    }

    const orbPhrase = orbStatus === 'applying' ? "Yükselen bu enerjiyi" : "Hafiflemeye başlayan bu etkiyi";

    if (aspect === 'square' || aspect === 'opposition') {
      return `${signName} burcundaki ${transitName}'in natal ${natalName}'inle yaptığı bu ${aspectInfo.name} açısı, ${house}. evindeki ${houseInfo.theme} konularında seni sınırlarını zorlamaya itiyor. Bu ${aspectInfo.tone} döneminde ${houseInfo.area} alanında önemli bir yüzleşme seni bekliyor. ${orbPhrase} bilinçli yönetmek bu süreçte sana güç katacaktır.`;
    } else if (aspect === 'trine' || aspect === 'sextile') {
      return `${signName} burcundaki ${transitName}'in natal ${natalName}'inle kurduğu bu ${aspectInfo.name} açısı, ${house}. evindeki ${houseInfo.theme} konularında güzel bir ${aspectInfo.tone} yaratıyor. ${houseInfo.area.charAt(0).toUpperCase() + houseInfo.area.slice(1)} alanında evrenin desteğini arkanda hissedebilirsin. ${orbPhrase} değerlendirerek fırsatlardan en iyi şekilde yararlanabilirsin.`;
    } else {
      return `${signName} burcundaki ${transitName}'in natal ${natalName}'inle yaptığı bu ${aspectInfo.name}, ${house}. evindeki ${houseInfo.theme} konularında yeni bir döngü başlatıyor. ${houseInfo.area.charAt(0).toUpperCase() + houseInfo.area.slice(1)} alanında güçlü bir odaklanma enerjisi hakim. ${orbPhrase} yeni başlangıçların için kullanabilirsin.`;
    }
  } else {
    if (slot) {
      let behaviorText = slot.behavior.replace(/\.$/, '').trim();
      let effectText = slot.effect.replace(/\.$/, '').trim();
      let suggestionText = slot.suggestion.replace(/\.$/, '').trim();

      if (behaviorText.charAt(0) === behaviorText.charAt(0).toUpperCase()) {
        behaviorText = behaviorText.charAt(0).toLowerCase() + behaviorText.slice(1);
      }
      if (effectText.charAt(0) === effectText.charAt(0).toUpperCase()) {
        effectText = effectText.charAt(0).toLowerCase() + effectText.slice(1);
      }

      const orbPhrase = orbStatus === 'applying' ? "To harness this rising energy" : "To navigate this fading influence";

      if (aspect === 'square' || aspect === 'opposition') {
        return `The ${aspectInfo.name} aspect between ${transitName} in ${signName} and your natal ${natalName} creates challenging energy in your ${house}th house ${houseInfo.theme} area. During this period, you may experience a tendency toward ${behaviorText} and face the challenges that come with it. This interaction requires you to be careful and cautious about matters related to ${effectText}. ${orbPhrase}, ${suggestionText.charAt(0).toLowerCase() + suggestionText.slice(1)} while avoiding impulsive decisions and maintaining your awareness.`;
      } else if (aspect === 'trine' || aspect === 'sextile') {
        return `The ${aspectInfo.name} aspect between ${transitName} in ${signName} and your natal ${natalName} offers supportive flow in your ${house}th house ${houseInfo.theme} area. During this time, you may experience ${behaviorText}. This harmonious interaction will bring ${effectText}. ${orbPhrase}, ${suggestionText.charAt(0).toLowerCase() + suggestionText.slice(1)} and take action to embrace the opportunities that come your way.`;
      } else {
        return `This ${aspectInfo.name} between ${transitName} in ${signName} and your natal ${natalName} initiates a powerful cycle in your ${house}th house ${houseInfo.theme} area. Through this union, you may experience ${behaviorText}. As a result of this intense interaction, ${effectText} can be expected. ${orbPhrase}, ${suggestionText.charAt(0).toLowerCase() + suggestionText.slice(1)} and harness this powerful energy to its fullest.`;
      }
    }

    const orbPhrase = orbStatus === 'applying' ? "To make the most of this rising energy" : "To navigate this fading influence";

    if (aspect === 'square' || aspect === 'opposition') {
      return `This ${aspectInfo.name} aspect between ${transitName} in ${signName} and your natal ${natalName} is pushing you to test limits in ${houseInfo.theme} matters in your ${house}th house. During this ${aspectInfo.tone} period, an important confrontation awaits in your ${houseInfo.area}. Consciously managing this energy will empower you through this process.`;
    } else if (aspect === 'trine' || aspect === 'sextile') {
      return `This ${aspectInfo.name} aspect between ${transitName} in ${signName} and your natal ${natalName} creates a beautiful ${aspectInfo.tone} in ${houseInfo.theme} matters in your ${house}th house. You can feel the universe's support behind you in your ${houseInfo.area}. ${orbPhrase}, you can make the most of these opportunities.`;
    } else {
      return `This ${aspectInfo.name} between ${transitName} in ${signName} and your natal ${natalName} is initiating a new cycle in ${houseInfo.theme} matters in your ${house}th house. A powerful focusing energy dominates your ${houseInfo.area}. ${orbPhrase}, you can use it for new beginnings.`;
    }
  }
}

function generateActionAdvice(
  aspect: AspectType,
  house: HouseNumber,
  orbStatus: OrbStatus,
  lang: 'tr' | 'en'
): string {
  const houseInfo = HOUSE_THEMES[house][lang];

  if (lang === 'tr') {
    if (aspect === 'square' || aspect === 'opposition') {
      if (orbStatus === 'applying') {
        return `${houseInfo.theme.charAt(0).toUpperCase() + houseInfo.theme.slice(1)} konularındaki bu gerginliği yönetmek için farkındalığını yüksek tut ve fevri kararlardan uzak durmalısın.`;
      }
      return `${houseInfo.theme.charAt(0).toUpperCase() + houseInfo.theme.slice(1)} alanında yaşadıklarından ders çıkar ve içsel bir yüzleşme için kendini hazırla.`;
    } else if (aspect === 'trine' || aspect === 'sextile') {
      return `${houseInfo.theme.charAt(0).toUpperCase() + houseInfo.theme.slice(1)} alanındaki fırsatları değerlendirmek için harekete geçmelisin.`;
    } else {
      return `${houseInfo.theme.charAt(0).toUpperCase() + houseInfo.theme.slice(1)} konularında yeni bir sayfa açmak için niyetini belirle ve bu enerjiden yararlan.`;
    }
  } else {
    if (aspect === 'square' || aspect === 'opposition') {
      if (orbStatus === 'applying') {
        return `To manage this tension in ${houseInfo.theme} matters, keep your awareness high and avoid impulsive decisions.`;
      }
      return `Learn from your experiences in ${houseInfo.theme} and prepare for internal confrontation.`;
    } else if (aspect === 'trine' || aspect === 'sextile') {
      return `Take action to seize opportunities in your ${houseInfo.theme} area.`;
    } else {
      return `Set your intention to open a new chapter in ${houseInfo.theme} matters.`;
    }
  }
}

function generateKeywordTags(
  transitPlanet: Planet,
  aspect: AspectType,
  house: HouseNumber,
  lang: 'tr' | 'en'
): string[] {
  const aspectKeywords = ASPECT_DATA[aspect][lang].keywords;
  const houseTheme = HOUSE_THEMES[house][lang].theme;
  const planetTheme = PLANET_ENERGY[transitPlanet][lang].split(' ')[0];

  return [aspectKeywords[0], houseTheme.charAt(0).toUpperCase() + houseTheme.slice(1), planetTheme.charAt(0).toUpperCase() + planetTheme.slice(1)];
}

function getTransitSlots(
  transitPlanet: Planet,
  house: HouseNumber,
  effect: 'positive' | 'negative' | 'neutral',
  lang: 'tr' | 'en'
): { positive?: TransitSlot; negative?: TransitSlot } {
  const planetSlots = PLANET_HOUSE_SLOTS[transitPlanet];
  if (!planetSlots) return {};

  const houseSlots = planetSlots[house];
  if (!houseSlots) return {};

  if (effect === 'positive') {
    return { positive: houseSlots.positive[lang] };
  } else if (effect === 'negative') {
    return { negative: houseSlots.negative[lang] };
  } else {
    return {
      positive: houseSlots.positive[lang],
      negative: houseSlots.negative[lang]
    };
  }
}

export function generateTransitInterpretationJSON(
  transitPlanetKey: string,
  natalPlanetKey: string,
  sign: string,
  aspect: string,
  house: number,
  orbStatus: OrbStatus = 'applying',
  language: 'tr' | 'en' = 'tr',
  effect: 'positive' | 'negative' | 'neutral' = 'neutral'
): TransitInterpretationJSON {
  const transitPlanet = transitPlanetKey as Planet;
  const natalPlanet = (natalPlanetKey || transitPlanetKey) as Planet;
  const aspectType = aspect as AspectType;
  const houseNum = house as HouseNumber;

  const headline = getHeadline(transitPlanet, natalPlanet, aspectType, language);
  const slots = getTransitSlots(transitPlanet, houseNum, effect, language);
  const main_text = generateMainText(transitPlanet, natalPlanet, sign, aspectType, houseNum, orbStatus, language, slots, headline);
  const action_advice = generateActionAdvice(aspectType, houseNum, orbStatus, language);
  const keyword_tags = generateKeywordTags(transitPlanet, aspectType, houseNum, language);

  return {
    headline,
    main_text,
    action_advice,
    keyword_tags,
    slots
  };
}

export function getTransitInterpretation(
  transitPlanetKey: string,
  house: number,
  sign: string,
  aspect: string,
  language: 'tr' | 'en' = 'tr',
  natalPlanetKey?: string
): string {
  const result = generateTransitInterpretationJSON(
    transitPlanetKey,
    natalPlanetKey || transitPlanetKey,
    sign,
    aspect,
    house,
    'applying',
    language
  );

  return `${result.main_text}\n\n${result.action_advice}`;
}

export function getTransitInterpretationAsJSON(
  transitPlanetKey: string,
  natalPlanetKey: string,
  sign: string,
  aspect: string,
  house: number,
  orbStatus: OrbStatus = 'applying',
  language: 'tr' | 'en' = 'tr',
  effect: 'positive' | 'negative' | 'neutral' = 'neutral'
): TransitInterpretationJSON {
  return generateTransitInterpretationJSON(
    transitPlanetKey,
    natalPlanetKey,
    sign,
    aspect,
    house,
    orbStatus,
    language,
    effect
  );
}

// Planet Position Interpretations Database
// For daily planet positions in signs with positive/negative/neutral/retrograde states

export interface PlanetPositionInterpretation {
  positive: { tr: string; en: string };
  negative: { tr: string; en: string };
  neutral: { tr: string; en: string };
  retrograde: { tr: string; en: string };
}

export type PlanetPositionDB = Record<Planet, Record<string, PlanetPositionInterpretation>>;

export const PLANET_POSITION_INTERPRETATIONS: PlanetPositionDB = {
  Sun: {
    Aries: {
      positive: {
        tr: "Güneş Koç'ta kendini evinde hissediyor. Enerjin yüksek, liderlik vasıfların parlıyor. Yeni başlangıçlar için mükemmel bir dönem.",
        en: "Sun in Aries feels at home. Your energy is high, leadership qualities shine. A perfect time for new beginnings."
      },
      negative: {
        tr: "Koç'taki Güneş enerjisi kontrolsüz davranışlara yol açabilir. Sabırsızlık ve agresyon riski var. Tepkilerini ölç.",
        en: "Sun in Aries energy can lead to impulsive behavior. Risk of impatience and aggression. Measure your reactions."
      },
      neutral: {
        tr: "Güneş Koç burcunda ilerliyor. Bireysellik ve girişimcilik temaları gündemde. Cesaretinle hareket et.",
        en: "Sun moves through Aries. Themes of individuality and initiative are prominent. Act with courage."
      },
      retrograde: {
        tr: "Güneş retrograd olmaz, ancak Koç enerjisi içe dönük hissediliyorsa kimlik sorgulaması döneminde olabilirsin.",
        en: "Sun doesn't go retrograde, but if Aries energy feels internalized, you may be in an identity questioning period."
      }
    },
    Taurus: {
      positive: {
        tr: "Boğa'daki Güneş istikrar ve konfor getiriyor. Maddi güvenliğin artıyor, duyusal zevklerden keyif alabilirsin.",
        en: "Sun in Taurus brings stability and comfort. Material security increases, enjoy sensual pleasures."
      },
      negative: {
        tr: "Boğa'daki Güneş inatçılık ve durağanlık yaratabilir. Değişime direnç gösterme, akışa bırak.",
        en: "Sun in Taurus can create stubbornness and stagnation. Don't resist change, go with the flow."
      },
      neutral: {
        tr: "Güneş Boğa burcunda. Pratik konulara odaklan, değerlerini sorgula ve sağlam temeller at.",
        en: "Sun in Taurus. Focus on practical matters, question your values and build solid foundations."
      },
      retrograde: {
        tr: "Bu dönemde değerlerini ve maddi hedeflerini gözden geçir. Neyin gerçekten önemli olduğunu anla.",
        en: "Review your values and material goals during this period. Understand what truly matters."
      }
    },
    Gemini: {
      positive: {
        tr: "İkizler'deki Güneş zihinsel çeviklik ve iletişim becerileri kazandırıyor. Sosyal bağlantıların güçleniyor.",
        en: "Sun in Gemini grants mental agility and communication skills. Your social connections strengthen."
      },
      negative: {
        tr: "İkizler'deki Güneş dağınıklık ve yüzeysellik getirebilir. Bir konuya odaklan, çok fazla işe bulaşma.",
        en: "Sun in Gemini can bring scattered energy and superficiality. Focus on one thing, don't juggle too much."
      },
      neutral: {
        tr: "Güneş İkizler burcunda. Merak ve öğrenme arzun yüksek. Yeni bilgiler edin, çevreni genişlet.",
        en: "Sun in Gemini. Curiosity and desire to learn are high. Acquire new knowledge, expand your circle."
      },
      retrograde: {
        tr: "İletişim ve düşünce kalıplarını gözden geçirme zamanı. Yanlış anlaşılmaları düzelt.",
        en: "Time to review communication and thought patterns. Correct misunderstandings."
      }
    },
    Cancer: {
      positive: {
        tr: "Yengeç'teki Güneş duygusal derinlik ve aile bağları güçlendiriyor. Yuvanı koruma içgüdün artıyor.",
        en: "Sun in Cancer strengthens emotional depth and family bonds. Your instinct to protect home increases."
      },
      negative: {
        tr: "Yengeç'teki Güneş aşırı hassasiyet ve geçmişe takılma getirebilir. Kabuğundan çık, ileriye bak.",
        en: "Sun in Cancer can bring over-sensitivity and dwelling on the past. Come out of your shell, look forward."
      },
      neutral: {
        tr: "Güneş Yengeç burcunda. Köklerinle bağlan, duygusal ihtiyaçlarını dinle, güvenli alan yarat.",
        en: "Sun in Cancer. Connect with your roots, listen to emotional needs, create a safe space."
      },
      retrograde: {
        tr: "Ailevi konuları ve duygusal kalıpları gözden geçir. Geçmişten gelen yaraları iyileştir.",
        en: "Review family matters and emotional patterns. Heal wounds from the past."
      }
    },
    Leo: {
      positive: {
        tr: "Aslan'daki Güneş parlaklık ve yaratıcılık getiriyor. Sahne senin, kendini ifade et ve ışığını paylaş.",
        en: "Sun in Leo brings brilliance and creativity. The stage is yours, express yourself and share your light."
      },
      negative: {
        tr: "Aslan'daki Güneş kibir ve dikkat arayışı yaratabilir. Ego'nu dengele, başkalarını da gör.",
        en: "Sun in Leo can create arrogance and attention-seeking. Balance your ego, see others too."
      },
      neutral: {
        tr: "Güneş Aslan burcunda evinde. Özgüven yüksek, liderlik temaları öne çıkıyor. Kalbinle yönet.",
        en: "Sun in Leo is at home. Confidence is high, leadership themes emerge. Lead with your heart."
      },
      retrograde: {
        tr: "Yaratıcı ifade ve kimlik konularını gözden geçir. Gerçek benliğini keşfet.",
        en: "Review creative expression and identity matters. Discover your true self."
      }
    },
    Virgo: {
      positive: {
        tr: "Başak'taki Güneş düzen ve verimlilik sağlıyor. Detaylara hakimsin, sağlık rutinlerin güçleniyor.",
        en: "Sun in Virgo provides order and efficiency. You master details, health routines strengthen."
      },
      negative: {
        tr: "Başak'taki Güneş aşırı eleştiri ve mükemmeliyetçilik getirebilir. Kendine ve başkalarına karşı yumuşa.",
        en: "Sun in Virgo can bring over-criticism and perfectionism. Be gentle with yourself and others."
      },
      neutral: {
        tr: "Güneş Başak burcunda. Analiz ve hizmet temaları gündemde. Günlük rutinlerini optimize et.",
        en: "Sun in Virgo. Analysis and service themes are prominent. Optimize your daily routines."
      },
      retrograde: {
        tr: "İş ve sağlık alışkanlıklarını gözden geçir. Daha verimli sistemler kur.",
        en: "Review work and health habits. Establish more efficient systems."
      }
    },
    Libra: {
      positive: {
        tr: "Terazi'deki Güneş denge ve uyum getiriyor. İlişkilerin çiçek açıyor, estetik anlayışın güçleniyor.",
        en: "Sun in Libra brings balance and harmony. Relationships flourish, aesthetic sense strengthens."
      },
      negative: {
        tr: "Terazi'deki Güneş kararsızlık ve başkalarına bağımlılık yaratabilir. Kendi sesini dinle.",
        en: "Sun in Libra can create indecision and dependency on others. Listen to your own voice."
      },
      neutral: {
        tr: "Güneş Terazi burcunda. Ortaklık ve adalet temaları öne çıkıyor. Dengeyi bul.",
        en: "Sun in Libra. Partnership and justice themes emerge. Find the balance."
      },
      retrograde: {
        tr: "İlişki kalıplarını ve adalet anlayışını gözden geçir. Dengesizlikleri düzelt.",
        en: "Review relationship patterns and sense of justice. Correct imbalances."
      }
    },
    Scorpio: {
      positive: {
        tr: "Akrep'teki Güneş derin dönüşüm gücü veriyor. Sezgilerin keskin, gizli gerçekleri ortaya çıkarıyorsun.",
        en: "Sun in Scorpio gives deep transformation power. Intuition is sharp, you uncover hidden truths."
      },
      negative: {
        tr: "Akrep'teki Güneş obsesyon ve kontrol eğilimi yaratabilir. Bırakmayı öğren, güvensizliği aş.",
        en: "Sun in Scorpio can create obsession and control tendencies. Learn to let go, overcome distrust."
      },
      neutral: {
        tr: "Güneş Akrep burcunda. Dönüşüm ve yeniden doğuş temaları aktif. Derinlere dal.",
        en: "Sun in Scorpio. Transformation and rebirth themes are active. Dive deep."
      },
      retrograde: {
        tr: "Güç dinamiklerini ve kontrol ihtiyacını gözden geçir. İç dönüşümü tamamla.",
        en: "Review power dynamics and need for control. Complete inner transformation."
      }
    },
    Sagittarius: {
      positive: {
        tr: "Yay'daki Güneş macera ve bilgelik getiriyor. Ufukların genişliyor, felsefi kavrayışın derinleşiyor.",
        en: "Sun in Sagittarius brings adventure and wisdom. Horizons expand, philosophical understanding deepens."
      },
      negative: {
        tr: "Yay'daki Güneş aşırı iyimserlik ve sorumsuzluk getirebilir. Ayaklarını yere bas.",
        en: "Sun in Sagittarius can bring over-optimism and irresponsibility. Keep your feet on the ground."
      },
      neutral: {
        tr: "Güneş Yay burcunda. Özgürlük ve keşif temaları gündemde. Yeni felsefeler keşfet.",
        en: "Sun in Sagittarius. Freedom and exploration themes are prominent. Discover new philosophies."
      },
      retrograde: {
        tr: "İnançlarını ve hayat felsefeni gözden geçir. Gerçek özgürlüğün ne olduğunu anla.",
        en: "Review your beliefs and life philosophy. Understand what true freedom means."
      }
    },
    Capricorn: {
      positive: {
        tr: "Oğlak'taki Güneş disiplin ve başarı odağı veriyor. Kariyer hedeflerin netleşiyor, otoriten güçleniyor.",
        en: "Sun in Capricorn gives discipline and success focus. Career goals clarify, authority strengthens."
      },
      negative: {
        tr: "Oğlak'taki Güneş katılık ve işkoliklik yaratabilir. Hayatın sadece işten ibaret olmadığını hatırla.",
        en: "Sun in Capricorn can create rigidity and workaholism. Remember life isn't just about work."
      },
      neutral: {
        tr: "Güneş Oğlak burcunda. Sorumluluk ve yapı temaları aktif. Sağlam temeller at.",
        en: "Sun in Capricorn. Responsibility and structure themes are active. Build solid foundations."
      },
      retrograde: {
        tr: "Kariyer hedeflerini ve otorite ilişkilerini gözden geçir. Gerçek başarının ne olduğunu sorgula.",
        en: "Review career goals and authority relationships. Question what true success means."
      }
    },
    Aquarius: {
      positive: {
        tr: "Kova'daki Güneş yenilikçilik ve özgünlük getiriyor. Toplumsal vizyonun güçleniyor, farklılığın değer görüyor.",
        en: "Sun in Aquarius brings innovation and originality. Social vision strengthens, your uniqueness is valued."
      },
      negative: {
        tr: "Kova'daki Güneş mesafeli ve isyankar davranışlar yaratabilir. Bağlantılarını koparmadan farklı ol.",
        en: "Sun in Aquarius can create detached and rebellious behavior. Be different without cutting ties."
      },
      neutral: {
        tr: "Güneş Kova burcunda. Özgürlük ve insanlık temaları gündemde. Topluma katkı sun.",
        en: "Sun in Aquarius. Freedom and humanitarian themes are prominent. Contribute to society."
      },
      retrograde: {
        tr: "Sosyal bağlantılarını ve gelecek vizyonunu gözden geçir. Gerçek bireyselliğini keşfet.",
        en: "Review social connections and future vision. Discover your true individuality."
      }
    },
    Pisces: {
      positive: {
        tr: "Balık'taki Güneş spiritüel derinlik ve yaratıcı ilham veriyor. Sezgilerin güçlü, şefkatin sınırsız.",
        en: "Sun in Pisces gives spiritual depth and creative inspiration. Intuition is strong, compassion limitless."
      },
      negative: {
        tr: "Balık'taki Güneş kaçış eğilimi ve sınır sorunları yaratabilir. Gerçeklikle bağını koru.",
        en: "Sun in Pisces can create escapism and boundary issues. Maintain your connection to reality."
      },
      neutral: {
        tr: "Güneş Balık burcunda. Hayal gücü ve ruhsallık temaları aktif. İç sesinle bağlan.",
        en: "Sun in Pisces. Imagination and spirituality themes are active. Connect with your inner voice."
      },
      retrograde: {
        tr: "Spiritüel yolculuğunu ve hayallerini gözden geçir. Sezgisel bilgeliğini dinle.",
        en: "Review your spiritual journey and dreams. Listen to your intuitive wisdom."
      }
    }
  },
  Moon: {
    Aries: {
      positive: { tr: "Ay Koç'ta duygusal cesaretini güçlendiriyor. Yeni başlangıçlara hazırsın.", en: "Moon in Aries strengthens emotional courage. Ready for new beginnings." },
      negative: { tr: "Koç'taki Ay dürtüsel tepkilere yol açabilir. Derin nefes al, tepki vermeden önce düşün.", en: "Moon in Aries can lead to impulsive reactions. Deep breath, think before reacting." },
      neutral: { tr: "Ay Koç burcunda. Duygusal enerjin yüksek, harekete geçme ihtiyacı var.", en: "Moon in Aries. Emotional energy is high, need to take action." },
      retrograde: { tr: "Ay retrograd olmaz, ancak duygusal tepki kalıplarını gözden geçir.", en: "Moon doesn't retrograde, but review emotional reaction patterns." }
    },
    Taurus: {
      positive: { tr: "Boğa'daki Ay duygusal güvenlik ve huzur sağlıyor. Konfor alanında parlıyorsun.", en: "Moon in Taurus provides emotional security and peace. Shining in your comfort zone." },
      negative: { tr: "Boğa'daki Ay inatçılık ve değişime direnç yaratabilir. Esnekliğini koru.", en: "Moon in Taurus can create stubbornness and resistance to change. Maintain flexibility." },
      neutral: { tr: "Ay Boğa burcunda. Duygusal istikrar temaları aktif. Güvenli alanını oluştur.", en: "Moon in Taurus. Emotional stability themes active. Create your safe space." },
      retrograde: { tr: "Duygusal güvenlik ihtiyaçlarını ve değerlerini gözden geçir.", en: "Review emotional security needs and values." }
    },
    Gemini: {
      positive: { tr: "İkizler'deki Ay zihinsel merakı ve duygusal çevikliği artırıyor. İletişimde başarılısın.", en: "Moon in Gemini increases mental curiosity and emotional agility. Success in communication." },
      negative: { tr: "İkizler'deki Ay duygusal dağınıklık ve yüzeysellik getirebilir. Derinleş.", en: "Moon in Gemini can bring emotional scatter and superficiality. Go deeper." },
      neutral: { tr: "Ay İkizler burcunda. Duygusal ifade ve öğrenme temaları gündemde.", en: "Moon in Gemini. Emotional expression and learning themes prominent." },
      retrograde: { tr: "Duygusal iletişim kalıplarını gözden geçir.", en: "Review emotional communication patterns." }
    },
    Cancer: {
      positive: { tr: "Yengeç'teki Ay evinde. Sezgilerin güçlü, duygusal derinliğin artıyor. Şefkatinle parla.", en: "Moon in Cancer is at home. Intuition strong, emotional depth increases. Shine with compassion." },
      negative: { tr: "Yengeç'taki Ay aşırı hassasiyet ve ruh hali dalgalanmaları yaratabilir. Sınırlarını koru.", en: "Moon in Cancer can create over-sensitivity and mood swings. Protect your boundaries." },
      neutral: { tr: "Ay Yengeç burcunda güçlü. Duygusal ihtiyaçlarını öncelikle.", en: "Moon in Cancer is powerful. Prioritize emotional needs." },
      retrograde: { tr: "Duygusal kalıpları ve aile bağlarını gözden geçir.", en: "Review emotional patterns and family ties." }
    },
    Leo: {
      positive: { tr: "Aslan'daki Ay duygusal ifadeni güçlendiriyor. Yaratıcılığın ve neşen yüksek.", en: "Moon in Leo strengthens emotional expression. Creativity and joy are high." },
      negative: { tr: "Aslan'daki Ay dramatik tepkiler ve dikkat arayışı yaratabilir. Ego'yu dengele.", en: "Moon in Leo can create dramatic reactions and attention-seeking. Balance the ego." },
      neutral: { tr: "Ay Aslan burcunda. Duygusal yaratıcılık ve kendini ifade temaları aktif.", en: "Moon in Leo. Emotional creativity and self-expression themes active." },
      retrograde: { tr: "Duygusal ifade ve takdir ihtiyacını gözden geçir.", en: "Review emotional expression and need for appreciation." }
    },
    Virgo: {
      positive: { tr: "Başak'taki Ay pratik duygusal zekâ veriyor. Detaylara dikkat et, faydalı ol.", en: "Moon in Virgo gives practical emotional intelligence. Pay attention to details, be helpful." },
      negative: { tr: "Başak'taki Ay aşırı endişe ve eleştiri getirebilir. Mükemmeliyetçiliği bırak.", en: "Moon in Virgo can bring excessive worry and criticism. Let go of perfectionism." },
      neutral: { tr: "Ay Başak burcunda. Duygusal düzen ve hizmet temaları gündemde.", en: "Moon in Virgo. Emotional order and service themes prominent." },
      retrograde: { tr: "Duygusal düzen ihtiyaçlarını ve eleştiri kalıplarını gözden geçir.", en: "Review emotional order needs and criticism patterns." }
    },
    Libra: {
      positive: { tr: "Terazi'deki Ay duygusal dengeyi ve ilişki uyumunu güçlendiriyor.", en: "Moon in Libra strengthens emotional balance and relationship harmony." },
      negative: { tr: "Terazi'deki Ay kararsızlık ve başkalarına bağımlılık yaratabilir.", en: "Moon in Libra can create indecision and dependency on others." },
      neutral: { tr: "Ay Terazi burcunda. Duygusal denge ve ortaklık temaları aktif.", en: "Moon in Libra. Emotional balance and partnership themes active." },
      retrograde: { tr: "İlişkilerdeki duygusal kalıpları gözden geçir.", en: "Review emotional patterns in relationships." }
    },
    Scorpio: {
      positive: { tr: "Akrep'teki Ay duygusal derinlik ve dönüşüm gücü veriyor. Sezgilerin keskin.", en: "Moon in Scorpio gives emotional depth and transformation power. Intuition is sharp." },
      negative: { tr: "Akrep'teki Ay yoğun duygular ve kontrol ihtiyacı yaratabilir. Bırakmayı öğren.", en: "Moon in Scorpio can create intense emotions and control needs. Learn to let go." },
      neutral: { tr: "Ay Akrep burcunda. Derin duygusal dönüşüm temaları gündemde.", en: "Moon in Scorpio. Deep emotional transformation themes prominent." },
      retrograde: { tr: "Duygusal güç ve kontrol kalıplarını gözden geçir.", en: "Review emotional power and control patterns." }
    },
    Sagittarius: {
      positive: { tr: "Yay'daki Ay duygusal özgürlük ve iyimserlik getiriyor. Macera ruhu yüksek.", en: "Moon in Sagittarius brings emotional freedom and optimism. Adventure spirit is high." },
      negative: { tr: "Yay'daki Ay huzursuzluk ve duygusal kaçış eğilimi yaratabilir.", en: "Moon in Sagittarius can create restlessness and emotional escape tendencies." },
      neutral: { tr: "Ay Yay burcunda. Duygusal özgürlük ve keşif temaları aktif.", en: "Moon in Sagittarius. Emotional freedom and exploration themes active." },
      retrograde: { tr: "Duygusal inançları ve özgürlük ihtiyacını gözden geçir.", en: "Review emotional beliefs and need for freedom." }
    },
    Capricorn: {
      positive: { tr: "Oğlak'taki Ay duygusal disiplin ve kararlılık veriyor. Hedeflerine odaklan.", en: "Moon in Capricorn gives emotional discipline and determination. Focus on goals." },
      negative: { tr: "Oğlak'taki Ay duygusal soğukluk ve katılık yaratabilir. Duygularını bastırma.", en: "Moon in Capricorn can create emotional coldness and rigidity. Don't suppress feelings." },
      neutral: { tr: "Ay Oğlak burcunda. Duygusal sorumluluk ve yapı temaları gündemde.", en: "Moon in Capricorn. Emotional responsibility and structure themes prominent." },
      retrograde: { tr: "Duygusal sınırları ve sorumluluk kalıplarını gözden geçir.", en: "Review emotional boundaries and responsibility patterns." }
    },
    Aquarius: {
      positive: { tr: "Kova'daki Ay duygusal bağımsızlık ve özgünlük veriyor. Farklı ol.", en: "Moon in Aquarius gives emotional independence and originality. Be different." },
      negative: { tr: "Kova'daki Ay duygusal mesafe ve kopukluk yaratabilir. Bağlantılarını koru.", en: "Moon in Aquarius can create emotional distance and detachment. Maintain connections." },
      neutral: { tr: "Ay Kova burcunda. Duygusal özgürlük ve insanlık temaları aktif.", en: "Moon in Aquarius. Emotional freedom and humanitarian themes active." },
      retrograde: { tr: "Duygusal bağımsızlık ve sosyal bağlantı kalıplarını gözden geçir.", en: "Review emotional independence and social connection patterns." }
    },
    Pisces: {
      positive: { tr: "Balık'taki Ay sezgisel derinlik ve şefkat veriyor. Spiritüel bağlantın güçlü.", en: "Moon in Pisces gives intuitive depth and compassion. Spiritual connection is strong." },
      negative: { tr: "Balık'taki Ay duygusal kaçış ve sınır sorunları yaratabilir. Ayaklarını yere bas.", en: "Moon in Pisces can create emotional escape and boundary issues. Stay grounded." },
      neutral: { tr: "Ay Balık burcunda. Sezgi ve şefkat temaları gündemde.", en: "Moon in Pisces. Intuition and compassion themes prominent." },
      retrograde: { tr: "Duygusal sezgileri ve spiritüel bağlantıları gözden geçir.", en: "Review emotional intuition and spiritual connections." }
    }
  },
  Mercury: {
    Aries: {
      positive: { tr: "Merkür Koç'ta hızlı düşünce ve cesur iletişim sağlıyor. Fikirlerini paylaş.", en: "Mercury in Aries provides quick thinking and bold communication. Share your ideas." },
      negative: { tr: "Koç'taki Merkür acele kararlar ve keskin sözlere yol açabilir. Düşünceli ol.", en: "Mercury in Aries can lead to hasty decisions and sharp words. Be thoughtful." },
      neutral: { tr: "Merkür Koç burcunda. Hızlı iletişim ve girişimci fikirler gündemde.", en: "Mercury in Aries. Quick communication and entrepreneurial ideas prominent." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: İletişimde gecikmeler ve yanlış anlaşılmalar olabilir. Önemli kararları ertele, sözleşmeleri dikkatle incele. Geçmişteki konuşmaları gözden geçir.", en: "⚠️ MERCURY RETROGRADE: Communication delays and misunderstandings possible. Postpone important decisions, review contracts carefully. Revisit past conversations." }
    },
    Taurus: {
      positive: { tr: "Boğa'daki Merkür pratik düşünce ve istikrarlı iletişim veriyor.", en: "Mercury in Taurus provides practical thinking and stable communication." },
      negative: { tr: "Boğa'daki Merkür yavaş düşünce ve inatçılık getirebilir.", en: "Mercury in Taurus can bring slow thinking and stubbornness." },
      neutral: { tr: "Merkür Boğa burcunda. Pratik fikirler ve değer odaklı iletişim temaları aktif.", en: "Mercury in Taurus. Practical ideas and value-focused communication themes active." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: Finansal kararları ertele. Değer algını ve maddi planlarını gözden geçir. Geçmişteki mali konuları çöz.", en: "⚠️ MERCURY RETROGRADE: Postpone financial decisions. Review value perception and material plans. Resolve past financial matters." }
    },
    Gemini: {
      positive: { tr: "İkizler'deki Merkür evinde - zihinsel çeviklik ve iletişim becerileri dorukta.", en: "Mercury in Gemini is at home - mental agility and communication skills peak." },
      negative: { tr: "İkizler'deki Merkür zihinsel dağınıklık ve yüzeysellik yaratabilir.", en: "Mercury in Gemini can create mental scatter and superficiality." },
      neutral: { tr: "Merkür İkizler burcunda güçlü. Öğrenme ve iletişim enerjisi yüksek.", en: "Mercury in Gemini is strong. Learning and communication energy high." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: İletişim kazaları artabilir. Eski arkadaşlar ortaya çıkabilir. Yarım kalan konuşmaları tamamla.", en: "⚠️ MERCURY RETROGRADE: Communication mishaps may increase. Old friends may resurface. Complete unfinished conversations." }
    },
    Cancer: {
      positive: { tr: "Yengeç'teki Merkür duygusal zekâ ve sezgisel iletişim güçlendiriyor.", en: "Mercury in Cancer strengthens emotional intelligence and intuitive communication." },
      negative: { tr: "Yengeç'teki Merkür mantık yerine duyguyla düşünmeye yol açabilir.", en: "Mercury in Cancer can lead to thinking with emotions instead of logic." },
      neutral: { tr: "Merkür Yengeç burcunda. Duygusal iletişim ve anılar temaları gündemde.", en: "Mercury in Cancer. Emotional communication and memory themes prominent." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: Aile içi iletişim sorunları çıkabilir. Geçmişteki aile konularını gözden geçir.", en: "⚠️ MERCURY RETROGRADE: Family communication issues may arise. Review past family matters." }
    },
    Leo: {
      positive: { tr: "Aslan'daki Merkür yaratıcı ifade ve etkileyici iletişim veriyor.", en: "Mercury in Leo gives creative expression and impressive communication." },
      negative: { tr: "Aslan'daki Merkür dramatik ifade ve ego odaklı düşünce yaratabilir.", en: "Mercury in Leo can create dramatic expression and ego-centered thinking." },
      neutral: { tr: "Merkür Aslan burcunda. Yaratıcı fikirler ve kendini ifade temaları aktif.", en: "Mercury in Leo. Creative ideas and self-expression themes active." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: Yaratıcı projelerde gecikmeler. Eski yaratıcı fikirleri gözden geçir.", en: "⚠️ MERCURY RETROGRADE: Delays in creative projects. Review old creative ideas." }
    },
    Virgo: {
      positive: { tr: "Başak'taki Merkür evinde - analitik düşünce ve detaylı iletişim dorukta.", en: "Mercury in Virgo is at home - analytical thinking and detailed communication peak." },
      negative: { tr: "Başak'taki Merkür aşırı eleştiri ve kaygılı düşünce yaratabilir.", en: "Mercury in Virgo can create over-criticism and anxious thinking." },
      neutral: { tr: "Merkür Başak burcunda çok güçlü. Analiz ve düzen temaları aktif.", en: "Mercury in Virgo is very strong. Analysis and order themes active." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: İş süreçlerinde aksaklıklar. Sağlık randevularını kontrol et. Detayları gözden geçir.", en: "⚠️ MERCURY RETROGRADE: Work process disruptions. Check health appointments. Review details." }
    },
    Libra: {
      positive: { tr: "Terazi'deki Merkür diplomatik iletişim ve dengeli düşünce sağlıyor.", en: "Mercury in Libra provides diplomatic communication and balanced thinking." },
      negative: { tr: "Terazi'deki Merkür kararsızlık ve başkalarının fikirlerine bağımlılık yaratabilir.", en: "Mercury in Libra can create indecision and dependency on others' opinions." },
      neutral: { tr: "Merkür Terazi burcunda. Adil iletişim ve ortaklık fikirleri gündemde.", en: "Mercury in Libra. Fair communication and partnership ideas prominent." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: İlişki içi iletişim sorunları. Eski ortaklık konularını gözden geçir.", en: "⚠️ MERCURY RETROGRADE: Relationship communication issues. Review old partnership matters." }
    },
    Scorpio: {
      positive: { tr: "Akrep'teki Merkür derin düşünce ve araştırmacı zekâ veriyor.", en: "Mercury in Scorpio gives deep thinking and investigative intelligence." },
      negative: { tr: "Akrep'teki Merkür obsesif düşünce ve gizlilik yaratabilir.", en: "Mercury in Scorpio can create obsessive thinking and secrecy." },
      neutral: { tr: "Merkür Akrep burcunda. Derin analiz ve gizli bilgi temaları aktif.", en: "Mercury in Scorpio. Deep analysis and hidden information themes active." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: Gizli bilgiler ortaya çıkabilir. Derin düşünce kalıplarını gözden geçir.", en: "⚠️ MERCURY RETROGRADE: Hidden information may surface. Review deep thinking patterns." }
    },
    Sagittarius: {
      positive: { tr: "Yay'daki Merkür geniş görüşlü düşünce ve felsefi iletişim sağlıyor.", en: "Mercury in Sagittarius provides broad-minded thinking and philosophical communication." },
      negative: { tr: "Yay'daki Merkür abartılı ifade ve detayları kaçırma eğilimi yaratabilir.", en: "Mercury in Sagittarius can create exaggerated expression and tendency to miss details." },
      neutral: { tr: "Merkür Yay burcunda. Felsefi fikirler ve uzak iletişim temaları gündemde.", en: "Mercury in Sagittarius. Philosophical ideas and long-distance communication themes prominent." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: Seyahat planlarında aksaklıklar. İnançlarını ve fikirlerini gözden geçir.", en: "⚠️ MERCURY RETROGRADE: Travel plan disruptions. Review beliefs and ideas." }
    },
    Capricorn: {
      positive: { tr: "Oğlak'taki Merkür stratejik düşünce ve profesyonel iletişim veriyor.", en: "Mercury in Capricorn gives strategic thinking and professional communication." },
      negative: { tr: "Oğlak'taki Merkür katı düşünce ve pessimist bakış açısı yaratabilir.", en: "Mercury in Capricorn can create rigid thinking and pessimistic outlook." },
      neutral: { tr: "Merkür Oğlak burcunda. Yapısal düşünce ve kariyer iletişimi temaları aktif.", en: "Mercury in Capricorn. Structural thinking and career communication themes active." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: Kariyer iletişiminde gecikmeler. İş planlarını gözden geçir.", en: "⚠️ MERCURY RETROGRADE: Career communication delays. Review work plans." }
    },
    Aquarius: {
      positive: { tr: "Kova'daki Merkür yenilikçi fikirler ve özgün iletişim sağlıyor.", en: "Mercury in Aquarius provides innovative ideas and original communication." },
      negative: { tr: "Kova'daki Merkür eksantrik düşünce ve sosyal kopukluk yaratabilir.", en: "Mercury in Aquarius can create eccentric thinking and social disconnection." },
      neutral: { tr: "Merkür Kova burcunda. Yenilikçi fikirler ve grup iletişimi temaları gündemde.", en: "Mercury in Aquarius. Innovative ideas and group communication themes prominent." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: Teknoloji sorunları artabilir. Sosyal bağlantıları gözden geçir.", en: "⚠️ MERCURY RETROGRADE: Technology issues may increase. Review social connections." }
    },
    Pisces: {
      positive: { tr: "Balık'taki Merkür sezgisel düşünce ve yaratıcı iletişim veriyor.", en: "Mercury in Pisces gives intuitive thinking and creative communication." },
      negative: { tr: "Balık'taki Merkür bulanık düşünce ve yanlış anlaşılmalar yaratabilir.", en: "Mercury in Pisces can create foggy thinking and misunderstandings." },
      neutral: { tr: "Merkür Balık burcunda. Sezgisel iletişim ve hayal gücü temaları aktif.", en: "Mercury in Pisces. Intuitive communication and imagination themes active." },
      retrograde: { tr: "⚠️ MERKÜR RETROGRAD: Karışıklık ve yanlış anlaşılmalar artabilir. Hayalleri ve sezgileri gözden geçir.", en: "⚠️ MERCURY RETROGRADE: Confusion and misunderstandings may increase. Review dreams and intuition." }
    }
  },
  Venus: {
    Aries: {
      positive: { tr: "Venüs Koç'ta tutkulu aşk ve cesur güzellik anlayışı getiriyor.", en: "Venus in Aries brings passionate love and bold beauty sense." },
      negative: { tr: "Koç'taki Venüs fevri romantik kararlar ve benmerkezcilik yaratabilir.", en: "Venus in Aries can create impulsive romantic decisions and self-centeredness." },
      neutral: { tr: "Venüs Koç burcunda. Aşkta ve güzellikte cesaret temaları gündemde.", en: "Venus in Aries. Courage themes in love and beauty prominent." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: Eski aşklar geri dönebilir. İlişki değerlerini gözden geçir. Büyük satın alımları ertele.", en: "⚠️ VENUS RETROGRADE: Past loves may return. Review relationship values. Postpone major purchases." }
    },
    Taurus: {
      positive: { tr: "Boğa'daki Venüs evinde - duyusal zevkler, maddi bolluk ve sadık aşk dorukta.", en: "Venus in Taurus is at home - sensual pleasures, material abundance and loyal love peak." },
      negative: { tr: "Boğa'daki Venüs maddi bağımlılık ve possesif davranışlar yaratabilir.", en: "Venus in Taurus can create material dependency and possessive behavior." },
      neutral: { tr: "Venüs Boğa burcunda çok güçlü. Değerler ve güzellik temaları aktif.", en: "Venus in Taurus is very strong. Values and beauty themes active." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: Finansal ve romantik konuları gözden geçir. Değer algını sorgula.", en: "⚠️ VENUS RETROGRADE: Review financial and romantic matters. Question your value perception." }
    },
    Gemini: {
      positive: { tr: "İkizler'deki Venüs entelektüel çekicilik ve çeşitli sosyal bağlantılar getiriyor.", en: "Venus in Gemini brings intellectual charm and diverse social connections." },
      negative: { tr: "İkizler'deki Venüs yüzeysel ilişkiler ve kararsızlık yaratabilir.", en: "Venus in Gemini can create superficial relationships and indecision." },
      neutral: { tr: "Venüs İkizler burcunda. İletişimde çekicilik ve sosyal ağlar temaları gündemde.", en: "Venus in Gemini. Charm in communication and social networks themes prominent." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: İletişimdeki romantik konuları gözden geçir.", en: "⚠️ VENUS RETROGRADE: Review romantic matters in communication." }
    },
    Cancer: {
      positive: { tr: "Yengeç'teki Venüs koruyucu aşk ve yuva güzelliği sağlıyor.", en: "Venus in Cancer provides protective love and home beauty." },
      negative: { tr: "Yengeç'teki Venüs aşırı bağımlılık ve geçmişe takılma yaratabilir.", en: "Venus in Cancer can create excessive dependency and dwelling on past." },
      neutral: { tr: "Venüs Yengeç burcunda. Ailevi bağlar ve ev güzelliği temaları aktif.", en: "Venus in Cancer. Family bonds and home beauty themes active." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: Aile ilişkilerini ve ev değerlerini gözden geçir.", en: "⚠️ VENUS RETROGRADE: Review family relationships and home values." }
    },
    Leo: {
      positive: { tr: "Aslan'daki Venüs dramatik romantizm ve gösterişli güzellik getiriyor.", en: "Venus in Leo brings dramatic romance and showy beauty." },
      negative: { tr: "Aslan'daki Venüs dikkat bağımlılığı ve aşırı gösteriş yaratabilir.", en: "Venus in Leo can create attention dependency and excessive showing off." },
      neutral: { tr: "Venüs Aslan burcunda. Yaratıcı aşk ve lüks temaları gündemde.", en: "Venus in Leo. Creative love and luxury themes prominent." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: Yaratıcı projeler ve romantik ifadeyi gözden geçir.", en: "⚠️ VENUS RETROGRADE: Review creative projects and romantic expression." }
    },
    Virgo: {
      positive: { tr: "Başak'taki Venüs pratik aşk ve sade güzellik anlayışı veriyor.", en: "Venus in Virgo gives practical love and simple beauty sense." },
      negative: { tr: "Başak'taki Venüs aşırı eleştiri ve mükemmeliyetçilik yaratabilir.", en: "Venus in Virgo can create over-criticism and perfectionism." },
      neutral: { tr: "Venüs Başak burcunda. Hizmet odaklı aşk ve sağlıklı güzellik temaları aktif.", en: "Venus in Virgo. Service-oriented love and healthy beauty themes active." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: İlişkilerdeki düzen ve sağlık rutinlerini gözden geçir.", en: "⚠️ VENUS RETROGRADE: Review order in relationships and health routines." }
    },
    Libra: {
      positive: { tr: "Terazi'deki Venüs evinde - ilişki uyumu, estetik ve diplomasi dorukta.", en: "Venus in Libra is at home - relationship harmony, aesthetics and diplomacy peak." },
      negative: { tr: "Terazi'deki Venüs kararsızlık ve uyum için özveriden kaçınma yaratabilir.", en: "Venus in Libra can create indecision and avoiding self-sacrifice for harmony." },
      neutral: { tr: "Venüs Terazi burcunda çok güçlü. Ortaklık ve adalet temaları gündemde.", en: "Venus in Libra is very strong. Partnership and justice themes prominent." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: Tüm ilişkileri ve adalet anlayışını gözden geçir.", en: "⚠️ VENUS RETROGRADE: Review all relationships and sense of justice." }
    },
    Scorpio: {
      positive: { tr: "Akrep'teki Venüs yoğun tutku ve dönüştürücü aşk getiriyor.", en: "Venus in Scorpio brings intense passion and transformative love." },
      negative: { tr: "Akrep'teki Venüs kıskançlık, possesiflik ve güç oyunları yaratabilir.", en: "Venus in Scorpio can create jealousy, possessiveness and power games." },
      neutral: { tr: "Venüs Akrep burcunda. Derin bağlar ve dönüşüm temaları aktif.", en: "Venus in Scorpio. Deep bonds and transformation themes active." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: Derin ilişki kalıplarını ve güç dinamiklerini gözden geçir.", en: "⚠️ VENUS RETROGRADE: Review deep relationship patterns and power dynamics." }
    },
    Sagittarius: {
      positive: { tr: "Yay'daki Venüs maceracı aşk ve kültürel çekicilik sağlıyor.", en: "Venus in Sagittarius provides adventurous love and cultural charm." },
      negative: { tr: "Yay'daki Venüs taahhütten kaçınma ve yüzeysel romantizm yaratabilir.", en: "Venus in Sagittarius can create commitment avoidance and superficial romance." },
      neutral: { tr: "Venüs Yay burcunda. Özgür aşk ve felsefi güzellik temaları gündemde.", en: "Venus in Sagittarius. Free love and philosophical beauty themes prominent." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: Aşk inançlarını ve özgürlük-taahhüt dengesini gözden geçir.", en: "⚠️ VENUS RETROGRADE: Review love beliefs and freedom-commitment balance." }
    },
    Capricorn: {
      positive: { tr: "Oğlak'taki Venüs olgun aşk ve kalıcı değerler getiriyor.", en: "Venus in Capricorn brings mature love and lasting values." },
      negative: { tr: "Oğlak'taki Venüs soğuk romantizm ve statü odaklı ilişkiler yaratabilir.", en: "Venus in Capricorn can create cold romance and status-oriented relationships." },
      neutral: { tr: "Venüs Oğlak burcunda. Ciddi ilişkiler ve maddi güvenlik temaları aktif.", en: "Venus in Capricorn. Serious relationships and material security themes active." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: Kariyer ve ilişki dengesini gözden geçir.", en: "⚠️ VENUS RETROGRADE: Review career and relationship balance." }
    },
    Aquarius: {
      positive: { tr: "Kova'daki Venüs özgün aşk ve entelektüel çekicilik sağlıyor.", en: "Venus in Aquarius provides unique love and intellectual charm." },
      negative: { tr: "Kova'daki Venüs duygusal mesafe ve geleneksel olmayan ilişki sorunları yaratabilir.", en: "Venus in Aquarius can create emotional distance and unconventional relationship issues." },
      neutral: { tr: "Venüs Kova burcunda. Arkadaşça aşk ve toplumsal değerler temaları gündemde.", en: "Venus in Aquarius. Friendly love and social values themes prominent." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: Sosyal bağlantıları ve değer sistemini gözden geçir.", en: "⚠️ VENUS RETROGRADE: Review social connections and value system." }
    },
    Pisces: {
      positive: { tr: "Balık'taki Venüs en güçlü - sınırsız aşk, spiritüel güzellik ve şefkat dorukta.", en: "Venus in Pisces is strongest - limitless love, spiritual beauty and compassion peak." },
      negative: { tr: "Balık'taki Venüs hayalci romantizm ve sınır sorunları yaratabilir.", en: "Venus in Pisces can create dreamy romance and boundary issues." },
      neutral: { tr: "Venüs Balık burcunda çok yüksek. Şiirsel aşk ve ruhsal güzellik temaları aktif.", en: "Venus in Pisces is exalted. Poetic love and soulful beauty themes active." },
      retrograde: { tr: "⚠️ VENÜS RETROGRAD: Romantik hayalleri ve spiritüel bağlantıları gözden geçir.", en: "⚠️ VENUS RETROGRADE: Review romantic dreams and spiritual connections." }
    }
  },
  Mars: {
    Aries: {
      positive: { tr: "Mars Koç'ta evinde - enerji, cesaret ve girişimcilik dorukta. Harekete geç!", en: "Mars in Aries is at home - energy, courage and initiative peak. Take action!" },
      negative: { tr: "Koç'taki Mars kontrolsüz öfke ve çatışma yaratabilir. Enerjini yönet.", en: "Mars in Aries can create uncontrolled anger and conflict. Manage your energy." },
      neutral: { tr: "Mars Koç burcunda güçlü. Eylem ve rekabet temaları gündemde.", en: "Mars in Aries is strong. Action and competition themes prominent." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: Enerji içe dönük. Önemli eylemleri ertele. Geçmişteki projeleri tamamla. Öfke patlamaları olabilir.", en: "⚠️ MARS RETROGRADE: Energy turns inward. Postpone major actions. Complete past projects. Anger outbursts possible." }
    },
    Taurus: {
      positive: { tr: "Boğa'daki Mars kararlı ve istikrarlı enerji sağlıyor. Sabırla hedefine ulaş.", en: "Mars in Taurus provides determined and stable energy. Reach your goal with patience." },
      negative: { tr: "Boğa'daki Mars inatçılık ve yavaş tepki yaratabilir.", en: "Mars in Taurus can create stubbornness and slow reactions." },
      neutral: { tr: "Mars Boğa burcunda. Pratik eylem ve maddi hedefler temaları aktif.", en: "Mars in Taurus. Practical action and material goals themes active." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: Finansal eylemleri gözden geçir. Fiziksel enerjinde düşüş olabilir.", en: "⚠️ MARS RETROGRADE: Review financial actions. Physical energy may drop." }
    },
    Gemini: {
      positive: { tr: "İkizler'deki Mars zihinsel çeviklik ve çok yönlü eylem kapasitesi veriyor.", en: "Mars in Gemini gives mental agility and versatile action capacity." },
      negative: { tr: "İkizler'deki Mars dağınık enerji ve sözlü çatışmalar yaratabilir.", en: "Mars in Gemini can create scattered energy and verbal conflicts." },
      neutral: { tr: "Mars İkizler burcunda. İletişimde eylem ve çok görevlilik temaları gündemde.", en: "Mars in Gemini. Communication action and multitasking themes prominent." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: İletişim çatışmalarına dikkat. Yarım kalan projeleri tamamla.", en: "⚠️ MARS RETROGRADE: Watch for communication conflicts. Complete unfinished projects." }
    },
    Cancer: {
      positive: { tr: "Yengeç'teki Mars koruyucu enerji ve ailevi motivasyon sağlıyor.", en: "Mars in Cancer provides protective energy and family motivation." },
      negative: { tr: "Yengeç'teki Mars pasif-agresif davranışlar ve duygusal tepkisellik yaratabilir.", en: "Mars in Cancer can create passive-aggressive behavior and emotional reactivity." },
      neutral: { tr: "Mars Yengeç burcunda. Duygusal eylem ve ev koruma temaları aktif.", en: "Mars in Cancer. Emotional action and home protection themes active." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: Aile çatışmalarını gözden geçir. Duygusal tepkileri kontrol et.", en: "⚠️ MARS RETROGRADE: Review family conflicts. Control emotional reactions." }
    },
    Leo: {
      positive: { tr: "Aslan'daki Mars yaratıcı enerji ve liderlik gücü veriyor.", en: "Mars in Leo gives creative energy and leadership power." },
      negative: { tr: "Aslan'daki Mars kibir ve dramatik çatışmalar yaratabilir.", en: "Mars in Leo can create arrogance and dramatic conflicts." },
      neutral: { tr: "Mars Aslan burcunda. Yaratıcı eylem ve gösteriş temaları gündemde.", en: "Mars in Leo. Creative action and showmanship themes prominent." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: Yaratıcı projeleri gözden geçir. Ego çatışmalarına dikkat.", en: "⚠️ MARS RETROGRADE: Review creative projects. Watch for ego conflicts." }
    },
    Virgo: {
      positive: { tr: "Başak'taki Mars verimli çalışma ve detaylı eylem kapasitesi sağlıyor.", en: "Mars in Virgo provides efficient work and detailed action capacity." },
      negative: { tr: "Başak'taki Mars aşırı eleştiri ve sağlık kaygısı yaratabilir.", en: "Mars in Virgo can create over-criticism and health anxiety." },
      neutral: { tr: "Mars Başak burcunda. Pratik eylem ve iyileştirme temaları aktif.", en: "Mars in Virgo. Practical action and improvement themes active." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: İş süreçlerini ve sağlık rutinlerini gözden geçir.", en: "⚠️ MARS RETROGRADE: Review work processes and health routines." }
    },
    Libra: {
      positive: { tr: "Terazi'deki Mars diplomatik eylem ve işbirliği kapasitesi veriyor.", en: "Mars in Libra gives diplomatic action and cooperation capacity." },
      negative: { tr: "Terazi'deki Mars kararsızlık ve pasif çatışma yaratabilir.", en: "Mars in Libra can create indecision and passive conflict." },
      neutral: { tr: "Mars Terazi burcunda. İlişkisel eylem ve adalet temaları gündemde.", en: "Mars in Libra. Relational action and justice themes prominent." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: İlişki çatışmalarını gözden geçir. Geçmiş ortaklıkları çöz.", en: "⚠️ MARS RETROGRADE: Review relationship conflicts. Resolve past partnerships." }
    },
    Scorpio: {
      positive: { tr: "Akrep'teki Mars güçlü - yoğun kararlılık ve dönüştürücü eylem gücü dorukta.", en: "Mars in Scorpio is powerful - intense determination and transformative action force peak." },
      negative: { tr: "Akrep'teki Mars intikam ve kontrol arzusu yaratabilir.", en: "Mars in Scorpio can create revenge and desire for control." },
      neutral: { tr: "Mars Akrep burcunda çok güçlü. Derin eylem ve gizli güç temaları aktif.", en: "Mars in Scorpio is very strong. Deep action and hidden power themes active." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: Güç mücadelelerini ve gizli öfkeyi gözden geçir.", en: "⚠️ MARS RETROGRADE: Review power struggles and hidden anger." }
    },
    Sagittarius: {
      positive: { tr: "Yay'daki Mars maceracı enerji ve genişleme motivasyonu sağlıyor.", en: "Mars in Sagittarius provides adventurous energy and expansion motivation." },
      negative: { tr: "Yay'daki Mars aşırı güven ve dikkatsizlik yaratabilir.", en: "Mars in Sagittarius can create overconfidence and carelessness." },
      neutral: { tr: "Mars Yay burcunda. Keşif eylemi ve idealist savaş temaları gündemde.", en: "Mars in Sagittarius. Exploration action and idealistic fight themes prominent." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: Seyahat planlarını ve felsefi mücadeleleri gözden geçir.", en: "⚠️ MARS RETROGRADE: Review travel plans and philosophical struggles." }
    },
    Capricorn: {
      positive: { tr: "Oğlak'taki Mars en güçlü - disiplinli eylem ve kariyer motivasyonu dorukta.", en: "Mars in Capricorn is strongest - disciplined action and career motivation peak." },
      negative: { tr: "Oğlak'taki Mars katı kontrol ve aşırı çalışma yaratabilir.", en: "Mars in Capricorn can create rigid control and overwork." },
      neutral: { tr: "Mars Oğlak burcunda çok yüksek. Stratejik eylem ve otorite temaları aktif.", en: "Mars in Capricorn is exalted. Strategic action and authority themes active." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: Kariyer eylemlerini ve otorite çatışmalarını gözden geçir.", en: "⚠️ MARS RETROGRADE: Review career actions and authority conflicts." }
    },
    Aquarius: {
      positive: { tr: "Kova'daki Mars yenilikçi eylem ve grup aktivizmi kapasitesi veriyor.", en: "Mars in Aquarius gives innovative action and group activism capacity." },
      negative: { tr: "Kova'daki Mars isyan ve öngörülemeyen davranışlar yaratabilir.", en: "Mars in Aquarius can create rebellion and unpredictable behavior." },
      neutral: { tr: "Mars Kova burcunda. Devrimci eylem ve toplumsal mücadele temaları gündemde.", en: "Mars in Aquarius. Revolutionary action and social struggle themes prominent." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: Grup dinamiklerini ve sosyal eylemleri gözden geçir.", en: "⚠️ MARS RETROGRADE: Review group dynamics and social actions." }
    },
    Pisces: {
      positive: { tr: "Balık'taki Mars spiritüel motivasyon ve yaratıcı eylem kapasitesi sağlıyor.", en: "Mars in Pisces provides spiritual motivation and creative action capacity." },
      negative: { tr: "Balık'taki Mars pasiflik ve yönelim kaybı yaratabilir.", en: "Mars in Pisces can create passivity and loss of direction." },
      neutral: { tr: "Mars Balık burcunda. Sezgisel eylem ve şefkatli mücadele temaları aktif.", en: "Mars in Pisces. Intuitive action and compassionate struggle themes active." },
      retrograde: { tr: "⚠️ MARS RETROGRAD: Spiritüel motivasyonu ve hayalleri gözden geçir.", en: "⚠️ MARS RETROGRADE: Review spiritual motivation and dreams." }
    }
  },
  Jupiter: {
    Aries: {
      positive: { tr: "Jüpiter Koç'ta girişimcilik ve cesaret şansı getiriyor. Yeni başlangıçlar destekleniyor.", en: "Jupiter in Aries brings entrepreneurship and courage luck. New beginnings supported." },
      negative: { tr: "Koç'taki Jüpiter aşırı güven ve aceleci genişleme yaratabilir.", en: "Jupiter in Aries can create overconfidence and hasty expansion." },
      neutral: { tr: "Jüpiter Koç burcunda. Bireysel genişleme ve liderlik şansı temaları gündemde.", en: "Jupiter in Aries. Individual expansion and leadership luck themes prominent." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: İç bilgeliğe yönel. Büyüme planlarını gözden geçir. İnançlarını sorgula.", en: "⚠️ JUPITER RETROGRADE: Turn to inner wisdom. Review growth plans. Question beliefs." }
    },
    Taurus: {
      positive: { tr: "Boğa'daki Jüpiter maddi bolluk ve değer artışı getiriyor.", en: "Jupiter in Taurus brings material abundance and value increase." },
      negative: { tr: "Boğa'daki Jüpiter aşırı konfor arayışı ve durağan genişleme yaratabilir.", en: "Jupiter in Taurus can create excessive comfort seeking and stagnant expansion." },
      neutral: { tr: "Jüpiter Boğa burcunda. Maddi şans ve değer genişlemesi temaları aktif.", en: "Jupiter in Taurus. Material luck and value expansion themes active." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: Değerlerini ve maddi hedeflerini gözden geçir.", en: "⚠️ JUPITER RETROGRADE: Review values and material goals." }
    },
    Gemini: {
      positive: { tr: "İkizler'deki Jüpiter entelektüel genişleme ve iletişim şansı sağlıyor.", en: "Jupiter in Gemini provides intellectual expansion and communication luck." },
      negative: { tr: "İkizler'deki Jüpiter bilgi dağınıklığı ve yüzeysel öğrenme yaratabilir.", en: "Jupiter in Gemini can create information scatter and superficial learning." },
      neutral: { tr: "Jüpiter İkizler burcunda. Öğrenme şansı ve çeşitli fırsatlar gündemde.", en: "Jupiter in Gemini. Learning luck and diverse opportunities prominent." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: Öğrenme ve iletişim kalıplarını gözden geçir.", en: "⚠️ JUPITER RETROGRADE: Review learning and communication patterns." }
    },
    Cancer: {
      positive: { tr: "Yengeç'teki Jüpiter en güçlü - aile şansı, duygusal genişleme ve yuva bolluğu dorukta.", en: "Jupiter in Cancer is strongest - family luck, emotional expansion and home abundance peak." },
      negative: { tr: "Yengeç'teki Jüpiter aşırı korumacılık ve duygusal bağımlılık yaratabilir.", en: "Jupiter in Cancer can create overprotection and emotional dependency." },
      neutral: { tr: "Jüpiter Yengeç burcunda çok yüksek. Ailevi şans ve duygusal büyüme temaları aktif.", en: "Jupiter in Cancer is exalted. Family luck and emotional growth themes active." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: Aile inançlarını ve duygusal kalıpları gözden geçir.", en: "⚠️ JUPITER RETROGRADE: Review family beliefs and emotional patterns." }
    },
    Leo: {
      positive: { tr: "Aslan'daki Jüpiter yaratıcı şans ve görkemli genişleme getiriyor.", en: "Jupiter in Leo brings creative luck and magnificent expansion." },
      negative: { tr: "Aslan'daki Jüpiter kibir ve aşırı gösteriş yaratabilir.", en: "Jupiter in Leo can create arrogance and excessive showing off." },
      neutral: { tr: "Jüpiter Aslan burcunda. Yaratıcı şans ve liderlik genişlemesi temaları gündemde.", en: "Jupiter in Leo. Creative luck and leadership expansion themes prominent." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: Yaratıcı vizyonu ve ego'yu gözden geçir.", en: "⚠️ JUPITER RETROGRADE: Review creative vision and ego." }
    },
    Virgo: {
      positive: { tr: "Başak'taki Jüpiter pratik şans ve hizmet genişlemesi sağlıyor.", en: "Jupiter in Virgo provides practical luck and service expansion." },
      negative: { tr: "Başak'taki Jüpiter aşırı analiz ve eleştiri yaratabilir.", en: "Jupiter in Virgo can create over-analysis and criticism." },
      neutral: { tr: "Jüpiter Başak burcunda. Detaylı büyüme ve sağlık şansı temaları aktif.", en: "Jupiter in Virgo. Detailed growth and health luck themes active." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: Çalışma ve sağlık rutinlerini gözden geçir.", en: "⚠️ JUPITER RETROGRADE: Review work and health routines." }
    },
    Libra: {
      positive: { tr: "Terazi'deki Jüpiter ilişki şansı ve adil genişleme getiriyor.", en: "Jupiter in Libra brings relationship luck and fair expansion." },
      negative: { tr: "Terazi'deki Jüpiter aşırı uzlaşma arayışı ve kararsızlık yaratabilir.", en: "Jupiter in Libra can create excessive compromise seeking and indecision." },
      neutral: { tr: "Jüpiter Terazi burcunda. Ortaklık şansı ve denge genişlemesi temaları gündemde.", en: "Jupiter in Libra. Partnership luck and balance expansion themes prominent." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: İlişki inançlarını ve adalet anlayışını gözden geçir.", en: "⚠️ JUPITER RETROGRADE: Review relationship beliefs and sense of justice." }
    },
    Scorpio: {
      positive: { tr: "Akrep'teki Jüpiter dönüşüm şansı ve derin genişleme sağlıyor.", en: "Jupiter in Scorpio provides transformation luck and deep expansion." },
      negative: { tr: "Akrep'teki Jüpiter aşırı yoğunluk ve kontrol arzusu yaratabilir.", en: "Jupiter in Scorpio can create excessive intensity and desire for control." },
      neutral: { tr: "Jüpiter Akrep burcunda. Gizli şans ve dönüşüm büyümesi temaları aktif.", en: "Jupiter in Scorpio. Hidden luck and transformation growth themes active." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: Derin inançları ve dönüşüm süreçlerini gözden geçir.", en: "⚠️ JUPITER RETROGRADE: Review deep beliefs and transformation processes." }
    },
    Sagittarius: {
      positive: { tr: "Yay'daki Jüpiter evinde - şans, özgürlük ve bilgelik genişlemesi dorukta.", en: "Jupiter in Sagittarius is at home - luck, freedom and wisdom expansion peak." },
      negative: { tr: "Yay'daki Jüpiter aşırı iyimserlik ve sorumsuzluk yaratabilir.", en: "Jupiter in Sagittarius can create over-optimism and irresponsibility." },
      neutral: { tr: "Jüpiter Yay burcunda çok güçlü. Macera şansı ve felsefi genişleme temaları gündemde.", en: "Jupiter in Sagittarius is very strong. Adventure luck and philosophical expansion themes prominent." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: Hayat felsefeni ve inançlarını derinlemesine gözden geçir.", en: "⚠️ JUPITER RETROGRADE: Deeply review life philosophy and beliefs." }
    },
    Capricorn: {
      positive: { tr: "Oğlak'taki Jüpiter disiplinli büyüme ve kariyer şansı getiriyor.", en: "Jupiter in Capricorn brings disciplined growth and career luck." },
      negative: { tr: "Oğlak'taki Jüpiter aşırı ciddiyet ve kısıtlı genişleme yaratabilir.", en: "Jupiter in Capricorn can create excessive seriousness and restricted expansion." },
      neutral: { tr: "Jüpiter Oğlak burcunda. Yapısal şans ve profesyonel büyüme temaları aktif.", en: "Jupiter in Capricorn. Structural luck and professional growth themes active." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: Kariyer hedeflerini ve başarı inançlarını gözden geçir.", en: "⚠️ JUPITER RETROGRADE: Review career goals and success beliefs." }
    },
    Aquarius: {
      positive: { tr: "Kova'daki Jüpiter yenilikçi şans ve toplumsal genişleme sağlıyor.", en: "Jupiter in Aquarius provides innovative luck and social expansion." },
      negative: { tr: "Kova'daki Jüpiter aşırı idealizm ve mesafeli büyüme yaratabilir.", en: "Jupiter in Aquarius can create excessive idealism and detached growth." },
      neutral: { tr: "Jüpiter Kova burcunda. Sosyal şans ve özgün genişleme temaları gündemde.", en: "Jupiter in Aquarius. Social luck and original expansion themes prominent." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: Sosyal vizyonu ve gelecek inançlarını gözden geçir.", en: "⚠️ JUPITER RETROGRADE: Review social vision and future beliefs." }
    },
    Pisces: {
      positive: { tr: "Balık'taki Jüpiter güçlü - spiritüel şans ve sınırsız genişleme dorukta.", en: "Jupiter in Pisces is strong - spiritual luck and limitless expansion peak." },
      negative: { tr: "Balık'taki Jüpiter aşırı idealizm ve kaçış eğilimi yaratabilir.", en: "Jupiter in Pisces can create excessive idealism and escape tendency." },
      neutral: { tr: "Jüpiter Balık burcunda çok güçlü. Ruhsal şans ve hayalci büyüme temaları aktif.", en: "Jupiter in Pisces is very strong. Spiritual luck and dreamy growth themes active." },
      retrograde: { tr: "⚠️ JÜPİTER RETROGRAD: Spiritüel inançları ve hayalleri gözden geçir.", en: "⚠️ JUPITER RETROGRADE: Review spiritual beliefs and dreams." }
    }
  },
  Saturn: {
    Aries: {
      positive: { tr: "Satürn Koç'ta disiplinli girişimcilik ve olgun liderlik öğretiyor.", en: "Saturn in Aries teaches disciplined entrepreneurship and mature leadership." },
      negative: { tr: "Koç'taki Satürn engellenmiş girişim ve öfke baskısı yaratabilir.", en: "Saturn in Aries can create blocked initiative and suppressed anger." },
      neutral: { tr: "Satürn Koç burcunda. Bireysel sorumluluk ve sabırlı eylem temaları gündemde.", en: "Saturn in Aries. Individual responsibility and patient action themes prominent." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: Karmik dersler yoğunlaşıyor. Sorumluluk ve yapı konularını gözden geçir. Geçmişten gelen engelleri çöz.", en: "⚠️ SATURN RETROGRADE: Karmic lessons intensify. Review responsibility and structure issues. Resolve blocks from the past." }
    },
    Taurus: {
      positive: { tr: "Boğa'daki Satürn maddi disiplin ve kalıcı değer inşası sağlıyor.", en: "Saturn in Taurus provides material discipline and lasting value building." },
      negative: { tr: "Boğa'daki Satürn maddi kısıtlamalar ve değer kaygısı yaratabilir.", en: "Saturn in Taurus can create material restrictions and value anxiety." },
      neutral: { tr: "Satürn Boğa burcunda. Finansal sorumluluk ve istikrarlı yapı temaları aktif.", en: "Saturn in Taurus. Financial responsibility and stable structure themes active." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: Değer sistemi ve maddi yapıyı gözden geçir.", en: "⚠️ SATURN RETROGRADE: Review value system and material structure." }
    },
    Gemini: {
      positive: { tr: "İkizler'deki Satürn disiplinli iletişim ve yapısal öğrenme getiriyor.", en: "Saturn in Gemini brings disciplined communication and structural learning." },
      negative: { tr: "İkizler'deki Satürn iletişim engelleri ve öğrenme zorlukları yaratabilir.", en: "Saturn in Gemini can create communication blocks and learning difficulties." },
      neutral: { tr: "Satürn İkizler burcunda. Zihinsel disiplin ve sorumlu iletişim temaları gündemde.", en: "Saturn in Gemini. Mental discipline and responsible communication themes prominent." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: İletişim yapılarını ve öğrenme kalıplarını gözden geçir.", en: "⚠️ SATURN RETROGRADE: Review communication structures and learning patterns." }
    },
    Cancer: {
      positive: { tr: "Yengeç'teki Satürn duygusal olgunluk ve aile sorumluluğu öğretiyor.", en: "Saturn in Cancer teaches emotional maturity and family responsibility." },
      negative: { tr: "Yengeç'teki Satürn duygusal baskı ve aile yükleri yaratabilir.", en: "Saturn in Cancer can create emotional suppression and family burdens." },
      neutral: { tr: "Satürn Yengeç burcunda. Ailevi sorumluluk ve duygusal yapı temaları aktif.", en: "Saturn in Cancer. Family responsibility and emotional structure themes active." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: Aile yapısını ve duygusal sınırları gözden geçir.", en: "⚠️ SATURN RETROGRADE: Review family structure and emotional boundaries." }
    },
    Leo: {
      positive: { tr: "Aslan'daki Satürn disiplinli yaratıcılık ve olgun özgüven getiriyor.", en: "Saturn in Leo brings disciplined creativity and mature self-confidence." },
      negative: { tr: "Aslan'daki Satürn engellenmiş ifade ve ego baskısı yaratabilir.", en: "Saturn in Leo can create blocked expression and ego suppression." },
      neutral: { tr: "Satürn Aslan burcunda. Yaratıcı sorumluluk ve liderlik yapısı temaları gündemde.", en: "Saturn in Leo. Creative responsibility and leadership structure themes prominent." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: Yaratıcı yapıyı ve kimlik sınırlarını gözden geçir.", en: "⚠️ SATURN RETROGRADE: Review creative structure and identity boundaries." }
    },
    Virgo: {
      positive: { tr: "Başak'taki Satürn verimli disiplin ve pratik mükemmellik sağlıyor.", en: "Saturn in Virgo provides efficient discipline and practical perfection." },
      negative: { tr: "Başak'taki Satürn aşırı eleştiri ve iş baskısı yaratabilir.", en: "Saturn in Virgo can create over-criticism and work pressure." },
      neutral: { tr: "Satürn Başak burcunda. İş disiplini ve sağlık yapısı temaları aktif.", en: "Saturn in Virgo. Work discipline and health structure themes active." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: Çalışma rutinlerini ve sağlık yapısını gözden geçir.", en: "⚠️ SATURN RETROGRADE: Review work routines and health structure." }
    },
    Libra: {
      positive: { tr: "Terazi'deki Satürn en güçlü - olgun ilişkiler ve adil yapı dorukta.", en: "Saturn in Libra is strongest - mature relationships and fair structure peak." },
      negative: { tr: "Terazi'deki Satürn ilişki yükleri ve aşırı sorumluluk yaratabilir.", en: "Saturn in Libra can create relationship burdens and excessive responsibility." },
      neutral: { tr: "Satürn Terazi burcunda çok yüksek. İlişki yapısı ve adalet temaları gündemde.", en: "Saturn in Libra is exalted. Relationship structure and justice themes prominent." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: İlişki yapılarını ve adalet kalıplarını gözden geçir.", en: "⚠️ SATURN RETROGRADE: Review relationship structures and justice patterns." }
    },
    Scorpio: {
      positive: { tr: "Akrep'teki Satürn derin disiplin ve dönüşümsel olgunluk getiriyor.", en: "Saturn in Scorpio brings deep discipline and transformational maturity." },
      negative: { tr: "Akrep'teki Satürn kontrol kaygısı ve gizli korkular yaratabilir.", en: "Saturn in Scorpio can create control anxiety and hidden fears." },
      neutral: { tr: "Satürn Akrep burcunda. Dönüşüm sorumluluğu ve güç yapısı temaları aktif.", en: "Saturn in Scorpio. Transformation responsibility and power structure themes active." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: Güç dinamiklerini ve kontrol kalıplarını gözden geçir.", en: "⚠️ SATURN RETROGRADE: Review power dynamics and control patterns." }
    },
    Sagittarius: {
      positive: { tr: "Yay'daki Satürn disiplinli bilgelik ve olgun inanç sistemi sağlıyor.", en: "Saturn in Sagittarius provides disciplined wisdom and mature belief system." },
      negative: { tr: "Yay'daki Satürn inanç kısıtlamaları ve özgürlük engelleri yaratabilir.", en: "Saturn in Sagittarius can create belief restrictions and freedom blocks." },
      neutral: { tr: "Satürn Yay burcunda. Felsefi sorumluluk ve öğretim yapısı temaları gündemde.", en: "Saturn in Sagittarius. Philosophical responsibility and teaching structure themes prominent." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: İnanç sistemini ve hayat felsefesini gözden geçir.", en: "⚠️ SATURN RETROGRADE: Review belief system and life philosophy." }
    },
    Capricorn: {
      positive: { tr: "Oğlak'taki Satürn evinde - kariyer disiplini, otorite ve yapı dorukta.", en: "Saturn in Capricorn is at home - career discipline, authority and structure peak." },
      negative: { tr: "Oğlak'taki Satürn aşırı ciddiyet ve iş baskısı yaratabilir.", en: "Saturn in Capricorn can create excessive seriousness and work pressure." },
      neutral: { tr: "Satürn Oğlak burcunda çok güçlü. Kariyer yapısı ve toplumsal sorumluluk temaları aktif.", en: "Saturn in Capricorn is very strong. Career structure and social responsibility themes active." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: Kariyer yapısını ve otorite ilişkilerini gözden geçir.", en: "⚠️ SATURN RETROGRADE: Review career structure and authority relationships." }
    },
    Aquarius: {
      positive: { tr: "Kova'daki Satürn güçlü - sosyal sorumluluk ve yenilikçi yapı dorukta.", en: "Saturn in Aquarius is strong - social responsibility and innovative structure peak." },
      negative: { tr: "Kova'daki Satürn sosyal baskı ve grup kısıtlamaları yaratabilir.", en: "Saturn in Aquarius can create social pressure and group restrictions." },
      neutral: { tr: "Satürn Kova burcunda güçlü. Toplumsal yapı ve gelecek sorumluluğu temaları gündemde.", en: "Saturn in Aquarius is strong. Social structure and future responsibility themes prominent." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: Sosyal yapıları ve grup dinamiklerini gözden geçir.", en: "⚠️ SATURN RETROGRADE: Review social structures and group dynamics." }
    },
    Pisces: {
      positive: { tr: "Balık'taki Satürn spiritüel disiplin ve ruhsal olgunluk getiriyor.", en: "Saturn in Pisces brings spiritual discipline and soulful maturity." },
      negative: { tr: "Balık'taki Satürn gizli korkular ve kaçış kısıtlamaları yaratabilir.", en: "Saturn in Pisces can create hidden fears and escape restrictions." },
      neutral: { tr: "Satürn Balık burcunda. Spiritüel sorumluluk ve bilinçaltı yapı temaları aktif.", en: "Saturn in Pisces. Spiritual responsibility and subconscious structure themes active." },
      retrograde: { tr: "⚠️ SATÜRN RETROGRAD: Spiritüel yapıyı ve bilinçaltı kalıpları gözden geçir.", en: "⚠️ SATURN RETROGRADE: Review spiritual structure and subconscious patterns." }
    }
  },
  Uranus: {
    Aries: {
      positive: { tr: "Uranüs Koç'ta devrimci girişimcilik ve radikal yenilik getiriyor.", en: "Uranus in Aries brings revolutionary entrepreneurship and radical innovation." },
      negative: { tr: "Koç'taki Uranüs ani değişimler ve isyankar davranışlar yaratabilir.", en: "Uranus in Aries can create sudden changes and rebellious behavior." },
      neutral: { tr: "Uranüs Koç burcunda. Bireysel özgürleşme ve beklenmedik başlangıçlar temaları gündemde.", en: "Uranus in Aries. Individual liberation and unexpected beginnings themes prominent." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: İç devrim zamanı. Özgürlük anlayışını gözden geçir. Ani değişimlere hazırlan.", en: "⚠️ URANUS RETROGRADE: Time for inner revolution. Review freedom concept. Prepare for sudden changes." }
    },
    Taurus: {
      positive: { tr: "Boğa'daki Uranüs değer devrimi ve finansal yenilik sağlıyor.", en: "Uranus in Taurus provides value revolution and financial innovation." },
      negative: { tr: "Boğa'daki Uranüs maddi istikrarsızlık ve beklenmedik kayıplar yaratabilir.", en: "Uranus in Taurus can create material instability and unexpected losses." },
      neutral: { tr: "Uranüs Boğa burcunda. Değer sistemi devrimi ve maddi yenilik temaları aktif.", en: "Uranus in Taurus. Value system revolution and material innovation themes active." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: Değer devrimini ve maddi yenilikleri gözden geçir.", en: "⚠️ URANUS RETROGRADE: Review value revolution and material innovations." }
    },
    Gemini: {
      positive: { tr: "İkizler'deki Uranüs zihinsel devrim ve iletişim yeniliği getiriyor.", en: "Uranus in Gemini brings mental revolution and communication innovation." },
      negative: { tr: "İkizler'deki Uranüs zihinsel kaos ve iletişim şokları yaratabilir.", en: "Uranus in Gemini can create mental chaos and communication shocks." },
      neutral: { tr: "Uranüs İkizler burcunda. Düşünce devrimi ve bilgi yeniliği temaları gündemde.", en: "Uranus in Gemini. Thought revolution and information innovation themes prominent." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: İletişim kalıplarını ve düşünce yapısını gözden geçir.", en: "⚠️ URANUS RETROGRADE: Review communication patterns and thought structure." }
    },
    Cancer: {
      positive: { tr: "Yengeç'teki Uranüs aile devrimi ve duygusal özgürleşme sağlıyor.", en: "Uranus in Cancer provides family revolution and emotional liberation." },
      negative: { tr: "Yengeç'teki Uranüs ailevi şoklar ve duygusal istikrarsızlık yaratabilir.", en: "Uranus in Cancer can create family shocks and emotional instability." },
      neutral: { tr: "Uranüs Yengeç burcunda. Ev devrimi ve duygusal yenilik temaları aktif.", en: "Uranus in Cancer. Home revolution and emotional innovation themes active." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: Aile yapısını ve duygusal özgürlüğü gözden geçir.", en: "⚠️ URANUS RETROGRADE: Review family structure and emotional freedom." }
    },
    Leo: {
      positive: { tr: "Aslan'daki Uranüs yaratıcı devrim ve özgün ifade getiriyor.", en: "Uranus in Leo brings creative revolution and original expression." },
      negative: { tr: "Aslan'daki Uranüs ego şokları ve dramatik değişimler yaratabilir.", en: "Uranus in Leo can create ego shocks and dramatic changes." },
      neutral: { tr: "Uranüs Aslan burcunda. Yaratıcı devrim ve kimlik yeniliği temaları gündemde.", en: "Uranus in Leo. Creative revolution and identity innovation themes prominent." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: Yaratıcı özgürlüğü ve kimlik yapısını gözden geçir.", en: "⚠️ URANUS RETROGRADE: Review creative freedom and identity structure." }
    },
    Virgo: {
      positive: { tr: "Başak'taki Uranüs iş devrimi ve sağlık yeniliği sağlıyor.", en: "Uranus in Virgo provides work revolution and health innovation." },
      negative: { tr: "Başak'taki Uranüs iş şokları ve sağlık değişimleri yaratabilir.", en: "Uranus in Virgo can create work shocks and health changes." },
      neutral: { tr: "Uranüs Başak burcunda. Rutin devrimi ve hizmet yeniliği temaları aktif.", en: "Uranus in Virgo. Routine revolution and service innovation themes active." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: Çalışma yapısını ve sağlık rutinlerini gözden geçir.", en: "⚠️ URANUS RETROGRADE: Review work structure and health routines." }
    },
    Libra: {
      positive: { tr: "Terazi'deki Uranüs ilişki devrimi ve sosyal yenilik getiriyor.", en: "Uranus in Libra brings relationship revolution and social innovation." },
      negative: { tr: "Terazi'deki Uranüs ilişki şokları ve beklenmedik ayrılıklar yaratabilir.", en: "Uranus in Libra can create relationship shocks and unexpected separations." },
      neutral: { tr: "Uranüs Terazi burcunda. Ortaklık devrimi ve adalet yeniliği temaları gündemde.", en: "Uranus in Libra. Partnership revolution and justice innovation themes prominent." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: İlişki yapısını ve özgürlük-bağlılık dengesini gözden geçir.", en: "⚠️ URANUS RETROGRADE: Review relationship structure and freedom-commitment balance." }
    },
    Scorpio: {
      positive: { tr: "Akrep'teki Uranüs dönüşüm devrimi ve derin özgürleşme sağlıyor.", en: "Uranus in Scorpio provides transformation revolution and deep liberation." },
      negative: { tr: "Akrep'teki Uranüs güç şokları ve kontrol kaybı yaratabilir.", en: "Uranus in Scorpio can create power shocks and loss of control." },
      neutral: { tr: "Uranüs Akrep burcunda. Derin devrim ve güç yeniliği temaları aktif.", en: "Uranus in Scorpio. Deep revolution and power innovation themes active." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: Dönüşüm sürecini ve güç dinamiklerini gözden geçir.", en: "⚠️ URANUS RETROGRADE: Review transformation process and power dynamics." }
    },
    Sagittarius: {
      positive: { tr: "Yay'daki Uranüs felsefi devrim ve özgürlük genişlemesi getiriyor.", en: "Uranus in Sagittarius brings philosophical revolution and freedom expansion." },
      negative: { tr: "Yay'daki Uranüs inanç şokları ve aşırı isyan yaratabilir.", en: "Uranus in Sagittarius can create belief shocks and excessive rebellion." },
      neutral: { tr: "Uranüs Yay burcunda. İnanç devrimi ve vizyon yeniliği temaları gündemde.", en: "Uranus in Sagittarius. Belief revolution and vision innovation themes prominent." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: İnanç sistemini ve özgürlük anlayışını gözden geçir.", en: "⚠️ URANUS RETROGRADE: Review belief system and freedom concept." }
    },
    Capricorn: {
      positive: { tr: "Oğlak'taki Uranüs yapısal devrim ve kariyer yeniliği sağlıyor.", en: "Uranus in Capricorn provides structural revolution and career innovation." },
      negative: { tr: "Oğlak'taki Uranüs kariyer şokları ve otorite çatışmaları yaratabilir.", en: "Uranus in Capricorn can create career shocks and authority conflicts." },
      neutral: { tr: "Uranüs Oğlak burcunda. Sistem devrimi ve toplumsal yenilik temaları aktif.", en: "Uranus in Capricorn. System revolution and social innovation themes active." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: Kariyer yapısını ve otorite ilişkilerini gözden geçir.", en: "⚠️ URANUS RETROGRADE: Review career structure and authority relationships." }
    },
    Aquarius: {
      positive: { tr: "Kova'daki Uranüs evinde - toplumsal devrim, yenilik ve özgürlük dorukta.", en: "Uranus in Aquarius is at home - social revolution, innovation and freedom peak." },
      negative: { tr: "Kova'daki Uranüs aşırı radikalizm ve sosyal kopukluk yaratabilir.", en: "Uranus in Aquarius can create excessive radicalism and social disconnection." },
      neutral: { tr: "Uranüs Kova burcunda çok güçlü. İnsanlık devrimi ve gelecek yeniliği temaları gündemde.", en: "Uranus in Aquarius is very strong. Humanity revolution and future innovation themes prominent." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: Sosyal vizyonu ve bireysel özgürlüğü gözden geçir.", en: "⚠️ URANUS RETROGRADE: Review social vision and individual freedom." }
    },
    Pisces: {
      positive: { tr: "Balık'taki Uranüs spiritüel devrim ve sezgisel uyanış getiriyor.", en: "Uranus in Pisces brings spiritual revolution and intuitive awakening." },
      negative: { tr: "Balık'taki Uranüs spiritüel şoklar ve gerçeklik kaybı yaratabilir.", en: "Uranus in Pisces can create spiritual shocks and reality loss." },
      neutral: { tr: "Uranüs Balık burcunda. Bilinçaltı devrimi ve ruhsal yenilik temaları aktif.", en: "Uranus in Pisces. Subconscious revolution and spiritual innovation themes active." },
      retrograde: { tr: "⚠️ URANÜS RETROGRAD: Spiritüel uyanışı ve sezgisel yapıyı gözden geçir.", en: "⚠️ URANUS RETROGRADE: Review spiritual awakening and intuitive structure." }
    }
  },
  Neptune: {
    Aries: {
      positive: { tr: "Neptün Koç'ta spiritüel cesaret ve ilham dolu eylem getiriyor.", en: "Neptune in Aries brings spiritual courage and inspired action." },
      negative: { tr: "Koç'taki Neptün yanılsamalı hedefler ve yön kaybı yaratabilir.", en: "Neptune in Aries can create illusory goals and loss of direction." },
      neutral: { tr: "Neptün Koç burcunda. Spiritüel eylem ve ilham dolu başlangıçlar temaları gündemde.", en: "Neptune in Aries. Spiritual action and inspired beginnings themes prominent." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: İç dünya derinleşiyor. Hayalleri ve yanılsamaları gözden geçir. Spiritüel farkındalık artıyor.", en: "⚠️ NEPTUNE RETROGRADE: Inner world deepens. Review dreams and illusions. Spiritual awareness increases." }
    },
    Taurus: {
      positive: { tr: "Boğa'daki Neptün spiritüel değerler ve sanatsal güzellik sağlıyor.", en: "Neptune in Taurus provides spiritual values and artistic beauty." },
      negative: { tr: "Boğa'daki Neptün maddi yanılsamalar ve değer karmaşası yaratabilir.", en: "Neptune in Taurus can create material illusions and value confusion." },
      neutral: { tr: "Neptün Boğa burcunda. Maddi spiritüalite ve değer idealizmi temaları aktif.", en: "Neptune in Taurus. Material spirituality and value idealism themes active." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: Değer algısını ve maddi hayalleri gözden geçir.", en: "⚠️ NEPTUNE RETROGRADE: Review value perception and material dreams." }
    },
    Gemini: {
      positive: { tr: "İkizler'deki Neptün sezgisel iletişim ve ilham dolu fikirler getiriyor.", en: "Neptune in Gemini brings intuitive communication and inspired ideas." },
      negative: { tr: "İkizler'deki Neptün iletişim karmaşası ve zihinsel bulanıklık yaratabilir.", en: "Neptune in Gemini can create communication confusion and mental fog." },
      neutral: { tr: "Neptün İkizler burcunda. Hayalci düşünce ve spiritüel iletişim temaları gündemde.", en: "Neptune in Gemini. Dreamy thinking and spiritual communication themes prominent." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: İletişim hayallerini ve zihinsel yanılsamaları gözden geçir.", en: "⚠️ NEPTUNE RETROGRADE: Review communication dreams and mental illusions." }
    },
    Cancer: {
      positive: { tr: "Yengeç'teki Neptün sezgisel aile bağları ve ruhsal yuva sağlıyor.", en: "Neptune in Cancer provides intuitive family bonds and soulful home." },
      negative: { tr: "Yengeç'teki Neptün aile yanılsamaları ve duygusal karmaşa yaratabilir.", en: "Neptune in Cancer can create family illusions and emotional confusion." },
      neutral: { tr: "Neptün Yengeç burcunda. Ailevi sezgi ve ruhsal kökenler temaları aktif.", en: "Neptune in Cancer. Family intuition and spiritual roots themes active." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: Aile hayallerini ve duygusal yanılsamaları gözden geçir.", en: "⚠️ NEPTUNE RETROGRADE: Review family dreams and emotional illusions." }
    },
    Leo: {
      positive: { tr: "Aslan'daki Neptün yaratıcı ilham ve ruhsal ifade getiriyor.", en: "Neptune in Leo brings creative inspiration and spiritual expression." },
      negative: { tr: "Aslan'daki Neptün kimlik yanılsamaları ve gösterişli hayaller yaratabilir.", en: "Neptune in Leo can create identity illusions and showy dreams." },
      neutral: { tr: "Neptün Aslan burcunda. Yaratıcı rüya ve spiritüel ifade temaları gündemde.", en: "Neptune in Leo. Creative dream and spiritual expression themes prominent." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: Yaratıcı hayalleri ve kimlik algısını gözden geçir.", en: "⚠️ NEPTUNE RETROGRADE: Review creative dreams and identity perception." }
    },
    Virgo: {
      positive: { tr: "Başak'taki Neptün pratik spiritüalite ve hizmet idealizmi sağlıyor.", en: "Neptune in Virgo provides practical spirituality and service idealism." },
      negative: { tr: "Başak'taki Neptün sağlık yanılsamaları ve iş karmaşası yaratabilir.", en: "Neptune in Virgo can create health illusions and work confusion." },
      neutral: { tr: "Neptün Başak burcunda. Detaylı spiritüalite ve şifa temaları aktif.", en: "Neptune in Virgo. Detailed spirituality and healing themes active." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: Sağlık algısını ve hizmet ideallerini gözden geçir.", en: "⚠️ NEPTUNE RETROGRADE: Review health perception and service ideals." }
    },
    Libra: {
      positive: { tr: "Terazi'deki Neptün spiritüel ilişkiler ve ideal aşk getiriyor.", en: "Neptune in Libra brings spiritual relationships and ideal love." },
      negative: { tr: "Terazi'deki Neptün ilişki yanılsamaları ve adalet karmaşası yaratabilir.", en: "Neptune in Libra can create relationship illusions and justice confusion." },
      neutral: { tr: "Neptün Terazi burcunda. Romantik idealzim ve spiritüel ortaklık temaları gündemde.", en: "Neptune in Libra. Romantic idealism and spiritual partnership themes prominent." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: İlişki ideallerini ve adalet algısını gözden geçir.", en: "⚠️ NEPTUNE RETROGRADE: Review relationship ideals and justice perception." }
    },
    Scorpio: {
      positive: { tr: "Akrep'teki Neptün derin spiritüal güç ve dönüşümsel şifa sağlıyor.", en: "Neptune in Scorpio provides deep spiritual power and transformational healing." },
      negative: { tr: "Akrep'teki Neptün gizli yanılsamalar ve kontrol kaybı yaratabilir.", en: "Neptune in Scorpio can create hidden illusions and loss of control." },
      neutral: { tr: "Neptün Akrep burcunda. Derin mistisizm ve gizli spiritüalite temaları aktif.", en: "Neptune in Scorpio. Deep mysticism and hidden spirituality themes active." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: Gizli korkuları ve dönüşüm sürecini gözden geçir.", en: "⚠️ NEPTUNE RETROGRADE: Review hidden fears and transformation process." }
    },
    Sagittarius: {
      positive: { tr: "Yay'daki Neptün spiritüel vizyon ve felsefi ilham getiriyor.", en: "Neptune in Sagittarius brings spiritual vision and philosophical inspiration." },
      negative: { tr: "Yay'daki Neptün inanç yanılsamaları ve aşırı idealizm yaratabilir.", en: "Neptune in Sagittarius can create belief illusions and excessive idealism." },
      neutral: { tr: "Neptün Yay burcunda. Spiritüel keşif ve vizyon idealizmi temaları gündemde.", en: "Neptune in Sagittarius. Spiritual exploration and visionary idealism themes prominent." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: İnanç sistemini ve spiritüel vizyonu gözden geçir.", en: "⚠️ NEPTUNE RETROGRADE: Review belief system and spiritual vision." }
    },
    Capricorn: {
      positive: { tr: "Oğlak'taki Neptün spiritüel yapı ve kariyer idealizmi sağlıyor.", en: "Neptune in Capricorn provides spiritual structure and career idealism." },
      negative: { tr: "Oğlak'taki Neptün kariyer yanılsamaları ve yapısal karmaşa yaratabilir.", en: "Neptune in Capricorn can create career illusions and structural confusion." },
      neutral: { tr: "Neptün Oğlak burcunda. Pratik mistisizm ve toplumsal idealler temaları aktif.", en: "Neptune in Capricorn. Practical mysticism and social ideals themes active." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: Kariyer ideallerini ve toplumsal vizyonu gözden geçir.", en: "⚠️ NEPTUNE RETROGRADE: Review career ideals and social vision." }
    },
    Aquarius: {
      positive: { tr: "Kova'daki Neptün kolektif spiritüalite ve insani vizyon getiriyor.", en: "Neptune in Aquarius brings collective spirituality and humanitarian vision." },
      negative: { tr: "Kova'daki Neptün sosyal yanılsamalar ve ütopik kaçış yaratabilir.", en: "Neptune in Aquarius can create social illusions and utopian escape." },
      neutral: { tr: "Neptün Kova burcunda. Toplumsal rüya ve insani idealizm temaları gündemde.", en: "Neptune in Aquarius. Collective dream and humanitarian idealism themes prominent." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: Sosyal idealleri ve insani vizyonu gözden geçir.", en: "⚠️ NEPTUNE RETROGRADE: Review social ideals and humanitarian vision." }
    },
    Pisces: {
      positive: { tr: "Balık'taki Neptün evinde - spiritüel güç, ilham ve şifa dorukta.", en: "Neptune in Pisces is at home - spiritual power, inspiration and healing peak." },
      negative: { tr: "Balık'taki Neptün gerçeklik kaybı ve sınır erozyonu yaratabilir.", en: "Neptune in Pisces can create reality loss and boundary erosion." },
      neutral: { tr: "Neptün Balık burcunda çok güçlü. Evrensel birlik ve sınırsız spiritüalite temaları aktif.", en: "Neptune in Pisces is very strong. Universal unity and limitless spirituality themes active." },
      retrograde: { tr: "⚠️ NEPTÜN RETROGRAD: Spiritüel yolu ve sezgisel bağlantıları gözden geçir.", en: "⚠️ NEPTUNE RETROGRADE: Review spiritual path and intuitive connections." }
    }
  },
  Pluto: {
    Aries: {
      positive: { tr: "Plüton Koç'ta bireysel dönüşüm gücü ve yenilenme enerjisi getiriyor.", en: "Pluto in Aries brings individual transformation power and renewal energy." },
      negative: { tr: "Koç'taki Plüton ego güç mücadeleleri ve yıkıcı eylemler yaratabilir.", en: "Pluto in Aries can create ego power struggles and destructive actions." },
      neutral: { tr: "Plüton Koç burcunda. Bireysel dönüşüm ve güç uyanışı temaları gündemde.", en: "Pluto in Aries. Individual transformation and power awakening themes prominent." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: Derin iç dönüşüm aktif. Gizli güçleri ve korkuları gözden geçir. Karmik temizlik zamanı.", en: "⚠️ PLUTO RETROGRADE: Deep inner transformation active. Review hidden powers and fears. Time for karmic clearing." }
    },
    Taurus: {
      positive: { tr: "Boğa'daki Plüton değer dönüşümü ve maddi yenilenme sağlıyor.", en: "Pluto in Taurus provides value transformation and material renewal." },
      negative: { tr: "Boğa'daki Plüton maddi obsesyon ve possesif güç yaratabilir.", en: "Pluto in Taurus can create material obsession and possessive power." },
      neutral: { tr: "Plüton Boğa burcunda. Değer dönüşümü ve kaynak yenilenmesi temaları aktif.", en: "Pluto in Taurus. Value transformation and resource renewal themes active." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: Değer algısını ve maddi bağları gözden geçir.", en: "⚠️ PLUTO RETROGRADE: Review value perception and material attachments." }
    },
    Gemini: {
      positive: { tr: "İkizler'deki Plüton zihinsel dönüşüm ve iletişim gücü getiriyor.", en: "Pluto in Gemini brings mental transformation and communication power." },
      negative: { tr: "İkizler'deki Plüton manipülatif iletişim ve obsesif düşünce yaratabilir.", en: "Pluto in Gemini can create manipulative communication and obsessive thinking." },
      neutral: { tr: "Plüton İkizler burcunda. Bilgi dönüşümü ve zihinsel güç temaları gündemde.", en: "Pluto in Gemini. Information transformation and mental power themes prominent." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: Düşünce kalıplarını ve iletişim gücünü gözden geçir.", en: "⚠️ PLUTO RETROGRADE: Review thought patterns and communication power." }
    },
    Cancer: {
      positive: { tr: "Yengeç'teki Plüton duygusal dönüşüm ve aile yenilenmesi sağlıyor.", en: "Pluto in Cancer provides emotional transformation and family renewal." },
      negative: { tr: "Yengeç'teki Plüton duygusal manipülasyon ve ailevi güç mücadeleleri yaratabilir.", en: "Pluto in Cancer can create emotional manipulation and family power struggles." },
      neutral: { tr: "Plüton Yengeç burcunda. Köklerin dönüşümü ve duygusal güç temaları aktif.", en: "Pluto in Cancer. Root transformation and emotional power themes active." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: Aile dinamiklerini ve duygusal gücü gözden geçir.", en: "⚠️ PLUTO RETROGRADE: Review family dynamics and emotional power." }
    },
    Leo: {
      positive: { tr: "Aslan'daki Plüton yaratıcı dönüşüm ve liderlik gücü getiriyor.", en: "Pluto in Leo brings creative transformation and leadership power." },
      negative: { tr: "Aslan'daki Plüton ego güç mücadeleleri ve diktatöryel eğilimler yaratabilir.", en: "Pluto in Leo can create ego power struggles and dictatorial tendencies." },
      neutral: { tr: "Plüton Aslan burcunda. Kimlik dönüşümü ve yaratıcı güç temaları gündemde.", en: "Pluto in Leo. Identity transformation and creative power themes prominent." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: Kimlik gücünü ve yaratıcı dönüşümü gözden geçir.", en: "⚠️ PLUTO RETROGRADE: Review identity power and creative transformation." }
    },
    Virgo: {
      positive: { tr: "Başak'taki Plüton iş dönüşümü ve sağlık yenilenmesi sağlıyor.", en: "Pluto in Virgo provides work transformation and health renewal." },
      negative: { tr: "Başak'taki Plüton obsesif mükemmeliyetçilik ve kontrol kaygısı yaratabilir.", en: "Pluto in Virgo can create obsessive perfectionism and control anxiety." },
      neutral: { tr: "Plüton Başak burcunda. Rutin dönüşümü ve hizmet gücü temaları aktif.", en: "Pluto in Virgo. Routine transformation and service power themes active." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: İş yapısını ve sağlık alışkanlıklarını gözden geçir.", en: "⚠️ PLUTO RETROGRADE: Review work structure and health habits." }
    },
    Libra: {
      positive: { tr: "Terazi'deki Plüton ilişki dönüşümü ve ortaklık gücü getiriyor.", en: "Pluto in Libra brings relationship transformation and partnership power." },
      negative: { tr: "Terazi'deki Plüton ilişki güç mücadeleleri ve manipülasyon yaratabilir.", en: "Pluto in Libra can create relationship power struggles and manipulation." },
      neutral: { tr: "Plüton Terazi burcunda. İlişki dönüşümü ve adalet gücü temaları gündemde.", en: "Pluto in Libra. Relationship transformation and justice power themes prominent." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: İlişki dinamiklerini ve güç dengesini gözden geçir.", en: "⚠️ PLUTO RETROGRADE: Review relationship dynamics and power balance." }
    },
    Scorpio: {
      positive: { tr: "Akrep'teki Plüton evinde - derin dönüşüm, yenilenme ve güç dorukta.", en: "Pluto in Scorpio is at home - deep transformation, renewal and power peak." },
      negative: { tr: "Akrep'teki Plüton yoğun güç mücadeleleri ve obsesif kontrol yaratabilir.", en: "Pluto in Scorpio can create intense power struggles and obsessive control." },
      neutral: { tr: "Plüton Akrep burcunda çok güçlü. Derin dönüşüm ve gizli güç temaları aktif.", en: "Pluto in Scorpio is very strong. Deep transformation and hidden power themes active." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: Gizli güçleri ve derin korkuları gözden geçir.", en: "⚠️ PLUTO RETROGRADE: Review hidden powers and deep fears." }
    },
    Sagittarius: {
      positive: { tr: "Yay'daki Plüton felsefi dönüşüm ve inanç gücü sağlıyor.", en: "Pluto in Sagittarius provides philosophical transformation and belief power." },
      negative: { tr: "Yay'daki Plüton fanatik inançlar ve ideolojik güç mücadeleleri yaratabilir.", en: "Pluto in Sagittarius can create fanatic beliefs and ideological power struggles." },
      neutral: { tr: "Plüton Yay burcunda. İnanç dönüşümü ve vizyon gücü temaları gündemde.", en: "Pluto in Sagittarius. Belief transformation and vision power themes prominent." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: İnanç sistemini ve felsefi gücü gözden geçir.", en: "⚠️ PLUTO RETROGRADE: Review belief system and philosophical power." }
    },
    Capricorn: {
      positive: { tr: "Oğlak'taki Plüton yapısal dönüşüm ve kariyer gücü getiriyor.", en: "Pluto in Capricorn brings structural transformation and career power." },
      negative: { tr: "Oğlak'taki Plüton otorite güç mücadeleleri ve sistem çöküşleri yaratabilir.", en: "Pluto in Capricorn can create authority power struggles and system collapses." },
      neutral: { tr: "Plüton Oğlak burcunda. Sistem dönüşümü ve toplumsal güç temaları aktif.", en: "Pluto in Capricorn. System transformation and social power themes active." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: Kariyer yapısını ve otorite gücünü gözden geçir.", en: "⚠️ PLUTO RETROGRADE: Review career structure and authority power." }
    },
    Aquarius: {
      positive: { tr: "Kova'daki Plüton toplumsal dönüşüm ve kolektif güç sağlıyor.", en: "Pluto in Aquarius provides social transformation and collective power." },
      negative: { tr: "Kova'daki Plüton grup güç mücadeleleri ve radikal değişimler yaratabilir.", en: "Pluto in Aquarius can create group power struggles and radical changes." },
      neutral: { tr: "Plüton Kova burcunda. İnsanlık dönüşümü ve teknoloji gücü temaları gündemde.", en: "Pluto in Aquarius. Humanity transformation and technology power themes prominent." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: Sosyal dönüşümü ve kolektif gücü gözden geçir.", en: "⚠️ PLUTO RETROGRADE: Review social transformation and collective power." }
    },
    Pisces: {
      positive: { tr: "Balık'taki Plüton spiritüel dönüşüm ve evrensel şifa getiriyor.", en: "Pluto in Pisces brings spiritual transformation and universal healing." },
      negative: { tr: "Balık'taki Plüton spiritüel güç mücadeleleri ve kaybolma yaratabilir.", en: "Pluto in Pisces can create spiritual power struggles and dissolution." },
      neutral: { tr: "Plüton Balık burcunda. Ruhsal dönüşüm ve evrensel güç temaları aktif.", en: "Pluto in Pisces. Soul transformation and universal power themes active." },
      retrograde: { tr: "⚠️ PLÜTON RETROGRAD: Spiritüel gücü ve bilinçaltı dönüşümü gözden geçir.", en: "⚠️ PLUTO RETROGRADE: Review spiritual power and subconscious transformation." }
    }
  }
};

// Helper function to get planet position interpretation
export function getPlanetPositionInterpretation(
  planet: string,
  sign: string,
  effect: 'positive' | 'negative' | 'neutral',
  isRetrograde: boolean,
  language: 'tr' | 'en' = 'tr'
): string {
  const planetKey = planet as Planet;
  const signKey = language === 'tr' ? (SIGN_TR_TO_EN[sign] || sign) : sign;

  const planetData = PLANET_POSITION_INTERPRETATIONS[planetKey];
  if (!planetData) {
    return language === 'tr' ? "Gezegen yorumu bulunamadı." : "Planet interpretation not found.";
  }

  const signData = planetData[signKey];
  if (!signData) {
    return language === 'tr' ? "Burç yorumu bulunamadı." : "Sign interpretation not found.";
  }

  // If retrograde, always include retrograde warning + the effect interpretation
  if (isRetrograde) {
    const retroText = signData.retrograde[language];
    const effectText = signData[effect][language];
    return `${retroText}\n\n${effectText}`;
  }

  return signData[effect][language];
}

export { PLANET_NAME_TR, PLANET_NAME_EN, SIGN_TR_TO_EN, SIGN_EN_TO_TR };
