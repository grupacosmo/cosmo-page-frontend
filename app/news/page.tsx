import { getLocale, getTranslations } from 'next-intl/server';
import { CosmoTabLinks } from '@/components/common/Tabs';
import { EmptyState } from '@/components/news/EmptyState';
import { EventCard } from '@/components/news/EventCard';
import { PageSizeSelect } from '@/components/news/PageSizeSelect';
import { Pagination } from '@/components/news/Pagination';
import { EVENT_TABS, PAGE_SIZES, eventsHref, getEvents, paginate, parseEventsQuery } from '@/lib/events';

interface NewsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const [params, t, locale] = await Promise.all([searchParams, getTranslations(), getLocale()]);
  const query = parseEventsQuery(params);
  const result = paginate(await getEvents(locale, query.tab), query.page, query.size);

  const tabs = EVENT_TABS.map((tab) => ({
    value: tab,
    label: t(`events.${tab}`),
    // Switching tabs starts from the first page but keeps the chosen page size.
    href: eventsHref({ tab, page: 0, size: query.size }),
  }));

  return (
    <CosmoTabLinks tabs={tabs} active={query.tab}>
      <div className="p-5">
        {result.totalItems === 0 ? (
          <EmptyState text={t(query.tab === 'upcoming' ? 'events.empty' : 'events.emptyPast')} />
        ) : (
          <>
            <section className="grid grid-cols-[repeat(auto-fill,minmax(min(350px,100%),1fr))] justify-center gap-[30px]">
              {result.items.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </section>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
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
          </>
        )}
      </div>
    </CosmoTabLinks>
  );
}
