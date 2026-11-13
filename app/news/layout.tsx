import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { BANNERS } from '@/lib/routes';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: `${t('navigation.news')} | Cosmo PK` };
}

export default async function NewsLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations();

  return (
    <PageShell
      title={t('navigation.news')}
      {...BANNERS.news}
      // Flush sheet: the events tabs sit on its top edge; pages add their own padding.
      cardClassName="overflow-hidden p-0"
    >
      {children}
    </PageShell>
  );
}
