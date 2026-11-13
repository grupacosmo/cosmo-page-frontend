'use client';

import { createContext, use, useEffect, useRef, useTransition, type ReactNode } from 'react';
import { setLocale } from '@/lib/i18n/actions';
import type { Locale } from '@/lib/i18n/config';

/**
 * Shared state of a language switch. The picker starts it; the header, page content and footer read
 * `pending` and show their shimmer skeletons until the page has re-rendered in the new language.
 */
interface LocaleTransitionValue {
  pending: boolean;
  switchLocale: (locale: Locale) => void;
}

const LocaleTransitionContext = createContext<LocaleTransitionValue>({ pending: false, switchLocale: () => {} });

/**
 * Keeps the skeleton up for at least this long. A local switch takes a few milliseconds, and a
 * skeleton that flashes for one frame looks like a glitch rather than a loading state.
 */
const MIN_SKELETON_MS = 350;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function LocaleTransitionProvider({ children }: { children: ReactNode }) {
  const [pending, startTransition] = useTransition();
  // Swapping content for skeletons changes the page height; restore the reading position afterwards.
  const scrollY = useRef<number | null>(null);

  const switchLocale = (locale: Locale) => {
    scrollY.current = window.scrollY;
    // The Server Action sets the cookie and Next.js re-renders the route in the new language; the
    // transition stays pending (skeletons visible) until that new tree is committed.
    startTransition(async () => {
      await Promise.all([setLocale(locale), wait(MIN_SKELETON_MS)]);
    });
  };

  useEffect(() => {
    if (pending || scrollY.current === null) return;
    window.scrollTo({ top: scrollY.current, behavior: 'instant' });
    scrollY.current = null;
  }, [pending]);

  return <LocaleTransitionContext value={{ pending, switchLocale }}>{children}</LocaleTransitionContext>;
}

export function useLocaleTransition(): LocaleTransitionValue {
  return use(LocaleTransitionContext);
}

/**
 * Shows `fallback` (a skeleton) instead of `children` while the language is switching. The children
 * stay mounted, only hidden, so client state such as the slider position survives the switch.
 */
export function LocalePendingSwap({ fallback, children }: { fallback: ReactNode; children: ReactNode }) {
  const { pending } = useLocaleTransition();
  return (
    <>
      {pending && fallback}
      {/* `contents` keeps the wrapper out of the layout (body is a flex column). */}
      <div className={pending ? 'hidden' : 'contents'}>{children}</div>
    </>
  );
}
