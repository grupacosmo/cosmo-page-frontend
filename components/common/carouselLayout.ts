/**
 * Shared geometry of the card carousels. Kept in a plain module (no `'use client'`) so the real
 * carousel and its server-rendered skeleton use the very same classes and occupy the same box.
 */

/** How many cards are visible per breakpoint. */
export type CarouselLayout = keyof typeof SLIDE_BASIS;

const SLIDE_BASIS = {
  /** Image-topped cards: one (with a peek of the next) on phones, two on tablets, three on desktops. */
  cards: 'basis-[85%] sm:basis-1/2 lg:basis-1/3',
  /** As `cards`, with four per row on desktops. */
  'cards-wide': 'basis-[85%] sm:basis-1/2 lg:basis-1/4',
  /** Compact people cards: two on phones, up to five on wide screens. */
  people: 'basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5',
} as const;

/**
 * Clipping viewport. It is widened by half a gap on each side (and padded vertically) so the cards'
 * focus rings and hover shadows are not cut off; the slides' own padding makes up the gap.
 */
export const carouselViewport = '-mx-2 -my-3 py-3';

/** The flex track inside the viewport. */
export const carouselTrack = 'ml-0';

export function carouselSlide(layout: CarouselLayout): string {
  return `min-w-0 shrink-0 grow-0 px-2 ${SLIDE_BASIS[layout]}`;
}

/** Header row above the track: fixed minimum height, so it is the same with or without controls. */
export const carouselHeader = 'flex min-h-10 items-center justify-between gap-4';
