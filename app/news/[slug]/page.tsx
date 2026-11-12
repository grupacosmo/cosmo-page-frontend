import type { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { CtaLink } from '@/components/common/CtaButton';
import { Divider } from '@/components/common/Divider';
import { Icon } from '@/components/common/Icon';
import { NewsSummary } from '@/components/news/NewsSummary';
import { getEvent } from '@/lib/events';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

/** Long descriptions are split into two columns on wide screens. */
const TWO_COLUMN_THRESHOLD = 1000;

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const event = await getEvent(slug, locale);
  return { title: event ? `${event.title} | Cosmo PK` : 'Cosmo PK' };
}

function MetaItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2.5">
      {icon}
      <span className="sr-only">{label}: </span>
      {children}
    </span>
  );
}

export default async function EventPage({ params }: EventPageProps) {
  const [{ slug }, t, locale, format] = await Promise.all([params, getTranslations(), getLocale(), getFormatter()]);
  const event = await getEvent(slug, locale);
  // Unknown or not translated into the current language.
  if (!event) redirect('/news');

  const start = new Date(event.date);
  const when = event.endDate
    ? format.dateTimeRange(start, new Date(event.endDate), { dateStyle: 'long', timeStyle: 'short' })
    : format.dateTime(start, { dateStyle: 'long', timeStyle: 'short' });

  const { description } = event;
  const half = Math.floor(description.length / 2);
  const paragraphs =
    description.length > TWO_COLUMN_THRESHOLD ? [description.slice(0, half), description.slice(half)] : [description];

  return (
    <div className="p-5 xl:px-[70px]">
      <article className="flex flex-col justify-center gap-[1em] py-5 lg:px-10">
        <div>
          <CtaLink href="/news" text={t('news.goBack')} secondary back />
        </div>
        <h1 className="my-2.5 text-cosmo-xl">{event.title}</h1>
        <div className="flex flex-col gap-2.5 text-cosmo-m md:flex-row md:gap-[3em]">
          <MetaItem label={t('events.date')} icon={<Image src="/images/icons/date.svg" alt="" width={24} height={24} />}>
            {when}
          </MetaItem>
          <MetaItem label={t('events.location')} icon={<Icon name="place" className="text-cosmo-magenta" />}>
            {event.location}
          </MetaItem>
          {event.url && (
            <a href={event.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              <MetaItem label={t('events.eventPage')} icon={<Image src="/images/icons/site.svg" alt="" width={24} height={24} />}>
                {t('events.eventPage')}
                <Icon name="openInNew" size={16} />
              </MetaItem>
            </a>
          )}
        </div>
        <Image
          src={event.image}
          alt={event.title}
          width={1500}
          height={500}
          sizes="(max-width: 1600px) 100vw, 1500px"
          className="my-5 max-h-[500px] w-full max-w-full rounded-[15px] object-cover select-none"
        />
        <div className="flex flex-col xl:flex-row xl:gap-5">
          {paragraphs.map((text, index) => (
            <p key={index} className="text-left text-cosmo-m xl:flex-1">
              {text}
            </p>
          ))}
        </div>
      </article>

      <Divider />

      <NewsSummary t={t} />
    </div>
  );
}
