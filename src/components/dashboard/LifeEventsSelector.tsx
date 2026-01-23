"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Plus, X, ChevronDown, Trash2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LIFE_EVENTS,
  LifeEvent,
  UserLifeEvent,
  getCategoryColor,
  getCategoryName,
  getEventName
} from "@/lib/data/life-events";

interface LifeEventsSelectorProps {
  userEvents: UserLifeEvent[];
  onEventsChange: (events: UserLifeEvent[]) => void;
}

import { useLanguage } from "@/contexts/LanguageContext";

export function LifeEventsSelector({ userEvents, onEventsChange }: LifeEventsSelectorProps) {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEventPicker, setShowEventPicker] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<LifeEvent["category"] | null>(null);

  const categories: Array<LifeEvent["category"]> = ["Social", "Career", "Love", "Health", "Finance"];

  const isDateInFuture = (dateStr: string) => {
    if (!dateStr) return false;
    const [y, m, d] = dateStr.split('-').map(Number);
    const eventDate = new Date(y, m - 1, d);
    eventDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate.getTime() > today.getTime();
  };

  const filteredEvents = activeCategory
    ? LIFE_EVENTS.filter(e => {
      if (e.category !== activeCategory) return false;
      if (selectedDate && isDateInFuture(selectedDate)) {
        return e.isPlannable;
      }
      return true;
    })
    : [];

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    if (selectedEvent && isDateInFuture(date) && !selectedEvent.isPlannable) {
      setSelectedEvent(null);
    }
  };

  const handleAddEvent = () => {
    if (!selectedEvent || !selectedDate) return;

    const newEvent: UserLifeEvent = {
      event_id: selectedEvent.event_id,
      event_date: selectedDate
    };

    onEventsChange([...userEvents, newEvent]);
    setSelectedEvent(null);
    setSelectedDate("");
    setShowEventPicker(false);
  };

  const handleRemoveEvent = (index: number) => {
    const updated = userEvents.filter((_, i) => i !== index);
    onEventsChange(updated);
  };

  const getEventData = (eventId: string) => {
    return LIFE_EVENTS.find(e => e.event_id === eventId);
  };

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const eventDate = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    const diff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (language === 'en') {
      if (diff === 0) return "Today";
      if (diff === 1) return "Tomorrow";
      if (diff < 0) return `${Math.abs(diff)} days ago`;
      return `In ${diff} days`;
    }
    if (diff === 0) return "Bugün";
    if (diff === 1) return "Yarın";
    if (diff < 0) return `${Math.abs(diff)} gün önce`;
    return `${diff} gün sonra`;
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-1"
      >
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-mystic-gold" />
          <h3 className="font-mystic text-[10px] text-mystic-gold uppercase tracking-widest">
            {t('lifeEvents')}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {userEvents.length > 0 && (
            <span className="text-[10px] bg-mystic-gold/20 text-mystic-gold px-2 py-0.5 rounded-full">
              {userEvents.length}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 text-mystic-gold/60 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <Card className="p-4 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-mystic-gold/20">
              {userEvents.length > 0 && (
                <div className="space-y-2 mb-4">
                  {userEvents.map((ue, index) => {
                    const eventData = getEventData(ue.event_id);
                    if (!eventData) return null;

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 group hover:border-mystic-gold/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{eventData.icon}</span>
                          <div>
                            <p className="text-white text-sm font-medium">{getEventName(eventData, language)}</p>
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[9px] px-1.5 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: `${getCategoryColor(eventData.category)}20`,
                                  color: getCategoryColor(eventData.category)
                                }}
                              >
                                {getCategoryName(eventData.category, language)}
                              </span>
                              <span className="text-white/40 text-[10px]">{formatDate(ue.event_date)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-medium ${eventData.polarity === "Positive" ? "text-emerald-400" : "text-rose-400"
                            }`}>
                            {getDaysUntil(ue.event_date)}
                          </span>
                          <button
                            onClick={() => handleRemoveEvent(index)}
                            className="p-1.5 rounded-lg text-white/30 hover:text-rose-400 hover:bg-rose-400/10 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {!showEventPicker ? (
                <Button
                  onClick={() => setShowEventPicker(true)}
                  variant="outline"
                  className="w-full border-dashed border-mystic-gold/30 text-mystic-gold hover:bg-mystic-gold/10 hover:border-mystic-gold/50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addEvent')}
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">{t('whatHappening')}</span>
                    <button
                      onClick={() => {
                        setShowEventPicker(false);
                        setSelectedEvent(null);
                        setSelectedDate("");
                      }}
                      className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 pb-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                        className={`px-2 py-1.5 rounded-full text-[9px] font-medium transition-colors ${activeCategory === cat
                          ? "bg-mystic-gold text-mystic-blue"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                          }`}
                      >
                        {getCategoryName(cat, language)}
                      </button>
                    ))}
                  </div>

                  {activeCategory && (
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto scrollbar-hide animate-in fade-in slide-in-from-top-2 duration-300">
                      {filteredEvents.map(event => (
                        <button
                          key={event.event_id}
                          onClick={() => setSelectedEvent(event)}
                          className={`p-3 rounded-xl text-left transition-all ${selectedEvent?.event_id === event.event_id
                            ? "bg-mystic-gold/20 border-mystic-gold/50 border-2"
                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                            }`}
                        >
                          <span className="text-xl block mb-1">{event.icon}</span>
                          <span className="text-white text-xs font-medium block leading-tight">{getEventName(event, language)}</span>
                          <span
                            className="text-[9px] mt-1 inline-block"
                            style={{ color: getCategoryColor(event.category) }}
                          >
                            {event.polarity === "Positive" ? "+" : ""}{event.base_impact_percent}%
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedEvent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3 pt-3 border-t border-white/10"
                    >
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                        <span className="text-2xl">{selectedEvent.icon}</span>
                        <div>
                          <p className="text-white text-sm font-medium">{getEventName(selectedEvent, language)}</p>
                          <p className="text-white/40 text-[10px]">
                            {language === 'en' 
                              ? (selectedEvent.polarity === "Positive" ? "Energy boost" : "Stress effect")
                              : (selectedEvent.polarity === "Positive" ? "Enerji artışı" : "Stres etkisi")
                            }: {selectedEvent.polarity === "Positive" ? "+" : ""}{selectedEvent.base_impact_percent}%
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-white/60 block mb-2">{language === 'en' ? 'Event Date' : 'Olay Tarihi'}</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => handleDateChange(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-mystic-gold/50"
                        />

                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            setSelectedEvent(null);
                            setSelectedDate("");
                          }}
                          variant="outline"
                          className="flex-1 border-white/20 text-white/60"
                        >
                          {t('headersCancel')}
                        </Button>
                        <Button
                          onClick={handleAddEvent}
                          disabled={!selectedDate}
                          className="flex-1 bg-mystic-gold text-mystic-blue hover:bg-mystic-gold/90 disabled:opacity-50"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          {t('btnAdd')}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {userEvents.length === 0 && !showEventPicker && (
                <p className="text-white/40 text-xs text-center mt-3">
                  {t('noEventsDesc')}
                </p>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
