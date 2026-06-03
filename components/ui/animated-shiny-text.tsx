'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  hoverEffect?: boolean;
}

export function AnimatedShinyText({
  children,
  className,
  textClassName,
  gradientColors = 'linear-gradient(90deg, #000, #fff, #000)',
  gradientAnimationDuration = 3,
  hoverEffect = false,
}: AnimatedShinyTextProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.span
        className={cn(textClassName)}
        style={{
          backgroundImage: gradientColors,
          backgroundSize: '200% auto',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          display: 'block',
        }}
        animate={!hoverEffect ? { backgroundPosition: ['0% 50%', '-200% 50%'] } : undefined}
        transition={
          !hoverEffect
            ? {
                duration: gradientAnimationDuration,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop' as const,
              }
            : undefined
        }
        whileHover={
          hoverEffect
            ? {
                backgroundPosition: '-200% 50%',
                transition: { duration: gradientAnimationDuration, ease: 'linear' },
              }
            : undefined
        }
      >
        {children}
      </motion.span>
    </div>
  );
}
