
import { Origin, Horoscope } from 'circular-natal-horoscope-js';

import { ZODIAC_IMAGES } from './zodiac-images';

export const ZODIAC_SIGNS = [
  { name: "Koç", symbol: "♈", element: "Ateş", startDate: "03-21", endDate: "04-19", ruler: "Mars", key: "aries", image: ZODIAC_IMAGES["Koç"] },
  { name: "Boğa", symbol: "♉", element: "Toprak", startDate: "04-20", endDate: "05-20", ruler: "Venüs", key: "taurus", image: ZODIAC_IMAGES["Boğa"] },
  { name: "İkizler", symbol: "♊", element: "Hava", startDate: "05-21", endDate: "06-20", ruler: "Merkür", key: "gemini", image: ZODIAC_IMAGES["İkizler"] },
  { name: "Yengeç", symbol: "♋", element: "Su", startDate: "06-21", endDate: "07-22", ruler: "Ay", key: "cancer", image: ZODIAC_IMAGES["Yengeç"] },
  { name: "Aslan", symbol: "♌", element: "Ateş", startDate: "07-23", endDate: "08-22", ruler: "Güneş", key: "leo", image: ZODIAC_IMAGES["Aslan"] },
  { name: "Başak", symbol: "♍", element: "Toprak", startDate: "08-23", endDate: "09-22", ruler: "Merkür", key: "virgo", image: ZODIAC_IMAGES["Başak"] },
  { name: "Terazi", symbol: "♎", element: "Hava", startDate: "09-23", endDate: "10-22", ruler: "Venüs", key: "libra", image: ZODIAC_IMAGES["Terazi"] },
  { name: "Akrep", symbol: "♏", element: "Su", startDate: "10-23", endDate: "11-21", ruler: "Plüton", key: "scorpio", image: ZODIAC_IMAGES["Akrep"] },
  { name: "Yay", symbol: "♐", element: "Ateş", startDate: "11-22", endDate: "12-21", ruler: "Jüpiter", key: "sagittarius", image: ZODIAC_IMAGES["Yay"] },
  { name: "Oğlak", symbol: "♑", element: "Toprak", startDate: "12-22", endDate: "01-19", ruler: "Satürn", key: "capricorn", image: ZODIAC_IMAGES["Oğlak"] },
  { name: "Kova", symbol: "♒", element: "Hava", startDate: "01-20", endDate: "02-18", ruler: "Uranüs", key: "aquarius", image: ZODIAC_IMAGES["Kova"] },
  { name: "Balık", symbol: "♓", element: "Su", startDate: "02-19", endDate: "03-20", ruler: "Neptün", key: "pisces", image: ZODIAC_IMAGES["Balık"] },
];

const SIGN_MAP: Record<string, string> = {
  aries: "Koç",
  taurus: "Boğa",
  gemini: "İkizler",
  cancer: "Yengeç",
  leo: "Aslan",
  virgo: "Başak",
  libra: "Terazi",
  scorpio: "Akrep",
  sagittarius: "Yay",
  capricorn: "Oğlak",
  aquarius: "Kova",
  pisces: "Balık"
};

export const COSMIC_LOGIC = {
  elements: {
    "Ateş": "Olaylara ani, dürtüsel ve enerjik tepkiler verirler. Beklemekten nefret ederler.",
    "Toprak": "Olaylara somut, pratik ve endişeli yaklaşırlar. Maddi güvence sarsılırsa kriz yaşarlar.",
    "Hava": "Olaylara zihinsel, rasyonel ve iletişim odaklı yaklaşırlar. 'Neden?' diye sorarlar.",
    "Su": "Olaylara duygusal, sezgisel ve içe dönük tepkiler verirler. Her şeyi hissederler."
  },
  signs: {
    "Koç": {
      major_event: "Mars Retrosu",
      major_impact: "Yöneticisi geri gittiğinde Koç'un eli kolu bağlanmış gibi hisseder. Enerjisi düşer, bağışıklığı zayıflar.",
      mercury_retro: "Sabırsız olduğun için aceleyle attığın imzalar veya fevri söylediğin sözler başına iş açabilir.",
      eclipses: "Genellikle 'Ben kimim?' ve 'İlişkilerim nereye gidiyor?' aksında (1. ve 7. Ev) yaşarsın. Ani kararlara dikkat.",
      weak_spot: "Baş ağrıları ve fevri kararlarla gelen kazalar.",
      mars_retro: "Yöneticin Mars geri gidiyor. Enerjin çekilmiş gibi hissedebilirsin, fevri çıkışlardan kaçın."
    },
    "Aslan": {
      major_event: "Güneş Tutulmaları",
      major_impact: "Güneş tutulduğunda yaşam enerjin çekilebilir. Ego krizleri yaşayabilir, otorite figürleriyle çatışabilirsin.",
      venus_retro: "Yeterince sevilmediğini, takdir edilmediğini düşünebilirsin. Lüks harcamalarla kendini avutmamaya çalış.",
      saturn_transit: "Satürn karşıtlığı hayatına 'Artık çocuk değilsin, sorumluluk al' diyebilir. Zorlu sınavlar getirebilir.",
      sun_eclipse: "Güneş tutuluyor, senin ışığın! Yaşam enerjin düşebilir, otoriteyle çatışmamaya dikkat et."
    },
    "Yay": {
      major_event: "Jüpiter Retrosu",
      major_impact: "Şansı ve bereketi dışarıda değil, kendi içinde aramayı öğrenmelisin. Yurt dışı ve akademik işler tıkanabilir.",
      mercury_retro: "Detayları kaçırabilirsin. Bilet tarihini yanlış almak, pasaportu unutmak gibi seyahat krizlerine dikkat.",
      full_moon: "İnançların ve hayat felsefen sorgulanabilir. Fanatikleşmeye yatkın olabilirsin.",
      jupiter_retro: "Yöneticin Jüpiter retrosu başladı. Şansı dışarıda arama, içsel bir yolculuğa çıkma zamanı."
    },
    "Boğa": {
      major_event: "Venüs Retrosu ve Uranüs Transitleri",
      major_impact: "Maddi değer kaybı ve özgüven eksikliği hissedebilirsin. Uranüs etkisiyle ani düzen değişikliklerine hazırlıklı ol.",
      mercury_retro: "Finansal hesap hataları yapabilirsin. Ödemelerini ve faturalarını unutmamaya çalış.",
      eclipses: "Genellikle sahip olduğun ve paylaştığın kaynaklar (para, miras) üzerinden sınanabilirsin.",
      venus_retro: "Yöneticin Venüs geri gidiyor. Maddi konularda risk alma, özdeğerini sorgulayabilirsin.",
      uranus_transit: "Uranüs senin burcunda! Ani düzen değişiklikleri ve konfor alanının yıkılmasıyla sınanıyorsun."
    },
    "Başak": {
      major_event: "Merkür Retrosu",
      major_impact: "Bu olayın başrolü sensin. Düzen, planlar ve randevular birbirine girebilir. Elektroniklere dikkat.",
      neptune_transit: "Netlik istersin ama sis gelir. Zehirlenmelere, alerjilere ve 'yönünü kaybetme' hissine dikkat.",
      weak_spot: "Mide ve bağırsak hassasiyeti. Stresi doğrudan bedeninde hissedebilirsin.",
      mercury_retro: "Yöneticin Merkür retrosu! Planların, randevuların birbirine girebilir. Teknolojik cihazlarına dikkat et."
    },
    "Oğlak": {
      major_event: "Satürn Döngüleri ve Plüton Transitleri",
      major_impact: "Kariyerinde ya zirveye çıkarsın ya da temellerin sağlamsa iflasla sınanırsın. Köklü kimlik değişimi kapıda.",
      mars_retro: "İş hayatındaki rekabet gücün düşebilir. Otoriteni kabul ettirmekte zorlanabilirsin.",
      eclipses: "Aile ve Kariyer aksında (4. ve 10. Ev) dengeleri kurmak senin için zorlayıcı olabilir.",
      saturn_transit: "Yöneticin Satürn seni sınıyor. Kariyerinde büyük bir dönemeçtesin, sorumlulukların artıyor."
    },
    "İkizler": {
      major_event: "Merkür Retrosu",
      major_impact: "İletişimden darbe alabilirsin. Yanlış anlaşılmalar, dedikodular ve gönderilmeyen e-postalar gündem olabilir.",
      mars_retro: "Zihnin çok hızlı çalışır ama eyleme geçemezsin. Bu durum sinirsel gerginlik ve anksiyete yaratabilir.",
      eclipses: "Yakın çevre, kardeşler ve eğitim hayatıyla ilgili ani bitişler ve başlangıçlar yaşayabilirsin.",
      mercury_retro: "Merkür retrosu iletişimini vurabilir. Yanlış anlaşılmalar ve teknolojik aksaklıklara hazır ol."
    },
    "Terazi": {
      major_event: "Venüs Retrosu",
      major_impact: "İlişkiler senin hayat damarın. Retroda 'Bu ilişki adil mi?' sorgulaması başlar. Estetik için riskli bir dönem.",
      eclipses: "'Ben' olmak ile 'Biz' olmak arasında kalabilirsin. Başkalarını memnun etmek için kendini feda etmeyi bırakmalısın.",
      weak_spot: "Kararsızlık yüzünden fırsatları kaçırmak.",
      venus_retro: "Venüs retrosunda ilişkiler sınanır. Eski sevgililer dönebilir, kararsız kalmamaya çalış."
    },
    "Kova": {
      major_event: "Uranüs Transitleri ve Satürn Kısıtlamaları",
      major_impact: "Özgürlüğüne düşkünsün ama Satürn etkisiyle sisteme uymak zorunda kalınca isyan edebilirsin. Ani devrimler kapıda.",
      mercury_retro: "Teknolojik krizler ve arkadaş grupları içinde yanlış anlaşılmalar yaşayabilirsin.",
      pluto_transit: "Önümüzdeki 20 yıl boyunca dünyayı değiştirecek güç ve krizlerle karşılaşacaksın. Yeniden yapılanıyorsun.",
      uranus_transit: "Yöneticin Uranüs hayatında devrim yapmanı bekliyor. Ani istifa veya taşınma kararları gelebilir."
    },
    "Yengeç": {
      major_event: "Tüm Ay Fazları ve Tutulmalar",
      major_impact: "Yöneticin Ay olduğu için her Dolunay'da gerilebilir, her Yeniay'da umutlanabilirsin. Duyguların gökyüzüne endeksli.",
      saturn_transit: "Güvenlik duygun sarsılabilir. Aile büyükleriyle ilgili sorumlulukların artacağı bir dönem.",
      mercury_retro: "Geçmişe takılı kalabilirsin. Eski fotoğraflar ve anılar melankoliye dönüşebilir.",
      moon_phase: "Yönetici gezegenin Ay! Her faz seni derinden etkiliyor. Duygusal dalgalanmalara açık ol."
    },
    "Akrep": {
      major_event: "Ay Tutulmaları ve Plüton Transitleri",
      major_impact: "Sırlar açığa çıkabilir, gizli düşmanlıklar bitebilir. Kendi karanlık yönlerinle yüzleşme vaktin.",
      venus_retro: "İlişkilerde kıskançlık, manipülasyon ve tutku krizleri zirve yapabilir. 'Ya hep ya hiç' deme.",
      weak_spot: "Şüphe ve paranoiak yaklaşımlar.",
      pluto_retro: "Yöneticin Plüton retrosu. Kendi karanlık yönlerinle yüzleşme ve dönüşme vakti."
    },
    "Balık": {
      major_event: "Neptün Retrosu ve Dolunaylar",
      major_impact: "Pembe gözlüklerin düşebilir ve gerçeklerle acı bir şekilde yüzleşebilirsin. Aldanma riskine dikkat.",
      mercury_retro: "Zaten dalgınsın, retroda tamamen dünyadan kopabilirsin. Randevuları ve anahtarları unutmamaya çalış.",
      saturn_transit: "Satürn burcunda! Hayal dünyasından çıkıp gerçek dünyanın sert kurallarıyla yüzleşme vaktin.",
      neptune_retro: "Yöneticin Neptün retrosu. Hayallerinden uyanma ve gerçeklerle yüzleşme zamanı."
    }
  },
  houses: {
    1: { name: "Kimlik, Beden, Vitrin ve Başlangıçlar", effects: { mercury_retro: "Kendini yanlış ifade etme, adını yanlış yazdırma, kimlik belgelerinde sorun, zihinsel dağınıklık.", venus_retro: "Estetik tatminsizlik, saçını/tarzını değiştirip pişman olma, kendini değersiz hissetme.", mars_retro: "Fiziksel enerji düşüklüğü, ameliyatlarda risk (yara iyileşmez), kaza eğilimi, özgüven kaybı.", eclipses: "Hayat yolunda ani yön değişimi (evlilik, boşanma, taşınma, kariyer değişimi). Fiziksel görünümde radikal değişim.", saturn_transit: "Yaşlanma korkusu, zayıflama, hayata karşı ciddileşme, sorumlulukların altında ezilme hissi." } },
    2: { name: "Para, Değerler ve Sahip Olunanlar", effects: { mercury_retro: "Yanlış para transferleri, unutulan faturalar, maaş gecikmeleri, hesap hataları.", venus_retro: "Gereksiz lüks harcamalar, alınan pahalı ürünün defolu çıkması, nakit akışında tıkanıklık.", mars_retro: "Para için aşırı mücadele ama sonuç alamama, ani ve düşüncesiz harcamalar (öfkeyle alışveriş).", eclipses: "Gelir kaynağının değişmesi (işten çıkma/yeni iş), ani büyük masraf veya ani toplu para girişi.", saturn_transit: "Kemer sıkma dönemi, finansal korkular, yatırım yaparken kısıtlanma, 'param yetmeyecek' endişesi." } },
    3: { name: "Zihin, Kardeşler, Yakın Çevret ve Eğitim", effects: { mercury_retro: "Klasik etki! Yanlış mesajlar, bozulan telefon/bilgisayar, trafikte kaybolma, komşu/kardeş kavgaları.", venus_retro: "Kardeşlerle ilişkilerde 'değer' sorunu, yakın çevreyle küslükler, yaratıcı projelerde tıkanma.", mars_retro: "Trafikte öfke patlamaları, keskin ve kırıcı konuşmalar, araba kazası riski.", eclipses: "Kardeşin hayatında büyük olay, ani bir eğitim kararı, taşınma, araba alma/satma.", saturn_transit: "Zihinsel depresyon, öğrenme güçlüğü veya çok disiplinli bir eğitime başlama, yakın çevreden izole olma." } },
    4: { name: "Aile, Yuva, Köklerr ve Gayrimenkul", effects: { mercury_retro: "Evdeki aletlerin bozulması, aile içi iletişim kopukluğu, kira kontratında hatalar.", venus_retro: "Ev dekorasyonunun kötü olması, ailede huzursuzluk, baba ile küslük.", mars_retro: "Evde yangın/tesisat kazaları riski, aile içi gürültülü kavgalar, tadilatın yarım kalması.", eclipses: "Taşınma, ev alma/satma, ebeveynlerin sağlığı veya hayatındaki büyük değişimler.", saturn_transit: "Evde sorumluluk artışı (hasta bakımı vs.), yalnız yaşama isteği, evin kasvetli gelmesi." } },
    5: { name: "Aşk, Çocuklar, Hobiler ve Riskli Yatırımlar", effects: { mercury_retro: "Eski sevgiliden gelen mesaj, çocuklarla iletişim sorunları, hobilerde odaklanamama.", venus_retro: "'Ex'lerin dönüşü, mevcut ilişkide sevgi sorgulaması, cinsel soğukluk.", mars_retro: "Cinsel sorunlar, sporda sakatlanma, aşk hayatında rekabet/kavga.", eclipses: "Ani bir aşk, sürpriz hamilelik, çocukların hayatında dönüm noktası, borsada büyük kazanç/kayıp.", saturn_transit: "Aşk acısı, yalnızlık hissi, çocuk sahibi olmada zorluk veya çocukların sorumluluğunun artması." } },
    6: { name: "Sağlık, Günlük İşler ve Hizmet", effects: { mercury_retro: "İş yerinde dosya kaybı, yanlış teşhis (sağlık), randevu karışıklığı, evcil hayvanın kaybolması.", venus_retro: "İş arkadaşlarıyla küslük, işten soğuma, şeker/hormon dengesizlikleri.", mars_retro: "İş yerinde tükenmişlik, iltihaplı hastalıklar, ateşli rahatsızlıklar, kesici alet yaralanmaları.", eclipses: "İş değişikliği, ofis taşınması, ani çıkan bir sağlık sorunu veya iyileşme, yeni bir diyet/rutin.", saturn_transit: "Kronik sağlık sorunları, iş yerinde köle gibi çalışma hissi, ağır sorumluluklar." } },
    7: { name: "Evlilik, Ortaklık ve Açık Düşmanlar", effects: { mercury_retro: "Eşle yanlış anlaşılma, eski ortakların ortaya çıkması, sözleşme yenileme sorunları.", venus_retro: "Boşanma düşüncesi, partnerin ilgisizliği, ilişkiyi geçmişle kıyaslama.", mars_retro: "Eşle şiddetli kavgalar, rekabet, davaların aleyhe sonuçlanma riski.", eclipses: "'Tam tamam mı devam mı?' kararı. Ani evlilik teklifi veya ani ayrılık. Ortaklığın bitişi.", saturn_transit: "İlişkinin test edilmesi. Soğukluk, mesafe veya ilişkiyi ciddiyete (evliliğe) zorunlu taşıma." } },
    8: { name: "Krizler, Miras, Cinsellik ve Dönüşüm", effects: { mercury_retro: "Banka kredilerinde hata, vergi borcu çıkması, miras evraklarında pürüz.", venus_retro: "Cinsel isteksizlik veya tuhaf cinsel yönelimler, eşin parasında azalma.", mars_retro: "Ameliyat riski (kanama), cinsel suçlar veya taciz korkusu, öfke krizleri.", eclipses: "Borçların bitmesi veya ani borçlanma, miras kalması, psikolojik bir tabunun yıkılması.", saturn_transit: "Borç ödeme zorluğu, cinsel blokajlar, ölüm korkusu, derin psikolojik sınavlar." } },
    9: { name: "İnançlar, Yurt Dışı, Hukuk ve Akademi", effects: { mercury_retro: "Vize reddi, uçak rötarları, bavul kaybı, akademik tezde hatalar.", venus_retro: "Farklı kültürden aşklar (sorunlu), inanç sorgulaması, tatilden keyif alamama.", mars_retro: "Yurt dışınde kavga, fanatik düşünceler, hukuksal davalarda agresiflik.", eclipses: "Yurt dışına taşınma, üniversiteyi kazanma/bırakma, hayata bakış açısının tamamen değişmesi.", saturn_transit: "Eğitimde engeller, inançlarda katılaşma, yurt dışı işlerinde bürokratik duvarlar." } },
    10: { name: "Kariyer, Statü ve Toplum Önündeki Duruş", effects: { mercury_retro: "Patronla yanlış anlaşılma, sunum hataları, terfi beklerken evrak kaybı.", venus_retro: "İtibar kaybı, yöneticilerle ilişkilerin bozulması, işi sevmeme.", mars_retro: "Otoriteyle savaş, hırsların ters tepmesi, skandal riski.", eclipses: "Kariyer değişikliği, terfi, işten çıkarılma, evlilik yoluyla statü değişimi.", saturn_transit: "Çok çalışma az takdir, yöneticilik sınavı, kariyerde zirveye çıkış veya düşüş (hak edişe göre)." } },
    11: { name: "Arkadaşlar, Sosyal Çevre ve Hayaller", effects: { mercury_retro: "Arkadaşlar arasında dedikodu, grup organizasyonlarının iptali, teknolojik sorunlar.", venus_retro: "Arkadaşla aşk yaşama karmaşası, sosyal çevrede değersiz hissetme.", mars_retro: "Arkadaş kavgaları, ekip içinde liderlik çatışması, hayaller için enerjinin bitmesi.", eclipses: "Sosyal çevrenin tamamen değişmesi, bir derneğe üye olma/ayrılma, büyük bir hayalin gerçekleşmesi.", saturn_transit: "Arkadaş elemesi, sosyal izolasyon, kalabalıklar içinde yalnızlık." } },
    12: { name: "Bilinçaltı, Gizli Düşmanlar, Rüyalar ve Hastaneler", effects: { mercury_retro: "Uykusuzluk, geçmiş travmaların hatırlanması, sırların ifşası, içsel konuşmaların artması.", venus_retro: "Gizli aşklar, platonik takıntılar, kendini sevememe.", mars_retro: "Bastırılmış öfke, gizli düşmanların saldırısı, psikolojik rahatsızlıklar.", eclipses: "Ruhsal uyanış, hastane süreçleri, gizli bir gerçeğin aydınlanması, izole olma isteği.", saturn_transit: "Ruhsal hapishane hissi, korkularla yüzleşme, karma temizliği." } }
  },
  houseInterpretations: {
    1: "Birinci ev, 'Ben' evidir. Hayata bakış açını, dış dünyaya verdiğin ilk izlenimi ve yaşamsal enerjini belirler. Burada yer alan burcun, senin hayata nasıl bir pencereden baktığını ve başkaları tarafından nasıl algılandığını anlatır.",
    2: "İkinci ev, senin özdeğerini ve maddi kaynaklarını temsil eder. Sadece para değil, sahip olduğun yetenekler ve hayatındaki güven duygusuyla da ilgilidir. Kendi değerini neye dayandırdığını burada görürüz.",
    3: "Üçüncü ev, zihninin çalışma biçimi ve yakın çevrendir. Kardeşler, komşular ve kısa yolculuklar bu evin konusudur. İletişim kurma tarzın, öğrenme biçimin ve merak duyduğun alanlar bu evin yönetimindedir.",
    4: "Dördüncü ev, senin köklerin, ailen ve iç dünyandır. En derinlerde hissettiğin güvenlik ihtiyacını ve çocukluk döneminden gelen duygusal mirası temsil eder. 'Ev' dediğin yerin sendeki karşılığıdır.",
    5: "Beşinci ev, yaşam sevincin ve yaratıcılığındır. Aşk hayatın, hobilerin, çocuklarla olan ilişkin ve risk alma kapasiten bu evde gizlidir. Kalbinin neyle attığını ve nasıl parladığını burada keşfederiz.",
    6: "Altıncı ev, senin günlük rutinlerin ve sağlığındır. Nasıl çalıştığın, hizmet etme biçimin ve bedenine nasıl baktığın bu evin sorumluluğundadır. Disiplin ve verimlilik burada hayat bulur.",
    7: "Yedinci ev, 'Biz' evidir. İkili ilişkiler, evlilik, ortaklıklar ve açık düşmanlıklar bu evin konusudur. Kendini bir başkasının aynasında nasıl gördüğünü ve ilişkilerinden ne beklediğini temsil eder.",
    8: "Sekizinci ev, dönüşüm ve ortak kaynaklardır. Miras, vergi gibi maddi konuların yanı sıra cinsellik ve ölüm/yeniden doğum döngülerini kapsar. Hayatın krizli ama dönüştürücü alanıdır.",
    9: "Dokuzuncu ev, senin hayat felsefen ve vizyonundur. Yüksek öğrenim, inançlar, yurt dışı seyahatleri ve genişleme arzun bu evdedir. Ruhunu büyüten ve ufkunu açan her şey buradadır.",
    10: "Onuncu ev, senin kariyerin ve toplumsal statündür. Hayatta ulaşmak istediğin zirveyi, patronlarınla ilişkini ve dış dünya tarafından nasıl bir başarıyla anılmak istediğini simgeler.",
    11: "On birinci ev, ideallerin ve sosyal çevrendir. Arkadaş grupların, dahil olduğun dernekler ve geleceğe dair umutların bu evin yönetimindedir. Toplum için ne yapmak istediğinle ilgilidir.",
    12: "On ikinci ev, senin bilinçaltın ve saklı kalan yanlarındır. Rüyalar, ruhsal çalışmalar ve kendi içine çekildiğin anlar bu evle ilgilidir. Karma ve ruhsal arınma bu evin derinliklerindedir."
  }
};

export const ZODIAC_INTERPRETATIONS: Record<string, { sun: string; moon: string; rising: string }> = {
  "Koç": {
    sun: "Cesur, enerjik ve öncü bir ruhun var. Liderlik doğanda var ve yeni başlangıçlardan korkmazsın.",
    moon: "Duygusal olarak tutkulu ve ani tepkiler verebilirsin. İçsel ateşin seni her zaman harekete geçirir.",
    rising: "Dış dünyaya dinamik, özgüvenli ve kararlı görünürsün. İlk izlenimin güçlü ve etkileyici."
  },
  "Boğa": {
    sun: "Sabırlı, kararlı ve güvenilirsin. Maddi güvenlik ve konfor senin için önemli.",
    moon: "Duygusal istikrar ararsın. Sevdiklerine sadık ve koruyucusun.",
    rising: "Sakin, güvenilir ve çekici bir aura yayarsın. İnsanlar yanında huzur bulur."
  },
  "İkizler": {
    sun: "Meraklı, iletişim ustası ve çok yönlüsün. Sürekli öğrenmek istersin.",
    moon: "Duygularını kelimelerle ifade edersin. Zihninle hissedersin.",
    rising: "Esprili, canlı ve sosyal görünürsün. Her ortama kolayca uyum sağlarsın."
  },
  "Yengeç": {
    sun: "Duygusal, koruyucu ve sezgisel bir ruhun var. Aile ve ev senin için kutsal.",
    moon: "Derin duygusal bir iç dünyan var. Empati yeteneğin çok güçlü.",
    rising: "Yumuşak, şefkatli ve güven veren bir auran var."
  },
  "Aslan": {
    sun: "Yaratıcı, cömert ve karizmatiksin. Sahne sana ait.",
    moon: "İçten içe takdir edilmek ve sevilmek istersin. Kalbin sıcak ve büyük.",
    rising: "Göz alıcı, kendinden emin ve kraliyet havasında görünürsün."
  },
  "Başak": {
    sun: "Analitik, detaycı ve mükemmeliyetçisin. Yardım etmekten mutluluk duyarsın.",
    moon: "Duygularını analiz edersin. Pratik çözümlerle huzur bulursun.",
    rising: "Düzenli, zarif ve akıllı görünürsün. Güvenilir bir izlenim bırakırsın."
  },
  "Terazi": {
    sun: "Uyumlu, adil ve estetik ruhllusun. İlişkiler hayatının merkezinde.",
    moon: "Duygusal denge ararsın. Çatışmadan kaçınır, barış istersin.",
    rising: "Şık, çekici ve diplomatik görünürsün. Sosyal graceın yüksek."
  },
  "Akrep": {
    sun: "Yoğun, tutkullu ve dönüştürücü bir güce sahipsin. Derinliklere dalmaktan korkmazsın.",
    moon: "Duygusal olarak çok derin ve güçlüsün. Sadakatin sınır tanımaz.",
    rising: "Gizemli, manyetik ve güçlü bir aura yayarsın. İnsanlar seni merak eder."
  },
  "Yay": {
    sun: "Özgür ruhlu, iyimser ve felsefi bir bakış açına sahipsin. Macera seni çağırır.",
    moon: "Duygusal özgürlüğe ihtiyaç duyarsın. Umut ve inanç seni besler.",
    rising: "Neşeli, açık sözlü ve enerjik görünürsün. Çevrene pozitiflik yayarsın."
  },
  "Oğlak": {
    sun: "Hırslı, disiplinli ve sabırlısın. Uzun vadeli hedefler için çalışırsın.",
    moon: "Duygularını kontrol altında tutarsın. Sorumluluk duygun güçlü.",
    rising: "Ciddi, profesyonel ve güvenilir görünürsün. Otorite yayarsın."
  },
  "Kova": {
    sun: "Yenilikçi, bağımsız ve insancılsın. Farklı olmaktan gurur duyarsın.",
    moon: "Duygusal olarak özgün ve öngörülemezsin. Entelektüel bağlar kurarsın.",
    rising: "Benzersiz, ilgi çekici ve biraz eksantrik görünürsün."
  },
  "Balık": {
    sun: "Hayalperest, empatik ve sezgiselsin. Ruhani derinliğin çok güçlü.",
    moon: "Duygusal olarak aşırı hassas ve alıcısın. Sınırlar koymak önemli.",
    rising: "Masumca, rüya gibi ve mistik bir hava yayarsın."
  }
};

export interface AccurateAstrologyData {
  sunSign: string;
  moonSign: string;
  risingSign: string;
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
}

export function calculateAccurateAstrology(
  birthDate: Date,
  birthTime: string,
  lat: number,
  lng: number
): AccurateAstrologyData {
  const [hour, minute] = birthTime.split(':').map(Number);

  const origin = new Origin({
    year: birthDate.getFullYear(),
    month: birthDate.getMonth(), // 0-indexed as per library and JS
    date: birthDate.getDate(),
    hour: hour,
    minute: minute,
    latitude: lat,
    longitude: lng
  });

  const horoscope = new Horoscope({
    origin: origin,
    houseSystem: "placidus",
    zodiac: "tropical",
    aspectPoints: ['bodies', 'points', 'angles'],
    aspectWithPoints: ['bodies', 'points', 'angles']
  });

  const sunSignKey = horoscope.SunSign.key;
  const moonSignKey = horoscope.CelestialBodies.moon.Sign.key;
  const risingSignKey = horoscope.Ascendant.Sign.key;

  const planets = {
    sun: {
      sign: SIGN_MAP[horoscope?.CelestialBodies?.sun?.Sign?.key] || SIGN_MAP[sunSignKey] || "Bilinmiyor",
      house: horoscope?.CelestialBodies?.sun?.House?.number || 1,
      longitude: horoscope?.CelestialBodies?.sun?.ChartPosition?.Ecliptic?.DecimalDegrees || 0
    },
    moon: {
      sign: SIGN_MAP[horoscope?.CelestialBodies?.moon?.Sign?.key] || "Bilinmiyor",
      house: horoscope?.CelestialBodies?.moon?.House?.number || 1,
      longitude: horoscope?.CelestialBodies?.moon?.ChartPosition?.Ecliptic?.DecimalDegrees || 0
    },
    mercury: {
      sign: SIGN_MAP[horoscope?.CelestialBodies?.mercury?.Sign?.key] || "Bilinmiyor",
      house: horoscope?.CelestialBodies?.mercury?.House?.number || 1,
      longitude: horoscope?.CelestialBodies?.mercury?.ChartPosition?.Ecliptic?.DecimalDegrees || 0
    },
    venus: {
      sign: SIGN_MAP[horoscope?.CelestialBodies?.venus?.Sign?.key] || "Bilinmiyor",
      house: horoscope?.CelestialBodies?.venus?.House?.number || 1,
      longitude: horoscope?.CelestialBodies?.venus?.ChartPosition?.Ecliptic?.DecimalDegrees || 0
    },
    mars: {
      sign: SIGN_MAP[horoscope?.CelestialBodies?.mars?.Sign?.key] || "Bilinmiyor",
      house: horoscope?.CelestialBodies?.mars?.House?.number || 1,
      longitude: horoscope?.CelestialBodies?.mars?.ChartPosition?.Ecliptic?.DecimalDegrees || 0
    },
    jupiter: {
      sign: SIGN_MAP[horoscope?.CelestialBodies?.jupiter?.Sign?.key] || "Bilinmiyor",
      house: horoscope?.CelestialBodies?.jupiter?.House?.number || 1,
      longitude: horoscope?.CelestialBodies?.jupiter?.ChartPosition?.Ecliptic?.DecimalDegrees || 0
    },
    saturn: {
      sign: SIGN_MAP[horoscope?.CelestialBodies?.saturn?.Sign?.key] || "Bilinmiyor",
      house: horoscope?.CelestialBodies?.saturn?.House?.number || 1,
      longitude: horoscope?.CelestialBodies?.saturn?.ChartPosition?.Ecliptic?.DecimalDegrees || 0
    },
    uranus: {
      sign: SIGN_MAP[horoscope?.CelestialBodies?.uranus?.Sign?.key] || "Bilinmiyor",
      house: horoscope?.CelestialBodies?.uranus?.House?.number || 1,
      longitude: horoscope?.CelestialBodies?.uranus?.ChartPosition?.Ecliptic?.DecimalDegrees || 0
    },
    neptune: {
      sign: SIGN_MAP[horoscope?.CelestialBodies?.neptune?.Sign?.key] || "Bilinmiyor",
      house: horoscope?.CelestialBodies?.neptune?.House?.number || 1,
      longitude: horoscope?.CelestialBodies?.neptune?.ChartPosition?.Ecliptic?.DecimalDegrees || 0
    },
    pluto: {
      sign: SIGN_MAP[horoscope?.CelestialBodies?.pluto?.Sign?.key] || "Bilinmiyor",
      house: horoscope?.CelestialBodies?.pluto?.House?.number || 1,
      longitude: horoscope?.CelestialBodies?.pluto?.ChartPosition?.Ecliptic?.DecimalDegrees || 0
    }
  };

  const houses = (Array.isArray(horoscope?.Houses) ? horoscope.Houses : []).map((h: any) => SIGN_MAP[h?.Sign?.key] || "Bilinmiyor");

  // Extract house cusps - try multiple paths as library structure may vary
  let houseCusps: number[] = [];
  if (Array.isArray(horoscope?.Houses) && horoscope.Houses.length > 0) {
    houseCusps = horoscope.Houses.map((h: any) => {
      // Try multiple property paths
      const cusp = h?.ChartPosition?.Ecliptic?.DecimalDegrees
        ?? h?.ChartPosition?.Horizon?.DecimalDegrees
        ?? h?.cusp
        ?? h?.degree
        ?? 0;
      return typeof cusp === 'number' ? cusp : 0;
    });
  }

  // If houseCusps are still empty or all zeros, generate them from Ascendant
  if (houseCusps.length === 0 || houseCusps.every(c => c === 0)) {
    const ascendantDegree = horoscope?.Ascendant?.ChartPosition?.Ecliptic?.DecimalDegrees
      ?? horoscope?.Ascendant?.ChartPosition?.Horizon?.DecimalDegrees
      ?? 0;

    // Generate 12 house cusps based on whole-sign house system (30 degrees each)
    houseCusps = Array.from({ length: 12 }, (_, i) => (ascendantDegree + i * 30) % 360);
  }

  const planetNameTr: Record<string, string> = {
    sun: "Güneş", moon: "Ay", mercury: "Merkür", venus: "Venüs",
    mars: "Mars", jupiter: "Jüpiter", saturn: "Satürn",
    uranus: "Uranüs", neptune: "Neptün", pluto: "Plüton"
  };

  const aspects = (Array.isArray(horoscope?.Aspects) ? horoscope.Aspects : []).map((a: any) => ({
    planet1: planetNameTr[a?.point1Key] || a?.point1Key,
    planet2: planetNameTr[a?.point2Key] || a?.point2Key,
    type: a?.aspectKey,
    description: `Güneş sistemindeki ${planetNameTr[a?.point1Key] || a?.point1Key} ve ${planetNameTr[a?.point2Key] || a?.point2Key} arasındaki özel etkileşim`
  })).filter((a: any) => ["conjunction", "opposition", "square", "trine", "sextile"].includes(a.type));

  return {
    sunSign: SIGN_MAP[sunSignKey] || "Bilinmiyor",
    moonSign: SIGN_MAP[moonSignKey] || "Bilinmiyor",
    risingSign: SIGN_MAP[risingSignKey] || "Bilinmiyor",
    planets,
    houses,
    houseCusps,
    aspects
  };
}

// Legacy helpers for compatibility during transition
export function getSunSign(birthDate: Date, language: 'tr' | 'en' = 'tr'): string {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const ZODIAC_SIGNS_EN = [
    { name: "Aries", startDate: "03-21", endDate: "04-19" },
    { name: "Taurus", startDate: "04-20", endDate: "05-20" },
    { name: "Gemini", startDate: "05-21", endDate: "06-20" },
    { name: "Cancer", startDate: "06-21", endDate: "07-22" },
    { name: "Leo", startDate: "07-23", endDate: "08-22" },
    { name: "Virgo", startDate: "08-23", endDate: "09-22" },
    { name: "Libra", startDate: "09-23", endDate: "10-22" },
    { name: "Scorpio", startDate: "10-23", endDate: "11-21" },
    { name: "Sagittarius", startDate: "11-22", endDate: "12-21" },
    { name: "Capricorn", startDate: "12-22", endDate: "01-19" },
    { name: "Aquarius", startDate: "01-20", endDate: "02-18" },
    { name: "Pisces", startDate: "02-19", endDate: "03-20" },
  ];

  const signs = language === 'en' ? ZODIAC_SIGNS_EN : ZODIAC_SIGNS;
  const capricornName = language === 'en' ? "Capricorn" : "Oğlak";
  const unknownName = language === 'en' ? "Unknown" : "Bilinmiyor";

  for (const sign of signs) {
    const [startMonth, startDay] = sign.startDate.split('-').map(Number);
    const [endMonth, endDay] = sign.endDate.split('-').map(Number);

    if (sign.name === capricornName || sign.name === "Oğlak" || sign.name === "Capricorn") {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return sign.name;
      }
    } else {
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        return sign.name;
      }
    }
  }
  return unknownName;
}

export function getMoonSign(birthDate: Date, birthTime?: string, language: 'tr' | 'en' = 'tr'): string {
  return language === 'en' ? "Calculating..." : "Hesaplanıyor...";
}

export function getRisingSign(birthTime?: string, birthPlace?: string, language: 'tr' | 'en' = 'tr'): string {
  return language === 'en' ? "Calculating..." : "Hesaplanıyor...";
}

export function calculatePlanetaryPositions(birthDate: Date, birthTime?: string) {
  return {
    mercury: "Hesaplanıyor...",
    venus: "Hesaplanıyor...",
    mars: "Hesaplanıyor...",
    jupiter: "Hesaplanıyor...",
    saturn: "Hesaplanıyor...",
  };
}

export function getZodiacSymbol(signName: string): string {
  const sign = ZODIAC_SIGNS.find(s => s.name === signName);
  return sign?.symbol || "?";
}

export function getZodiacElement(signName: string, language: 'tr' | 'en' = 'tr'): string {
  // First try to find by name directly (works for TR)
  let sign = ZODIAC_SIGNS.find(s => s.name === signName);

  if (!sign) {
    // Try to find in EN list
    const ZODIAC_SIGNS_EN = [
      { name: "Aries", element: "Fire" }, { name: "Taurus", element: "Earth" }, { name: "Gemini", element: "Air" }, { name: "Cancer", element: "Water" },
      { name: "Leo", element: "Fire" }, { name: "Virgo", element: "Earth" }, { name: "Libra", element: "Air" }, { name: "Scorpio", element: "Water" },
      { name: "Sagittarius", element: "Fire" }, { name: "Capricorn", element: "Earth" }, { name: "Aquarius", element: "Air" }, { name: "Pisces", element: "Water" }
    ];
    const enSign = ZODIAC_SIGNS_EN.find(s => s.name === signName);
    if (enSign) return enSign.element; // Return EN element name
  }

  // If TR sign found but language is EN, translate element
  if (sign && language === 'en') {
    const elemMap: Record<string, string> = { "Ateş": "Fire", "Toprak": "Earth", "Hava": "Air", "Su": "Water" };
    return elemMap[sign.element] || sign.element;
  }

  return sign?.element || (language === 'en' ? "Unknown" : "Bilinmiyor");
}

export type ImpactLevel = "positive" | "neutral" | "negative";

export function getImpactColor(level: ImpactLevel): string {
  switch (level) {
    case "positive": return "bg-emerald-500";
    case "neutral": return "bg-amber-400";
    case "negative": return "bg-rose-500";
    default: return "bg-gray-400";
  }
}

export function getImpactTextColor(level: ImpactLevel): string {
  switch (level) {
    case "positive": return "text-emerald-500";
    case "neutral": return "text-amber-400";
    case "negative": return "text-rose-500";
    default: return "text-gray-400";
  }
}

export function getPlanetImpactColor(planet: string, aspects: any[], userSunSign: string): string {
  let score = 50;

  const relevantAspects = aspects.filter(a => a.planet1 === planet || a.planet2 === planet);

  for (const aspect of relevantAspects) {
    if (aspect.aspectType === "trine") score += 10;
    else if (aspect.aspectType === "sextile") score += 5;
    else if (aspect.aspectType === "square") score -= 10;
    else if (aspect.aspectType === "opposition") score -= 15;
    else if (aspect.aspectType === "conjunction") score += 5;
  }

  if (score > 60) return "bg-emerald-500/20 border-emerald-500/30";
  if (score < 40) return "bg-rose-500/20 border-rose-500/30";
  return "bg-amber-400/10 border-amber-400/20";
}

export function calculatePersonalImpact(
  userSunSign: string,
  eventPlanet: string,
  eventType: string,
  house: number = 1
): ImpactLevel {
  const signData = (COSMIC_LOGIC.signs as any)[userSunSign];

  if (eventType === "retro" && signData?.major_event === `${eventPlanet} Retrosu`) return "negative";
  if (eventType === "eclipse" && (signData?.major_event === `${eventPlanet} Tutulmaları` || eventPlanet === "Güneş" || eventPlanet === "Ay")) return "negative";

  if (eventType === "mercury_retro" && signData?.mercury_retro) return "negative";
  if (eventType === "venus_retro" && signData?.venus_retro) return "negative";
  if (eventType === "mars_retro" && signData?.mars_retro) return "negative";
  if (eventType === "jupiter_retro" && signData?.jupiter_retro) return "negative";
  if (eventType === "saturn_transit" && signData?.saturn_transit) return "negative";
  if (eventType === "uranus_transit" && signData?.uranus_transit) return "negative";
  if (eventType === "neptune_retro" && signData?.neptune_retro) return "negative";
  if (eventType === "pluto_retro" && signData?.pluto_retro) return "negative";
  if (eventType === "pluto_transit" && signData?.pluto_transit) return "negative";
  if (eventType === "sun_eclipse" && signData?.sun_eclipse) return "negative";
  if (eventType === "moon_phase" && signData?.moon_phase) return "negative";

  if (eventType.includes("retro") || eventType === "square" || eventType === "opposition") {
    return "negative";
  }

  if (eventType === "conjunction" || eventType === "transit" || eventType === "trine" || eventType === "sextile" || eventType === "new_moon") {
    return "positive";
  }

  if (eventType === "full_moon") return "neutral";

  return "neutral";
}

export const DAILY_AYLA_ADVICE = [
  { warning: "Bugün Merkür'ün gölgesi üzerimizde, kelimelerini seçerken iki kez düşün.", affirmation: "Kendimi en doğru ve nazik şekilde ifade ediyorum." },
  { warning: "Mars sabrını zorlayabilir, öfkeni yaratıcı bir enerjiye dönüştür.", affirmation: "İç huzurum her türlü dış etkiden daha güçlü." },
  { warning: "Satürn sorumlulukları hatırlatıyor, ertelediğin işler kapını çalabilir.", affirmation: "Disiplinim bana özgürlük getiriyor." },
  { warning: "Venüs değerlerini sorgulatıyor, harcamalarında aşırıya kaçmamaya dikkat et.", affirmation: "Ben her halimle değerliyim ve berekete layığım." },
  { warning: "Ay'ın değişken enerjisi duygularını dalgalandırabilir, akışta kal.", affirmation: "Duygularım geçici, özüm ise baki ve huzurlu." },
  { warning: "Jüpiter'in aşırılığına kapılma, gerçekçi hedefler belirle.", affirmation: "Adım adım, emin adımlarla zirveye ilerliyorum." },
  { warning: "Uranüs sürprizlere açık olmanı istiyor, planların değişirse isyan etme.", affirmation: "Değişime açığım ve yenilikler bana şans getiriyor." },
  { warning: "Neptün sisli bir hava yaratabilir, kararlarını yarın tekrar gözden geçir.", affirmation: "Sezgilerim bana en doğru yolu gösteriyor." },
  { warning: "Plüton derin dönüşümler fısıldıyor, eskiyi bırakmaktan korkma.", affirmation: "Yenileniyorum ve küllerimden daha güçlü doğuyorum." },
  { warning: "Güneş enerjin bugün biraz düşük olabilir, kendine nazik davran.", affirmation: "Işığım içimden geliyor ve her an parlamaya hazır." },
  { warning: "Kozmik tozlar zihnini karıştırabilir, bugün sadece nefesine odaklan.", affirmation: "Anın içindeki huzuru seçiyorum." },
  { warning: "Yıldızlar bugün sessizliği öğütlüyor, dinlemek konuşmaktan daha kıymetli.", affirmation: "Sessizliğin içindeki bilgeliği duyuyorum." }
];

export function getDailyAylaAdvice(date: Date): { warning: string; affirmation: string } {
  const day = date.getDate();
  const month = date.getMonth();
  // Simple deterministic pick based on date
  const index = (day + month) % DAILY_AYLA_ADVICE.length;
  return DAILY_AYLA_ADVICE[index];
}

export function generateAffirmation(impact: ImpactLevel, eventType: string, planet: string): string {
  const affirmations: Record<ImpactLevel, string[]> = {
    positive: [
      "Evrenin bereketiyle doluyum. Bu enerji beni destekliyor.",
      "Yıldızlar lehime çalışıyor. Bolluk ve sevgi beni buluyor.",
      "Bu dönem şansım açık. Her fırsatı değerlendiriyorum.",
      "Kozmik enerji beni güçlendiriyor. Işığım parlıyor.",
      "Her şey en yüce hayrıma gerçekleşiyor.",
      "İçimdeki mucizeye güveniyorum."
    ],
    neutral: [
      "Dengede kalıyorum. Ne olursa olsun huzurumu koruyorum.",
      "Bu dönem sabırla ilerliyorum. Her şey zamanında oluyor.",
      "Akışa güveniyorum. Evren planımı biliyor.",
      "Nötr kalıyorum ve gözlemliyorum. Doğru zaman gelecek.",
      "Zihnim sakin, kalbim huzurlu."
    ],
    negative: [
      "Bu enerji geçici. Kendimi koruyorum ve sabırlıyım.",
      "Dikkatli adımlar atıyorum. İçgüdülerime güveniyorum.",
      "Yavaşlamak da ileri gitmektir. Kendime nazik davranıyorum.",
      "Bu dönem öğreniyorum ve büyüyorum. Zorluklar beni güçlendiriyor.",
      "Kendi ışığımla korunuyorum.",
      "Sakinlik en büyük gücüm.",
      "Bugün tepki vermeden önce derin bir nefes alıyorum.",
      "Evrenin beni koruduğuna dair inancım tam."
    ]
  };

  const list = affirmations[impact];
  return list[Math.floor(Math.random() * list.length)];
}

export function getElementAdvice(element: string): string {
  const advice: Record<string, string> = {
    "Ateş": "Bugün enerjini doğru yönetmelisin. Acele etmek yerine stratejik davran. Spor veya fiziksel aktivite sana iyi gelecektir.",
    "Toprak": "Somut adımlar atmak için uygun bir gün değilse bile, planlarını kağıda dök. Doğada vakit geçirmek seni topraklayacaktır.",
    "Hava": "Zihnindeki düşünce fırtınasını dindirmek için yazmayı dene. Sosyal medyadan biraz uzaklaşıp kendi sesini dinle.",
    "Su": "Duygularının derinliğinde kaybolma, onları birer pusula olarak kullan. Suyla temas etmek (duş almak, göl kenarı) ruhuna iyi gelir."
  };
  return advice[element] || "Dengede kalmaya çalış.";
}

export function getHouseForLongitude(longitude: number, houses: { house: number; sign: string; degree: number; longitude?: number }[]): number {
  // Normalize longitude to 0-360
  const normalizedLong = ((longitude % 360) + 360) % 360;

  // Houses are sorted 1-12
  // We need to find which house boundary this longitude falls into
  // Since we use Whole Sign or Placidus (represented as list of 12)
  // In the current codebase, calculateHouses returns 12 houses starting from Ascendant
  // If it's Whole Sign, each is 30 degrees.

  // Let's first try to find the actual longitude of each house cusp if available
  // In our BirthChart interface, houses have {house, sign, degree}
  // We can convert sign+degree to longitude
  const houseLongs = houses.map(h => {
    const signIndex = ZODIAC_SIGNS.findIndex(s => s.name === h.sign);
    return (signIndex * 30 + h.degree) % 360;
  });

  for (let i = 0; i < 12; i++) {
    const start = houseLongs[i];
    const end = houseLongs[(i + 1) % 12];

    if (start < end) {
      if (normalizedLong >= start && normalizedLong < end) return i + 1;
    } else {
      // Wrap around case (e.g. 350 to 20)
      if (normalizedLong >= start || normalizedLong < end) return i + 1;
    }
  }

  return 1; // Fallback
}


export function generateImpactReason(
  userSunSign: string,
  eventPlanet: string,
  eventType: string,
  impact: ImpactLevel,
  house: number = 1
): string {
  const signData = (COSMIC_LOGIC.signs as any)[userSunSign];
  const houseData = (COSMIC_LOGIC.houses as any)[house];
  const element = getZodiacElement(userSunSign);

  if (impact === "negative") {
    if (eventType === "mercury_retro" && signData?.mercury_retro) return signData.mercury_retro;
    if (eventType === "mars_retro" && signData?.mars_retro) return signData.mars_retro;
    if (eventType === "venus_retro" && signData?.venus_retro) return signData.venus_retro;
    if (eventType === "jupiter_retro" && signData?.jupiter_retro) return signData.jupiter_retro;
    if (eventType === "saturn_transit" && signData?.saturn_transit) return signData.saturn_transit;
    if (eventType === "uranus_transit" && signData?.uranus_transit) return signData.uranus_transit;
    if (eventType === "neptune_retro" && signData?.neptune_retro) return signData.neptune_retro;
    if (eventType === "pluto_retro" && signData?.pluto_retro) return signData.pluto_retro;
    if (eventType === "sun_eclipse" && signData?.sun_eclipse) return signData.sun_eclipse;
    if (eventType === "moon_phase" && signData?.moon_phase) return signData.moon_phase;
    if (eventType === "eclipse" && signData?.eclipses) return signData.eclipses;

    if (signData?.major_impact && signData?.major_event.includes(eventPlanet)) return signData.major_impact;

    const houseEffect = (houseData?.effects as any)[eventType];
    if (houseEffect) return houseEffect;

    return `${eventPlanet} enerjisi şu an ${element} grubu olan senin için biraz yorucu olabilir. Akışta kalmayı dene.`;
  }

  if (impact === "positive") {
    return `${userSunSign} burcu olarak ${eventPlanet}'ün bu hareketi seni parlatıyor. ${element} enerjinle uyumlu, şanslı bir dönemdesin.`;
  }

  return `${eventPlanet}'ün bu hareketi ${userSunSign} burcunu doğrudan kısıtlamıyor. ${getElementAdvice(element)}`;
}
