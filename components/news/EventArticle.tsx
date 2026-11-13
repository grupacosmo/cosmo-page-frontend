import { ArrowLeft, CalendarDays, ExternalLink, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getFormatter, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { SHIMMER_PLACEHOLDER } from '@/lib/shimmer';
import type { LocalizedEvent } from '@/lib/types';

function MetaItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-cosmo-magenta">
      {icon}
      <span className="sr-only">{label}: </span>
      {children}
    </li>
  );
}

/** Full event: back link, title, date/place/link, photo and description. */
export async function EventArticle({ event }: { event: LocalizedEvent }) {
  const [t, format] = await Promise.all([getTranslations(), getFormatter()]);

  const start = new Date(event.date);
  const when = event.endDate
    ? format.dateTimeRange(start, new Date(event.endDate), { dateStyle: 'long', timeStyle: 'short' })
    : format.dateTime(start, { dateStyle: 'long', timeStyle: 'short' });

  return (
    <article className="flex flex-col gap-6">
      <Button asChild variant="ghost" className="-ml-2.5 self-start">
        <Link href="/news">
          <ArrowLeft />
          {t('news.goBack')}
        </Link>
      </Button>
      <header className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{event.title}</h2>
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6">
          <MetaItem label={t('events.date')} icon={<CalendarDays aria-hidden="true" />}>
            {when}
          </MetaItem>
          <MetaItem label={t('events.location')} icon={<MapPin aria-hidden="true" />}>
            {event.location}
          </MetaItem>
          {event.url && (
            <MetaItem label={t('events.eventPage')} icon={<ExternalLink aria-hidden="true" />}>
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline-offset-4 hover:underline"
              >
                {t('events.eventPage')}
              </a>
            </MetaItem>
          )}
        </ul>
      </header>
      <Image
        src={event.image}
        alt={event.title}
        width={1500}
        height={500}
        sizes="(max-width: 1280px) 100vw, 1200px"
        placeholder={SHIMMER_PLACEHOLDER}
        className="aspect-video w-full rounded-xl object-cover md:aspect-[21/9]"
      />
      <p className="max-w-3xl leading-relaxed">{event.description}</p>
    </article>
  );
}
