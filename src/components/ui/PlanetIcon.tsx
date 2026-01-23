"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { PLANET_IMAGES } from "@/lib/constants";

interface PlanetIconProps {
  name: string;
  className?: string;
}

export function PlanetIcon({ name, className }: PlanetIconProps) {
  const imageUrl = PLANET_IMAGES[name] || PLANET_IMAGES["Güneş"];

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center overflow-hidden aspect-square rounded-full bg-transparent",
        className
      )}
    >
      <img 
        src={imageUrl} 
        alt={name}
        className="w-full h-full object-cover rounded-full"
        style={{
          imageRendering: "crisp-edges",
          transform: "scale(1.1)", // Slight zoom to ensure clean edges
        }}
      />
    </div>
  );
}
