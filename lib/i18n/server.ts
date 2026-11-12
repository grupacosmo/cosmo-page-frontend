import type { getTranslations } from 'next-intl/server';

/** Translator returned by next-intl's `getTranslations()`, passed down to server components. */
export type Translate = Awaited<ReturnType<typeof getTranslations>>;
