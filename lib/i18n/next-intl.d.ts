import type { Locale } from './config';

// Narrows next-intl's locale type (e.g. `getLocale()`) to the app's supported locales.
declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale;
  }
}
