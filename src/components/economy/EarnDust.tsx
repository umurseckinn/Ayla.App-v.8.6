"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EarnDust({ onComplete, onCancel }: { onComplete: (amount: number) => void, onCancel: () => void }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleWatch = () => {
    setLoading(true);
    // Simulate 5s video
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 5000);
  };

  const handleClaim = () => {
    onComplete(50);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
      <Card className="w-full max-w-sm bg-mystic-purple border-mystic-gold/30 p-8 text-center space-y-6 overflow-hidden relative">
        <button onClick={onCancel} className="absolute top-[calc(env(safe-area-inset-top)+1rem)] right-4 text-white/50 hover:text-white"><X /></button>
        
        {!done ? (
          <>
            <div className="w-20 h-20 mx-auto bg-mystic-gold/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-mystic-gold animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-mystic text-white">Yıldız Tozu Kazan</h3>
              <p className="text-white/70 font-serif italic text-sm">
                Kısa bir video izleyerek enerjini tazeleyebilir ve 50 ✨ kazanabilirsin.
              </p>
            </div>
            
            <Button 
              onClick={handleWatch} 
              disabled={loading}
              className="w-full bg-mystic-gold text-mystic-purple font-bold py-6 rounded-full"
            >
              {loading ? "Yükleniyor..." : <><Play className="mr-2 fill-current" /> İzle ve Kazan</>}
            </Button>
            
            {loading && (
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5 }}
                  className="h-full bg-mystic-gold"
                />
              </div>
            )}
          </>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-mystic text-white">Harika!</h3>
              <p className="text-white/70 font-serif italic text-sm">
                50 ✨ Yıldız Tozu cüzdanına eklendi.
              </p>
            </div>
            <Button onClick={handleClaim} className="w-full bg-mystic-gold text-mystic-purple font-bold py-6 rounded-full">
              Tozları Topla
            </Button>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
