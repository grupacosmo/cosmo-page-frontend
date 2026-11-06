import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LanguagePicker } from '@/components/layout/LanguagePicker';
import { getLocale, getTranslator } from '@/lib/i18n/server';
import { getFooterItems, getHeaderItems } from '@/lib/navigation';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  return {
    title: 'Cosmo PK',
    description: t('home.name'),
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [locale, t] = await Promise.all([getLocale(), getTranslator()]);

  return (
    <html lang={locale}>
      <body className="flex min-h-full flex-col bg-cosmo-dark-blue font-sans">
        <Header
          items={getHeaderItems(t)}
          languagePicker={
            <LanguagePicker current={locale} labels={{ pl: t('common.polish'), en: t('common.english') }} />
          }
        />
        {children}
        <Footer t={t} navItems={getFooterItems(t)} />
      </body>
    </html>
  );
}
