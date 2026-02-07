import React from 'react';
import { useInView } from '@/hooks/useInView';

interface InViewAnimatedWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  animationClass: string;
  className?: string;
  as?: React.ElementType;
}

export const InViewAnimatedWrapper = ({
  children,
  animationClass,
  className = '',
  as: Component = 'div',
  ...props
}: InViewAnimatedWrapperProps) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <Component
      ref={ref}
      className={`${className} ${isInView ? animationClass : ''}`}
      {...props}
    >
      {children}
    </Component>
  );
};
