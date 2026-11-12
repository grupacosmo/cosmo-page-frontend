import Link from 'next/link';
import { getFormatter } from 'next-intl/server';
import { Icon } from '@/components/common/Icon';
import { Surface } from '@/components/common/Surface';
import { Badge } from '@/components/ui/badge';
import { cssUrl, truncate } from '@/lib/format';
import type { LocalizedEvent } from '@/lib/types';
import { cn } from '@/lib/utils';

const EXCERPT_LENGTH = 150;

/** Short date badge shared by event cards and homepage tiles. */
export async function EventDateBadge({ date, className }: { date: string; className?: string }) {
  const format = await getFormatter();
  return (
    <Badge
      className={cn(
        'h-auto rounded-[8px] bg-cosmo-magenta px-2.5 py-1 text-cosmo-s font-bold text-white shadow-elevation-2',
        className,
      )}
    >
      {format.dateTime(new Date(date), { day: 'numeric', month: 'short', year: 'numeric' })}
    </Badge>
  );
}

/** Event tile that reveals an excerpt on hover (same look as the original news tiles). */
export async function EventCard({ event }: { event: LocalizedEvent }) {
  return (
    <Surface
      asChild
      tone="media"
      radius="md"
      interactive="hover"
      style={{ backgroundImage: cssUrl(event.image) }}
      className="group relative aspect-[4/3] min-h-[120px] w-full before:absolute before:inset-0 before:bg-linear-to-b before:from-[rgba(31,36,44,0.3)] before:from-33% before:to-[rgb(39,44,53)] before:opacity-0 before:transition before:duration-500 hover:before:opacity-100"
    >
      <Link href={`/news/${encodeURIComponent(event.id)}`}>
        <EventDateBadge date={event.date} className="absolute top-4 left-4 z-[1]" />
        <div className="flex h-full w-full flex-col justify-end bg-linear-to-b from-[rgba(31,36,44,0)] from-33% to-[rgb(39,44,53)] p-5">
          <div className="relative z-[1] translate-y-[70px] transition duration-500 group-hover:translate-y-0">
            <span className="flex items-center gap-1 text-cosmo-s">
              <Icon name="place" size={16} />
              {event.location}
            </span>
            <h3 className="m-0 text-cosmo-l">{event.title}</h3>
            <p className="mt-2.5 translate-y-[50px] text-justify text-cosmo-m opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {truncate(event.description, EXCERPT_LENGTH)}
            </p>
          </div>
        </div>
      </Link>
    </Surface>
  );
}
