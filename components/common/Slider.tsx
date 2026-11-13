'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSwipe } from '@/lib/hooks/useSwipe';
import type { SlideImage } from '@/lib/types';
import { SliderArrows, SliderDots } from './slider/SliderControls';
import { SlideTrack } from './slider/SlideTrack';

// Code-split: fetched on the first "open fullscreen", not with the page.
const SliderLightbox = dynamic(() => import('./slider/SliderLightbox').then((module) => module.SliderLightbox), {
  loading: () => (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95">
      <span className="inline-block size-8 animate-spin-slow rounded-full border-2 border-white/30 border-t-white" />
    </div>
  ),
});

interface SliderProps {
  images: SlideImage[];
  emptyText: string;
  autoSlideInterval?: number;
  height?: string;
}

const TRANSITION_MS = 300;

/**
 * Image carousel with autoplay, swipe, dots/arrows and a fullscreen lightbox. This component only
 * owns the state; rendering is split into `SlideTrack`, `SliderArrows`, `SliderDots` and the lazily
 * loaded `SliderLightbox`.
 */
export function Slider({ images, emptyText, autoSlideInterval = 5000, height = '400px' }: SliderProps) {
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
      <div className="flex w-full items-center justify-center rounded-lg bg-[#f8f9fa] text-[#6c757d]" style={{ height }}>
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="group relative w-full touch-pan-y overflow-hidden rounded-lg bg-[#f0f0f0] select-none"
        style={{ height }}
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
