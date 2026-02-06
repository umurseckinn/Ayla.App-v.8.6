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
    event_id: "EVT_SOC_001",
    event_name_tr: "Konser / Festival",
    event_name_en: "Concert / Festival",
    category: "Social",
    polarity: "Positive",
    base_impact_percent: 30,
    anticipation_window: 14,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Slow",
    icon: "🎸",
    isPlannable: true
  },
  {
    event_id: "EVT_SOC_002",
    event_name_tr: "Aile Yemeği",
    event_name_en: "Family Dinner",
    category: "Social",
    polarity: "Positive",
    base_impact_percent: 15,
    anticipation_window: 2,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🍲",
    isPlannable: true
  },
  {
    event_id: "EVT_SOC_003",
    event_name_tr: "Evcil Hayvan Sahiplenme",
    event_name_en: "Adopting a Pet",
    category: "Social",
    polarity: "Positive",
    base_impact_percent: 40,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 30,
    recovery_decay: "Slow",
    icon: "🐾",
    isPlannable: true
  },
  {
    event_id: "EVT_SOC_004",
    event_name_tr: "Oyun Gecesi",
    event_name_en: "Game Night",
    category: "Social",
    polarity: "Positive",
    base_impact_percent: 12,
    anticipation_window: 1,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🎲",
    isPlannable: true
  },
  {
    event_id: "EVT_SOC_005",
    event_name_tr: "Gönüllü Yardım Faaliyeti",
    event_name_en: "Volunteering Activity",
    category: "Social",
    polarity: "Positive",
    base_impact_percent: 25,
    anticipation_window: 1,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Slow",
    icon: "🤝",
    isPlannable: true
  },
  {
    event_id: "EVT_SOC_006",
    event_name_tr: "Son Dakika Plan İptali",
    event_name_en: "Last Minute Cancellation",
    category: "Social",
    polarity: "Negative",
    base_impact_percent: -10,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🚫",
    isPlannable: false
  },
  {
    event_id: "EVT_SOC_007",
    event_name_tr: "Sosyal Medya Linci / Tartışması",
    event_name_en: "Social Media Argument",
    category: "Social",
    polarity: "Negative",
    base_impact_percent: -25,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 5,
    recovery_decay: "Slow",
    icon: "🤬",
    isPlannable: false
  },
  {
    event_id: "EVT_SOC_008",
    event_name_tr: "Komşu Gürültüsü / Sorunu",
    event_name_en: "Neighbor Noise / Issue",
    category: "Social",
    polarity: "Negative",
    base_impact_percent: -12,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Rapid",
    icon: "📢",
    isPlannable: false
  },
  {
    event_id: "EVT_SOC_009",
    event_name_tr: "Trafikte Kalmak",
    event_name_en: "Stuck in Traffic",
    category: "Social",
    polarity: "Negative",
    base_impact_percent: -8,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🚦",
    isPlannable: false
  },
  {
    event_id: "EVT_SOC_010",
    event_name_tr: "Değerli Bir Eşyayı Kaybetmek",
    event_name_en: "Losing a Valuable Item",
    category: "Social",
    polarity: "Negative",
    base_impact_percent: -22,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 7,
    recovery_decay: "Slow",
    icon: "🎒",
    isPlannable: false
  },

  // CAREER
  {
    event_id: "EVT_CAR_001",
    event_name_tr: "Proje Teslimi / Deadline",
    event_name_en: "Project Delivery / Deadline",
    category: "Career",
    polarity: "Positive",
    base_impact_percent: 25,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Rapid",
    icon: "🏁",
    isPlannable: true
  },
  {
    event_id: "EVT_CAR_002",
    event_name_tr: "Yöneticiden Övgü",
    event_name_en: "Praise from Manager",
    category: "Career",
    polarity: "Positive",
    base_impact_percent: 18,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Slow",
    icon: "🌟",
    isPlannable: false
  },
  {
    event_id: "EVT_CAR_003",
    event_name_tr: "Mesleki Eğitim / Sertifika",
    event_name_en: "Vocational Training / Certificate",
    category: "Career",
    polarity: "Positive",
    base_impact_percent: 22,
    anticipation_window: 5,
    anticipation_slope: "Linear",
    recovery_window: 7,
    recovery_decay: "Slow",
    icon: "📜",
    isPlannable: true
  },
  {
    event_id: "EVT_CAR_004",
    event_name_tr: "İş Gezisi",
    event_name_en: "Business Trip",
    category: "Career",
    polarity: "Negative",
    base_impact_percent: -10,
    anticipation_window: 2,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Rapid",
    icon: "✈️",
    isPlannable: true
  },
  {
    event_id: "EVT_CAR_005",
    event_name_tr: "Teknik Arıza / Bilgisayar Çökmesi",
    event_name_en: "Technical Failure / Crash",
    category: "Career",
    polarity: "Negative",
    base_impact_percent: -18,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Rapid",
    icon: "💻",
    isPlannable: false
  },
  {
    event_id: "EVT_CAR_006",
    event_name_tr: "Fazla Mesai (Overtime)",
    event_name_en: "Overtime",
    category: "Career",
    polarity: "Negative",
    base_impact_percent: -15,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Rapid",
    icon: "🌙",
    isPlannable: false
  },
  {
    event_id: "EVT_CAR_007",
    event_name_tr: "Hatalı E-posta Gönderimi",
    event_name_en: "Incorrect Email Sending",
    category: "Career",
    polarity: "Negative",
    base_impact_percent: -12,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Rapid",
    icon: "📤",
    isPlannable: false
  },
  {
    event_id: "EVT_CAR_008",
    event_name_tr: "Müşteri Şikayeti",
    event_name_en: "Customer Complaint",
    category: "Career",
    polarity: "Negative",
    base_impact_percent: -20,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Slow",
    icon: "😤",
    isPlannable: false
  },
  {
    event_id: "EVT_CAR_009",
    event_name_tr: "Sunum Yapmak",
    event_name_en: "Giving a Presentation",
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
    event_id: "EVT_CAR_010",
    event_name_tr: "Ekip Arkadaşının Ayrılması",
    event_name_en: "Teammate Leaving",
    category: "Career",
    polarity: "Negative",
    base_impact_percent: -15,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 7,
    recovery_decay: "Slow",
    icon: "👋",
    isPlannable: false
  },

  // LOVE
  {
    event_id: "EVT_LOV_001",
    event_name_tr: "Nişanlanma",
    event_name_en: "Engagement",
    category: "Love",
    polarity: "Positive",
    base_impact_percent: 45,
    anticipation_window: 10,
    anticipation_slope: "Exponential",
    recovery_window: 21,
    recovery_decay: "Slow",
    icon: "💍",
    isPlannable: true
  },
  {
    event_id: "EVT_LOV_002",
    event_name_tr: "Sürpriz Hediye Almak",
    event_name_en: "Receiving a Surprise Gift",
    category: "Love",
    polarity: "Positive",
    base_impact_percent: 20,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Rapid",
    icon: "🎁",
    isPlannable: false
  },
  {
    event_id: "EVT_LOV_003",
    event_name_tr: "Birlikte Tatil Planı",
    event_name_en: "Holiday Plan Together",
    category: "Love",
    polarity: "Positive",
    base_impact_percent: 30,
    anticipation_window: 7,
    anticipation_slope: "Linear",
    recovery_window: 7,
    recovery_decay: "Slow",
    icon: "🏖️",
    isPlannable: true
  },
  {
    event_id: "EVT_LOV_004",
    event_name_tr: "İlk Öpücük",
    event_name_en: "First Kiss",
    category: "Love",
    polarity: "Positive",
    base_impact_percent: 25,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 4,
    recovery_decay: "Rapid",
    icon: "💋",
    isPlannable: false
  },
  {
    event_id: "EVT_LOV_005",
    event_name_tr: "Barışma / Sorun Çözme",
    event_name_en: "Making Up / Solving Problem",
    category: "Love",
    polarity: "Positive",
    base_impact_percent: 18,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Rapid",
    icon: "🫂",
    isPlannable: false
  },
  {
    event_id: "EVT_LOV_006",
    event_name_tr: "Kıskançlık Krizi",
    event_name_en: "Jealousy Crisis",
    category: "Love",
    polarity: "Negative",
    base_impact_percent: -20,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Rapid",
    icon: "👀",
    isPlannable: false
  },
  {
    event_id: "EVT_LOV_007",
    event_name_tr: "Aileyle Tanışma Gerginliği",
    event_name_en: "Tension of Meeting Family",
    category: "Love",
    polarity: "Negative",
    base_impact_percent: -15,
    anticipation_window: 3,
    anticipation_slope: "Exponential",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "😰",
    isPlannable: true
  },
  {
    event_id: "EVT_LOV_008",
    event_name_tr: "Ghosting (Cevapsız Kalma)",
    event_name_en: "Ghosting",
    category: "Love",
    polarity: "Negative",
    base_impact_percent: -18,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 5,
    recovery_decay: "Slow",
    icon: "👻",
    isPlannable: false
  },
  {
    event_id: "EVT_LOV_009",
    event_name_tr: "İlişkide Soğukluk / Mesafe",
    event_name_en: "Coldness / Distance",
    category: "Love",
    polarity: "Negative",
    base_impact_percent: -25,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 10,
    recovery_decay: "Slow",
    icon: "❄️",
    isPlannable: false
  },
  {
    event_id: "EVT_LOV_010",
    event_name_tr: "Unutulan Özel Gün",
    event_name_en: "Forgotten Special Day",
    category: "Love",
    polarity: "Negative",
    base_impact_percent: -30,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 7,
    recovery_decay: "Slow",
    icon: "📅",
    isPlannable: false
  },

  // HEALTH
  {
    event_id: "EVT_HLT_001",
    event_name_tr: "Düzenli Spora Başlama",
    event_name_en: "Starting Regular Sports",
    category: "Health",
    polarity: "Positive",
    base_impact_percent: 25,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 14,
    recovery_decay: "Slow",
    icon: "🏋️‍♀️",
    isPlannable: true
  },
  {
    event_id: "EVT_HLT_002",
    event_name_tr: "Masaj / Spa Günü",
    event_name_en: "Massage / Spa Day",
    category: "Health",
    polarity: "Positive",
    base_impact_percent: 22,
    anticipation_window: 1,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Slow",
    icon: "🧖",
    isPlannable: true
  },
  {
    event_id: "EVT_HLT_003",
    event_name_tr: "Doğa Yürüyüşü",
    event_name_en: "Nature Walk",
    category: "Health",
    polarity: "Positive",
    base_impact_percent: 15,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Slow",
    icon: "🌲",
    isPlannable: true
  },
  {
    event_id: "EVT_HLT_004",
    event_name_tr: "Kilo Verme Hedefine Ulaşma",
    event_name_en: "Reaching Weight Loss Goal",
    category: "Health",
    polarity: "Positive",
    base_impact_percent: 30,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 10,
    recovery_decay: "Slow",
    icon: "⚖️",
    isPlannable: false
  },
  {
    event_id: "EVT_HLT_005",
    event_name_tr: "Meditasyon / Yoga",
    event_name_en: "Meditation / Yoga",
    category: "Health",
    polarity: "Positive",
    base_impact_percent: 12,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🧘",
    isPlannable: true
  },
  {
    event_id: "EVT_HLT_006",
    event_name_tr: "Migren / Baş Ağrısı",
    event_name_en: "Migraine / Headache",
    category: "Health",
    polarity: "Negative",
    base_impact_percent: -12,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🤕",
    isPlannable: false
  },
  {
    event_id: "EVT_HLT_007",
    event_name_tr: "Grip / Soğuk Algınlığı",
    event_name_en: "Flu / Cold",
    category: "Health",
    polarity: "Negative",
    base_impact_percent: -18,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 4,
    recovery_decay: "Slow",
    icon: "🤒",
    isPlannable: false
  },
  {
    event_id: "EVT_HLT_008",
    event_name_tr: "Ev Kazası (Ufak yaralanma)",
    event_name_en: "Home Accident (Minor Injury)",
    category: "Health",
    polarity: "Negative",
    base_impact_percent: -15,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Rapid",
    icon: "🩹",
    isPlannable: false
  },
  {
    event_id: "EVT_HLT_009",
    event_name_tr: "Alerjik Reaksiyon",
    event_name_en: "Allergic Reaction",
    category: "Health",
    polarity: "Negative",
    base_impact_percent: -10,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Rapid",
    icon: "🤧",
    isPlannable: false
  },
  {
    event_id: "EVT_HLT_010",
    event_name_tr: "Tahlil Sonucu Bekleme",
    event_name_en: "Waiting for Test Results",
    category: "Health",
    polarity: "Negative",
    base_impact_percent: -20,
    anticipation_window: 2,
    anticipation_slope: "Exponential",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "🔬",
    isPlannable: true
  },

  // FINANCE
  {
    event_id: "EVT_FIN_001",
    event_name_tr: "Piyango / Şans Oyunu Kazancı",
    event_name_en: "Lottery / Game of Chance Win",
    category: "Finance",
    polarity: "Positive",
    base_impact_percent: 30,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 7,
    recovery_decay: "Slow",
    icon: "🎰",
    isPlannable: false
  },
  {
    event_id: "EVT_FIN_002",
    event_name_tr: "Yatırım Getirisi (Borsa/Coin)",
    event_name_en: "Investment Return (Stock/Coin)",
    category: "Finance",
    polarity: "Positive",
    base_impact_percent: 20,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 4,
    recovery_decay: "Slow",
    icon: "📈",
    isPlannable: false
  },
  {
    event_id: "EVT_FIN_003",
    event_name_tr: "İndirim Yakalama / Fırsat",
    event_name_en: "Catching a Discount",
    category: "Finance",
    polarity: "Positive",
    base_impact_percent: 10,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Rapid",
    icon: "🏷️",
    isPlannable: false
  },
  {
    event_id: "EVT_FIN_004",
    event_name_tr: "Kredi Onayı",
    event_name_en: "Loan Approval",
    category: "Finance",
    polarity: "Positive",
    base_impact_percent: 15,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 5,
    recovery_decay: "Slow",
    icon: "🏦",
    isPlannable: false
  },
  {
    event_id: "EVT_FIN_005",
    event_name_tr: "Ek Gelir / Freelance İş",
    event_name_en: "Additional Income / Freelance Work",
    category: "Finance",
    polarity: "Positive",
    base_impact_percent: 18,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 5,
    recovery_decay: "Slow",
    icon: "💰",
    isPlannable: false
  },
  {
    event_id: "EVT_FIN_006",
    event_name_tr: "Araba Arızası / Masraf",
    event_name_en: "Car Breakdown / Expense",
    category: "Finance",
    polarity: "Negative",
    base_impact_percent: -25,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 5,
    recovery_decay: "Slow",
    icon: "🛠️",
    isPlannable: false
  },
  {
    event_id: "EVT_FIN_007",
    event_name_tr: "Beklenmedik Fatura",
    event_name_en: "Unexpected Bill",
    category: "Finance",
    polarity: "Negative",
    base_impact_percent: -15,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 3,
    recovery_decay: "Rapid",
    icon: "🧾",
    isPlannable: false
  },
  {
    event_id: "EVT_FIN_008",
    event_name_tr: "Vergi Ödemesi",
    event_name_en: "Tax Payment",
    category: "Finance",
    polarity: "Negative",
    base_impact_percent: -12,
    anticipation_window: 3,
    anticipation_slope: "Linear",
    recovery_window: 1,
    recovery_decay: "Rapid",
    icon: "💸",
    isPlannable: true
  },
  {
    event_id: "EVT_FIN_009",
    event_name_tr: "Borç Verme",
    event_name_en: "Lending Money",
    category: "Finance",
    polarity: "Negative",
    base_impact_percent: -10,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 2,
    recovery_decay: "Rapid",
    icon: "🤲",
    isPlannable: false
  },
  {
    event_id: "EVT_FIN_010",
    event_name_tr: "Maaş Gecikmesi",
    event_name_en: "Salary Delay",
    category: "Finance",
    polarity: "Negative",
    base_impact_percent: -30,
    anticipation_window: 0,
    anticipation_slope: "Linear",
    recovery_window: 5,
    recovery_decay: "Slow",
    icon: "⌛",
    isPlannable: false
  }
,
  // --- RESTORED OLD EVENTS ---
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
    event_name_tr: "Dedikodu / Mis-\nunderstanding",
    event_name_en: "Gossip / Mis-\nunderstanding",
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
  id: string; // UUID
  event_id: string; // Reference to LIFE_EVENTS
  event_date: string; // YYYY-MM-DD
  notes?: string;
  created_at: number;
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

export function calculateLifeEventImpact(date: Date, userEvents: UserLifeEvent[]): number {
  if (!userEvents || userEvents.length === 0) return 0;

  let totalImpact = 0;
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  userEvents.forEach(userEvent => {
    const eventDef = LIFE_EVENTS.find(e => e.event_id === userEvent.event_id);
    if (!eventDef) return;

    const eventDate = new Date(userEvent.event_date);
    eventDate.setHours(0, 0, 0, 0);

    const diffTime = checkDate.getTime() - eventDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Event day
    if (diffDays === 0) {
      totalImpact += eventDef.base_impact_percent;
    }
    // Recovery (after event)
    else if (diffDays > 0 && diffDays <= eventDef.recovery_window) {
      // Simple linear decay for now
      const decay = 1 - (diffDays / (eventDef.recovery_window + 1));
      totalImpact += eventDef.base_impact_percent * decay;
    }
    // Anticipation (before event)
    else if (diffDays < 0 && Math.abs(diffDays) <= eventDef.anticipation_window) {
       // Simple linear ramp up
       const ramp = 1 - (Math.abs(diffDays) / (eventDef.anticipation_window + 1));
       totalImpact += eventDef.base_impact_percent * ramp;
    }
  });

  return Math.max(-100, Math.min(100, totalImpact));
}
