import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { CardGrid, Section, SectionHeader } from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { getFeaturedEvents } from '@/lib/events';
import type { Translate } from '@/lib/i18n/server';
import { EmptyState } from './EmptyState';
import { EventCard } from './EventCard';

const SUMMARY_COUNT = 4;

/** The next (or latest) few events; an empty-state message when there are none. */
export async function NewsSummary({ t }: { t: Translate }) {
  const events = await getFeaturedEvents(await getLocale(), SUMMARY_COUNT);

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
      {events.length === 0 ? (
        <EmptyState text={t('events.empty')} />
      ) : (
        <CardGrid columns={4}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </CardGrid>
      )}
    </Section>
  );
}
