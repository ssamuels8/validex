'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface InfiniteSliderProps {
  children: React.ReactNode;
  speed?: number;        // px per second
  speedOnHover?: number;
  gap?: number;          // gap in px between items
  className?: string;
  reverse?: boolean;
}

export function InfiniteSlider({
  children,
  speed = 40,
  speedOnHover = 20,
  gap = 64,
  className,
  reverse = false,
}: InfiniteSliderProps) {
  const [duration, setDuration] = useState(20);
  const [hovered, setHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Half width = one copy of the content
    const contentWidth = el.scrollWidth / 2;
    if (contentWidth > 0) setDuration(contentWidth / speed);
  }, [speed]);

  const activeDuration = hovered
    ? (duration * speed) / speedOnHover
    : duration;

  return (
    <div
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          animationName: 'infiniteSlide',
          animationDuration: `${activeDuration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {/* paddingRight = gap keeps the seam between the two copies as wide as the
            internal item gap, so the loop never jams adjacent labels together. */}
        <div style={{ display: 'flex', gap: `${gap}px`, paddingRight: `${gap}px`, flexShrink: 0 }}>{children}</div>
        <div style={{ display: 'flex', gap: `${gap}px`, paddingRight: `${gap}px`, flexShrink: 0 }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
