
export interface HouseMatchInterpretation {
  score: number;
  text: string;
}

export const houseInterpretations: Record<number, Record<string, HouseMatchInterpretation>> = {
  // House 1: Identity, appearance
  1: {
    "harmony": { score: 90, text: "Kişisel hedefleriniz ve hayata bakış açınız büyük bir uyum içinde. Birbirinizi doğal bir aynalama ile anlıyorsunuz." },
    "neutral": { score: 60, text: "Bireysel yaklaşımlarınız farklı olsa da birbirinize saygı duyuyorsunuz. Ortak bir zemin bulmak zaman alabilir." },
    "challenge": { score: 30, text: "Kişisel alan ve egoların çatışabileceği bir enerji. Birbirinizin sınırlarına ekstra özen göstermelisiniz." }
  },
  // House 2: Values, money
  2: {
    "harmony": { score: 85, text: "Maddi değerleriniz ve güven arayışınız örtüşüyor. Birlikte bir gelecek inşa etmek sizin için çok doğal." },
    "neutral": { score: 55, text: "Harcama alışkanlıklarınız farklılık gösterebilir. Finansal konularda açık iletişim kurmak ilişkinizi güçlendirir." },
    "challenge": { score: 35, text: "Öncelikleriniz ve değer yargılarınızda derin farklılıklar var. Güven inşası için sabır gerekiyor." }
  },
  // House 3: Communication
  3: {
    "harmony": { score: 92, text: "Zihinsel bir akış içindesiniz. Kelimelere dökülmeyen bir anlayış ve harika bir sohbet uyumunuz var." },
    "neutral": { score: 50, text: "İletişim tarzlarınız farklı ama öğrenmeye açıksınız. Birbirinizi dinlemeyi öğrendiğinizde bağınız derinleşecek." },
    "challenge": { score: 25, text: "Yanlış anlaşılmalara açık bir kanal. Kendinizi ifade ederken daha net ve nazik olmanız gerekebilir." }
  },
  // House 4: Home, family
  4: {
    "harmony": { score: 95, text: "Aynı duygusal köklere sahip gibisiniz. Birlikteyken gerçek anlamda 'evde' hissediyorsunuz." },
    "neutral": { score: 65, text: "Aile kavramına bakışınız farklı olsa da ortak bir yuva kurma arzusu sizi birleştiriyor." },
    "challenge": { score: 40, text: "Geçmişten gelen duygusal yükler çatışabilir. İçsel huzuru bulmak için birlikte iyileşmelisiniz." }
  },
  // House 5: Romance, creativity
  5: {
    "harmony": { score: 88, text: "Eğlence ve tutku dolu bir bağ. Birlikte yaratıcı projeler üretmek ve hayattan keyif almak çok kolay." },
    "neutral": { score: 60, text: "Keyif aldığınız hobiler farklı olsa da birbirinizin heyecanına ortak olmaya çalışıyorsunuz." },
    "challenge": { score: 45, text: "Aşkı ifade etme biçimleriniz uyuşmayabilir. Romantik beklentilerinizi netleştirmeniz faydalı olur." }
  },
  // House 6: Daily routines, health
  6: {
    "harmony": { score: 82, text: "Günlük rutinleriniz ve çalışma disiplininiz birbirini tamamlıyor. Hayatın pratik yönlerini kolayca organize ediyorsunuz." },
    "neutral": { score: 55, text: "Yaşam tarzı alışkanlıklarınızda uyum sağlamak için biraz esneklik gerekiyor. Sağlıklı bir denge kurabilirsiniz." },
    "challenge": { score: 30, text: "Küçük detaylar ve sorumluluklar üzerinden gerginlik çıkabilir. İş bölümü yapmak kurtarıcı olacaktır." }
  },
  // House 7: Partnerships
  7: {
    "harmony": { score: 98, text: "Klasik bir birliktelik uyumu. Birbirinizi tamamlayan parçalar gibisiniz; tam bir 'biz' olma hali." },
    "neutral": { score: 65, text: "Ortaklık kurma ve bağlılık konularında farklı hızlarda ilerliyor olabilirsiniz. Zamanla denge oturacaktır." },
    "challenge": { score: 35, text: "İkili ilişkilerde beklentileriniz çelişiyor olabilir. Bağlılık yemini etmeden önce hedeflerinizi eşitleyin." }
  },
  // House 8: Shared assets, deep bond
  8: {
    "harmony": { score: 90, text: "Derin bir ruhsal ve fiziksel çekim. Birbirinizin en gizli yönlerini keşfetmekten çekinmiyorsunuz." },
    "neutral": { score: 50, text: "Güven ve mahremiyet konularında hassas bir denge var. Birbirinize açılmak için zaman tanıyın." },
    "challenge": { score: 25, text: "Kıskançlık veya güç savaşları yaşanabilir. Teslimiyet ve dürüstlük bu ilişkiyi kurtaracaktır." }
  },
  // House 9: Higher mind, philosophy
  9: {
    "harmony": { score: 85, text: "İnançlarınız ve dünya görüşünüz birbiriyle dans ediyor. Birlikte keşfetmek ve öğrenmek ruhunuzu besliyor." },
    "neutral": { score: 55, text: "Farklı kültürlerden veya bakış açılarından geliyor olsanız da bu zenginlik ilişkinize değer katıyor." },
    "challenge": { score: 30, text: "Felsefi veya dini farklılıklar gerilim yaratabilir. Hoşgörü ve anlayış en büyük sınavınız." }
  },
  // House 10: Career, status
  10: {
    "harmony": { score: 80, text: "Toplumsal hedefleriniz ve başarı hırsınız uyumlu. Birbirinizin kariyer yolculuğunda en büyük destekçisiniz." },
    "neutral": { score: 60, text: "Gelecek planlarınızda farklı öncelikler olabilir. Ortak bir vizyon oluşturmak için stratejik düşünmelisiniz." },
    "challenge": { score: 40, text: "Statü ve başarı üzerinden rekabet doğabilir. Birbirinizin parlamasına izin vermeyi öğrenmelisiniz." }
  },
  // House 11: Friends, hopes
  11: {
    "harmony": { score: 92, text: "Aynı sosyal vizyonu paylaşıyorsunuz. Arkadaş çevrenizde sevilen, idealist ve ilham verici bir çiftsiniz." },
    "neutral": { score: 65, text: "Sosyal ortam tercihleriniz farklı olabilir. Kendi bireysel arkadaşlıklarınıza da alan açmak size iyi gelecektir." },
    "challenge": { score: 35, text: "Gelecekten beklentileriniz ve hayalleriniz ayrışıyor. Ortak bir amaç bulmakta zorlanabilirsiniz." }
  },
  // House 12: Subconscious, spiritual
  12: {
    "harmony": { score: 96, text: "Telepatik bir bağ söz konusu. Sessizlikteyken bile birbirinizin ruhunu duyabiliyorsunuz." },
    "neutral": { score: 60, text: "Ruhsal dünyalarınız farklı frekanslarda olsa da birbirinizin iç dünyasına saygı duyuyorsunuz." },
    "challenge": { score: 20, text: "Bilinçaltı korkuları tetiklenebilir. Şeffaf olmadığınız sürece birbirinizi yanlış anlayabilirsiniz." }
  }
};

export const cosmicPredictionsData = {
  positive: [
    "Jüpiter'in desteğiyle ilişkinizde bolluk ve bereket dönemi başlıyor. Ortak hayallerinizi gerçekleştirmek için harika bir zaman.",
    "Venüs'ün uyumlu açısı, aranızdaki romantizmi ve tutkuyu zirveye taşıyacak. Birbirinize daha sıkı bağlanacaksınız.",
    "Merkür'ün etkisiyle iletişiminizdeki pürüzler gideriliyor. Birbirinizi hiç olmadığı kadar iyi anlayacaksınız.",
    "Güneş'in parıltısı ilişkinize yeni bir enerji katıyor. Birlikte sosyal ortamlarda parlayacağınız bir dönem.",
    "Ay'ın şefkatli enerjisi, ev ve aile konularında huzuru beraberinde getiriyor. Güven bağınız derinleşiyor."
  ],
  neutral: [
    "Satürn'ün öğretici etkileri devrede. Sorumluluklar artabilir ancak bu durum bağınızı daha sağlam bir temele oturtacak.",
    "Mars'ın dinamik enerjisi aranızdaki aksiyonu artırıyor. Küçük tartışmaları tutkuya dönüştürmek sizin elinizde.",
    "Uranüs'ün beklenmedik sürprizlerine açık olun. Rutinlerin dışına çıkmak ilişkinize taze bir soluk getirebilir.",
    "Neptün'ün romantik bulutu etrafınızda. Hayaller kurmak güzel ancak gerçeklerden kopmamaya özen gösterin.",
    "Plüton'un dönüştürücü gücüyle ilişkiniz kabuk değiştiriyor. Eski alışkanlıkları bırakıp yenilenme zamanı."
  ],
  challenge: [
    "Merkür retrosu döneminde yanlış anlaşılmalara dikkat edin. Eski konular tekrar gündeme gelebilir.",
    "Mars'ın sert açısı fevri çıkışlara neden olabilir. Sabırlı olmak ve empati kurmak anahtar kelimeniz.",
    "Satürn'ün kısıtlayıcı enerjisi mesafe hissettirebilir. Birbirinize olan güveninizi tazelemelisiniz.",
    "Uranüs'ün ani değişimleri planlarınızı bozabilir. Esnek kalmak stresi azaltacaktır.",
    "Ay'ın değişken ruh hali duygusal dalgalanmalara yol açabilir. Birbirinize sığınmaktan çekinmeyin."
  ]
};

export const pillarWeights = {
  ruhsal: { houses: [4, 8, 9, 12], weight: 0.25 },
  duygusal: { houses: [4, 5, 7, 8, 12], weight: 0.35 },
  fiziksel: { houses: [1, 2, 5, 8], weight: 0.20 },
  zihinsel: { houses: [3, 7, 9, 11], weight: 0.20 }
};

export const overallPillarWeights = {
  ruhsal: 0.3,
  duygusal: 0.4,
  fiziksel: 0.15,
  zihinsel: 0.15
};
