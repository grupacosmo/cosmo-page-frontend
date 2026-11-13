import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getFormatter } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { truncate } from '@/lib/format';
import { SHIMMER_PLACEHOLDER } from '@/lib/shimmer';
import type { LocalizedEvent } from '@/lib/types';

const EXCERPT_LENGTH = 150;

interface EventCardProps {
  event: LocalizedEvent;
  /** Load the photo eagerly (cards above the fold). */
  eager?: boolean;
}

/** Event teaser: photo with the date, title, location and a short excerpt. The whole card is a link. */
export async function EventCard({ event, eager = false }: EventCardProps) {
  const format = await getFormatter();

  return (
    <Card className="group relative h-full pt-0 transition-shadow hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={event.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={eager ? 'eager' : 'lazy'}
          placeholder={SHIMMER_PLACEHOLDER}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3">
          {format.dateTime(new Date(event.date), { day: 'numeric', month: 'short', year: 'numeric' })}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle>
          <Link href={`/news/${encodeURIComponent(event.id)}`} className="outline-none after:absolute after:inset-0">
            {event.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          {event.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground">{truncate(event.description, EXCERPT_LENGTH)}</p>
      </CardContent>
    </Card>
  );
}
