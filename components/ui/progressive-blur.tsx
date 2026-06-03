import { cn } from '@/lib/utils';

interface ProgressiveBlurProps {
  className?: string;
  direction?: 'left' | 'right';
  width?: string;
}

// Gradient mask that fades from var(--paper) to transparent, creating a soft edge on the slider.
export function ProgressiveBlur({
  className,
  direction = 'left',
  width = '8%',
}: ProgressiveBlurProps) {
  const gradient =
    direction === 'left'
      ? 'linear-gradient(to right, var(--paper) 0%, transparent 100%)'
      : 'linear-gradient(to left, var(--paper) 0%, transparent 100%)';

  return (
    <div
      className={cn('pointer-events-none absolute top-0 bottom-0 z-10', className)}
      style={{
        [direction]: 0,
        width,
        background: gradient,
      }}
      aria-hidden="true"
    />
  );
}
