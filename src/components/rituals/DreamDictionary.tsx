"use client";

import React, { useState } from "react";
import { Search, Moon, BookOpen, Sparkles, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MOCK_DREAMS: Record<string, string> = {
  "uçmak": "Ruhunun özgürleşme isteğini ve hayatındaki kısıtlamalardan kurtulma arzusunu temsil eder. Yüksekten uçmak başarıyı, alçaktan uçmak ise kararsızlığı simgeler.",
  "diş dökülmesi": "Kontrol kaybı korkusu, yaşlanma kaygısı veya hayatındaki büyük bir değişimin habercisidir. Bazen bir yakının kaybı veya bir ayrılıkla da bağdaştırılır.",
  "su": "Duygusal durumunu yansıtır. Berrak su huzuru, bulanık su ise belirsizliği simgeler. Sel görmek kontrolden çıkan duyguları, deniz ise sonsuz potansiyeli gösterir.",
  "yılan": "Hem şifayı hem de sinsi düşmanları temsil edebilir. Yeşil yılan büyüme, siyah yılan gizli tehlike, sarı yılan ise bilgelik ve uyanış demektir.",
  "para": "Özgüvenini ve hayatındaki bolluk bereket enerjisini simgeler. Para bulmak yeni fırsatları, kaybetmek ise özdeğer eksikliğini gösterir.",
  "kedi": "Bağımsızlık, gizem ve sezgilerinin güçlendiği bir dönemi işaret eder. Beyaz kedi şans, kara kedi gizli bilgiler demektir.",
  "deniz": "Bilinçaltının derinliklerini ve duygusal genişliğini simgeler. Dalgalı deniz fırtınalı duyguları, sakin deniz ise iç huzuru gösterir.",
  "ev": "Kendi benliğini ve ruhsal yapını temsil eder. Yeni bir ev yeni başlangıçları, eski ev ise geçmişe takılı kalmayı simgeler. Çatı katı zihni, bodrum ise bilinçaltını temsil eder.",
  "ölüm": "Korkulacak bir şey değil, aslında bir bitiş ve yeni bir başlangıçtır. Bir durumun veya alışkanlığın sona ermesini işaret eder.",
  "bebek": "Yeni fikirler, projeler veya masumiyetle ilgili bir gelişmeyi müjdeler. İçindeki yaratıcı potansiyelin uyandığını gösterir.",
  "koşmak": "Bir hedefe ulaşma çabasını veya bir durumdan kaçma isteğini yansıtır. Eğer kaçıyorsan, yüzleşmen gereken bir şey olabilir.",
  "ayna": "Kendini nasıl gördüğün ve dış dünyaya yansıttığın imajla ilgilidir. Kırık ayna hayal kırıklığını, berrak ayna öz farkındalığı simgeler.",
  "merdiven": "Hayattaki ilerlemeni ve ruhsal yükselişini temsil eder. Yukarı çıkmak başarıyı, aşağı inmek ise içsel bir sorgulamayı gösterir.",
  "ateş": "Tutku, enerji ama aynı zamanda öfke ve yıkımı da simgeler. Kontrollü ateş yaratıcılığı, yangın ise kontrol dışı duyguları temsil eder.",
  "köpek": "Sadakat, koruma ve arkadaşlık simgesidir. Havlayan köpek bir uyarı, oyuncu köpek ise güvenli sosyal çevreyi işaret eder.",
  "ayakkabı": "Hayat yolculuğun ve attığın adımlarla ilgilidir. Yeni ayakkabı yeni bir yol, yırtık ayakkabı ise yorgunluk demektir.",
  "ağlamak": "Duygusal bir arınma ve rahatlama ihtiyacını gösterir. Gerçek hayatta bastırılmış üzüntülerin dışa vurumudur.",
  "araba sürmek": "Hayatının kontrolünün sende olduğunu simgeler. Arabayı kontrol edememek, yönünü kaybettiğin hissini yansıtır.",
  "balık": "Bereket, şans ve bilinçaltından gelen mesajları temsil eder. Balık yemek zenginlik, canlı balık ise yeni bir mülk veya evlat demektir.",
  "çiçek": "Güzellik, gelişim ve mutluluk sembolüdür. Kurumuş çiçek hayal kırıklığını, açan çiçek ise yeni bir aşkı müjdeler.",
  "fare": "Küçük ama can sıkıcı sorunları veya etrafındaki kurnaz kişileri temsil eder. Kemiren fare, enerjini tüketen bir durumu simgeler.",
  "gelinlik": "Yeni bir başlangıç, sorumluluk veya bir ortaklık habercisidir. Temiz gelinlik mutluluk, kirli gelinlik ise ilişkideki pürüzleri gösterir.",
  "hamilelik": "Henüz olgunlaşmamış bir fikrin veya projenin içinde olduğunu gösterir. Sabırla büyümesi gereken bir durumdur.",
  "kar": "Saflık, temizlik ve bazen de duygusal soğukluk demektir. Kar yağması huzuru, fırtına ise yalnızlık hissini simgeler.",
  "örümcek": "Sabır, yaratıcılık ve ağlarını ören bir kaderi simgeler. Örümcek ağı karmaşık bir duruma düştüğünü gösterebilir.",
  "saat": "Zamanın geçtiğine dair bir uyarı veya hayatındaki bir döngünün tamamlanmasıdır. Durmuş saat bir tıkanıklığı işaret eder.",
  "telefon": "İletişim ihtiyacını veya beklediğin bir haberi temsil eder. Telefonun bozulması iletişim kopukluğunu simgeler.",
  "yağmur": "Ruhsal yıkanma ve bereket demektir. Şiddetli yağmur duygusal patlamaları, hafif yağmur ise huzuru müjdeler.",
  "yolculuk": "Kendi içsel dönüşümün ve hayatındaki değişim sürecidir. Bilinmeyene giden bir yol heyecan vericidir.",
  "zenginlik": "Maddi değil, manevi bir doyuma ulaştığını veya ulaşmak istediğini gösterir.",
  "ekmek": "Yaşamsal ihtiyaçlar, rızık ve aile huzurudur. Sıcak ekmek müjdeli haber demektir.",
  "kapı": "Fırsatlar ve yeni geçiş evreleridir. Açık kapı davetkar bir geleceği, kapalı kapı ise engelleri temsil eder.",
  "anahtar": "Çözüm bekleyen bir sorunun cevabının sende olduğunu gösterir. Yeni bir keşif demektir.",
  "güneş": "Başarı, aydınlık ve ilahi korumadır. Her şeyin yolunda gideceğinin en güçlü işaretidir.",
  "ay": "Sezgiler, kadınsı enerji ve gizemli olaylardır. Ayın evreleri hayatındaki döngüleri temsil eder.",
  "yıldız": "Umut, ilham ve rehberliktir. Dileklerinin gerçekleşeceğine dair bir işarettir.",
  "kan": "Yaşam enerjisi, aile bağları veya büyük bir tutkudur. Kan kaybı enerji tükenmesini simgeler.",
  "altın": "Değerli bir farkındalık, başarı veya maddi kazançtır. Parlayan altın ruhsal uyanış demektir.",
  "gümüş": "Duygusal berraklık ve sezgisel güçtür. Ay enerjisiyle bağlantılıdır.",
  "yüzük": "Bağlılık, sözleşme veya bir döngünün tamamlanmasıdır. Kırık yüzük biten bir anlaşmayı temsil eder."
};

export function DreamDictionary({ onBack, onSpend }: { onBack: () => void, onSpend: (amount: number) => void }) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = MOCK_DREAMS[search.toLowerCase().trim()];
    setResult(found || "Bu sembolün derinliklerini henüz keşfedemedim canım. Belki Ayla'ya sormalısın?");
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col p-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-[calc(env(safe-area-inset-bottom)+1.5rem)] overflow-y-auto">
      <div className="star-field absolute inset-0 opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-md mx-auto space-y-8 relative z-10">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground"><X /></Button>
          <h2 className="font-mystic text-xl gold-text">Rüya Sözlüğü</h2>
          <div className="w-10" />
        </div>

        <div className="space-y-6 text-center">
          <div className="w-20 h-20 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
            <Moon className="w-10 h-10 text-blue-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-mystic">Gördüğün Sembolü Yaz</h3>
            <p className="font-serif italic text-muted-foreground text-sm">
              Bilinçaltın sana ne anlatmak istiyor?
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
              placeholder="Örn: Uçmak, Su, Yılan..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border-mystic-gold/20 rounded-full py-6"
            />
            <Button type="submit" className="rounded-full h-14 w-14 bg-mystic-gold text-mystic-purple">
              <Search />
            </Button>
          </form>

          {result && (
            <Card className="p-6 bg-mystic-purple/5 border-mystic-gold/20 text-left space-y-4">
              <div className="flex items-center gap-2 text-mystic-gold font-mystic">
                <BookOpen className="w-5 h-5" /> Anlamı
              </div>
              <p className="font-serif italic text-lg leading-relaxed">
                "{result}"
              </p>
              <div className="pt-4 border-t border-mystic-gold/10">
                <Button className="w-full bg-mystic-purple text-white text-xs rounded-full py-4 h-auto">
                  <Sparkles className="w-3 h-3 mr-2" /> Ayla'dan Özel Yorum Al (30 ✨)
                </Button>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-3 pt-4">
            {Object.keys(MOCK_DREAMS).slice(0, 4).map(keyword => (
              <button 
                key={keyword}
                onClick={() => {
                  setSearch(keyword);
                  setResult(MOCK_DREAMS[keyword]);
                }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-muted-foreground hover:border-mystic-gold/40 transition-all capitalize"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
