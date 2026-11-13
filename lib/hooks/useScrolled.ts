'use client';

import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

/**
 * Whether the page is scrolled past `threshold` pixels. The snapshot is a boolean, so components
 * re-render only when the threshold is crossed, not on every scroll event.
 */
export function useScrolled(threshold = 0): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  );
}
