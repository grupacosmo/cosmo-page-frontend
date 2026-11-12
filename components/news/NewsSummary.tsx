import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { SectionHeader } from '@/components/common/Container';
import { CtaLink } from '@/components/common/CtaButton';
import { Surface } from '@/components/common/Surface';
import { getFeaturedEvents } from '@/lib/events';
import { cssUrl } from '@/lib/format';
import type { Translate } from '@/lib/i18n/server';
import { EmptyState } from './EmptyState';
import { EventDateBadge } from './EventCard';

const TILE_AREAS = ['[grid-area:news-1]', '[grid-area:news-2]', '[grid-area:news-3]', '[grid-area:news-4]'];

/** Mosaic of the next (or latest) four events; an empty-state message when there are none. */
export async function NewsSummary({ t }: { t: Translate }) {
  const events = await getFeaturedEvents(await getLocale(), TILE_AREAS.length);

  return (
    <>
      <SectionHeader
        title={t('navigation.news')}
        action={<CtaLink href="/news" text={t('common.readMore')} secondary />}
      />
      {events.length === 0 ? (
        <EmptyState text={t('events.empty')} compact />
      ) : (
        <section className="news-grid">
          {events.map((event, index) => (
            <Surface
              key={event.id}
              asChild
              tone="media"
              radius="md"
              interactive="zoom"
              style={{ backgroundImage: cssUrl(event.image) }}
              className={`relative min-h-[120px] hover:z-[2] ${TILE_AREAS[index]}`}
            >
              <Link href={`/news/${encodeURIComponent(event.id)}`}>
                <div className="flex h-full w-full flex-col items-start justify-between bg-linear-to-b from-[rgba(31,36,44,0)] from-33% to-[rgb(39,44,53)] p-2.5">
                  <EventDateBadge date={event.date} className="text-cosmo-xs" />
                  <h3 className="m-0">{event.title}</h3>
                </div>
              </Link>
            </Surface>
          ))}
        </section>
      )}
    </>
  );
}
