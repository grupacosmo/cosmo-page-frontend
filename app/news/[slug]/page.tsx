import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { Divider } from '@/components/common/Divider';
import { EventArticle } from '@/components/news/EventArticle';
import { NewsSummarySkeleton } from '@/components/news/NewsSkeletons';
import { NewsSummary } from '@/components/news/NewsSummary';
import { getEvent } from '@/lib/events';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  // Cached per request: the page below reuses this lookup.
  const event = await getEvent(slug, locale);
  return { title: event ? `${event.title} | Cosmo PK` : 'Cosmo PK' };
}

export default async function EventPage({ params }: EventPageProps) {
  const [{ slug }, t, locale] = await Promise.all([params, getTranslations(), getLocale()]);
  const event = await getEvent(slug, locale);
  // Unknown or not translated into the current language.
  if (!event) redirect('/news');

  return (
    <div className="p-5 xl:px-[70px]">
      <EventArticle event={event} />
      <Divider />
      <Suspense fallback={<NewsSummarySkeleton />}>
        <NewsSummary t={t} />
      </Suspense>
    </div>
  );
}
