"use client";

import React from "react";
import { Sparkles, Moon, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function StatsHeader({ profile }: { profile: any }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-background/80 backdrop-blur-md z-30">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-mystic-purple flex items-center justify-center border border-mystic-gold/30">
          <Star className="w-5 h-5 text-mystic-gold" />
        </div>
        <div>
          <h2 className="font-mystic text-xs text-muted-foreground uppercase tracking-widest">Aura Seviyesi</h2>
          <div className="flex items-center gap-1">
            <span className="font-mystic text-mystic-purple dark:text-mystic-gold">Işıldayan</span>
            <div className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-mystic-gold" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Badge variant="secondary" className="bg-mystic-gold/10 text-mystic-gold border-mystic-gold/20 px-3 py-1.5 rounded-full flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        <span className="font-bold">{profile?.star_dust || 150}</span>
        <span className="text-[10px] opacity-70">✨</span>
      </Badge>
    </div>
  );
}
