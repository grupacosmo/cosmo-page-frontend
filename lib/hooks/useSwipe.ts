'use client';

import { useRef, type TouchEvent } from 'react';

const SWIPE_THRESHOLD = 50;
const SCROLL_PREVENTION_THRESHOLD = 10;

interface SwipeOptions {
  /** Called with +1 for a swipe to the left (next) and -1 for a swipe to the right (previous). */
  onSwipe: (direction: 1 | -1) => void;
  /** Keep the gesture from reaching ancestors (e.g. a lightbox over a slider). */
  stopPropagation?: boolean;
}

/** Horizontal swipe detection for touch screens. Tracking lives in a ref, so moves never re-render. */
export function useSwipe({ onSwipe, stopPropagation = false }: SwipeOptions) {
  const touch = useRef({ startX: 0, endX: 0, active: false });

  const handlers = {
    onTouchStart(event: TouchEvent) {
      const x = event.touches[0]?.clientX ?? 0;
      touch.current = { startX: x, endX: x, active: true };
      if (stopPropagation) event.stopPropagation();
    },
    onTouchMove(event: TouchEvent) {
      if (!touch.current.active) return;
      touch.current.endX = event.touches[0]?.clientX ?? touch.current.endX;
      if (Math.abs(touch.current.endX - touch.current.startX) > SCROLL_PREVENTION_THRESHOLD && event.cancelable) {
        event.preventDefault();
      }
    },
    onTouchEnd() {
      if (!touch.current.active) return;
      touch.current.active = false;
      const distance = touch.current.startX - touch.current.endX;
      if (Math.abs(distance) > SWIPE_THRESHOLD) onSwipe(distance > 0 ? 1 : -1);
    },
  };

  /** True right after a swipe, so the click that ends it doesn't also open the image. */
  const wasSwipe = () => Math.abs(touch.current.startX - touch.current.endX) > SWIPE_THRESHOLD;

  return { handlers, wasSwipe };
}
