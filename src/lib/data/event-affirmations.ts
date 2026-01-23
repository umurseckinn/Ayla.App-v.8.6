export interface AffirmationSet {
  affirmations: string[];
}

export interface EventAffirmations {
  far_future: AffirmationSet;
  near_future: AffirmationSet;
  now: AffirmationSet;
  recent_past: AffirmationSet;
  far_past: AffirmationSet;
}

export const EVENT_AFFIRMATIONS: Record<string, EventAffirmations> = {
  "EVT_001_SOC": { // Tatile Çıkış
    far_future: {
      affirmations: [
        "Yeni keşiflerin heyecanı ruhumu şimdiden beslemeye başladı.",
        "Ufukta görünen yolculuk, zihnime taze bir nefes getirecek.",
        "Gelecekteki rotam, iç dünyamda yeni kapılar aralıyor.",
        "Keşfedilmeyi bekleyen yerlerin hayali bile enerjimi yükseltiyor.",
        "Yolculuk planlarım, hayatıma yeni bir vizyon ve heyecan katıyor."
      ]
    },
    near_future: {
      affirmations: [
        "Valizimi hazırlarken ruhumu da yeni deneyimlere açıyorum.",
        "Yola çıkmaya ramak kala, içimdeki gezgin neşeyle uyanıyor.",
        "Kısa süre sonra başlayacak olan bu macera beni yenileyecek.",
        "Gideceğim yerlerin enerjisini şimdiden kalbimde hissediyorum.",
        "Yolculuk heyecanı, her hücremi pozitif bir beklentiyle dolduruyor."
      ]
    },
    now: {
      affirmations: [
        "Şu an tam da olmam gereken yerde, yeni ufuklara akıyorum.",
        "Anın tadını çıkarırken evrenin sunduğu tüm güzellikleri kucaklıyorum.",
        "Yolculuğun her saniyesi ruhuma şifa ve neşe katıyor.",
        "Yeni yerler, yeni insanlar ve yeni ben; her şey harika ilerliyor.",
        "Keşfin büyüsü içindeyim, hayatın ritmine güvenle eşlik ediyorum."
      ]
    },
    recent_past: {
      affirmations: [
        "Dönüş yolunda heybemde biriktirdiğim anılarla zenginim.",
        "Yolculuğun yorgunluğu bile ruhuma tatlı bir huzur veriyor.",
        "Gördüğüm her yer, karakterime yeni bir renk ekledi.",
        "Tatilin tazeleyici enerjisini günlük hayatıma asaletle taşıyorum.",
        "Gezip gördüğüm yerlerin huzuru hala kalbimde yankılanıyor."
      ]
    },
    far_past: {
      affirmations: [
        "Geçmişteki o yolculuk, bugün sahip olduğum vizyonun temelidir.",
        "Anılarım demlendikçe hayatın ne kadar geniş olduğunu hatırlıyorum.",
        "Gezgin ruhum, o gün öğrendiklerini bugün bilgeliğe dönüştürüyor.",
        "Yollarda öğrendiklerim, hayat yolculuğumda bana ışık tutuyor.",
        "Geçmişin keşifleri, bugünkü kararlarımda bana cesaret veriyor."
      ]
    }
  },
  "EVT_001_CAR": { // İş Görüşmesi
    far_future: {
      affirmations: [
        "Kariyerimdeki o büyük adım için evren şimdiden hazırlık yapıyor.",
        "Gelecekteki mülakatlarımda özgüvenim ve bilgimle parlayacağım.",
        "Hedeflediğim o pozisyon için gereken tüm yetkinliklere sahibim.",
        "İş dünyasındaki vizyonum, doğru kapıların açılmasını sağlıyor.",
        "Başarıya giden yolda her adımım beni zirveye biraz daha yaklaştırıyor."
      ]
    },
    near_future: {
      affirmations: [
        "Mülakat saati yaklaştıkça zihnim daha da berraklaşıyor.",
        "Kendimi ifade etme gücüm ve profesyonel duruşum hayranlık uyandıracak.",
        "Hazırlığım tam, enerjim yüksek; başarımı kutlamaya hazırım.",
        "Görüşme yapacağım kişilerle aramda güçlü ve pozitif bir bağ kuruluyor.",
        "Sorulan her soruya en doğru ve etkileyici cevapları veriyorum."
      ]
    },
    now: {
      affirmations: [
        "Şu an tam bir profesyonel duruşla kendimi en iyi şekilde sunuyorum.",
        "Yeteneklerim ve tecrübem bugün bu masada karşılığını buluyor.",
        "Kelimelerim ikna edici, enerjim ise büyüleyici bir güven veriyor.",
        "Kariyerimdeki bu dönüm noktasını asalet ve başarıyla yönetiyorum.",
        "Ben bu iş için en doğru adayım ve evren bunu destekliyor."
      ]
    },
    recent_past: {
      affirmations: [
        "Mülakatın ardından gelen bu huzur, doğru yolda olduğumun kanıtıdır.",
        "Kendimi ifade etme şeklimden gurur duyuyorum; sonuç ne olursa olsun ben kazandım.",
        "Görüşmenin bıraktığı pozitif izler, kariyerimde yeni ufuklar açıyor.",
        "Profesyonel imajım bu süreçte daha da güçlendi ve netleşti.",
        "Gelecek olan güzel haberleri şimdiden şükranla kabul ediyorum."
      ]
    },
    far_past: {
      affirmations: [
        "Geçmişteki o görüşme, bugün sahip olduğum kariyer gücünün mimarıdır.",
        "Zorlu mülakatlardan edindiğim tecrübe, beni yenilmez kıldı.",
        "Eski başarılarım, gelecekteki zaferlerim için sarsılmaz bir temeldir.",
        "Kariyer yolculuğumda aştığım her engel bana bilgelik kattı.",
        "O günkü cesaretim, bugünkü saygınlığımın en büyük sebebidir."
      ]
    }
  },
  "EVT_002_CAR": { // Sınav
    far_future: {
      affirmations: [
        "Öğrendiğim her bilgi, gelecekteki başarımın birer yapı taşıdır.",
        "Zekam ve odaklanma gücüm, her türlü sınavı aşmaya yeterli.",
        "Akademik hedeflerim, disiplinli çalışmamla gerçeğe dönüşüyor.",
        "Bilginin ışığında, geleceğimi kendi ellerimle inşa ediyorum.",
        "Zorluklar beni yıldırmaz, aksine zihnimi daha da keskinleştirir."
      ]
    },
    near_future: {
      affirmations: [
        "Sınav anında tüm bilgiler zihnimde berrak bir şekilde canlanıyor.",
        "Sakinliğim ve konsantrasyonum en büyük müttefikimdir.",
        "Kalemi elime aldığımda soruların cevapları akıcı bir şekilde dökülüyor.",
        "Zamanı en verimli şekilde kullanıyor ve her soruyu başarıyla çözüyorum.",
        "Hazırlığımın meyvelerini toplama zamanı geldi, kendime güveniyorum."
      ]
    },
    now: {
      affirmations: [
        "Şu an zihnim en yüksek performansında, her detayı hatırlıyorum.",
        "Odak noktam sadece kağıdımdaki sorular ve bildiğim gerçekler.",
        "Bilgim akıyor, kalemim başarıya giden yolu çiziyor.",
        "Zorlandığım anlarda bile sakin kalıyor ve doğru cevabı buluyorum.",
        "Başarı şu an ellerimin arasında şekilleniyor."
      ]
    },
    recent_past: {
      affirmations: [
        "Sınavın ardından gelen bu hafiflik, emeğimin karşılığıdır.",
        "Elimden gelenin en iyisini yaptım ve sonuçlara güveniyorum.",
        "Zihinsel disiplinim bu süreçte ne kadar geliştiğini bana gösterdi.",
        "Öğrendiklerim sadece bir sınav için değil, hayatım için bir kazançtır.",
        "Kendi azmimle gurur duyuyor, yeni hedeflerime odaklanıyorum."
      ]
    },
    far_past: {
      affirmations: [
        "Geçmişteki o sınav, karakterimin ne kadar dayanıklı olduğunu kanıtladı.",
        "Aştığım her akademik engel, beni bugün olduğum bilge kişiye dönüştürdü.",
        "Eski başarılarım, bugünkü özgüvenimin sarsılmaz kaynağıdır.",
        "Zamanında döktüğüm ter, bugün hayatımı kolaylaştıran bir bilgi hazinesidir.",
        "Geçmişin sınavları, bugünün zaferlerine giden yolu aydınlattı."
      ]
    }
  },
  "EVT_003_CAR": { // Önemli Toplantı
    far_future: {
      affirmations: [
        "Gelecekteki o masada fikirlerim değer bulacak ve yankılanacak.",
        "Hazırlık sürecim, başarımı garantileyen sessiz bir güçtür.",
        "Profesyonel vizyonum, atacağım adımları şimdiden netleştiriyor.",
        "Fikirlerimi en etkili şekilde sunmak için gereken donanıma sahibim.",
        "Gelecek stratejilerim, kariyerimde yeni kapılar aralayacak."
      ]
    },
    near_future: {
      affirmations: [
        "Toplantı yaklaştıkça özgüvenim ve ikna kabiliyetim artıyor.",
        "Zihnim berrak, kelimelerim ise birer başarı anahtarı gibi.",
        "Kendimi ifade etme gücüm, çevremdekileri etkilemeye hazır.",
        "Hazırlığım tam, niyetim net; her şey yolunda ilerliyor.",
        "Toplantı masasına oturmadan önce başarımı kalbimde mühürlüyorum."
      ]
    },
    now: {
      affirmations: [
        "Sözlerim otoriteyle akıyor, vizyonum herkes tarafından kabul görüyor.",
        "Şu an tam bir profesyonel duruşla zirveye odaklanmış durumdayım.",
        "Zekam ve sağduyum, en doğru kararları vermemi sağlıyor.",
        "İş birliği içinde, ortak hedefimize doğru emin adımlarla yürüyoruz.",
        "Yetkinliğim ve enerjimle bugün fark yaratıyorum."
      ]
    },
    recent_past: {
      affirmations: [
        "Toplantının ardından gelen başarı gururunu hak ediyorum.",
        "Verdiğim kararların arkasındayım, geleceğim parlak görünüyor.",
        "Profesyonel imajım bu süreçte daha da güçlendi ve parladı.",
        "Atılan her imza, kurulan her bağ kariyerimi yükseltiyor.",
        "Verimli bir diyaloğun ardından gelen huzuru yaşıyorum."
      ]
    },
    far_past: {
      affirmations: [
        "O günkü kararlarım bugün meyvelerini vermeye devam ediyor.",
        "Geçmişteki profesyonel duruşum bugünkü saygınlığımın mimarıdır.",
        "Toplantı tecrübelerim, beni daha stratejik bir lidere dönüştürdü.",
        "Eski başarılarım, yeni hedeflerim için bana cesaret veriyor.",
        "Profesyonel geçmişim, gelecekteki zaferlerimin teminatıdır."
      ]
    }
  },
  "EVT_001_LOV": { // Evlilik / Düğün
    far_future: {
      affirmations: [
        "Ruh eşimle kuracağım o derin bağın temelleri şimdiden atılıyor.",
        "Gelecekteki yuvam, huzur ve sevginin merkezi olacak.",
        "Kalbim, ömür boyu sürecek kutsal bir aşka hazırlanıyor.",
        "İki ruhun tek bir yolda birleşeceği o kutlu güne güvenle yürüyorum.",
        "Sevgi dolu bir gelecek, vizyonumda her gün daha da netleşiyor."
      ]
    },
    near_future: {
      affirmations: [
        "Büyük gün yaklaştıkça kalbimdeki aşk ışığı daha da parlıyor.",
        "Hazırlıkların telaşı içinde bile birbirimize olan sevgimiz asil kalıyor.",
        "Yeni bir hayata başlamanın heyecanı her hücremi sarıyor.",
        "Birlikteliğimizi taçlandıracağımız o ana ruhumla hazırım.",
        "Sevginin gücüyle, evliliğimizin eşiğinde neşeyle bekliyorum."
      ]
    },
    now: {
      affirmations: [
        "Bugün iki can tek bir yürekte, sonsuz bir aşka evet diyoruz.",
        "Evren sevgimizi kutsuyor, yıldızlar yolumuzu aydınlatıyor.",
        "Şu an verdiğimiz her söz, geleceğimize ekilen birer mutluluk tohumudur.",
        "Aşkın en saf halini yaşarken, yanımda olan ruhla bütünleşiyorum.",
        "Bu kutsal bağın her anını hafızama büyük bir minnetle kazıyorum."
      ]
    },
    recent_past: {
      affirmations: [
        "Yeni hayatımızın ilk sabahına sevgi ve şükürle uyanıyorum.",
        "Birlikteliğimizin resmiyeti, ruhumuza yeni bir güç kattı.",
        "Kutlamanın ardından gelen o derin huzuru paylaşıyoruz.",
        "Kurduğumuz bu yeni düzen, her gün daha da güzelleşiyor.",
        "Aşkımızın en özel anlarını taze bir neşeyle anıyoruz."
      ]
    },
    far_past: {
      affirmations: [
        "Yıllar geçse de o ilk günkü heyecanı kalbimde taşıyorum.",
        "Geçmişte attığımız o imza, bugün koca bir çınar gibi kök saldı.",
        "Birlikte aştığımız yollar, sevgimizi daha da olgunlaştırdı.",
        "Yuvamız, geçen her yılla beraber daha da bereketlendi.",
        "Geçmişun o güzel sözleri, bugünkü sadakatimizin temelidir."
      ]
    }
  },
  "EVT_005_LOV": { // Ayrılık
    far_future: {
      affirmations: [
        "Ruhsal dönüşümüm beni daha bilge ve güçlü bir 'ben'e taşıyacak.",
        "Gelecekteki huzurum için bugün atılan adımlara güveniyorum.",
        "Kalbimin şifalanacağı o aydınlık günlerin geleceğini biliyorum.",
        "Kendi değerimi keşfettikçe daha sağlıklı bağlar kurmaya hazırlanıyorum.",
        "Yalnızlığın bilgeliği, ruhumda yeni kapılar aralayacak."
      ]
    },
    near_future: {
      affirmations: [
        "Vedalar, yeni başlangıçların sancılı ama gerekli doğumlarıdır.",
        "Bitişleri asaletle karşılıyor, ruhumu özgürleşmeye hazırlıyorum.",
        "Kendime duyduğum şefkat, bu geçiş sürecinde en büyük rehberim.",
        "Bağları koparmanın verdiği o ağır yükü yavaşça bırakıyorum.",
        "Gelecek olan 'yeni ben' için eskiyi sevgiyle uğurluyorum."
      ]
    },
    now: {
      affirmations: [
        "Gözyaşlarım ruhumu temizliyor, her damlada daha da hafifliyorum.",
        "Şu an kendimi sadece kendi sevgimin kollarına bırakıyorum.",
        "Acımı yaşıyorum ama onun içinde kaybolmuyorum; ben güçlüyüm.",
        "Boşalan her alan, yeni ve daha doğru güzellikler için bir davettir.",
        "Kalbimin ritmi, kendi özgürlüğümün şarkısını söylüyor."
      ]
    },
    recent_past: {
      affirmations: [
        "Yaralarım yavaş yavaş kabuk bağlıyor, ruhum güçleniyor.",
        "Kendimle baş başa kalmanın verdiği o derin gücü keşfediyorum.",
        "Geçmişin yüklerinden kurtuldukça enerjim daha da berraklaşıyor.",
        "Her geçen gün, ayrılığın bana kattığı dersleri asaletle alıyorum.",
        "Kendi yolumda tek başıma yürümenin bağımsızlığını yaşıyorum."
      ]
    },
    far_past: {
      affirmations: [
        "O günkü acı, bugün sahip olduğum sarsılmaz karakteri inşa etti.",
        "Geçmişteki o son, hayatımdaki en büyük başlangıcın habercisiymiş.",
        "Ruhumun o sınavdan nasıl güçlenerek çıktığını gururla görüyorum.",
        "Eski yaralar artık birer bilgelik izi; beni ben yapan değerler.",
        "Geçmişi tamamen affettim ve önümdeki aydınlık yola odaklandım."
      ]
    }
  },
  "EVT_002_SOC": { // Doğum Günü
    far_future: {
      affirmations: [
        "Yeni yaşımın getireceği mucizeleri şimdiden heyecanla bekliyorum.",
        "Kendi döngümde yeni bir sayfa açılırken ruhum ışıkla doluyor.",
        "Gelecekteki o özel gün, hayatımın en parlak döneminin başlangıcı olacak.",
        "Yaş almanın bilgeliği ve neşesi şimdiden kalbimde yankılanıyor.",
        "Evren, yeni yaşım için bana harika sürprizler hazırlıyor."
      ]
    },
    near_future: {
      affirmations: [
        "Kutlama enerjisi her geçen gün artıyor, kendimi şımartmaya hazırım.",
        "Yeni yaşıma girmeden önce ruhumu tüm eski yüklerden arındırıyorum.",
        "Varlığımın bu dünyadaki değerini kutlayacağım an yaklaşıyor.",
        "Doğum günümün büyüsü şimdiden auramı parlatmaya başladı.",
        "Yeni bir yıl, yeni umutlar ve yepyeni bir 'ben' yolda."
      ]
    },
    now: {
      affirmations: [
        "İyi ki doğdum ve iyi ki bu eşsiz deneyimin bir parçasıyım.",
        "Bugün evrenin tüm güzel enerjileri benim üzerimde toplanıyor.",
        "Yeni yaşım bana sağlık, bolluk ve sonsuz neşe getiriyor.",
        "Varlığım bu dünya için bir hediye ve ben bu hediyeyi kutluyorum.",
        "Şu an tam bir mutluluk ve şükran içindeyim, her şey harika."
      ]
    },
    recent_past: {
      affirmations: [
        "Kutlamanın bıraktığı sevgi dolu izler hala kalbimi ısıtıyor.",
        "Yeni yaşımın ilk günlerine muazzam bir enerjiyle başlıyorum.",
        "Dostlarımın ve ailemin sevgisi bana ne kadar değerli olduğumu hatırlattı.",
        "Doğum günümde dilediğim her şeyin gerçekleşeceğine güveniyorum.",
        "Geçen yaşımın derslerini aldım, yeni yaşımın neşesine odaklandım."
      ]
    },
    far_past: {
      affirmations: [
        "Geçmiş yaşlarımın her biri beni bugünkü bilge halime taşıdı.",
        "Anılarım, hayat yolculuğumun en kıymetli hazineleridir.",
        "Geçmiş başarılarım ve mutluluklarım, geleceğimin teminatıdır.",
        "Her yeni yaşımda biraz daha parladığımı gururla görüyorum.",
        "Zamanın bana kattığı her çizgi ve her tecrübe birer asalet nişanıdır."
      ]
    }
  },
  "EVT_001_FIN": { // Borç Kapatma
    far_future: {
      affirmations: [
        "Finansal özgürlüğün verdiği o hafiflik yakında hayatımın gerçeği olacak.",
        "Bolluk ve bereket içinde, tüm yüklerimden kurtulmaya hazırlanıyorum.",
        "Maddi güvenliğim her geçen gün daha sağlam bir temele oturuyor.",
        "Gelecekteki o borçsuz günlerin huzuru şimdiden ruhuma doluyor.",
        "Para bana kolaylıkla ve bereketle akıyor, tüm kapılar açılıyor."
      ]
    },
    near_future: {
      affirmations: [
        "Son adımları atarken finansal başarımı gururla kutluyorum.",
        "Hesaplarım denkleşiyor, ruhum maddi yüklerden arınıyor.",
        "Büyük bir finansal zaferin eşiğindeyim, kendime güveniyorum.",
        "Maddi disiplinim bana arzu ettiğim özgürlüğü getiriyor.",
        "Borçların bittiği o anın ferahlığını şimdiden hissediyorum."
      ]
    },
    now: {
      affirmations: [
        "Şu an tüm finansal bağlarımdan özgürleşiyor, berekete yer açıyorum.",
        "Para üzerindeki hakimiyetim bana büyük bir huzur ve güç veriyor.",
        "Maddi dünyadaki sorumluluklarımı başarıyla tamamlamanın gururunu yaşıyorum.",
        "Evrenin sınırsız kaynağına bağlıyım ve her zaman güvendeyim.",
        "Bugün finansal bağımsızlığımın ilk günü ve ben buna hazırım."
      ]
    },
    recent_past: {
      affirmations: [
        "Borçları kapatmanın verdiği o derin nefesi her gün hissediyorum.",
        "Maddi özgürlüğümün tadını çıkarırken yeni yatırımlara odaklanıyorum.",
        "Bütçemdeki bu ferahlık, hayatımın her alanına pozitif yansıyor.",
        "Finansal başarımı korumaya ve büyütmeye kararlıyım.",
        "Geçmişin yüklerinden kurtulmanın verdiği güçle geleceğe bakıyorum."
      ]
    },
    far_past: {
      affirmations: [
        "Geçmişteki o zorlu süreci aşmak beni finansal bir dehaya dönüştürdü.",
        "Maddi disiplinimin meyvelerini bugün huzurla topluyorum.",
        "Eski ekonomik sınavlarım, bugünkü refahımın en büyük öğretmenidir.",
        "Finansal geçmişimi onurlandırıyor ve geleceğimi zenginlikle inşa ediyorum.",
        "Bolluk bilincim, geçmişte attığım o sağlam adımlarla güçlendi."
      ]
    }
  },
  "EVT_001_HEA": { // Ameliyat
    far_future: {
      affirmations: [
        "Bedenim şifalanmak için gereken tüm güce ve zekaya sahiptir.",
        "Gelecekteki o sağlıklı günlerin ışığı şimdiden hücrelerimi sarıyor.",
        "Tıbbi sürecimin her adımı beni daha zinde bir yaşama taşıyacak.",
        "Evrenin iyileştirici enerjisi benimle ve ben güvendeyim.",
        "Sağlığıma kavuştuğum o anın hayali bile bana güç veriyor."
      ]
    },
    near_future: {
      affirmations: [
        "Operasyon anında ve sonrasında sakinliğimi koruyor, şifaya odaklanıyorum.",
        "Doktorlarımın elleri evrenin bilgeliğiyle rehberlik buluyor.",
        "Bedenimi sevgiyle şifalanmaya hazırlıyor ve her şeye teslim oluyorum.",
        "Korkularımdan özgürleşiyor, sağlığımın mucizesini kucaklıyorum.",
        "İyileşme sürecim hızlı, kolay ve mucizelerle dolu olacak."
      ]
    },
    now: {
      affirmations: [
        "Şu an her hücrem yenileniyor ve bedenim şifa ile doluyor.",
        "Evrenin şifalı ışığı tam şu an bedenimin her noktasında parlıyor.",
        "Sakinim, huzurluyum ve iyileşme gücüme sonuna kadar güveniyorum.",
        "Bedenimin bilgeliği beni en sağlıklı halime geri döndürüyor.",
        "Şifanın kutsal akışı içindeyim, her şey olması gerektiği gibi ilerliyor."
      ]
    },
    recent_past: {
      affirmations: [
        "İyileşme sürecimdeki her küçük ilerleme benim için bir zaferdir.",
        "Bedenimin gösterdiği o muazzam direnç ve güçle gurur duyuyorum.",
        "Yavaş yavaş sağlığıma kavuşurken hayatın kıymetini daha iyi anlıyorum.",
        "Şifa enerjisi hala içimde akmaya ve beni onarmaya devam ediyor.",
        "Her geçen gün kendimi daha zinde, daha canlı ve daha iyi hissediyorum."
      ]
    },
    far_past: {
      affirmations: [
        "Geçmişteki o sağlık sınavı, hayata olan bağlılığımı ve gücümü artırdı.",
        "Bedenimin ne kadar dayanıklı olduğunu o günlerde keşfettim.",
        "Aştığım her fiziksel engel, ruhumu daha da bilge kıldı.",
        "Eski yaralarım artık benim yaşam gücümün birer onur nişanıdır.",
        "Sağlığımın değerini bilerek, hayatın her anını şükürle yaşıyorum."
      ]
    }
  },
  "EVT_003_SOC": { // Arkadaşla Kahve
    far_future: {
      affirmations: [
        "Hoş sohbetlerin ve içten paylaşımların neşesi şimdiden ruhuma doluyor.",
        "Sosyal bağlarımın güçlendiği o güzel anları iple çekiyorum.",
        "Dostlarımla geçireceğim o huzurlu saatler enerjimi tazeleyecek.",
        "İletişimin şifalı gücü, hayatıma yeni renkler katmaya hazırlanıyor.",
        "Gelecekteki her buluşma, ruhum için birer neşe kaynağıdır."
      ]
    },
    near_future: {
      affirmations: [
        "Bir fincan kahve eşliğinde yapılacak o samimi sohbet beni çok heyecanlandırıyor.",
        "Dostumla buluşmak için sabırsızlanıyor, enerjimi bu paylaşıma açıyorum.",
        "İletişimim akıcı, kalbim ise sevgiyle dolu; harika bir zaman geçireceğiz.",
        "Paylaşacağımız her kelime aramdaki bağı daha da özelleştirecek.",
        "Buluşma saati yaklaştıkça neşem ve sosyal enerjim artıyor."
      ]
    },
    now: {
      affirmations: [
        "Şu an sadece bu güzel anın, kahve kokusunun ve dostluğun tadını çıkarıyorum.",
        "Anlatılan her hikayede kendimden bir parça buluyor, bağlarımızı güçlendiriyorum.",
        "Sohbetimizin akıcılığı ruhuma büyük bir keyif ve hafiflik veriyor.",
        "Paylaşmanın ve dinlenilmenin verdiği o huzur dolu anın içindeyim.",
        "Gülümsemelerimiz evrenin en saf enerjisiyle yankılanıyor."
      ]
    },
    recent_past: {
      affirmations: [
        "Buluşmanın ardından gelen o tatlı huzuru kalbimde taşıyorum.",
        "Paylaştığımız o güzel sohbet, günümün geri kalanına ışık saçıyor.",
        "Dostumun varlığı ve sözleri ruhuma ne kadar iyi geldi.",
        "Birlikte geçirdiğimiz her dakika benim için çok kıymetliydi.",
        "Sosyal enerjim yenilendi, kendimi çok daha canlı hissediyorum."
      ]
    },
    far_past: {
      affirmations: [
        "O günkü sohbetimiz, bugün sahip olduğumuz derin dostluğun temelidir.",
        "Anılarımız demlendikçe ne kadar şanslı olduğumu bir kez daha anlıyorum.",
        "Geçmişin güzel buluşmaları, bugünkü sosyal güvenimin kaynağıdır.",
        "Birlikte güldüğümüz o anlar hayatımın en kıymetli hazineleridir.",
        "Dostluk bağlarımın ne kadar sağlam olduğunu maziye bakınca görüyorum."
      ]
    }
  }
};

export const FOCUS_AFFIRMATIONS = [
  "Bugün sadece kendi iç sesime ve ruhumun derinliklerine odaklanıyorum.",
  "Zihnimi sadeleştiriyor ve sadece gerçekten önemli olana yer açıyorum.",
  "Eylemlerimi niyetimle hizalıyor ve disiplinle ilerliyorum.",
  "Günün getirdiği her fırsatı, gelişimim için bir araç olarak görüyorum.",
  "Anın içinde kalarak enerjimi en verimli şekilde kullanmayı seçiyorum.",
  "Bugün dikkatimi dağıtan her şeyi nazikçe uzaklaştırıyor, özüme dönüyorum.",
  "Yaratıcılığımın akmasına izin veriyor, ilhamı kucaklıyorum.",
  "Kendi değerimi hatırlayarak, önceliklerimi bu farkındalıkla belirliyorum.",
  "Zihinsel berraklığım, karşılaştığım her karmaşayı çözmemi sağlıyor.",
  "Bugün sadece 'var olmanın' ve anın büyüsünün tadını çıkarıyorum.",
  "Zihnimin derinliklerindeki sessizliği dinleyerek ruhsal dengemi koruyorum.",
  "Her eylemimde evrenin bilgeliğiyle hareket etmeyi seçiyorum.",
  "Bugün sadece sevgi ve şefkat frekansında kalmaya niyet ediyorum.",
  "Zihnimdeki karmaşayı bir kenara bırakıp kalbimin sesine kulak veriyorum.",
  "Kendimi ve dünyayı olduğu gibi kabul etmenin huzuruna odaklanıyorum.",
  "Yaratıcı enerjimi somut projelere dönüştürmek için disiplinli bir gün.",
  "Sınırlarımı nezaketle koruyarak enerjimi doğru alanlara yönlendiriyorum.",
  "Bugün karşılaştığım her insanla pozitif ve yapıcı bir bağ kuruyorum.",
  "Zihinsel ve bedensel sağlığımı korumayı günün en büyük önceliği yapıyorum.",
  "Anın içindeki mucizeleri fark ederek şükranla doluyorum.",
  "Kozmik enerjiyi soluyarak tüm hücrelerimi yaşam gücüyle dolduruyorum.",
  "Bugün sadece çözüm odaklı kalmayı ve engelleri fırsata çevirmeyi seçiyorum.",
  "Zihnimin bahçesindeki olumsuz düşünceleri ayıklayıp umut tohumları ekiyorum.",
  "Yıldızların rehberliğinde kendi özgür ve özgün yolumda ilerliyorum.",
  "Bugün sessizliğin içindeki derin bilgeliğe ve huzura odaklanıyorum."
];

export const DAY_TO_DAY_AFFIRMATIONS = [
  "Dünün tecrübesiyle bugün daha bilge ve kararlı adımlar atıyorum.",
  "Günden güne kendimin en iyi versiyonuna dönüşmeye devam ediyorum.",
  "Her yeni doğan güneş, hayatımda yeni bir umut ve fırsat penceresidir.",
  "Dengeli ve huzurlu bir akışta, hayatın ritmine uyum sağlıyorum.",
  "Yıldızların rehberliğinde, her gün daha da parlamayı seçiyorum.",
  "Dün olanlar dünle beraber gitti, bugün yepyeni bir başlangıç yapıyorum.",
  "Her gün, evrenin bana sunduğu gizli hediyeleri keşfediyorum.",
  "Duygusal dengemi günden güne daha sağlam bir temele oturtuyorum.",
  "Hayatımın mimarı benim ve her gün daha güzel bir yapı inşa ediyorum.",
  "Kozmik akış beni her geçen gün daha aydınlık bir geleceğe taşıyor.",
  "Yolculuğumun her günü, ruhumun evriminde yeni bir basamaktır.",
  "Günden güne artan bir farkındalıkla hayatın büyüsünü yaşıyorum.",
  "Dünün yorgunluğu bugünün şifalı enerjisiyle tamamen temizleniyor.",
  "Her yeni güne, evrenin sınırsız olasılıklarına kalbimi açarak başlıyorum.",
  "Günden güne gelişen sezgilerime güveniyor ve onları takip ediyorum.",
  "Yaşam ritmim, doğanın ve evrenin mükemmel uyumuyla günden güne hizalanıyor.",
  "Her gün attığım küçük adımlar, gelecekteki büyük zaferlerimin temelidir.",
  "Duygusal esnekliğim her geçen gün artıyor, her durumu asaletle karşılıyorum.",
  "Günden güne daha çok parlayan iç ışığım, çevremi de aydınlatıyor.",
  "Hayatın bana sunduğu her deneyimi günden güne daha derin bir bilgelikle okuyorum.",
  "Kozmik bir dansın içindeyim ve her gün bu ritme daha çok uyum sağlıyorum.",
  "Günden güne güçlenen irademle, hayallerimi gerçeğe dönüştürüyorum.",
  "Dün öğrendiğim her ders, bugünkü kararlarımda bana rehberlik ediyor.",
  "Her gün, ruhumun sonsuz potansiyelini biraz daha fazla keşfediyorum.",
  "Yaşam yolculuğumda günden güne daha çok sevgi, neşe ve bolluk biriktiriyorum."
];

export const GENERAL_AFFIRMATIONS = [
  "Evrenin bolluk ve bereket enerjisiyle tam bir uyum içindeyim.",
  "Kendimi olduğum gibi seviyor ve tüm potansiyelimi kucaklıyorum.",
  "Hayatın akışına güveniyor, her şeyin en hayırlı zamanda geldiğine inanıyorum.",
  "İçimdeki güç, karşılaştığım her engeli aşmaya fazlasıyla yeterli.",
  "Bugün mucizelere kalbimi açıyor ve şükranla doluyorum.",
  "Varlığım bu dünyaya katılan eşsiz bir değerdir.",
  "Sevgi, neşe ve huzur hayatımın her anına nüfuz ediyor.",
  "Ben her türlü iyiliği ve güzelliği hak eden biriyim.",
  "Evren beni her adımda koruyor, kolluyor ve yönlendiriyor.",
  "Sınırsız potansiyelimi kullanarak, hayallerimin de ötesinde bir yaşam yaratıyorum.",
  "Kozmik enerjinin şifalı akışı, zihnimi ve bedenimi her an yeniliyor.",
  "Hayatın her anında ilahi bir koruma ve rehberlik altındayım.",
  "Düşüncelerimle kendi gerçekliğimi en yüksek hayrım için yaratıyorum.",
  "Kalbimdeki sevgi, tüm korkuları eriten sarsılmaz bir güce sahiptir.",
  "Ben evrenin sevilen, desteklenen ve her zaman kollanan bir parçasıyım.",
  "Ruhumun derinliklerindeki huzur, dış dünyadaki tüm fırtınaları dindirir.",
  "Bolluk ve bereket bana her yönden kolaylıkla ve neşeyle akıyor.",
  "Kendi iç ışığıma güveniyor ve onu tüm dünyayla paylaşıyorum.",
  "Her nefeste evrenin yaşam gücünü soluyor ve canlanıyorum.",
  "Zihnim huzurlu, kalbim açık ve ruhum özgür; her şey mükemmel ilerliyor.",
  "Evrenin bilgeliği benimle konuşuyor, sezgilerimi dikkatle dinliyorum.",
  "Hayatın bana sunduğu her kapı, daha büyük bir güzelliğe ve bilince açılır.",
  "Kendi değerimi kimseden onay beklemeden, ruhumun derinliklerinde biliyorum.",
  "Yıldızların ritmiyle uyum içindeyim, her anım kutsal bir akışın parçasıdır.",
  "Ben mucizelerin kendisiyim ve her anımda bu mucizeyi yaşıyorum."
];
