import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LanguagePicker } from '@/components/layout/LanguagePicker';
import { LANGUAGES } from '@/lib/i18n/config';
import { getFooterItems, getHeaderItems } from '@/lib/navigation';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: 'Cosmo PK',
    description: t('home.name'),
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()]);
  const languageLabels = Object.fromEntries(LANGUAGES.map(({ code, nameKey }) => [code, t(nameKey)]));

  return (
    <html lang={locale}>
      <body className="flex min-h-full flex-col bg-cosmo-dark-blue font-sans">
        <NextIntlClientProvider>
          <Header
            items={getHeaderItems(t)}
            languagePicker={<LanguagePicker current={locale} labels={languageLabels} />}
          />
          {children}
          <Footer t={t} navItems={getFooterItems(t)} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
