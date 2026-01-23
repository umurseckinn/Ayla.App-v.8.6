// Auto-generated affirmations data for offline mode
// This replaces the Supabase tables: ayla_happiness_affirmations, ayla_combined_insights, ayla_event_affirmations

export interface HappinessAffirmation {
    range_min: number;
    range_max: number;
    affirmation: string;
    warning: string;
    guidance: string;
}

export interface CombinedInsight {
    event_id: string;
    range_id: number;
    affirmation: string;
    warning: string;
    guidance: string;
}

export interface EventAffirmation {
    event_id: string;
    affirmation: string;
    warning: string;
    guidance: string;
}

export const HAPPINESS_AFFIRMATIONS: HappinessAffirmation[] = [
    { range_min: 0, range_max: 10, affirmation: "Zor zamanlar geçici, içindeki ışık kalıcıdır.", warning: "Kendine karşı nazik ol, bu dönem geçecek.", guidance: "Bugün sadece bir adım at, küçük de olsa." },
    { range_min: 11, range_max: 20, affirmation: "Karanlıkta bile yıldızlar parlar, sen de öyle.", warning: "Duygularını bastırma, hisset ve bırak.", guidance: "Sevdiğin birine ulaş, yalnız değilsin." },
    { range_min: 21, range_max: 30, affirmation: "Her gün yeni bir başlangıç fırsatı sunar.", warning: "Enerji seviyeni koru, aşırıya kaçma.", guidance: "Doğayla vakit geçir, ruhunu besle." },
    { range_min: 31, range_max: 40, affirmation: "Dengede olmak, mükemmel olmaktan değerlidir.", warning: "Kararların aceleci olmasın.", guidance: "Nefes egzersizleri yap, zihni dinlendir." },
    { range_min: 41, range_max: 50, affirmation: "Ortada olmak, her iki uca da açıksın demektir.", warning: "Belirsizlikle barış, netlik gelecek.", guidance: "Günlük tut, düşüncelerini yaz." },
    { range_min: 51, range_max: 60, affirmation: "Yükselişin başlangıcındasın, devam et.", warning: "Başarılarını küçümseme.", guidance: "Hedeflerini gözden geçir ve kutla." },
    { range_min: 61, range_max: 70, affirmation: "Enerjin yükseliyor, bu akışı kullan.", warning: "Enerjiyi dağıtma, odaklan.", guidance: "Yaratıcı projelere zaman ayır." },
    { range_min: 71, range_max: 80, affirmation: "İç huzurun dışarı yansıyor, parla!", warning: "Başkalarının enerjisine dikkat et.", guidance: "Bu dönemi sevdiklerinle paylaş." },
    { range_min: 81, range_max: 90, affirmation: "Evrenle uyum içindesin, mucizeler yakın.", warning: "Ayakların yerde kalsın.", guidance: "Şükran listesi yap, bolluğu gör." },
    { range_min: 91, range_max: 100, affirmation: "Işığın dorukta, evren seninle dans ediyor!", warning: "Bu anın tadını çıkar, kalıcı olmasını bekleme.", guidance: "Bu enerjiyi başkalarıyla paylaş, çoğalt." }
];

export const COMBINED_INSIGHTS: CombinedInsight[] = [
    { event_id: "job_interview", range_id: 5, affirmation: "Kariyer fırsatın kapıda, özgüvenin anahtar.", warning: "Aşırı hazırlık yerine içgüdülerine güven.", guidance: "Mavi veya yeşil giy, sakinlik verir." },
    { event_id: "exam_period", range_id: 5, affirmation: "Bilgi ruhunda, sınav sadece bir yansıma.", warning: "Panik yapma, bildiğinden fazlasını biliyorsun.", guidance: "Lavanta kokusu zihni açar." },
    { event_id: "new_relationship", range_id: 7, affirmation: "Yeni bir bağ kuruyorsun, kalbin açık olsun.", warning: "Aceleci olma, zamanla derinleşecek.", guidance: "Pembe veya kırmızı taşı, aşk enerjisi verir." },
    { event_id: "heartbreak", range_id: 3, affirmation: "Kırık kalpler daha güçlü iyileşir.", warning: "Acına izin ver ama içinde kaybolma.", guidance: "Su elementi seni iyileştirir, banyo yap." },
    { event_id: "moving_house", range_id: 5, affirmation: "Yeni yuva, yeni enerji, yeni başlangıç.", warning: "Eski enerjileri temizle, tütsü yak.", guidance: "Bitkiler al, yaşam enerjisi getirir." }
];

export const EVENT_AFFIRMATIONS: EventAffirmation[] = [
    { event_id: "job_interview", affirmation: "Kariyer kapıların açılıyor.", warning: "Kendini küçümseme.", guidance: "Jüpiter enerjisini çağır." },
    { event_id: "exam_period", affirmation: "Merkür desteğin, zihin berrak.", warning: "Aşırı çalışma yorar.", guidance: "Düzenli molalar ver." },
    { event_id: "new_relationship", affirmation: "Venüs kalbine dokunuyor.", warning: "Beklentileri kontrol et.", guidance: "Açık iletişim kur." },
    { event_id: "heartbreak", affirmation: "Ay seni teselli ediyor.", warning: "Yalnızlığa gömülme.", guidance: "Arkadaşlarınla vakit geçir." },
    { event_id: "moving_house", affirmation: "Yeni topraklar seni bekliyor.", warning: "Hemen yerleşme baskısı yapma.", guidance: "Adım adım düzenle." },
    { event_id: "wedding", affirmation: "İki ruh birleşiyor, kutlu olsun.", warning: "Mükemmeliyetçilikten kaçın.", guidance: "Anın tadını çıkar." },
    { event_id: "pregnancy", affirmation: "Yaşam mucizesi içinde büyüyor.", warning: "Stres bebeğe geçer, sakin kal.", guidance: "Müzik dinle, bebek hisseder." },
    { event_id: "health_issue", affirmation: "Bedenin iyileşme gücüne sahip.", warning: "Profesyonel destek al.", guidance: "Olumlu düşünceler iyileştirir." },
    { event_id: "travel", affirmation: "Yolculuk ruhu genişletir.", warning: "Detaylara dikkat et.", guidance: "Yeni deneyimlere açık ol." },
    { event_id: "financial_stress", affirmation: "Bolluk bir akış, bu dönem geçici.", warning: "Panik kararlar alma.", guidance: "Bütçe yap, kontrol sağlar." }
];

// Helper functions to query the static data
export function getHappinessAffirmation(happiness: number): HappinessAffirmation | undefined {
    return HAPPINESS_AFFIRMATIONS.find(a => happiness >= a.range_min && happiness <= a.range_max);
}

export function getCombinedInsights(eventIds: string[], rangeId: number): CombinedInsight[] {
    return COMBINED_INSIGHTS.filter(c => eventIds.includes(c.event_id) && c.range_id === rangeId);
}

export function getEventAffirmations(eventIds: string[]): EventAffirmation[] {
    return EVENT_AFFIRMATIONS.filter(e => eventIds.includes(e.event_id));
}
