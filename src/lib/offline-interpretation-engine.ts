export interface TarotCard {
  id: string;
  name: string;
  englishName: string;
  isReversed: boolean;
}

export interface ReadingContext {
  topic: "love" | "career" | "health" | "money" | "general";
  userZodiac?: string;
  userElement?: "Fire" | "Earth" | "Air" | "Water";
  userName?: string;
  birthChartHouses?: { house: number; sign: string }[];
  currentMoonPhase?: string;
  currentSeason?: string;
}

const ZODIAC_ELEMENTS: Record<string, "Fire" | "Earth" | "Air" | "Water"> = {
  "Koç": "Fire", "Aslan": "Fire", "Yay": "Fire",
  "Boğa": "Earth", "Başak": "Earth", "Oğlak": "Earth",
  "İkizler": "Air", "Terazi": "Air", "Kova": "Air",
  "Yengeç": "Water", "Akrep": "Water", "Balık": "Water"
};

const MAJOR_ARCANA_DATA: Record<string, {
  upright: { keywords: string[]; essence: string; advice: string };
  reversed: { keywords: string[]; essence: string; advice: string };
  topics: Record<string, string[]>;
  combinations: Record<string, string>;
  elements: Record<string, string>;
  positions: Record<string, string>;
}> = {
  "ar00": {
    upright: {
      keywords: ["başlangıç", "masumiyet", "özgürlük", "macera", "potansiyel"],
      essence: "Saf bir başlangıç enerjisi taşıyorsun. Evren sana yepyeni bir sayfa açıyor, geçmişin yüklerinden arınmış bir şekilde ilerleme fırsatı sunuyor.",
      advice: "Mantığının söylediklerine çok takılma, içindeki o çocuksu heyecanı dinle. Bazen uçurumun kenarına kadar gitmek gerekir ki rüzgarın seni taşıyacağını hissedebilesin."
    },
    reversed: {
      keywords: ["tedbirsizlik", "duraksamak", "risk", "hazırlıksızlık"],
      essence: "İçindeki maceracı ruh biraz yönünü şaşırmış görünüyor. Belki de çok hızlı ilerliyorsun ya da tam tersine adım atmaktan korkuyorsun.",
      advice: "Dur ve çevreni gözlemle. Her yeni başlangıç için zemin hazırlamak gerekir. Körü körüne atlamak yerine, bilinçli bir cesaretle hareket et."
    },
    topics: {
      love: [
        "Aşk hayatında beklenmedik ve taze bir rüzgar kapıda. Eski kalıpları kırarak yeni bir sayfaya hazırlan.",
        "Duygusal dünyanda masumiyet ve heyecan var. Karşına çıkacak kişi sana yeni ufuklar açabilir.",
        "Aşkta risk almaktan korkma. Kalbini tamamen açtığında mucizeler olacak."
      ],
      career: [
        "Kariyer yolunda yepyeni bir kapı açılıyor. Bu fırsat seni tamamen farklı bir alana taşıyabilir.",
        "İş hayatında sıfırdan başlama cesareti göstermen gerekebilir. Endişelenme, potansiyelin çok büyük.",
        "Yeni bir proje veya girişim için mükemmel bir enerji. Dehanı serbest bırak."
      ],
      health: [
        "Zihinsel ve bedensel olarak yenilenme vakti. Yeni bir spor veya beslenme düzenine başla.",
        "Eski alışkanlıkları bırakıp tamamen yeni bir yaşam tarzına geçiş için harika bir dönem.",
        "Çocuksu bir neşe ve enerji içindesin. Bu hafifliği koru."
      ],
      money: [
        "Finansal konularda beklenmedik bir kapı açılabilir. Ama plansız harcamalara dikkat.",
        "Yeni bir gelir kaynağı veya yatırım fırsatı beliriyor. Araştır ama korkma.",
        "Maddi dünyada cesur adımlar atma vakti. Hesaplı risk al."
      ],
      general: [
        "Hayatında yepyeni bir sayfa açılıyor. Tüm bagajları geride bırakma zamanı.",
        "Evren seni bilinmeyen bir maceraya çağırıyor. Güven ve atla.",
        "Kozmik bir uyanışın ilk adımındasın. İçindeki o maceracı çocuğu serbest bırak."
      ]
    },
    combinations: {
      "ar01": "Meczup ve Büyücü birlikte geldiğinde, yaratıcılığının en saf ve en güçlü hali ortaya çıkıyor. Yeni başlangıçlarını somut projelere dönüştürme zamanı.",
      "ar13": "Meczup ve Ölüm kartı birlikte, radikal bir dönüşümün ardından gelen yepyeni bir hayatı müjdeliyor. Eski benliğin gidiyor, yenisi doğuyor.",
      "ar17": "Meczup ve Yıldız birlikte, umut dolu ve ilham verici yeni başlangıçları işaret ediyor. Hayallerine doğru atla."
    },
    elements: {
      Fire: "İçindeki ateş bu yeni başlangıcı hızla tutuşturacak. Cesaretin seni çok uzaklara taşıyacak.",
      Earth: "Bu yeni yolda ayaklarını yere sağlam basarak ilerle. Hayallerin somutlaşsın.",
      Air: "Zihnindeki tüm yeni fikirler bu başlangıçla hayat bulacak. Konuş, paylaş, yay.",
      Water: "Sezgilerine güven ve bu yeni yolculuğa kalbinle atla. Akışa teslim ol."
    },
    positions: {
      past: "Geçmişte attığın cesur adımlar seni bugüne getirdi. O masumiyeti hala taşıyorsun.",
      present: "Şu an tam bir eşiktesin. İçindeki heyecanı dinle ve o adımı at.",
      future: "Önünde keşfedilmemiş topraklar var. Hazırlan, macera başlıyor."
    }
  },
  "ar01": {
    upright: {
      keywords: ["yaratıcılık", "irade", "beceri", "güç", "odaklanma"],
      essence: "Elinde tüm araçlar var. Yaratmak, dönüştürmek ve gerçekleştirmek için ihtiyacın olan her şeye sahipsin.",
      advice: "Yeteneklerini küçümseme. Odaklan ve niyetini netleştir. Evren senin her komutunu bekliyor."
    },
    reversed: {
      keywords: ["manipülasyon", "dağınıklık", "potansiyel kaybı", "hile"],
      essence: "Gücünü yanlış yönde kullanıyor veya hiç kullanmıyor olabilirsin. Odağını kaybetmişsin.",
      advice: "Niyetini sorgula. Başkalarını etkilemek için değil, kendini gerçekleştirmek için hareket et."
    },
    topics: {
      love: [
        "Aşkta çekiciliğin zirvede. Karşındaki kişiyi etkilemek için tüm yeteneklerin sende.",
        "İlişkinde istediğin değişimi yaratma gücüne sahipsin. Niyetini koy ve izle.",
        "Aşk hayatında mucizeler yaratabilirsin. Sadece inan ve harekete geç."
      ],
      career: [
        "İş hayatında yeteneklerini sergileme vakti. Masadaki tüm araçları kullan.",
        "Kariyerinde büyük bir sıçrama için gerekli her şeye sahipsin. Sadece odaklan.",
        "Liderlik vasıfların parlıyor. Projelerini hayata geçir."
      ],
      health: [
        "Zihin-beden bağlantın çok güçlü. Düşüncelerinle kendini iyileştirebilirsin.",
        "Enerji seviyen yüksek. Bu potansiyeli spor ve yaratıcı aktivitelerle değerlendir.",
        "Sağlığınla ilgili kendi mucizeni yaratma gücüne sahipsin."
      ],
      money: [
        "Finansal zekan zirvede. Yeni gelir kapıları açma becerisine sahipsin.",
        "Maddi konularda bir sihirbaz gibi maharetlisin. Kaynaklarını akıllıca kullan.",
        "Para kazanma yeteneğin çok yüksek. Sadece odaklan ve eyleme geç."
      ],
      general: [
        "İpler senin elinde. Hayatını bizzat şekillendirme vakti.",
        "Sen kendi hayatının simyacısısın. Karanlığı ışığa çevir.",
        "Evrenin tüm elementleri senin için hizalandı. Yarat."
      ]
    },
    combinations: {
      "ar00": "Büyücü ve Meczup birlikte, saf potansiyelin bilinçli yaratıma dönüşümünü gösteriyor.",
      "ar02": "Büyücü ve Azize birlikte, sezgisel bilgeliğin somut eyleme dönüşümünü simgeliyor.",
      "ar21": "Büyücü ve Dünya birlikte, ustalığın zirvesini ve tam bir gerçekleşmeyi müjdeliyor."
    },
    elements: {
      Fire: "Ateşin yaratıcılığını körüklüyor. Tutkuyla üret ve parla.",
      Earth: "Yeteneklerini somut projelere dök. Kalıcı eserler bırak.",
      Air: "İletişim gücün her kapıyı açacak. Fikirlerini yay.",
      Water: "Sezgisel yaratıcılığın çok güçlü. Duygularınla büyüle."
    },
    positions: {
      past: "Geçmişteki başarıların sana sarsılmaz bir özgüven kazandırdı.",
      present: "Şu an yapamayacağın hiçbir şey yok. Odaklan ve yarat.",
      future: "Planladığın her şeyi gerçekleştirebileceğin muazzam bir dönem seni bekliyor."
    }
  },
  "ar02": {
    upright: {
      keywords: ["sezgi", "gizem", "bilinçaltı", "bilgelik", "bekleyiş"],
      essence: "Cevaplar içinde saklı. Dış dünyanın gürültüsünden uzaklaşıp kendi derinliklerine dal.",
      advice: "Hemen eyleme geçmek yerine gözlemle ve dinle. Rüyalarına dikkat et."
    },
    reversed: {
      keywords: ["kopukluk", "yüzeysellik", "sırlar", "sezgiden uzaklaşma"],
      essence: "İç sesini bastırıyorsun veya duyamıyorsun. Yüzeyde kalıyorsun.",
      advice: "Meditasyona dön. Sezgilerini tekrar canlandır. Gerçek dışarıda değil, içeride."
    },
    topics: {
      love: [
        "İlişkinde gizli kalmış duygular var. Her şey göründüğünden çok daha derin.",
        "Sezgilerin partnerinin hislerini sana ayna gibi yansıtıyor. Dinle.",
        "Aşkta sırlar ve gizemler. Partnerinle kelimelerin ötesinde bir bağ kuruyorsun."
      ],
      career: [
        "İş hayatında stratejik sessizlik sana çok şey kazandıracak. Gözlemle.",
        "Bilgi güçtür ve şu an bu bilgiye sadece sen sahipsin. Doğru zamanı bekle.",
        "Kariyerinde sezgisel kararlar seni herkesin önüne geçirecek."
      ],
      health: [
        "Bedeninin fısıltılarını dinle. Ruhsal denge fiziksel sağlığı getirecek.",
        "Rüyaların sağlığınla ilgili ipuçları veriyor. Dikkat et.",
        "Derin meditasyon ve içe dönüş, bedenindeki tıkanıklıkları açacak."
      ],
      money: [
        "Finansal kararlarda acele etme. İç sesin doğru zamanı fısıldayacak.",
        "Gizli fırsatlar olabilir. Araştır ama hemen eyleme geçme.",
        "Maddi dünyada sezgisel ustalık sergileyeceğin bir dönem."
      ],
      general: [
        "Bilinçaltının derinliklerine inme zamanı. Sırlar aydınlanıyor.",
        "Kadim bir bilgelik ruhuna doluyor. Sessizliğin gücünü keşfet.",
        "Cevaplar içinde. Dışarıda aramayı bırak."
      ]
    },
    combinations: {
      "ar18": "Azize ve Ay birlikte, bilinçaltının en derin katmanlarına inişi simgeliyor. Rüyalarına çok dikkat et.",
      "ar01": "Azize ve Büyücü birlikte, sezgisel bilgeliğin somut eyleme dönüşümünü gösteriyor.",
      "ar17": "Azize ve Yıldız birlikte, ilahi bir rehberlik ve ruhsal aydınlanmayı müjdeliyor."
    },
    elements: {
      Fire: "Ateşini söndür ve iç dünyana dön. Sessizlikte asıl gücünü bulacaksın.",
      Earth: "Sezgilerini pratik hayatına entegre et. Toprağın bilgeliğini dinle.",
      Air: "Mantığını bir kenara bırak ve sadece hisset. Gerçeği yaşayarak bul.",
      Water: "Kendi elementindesin. Duyguların okyanus kadar derin. Dal ve keşfet."
    },
    positions: {
      past: "Geçmişte iç sesini dinlemen seni büyük hatalardan korudu.",
      present: "Şu an olayların perde arkasını görme dönemindesin. Acele etme.",
      future: "Gelecekte sırlar aydınlanacak ve ihtiyacın olan bilgiler gelecek."
    }
  },
  "ar03": {
    upright: {
      keywords: ["bolluk", "bereket", "yaratıcılık", "annelik", "doğa"],
      essence: "Hayatında bereket çiçek açıyor. Sevgiyle beslediğin her şey büyüyor.",
      advice: "Kendini şımartmaktan çekinme. Doğayla bağını güçlendir. Besle ve beslen."
    },
    reversed: {
      keywords: ["blokaj", "tükenme", "ihmal", "verimsizlik"],
      essence: "Yaratıcılığın tıkanmış veya kendine bakmayı ihmal ediyorsun.",
      advice: "Önce kendi bardağını doldur. Kendine şefkat göstermeden başkalarını besleyemezsin."
    },
    topics: {
      love: [
        "Aşkta bereket ve şefkat dönemi. Sevgi her yere taşıyor.",
        "Romantik ve besleyici bir ilişki enerjisi. Kalbini tamamen aç.",
        "Doğurganlık ve üretkenlik. Aşkta yeni bir sayfa açılıyor."
      ],
      career: [
        "Üretkenliğin tavan yapıyor. Fikirlerin meyve veriyor.",
        "Yaratıcı projeler filizleniyor. Bolluk kapıda.",
        "İş yerinde besleyici bir rol üstlenebilirsin. Vizyonun herkesi etkileyecek."
      ],
      health: [
        "Bedensel olarak güçleniyorsun. Yaşam enerjin artıyor.",
        "Doğayla iç içe olmak sana muazzam bir şifa verecek.",
        "Üretken enerjin sağlığına da yansıyor. Canlı ve zinde olacaksın."
      ],
      money: [
        "Maddi bolluk ve refah artıyor. Yatırımların yeşeriyor.",
        "Finansal bir çiçeklenme dönemi. Bereketin tadını çıkar.",
        "Gelir kaynaklarında artış var. Bolluğa aç ol."
      ],
      general: [
        "Yaratıcılığını konuştur ve çevrene huzur dağıt.",
        "Hayatında çiçeklenme dönemi. Doğanın cömertliği seninle.",
        "Bereket ve konfor. Her şey sevgiyle şekilleniyor."
      ]
    },
    combinations: {
      "ar04": "İmparatoriçe ve İmparator birlikte, mükemmel bir denge ve bereket içinde kurulan bir hayatı simgeliyor.",
      "ar06": "İmparatoriçe ve Aşıklar birlikte, aşkta ve yaratıcılıkta muazzam bir uyum ve bereketi gösteriyor.",
      "ar19": "İmparatoriçe ve Güneş birlikte, mutlak mutluluk, başarı ve bolluğun en parlak halini müjdeliyor."
    },
    elements: {
      Fire: "Tutkunu yaratıcı güce dönüştür. Etrafını güzelleştir.",
      Earth: "Doğayla bağını güçlendir. Toprağın bereketi seninle.",
      Air: "Fikirlerini sevgiyle ifade et. Sözlerinle çevreni besle.",
      Water: "Duygularının zenginliğini paylaş. Şefkatin mucizeler yaratacak."
    },
    positions: {
      past: "Geçmişte ektiğin sevgi tohumları şimdi meyve veriyor.",
      present: "Şu an bolluk içindesin. Bu bereketi kucakla.",
      future: "Gelecek sana konfor, huzur ve zenginlik vaat ediyor."
    }
  },
  "ar04": {
    upright: {
      keywords: ["otorite", "yapı", "disiplin", "koruma", "liderlik"],
      essence: "Hayatında düzen ve kontrol kurma zamanı. Güç ve sorumluluk sende.",
      advice: "Sınırlarını çiz ve prensiplerinden ödün verme. Liderlik et."
    },
    reversed: {
      keywords: ["zorbalık", "katılık", "kontrol kaybı", "kaos"],
      essence: "Gücünü yanlış kullanıyorsun veya kontrolü kaybettin.",
      advice: "Biraz yumuşa. Gerçek güç zorlamada değil, adalette."
    },
    topics: {
      love: [
        "İlişkinde güven ve koruma enerjisi. Sağlam temeller kuruluyor.",
        "Ciddi ve sadık bir dönem. Uzun vadeli planlar yapılabilir.",
        "Aşkta otorite değil, sarsılmaz bir güven inşa et."
      ],
      career: [
        "Liderlik özelliklerini sergile. Sistemli ilerle.",
        "Kariyerinde terfi veya güç artışı kapıda.",
        "İş yerinde düzen kurucu bir rol üstlenebilirsin."
      ],
      health: [
        "Disiplinli bir yaşam tarzı sağlığını dengeleyecek.",
        "Düzenli egzersiz ve uyku şifan olacak.",
        "Zihinsel ve bedensel gücün yerinde."
      ],
      money: [
        "Finansal kontrolü ele al. Uzun vadeli planlar yap.",
        "Maddi dünyada sarsılmaz bir güvenlik inşa ediyorsun.",
        "Parasal konularda disiplin ve strateji anahtarın."
      ],
      general: [
        "Hayatına çeki düzen ver. Sınırlarını netleştir.",
        "Otorite ve yapı. Kontrolü ele alma vakti.",
        "Kendi krallığını kur. Güç senin elinde."
      ]
    },
    combinations: {
      "ar03": "İmparator ve İmparatoriçe birlikte, kusursuz bir denge ve bereket.",
      "ar11": "İmparator ve Adalet birlikte, sarsılmaz bir düzen ve hakkaniyet.",
      "ar07": "İmparator ve Araba birlikte, mutlak zafer ve kontrol."
    },
    elements: {
      Fire: "İradenle hedeflerine odaklan. Sarsılmaz kararlılığın zaferi getirecek.",
      Earth: "Yapılandırmaya odaklan. Kalıcı bir imparatorluk kur.",
      Air: "Stratejik düşün. Akılcı kararların otoriteni güçlendirecek.",
      Water: "Gücünü merhametle birleştir. Adil ve koruyucu ol."
    },
    positions: {
      past: "Geçmişte kurduğun düzen bugünkü güçlü konumunun temeli.",
      present: "Şu an sorumluluğu al ve hayatının iplerini tut.",
      future: "Gelecekte istikrar ve toplumsal saygınlık seni bekliyor."
    }
  }
};

const MINOR_ARCANA_SUITS: Record<string, {
  element: "Fire" | "Earth" | "Air" | "Water";
  theme: string;
  topics: Record<string, string>;
}> = {
  "wa": {
    element: "Fire",
    theme: "tutku, yaratıcılık, enerji ve eylem",
    topics: {
      love: "Aşkta tutku ve heyecan. Duygusal ateş yanıyor.",
      career: "Kariyer ve girişimcilik enerjisi. Yeni projeler.",
      health: "Fiziksel enerji ve hareket. Spor ve aktivite.",
      money: "Yeni girişimler ve iş fırsatları.",
      general: "Yaratıcı enerji ve eylem gücü."
    }
  },
  "cu": {
    element: "Water",
    theme: "duygular, ilişkiler, sezgi ve şifa",
    topics: {
      love: "Derin duygusal bağlar ve romantizm.",
      career: "İş yerinde duygusal tatmin ve uyum.",
      health: "Duygusal sağlık ve ruhsal şifa.",
      money: "Maddi konularda duygusal yatırımlar.",
      general: "Duygusal derinlik ve sezgisel rehberlik."
    }
  },
  "sw": {
    element: "Air",
    theme: "zihin, iletişim, mücadele ve gerçek",
    topics: {
      love: "İletişim ve zihinsel bağ. Dürüstlük.",
      career: "Zihinsel çalışma ve stratejik kararlar.",
      health: "Zihinsel sağlık ve stres yönetimi.",
      money: "Finansal analiz ve stratejik planlama.",
      general: "Zihinsel netlik ve doğru kararlar."
    }
  },
  "pe": {
    element: "Earth",
    theme: "madde, pratiklik, güvenlik ve bolluk",
    topics: {
      love: "Güvenli ve istikrarlı ilişkiler.",
      career: "Kariyer başarısı ve maddi kazanç.",
      health: "Fiziksel sağlık ve bedensel refah.",
      money: "Maddi bolluk ve finansal güvenlik.",
      general: "Pratik başarılar ve somut sonuçlar."
    }
  }
};

const NUMBER_MEANINGS: Record<string, { meaning: string; energy: string }> = {
  "ac": { meaning: "Yeni başlangıçlar ve saf potansiyel", energy: "Başlangıç" },
  "02": { meaning: "Denge, ortaklık ve kararlar", energy: "İkilik" },
  "03": { meaning: "Büyüme, yaratıcılık ve işbirliği", energy: "Genişleme" },
  "04": { meaning: "İstikrar, yapı ve temel", energy: "Sağlamlık" },
  "05": { meaning: "Değişim, çatışma ve meydan okuma", energy: "Sarsıntı" },
  "06": { meaning: "Uyum, denge ve karşılıklı destek", energy: "Denge" },
  "07": { meaning: "İçgözlem, değerlendirme ve sabır", energy: "Değerlendirme" },
  "08": { meaning: "Hareket, ilerleme ve ustalık", energy: "Hareket" },
  "09": { meaning: "Tamamlanma yakın, son hazırlıklar", energy: "Neredeyse" },
  "10": { meaning: "Döngünün sonu, aşırılık veya tam doluş", energy: "Tamamlanma" },
  "pa": { meaning: "Öğrenme, merak ve haberler", energy: "Öğrenci" },
  "kn": { meaning: "Eylem, hareket ve arayış", energy: "Savaşçı" },
  "qu": { meaning: "Ustalık, besleyicilik ve olgunluk", energy: "Kraliçe" },
  "ki": { meaning: "Otorite, kontrol ve deneyim", energy: "Kral" }
};

const READING_INTROS: string[] = [
  "Kartların enerjisine odaklandığımda senin için çok özel bir titreşim hissediyorum.",
  "Yıldızların fısıltıları bugün senin etrafında oldukça yoğunlaşmış durumda.",
  "Ruhunun derinliklerinden gelen bu kartlar, şu anki yolculuğuna ışık tutmak için belirdi.",
  "Evrenin seninle kurduğu mistik bağ, çekilen her kartta kendini gösteriyor.",
  "Kozmik enerjiler tam da niyetin üzerine odaklanmış, seni sarmalıyor.",
  "Kadim bilgeliğin sesi bugün senin için her zamankinden daha gür çıkıyor.",
  "Sezgilerimin rehberliğinde bu kartları yorumlarken, büyük bir dönüşüm görüyorum.",
  "Kalbinin derinliklerindeki o sessiz dilek, kartların diliyle konuşmaya başlıyor.",
  "Evrenin senin için hazırladığı özel rehberliği paylaşmak için sabırsızlanıyorum.",
  "Ruhunun frekansı bugün kartlarla muazzam bir uyum içinde titreşiyor."
];

const TRANSITIONS: string[] = [
  "Bu enerjinin senin üzerindeki etkisi, hayatının akışını derinden değiştirecek güçte.",
  "Kartın sunduğu sembolizm, iç dünyandaki yansımaların bir kanıtı.",
  "Gördüğüm bu güçlü bağ, potansiyelinin ne kadar yüksek olduğunu gösteriyor.",
  "Kozmik dengeler şu an senin için yeniden kurulurken, bu mesajı kalbine mühürle.",
  "Duygularının ve mantığının harmanlandığı bu noktada, gerçek gücünü keşfedeceksin.",
  "Bu dönüşüm rüzgarı seni daha sağlam ve bilge bir noktaya taşımak için esiyor.",
  "Hayatının bu evresinde, içindeki bitmek bilmeyen gücü uyandırma vaktin geldi.",
  "Gökyüzü sana 'evet' derken, kendine inanma zamanın çoktan geldi."
];

const CONCLUSIONS: string[] = [
  "Unutma ki yıldızlar yol gösterir, rotayı çizen sensin. Işığın bol olsun!",
  "Bu mesajı kalbine mühürle ve güvenle adım at. Evren seni destekliyor.",
  "Kendine inanmak, bu okumanın sana verdiği en büyük anahtar.",
  "Gelecek henüz yazılmadı, seçimlerinle şekilleniyor. En güzel versiyonunu seç.",
  "İçindeki gücü fark ettiğinde, hiçbir engel seni durduramaz.",
  "Her şey tam da olması gerektiği gibi ilerliyor. Akışa güven.",
  "Yıldızlar bugün senin için gülümsüyor. Bu pozitif enerjiyi yay.",
  "Kalbinin sesini susturma. O en doğru pusuladır.",
  "Sen evrenin eşsiz bir parçasısın. Kendi değerini küçümseme.",
  "Mucizelerin sana ulaşmasına izin ver. Yıldızlar rehberin olsun."
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getCardSuit(cardId: string): string {
  if (cardId.startsWith("ar")) return "major";
  return cardId.substring(0, 2);
}

function getCardNumber(cardId: string): string {
  if (cardId.startsWith("ar")) return cardId.substring(2);
  return cardId.substring(2);
}

function interpretMajorArcana(
  card: TarotCard,
  context: ReadingContext,
  position: "past" | "present" | "future"
): string {
  const data = MAJOR_ARCANA_DATA[card.id];
  if (!data) {
    return generateGenericInterpretation(card, context, position);
  }

  const state = card.isReversed ? data.reversed : data.upright;
  const topicText = pickRandom(data.topics[context.topic] || data.topics.general);
  const positionText = data.positions[position];
  const elementText = context.userElement ? data.elements[context.userElement] : "";

  let interpretation = `**${card.englishName} (${card.name})${card.isReversed ? " - Ters" : ""}**\n\n`;
  interpretation += `${state.essence} `;
  interpretation += `${topicText} `;
  interpretation += `${positionText} `;
  if (elementText) {
    interpretation += `${elementText} `;
  }
  interpretation += `\n\n*Tavsiye:* ${state.advice}`;

  return interpretation;
}

function interpretMinorArcana(
  card: TarotCard,
  context: ReadingContext,
  position: "past" | "present" | "future"
): string {
  const suit = getCardSuit(card.id);
  const number = getCardNumber(card.id);
  const suitData = MINOR_ARCANA_SUITS[suit];
  const numberData = NUMBER_MEANINGS[number];

  if (!suitData || !numberData) {
    return generateGenericInterpretation(card, context, position);
  }

  const topicText = suitData.topics[context.topic] || suitData.topics.general;

  let interpretation = `**${card.englishName} (${card.name})${card.isReversed ? " - Ters" : ""}**\n\n`;

  if (card.isReversed) {
    interpretation += `Bu kartın ters gelmesi, ${suitData.theme} konusunda bir tıkanıklık veya gecikme olduğunu gösteriyor. `;
    interpretation += `${numberData.energy} enerjisi şu an bloke durumda. `;
  } else {
    interpretation += `${numberData.meaning}. ${suitData.theme.charAt(0).toUpperCase() + suitData.theme.slice(1)} enerjisi hayatında belirginleşiyor. `;
    interpretation += `${topicText} `;
  }

  const positionTexts = {
    past: "Bu enerji geçmişinde önemli bir rol oynadı ve seni bugünkü noktana taşıdı.",
    present: "Şu an bu enerjiyle yoğun bir etkileşim içindesin. Farkında ol ve kullan.",
    future: "Önündeki dönemde bu enerji belirginleşecek. Hazırlıklı ol."
  };

  interpretation += positionTexts[position];

  if (context.userElement && suitData.element === context.userElement) {
    interpretation += " Bu kartın elementi senin doğal enerjinle uyumlu, bu da etkisini güçlendiriyor.";
  }

  return interpretation;
}

function generateGenericInterpretation(
  card: TarotCard,
  context: ReadingContext,
  position: "past" | "present" | "future"
): string {
  const positionTexts = {
    past: "Geçmişte bu enerjinin etkisinde kaldın ve o deneyimler seni şekillendirdi.",
    present: "Şu an bu kartın enerjisi hayatında aktif. Farkında ol.",
    future: "Önündeki dönemde bu enerji seni bekliyor."
  };

  let interpretation = `**${card.englishName} (${card.name})${card.isReversed ? " - Ters" : ""}**\n\n`;
  interpretation += `Bu kart ${context.topic === "love" ? "aşk hayatında" : context.topic === "career" ? "kariyer yolunda" : context.topic === "health" ? "sağlık konusunda" : context.topic === "money" ? "maddi konularda" : "genel olarak"} `;
  interpretation += card.isReversed ? "bir tıkanıklık veya gecikmeyi" : "pozitif bir enerji ve ilerlemeyi";
  interpretation += " işaret ediyor. ";
  interpretation += positionTexts[position];

  return interpretation;
}

function findCombinations(cards: TarotCard[]): string[] {
  const combinations: string[] = [];

  for (let i = 0; i < cards.length; i++) {
    const card1 = cards[i];
    const data1 = MAJOR_ARCANA_DATA[card1.id];

    if (data1?.combinations) {
      for (let j = 0; j < cards.length; j++) {
        if (i !== j) {
          const card2 = cards[j];
          if (data1.combinations[card2.id]) {
            combinations.push(data1.combinations[card2.id]);
          }
        }
      }
    }
  }

  return combinations;
}

export function generateTarotReading(cards: TarotCard[], context: ReadingContext): string {
  const positions: ("past" | "present" | "future")[] = ["past", "present", "future"];
  let reading = "";

  reading += `## Ayla'nın Kozmik Rehberliği\n\n`;
  reading += pickRandom(READING_INTROS) + "\n\n";

  if (context.userName) {
    reading += `Sevgili ${context.userName}, `;
  }

  if (context.userZodiac) {
    reading += `${context.userZodiac} burcu enerjinle bu okumaya bakarken `;
  }

  const topicIntros: Record<string, string> = {
    love: "aşk ve ilişkiler konusunda kartların sana neler söylediğini inceleyelim.",
    career: "kariyer ve iş hayatın hakkında evrenin mesajlarını dinleyelim.",
    health: "sağlık ve esenlik konusunda kartların rehberliğine bakalım.",
    money: "maddi konular ve bolluk hakkında evrenin fısıltılarını duyalım.",
    general: "hayatının genel akışı hakkında kartların bilgeliğine kulak verelim."
  };

  reading += topicIntros[context.topic] + "\n\n";

  reading += "---\n\n";

  cards.slice(0, 3).forEach((card, index) => {
    const position = positions[index];
    const positionTitles = {
      past: "### Geçmiş - Kökler ve Temel",
      present: "### Şu An - Mevcut Enerji",
      future: "### Gelecek - Olasılıklar"
    };

    reading += positionTitles[position] + "\n\n";

    const suit = getCardSuit(card.id);
    if (suit === "major") {
      reading += interpretMajorArcana(card, context, position);
    } else {
      reading += interpretMinorArcana(card, context, position);
    }

    reading += "\n\n";
  });

  reading += "---\n\n";

  const combinations = findCombinations(cards);
  if (combinations.length > 0) {
    reading += "### Kartlar Arası Bağlantı\n\n";
    reading += pickRandom(combinations) + "\n\n";
  }

  reading += pickRandom(TRANSITIONS) + "\n\n";

  if (context.birthChartHouses && context.birthChartHouses.length > 0) {
    const relevantHouses = {
      love: [5, 7, 8],
      career: [2, 6, 10],
      health: [1, 6, 12],
      money: [2, 8, 11],
      general: [1, 4, 10]
    };

    const houses = relevantHouses[context.topic];
    const house = context.birthChartHouses.find(h => houses.includes(h.house));

    if (house) {
      reading += `### Doğum Haritandan Not\n\n`;
      reading += `${house.house}. evindeki ${house.sign} burcu enerjisi, bu okumayı destekliyor ve mesajı güçlendiriyor.\n\n`;
    }
  }

  reading += "### Ayla'nın Son Notu\n\n";
  reading += pickRandom(CONCLUSIONS);

  return reading;
}

export function generateSynastryReading(
  person1: { name: string; zodiac: string; element: string },
  person2: { name: string; zodiac: string; element: string },
  compatibility: {
    emotional: number;
    physical: number;
    intellectual: number;
    spiritual: number;
    overall: number;
    houseCompatibility: { house: number; score: number; description: string }[];
  }
): string {
  let reading = `## ${person1.name} & ${person2.name} - Kozmik Aşk Haritası\n\n`;

  const intros = [
    "Kozmik bir fısıltıyla aranızdaki bağı inceledim...",
    "Yıldızların haritanızdaki dansı bana çok şey anlatıyor...",
    "Evrenin gizemli koridorlarında sizin aşk hikayenizin izini sürdüm...",
    "Ayla olarak, kalplerinizin ritmini gökyüzünün dilinden okudum..."
  ];

  reading += pickRandom(intros) + "\n\n";

  const elementCombos: Record<string, string> = {
    "Ateş-Ateş": "İki volkanın birleşmesi gibi! Tutku ve heyecan bitmez ama ikiniz de baskın gelmek isterseniz ortalık karışabilir.",
    "Ateş-Toprak": "Ateş toprağı pişirir. Biri ilham verirken diğeri somutlaştırıyor. Hayallerin gerçeğe dönüştüğü bir atölye.",
    "Ateş-Hava": "Hava ateşi körükler! Zihinsel ve ruhsal olarak birbirinizi besliyorsunuz. Harika bir vizyon çıkıyor.",
    "Ateş-Su": "Buhar enerjisi! Zıt olsanız da çekim çok güçlü. Birbirinizi dengeliyorsunuz.",
    "Toprak-Toprak": "Sarsılmaz bir kale. Güven, huzur ve kalıcılık bu ilişkinin temeli.",
    "Toprak-Hava": "Fikirler ete kemiğe bürünüyor. Biri düşünüyor, diğeri inşa ediyor.",
    "Toprak-Su": "Toprak suyu tutar, su toprağı besler. Muazzam verimlilik ve güven.",
    "Hava-Hava": "Zihinsel bir şölen! Sürekli konuşan ve keşfeden iki ruh.",
    "Hava-Su": "Bulutların üzerinde bir dans. Duygular ve fikirler zarif harmanlanıyor.",
    "Su-Su": "Derin bir okyanus. Kelimelere gerek yok, birbirinizi ruhsal olarak anlıyorsunuz."
  };

  const combo = `${person1.element}-${person2.element}`;
  const reverseCombo = `${person2.element}-${person1.element}`;
  const elementText = elementCombos[combo] || elementCombos[reverseCombo] || "Birbirinizi tamamlayan eşsiz bir enerji.";

  reading += "### Elementlerin Dansı\n\n";
  reading += `${person1.name} bir **${person1.element}** ruhu, ${person2.name} ise **${person2.element}** ruhu. ${elementText}\n\n`;

  reading += "### Uyum Yüzdeleri\n\n";
  reading += `| Alan | Uyum |\n`;
  reading += `|:---|:---:|\n`;
  reading += `| **Duygusal Bağ** | %${compatibility.emotional} |\n`;
  reading += `| **Fiziksel Çekim** | %${compatibility.physical} |\n`;
  reading += `| **Zihinsel Uyum** | %${compatibility.intellectual} |\n`;
  reading += `| **Ruhsal Bağ** | %${compatibility.spiritual} |\n\n`;
  reading += `**Toplam Kozmik Uyum: %${compatibility.overall}**\n\n`;

  if (compatibility.houseCompatibility && compatibility.houseCompatibility.length > 0) {
    reading += "### Ev Etkileşimleri\n\n";
    compatibility.houseCompatibility.slice(0, 5).forEach(h => {
      reading += `- **${h.house}. Ev**: ${h.description} (Uyum: %${h.score})\n`;
    });
    reading += "\n";
  }

  reading += "### Ayla'nın Tavsiyesi\n\n";

  const advices = [
    "Bu ilişkide en önemli şey birbirinizin özgürlük alanlarına saygı duyarken güven bağını korumak.",
    "Farklılıklarınız aslında birbirinizi tamamlayan parçalar. Onları kucaklayın.",
    "İletişim kanallarınızı her zaman açık tutun. Dürüstlük bu bağın temelidir.",
    "Birlikte büyümeye ve gelişmeye açık olun. Bu ilişki ikinizi de dönüştürecek."
  ];

  reading += pickRandom(advices) + "\n\n";

  const conclusions = [
    "Unutma ki yıldızlar yol gösterir, ama yolu yürüyen sizsiniz. Aşkla kalın!",
    "Bu kozmik bağın kıymetini bilin. Evren sizi bir sebeple bir araya getirdi.",
    "Sizin hikayeniz gökyüzünde parlayan eşsiz bir takım yıldızı gibi.",
    "Kalbinizi dinleyin, çünkü o en doğru pusuladır."
  ];

  reading += pickRandom(conclusions);

  return reading;
}

export { ZODIAC_ELEMENTS };
