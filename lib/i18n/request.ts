import { cookies } from 'next/headers';
import { IntlErrorCode, type AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { DEFAULT_LOCALE, LOCALE_COOKIE, NAMESPACES, isLocale, type Locale } from './config';

type Messages = AbstractIntlMessages;

const IS_DEV = process.env.NODE_ENV === 'development';
/** Prefix shown in development on strings that fell back to Polish. */
const FALLBACK_MARKER = `⚠ [${DEFAULT_LOCALE}] `;

/** Loads one namespace file; a missing file (e.g. a partially translated locale) yields `{}`. */
async function loadNamespace(locale: Locale, namespace: string): Promise<Messages> {
  try {
    return (await import(`../../messages/${locale}/${namespace}.json`)).default as Messages;
  } catch {
    return {};
  }
}

async function loadLocale(locale: Locale): Promise<Messages> {
  const entries = await Promise.all(
    NAMESPACES.map(async (namespace) => [namespace, await loadNamespace(locale, namespace)] as const),
  );
  return Object.fromEntries(entries);
}

/**
 * Deep-merges `override` onto `base` (the Polish messages). Keys missing in `override` keep the
 * Polish value; in development those values are prefixed with a visible marker and collected.
 */
function withFallback(base: Messages, override: Messages, missing: string[], path = ''): Messages {
  const result: Messages = {};
  for (const [key, baseValue] of Object.entries(base)) {
    const keyPath = path ? `${path}.${key}` : key;
    const value = override[key];
    if (typeof baseValue === 'string') {
      if (typeof value === 'string') {
        result[key] = value;
      } else {
        missing.push(keyPath);
        result[key] = IS_DEV ? FALLBACK_MARKER + baseValue : baseValue;
      }
    } else {
      result[key] = withFallback(baseValue, typeof value === 'object' ? value : {}, missing, keyPath);
    }
  }
  return result;
}

const warnedLocales = new Set<Locale>();

async function loadMessages(locale: Locale): Promise<Messages> {
  const base = await loadLocale(DEFAULT_LOCALE);
  if (locale === DEFAULT_LOCALE) return base;

  const missing: string[] = [];
  const messages = withFallback(base, await loadLocale(locale), missing);
  if (IS_DEV && missing.length > 0 && !warnedLocales.has(locale)) {
    warnedLocales.add(locale);
    console.warn(
      `[i18n] ${missing.length} key(s) missing in "${locale}", falling back to "${DEFAULT_LOCALE}":\n  ${missing.join('\n  ')}`,
    );
  }
  return messages;
}

export default getRequestConfig(async () => {
  const cookieValue = (await cookies()).get(LOCALE_COOKIE)?.value;
  const locale: Locale = isLocale(cookieValue) ? cookieValue : DEFAULT_LOCALE;

  return {
    locale,
    // Fixed zone so dates render identically on the server (UTC in Docker) and in the browser.
    timeZone: 'Europe/Warsaw',
    messages: await loadMessages(locale),
    onError(error) {
      // Keys missing even in Polish are a bug: shout in development, stay silent in production.
      if (IS_DEV) console.error(`[i18n] ${error.message}`);
      else if (error.code !== IntlErrorCode.MISSING_MESSAGE) console.error(error);
    },
    getMessageFallback({ namespace, key }) {
      const path = [namespace, key].filter(Boolean).join('.');
      return IS_DEV ? `⚠ MISSING: ${path}` : path;
    },
  };
});
