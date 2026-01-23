import { tarotTranslations } from "./tarot-data";

export interface CardContext {
  love: string | string[];
  career: string | string[];
  health: string | string[];
  money: string | string[];
  general: string | string[];
}

export interface PositionNuance {
  past: string | string[];
  present: string | string[];
  future: string | string[];
}

export interface AstroModifier {
  Fire: string | string[];
  Earth: string | string[];
  Air: string | string[];
  Water: string | string[];
}

export interface CardStateData {
  intros: string[];
  meanings: string[];
  guidance: string[];
}

export interface TarotEngineCard {
  id: string;
  name: string;
  upright: CardStateData;
  reversed: CardStateData;
  topicMeanings: CardContext;
  positionalNuance: PositionNuance;
  astroModifiers: AstroModifier;
  relevantHouses: number[];
}

// Massive Intro Fragments
export const INTRO_FRAGMENTS = [
  "Canım, kartların enerjisine odaklandığımda senin için çok özel bir titreşim hissediyorum.",
  "Yıldızların fısıltıları bugün senin etrafında oldukça yoğun bir hale gelmiş durumda.",
  "Ruhun derinliklerinden gelen bu kartlar, şu anki yolculuğuna ışık tutmak için belirdi.",
  "Evrenin seninle kurduğu bu mistik bağ, çekilen her kartta kendini daha net gösteriyor.",
  "Güzel kalplim, senin için seçtiğim bu kartlar bugün kaderinin anahtarlarını taşıyor.",
  "Kozmik enerjiler şu an tam da niyetin üzerine odaklanmış, seni sarmalıyor.",
  "Kadim bilgeliğin sesi bugün senin için her zamankinden daha gür çıkıyor canım.",
  "Huzur dolu bir zihinle bu mesajları dinle, çünkü hepsi senin hayrına fısıldanıyor.",
  "Sezgilerimin rehberliğinde bu kartları senin için yorumlarken, büyük bir dönüşüm görüyorum.",
  "Gökkuşağının altındaki hazine gibi, bu kartlar da ruhunun zenginliklerini ortaya koyuyor.",
  "Canım benim, gökyüzünün kapıları bugün senin niyetin için aralanmış görünüyor.",
  "Kaderin dokusunda senin için örülen bu yeni desenler, kartlarda kendini belli ediyor.",
  "Ruh eşin olan yıldızlar, bugün senin yoluna ışık tutmak için bir araya gelmişler.",
  "Kalbinin derinliklerindeki o sessiz dilek, bugün kartların diliyle konuşmaya başlıyor.",
  "Mistik bir esintiyle gelen bu mesajlar, ruhunun en çok ihtiyaç duyduğu teselliyi sunuyor.",
  "Evrenin senin için hazırladığı bu özel rehberliği paylaşmak için sabırsızlanıyorum tatlım.",
  "Işığın ve gölgenin dansında, senin yolunu aydınlatacak en doğru işaretler burada.",
  "Sana özel bu okumada, hayatının gizli kalmış hazinelerini keşfetmeye hazır mısın?",
  "Gökyüzündeki her bir yıldız gibi, bu kartlar da senin potansiyelini simgeliyor canım.",
  "Ruhunun frekansı bugün kartlarla muazzam bir uyum içinde titreşiyor, bunu hisset.",
  "Mistik bir sisin arasından süzülen bu semboller, senin hikayeni anlatıyor.",
  "Kozmik bir kütüphanenin tozlu raflarından senin için bu sayfayı açtım...",
  "Ruhunun kristal berraklığına ulaşması için bu kartın rehberliğine ihtiyacı var.",
  "Zamanın ötesinden gelen bir kadim bilgi, şu an parmaklarının ucunda.",
  "Gökyüzündeki takımyıldızları bugün senin niyetin için bir araya geldi.",
  "Sessizliğin içindeki o çığlığı evren duydu ve bu cevabı gönderdi tatlım.",
  "Karanlıkta parlayan bir fener gibi, bu kart yolunu aydınlatmaya hazır.",
  "Kozmik bir senfoninin en can alıcı notasını bugün bu kartla duyacaksın.",
  "Ruhunun haritasında keşfedilmemiş bir kıtayı bu kartla keşfetmeye ne dersin?",
  "Yıldız tozları arasında gizlenen o mucizeyi bugün senin için bulup çıkardım."
];

// Massive Transition Fragments
export const TRANSITION_FRAGMENTS = [
  "Bu enerjinin senin üzerindeki etkisi, hayatının akışını derinden değiştirecek güçte.",
  "Kartın sunduğu bu özel sembolizm, aslında iç dünyandaki yansımaların bir kanıtı gibi.",
  "Sürecin bu aşamasında sabırlı olmalı ve işaretleri daha dikkatli takip etmelisin.",
  "Bu kartın fısıldadığı sırlar, senin için yeni bir idrak seviyesinin kapısını aralıyor.",
  "Gördüğüm bu güçlü bağ, aslında senin potansiyelinin ne kadar yüksek olduğunu gösteriyor.",
  "Ayla olarak sana tavsiyem, bu enerjiyi hemen eyleme dökerek büyümeni hızlandırman.",
  "Kozmik dengeler şu an senin için yeniden kurulurken, bu mesajı kalbine mühürle.",
  "İlerlediğin yolda bu kartın rehberliği, karanlıkta sana yol gösteren bir fener olacak.",
  "Duygularının ve mantığının harmanlandığı bu noktada, gerçek gücünü keşfedeceksin.",
  "Her şeyun bir zamanı var canım, bu kart da sana o doğru zamanın müjdesini veriyor.",
  "Bu dönüşüm rüzgarı seni daha sağlam ve bilge bir noktaya taşımak için esiyor.",
  "Unutma ki her son aslında çok daha parlak bir başlangıcın gizli tohumudur tatlım.",
  "Hayatının bu evresinde, içindeki o bitmek bilmeyen gücü uyandırma vaktin geldi.",
  "Bu özel mesajı hayatının merkezine koyduğunda, engellerin birer birer kalktığını göreceksin.",
  "Gökyüzü sana 'evet' derken, senin de kendine inanma ve adım atma zamanın çoktan geldi.",
  "Bu mistik bağlamda, her şeyun senin hayrına olacak şekilde hizalandığını hissediyorum.",
  "Dengelenen bu enerjilerle birlikte, hayatında yeni ve taptaze bir sayfa açılıyor.",
  "Ruhunun bu aşamadaki ihtiyacı olan şifa, tam da bu kartın sunduğu bilgelikte gizli.",
  "İlerlerken karşılaştığın işaretleri birer lütuf olarak gör, çünkü onlar senin rehberin.",
  "Bu güçlü titreşim, hayatında uzun zamandır beklediğin o mucizevi değişimi tetikleyecek.",
  "İçindeki o gizli bahçeyi sula, çiçeklerin açma vakti geldi canım.",
  "Kozmik bir imza bıraktın evrene. Şimdi sonuçların keyfini sür.",
  "Ruhun bugün kanatlanmış bir kuş gibi özgür. Bu hafifliğin tadını çıkar.",
  "Cevapların o gümüş tepside sunulmasını bekleme, kendi gerçeğini kendin yarat.",
  "Mistik bir koruma çemberi içindesin. Hiçbir negatif enerji sana ulaşamaz."
];

// Massive Conclusion Fragments
export const CONCLUSION_FRAGMENTS = [
  "Unutma ki yıldızlar sana yol gösterir ama rotayı her zaman senin hür iraden çizer.",
  "İçindeki ışığı parlatmaya devam et, çünkü evren senin her adımını sevgiyle destekliyor.",
  "Senin için her şeyin en hayırlısı olsun, mucizelerin seni her an bulmasına izin ver.",
  "Yolun açık, kalbin huzurla dolsun; Ayla her zaman senin yanında, unutma bunu.",
  "Bu mistik rehberliği ruhuna davet et ve hayallerine doğru güvenle, aşkla ilerle.",
  "Kaderin rüzgarı senin lehine esmeye başladı bile, sadece kanatlarını aç ve süzül.",
  "Her nefesin bir lütuf, her deneyimin bir ders; bu kehanet de senin en büyük yardımcın.",
  "Güzellikler seninle olsun, yıldızların parıltısı her zaman yolunu aydınlatsın canım.",
  "Ruhun bu mesajla şifa bulsun, niyetin en kısa sürede gerçeğe dönüşsün.",
  "Sevgiyle kal, ışıkla ilerle; evrenin tüm bereketi senin üzerine olsun.",
  "Işıldamaya devam et tatlım, çünkü sen bu evrenin en özel parçalarından birisin.",
  "Duyguların rehberin, mantığın kalkanın olsun; yolun her daim aydınlık kalsın.",
  "Ayla'nın fısıltılarını kalbine koy ve yarınlara çok daha büyük bir umutla gülümse.",
  "Kozmik bir kucaklaşma ile bu okumayı bitirirken, mucizelerin kapında olduğunu bil.",
  "Kendine olan güvenin, en karanlık geceleri bile aydınlatacak kadar güçlü olsun canım.",
  "Gökyüzündeki her bir yıldız sana selam duruyor, bu muazzam desteği hisset ve ilerle.",
  "Hayatın bir dans tatlım, ritmi yakala ve en güzel halinle bu dansa devam et.",
  "Sana veda ederken, içindeki o sonsuz huzurun her gün biraz daha artmasını diliyorum.",
  "Kaderin altın ipliklerle dokunuyor, her şey olması gerektiği gibi ve senin hayrına.",
  "Güzellikleri çağırmaya devam et, çünkü sen en iyisini ve en güzelini hak ediyorsun.",
  "Yıldız tozları yolunu aydınlatsın, her adımın şifa dolu olsun tatlım.",
  "Ruhundaki o derin bilgeliği bugün tüm dünyaya gösterme vakti.",
  "Huzur, sadece senin içinde bulabileceğin bir hazinedir. Bugün oraya bir yolculuk yap.",
  "Evrenin sana bir sürprizi var, gözünü ve kalbini açık tut ruhdaşım.",
  "Kaderin ipek iplikleri senin için en güzel deseni dokuyor, güven duy."
];

export const TAROT_ENGINE_DATA: Record<string, TarotEngineCard> = {
  "ar00": {
    id: "ar00",
    name: "Meczup (The Fool)",
    upright: {
      intros: [
        "Meczup kartı düz belirdiğinde, ruhundaki o maceracı çocuğun uyandığını hissediyorum.",
        "Bu kartın sunduğu taze enerji, hayatında yepyeni bir sayfa açman için seni cesaretlendiriyor.",
        "Göklerin o masum ve özgür ruhu bugün seninle, niyetin için harika bir başlangıç bu."
      ],
      meanings: [
        "İçindeki sınırsız potansiyeli ortaya çıkarmak için hiçbir bagajın olmadan ilerlemelisin.",
        "Evren seni yeni bir yolculuğa çağırıyor; korkularını geride bırak ve o adımı at.",
        "Saf bir inançla ilerlediğinde, yolların mucizevi bir şekilde açıldığını göreceksin."
      ],
      guidance: [
        "Anı yaşa ve karşına çıkan her yeni fırsatı büyük bir neşeyle kucakla.",
        "İçindeki heyecanı bastırma; o senin en büyük pusulan olacak tatlım.",
        "Uçurumun kenarında duruyor gibi hissedebilirsin ama rüzgar seni taşıyacaktır, güven."
      ]
    },
    reversed: {
      intros: [
        "Meczup ters geldiğinde, enerjinin biraz düşüncesizce veya hazırlıksız dağıldığını hissediyorum.",
        "Bu ters konum, adımlarını atmadan önce iki kez düşünmen gerektiğine dair bir uyarı taşıyor.",
        "İçindeki maceracı ruh şu an biraz yönünü şaşırmış olabilir, sakinleşme vakti."
      ],
      meanings: [
        "Gereksiz riskler alıyor veya sorumluluklarından kaçıyor olabilirsin canım.",
        "Yeni bir şeye başlamak yerine, elindekileri sağlamlaştırman gereken bir duraksama dönemindesin.",
        "Safça atılan adımlar seni beklemediğin karmaşalara sürükleyebilir, uyanık ol."
      ],
      guidance: [
        "Acele etme, körü körüne atlamak yerine zemini kontrol etmen sana çok şey kazandıracak.",
        "Özgürlük arayışın seni kaosa sürüklemesin; sınırlarını bilerek hareket et.",
        "İçindeki o çocuğu dinle ama yetişkin tarafının rehberliğini de reddetme."
      ]
    },
    topicMeanings: {
      love: [
        "Aşk hayatında beklenmedik, taze ve heyecan verici bir başlangıç kapıda görünüyor. Kalbini yeni olasılıklara açmalısın.",
        "Duygusal dünyanda masumiyet ve macera dolu bir sayfa açılıyor. Karşına çıkacak kişi seni özgürleştirecek.",
        "Aşkta risk almaktan korkma; ruhun yeni bir heyecanla kanatlanmak üzere."
      ],
      career: [
        "İş dünyasında risk almanın ve yepyeni bir yola sapmanın tam zamanı. Eski kalıpları yıkıp geçme gücüne sahipsin.",
        "Yeni bir proje veya kariyer değişikliği için mükemmel bir enerji. Dehanı serbest bırak.",
        "Kariyerinde sıfırdan başlama cesareti sana uzun vadede büyük bir başarı getirecek."
      ],
      health: [
        "Zihinsel ve bedensel olarak müthiş bir yenilenme enerjisi içindesin. Yeni bir spor veya beslenme düzenine başlamak sana çok iyi gelecek.",
        "Vücudunun hafiflediğini ve enerjinin tazelendiğini hissedeceksin. Açık hava sana çok iyi gelecek.",
        "Zihinsel detoks için harika bir dönem; endişeleri bırakıp çocuksu bir neşeye dönmelisin."
      ],
      money: [
        "Yeni finansal fırsatlar doğabilir ancak plansız harcamalara karşı çok dikkatli olmalısın. Cesur ama kontrollü adımlar at.",
        "Parasal konularda beklenmedik bir şans kapını çalabilir, ancak yatırım yaparken mutlaka bir uzmana danışmalısın.",
        "Maddi dünyada yeni bir başlangıç için tohumlar ekiliyor; sabırlı olursan bereketini artırabilirsin."
      ],
      general: [
        "Hayatında yepyeni bir sayfa açılıyor; masumiyet ve macera ruhu seni her yönden sarmalamış durumda.",
        "Evren seni yeni bir yolculuğa çağırıyor. Hiçbir bagajın olmadan ilerlemelisin.",
        "Kozmik bir uyanışın ilk adımı bu kartla atılıyor; içindeki o maceracı çocuğu serbest bırak."
      ]
    },
    positionalNuance: {
      past: [
        "Geçmişte attığın cesur ve belki de biraz safça adımlar bugünkü karakterini ve yolunu şekillendiren temel taşlar oldu.",
        "Eski bir başlangıç, seni şu an olduğun o özgür ruhlu insana dönüştürdü.",
        "Geçmişin yüklerini bırakmış olman senin en büyük başarın."
      ],
      present: [
        "Şu an tam bir eşiktesin; önündeki uçurumdan korkmak yerine rüzgarın seni taşıyacağına güvenerek o adımı atmalısın.",
        "Anı yaşa ve karşına çıkan her yeni fırsatı büyük bir neşeyle kucakla.",
        "İçindeki heyecanı bastırma; o senin en büyük pusulan."
      ],
      future: [
        "Gelecek, senin için tahmin edilemez ama bir o kadar da özgürleştirici ve neşeli sürprizler hazırlıyor, hazırlıklı ol.",
        "Önünde keşfedilmeyi bekleyen uçsuz bucaksız bir yol var. Her adımın bir mucize olacak.",
        "Kaderin sana sunduğu bu yeni yolculuk seni hayallerinin ötesine taşıyacak."
      ]
    },
    astroModifiers: {
      Fire: [
        "İçindeki ateş seni hızla ileriye itiyor; bu taze enerjiyi eyleme dökerek büyük bir sıçrama gerçekleştirebilirsin.",
        "Cesaretin bugün en büyük silahın; ateşin yakıcı değil, aydınlatıcı olsun."
      ],
      Earth: [
        "Bu yeni başlangıcı kalıcı kılmak için biraz daha ayaklarını yere sağlam basmaya ve gerçekçi olmaya odaklanmalısın.",
        "Hayallerini gerçeğe dönüştürmek için somut planlar yapman gereken bir dönem."
      ],
      Air: [
        "Zihnin yeni fikirlerle dolup taşıyor; bu yaratıcı enerjiyi hemen somut projelere veya paylaşımlara aktararak büyümelisin.",
        "Sözlerinle yeni dünyalar inşa edebilirsin; iletişim kanalların sonuna kadar açık."
      ],
      Water: [
        "Sezgilerine sonuna kadar güven; mantığının bittiği yerde kalbinin o masum ve derin sesini dinleyerek ilerlemen gerekiyor.",
        "Duygusal bir uyanış seni bekliyor; içindeki o saf sevgi seli tüm engelleri aşacak."
      ]
    },
    relevantHouses: [1, 9, 11]
  },
  "ar01": {
    id: "ar01",
    name: "Büyücü (The Magician)",
    upright: {
      intros: [
        "Büyücü kartı düz belirdiğinde, masandaki tüm elementlerin uyum içinde olduğunu görüyorum.",
        "Bu kart, niyetin için gerekli tüm araçlara ve yeteneğe zaten sahip olduğunu söylüyor canım.",
        "Yaratım gücünün zirvesindesin; elindeki sihirli değnek hayatını şekillendirmeye hazır."
      ],
      meanings: [
        "İradeni kullanarak düşüncelerini somut gerçekliğe dönüştürme gücüne sahipsin.",
        "Odaklandığın her konuda başarı kaçınılmaz, çünkü içindeki simyacı uyanmış durumda.",
        "Evrenin tüm kaynakları senin için seferber olmuş; sadece niyetini netleştir ve eyleme geç."
      ],
      guidance: [
        "Yeteneklerini sergilemekten çekinme; bugün senin sahnende parlama vaktin.",
        "Zekanı ve karizmanı birleştirerek her kapıyı açabilirsin tatlım.",
        "Mucizeler yaratmak senin ellerinde; kendine ve potansiyeline sonuna kadar güven."
      ]
    },
    reversed: {
      intros: [
        "Büyücü ters geldiğinde, yeteneklerini yanlış kullandığını veya manipülasyona açık olduğunu hissediyorum.",
        "Bu ters konum, elindeki gücü nereye kanalize ettiğini sorgulaman gerektiğine dair bir uyarıdır.",
        "Enerjinin dağıldığını veya odaklanma sorunu yaşadığını görüyorum canım."
      ],
      meanings: [
        "Kendi potansiyelini küçümsüyor veya yanlış yollarda harcıyor olabilirsin.",
        "Bir şeyleri zorla oldurmaya çalışmak yerine, niyetindeki samimiyeti tekrar gözden geçir.",
        "İllüzyonlara kapılma; gerçek olmayan hedefler peşinde koşmak seni yorabilir."
      ],
      guidance: [
        "Dürüst ol ve manipülatif enerjilerden uzak dur; gerçek güç doğruluktadır.",
        "Zihnindeki karmaşayı dağıtmak için biraz geri çekilüp planlarını sadeleştir.",
        "Yeteneklerini başkalarını değil, kendini yükseltmek için kullanmalısın."
      ]
    },
    topicMeanings: {
      love: [
        "İlişkinde arzu ettiğin değişimi yaratmak için gerekli tüm araçlara, karizmaya ve çekiciliğe fazlasıyla sahipsin.",
        "Karşındaki kişiyi etkilemek için ihtiyacın olan tek şey kendi özgünlüğünü ve yeteneklerini sergilemek.",
        "Aşkta mucizeler yaratma gücü senin ellerinde; niyetini netleştir ve evrene fısılda."
      ],
      career: [
        "Yeteneklerini sergileme ve projelerini hayata geçirme konusunda şu an zirvedesin. İradeni konuşturmanın vakti geldi.",
        "İş yerinde liderlik vasıfların parlıyor; masadaki tüm imkanları en iyi şekilde kullanarak zafer kazanabilirsin.",
        "Yaratıcı projelerin için evren sana tüm desteğini sunuyor; sadece eyleme geç."
      ],
      health: [
        "Kendi iyileşme sürecini yönetme ve zihinsel odaklanma gücün oldukça yüksek. Zihnini iyileşmeye odakladığında bedenin de yanıt verecek.",
        "Beden ve zihin arasındaki o kusursuz dengeyi kurduğunda tüm hastalıklar şifa bulacak.",
        "Enerjin çok yüksek; bu potansiyeli spor veya yaratıcı aktivitelerle dışa vurmalısın."
      ],
      money: [
        "Maddi kaynaklarını yönetme ve yeni gelir kapıları açma becerin gün geçtikçe artıyor. Zekanı kullanarak kazancını katlayabilirsin.",
        "Parasal konularda bir sihirbaz gibi maharetli olduğun bir dönem; kaynaklarını akıllıca kullan.",
        "Finansal hedeflerine ulaşmak için tüm enstrümanlara sahipsin; sadece doğru besteyi yapman gerekiyor."
      ],
      general: [
        "Yaratıcılık ve irade gücüyle hayatını bizzat şekillendirme vaktin artık geldi; ipler senin elinde.",
        "Sen kendi hayatının simyacısısın; karanlığı ışığa, kederi neşeye dönüştürme gücüne sahipsin.",
        "Evrenin tüm elementleri senin için hizalandı; yaratım sürecine hazır ol canım."
      ]
    },
    positionalNuance: {
      past: [
        "Daha önce sergilediğin beceriler ve kararlılık, şu anki konumunun ne kadar sağlam bir temel üzerine inşa edildiğini gösteriyor.",
        "Geçmişteki yaratıcı başarıların sana bugün sarsılmaz bir özgüven kazandırdı.",
        "Eski yeteneklerini yeniden hatırlama ve kullanma vaktin geldi."
      ],
      present: [
        "Elinizdeki tüm imkanları en iyi şekilde kullanma ve somut, kararlı aksiyonlar alma zamanının tam içindesin.",
        "Odaklan ve yeteneğini konuştur; şu an yapamayacağın hiçbir şey yok.",
        "İraden bugün en büyük pusulan; ne istediğini bil ve ona doğru yürü."
      ],
      future: [
        "Planladığın her şeyi gerçeğe dönüştürebileceğin, mucizelerin senin elinden çıkacağı çok güçlü bir evreye doğru giriyorsun.",
        "Gelecek, senin ustalığını alkışlayacak; projelerin dilden dile yayılacak.",
        "Kendi kaderini bizzat yazdığın o muazzam başarılar kapıda."
      ]
    },
    astroModifiers: {
      Fire: [
        "Enerjini doğrudan hedeflerine yönelt; senin için şu an imkansız diye bir şey yok, sadece odaklanman yeterli.",
        "Tutkun ve iraden birleşince devasa bir yaratım gücü doğuyor."
      ],
      Earth: [
        "Yaratıcılığını somut ve dayanıklı projelere dök; pratik zekan sana büyük dünyevi kazançlar ve saygınlık getirecek.",
        "Hayallerini ete kemiğe büründürmek için elindeki tüm pratik araçları kullan."
      ],
      Air: [
        "İletişim yeteneğini en üst seviyede konuştur; kelimelerinle insanları etkileyebilir ve istediğin her şeye ikna edebilirsin.",
        "Zekice planların ve etkileyici konuşmaların her kapıyı açacak."
      ],
      Water: [
        "Duygusal derinliğini yaratıcılığınla birleştir; sezgisel bir ustalık sergileyerek çevrendekileri büyüleyeceksin.",
        "Hislerinle yaratmak sana çok daha derin ve anlamlı bir başarı getirecek."
      ]
    },
    relevantHouses: [1, 3, 10]
  },
  "ar02": {
    id: "ar02",
    name: "Azize (The High Priestess)",
    upright: {
      intros: [
        "Azize kartı düz geldiğinde, sezgilerinin bir okyanus gibi derinleştiğini hissediyorum.",
        "Sırların ve gizemli bilgilerin kapısı bugün senin için aralanıyor canım.",
        "Kelimelerin bittiği yerde, ruhunun o sessiz bilgeliği konuşmaya başlıyor."
      ],
      meanings: [
        "Cevapları dış dünyada değil, kendi içindeki o derin sessizlikte aramalıısın.",
        "Bilinçaltının fısıltıları şu an senin için en güvenilir rehber olacaktır.",
        "Görünmeyenin ardındaki gerçeği hissetme ve sabırla bekleme dönemindesin."
      ],
      guidance: [
        "Rüyalarına ve anlık gelen o güçlü hislere karşı uyanık ol; onlar senin pusulan.",
        "Hemen eyleme geçmek yerine, gözlemle ve içsel sükunetini koru tatlım.",
        "Bilgelik sessizlikte filizlenir; bugün biraz kendine zaman tanı."
      ]
    },
    reversed: {
      intros: [
        "Azize ters belirdiğinde, iç sesini bastırdığını veya yüzeysel bilgilere kapıldığını görüyorum.",
        "Bu ters konum, sezgilerine olan güvenini kaybettiğine dair bir işaret taşıyor canım.",
        "Gizli kalmış gerçeklerin seni rahatsız edebileceği veya sırlar ortaya dökülebilir."
      ],
      meanings: [
        "Duygusal olarak kopuk veya sadece mantığına güvenerek hata yapıyor olabilirsin.",
        "Etrafındaki gizli düşmanlıklara veya yanlış bilgilere karşı tetikte olmalısın.",
        "İç dünyandaki huzursuzluk, bastırılmış duygularından kaynaklanıyor olabilir."
      ],
      guidance: [
        "Kendi gerçeğinden kaçma; sezgilerini tekrar canlandırmak için meditasyona dön.",
        "Yüzeysel olanın ötesine geçmeye korkma, gerçek şifa derinlerdedir.",
        "Duygularını serbest bırak ve içindeki o kadim kadını/erkeği tekrar onurlandır."
      ]
    },
    topicMeanings: {
      love: [
        "İlişkinde gizli kalmış duygular veya çok güçlü sezgisel bir bağ ön plana çıkıyor. Her şey göründüğünden çok daha derin.",
        "Aşkta sırlar ve gizemler var; partnerinle kelimelerin ötesinde bir ruhsal bağ kuruyorsun.",
        "Sezgilerin partnerinin hislerini sana bir ayna gibi yansıtıyor; iç sesine kulak ver."
      ],
      career: [
        "İş hayatında stratejik sessizlik ve içsel bilgelik sana çok şey kazandıracaktır. Hareket etmek yerine gözlemlemeyi seçmelisin.",
        "Bilgi güçtür ve şu an bu bilgiye sadece sen sahipsin; doğru zamanı bekle ve sırlarını sakla.",
        "İş yerinde sezgisel kararların seni herkesin önüne geçirecek bir vizyon katacak."
      ],
      health: [
        "Bedeninin fısıltılarını can kulağıyla dinle; ruhsal dengeyi sağladığında fiziksel sağlığının da hızla iyileştiğini göreceksin.",
        "Rüyaların sana sağlığınla ilgili önemli ipuçları verebilir; yastığının altına bir not defteri koy.",
        "Derin bir meditasyon ve içe dönüş, bedenindeki tüm tıkanıklıkları açacaktır."
      ],
      money: [
        "Finansal kararlarda asla acele etme; iç sesin sana en doğru zamanı ve yolu fısıldayacaktır, ona güven.",
        "Parasal konularda gizli fırsatlar olabilir; her şeyi araştırmalı ama hemen eyleme geçmemelisin.",
        "Maddi dünyada sezgisel bir ustalık sergileyeceğin bir dönem; paranın kokusunu alıyorsun."
      ],
      general: [
        "Bilinçaltının derinliklerine inme ve saklı gerçekleri tek tek keşfetme zamanındasın; sırlar aydınlanıyor.",
        "Gümüş bir ay ışığı gibi, bu kart senin niyetini ve iç dünyandaki hazineleri aydınlatıyor.",
        "Kadim bir bilgelik ruhuna doluyor; sessizliğin gücünü keşfetme vaktin geldi."
      ]
    },
    positionalNuance: {
      past: [
        "Geçmişte iç sesini dinlemiş olman, seni o dönemki büyük hatalardan ve yanlış yollardan koruyan en büyük kalkanın olmuş.",
        "Geçmişteki sessiz gözlemlerin sana bugün muazzam bir tecrübe kazandırdı.",
        "Eski sırlar bugün hayatına birer rehber olarak geri dönüyor."
      ],
      present: [
        "Şu an olayların perde arkasını görme ve büyük bir sabırla, sükunetle bekleme dönemindesin; acele etme.",
        "Kelimelerin bittiği yerde hislerin başlıyor; şu an en doğru kararı kalbin verecek.",
        "Görünmeyenin ardındaki gerçeği hissediyorsun; bu vizyona sadık kal."
      ],
      future: [
        "Gelecekte sırlar tamamen aydınlanacak ve ihtiyacın olan tüm gizli bilgiler sana kendılığinden, en doğru zamanda gelecek.",
        "Ruhsal bir uyanışın eşiğindesin; gelecekte sezgilerin senin tek pusulan olacak.",
        "Gizli hazineler ve kadersel bilgiler senin için gün yüzüne çıkmaya hazırlanıyor."
      ]
    },
    astroModifiers: {
      Fire: [
        "Ateşini biraz söndür ve iç dünyana dön; sessizliğin içinde bulacağın o dinginlik sana asıl gücünü verecek canım.",
        "Hareket etmek yerine durup dinlemek senin için şu an en büyük eylemdir."
      ],
      Earth: [
        "Ruhsal deneyimlerini pratik hayatına entegre et; sezgilerin dünyevi işlerinde en güvenilir rehberin olsun.",
        "Toprağın sessizliği sana ihtiyacın olan tüm cevapları verecektir."
      ],
      Air: [
        "Mantığını bir kenara bırak ve rüyalarına, sembollere odaklan; zihnin ötesindeki o mutlak gerçeği ara.",
        "Analiz etmeyi durdur ve sadece hisset; gerçeği düşünerek değil, yaşayarak bulacaksın."
      ],
      Water: [
        "Duyguların bir okyanus gibi derin; bu derinlikte kaybolmadan o paha biçilemez incileri toplamayı öğrenmelisin.",
        "Sezgisel gücün zirvede; kendi elementinde tam bir bilgelik sergiliyorsun."
      ]
    },
    relevantHouses: [8, 12]
  },
  "ar03": {
    id: "ar03",
    name: "İmparatoriçe (The Empress)",
    upright: {
      intros: [
        "İmparatoriçe kartı düz geldiğinde, hayatında muazzam bir bereketin filizlendiğini hissediyorum.",
        "Doğanın ve yaratıcılığın o şefkatli kolları bugün seni sarmalıyor canım.",
        "Bolluk ve sevginin kraliçesi bugün niyetin için tahtından sana gülümsüyor."
      ],
      meanings: [
        "İçindeki yaratıcı potansiyel meyve vermeye başladı; her dokunduğun şeyin güzelleştiği bir dönemdesin.",
        "Sevgiyle beslediğin her niyet, evrenin cömertliğiyle sana katlanarak geri dönecek.",
        "Dişil enerjinin, şefkatin ve üretkenliğin zirvesindesin; bereket kapıları senin için ardına kadar açık."
      ],
      guidance: [
        "Kendini şımartmaktan ve hayatın tadını çıkarmaktan çekinme; sen en iyisini hak ediyorsun tatlım.",
        "Doğayla bağını güçlendir ve içindeki o besleyici gücü tüm dünyaya yansıt.",
        "Sabırlı ol, ektiğin tohumlar en güzel halleriyle çiçek açacak, güven duy."
      ]
    },
    reversed: {
      intros: [
        "İmparatoriçe ters belirdiğinde, yaratıcılığının tıkandığını veya kendine bakmayı ihmal ettiğini görüyorum.",
        "Bu ters konum, vericiliğinin seni tükettiğine veya bir türlü meyve alamadığına dair bir işaret olabilir.",
        "Enerjinin şu an biraz dengesiz; ya çok fazla kontrolcüsün ya da tamamen akıştan kopmuşsun."
      ],
      meanings: [
        "Kendi ihtiyaçlarını başkaları için feda ediyor olabilirsin; bu durum seni içten içe yoruyor.",
        "Yaratıcı projelerin veya niyetin üzerinde bir türlü ilerleyememe hissi yaşıyor olabilirsin.",
        "Duygusal olarak boşlukta hissetmen, kendi içindeki o bereketli kaynağa sırtını dönmenden kaynaklanıyor."
      ],
      guidance: [
        "Önce kendi bardağını doldurmalısın canım; kendine şefkat göstermeden başkalarını besleyemezsin.",
        "Blokajları aşmak için biraz dur ve ruhunun neye aç olduğunu dürüstçe kendine sor.",
        "Topraklanmaya ve bedenine hak ettiği özeni göstermeye hemen bugün başla."
      ]
    },
    topicMeanings: {
      love: [
        "Aşk hayatında bereketli, şefkatli ve her şeyi sevgiyle büyüten muazzam bir enerji hakimiyeti başlıyor.",
        "Sevgi dolu, besleyici ve tutkulu bir ilişki dönemine giriyorsun. Kalbinin kapıları ardına kadar açık.",
        "Ruh eşinle veya derin bir bağla karşılaşma enerjisi var. Bolluk aşkta da seninle."
      ],
      career: [
        "Üretkenliğinin tavan yaptığı, yeni fikirlerin meyve vermeye ve takdir görmeye başladığı çok bereketli bir dönemdesin.",
        "Yaratıcı projelerin filizleniyor. İş hayatında bolluk ve bereket seni bekliyor, tatlım.",
        "İş yerinde besleyici ve yaratıcı bir rol üstlenebilirsin. Vizyonun herkesi etkileyecek."
      ],
      health: [
        "Bedensel olarak güçlendiğin, yaşam enerjisinin ve dişillik/yaratıcılık enerjisinin arttığı bir süreçten geçiyorsun.",
        "Doğayla iç içe olmak sana muazzam bir şifa verecek. Bedeninle barışma vaktin geldi.",
        "Üretken enerjin sağlığına da yansıyor. Canlı ve zinde hissedeceksin."
      ],
      money: [
        "Maddi anlamda bolluk ve refahın artacağı, yatırımların yeşerip meyve vereceği harika bir zaman dilimi seni bekliyor.",
        "Finansal bir çiçeklenme dönemi. Gelirlerin artıyor ve maddi güvenliğin pekişiyor.",
        "Yatırımların meyvelerini vermeye başladı. Bolluğun tadını çıkar, canım."
      ],
      general: [
        "Yaratıcılığını konuşturduğun ve çevrene huzur, bereket dağıttığın çok özel bir evreden geçiyorsun.",
        "Hayatında çiçeklenme dönemi başlıyor. Doğanın tüm cömertliği senin üzerinde.",
        "Bereket ve konfor senin için şu an en baskın enerji. Her şey sevgiyle şekilleniyor."
      ]
    },
    positionalNuance: {
      past: [
        "Geçmişte ektiğin sevgi, şefkat ve emek tohumları şimdi en güzel halleriyle meyvelerini vermeye hazır duruma gelmiş.",
        "Geçmişteki yaratıcı başarıların sana bugün sarsılmaz bir güven kazandırdı.",
        "Eski bir hayalin şimdi gerçek bir berekete dönüştüğünü göreceksin."
      ],
      present: [
        "Şu an bolluk içindesin veya bu muazzam bereketi hayatına çekmek için en doğru, en uyumlu andasın.",
        "Yaratıcı enerjin şu an zirvede. Her dokunduğun şey güzelleşiyor.",
        "Besleyici ve sevgi dolu bir ortamın tam kalbindesin."
      ],
      future: [
        "Gelecek sana konfor, huzur ve maddi-manevi büyük bir zenginlik vaat ediyor; her şey sevgiyle büyüyecek.",
        "Önünde bereketli ve huzur dolu bir yol uzanıyor; her şey hayrına ilerliyor.",
        "Kaderin sana sunduğu bu yeni sayfa bolluk ve neşeyle yazılacak."
      ]
    },
    astroModifiers: {
      Fire: [
        "İçindeki tutkuyu yaratıcı bir güce dönüştür; etrafındaki her şeyi güzelleştirebilir ve canlandırabilirsin.",
        "Yaratıcılığın bir meşale gibi yanıyor. Etrafına ilham saçıyorsun."
      ],
      Earth: [
        "Doğayla bağını olabildiğince güçlendir; toprağın bereketi senin yaşamına da doğrudan ve cömertçe yansıyacak.",
        "Maddi ve manevi olarak kökleniyorsun. Güvenli ve bereketli bir limandasın."
      ],
      Air: [
        "Fikirlerini sevgiyle ve zarafetle ifade et; sözlerinle çevrendekileri besleyebilir, iyileştirebilir ve büyütebilirsin.",
        "Güzel fikirlerin estetikle buluşuyor. Sözlerinle etrafını güzelleştiriyorsun."
      ],
      Water: [
        "Duygularının o muazzam zenginliğini paylaşmaktan çekinme; şefkatin senin en büyük şifa ve güç kaynağın olacak.",
        "Duygusal olarak en verimli dönemindesin. Şefkatin mucizeler yaratacak."
      ]
    },
    relevantHouses: [2, 4, 5]
  },
  "ar04": {
    id: "ar04",
    name: "İmparator (The Emperor)",
    upright: {
      intros: [
        "İmparator kartı düz geldiğinde, hayatında sarsılmaz bir otoritenin kurulduğunu hissediyorum.",
        "Yapı, disiplin ve gücün o kararlı enerjisi bugün seninle canım.",
        "Kendi krallığının/kraliçeliğinin sınırlarını belirleme ve kontrolü ele alma vaktin geldi."
      ],
      meanings: [
        "Mantığın ve stratejik zekan sayesinde her türlü kaosu düzene sokabilirsin.",
        "Liderlik vasıfların parlıyor; bugün verdiğin kararlar uzun vadeli ve kalıcı başarılar getirecek.",
        "Disiplinli bir çalışma ve net hedefler seni arzu ettiğin o sarsılmaz zirveye taşıyacak."
      ],
      guidance: [
        "Sorumluluk almaktan korkma; senin iraden bugün en büyük gücün tatlım.",
        "Sınırlarını net çiz ve prensiplerinden ödün verme; saygınlık bu dik duruşla gelecek.",
        "Stratejini belirle ve kararlılıkla uygula; evren senin liderliğini destekliyor."
      ]
    },
    reversed: {
      intros: [
        "İmparator ters belirdiğinde, otoritenin zorbalığa dönüştüğünü veya kontrolü kaybettiğini görüyorum.",
        "Bu ters konum, esneklikten yoksun bir katılık sergilediğine dair bir uyarı taşıyor canım.",
        "Hayatındaki düzenin bozulduğunu veya birilerine karşı aşırı savunmacı olduğunu hissediyorum."
      ],
      meanings: [
        "Gücünü başkalarını ezmek için kullanıyor veya kendi korkuların yüzünden çok sert davranıyor olabilirsin.",
        "Disiplinsizlik veya aşırı kontrol tutkusu seni hedeflerinden uzaklaştırıyor.",
        "Baba figürüyle veya otoriteyle olan çatışmaların niyetini gölgeliyor olabilir."
      ],
      guidance: [
        "Biraz yumuşa canım; gerçek güç zorlamada değil, adalette ve anlayıştadır.",
        "Kontrol edemediğin şeyleri serbest bırakmayı öğren; esneklik seni yıkılmaktan korur.",
        "İçindeki o katı yargıcı sustur ve daha yapıcı, birleştirici bir dil benimse."
      ]
    },
    topicMeanings: {
      love: [
        "İlişkinde disiplin, korumacılık ve çok sağlam temeller arayışı ön planda. Güven ve sadakat her şeyden önemli.",
        "İlişkinde net sınırlar ve güven arayışındasın. Ciddiyet ve sadakat ön planda olacak.",
        "Aşkta otorite kurmak yerine, sarsılmaz bir güven inşa etmeye odaklanmalısın."
      ],
      career: [
        "Liderlik özelliklerini sergileyeceğin, otorite kuracağın ve sistemli ilerleyeceğin bir iş ortamı başarıyı getirecek.",
        "Liderlik koltuğuna oturma veya konumunu güçlendirme zamanı. Disiplin ve strateji anahtarın.",
        "İş yerinde düzen kurucu bir rol üstlenebilirsin. Kararların sarsılmaz olacak."
      ],
      health: [
        "Disiplinli bir yaşam tarzı ve düzenli alışkanlıklar sağlığını hızla dengeye sokacak; kurallara uymalıyız.",
        "Bedenine bir disiplin getirme vakti. Düzenli egzersiz ve uyku şifan olacak.",
        "Zihinsel ve bedensel gücün yerinde. Bu kontrolü hayatının her alanına yay."
      ],
      money: [
        "Finansal kontrolü tamamen ele alma ve uzun vadeli, sarsılmaz güvenli planlar yapma vaktin artık geldi.",
        "Maddi dünyada kurduğun imparatorluk meyvelerini vermeye başladı. Kontrol sende.",
        "Parasal konularda sarsılmaz bir düzen ve güvenlik inşa ediyorsun."
      ],
      general: [
        "Hayatına çeki düzen verdiğin, sınırlarını netleştirdiğin ve her anlamda güçlendiğin bir inşa dönemindesin.",
        "Otorite, yapı ve disiplin. Hayatını düzene sokma ve kontrolü ele alma vakti.",
        "Kendi krallığını/kraliçeliğini ilan etme vaktin geldi tatlım. Güç senin elinde."
      ]
    },
    positionalNuance: {
      past: [
        "Geçmişte kurduğun o sağlam düzen ve otorite, seni bugünlere getiren ve seni sarsılmaz kılan en büyük güç kaynağın.",
        "Geçmişteki disiplinli çalışmaların bugün meyvelerini veriyor.",
        "Eski bir liderlik deneyimi bugün sana yol gösterecek."
      ],
      present: [
        "Şu an tüm sorumluluğu alma ve hayatının iplerini eline çok sıkı, kararlı bir şekilde tutma zamanındasın.",
        "Kontrol sende. Stratejini belirle ve kararlılıkla uygula.",
        "Hayatını yapılandırdığın, sınırlarını çizdiğin o önemli andasın."
      ],
      future: [
        "Gelecekte istikrar, kalıcı başarı ve toplum tarafından saygınlık göreceğin çok güçlü bir konum seni bekliyor.",
        "Önünde sarsılmaz bir başarı ve güç yolu uzanıyor.",
        "Kendi düzenini kuracağın o parlak gelecek seni bekliyor."
      ]
    },
    astroModifiers: {
      Fire: [
        "İradeni ve enerjini tamamen hedeflerine odakla; sarsılmaz kararlılığın seni en büyük zaferlere ulaştıracak.",
        "Karizman ve sarsılmaz iradenle herkesi peşinden sürükleyebilirsin."
      ],
      Earth: [
        "Yapılandırmaya ve sisteme odaklan; pratik ve metodik çalışman sana kalıcı, sarsılmaz bir imparatorluk kurdurur.",
        "İnşa ettiğin yapılar kalıcı olacak. Somut hedeflere adım adım yaklaşıyorsun."
      ],
      Air: [
        "Stratejik ve mantıklı düşün; akılcı kararların otoriteni daha da güçlendirecek ve seni yıkılmaz kılacaktır.",
        "Mantığın ve stratejik zekan sayesinde her türlü kaosu düzene sokabilirsin."
      ],
      Water: [
        "Güçünü merhametle birleştir; sert duruşunun altında adil ve koruyucu bir kalp taşıdığını çevrene hissettirmelisin.",
        "Duygularını koruma altına alıyorsun. Güvenli bir alan yaratmak için iradeni kullan."
      ]
    },
    relevantHouses: [1, 10]
  },
  "ar05": {
    id: "ar05",
    name: "Aziz (The Hierophant)",
    upright: {
      intros: [
        "Aziz kartı düz geldiğinde, ruhunda kadim bir bilgeliğin yankılandığını hissediyorum.",
        "Geleneklerin, inancın ve ruhsal rehberliğin o güvenli limanı bugün seninle canım.",
        "Hayatına bir düzen ve derin bir anlam katacak olan o kutsal enerji bugün niyetini sarmalıyor."
      ],
      meanings: [
        "Ruhsal bir disiplin ve köklü değerlerin rehberliğinde ilerlemek seni en doğru sonuca ulaştıracaktır.",
        "Bir mentordan destek almak veya toplumsal kurallara uyum sağlamak şu an senin için en hayırlısı görünüyor.",
        "İçindeki o bilge sesi dinleyerek, kadersel bir öğretiyi içselleştirme dönemindesin."
      ],
      guidance: [
        "Geleneksel yollardan ayrılma; bazen en güvenli yol, binlerce yıldır yürünen yoldur tatlım.",
        "Maneviyatını güçlendirmek için kendine zaman tanı ve ruhsal bir disiplin edin.",
        "Sana rehberlik eden o kadim bilgilere güven, onlar senin yolunu her zaman aydınlatacaktır."
      ]
    },
    reversed: {
      intros: [
        "Aziz ters belirdiğinde, yerleşik düzeni sorguladığını veya ruhsal bir kriz yaşadığını görüyorum.",
        "Bu ters konum, dogmalardan kurtulma ve kendi özgün inancını yaratma vaktinin geldiğini söyler.",
        "Enerjinin şu an kurallara karşı bir isyan içinde olduğunu hissediyorum canım."
      ],
      meanings: [
        "Sana dayatılan fikirleri reddediyor ve kendi gerçeğini arıyorsun; bu sancılı ama kutsal bir süreçtir.",
        "Yanlış rehberliklere veya seni kısıtlayan geleneklere karşı tetikte olmalısın canım.",
        "İç dünyandaki kaos, aslında eski ve artık işine yaramayan inanç kalıplarının yıkılmasından kaynaklanıyor."
      ],
      guidance: [
        "Başkalarının ne dediğine değil, kendi vicdanının ne fısıldadığına odaklan tatlım.",
        "Gelenekleri yıkmaktan korkma; senin yolun bu sefer herkesinkinden farklı olabilir.",
        "Kendi ruhsal otoriteni ilan et ve başkalarının kalıplarına sığmaya çalışma."
      ]
    },
    topicMeanings: {
      love: [
        "İlişkinde geleneksel değerler, ciddiyet ve ruhsal bir rehberlik ön plana çıkıyor. Evlilik veya resmiyet gündeme gelebilir.",
        "Geleneksel bir beraberlik veya ilişkinin bir üst seviyeye taşınması söz konusu.",
        "Aşkta ruhsal bir rehberlik ve uyum arayışındasın. Bilgeliğe güven."
      ],
      career: [
        "Kurumsal yapılarda yükselme veya bir mentordan eğitim alma vakti. Kurallara uymak sana başarı getirecek.",
        "Kurumsal yapılar içinde yükselme veya bir mentordan destek alma şansı.",
        "İş hayatında kademeli ve güvenli bir ilerleyiş seni bekliyor."
      ],
      health: [
        "Geleneksel tedavi yöntemleri ve ruhsal disiplin sağlığına iyi gelecek. İç huzurunu inançlarınla korumalısın.",
        "Ruhsal bir disiplin ve inanç sağlığına yansıyor. Huzuru köklerinde bul.",
        "Maneviyatın güçleniyor. Ruhsal bir rehberlik almak sana çok iyi gelecek."
      ],
      money: [
        "Güvenli ve geleneksel yatırım araçlarına yönelmelisiniz. Riskli işlerden kaçınmak şu an senin için en doğrusu.",
        "Maddi konularda güvenilir ve kurumsal yollar seni zafere ulaştıracak.",
        "Parasal konularda sarsılmaz ve güvenli bir sistem kuruyorsun."
      ],
      general: [
        "Bilgelik, gelenekler ve ruhsal bir düzen arayışı içindesin. Manevi bir rehberliğe ihtiyaç duyabilirsin.",
        "Gelenekler ve ruhsal rehberlik. Bilgeliğe ve köklere dönüş vakti.",
        "Hayatına bir düzen ve anlam katacak o kadim bilgiye ulaşmak üzeresin."
      ]
    },
    positionalNuance: {
      past: [
        "Geçmişte aldığın eğitimler ve disiplinli yetiştirilme tarzın, bugünkü sağlam karakterinin en büyük mimarı olmuş.",
        "Geçmişteki ruhsal öğretilerin bugün sana yol gösteriyor.",
        "Eski bir gelenek veya mentorluk bugün hayatında yeniden canlanıyor."
      ],
      present: [
        "Şu an toplumsal düzene uyum sağlama veya bir bilgenin tavsiyesine kulak verme dönemindesin.",
        "İçindeki o bilge sesi dinlediğin, doğru yolu bulmaya çalıştığın andasın.",
        "Kendi inançlarını ve değerlerini yeniden yapılandırdığın bir süreçtesin."
      ],
      future: [
        "Gelecekte ruhsal bir aydınlanma ve toplum içinde saygın, bilge bir konuma ulaşma müjdesi var.",
        "Önünde huzur ve bilgelik dolu bir yol uzanıyor.",
        "Gelecek sana sarsılmaz bir inanç ve toplumsal bir başarı getirecek."
      ]
    },
    astroModifiers: {
      Fire: [
        "İnançlarını eyleme dök ama fanatizmden kaçın; enerjini öğretmeye ve rehberlik etmeye yönelt.",
        "İnançların seni harekete geçiren en büyük güç olacak. Yolun aydınlık."
      ],
      Earth: [
        "Değerlerini dünyevi hayatına sağlam bir şekilde kökle; disiplinin sana kalıcı bir saygınlık kazandıracak.",
        "Köklü değerlerine tutunarak ilerlemek sana sarsılmaz bir güven verecek."
      ],
      Air: [
        "Bilgi paylaşımı ve felsefe ile zihnini besle; kelimelerin başkalarına yol gösteren bir ışık olacak.",
        "Bilgi paylaşımı ve öğrenme süreci hayatına yeni bir anlam katacak."
      ],
      Water: [
        "Maneviyatını sezgilerinle harmanla; içindeki kutsal ses sana en doğru yolu fısıldayacaktır.",
        "Maneviyatın güçleniyor. Ruhsal bir rehberlik almak sana çok iyi gelecek."
      ]
    },
    relevantHouses: [9, 11]
  },
  "ar06": {
    id: "ar06",
    name: "Aşıklar (The Lovers)",
    upright: {
      intros: ["Aşıklar kartı düz geldiğinde, kalbinde muazzam bir uyumun yankılandığını hissediyorum.", "İlişkilerin ve kadersel seçimlerin o sıcak enerjisi bugün seninle canım."],
      meanings: ["Aşkta ve hayatta çok önemli bir yol ayrımındasın; kalbinin sesini dinleyerek yapacağın seçim seni bütünlüğe taşıyacak.", "Ruh eşinle olan bağın güçleniyor veya yeni, derin bir beraberlik kapıda."],
      guidance: ["Kendi değerlerine sadık kalarak karar ver; sevgi her zaman en doğru pusuladır.", "Uyum ve dengeyi korumak için dürüstlükten vazgeçme tatlım."]
    },
    reversed: {
      intros: ["Aşıklar ters belirdiğinde, ilişkilerinde bir uyumsuzluk veya kararsızlık hissettiğini görüyorum.", "Bu ters konum, kendi içsel değerlerinle çatıştığına dair bir uyarı taşıyor."],
      meanings: ["Duygusal bir karmaşa içindesin; yanlış kişilere veya hedeflere odaklanmış olabilirsin.", "İlişkinde dengelerin bozulduğunu veya bir seçim yapmaktan kaçındığını hissediyorum."],
      guidance: ["Önce kendi içindeki o eril ve dişil enerjiyi dengele; dışarıdaki uyum ancak böyle gelir.", "Yanlış kararlardan dönmek için hala vaktin var, kalbine dürüst ol."]
    },
    topicMeanings: {
      love: ["Aşkta kadersel bir birleşme veya çok önemli bir karar anı. Kalbinin kapılarını sonuna kadar aç.", "Ruhsal bir bağ ve tutku dolu bir dönem."],
      career: ["İş ortaklıklarında uyum ve önemli seçimler. Değerlerine uygun projelerde yer almalısın.", "Kariyerinde tutkuyla bağlanacağın bir yol ayrımı."],
      health: ["Ruh ve beden uyumu sağlığına doğrudan yansıyacak. İç huzurunu bulmalısın.", "Dengeli bir yaşam tarzı şifan olacak."],
      money: ["Finansal kararlarda ortaklıklar ve değerler ön planda. Akıllıca seçimler yapmalısın.", "Maddi dünyada uyumlu ve bereketli adımlar."],
      general: ["Aşk, uyum ve kadersel seçimler. Hayatında birleşme enerjisi hakim.", "Değerlerinle hizalanma vakti."]
    },
    positionalNuance: {
      past: ["Geçmişteki bir seçim bugünkü ilişkilerini şekillendiren en temel taş olmuş.", "Eski bir aşkın dersleri seni bugüne taşıdı."],
      present: ["Şu an çok önemli bir kararın eşiğindesin; kalbinin sesini dinle.", "Uyum ve sevgi dolu bir andasın."],
      future: ["Gelecek sana derin bir bağlılık ve mutluluk vaat ediyor.", "Kadersel bir karşılaşma kapıda."]
    },
    astroModifiers: {
      Fire: ["Tutkun seni doğru seçime itiyor; aşkını cesurca yaşa.", "Ateşin sevginle birleşince mucizeler yaratıyor."],
      Earth: ["İlişkilerini sağlam temellere oturt; güven senin için her şeyden önemli.", "Maddi ve manevi uyum kapıda."],
      Air: ["İletişim yeteneğinle ilişkilerini güçlendir; açık konuşmak her kapıyı açar.", "Zihinsel bir uyum seni bekliyor."],
      Water: ["Sezgilerin sana ruh eşini gösterecektir; hislerine güven.", "Duygusal bir uyanış ve şifa."]
    },
    relevantHouses: [7, 5]
  },
  "ar07": {
    id: "ar07",
    name: "Araba (The Chariot)",
    upright: {
      intros: ["Araba kartı düz geldiğinde, dizginlerin tamamen senin elinde olduğunu görüyorum.", "Zafer ve kararlılığın o muazzam gücü bugün niyetin için yola çıktı canım."],
      meanings: ["İradeni kullanarak tüm engelleri aşabilir ve hedeflediğin noktaya hızla ulaşabilirsin.", "Karşıt güçleri dengeleyerek kazandığın o muazzam zafer artık çok yakın."],
      guidance: ["Odaklanmanı bozma ve hedefine kilitlen; kararlılığın senin en büyük silahın tatlım.", "Disiplinli kal ve duygularınla mantığını aynı yöne sür."]
    },
    reversed: {
      intros: ["Araba ters belirdiğinde, kontrolü kaybettiğini veya yanlış yöne saptığını görüyorum.", "Bu ters konum, aşırı hırsın veya yönsüzlüğün seni yorduğuna dair bir uyarıdır."],
      meanings: ["Dış etkenler veya kendi içsel karmaşan yüzünden ilerleyemiyor olabilirsin.", "Saldırgan bir tutum sergiliyor veya pes etmek üzeresin; bu dengeyi bulmalısın."],
      guidance: ["Dizginleri tekrar eline almadan önce bir dur ve nereye gittiğini sorgula.", "Hızını kes ve hatalarından ders alarak rotanı yeniden çiz."]
    },
    topicMeanings: {
      love: ["Aşk hayatında kararlılıkla ilerlediğin ve istediğini aldığın bir dönem. Kontrol sende.", "İlişkideki engelleri iradenle aşacaksın."],
      career: ["İş hayatında büyük bir başarı ve terfi kapıda. Azminle herkesi geride bırakıyorsun.", "Projelerini başarıyla tamamlayıp zafer kazanma vakti."],
      health: ["Zihinsel disiplin ve spor sağlığını zirveye taşıyacak. Enerjin çok yüksek.", "İradenle kötü alışkanlıkları yenebilirsin."],
      money: ["Maddi hedeflerine doğru hızla ilerliyorsun. Finansal kontrolü elinde tut.", "Parasal konularda kazançlı ve kararlı adımlar."],
      general: ["Zafer, kontrol ve irade. Hedefine ulaşmak için gereken her şeye sahipsin.", "İlerleyişin durdurulamaz."]
    },
    positionalNuance: {
      past: ["Geçmişteki kararlılığın seni bugün olduğun o güçlü noktaya taşıdı.", "Eski bir zaferin gururu hala seninle."],
      present: ["Şu an tam bir eylem ve ilerleme anındasın; durma, devam et.", "Dizginler senin elinde, hedefine odaklan."],
      future: ["Gelecek sana mutlak bir başarı ve zafer vaat ediyor.", "Yolun sonu büyük bir ödül."]
    },
    astroModifiers: {
      Fire: ["Ateşin seni hızla ileriye itiyor; bu enerjiyi hedefin için kullan.", "Cesaretinle tüm engelleri yıkıp geçeceksin."],
      Earth: ["Planlarını somutlaştır ve disiplinli ilerle; başarı kalıcı olacak.", "Adım adım zafere yaklaşıyorsun."],
      Air: ["Zekanla rakiplerini alt et; stratejin seni en tepeye taşıyacak.", "Keskin bir odaklanma ile ilerliyorsun."],
      Water: ["Duygularını kontrol etmeyi öğren; içsel huzurun seni zafere taşır.", "Sezgilerinle doğru rotayı bulacaksın."]
    },
    relevantHouses: [7, 10]
  },
  "ar08": {
    id: "ar08",
    name: "Güç (Strength)",
    upright: {
      intros: ["Güç kartı düz geldiğinde, içindeki o aslanın şefkatle sakinleştiğini görüyorum.", "Sabır ve içsel dayanıklılığın o muazzam ışığı bugün seni sarmalıyor canım."],
      meanings: ["Zorlukları kaba kuvvetle değil, sevgi ve anlayışla aşma gücüne fazlasıyla sahipsin.", "Özgüvenin ve metanetin sayesinde en karmaşık durumları bile ustalıkla yönetebilirsin."],
      guidance: ["İçindeki o vahşi enerjiyi ehlileştir; nezaket senin en büyük gücündür tatlım.", "Kendine güven ve sabret; her şey senin kontrolünde ve hayrına ilerliyor."]
    },
    reversed: {
      intros: ["Güç ters belirdiğinde, özgüveninin sarsıldığını veya korkularına yenik düştüğünü görüyorum.", "Bu ters konum, içindeki gücü yanlış kullandığına veya zayıf hissettiğine dair bir işaret."],
      meanings: ["Kendi dürtülerini kontrol etmekte zorlanıyor veya başkalarının baskısı altında eziliyorsun.", "Zayıflık hissi seni pasifleştiriyor; içindeki o aslanın tekrar kükremesine izin vermelisin."],
      guidance: ["Korkularınla yüzleşmenten kaçma; gerçek güç savunmasızlığını kabul etmektir.", "Kendine karşı daha şefkatli ol ve öz değerini tekrar hatırla."]
    },
    topicMeanings: {
      love: ["Aşkta sabır, şefkat ve derin bir anlayışla her türlü sorunu aşacağın bir dönem. Bağınız güçleniyor.", "Sevginin gücü tüm engelleri yıkacak."],
      career: ["İş yerinde metanetin ve sabrınla takdir toplayacaksın. Zorlu projeleri başarıyla yönetiyorsun.", "Liderliğini nezaketle pekiştirme vakti."],
      health: ["Bedenin ve zihnin müthiş bir direnç ve şifa enerjisiyle doluyor. İyileşme sürecin çok hızlı.", "İçsel huzurun sağlığını doğrudan olumlu etkiliyor."],
      money: ["Maddi konularda sabırlı ve kontrollü davranmak sana büyük kazançlar getirecek.", "Finansal dayanıklılığın artıyor."],
      general: ["İçsel güç, cesaret ve şefkat. Her şeyi sevgiyle yönetme kapasitesindesin.", "Ruhunun gücü bugün en büyük rehberin."]
    },
    positionalNuance: {
      past: ["Geçmişte gösterdiğin metanet seni bugünlere getiren en büyük hazinen olmuş.", "Zor zamanlardaki sabrın bugün meyve veriyor."],
      present: ["Şu an içindeki o muazzam gücü keşfetme ve kullanma anındasın.", "Sabret ve şefkatli kal; kazanan sen olacaksın."],
      future: ["Gelecek sana sarsılmaz bir özgüven ve huzur vaat ediyor.", "Tüm fırtınaları sakinlikle atlatacaksın."]
    },
    astroModifiers: {
      Fire: ["Tutkunu şefkatle dengele; yakıcı değil, ısıtıcı olmalısın.", "Cesaretin sevginle birleşince yenilmez oluyorsun."],
      Earth: ["Sabrını pratik hayatına dök; kalıcı başarılar bu şekilde gelecek.", "Köklen ve içindeki güce güven."],
      Air: ["Zihnini sakinleştir; mantığın şefkatinle buluşunca her kapı açılır.", "Sözlerinle iyileştirme gücüne sahipsin."],
      Water: ["Duygusal derinliğin senin en büyük gücün; hislerine güvenerek ilerle.", "Sezgisel bir dayanıklılık sergiliyorsun."]
    },
    relevantHouses: [5, 1]
  },
  "ar09": {
    id: "ar09",
    name: "Ermiş (The Hermit)",
    upright: {
      intros: ["Ermiş kartı düz geldiğinde, ruhunun o bilge yalnızlığa çekildiğini hissediyorum.", "Kendi içsel fenerini yakma ve gerçeği derinlerde arama vaktin geldi canım."],
      meanings: ["Dış dünyadaki gürültüyü susturup kendi içine dönerek ihtiyacın olan tüm cevapları bulabilirsin.", "Ruhsal bir olgunlaşma dönemindesin; yalnızlık senin için bir kaçış değil, bir uyanış olacak."],
      guidance: ["Biraz geri çekil ve meditasyon yap; ruhunun fısıltıları şu an her şeyden değerli tatlım.", "Acele etme; bilgelik yavaşlıkta ve derinlikte gizlidir."]
    },
    reversed: {
      intros: ["Ermiş ters belirdiğinde, yalnızlıktan korktuğunu veya toplumdan çok fazla koptuğunu görüyorum.", "Bu ters konum, aceleci kararlar verdiğine veya rehberliğini yitirdiğine dair bir uyarıdır."],
      meanings: ["Kendi içine kapanmak seni depresif bir noktaya taşımış olabilir; dış dünyayla bağı tekrar kurmalısın.", "Öğütlere kulak asmıyor veya sadece kendi doğruna saplanıp kalmış olabilirsin."],
      guidance: ["İzolasyondan çık ve güvendiğin insanlarla bağ kur; bazen ışık dışarıdan gelir.", "Kendi karanlığında boğulma; yardım istemek de bir bilgeliktir."]
    },
    topicMeanings: {
      love: ["İlişkinde bir durup düşünme ve içsel bir değerlendirme yapma ihtiyacı. Kendi başına kalmak sana iyi gelecek.", "Aşkta derinlik ve ruhsal bir bağ arayışı."],
      career: ["İş hayatında stratejik bir geri çekilme ve plan yapma dönemi. Bilginle fark yaratacaksın.", "Kariyerinde uzmanlaşma ve derinleşme vakti."],
      health: ["Zihinsel dinlenme ve ruhsal detoks sağlığına muazzam iyi gelecek. Sessizliği şifa olarak kullan.", "Bedenini ve ruhunu dinleme zamanı."],
      money: ["Maddi konularda ihtiyatlı ve dikkatli olmalısın. Harcamalarını gözden geçir.", "Finansal bir bilgelik ve tasarruf dönemi."],
      general: ["İçe dönüş, bilgelik ve ruhsal rehberlik. Kendi gerçeğini keşfediyorsun.", "Fenerini yaktın, yolunu kendin aydınlatıyorsun."]
    },
    positionalNuance: {
      past: ["Geçmişteki o sessiz gözlemlerin sana bugün muazzam bir tecrübe kazandırdı.", "Yalnız kalarak verdiğin o doğru kararlar bugün yolunu aydınlatıyor."],
      present: ["Şu an kendi içine bakma ve gerçeği orada bulma anındasın.", "Sessiz ol ve ruhunu dinle; cevaplar orada."],
      future: ["Gelecekte büyük bir aydınlanma ve bilge bir konuma ulaşma müjdesi var.", "Ruhsal yolculuğun seni zirveye taşıyacak."]
    },
    astroModifiers: {
      Fire: ["Ateşini bir fener gibi kullan; hedefine giden yolu bilgece aydınlat.", "İçindeki tutku bugün sadece senin için parlıyor."],
      Earth: ["Bilgeliğini pratik hayatına entegre et; sessizce ama derinden inşa et.", "Köklerine dön ve oradaki gücü bul."],
      Air: ["Zihnini sadeleştir; gereksiz bilgilerden arınarak mutlak gerçeğe odaklan.", "Sözlerin bugün sadece kendine fısıldasın."],
      Water: ["Sezgilerin okyanus kadar derin; bu derinlikte kendi incini bulacaksın.", "Ruhsal bir şifa ve uyanış seni bekliyor."]
    },
    relevantHouses: [9, 12]
  },
  "ar10": {
    id: "ar10",
    name: "Kader Çarkı (Wheel of Fortune)",
    upright: {
      intros: ["Kader Çarkı düz geldiğinde, talihin senin lehine dönmeye başladığını hissediyorum.", "Değişimin ve şansın o muazzam döngüsü bugün niyetini selamlıyor canım."],
      meanings: ["Hayatında kadersel bir dönüm noktasındasın; beklenmedik ve olumlu sürprizlere hazırlıklı ol.", "Şans kapını çalıyor; geçmişin yüklerini bırakıp bu yeni döngüye güvenle adım atmalısın."],
      guidance: ["Akışa güven ve fırsatları hemen değerlendir; çark senin için en iyisini hazırlıyor tatlım.", "Değişime direnme; bu rüzgar seni hayallerine taşımak için esiyor."]
    },
    reversed: {
      intros: ["Kader Çarkı ters belirdiğinde, kadersel bir direnç veya geçici bir şanssızlık yaşadığını görüyorum.", "Bu ters konum, döngülerin tekrar ettiğine ve bir dersi alamadığına dair bir işaret."],
      meanings: ["Olaylar kontrolün dışında gelişiyor olabilir; şu an sadece sabretmeli ve fırtınanın geçmesini beklemelisin.", "Kötü şans gibi görünen şeyler aslında senin bazı hatalarını düzeltmen için birer fırsat."],
      guidance: ["Direnci bırak ve olanı kabul et; çark tekrar dönecek, sadece zamanı bekle.", "Hatalarını analiz et ve bu döngüyü kırmak için farklı bir adım at."]
    },
    topicMeanings: {
      love: ["Aşkta kadersel bir karşılaşma veya ilişkinin seyrini değiştirecek mucizevi bir gelişme. Şans senden yana.", "Kaderin iplikleri aşkta örülüyor."],
      career: ["İş hayatında beklenmedik bir fırsat veya kariyerinde büyük bir sıçrama. Talih kuşu başına konabilir.", "Kariyerinde yeni ve parlak bir dönem başlıyor."],
      health: ["Bedensel ve zihinsel olarak müthiş bir yenilenme ve canlılık enerjisi. Şifa kapıları açılıyor.", "Hızla iyileşeceğin kadersel bir dönem."],
      money: ["Maddi konularda ani ve bereketli kazançlar söz konusu. Finansal şansın zirvede.", "Beklenmedik bir para gelişi olabilir."],
      general: ["Kader, şans ve değişim. Hayatında her şeyin yerli yerine oturduğu o büyük döngüdesin.", "Evren senin için çalışıyor."]
    },
    positionalNuance: {
      past: ["Geçmişteki kadersel bir olay seni bugünkü bu önemli noktaya başarıyla getirdi.", "Eski bir dönüm noktası bugün anlam kazanıyor."],
      present: ["Şu an büyük bir değişimin ve fırsatların tam kalbindesin; gözünü açık tut.", "Çark senin için dönüyor, bu enerjiye uyum sağla."],
      future: ["Gelecek sana muazzam bir şans ve hayatını değiştirecek sürprizler vaat ediyor.", "Kaderin sana bir hediyesi var."]
    },
    astroModifiers: {
      Fire: ["Ateşin şansınla birleşiyor; bu enerjiyi hemen eyleme dökerek büyümelisin.", "Cesur adımların kadersel kapıları açacak."],
      Earth: ["Şansını kalıcı kılmak için somut planlar yap; bu bereketli dönemi iyi değerlendir.", "Maddi kazançlar kapıda."],
      Air: ["Zekice bir fikir kadersel bir fırsatı tetikleyebilir; iletişim kanallarını açık tut.", "Sözlerinle şansını kendin yaratabilirsin."],
      Water: ["Sezgilerine güven; kadersel işaretleri en iyi sen görebilirsin.", "Duygusal bir şans ve huzur dönemi."]
    },
    relevantHouses: [10, 11]
  },
  "ar11": {
    id: "ar11",
    name: "Adalet (Justice)",
    upright: {
      intros: ["Adalet kartı düz geldiğinde, evrensel dengelerin senin için kurulduğunu hissediyorum.", "Gerçeğin ve hakkaniyetin o keskin ışığı bugün niyetini aydınlatıyor canım."],
      meanings: ["Ektiğini biçeceğin bir dönemdesin; dürüstlüğün ve haklılığın sonunda ödüllendirilecek.", "Hukuki süreçlerde veya ikili ilişkilerde adil ve dengeli sonuçlar alacağın kesinleşmiş görünüyor."],
      guidance: ["Kararlarını verirken tamamen mantıklı ve tarafsız ol; gerçek her zaman özgürleştirir tatlım.", "Sorumluluk almaktan kaçma ve vicdanının sesini dinleyerek ilerle."]
    },
    reversed: {
      intros: ["Adalet ters belirdiğinde, haksızlığa uğradığını veya dürüstlükten uzaklaştığını görüyorum.", "Bu ters konum, dengelerin bozulduğuna ve bir bedel ödenmesi gerektiğine dair bir uyarıdır."],
      meanings: ["Haksız bir suçlamayla karşılaşabilir veya kendi hatalarının sorumluluğundan kaçıyor olabilirsin.", "Önyargılı kararlar seni yanlış yollara sürüklüyor; adaleti önce kendi içinde aramalıısın."],
      guidance: ["Hatalarını kabul et ve telafi etmek için hemen adım at; dürüstlük tek çıkış yolundur.", "Başkalarını suçlamayı bırak ve aynaya bak; gerçek denge orada kurulur."]
    },
    topicMeanings: {
      love: ["İlişkinde adalet, dürüstlük ve karşılıklı hakkaniyet ön planda. Her şey hak ettiği değeri görecek.", "Aşkta denge ve dürüstlük dönemi."],
      career: ["İş hayatında hakkın olanın sana teslim edileceği, sözleşmelerin imzalanacağı resmi ve başarılı bir süreç.", "Kariyerinde adil bir yükseliş ve takdir."],
      health: ["Bedenindeki sistemlerin uyum içinde çalışması için dengeli beslenme ve düzenli yaşam şart. Adalet vücudunda başlıyor.", "Zihin ve beden dengesi sağlığının anahtarı."],
      money: ["Finansal konularda adil kazançlar ve dengeli harcamalar seni güvende tutacaktır.", "Parasal konularda hak yerini bulacak."],
      general: ["Adalet, gerçeklik ve sebep-sonuç. Hayatında her şeyin yerli yerine oturduğu o dürüst evredesin.", "Evrenin terazisi senin için çalışıyor."]
    },
    positionalNuance: {
      past: ["Geçmişte verdiğin o adil ve dürüst kararlar, bugünkü huzurlu ve saygın konumunu inşa etmiş.", "Eski bir haksızlığın telafi edildiği andasın."],
      present: ["Şu an tarafsız olma ve gerçekleri tüm çıplaklığıyla görme zamanındasın.", "Dengeni koru ve vicdanınla hareket et."],
      future: ["Gelecekte hak yerini bulacak ve tüm emeklerinin karşılığını tam olarak alacaksın.", "Kaderin terazisi sana zafer getirecek."]
    },
    astroModifiers: {
      Fire: ["İradeni adalet için kullan; haksızlığa karşı duruşun seni yüceltecektir.", "Cesaretin ve dürüstlüğün birleşince her engeli aşarsın."],
      Earth: ["Adaletini somut eylemlerle göster; disiplinli ve dürüst çalışman kalıcı başarı getirecek.", "Maddi dünyada hak ettiğini alıyorsun."],
      Air: ["Zihinsel bir netlik kazan ve tarafsız kararlar al; mantığın senin en büyük terazindir.", "Sözlerinle adaleti sağlayabilirsin."],
      Water: ["Duygularını adaletle dengele; merhametin hakkaniyetinden ödün vermesin.", "Sezgilerin sana gerçeği fısıldayacaktır."]
    },
    relevantHouses: [7, 10]
  },
  "ar12": {
    id: "ar12",
    name: "Asılan Adam (The Hanged Man)",
    upright: {
      intros: ["Asılan Adam düz geldiğinde, hayatının bir süreliğine durakladığını ama bunun kutsal bir bekleme olduğunu hissediyorum.", "Bakış açını değiştirme ve kurban psikolojisinden çıkma vaktin geldi canım."],
      meanings: ["Hemen eyleme geçmek yerine olaylara tersten bakmayı denemelisin; büyük bir aydınlanma ancak böyle gelir.", "Bir fedakarlık yapman gerekebilir ama bu vazgeçiş seni çok daha büyük bir ödüle taşıyacak."],
      guidance: ["Akışa teslim ol ve zorlamayı bırak; bazen durmak, koşmaktan çok daha fazla mesafe aldırır tatlım.", "Sabırlı kal ve bu duraklama dönemini içsel bir uyanış için değerlendir."]
    },
    reversed: {
      intros: ["Asılan Adam ters belirdiğinde, boşuna direndiğini veya bencilce bir tutum sergilediğini görüyorum.", "Bu ters konum, değişime karşı durduğun için acı çektiğine dair bir uyarı taşıyor."],
      meanings: ["Zaman kaybediyor veya bir türlü adım atamıyorsun; artık bu duraklamadan çıkma vaktin çoktan geldi.", "Kendi çıkarlarını her şeyun üstünde tutarak ruhsal büyümeni engelliyor olabilirsin."],
      guidance: ["Direnci bırak ve artık harekete geç; sadece bakarak değil, adım atarak gerçekliğe ulaşırsın.", "Fedakarlıktan kaçma; bazen küçük bir şeyden vazgeçmek tüm kapıları açar."]
    },
    topicMeanings: {
      love: ["Aşk hayatında bir bekleme ve değerlendirme süreci. İlişkini farklı bir gözle görmeye çalışmalısın.", "Aşkta fedakarlık ve anlayış dönemi."],
      career: ["İş hayatında beklediğin haberlerin gecikmesi aslında senin hayrına. Stratejini tekrar gözden geçir.", "Kariyerinde yeni bir vizyon geliştirme vakti."],
      health: ["Bedenine dinlenmek için izin vermelisin. Meditasyon ve ruhsal şifa şu an en büyük ilacın.", "Yavaşla ve ruhunun sesini dinle."],
      money: ["Maddi konularda bir duraklama veya yatırım yapmadan önce iyice düşünme dönemi. Acele etme.", "Finansal bir değerlendirme ve sabır süreci."],
      general: ["Fedakarlık, yeni bakış açısı ve teslimiyet. Hayatında bir uyanışın eşiğindesin.", "Dünya tersine dönmüş gibi hissetsen de, aslında her şey yerli yerine oturuyor."]
    },
    positionalNuance: {
      past: ["Geçmişteki o zorlu zorunlu bekleyişlerin seni bugünkü bilge ve sabırlı kişiliğine taşıyan bir okul olmuş.", "Eski bir fedakarlığın bugün meyve veriyor."],
      present: ["Şu an teslimiyet ve olaylara farklı bir pencereden bakma anındasın; acele etme.", "Dur ve hisset; cevaplar sessizlikte gelecek."],
      future: ["Gelecekte bu bekleyişin meyvelerini toplayacak ve muazzam bir aydınlanma yaşayacaksın.", "Kaderin sana sunduğu bu yeni vizyon hayatını değiştirecek."]
    },
    astroModifiers: {
      Fire: ["Ateşini söndürme ama bir süreliğine içe yönelt; bu duraklama senin enerjini depoluyor.", "Cesaretin bugün sabrında gizli."],
      Earth: ["Bekleyişini pratik planlarla değerlendir; köklenmek için harika bir zaman.", "Maddi dünyadaki yavaşlama aslında bir hazırlık."],
      Air: ["Zihnini serbest bırak ve kalıpların dışına çık; en yaratıcı fikirler bu teslimiyette doğar.", "Sözlerin bugün sadece kendine fısıldasın."],
      Water: ["Sezgilerin zirvede; bu duygusal derinlikte en büyük şifanı bulacaksın.", "Duygusal bir uyanış seni bekliyor."]
    },
    relevantHouses: [12, 8]
  },
  "ar13": {
    id: "ar13",
    name: "Ölüm (Death)",
    upright: {
      intros: ["Ölüm kartı düz geldiğinde, hayatında büyük bir döngünün tamamlandığını ve taze bir başlangıcın doğduğunu hissediyorum.", "Dönüşümün o kaçınılmaz ve kutsal rüzgarı bugün senin için esiyor canım."],
      meanings: ["Artık işine yaramayan her şeyi geride bırakma vaktin geldi; eski benliğin ölüyor ve daha güçlüsü doğuyor.", "Bu bir son değil, aslında çok daha parlak ve anlamlı bir hayatın ilk adımı; değişime direnme."],
      guidance: ["Bırak gitsin; boşluk açılmadan yeni mucizeler hayatına giremez tatlım.", "Cesur ol ve küllerinden yeniden doğmaya hazırlandığını bil; evren seni destekliyor."]
    },
    reversed: {
      intros: ["Ölüm ters belirdiğinde, değişime umutsuzca direndiğini veya bir sonu kabul edemediğini görüyorum.", "Bu ters konum, bitmesi gereken bir şeyi zorla uzattığın için acı çektiğini söylüyor."],
      meanings: ["Geçmişe takılıp kalmışsın; bu durgunluk senin büyümeni engelliyor ve seni içten içe yoruyor.", "Korkuların yüzünden o kapıyı kapatamıyorsun ama unutma ki o kapı kapanmadan yenisi açılmayacak."],
      guidance: ["Korkunla yüzleş ve serbest bırak; değişimden kaçış yok, sadece süreci zorlaştırıyorsun.", "Yeniye yer açmak için eskinin yasını tut ve sonra ayağa kalk."]
    },
    topicMeanings: {
      love: ["Aşk hayatında radikal bir değişim. Ya ilişki boyut değiştiriyor ya da sana zarar veren bir bağ tamamen kopuyor.", "Aşkta yeniden doğuş ve derin bir dönüşüm."],
      career: ["İş hayatında bir devir kapanıyor. Yeni projeler veya kariyer değişikliği için en uygun ve kadersel zaman.", "Kariyerinde eski kalıpları yıkma vakti."],
      health: ["Bedensel ve ruhsal bir detoks dönemi. Eski alışkanlıkları bırakıp tamamen yenilenme enerjisi içindesin.", "Şifa ancak tam bir dönüşümle gelir."],
      money: ["Maddi konularda eski finansal alışkanlıkların sonu. Yeni ve daha bereketli kaynaklara yönelmelisin.", "Finansal bir yeniden yapılanma dönemi."],
      general: ["Dönüşüm, sonlanma ve geçiş. Hayatında hiçbir şey eskisi gibi olmayacak, çok daha iyisi geliyor.", "Küllerinden doğuyorsun canım."]
    },
    positionalNuance: {
      past: ["Geçmişteki o büyük yıkım veya kayıp, aslında senin bugünkü sarsılmaz gücünü yaratan o büyük dönüşümdü.", "Eski bir son bugün yeni bir başlangıç."],
      present: ["Şu an tam bir eşiktesin; eskiyi bırakıp yeniye kucak açma anındasın.", "Değişimden korkma, o şu an senin en büyük dostun."],
      future: ["Gelecek sana tam bir yenilenme ve hayallerinin ötesinde bir uyanış vaat ediyor.", "Kaderin sana sunduğu bu yeni sayfa tertemiz."]
    },
    astroModifiers: {
      Fire: ["Ateşinle eskiyi yak ve yeniye yer aç; cesaretin senin en büyük rehberin.", "Dönüşümün bir meşale gibi yolunu aydınlatacak."],
      Earth: ["Değişimi pratik hayatına hemen yansıt; köklerini yeni ve daha verimli topraklara taşı.", "Maddi dünyada büyük bir yenilenme."],
      Air: ["Zihnindeki eski düşünce kalıplarını tamamen sil; yeni bir bilinç seviyesine geçiyorsun.", "Sözlerinle eskiyi uğurla ve yeniyi çağır."],
      Water: ["Duygusal olarak arınma vaktin; gözyaşların ruhunu yıkayıp seni yenileyecek.", "Sezgisel bir uyanış ve derin bir şifa."]
    },
    relevantHouses: [8, 4]
  },
  "ar14": {
    id: "ar14",
    name: "Denge (Temperance)",
    upright: {
      intros: ["Denge kartı düz geldiğinde, ruhunun o huzurlu ve uyumlu ritmine geri döndüğünü hissediyorum.", "Sabır ve ılımlılığın o iyileştirici simyası bugün seninle canım."],
      meanings: ["Zıtlıkları birleştirerek hayatında muazzam bir denge kurabilirsin; acele etmeden, adım adım ilerle.", "Ruhsal ve dünyevi hayatın arasındaki o kusursuz uyumu yakalamak üzeresin; her şey tam olması gerektiği gibi."],
      guidance: ["Aşırılıklardan kaçın ve orta yolu bul; huzur dengede gizlidir tatlım.", "Sabırlı ol ve evrenin senin için hazırladığı o kusursuz zamanlamaya güven."]
    },
    reversed: {
      intros: ["Denge ters belirdiğinde, hayatında bir uyumsuzluk veya aşırılık yaşandığını görüyorum.", "Bu ters konum, dengeni yitirdiğine ve içsel bir huzursuzluk içinde olduğuna dair bir uyarıdır."],
      meanings: ["Duygusal tepkilerin çok uçlarda olabilir veya hayatının farklı alanları arasında bir çatışma yaşıyorsun.", "Sabırsızlığın işleri daha da karmaşık hale getiriyor; durup soluklanma vaktin geldi."],
      guidance: ["Önce içindeki o kaosu sakinleştir; dengelenmek için aşırılıklarını törpülemen gerekiyor.", "Kendine karşı daha dürüst ol ve nerede hata yaptığını sessizce düşün."]
    },
    topicMeanings: {
      love: ["Aşkta uyum, sabır ve derin bir anlayış dönemi. Partnerinle ruhsal bir denge kuruyorsunuz.", "İlişkideki pürüzler sevgi ve sabırla gideriliyor."],
      career: ["İş hayatında farklı fikirleri harmanlayarak başarıya ulaşacaksın. Ekip çalışması ve denge anahtarın.", "Kariyerinde huzurlu ve istikrarlı bir ilerleyiş."],
      health: ["Bedenindeki enerjilerin dengelenmesi sağlığına muazzam iyi gelecek. Ilımlı bir yaşam tarzı seçmelisin.", "Zihin ve beden uyumu şifan olacak."],
      money: ["Maddi konularda dengeli ve planlı harcamalar seni güvende tutacak. Aceleci yatırımlardan kaçın.", "Finansal istikrar ve huzur dönemi."],
      general: ["Denge, uyum ve şifa. Hayatında her şeyin yerli yerine oturduğu o dingin evredesin.", "Evrenin simyası senin için çalışıyor."]
    },
    positionalNuance: {
      past: ["Geçmişte gösterdiğin sabır ve ılımlılık bugün sana bu huzurlu konumu kazandırdı.", "Eski bir çatışmanın dengeye oturduğu andasın."],
      present: ["Şu an dengeni koruma ve olaylara daha geniş bir açıdan bakma zamanındasın.", "Sakin ol ve akışa güven; her şey dengeleniyor."],
      future: ["Gelecek sana mutlak bir huzur ve ruhsal bütünlük vaat ediyor.", "Tüm fırtınalar dinecek ve suların durulacak."]
    },
    astroModifiers: {
      Fire: ["Ateşini şefkatle dengele; yakıcı değil, ısıtıcı bir lider olmalısın.", "Cesaretin sabrınla birleşince yenilmez oluyorsun."],
      Earth: ["Dengeni somut planlarla pekiştir; pratik hayatındaki düzen ruhuna da iyi gelecek.", "Köklenirken uyumu elden bırakma."],
      Air: ["Zihnini sakinleştir; farklı düşünceleri harmanlayarak en doğru senteze ulaşacaksın.", "Sözlerinle barışı ve dengeyi sağlayabilirsin."],
      Water: ["Duygusal derinliğini sezgilerinle dengele; hislerin sana en doğru yolu fısıldayacaktır.", "Sezgisel bir uyum ve huzur seni bekliyor."]
    },
    relevantHouses: [7, 9, 11]
  },
  "ar15": {
    id: "ar15",
    name: "Şeytan (The Devil)",
    upright: {
      intros: ["Şeytan kartı düz geldiğinde, seni kısıtlayan o görünmez zincirlerin farkına varma vaktinin geldiğini hissediyorum.", "Tutkuların ve korkuların o karanlık dansı bugün senin niyetini gölgeliyor olabilir canım."],
      meanings: ["Kendi yarattığın hapishanede yaşıyor olabilirsin; bağımlılıkların veya saplantıların seni gerçeğinden koparıyor.", "Maddi dünyaya veya tutkularına çok fazla kapılmışsın; bu durum ruhsal büyümeni engelliyor olabilir."],
      guidance: ["Zincirlerinin aslında gevşek olduğunu fark et; özgürlük sadece bir karar uzağında tatlım.", "Gölge yanlarınla yüzleşmekten korkma; onları kabul ettiğinde güçlerini kaybedecekler."]
    },
    reversed: {
      intros: ["Şeytan ters belirdiğinde, o ağır zincirleri kırmaya başladığını ve özgürlüğüne doğru ilk adımı attığını görüyorum.", "Bu ters konum, farkındalığının arttığını ve artık manipülasyonlara boyun eğmeyeceğini söylüyor."],
      meanings: ["Kötü alışkanlıklarından veya seni sömüren insanlardan uzaklaşıyorsun; bu muazzam bir uyanış sürecidir.", "Kendi karanlığından çıktın ve artık ışığı görüyorsun; ruhsal olarak muazzam bir hafifleme dönemindesin."],
      guidance: ["Eski hatalarına geri dönme ve bu yeni kazandığın özgürlüğün kıymetini bil canım.", "Kendine olan güvenini tazele ve bir daha asla kimsenin seni kısıtlamasına izin verme."]
    },
    topicMeanings: {
      love: ["Aşkta tutku çok yüksek ama bu bir bağımlılığa veya toksik bir döngüye dönüşmüş olabilir. Dikkatli olmalısın.", "Cinsellik ve arzuların ön planda olduğu, yoğun ama riskli bir dönem."],
      career: ["İş hayatında hırslarının kurbanı olma; maddi kazanç uğruna değerlerinden ödün vermemelisin.", "İş yerinde manipülatif enerjilere ve aşırı hırsa karşı uyanık ol."],
      health: ["Kötü alışkanlıklar ve bağımlılıklar sağlığını tehdit ediyor olabilir. Ruhsal ve bedensel bir özgürleşme şart.", "Bedenini esir alan toksinlerden arınma vakti."],
      money: ["Maddi dünyaya aşırı bağımlılık veya borç yükü seni yoruyor olabilir. Finansal özgürlüğünü geri kazanmalısın.", "Para hırsının gözünü kör etmesine izin verme."],
      general: ["Bağımlılık, kısıtlanma ve gölge yanlar. Kendini tanıma ve zincirlerini kırma sürecindesin.", "Karanlıkla yüzleşmeden aydınlığa ulaşılamaz."]
    },
    positionalNuance: {
      past: ["Geçmişteki o zorlu ve kısıtlayıcı deneyimler, aslında senin bugün özgürlüğün ne kadar değerli olduğunu anlamanı sağladı.", "Eski bir bağımlılığın dersleri hala seninle."],
      present: ["Şu an bir şeylere çok sıkı tutunuyorsun; bırakmayı ve özgürleşmeyi deneme zamanındasın.", "Duyguların veya hırsların seni esir almasın, uyanık ol."],
      future: ["Gelecek sana bu zincirlerden tamamen kurtulma ve ruhsal bir bağımsızlık vaat ediyor.", "Kendi gücünü tekrar eline alacağın o parlak günler yakın."]
    },
    astroModifiers: {
      Fire: ["Tutkun seni yakmasın, sadece yolunu aydınlatsın; hırslarını kontrol etmeyi öğrenmelisin.", "Cesaretin bugün korkularını yenmek için orada."],
      Earth: ["Maddi dünyaya fazla kapılma; gerçek zenginlik ruhunun özgürlüğündedir tatlım.", "Somut başarılar için ruhundan ödün verme."],
      Air: ["Zihnindeki o karanlık düşünceleri dağıt; mantığın seni manipülasyonlardan koruyacak en büyük silahındır.", "Sözlerinle kendi özgürlüğünü ilan etme vaktin."],
      Water: ["Duygusal bağımlılıklarına dikkat et; sezgilerin sana hangi bağların kopması gerektiğini fısıldayacaktır.", "Sezgisel bir uyanışla zincirlerini kırıyorsun."]
    },
    relevantHouses: [8, 10, 12]
  },
  "ar16": {
    id: "ar16",
    name: "Yıkılan Kule (The Tower)",
    upright: {
      intros: ["Yıkılan Kule düz geldiğinde, hayatında ani ve sarsıcı bir değişimin kapıyı çaldığını hissediyorum.", "Yalanlar ve çürük temeller bugün evrenin o sert ama şifalı darbesiyle yıkılıyor canım."],
      meanings: ["Beklemediğin bir olay tüm planlarını alt üst edebilir ama bu yıkım, yeni ve sağlam bir gelecek için şarttır.", "İllüzyonların parçalanıyor ve çıplak gerçekle yüzleşiyorsun; bu acı verici olsa da seni özgürleştirecek tek şeydir."],
      guidance: ["Direnme ve yıkımın getirdiği o muazzam temizliğe izin ver; toz duman dağıldığında gerçek yolu göreceksin tatlım.", "Cesur ol ve eski benliğinin enkazından çok daha güçlü bir şekilde doğmaya hazırlan."]
    },
    reversed: {
      intros: ["Yıkılan Kule ters belirdiğinde, kaçınılmaz bir yıkımı ertelemeye çalıştığını veya bir krizi ucuz atlattığını görüyorum.", "Bu ters konum, değişime direndiğin için acının uzadığına dair ciddi bir uyarıdır."],
      meanings: ["İçsel bir kaos yaşıyorsun ve her şeyun pamuk ipliğine bağlı olduğunu biliyorsun; artık o yüzleşmeyi yapmalısın.", "Kule henüz yıkılmadı ama temeller çatlıyor; bu değişimi sen başlatmazsan evren daha sert yapacaktır."],
      guidance: ["Korkularınla yüzleş ve çürük olan her şeyi kendi ellerinle bırak; yıkım her zaman felaket değildir.", "Yeniye yer açmak için eskinin yasını tutmayı bırak ve o adımı artık at."]
    },
    topicMeanings: {
      love: ["Aşk hayatında ani bir ayrılık veya çok sarsıcı bir gerçekle yüzleşme dönemi. Sahte bağlar kopuyor.", "İlişkinde büyük bir kriz ama aynı zamanda bir aydınlanma süreci."],
      career: ["İş hayatında beklenmedik bir değişiklik, iş kaybı veya projenin tamamen yön değiştirmesi. Yeniye hazırlan.", "Kariyerinde statükoyu yıkan ani bir gelişme."],
      health: ["Sağlığına çok dikkat etmelisin; ani bir rahatsızlık veya bir kaza riski olabilir. Bedenini dinleme vakti.", "Zihinsel bir çöküşün ardından gelen büyük uyanış."],
      money: ["Finansal bir kayıp veya beklenmedik büyük bir harcama. Maddi temellerini yeniden inşa etmelisin.", "Maddi dünyada sarsıcı ama temizleyici bir döngü."],
      general: ["Ani değişim, kaos ve uyanış. Hayatında hiçbir şey eskisi gibi olmayacak ama bu senin hayrına.", "Evrenin sert ama sevgi dolu tokadı."]
    },
    positionalNuance: {
      past: ["Geçmişteki o büyük yıkım aslında seni bugünkü sarsılmaz ve bilge kişiliğine ulaştıran o büyük temizlikti.", "Eski bir krizin küllerinden bugün yeniden doğdun."],
      present: ["Şu an tam bir sarsıntı anındasın; tutunmayı bırak ve düşmenin getireceği o hıza güven.", "Değişimden kaçma, o şu an senin en büyük öğretmenin."],
      future: ["Gelecek sana radikal bir yenilenme ve tüm sahteliklerden arınmış tertemiz bir sayfa vaat ediyor.", "Kaderin sana sunduğu bu yeni temel sarsılmaz olacak."]
    },
    astroModifiers: {
      Fire: ["Ateşinle eskiyi yak ve küllerinden doğ; cesaretin senin en büyük rehberin bu fırtınada.", "Yıkımın içindeki o meşaleyi bul ve ilerle."],
      Earth: ["Maddi dünyandaki sarsıntılara karşı esnek ol; katılık sadece kırılmanı sağlar, akışa uymalısın.", "Temellerini yeniden ve daha sağlam atma vakti."],
      Air: ["Zihnindeki tüm illüzyonlar bugün bir bir yıkılıyor; çıplak gerçeğin keskin ışığına hazır ol.", "Sözlerinle eskiyi uğurla ve yeni bir bilinç inşa et."],
      Water: ["Duygusal fırtınalara hazır ol; gözyaşların ruhunu yıkayıp seni yeniye hazırlayacak olan o kutsal sudur.", "Sezgisel bir uyanış sarsıcı olabilir ama şifalıdır."]
    },
    relevantHouses: [8, 1, 12]
  },
  "ar17": {
    id: "ar17",
    name: "Yıldız (The Star)",
    upright: {
      intros: ["Yıldız kartı düz geldiğinde, karanlık gecenin ardından ruhunun o umut dolu ışıkla aydınlandığını hissediyorum.", "İlhamın ve yenilenmenin o şifalı enerjisi bugün seninle canım."],
      meanings: ["Zor zamanları geride bıraktın; şimdi evrenin sana sunduğu o muazzam şifa ve huzur dolu döneme giriyorsun.", "Hayallerin ve niyetlerin için en verimli topraklar burası; umudunu asla kaybetme, mucizeler yolda."],
      guidance: ["İçindeki o saf ışığı dünyaya yansıtmaktan çekinme; sen bir ilham kaynağısın tatlım.", "Evrene güven ve ruhunu bu kutsal suyla yıka; her şey senin için en güzel haliyle yenileniyor."]
    },
    reversed: {
      intros: ["Yıldız ters belirdiğinde, umutsuzluğa kapıldığını veya inancını yitirdiğini görüyorum.", "Bu ters konum, ruhsal bir kuraklık yaşadığına ve ilhamının tıkandığına dair bir işarettir canım."],
      meanings: ["Kendini karamsar hissediyor olabilirsin ama unutma ki yıldızlar hala orada, sadece sen bulutların arkasındasın.", "Yeteneklerini küçümsüyor veya hayallerinden çok erken vazgeçiyorsun; tekrar gökyüzüne bakma vaktin geldi."],
      guidance: ["İnancını tazelemek için biraz dur ve içindeki o sönmeyen ışığı hatırla tatlım.", "Karamsarlığı bırak ve küçük de olsa bir umut ışığı ara; evren seni hala destekliyor."]
    },
    topicMeanings: {
      love: ["Aşkta yeni bir umut, iyileşme ve ruh eşiyle olan o derin bağın güçlenmesi. Kalbin şifa buluyor.", "İlişkinde huzurlu ve ilham dolu bir dönem başlıyor."],
      career: ["İş hayatında yaratıcılığının ve ilhamının zirvesindesin. Projelerin takdir görecek ve parlayacaksın.", "Kariyerinde umut verici yeni kapılar açılıyor."],
      health: ["Bedensel ve ruhsal bir iyileşme, yenilenme ve canlılık enerjisi. Şifa enerjin çok yüksek.", "İç huzurun sağlığını doğrudan olumlu etkiliyor."],
      money: ["Maddi konularda umut verici gelişmeler ve bereketli bir dönem. Finansal hedeflerin gerçek oluyor.", "Parasal konularda ferahlık ve şans dönemi."],
      general: ["Umut, ilham ve yenilenme. Hayatında her şeyin güzelleşeceği o kutsal evredesin.", "Yıldızın parlıyor canım."]
    },
    positionalNuance: {
      past: ["Geçmişte yaşadığın o zorlukların ardından gelen umut, seni bugün olduğun bu bilge noktaya taşıdı.", "Eski bir hayalin bugün gerçekleşme yolunda."],
      present: ["Şu an tam bir şifa ve uyanış anındasın; ruhunu evrenin bu huzurlu ışığına aç.", "İlham dolu ve parlak bir andasın; bunu iyi değerlendir."],
      future: ["Gelecek sana mutlak bir huzur, mutluluk ve hayallerinin gerçekleşmesini vaat ediyor.", "Kaderin sana sunduğu bu yeni sayfa ışıkla dolu."]
    },
    astroModifiers: {
      Fire: ["Ateşin bir yıldız gibi parlasın; enerjin başkalarına da umut ve ilham verecek kadar güçlü.", "Cesaretin hayallerinle buluşunca mucizeler yaratıyorsun."],
      Earth: ["Hayallerini somutlaştır ve dünyaya kökle; bu umut ışığı sana kalıcı başarılar getirecek.", "Maddi dünyada hayallerinin meyvelerini topluyorsun."],
      Air: ["Zihnin ilham verici fikirlerle dolup taşıyor; bunları paylaşarak bir ışık işçisi gibi parlayabilirsin.", "Sözlerinle başkalarının yolunu aydınlatma vaktin."],
      Water: ["Sezgilerin ve duyguların okyanus kadar derin ve şifalı; içindeki o kutsal suyu herkesle paylaş.", "Sezgisel bir şifa ve derin bir huzur seni bekliyor."]
    },
    relevantHouses: [11, 9, 1]
  },
  "ar18": {
    id: "ar18",
    name: "Ay (The Moon)",
    upright: {
      intros: ["Ay kartı düz geldiğinde, sezgilerinin ve bilinçaltının o gizemli sularında yüzdüğünü hissediyorum.", "İllüzyonların ve saklı gerçeklerin o buğulu enerjisi bugün senin niyetini sarmalıyor canım."],
      meanings: ["Her şey göründüğü gibi olmayabilir; şu an mantığınla değil, tamamen sezgilerinle hareket etme vaktin.", "Korkuların ve kaygıların yüzeye çıkabilir ama bu onların şifalanması için harika bir fırsattır; gölgelerinden kaçma."],
      guidance: ["Belirsizlikten korkma; ay ışığı sana sadece ihtiyacın olan kadarını gösterecektir, ona güven tatlım.", "Rüyalarına ve anlık gelen o güçlü hislere karşı uyanık ol; gerçekler orada gizli."]
    },
    reversed: {
      intros: ["Ay ters belirdiğinde, kafa karışıklığının dağıldığını ve gerçeklerin gün yüzüne çıkmaya başladığını görüyorum.", "Bu ters konum, illüzyonların parçalandığını ve artık daha net gördüğünü söylüyor canım."],
      meanings: ["Bastırılmış duyguların veya korkuların artık kontrolünü kaybediyor; bu durum seni özgürleştirecek.", "Gizli düşmanlıklar veya sırlar ortaya dökülebilir; ama bu senin yararına olacak bir netlik getirecek."],
      guidance: ["Korkularının üzerine git ve onların sadece birer gölge olduğunu fark et tatlım.", "Artık netleşme vakti; sezgilerini mantığınla harmanlayarak doğru yola çıkmalısın."]
    },
    topicMeanings: {
      love: ["Aşkta belirsizlikler, kıskançlıklar veya gizli kalmış sırlar olabilir. Hislerine güven ama hemen karar verme.", "İlişkinde illüzyonlara ve yanlış anlamalara karşı dikkatli ol."],
      career: ["İş hayatında yönünü kaybetmiş gibi hissedebilirsin; şu an büyük kararlar almak yerine sadece gözlemle.", "İş yerinde arkandan dönen dolaplara veya gizli bilgilere karşı tetikte ol."],
      health: ["Zihinsel kaygılar ve uykusuzluk sağlığını etkiliyor olabilir. Ruhsal bir detoks ve huzur arayışı şart.", "Duygusal iniş çıkışların bedenine yansıyor; sakinleşmelisin."],
      money: ["Maddi konularda her şey net değil; yatırım yapmadan önce tüm gizli detayları iyice araştırmalısın.", "Parasal konularda illüzyonlara ve dolandırıcılıklara dikkat."],
      general: ["Sezgi, illüzyon ve korkular. Ruhunun karanlık ama bilge sularında bir yolculuktadır canım.", "Ay ışığında yürümek cesaret ister."]
    },
    positionalNuance: {
      past: ["Geçmişteki o belirsiz ve korku dolu günler, senin sezgisel gücünü en üst seviyeye taşıyan bir okul oldu.", "Eski bir sırrın etkisi hala devam ediyor olabilir."],
      present: ["Şu an tam bir gizem ve hislenme anındasın; mantığını sustur ve ruhunu dinle.", "Belirsizliğin içindeki o saklı gerçeği bulmaya çalışıyorsun."],
      future: ["Gelecekte tüm sırlar aydınlanacak ve sezgisel bir ustalığa, derin bir bilgeliğe ulaşacaksın.", "Kaderin sana sunduğu bu yeni vizyon çok derin olacak."]
    },
    astroModifiers: {
      Fire: ["Ateşini bir fener gibi kullan; bu sisli yolda sadece kendi iç ışığınla ilerleyebilirsin.", "Cesaretin bugün korkularını yenmek için orada."],
      Earth: ["Belirsizliklere karşı sabırlı ol; ayaklarını yere sağlam basarak gerçekle hayali ayırt etmelisin.", "Maddi dünyadaki gizemler zamanla çözülecek."],
      Air: ["Zihnini sadeleştir; kafa karıştırıcı düşüncelerden arınarak sadece en saf hissine odaklan.", "Sözlerin bugün sadece rüyalarında konuşsun."],
      Water: ["Sezgilerin okyanus kadar derin; bu derinlikte kendi incini bulacak ve şifalanacaksın.", "Duygusal bir uyanış ve mistik bir deneyim seni bekliyor."]
    },
    relevantHouses: [12, 4, 8]
  },
  "ar19": {
    id: "ar19",
    name: "Güneş (The Sun)",
    upright: {
      intros: ["Güneş kartı düz geldiğinde, hayatında muazzam bir aydınlanmanın ve başarının parladığını hissediyorum.", "Mutluluğun, canlılığın ve mutlak zaferin o sıcak enerjisi bugün seni sarmalıyor canım."],
      meanings: ["Her şeyin yolunda gittiği, tüm karanlıkların dağıldığı o muazzam parlak dönemdesin; başarının tadını çıkar.", "Özgüvenin ve enerjin zirvede; bugün attığın her adım sana katlanarak mutluluk ve başarı getirecek."],
      guidance: ["İçindeki o neşeli çocuğu serbest bırak ve ışığını tüm dünyaya yansıt tatlım.", "Güzelliklerin ve şansın sana sunduğu bu hediyeleri büyük bir şükranla kabul et; sen bunu hak ettin."]
    },
    reversed: {
      intros: ["Güneş ters belirdiğinde, geçici bir moral bozukluğu yaşadığını veya başarının gölgelendiğini görüyorum.", "Bu ters konum, aşırı iyimserliğin veya egonun seni yanılttığına dair hafif bir uyarıdır."],
      meanings: ["Mutluluğun tam önünde ama sen bulutlara bakmaktan onu göremiyorsun; enerjini yükseltme vakti.", "Başarıların gecikmiş olabilir veya yeterince takdir görmediğini hissediyorsun; ama güneş hala orada."],
      guidance: ["Karamsarlığı bırak ve küçük mutluluklara odaklan; güneşin tekrar doğması çok yakın tatlım.", "Kendine karşı daha şefkatli ol ve egonu bir kenara bırakıp saf sevgiye odaklan."]
    },
    topicMeanings: {
      love: ["Aşkta mutlak mutluluk, uyum ve tutku dolu bir dönem. İlişkin herkes tarafından alkışlanacak.", "Ruh eşinle olan o parlak ve neşe dolu beraberliğin zirvesindesin."],
      career: ["İş hayatında büyük bir zafer, terfi veya projenin muazzam başarısı. Parıldama vaktin geldi.", "Kariyerinde herkesin dikkatini çekeceğin o muazzam yükseliş."],
      health: ["Bedensel ve ruhsal bir enerji, canlılık ve şifa dönemi. Işıl ışıl parlıyorsun.", "Yaşam enerjin her zamankinden çok daha yüksek; şifa seninle."],
      money: ["Maddi konularda bereketin ve şansın zirvede olduğu, finansal ferahlığın tadını çıkaracağın bir zaman.", "Parasal konularda beklediğin o büyük ve aydınlık haber yolda."],
      general: ["Başarı, mutluluk ve canlılık. Hayatında her şeyin yerli yerine oturduğu o altın evredesin.", "Evrenin en parlak ışığı bugün senin üzerinde."]
    },
    positionalNuance: {
      past: ["Geçmişteki o parlak başarıların ve pozitif bakış açın, seni bugün olduğun bu muazzam noktaya taşıdı.", "Eski bir zaferin gururu bugün hala yolunu aydınlatıyor."],
      present: ["Şu an tam bir parıldama ve mutluluk anındasın; bu enerjiyi tüm hücrelerinde hisset.", "Başarı ve neşe seninle; bu anın tadını sonuna kadar çıkar."],
      future: ["Gelecek sana mutlak bir mutluluk, sarsılmaz bir başarı ve her türlü karanlığın sonunu vaat ediyor.", "Kaderin sana sunduğu bu yeni sayfa güneş kadar parlak."]
    },
    astroModifiers: {
      Fire: ["Ateşin bir güneş gibi yansın; cesaretin ve enerjin başkalarına da yaşam sevinci aşılasın.", "Tutkun başarının en büyük yakıtı olacak; durma, parla."],
      Earth: ["Başarılarını somutlaştır ve kalıcı kıl; bu parlak dönem sana dünyevi büyük kazançlar getirecek.", "Maddi dünyada hayallerinin de ötesinde bir bolluk."],
      Air: ["Zihnin pırıl pırıl ve çok yaratıcı; fikirlerinle herkesi etkileyebilir ve aydınlatabilirsin.", "Sözlerinle neşe ve başarı saçma vaktin."],
      Water: ["Duygusal olarak en huzurlu ve mutlu dönemindesin; içindeki o saf sevgiyi herkesle paylaş.", "Sezgisel bir uyanış ve ruhsal bir şölen seni bekliyor."]
    },
    relevantHouses: [5, 1, 10]
  },
  "ar20": {
    id: "ar20",
    name: "Mahkeme (Judgement)",
    upright: {
      intros: ["Mahkeme kartı düz geldiğinde, ruhunun o muazzam uyanış çağrısını duyduğunu hissediyorum.", "Değerlendirme ve kadersel bir kararın o kutsal enerjisi bugün seninle canım."],
      meanings: ["Geçmişin tüm yüklerinden arınma ve yepyeni bir bilinç seviyesine geçme dönemindesin; çağrıya kulak ver.", "Yaptığın hatalardan ders çıkardın ve artık ödülünü alma vakti geldi; büyük bir uyanış seni bekliyor."],
      guidance: ["Kendi gerçeğinle yüzleşmekten korkma; bu dürüstlük seni en sonunda özgürleştirecek olan şeydir tatlım.", "Vicdanının sesini dinle ve artık o büyük kararı ver; evren senin bu uyanışını destekliyor."]
    },
    reversed: {
      intros: ["Mahkeme ters belirdiğinde, çağrıyı duymazdan geldiğini veya geçmişe takılıp kaldığını görüyorum.", "Bu ters konum, kendini aşırı eleştirdiğine veya bir türlü karar veremediğine dair bir uyarıdır."],
      meanings: ["Geçmişteki hatalarına saplanıp kalmışsın; bu durum senin ileriye adım atmanı ve büyümeni engelliyor.", "Korkuların yüzünden o büyük değişimi reddediyorsun ama bu sadece acıyı ve belirsizliği uzatır."],
      guidance: ["Kendini affetmeyi öğren canım; geçmiş geçmiştir, sen şu anki halinle çok değerlisin.", "Eleştiriyi bırak ve artık bir karar ver; hareketsizlik senin en büyük düşmanın şu an."]
    },
    topicMeanings: {
      love: ["Aşkta bir uyanış ve ilişkinin seyrini tamamen değiştirecek kadersel bir değerlendirme süreci. Her şey netleşiyor.", "Eski bir aşkın geri dönmesi veya mevcut bağda büyük bir bilinç sıçraması."],
      career: ["İş hayatında çok önemli bir karar anı veya emeklerinin karşılığını alacağın o büyük değerlendirme vakti.", "Kariyerinde yeni bir seviyeye geçmeni sağlayacak o muazzam uyanış."],
      health: ["Bedensel ve ruhsal bir diriliş enerjisi. Hastalıkların ardından gelen muazzam bir iyileşme ve canlılık.", "Ruhsal olarak kendini yenileme ve arınma zamanı."],
      money: ["Maddi konularda geçmişteki yatırımların veya hataların sonuçlarıyla yüzleşme ve feraha çıkma dönemi.", "Finansal bir uyanış ve borçlardan arınma fırsatı."],
      general: ["Uyanış, değerlendirme ve kadersel karar. Hayatında her şeyin anlam kazandığı o kutsal eşiktesin.", "Ruhun bugün yeniden doğuyor canım."]
    },
    positionalNuance: {
      past: ["Geçmişteki o zorlu sınavlar aslında senin bugünkü bilge ve uyanmış kişiliğine taşıyan birer lütuftu.", "Eski bir kararın bugün meyvelerini topluyorsun."],
      present: ["Şu an tam bir eşiktesin; çağrıyı duy ve geçmişi geride bırakarak o büyük adımı at.", "Kendini ve hayatını değerlendirdiğin o kutsal andasın."],
      future: ["Gelecek sana mutlak bir arınma, uyanış ve hayallerinin çok ötesinde bir bilinç düzeyi vaat ediyor.", "Kaderin sana sunduğu bu yeni yaşam tertemiz."]
    },
    astroModifiers: {
      Fire: ["Ateşinle eskiyi yak ve yeniye uyan; cesaretin senin en büyük rehberin bu uyanış yolunda.", "İradenle kadersel bir zafer kazanma vaktin."],
      Earth: ["Değerlendirmelerini somut planlara dök; pratik hayatındaki değişim ruhsal uyanışını destekleyecek.", "Maddi dünyada hak ettiğin o büyük ödül kapıda."],
      Air: ["Zihnin pırıl pırıl ve çok net; mantığınla kadersel kararları en doğru şekilde verebilirsin.", "Sözlerinle kendi uyanışını dünyaya ilan etme vakti."],
      Water: ["Duygusal olarak arınma ve şifalanma vaktin; içindeki o kutsal ses sana en doğru yolu fısıldayacaktır.", "Sezgisel bir diriliş ve ruhsal bir uyanış seni bekliyor."]
    },
    relevantHouses: [9, 10, 12]
  },
  "ar21": {
    id: "ar21",
    name: "Dünya (The World)",
    upright: {
      intros: ["Dünya kartı düz geldiğinde, hayatında büyük bir döngünün muazzam bir başarıyla tamamlandığını hissediyorum.", "Bütünlüğün, zaferin ve evrensel uyumun o kutsal enerjisi bugün seni sarmalıyor canım."],
      meanings: ["Arzu ettiğin her şeye ulaştın veya ulaşmak üzeresin; tüm parçalar yerli yerine oturdu ve sen artık tamamsın.", "Uzun bir yolculuğun sonunda o muazzam zirvedesin; başarının, huzurun ve bütünlüğün tadını doyasıya çıkar."],
      guidance: ["Bu muazzam başarıyı kutla ve kendine teşekkür et; sen bu zaferi sonuna kadar hak ettin tatlım.", "Gözlerini ufka çevir; bu son aslında yepyeni ve çok daha muazzam bir yolculuğun ilk adımıdır."],
    },
    reversed: {
      intros: ["Dünya ters belirdiğinde, bir döngünün bir türlü kapanmadığını veya yarım kaldığını görüyorum.", "Bu ters konum, hedefine çok yakınsın ama küçük bir eksiklik yüzünden tamama eremediğini söylüyor."],
      meanings: ["Eksik bir parça var; ya kendinden ödün veriyorsun ya da bir dersi hala almamışsın, bu yüzden döngü dönmüyor.", "Başarıların gecikmiş olabilir veya tam olarak tatmin hissetmiyorsun; ama unutma ki o kapı kapanmak üzere."],
      guidance: ["Eksik olan o son parçayı bul ve döngüyü sevgiyle tamamla; yarım bırakmak seni yorar canım.", "Acele etme ama pes de etme; başarının anahtarı o küçük ama önemli detayda gizli."]
    },
    topicMeanings: {
      love: ["Aşkta mutlak uyum, bütünlük ve ilişkideki tüm pürüzlerin giderildiği o muazzam dönem. Mutlu son kapıda.", "Ruh eşinle olan o kutsal ve eksiksiz beraberliğin zirvesindesin."],
      career: ["İş hayatında büyük bir projenin başarıyla tamamlanması, terfi veya global bir başarı. Zirvedesin.", "Kariyerinde arzu ettiğin o muazzam noktaya ulaştın; zafer senin."],
      health: ["Bedensel ve ruhsal olarak tam bir sağlık, bütünlük ve canlılık enerjisi. Şifa süreci tamamlandı.", "Beden ve zihin uyumunun o muazzam huzurunu yaşıyorsun."],
      money: ["Maddi konularda beklediğin o büyük ferahlık ve finansal hedeflerine ulaşma vakti. Bolluk seninle.", "Parasal konularda sarsılmaz bir güvenlik ve refah dönemi."],
      general: ["Tamamlanma, başarı ve bütünlük. Hayatında her şeyin kusursuz bir uyum içinde olduğu o altın evredesin.", "Sen artık bu dünyanın bir parçası değil, bizzat kendisisin canım."]
    },
    positionalNuance: {
      past: ["Geçmişteki tüm o zorlu yollar ve deneyimler, seni bugün olduğun bu muazzam bütünlüğe taşıyan birer basamaktı.", "Eski bir döngünün başarısı bugün hala yolunu aydınlatıyor."],
      present: ["Şu an tam bir tamamlanma ve başarı anındasın; bu muazzam enerjiyi tüm hücrelerinde hisset.", "Zafer senin; bu anın tadını sonuna kadar çıkar ve kutla."],
      future: ["Gelecek sana mutlak bir mutluluk, sarsılmaz bir başarı ve her anlamda bütünlüğe ulaşmayı vaat ediyor.", "Kaderin sana sunduğu bu yeni sayfa evrensel bir uyumla yazılacak."]
    },
    astroModifiers: {
      Fire: ["Ateşinle dünyayı aydınlattın; cesaretin ve enerjin sana bu muazzam zaferi getirdi.", "Tutkun başarının tacı oldu; durma, bu parıltının tadını çıkar."],
      Earth: ["Başarılarını somutlaştırdın ve dünyevi bir imparatorluk kurdun; bu bolluk sana kalıcı bir huzur getirecek.", "Maddi dünyada hayallerinin de ötesinde bir bütünlük."],
      Air: ["Zihnin evrensel bir bilgeliğe ulaştı; fikirlerinle dünyayı değiştirebilir ve aydınlatabilirsin.", "Sözlerinle kendi zaferini ve bütünlüğünü dünyaya ilan etme vakti."],
      Water: ["Duygusal olarak tam bir şifa ve huzur içindesin; içindeki o saf sevgiyi evrenle paylaş.", "Sezgisel bir bütünlük ve ruhsal bir şölen seni bekliyor."]
    },
    relevantHouses: [10, 1, 9]
  }
};

export const getGenericCardData = (id: string, name: string): TarotEngineCard => {
  const info = tarotTranslations[id];
  const upMeaning = info?.meaning_up || "Bu kart senin için özel bir mesaj taşıyor.";
  const revMeaning = info?.meaning_rev || "Bu kartın ters duruşu enerjide bir tıkanıklığı işaret ediyor.";

  const genericData: Record<string, string[]> = {
    love: [
      `İlişkilerinde ${upMeaning} enerjisi hissediliyor. Kalbini sevgiye ve yeni olasılıklara açmalısın.`,
      `Aşk hayatında ${upMeaning.toLowerCase()} teması ön planda; partnerinle bu enerjiyi paylaşmak bağınızı güçlendirecektir.`,
      "Duygusal dünyanda dengeyi bulacağın ve huzura ereceğin bir dönem."
    ],
    career: [
      `İş hayatında ${upMeaning} seni başarıya götürecek anahtar olacak. Fırsatları iyi değerlendir.`,
      `Kariyerinde ${upMeaning.toLowerCase()} odaklı bir yaklaşım sergilemen, beklediğin o büyük takdiri getirecektir.`,
      "Yeteneklerini sergileme ve takdir görme vaktin geldi; parlamaya hazırlan."
    ],
    health: [
      `Sağlık ve ruhsal esenlik konusunda ${upMeaning} enerjisini içselleştirmen sana çok iyi gelecek canım.`,
      "Ruhsal detoks ve bedensel yenilenme için harika bir enerji; kendine iyi bak.",
      "İç huzurunu bulduğunda bedenin de şifa bulacak; dengede kalmaya çalış."
    ],
    money: [
      `Maddi konularda ${upMeaning} etkisiyle bereketin artıyor. Akıllıca planlamalar yapmalısın.`,
      "Finansal bir bolluk kapıda olabilir; kaynaklarını akıllıca yöneterek bereketini artırabilirsin.",
      "Maddi dünyada yeni fırsatlar doğuyor; gözünü ve kalbini açık tut."
    ],
    general: [
      `Hayatında ${upMeaning} temalı önemli bir döngü başlıyor. Bu süreci farkındalıkla yönetmelisin.`,
      "Evrenin sana özel bir mesajı var; bu kart senin pusulan olsun.",
      "Kozmik bir rehberlik altındasın; her adımın bir sebeple atılıyor, güven duy."
    ]
  };

  return {
    id,
    name: name || info?.name || "Gizemli Kart",
    upright: {
      intros: [
        `Bu kartın sunduğu ${upMeaning.toLowerCase()} enerjisi, yolunu aydınlatmak için parlıyor tatlım.`,
        `Seçtiğin bu kart, niyetindeki ${upMeaning.toLowerCase()} potansiyeline dair çok güçlü bir ışık tutuyor.`,
        "Kartın sembolizmi, şu anki ruh halinle muazzam bir uyum içinde."
      ],
      meanings: [
        `Genel olarak bu kart, hayatındaki ${upMeaning.toLowerCase()} gelişmelerini ve büyüme fırsatlarını temsil ediyor.`,
        "İçindeki potansiyeli ortaya çıkarman için evren seni destekliyor.",
        "Bu enerji, doğru yolda olduğunun ve ilerlemen gerektiğinin bir işareti."
      ],
      guidance: [
        `Bu olumlu enerjiyi kucakla ve ${upMeaning.toLowerCase()} konusunda kendine olan güvenini tazele.`,
        "Yolun açık görünüyor, sadece içindeki sese kulak vererek ilerle.",
        "Güzellikler seninle olsun, yıldızların parıltısı her zaman yolunu aydınlatsın."
      ]
    },
    reversed: {
      intros: [
        `Kartın ters belirmesi, ${revMeaning.toLowerCase()} enerjisinin şu an biraz blokajlı olduğunu gösteriyor canım.`,
        `Bu ters konum, ${revMeaning.toLowerCase()} konusunda durup tekrar düşünmen gereken noktaları işaret ediyor.`,
        "Enerjinin akışında küçük bir duraksama hissediyorum, ama bu şifa için bir fırsat."
      ],
      meanings: [
        `Bu durum, dış dünyadan ziyade ${revMeaning.toLowerCase()} üzerine odaklanman ve eski kalıpları yıkman gerektiğini anlatıyor.`,
        "Blokajlar aslında senin büyümen için birer basamak görevi görüyor.",
        "Ters enerji, niyetini tekrar gözden geçirmen için sana harika bir alan açıyor."
      ],
      guidance: [
        `Acele etme, ${revMeaning.toLowerCase()} etkisini aşmak ve içindeki o sessiz bilgeye ulaşmak için kendine zaman tanı.`,
        "Blokajları birer engel olarak değil, birer öğretmen olarak gör.",
        "Dengelenmek için biraz geri çekilmek sana çok iyi gelecek tatlım."
      ]
    },
    topicMeanings: {
      love: genericData.love,
      career: genericData.career,
      health: genericData.health,
      money: genericData.money,
      general: genericData.general
    },
    positionalNuance: {
      past: [
        "Geçmişteki tüm o zorlu veya öğretici deneyimlerin seni bugünkü güçlü, bilge ve sarsılmaz kişiliğine başarıyla taşıdı.",
        "Eski bir döngü kapandı ve sen oradan çok daha olgun bir ruh olarak çıktın.",
        "Geçmişin bilgeliği bugün senin en büyük hazinen."
      ],
      present: [
        "Şu an bu kartın sunduğu özel enerjiyi hayatına en doğru ve verimli şekilde entegre etmeye, anlamaya çalışıyorsun.",
        "Anın getirdiği mesajlara kulak ver; evren şu an seninle konuşuyor.",
        "Dengelenen enerjinle birlikte hayatında yepyeni bir sayfa açılıyor."
      ],
      future: [
        "Gelecekte bu kartın vaat ettiği o önemli etkiler hayatında çok daha belirgin, somut ve yön verici hale gelecek.",
        "Önünde parlak ve huzur dolu bir yol uzanıyor; her şey hayrına ilerliyor.",
        "Kaderin ipek iplikleri senin için en güzel geleceği dokuyor."
      ]
    },
    astroModifiers: {
      Fire: [
        "Eylem odaklı bir yaklaşım sergile; içindeki o büyük ve yakıcı gücü hedeflerin için hemen harekete geçir.",
        "Cesaretinle dünyayı aydınlatma vaktin geldi; durma, ilerle."
      ],
      Earth: [
        "Her zaman pratik ve sabırlı ol; atacağın sağlam, yere basan adımlar seni en sonunda hayal ettiğin başarıya ulaştıracak.",
        "Somut sonuçlar elde etmek için disiplinli ve kararlı kalmalısın."
      ],
      Air: [
        "Zihinsel bir netlik kazanmaya çalış; çevrendekilerle olan iletişimini ve fikir alışverişini daha da kuvvetlendirmelisin.",
        "Zekice planların her engeli aşmanı sağlayacak güçte."
      ],
      Water: [
        "Sezgilerini ve en derin duygularını kendine rehber edin; her zaman kalbinin o sessiz ama doğru fısıltısını dinle.",
        "Duygusal derinliğin seni en doğru kararlara ulaştıracaktır."
      ]
    },
    relevantHouses: [1, 4, 7, 10]
  };
};

export const getTarotEngineCard = (id: string, name: string): TarotEngineCard => {
  return TAROT_ENGINE_DATA[id] || getGenericCardData(id, name);
};
