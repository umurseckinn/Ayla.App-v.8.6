"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserLifeEvent } from "@/lib/data/life-events";

interface AylaGreetingProps {
  name?: string;
  happiness?: number;
  userEvents?: UserLifeEvent[];
}

import { useLanguage } from "@/contexts/LanguageContext";

export function AylaGreeting({ name }: AylaGreetingProps) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-2"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-mystic gold-text">{t('greeting')} {name || t('dear')},</h1>
          <p className="text-muted-foreground font-serif text-lg italic mt-1">
            {t('starsWhispering')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
