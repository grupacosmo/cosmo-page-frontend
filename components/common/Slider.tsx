'use client';

import { LoaderCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSwipe } from '@/lib/hooks/useSwipe';
import type { SlideImage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { SliderArrows, SliderDots } from './slider/SliderControls';
import { SlideTrack } from './slider/SlideTrack';

// Code-split: fetched on the first "open fullscreen", not with the page.
const SliderLightbox = dynamic(() => import('./slider/SliderLightbox').then((module) => module.SliderLightbox), {
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 text-white">
      <LoaderCircle className="size-8 animate-spin" />
    </div>
  ),
});

interface SliderProps {
  images: SlideImage[];
  emptyText: string;
  autoSlideInterval?: number;
  /** Sizing of the slider box; defaults to a responsive aspect ratio. */
  className?: string;
}

const TRANSITION_MS = 300;
const boxClasses = 'aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted sm:aspect-video lg:aspect-[4/3]';

/**
 * Image carousel with autoplay, swipe, dots/arrows and a fullscreen lightbox. This component only
 * owns the state; rendering is split into `SlideTrack`, `SliderArrows`, `SliderDots` and the lazily
 * loaded `SliderLightbox`.
 */
export function Slider({ images, emptyText, autoSlideInterval = 5000, className }: SliderProps) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Stays true after the first open so the lightbox can play its closing animation.
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const count = images.length;
  const hasMultiple = count > 1;

  const goTo = (next: number, animateLock = true) => {
    if (!hasMultiple) return;
    setIndex(((next % count) + count) % count);
    if (animateLock) {
      setIsTransitioning(true);
      window.setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
    }
  };

  const { handlers, wasSwipe } = useSwipe({ onSwipe: (direction) => goTo(index + direction) });

  // Autoplay; restarts whenever the slide changes so manual navigation resets the timer.
  useEffect(() => {
    if (!hasMultiple || isPaused || isFullscreen || autoSlideInterval <= 0) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), autoSlideInterval);
    return () => window.clearTimeout(timer);
  }, [hasMultiple, isPaused, isFullscreen, autoSlideInterval, count, index]);

  const openFullscreen = () => {
    if (wasSwipe()) return;
    setLightboxLoaded(true);
    setIsFullscreen(true);
  };

  if (count === 0) {
    return (
      <p className={cn(boxClasses, 'flex items-center justify-center text-sm text-muted-foreground', className)}>
        {emptyText}
      </p>
    );
  }

  return (
    <>
      <div
        className={cn(boxClasses, 'group relative touch-pan-y select-none', className)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <SlideTrack images={images} index={index} onOpen={openFullscreen} swipeHandlers={handlers} />
        {hasMultiple && (
          <>
            <SliderArrows variant="inline" disabled={isTransitioning} onStep={(direction) => goTo(index + direction)} />
            <SliderDots count={count} index={index} disabled={isTransitioning} onSelect={(i) => goTo(i)} />
          </>
        )}
      </div>

      {lightboxLoaded && (
        <SliderLightbox
          images={images}
          index={index}
          open={isFullscreen}
          onOpenChange={setIsFullscreen}
          onGoTo={(i) => goTo(i, false)}
        />
      )}
    </>
  );
}
