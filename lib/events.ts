import { events } from '@/lib/data/events';
import type { Locale } from '@/lib/i18n/config';
import type { CosmoEvent, LocalizedEvent } from '@/lib/types';

/**
 * Event access layer. Pages only talk to these functions, so switching the source from the
 * hardcoded `lib/data/events.ts` to the backend API only requires changes in this file.
 */

export const EVENT_TABS = ['upcoming', 'past'] as const;
export type EventTab = (typeof EVENT_TABS)[number];

export const PAGE_SIZES = [3, 6, 12] as const;
export const DEFAULT_PAGE_SIZE = 6;

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
export async function getEvents(locale: Locale, tab: EventTab, now = Date.now()): Promise<LocalizedEvent[]> {
  const direction = tab === 'upcoming' ? 1 : -1;
  return events
    .filter((event) => isUpcoming(event, now) === (tab === 'upcoming'))
    .sort((a, b) => direction * (new Date(a.date).getTime() - new Date(b.date).getTime()))
    .map((event) => localize(event, locale))
    .filter((event): event is LocalizedEvent => event !== null);
}

/** Next upcoming events, topped up with the most recent past ones, for the homepage teaser. */
export async function getFeaturedEvents(locale: Locale, limit: number): Promise<LocalizedEvent[]> {
  const [upcoming, past] = await Promise.all([getEvents(locale, 'upcoming'), getEvents(locale, 'past')]);
  return [...upcoming, ...past].slice(0, limit);
}

export async function getEvent(id: string, locale: Locale): Promise<LocalizedEvent | null> {
  const event = events.find((candidate) => candidate.id === id);
  return event ? localize(event, locale) : null;
}

export interface Page<T> {
  items: T[];
  /** Zero-based, clamped to the available range. */
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export function paginate<T>(items: T[], page: number, pageSize: number): Page<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(page, 0), totalPages - 1);
  return {
    items: items.slice(current * pageSize, (current + 1) * pageSize),
    page: current,
    pageSize,
    totalItems: items.length,
    totalPages,
  };
}

type SearchParam = string | string[] | undefined;

function first(value: SearchParam): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export interface EventsQuery {
  tab: EventTab;
  /** Zero-based. */
  page: number;
  size: number;
}

/** Validates `?tab=`, `?page=` (1-based) and `?size=`; anything invalid falls back to the defaults. */
export function parseEventsQuery(params: Record<string, SearchParam>): EventsQuery {
  const tab = first(params.tab);
  const page = Number.parseInt(first(params.page) ?? '', 10);
  const size = Number.parseInt(first(params.size) ?? '', 10);
  return {
    tab: (EVENT_TABS as readonly string[]).includes(tab ?? '') ? (tab as EventTab) : 'upcoming',
    page: Number.isFinite(page) && page > 1 ? page - 1 : 0,
    size: (PAGE_SIZES as readonly number[]).includes(size) ? size : DEFAULT_PAGE_SIZE,
  };
}

/** Builds a `/news` URL, omitting parameters that equal their defaults. */
export function eventsHref({ tab, page, size }: EventsQuery): string {
  const params = new URLSearchParams();
  if (tab !== 'upcoming') params.set('tab', tab);
  if (page > 0) params.set('page', String(page + 1));
  if (size !== DEFAULT_PAGE_SIZE) params.set('size', String(size));
  const query = params.toString();
  return query ? `/news?${query}` : '/news';
}
