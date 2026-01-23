"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sparkles, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculateBirthChart } from "@/lib/astronomy-service";
import { calculateEnergyPotential } from "@/lib/energy-potential-service";

export function EnergyWheel({ profile, onBack, onSpend }: { profile: any, onBack: () => void, onSpend: (amount: number) => void }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSpin = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      
      if (!profile) {
        setResult({
          love: Math.floor(Math.random() * 40) + 60,
          career: Math.floor(Math.random() * 50) + 40,
          health: Math.floor(Math.random() * 30) + 70,
          luck: Math.floor(Math.random() * 60) + 40,
        });
        return;
      }

      const chart = calculateBirthChart(
        new Date(profile.birth_date),
        profile.birth_time || "12:00",
        profile.latitude || 41.0082,
        profile.longitude || 28.9784
      );

      const energy = calculateEnergyPotential(chart);
      setResult({
        love: energy.categories.emotional.percentage,
        career: energy.categories.mental.percentage,
        health: energy.categories.physical.percentage,
        luck: energy.categories.spiritual.percentage,
      });
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col p-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-[calc(env(safe-area-inset-bottom)+1.5rem)] overflow-y-auto">
      <div className="star-field absolute inset-0 opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-md mx-auto space-y-8 relative z-10 pb-12">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground"><X /></Button>
          <h2 className="font-mystic text-xl gold-text">Enerji Çarkı</h2>
          <div className="w-10" />
        </div>

        <div className="text-center space-y-8">
          <div className="relative w-64 h-64 mx-auto">
            <motion.div
              animate={spinning ? { rotate: 3600 } : { rotate: 0 }}
              transition={spinning ? { duration: 3, ease: "easeOut" } : { duration: 0 }}
              className="w-full h-full rounded-full border-8 border-mystic-gold/20 relative flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#2d0a4e,#d4af37,#2d0a4e,#d4af37,#2d0a4e)] opacity-20" />
              <Zap className="w-16 h-16 text-mystic-gold" />
            </motion.div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2">
              <div className="w-4 h-8 bg-mystic-gold rounded-full" />
            </div>
          </div>

          <AnimatePresence>
            {!result ? (
              <motion.div exit={{ opacity: 0 }} className="space-y-4">
                <p className="font-serif italic text-muted-foreground">Bugün evren senin için hangi kapıları açıyor?</p>
                <Button 
                  onClick={handleSpin} 
                  disabled={spinning}
                  className="w-full bg-mystic-gold text-mystic-purple font-bold py-8 rounded-full text-xl shadow-lg shadow-mystic-gold/20"
                >
                  {spinning ? "Çark Dönüyor..." : "Kaderini Çevir"}
                </Button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Aşk" value={result.love} color="text-pink-500" />
                  <StatCard label="Kariyer" value={result.career} color="text-blue-500" />
                  <StatCard label="Sağlık" value={result.health} color="text-green-500" />
                  <StatCard label="Şans" value={result.luck} color="text-yellow-500" />
                </div>
                
                <Card className="p-6 bg-mystic-purple/5 border-mystic-gold/20">
                  <h4 className="font-mystic text-mystic-gold mb-2">Günün Mesajı</h4>
                  <p className="font-serif italic text-sm">
                    "Bugün aşk enerjin tavan yapmış durumda! Karşına çıkan fırsatları değerlendirmek için kalbini açık tut. Kariyerinde ise sabırlı olman gereken bir gün."
                  </p>
                  <Button className="w-full mt-4 bg-mystic-purple text-white text-xs rounded-full h-10">
                    <TrendingUp className="w-3 h-3 mr-2" /> Detaylı Analizi Oku (Reklam İzle)
                  </Button>
                </Card>

                <Button onClick={() => setResult(null)} variant="ghost" className="text-muted-foreground">
                  Tekrar Çevir
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <Card className="p-4 bg-white/5 border-white/10">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
      <div className={`text-2xl font-mystic ${color}`}>%{value}</div>
      <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full bg-current ${color}`}
        />
      </div>
    </Card>
  );
}
