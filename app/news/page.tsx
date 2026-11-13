import { getLocale, getTranslations } from 'next-intl/server';
import { CosmoTabLinks } from '@/components/common/Tabs';
import { EventsList } from '@/components/news/EventsList';
import { EVENT_TABS, eventsHref, getEvents, paginate, parseEventsQuery } from '@/lib/events';

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
        <EventsList query={query} result={result} />
      </div>
    </CosmoTabLinks>
  );
}
