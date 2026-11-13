import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { Footer } from '@/components/layout/Footer';
import { FooterSkeleton } from '@/components/layout/FooterSkeleton';
import { Header } from '@/components/layout/Header';
import { LanguagePicker } from '@/components/layout/LanguagePicker';
import { LocalePendingSwap, LocaleTransitionProvider } from '@/components/layout/LocaleTransition';
import { RouteSkeleton } from '@/components/layout/RouteSkeleton';
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
      <body className="flex flex-col bg-cosmo-dark-blue font-sans text-foreground antialiased">
        <NextIntlClientProvider>
          {/* While the language switches, content and footer show skeletons (the header shimmers itself). */}
          <LocaleTransitionProvider>
            <Header
              items={getHeaderItems(t)}
              navLabel={t('navigation.links')}
              menuLabels={{
                title: t('navigation.menu'),
                open: t('navigation.openMenu'),
                close: t('navigation.closeMenu'),
              }}
              languagePicker={<LanguagePicker current={locale} labels={languageLabels} />}
            />
            <LocalePendingSwap fallback={<RouteSkeleton />}>{children}</LocalePendingSwap>
            <LocalePendingSwap fallback={<FooterSkeleton />}>
              <Footer t={t} navItems={getFooterItems(t)} />
            </LocalePendingSwap>
          </LocaleTransitionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
