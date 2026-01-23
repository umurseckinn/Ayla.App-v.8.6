import {
  calculateBirthChart,
  BirthChart,
  ZODIAC_SIGNS_TR
} from "./astronomy-service";
import {
  calculateEnergyPotential,
  EnergyPotentialResult
} from "./energy-potential-service";
// Offline mode: No Supabase needed
import {
  getSunSign,
  getZodiacElement,
  ZODIAC_INTERPRETATIONS,
  COSMIC_LOGIC,
  calculateAccurateAstrology,
  AccurateAstrologyData
} from "./astrology";
import {
  PLANET_SIGN_INTERPRETATIONS,
  PERSONALITY_INTROS
} from "./astrology-interpretations";
import { getCoordinates } from "./geocoding";
import houseInterpretationsData from "@/lib/data/house-interpretations.json";
import houseInterpretationsDataEn from "@/lib/data/house-interpretations-en.json";
import astroKnowledge from "@/lib/data/astro_knowledge_base.json";

const signMap: Record<string, string> = {
  "Koç": "aries",
  "Boğa": "taurus",
  "İkizler": "gemini",
  "Yengeç": "cancer",
  "Aslan": "leo",
  "Başak": "virgo",
  "Terazi": "libra",
  "Akrep": "scorpio",
  "Yay": "sagittarius",
  "Oğlak": "capricorn",
  "Kova": "aquarius",
  "Balık": "pisces"
};
import natalInterpretations from "./natal-interpretations.json";


export interface BirthChartProfile {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  element: string;
  planets: {
    mercury: { sign: string; house: number; longitude: number };
    venus: { sign: string; house: number; longitude: number };
    mars: { sign: string; house: number; longitude: number };
    jupiter: { sign: string; house: number; longitude: number };
    saturn: { sign: string; house: number; longitude: number };
    uranus: { sign: string; house: number; longitude: number };
    neptune: { sign: string; house: number; longitude: number };
    pluto: { sign: string; house: number; longitude: number };
    sun: { sign: string; house: number; longitude: number };
    moon: { sign: string; house: number; longitude: number };
  };
  houses: string[];
  houseCusps: number[];
  aspects: {
    planet1: string;
    planet2: string;
    type: string;
    description: string;
  }[];
  birthDate: string;
  birthTime?: string;
  birthPlace?: string;
}

export interface CosmicInterpretation {
  summary: string;
  personality: string;
  emotionalNature: string;
  lifeApproach: string;
  currentEnergy: string;
  advice: string;
  houses: Record<number, string>;
  fullPersonality: string;
  energyDetails?: {
    overall_energy: number;
    categories: {
      [key: string]: {
        percentage: number;
        level: string;
        dominant_planet: string;
        description: string;
      }
    }
  }
}

const HOUSE_THEMES: Record<number, string> = {
  1: "Kişilik, dış görünüş ve başlangıçlar",
  2: "Maddi değerler, özgüven ve yetenekler",
  3: "İletişim, yakın çevre ve kardeşler",
  4: "Ev, aile, kökler ve iç dünya",
  5: "Yaratıcılık, aşk, çocuklar ve eğlence",
  6: "Günlük rutinler, sağlık ve çalışma hayatı",
  7: "İkili ilişkiler, ortaklıklar ve evlilik",
  8: "Dönüşüm, ortak kaynaklar ve gizemler",
  9: "Yüksek öğrenim, felsefe ve uzak yolculuklar",
  10: "Kariyer, toplumsal statü ve hedefler",
  11: "Sosyal çevre, idealler ve arkadaşlıklar",
  12: "Bilinçaltı, rüyalar ve ruhsal şifa"
};

const SIGN_HOUSE_POTENTIALS: Record<string, Record<number, string>> = {
  "Koç": {
    1: "Hayata karşı cesur, öncü ve enerjik bir duruşun var. Kendi yolunu çizmekten çekinmez, her zaman ilk adımı atan sen olursun.",
    2: "Maddi konularda hızlı ve risk alan bir tavrın olabilir. Kendi yeteneklerinle para kazanma konusunda oldukça girişimcisin.",
    3: "İletişiminde dürüst, direkt ve heyecanlısın. Yakın çevrenle olan ilişkilerinde rekabetçi ama bir o kadar da canlandırıcı bir etkin var.",
    4: "Aile içinde liderlik vasıfların öne çıkar. Ev ortamında bağımsızlığına düşkünsün ve köklerinle olan bağın sana güç verir.",
    5: "Aşkta ve yaratıcılıkta tutkulu, çocuksu bir heyecana sahipsin. Risk almaktan ve sahne önünde olmaktan keyif alırsın.",
    6: "İş hayatında ve günlük rutinlerinde oldukça enerjiksin. Rekabetçi bir çalışma ortamı seni motive eder, sağlığın için hareket şarttır.",
    7: "İlişkilerinde dinamizm and dürüstlük ararsın. Partnerinden cesaret bekler, bazen ilişkide kontrolü ele alma eğilimi gösterirsin.",
    8: "Dönüşüm süreçlerinde çok güçlü bir iraden var. Kriz anlarında korkusuzca hareket eder, ortaklaşa kaynakları yönetmede cesursun.",
    9: "Keşfetmeye olan açlığın seni uzak diyarlara ve yeni felsefelere sürükler. İnançlarında ateşli ve savunmacı olabilirsin.",
    10: "Kariyerinde zirveyi hedefler, liderlik etmekten asla vazgeçmezsin. Toplum önünde öncü ve kararlı bir duruşun var.",
    11: "Sosyal çevrende enerjinle insanları peşinden sürüklersin. Gelecek ideallerin için savaşmaktan çekinmeyen bir aktivist ruhun var.",
    12: "İç dünyanda fırtınalar kopabilir ama bunu dışarıya pek yansıtmazsın. Gizli düşmanlıklara karşı tetikte olman gerekebilir."
  },
  "Boğa": {
    1: "Sakin, güvenilir, sabırlı ve estetik bir duruşun var. Hayatın tadını çıkarmayı bilir, kalıcılığa ve konfora önem verirsin.",
    2: "Maddi güvence senin için her şeydir. Değerlerini koruma ve biriktirme konusunda doğal bir yeteneğin var.",
    3: "Düşüncelerinde pratik ve kararlısın. İletişiminde nazik ama sarsılmaz bir üslubun var, konuşmadan önce iyi düşünürsün.",
    4: "Ev hayatında huzur ve konfor ararsın. Köklerine bağlılık ve sağlam bir yuva kurmak hayatının temel taşıdir.",
    5: "Zevklerine düşkünsün. Sanatsal yaratıcılığın ve aşkta sadakatinle tanınırsın, güzellikler seni besler.",
    6: "Günlük işlerinde düzenli ve sabırlısın. Bedensel sağlığına ve beslenmene özen göstermek senin için bir yaşam biçimidir.",
    7: "İlişkilerinde güven ve sadakat olmazsa olmazındır. Uzun süreli ve sağlam ortaklıklar kurma eğilimindesin.",
    8: "Ortaklaşa kazançlarda ve kriz yönetiminde çok stratejik davranırsın. Sabrınla her türlü finansal krizi aşabilirsin.",
    9: "İnançlarında muhafazakar ama sağlam bir temel ararsın. Uzak yolculuklarda konforun ön plandadır.",
    10: "Kariyerinde adım adım ve güvenle ilerlersin. Toplum önünde güvenilir ve başarılı bir imaj çizmekte ustasın.",
    11: "Arkadaş çevren seçkin ve kalıcıdır. Sosyal gruplarda huzuru ve istikrarı sağlayan kişi genelde sensin.",
    12: "İç dünyanda büyük bir dinginlik saklıdır. Maneviyatın maddeyle bütünleştiği derin bir sezgiye sahipsin."
  },
  "İkizler": {
    1: "Meraklı, zeki, konuşkan ve çok yönlüsün. Çevrendeki her şeye ilgi duyar, sürekli öğrenme ve aktarma ihtiyacı hissedersin.",
    2: "Maddi konularda zekanla kazanç sağlarsın. Birden fazla gelir kaynağına sahip olma potansiyelin yüksektir.",
    3: "Zihinsel kapasiten zirvededir. Yazmak, konuşmak ve bilgi alışverişinde bulunmak senin için nefes almak gibidir.",
    4: "Ev hayatında hareketlilik ve sürekli bir değişim hakimdir. Evin senin için bir kütüphane veya iletişim merkezi gibidir.",
    5: "Aşkta zihinsel uyum ararsın. Hobilerin çok çeşitlidir ve yaratıcılığını farklı alanlarda aynı anda sergileyebilirsin.",
    6: "İş hayatında aynı anda birçok işi yürütebilirsin. Rutin işler seni çabuk sıkar, sürekli yenilik ve iletişim istersin.",
    7: "İlişkilerinde her şeyden önce iyi bir dostluk ve zihinsel etkileşim beklersin. Özgürlüğüne düşkün bir partnersin.",
    8: "Bilinmeyene olan merakın seni derin araştırmalara yönlendirir. Ortaklaşa kaynaklarda akılcı ve esnek çözümler üretirsin.",
    9: "Sürekli yeni felsefeler ve bilgiler peşindesin. Seyahat etmek senin için bir keşif yolculuğudur.",
    10: "Kariyerinde iletişim ve medya alanlarında parlayabilirsin. Toplum önünde çok yönlü ve uyumlu bir karakterin var.",
    11: "Sosyal grupların aranan ismisin. İdeallerin sürekli değişse de her zaman geleceğe dair bir fikrin vardır.",
    12: "Bilinçaltın oldukça hareketlidir. Rüyaların mesajlarla doludur, zihnini sakinleştirmek için meditasyon şarttır."
  },
  "Yengeç": {
    1: "Şefkatli, duyarlı, korumacı ve sezgisel bir enerjin var. Duygularınla hareket eder, çevrendekilere anaç bir yaklaşım sergilersin.",
    2: "Maddi konularda biriktirme ve koruma içgüdün çok yüksektir. Gayrimenkul ve aileden gelen miraslar senin için şanslı olabilir.",
    3: "İletişiminde duygusal ve empatiksin. Kardeşlerin ve yakın çevrenle olan bağın çok derindir, geçmişi anmayı seversin.",
    4: "Ev ve aile senin kalbindir. Yuvan senin güvenli limanın, köklerin ise en büyük güç kaynağındır.",
    5: "Yaratıcılığın duygularından beslenir. Aşkta romantik ve bağlanmaya eğilimlisin, çocuklara karşı çok hassassın.",
    6: "Hizmet etmek ve bakıcılık yapmak senin doğanda var. Çalışma ortamında aile sıcaklığı ararsın, sağlığın duygularınla paraleldir.",
    7: "İlişkilerinde bağlılık ve şefkat beklersin. Partnerine karşı korumacı davranır, huzurlu bir yuva özlemi çekersin.",
    8: "Duygusal krizlerde sezgilerinle yolunu bulursun. Ortaklaşa kazançlarda aileni ve sevdiklerini koruma içgüdün öndedir.",
    9: "İnançlarında geleneklere bağlısın. Uzak yolculuklar seni manevi olarak besler ve derinleştirir.",
    10: "Kariyerinde topluma hizmet eden veya besleyen rolleri tercih edersin. Toplum önünde şefkatli bir imajın var.",
    11: "Arkadaşların senin ailen gibidir. Gelecek hayallerin genelde sevdiklerinin mutluluğu üzerine kuruludur.",
    12: "İç dünyan çok derin ve rüya gibidir. Bilinçaltındaki anılar senin bugünkü kararlarını derinden etkiler."
  },
  "Aslan": {
    1: "Karizmatik, cömert, özgüvenli ve etkileyici bir duruşun var. Girdiğin her ortamda doğal bir lider gibi ışık saçarsın.",
    2: "Maddi konularda gösterişli ve cömertsin. Kendi değerini bilir ve kalitesiz hiçbir şeyi hayatına sokmak istemezsin.",
    3: "İletişiminde ikna edici ve özgüvenlisin. Sözlerinle insanları büyüleyebilir, yaratıcı fikirlerinle dikkat çekebilirsin.",
    4: "Evin senin sarayındır. Aile içinde otoriter ama bir o kadar da korumacı ve gururlu bir tavrın vardır.",
    5: "Yaratıcılığın zirvededir. Aşkta flörtöz, heyecanlı ve sahne ışıklarını üzerinde hissetmekten hoşlanan birisin.",
    6: "İş hayatında yönetmeyi seversin. Rutin işlerde bile kendi imzanı atmak istersin, kalp sağlığına dikkat etmelisin.",
    7: "İlişkilerinde hayaranlık ve sadakat beklersin. Partnerinle gurur duymak ister, aşkta cömertçe hareket edersin.",
    8: "Dönüşüm süreçlerini asaletle atlatırsın. Ortaklaşa kaynaklarda yönetici ruhunla herkesi doğru yönlendirebilirsin.",
    9: "Hayat felsefen 'yaşa ve parlat' üzerinedir. Uzak yolculuklarda lüks ve eğlenceyi ararsın.",
    10: "Kariyerinde en tepede olmayı hedeflersin. Toplum önünde saygın, parlayan ve unutulmaz bir karakterin var.",
    11: "Sosyal çevrende bir yıldız gibisin. Gelecek ideallerin büyük ve ilham vericidir.",
    12: "İç dünyanda bile bir asalet vardır. Ruhsal olarak kendini bir kahraman gibi görebilir, gizli yardımlarla parlayabilirsin."
  },
  "Başak": {
    1: "Titiz, analitik, yardımsever ve mütevazı bir enerjin var. Her detayı fark eder, hayatı mükemmelleştirmek için çalışırsın.",
    2: "Maddi konularda hesaplı ve dikkatlisin. Çalışarak ve emek vererek kazanmak senin en büyük güvencendir.",
    3: "Zihnin bir bilgisayar gibi çalışır. İletişimde net, mantıklı ve eleştirel olabilirsin, yazma yeteneğin gelişmiştir.",
    4: "Ev hayatında düzen ve temizlik esastır. Aile içindeki sorumluluklarını eksiksiz yerine getirmek senin için önemlidir.",
    5: "Yaratıcılığın teknik ve beceri odaklıdır. Aşkta seçici ve gerçekçisin, hobi olarak el işleri veya bahçeyle ilgilenebilirsin.",
    6: "Hizmet ve sağlık senin uzmanlık alanındır. Günlük rutinlerini milimetrik bir düzenle yönetirsin, sindirim sistemine dikkat.",
    7: "İlişkilerinde yararlı ve destekleyici olmaya odaklanırsın. Partnerinden zeka ve tertip beklersin.",
    8: "Krizleri mantığınla çözersin. Ortaklaşa kaynaklarda her kuruşun hesabını bilir, riskleri önceden sezersin.",
    9: "İnançlarında sorgulayıcı ve pratiktir. Uzak yolculukları her zaman detaylıca planlar, gittiğin yerden bir şeyler öğrenmek istersin.",
    10: "Kariyerinde uzmanlaşmak ve kusursuz işler çıkarmak istersin. Toplum önünde çalışkan ve güvenilir bir imajın var.",
    11: "Arkadaş çevren seçkindir. Sosyal gruplarda fayda sağlamak ve sorun çözmek için her zaman oradasındır.",
    12: "Bilinçaltın sürekli bir düzenleme halindedir. Endişelerini kontrol altına almak için ruhsal arınma teknikleri uygulamalısın."
  },
  "Terazi": {
    1: "Zarif, adil, uyumlu ve estetik bir duruşun var. Çatışmalardan kaçınır, her zaman dengeyi ve güzelliği ararsın.",
    2: "Maddi konularda zevklerine para harcamayı seversin. Kazançlarını genelde ortaklıklar veya estetik işler üzerinden sağlarsın.",
    3: "İletişiminde diplomatik ve naziksin. İnsanlar arasında köprü kurma yeteneğin sayesinde herkesle iyi anlaşırsın.",
    4: "Ev hayatında huzur ve estetik ön plandadır. Aile içinde adaleti sağlayan, herkesi dinleyen kişisin.",
    5: "Aşkta romantizm ve zarafet ararsın. Sanatsal yaratıcılığın ve estetik bakış açın çok güçlüdür.",
    6: "İş hayatında ekip çalışmasına çok yatkınsın. Estetik ve uyumlu bir çalışma ortamı seni motive eder, böbrek sağlığına dikkat.",
    7: "İlişkiler ve evlilik hayatının merkezindedir. Yalnız kalmaktan hoşlanmaz, partnerinle her şeyi paylaşmak istersin.",
    8: "Ortaklaşa kaynaklarda adaletli ve dengelisin. Dönüşüm süreçlerini uyumla atlatır, krizlerde uzlaşmacı davranırsın.",
    9: "İnançlarında hümanist ve adalet odaklısın. Uzak yolculuklarda sanatsal ve kültürel turlar ilgini çeker.",
    10: "Kariyerinde diplomasi ve halkla ilişkilerde parlayabilirsin. Toplum önünde şık ve sevilen bir karakterin var.",
    11: "Sosyal çevren geniş ve kalitelidir. Gelecek ideallerin genelde barış ve eşitlik üzerinedir.",
    12: "İç dünyanda bile denge arayışı sürer. Ruhsal olarak kendini bir bütünün parçası gibi hissedersin."
  },
  "Akrep": {
    1: "Gizemli, tutkulu, dayanıklı ve dönüştürücü bir auran var. Gözlerinle delip geçer, insanların en derin sırlarını bile hissedebilirsin.",
    2: "Maddi konularda hırslı ve stratejiksin. Krizlerden kazanç çıkarma ve başkalarının kaynaklarını yönetme yeteneğin eşsizdir.",
    3: "İletişiminde derin, keskin ve sezgisel bir dilin var. Az konuşur ama öz konuşursun, sır saklama konusunda ustasın.",
    4: "Ev ve aile hayatın senin kalendir. Aile içindeki bağların çok derin ve bazen de gizemlidir, köklerine sıkı sıkıya bağlısın.",
    5: "Aşkta ya hep ya hiç dersin. Yaratıcılığın karanlık ve derin temalardan beslenir, tutku senin itici gücündür.",
    6: "İş hayatında odaklanma gücün sarsılmazdır. Araştırmacı rolleri seversin, üreme ve boşaltım sistemlerine dikkat etmelisin.",
    7: "İlişkilerinde derin bir bağ ve sadakat istersin. Kıskançlık ve sahiplenme duygusuyla baş etmen gerekebilir.",
    8: "Dönüşümün efendisisin. Ölüm, yeniden doğum ve gizli hazineler senin alanındır; küllerinden doğmayı bilirsin.",
    9: "İnançlarında mistik ve derinlemesine araştırmacı bir tavrın var. Uzak yolculuklarda gizemli yerler seni cezbeder.",
    10: "Kariyerinde güç ve kontrol sahibi olmak istersin. Toplum önünde sarsılmaz ve karizmatik bir duruşun var.",
    11: "Arkadaş çevren dardır ama dostlukların ömürlüktür. Gelecek ideallerin köklü bir değişim yapmaya odaklıdır.",
    12: "Bilinçaltın bir okyanus kadar derindir. Sezgilerin ve rüyaların senin en büyük rehberindir, ruhsal şifa yeteneğin vardır."
  },
  "Yay": {
    1: "Maceracı, iyimser, özgür ruhlu ve bilge bir enerjin var. Hayatı bir keşif yolculuğu olarak görür, sürekli ufkun ötesini merak edersin.",
    2: "Maddi konularda şanslı ve cömertsin. Paraya olan bakış açın özgürlüğünü kısıtlamayacak kadar bir araç olmasıdır.",
    3: "İletişiminde açık sözlü, neşeli ve felsefiksin. Yeni diller öğrenmek ve farklı kültürlerle iletişim kurmak sana göre.",
    4: "Ev hayatında özgürlük ararsın. Aile köklerin farklı coğrafyalara veya kültürlere dayanıyor olabilir, evin senin için bir otel gibi olabilir.",
    5: "Aşkta macera ve heyecan ararsın. Yaratıcılığın geniş vizyonundan beslenir, spor ve dış mekan aktivitelerinden keyif alırsın.",
    6: "İş hayatında bağımsız çalışmayı seversin. Rutin işler seni boğar, sürekli seyahat veya eğitim içeren işler istersin.",
    7: "İlişkilerinde kısıtlanmaya gelemezsin. Partnerinden dürüstlük ve beraber dünyayı keşfedecek bir vizyon beklersin.",
    8: "Krizleri inancın ve iyimserliğinle aşarsın. Ortaklaşa kaynaklarda risk almayı sever, şansına güvenirsin.",
    9: "İnançların senin hayat rehberindir. Felsefe, din ve yüksek öğrenim hayatının merkezindedir; seyahat etmek ruhunu besler.",
    10: "Kariyerinde akademisyenlik, yayıncılık veya uluslararası işlerde parlayabilirsin. Toplum önünde vizyoner bir imajın var.",
    11: "Sosyal çevren çok geniş ve uluslararasıdır. Gelecek ideallerin dünyayı daha iyi bir yer yapma üzerine kuruludur.",
    12: "İç dünyanda sınırsız bir özgürlük hissi vardır. Ruhsal olarak kendini evrenin bir gezgini gibi hissedersin."
  },
  "Oğlak": {
    1: "Ciddi, disiplinli, sorumluluk sahibi ve hırslı bir duruşun var. Dağları tırmanmak, zirveye ulaşmak ve kalıcı eserler bırakmak istersin.",
    2: "Maddi konularda tutumlu ve stratejiksin. Kazançlarını sabırla ve emekle inşa eder, uzun vadeli yatırımlara odaklanırsın.",
    3: "İletişiminde resmi ve hedefe yöneliktir. Az ama öz konuşur, sözlerinin ağırlığını her zaman hissettirirsin.",
    4: "Ev hayatında gelenekçi ve sorumluluk sahibisin. Aile içindeki otorite figürü sensindir, köklerine büyük saygı duyarsın.",
    5: "Yaratıcılığın somut ve kalıcı eserler üretmeye yöneliktir. Aşkta ciddi ve sadık bir partnersin, hobilerin bile bir hedef içerir.",
    6: "İş hayatında bir işkolik olabilirsin. Disiplin ve düzen senin için esastır, kemik ve diş sağlığına dikkat etmelisin.",
    7: "İlişkilerinde güven ve saygı her şeyden öncedir. Partnerinle birlikte bir gelecek inşa etmek ve statü kazanmak istersin.",
    8: "Krizleri sarsılmaz bir sabırla yönetirsin. Ortaklaşa kaynaklarda çok dikkatli ve tutumlusun, miras ve vergilerde stratejik davranırsın.",
    9: "İnançlarında somut kanıtlar ararsın. Uzak yolculuklarda tarih ve kültür önceliğindir, disiplinli bir eğitim hayatın vardır.",
    10: "Kariyerin senin hayatının merkezidir. Toplum önünde başarılı, otoriter ve saygı duyulan bir lider imajın var.",
    11: "Sosyal çevren hedeflerine hizmet eden kişilerden oluşur. Gelecek ideallerin toplumsal yapıda kalıcı bir yer edinmektir.",
    12: "İç dünyanda büyük bir sorumluluk hissi taşırsın. Ruhsal olarak kendini inşa etmek ve olgunlaşmak en büyük sınavındır."
  },
  "Kova": {
    1: "Benzersiz, yenilikçi, özgürlükçü ve entelektüel bir enerjin var. Toplumun normlarına meydan okur, her zaman geleceği düşünürsün.",
    2: "Maddi konularda sıra dışı ve teknoloji odaklı olabilirsin. Kazançlarını genelde gruplar veya toplumsal fayda sağlayan işlerden kazanırsın.",
    3: "Zihnin bir mucit gibi çalışır. İletişimde özgün, bazen mesafeli ama her zaman zekice bir dilin vardır.",
    4: "Ev hayatında bağımsızlık ve teknoloji ön plandadır. Ailenle olan bağın gelenekselden çok arkadaşça ve özgürlükçüdür.",
    5: "Yaratıcılığın sınır tanımaz ve deneyseldir. Aşkta sıra dışı deneyimler ve arkadaşlık temelli bağlar ararsın.",
    6: "İş hayatında bağımsızlık istersin. Geleceğin teknolojileriyle uğraşmak seni motive eder, dolaşım sistemine dikkat etmelisin.",
    7: "İlişkilerinde her şeyden önce özgürlük ve zihinsel uyum beklersin. Geleneksel evlilik kalıpları sana göre olmayabilir.",
    8: "Krizleri mantıklı ve tarafsız bir bakış açısıyla çözersin. Ortaklaşa kaynaklarda adil and yenilikçi çözümler üretirsin.",
    9: "İnançlarında evrensel ve hümanistsin. Uzak yolculuklarda keşfedilmemiş veya modern yerleri tercih edersin.",
    10: "Kariyerinde devrimci ve yenilikçi rolleri üstlenirsin. Toplum önünde marjinal ve zeki bir imajın var.",
    11: "Sosyal çevren senin en büyük gücündür. Gelecek ideallerin tüm insanlığı kapsayan devrimsel değişimlerdir.",
    12: "İç dünyanda evrensel bir kolektif bilince sahipsin. Ruhsal olarak kendini tüm dünyayla bağlantılı hissedersin."
  },
  "Balık": {
    1: "Rüya gibi, empatik, sanatçı ruhlu ve sezgisel bir duruşun var. Sınırların ötesini hisseder, dünyayı duygularınla algılarsın.",
    2: "Maddi konularda akışta kalmayı seversin. Kazançlarını genelde sanatsal veya ruhsal alanlardan sağlama potansiyelin vardır.",
    3: "İletişiminde şiirsel ve sezgiseldir. Kelimelerin ötesindeki duyguları hissedersin, hayal gücün çok geniştir.",
    4: "Ev hayatında huzur ve ruhsal bir sığınak ararsın. Aile bağların çok derin ve bazen de fedakarlık üzerine kuruludur.",
    5: "Yaratıcılığın sınırsızdır. Aşkta platonik, romantik ve kendini adayan bir partnersin, sanata olan yeteneğin doğuştandır.",
    6: "İş hayatında fedakarca çalışırsın. Hayal gücünü kullanabileceğin işlerde çok başarılı olursun, bağışıklık sistemine dikkat.",
    7: "İlişkilerinde ruh ikizini ararsın. Partnerine karşı çok empatik ve vericisin, bazen sınırlarını belirlemekte zorlanabilirsin.",
    8: "Krizleri teslimiyet ve inançla aşarsın. Ortaklaşa kaynaklarda bazen kafa karışıklığı yaşayabilirsin, sezgilerine güvenmelisin.",
    9: "İnançların senin pusulandır. Mistisizm, rüyalar ve ruhsallık hayatının temelindedir; uzak yolculuklar senin için bir kaçıştır.",
    10: "Kariyerinde sanat, şifa veya yardım kuruluşlarında parlayabilirsin. Toplum önünde gizemli ve hassas bir imajın var.",
    11: "Arkadaş çevren ruhsal bağ kurduğun kişilerden oluşur. Gelecek ideallerin genelde manevi huzur ve şifa üzerinedir.",
    12: "Bilinçaltın senin gerçek evindir. Ruhsal şifa yeteneğin çok güçlüdür, yalnızlık senin için bir yenilenme sürecidir."
  }
};

export async function createBirthChartProfile(
  birthDate: Date,
  birthTime?: string,
  birthPlace?: string
): Promise<BirthChartProfile> {
  const coords = birthPlace ? await getCoordinates(birthPlace) : { lat: 41.0082, lng: 28.9784 };
  const accurateData = calculateAccurateAstrology(birthDate, birthTime || "12:00", coords?.lat || 41.0082, coords?.lng || 28.9784);
  const element = getZodiacElement(accurateData.sunSign);

  return {
    ...accurateData,
    element,
    birthDate: birthDate.toISOString().split('T')[0],
    birthTime,
    birthPlace
  };
}

function pickRandom(arr: string[]): string {
  if (!arr || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function generateAIInterpretation(profile: BirthChartProfile, userId?: string, language: string = 'tr'): Promise<CosmicInterpretation> {
  const planetInterpretations = {
    mercury: (natalInterpretations as any)["Merkür"]?.[profile.planets.mercury.sign] || "",
    venus: (natalInterpretations as any)["Venüs"]?.[profile.planets.venus.sign] || "",
    mars: (natalInterpretations as any)["Mars"]?.[profile.planets.mars.sign] || "",
    jupiter: (natalInterpretations as any)["Jüpiter"]?.[profile.planets.jupiter.sign] || "",
    saturn: (natalInterpretations as any)["Satürn"]?.[profile.planets.saturn.sign] || ""
  };

  const houseNarrative = [1, 10, 7, 4].map(h => {
    const sign = profile.houses[h - 1];
    return SIGN_HOUSE_POTENTIALS[sign]?.[h] || "";
  }).filter(t => t.length > 0).join(" ");

  const sunSignKey = signMap[profile.sunSign] || "aries";
  const moonSignKey = signMap[profile.moonSign] || "aries";
  const risingSignKey = signMap[profile.risingSign] || "aries";

  const sunData = (astroKnowledge.interpretations.sun as any)[sunSignKey];
  const moonData = (astroKnowledge.interpretations.moon as any)[moonSignKey];
  const risingData = (astroKnowledge.interpretations.ascendant as any)[risingSignKey];

  const aspectTexts = profile.aspects.map(a => {
    let meaning = "";
    if (a.type === "conjunction") meaning = "arasındaki çok yakın konum, bu iki enerjinin sende ayrılmaz bir bütün oluşturmasına neden oluyor.";
    if (a.type === "opposition") meaning = "arasındaki karşı karşıya duran bu açı, hayatında bu iki enerji arasında bir denge kurma zorunluluğu yaratıyor.";
    if (a.type === "square") meaning = "arasındaki sert etkileşim, sende güçlü bir hırs and harekete geçme arzusu uyandırıyor.";
    if (a.type === "trine") meaning = "arasındaki uyumlu etkileşim, bu iki gezegenin yeteneklerini sana zahmetsizce sunmasını sağlıyor.";
    if (a.type === "sextile") meaning = "arasındaki destekleyici açı, sana yeni fırsatlar kapısı aralıyor.";
    return `${a.planet1} ve ${a.planet2} arasındaki açı: ${meaning}`;
  }).slice(0, 4);

  const fullPersonalityStr = `Haritandaki yerleşimlerin sentezi şu şekildedir:

Güneş ${profile.sunSign} burcunda: ${sunData?.text || ""}
Ay ${profile.moonSign} burcunda: ${moonData?.text || ""}
Yükselen ${profile.risingSign}: ${risingData?.text || ""}


Merkür ${profile.planets.mercury.sign}: ${planetInterpretations.mercury}
Venüs ${profile.planets.venus.sign}: ${planetInterpretations.venus}
Mars ${profile.planets.mars.sign}: ${planetInterpretations.mars}
Jüpiter ${profile.planets.jupiter.sign}: ${planetInterpretations.jupiter}
Satürn ${profile.planets.saturn.sign}: ${planetInterpretations.saturn}

${houseNarrative}

${aspectTexts.length > 0 ? "\nÖnemli Görünümler:\n" + aspectTexts.join("\n") : ""}`;

  const houseInterpretations: Record<number, string> = {};
  const houseDataSource = language === 'en' ? houseInterpretationsDataEn : houseInterpretationsData;
  for (let i = 1; i <= 12; i++) {
    const houseSign = profile.houses[i - 1];
    const houseData = (houseDataSource as any)[i.toString()];
    const variants = houseData ? houseData[houseSign] : [];
    houseInterpretations[i] = pickRandom(variants) || (language === 'en' ? "You can expect balanced growth in this area." : "Bu alanda dengeli bir gelişim bekleyebilirsin.");
  }

  return {
    summary: `Güneş: ${profile.sunSign}, Ay: ${profile.moonSign}, Yükselen: ${profile.risingSign}`,
    personality: sunData?.text || "",
    emotionalNature: moonData?.text || "",
    lifeApproach: risingData?.text || "",
    currentEnergy: "",
    advice: `Satürn ${profile.planets.saturn.sign} konumun disiplin gerektirirken, Jüpiter ${profile.planets.jupiter.sign} sana büyüme fırsatları sunuyor.`,
    houses: houseInterpretations,
    fullPersonality: fullPersonalityStr
  };
}

export function generateDailyMessage(profile: BirthChartProfile, events: any[], journal?: any): string {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('tr-TR', { weekday: 'long' });

  const activeEvents = events.filter(e => {
    const start = new Date(e.start_date);
    const end = new Date(e.end_date);
    return today >= start && today <= end;
  });

  const futureEvents = events.filter(e => {
    const start = new Date(e.start_date);
    return start > today;
  }).slice(0, 1);

  let message = `Günaydın sevgili ${profile.sunSign}! Bugün ${dayOfWeek}. `;

  if (journal?.note) {
    message += `Dünkü "${journal.note.substring(0, 20)}..." notunu düşündüm de, `;
  }

  if (activeEvents.length > 0) {
    const event = activeEvents[0];
    message += `Gökyüzünde ${event.event_name} var. Bu durum ${profile.element} elementine sahip seni ${event.event_type === 'retro' ? 'biraz yavaşlatabilir, acele etme' : 'parlatabilir'}. `;
  } else {
    message += `Gökyüzü bugün sakin, iç sesini dinlemek için harika bir vakit. `;
  }

  if (futureEvents.length > 0) {
    const future = futureEvents[0];
    const daysUntil = Math.ceil((new Date(future.start_date).getTime() - today.getTime()) / 86400000);
    message += `${daysUntil} gün sonra gerçekleşecek olan ${future.event_name} için hazırlıklı olmaya başla.`;
  }

  return message;
}

const DIGNITIES: Record<string, { ruler: string[]; exaltation: string[]; detriment: string[]; fall: string[] }> = {
  "sun": { ruler: ["Aslan"], exaltation: ["Koç"], detriment: ["Kova"], fall: ["Terazi"] },
  "moon": { ruler: ["Yengeç"], exaltation: ["Boğa"], detriment: ["Oğlak"], fall: ["Akrep"] },
  "mercury": { ruler: ["İkizler", "Başak"], exaltation: ["Başak"], detriment: ["Yay", "Balık"], fall: ["Balık"] },
  "venus": { ruler: ["Boğa", "Terazi"], exaltation: ["Balık"], detriment: ["Akrep", "Koç"], fall: ["Başak"] },
  "mars": { ruler: ["Koç", "Akrep"], exaltation: ["Oğlak"], detriment: ["Terazi", "Boğa"], fall: ["Yengeç"] },
  "jupiter": { ruler: ["Yay", "Balık"], exaltation: ["Yengeç"], detriment: ["İkizler", "Başak"], fall: ["Oğlak"] },
  "saturn": { ruler: ["Oğlak", "Kova"], exaltation: ["Terazi"], detriment: ["Yengeç", "Aslan"], fall: ["Koç"] },
  "uranus": { ruler: ["Kova"], exaltation: ["Akrep"], detriment: ["Aslan"], fall: ["Boğa"] },
  "neptune": { ruler: ["Balık"], exaltation: ["Yengeç", "Aslan"], detriment: ["Başak"], fall: ["Oğlak"] },
  "pluto": { ruler: ["Akrep"], exaltation: ["Aslan", "Koç"], detriment: ["Boğa"], fall: ["Kova"] }
};

export async function calculateEnergyLevels(profile: BirthChartProfile, userId?: string): Promise<any> {
  const chart = calculateBirthChart(
    new Date(profile.birthDate),
    profile.birthTime || "12:00",
    41.0082,
    28.9784
  );

  const energy = calculateEnergyPotential(chart, userId);
  return energy;
}

export function getMonthlyForecast(profile: BirthChartProfile, futureEvents: any[]): string {
  const currentMonth = new Date().toLocaleDateString('tr-TR', { month: 'long' });

  const importantFutureEvent = futureEvents.find(e => {
    const date = new Date(e.start_date);
    return date.getMonth() === new Date().getMonth();
  });

  let forecast = `${currentMonth} ayı senin için `;

  if (profile.element === "Ateş") forecast += "oldukça hareketli geçecek. ";
  else if (profile.element === "Su") forecast += "duygusal derinliklerin artacağı bir dönem. ";
  else if (profile.element === "Toprak") forecast += "finansal ve kariyer odaklı kararların ayı. ";
  else forecast += "zihinsel olarak çok aktif ve yaratıcı bir süreç. ";

  if (importantFutureEvent) {
    forecast += `Ayın ${new Date(importantFutureEvent.start_date).getDate()}'inde gerçekleşecek olan ${importantFutureEvent.event_name} seni doğrudan etkileyecek. `;
  }

  forecast += "Ayla'nın tavsiyesi: Kendi iç ritmine güven ve yıldızların rehberliğini takip et.";

  return forecast;
}
