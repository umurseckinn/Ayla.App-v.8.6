"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZODIAC_IMAGES } from "@/lib/zodiac-images";
import { PLANET_IMAGES } from "@/lib/constants";

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
  { name: "Koç", symbol: "♈", color: "#ef4444" },
  { name: "Boğa", symbol: "♉", color: "#10b981" },
  { name: "İkizler", symbol: "♊", color: "#f59e0b" },
  { name: "Yengeç", symbol: "♋", color: "#3b82f6" },
  { name: "Aslan", symbol: "♌", color: "#ef4444" },
  { name: "Başak", symbol: "♍", color: "#10b981" },
  { name: "Terazi", symbol: "♎", color: "#f59e0b" },
  { name: "Akrep", symbol: "♏", color: "#3b82f6" },
  { name: "Yay", symbol: "♐", color: "#ef4444" },
  { name: "Oğlak", symbol: "♑", color: "#10b981" },
  { name: "Kova", symbol: "♒", color: "#f59e0b" },
  { name: "Balık", symbol: "♓", color: "#3b82f6" },
];

const ASPECT_COLORS: Record<string, string> = {
  conjunction: "#fbbf24", // Gold
  opposition: "#ef4444",  // Red
  square: "#ef4444",      // Red
  trine: "#10b981",       // Green
  sextile: "#3b82f6",     // Blue
};

export function BirthChartWheel({ planets, houseCusps, aspects, onPlanetClick, onSignClick }: BirthChartWheelProps) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [isHeld, setIsHeld] = useState(false);
  const resetTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const holdTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const isHoldingRef = React.useRef(false);
  const startTimeRef = React.useRef<number>(0);

  const size = 400;
  const center = size / 2;
  const radius = size / 2 - 5; // 195
  const innerRadius = 130; // Stable inner circle
  const planetRadius = innerRadius - 20; // Increased from -35 to -20 for larger orbit

  const ascendantLong = houseCusps[0] || 0;
  const rotationOffset = 180 - ascendantLong;

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

  const getPos = (deg: number, r: number) => {
    const rad = ((deg + rotationOffset) * Math.PI) / 180;
    return {
      x: center + r * Math.cos(rad),
      y: center - r * Math.sin(rad),
    };
  };

  const handleItemClick = (e: React.MouseEvent, text: string, pos: { x: number, y: number }) => {
    e.stopPropagation();
    setTooltip({ text, x: pos.x, y: pos.y });
    setSelectedPlanet(text);
  };

  const sortedPlanets = [...planets].sort((a, b) => {
    if (a.name === selectedPlanet) return 1;
    if (b.name === selectedPlanet) return -1;
    return 0;
  });

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
              onClick={(e) => {
                handleItemClick(e, sign.name, pos);
                onSignClick?.(sign.name);
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
          const pSize = 52; // Standardized size

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

        {/* Tooltip Render inside SVG */}
        <AnimatePresence>
          {tooltip && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 5 }}
              className="pointer-events-none"
            >
              {/* Dynamic width based on text length (rough estimation) */}
              <rect
                x={tooltip.x - (tooltip.text.length * 4 + 15)}
                y={tooltip.y - 35}
                width={tooltip.text.length * 8 + 30}
                height="24"
                rx="12"
                fill="rgba(251, 191, 36, 0.95)"
                className="drop-shadow-lg"
              />
              <text
                x={tooltip.x}
                y={tooltip.y - 23}
                fill="#1e1b4b"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
                className="font-mystic"
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
