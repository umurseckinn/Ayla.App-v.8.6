"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Moon,
  Search,
  Heart
} from "lucide-react";
import { Card } from "@/components/ui/card";

import { useLanguage } from "@/contexts/LanguageContext";

export type FeatureId = "energy" | "tarot" | "dreams" | "harmony" | "birthchart" | "calendar";

export function FeatureGrid({ onSelect }: { onSelect: (id: FeatureId) => void }) {
  const { t } = useLanguage();
  const features = [
    {
      id: "energy" as FeatureId,
      title: t('dailyEnergy'),
      description: t('dailyEnergyDesc'),
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      color: "bg-yellow-400/10",
      borderColor: "border-yellow-400/20"
    },
    {
      id: "tarot" as FeatureId,
      title: t('smartTarot'),
      description: t('smartTarotDesc'),
      icon: <Moon className="w-5 h-5 text-purple-400" />,
      color: "bg-purple-400/10",
      borderColor: "border-purple-400/20"
    },
    {
      id: "dreams" as FeatureId,
      title: t('dreamDictionary'),
      description: t('dreamDictionaryDesc'),
      icon: <Search className="w-5 h-5 text-blue-400" />,
      color: "bg-blue-400/10",
      borderColor: "border-blue-400/20"
    },
    {
      id: "harmony" as FeatureId,
      title: t('compatibilityAnalysis'),
      description: t('compatibilityAnalysisDesc'),
      icon: <Heart className="w-5 h-5 text-pink-400" />,
      color: "bg-pink-400/10",
      borderColor: "border-pink-400/20"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {features.map((feature, index) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(feature.id)}
        >
          <Card className={`p-4 cursor-pointer hover:shadow-lg transition-all border ${feature.borderColor} ${feature.color} group`}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-mystic text-xs font-bold text-white">{feature.title}</h4>
                <p className="text-[10px] text-white/50">
                  {feature.description}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
