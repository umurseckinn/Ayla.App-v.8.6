export type ElementGroup = 'Ateş' | 'Toprak' | 'Hava' | 'Su';
export type ElementGroupEN = 'Fire' | 'Earth' | 'Air' | 'Water';
export type EffectType = 'İyi' | 'Kötü' | 'Nötr' | 'İyi/Sarsıcı' | 'Zorlu' | 'Zorlu/İyi' | 'Nötr/İyi' | 'Zorlu/Şifalı' | 'Çok İyi' | 'İyi/Güçlü' | 'Nötr/Zorlu';
export type EffectTypeEN = 'Good' | 'Bad' | 'Neutral' | 'Good/Disruptive' | 'Challenging' | 'Challenging/Good' | 'Neutral/Good' | 'Challenging/Healing' | 'Very Good' | 'Good/Powerful' | 'Neutral/Challenging';
export type PlanetKey = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto';

export interface ElementEffect {
  effect: string;
  effectEN: string;
  type: EffectType;
  typeEN: EffectTypeEN;
}

export interface PlanetElementInterpretation {
  [targetElement: string]: ElementEffect;
}

export interface PlanetPositionInterpretations {
  [positionElement: string]: PlanetElementInterpretation;
}

export interface PlanetElementDB {
  [planetKey: string]: PlanetPositionInterpretations;
}

export const PLANET_ELEMENT_INTERPRETATIONS: PlanetElementDB = {
  Sun: {
    Ateş: {
      Ateş: { effect: "Enerjiniz ve özgüveniniz tavan yapar, benliğinizi parlatırsınız.", effectEN: "Your energy and confidence skyrocket, you shine your true self.", type: "İyi", typeEN: "Good" },
      Hava: { effect: "Fikirleriniz eyleme geçer, sosyal çevrenizde liderleşirsiniz.", effectEN: "Your ideas turn into action, you become a leader in your social circle.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Hızınız pratik işleri bozabilir, sabırsız davranabilirsiniz.", effectEN: "Your speed may disrupt practical tasks, you may act impatiently.", type: "Nötr", typeEN: "Neutral" },
      Su: { effect: "Egonuz duygusal hassasiyetleri ezebilir, empati kurmak zorlaşır.", effectEN: "Your ego may crush emotional sensitivities, empathy becomes difficult.", type: "Kötü", typeEN: "Bad" }
    },
    Toprak: {
      Toprak: { effect: "Ayaklarınız yere sağlam basar, kariyer ve üretimde parlarsınız.", effectEN: "You stand firmly grounded, you shine in career and production.", type: "İyi", typeEN: "Good" },
      Su: { effect: "Güven ve destek verirsiniz, somut yardımlarla ilişkileri beslersiniz.", effectEN: "You provide trust and support, nurturing relationships with tangible help.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Ağırkanlılığınız hevesinizi söndürebilir, risk almaktan korkarsınız.", effectEN: "Your sluggishness may dampen your enthusiasm, you fear taking risks.", type: "Nötr", typeEN: "Neutral" },
      Hava: { effect: "Sadece sonuca odaklanmak iletişimi ve teorik düşünceyi kısıtlar.", effectEN: "Focusing only on results restricts communication and theoretical thinking.", type: "Kötü", typeEN: "Bad" }
    },
    Hava: {
      Hava: { effect: "Zihinsel berraklık ve iletişim yeteneğinizle sahnede olursunuz.", effectEN: "You take the stage with mental clarity and communication skills.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Yeni fikirler yaşam enerjinizi körükler, vizyonunuz genişler.", effectEN: "New ideas fuel your life energy, your vision expands.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Çok konuşup az iş yapabilir, pratik detayları kaçırabilirsiniz.", effectEN: "You may talk too much and do too little, missing practical details.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "Duyguları mantıkla çözmeye çalışmak soğukluk yaratır.", effectEN: "Trying to solve emotions with logic creates coldness.", type: "Nötr", typeEN: "Neutral" }
    },
    Su: {
      Su: { effect: "Sezgileriniz yol gösterir, duygusal derinliğinizle parlar ve şifalanırsınız.", effectEN: "Your intuition guides you, you shine with emotional depth and heal.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Üretkenliğiniz artar, toprağı (maddeyi) suyla (ilhamla) beslersiniz.", effectEN: "Your productivity increases, you nourish earth (matter) with water (inspiration).", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Duygusal dalgalanmalar yaşam enerjinizi ve cesaretinizi söndürebilir.", effectEN: "Emotional fluctuations may dampen your life energy and courage.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "Mantık devreden çıkar, aşırı alınganlık iletişimi boğabilir.", effectEN: "Logic goes offline, excessive sensitivity may suffocate communication.", type: "Nötr", typeEN: "Neutral" }
    }
  },
  Moon: {
    Ateş: {
      Ateş: { effect: "Duygusal tepkileriniz coşkulu, hızlı ve cesurcadır.", effectEN: "Your emotional reactions are enthusiastic, quick and courageous.", type: "İyi", typeEN: "Good" },
      Hava: { effect: "Duygularınızı dışa vurmakta ve paylaşmakta çok rahatsınızdır.", effectEN: "You are very comfortable expressing and sharing your emotions.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Huzursuzluk hissedebilir, güvenlik ihtiyacını macera ile riske atarsınız.", effectEN: "You may feel restless, risking security needs for adventure.", type: "Nötr", typeEN: "Neutral" },
      Su: { effect: "Duygusal ihtiyaçlarınız bencilliğe dönüşebilir, derin bağlar kurmakta zorlanırsınız.", effectEN: "Your emotional needs may turn selfish, making deep connections difficult.", type: "Kötü", typeEN: "Bad" }
    },
    Toprak: {
      Toprak: { effect: "Duygusal olarak en huzurlu, güvende ve dengeli hissettiğiniz andır.", effectEN: "This is when you feel most peaceful, secure and balanced emotionally.", type: "İyi", typeEN: "Good" },
      Su: { effect: "Sevdiklerinizi somut imkanlarla korur ve beslersiniz.", effectEN: "You protect and nurture loved ones with tangible resources.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Değişime direnç gösterir, heyecan verici fırsatları reddedebilirsiniz.", effectEN: "You resist change, potentially rejecting exciting opportunities.", type: "Nötr", typeEN: "Neutral" },
      Hava: { effect: "Duygularınızı ifade etmek yerine bastırır veya fazla mekanikleşirsiniz.", effectEN: "Instead of expressing emotions, you suppress or become too mechanical.", type: "Kötü", typeEN: "Bad" }
    },
    Hava: {
      Hava: { effect: "Duygusal ihtiyaçlarınızı konuşarak ve sosyalleşerek giderirsiniz.", effectEN: "You meet emotional needs through talking and socializing.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Neşeli ve dışa dönük bir ruh haliyle çevrenizi motive edersiniz.", effectEN: "You motivate your surroundings with a cheerful and outgoing mood.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Duygusal yüzeysellik, derin bağlar ve güven arayanları hayal kırıklığına uğratır.", effectEN: "Emotional superficiality disappoints those seeking deep bonds and trust.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "Duyguları rasyonalize etmek, hissetmeyi engeller ve soğuk algılanırsınız.", effectEN: "Rationalizing emotions blocks feeling and makes you seem cold.", type: "Nötr", typeEN: "Neutral" }
    },
    Su: {
      Su: { effect: "Sezgileriniz ve empati yeteneğiniz zirve yapar, ruhsal doyum sağlarsınız.", effectEN: "Your intuition and empathy peak, providing spiritual fulfillment.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Duygusal bağlarınız sadakat ve güvenle somutlaşır.", effectEN: "Your emotional bonds materialize with loyalty and trust.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Aşırı duyarlılık ve alınganlık, hevesinizi ve neşenizi boğabilir.", effectEN: "Excessive sensitivity may suffocate your enthusiasm and joy.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "Mantıklı düşünemez, duygusal sis içinde kaybolabilirsiniz.", effectEN: "You cannot think logically, may get lost in emotional fog.", type: "Nötr", typeEN: "Neutral" }
    }
  },
  Mercury: {
    Ateş: {
      Ateş: { effect: "Zihniniz şimşek gibi hızlı çalışır, ilham verici konuşursunuz.", effectEN: "Your mind works lightning fast, you speak inspiringly.", type: "İyi", typeEN: "Good" },
      Hava: { effect: "Fikirlerinizi satma ve ikna etme kabiliyetiniz artar.", effectEN: "Your ability to sell ideas and persuade increases.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Detay gerektiren işlerde sabırsızlık ve dikkatsizlik yaparsınız.", effectEN: "You become impatient and careless in detail-oriented tasks.", type: "Nötr", typeEN: "Neutral" },
      Su: { effect: "Patavatsızlıklarınız duygusal yaralar açabilir, empati eksikliği olur.", effectEN: "Your bluntness may cause emotional wounds, lacking empathy.", type: "Kötü", typeEN: "Bad" }
    },
    Toprak: {
      Toprak: { effect: "Konsantrasyonunuz mükemmeldir, planlı ve gerçekçi düşünürsünüz.", effectEN: "Your concentration is excellent, you think planned and realistically.", type: "İyi", typeEN: "Good" },
      Su: { effect: "Kelimeleriniz şefkatli olmasa da güven vericidir, dinlemeyi bilirsiniz.", effectEN: "Your words may not be tender but reassuring, you know how to listen.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Vizyonunuz daralabilir, aşırı garantici tavrınız fırsat kaçırtır.", effectEN: "Your vision may narrow, overly cautious attitude misses opportunities.", type: "Nötr", typeEN: "Neutral" },
      Hava: { effect: "Yavaş düşündüğünüz için iletişim kopuklukları ve inatlaşma yaşanır.", effectEN: "Thinking slowly causes communication gaps and stubbornness.", type: "Kötü", typeEN: "Bad" }
    },
    Hava: {
      Hava: { effect: "Zeka, hitabet ve öğrenme kapasiteniz en üst seviyededir.", effectEN: "Your intelligence, eloquence and learning capacity are at peak.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Yaratıcı fikirler üretir, tartışmalardan keyif alırsınız.", effectEN: "You generate creative ideas, enjoy debates.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Teoride harika olan fikirler pratiğe dökülürken havada kalır.", effectEN: "Great ideas in theory remain in the air when put into practice.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "Duygusal konuları fazla analiz etmek hislerin anlamını bozar.", effectEN: "Over-analyzing emotional matters distorts the meaning of feelings.", type: "Nötr", typeEN: "Neutral" }
    },
    Su: {
      Su: { effect: "Sezgisel bir zekanız olur, kelimelere dökülmeyeni anlarsınız.", effectEN: "You have intuitive intelligence, understanding the unspoken.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Hafızanız güçlenir, öğrendiklerinizi kalıcı hale getirirsiniz.", effectEN: "Your memory strengthens, making what you learn permanent.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Alınganlıklar ve geçmişe takılmak ileriye bakmanızı engeller.", effectEN: "Sensitivities and dwelling on the past prevent looking forward.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "Objektiflik kaybolur, kararlar tamamen ruh haline göre verilir.", effectEN: "Objectivity is lost, decisions are made entirely based on mood.", type: "Nötr", typeEN: "Neutral" }
    }
  },
  Venus: {
    Ateş: {
      Ateş: { effect: "Aşkta tutkulu, cömert ve girişken olursunuz; heyecan ararsınız.", effectEN: "You become passionate, generous and bold in love; seeking excitement.", type: "İyi", typeEN: "Good" },
      Hava: { effect: "Sosyal hayatınız canlanır, flörtöz ve eğlenceli bir dönemdir.", effectEN: "Your social life livens up, it's a flirty and fun period.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Harcamalarınız dürtüselleşir, birikim yapmakta zorlanırsınız.", effectEN: "Your spending becomes impulsive, saving becomes difficult.", type: "Nötr", typeEN: "Neutral" },
      Su: { effect: "İlişkilerde bencilce davranabilir, partnerin duygularını ezebilirsiniz.", effectEN: "You may act selfishly in relationships, crushing partner's feelings.", type: "Kötü", typeEN: "Bad" }
    },
    Toprak: {
      Toprak: { effect: "İlişkilerde sadakat, finansal konularda bereket artar.", effectEN: "Loyalty in relationships, abundance in financial matters increases.", type: "İyi", typeEN: "Good" },
      Su: { effect: "Sevginizi dokunarak ve hizmet ederek gösterir, güven verirsiniz.", effectEN: "You show love through touch and service, providing security.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Aşkta çok temkinli veya hesapçı davranmak tutkuyu öldürür.", effectEN: "Being too cautious or calculating in love kills passion.", type: "Nötr", typeEN: "Neutral" },
      Hava: { effect: "Sosyalleşmek yerine içe kapanabilir, ilişkide sıkıcı bulunabilirsiniz.", effectEN: "Instead of socializing you may withdraw, seeming boring in relationships.", type: "Kötü", typeEN: "Bad" }
    },
    Hava: {
      Hava: { effect: "İlişkilerde zihinsel uyum, nezaket ve estetik ön plandadır.", effectEN: "Mental compatibility, courtesy and aesthetics are paramount in relationships.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Aşk maceralarına açık, eğlenceli ve popüler olursunuz.", effectEN: "You're open to love adventures, fun and popular.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "İlişki sorumluluklarından kaçabilir, yüzeysel kalabilirsiniz.", effectEN: "You may avoid relationship responsibilities, remaining superficial.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "Duygusal derinlik yerine mantık aramak partneri yalnız hissettirir.", effectEN: "Seeking logic instead of emotional depth makes partner feel lonely.", type: "Nötr", typeEN: "Neutral" }
    },
    Su: {
      Su: { effect: "Romantizm, şefkat ve ruhsal bütünleşme zirve yapar.", effectEN: "Romance, tenderness and spiritual union reach their peak.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Sevginiz besleyici ve kalıcıdır, aileyi ve yuvayı güzelleştirirsiniz.", effectEN: "Your love is nurturing and lasting, beautifying family and home.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Kıskançlık ve duygusal dramalar ilişki enerjisini tüketebilir.", effectEN: "Jealousy and emotional dramas may drain relationship energy.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "İlişkide netlik kaybolur, belirsizlikler ve hayal kırıklıkları yaşanır.", effectEN: "Clarity is lost in relationships, causing uncertainties and disappointments.", type: "Nötr", typeEN: "Neutral" }
    }
  },
  Mars: {
    Ateş: {
      Ateş: { effect: "Enerjiniz patlayıcıdır, rekabetten korkmaz ve kazanırsınız.", effectEN: "Your energy is explosive, you don't fear competition and win.", type: "İyi", typeEN: "Good" },
      Hava: { effect: "Hızlı kararlar alır, çevrenizi harekete geçirirsiniz.", effectEN: "You make quick decisions, mobilizing those around you.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Tahammülsüzlük nedeniyle somut işleri yarıda bırakabilirsiniz.", effectEN: "Impatience may cause you to leave concrete tasks unfinished.", type: "Nötr", typeEN: "Neutral" },
      Su: { effect: "Öfke kontrolü zorlaşır, duygusal dünyada yıkım yaratabilirsiniz.", effectEN: "Anger control becomes difficult, you may create destruction emotionally.", type: "Kötü", typeEN: "Bad" }
    },
    Toprak: {
      Toprak: { effect: "Stratejik, dayanıklı ve hedef odaklı hareket edersiniz.", effectEN: "You act strategically, enduringly and goal-oriented.", type: "İyi", typeEN: "Good" },
      Su: { effect: "Enerjinizi başkalarına yardım etmek ve korumak için kullanırsınız.", effectEN: "You use your energy to help and protect others.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Harekete geçmekte çok yavaş kalır, fırsatları kaçırabilirsiniz.", effectEN: "You may be too slow to act, missing opportunities.", type: "Nötr", typeEN: "Neutral" },
      Hava: { effect: "Esnek olamaz, değişen koşullara ayak uydurmakta zorlanırsınız.", effectEN: "You can't be flexible, struggling to adapt to changing conditions.", type: "Kötü", typeEN: "Bad" }
    },
    Hava: {
      Hava: { effect: "Zihinsel tartışmalarda, ekip çalışmalarında ve stratejide kazanırsınız.", effectEN: "You win in mental debates, teamwork and strategy.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Fikirlerinizi eyleme dökme cesaretiniz artar, inisiyatif alırsınız.", effectEN: "Your courage to turn ideas into action increases, you take initiative.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Enerjiniz dağınıktır, bir işi bitirmeden diğerine atlarsınız.", effectEN: "Your energy is scattered, jumping from one task to another.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "Pasif-agresif davranışlar ve iğneleyici sözlerle savaşırsınız.", effectEN: "You fight with passive-aggressive behavior and sarcastic words.", type: "Nötr", typeEN: "Neutral" }
    },
    Su: {
      Su: { effect: "Sezgisel hareket eder, krizi fırsata çevirir ve sessizce ilerlersiniz.", effectEN: "You act intuitively, turn crisis into opportunity and advance quietly.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Dayanıklılığınız artar, uzun vadeli hedefler için sabırla çalışırsınız.", effectEN: "Your endurance increases, working patiently for long-term goals.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Duygusal dalgalanmalar enerjinizi düşürür, çabuk demoralize olursunuz.", effectEN: "Emotional fluctuations drain your energy, you get demoralized quickly.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "Dolaylı yollardan hareket etmek yanlış anlaşılmalara yol açar.", effectEN: "Acting indirectly leads to misunderstandings.", type: "Nötr", typeEN: "Neutral" }
    }
  },
  Jupiter: {
    Ateş: {
      Ateş: { effect: "Özgüven, liderlik ve cesaret yoluyla büyük fırsatlar yakalarsınız.", effectEN: "You catch great opportunities through confidence, leadership and courage.", type: "İyi", typeEN: "Good" },
      Hava: { effect: "Vizyonunuzu başkalarıyla paylaşarak destek görürsünüz.", effectEN: "You gain support by sharing your vision with others.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Risk alma iştahınız maddi kayıplara veya israfa yol açabilir.", effectEN: "Your appetite for risk may lead to material losses or waste.", type: "Nötr", typeEN: "Neutral" },
      Su: { effect: "Abartılı davranışlarınız duygusal hassasiyetleri görmezden gelebilir.", effectEN: "Your exaggerated behavior may ignore emotional sensitivities.", type: "Kötü", typeEN: "Bad" }
    },
    Toprak: {
      Toprak: { effect: "Maddi büyüme, mülk edinme ve kariyerde sağlam adımlar atılır.", effectEN: "Material growth, property acquisition and solid career steps are taken.", type: "İyi", typeEN: "Good" },
      Su: { effect: "Yardımlarınız ve cömertliğiniz somutlaşır, bereketi paylaşırsınız.", effectEN: "Your help and generosity materialize, you share abundance.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Materyalizm, manevi ve felsefi büyümenin önüne geçebilir.", effectEN: "Materialism may overshadow spiritual and philosophical growth.", type: "Nötr", typeEN: "Neutral" },
      Hava: { effect: "Geleneksel yöntemlere takılıp yenilikçi büyüme fırsatlarını reddedersiniz.", effectEN: "Stuck on traditional methods, you reject innovative growth opportunities.", type: "Kötü", typeEN: "Bad" }
    },
    Hava: {
      Hava: { effect: "Bilgi, eğitim, seyahat ve sosyal ağlar üzerinden şans bulursunuz.", effectEN: "You find luck through knowledge, education, travel and social networks.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "İdealist fikirleriniz size yeni ufuklar ve maceralar açar.", effectEN: "Your idealistic ideas open new horizons and adventures.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Çok fazla proje üretip hiçbirini somutlaştıramama riski vardır.", effectEN: "Risk of producing too many projects without materializing any.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "Zihinsel kibir, duygusal bağ kurmayı ve empatiyi zorlaştırır.", effectEN: "Mental arrogance makes emotional bonding and empathy difficult.", type: "Nötr", typeEN: "Neutral" }
    },
    Su: {
      Su: { effect: "Maneviyat, şifacılık ve sezgiler yoluyla ilahi koruma altındasınızdır.", effectEN: "You're under divine protection through spirituality, healing and intuition.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Sezgileriniz finansal ve pratik konularda doğru yolu gösterir.", effectEN: "Your intuition shows the right path in financial and practical matters.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Gerçeklerden kaçma ve hayal dünyasında kaybolma riski artar.", effectEN: "Risk of escaping reality and getting lost in fantasy increases.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "Mantıksız iyimserlik, yanlış kararlar almanıza neden olabilir.", effectEN: "Irrational optimism may cause you to make wrong decisions.", type: "Nötr", typeEN: "Neutral" }
    }
  },
  Saturn: {
    Ateş: {
      Ateş: { effect: "Egonuzu disipline eder, liderliği sorumlulukla birleştirirsiniz.", effectEN: "You discipline your ego, combining leadership with responsibility.", type: "İyi", typeEN: "Good" },
      Hava: { effect: "Uzun vadeli hedefler için gerekli stratejileri oluşturursunuz.", effectEN: "You create necessary strategies for long-term goals.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Yenilik yapmak isterken geleneksel kurallar ayağınıza dolanır.", effectEN: "Traditional rules get in your way when trying to innovate.", type: "Nötr", typeEN: "Neutral" },
      Su: { effect: "Baskıcı otorite figürü olmak, duygusal bağları koparabilir.", effectEN: "Being an oppressive authority figure may break emotional bonds.", type: "Kötü", typeEN: "Bad" }
    },
    Toprak: {
      Toprak: { effect: "En güçlü konumdur; kalıcı başarı, statü ve sarsılmaz düzen kurarsınız.", effectEN: "Strongest position; you build lasting success, status and unshakeable order.", type: "İyi", typeEN: "Good" },
      Su: { effect: "Sınırlarınızı netleştirir, duygusal hayatınızı güvenceye alırsınız.", effectEN: "You clarify your boundaries, securing your emotional life.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Aşırı tedbir ve korku, yaşam enerjinizi ve hevesinizi kurutur.", effectEN: "Excessive caution and fear dry up your life energy and enthusiasm.", type: "Nötr", typeEN: "Neutral" },
      Hava: { effect: "Katı kurallar ve bürokrasi, fikir özgürlüğünü engeller.", effectEN: "Rigid rules and bureaucracy block freedom of thought.", type: "Kötü", typeEN: "Bad" }
    },
    Hava: {
      Hava: { effect: "Zihinsel disiplin, adalet ve toplumsal yapıları organize edersiniz.", effectEN: "You organize mental discipline, justice and social structures.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Fikirlerinizi sabırla işleyerek kalıcı projelere dönüştürürsünüz.", effectEN: "Processing ideas patiently, you turn them into lasting projects.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Teorileriniz pratik hayatta uygulanırken zorluklarla karşılaşır.", effectEN: "Your theories face difficulties when applied in practical life.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "İlişkilerde mesafe ve soğukluk, yalnızlık hissini artırır.", effectEN: "Distance and coldness in relationships increase loneliness.", type: "Nötr", typeEN: "Neutral" }
    },
    Su: {
      Su: { effect: "Korkularınızla yüzleşir, ruhsal olgunluğa erişirsiniz.", effectEN: "You face your fears, reaching spiritual maturity.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Hayallerinizi gerçeğe dönüştürmek için somut adımlar atarsınız.", effectEN: "You take concrete steps to turn dreams into reality.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Suçluluk duygusu ve melankoli, cesaretinizi kırabilir.", effectEN: "Guilt and melancholy may break your courage.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "Endişeler mantıklı düşünmeyi engeller, karamsarlık hakim olur.", effectEN: "Worries prevent logical thinking, pessimism prevails.", type: "Nötr", typeEN: "Neutral" }
    }
  },
  Uranus: {
    Ateş: {
      Ateş: { effect: "Ani, şok edici ve devrimsel yeniliklerle özgürleşirsiniz.", effectEN: "You liberate through sudden, shocking and revolutionary innovations.", type: "İyi", typeEN: "Good" },
      Hava: { effect: "İcatlar, keşifler ve teknolojik atılımlar hızlanır.", effectEN: "Inventions, discoveries and technological breakthroughs accelerate.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Düzen bozan ani olaylar finansal ve güvenli alanlarda kaos yaratır.", effectEN: "Sudden disruptive events create chaos in financial and secure areas.", type: "Nötr", typeEN: "Neutral" },
      Su: { effect: "Duygusal şoklar ve ani kopuşlar travmatik etkiler bırakabilir.", effectEN: "Emotional shocks and sudden breaks may leave traumatic effects.", type: "Kötü", typeEN: "Bad" }
    },
    Toprak: {
      Toprak: { effect: "Ekonomi, üretim ve doğa ile ilgili sistemler kökten değişir.", effectEN: "Economy, production and nature-related systems change fundamentally.", type: "İyi/Sarsıcı", typeEN: "Good/Disruptive" },
      Su: { effect: "Alışkanlıkların değişmesi duygusal özgürleşme sağlar.", effectEN: "Changing habits provides emotional liberation.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Değişimin yavaş olması sabırsızlık ve isyan yaratır.", effectEN: "Slow change creates impatience and rebellion.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "Maddi kaygılar, zihinsel yaratıcılığı ve ilerlemeyi kısıtlar.", effectEN: "Material concerns restrict mental creativity and progress.", type: "Nötr", typeEN: "Neutral" }
    },
    Hava: {
      Hava: { effect: "Bilim, insan hakları ve kolektif bilinçte aydınlanma yaşanır.", effectEN: "Enlightenment occurs in science, human rights and collective consciousness.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Bireysellik ve yaratıcılık sıradışı yöntemlerle parlar.", effectEN: "Individuality and creativity shine through unconventional methods.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Sanal/dijital gelişmeler, somut dünyanın kurallarını altüst eder.", effectEN: "Virtual/digital developments overturn rules of the physical world.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "Duygudan yoksun teknolojik ilerleme insan ilişkilerini soğutur.", effectEN: "Emotionless technological progress cools human relationships.", type: "Nötr", typeEN: "Neutral" }
    },
    Su: {
      Su: { effect: "Bilinçaltı temizliği ve ruhsal uyanışlar ani farkındalıklarla gelir.", effectEN: "Subconscious cleansing and spiritual awakenings come with sudden awareness.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Aile ve ev yapısındaki ani değişimler yeni düzenler kurdurur.", effectEN: "Sudden changes in family and home structure establish new orders.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Kontrolsüz duygusal patlamalar yıkıcı etkiler yaratabilir.", effectEN: "Uncontrolled emotional outbursts may create destructive effects.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "Sezgisel bilgiler mantıkla çelişir, kafa karışıklığı yaratır.", effectEN: "Intuitive knowledge contradicts logic, creating confusion.", type: "Nötr", typeEN: "Neutral" }
    }
  },
  Neptune: {
    Ateş: {
      Ateş: { effect: "İdealleriniz için savaşır, kahramanca hayaller kurarsınız.", effectEN: "You fight for your ideals, dreaming heroically.", type: "İyi", typeEN: "Good" },
      Hava: { effect: "Sanatsal ve yaratıcı ilhamlarınız başkalarını etkiler.", effectEN: "Your artistic and creative inspirations influence others.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Gerçekçi olmayan riskler maddi kayıplara ve hayal kırıklığına uğratır.", effectEN: "Unrealistic risks cause material losses and disappointment.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "Enerjiniz belirsizlik içinde kaybolur, yönsüz hissedebilirsiniz.", effectEN: "Your energy gets lost in uncertainty, you may feel directionless.", type: "Nötr", typeEN: "Neutral" }
    },
    Toprak: {
      Toprak: { effect: "Hayallerinizi somutlaştırır, maddeye ruh katarsınız (Sanat/Tasarım).", effectEN: "You materialize dreams, adding soul to matter (Art/Design).", type: "İyi", typeEN: "Good" },
      Su: { effect: "Şefkat ve yardımlaşma somut hizmete dönüşür.", effectEN: "Compassion and mutual help turn into tangible service.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Detaylarda boğulmak vizyonunuzu ve inancınızı köreltir.", effectEN: "Drowning in details dulls your vision and faith.", type: "Nötr", typeEN: "Neutral" },
      Hava: { effect: "Pratik kaygılar, ilhamı ve zihinsel esnekliği bloke eder.", effectEN: "Practical concerns block inspiration and mental flexibility.", type: "Kötü", typeEN: "Bad" }
    },
    Hava: {
      Hava: { effect: "Şiirsel bir dil, mistik fikirler ve hümanist idealler yayılır.", effectEN: "Poetic language, mystical ideas and humanist ideals spread.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Hayal gücünüz yaratıcı projelere ve ütopyalara ilham verir.", effectEN: "Your imagination inspires creative projects and utopias.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Odaklanma sorunu ve zihinsel dağınıklık hatalara yol açar.", effectEN: "Focus issues and mental scatter lead to errors.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "Mantık ile sezgi birbirine karışır, aldanma riski yüksektir.", effectEN: "Logic and intuition mix up, risk of deception is high.", type: "Nötr", typeEN: "Neutral" }
    },
    Su: {
      Su: { effect: "Sezgi, rüyalar ve evrensel sevgi en saf ve güçlü halindedir.", effectEN: "Intuition, dreams and universal love are at their purest and strongest.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Maneviyat ve ilham, dünyevi başarıya zemin hazırlar.", effectEN: "Spirituality and inspiration pave the way for worldly success.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Gerçeklikten kopuş, bağımlılıklar ve uyuşukluk yaratabilir.", effectEN: "Disconnection from reality may create addictions and lethargy.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "Belirsizlikler ve sırlar zihinsel sağlığı zorlayabilir.", effectEN: "Uncertainties and secrets may strain mental health.", type: "Nötr", typeEN: "Neutral" }
    }
  },
  Pluto: {
    Ateş: {
      Ateş: { effect: "Kişisel gücünü yeniden keşfedersin; egon yıkılıp daha güçlü bir lider olarak yeniden doğar.", effectEN: "You rediscover your personal power; your ego is deconstructed to be reborn as a stronger leader.", type: "İyi", typeEN: "Good" },
      Hava: { effect: "Cesur fikirlerinle toplumu etkileme gücün artar, vizyonun devrim niteliğinde bir harekete dönüşür.", effectEN: "Your power to influence society with bold ideas increases, your vision turns into a revolutionary movement.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Hızlı ve riskli değişimler, senin güvenli alanını ve maddi düzenini tehdit edebilir; kaynaklarının yandığını hissedebilirsin.", effectEN: "Rapid and risky changes may threaten your safe space and financial order; you may feel your resources are burning.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "Çevrendeki öfke ve yüksek enerji, senin bastırdığın travmaları tetikleyip duygusal patlamalara yol açar.", effectEN: "The anger and high energy around you trigger your suppressed traumas, leading to emotional outbursts.", type: "Nötr/Zorlu", typeEN: "Neutral/Challenging" }
    },
    Toprak: {
      Toprak: { effect: "Kariyerini ve maddi hayatını sıfırdan inşa edersin; sarsılmaz ve kalıcı bir imparatorluk kurma gücüne erişirsin.", effectEN: "You rebuild your career and financial life from scratch; you gain the power to build an unshakable and lasting empire.", type: "İyi/Güçlü", typeEN: "Good/Powerful" },
      Su: { effect: "Duygusal ihtiyaçların somut güvencelerle karşılanır, korkuların yerini maddi ve manevi sağlamlığa bırakır.", effectEN: "Your emotional needs are met with tangible assurances, fears are replaced by material and spiritual solidity.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Katı kurallar ve otorite figürleri, senin yaşam enerjini ve yaratıcılığını baskılayıp seni kapana kısılmış hissettirir.", effectEN: "Strict rules and authority figures suppress your life energy and creativity, making you feel trapped.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "Sadece sonuca ve paraya odaklı sistemler, senin özgür düşünmeni ve entelektüel gelişimini kısıtlar.", effectEN: "Systems focused only on results and money restrict your free thinking and intellectual development.", type: "Nötr", typeEN: "Neutral" }
    },
    Hava: {
      Hava: { effect: "Zihinsel yapın tamamen değişir; düşüncelerinle kitleleri manipüle edebilecek veya yönlendirebilecek bir zeka gücüne ulaşırsın.", effectEN: "Your mental structure changes completely; you reach an intellectual power capable of manipulating or guiding masses with your thoughts.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Kolektif fikirler ve toplumsal devrimler, senin bireysel eylemlerini destekler ve sana sahne açar.", effectEN: "Collective ideas and social revolutions support your individual actions and open a stage for you.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Dijitalleşme ve soyut fikirler, senin somut dünyanı sarsar; bildiğin yöntemlerin artık işe yaramadığını görerek zorlanırsın.", effectEN: "Digitalization and abstract ideas shake your concrete world; you struggle seeing that your known methods no longer work.", type: "Kötü", typeEN: "Bad" },
      Su: { effect: "Aşırı mantık ve soğuk analizler, senin sezgilerini körleştirir; zihinsel baskı altında psikolojik korkular üretirsin.", effectEN: "Excessive logic and cold analysis blind your intuition; you generate psychological fears under mental pressure.", type: "Nötr", typeEN: "Neutral" }
    },
    Su: {
      Su: { effect: "Ruhsal bir arınma yaşarsın; en derin korkularınla yüzleşip şifacı veya spiritüel bir rehber olarak güçlenirsin.", effectEN: "You experience a spiritual purification; you confront your deepest fears and become empowered as a healer or spiritual guide.", type: "İyi", typeEN: "Good" },
      Toprak: { effect: "Sezgilerin sana gizli kazanç kapılarını gösterir; miras veya yatırım yoluyla finansal gücün derinleşir.", effectEN: "Your intuition shows you hidden doors to profit; your financial power deepens through inheritance or investment.", type: "İyi", typeEN: "Good" },
      Ateş: { effect: "Etrafındaki duygusal krizler ve dramalar, senin hevesini kırar ve yaşam ateşini söndürür.", effectEN: "Emotional crises and dramas around you break your enthusiasm and extinguish your fire for life.", type: "Kötü", typeEN: "Bad" },
      Hava: { effect: "Şüphecilik ve gizli oyunlar, senin açık iletişim kurmanı engeller; paranoya mantığını bulandırır.", effectEN: "Skepticism and hidden games prevent you from communicating openly; paranoia clouds your logic.", type: "Nötr", typeEN: "Neutral" }
    }
  }
};

export type MoonPhaseKey = 'new_moon' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 'full_moon' | 'waning_gibbous' | 'last_quarter' | 'balsamic';

export interface MoonPhaseElementEffect {
  effect: string;
  effectEN: string;
  type: EffectType;
  typeEN: EffectTypeEN;
}

export interface MoonPhaseInterpretation {
  [element: string]: MoonPhaseElementEffect;
}

export interface MoonPhaseDB {
  [phase: string]: MoonPhaseInterpretation;
}

export const MOON_PHASE_ELEMENT_INTERPRETATIONS: MoonPhaseDB = {
  new_moon: {
    Ateş: { effect: "Cesur adımlar atmak ve yeni maceralara atılmak için sınırsız bir heyecan duyarsınız.", effectEN: "You feel boundless excitement to take bold steps and embark on new adventures.", type: "İyi", typeEN: "Good" },
    Toprak: { effect: "Maddi hedefleriniz için tohum ekmek ve somut planlar yapmak adına en verimli zamandır.", effectEN: "It's the most productive time to plant seeds for material goals and make concrete plans.", type: "İyi", typeEN: "Good" },
    Hava: { effect: "Zihinsel projeler başlatmak ve yeni insanlarla tanışmak için canlanırsınız.", effectEN: "You come alive to start mental projects and meet new people.", type: "İyi", typeEN: "Good" },
    Su: { effect: "İç dünyanıza dönmek ve ruhsal bir yenilenme yaşamak için güçlü bir ihtiyaç hissedersiniz.", effectEN: "You feel a strong need to turn inward and experience spiritual renewal.", type: "İyi", typeEN: "Good" }
  },
  waxing_crescent: {
    Ateş: { effect: "Planlarınızı uygulamak için gereken o ilk kıvılcımı ve itici gücü kendinizde bulursunuz.", effectEN: "You find that initial spark and driving force within yourself to implement your plans.", type: "İyi", typeEN: "Good" },
    Toprak: { effect: "Başlattığınız işlerin ilk engelleriyle karşılaşabilir, sabırla devam etmeniz gerekebilir.", effectEN: "You may encounter first obstacles in projects you started, patience may be needed.", type: "Nötr", typeEN: "Neutral" },
    Hava: { effect: "Fikirlerinizi paylaşırken bazı fikir ayrılıkları yaşayabilir, esnek olmaya zorlanabilirsiniz.", effectEN: "You may experience disagreements when sharing ideas, forced to be flexible.", type: "Nötr", typeEN: "Neutral" },
    Su: { effect: "Duygusal güvence arayışınız, dış dünyanın hızıyla çatışabilir ve sizi huzursuz edebilir.", effectEN: "Your search for emotional security may conflict with the world's pace, causing unease.", type: "Zorlu", typeEN: "Challenging" }
  },
  first_quarter: {
    Ateş: { effect: "Engelleri aşmak için agresif bir enerji sergileyebilir, rekabetçi yönünüzü ortaya koyarsınız.", effectEN: "You may display aggressive energy to overcome obstacles, showing your competitive side.", type: "Zorlu/İyi", typeEN: "Challenging/Good" },
    Toprak: { effect: "Pratik sorunları çözmek ve yapıyı sağlamlaştırmak için çok efor sarf etmeniz gerekir.", effectEN: "You need to put in much effort to solve practical problems and solidify structure.", type: "Nötr", typeEN: "Neutral" },
    Hava: { effect: "Karar verme aşamasında zihinsel bir gerilim yaşayabilir, stratejinizi değiştirebilirsiniz.", effectEN: "You may experience mental tension in decision-making, possibly changing strategy.", type: "Zorlu", typeEN: "Challenging" },
    Su: { effect: "Duygusal krizler ve geçmişten gelen yükler eyleme geçmenizi zorlaştırabilir.", effectEN: "Emotional crises and past burdens may make it difficult to take action.", type: "Kötü", typeEN: "Bad" }
  },
  waxing_gibbous: {
    Ateş: { effect: "Yaratıcılığınızı sergilemek ve parlamak için enerjinizin giderek yükseldiğini hissedersiniz.", effectEN: "You feel your energy gradually rising to showcase creativity and shine.", type: "İyi", typeEN: "Good" },
    Toprak: { effect: "Detaylara odaklanarak işlerinizi mükemmelleştirmek ve verimi artırmak için ideal zamandır.", effectEN: "It's ideal time to perfect your work by focusing on details and increasing efficiency.", type: "İyi", typeEN: "Good" },
    Hava: { effect: "Sosyal ağlarınızı genişletmek ve bilginizi paylaşmak için uygun fırsatlar yakalarsınız.", effectEN: "You catch opportunities to expand social networks and share your knowledge.", type: "İyi", typeEN: "Good" },
    Su: { effect: "Sezgilerinizin rehberliğinde doğru yolda olduğunuzu hissederek huzur bulursunuz.", effectEN: "You find peace feeling you're on the right path guided by your intuition.", type: "İyi", typeEN: "Good" }
  },
  full_moon: {
    Ateş: { effect: "Tüm dikkatleri üzerinize çeker, ektiklerinizin sonucunu coşkulu bir şekilde alırsınız.", effectEN: "You attract all attention, enthusiastically receiving the results of what you've sown.", type: "Çok İyi", typeEN: "Very Good" },
    Toprak: { effect: "Çabalarınızın somut karşılığını görür, emeklerinizin meyvesini toplarsınız.", effectEN: "You see tangible returns on your efforts, harvesting the fruits of your labor.", type: "Çok İyi", typeEN: "Very Good" },
    Hava: { effect: "İlişkilerde ve iletişimde her şey netleşir, gizli kalan bilgiler açığa çıkar.", effectEN: "Everything becomes clear in relationships and communication, hidden info emerges.", type: "İyi", typeEN: "Good" },
    Su: { effect: "Duygusal yoğunluk zirve yapar; hem büyük bir şifa hem de aşırı hassasiyet yaşanabilir.", effectEN: "Emotional intensity peaks; both great healing and excessive sensitivity may occur.", type: "Nötr/İyi", typeEN: "Neutral/Good" }
  },
  waning_gibbous: {
    Ateş: { effect: "Kazandığınız tecrübeleri başkalarına aktarmak ve onlara ilham vermek istersiniz.", effectEN: "You want to pass on your experiences to others and inspire them.", type: "İyi", typeEN: "Good" },
    Toprak: { effect: "Elde ettiklerinizi nasıl koruyacağınızı düşünür ve gereksiz olanları elemeniz gerektiğini anlarsınız.", effectEN: "You think about how to protect what you've gained and realize you need to eliminate the unnecessary.", type: "Nötr", typeEN: "Neutral" },
    Hava: { effect: "Sosyal ortamlarda öğrendiklerinizi tartışmak ve sentezlemek için çok aktifsindir.", effectEN: "You're very active in social settings discussing and synthesizing what you've learned.", type: "İyi", typeEN: "Good" },
    Su: { effect: "Yaşadıklarınızın duygusal derinliğini anlamlandırır, içsel bir olgunluk kazanırsınız.", effectEN: "You make sense of the emotional depth of your experiences, gaining inner maturity.", type: "İyi", typeEN: "Good" }
  },
  last_quarter: {
    Ateş: { effect: "Artık size hizmet etmeyen tutkulardan vazgeçmek zorunda kalmak sinir bozucu olabilir.", effectEN: "Having to give up passions that no longer serve you can be frustrating.", type: "Zorlu", typeEN: "Challenging" },
    Toprak: { effect: "Eski düzeni tasfiye etmek ve yeniye yer açmak için sert kararlar almanız gerekebilir.", effectEN: "You may need to make tough decisions to clear out the old and make room for new.", type: "Zorlu", typeEN: "Challenging" },
    Hava: { effect: "Fikirlerinizdeki hataları kabul etmek ve zihinsel bir temizlik yapmak durumunda kalırsınız.", effectEN: "You're in a position to accept errors in your ideas and do mental cleansing.", type: "Nötr", typeEN: "Neutral" },
    Su: { effect: "Duygusal bir vedalaşma süreci yaşayabilir, ruhsal yüklerinizden kurtulmaya odaklanırsınız.", effectEN: "You may go through emotional farewells, focusing on releasing spiritual burdens.", type: "Zorlu/Şifalı", typeEN: "Challenging/Healing" }
  },
  balsamic: {
    Ateş: { effect: "Enerjinizin çekildiğini hissedebilir, içe dönmek zorunda kalmaktan sıkılabilirsiniz.", effectEN: "You may feel your energy withdrawing, possibly annoyed at having to turn inward.", type: "Nötr", typeEN: "Neutral" },
    Toprak: { effect: "Sessizce dinlenmek ve gelecek döngü için güç toplamak adına kendinizi geri çekersiniz.", effectEN: "You withdraw to rest quietly and gather strength for the next cycle.", type: "İyi", typeEN: "Good" },
    Hava: { effect: "Zihninizi susturmak ve rüyalarınıza odaklanmak için kendinize alan yaratmalısınız.", effectEN: "You should create space for yourself to quiet your mind and focus on dreams.", type: "Nötr", typeEN: "Neutral" },
    Su: { effect: "Tam bir teslimiyet içinde evrenle birleşmiş hissedebilir, en derin vizyonları görebilirsiniz.", effectEN: "In complete surrender you may feel united with the universe, seeing deepest visions.", type: "Çok İyi", typeEN: "Very Good" }
  }
};

export const SIGN_TO_ELEMENT: Record<string, ElementGroup> = {
  'Koç': 'Ateş', 'Aries': 'Ateş',
  'Aslan': 'Ateş', 'Leo': 'Ateş',
  'Yay': 'Ateş', 'Sagittarius': 'Ateş',
  'Boğa': 'Toprak', 'Taurus': 'Toprak',
  'Başak': 'Toprak', 'Virgo': 'Toprak',
  'Oğlak': 'Toprak', 'Capricorn': 'Toprak',
  'İkizler': 'Hava', 'Gemini': 'Hava',
  'Terazi': 'Hava', 'Libra': 'Hava',
  'Kova': 'Hava', 'Aquarius': 'Hava',
  'Yengeç': 'Su', 'Cancer': 'Su',
  'Akrep': 'Su', 'Scorpio': 'Su',
  'Balık': 'Su', 'Pisces': 'Su'
};

export const ELEMENT_TR_TO_EN: Record<ElementGroup, ElementGroupEN> = {
  'Ateş': 'Fire',
  'Toprak': 'Earth',
  'Hava': 'Air',
  'Su': 'Water'
};

export const EFFECT_TYPE_TR_TO_EN: Record<EffectType, EffectTypeEN> = {
  'İyi': 'Good',
  'Kötü': 'Bad',
  'Nötr': 'Neutral',
  'İyi/Sarsıcı': 'Good/Disruptive',
  'Zorlu': 'Challenging',
  'Zorlu/İyi': 'Challenging/Good',
  'Nötr/İyi': 'Neutral/Good',
  'Zorlu/Şifalı': 'Challenging/Healing',
  'Çok İyi': 'Very Good',
  'İyi/Güçlü': 'Good/Powerful',
  'Nötr/Zorlu': 'Neutral/Challenging'
};

export function getElementFromSign(sign: string): ElementGroup {
  return SIGN_TO_ELEMENT[sign] || 'Ateş';
}

export function getPlanetElementEffect(
  planetKey: PlanetKey,
  planetPositionSign: string,
  targetElementSign: string,
  language: 'tr' | 'en' = 'tr'
): { effect: string; type: string } | null {
  const positionElement = getElementFromSign(planetPositionSign);
  const targetElement = getElementFromSign(targetElementSign);
  
  const planetData = PLANET_ELEMENT_INTERPRETATIONS[planetKey];
  if (!planetData) return null;
  
  const positionData = planetData[positionElement];
  if (!positionData) return null;
  
  const effectData = positionData[targetElement];
  if (!effectData) return null;
  
  if (language === 'en') {
    return {
      effect: effectData.effectEN,
      type: effectData.typeEN
    };
  }
  
  return {
    effect: effectData.effect,
    type: effectData.type
  };
}

export function getPlanetElementEffects(
  planetKey: PlanetKey,
  planetPositionSign: string,
  language: 'tr' | 'en' = 'tr'
): Record<string, { effect: string; type: string }> {
  const positionElement = getElementFromSign(planetPositionSign);
  
  const planetData = PLANET_ELEMENT_INTERPRETATIONS[planetKey];
  if (!planetData) return {};
  
  const positionData = planetData[positionElement];
  if (!positionData) return {};
  
  const result: Record<string, { effect: string; type: string }> = {};
  
  for (const [element, effectData] of Object.entries(positionData)) {
    if (language === 'en') {
      result[element] = {
        effect: effectData.effectEN,
        type: effectData.typeEN
      };
    } else {
      result[element] = {
        effect: effectData.effect,
        type: effectData.type
      };
    }
  }
  
  return result;
}

export function getMoonPhaseElementEffects(
  phase: string,
  language: 'tr' | 'en' = 'tr'
): Record<string, { effect: string; type: string }> | null {
  const phaseData = MOON_PHASE_ELEMENT_INTERPRETATIONS[phase];
  if (!phaseData) return null;
  
  const result: Record<string, { effect: string; type: string }> = {};
  
  for (const [element, effectData] of Object.entries(phaseData)) {
    if (language === 'en') {
      result[element] = {
        effect: effectData.effectEN,
        type: effectData.typeEN
      };
    } else {
      result[element] = {
        effect: effectData.effect,
        type: effectData.type
      };
    }
  }
  
  return result;
}

export function getMoonPhaseElementEffect(
  phase: string,
  element: ElementGroup,
  language: 'tr' | 'en' = 'tr'
): { effect: string; type: string } | null {
  const phaseData = MOON_PHASE_ELEMENT_INTERPRETATIONS[phase];
  if (!phaseData) return null;
  
  const effectData = phaseData[element];
  if (!effectData) return null;
  
  if (language === 'en') {
    return {
      effect: effectData.effectEN,
      type: effectData.typeEN
    };
  }
  
  return {
    effect: effectData.effect,
    type: effectData.type
  };
}
