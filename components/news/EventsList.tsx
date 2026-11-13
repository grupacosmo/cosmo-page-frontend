import { getTranslations } from 'next-intl/server';
import { CardGrid } from '@/components/common/Container';
import { PAGE_SIZES, eventsHref, type EventsQuery, type Page } from '@/lib/eventsQuery';
import type { LocalizedEvent } from '@/lib/types';
import { EmptyState } from './EmptyState';
import { EventCard } from './EventCard';
import { PageSizeSelect } from './PageSizeSelect';
import { Pagination } from './Pagination';

interface EventsListProps {
  query: EventsQuery;
  result: Page<LocalizedEvent>;
}

/** One page of event cards with the page-size picker and pagination; an empty state when there are none. */
export async function EventsList({ query, result }: EventsListProps) {
  const t = await getTranslations();

  if (result.totalItems === 0) {
    return <EmptyState text={t(query.tab === 'upcoming' ? 'events.empty' : 'events.emptyPast')} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <CardGrid>
        {result.items.map((event, index) => (
          // The first row is above the fold: load it eagerly; the rest lazy-load with a shimmer.
          <EventCard key={event.id} event={event} eager={index < 3} />
        ))}
      </CardGrid>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <PageSizeSelect
          sizes={PAGE_SIZES}
          current={query.size}
          hrefFor={(size) => eventsHref({ ...query, page: 0, size })}
          labels={{ show: t('events.show'), group: t('events.pageSize') }}
        />
        <Pagination
          page={result.page}
          pageSize={result.pageSize}
          totalItems={result.totalItems}
          totalPages={result.totalPages}
          hrefFor={(page) => eventsHref({ ...query, page })}
          labels={{
            of: t('news.of'),
            previous: t('news.previous'),
            next: t('news.next'),
            pagination: t('news.pagination'),
          }}
        />
      </div>
    </div>
  );
}
