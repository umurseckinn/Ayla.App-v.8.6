export interface LifeEvent {
  event_id: string;
  event_name_tr: string;
  event_name_en: string;
  category: "Social" | "Career" | "Love" | "Health" | "Finance";
  polarity: "Positive" | "Negative";
  base_impact_percent: number;
  anticipation_window: number;
  anticipation_slope: "Linear" | "Exponential";
  recovery_window: number;
  recovery_decay: "Rapid" | "Slow";
  icon: string;
  isPlannable: boolean;
}

export const LIFE_EVENTS: LifeEvent[] = [
  // SOCIAL
  {
    event_id: "EVT_001_SOC",
    event_name_tr: "Tatile Çıkış",
    event_name_en: "Going on Vacation",
    category: "Social",
    polarity: "Positive",
    base_impact_percent: 35,
    anticipation_window: 7,
    anticipation_slope: "Linear",
    recovery_window: 7,
    recovery_decay: "Slow",
    icon: "🏖️",
    isPlannable: true
  },
  {
    event_id: "EVT_002_SOC",
    event_name_tr: "Doğum Günü Partisi",
    event_name_en: "Birthday Party",
    category: "Social",
    polarity: "Positive",
    base_impact_percent: 25,
    anticipation_window: 3,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Slow",
    icon: "🎂",
    isPlannable: true
  },
  {
    event_id: "EVT_003_SOC",
    event_name_tr: "Arkadaşla Kahve",
    event_name_en: "Coffee with Friend",
    category: "Social",
    polarity: "Positive",
    base_impact_percent: 12,
    anticipation_window: 1,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "☕",
    isPlannable: true
  },
  {
    event_id: "EVT_004_SOC",
    event_name_tr: "Beklenmedik Misafir",
    event_name_en: "Unexpected Guest",
    category: "Social",
    polarity: "Negative",
    base_impact_percent: -15,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🚪",
    isPlannable: false
  },
  {
    event_id: "EVT_005_SOC",
    event_name_tr: "Kavga / Anlaşmazlık",
    event_name_en: "Fight / Disagreement",
    category: "Social",
    polarity: "Negative",
    base_impact_percent: -25,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Slow",
    icon: "🗯️",
    isPlannable: false
  },
  {
    event_id: "EVT_006_SOC",
    event_name_tr: "Eski Bir Dostla Karşılaşma",
    event_name_en: "Meeting an Old Friend",
    category: "Social",
    polarity: "Positive",
    base_impact_percent: 20,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Slow",
    icon: "👋",
    isPlannable: false
  },
  {
    event_id: "EVT_007_SOC",
    event_name_tr: "Networking Etkinliği",
    event_name_en: "Networking Event",
    category: "Social",
    polarity: "Positive",
    base_impact_percent: 15,
    anticipation_window: 2,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🤝",
    isPlannable: true
  },
  {
    event_id: "EVT_008_SOC",
    event_name_tr: "Topluluk Önünde Konuşma",
    event_name_en: "Public Speaking",
    category: "Social",
    polarity: "Negative",
    base_impact_percent: -20,
    anticipation_window: 4,
    anticipation_slope: "Exponential",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🎤",
    isPlannable: true
  },
  {
    event_id: "EVT_009_SOC",
    event_name_tr: "Dedikodu / Misunderstanding",
    event_name_en: "Gossip / Misunderstanding",
    category: "Social",
    polarity: "Negative",
    base_impact_percent: -18,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 4,
    recovery_decay: "Slow",
    icon: "🙊",
    isPlannable: false
  },

  // CAREER
  {
    event_id: "EVT_001_CAR",
    event_name_tr: "İş Görüşmesi",
    event_name_en: "Job Interview",
    category: "Career",
    polarity: "Negative",
    base_impact_percent: -20,
    anticipation_window: 3,
    anticipation_slope: "Exponential",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "💼",
    isPlannable: true
  },
  {
    event_id: "EVT_002_CAR",
    event_name_tr: "Sınav",
    event_name_en: "Exam",
    category: "Career",
    polarity: "Negative",
    base_impact_percent: -25,
    anticipation_window: 5,
    anticipation_slope: "Exponential",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "📝",
    isPlannable: true
  },
  {
    event_id: "EVT_003_CAR",
    event_name_tr: "Önemli Toplantı",
    event_name_en: "Important Meeting",
    category: "Career",
    polarity: "Negative",
    base_impact_percent: -15,
    anticipation_window: 3,
    anticipation_slope: "Exponential",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "📊",
    isPlannable: true
  },
  {
    event_id: "EVT_004_CAR",
    event_name_tr: "Zam / Maaş Artışı",
    event_name_en: "Raise / Salary Increase",
    category: "Career",
    polarity: "Positive",
    base_impact_percent: 40,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 14,
    recovery_decay: "Slow",
    icon: "💸",
    isPlannable: false
  },
  {
    event_id: "EVT_005_CAR",
    event_name_tr: "Yeni Proje Başlangıcı",
    event_name_en: "New Project Start",
    category: "Career",
    polarity: "Positive",
    base_impact_percent: 20,
    anticipation_window: 2,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Rapid",
    icon: "🚀",
    isPlannable: true
  },
  {
    event_id: "EVT_006_CAR",
    event_name_tr: "İşten Ayrılma / İstifa",
    event_name_en: "Resignation / Leaving Job",
    category: "Career",
    polarity: "Negative",
    base_impact_percent: -35,
    anticipation_window: 5,
    anticipation_slope: "Linear",
    recovery_window: 14,
    recovery_decay: "Slow",
    icon: "🚪",
    isPlannable: true
  },
  {
    event_id: "EVT_007_CAR",
    event_name_tr: "Terfi Almak",
    event_name_en: "Getting Promoted",
    category: "Career",
    polarity: "Positive",
    base_impact_percent: 45,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 21,
    recovery_decay: "Slow",
    icon: "🏆",
    isPlannable: false
  },
  {
    event_id: "EVT_008_CAR",
    event_name_tr: "Tükenmişlik (Burnout)",
    event_name_en: "Burnout",
    category: "Career",
    polarity: "Negative",
    base_impact_percent: -40,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 14,
    recovery_decay: "Slow",
    icon: "😫",
    isPlannable: false
  },

  // LOVE
  {
    event_id: "EVT_001_LOV",
    event_name_tr: "Evlilik / Düğün",
    event_name_en: "Marriage / Wedding",
    category: "Love",
    polarity: "Positive",
    base_impact_percent: 40,
    anticipation_window: 14,
    anticipation_slope: "Exponential",
    recovery_window: 30,
    recovery_decay: "Slow",
    icon: "💒",
    isPlannable: true
  },
  {
    event_id: "EVT_002_LOV",
    event_name_tr: "İlk Buluşma / Date",
    event_name_en: "First Date",
    category: "Love",
    polarity: "Positive",
    base_impact_percent: 20,
    anticipation_window: 2,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Slow",
    icon: "💕",
    isPlannable: true
  },
  {
    event_id: "EVT_003_LOV",
    event_name_tr: "Eski Sevgiliden Mesaj",
    event_name_en: "Message from Ex",
    category: "Love",
    polarity: "Negative",
    base_impact_percent: -30,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 4,
    recovery_decay: "Slow",
    icon: "📱",
    isPlannable: false
  },
  {
    event_id: "EVT_004_LOV",
    event_name_tr: "Romantik Akşam Yemeği",
    event_name_en: "Romantic Dinner",
    category: "Love",
    polarity: "Positive",
    base_impact_percent: 25,
    anticipation_window: 2,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Rapid",
    icon: "🕯️",
    isPlannable: true
  },
  {
    event_id: "EVT_005_LOV",
    event_name_tr: "Kalp Kırıklığı / Ayrılık",
    event_name_en: "Heartbreak / Breakup",
    category: "Love",
    polarity: "Negative",
    base_impact_percent: -45,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 21,
    recovery_decay: "Slow",
    icon: "💔",
    isPlannable: false
  },
  {
    event_id: "EVT_006_LOV",
    event_name_tr: "Yıldönümü",
    event_name_en: "Anniversary",
    category: "Love",
    polarity: "Positive",
    base_impact_percent: 30,
    anticipation_window: 5,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Slow",
    icon: "💎",
    isPlannable: true
  },
  {
    event_id: "EVT_007_LOV",
    event_name_tr: "Eve Taşınma (Birlikte)",
    event_name_en: "Moving In Together",
    category: "Love",
    polarity: "Positive",
    base_impact_percent: 35,
    anticipation_window: 10,
    anticipation_slope: "Linear",
    recovery_window: 14,
    recovery_decay: "Slow",
    icon: "📦",
    isPlannable: true
  },

  // HEALTH
  {
    event_id: "EVT_001_HEA",
    event_name_tr: "Tıbbi Operasyon / Ameliyat",
    event_name_en: "Medical Operation",
    category: "Health",
    polarity: "Negative",
    base_impact_percent: -40,
    anticipation_window: 10,
    anticipation_slope: "Exponential",
    recovery_window: 20,
    recovery_decay: "Slow",
    icon: "🏥",
    isPlannable: true
  },
  {
    event_id: "EVT_002_HEA",
    event_name_tr: "Detoks Günü",
    event_name_en: "Detox Day",
    category: "Health",
    polarity: "Positive",
    base_impact_percent: 15,
    anticipation_window: 1,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Slow",
    icon: "🥬",
    isPlannable: true
  },
  {
    event_id: "EVT_003_HEA",
    event_name_tr: "Hastalık",
    event_name_en: "Illness",
    category: "Health",
    polarity: "Negative",
    base_impact_percent: -20,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 5,
    recovery_decay: "Slow",
    icon: "🤒",
    isPlannable: false
  },
  {
    event_id: "EVT_004_HEA",
    event_name_tr: "Diş Randevusu",
    event_name_en: "Dental Appointment",
    category: "Health",
    polarity: "Negative",
    base_impact_percent: -15,
    anticipation_window: 3,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🦷",
    isPlannable: true
  },
  {
    event_id: "EVT_005_HEA",
    event_name_tr: "Uykusuzluk",
    event_name_en: "Insomnia",
    category: "Health",
    polarity: "Negative",
    base_impact_percent: -15,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🥱",
    isPlannable: false
  },
  {
    event_id: "EVT_006_HEA",
    event_name_tr: "Ruh Sağlığı Günü",
    event_name_en: "Mental Health Day",
    category: "Health",
    polarity: "Positive",
    base_impact_percent: 20,
    anticipation_window: 1,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Slow",
    icon: "🧘",
    isPlannable: true
  },

  // FINANCE
  {
    event_id: "EVT_001_FIN",
    event_name_tr: "Borç / Kredi Kapatma",
    event_name_en: "Debt / Loan Payoff",
    category: "Finance",
    polarity: "Positive",
    base_impact_percent: 30,
    anticipation_window: 2,
    anticipation_slope: "Linear",
    recovery_window: 7,
    recovery_decay: "Slow",
    icon: "💰",
    isPlannable: true
  },
  {
    event_id: "EVT_002_FIN",
    event_name_tr: "Beklenmedik Hediye / Gelir",
    event_name_en: "Unexpected Gift / Income",
    category: "Finance",
    polarity: "Positive",
    base_impact_percent: 35,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 5,
    recovery_decay: "Slow",
    icon: "🎁",
    isPlannable: false
  },
  {
    event_id: "EVT_003_FIN",
    event_name_tr: "Büyük Alışveriş",
    event_name_en: "Big Purchase",
    category: "Finance",
    polarity: "Negative",
    base_impact_percent: -20,
    anticipation_window: 3,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Rapid",
    icon: "🛍️",
    isPlannable: true
  },
  {
    event_id: "EVT_004_FIN",
    event_name_tr: "Kayıp / Hırsızlık",
    event_name_en: "Loss / Theft",
    category: "Finance",
    polarity: "Negative",
    base_impact_percent: -40,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 10,
    recovery_decay: "Slow",
    icon: "🕵️",
    isPlannable: false
  },
  {
    event_id: "EVT_005_FIN",
    event_name_tr: "Yatırım Yapma",
    event_name_en: "Making Investment",
    category: "Finance",
    polarity: "Positive",
    base_impact_percent: 15,
    anticipation_window: 1,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Slow",
    icon: "📈",
    isPlannable: true
  },
  {
    event_id: "EVT_006_FIN",
    event_name_tr: "Beklenmedik Masraf",
    event_name_en: "Unexpected Expense",
    category: "Finance",
    polarity: "Negative",
    base_impact_percent: -25,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 4,
    recovery_decay: "Rapid",
    icon: "💸",
    isPlannable: false
  }
];

export interface UserLifeEvent {
  event_id: string;
  event_date: string;
}

export function calculateLifeEventImpact(
  targetDate: Date,
  userEvents: UserLifeEvent[]
): number {
  let totalImpact = 0;

  for (const userEvent of userEvents) {
    const eventData = LIFE_EVENTS.find(e => e.event_id === userEvent.event_id);
    if (!eventData) continue;

    const eventDate = new Date(userEvent.event_date);
    eventDate.setHours(0, 0, 0, 0);

    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((target.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      totalImpact += eventData.base_impact_percent;
    } else if (daysDiff < 0 && Math.abs(daysDiff) <= eventData.anticipation_window) {
      const daysUntilEvent = Math.abs(daysDiff);
      let factor: number;

      if (eventData.anticipation_slope === "Exponential") {
        factor = Math.pow(1 - (daysUntilEvent / eventData.anticipation_window), 2);
      } else {
        factor = 1 - (daysUntilEvent / eventData.anticipation_window);
      }

      totalImpact += eventData.base_impact_percent * factor;
    } else if (daysDiff > 0 && daysDiff <= eventData.recovery_window) {
      let factor: number;

      if (eventData.recovery_decay === "Rapid") {
        factor = Math.pow(1 - (daysDiff / eventData.recovery_window), 2);
      } else {
        factor = 1 - (daysDiff / eventData.recovery_window);
      }

      totalImpact += eventData.base_impact_percent * factor;
    }
  }

  return Math.round(totalImpact);
}

export function getCategoryColor(category: LifeEvent["category"]): string {
  const colors = {
    Social: "#8B5CF6",
    Career: "#F59E0B",
    Love: "#EC4899",
    Health: "#10B981",
    Finance: "#3B82F6"
  };
  return colors[category];
}

export function getCategoryName(category: LifeEvent["category"], language: string = 'tr'): string {
  const namesTr = {
    Social: "Sosyal",
    Career: "Kariyer",
    Love: "Aşk",
    Health: "Sağlık",
    Finance: "Finans"
  };
  const namesEn = {
    Social: "Social",
    Career: "Career",
    Love: "Love",
    Health: "Health",
    Finance: "Finance"
  };
  return language === 'en' ? namesEn[category] : namesTr[category];
}

export function getEventName(event: LifeEvent, language: string = 'tr'): string {
  return language === 'en' ? event.event_name_en : event.event_name_tr;
}
