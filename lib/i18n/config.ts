export const LOCALES = ['pl', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** Source of truth for messages; every other locale falls back to it key by key. */
export const DEFAULT_LOCALE: Locale = 'pl';
export const LOCALE_COOKIE = 'language';

/** Message modules, one file per namespace: `messages/<locale>/<namespace>.json`. */
export const NAMESPACES = ['common', 'navigation', 'home', 'news', 'events', 'projects', 'footer'] as const;

export const LANGUAGES: ReadonlyArray<{ code: Locale; nameKey: string; flag: string }> = [
  { code: 'pl', nameKey: 'common.polish', flag: '/images/flags/pl-flag.svg' },
  { code: 'en', nameKey: 'common.english', flag: '/images/flags/en-flag.svg' },
];

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}
