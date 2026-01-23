"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Sparkles,
  Shield,
  X,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { getCurrentRetrogrades } from "@/lib/cosmic-events-service";
import {
  getSunSign,
  calculatePersonalImpact,
  getImpactColor,
  getImpactTextColor,
  generateAffirmation,
  generateImpactReason,
  ImpactLevel
} from "@/lib/astrology";

interface CosmicEvent {
  id: string;
  event_name: string;
  event_type: string;
  start_date: string;
  end_date: string;
  planet: string;
  description: string;
  general_impact: string;
}

interface AylaWarningsProps {
  onOpenCalendar?: () => void;
}

export function AylaWarnings({ onOpenCalendar }: AylaWarningsProps) {
  const { profile } = useProfile();
  const [activeEvents, setActiveEvents] = useState<CosmicEvent[]>([]);
  const [userSunSign, setUserSunSign] = useState<string>("");
  const [expandedWarning, setExpandedWarning] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    fetchActiveEvents();
    if (profile?.birth_date) {
      setUserSunSign(getSunSign(new Date(profile.birth_date)));
    }
  }, [profile]);

  const fetchActiveEvents = async () => {
    // Offline mode: Generate cosmic events from retrograde calculations
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const retrogrades = getCurrentRetrogrades(today);

    const events: CosmicEvent[] = retrogrades.map((r, idx) => ({
      id: `retro-${idx}`,
      event_name: `${r.planet} Retrosu`,
      event_type: "retrograde",
      start_date: todayStr,
      end_date: todayStr,
      planet: r.planet,
      description: `${r.planet} şu an ${r.sign} burcunda geri harekette.`,
      general_impact: "İçe Dönüş ve Revizyon"
    }));

    setActiveEvents(events);
  };

  const getWarningEvents = () => {
    return activeEvents.filter(event => {
      const impact = calculatePersonalImpact(userSunSign, event.planet, event.event_type);
      return impact === "negative" && !dismissed.includes(event.id);
    });
  };

  const getPositiveEvents = () => {
    return activeEvents.filter(event => {
      const impact = calculatePersonalImpact(userSunSign, event.planet, event.event_type);
      return impact === "positive" && !dismissed.includes(event.id);
    });
  };

  const warningEvents = getWarningEvents();
  const positiveEvents = getPositiveEvents();

  if (warningEvents.length === 0 && positiveEvents.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {warningEvents.map(event => {
        const impact = calculatePersonalImpact(userSunSign, event.planet, event.event_type);
        const reason = generateImpactReason(userSunSign, event.planet, event.event_type, impact);
        const affirmation = generateAffirmation(impact, event.event_type, event.planet);
        const isExpanded = expandedWarning === event.id;

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <Card
              className="p-4 bg-rose-500/10 border-rose-500/30 cursor-pointer"
              onClick={() => setExpandedWarning(isExpanded ? null : event.id)}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-rose-400 font-mystic text-sm">{event.event_name}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-white/40 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDismissed([...dismissed, event.id]);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-white/60 text-xs mt-1">
                    {new Date(event.start_date).toLocaleDateString('tr-TR')} - {new Date(event.end_date).toLocaleDateString('tr-TR')}
                  </p>

                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="mt-3 space-y-3"
                    >
                      <p className="text-white/70 text-sm">{reason}</p>

                      <div className="p-3 bg-mystic-purple/30 rounded-lg border border-mystic-gold/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-mystic-gold" />
                          <p className="text-xs text-mystic-gold font-mystic">Ayla'dan Koruma Olumlaması</p>
                        </div>
                        <p className="text-white/80 text-sm italic">"{affirmation}"</p>
                      </div>

                      {onOpenCalendar && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-rose-400 hover:text-rose-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenCalendar();
                          }}
                        >
                          Takvimde Gör <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}

      {positiveEvents.slice(0, 1).map(event => {
        const impact = calculatePersonalImpact(userSunSign, event.planet, event.event_type);
        const affirmation = generateAffirmation(impact, event.event_type, event.planet);

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4 bg-emerald-500/10 border-emerald-500/30">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-emerald-400 font-mystic text-sm">{event.event_name}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-white/40 hover:text-white"
                      onClick={() => setDismissed([...dismissed, event.id])}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-white/70 text-xs mt-1 italic">"{affirmation}"</p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
