'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IconButton } from '../IconButton';

const ARROWS = ['prev', 'next'] as const;

interface SliderArrowsProps {
  onStep: (direction: 1 | -1) => void;
  disabled?: boolean;
  /** `inline` over the slider, `lightbox` in fullscreen. */
  variant: 'inline' | 'lightbox';
}

/** Previous / next buttons on both sides of a slider. */
export function SliderArrows({ onStep, disabled, variant }: SliderArrowsProps) {
  const lightbox = variant === 'lightbox';
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-between',
        lightbox ? 'z-[10000] px-2.5 md:px-5' : 'px-[5px] opacity-0 group-hover:opacity-100 md:px-2.5',
      )}
    >
      {ARROWS.map((direction) => (
        <IconButton
          key={direction}
          tone={lightbox ? 'glass' : 'light'}
          size={lightbox ? 'xl' : 'lg'}
          icon={direction === 'prev' ? 'chevronLeft' : 'chevronRight'}
          iconSize={lightbox ? 28 : 20}
          label={direction === 'prev' ? 'Previous image' : 'Next image'}
          disabled={disabled}
          onClick={() => onStep(direction === 'prev' ? -1 : 1)}
          className={cn('pointer-events-auto', lightbox ? 'hover:scale-110 active:scale-95' : 'z-10')}
        />
      ))}
    </div>
  );
}

interface SliderDotsProps {
  count: number;
  index: number;
  disabled?: boolean;
  onSelect: (index: number) => void;
  className?: string;
  dotClassName?: string;
  inactiveClassName?: string;
}

/** One dot per slide; the current one is filled. */
export function SliderDots({ count, index, disabled, onSelect, className, dotClassName, inactiveClassName }: SliderDotsProps) {
  return (
    <div
      className={cn(
        'absolute bottom-[7.5px] left-1/2 z-10 flex -translate-x-1/2 gap-[3.75px] md:bottom-2.5 md:gap-[5px]',
        className,
      )}
    >
      {Array.from({ length: count }, (_, i) => (
        <Button
          key={i}
          variant="bare"
          size="none"
          disabled={disabled}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === index}
          className={cn(
            'size-2.5 rounded-full border-2 bg-clip-border transition-all duration-200 hover:not-disabled:scale-110 hover:not-disabled:border-white active:not-aria-[haspopup]:translate-y-0 disabled:cursor-not-allowed md:size-3 md:hover:not-disabled:scale-120',
            dotClassName,
            i === index ? 'border-white bg-white/90' : cn('border-white/80 bg-transparent', inactiveClassName),
          )}
        />
      ))}
    </div>
  );
}
