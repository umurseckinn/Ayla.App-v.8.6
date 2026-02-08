import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';

interface RetrogradePlanetButtonProps {
  planetName: string;
  sign: string;
  onClick: () => void;
}

export const RetrogradePlanetButton = ({
  planetName,
  sign,
  onClick
}: RetrogradePlanetButtonProps) => {
  const { ref, isInView } = useInView<HTMLButtonElement>({ threshold: 0.1 });
  const { t } = useLanguage();

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      animate={isInView ? {
        scale: [1, 1.05, 1]
      } : {
        scale: 1
      }}
      style={{
        boxShadow: "0 0 0 1px rgba(225, 29, 72, 1), 0 0 20px rgba(225, 29, 72, 0.5)"
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
      className="text-[9px] bg-rose-950/30 text-rose-600 px-2 py-0.5 rounded-full border-none hover:bg-rose-600/20 transition-all cursor-pointer font-bold flex items-center gap-1"
    >
      <span>{t(planetName as any) || planetName}</span>
      <span className="text-white/60 font-normal">({sign})</span>
    </motion.button>
  );
};

interface CosmicAgendaMoonProps {
  onClick: () => void;
  children: React.ReactNode;
  id?: string;
}

export const CosmicAgendaMoon = ({ onClick, children, id }: CosmicAgendaMoonProps) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <motion.div
      id={id}
      ref={ref}
      onClick={onClick}
      animate={isInView ? {
        scale: [1, 1.05, 1]
      } : {
        scale: 1
      }}
      style={{
        boxShadow: "0 0 0 1px rgba(251, 191, 36, 0.6), 0 0 30px rgba(251, 191, 36, 0.3)"
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
      className="flex flex-col items-center justify-center group transition-all cursor-pointer p-2 bg-black rounded-[2.5rem] border border-transparent hover:bg-white/5 min-w-[clamp(100px,28vw,130px)] h-[clamp(100px,28vw,130px)]"
    >
      {children}
    </motion.div>
  );
};

interface CosmicAgendaPlanetProps {
  onClick: () => void;
  children: React.ReactNode;
  glowColor: string;
  className?: string;
}

export const CosmicAgendaPlanet = ({ onClick, children, glowColor, className }: CosmicAgendaPlanetProps) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      animate={isInView ? {
        scale: [1, 1.05, 1]
      } : {
        scale: 1
      }}
      style={{
        boxShadow: `0 0 0 1px rgba(${glowColor}, 0.6), 0 0 30px rgba(${glowColor}, 0.3)`
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
