"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface WheelProps {
  items: string[] | number[];
  value: string | number;
  onChange: (value: any) => void;
  label: string;
}

const ITEM_HEIGHT = 48;

const ScrollWheel = ({ items, value, onChange, label }: WheelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  
  const valueIndex = items.indexOf(value as any);
  const [visualIndex, setVisualIndex] = useState(valueIndex >= 0 ? valueIndex : 0);

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;
    
    const targetScroll = index * ITEM_HEIGHT;
    container.scrollTo({
      top: targetScroll,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }, []);

  const handleScrollEnd = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const scrollY = container.scrollTop;
    const index = Math.round(scrollY / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
    
    setVisualIndex(clampedIndex);
    
    if (items[clampedIndex] !== value) {
      onChange(items[clampedIndex]);
      if (typeof window !== 'undefined' && window.navigator.vibrate) {
        window.navigator.vibrate(5);
      }
    }
    
    scrollToIndex(clampedIndex, true);
    isScrollingRef.current = false;
  }, [items, value, onChange, scrollToIndex]);

  const handleScroll = useCallback(() => {
    isScrollingRef.current = true;
    
    const container = containerRef.current;
    if (container) {
      const scrollY = container.scrollTop;
      const index = Math.round(scrollY / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
      setVisualIndex(clampedIndex);
    }
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(handleScrollEnd, 150);
  }, [items.length, handleScrollEnd]);

  useEffect(() => {
    const idx = items.indexOf(value as any);
    if (idx >= 0 && !isScrollingRef.current) {
      setVisualIndex(idx);
      scrollToIndex(idx, false);
    }
  }, [value, items, scrollToIndex]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center flex-1">
      <span className="text-[10px] uppercase tracking-widest text-mystic-gold/50 mb-2 font-mystic">{label}</span>
      <div className="relative h-36 w-full overflow-hidden glass-morphism rounded-xl border-mystic-gold/20">
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 right-0 top-12 h-12 border-y border-mystic-gold/30 z-0 pointer-events-none bg-mystic-gold/5" />
        
        <div 
          ref={containerRef}
          className="h-full overflow-y-scroll scrollbar-none"
          onScroll={handleScroll}
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            scrollSnapType: 'y mandatory'
          }}
        >
          <div className="flex flex-col">
            <div style={{ height: ITEM_HEIGHT }} className="shrink-0" />
            {items.map((item, i) => (
              <div 
                key={i} 
                style={{ height: ITEM_HEIGHT, scrollSnapAlign: 'center' }}
                className="flex items-center justify-center shrink-0"
              >
                <div 
                  className={`transition-all duration-200 ${
                    visualIndex === i 
                      ? 'text-mystic-gold scale-125 font-bold' 
                      : 'text-white/20 scale-90'
                  }`}
                >
                  {item}
                </div>
              </div>
            ))}
            <div style={{ height: ITEM_HEIGHT }} className="shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export function BirthDateWheel({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const date = value ? new Date(value) : new Date();
  if (isNaN(date.getTime())) {
    // Fallback if date is invalid
  }
  
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", 
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const handleDayChange = (d: number) => {
    const newDate = new Date(date);
    newDate.setDate(d);
    onChange(newDate.toISOString().split('T')[0]);
  };

  const handleMonthChange = (m: string) => {
    const newDate = new Date(date);
    newDate.setMonth(months.indexOf(m));
    onChange(newDate.toISOString().split('T')[0]);
  };

  const handleYearChange = (y: number) => {
    const newDate = new Date(date);
    newDate.setFullYear(y);
    onChange(newDate.toISOString().split('T')[0]);
  };

  return (
    <div className="flex gap-2 w-full">
      <ScrollWheel 
        label="Gün"
        items={days} 
        value={date.getDate()} 
        onChange={handleDayChange} 
      />
      <ScrollWheel 
        label="Ay"
        items={months} 
        value={months[date.getMonth()]} 
        onChange={handleMonthChange} 
      />
      <ScrollWheel 
        label="Yıl"
        items={years} 
        value={date.getFullYear()} 
        onChange={handleYearChange} 
      />
    </div>
  );
}
