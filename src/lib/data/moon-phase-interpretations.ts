export const MOON_PHASE_INTERPRETATIONS_TR: Record<string, string> = {
  "new_moon": "Güneş ve Ay aynı burçta kavuşur; gökyüzü karanlıktır. Enerjinin en düşük olduğu ama potansiyelin en yüksek olduğu bu evrede, yeni başlangıçlar için tohumlar atılır ve niyetler belirlenir. Geçmişi arkada bırakıp temiz bir sayfa açmak ve plan yapmak için en ideal zamandır.",
  "waxing_crescent": "Ay'ın incecik bir yay şeklinde göründüğü, ışığın büyümeye başladığı evredir. Yeniayda atılan niyetlerin filizlenmeye başladığı, somut adımlara dönüştüğü süreçtir; harekete geçmek için gereken ilk cesaret toplanır ancak eski alışkanlıkların direnciyle karşılaşılabilir.",
  "first_quarter": "Ay yarım daire şeklindedir; ışık ve karanlık eşittir. Karşılaşılan ilk engeller ve krizler, niyetin ne kadar sağlam olduğunu test eder; kararlılıkla mücadele etmek ve planlarda gerekli düzeltmeleri yapıp eyleme devam etmek gerekir.",
  "waxing_gibbous": "Ay'ın neredeyse tamamının aydınlandığı evredir. Hedefe çok yaklaşılmıştır; olayların netleşmeye başladığı, eksiklerin tamamlandığı ve bilginin toplanıp analiz edildiği, Dolunaydaki büyük açığa çıkışa hazırlık yapılan süreçtir.",
  "full_moon": "Güneş ve Ay zıt burçlardadır; Ay tamamen aydınlıktır. Farkındalığın ve duygusal yoğunluğun zirve yaptığı bu evrede, gizli kalan her şey açığa çıkar ve sonuçlar netleşir; bir tamamlanma, hasat toplama veya artık işe yaramayanı bırakma zamanıdır.",
  "waning_gibbous": "Ay'ın ışığı azalmaya başlar ama hala güçlüdür. Dolunayda elde edilen deneyimlerin, bilgilerin ve sonuçların başkalarıyla paylaşıldığı, mesajın yayıldığı ve sosyalleşmenin arttığı evredir.",
  "last_quarter": "Ay tekrar yarım daire şeklindedir ancak ışık azalmaktadır. Sorumlulukların gözden geçirildiği, işe yaramayan yapıların yıkıldığı ve yön değişikliği yapılabilen bir kriz evresidir; geleceğe taşınmayacak yüklerden kurtulmak ve bir sonraki döngüye hazırlanmak için eleme yapılır.",
  "waning_crescent": "Yeniaydan hemen önceki en karanlık, hilalin ters olduğu evredir. Fiziksel enerjinin çekildiği, ruhsal şifanın, bitişlerin ve kabullenişin öne çıktığı bir dinlenme dönemidir; yeni bir döngüye girmeden önce teslimiyet içinde olmak ve rüyalara odaklanmak gerekir.",
  "balsamic": "Yeniaydan hemen önceki en karanlık, hilalin ters olduğu evredir. Fiziksel enerjinin çekildiği, ruhsal şifanın, bitişlerin ve kabullenişin öne çıktığı bir dinlenme dönemidir; yeni bir döngüye girmeden önce teslimiyet içinde olmak ve rüyalara odaklanmak gerekir."
};

export const MOON_PHASE_INTERPRETATIONS_EN: Record<string, string> = {
  "new_moon": "The Sun and Moon conjoin in the same sign; the sky is dark. In this phase where energy is at its lowest but potential is at its highest, seeds are planted for new beginnings and intentions are set. It's the ideal time to leave the past behind, open a clean page, and make plans.",
  "waxing_crescent": "The phase where the Moon appears as a thin arc and light begins to grow. This is the process where intentions set at the New Moon begin to sprout and transform into concrete steps; the first courage needed to take action is gathered, but resistance from old habits may be encountered.",
  "first_quarter": "The Moon is in a half-circle shape; light and dark are equal. The first obstacles and crises encountered test how solid your intention is; it's necessary to struggle with determination and continue taking action while making necessary corrections to your plans.",
  "waxing_gibbous": "The phase where almost the entire Moon is illuminated. You're very close to your goal; this is the process where events begin to clarify, gaps are filled, and information is gathered and analyzed, preparing for the great revelation at the Full Moon.",
  "full_moon": "The Sun and Moon are in opposite signs; the Moon is fully illuminated. In this phase where awareness and emotional intensity peak, everything hidden comes to light and results become clear; it's a time of completion, harvesting, or letting go of what no longer serves.",
  "waning_gibbous": "The Moon's light begins to decrease but is still strong. This is the phase where experiences, knowledge, and results obtained at the Full Moon are shared with others, the message spreads, and socialization increases.",
  "last_quarter": "The Moon is again in a half-circle shape but light is decreasing. This is a crisis phase where responsibilities are reviewed, non-functional structures are dismantled, and direction changes can be made; elimination is done to get rid of burdens that won't be carried into the future and to prepare for the next cycle.",
  "waning_crescent": "The darkest phase just before the New Moon, where the crescent is reversed. A rest period where physical energy is withdrawn, spiritual healing, endings, and acceptance come to the forefront; before entering a new cycle, it's necessary to be in surrender and focus on dreams.",
  "balsamic": "The darkest phase just before the New Moon, where the crescent is reversed. A rest period where physical energy is withdrawn, spiritual healing, endings, and acceptance come to the forefront; before entering a new cycle, it's necessary to be in surrender and focus on dreams."
};

export function getMoonPhaseCosmicGuidance(phase: string, language: 'tr' | 'en' = 'tr'): string {
  const interpretations = language === 'tr' ? MOON_PHASE_INTERPRETATIONS_TR : MOON_PHASE_INTERPRETATIONS_EN;
  return interpretations[phase] || (language === 'tr' ? "Ay döngüsünün bu evresinde içsel yolculuğunuza odaklanın." : "Focus on your inner journey in this phase of the lunar cycle.");
}
