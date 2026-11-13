import 'server-only';
import { cache } from 'react';
import { events } from '@/lib/data/events';
import type { Locale } from '@/lib/i18n/config';
import type { CosmoEvent, LocalizedEvent } from '@/lib/types';
import type { EventTab } from './eventsQuery';

export * from './eventsQuery';

/**
 * Event access layer. Pages only talk to these functions, so switching the source from the
 * hardcoded `lib/data/events.ts` to the backend API only requires changes in this file.
 *
 * Lookups are wrapped in `React.cache`, so a page and its `generateMetadata` (or several sections of
 * one page) share a single lookup per request — which matters once these become API calls.
 */

function localize(event: CosmoEvent, locale: Locale): LocalizedEvent | null {
  const translation = event.translations[locale];
  if (!translation) return null;
  const { id, date, endDate, image, url } = event;
  return { id, date, endDate, image, url, ...translation };
}

/** An event stays "upcoming" until it has ended. */
function isUpcoming(event: CosmoEvent, now: number): boolean {
  return new Date(event.endDate ?? event.date).getTime() >= now;
}

/**
 * Events translated into `locale` for the given tab: upcoming soonest first, past most recent first.
 * Untranslated events are skipped (no per-event language fallback).
 */
export const getEvents = cache(async (locale: Locale, tab: EventTab): Promise<LocalizedEvent[]> => {
  const now = Date.now();
  const direction = tab === 'upcoming' ? 1 : -1;
  return events
    .filter((event) => isUpcoming(event, now) === (tab === 'upcoming'))
    .sort((a, b) => direction * (new Date(a.date).getTime() - new Date(b.date).getTime()))
    .map((event) => localize(event, locale))
    .filter((event): event is LocalizedEvent => event !== null);
});

/** Next upcoming events, topped up with the most recent past ones, for the homepage teaser. */
export const getFeaturedEvents = cache(async (locale: Locale, limit: number): Promise<LocalizedEvent[]> => {
  const [upcoming, past] = await Promise.all([getEvents(locale, 'upcoming'), getEvents(locale, 'past')]);
  return [...upcoming, ...past].slice(0, limit);
});

export const getEvent = cache(async (id: string, locale: Locale): Promise<LocalizedEvent | null> => {
  const event = events.find((candidate) => candidate.id === id);
  return event ? localize(event, locale) : null;
});
