import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { getTranslator } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  return { title: `${t('navigation.news')} | Cosmo PK` };
}

export default async function NewsLayout({ children }: { children: ReactNode }) {
  const t = await getTranslator();

  return (
    <PageShell title={t('navigation.news')} image="/images/night-sky.jpeg" imagePositionY="70%">
      {children}
    </PageShell>
  );
}
