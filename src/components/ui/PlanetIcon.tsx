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
    <img 
      src={imageUrl} 
      alt={name}
      className={cn(
        "object-contain",
        className
      )}
      style={{
        imageRendering: "crisp-edges",
      }}
    />
  );
}
