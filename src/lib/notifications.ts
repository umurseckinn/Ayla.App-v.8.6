
import { LocalNotifications } from '@capacitor/local-notifications';
import { calculateDailyEnergy } from './planetary-energy-service';

export interface NotificationContent {
  title: string;
  body: string;
}

const LOW_ENERGY_MESSAGES = {
  tr: (score: number): NotificationContent[] => [
    {
      title: "Canım, enerjin biraz düşük mü? 🌑",
      body: "Hiç sorun değil. Bazen sadece durmak gerekir. Bugünü beraber en yumuşak şekilde atlatalım mı?"
    },
    {
      title: "Kendine nazik olma zamanı 🕯️",
      body: `Enerji seviyen %${score} civarında. Bugün dünyayı kurtarmak zorunda değilsin, sadece nefes al ve kendine odaklan.`
    },
    {
      title: "Ayla senin yanında... 🤍",
      body: "Yıldızlar bazen dinlenmemizi ister. Enerjini korumak için bugün neleri erteleyebilirsin? Tavsiyelerime göz at."
    }
  ],
  en: (score: number): NotificationContent[] => [
    {
      title: "Honey, is your energy a bit low? 🌑",
      body: "No problem at all. Sometimes you just need to stop. Shall we get through today in the softest way possible?"
    },
    {
      title: "Time to be gentle with yourself 🕯️",
      body: `Your energy level is around %${score}. You don't have to save the world today, just breathe and focus on yourself.`
    },
    {
      title: "Ayla is with you... 🤍",
      body: "Stars sometimes want us to rest. What can you postpone today to protect your energy? Check out my recommendations."
    }
  ]
};

const NEUTRAL_ENERGY_MESSAGES = {
  tr: (score: number): NotificationContent[] => [
    {
      title: "Her şey dengede ve akışta ⚖️",
      body: `Enerjin %${score}, tam kararında! Ne çok aceleci ne çok yavaş. Bugün odaklanmak istediğin işler için ideal bir gün.`
    },
    {
      title: "Sakin bir güç içindesin 🌿",
      body: "Kozmik pillerin yarı yarıya dolu. Bu dengeyi korumak için bugünkü rutinlerine göz atmak ister misin?"
    },
    {
      title: "Ayla: Stabil bir gün seni bekliyor ⚓",
      body: "Ruhsal ve zihinsel enerjin uyum içinde. Bu dinginliği verimli kullanmak senin elinde."
    }
  ],
  en: (score: number): NotificationContent[] => [
    {
      title: "Everything is in balance and flow ⚖️",
      body: `Your energy is %${score}, just right! Neither too rushed nor too slow. An ideal day for the tasks you want to focus on.`
    },
    {
      title: "You are in a calm power 🌿",
      body: "Your cosmic batteries are half full. Would you like to check your routines today to maintain this balance?"
    },
    {
      title: "Ayla: A stable day awaits you ⚓",
      body: "Your spiritual and mental energy are in harmony. It's up to you to use this serenity efficiently."
    }
  ]
};

const HIGH_ENERGY_MESSAGES = {
  tr: (score: number): NotificationContent[] => [
    {
      title: "Bugün parlıyorsun! ✨",
      body: `Enerji seviyen %${score}! Bu harika enerjiyi nereye kanalize etmek istersin? Yıldızlar arkanda!`
    },
    {
      title: "Harekete geçme zamanı! 🔥",
      body: "İçindeki kozmik güç uyandı. Ertelediğin o zor işi halletmek veya yeni bir şeye başlamak için mükemmel an."
    },
    {
      title: "Ayla: Seni kimse tutamaz 🚀",
      body: "Zihinsel ve fiziksel enerjin zirvede. Bugün potansiyelini gerçekleştirmek için haritana bakmalısın."
    }
  ],
  en: (score: number): NotificationContent[] => [
    {
      title: "You are shining today! ✨",
      body: `Your energy level is %${score}! Where would you like to channel this great energy? The stars are behind you!`
    },
    {
      title: "Time to take action! 🔥",
      body: "The cosmic power within you has awakened. The perfect moment to handle that difficult task you've been putting off or start something new."
    },
    {
      title: "Ayla: No one can hold you back 🚀",
      body: "Your mental and physical energy are at their peak. You should check your chart today to realize your potential."
    }
  ]
};

// 24-Day Engagement Cycle Data
const ENGAGEMENT_CYCLES = {
  tr: [
    // Cycle 0: Base
    [
      { title: "Aşk Uyumu & Tarot", body: "O'nun doğru kişi olduğundan emin misin? Hadi aşk uyumunuza ve tarot falınıza bakarak kapsamlı bir değerlendirme yapalım." },
      { title: "Retro Etkisi", body: "Eski bir tanıdıktan mesaj mı aldın? Retro enerjisi geçmişi canlandırıyor olabilir. Bu dönemi en az hasarla atlatman için haritandaki retro etkilerini hemen inceleyelim." },
      { title: "Ay Fazı Etkisi", body: "Ay’ın gökyüzündeki yolculuğu bugün senin iç dünyanda yeni bir kapı aralıyor. Bu döngü sana ne anlatmak istiyor? Gel, fısıldadıklarını birlikte dinleyelim." },
      { title: "Genel Gezegen Transiti", body: "Gökyüzü yer değiştiriyor, peki ya sen? Şu anki gezegen transitleri hayatında yeni bir kapı açıyor olabilir. Bu kozmik trafiğin senin için ne anlama geldiğine beraber bakalım mı?" }
    ],
    // Cycle 1: Variation A
    [
      { title: "Aşk Uyumu & Tarot", body: "Kalbinin sesini mi dinliyorsun yoksa mantığını mı? Aranızdaki çekimi yıldızlar anlatsın, tarot ise son sözü söylesin." },
      { title: "Retro Etkisi", body: "Eski bir tanıdıktan gelen mesaj tesadüf mü? Retro etkisi kapını çalıyor; geçmişle yüzleşmeden önce haritana bir bak." },
      { title: "Ay Fazı Etkisi", body: "Ruhundaki gelgitlerin gökyüzünde bir karşılığı var. Ay'ın bugünkü fazı senin enerjini nasıl etkiliyor? Hadi, beraber keşfedelim." },
      { title: "Genel Gezegen Transiti", body: "Gökyüzünde büyük bir hareketlilik var! Gezegenlerin yeni konumları senin için hangi kapıları açıyor? Hemen incele." }
    ],
    // Cycle 2: Variation B
    [
      { title: "Aşk Uyumu & Tarot", body: "Yeni biriyle mi tanıştın? Yıldız haritalarınızın ne kadar uyumlu olduğunu ve kartların sizin için ne fısıldadığını keşfet." },
      { title: "Retro Etkisi", body: "İşler bugün biraz aksıyor mu? Retro dönemi seni durup düşünmeye çağırıyor. Bu süreci yönetmen için rehberin hazır." },
      { title: "Ay Fazı Etkisi", body: "Ay'ın döngüsü bugün seni hangi duygulara hazırlıyor? Gökyüzündeki güncel akışın senin haritana özel etkilerini incelemek için buradayım." },
      { title: "Genel Gezegen Transiti", body: "Bugün şansın nereden geleceğini bilmek ister misin? Güncel gezegen transitlerini senin haritana özel yorumladık." }
    ],
    // Cycle 3: Variation C
    [
      { title: "Aşk Uyumu & Tarot", body: "İlişkinde bir dönüm noktasındaysan cevaplar gökyüzünde saklı. Aşk uyumu analizi ve tarot yorumunla yolunu aydınlatalım." },
      { title: "Retro Etkisi", body: "Zihnin karışık, teknolojik aksilikler kapıda mı? Korkma, sadece Retro'dayız! Bu enerjiyi lehine çevirmenin yollarını öğren." },
      { title: "Ay Fazı Etkisi", body: "Gökyüzü şu an senin için hangi hikayeyi yazıyor? Ay'ın mevcut fazının hayatındaki etkilerini ve sana fısıldadıklarını okumak için uygulamaya gel." },
      { title: "Genel Gezegen Transiti", body: "Hayatındaki ani değişimlerin sebebi yıldızlar olabilir. Anlık gökyüzü trafiği senin evlerini nasıl etkiliyor? Hadi gel, bakalım." }
    ],
    // Cycle 4: Variation D
    [
      { title: "Aşk Uyumu & Tarot", body: "Ruh eşini bulup bulmadığını merak ediyor musun? Kozmik uyumunuzu ve günün tarot mesajını kaçırma." },
      { title: "Retro Etkisi", body: "Yarım kalan meseleler neden şimdi gündemde? Retro enerjisiyle şifalanmak ve hataları düzeltmek için haritandaki etkileri oku." },
      { title: "Ay Fazı Etkisi", body: "Günün kozmik ritmi Ay ile belirleniyor. Bugünkü döngü senin için bir başlangıç mı yoksa bir tamamlanma mı? Cevabı senin için hazırladık." },
      { title: "Genel Gezegen Transiti", body: "Yıldızlar bugün senin için fısıldıyor: Değişim kapıda! Gezegen etkilerini okumadan bugünkü kararlarını verme." }
    ],
    // Cycle 5: Variation E
    [
      { title: "Aşk Uyumu & Tarot", body: "Aklındaki o kişiyle geleceğiniz nasıl görünüyor? Hadi, aşkın gizemini ve kartların rehberliğini beraber çözelim." },
      { title: "Retro Etkisi", body: "Hayat biraz yavaşladıysa sebebi gökyüzündeki geri hareket olabilir. Bu dönemin senin için sunduğu gizli fırsatları keşfet." },
      { title: "Ay Fazı Etkisi", body: "Duyguların bugün gökyüzüyle ne kadar uyumlu? Ay'ın anlık konumu ve senin burcuna yansımalarına bir göz at, gününü kozmik akışa göre planla." },
      { title: "Genel Gezegen Transiti", body: "Kaderindeki yeni dönemeçleri merak ediyor musun? Gezegen transitlerinin senin üzerindeki etkisini şimdi oku, hazırlıklı ol." }
    ]
  ],
  en: [
    // Cycle 0: Base
    [
      { title: "Love Compatibility & Tarot", body: "Are you sure he/she is the right person? Let's make a comprehensive evaluation by looking at your love compatibility and tarot reading." },
      { title: "Retro Effect", body: "Did you receive a message from an old acquaintance? Retro energy might be reviving the past. Let's immediately examine the retro effects in your chart to get through this period with minimal damage." },
      { title: "Moon Phase Effect", body: "The Moon's journey in the sky is opening a new door in your inner world today. What does this cycle want to tell you? Come, let's listen to its whispers together." },
      { title: "General Planetary Transit", body: "The sky is shifting, what about you? Current planetary transits might be opening a new door in your life. Shall we see together what this cosmic traffic means for you?" }
    ],
    // Cycle 1: Variation A
    [
      { title: "Love Compatibility & Tarot", body: "Are you listening to your heart or your logic? Let the stars tell the attraction between you, and let the tarot have the final word." },
      { title: "Retro Effect", body: "Is the message from an old acquaintance a coincidence? Retro effect is knocking on your door; check your chart before facing the past." },
      { title: "Moon Phase Effect", body: "The tides in your soul have a counterpart in the sky. How does today's Moon phase affect your energy? Come, let's explore together." },
      { title: "General Planetary Transit", body: "There is great activity in the sky! What doors are the new positions of the planets opening for you? Examine immediately." }
    ],
    // Cycle 2: Variation B
    [
      { title: "Love Compatibility & Tarot", body: "Did you meet someone new? Discover how compatible your star charts are and what the cards whisper for you." },
      { title: "Retro Effect", body: "Are things lagging a bit today? The retro period calls you to stop and think. Your guide is ready for you to manage this process." },
      { title: "Moon Phase Effect", body: "What emotions is the Moon's cycle preparing you for today? I am here to examine the specific effects of the current flow in the sky on your chart." },
      { title: "General Planetary Transit", body: "Would you like to know where your luck will come from today? We interpreted the current planetary transits specifically for your chart." }
    ],
    // Cycle 3: Variation C
    [
      { title: "Love Compatibility & Tarot", body: "If you are at a turning point in your relationship, the answers are hidden in the sky. Let's illuminate your path with love compatibility analysis and tarot interpretation." },
      { title: "Retro Effect", body: "Is your mind confused, are technological mishaps at the door? Don't be afraid, we are just in Retro! Learn ways to turn this energy in your favor." },
      { title: "Moon Phase Effect", body: "What story is the sky writing for you right now? Come to the app to read the effects of the Moon's current phase on your life and what it whispers to you." },
      { title: "General Planetary Transit", body: "The reason for sudden changes in your life might be the stars. How does the instant sky traffic affect your houses? Come on, let's see." }
    ],
    // Cycle 4: Variation D
    [
      { title: "Love Compatibility & Tarot", body: "Are you wondering if you found your soulmate? Don't miss your cosmic compatibility and the tarot message of the day." },
      { title: "Retro Effect", body: "Why are unfinished issues on the agenda now? Read the effects in your chart to heal with retro energy and correct mistakes." },
      { title: "Moon Phase Effect", body: "The cosmic rhythm of the day is determined by the Moon. Is today's cycle a beginning or a completion for you? We prepared the answer for you." },
      { title: "General Planetary Transit", body: "The stars are whispering for you today: Change is at the door! Do not make today's decisions without reading the planetary effects." }
    ],
    // Cycle 5: Variation E
    [
      { title: "Love Compatibility & Tarot", body: "How does your future look with that person in your mind? Come on, let's solve the mystery of love and the guidance of the cards together." },
      { title: "Retro Effect", body: "If life has slowed down a bit, the reason might be the retrograde motion in the sky. Discover the hidden opportunities this period offers you." },
      { title: "Moon Phase Effect", body: "How compatible are your emotions with the sky today? Take a look at the Moon's current position and its reflections on your sign, plan your day according to the cosmic flow." },
      { title: "General Planetary Transit", body: "Are you wondering about the new turns in your destiny? Read the effect of planetary transits on you now, be prepared." }
    ]
  ]
};

export async function requestNotificationPermissions(): Promise<boolean> {
  try {
    const result = await LocalNotifications.requestPermissions();
    return result.display === 'granted';
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
}

export async function scheduleEnergyNotifications(
  birthDate: Date,
  birthTime: string = "12:00",
  birthPlace: string = "Istanbul",
  language: 'tr' | 'en' = 'tr'
) {
  try {
    // Check permissions first
    const perm = await LocalNotifications.checkPermissions();
    if (perm.display !== 'granted') {
      const granted = await requestNotificationPermissions();
      if (!granted) return;
    }

    // Cancel existing notifications to avoid duplicates
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel(pending);
    }

    const notifications = [];
    const today = new Date();
    
    // Flatten engagement messages for easier cyclic access
    const engagementCyclesForLang = ENGAGEMENT_CYCLES[language];
    const allEngagementMessages = engagementCyclesForLang.flat();

    // Schedule for 30 days (Safe limit for local notifications to avoid OS limits)
    // Both Energy and Engagement notifications will be scheduled for every single day.
    const SCHEDULE_DAYS = 30;

    for (let i = 0; i < SCHEDULE_DAYS; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + i);
      
      // --- 1. Energy Notification (12:00) ---
      const energyDate = new Date(targetDate);
      energyDate.setHours(12, 0, 0, 0);

      // Skip if time has already passed for today
      if (energyDate.getTime() > Date.now()) {
        const energyResult = await calculateDailyEnergy(
          energyDate,
          birthDate,
          birthTime,
          birthPlace,
          undefined, // extraContext
          language
        );

        const score = energyResult.overallEnergy;
        let content: NotificationContent;

        // Select message based on score and language
        const lowMsgs = LOW_ENERGY_MESSAGES[language](score);
        const neutralMsgs = NEUTRAL_ENERGY_MESSAGES[language](score);
        const highMsgs = HIGH_ENERGY_MESSAGES[language](score);

        if (score <= 33) {
          content = lowMsgs[Math.floor(Math.random() * lowMsgs.length)];
        } else if (score <= 66) {
          content = neutralMsgs[Math.floor(Math.random() * neutralMsgs.length)];
        } else {
          content = highMsgs[Math.floor(Math.random() * highMsgs.length)];
        }

        notifications.push({
          id: i + 1, // IDs 1-30
          title: content.title,
          body: content.body,
          schedule: { at: energyDate },
          sound: undefined,
          attachments: undefined,
          actionTypeId: "",
          extra: { type: 'energy' }
        });
      }

      // --- 2. Engagement Notification (18:00) ---
      const engagementDate = new Date(targetDate);
      engagementDate.setHours(18, 0, 0, 0);

      if (engagementDate.getTime() > Date.now()) {
        // Use modulo to cycle through messages indefinitely
        // i=0 -> msg 0, i=23 -> msg 23, i=24 -> msg 0, etc.
        const msgIndex = i % allEngagementMessages.length;
        const message = allEngagementMessages[msgIndex];

        notifications.push({
          id: 100 + i + 1, // IDs 101-130
          title: message.title,
          body: message.body,
          schedule: { at: engagementDate },
          sound: undefined,
          attachments: undefined,
          actionTypeId: "",
          extra: { type: 'engagement' }
        });
      }
    }

    if (notifications.length > 0) {
      await LocalNotifications.schedule({ notifications });
      console.log(`Scheduled ${notifications.length} notifications (Energy + Engagement) for next ${SCHEDULE_DAYS} days in ${language}.`);
    }

  } catch (error) {
    console.error('Error scheduling notifications:', error);
  }
}
