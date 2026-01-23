import { PLANET_HOUSE_SLOTS, PLANET_ENERGY, ASPECT_DATA, TransitSlot } from "@/lib/data/transit-interpretations";
import { 
  PLANET_ELEMENT_INTERPRETATIONS, 
  MOON_PHASE_ELEMENT_INTERPRETATIONS,
  getElementFromSign, 
  getPlanetElementEffects,
  getMoonPhaseElementEffects,
  type PlanetKey,
  type ElementEffect
} from "@/lib/data/planet-element-interpretations";
import { getMoonPhaseCosmicGuidance } from "@/lib/data/moon-phase-interpretations";
import { 
  PLANET_SIGN_INTERPRETATIONS_TR, 
  PLANET_SIGN_INTERPRETATIONS_EN 
} from "@/lib/data/planet-sign-interpretations";

function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const SIGN_TO_ENGLISH: Record<string, string> = {
  'Koç': 'Aries', 'Aries': 'Aries',
  'Boğa': 'Taurus', 'Taurus': 'Taurus',
  'İkizler': 'Gemini', 'Gemini': 'Gemini',
  'Yengeç': 'Cancer', 'Cancer': 'Cancer',
  'Aslan': 'Leo', 'Leo': 'Leo',
  'Başak': 'Virgo', 'Virgo': 'Virgo',
  'Terazi': 'Libra', 'Libra': 'Libra',
  'Akrep': 'Scorpio', 'Scorpio': 'Scorpio',
  'Yay': 'Sagittarius', 'Sagittarius': 'Sagittarius',
  'Oğlak': 'Capricorn', 'Capricorn': 'Capricorn',
  'Kova': 'Aquarius', 'Aquarius': 'Aquarius',
  'Balık': 'Pisces', 'Pisces': 'Pisces'
};

export function formatHouseNumber(house: number, language: 'tr' | 'en' = 'tr'): string {
  if (language === 'tr') {
    return `${house}. Ev`;
  }
  
  const suffixes: Record<number, string> = {
    1: 'st', 2: 'nd', 3: 'rd',
    21: 'st', 22: 'nd', 23: 'rd',
    31: 'st'
  };
  const suffix = suffixes[house] || 'th';
  return `The ${house}${suffix} House`;
}

export const PLANET_HOUSE_INTERPRETATIONS: Record<string, Record<number, { tr: string; en: string }>> = {
  "Güneş": {
    1: { tr: "Kişisel enerjinin ve özgüvenin parladığı bir dönemdesin. Kendini daha net ifade edebilir, yeni başlangıçlar için gereken cesareti bulabilirsin.", en: "A period when your personal energy and confidence shine. You can express yourself more clearly and find the courage for new beginnings." },
    2: { tr: "Maddi değerler ve özsaygı konuları ön planda. Gelirlerini artırmak veya yeteneklerini paraya dönüştürmek için odaklanabilirsin.", en: "Material values and self-esteem are in focus. You can focus on increasing your income or turning your talents into money." },
    3: { tr: "İletişim, yakın çevre ve kısa yolculuklar hareketleniyor. Yeni bir şeyler öğrenmek veya fikirlerini paylaşmak için harika bir zaman.", en: "Communication, close environment and short trips are getting active. A great time to learn new things or share your ideas." },
    4: { tr: "Ev, aile ve köklerinle ilgili konular odağında. İç dünyana dönmek, evinde huzur aramak ve aile bağlarını güçlendirmek isteyebilirsin.", en: "Home, family and root issues are in focus. You may want to turn to your inner world, seek peace at home and strengthen family ties." },
    5: { tr: "Yaratıcılık, aşk ve eğlence zamanı! Hobilerine vakit ayırabilir, kalbinin sesini dinleyebilir ve hayatın tadını çıkarabilirsin.", en: "Time for creativity, love and fun! You can spend time on your hobbies, listen to your heart and enjoy life." },
    6: { tr: "Günlük rutinlerin, iş hayatın ve sağlığınla ilgilenme vakti. Düzen kurmak, alışkanlıklarını iyileştirmek sana iyi gelecek.", en: "Time to take care of your daily routines, work life and health. Establishing order and improving your habits will do you good." },
    7: { tr: "İlişkiler ve ortaklıklar aynası önündesin. Partnerinle veya yakın arkadaşlarınla olan bağlarını dengelemek, iş birliklerine odaklanmak önem kazanıyor.", en: "In front of the mirror of relationships and partnerships. Balancing your bonds with your partner or close friends and focusing on collaborations becomes important." },
    8: { tr: "Dönüşüm, ortak kaynaklar ve derin tutkular gündemde. Korkularınla yüzleşmek ve hayatındaki fazlalıklardan arınmak için güçlü bir enerjin var.", en: "Transformation, shared resources and deep passions are on the agenda. A powerful energy to face your fears and purify yourself from excesses in your life." },
    9: { tr: "Ufuklarını genişletme vaktindesin. Eğitim, seyahat veya felsefi konularla ilgilenebilir, hayata daha geniş bir pencereden bakabilirsin.", en: "Time to expand your horizons. You can engage with education, travel or philosophical topics, and look at life from a broader perspective." },
    10: { tr: "Kariyer ve toplumsal statünle ilgili parladığın bir dönemdesin. Hedeflerine odaklanabilir, başarılarınla dikkat çekebilirsin.", en: "A period when you shine regarding career and social status. You can focus on your goals and attract attention with your achievements." },
    11: { tr: "Sosyal çevre, arkadaşlıklar ve gelecek planları aktifleşiyor. Gruplar içinde aktif rol alabilir, hayallerine bir adım daha yaklaşabilirsin.", en: "Social circle, friendships and future plans are becoming active. You can take an active role in groups and get one step closer to your dreams." },
    12: { tr: "Geri çekilme, dinlenme ve ruhsal arınma dönemindesin. Bilinçaltını temizlemek, meditasyon yapmak ve iç huzurunu bulmak için ideal bir zaman.", en: "A period of withdrawal, rest and spiritual purification. Ideal for cleansing your subconscious, meditating and finding inner peace." }
  },
  "Ay": {
    1: { tr: "Duyguların çok yoğun ve dışa dönük. Hassasiyetin artabilir, sezgilerine güvenerek hareket etmek isteyebilirsin.", en: "Your emotions are very intense and outward. Your sensitivity may increase, and you may want to act by trusting your intuition." },
    2: { tr: "Maddi konularda kendini güvende hissetme ihtiyacın artıyor. Duygusal huzuru sahiplendiğin değerlerde bulabilirsin.", en: "The need to feel secure in material matters is increasing. You can find emotional peace in the values you own." },
    3: { tr: "Zihnin ve duyguların iç içe geçmiş durumda. İletişim kurarken daha empatik olabilir, yakın çevrendeki insanların duygusal ihtiyaçlarına odaklanabilirsin.", en: "Your mind and emotions are intertwined. You can be more empathetic when communicating and focus on the emotional needs of people in your close circle." },
    4: { tr: "Ait olma ihtiyacın dorukta. Ailenle vakit geçirmek ve evinde huzurlu bir köşe yaratmak ruhuna iyi gelecek.", en: "Your need to belong is at its peak. Spending time with your family and creating a peaceful corner in your home will be good for your soul." },
    5: { tr: "Duygularını yaratıcı yollarla ifade etmek isteyebilirsin. Aşkta daha romantik ve çocuksu bir enerji hakim olabilir.", en: "You may want to express your emotions in creative ways. A more romantic and childlike energy may dominate in love." },
    6: { tr: "Hizmet etme ve başkalarına yardımcı olma isteğin ön planda. Küçük ayrıntılarla ilgilenmek seni duygusal olarak rahatlatabilir.", en: "The desire to serve and help others is in the foreground. Dealing with small details can emotionally comfort you." },
    7: { tr: "İlişkilerinde duygusal denge arıyorsun. Sevdiklerinden destek görmek ve onlarla derin bağlar kurmak bugünlerde çok önemli.", en: "You're looking for emotional balance in your relationships. Getting support from loved ones and building deep connections with them is very important these days." },
    8: { tr: "Derin duygular ve gizemli konular seni çekiyor. Duygusal krizleri aşmak ve yenilenmek için sezgilerin rehberin olsun.", en: "Deep emotions and mysterious subjects attract you. Let your intuition guide you to overcome emotional crises and renew yourself." },
    9: { tr: "Ruhsal olarak özgürleşme arzun var. Yeni bakış açıları kazanmak ve inançlarını sorgulamak sana huzur verebilir.", en: "Desire for spiritual liberation. Gaining new perspectives and questioning your beliefs can bring you peace." },
    10: { tr: "Duygularını profesyonel hayatına yansıtabilirsin. Toplum önündeki imajın ve kariyerin duygusal motivasyonunla şekilleniyor.", en: "You can reflect your emotions in your professional life. Your public image and career are shaped by your emotional motivation." },
    11: { tr: "Arkadaşlıklarında duygusal paylaşımlar artıyor. Geleceğe dair umutların seni heyecanlandırabilir.", en: "Emotional sharing in your friendships is increasing. Your hopes for the future can excite you." },
    12: { tr: "Yalnız kalmak ve iç dünyana dalmak isteyebilirsin. Rüyaların rehberlik edebilir, spiritüel çalışmalar için çok uygun bir süreçtesin.", en: "You may want to be alone and dive into your inner world. Your dreams can guide, very suitable for spiritual work." }
  },
  "Merkür": {
    1: { tr: "Zihnin çok aktif, fikirlerini paylaşmak için sabırsızlanıyorsun. Kendini ifade etme yeteneğin parlıyor.", en: "Your mind is very active, you're eager to share your ideas. Your ability to express yourself is shining." },
    2: { tr: "Finansal planlamalar ve bütçe konuları zihnini meşgul edebilir. Yeni gelir kapıları için stratejiler geliştirebilirsin.", en: "Financial planning and budget issues may occupy your mind. You can develop strategies for new income sources." },
    3: { tr: "İletişim trafiğin artıyor. Kısa seyahatler, eğitimler ve yazışmalar için çok hareketli bir dönemdesin.", en: "Your communication traffic is increasing. A very active period for short trips, trainings and correspondence." },
    4: { tr: "Aile içi iletişim ve evle ilgili kararlar ön planda. Geçmişi yad etmek veya evdeki düzeni konuşmak isteyebilirsin.", en: "Family communication and home-related decisions are in the foreground. You may want to reminisce about the past or discuss the order at home." },
    5: { tr: "Yaratıcı fikirler havada uçuşuyor! Hobilerin veya aşk hayatınla ilgili zihinsel olarak çok aktif ve oyuncu bir enerjin var.", en: "Creative ideas are flying around! You have a very active and playful mental energy regarding your hobbies or love life." },
    6: { tr: "İş yerindeki detaylar ve günlük iş akışı zihnini yorabilir. Liste yapmak ve planlı hareket etmek seni rahatlatacaktır.", en: "Details at work and daily workflow may tire your mind. Making lists and acting planned will relax you." },
    7: { tr: "İlişkilerde diyalog kurma zamanındasın. Partnerinle veya ortağınla önemli konuları masaya yatırabilir, anlaşmalar yapabilirsin.", en: "Time for dialogue in relationships. You can put important issues on the table with your partner or associate and make agreements." },
    8: { tr: "Derin ve araştırmacı bir zihin yapısındasın. Gizemli konuları çözmek, finansal stratejiler kurmak için ideal bir zaman.", en: "A deep and investigative mind structure. An ideal time to solve mysterious issues and build financial strategies." },
    9: { tr: "Yeni şeyler öğrenme ve felsefi tartışmalar yapma isteğin var. Uzak yerlerle ilgili haberler alabilir veya eğitim planlayabilirsin.", en: "Desire to learn new things and have philosophical discussions. You may receive news about distant places or plan education." },
    10: { tr: "Kariyerindeki hedeflerin üzerine konuşma ve plan yapma vaktindesin. Otorite figürleriyle iletişim kurmak için destekleyici bir enerji var.", en: "Time to talk and plan about your career goals. A supportive energy for communicating with authority figures." },
    11: { tr: "Arkadaşlarınla fikir alışverişi yapmak ve geleceğini planlamak seni heyecanlandırıyor. Sosyal projelerde aktif olabilirsin.", en: "Exchanging ideas with friends and planning your future excites you. You can be active in social projects." },
    12: { tr: "Zihnin biraz karışık veya içe dönük olabilir. Yazı yazmak veya günlük tutmak bilinçaltındaki fikirleri açığa çıkarabilir.", en: "Your mind may be a bit confused or introverted. Writing or keeping a journal can reveal subconscious ideas." }
  },
  "Venüs": {
    1: { tr: "Çekiciliğinin ve ışıltının arttığı bir dönemdesin. Kendini sevmek, stilinde değişiklikler yapmak ve hayattan keyif almak için harika.", en: "A period when your attractiveness and sparkle increase. Great for loving yourself, making changes in your style and enjoying life." },
    2: { tr: "Maddi kazançlar ve konfor arayışı içindesin. Kendini şımartmak isteyebilir, değerli eşyalara ilgi duyabilirsin.", en: "Search for material gains and comfort. You may want to pamper yourself and be interested in valuable items." },
    3: { tr: "Yakın çevrenle olan ilişkilerinde uyum ve güzellik hakim. Tatlı dilinle herkesi etkileyebilir, keyifli sohbetler edebilirsin.", en: "Harmony and beauty dominate in your relationships with your close environment. You can impress everyone with your sweet talk and have pleasant conversations." },
    4: { tr: "Evinde huzur ve estetik arıyorsun. Ailenle keyifli vakit geçirmek veya evini güzelleştirmek ruhuna iyi gelecek.", en: "You're looking for peace and aesthetics in your home. Spending quality time with your family or beautifying your home will be good for your soul." },
    5: { tr: "Aşk, romantizm ve yaratıcılık dorukta! Hayatın eğlenceli yanlarına odaklanabilir, flörtöz ve neşeli hissedebilirsin.", en: "Love, romance and creativity at their peak! You can focus on the fun sides of life, feel flirtatious and cheerful." },
    6: { tr: "İş ortamında uyum ve keyifli bir iş akışı var. Sağlığına ve öz bakımına daha fazla özen göstermek isteyebilirsin.", en: "Harmony and pleasant workflow in the work environment. You may want to pay more attention to your health and self-care." },
    7: { tr: "İlişkilerde denge, uyum ve sevgi zamanı. Mevcut ilişkilerini güçlendirmek veya yeni bir aşka yelken açmak için çok destekleyici bir süreç.", en: "Time for balance, harmony and love in relationships. Very supportive for strengthening existing relationships or setting sail for a new love." },
    8: { tr: "Tutku ve derin duygusal bağlar ön planda. Maddi ortaklıklarda veya paylaşılan değerlerde şanslı bir dönem olabilir.", en: "Passion and deep emotional bonds are in the foreground. It may be a lucky period in material partnerships or shared values." },
    9: { tr: "Uzak yerlerden gelen aşk veya yabancı kültürlerle ilgili keyifli gelişmeler var. Hayata olan inancın ve sevgin artıyor.", en: "Love from distant places or pleasant developments related to foreign cultures. Your faith in life and love is increasing." },
    10: { tr: "Kariyerinde parladığın ve takdir edildiğin bir dönemdesin. Otorite figürleriyle ilişkilerin güzelleşebilir, başarıların keyif verebilir.", en: "A period when you shine and are appreciated in your career. Your relationships with authority figures may improve, your achievements may be enjoyable." },
    11: { tr: "Sosyal çevrende popülerliğin artıyor. Arkadaşlarınla keyifli etkinliklere katılabilir, hayallerine sevgiyle odaklanabilirsin.", en: "Your popularity in your social circle is increasing. You can participate in pleasant activities with friends and focus on your dreams with love." },
    12: { tr: "Ruhsal olarak kendini sevme ve şifalanma vaktindesin. Gizli kalmış güzellikleri keşfedebilir, iç dünyanda huzuru bulabilirsin.", en: "Time for spiritual self-love and healing. You can discover hidden beauties and find peace in your inner world." }
  },
  "Mars": {
    1: { tr: "Enerjin ve motivasyonun çok yüksek! Harekete geçmek, liderlik etmek ve hedeflerine odaklanmak için sabırsızlanıyorsun.", en: "Your energy and motivation are very high! You're eager to take action, lead and focus on your goals." },
    2: { tr: "Maddi kaynaklarını artırmak için büyük bir çaba içinde olabilirsin. Harcamalar konusunda dürtüsel davranmamaya dikkat etmelisin.", en: "You may be making a big effort to increase your material resources. Be careful not to act impulsively about spending." },
    3: { tr: "Zihinsel olarak çok iddialı ve hızlısın. Tartışmalara açık bir enerjin var, kelimelerini seçerken dikkatli olmalısın.", en: "You're mentally very assertive and fast. An energy open to arguments, you should be careful when choosing your words." },
    4: { tr: "Ev ve aile içindeki hareketlilik artıyor. Tadilat işleri veya ailevi konularda mücadele etmen gereken durumlar oluşabilir.", en: "Activity within home and family is increasing. Situations may arise where you need to struggle with renovation work or family issues." },
    5: { tr: "Aşkta ve yaratıcılıkta tutkulu bir dönemdesin. Risk almaktan çekinmeyebilir, enerjini hobilerine yönlendirebilirsin.", en: "A passionate period in love and creativity. You may not hesitate to take risks and channel your energy into your hobbies." },
    6: { tr: "İş hayatında çok çalışman gereken, tempolu bir süreçtesin. Sağlığına dikkat etmeli, aşırı yorgunluktan kaçınmalısın.", en: "A fast-paced process where you need to work hard in business life. You should pay attention to your health and avoid excessive fatigue." },
    7: { tr: "İlişkilerde gerginlik veya rekabet söz konusu olabilir. Orta yolu bulmak ve enerjini iş birliğine yönlendirmek önemli olacak.", en: "There may be tension or competition in relationships. Finding middle ground and channeling your energy into cooperation is important." },
    8: { tr: "Derin değişimler ve dönüşümler için büyük bir güce sahipsin. Finansal krizleri yönetmek veya korkularınla yüzleşmek için cesaretin var.", en: "Great power for deep changes and transformations. You have the courage to manage financial crises or face your fears." },
    9: { tr: "İnandığın değerler için savaşma vaktindesin. Eğitim veya seyahat planlarında aksiyon alabilir, maceracı hissedebilirsin.", en: "Time to fight for the values you believe in. You can take action in education or travel plans and feel adventurous." },
    10: { tr: "Kariyerinde hırslı ve azimlisin. Hedeflerine ulaşmak için çok çalışabilir, otorite figürleriyle mücadele edebilirsin.", en: "You're ambitious and determined in your career. You can work hard to reach your goals and struggle with authority figures." },
    11: { tr: "Gelecek planların için harekete geçme zamanı. Sosyal çevrende liderlik yapabilir, gruplar içinde enerjinle dikkat çekebilirsin.", en: "Time to take action for your future plans. You can lead in your social circle and attract attention with your energy within groups." },
    12: { tr: "Gizli düşmanlıklara veya içsel huzursuzluklara dikkat etmelisin. Enerjini ruhsal çalışmalara veya yardım faaliyetlerine yönlendirmek iyi gelebilir.", en: "Beware of hidden enmities or inner unrest. Channeling your energy into spiritual work or charity activities may be good." }
  },
  "Jüpiter": {
    1: { tr: "Büyük bir genişleme ve şans dönemindesin. Özgüvenin artıyor, hayata karşı daha iyimser ve cesur adımlar atabilirsin.", en: "A period of great expansion and luck. Your confidence is increasing, you can take more optimistic and bold steps towards life." },
    2: { tr: "Maddi bolluk ve bereket kapıları açılıyor. Gelirlerini artırmak ve değerlerini büyütmek için fırsatlarla karşılaşabilirsin.", en: "Doors of material abundance and prosperity are opening. You may encounter opportunities to increase your income and grow your values." },
    3: { tr: "Öğrenme ve iletişim alanında büyük fırsatların var. Yeni bir eğitime başlamak veya fikirlerini geniş kitlelere yaymak için ideal bir zaman.", en: "Great opportunities in learning and communication. Ideal for starting a new education or spreading your ideas to large audiences." },
    4: { tr: "Aile ve ev hayatında huzur, bolluk ve neşe var. Evini büyütmek veya aile bağlarını güçlendirmek için çok destekleyici bir enerji.", en: "Peace, abundance and joy in family and home life. Very supportive for expanding your home or strengthening family ties." },
    5: { tr: "Aşk, yaratıcılık ve çocuklarla ilgili konularda büyük şansın var. Hayattan aldığın keyif artıyor, yaratıcı projelerin parlayabilir.", en: "Great luck in matters of love, creativity and children. Your enjoyment of life is increasing, your creative projects may shine." },
    6: { tr: "İş hayatında kolaylıklar ve sağlıkta iyileşme var. Günlük rutinlerini daha verimli hale getirebilir, çalışma ortamında destek görebilirsin.", en: "Ease in business life and improvement in health. You can make your daily routines more efficient and get support in the work environment." },
    7: { tr: "İlişkilerde ve ortaklıklarda büyüme ve şans zamanı. Evlilik veya önemli iş birlikleri için kapıların açıldığı bir dönemdesin.", en: "Growth and luck in relationships and partnerships. A period when doors open for marriage or important collaborations." },
    8: { tr: "Ortaklaşa kazanımlarda ve ruhsal dönüşümde derin bir genişleme var. Miras veya yatırım konularında şanslı olabilirsin.", en: "A deep expansion in joint gains and spiritual transformation. You may be lucky in inheritance or investment matters." },
    9: { tr: "Hayata bakış açını değiştirecek büyük fırsatlara sahipsin. Uzun seyahatler, yüksek eğitim ve felsefi derinlik kazanma vakti.", en: "Great opportunities that will change your perspective on life. Time for long journeys, higher education and gaining philosophical depth." },
    10: { tr: "Kariyerinde zirveye giden yol açılıyor. Toplum önündeki statün artabilir, başarılarınla büyük takdir toplayabilirsin.", en: "The path to the top in your career is opening. Your public status may increase, you may gather great appreciation with your achievements." },
    11: { tr: "Sosyal çevren genişliyor, hayallerine ulaşmanı sağlayacak yeni insanlarla tanışabilirsin. Geleceğe güvenle bakma vaktindesin.", en: "Your social circle is expanding, you may meet new people who will help you reach your dreams. Time to look to the future with confidence." },
    12: { tr: "Ruhsal koruma ve içsel zenginlik içindesin. Bilinçaltındaki blokajların çözüldüğü ve ilahi bir desteği hissettiğin bir dönem.", en: "Spiritual protection and inner wealth. A period when your subconscious blockages are resolved and you feel divine support." }
  },
  "Satürn": {
    1: { tr: "Kişisel disiplin ve sorumluluk alma vaktindesin. Kendini yeniden yapılandırıyor, daha ciddi ve olgun kararlar alıyorsun.", en: "Time for personal discipline and taking responsibility. You're restructuring yourself, making more serious and mature decisions." },
    2: { tr: "Maddi konularda tutumluluk ve uzun vadeli planlama dönemindesin. Kaynaklarını korumayı ve sabırla inşa etmeyi öğreniyorsun.", en: "A period of frugality and long-term planning in material matters. You're learning to protect your resources and build with patience." },
    3: { tr: "İletişimde ve yakın çevrende sınırlar çizme zamanındasın. Ciddi eğitimler veya zihinsel odaklanma gerektiren işler gündemde.", en: "Time to draw boundaries in communication and close environment. Serious trainings or jobs requiring mental focus are on the agenda." },
    4: { tr: "Ailevi sorumluluklar ve köklerle ilgili sınavların var. Ev hayatında düzen kurmak ve geçmişle yüzleşmek seni güçlendirecek.", en: "Family responsibilities and tests related to roots. Establishing order in home life and confronting the past will strengthen you." },
    5: { tr: "Aşkta ve yaratıcılıkta ciddiyet zamanı. Hobilerini disiplinle ele alabilir, ilişkilerinde daha gerçekçi beklentiler içine girebilirsin.", en: "Seriousness in love and creativity. You can approach your hobbies with discipline and have more realistic expectations in relationships." },
    6: { tr: "İş hayatında çok çalışma ve verimlilik sınavındasın. Sağlığına düzen getirmeli ve rutinlerini sabırla yönetmelisin.", en: "Hard work and efficiency test in business life. You should bring order to your health and manage your routines with patience." },
    7: { tr: "İlişkilerde test edilme dönemindesin. Gerçek bağları korumak, sorumluluk almak ve ilişkilerini sağlam temellere oturtmak önemli.", en: "A period of testing in relationships. Protecting real bonds, taking responsibility and putting relationships on solid foundations is important." },
    8: { tr: "Finansal paylaşımlarda ve derin dönüşümlerde kısıtlanmalar veya sorumluluklar var. Maddi korkularınla yüzleşip onları aşma vakti.", en: "Restrictions or responsibilities in financial sharing and deep transformations. Time to face and overcome your material fears." },
    9: { tr: "İnançlarını ve hayata bakışını sağlamlaştırma zamanındasın. Uzun vadeli eğitimler veya felsefi bir olgunluk kazanma süreci.", en: "Time to solidify your beliefs and outlook on life. Long-term trainings or a process of gaining philosophical maturity." },
    10: { tr: "Kariyerinde zirveye ulaşmak için sabırla çalışma vaktindesin. Otorite figürleriyle ilişkilerinde sorumlulukların artabilir.", en: "Time to work patiently to reach the top in your career. Your responsibilities in relationships with authority figures may increase." },
    11: { tr: "Sosyal çevrende gerçek dostları ayıklama ve gelecek planlarını disiplinle ele alma sürecindesin. Toplumsal sorumlulukların artabilir.", en: "Process of sorting out true friends in your social circle and handling future plans with discipline. Your social responsibilities may increase." },
    12: { tr: "Bilinçaltındaki korkularla yüzleşme ve ruhsal bir arınma zamanı. Yalnızlığın getirdiği olgunlukla iç dünyanı yapılandırma vakti.", en: "Confronting subconscious fears and spiritual purification. Time to structure your inner world with the maturity brought by solitude." }
  },
  "Uranüs": {
    1: { tr: "Kişiliğinde ve dış görünüşünde ani, devrim niteliğinde değişimler var. Özgürleşme arzun çok yüksek, herkesi şaşırtabilirsin.", en: "Sudden, revolutionary changes in your personality and appearance. Your desire for liberation is very high, you can surprise everyone." },
    2: { tr: "Maddi kaynaklarında beklenmedik dalgalanmalar veya yeni gelir kapıları var. Değer algın tamamen değişebilir.", en: "Unexpected fluctuations in your material resources or new income sources. Your perception of value may change completely." },
    3: { tr: "Zihninde şimşekler çakıyor! Alışılmadık fikirler, ani haberler ve yakın çevrende sürpriz gelişmeler yaşanabilir.", en: "Lightning in your mind! Unusual ideas, sudden news and surprise developments in your close environment may occur." },
    4: { tr: "Ev ve aile hayatında beklenmedik değişimler var. Taşınma veya aile içindeki eski kalıpların yıkılması söz konusu olabilir.", en: "Unexpected changes in home and family life. Moving or breaking old patterns within the family may be involved." },
    5: { tr: "Aşkta heyecan verici ve sıra dışı gelişmeler var. Yaratıcılığında sınır tanımayan, özgün bir döneme giriyorsun.", en: "Exciting and extraordinary developments in love. You're entering an original period where your creativity knows no bounds." },
    6: { tr: "İş hayatında ve günlük rutinlerinde ani değişiklikler var. Teknolojik yeniliklere adapte olabilir veya çalışma şeklini değiştirebilirsin.", en: "Sudden changes in business life and daily routines. You may adapt to technological innovations or change the way you work." },
    7: { tr: "İlişkilerde ani başlangıçlar veya bitişler var. Özgürlük ihtiyacın partnerinle olan bağlarını yeniden tanımlamana neden olabilir.", en: "Sudden beginnings or endings in relationships. Your need for freedom may cause you to redefine your bonds with your partner." },
    8: { tr: "Ortak finansal konularda veya derin duygusal krizlerde beklenmedik şifalanmalar ve değişimler var. Hayata bakışın kökten değişebilir.", en: "Unexpected healings and changes in joint financial matters or deep emotional crises. Your outlook on life may change radically." },
    9: { tr: "İnançlarında ve hayata bakışında ani aydınlanmalar var. Alışılmadık seyahatler veya farklı kültürlerle tanışma vakti.", en: "Sudden enlightenments in your beliefs and outlook on life. Time for unusual travels or meeting different cultures." },
    10: { tr: "Kariyerinde beklenmedik bir yön değişikliği veya teknolojik bir atılım var. Toplumsal imajın bir anda değişebilir.", en: "An unexpected change of direction or technological breakthrough in your career. Your public image may change suddenly." },
    11: { tr: "Sosyal çevrende ve arkadaşlıklarında radikal değişimler var. Gelecek hayallerin bir anda bambaşka bir boyuta taşınabilir.", en: "Radical changes in your social circle and friendships. Your future dreams may suddenly move to a completely different dimension." },
    12: { tr: "Bilinçaltında ani uyanışlar ve ruhsal özgürleşme var. Rüyaların veya sezgilerin sana şok edici gerçekler fısıldayabilir.", en: "Sudden awakenings in the subconscious and spiritual liberation. Your dreams or intuition may whisper shocking truths to you." }
  },
  "Neptün": {
    1: { tr: "Sezgilerinin ve hayal gücünün arttığı, daha hassas ve ruhsal hissettiğin bir dönemdesin. Kimliğinde bir belirsizlik veya gizem oluşabilir.", en: "A period when your intuition and imagination increase, you feel more sensitive and spiritual. Uncertainty or mystery may form in your identity." },
    2: { tr: "Maddi konularda bulanıklık veya idealist yaklaşımların var. Harcamalarında dikkatli olmalı, hayallerin peşinden koşarken gerçekleri unutmamalısın.", en: "Blur or idealistic approaches in material matters. You should be careful about your spending and not forget reality while chasing your dreams." },
    3: { tr: "Zihinsel olarak daha yaratıcı ve hayalperestsin. İletişimde yanlış anlaşılmalar olabilir, ancak sanatsal yeteneklerin parlıyor.", en: "You're mentally more creative and dreamy. There may be misunderstandings in communication, but your artistic talents are shining." },
    4: { tr: "Aile ve ev hayatında duygusal bir derinlik veya bazı belirsizlikler var. Evinde huzur ve ruhsal bir liman arıyorsun.", en: "Emotional depth or some uncertainties in family and home life. You're looking for peace and a spiritual harbor in your home." },
    5: { tr: "Aşkta romantizm ve idealizm dorukta. Sanatsal projelere ilham akıyor, ancak flörtlerinde gerçekçi olmayı unutmamalısın.", en: "Romance and idealism at their peak in love. Inspiration flows to artistic projects, but you shouldn't forget to be realistic in your flirtations." },
    6: { tr: "İş ortamında biraz dağınıklık veya hizmet etme arzusu var. Sağlığına daha şefkatli yaklaşmalı, alternatif yöntemlere ilgi duyabilirsin.", en: "Some disorganization in the work environment or desire to serve. You should approach your health more compassionately and may be interested in alternative methods." },
    7: { tr: "İlişkilerde aşırı fedakarlık veya idealize etme eğilimin var. Partnerinle ruhsal bir bağ kurmak istiyorsun, ancak sınırlarını korumalısın.", en: "Tendency for excessive sacrifice or idealization in relationships. You want to establish a spiritual bond with your partner, but you should protect your boundaries." },
    8: { tr: "Derin duygusal paylaşımlarda ve ortak kaynaklarda spiritüel bir dönüşüm var. Maddi konularda daha sezgisel hareket edebilirsin.", en: "Spiritual transformation in deep emotional sharing and shared resources. You can act more intuitively in material matters." },
    9: { tr: "Hayata karşı daha ruhsal ve evrensel bir bakış açısına sahipsin. Uzak yerlere özlem duyabilir, mistik konularla ilgilenebilirsin.", en: "A more spiritual and universal perspective towards life. You may long for distant places and be interested in mystical topics." },
    10: { tr: "Kariyerinde hayallerini gerçekleştirme arzun var. Toplum önünde daha yaratıcı ve vizyoner bir imaj çizebilirsin.", en: "Desire to realize your dreams in your career. You can draw a more creative and visionary image in public." },
    11: { tr: "Sosyal çevrende idealleri olan insanlarla bir araya gelme vaktindesin. Arkadaşlıklarında ruhsal paylaşımlar artıyor.", en: "Time to gather with people who have ideals in your social circle. Spiritual sharing in your friendships is increasing." },
    12: { tr: "Bilinçaltının derinliklerine dalmak ve ilahi bir huzur bulmak için harika bir dönem. Meditasyon ve rüyalar rehberin olacak.", en: "Great for diving into the depths of your subconscious and finding divine peace. Meditation and dreams will be your guide." }
  },
  "Plüton": {
    1: { tr: "Kişiliğinde ve hayatında köklü bir dönüşüm sürecindesin. Gücünü yeniden keşfediyor, eski benliğini geride bırakıyorsun.", en: "A process of radical transformation in your personality and life. You're rediscovering your power and leaving your old self behind." },
    2: { tr: "Maddi değerlerinde ve özsaygında derin bir değişim var. Finansal olarak güçlenmek veya tamamen yeni bir sistem kurmak üzeresin.", en: "A deep change in your material values and self-esteem. You're about to become financially stronger or establish a completely new system." },
    3: { tr: "Düşünce yapın ve iletişim şeklin kökten değişiyor. Gizli kalmış bilgileri açığa çıkarabilir, sözlerinle büyük etki yaratabilirsin.", en: "Your way of thinking and communication style is radically changing. You can reveal hidden information and create a big impact with your words." },
    4: { tr: "Ev, aile ve en derin köklerinle ilgili büyük bir dönüşüm var. Geçmişteki travmaları şifalandırmak ve temellerini yeniden atmak için güçlü bir enerji.", en: "A major transformation regarding home, family and your deepest roots. A powerful energy for healing past traumas and laying your foundations again." },
    5: { tr: "Aşkta ve yaratıcılıkta derin, tutkulu ve dönüştürücü bir süreçtesin. Hobilerin veya aşk hayatın hayatında büyük bir iz bırakabilir.", en: "A deep, passionate and transformative process in love and creativity. Your hobbies or love life can leave a big mark on your life." },
    6: { tr: "İş hayatında ve günlük rutinlerinde büyük bir değişim ve güçlenme sürecindesin. Sağlığını kökten iyileştirmek için iraden çok güçlü.", en: "A process of great change and empowerment in business life and daily routines. Your will is very strong for radically improving your health." },
    7: { tr: "İlişkilerinde güç savaşları veya derin dönüşümler var. Mevcut bağların tamamen değişebilir veya hayatına çok etkileyici biri girebilir.", en: "Power struggles or deep transformations in your relationships. Your existing bonds may change completely or someone very impressive may enter your life." },
    8: { tr: "Dönüşümün kalbindesin. Finansal paylaşımlarda ve ruhsal derinlikte büyük bir güç ve yenilenme vakti.", en: "You're in the heart of transformation. A time of great power and renewal in financial sharing and spiritual depth." },
    9: { tr: "Hayata dair inançlarının ve dünya görüşünün tamamen değiştiği bir dönemdesin. Derin araştırmalar ve ruhsal yolculuklar seni bekliyor.", en: "A period when your beliefs about life and worldview completely change. Deep research and spiritual journeys await you." },
    10: { tr: "Kariyerinde büyük bir güç ve otorite kazanma veya tamamen yön değiştirme sürecindesin. Toplumsal statün kökten değişebilir.", en: "A process of gaining great power and authority in your career or completely changing direction. Your social status may change radically." },
    11: { tr: "Sosyal çevrende ve gelecek planlarında büyük bir dönüşüm var. Gruplar içinde büyük bir etki yaratabilir, hayallerine bir adım daha yaklaşabilirsin.", en: "A major transformation in your social circle and future plans. You can create a big impact within groups and get one step closer to your dreams." },
    12: { tr: "Bilinçaltındaki en karanlık korkularınla yüzleşip onları dönüştürme vaktindesin. Ruhsal olarak küllerinden yeniden doğuyorsun.", en: "Time to face and transform your darkest subconscious fears. You're spiritually rising from your ashes." }
  }
};

const RETROGRADE_PLANET_WARNINGS: Record<string, { tr: string; en: string }> = {
  "Merkür": { tr: "Merkür retrosu iletişimde aksaklıklar, teknolojik sorunlar ve geçmişten gelen meseleleri tetikleyebilir. Yeni kararlar alırken iki kez düşünmelisin.", en: "Mercury retrograde can trigger communication disruptions, technological problems and issues from the past. Think twice when making new decisions." },
  "Venüs": { tr: "Venüs retrosu ilişkilerde ve finansal konularda eski yaraları deşebilir. Değer yargılarını sorguladığın bir dönem, estetik müdahalelerden kaçınmalısın.", en: "Venus retrograde can reopen old wounds in relationships and financial matters. A period of questioning your values, you should avoid aesthetic interventions." },
  "Mars": { tr: "Mars retrosu enerjini içe döndürebilir, öfke patlamalarına ve motivasyon düşüklüğüne neden olabilir. Sabırlı olmalı ve pasif-agresif tutumlardan uzak durmalısın.", en: "Mars retrograde can turn your energy inward, causing anger outbursts and low motivation. You should be patient and avoid passive-aggressive attitudes." },
  "Jüpiter": { tr: "Jüpiter retrosu içsel bir büyüme fırsatı sunsa da, dış dünyadaki şans faktörünü kısıtlayabilir. Büyük riskler almak yerine mevcut durumunu gözden geçirmelisin.", en: "Although Jupiter retrograde offers an opportunity for inner growth, it can limit the luck factor in the outside world. Instead of taking big risks, you should review your current situation." },
  "Satürn": { tr: "Satürn retrosu sorumluluklarını ve kurduğun yapıları test eder. Disiplinsizliğin bedelini ödetebilir, geçmişteki hatalarınla yüzleşmen gerekebilir.", en: "Saturn retrograde tests your responsibilities and the structures you've built. It can make you pay for your indiscipline, you may need to face your past mistakes." },
  "Uranüs": { tr: "Uranüs retrosu ani değişimlerin hızını yavaşlatır ancak içsel huzursuzluğu artırabilir. İsyan etmek yerine içsel özgürlüğüne odaklanmalısın.", en: "Uranus retrograde slows down sudden changes but can increase inner unrest. Instead of rebelling, you should focus on your inner freedom." },
  "Neptün": { tr: "Neptün retrosu illüzyonları bozar ve gerçeklerle yüzleşmeni sağlar. Hayal kırıklıkları yaşatabilir, kurban psikolojisine girmemeye dikkat et.", en: "Neptune retrograde breaks illusions and makes you face reality. It can cause disappointments, be careful not to fall into victim mentality." },
  "Plüton": { tr: "Plüton retrosu güç savaşlarını ve derin krizleri tetikleyebilir. Kontrol takıntın seni zorlayabilir, dönüşüm için bırakman gerekenleri serbest bırakmalısın.", en: "Pluto retrograde can trigger power struggles and deep crises. Your control obsession can challenge you, you should release what you need to let go for transformation." }
};

export function getPlanetTransitInterpretation(planet: string, house: number | null, sign: string, effect: "positive" | "negative" | "neutral" = "neutral", isRetrograde: boolean = false, language: 'tr' | 'en' = 'tr'): string {
  if (house === null) {
    let base = language === 'en' 
      ? `${planet} is currently moving through ${sign}. This energy generally affects the collective consciousness.`
      : `${planet} şu an ${sign} burcunda süzülüyor. Bu enerji genel olarak kolektif bilinci etkiliyor.`;
    if (isRetrograde) {
      base += language === 'en' 
        ? ` The planet's retrograde motion may cause these effects to be felt in a more internal and questioning dimension.`
        : ` Gezegenin geri hareketi (retro), bu etkilerin daha içsel ve sorgulayıcı bir boyutta hissedilmesine neden olabilir.`;
    }
    return base;
  }

  const houseLabel = formatHouseNumber(house, language);
  const houseInterpData = PLANET_HOUSE_INTERPRETATIONS[planet]?.[house];
  if (!houseInterpData) {
    return language === 'en' 
      ? `${planet} is currently in ${houseLabel} and moving through ${sign}.`
      : `${planet} şu an ${houseLabel}'nde ve ${sign} burcunda ilerliyor.`;
  }

  const houseInterp = houseInterpData[language];
  let result = houseInterp;
  
  if (isRetrograde) {
    const retroWarning = RETROGRADE_PLANET_WARNINGS[planet];
    result = language === 'en' 
      ? `[RETRO] ${result} However, the planet's retrograde motion may bring up issues from the past in these matters. ${retroWarning?.en || ""}`
      : `[RETRO] ${result} Ancak gezegenin retro hareketi, bu konularda geçmişten gelen meseleleri tekrar gündeme getirebilir. ${retroWarning?.tr || ""}`;
  } else if (effect === "positive") {
    result = language === 'en' 
      ? `[POSITIVE] ${result} With this support from the sky, your luck is open, you can take steps with confidence.`
      : `[POZİTİF] ${result} Gökyüzünün bu desteğiyle şansın açık, adımlarını güvenle atabilirsin.`;
  } else if (effect === "negative") {
    result = language === 'en' 
      ? `[ATTENTION] ${result} This interaction may cause challenges in ${houseLabel} matters. You should be prepared for psychological struggles during this period. You should do inner work and avoid impulsive decisions to manage this tension.`
      : `[DİKKAT] ${result} Bu etkileşim, ${houseLabel} konularında zorluklar yaşamana neden olabilir. Bu dönemde psikolojik süreçlerdeki zorlanmalara karşı hazırlıklı olmalısın. Bu gerilimi yönetmek için içsel çalışma yapmalı ve fevri kararlardan kaçınmalısın.`;
  } else if (effect === "neutral") {
    result = language === 'en' 
      ? `${result} This interaction requires you to be careful in ${houseLabel} matters. During this period, you should take conscious steps to maintain balance and be cautious against possible fluctuations.`
      : `${result} Bu etkileşim, ${houseLabel} konularında dikkatli olmanı gerektirir. Bu dönemde dengeyi korumak için bilinçli adımlar atmalı ve olası dalgalanmalara karşı temkinli olmalısın.`;
  }
  
  return capitalize(result);
}

export function getMoonPhaseInterpretation(phase: string, house: number | null, sign: string, language: 'tr' | 'en' = 'tr'): string {
  const phaseNames: Record<string, { tr: string; en: string }> = {
    "new_moon": { tr: "Yeniay", en: "New Moon" },
    "waxing_crescent": { tr: "Büyüyen Hilal", en: "Waxing Crescent" },
    "first_quarter": { tr: "İlk Dördün", en: "First Quarter" },
    "waxing_gibbous": { tr: "Büyüyen Şişkin Ay", en: "Waxing Gibbous" },
    "full_moon": { tr: "Dolunay", en: "Full Moon" },
    "waning_gibbous": { tr: "Küçülen Şişkin Ay", en: "Waning Gibbous" },
    "last_quarter": { tr: "Son Dördün", en: "Last Quarter" },
    "waning_crescent": { tr: "Küçülen Hilal", en: "Waning Crescent" }
  };

  const phaseBaseMeaning: Record<string, { tr: string; en: string }> = {
    "new_moon": { tr: "yeni başlangıçlar ve niyetler için en güçlü zaman.", en: "the most powerful time for new beginnings and intentions." },
    "waxing_crescent": { tr: "adım atma ve planlarını eyleme dökme vakti.", en: "time to take steps and put your plans into action." },
    "first_quarter": { tr: "kararlılık ve engelleri aşma enerjisi hakim.", en: "determination and energy to overcome obstacles dominate." },
    "waxing_gibbous": { tr: "geliştirme ve son hazırlıkları yapma süreci.", en: "a process of development and making final preparations." },
    "full_moon": { tr: "hasat vakti, farkındalık ve duygusal doruk noktası.", en: "harvest time, awareness and emotional peak." },
    "waning_gibbous": { tr: "paylaşma, şükretme ve sonuçları değerlendirme zamanı.", en: "time for sharing, giving thanks and evaluating results." },
    "last_quarter": { tr: "bırakma, temizlenme ve içe dönüş vakti.", en: "time for letting go, cleansing and turning inward." },
    "waning_crescent": { tr: "dinlenme, teslimiyet ve bir döngünün sonu.", en: "rest, surrender and the end of a cycle." }
  };

  const name = phaseNames[phase]?.[language] || (language === 'en' ? "Moon Phase" : "Ay Fazı");
  const meaning = phaseBaseMeaning[phase]?.[language] || (language === 'en' ? "you're going through an emotional cycle." : "duygusal bir döngüden geçiyorsun.");

  let text = "";
  if (house === null) {
    text = language === 'en' 
      ? `${name} energy dominates the sky. ${capitalize(meaning)} Since the Moon is currently in ${sign}, we feel these effects at the collective level.`
      : `Gökyüzünde ${name} enerjisi hakim. ${capitalize(meaning)} Ay şu an ${sign} burcunda olduğu için bu etkileri kolektif düzeyde hissediyoruz.`;
  } else {
    const houseLabel = formatHouseNumber(house, language);
    text = language === 'en' 
      ? `${name} energy dominates the sky. ${capitalize(meaning)} Since the Moon is currently in ${houseLabel} and ${sign}, you may feel these effects more intensely especially in these life areas.`
      : `Gökyüzünde ${name} enerjisi hakim. ${capitalize(meaning)} Ay şu an senin ${houseLabel}'nde ve ${sign} burcunda olduğu için bu etkileri özellikle bu yaşam alanlarında daha yoğun hissedebilirsin.`;
  }

  return capitalize(text);
}

const PLANET_KEY_TO_TR_NAME: Record<string, string> = {
  "Sun": "Güneş",
  "Moon": "Ay",
  "Mercury": "Merkür",
  "Venus": "Venüs",
  "Mars": "Mars",
  "Jupiter": "Jüpiter",
  "Saturn": "Satürn",
  "Uranus": "Uranüs",
  "Neptune": "Neptün",
  "Pluto": "Plüton"
};

export function getPlanetSignAIInterpretation(planetKey: string, planetSign: string, isRetrograde: boolean = false, language: 'tr' | 'en' = 'tr') {
  const energy = PLANET_ENERGY[planetKey as any]?.[language] || "";
  const planetNameTr = PLANET_KEY_TO_TR_NAME[planetKey] || planetKey;
  
  const signKey = SIGN_TO_ENGLISH[planetSign] || planetSign;
  const interpretations = language === 'en' ? PLANET_SIGN_INTERPRETATIONS_EN : PLANET_SIGN_INTERPRETATIONS_TR;
  const comment = interpretations[planetKey]?.[signKey] || "";

  const elementEffects = getPlanetElementEffects(planetKey as PlanetKey, planetSign, language);
  const elements: Record<string, string> = {};
  for (const [element, data] of Object.entries(elementEffects)) {
    if (data && typeof data === 'object' && 'effect' in data) {
      elements[element] = data.effect;
    }
  }

  const retrogradeComment = isRetrograde 
    ? (language === 'tr' 
        ? `${planetNameTr} retrosu, ${energy} konularında geçmişe dönük bir gözden geçirme ve içsel bir hesaplaşma gerektiriyor. Aceleci kararlardan kaçınmalısın.`
        : `${planetKey} retrograde requires a retrospective review and internal reckoning in ${energy} matters. Avoid hasty decisions.`)
    : undefined;

  const retrogradeElements: Record<string, string> = isRetrograde ? {
    "Ateş": language === 'tr' ? "Eylem planlarını durdur ve stratejini gözden geçir." : "Stop action plans and review your strategy.",
    "Toprak": language === 'tr' ? "Maddi konularda eski hataları düzeltme fırsatı." : "Opportunity to correct old mistakes in material matters.",
    "Hava": language === 'tr' ? "İletişim kopukluklarına karşı sabırlı ol." : "Be patient against communication breakdowns.",
    "Su": language === 'tr' ? "Duygusal blokajları şifalandırma zamanı." : "Time to heal emotional blockages."
  } : {};

  return {
    comment,
    elements,
    retrogradeComment,
    retrogradeElements
  };
}

export function getMoonPhaseAIInterpretation(phase: string, language: 'tr' | 'en' = 'tr') {
  const comment = getMoonPhaseCosmicGuidance(phase, language);

  const moonPhaseEffects = getMoonPhaseElementEffects(phase, language);
  
  const elements: Record<string, string> = {};
  if (moonPhaseEffects) {
    for (const [element, data] of Object.entries(moonPhaseEffects)) {
      if (data && typeof data === 'object' && 'effect' in data) {
        elements[element] = data.effect;
      }
    }
  } else {
    elements["Ateş"] = language === 'tr' ? "Duygusal enerjini yaratıcı projelere dönüştür." : "Transform your emotional energy into creative projects.";
    elements["Toprak"] = language === 'tr' ? "Güvende hissetmek için somut adımlar at." : "Take concrete steps to feel secure.";
    elements["Hava"] = language === 'tr' ? "Duygularını paylaşarak hafifle." : "Lighten up by sharing your feelings.";
    elements["Su"] = language === 'tr' ? "Sezgilerinin sesini dinle ve akışta kal." : "Listen to your intuition and stay in the flow.";
  }

  return {
    comment,
    elements
  };
}
