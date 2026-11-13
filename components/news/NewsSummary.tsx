import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { CardCarousel } from '@/components/common/CardCarousel';
import { Section, SectionHeader } from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { getFeaturedEvents } from '@/lib/events';
import type { Translate } from '@/lib/i18n/server';
import { EmptyState } from './EmptyState';
import { EventCard } from './EventCard';

const SUMMARY_COUNT = 4;

/** The next (or latest) few events in one swipeable row; an empty-state message when there are none. */
export async function NewsSummary({ t }: { t: Translate }) {
  const events = await getFeaturedEvents(await getLocale(), SUMMARY_COUNT);

  if (events.length === 0) {
    return (
      <Section>
        <SectionHeader
          title={t('navigation.news')}
          action={
            <Button asChild variant="ghost">
              <Link href="/news">
                {t('common.readMore')}
                <ArrowRight />
              </Link>
            </Button>
          }
        />
        <EmptyState text={t('events.empty')} />
      </Section>
    );
  }

  return (
    <CardCarousel
      title={t('navigation.news')}
      layout="cards-wide"
      action={{ href: '/news', label: t('common.readMore') }}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </CardCarousel>
  );
}
