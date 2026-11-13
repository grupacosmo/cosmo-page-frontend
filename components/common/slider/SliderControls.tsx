'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ARROWS = [
  { step: -1, label: 'Previous image', Icon: ChevronLeft },
  { step: 1, label: 'Next image', Icon: ChevronRight },
] as const;

interface SliderArrowsProps {
  onStep: (direction: 1 | -1) => void;
  disabled?: boolean;
  /** `inline` over the slider (shown on hover/focus), `lightbox` in fullscreen. */
  variant: 'inline' | 'lightbox';
}

/** Previous / next buttons on both sides of a slider. */
export function SliderArrows({ onStep, disabled, variant }: SliderArrowsProps) {
  const lightbox = variant === 'lightbox';
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 sm:px-4',
        !lightbox && 'opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100',
      )}
    >
      {ARROWS.map(({ step, label, Icon }) => (
        <Button
          key={step}
          variant={lightbox ? 'ghost-inverse' : 'secondary'}
          size="icon-lg"
          aria-label={label}
          disabled={disabled}
          onClick={() => onStep(step)}
          className={cn('pointer-events-auto rounded-full', lightbox && 'bg-white/10')}
        >
          <Icon />
        </Button>
      ))}
    </div>
  );
}

interface SliderDotsProps {
  count: number;
  index: number;
  disabled?: boolean;
  onSelect: (index: number) => void;
}

/** One dot per slide; the current one is filled. */
export function SliderDots({ count, index, disabled, onSelect }: SliderDotsProps) {
  return (
    <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === index}
          className={cn(
            'size-2.5 rounded-full border border-white transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
            i === index ? 'bg-white' : 'bg-white/20 hover:bg-white/60',
          )}
        />
      ))}
    </div>
  );
}
