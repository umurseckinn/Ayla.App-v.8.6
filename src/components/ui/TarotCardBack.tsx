"use client";

import React from "react";

export function TarotCardBack({ className = "" }: { className?: string }) {
  return (
    <div className={`aspect-[2/3] w-full relative overflow-hidden rounded-xl border-2 border-mystic-gold/30 shadow-2xl ${className}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460]" />
      
      {/* Stars / Dust Effect */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: (Math.random() * 3 + 2) + 's'
            }}
          />
        ))}
      </div>

      {/* Symmetrical Design Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-4 py-8">
        {/* Top Moon Phase */}
        <div className="opacity-60 transform rotate-180">
           <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-mystic-gold">
             <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90" stroke="currentColor" strokeWidth="2" />
           </svg>
        </div>

        {/* Center Orchid Motif */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 border border-mystic-gold/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-2 border border-mystic-gold/40 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]" />
          
          {/* Stylized Orchid / Sacred Geometry */}
          <svg viewBox="0 0 100 100" className="w-24 h-24 text-mystic-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
            {/* Symmetrical Petals */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <g key={angle} transform={`rotate(${angle} 50 50)`}>
                <path 
                  d="M50 50 C50 30 40 10 50 5 C60 10 50 30 50 50" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  fill="currentColor" 
                  fillOpacity="0.1"
                />
              </g>
            ))}
            {/* Center Core */}
            <circle cx="50" cy="50" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="2" fill="currentColor" />
            
            {/* Zodiac Symbols around */}
            {[30, 90, 150, 210, 270, 330].map((angle) => (
              <circle key={angle} cx={50 + 35 * Math.cos(angle * Math.PI / 180)} cy={50 + 35 * Math.sin(angle * Math.PI / 180)} r="1.5" fill="currentColor" />
            ))}
          </svg>
        </div>

        {/* Bottom Moon Phase */}
        <div className="opacity-60">
           <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-mystic-gold">
             <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90" stroke="currentColor" strokeWidth="2" />
           </svg>
        </div>
      </div>

      {/* Ornamental Borders */}
      <div className="absolute inset-2 border border-mystic-gold/10 rounded-lg pointer-events-none" />
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-mystic-gold/40 rounded-tl-md" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-mystic-gold/40 rounded-tr-md" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-mystic-gold/40 rounded-bl-md" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-mystic-gold/40 rounded-br-md" />
    </div>
  );
}
