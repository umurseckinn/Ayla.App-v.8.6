export type EffectType = 'positive' | 'neutral' | 'negative';

export interface PlanetDailyEffect {
  positive: string;
  neutral: string;
  negative: string;
}

export const PLANET_DAILY_EFFECTS_TR: Record<string, PlanetDailyEffect> = {
  Sun: {
    positive: "Özgüveninizin tavan yaptığı, kendinizi parlak bir şekilde ifade ettiğiniz bir gün geçiriyorsunuz. Liderlik vasıflarınızla çevrenizi etkilerken, fiziksel enerjiniz de hedeflerinizi gerçekleştirmek için size tam destek veriyor.",
    neutral: "Kendi halinizde kalmak ve rutin işlerinizi sürdürmek için sakin bir gün. Büyük çıkışlar yapmaktan ziyade, mevcut düzeninizi korumaya ve benliğinizi dinlemeye odaklanıyorsunuz.",
    negative: "Ego savaşlarına girmeye meyillisiniz ve otorite figürleriyle gereksiz çatışmalar yaşayabilirsiniz. Kendinizi yorgun veya motivasyonsuz hissedebilir, olayları kişisel algılayarak aşırı tepkiler verebilirsiniz."
  },
  Moon: {
    positive: "Sezgileriniz bugün size en doğru yolu gösteriyor ve sevdiklerinizle derin bir duygusal bağ kuruyorsunuz. Ruhsal olarak huzurlu, ev ve aile konularında ise oldukça şanslı ve tatmin edici gelişmeler yaşıyorsunuz.",
    neutral: "Duygusal dalgalanmalar yaşamadan, ihtiyaçlarınıza odaklandığınız durağan bir gün. Biraz içe dönmek, evde vakit geçirmek veya geçmişi sakince yad etmek size iyi gelecektir.",
    negative: "Alınganlığınızın üzerinde olduğu bir gün; en ufak bir sözü bile yanlış anlayıp küsebilirsiniz. Duygusal yeme ataklarına veya ani ruh hali değişimlerine karşı dikkatli olmanız gerekebilir."
  },
  Mercury: {
    positive: "Zihniniz bir bilgisayar gibi hızlı çalışıyor; zorlu problemleri çözmek ve ikna edici konuşmalar yapmak için harika bir zaman. Ticari anlaşmalar, eğitim ve kısa yolculuklar size beklediğinizden daha fazla fayda sağlayabilir.",
    neutral: "Günlük yazışmaların ve telefon trafiğinin yoğun olduğu, ancak büyük kararların alınmadığı bir akış söz konusu. Bilgi alışverişi dengeli ilerliyor, sadece detaylarda kaybolmamaya özen göstermelisiniz.",
    negative: "Yanlış anlaşılmalar, teknolojik arızalar veya trafikte gecikmeler sinirlerinizi bozabilir. Ağzınızdan çıkanı kulağınızın duymadığı anlar yaşayabilir, dedikodu veya asılsız haberlerle uğraşmak zorunda kalabilirsiniz."
  },
  Venus: {
    positive: "Aşk hayatınızda romantizm rüzgarları eserken, finansal konularda da yüz güldüren küçük sürprizlerle karşılaşabilirsiniz. Sosyalleşmek, kendinize bakım yapmak ve estetik dokunuşlar için gökyüzü sizi tamamen destekliyor.",
    neutral: "İlişkilerde \"ne eksik ne fazla\" dediğimiz, uyumlu ve sakin bir süreç hakim. Harcamalarınızda kontrollü olduğunuz, keyifli ama abartısız aktivitelerle günü geçireceğiniz bir enerji var.",
    negative: "Duygusal tatminsizlik nedeniyle aşırı harcama yapabilir veya ilişkilerde kıskançlık krizlerine girebilirsiniz. Tembellik isteği ağır basabilir ve sorumluluklarınızı erteleyerek kendinizi zora sokabilirsiniz."
  },
  Mars: {
    positive: "Enerjiniz o kadar yüksek ki, uzun süredir ertelediğiniz en zor işleri bile bir çırpıda bitirebilirsiniz. Rekabet gerektiren durumlarda öne çıkıyor, cesaretinizle engelleri birer birer aşıyorsunuz.",
    neutral: "Çalışkanlığınızın ön planda olduğu, enerjinizi kontrollü bir şekilde işlerinize kanalize ettiğiniz bir gün. Fiziksel aktiviteler veya sporla uğraşmak, günün ritmini yakalamanıza yardımcı olur.",
    negative: "Öfke kontrolü sağlamakta zorlanabilir, ani parlamalarla çevrenizdekileri kırabilirsiniz. Acelecilik yüzünden küçük sakarlıklar veya kazalar yaşama riskiniz olduğundan, adımlarınızı dikkatli atmalısınız."
  },
  Jupiter: {
    positive: "Şans kapılarınızın sonuna kadar açık olduğu, karşınıza büyük fırsatların çıkabileceği bereketli bir gün. İyimserliğiniz sayesinde zor durumların içinden bile kazançlı çıkıyor, vizyonunuzu genişletecek teklifler alıyorsunuz.",
    neutral: "Felsefi konulara ilgi duyduğunuz, geleceğe dair umutlu planlar yaptığınız sakin bir genişleme süreci. Abartıya kaçmadan, elinizdeki imkanları değerlendirerek manevi bir tatmin yaşıyorsunuz.",
    negative: "Kendinize aşırı güvenip tutamayacağınız sözler verebilir veya bütçenizi aşan harcamalar yapabilirsiniz. \"Nasıl olsa hallederim\" rahatlığıyla önemli detayları gözden kaçırıp fırsat tepebilirsiniz."
  },
  Saturn: {
    positive: "Sabrınızın ve emeğinizin meyvelerini topladığınız, uzun vadeli projelerde somut başarılar elde ettiğiniz bir gün. Otorite figürlerinden takdir görebilir, hayatınıza sağlam ve kalıcı bir düzen getirebilirsiniz.",
    neutral: "Sorumluluklarınızın bilincindesiniz ve görevlerinizi ciddiyetle yerine getiriyorsunuz. Biraz mesafeli ve soğuk dursanız da, işlerinizi sessiz sedasız ve hatasız bir şekilde tamamlıyorsunuz.",
    negative: "Kendinizi yetersiz, engellenmiş veya karamsar hissedebilir; hayatın yükleri altında ezildiğinizi düşünebilirsiniz. İşlerinizde gecikmeler yaşanabilir ve soğuk tavırlarınız nedeniyle insanlarla aranıza duvar örebilirsiniz."
  },
  Uranus: {
    positive: "Aklınıza gelen dâhiyane bir fikirle olayların gidişatını tamamen lehinize çevirebilirsiniz. Beklenmedik sürprizler sizi heyecanlandırır ve sıradanlıktan kurtulup özgürleştiğinizi hissedersiniz.",
    neutral: "Farklı şeyler deneme isteği duyduğunuz ancak radikal adımlar atmadığınız bir gün. Rutinin dışına çıkmak için ufak tefek değişiklikler yapıyor, teknoloji veya bilimsel konularla ilgileniyorsunuz.",
    negative: "Ani plan değişiklikleri ve kaos gününüzü altüst edebilir, gerginliğiniz isyankar bir tavra dönüşebilir. Tahammülsüzlüğünüz nedeniyle gemileri yakabilir, sonradan pişman olacağınız fevri kararlar verebilirsiniz."
  },
  Neptune: {
    positive: "Yaratıcılığınızın zirvesindesiniz; sanatsal işler ve spiritüel çalışmalar için mükemmel bir akış var. Empati yeteneğiniz sayesinde çevrenizdeki insanlara şifa oluyor, hayallerinizi gerçeğe yaklaştırıyorsunuz.",
    neutral: "Biraz dalgın ve hayalperest olsanız da bu durum size zararsız, tatlı bir kaçış alanı sağlıyor. Müzik dinlemek, film izlemek veya meditasyon yapmak günün stresinden uzaklaşmanıza yetiyor.",
    negative: "Gerçeklerden kaçma eğiliminiz sizi kandırılmaya veya hayal kırıklığına açık hale getirebilir. Unutkanlık, kafa karışıklığı veya bağımlılıklara meyil nedeniyle odaklanmakta büyük zorluk yaşayabilirsiniz."
  },
  Pluto: {
    positive: "Küllerinizden doğduğunuzu hissettiğiniz, sizi aşağı çeken bir sorunu kökten çözdüğünüz güçlü bir gün. İrade gücünüz sayesinde zorlu bir dönüşüm sürecini başarıyla tamamlıyor ve kontrolü elinize alıyorsunuz.",
    neutral: "Derinlemesine araştırmalar yapmak, psikolojik analizlerde bulunmak veya gizli kalmış konuları sessizce gözlemlemek için uygun bir zaman. Kendi iç dünyanızdaki değişimi dışarıya yansıtmadan yönetiyorsunuz.",
    negative: "Takıntılı düşünceler, kıskançlık veya güç savaşları sizi psikolojik olarak yıpratabilir. Manipülasyona uğrayabilir veya siz başkalarını kontrol etmeye çalışarak ilişkilerinize zarar verebilirsiniz."
  }
};

export const PLANET_DAILY_EFFECTS_EN: Record<string, PlanetDailyEffect> = {
  Sun: {
    positive: "Your self-confidence is at its peak, and you're expressing yourself brilliantly today. Your leadership qualities are influencing those around you, while your physical energy fully supports you in achieving your goals.",
    neutral: "A calm day to stay in your own space and continue with routine tasks. Rather than making big moves, you're focusing on maintaining your current order and listening to your inner self.",
    negative: "You may be prone to ego battles and unnecessary conflicts with authority figures. You might feel tired or unmotivated, taking things personally and reacting excessively."
  },
  Moon: {
    positive: "Your intuition is guiding you to the right path today, and you're forming deep emotional connections with loved ones. You feel spiritually peaceful, experiencing fortunate and satisfying developments in home and family matters.",
    neutral: "A stable day without emotional fluctuations, focusing on your needs. Turning inward, spending time at home, or calmly reminiscing about the past will do you good.",
    negative: "A day when your sensitivity is heightened; you might misunderstand even the smallest words and get upset. Be careful of emotional eating attacks or sudden mood swings."
  },
  Mercury: {
    positive: "Your mind is working like a computer; it's a great time for solving difficult problems and having persuasive conversations. Business deals, education, and short trips may benefit you more than expected.",
    neutral: "A flow where daily correspondence and phone traffic are heavy, but no major decisions are made. Information exchange is progressing smoothly; just be careful not to get lost in details.",
    negative: "Misunderstandings, technical failures, or traffic delays may test your patience. You might say things you don't mean, and deal with gossip or unfounded news."
  },
  Venus: {
    positive: "Romance is in the air for your love life, and you may encounter pleasant little surprises in financial matters. The sky fully supports you in socializing, self-care, and aesthetic touches.",
    neutral: "A harmonious and calm period in relationships - nothing too much or too little. You're controlling your spending and passing the day with pleasant but modest activities.",
    negative: "You might overspend due to emotional dissatisfaction or experience jealousy crises in relationships. Laziness may dominate, and you might put yourself in difficulty by postponing responsibilities."
  },
  Mars: {
    positive: "Your energy is so high that you can complete even the most difficult tasks you've been postponing. You're standing out in competitive situations, overcoming obstacles one by one with your courage.",
    neutral: "A day where your diligence is prominent, channeling your energy into your work in a controlled manner. Physical activities or sports will help you catch the rhythm of the day.",
    negative: "You may struggle with anger control and hurt those around you with sudden outbursts. Be careful of small accidents or mishaps due to hastiness."
  },
  Jupiter: {
    positive: "A blessed day when your luck doors are wide open and great opportunities may come your way. Thanks to your optimism, you're coming out ahead even from difficult situations, receiving offers that will expand your vision.",
    neutral: "A calm expansion period where you're interested in philosophical topics and making hopeful plans for the future. Without exaggeration, you're experiencing spiritual satisfaction by evaluating your current resources.",
    negative: "You might make promises you can't keep due to overconfidence or make expenses beyond your budget. With the comfort of 'I'll handle it anyway,' you might miss important details and waste opportunities."
  },
  Saturn: {
    positive: "A day to reap the fruits of your patience and hard work, achieving concrete successes in long-term projects. You may receive appreciation from authority figures and bring a solid, lasting order to your life.",
    neutral: "You're aware of your responsibilities and fulfilling your duties seriously. Though you may seem a bit distant and cold, you're completing your work quietly and flawlessly.",
    negative: "You may feel inadequate, blocked, or pessimistic; thinking you're crushed under life's burdens. Delays may occur in your work, and your cold attitude may build walls between you and others."
  },
  Uranus: {
    positive: "A brilliant idea that comes to your mind can completely turn events in your favor. Unexpected surprises excite you, and you feel freed from the ordinary.",
    neutral: "A day when you want to try different things but don't take radical steps. You're making small changes to step out of routine, interested in technology or scientific subjects.",
    negative: "Sudden plan changes and chaos can turn your day upside down, your tension may turn into a rebellious attitude. Due to intolerance, you might burn bridges and make impulsive decisions you'll later regret."
  },
  Neptune: {
    positive: "You're at the peak of your creativity; there's a perfect flow for artistic work and spiritual practices. Thanks to your empathy, you're healing those around you and bringing your dreams closer to reality.",
    neutral: "Though a bit distracted and dreamy, this provides you with a harmless, sweet escape space. Listening to music, watching movies, or meditating is enough to distance yourself from the day's stress.",
    negative: "Your tendency to escape reality may make you vulnerable to deception or disappointment. You may have great difficulty focusing due to forgetfulness, confusion, or tendency toward addictions."
  },
  Pluto: {
    positive: "A powerful day when you feel reborn from the ashes, radically solving a problem that was dragging you down. Thanks to your willpower, you're successfully completing a difficult transformation process and taking control.",
    neutral: "A suitable time for in-depth research, psychological analysis, or quietly observing hidden matters. You're managing the change in your inner world without reflecting it outward.",
    negative: "Obsessive thoughts, jealousy, or power struggles may wear you down psychologically. You may be manipulated or damage your relationships by trying to control others."
  }
};

export function getPlanetDailyEffect(
  planetKey: string,
  effect: EffectType,
  language: 'tr' | 'en' = 'tr'
): string {
  const effects = language === 'en' ? PLANET_DAILY_EFFECTS_EN : PLANET_DAILY_EFFECTS_TR;
  const planetEffect = effects[planetKey];
  
  if (!planetEffect) {
    return '';
  }
  
  return planetEffect[effect] || planetEffect.neutral;
}

export function getPlanetDailyEffectObject(
  planetKey: string,
  language: 'tr' | 'en' = 'tr'
): PlanetDailyEffect | null {
  const effects = language === 'en' ? PLANET_DAILY_EFFECTS_EN : PLANET_DAILY_EFFECTS_TR;
  return effects[planetKey] || null;
}
