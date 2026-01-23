export interface AstrologyProfile {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  planets: Record<string, string>;
  houses: string[];
  birthDate: string;
  birthTime?: string;
  birthPlace?: string;
}

export interface SynastryInput {
  person1: {
    name: string;
    sunSign: string;
    moonSign: string;
    risingSign: string;
    planets: Record<string, string>;
    houses: string[];
  };
  person2: {
    name: string;
    sunSign: string;
    moonSign: string;
    risingSign: string;
    planets: Record<string, string>;
    houses: string[];
  };
}

const ZODIAC_ELEMENTS: Record<string, "Ateş" | "Toprak" | "Hava" | "Su"> = {
  "Koç": "Ateş", "Aslan": "Ateş", "Yay": "Ateş",
  "Boğa": "Toprak", "Başak": "Toprak", "Oğlak": "Toprak",
  "İkizler": "Hava", "Terazi": "Hava", "Kova": "Hava",
  "Yengeç": "Su", "Akrep": "Su", "Balık": "Su"
};

const ZODIAC_MODALITIES: Record<string, "Öncü" | "Sabit" | "Değişken"> = {
  "Koç": "Öncü", "Yengeç": "Öncü", "Terazi": "Öncü", "Oğlak": "Öncü",
  "Boğa": "Sabit", "Aslan": "Sabit", "Akrep": "Sabit", "Kova": "Sabit",
  "İkizler": "Değişken", "Başak": "Değişken", "Yay": "Değişken", "Balık": "Değişken"
};

const SUN_SIGN_PERSONALITIES: Record<string, {
  core: string[];
  strengths: string[];
  challenges: string[];
  love: string[];
  career: string[];
}> = {
  "Koç": {
    core: [
      "İçindeki liderlik ateşi hiç sönmez. Cesaretin ve öncü ruhunla her zaman ilk adımı atan sen olursun.",
      "Hayata karşı 'ben buradayım' diyen sarsılmaz bir iraden var. Kendi yolunu çizmek en büyük tutkun.",
      "Samimiyetin ve dürüstlüğünle tanınırsın. Enerjin etrafındakileri de harekete geçirir."
    ],
    strengths: ["Cesaret", "Öncülük", "Kararlılık", "Dürüstlük", "Hız", "Girişimcilik"],
    challenges: ["Sabırsızlık", "Öfke kontrolü", "Başkalarını dinleme", "Yarım bırakma eğilimi"],
    love: [
      "Aşkta tutkulu ve heyecanlısın. İlk adımı atmaktan çekinmezsin.",
      "İlişkilerinde dinamizm ve heyecan ararsın. Sıkıcı rutinler seni bunaltır.",
      "Partnerine karşı korumacı ve sadıksın ama özgürlüğüne de düşkünsün."
    ],
    career: [
      "Liderlik pozisyonları sana göre. Kendi işini kurmak veya ekip yönetmek doğanda var.",
      "Rekabetçi ortamlar seni motive eder. Yarışmacı ruhu hiç yitirmezsin.",
      "Girişimcilik ve yeni projeler başlatmak en güçlü yönlerin arasında."
    ]
  },
  "Boğa": {
    core: [
      "Sarsılmaz sabır ve kararlılık senin doğanda var. Hayatın tadını çıkarmayı bilirsin.",
      "Pratik zekan ve güvenilir yapınla çevrende bir dağ gibi durursun.",
      "Huzur ve istikrar arayışın seni kalıcı değerlere yönlendirir. Estetik bakış açın çok güçlü."
    ],
    strengths: ["Sabır", "Güvenilirlik", "Pratiklik", "Azim", "Sadakat", "Estetik"],
    challenges: ["İnatçılık", "Değişime direnç", "Maddi bağımlılık", "Tembellik eğilimi"],
    love: [
      "Aşkta sadık ve güvenilir bir partnersin. Uzun vadeli ilişkileri tercih edersin.",
      "Fiziksel temas ve duygusal güvenlik senin için çok önemli.",
      "Partnerine karşı korumacı ve besleyicisin. Konforu ve lüksü paylaşmayı seversin."
    ],
    career: [
      "Finans, gayrimenkul ve sanat alanlarında parlayabilirsin.",
      "Sabırlı ve metodik çalışmanla uzun vadede büyük başarılar elde edersin.",
      "Somut ve kalıcı eserler bırakmak en büyük motivasyonun."
    ]
  },
  "İkizler": {
    core: [
      "Merak dolu zihninle her şeyi öğrenmek istersin. İletişim yeteneğin eşsiz.",
      "Çok yönlü kişiliğin sayesinde her ortama kolayca uyum sağlarsın.",
      "Esprili ve canlı enerjinle insanların etrafında toplandığı bir merkezsin."
    ],
    strengths: ["Zeka", "İletişim", "Uyumluluk", "Merak", "Esneklik", "Espri"],
    challenges: ["Kararsızlık", "Yüzeysellik", "Odaklanma zorluğu", "Tutarsızlık"],
    love: [
      "Aşkta zihinsel uyum her şeyden önemli. Sıkıcı bir partner seni çabuk bunaltır.",
      "Flörtöz ve oyuncu bir yapın var. İletişim ilişkinin temelini oluşturur.",
      "Partnerinle sürekli yeni şeyler keşfetmek, konuşmak ve tartışmak hoşuna gider."
    ],
    career: [
      "Medya, yazarlık, eğitim ve satış alanlarında başarılı olabilirsin.",
      "Birden fazla projede aynı anda çalışmak seni motive eder.",
      "İletişim becerilerin her kapıyı açabilir."
    ]
  },
  "Yengeç": {
    core: [
      "Şefkat dolu kalbinle sevdiklerini koruma içgüdün çok güçlü.",
      "Sezgilerin o kadar keskindir ki, insanların hislerini konuşmadan anlarsın.",
      "Duygusal derinliğin ve geçmişe bağlılığın karakterine nostaljik bir hava katar."
    ],
    strengths: ["Şefkat", "Sezgi", "Sadakat", "Besleyicilik", "Hafıza", "Korumacılık"],
    challenges: ["Aşırı duygusallık", "Geçmişe takılma", "Küskünlük", "Kabuğuna çekilme"],
    love: [
      "Aşkta derin bağlar kurar, sevdiklerin için her şeyi yaparsın.",
      "Duygusal güvenlik senin için en önemli şey. Güvenmediğin kişilere açılmazsın.",
      "Romantik ve evci bir partnersin. Yuva kurmak en büyük hayalin."
    ],
    career: [
      "Bakım, sağlık, gastronomi ve emlak sektörlerinde başarılı olabilirsin.",
      "Yaratıcı alanlarda duygularını işe katarak harika işler çıkarırsın.",
      "Ekip içinde herkesi birleştiren, moral veren kişi sensin."
    ]
  },
  "Aslan": {
    core: [
      "Karizmatik ve cömert yapınla girdiğin her ortamda ışık saçarsın.",
      "Özgüvenin ve yaratıcılığınla başkalarına ilham verirsin.",
      "Sahne ışıkları altında olmayı, takdir edilmeyi ve hayatı coşkuyla yaşamayı seversin."
    ],
    strengths: ["Karizma", "Cömertlik", "Yaratıcılık", "Liderlik", "Özgüven", "Sadakat"],
    challenges: ["Kibir", "Eleştiriye kapalılık", "Dikkat çekme ihtiyacı", "Otoriterlik"],
    love: [
      "Aşkta tutkulu ve cömertssin. Partnerine krallar/kraliçeler gibi davranırsın.",
      "Hayranlık ve takdir görmek senin için çok önemli.",
      "Romantik jestler ve büyük aşk hikayeleri seni mutlu eder."
    ],
    career: [
      "Eğlence, sanat, liderlik ve yaratıcı sektörlerde parlarsın.",
      "Sahne önünde olmayı seven bir yapın var. Sunuculuk, oyunculuk sana göre.",
      "Kendi işini kurup patron olmak en büyük hedeflerinden."
    ]
  },
  "Başak": {
    core: [
      "Keskin analiz yeteneğin ve titizliğinle her detayı mükemmelleştirirsin.",
      "Mütevazı ve yardımsever yapınla çevrendeki sorunları sessizce çözersin.",
      "Pratik zekan ve verimlilik odaklı yaşam tarzın seni güvenilir bir rehber yapar."
    ],
    strengths: ["Titizlik", "Analiz", "Verimlilik", "Yardımseverlik", "Alçakgönüllülük", "Düzen"],
    challenges: ["Aşırı eleştiri", "Mükemmeliyetçilik", "Endişe", "Kendini küçümseme"],
    love: [
      "Aşkta seçici ve gerçekçisin. Yüzeydeki görüntüden çok karaktere önem verirsin.",
      "Sevgini hizmet ederek gösterirsin. Partnerine pratik destekler sunarsın.",
      "Güvenilir ve sadık bir partnersin ama eleştirel olabilirsin."
    ],
    career: [
      "Sağlık, analiz, yazılım, düzenleme ve danışmanlık alanlarında başarılı olursun.",
      "Detaylara dikkat gerektiren işlerde rakipsizsin.",
      "Verimlilik ve kalite senin imzan."
    ]
  },
  "Terazi": {
    core: [
      "Zarif, adil ve uyumlu bir ruhla çatışmalardan kaçınıp dengeyi ararsın.",
      "Güzelliğe ve estetiğe olan düşkünlüğün hayatını sanata dönüştürme arzusu taşır.",
      "Diplomatik yeteneğin sayesinde zıt kutupları bile bir araya getirebilirsin."
    ],
    strengths: ["Diplomasi", "Adalet", "Estetik", "Uyum", "Nezaket", "İşbirliği"],
    challenges: ["Kararsızlık", "Çatışmadan kaçınma", "Başkalarına bağımlılık", "Yüzeysellik"],
    love: [
      "İlişkiler senin hayat damarın. Yalnız kalmaktan hoşlanmazsın.",
      "Romantik ve zarif bir aşık olarak bilinirsin.",
      "Partnerinde hem fiziksel çekicilik hem de zihinsel uyum ararsın."
    ],
    career: [
      "Hukuk, diplomasi, sanat, moda ve halkla ilişkilerde parlarsın.",
      "Ekip çalışması ve işbirliği gerektiren projelerde başarılısın.",
      "Estetik ve güzellikle ilgili alanlarda doğal yeteneğin var."
    ]
  },
  "Akrep": {
    core: [
      "Gizemli, tutkulu ve çok güçlü bir iradeye sahipsin.",
      "Dönüştürücü gücün sayesinde en zor krizlerden yeniden doğarak çıkarsın.",
      "Sezgisel zekan ve araştırmacı ruhun hayatın gizemlerini çözmeye iter."
    ],
    strengths: ["Tutku", "Kararlılık", "Sezgi", "Dönüşüm", "Sadakat", "Derinlik"],
    challenges: ["Kıskançlık", "İntikamcılık", "Kontrol ihtiyacı", "Güvensizlik"],
    love: [
      "Aşkta ya hep ya hiç felsefesiyle en derin tutkuları yaşarsın.",
      "Sadakatin sarsılmaz ama ihaneti asla unutmazsın.",
      "Partnerinle ruhsal bir birleşme ararsın. Yüzeysel ilişkiler sana göre değil."
    ],
    career: [
      "Psikoloji, araştırma, finans ve kriz yönetimi alanlarında başarılı olursun.",
      "Gizli bilgileri ortaya çıkarmak ve dönüşüm projeleri doğana uygun.",
      "Stratejik düşünce ve derinlemesine analiz en güçlü yönlerin."
    ]
  },
  "Yay": {
    core: [
      "Maceracı, iyimser ve özgür ruhlu bir filozofsun.",
      "Neşen ve dürüstlüğünle insanların içini ısıtırsın.",
      "Bilgi ve deneyim peşinde dünyayı keşif alanı olarak görürsün."
    ],
    strengths: ["İyimserlik", "Özgürlük", "Dürüstlük", "Macera", "Felsefe", "Cömertlik"],
    challenges: ["Sabırsızlık", "Abartı", "Sorumluluktan kaçış", "Patavatsızlık"],
    love: [
      "Aşkta özgürlük ve macera ararsın. Kısıtlayıcı ilişkiler seni boğar.",
      "Partnerinle birlikte dünyayı keşfetmek en büyük hayalin.",
      "Dürüst ve açık sözlü bir aşıksın. Oyun oynamazsın."
    ],
    career: [
      "Eğitim, yayıncılık, seyahat ve felsefe alanlarında parlarsın.",
      "Uluslararası işler ve farklı kültürlerle çalışmak sana göre.",
      "Vizyoner projelerde liderlik etmek doğanda var."
    ]
  },
  "Oğlak": {
    core: [
      "Disiplin, ciddiyet ve büyük hırsla dağları tırmanmak senin doğanda var.",
      "Sorumluluk bilincin ve sabrınla kalıcı başarılar inşa edersin.",
      "Geleneklere saygılı ve güvenilir bir otorite figürüsün."
    ],
    strengths: ["Disiplin", "Hırs", "Sorumluluk", "Sabır", "Geleneksellik", "Strateji"],
    challenges: ["İş bağımlılığı", "Katılık", "Karamsarlık", "Duygusal mesafe"],
    love: [
      "Aşkta ciddi ve güvenilir bir partnersin. Kalıcı ilişkileri tercih edersin.",
      "Duygularını göstermekte zorlansan da sevdiğinde çok sadıksın.",
      "Partnerinle birlikte bir gelecek inşa etmek en büyük hedefin."
    ],
    career: [
      "Yöneticilik, finans, hukuk ve devlet kurumlarında başarılı olursun.",
      "Uzun vadeli hedefler belirleyip sabırla çalışmak sana göre.",
      "Otorite ve saygınlık kazanmak en büyük motivasyonun."
    ]
  },
  "Kova": {
    core: [
      "Benzersiz, yenilikçi ve özgürlükçü bir dahisin.",
      "Toplumsal normların ötesinde düşünür, insancıl değerlere önem verirsin.",
      "Orijinal fikirlerinle geleceği şekillendirmek istiyorsun."
    ],
    strengths: ["Yenilikçilik", "Bağımsızlık", "İnsancıllık", "Orijinallik", "Dostluk", "Vizyon"],
    challenges: ["Duygusal mesafe", "Aşırı idealizm", "İnatçılık", "Uyumsuzluk"],
    love: [
      "Aşkta her şeyden önce derin bir dostluk ararsın.",
      "Geleneksel ilişki kalıplarına sığmazsın. Özgürlük çok önemli.",
      "Zihinsel uyum ve ortak idealler seni çeker."
    ],
    career: [
      "Teknoloji, bilim, sivil toplum ve yenilikçi sektörlerde parlarsın.",
      "Toplumsal fayda sağlayan projelerde yer almak seni mutlu eder.",
      "Geleceği şekillendiren fikirlerin peşinden koşarsın."
    ]
  },
  "Balık": {
    core: [
      "Rüya gibi hayal gücün ve sınırsız empatin seni eşsiz kılar.",
      "Şifacı ve sanatçı ruhunla çevredekilere huzur verirsin.",
      "Evrenle aranda mistik bir bağ var. Sezgilerin çok güçlü."
    ],
    strengths: ["Empati", "Yaratıcılık", "Sezgi", "Şifa", "Fedakarlık", "Ruhsallık"],
    challenges: ["Kaçış eğilimi", "Sınır koyamama", "Gerçeklikten kopma", "Kurban psikolojisi"],
    love: [
      "Aşkta romantik ve kendini adayan bir partnersin.",
      "Ruh ikizini arar, sevgini ilahi bir boyuta taşımak istersin.",
      "Duygusal bağ senin için her şeyden önemli. Platonik aşklara yatkınsın."
    ],
    career: [
      "Sanat, müzik, şifa, psikoloji ve sosyal hizmetlerde başarılı olursun.",
      "Hayal gücünü kullanabileceğin yaratıcı alanlarda parlarsın.",
      "Başkalarına yardım etmek en büyük motivasyonun."
    ]
  }
};

const MOON_SIGN_EMOTIONS: Record<string, string[]> = {
  "Koç": [
    "Duygusal tepkilerin hızlı ve samimi. İçinde her zaman heyecan var.",
    "Duygularını asla saklayamazsın; ne hissediyorsan o an dışarı vurursun.",
    "Cesur bir iç dünyan var. Duygusal kararlarını hızla alırsın."
  ],
  "Boğa": [
    "Duygusal güvenliğin maddi huzur ve konforla bağlantılı.",
    "Sevdiklerine karşı korumacı ve besleyicisin. İstikrar ararsın.",
    "Sadık ve huzurlu bir iç dünyan var. Değişimlerden hoşlanmazsın."
  ],
  "İkizler": [
    "Duygularını zihninle analiz edersin. Sürekli iletişim ihtiyacın var.",
    "Duygusal olarak uyarılmaya ve yeni bilgilerle beslenmeye ihtiyaç duyarsın.",
    "Değişken ama canlı hislerin var. Sıkılmamak için çeşitlilik ararsın."
  ],
  "Yengeç": [
    "Ay kendi evinde! Duygusal derinliğin ve sezgilerin zirvededir.",
    "İç dünyandaki fazları gibi değişkendir ama her zaman şefkatlisin.",
    "Aile bağların ruhunu besler. Nostalji seni derinden etkiler."
  ],
  "Aslan": [
    "Duygusal olarak takdir edilmek ve özel hissetmek istersin.",
    "İç dünyanda gurur ve cömertlik yatar. Sevdiklerini kanatların altına alırsın.",
    "Duygularını dramatik ve coşkulu şekilde yaşarsın."
  ],
  "Başak": [
    "Huzuru düzen ve yararlı olmakta bulursun.",
    "Duygusal dünyanda bile analiz ve mükemmelleştirme ihtiyacı vardır.",
    "Sevgini hizmet ederek gösterirsin. Detaylar senin için önemli."
  ],
  "Terazi": [
    "Duygusal dengen ilişkilerine bağlıdır. Yalnızlıktan hoşlanmazsın.",
    "Zarif bir iç dünyan var. Çatışmalarda duygusal olarak zorlanırsın.",
    "Uyum ve güzellik seni duygusal olarak besler."
  ],
  "Akrep": [
    "Duyguların çok derin, yoğun ve gizemli. Ya hep ya hiç anlayışın var.",
    "Sezgilerin keskin; insanların sakladıklarını hissedebilirsin.",
    "Tutku senin içsel pusulan. Duygusal dönüşümler yaşarsın."
  ],
  "Yay": [
    "Duygusal özgürlüğüne düşkünsün. İç dünyanda umut ve neşe hakim.",
    "İnançların ve felsefen seni duygusal olarak besler.",
    "Kısıtlandığını hissettiğin an uzaklaşma ihtiyacı duyarsın."
  ],
  "Oğlak": [
    "Duygularını kontrol altında tutmayı seversin.",
    "İç dünyanda ciddi, sorumlu ve olgun bir duruşun var.",
    "Güvenliğin başarı ve statü ile gelir. Sabırlı bir yapın var."
  ],
  "Kova": [
    "Duygusal olarak mesafeli ama insancıl bir yapın var.",
    "Arkadaşlık temelli bağlar seni güvende hissettirir.",
    "Kimseye benzemeyen özgün bir duygusal mantığın var."
  ],
  "Balık": [
    "Duygusal bir sünger gibisin; çevrendeki tüm enerjileri hissedersin.",
    "Merhametin ve empatin sınırsız. Rüyalar senin için önemli.",
    "Ruhsal bir sığınak arayışın seni mistik konulara yöneltir."
  ]
};

const RISING_SIGN_IMPRESSIONS: Record<string, string[]> = {
  "Koç": [
    "Dışarıdan enerjik, kararlı ve rekabetçi görünürsün.",
    "İlk izlenimin güçlü ve cesur. İnsanlar seni doğal lider olarak algılar.",
    "Hızlı hareket eder, çabuk karar verirsin."
  ],
  "Boğa": [
    "Sakin, güvenilir ve zarif bir aura yayarsın.",
    "İlk izlenimin güven verici. İnsanlar yanında rahatlar.",
    "Estetik ve kaliteye önem verdiğin hemen anlaşılır."
  ],
  "İkizler": [
    "Meraklı, konuşkan ve zeki bir enerji yayarsın.",
    "İlk izlenimin eğlenceli ve ilgi çekici. İnsanlar seninle konuşmak ister.",
    "Çok yönlü ve uyumlu görünürsün."
  ],
  "Yengeç": [
    "Sıcak, şefkatli ve korumacı bir aura yayarsın.",
    "İlk izlenimin nazik ve hassas. İnsanlar sana güvenebileceklerini hisseder.",
    "Ev ve aile odaklı bir görüntün var."
  ],
  "Aslan": [
    "Karizmatik, gösterişli ve özgüvenli bir aura yayarsın.",
    "İlk izlenimin güçlü ve etkileyici. Dikkat çekmeden edemezsin.",
    "Cömert ve sıcakkanlı görünürsün."
  ],
  "Başak": [
    "Düzenli, titiz ve alçakgönüllü bir enerji yayarsın.",
    "İlk izlenimin güvenilir ve pratik. İnsanlar sana iş danışır.",
    "Temiz ve bakımlı görünümün dikkat çeker."
  ],
  "Terazi": [
    "Zarif, uyumlu ve çekici bir aura yayarsın.",
    "İlk izlenimin kibar ve diplomatik. İnsanlar yanında huzur bulur.",
    "Estetik ve denge duygun her halinde belli olur."
  ],
  "Akrep": [
    "Gizemli, yoğun ve manyetik bir aura yayarsın.",
    "İlk izlenimin güçlü ve etkileyici. İnsanlar seni merak eder.",
    "Derin bakışların ve karizman dikkat çeker."
  ],
  "Yay": [
    "Neşeli, iyimser ve maceracı bir enerji yayarsın.",
    "İlk izlenimin dost canlısı ve açık sözlü. İnsanlar seninle rahat eder.",
    "Özgür ruhun ve geniş vizyonun her halinden belli."
  ],
  "Oğlak": [
    "Ciddi, sorumlu ve profesyonel bir aura yayarsın.",
    "İlk izlenimin güvenilir ve otoriter. İnsanlar sana saygı duyar.",
    "Disiplinli ve hedef odaklı görünürsün."
  ],
  "Kova": [
    "Sıra dışı, bağımsız ve ilgi çekici bir aura yayarsın.",
    "İlk izlenimin özgün ve farklı. İnsanlar seni merak eder.",
    "Yenilikçi ve ilerici bir görüntün var."
  ],
  "Balık": [
    "Rüya gibi, empatik ve hassas bir aura yayarsın.",
    "İlk izlenimin nazik ve şefkatli. İnsanlar sana açılmak ister.",
    "Sanatsal ve ruhsal bir görüntün var."
  ]
};

const HOUSE_THEMES: Record<number, {
  name: string;
  theme: string;
  keywords: string[];
}> = {
  1: { name: "Kimlik Evi", theme: "Kişilik, dış görünüş ve hayata yaklaşım", keywords: ["benlik", "görünüm", "başlangıçlar", "kimlik"] },
  2: { name: "Değerler Evi", theme: "Maddi değerler, yetenekler ve özgüven", keywords: ["para", "değerler", "yetenekler", "güvenlik"] },
  3: { name: "İletişim Evi", theme: "İletişim, kısa yolculuklar ve kardeşler", keywords: ["iletişim", "öğrenme", "kardeşler", "komşular"] },
  4: { name: "Yuva Evi", theme: "Ev, aile, kökler ve iç dünya", keywords: ["ev", "aile", "kökler", "duygusal temel"] },
  5: { name: "Yaratıcılık Evi", theme: "Yaratıcılık, aşk, çocuklar ve eğlence", keywords: ["yaratıcılık", "romantizm", "çocuklar", "hobiler"] },
  6: { name: "Sağlık Evi", theme: "Günlük yaşam, sağlık ve hizmet", keywords: ["sağlık", "iş", "rutinler", "hizmet"] },
  7: { name: "Ortaklık Evi", theme: "İlişkiler, ortaklıklar ve evlilik", keywords: ["evlilik", "ortaklık", "sözleşmeler", "ilişkiler"] },
  8: { name: "Dönüşüm Evi", theme: "Dönüşüm, ortak kaynaklar ve gizemler", keywords: ["dönüşüm", "miras", "cinsellik", "gizemler"] },
  9: { name: "Felsefe Evi", theme: "Yüksek öğrenim, felsefe ve uzak yolculuklar", keywords: ["felsefe", "seyahat", "eğitim", "inançlar"] },
  10: { name: "Kariyer Evi", theme: "Kariyer, toplumsal statü ve hedefler", keywords: ["kariyer", "statü", "başarı", "toplum"] },
  11: { name: "Topluluk Evi", theme: "Arkadaşlar, topluluklar ve idealler", keywords: ["arkadaşlar", "gruplar", "idealler", "gelecek"] },
  12: { name: "Bilinçaltı Evi", theme: "Bilinçaltı, rüyalar ve ruhsal şifa", keywords: ["bilinçaltı", "rüyalar", "karma", "izolasyon"] }
};

const ELEMENT_COMPATIBILITY: Record<string, Record<string, { score: number; description: string }>> = {
  "Ateş": {
    "Ateş": { score: 85, description: "İki ateş birleşince tutku ve heyecan zirvede. Ama her ikisi de baskın olmak isterse çatışmalar kaçınılmaz." },
    "Toprak": { score: 65, description: "Ateş ilham verir, toprak somutlaştırır. Birbirini tamamlayan ama sabrı gerektiren bir birliktelik." },
    "Hava": { score: 90, description: "Hava ateşi körükler! Zihinsel ve enerjik olarak birbirini besleyen mükemmel bir uyum." },
    "Su": { score: 55, description: "Zıt ama çekici. Ateş suyu buharlaştırır, su ateşi söndürür. Denge kritik." }
  },
  "Toprak": {
    "Ateş": { score: 65, description: "Toprak ateşin hayallerini gerçeğe dönüştürür. Sabır ve anlayış gerektirir." },
    "Toprak": { score: 80, description: "İki toprak birlikte sarsılmaz bir kale kurar. Güven ve istikrar temelli ilişki." },
    "Hava": { score: 60, description: "Fikirler ve pratiklik buluşuyor. Ortak bir dil bulmak zaman alabilir." },
    "Su": { score: 85, description: "Toprak suyu tutar, su toprağı besler. Bereketli ve uyumlu bir birliktelik." }
  },
  "Hava": {
    "Ateş": { score: 90, description: "Hava ateşin enerjisini yayar ve güçlendirir. Dinamik ve heyecan verici bir bağ." },
    "Toprak": { score: 60, description: "Zihin ve madde buluşuyor. Birbirinden öğrenecek çok şey var." },
    "Hava": { score: 75, description: "İki hava sürekli iletişim halinde. Harika sohbetler ama duygusal derinlik gerekebilir." },
    "Su": { score: 70, description: "Duygular ve fikirler dans ediyor. Birbirini anlamak için çaba gerekir." }
  },
  "Su": {
    "Ateş": { score: 55, description: "Tutku ve duygu karşı karşıya. Yoğun ama zorlu bir dinamik." },
    "Toprak": { score: 85, description: "Su toprağı besler, toprak suya kıyı olur. Doğal ve uyumlu bir ilişki." },
    "Hava": { score: 70, description: "Hayal gücü ve mantık buluşuyor. İlginç bir kombinezon." },
    "Su": { score: 90, description: "İki su ruh derinliklerinde buluşuyor. Kelimelere gerek kalmayan bir anlayış." }
  }
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Seeded random for deterministic daily selections
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pickSeeded<T>(arr: T[], seed: number): T {
  const index = Math.floor(seededRandom(seed) * arr.length);
  return arr[index];
}

function getDailySeed(sunSign: string): number {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const combined = `${sunSign}-${dateStr}`;
  // Simple string hash
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

export function generatePersonalityReading(profile: AstrologyProfile): string {
  const sunData = SUN_SIGN_PERSONALITIES[profile.sunSign];
  const moonData = MOON_SIGN_EMOTIONS[profile.moonSign];
  const risingData = RISING_SIGN_IMPRESSIONS[profile.risingSign];
  const element = ZODIAC_ELEMENTS[profile.sunSign];
  const modality = ZODIAC_MODALITIES[profile.sunSign];

  const intros = [
    "Kozmik bir fısıltıyla ruhunun derinliklerine daldım ve gördüklerim karşısında büyülendim...",
    "Yıldızların senin doğduğun andaki o eşsiz dansı, karakterinin temellerini zarifçe atmış...",
    "Gökyüzünün kapıları senin için aralandı; bak, senin ruhun orada nasıl ışıldıyor...",
    "Sen sadece bir isim değil, gökyüzünün en nadide takımyıldızlarından birisin..."
  ];

  let reading = `## Ayla'nın Kozmik Portresi\n\n`;
  reading += pickRandom(intros) + "\n\n";

  reading += `### Güneş Burcun: ${profile.sunSign}\n\n`;
  if (sunData) {
    reading += pickRandom(sunData.core) + "\n\n";
    reading += `**Element:** ${element} | **Modalite:** ${modality}\n\n`;
    reading += `**Güçlü Yönlerin:** ${sunData.strengths.join(", ")}\n`;
    reading += `**Gelişim Alanların:** ${sunData.challenges.join(", ")}\n\n`;
  }

  reading += `### Ay Burcun: ${profile.moonSign}\n\n`;
  if (moonData) {
    reading += pickRandom(moonData) + "\n\n";
    reading += `Ay burcu duygusal iç dünyanı, güvenlik ihtiyaçlarını ve içgüdüsel tepkilerini temsil eder. ${profile.moonSign} ayı, sana ${ZODIAC_ELEMENTS[profile.moonSign]} elementinin duygusal derinliğini ve ${ZODIAC_MODALITIES[profile.moonSign].toLowerCase()} bir iç dünya veriyor.\n\n`;
  }

  reading += `### Yükselen Burcun: ${profile.risingSign}\n\n`;
  if (risingData) {
    reading += pickRandom(risingData) + "\n\n";
    reading += `Yükselen burç, dış dünyaya verdiğin ilk izlenimi ve sosyal maskenı temsil eder. ${profile.risingSign} yükseleni, sana ${ZODIAC_ELEMENTS[profile.risingSign]} elementinin ${ZODIAC_MODALITIES[profile.risingSign].toLowerCase()} bir görüntüsünü veriyor.\n\n`;
  }

  reading += `### Aşk ve İlişkiler\n\n`;
  if (sunData?.love) {
    reading += pickRandom(sunData.love) + "\n\n";
  }

  reading += `### Kariyer ve Başarı\n\n`;
  if (sunData?.career) {
    reading += pickRandom(sunData.career) + "\n\n";
  }

  const conclusions = [
    "Unutma ki bu harita senin ruhsal parmak izin gibidir. Kendi iç sesine güven, çünkü o ses yıldızların seninle konuşma şeklidir.",
    "Evren seni eşsiz bir amaçla yarattı. Potansiyelini keşfetmeye devam et.",
    "Yıldızlar rehberin, ama yolu yürüyen sensin. Işığın bol olsun!"
  ];

  reading += "---\n\n";
  reading += pickRandom(conclusions);

  return reading;
}

export function generateSynastryReading(input: SynastryInput): {
  reading: string;
  scores: {
    emotional: number;
    physical: number;
    intellectual: number;
    spiritual: number;
    overall: number;
  };
} {
  const element1 = ZODIAC_ELEMENTS[input.person1.sunSign];
  const element2 = ZODIAC_ELEMENTS[input.person2.sunSign];

  const elementCompat = ELEMENT_COMPATIBILITY[element1]?.[element2] || { score: 70, description: "Benzersiz bir bağınız var." };

  const moonCompat = calculateSignCompatibility(input.person1.moonSign, input.person2.moonSign);
  const venusCompat = input.person1.planets.venus && input.person2.planets.venus
    ? calculateSignCompatibility(input.person1.planets.venus, input.person2.planets.venus)
    : 70;
  const marsCompat = input.person1.planets.mars && input.person2.planets.mars
    ? calculateSignCompatibility(input.person1.planets.mars, input.person2.planets.mars)
    : 70;
  const mercuryCompat = input.person1.planets.mercury && input.person2.planets.mercury
    ? calculateSignCompatibility(input.person1.planets.mercury, input.person2.planets.mercury)
    : 70;

  const emotional = Math.round((moonCompat + venusCompat) / 2);
  const physical = Math.round((marsCompat + elementCompat.score) / 2);
  const intellectual = Math.round((mercuryCompat + elementCompat.score) / 2);
  const spiritual = Math.round((moonCompat + 85) / 2);
  const overall = Math.round(emotional * 0.35 + physical * 0.15 + intellectual * 0.15 + spiritual * 0.35);

  const intros = [
    `Kozmik bir fısıltıyla ${input.person1.name} ve ${input.person2.name} arasındaki bağı inceledim...`,
    `Yıldızların sizin için hazırladığı bu özel dansı okumak benim için bir onur...`,
    `Evrenin gizemli koridorlarında sizin aşk hikayenizin izini sürdüm...`
  ];

  let reading = `## ${input.person1.name} & ${input.person2.name}\n### Kozmik Aşk Haritası\n\n`;
  reading += pickRandom(intros) + "\n\n";

  reading += `### Elementlerin Dansı\n\n`;
  reading += `${input.person1.name} bir **${element1}** ruhu, ${input.person2.name} ise bir **${element2}** ruhu. `;
  reading += elementCompat.description + "\n\n";

  reading += `### Güneş Burçları Uyumu\n\n`;
  reading += `**${input.person1.sunSign}** ve **${input.person2.sunSign}** birlikte: `;
  reading += getZodiacPairDescription(input.person1.sunSign, input.person2.sunSign) + "\n\n";

  reading += `### Ay Burçları - Duygusal Bağ\n\n`;
  reading += `${input.person1.name}'in ${input.person1.moonSign} ayı ve ${input.person2.name}'in ${input.person2.moonSign} ayı: `;
  reading += getMoonPairDescription(input.person1.moonSign, input.person2.moonSign) + "\n\n";

  reading += `### Uyum Yüzdeleri\n\n`;
  reading += `| Alan | Uyum |\n`;
  reading += `|:---|:---:|\n`;
  reading += `| **Duygusal Bağ** | %${emotional} |\n`;
  reading += `| **Fiziksel Çekim** | %${physical} |\n`;
  reading += `| **Zihinsel Uyum** | %${intellectual} |\n`;
  reading += `| **Ruhsal Bağ** | %${spiritual} |\n\n`;
  reading += `**🌟 Toplam Kozmik Uyum: %${overall}**\n\n`;

  reading += `### Ayla'nın Tavsiyesi\n\n`;
  const advices = getRelationshipAdvice(overall, element1, element2);
  reading += advices + "\n\n";

  const conclusions = [
    "Unutma ki yıldızlar yol gösterir, ama yolu yürüyen sizsiniz. Aşkla kalın!",
    "Bu kozmik bağın kıymetini bilin. Evren sizi bir sebeple bir araya getirdi.",
    "Kalbinizi dinleyin, çünkü o en doğru pusuladır."
  ];

  reading += pickRandom(conclusions);

  return {
    reading,
    scores: { emotional, physical, intellectual, spiritual, overall }
  };
}

function calculateSignCompatibility(sign1: string, sign2: string): number {
  const element1 = ZODIAC_ELEMENTS[sign1];
  const element2 = ZODIAC_ELEMENTS[sign2];

  if (element1 === element2) return 85;

  const compatiblePairs: Record<string, string[]> = {
    "Ateş": ["Hava"],
    "Toprak": ["Su"],
    "Hava": ["Ateş"],
    "Su": ["Toprak"]
  };

  if (compatiblePairs[element1]?.includes(element2)) return 80;

  if (sign1 === sign2) return 75;

  const opposites: Record<string, string> = {
    "Koç": "Terazi", "Boğa": "Akrep", "İkizler": "Yay",
    "Yengeç": "Oğlak", "Aslan": "Kova", "Başak": "Balık"
  };

  if (opposites[sign1] === sign2 || opposites[sign2] === sign1) return 70;

  return 60;
}

function getZodiacPairDescription(sign1: string, sign2: string): string {
  const element1 = ZODIAC_ELEMENTS[sign1];
  const element2 = ZODIAC_ELEMENTS[sign2];

  if (sign1 === sign2) {
    return `İki ${sign1} birlikte! Birbirinizi çok iyi anlıyorsunuz çünkü aynı dili konuşuyorsunuz. Ama aynı zorlukları da paylaşıyorsunuz.`;
  }

  if (element1 === element2) {
    return `Aynı element içinde uyumlu bir çift! ${element1} enerjisi ikinizde de güçlü, bu da doğal bir anlayış yaratıyor.`;
  }

  const descriptions: Record<string, string> = {
    "Ateş-Hava": "Hava ateşi körükler! Birbirinizi motive eden dinamik bir çift.",
    "Toprak-Su": "Toprak suyu tutar, su toprağı besler. Bereketli bir birliktelik.",
    "Ateş-Toprak": "Farklı hızlarda ilerliyorsunuz ama birbirinizi dengeliyorsunuz.",
    "Hava-Su": "Mantık ve duygu buluşuyor. İlginç bir dinamik.",
    "Ateş-Su": "Tutku ve duygu karşı karşıya. Yoğun ama dönüştürücü.",
    "Toprak-Hava": "Pratik ve teorik yaklaşımlar buluşuyor. Birbirinizden öğreniyorsunuz."
  };

  const combo = `${element1}-${element2}`;
  const reverseCombo = `${element2}-${element1}`;

  return descriptions[combo] || descriptions[reverseCombo] || "Benzersiz ve keşfedilmeyi bekleyen bir bağınız var.";
}

function getMoonPairDescription(moon1: string, moon2: string): string {
  const element1 = ZODIAC_ELEMENTS[moon1];
  const element2 = ZODIAC_ELEMENTS[moon2];

  if (element1 === "Su" && element2 === "Su") {
    return "İki su ayı birlikte duygusal bir okyanus oluşturuyor. Birbirinizi kelimelere gerek kalmadan anlıyorsunuz.";
  }

  if (element1 === element2) {
    return `Duygusal dünyalarınız aynı frekansta titreşiyor. İç dünyalarınız uyumlu.`;
  }

  if ((element1 === "Ateş" && element2 === "Su") || (element1 === "Su" && element2 === "Ateş")) {
    return "Duygusal ihtiyaçlarınız farklı. Biri hızlı tepki verirken diğeri derine iniyor. Sabır gerektirir.";
  }

  return "Farklı duygusal dilleri konuşuyorsunuz ama bu zenginlik de yaratabilir.";
}

function getRelationshipAdvice(score: number, element1: string, element2: string): string {
  if (score >= 85) {
    return "Bu çok güçlü bir kozmik bağ! Birbirinizi doğal olarak anlıyor ve tamamlıyorsunuz. Bu uyumu korumak için iletişimi açık tutun.";
  }

  if (score >= 70) {
    return "Uyumlu bir çiftsiniz! Küçük farklılıklarınız aslında ilişkiyi zenginleştiriyor. Birbirinizin ihtiyaçlarına saygı gösterin.";
  }

  if (score >= 55) {
    return "Farklılıklarınız var ama bu zorluklar büyüme fırsatı. Birbirinizi değiştirmeye çalışmak yerine anlamaya odaklanın.";
  }

  return "Zorlu bir kombinasyon ama imkansız değil! Çok çaba ve anlayış gerektirir. Birbirinizin farklılıklarına saygı duyun.";
}

export function generateHouseInterpretation(houseNumber: number, sign: string, planets?: string[]): string {
  const houseInfo = HOUSE_THEMES[houseNumber];
  const element = ZODIAC_ELEMENTS[sign];

  let interpretation = `**${houseNumber}. Ev: ${houseInfo.name}**\n\n`;
  interpretation += `Bu ev ${houseInfo.theme} konularını yönetiyor. `;
  interpretation += `${sign} burcunun enerjisi bu alanda hakim olduğunda, ${element} elementinin etkisiyle yaklaşıyorsun.\n\n`;

  const signEffects: Record<string, string> = {
    "Koç": "bu alanda cesur, öncü ve enerjik bir yaklaşım sergiliyorsun.",
    "Boğa": "bu alanda sabırlı, pratik ve güvenlik odaklı ilerliyorsun.",
    "İkizler": "bu alanda meraklı, iletişimci ve çok yönlü davranıyorsun.",
    "Yengeç": "bu alanda duygusal, korumacı ve sezgisel bir tutum sergiliyorsun.",
    "Aslan": "bu alanda karizmatik, yaratıcı ve liderlik odaklısın.",
    "Başak": "bu alanda analitik, düzenli ve detaycı bir yaklaşımın var.",
    "Terazi": "bu alanda diplomatik, uyumlu ve adalet odaklısın.",
    "Akrep": "bu alanda yoğun, dönüştürücü ve stratejik davranıyorsun.",
    "Yay": "bu alanda iyimser, maceracı ve özgürlükçü bir tutumun var.",
    "Oğlak": "bu alanda disiplinli, hırslı ve hedef odaklısın.",
    "Kova": "bu alanda yenilikçi, bağımsız ve insancıl bir yaklaşımın var.",
    "Balık": "bu alanda sezgisel, empatik ve ruhsal bir tutum sergiliyorsun."
  };

  interpretation += `${sign} bu evde olduğunda ${signEffects[sign] || "benzersiz bir enerji katıyorsun."}\n`;

  if (planets && planets.length > 0) {
    interpretation += `\n**Bu evdeki gezegenler:** ${planets.join(", ")}\n`;
    interpretation += `Bu gezegenler ${houseInfo.theme.toLowerCase()} konularına ekstra odak ve enerji getiriyor.`;
  }

  return interpretation;
}

export function generateDailyHoroscope(sunSign: string, moonPhase?: string): string {
  const element = ZODIAC_ELEMENTS[sunSign];
  const modality = ZODIAC_MODALITIES[sunSign];

  const generalMessages: Record<string, string[]> = {
    "Ateş": [
      "Bugün enerjin yüksek! Harekete geç ve cesur adımlar at.",
      "Tutku ve heyecanın seni yeni kapılara taşıyacak.",
      "Liderlik özelliklerini konuşturma günü. Öne çık!"
    ],
    "Toprak": [
      "Bugün pratik konulara odaklan. Somut adımlar at.",
      "Sabırlı ol, emeklerin meyvesini verecek.",
      "Maddi konularda güzel haberler yolda."
    ],
    "Hava": [
      "İletişim günü! Konuş, yaz, paylaş.",
      "Yeni fikirler zihninde dans ediyor. Not al.",
      "Sosyal bağların güçleniyor. İnsanlarla buluş."
    ],
    "Su": [
      "Sezgilerine güven bugün. İç sesin çok net.",
      "Duygusal olarak derinleşiyorsun. Kendine zaman tanı.",
      "Yaratıcılığın zirvede. Sanatsal işlerle uğraş."
    ]
  };

  const modalityMessages: Record<string, string> = {
    "Öncü": "Yeni başlangıçlar için harika bir gün.",
    "Sabit": "Kararlılığın meyvesini veriyor.",
    "Değişken": "Esnekliğin sana avantaj sağlıyor."
  };

  // Use seeded random for consistent daily horoscopes
  const seed = getDailySeed(sunSign);

  let horoscope = `### ${sunSign} - Günlük Yorum\n\n`;
  horoscope += pickSeeded(generalMessages[element], seed) + " ";
  horoscope += modalityMessages[modality] + "\n\n";

  if (moonPhase) {
    const moonMessages: Record<string, string> = {
      "Yeni Ay": "Yeni Ay enerjisi taze başlangıçları destekliyor.",
      "İlk Dördün": "Büyüme ve genişleme zamanı.",
      "Dolunay": "Duygular yoğun, farkındalık zirvede.",
      "Son Dördün": "Bırakma ve arınma vakti."
    };
    horoscope += `**Ay Fazı:** ${moonPhase} - ${moonMessages[moonPhase] || "Ay enerjisi seninle."}\n`;
  }

  const advice = [
    "Bugün kalbinin sesini dinle.",
    "Küçük adımlar büyük sonuçlar doğurur.",
    "Enerjini doğru yere kanalize et.",
    "Kendine güven, yıldızlar seninle."
  ];

  horoscope += "\n*" + pickSeeded(advice, seed + 1) + "*";

  return horoscope;
}

export { ZODIAC_ELEMENTS, ZODIAC_MODALITIES, SUN_SIGN_PERSONALITIES, HOUSE_THEMES };
