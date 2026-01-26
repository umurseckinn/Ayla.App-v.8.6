"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sparkles, RefreshCw, Star, Wand2, Heart, Coins, Activity, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AYLA_IMAGE as CONSTANT_AYLA_IMAGE } from "@/lib/constants";
import { getTurkishCardInfo } from "@/lib/tarot-data";
import { useProfile } from "@/hooks/useProfile";
import { TarotCardBack } from "@/components/ui/TarotCardBack";
import { getTarotImageUrl } from "@/lib/tarot-assets";
import { generatePersonalizedReading, TarotTopic } from "@/lib/tarot-engine";
import { AstroModifier } from "@/lib/tarot-engine-data";
import { COSMIC_LOGIC } from "@/lib/astrology";
import { useLanguage } from "@/contexts/LanguageContext";
import { LOCAL_TAROT_CARDS } from "@/lib/tarot-cards-data";
import { PremiumModal } from "../premium/PremiumModal";
import { AdContentPopup } from "../ads/AdContentPopup";

// TarotCard type matches LOCAL_TAROT_CARDS structure
interface TarotCard {
  name: string;
  name_short: string;
  value: string;
  value_int: number;
  suit: string;
  type: string;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
}

const AYLA_IMAGE = CONSTANT_AYLA_IMAGE || "/ayla-transparent.png";

const TarotCardImage = ({ nameShort, isReversed, className = "" }: { nameShort: string, isReversed?: boolean, className?: string }) => {
  const imageUrl = getTarotImageUrl(nameShort);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useLanguage();

  return (
    <div
      className={`aspect-[2/3] w-full rounded-lg border border-[#D4AF37]/30 overflow-hidden relative shadow-[0_0_15px_rgba(212,175,55,0.1)] bg-[#1a1a2e] ${className}`}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <RefreshCw className="w-6 h-6 text-mystic-gold/20 animate-spin" />
        </div>
      )}
      <img
        src={imageUrl}
        alt={nameShort}
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${isReversed ? 'rotate-180' : ''}`}
      />
      {isReversed && (
        <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-mystic-gold font-bold text-center py-1 backdrop-blur-sm tracking-widest uppercase">{t('retro')}</div>
      )}
    </div>
  );
};

export function TarotReading({ onBack, onSpend }: { onBack: () => void, onSpend: (amount: number) => void }) {
  const { profile, subscriptionStatus } = useProfile();
  const { t } = useLanguage();
  const [phase, setPhase] = useState<"niche" | "waiting" | "selecting" | "result">("niche");
  const [cards] = useState<TarotCard[]>(LOCAL_TAROT_CARDS as any);
  const [selectedCards, setSelectedCards] = useState<Array<{ card: TarotCard, isReversed: boolean }>>([]);
  const [selectedTopic, setSelectedTopic] = useState<TarotTopic | null>(null);
  const [loading] = useState(false);
  const [interpreting, setInterpreting] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isWaitingForPremium, setIsWaitingForPremium] = useState(false);

  // Auto-open logic when premium is acquired
  useEffect(() => {
    if (subscriptionStatus === 'premium' && isWaitingForPremium && selectedCards.length === 3 && phase === "selecting") {
      setIsWaitingForPremium(false);
      onSpend(100);
      setPhase("result");
      getInterpretation(selectedCards);
    }
  }, [subscriptionStatus, isWaitingForPremium, selectedCards, phase]);

  const handleAdComplete = () => {
    setShowAdPopup(false);
    if (selectedCards.length === 3) {
      onSpend(100);
      setPhase("result");
      getInterpretation(selectedCards);
    }
  };

  const intentions: Array<{ id: TarotTopic, label: string, icon: React.ReactNode }> = [
    { id: "love", label: t('intentLove'), icon: <Heart className="w-4 h-4" /> },
    { id: "health", label: t('intentHealth'), icon: <Activity className="w-4 h-4" /> },
    { id: "money", label: t('intentMoney'), icon: <Coins className="w-4 h-4" /> },
    { id: "career", label: t('intentCareer'), icon: <Briefcase className="w-4 h-4" /> },
    { id: "general", label: t('intentGeneral'), icon: <Sparkles className="w-4 h-4" /> },
  ];

  // Removed fetchCards useEffect

  const getInterpretation = async (selected: Array<{ card: TarotCard, isReversed: boolean }>) => {
    setInterpreting(true);

    setTimeout(() => {
      try {
        const elementMap: Record<string, keyof AstroModifier> = {
          "Ateş": "Fire",
          "Toprak": "Earth",
          "Hava": "Air",
          "Su": "Water",
          "Fire": "Fire",
          "Earth": "Earth",
          "Air": "Air",
          "Water": "Water"
        };

        const rawElement = profile?.dominant_element || "Water";
        const dominantElement = elementMap[rawElement] || "Water";

        // Extract house data based on topic for better personalization
        let birthChartHouses = undefined;
        const topicToHouse: Record<TarotTopic, number> = {
          love: 7,
          career: 10,
          health: 6,
          money: 2,
          general: 1
        };

        const houseNum = topicToHouse[selectedTopic || "general"];
        const desc = (COSMIC_LOGIC.houseInterpretations as any)[houseNum];

        if (desc) {
          birthChartHouses = [{ house: houseNum, interpretation: desc }];
        }

        // Get current language from localStorage
        const currentLanguage = (typeof window !== 'undefined' ? localStorage.getItem('ayla_language') : 'tr') as 'tr' | 'en' || 'tr';

        const interpretation = generatePersonalizedReading({
          cards: selected.map(s => ({
            id: s.card.name_short,
            name: getTurkishCardInfo(s.card.name_short, s.card.name).name,
            englishName: s.card.name,
            isReversed: s.isReversed
          })),
          topic: selectedTopic || "general",
          dominantElement,
          birthChartHouses,
          language: currentLanguage
        });



        setAiInterpretation(interpretation);
      } catch (error) {
        console.error("Interpretation Error:", error);
        toast.error(t('error'));
      } finally {
        setInterpreting(false);
      }
    }, 2500);
  };

  const handleStart = () => {
    if (!selectedTopic) {
      toast.error(t('pleaseSelectIntent'));
      return;
    }
    setPhase("waiting");
    setTimeout(() => setPhase("selecting"), 2000);
  };

  const handleSelectCard = () => {
    if (cards.length === 0 || selectedCards.length >= 3) return;

    const randomIndex = Math.floor(Math.random() * cards.length);
    const card = cards[randomIndex];
    const isReversed = Math.random() > 0.3;

    const newSelected = [...selectedCards, { card, isReversed }];
    setSelectedCards(newSelected);

    if (newSelected.length === 3) {
      if (subscriptionStatus !== 'premium') {
        setIsWaitingForPremium(true);
        setShowAdPopup(true);
        return;
      }
      onSpend(100);
      setPhase("result");
      getInterpretation(newSelected);
    }
  };

  if (loading) {
    return (
      <div 
        className="fixed inset-0 z-50 bg-mystic-blue flex flex-col items-center justify-center p-6"
        style={{
          paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)'
        }}
      >
        <RefreshCw className="w-12 h-12 text-mystic-gold animate-spin mb-4" />
        <p className="font-mystic text-mystic-gold">{t('destinyWeaving')}</p>
      </div>
    );
  }

    return (
            <div 
              className="fixed inset-0 z-50 bg-black flex flex-col text-[#D4AF37]"
            >
              <div className="star-field absolute inset-0 opacity-20 pointer-events-none" />

{/* Fixed Header - with proper safe area spacing */}
              <div 
                className="flex-shrink-0 px-4 pb-3 bg-gradient-to-b from-black via-black/95 to-transparent z-10"
                style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
              >
                <div className="max-w-md mx-auto w-full space-y-2">
                  <div className="flex items-center justify-start">
                    <Button variant="ghost" onClick={onBack} className="text-[#D4AF37]/50 hover:text-[#D4AF37] -ml-2 text-sm">{t('headersCancel')}</Button>
                  </div>
                  <h1 className="font-mystic text-2xl text-[#D4AF37] text-center">{t('cosmicTarot')}</h1>
                </div>
              </div>

              {/* Scrollable Content - full height with proper padding */}
              <div 
                className="flex-1 overflow-y-auto px-4 overscroll-contain min-h-0" 
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)',
                  paddingLeft: 'env(safe-area-inset-left)',
                  paddingRight: 'env(safe-area-inset-right)'
                }}
              >
              <div className="w-full max-w-md mx-auto space-y-4 relative z-10 pt-3">

        <AnimatePresence mode="wait">
          {phase === "niche" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 text-center pt-0">
                <div className="w-14 h-14 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center border border-[#D4AF37]/30">
                  <Moon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-lg font-mystic text-[#D4AF37]">{t('setIntent')}</h3>
                  <p className="font-serif italic text-[#D4AF37]/70 text-xs">{t('guidancePrompt')}</p>
                </div>
                <div className="flex flex-col gap-2">
                {intentions.map((niyet) => (
                  <button
                    key={niyet.id}
                    onClick={() => setSelectedTopic(niyet.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all gap-2 ${selectedTopic === niyet.id
                      ? "bg-[#D4AF37] border-[#D4AF37] text-black"
                      : "bg-white/5 border-[#D4AF37]/20 text-[#D4AF37] hover:border-[#D4AF37]/50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-full ${selectedTopic === niyet.id ? "bg-black/20" : "bg-[#D4AF37]/10"}`}>
                        {niyet.icon}
                      </div>
                      <span className="text-sm font-bold tracking-wide">{niyet.label}</span>
                    </div>
                    {selectedTopic === niyet.id && <Sparkles className="w-4 h-4 animate-pulse" />}
                  </button>
                ))}
              </div>

                  <Button onClick={handleStart} className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-full hover:bg-[#D4AF37]/90 transition-all shadow-lg shadow-[#D4AF37]/20 mt-4 mb-2">
                      {t('shuffleStart')}
                    </Button>
                    
                    {/* Bottom spacer for safe scrolling */}
                    <div className="h-8" />

            </motion.div>
          )}

          <AdContentPopup
            isOpen={showAdPopup}
            onClose={() => setShowAdPopup(false)}
            onWatchAd={handleAdComplete}
            onOpenPremium={() => {
              setShowAdPopup(false);
              setShowPremiumModal(true);
            }}
            title="Tarot"
            backgroundImage="/Tarot ad pop-up.png"
            imageClassName="object-center"
          />

          <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />

          {phase === "waiting" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20 text-center space-y-8">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-4 border-[#D4AF37]/20 rounded-full animate-ping" />
                <div className="absolute inset-0 border-4 border-[#D4AF37] rounded-full animate-spin border-t-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Star className="w-10 h-10 text-[#D4AF37] animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-mystic text-[#D4AF37]">{t('readingEnergy')}</h3>
                <p className="text-[#D4AF37]/70 font-serif italic">{t('starsAligning')}</p>
              </div>
            </motion.div>
          )}

          {phase === "selecting" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 text-center">
              <div className="space-y-2">
                <h3 className="text-xl font-mystic text-[#D4AF37]">{t('choose3Cards')} ({selectedCards.length}/3)</h3>
                <p className="text-xs text-[#D4AF37]/50 uppercase tracking-widest">{t('chooseForPastPresentFuture')}</p>
              </div>

              <div className="flex justify-center gap-4 mb-8">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className={`w-12 h-16 rounded-lg border-2 border-dashed flex items-center justify-center ${selectedCards[i] ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#D4AF37]/20'
                      }`}
                  >
                    {selectedCards[i] ? <Star className="w-6 h-6 text-[#D4AF37]" /> : <span className="text-xs opacity-20">{i + 1}</span>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10, scale: 1.05 }}
                    onClick={handleSelectCard}
                    className="aspect-[2/3] cursor-pointer relative group"
                  >
                    <TarotCardBack className="group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors rounded-xl" />
                  </motion.div>

                ))}
              </div>

            </motion.div>
          )}

          {phase === "result" && selectedCards.length === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-mystic text-[#D4AF37]">{t('destinyWhisper')}</h2>
                <p className="text-[#D4AF37]/60 text-xs italic font-serif">"{intentions.find(i => i.id === selectedTopic)?.label}"</p>
              </div>

              <div className="flex justify-center gap-3 py-4">
                {selectedCards.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex-1 max-w-[100px]"
                  >
                    <div className="text-[8px] uppercase tracking-widest text-[#D4AF37]/50 mb-1 text-center font-bold">
                      {idx === 0 ? t('itemPast') : idx === 1 ? t('itemPresent') : t('itemFuture')}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-full"
                    >
                      <TarotCardImage nameShort={item.card.name_short} isReversed={item.isReversed} />
                    </motion.div>

                  </motion.div>
                ))}
              </div>

              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-[#D4AF37]/10 to-black/90 border-[#D4AF37]/30 rounded-3xl relative overflow-hidden backdrop-blur-md">
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-xl animate-pulse" />
                      <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-black relative z-10 p-1">
                        <img src={AYLA_IMAGE} alt="Ayla" className="w-full h-full object-contain" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] rounded-full p-1.5 border-2 border-black">
                        <Wand2 className="w-4 h-4 text-black" />
                      </div>
                    </div>

                    <div className="w-full space-y-4">
                      <div className="text-center">
                        <h3 className="font-mystic text-xl text-[#D4AF37]">{t('aylasProphecy')}</h3>
                        <p className="text-[10px] text-[#D4AF37]/50 uppercase tracking-[0.2em] mt-1">{t('synthesizedForYou')}</p>
                      </div>

                      {interpreting ? (
                        <div className="py-12 flex flex-col items-center justify-center space-y-4">
                          <div className="flex gap-1">
                            <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                            <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                            <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                          </div>
                          <p className="font-serif italic text-sm text-[#D4AF37]/70 animate-pulse text-center">
                            {t('aylaCombiningCards')}
                          </p>
                        </div>
                      ) : aiInterpretation ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="max-w-none text-left space-y-4"
                        >
                          {aiInterpretation.split('\n').map((line, i) => {
                            if (line.trim() === '') return null;
                            const cleanLine = line.replace(/#/g, '').trim();
                            if (line.startsWith('###')) {
                              return <h3 key={i} className="text-[#D4AF37] font-mystic text-lg mt-6 mb-2">{cleanLine}</h3>;
                            }
                            if (line.startsWith('##')) {
                              return <h2 key={i} className="text-[#D4AF37] font-mystic text-xl mt-8 mb-4 border-b border-[#D4AF37]/20 pb-2">{cleanLine}</h2>;
                            }
                            return <p key={i} className="mb-4 text-[#D4AF37] leading-relaxed font-serif text-sm">{cleanLine}</p>;
                          })}
                        </motion.div>
                      ) : (
                        <p className="font-serif italic text-[#D4AF37]/70 text-sm leading-relaxed text-center">
                          {t('energyFluctuation')}
                        </p>
                      )}

                      <div className="pt-4 border-t border-[#D4AF37]/10 space-y-4">
                        <h4 className="text-[10px] text-[#D4AF37]/50 uppercase tracking-widest font-bold text-center">{t('essenceOfCards')}</h4>
                        <div className="grid gap-3">
                          {selectedCards.map((item, idx) => {
                            const trInfo = getTurkishCardInfo(item.card.name_short, item.card.name);
                            return (
                              <div key={idx} className="bg-white/5 p-3 rounded-xl border border-[#D4AF37]/5">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] text-[#D4AF37] font-bold px-1.5 py-0.5 bg-[#D4AF37]/10 rounded border border-[#D4AF37]/20 uppercase">
                                    {idx === 0 ? t('itemPast') : idx === 1 ? t('itemPresent') : t('itemFuture')}
                                  </span>
                                  <span className="text-xs font-bold text-[#D4AF37]">
                                    {item.card.name} ({trInfo.name}) {item.isReversed ? "(Ters)" : ""}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#D4AF37]/70 italic leading-snug">
                                  {item.isReversed ? trInfo.meaning_rev : trInfo.meaning_up}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <p className="font-serif italic text-[#D4AF37]/40 text-[10px] pt-4 text-center">
                        {t('disclaimer')}
                      </p>
                    </div>
                  </div>
                </Card>

                <Button onClick={onBack} className="w-full py-4 rounded-full bg-[#D4AF37] text-black font-bold hover:bg-[#D4AF37]/90 transition-all shadow-lg shadow-[#D4AF37]/20">
                    {t('completeClose')}
                  </Button>
                  
                  {/* Extra bottom spacer for safe scrolling */}
                  <div className="h-8" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </div>
    );
}
