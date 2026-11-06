import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import pl from '@/locales/pl.json';
import en from '@/locales/en.json';
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from './config';

type Dictionary = typeof pl;
type DictionaryNode = string | { [key: string]: DictionaryNode };

// `en` must have exactly the same shape as `pl`; the compiler enforces key parity.
const dictionaries: Record<Locale, Dictionary> = { pl, en };

export type Translate = (key: string) => string;

export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
});

/** Resolves a dotted key; unknown keys (and plain literals) are returned unchanged. */
function lookup(dictionary: DictionaryNode, key: string): string {
  let node: DictionaryNode | undefined = dictionary;
  for (const part of key.split('.')) {
    if (typeof node !== 'object' || node === null) return key;
    node = node[part];
  }
  return typeof node === 'string' ? node : key;
}

export const getTranslator = cache(async (): Promise<Translate> => {
  const dictionary = dictionaries[await getLocale()];
  return (key) => lookup(dictionary, key);
});
