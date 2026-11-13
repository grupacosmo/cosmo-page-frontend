/**
 * Events list query: tabs, page sizes, pagination and URL helpers. Free of event data and server
 * APIs, so client components (skeletons, pagination) can import it without pulling in the data.
 */

export const EVENT_TABS = ['upcoming', 'past'] as const;
export type EventTab = (typeof EVENT_TABS)[number];

export const PAGE_SIZES = [3, 6, 12] as const;
export const DEFAULT_PAGE_SIZE = 6;

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
