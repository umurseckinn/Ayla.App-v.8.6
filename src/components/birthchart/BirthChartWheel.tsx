"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZODIAC_IMAGES } from "@/lib/zodiac-images";
import { PLANET_IMAGES } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";

interface Planet {
  name: string;
  symbol: string;
  longitude: number;
  color: string;
}

interface BirthChartWheelProps {
  planets: Planet[];
  houseCusps: number[];
  aspects: { p1: string; p2: string; type: string }[];
  onPlanetClick?: (planetName: string) => void;
  onSignClick?: (signName: string) => void;
}

const ZODIAC_SIGNS = [
  { name: "Koç", nameEn: "Aries", symbol: "♈", color: "#ef4444" },
  { name: "Boğa", nameEn: "Taurus", symbol: "♉", color: "#10b981" },
  { name: "İkizler", nameEn: "Gemini", symbol: "♊", color: "#f59e0b" },
  { name: "Yengeç", nameEn: "Cancer", symbol: "♋", color: "#3b82f6" },
  { name: "Aslan", nameEn: "Leo", symbol: "♌", color: "#ef4444" },
  { name: "Başak", nameEn: "Virgo", symbol: "♍", color: "#10b981" },
  { name: "Terazi", nameEn: "Libra", symbol: "♎", color: "#f59e0b" },
  { name: "Akrep", nameEn: "Scorpio", symbol: "♏", color: "#3b82f6" },
  { name: "Yay", nameEn: "Sagittarius", symbol: "♐", color: "#ef4444" },
  { name: "Oğlak", nameEn: "Capricorn", symbol: "♑", color: "#10b981" },
  { name: "Kova", nameEn: "Aquarius", symbol: "♒", color: "#f59e0b" },
  { name: "Balık", nameEn: "Pisces", symbol: "♓", color: "#3b82f6" },
];

const ASPECT_COLORS: Record<string, string> = {
  conjunction: "#fbbf24", // Gold
  opposition: "#ef4444",  // Red
  square: "#ef4444",      // Red
  trine: "#10b981",       // Green
  sextile: "#3b82f6",     // Blue
};

export function BirthChartWheel({ planets, houseCusps, aspects, onPlanetClick, onSignClick }: BirthChartWheelProps) {
  const { language } = useLanguage();
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [isHeld, setIsHeld] = useState(false);
  const resetTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const holdTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const isHoldingRef = React.useRef(false);
  const startTimeRef = React.useRef<number>(0);

  // Animation State
  const [animStep, setAnimStep] = useState(0);

  const size = 400;
  const center = size / 2;
  const radius = size / 2 - 5; // 195
  const innerRadius = 130; // Stable inner circle
  const planetRadius = innerRadius - 20; // Increased from -35 to -20 for larger orbit

  const ascendantLong = houseCusps[0] || 0;
  const rotationOffset = 180 - ascendantLong;
  
  // Helper to get position on circle
  const getPos = React.useCallback((deg: number, r: number) => {
    const rad = ((deg + rotationOffset) * Math.PI) / 180;
    return {
      x: center + r * Math.cos(rad),
      y: center - r * Math.sin(rad)
    };
  }, [center, rotationOffset]);

  // Logic to prevent planet overlap by adjusting radii
  const planetsWithRadii = React.useMemo(() => {
    const sorted = [...planets].sort((a, b) => a.longitude - b.longitude);
    const radiiMap: Record<string, number> = {};
    const threshold = 22; // Degrees threshold for overlap detection
    const levels = [planetRadius, planetRadius - 20, planetRadius - 40]; // Adjusted levels

    for (let i = 0; i < sorted.length; i++) {
      const p1 = sorted[i];
      let currentLevel = 0;
      let conflict = true;

      while (conflict && currentLevel < levels.length) {
        conflict = false;
        // Check against all other planets already assigned a radius
        for (const pName in radiiMap) {
          const p2 = planets.find(p => p.name === pName);
          if (!p2) continue;

          const dist = Math.abs(p1.longitude - p2.longitude);
          const circularDist = Math.min(dist, 360 - dist);

          if (circularDist < threshold && radiiMap[pName] === levels[currentLevel]) {
            conflict = true;
            currentLevel++;
            break;
          }
        }
      }
      radiiMap[p1.name] = levels[currentLevel % levels.length];
    }
    return radiiMap;
  }, [planets, planetRadius]);

  const sortedPlanets = React.useMemo(() => [...planets].sort((a, b) => {
      if (a.name === selectedPlanet) return 1;
      if (b.name === selectedPlanet) return -1;
      // Stable sort by longitude if no selection
      return a.longitude - b.longitude;
    }), [planets, selectedPlanet]);

  const animationSequence = React.useMemo(() => {
    // Zodiac Indices starting from Aquarius (10) and going Clockwise (decreasing index visually)
    // 10 (Aquarius) -> 9 (Capricorn) -> 8 (Sagittarius) -> ...
    const zodiacIndices = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 11];
    
    const steps = [];
    const maxSteps = 12; // Fixed to 12 steps for zodiacs, planets loop or stop? 
    // User implies 1-to-1 pairing. "1. animasyon sekansında aynı anda aquarius ve sun... ikincide moon ve capricorn"
    
    for (let i = 0; i < maxSteps; i++) {
      const signIndex = zodiacIndices[i];
      const planet = sortedPlanets.length > 0 ? sortedPlanets[i % sortedPlanets.length] : null;
      
      steps.push({
        sign: { index: signIndex, data: ZODIAC_SIGNS[signIndex] },
        planet: planet ? { index: i % sortedPlanets.length, data: planet } : null
      });
    }
    return steps;
  }, [sortedPlanets]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimStep(prev => (prev + 1) % animationSequence.length);
    }, 2000); // 2 seconds per item

    return () => clearInterval(interval);
  }, [animationSequence.length]);

  const currentAnimStepData = animationSequence[animStep];

  // Tooltip Logic removed from useEffect to be rendered directly




  useEffect(() => {

    if (selectedPlanet && !isHeld) {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        setSelectedPlanet(null);
        setTooltip(null);
      }, 1800);
    }
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [selectedPlanet, isHeld]);

  const handleItemClick = (e: React.MouseEvent, text: string, pos: { x: number, y: number }) => {
    e.stopPropagation();
    setTooltip({ text, x: pos.x, y: pos.y });
    setSelectedPlanet(text);
  };

  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-square select-none">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <clipPath id="chartClip">
            <circle cx={center} cy={center} r={radius} />
          </clipPath>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Circle with Yellow Border */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="rgba(15, 12, 41, 0.2)"
          stroke="#fbbf24"
          strokeWidth="4"
          className="drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
        />

        {/* Zodiac Signs Ring */}
        {ZODIAC_SIGNS.map((sign, i) => {
          const startDeg = i * 30;
          const endDeg = (i + 1) * 30;
          const midDeg = startDeg + 15;
          const pos = getPos(midDeg, (radius + innerRadius) / 2);

          return (
            <g
              key={sign.name}
              className="cursor-pointer group"
              onPointerDown={(e) => {
                startTimeRef.current = Date.now();
                isHoldingRef.current = false;
                if (holdTimerRef.current) clearTimeout(holdTimerRef.current);

                holdTimerRef.current = setTimeout(() => {
                  isHoldingRef.current = true;
                  handleItemClick(e as any, language === 'en' ? sign.nameEn : sign.name, pos);
                  setIsHeld(true);
                }, 250);
              }}
              onPointerUp={() => {
                if (holdTimerRef.current) {
                  clearTimeout(holdTimerRef.current);
                  holdTimerRef.current = null;
                }

                const duration = Date.now() - startTimeRef.current;
                if (duration < 250 && !isHoldingRef.current) {
                  onSignClick?.(sign.name);
                }
                setIsHeld(false);
              }}
              onPointerLeave={() => {
                if (holdTimerRef.current) {
                  clearTimeout(holdTimerRef.current);
                  holdTimerRef.current = null;
                }
                setIsHeld(false);
              }}
            >
              <path
                d={`M ${getPos(startDeg, radius).x} ${getPos(startDeg, radius).y} 
                       A ${radius} ${radius} 0 0 0 ${getPos(endDeg, radius).x} ${getPos(endDeg, radius).y}
                       L ${getPos(endDeg, innerRadius).x} ${getPos(endDeg, innerRadius).y}
                       A ${innerRadius} ${innerRadius} 0 0 1 ${getPos(startDeg, innerRadius).x} ${getPos(startDeg, innerRadius).y} Z`}
                fill="rgba(255, 255, 255, 0.05)"
                stroke="#fbbf24"
                strokeOpacity="0.6"
                strokeWidth="1.5"
                className="group-hover:fill-white/10 transition-colors"
              />

              {ZODIAC_IMAGES[sign.name] ? (
                <image
                  href={ZODIAC_IMAGES[sign.name]}
                  x={pos.x - 24}
                  y={pos.y - 24}
                  width="48"
                  height="48"
                  className="drop-shadow-md"
                />
              ) : (
                <text
                  x={pos.x}
                  y={pos.y}
                  fill={sign.color}
                  fontSize="28"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="font-serif drop-shadow-md filter brightness-125"
                  style={{ filter: "url(#glow)" }}
                >
                  {sign.symbol}
                </text>
              )}

            </g>
          );
        })}

        {/* House Cusps */}
        {houseCusps.map((cusp, i) => {
          const p1 = getPos(cusp, innerRadius);
          return (
            <line
              key={`house-${i}`}
              x1={p1.x}
              y1={p1.y}
              x2={center}
              y2={center}
              stroke="#fbbf24"
              strokeOpacity={i === 0 || i === 9 ? "0.9" : "0.3"}
              strokeWidth={i === 0 || i === 9 ? "2.5" : "1"}
            />
          );
        })}

        {/* Aspects */}
        {aspects.map((aspect, i) => {
          const p1Data = planets.find(p => p.name === aspect.p1);
          const p2Data = planets.find(p => p.name === aspect.p2);
          if (!p1Data || !p2Data) return null;

          const pos1 = getPos(p1Data.longitude, 35);
          const pos2 = getPos(p2Data.longitude, 35);

          return (
            <motion.line
              key={`aspect-${i}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
              x1={pos1.x}
              y1={pos1.y}
              x2={pos2.x}
              y2={pos2.y}
              stroke="#fbbf24"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeDasharray={aspect.type === "square" || aspect.type === "opposition" ? "4,4" : "0"}
            />
          );
        })}

        {/* Planets */}
        {sortedPlanets.map((planet, i) => {
          const r = planetsWithRadii[planet.name] || planetRadius;
          const pos = getPos(planet.longitude, r);
          const imageUrl = PLANET_IMAGES[planet.name];

          const isSelected = selectedPlanet === planet.name;
          const isSaturn = planet.name === 'Saturn' || planet.name === 'Satürn';
          const pSize = isSaturn ? 80 : 52; // Standardized size, larger for Saturn

          return (
            <g
              key={planet.name}
              className="cursor-pointer group"
              onPointerDown={(e) => {
                startTimeRef.current = Date.now();
                isHoldingRef.current = false;
                if (holdTimerRef.current) clearTimeout(holdTimerRef.current);

                holdTimerRef.current = setTimeout(() => {
                  isHoldingRef.current = true;
                  handleItemClick(e as any, planet.name, pos);
                  setIsHeld(true);
                }, 250); // 250ms threshold for hold
              }}
              onPointerUp={() => {
                if (holdTimerRef.current) {
                  clearTimeout(holdTimerRef.current);
                  holdTimerRef.current = null;
                }

                const duration = Date.now() - startTimeRef.current;
                if (duration < 250 && !isHoldingRef.current) {
                  // Short click
                  onPlanetClick?.(planet.name);
                }
                setIsHeld(false);
              }}
              onPointerLeave={() => {
                if (holdTimerRef.current) {
                  clearTimeout(holdTimerRef.current);
                  holdTimerRef.current = null;
                }
                setIsHeld(false);
              }}
            >

              {imageUrl ? (
                <motion.image
                  initial={{ scale: 0 }}
                  animate={{
                    scale: isSelected ? 1.25 : 1,
                    filter: isSelected ? "drop-shadow(0 0 12px rgba(251,191,36,0.8))" : "drop-shadow(0 0 4px rgba(0,0,0,0.4))"
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  href={imageUrl}
                  x={pos.x - (pSize * (isSelected ? 1.25 : 1)) / 2}
                  y={pos.y - (pSize * (isSelected ? 1.25 : 1)) / 2}
                  width={pSize * (isSelected ? 1.25 : 1)}
                  height={pSize * (isSelected ? 1.25 : 1)}
                  className="z-50"
                />
              ) : (
                <>
                  <motion.circle
                    initial={{ r: 0 }}
                    animate={{ r: isSelected ? 28 : 22 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    cx={pos.x}
                    cy={pos.y}
                    fill="rgba(15, 12, 41, 0.95)"
                    stroke={isSelected ? "#fbbf24" : planet.color}
                    strokeWidth={isSelected ? "3" : "2.5"}
                    className="group-hover:stroke-white transition-colors"
                  />
                  <text
                    x={pos.x}
                    y={pos.y}
                    fill={isSelected ? "#fbbf24" : planet.color}
                    fontSize={isSelected ? "26" : "22"}
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="pointer-events-none filter brightness-125"
                  >
                    {planet.symbol}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Center Dot */}
        <circle cx={center} cy={center} r="4" fill="#fbbf24" className="animate-pulse" />

        {/* Highlighting Overlay for Animations (Rendered last to be on top) */}
        {currentAnimStepData && currentAnimStepData.sign && (() => {
          const sign = currentAnimStepData.sign.data;
          const i = currentAnimStepData.sign.index;
          const startDeg = i * 30;
          const midDeg = startDeg + 15;
          const pos = getPos(midDeg, (radius + innerRadius) / 2);
          const imageUrl = ZODIAC_IMAGES[sign.name];
          
          return (
            <motion.g
              key={`anim-sign-${sign.name}`}
              className="pointer-events-none"
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                times: [0, 0.5, 1],
                ease: "easeInOut"
              }}
            >
              {imageUrl ? (
                <image
                  href={imageUrl}
                  x={pos.x - 24}
                  y={pos.y - 24}
                  width="48"
                  height="48"
                  className="drop-shadow-md"
                />
              ) : (
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize="24"
                  fill={sign.color}
                  className="pointer-events-none font-serif"
                >
                  {sign.symbol}
                </text>
              )}

            </motion.g>
          );
        })()}

        {currentAnimStepData && currentAnimStepData.planet && (() => {
          const planet = currentAnimStepData.planet.data;
          const r = planetsWithRadii[planet.name] || planetRadius;
          const pos = getPos(planet.longitude, r);
          const imageUrl = PLANET_IMAGES[planet.name];
          const isSaturn = planet.name === 'Saturn' || planet.name === 'Satürn';
          const pSize = isSaturn ? 80 : 52;
          
          return (
            <motion.g
              key={`anim-planet-${planet.name}`}
              className="pointer-events-none"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                times: [0, 0.5, 1],
                ease: "easeInOut"
              }}
            >
              {imageUrl ? (
                <motion.image
                  href={imageUrl}
                  x={pos.x - pSize / 2}
                  y={pos.y - pSize / 2}
                  width={pSize}
                  height={pSize}
                  animate={{
                    // Removed filter animation for performance
                  }}
                  transition={{
                    duration: 2,
                    times: [0, 0.5, 1],
                    ease: "easeInOut"
                  }}
                />
              ) : (
                <>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={22}
                    fill="rgba(15, 12, 41, 0.95)"
                    stroke={planet.color}
                    strokeWidth="2.5"
                    animate={{
                      stroke: [planet.color, "#fbbf24", planet.color],
                      strokeWidth: [2.5, 3.5, 2.5]
                    }}
                    transition={{
                      duration: 2,
                      times: [0, 0.5, 1],
                      ease: "easeInOut"
                    }}
                  />
                  <text
                    x={pos.x}
                    y={pos.y}
                    fill={planet.color}
                    fontSize="22"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="pointer-events-none filter brightness-125"
                  >
                    {planet.symbol}
                  </text>
                </>
              )}

            </motion.g>
          );
        })()}

        {/* Animation Tooltips (Always on top) */}
        {currentAnimStepData && (
          <>
             {currentAnimStepData.sign && (() => {
              const sign = currentAnimStepData.sign.data;
              const i = currentAnimStepData.sign.index;
              const startDeg = i * 30;
              const midDeg = startDeg + 15;
              const pos = getPos(midDeg, (radius + innerRadius) / 2);
              const text = language === 'en' ? sign.nameEn : sign.name;
              
              // Calculate text width approx (or use fixed width)
              const textWidth = text.length * 6 + 10; 
              
              return (
                 <g key="anim-sign-tooltip" pointerEvents="none">
                    <rect 
                        x={pos.x - 30} 
                        y={pos.y - 45} 
                        width="60" 
                        height="18" 
                        rx="4"
                        fill="black" 
                        stroke="rgba(212,175,55,0.3)"
                        strokeWidth="1"
                        filter="drop-shadow(0 0 4px rgba(212,175,55,0.3))"
                    />
                    <text
                        x={pos.x}
                        y={pos.y - 36}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fill="#D4AF37"
                        fontSize="9"
                        fontWeight="bold"
                    >
                        {text}
                    </text>
                 </g>
              );
            })()}
            
            {currentAnimStepData.planet && (() => {
              const planet = currentAnimStepData.planet.data;
              const r = planetsWithRadii[planet.name] || planetRadius;
              const pos = getPos(planet.longitude, r);
              const text = planet.name;
              
              return (
                 <g key="anim-planet-tooltip" pointerEvents="none">
                    <rect 
                        x={pos.x - 30} 
                        y={pos.y - 45} 
                        width="60" 
                        height="18" 
                        rx="4"
                        fill="black" 
                        stroke="rgba(212,175,55,0.3)"
                        strokeWidth="1"
                        filter="drop-shadow(0 0 4px rgba(212,175,55,0.3))"
                    />
                    <text
                        x={pos.x}
                        y={pos.y - 36}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fill="#D4AF37"
                        fontSize="9"
                        fontWeight="bold"
                    >
                        {text}
                    </text>
                 </g>
              );
            })()}
          </>
        )}

        {/* Tooltip Render inside SVG (Hover/Click) */}
        <AnimatePresence>
          {tooltip && (
             <motion.g
                initial={{ opacity: 0, scale: 0.8, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 5 }}
                pointerEvents="none"
             >
                <rect 
                    x={tooltip.x - 30} 
                    y={tooltip.y - 45} 
                    width="60" 
                    height="18" 
                    rx="4"
                    fill="black" 
                    stroke="rgba(212,175,55,0.3)"
                    strokeWidth="1"
                    filter="drop-shadow(0 0 4px rgba(212,175,55,0.3))"
                />
                <text
                    x={tooltip.x}
                    y={tooltip.y - 36}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="#D4AF37"
                    fontSize="9"
                    fontWeight="bold"
                >
                    {tooltip.text}
                </text>
             </motion.g>
          )}
        </AnimatePresence>

      </svg>
    </div>
  );
}
