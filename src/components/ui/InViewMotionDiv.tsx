import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface InViewMotionDivProps {
  children?: React.ReactNode;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  id?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export const InViewMotionDiv = ({
  children,
  initial,
  animate,
  exit,
  transition,
  className,
  onClick,
  id,
  style,
  ...props
}: InViewMotionDivProps) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={initial}
      animate={isInView ? animate : initial || {}}
      exit={exit}
      transition={transition}
      className={className}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface InViewMotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  [key: string]: any;
}

export const InViewMotionButton = ({
  children,
  initial,
  animate,
  exit,
  transition,
  className,
  onClick,
  id,
  style,
  ...props
}: InViewMotionButtonProps) => {
  const { ref, isInView } = useInView<HTMLButtonElement>({ threshold: 0.1 });

  return (
    <motion.button
      ref={ref}
      id={id}
      initial={initial}
      animate={isInView ? animate : initial || {}}
      exit={exit}
      transition={transition}
      className={className}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </motion.button>
  );
};
