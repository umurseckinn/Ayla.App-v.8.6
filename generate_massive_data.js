const fs = require('fs');

const subjects = [
  "Ruhum", "Zihnim", "Bedenim", "Kalbim", "Varlığım", "Enerjim", "Geleceğim", "Şu anım", "Hayatım", "Kaderim",
  "İç sesim", "Evren", "Yıldızlar", "Düşüncelerim", "Sezgilerim", "Yaratıcılığım", "Gücüm", "Işığım", "Auram", "Potansiyelim",
  "Niyetlerim", "Eylemlerim", "Sözlerim", "Gülümsemem", "Sabrım", "Disiplinim", "İradem", "Şefkatim", "Cesaretim", "Özgüvenim"
];

const verbs = [
  "parlıyor", "güçleniyor", "şifalanıyor", "hizalanıyor", "genişliyor", "özgürleşiyor", "yenileniyor", "berraklaşıyor", "çiçek açıyor", "yükseliyor",
  "akışta kalıyor", "mucizeleri çekiyor", "huzurla doluyor", "sevgiyle titreşiyor", "güven veriyor", "ilham saçıyor", "dengeye geliyor", "aydınlanıyor", "bereketleniyor", "canlanıyor"
];

const modifiers = [
  "her geçen gün", "evrenle uyum içinde", "sonsuz bir neşeyle", "kararlılıkla", "zarafetle", "kozmik bir ritimle", "hiç durmadan", "kolaylıkla", "mucizevi bir şekilde", "tam bir güvenle",
  "sevgi odağında", "ışık saçarak", "bilgelikle", "derin bir huzurla", "cesurca", "yepyeni bir vizyonla", "şükran duyarak", "farkındalıkla", "kendinden emin bir halde", "hayranlık uyandırarak"
];

const affirmations = [];
for (let s of subjects) {
  for (let v of verbs) {
    for (let m of modifiers) {
      affirmations.push(`${s} ${m} ${v}.`);
      if (affirmations.length >= 1200) break;
    }
    if (affirmations.length >= 1200) break;
  }
  if (affirmations.length >= 1200) break;
}

const warnings = [
  "Gökyüzü bugün fevri adımlardan kaçınmanı fısıldıyor.",
  "Merkür'ün gölgesi zihnini bulandırabilir, netlik için bekle.",
  "Mars'ın harareti seni sabırsızlığa itmesin, sükunetini koru.",
  "Satürn bugün disiplinini sınıyor, sorumluluklarını ihmal etme.",
  "Jüpiter'in aşırılığı seni yanıltmasın, gerçekçi kalmaya özen göster.",
  "Dış seslerin iç sesini bastırmasına izin verme, bugün kendi merkezinde kal.",
  "Enerjini tüketen her türlü tartışmadan uzak durmayı seç.",
  "Hızlı kararlar yerine demlenmiş fikirlerin peşinden git.",
  "Venüs'ün geri çekilişi ilişkilerinde eski defterleri açabilir, dikkatli ol.",
  "Uranüs bugün beklenmedik değişimler getirebilir, esnek kalmayı unutma."
];
// Expand warnings to 200+
for (let i = 0; i < 190; i++) {
  warnings.push(`Kozmik uyarı #${i + 11}: ${subjects[i % subjects.length]} bugün ${modifiers[i % modifiers.length]} korunmaya ihtiyaç duyabilir.`);
}

const focusPoints = [
  "Bugün sadece kendi iç dünyandaki sessizliği dinlemeye odaklan.",
  "Zihnindeki karmaşayı ayıkla ve sadece en önemli niyetine yer aç.",
  "Yaratıcı projelerini hayata geçirmek için gereken disiplini bugün sağla.",
  "Sosyal bağlarını güçlendirmek ve sevgini paylaşmak için harika bir gün.",
  "Maddi dünyadaki düzenini sağlamlaştırmak bugünün ana teması olsun.",
  "Bedensel sağlığına özen göster ve ruhunu dinlendirmeyi unutma.",
  "Yeni bilgiler öğrenmek ve vizyonunu genişletmek için odaklan.",
  "Geçmişin yüklerini bırakıp sadece 'şu ana' konsantre ol.",
  "Sezgilerini takip et, onlar bugün seni en doğru yola ulaştıracak.",
  "Kendi değerini hatırla ve sınırlarını nezaketle korumayı önceliklendir."
];
// Expand focus to 200+
for (let i = 0; i < 190; i++) {
  focusPoints.push(`Günün odağı #${i + 11}: ${subjects[i % subjects.length]} üzerine ${modifiers[i % modifiers.length]} çalışmak.`);
}

const dayToDay = [
  "Dünün tecrübeleri bugün senin en büyük rehberin haline geliyor.",
  "Günden güne artan bir farkındalıkla hayatın ritmine uyum sağlıyorsun.",
  "Yıldızların her hareketi senin tekamülün için özel bir anlam taşıyor.",
  "Dün olanlar bitti, bugün yepyeni bir enerjiyle uyanıyorsun.",
  "Hayatının her günü, kendi başyapıtını yarattığın birer tuvaldir."
];
for (let i = 0; i < 195; i++) {
  dayToDay.push(`Günden güne gelişim #${i + 6}: ${subjects[i % subjects.length]} ${modifiers[i % modifiers.length]} yükselmeye devam ediyor.`);
}

const output = `
export const MASSIVE_GENERAL_AFFIRMATIONS = ${JSON.stringify(affirmations, null, 2)};
export const MASSIVE_COSMIC_WARNINGS = ${JSON.stringify(warnings, null, 2)};
export const MASSIVE_FOCUS_OF_THE_DAY = ${JSON.stringify(focusPoints, null, 2)};
export const MASSIVE_DAY_TO_DAY = ${JSON.stringify(dayToDay, null, 2)};
`;

fs.writeFileSync('src/lib/data/massive-affirmations.ts', output);
console.log('Massive data generated successfully!');
