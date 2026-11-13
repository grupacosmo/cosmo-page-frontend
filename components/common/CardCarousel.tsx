'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Children, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import {
  carouselHeader,
  carouselSlide,
  carouselTrack,
  carouselViewport,
  type CarouselLayout,
} from './carouselLayout';

interface CardCarouselProps {
  /** Section heading; also the accessible name of the carousel. */
  title: string;
  /** How many cards are visible per breakpoint. */
  layout: CarouselLayout;
  /** Optional "see all" link: beside the heading on wide screens, a full-width button below the cards on phones. */
  action?: { href: string; label: string };
  /** Anchor id, for in-page links to this section. */
  id?: string;
  /** One card per child. */
  children: ReactNode;
}

/**
 * A titled row of cards in a fixed-height box: instead of wrapping into more and more rows, extra
 * cards are reached by swiping, dragging, the arrow keys or the previous / next buttons.
 *
 * The number of visible cards is pure CSS, so the server render already has the final layout. The
 * controls appear only when there is something to scroll to, in space that is always reserved.
 */
export function CardCarousel({ title, layout, action, id, children }: CardCarouselProps) {
  const slides = Children.toArray(children);

  return (
    <Carousel
      id={id}
      aria-label={title}
      // Pages are whole groups of visible cards; the last page stays flush with the right edge.
      opts={{ align: 'start', slidesToScroll: 'auto' }}
      className="flex flex-col gap-6"
    >
      <div className={carouselHeader}>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <div className="flex shrink-0 items-center gap-2">
          <CarouselControls />
          {action && (
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href={action.href}>
                {action.label}
                <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <CarouselContent viewportClassName={carouselViewport} className={carouselTrack}>
        {slides.map((slide, index) => (
          <CardSlide key={index} index={index} total={slides.length} layout={layout}>
            {slide}
          </CardSlide>
        ))}
      </CarouselContent>

      {action && (
        <Button asChild variant="outline" className="h-10 w-full sm:hidden">
          <Link href={action.href}>
            {action.label}
            <ArrowRight />
          </Link>
        </Button>
      )}
    </Carousel>
  );
}

interface CardSlideProps {
  index: number;
  total: number;
  layout: CarouselLayout;
  children: ReactNode;
}

function CardSlide({ index, total, layout, children }: CardSlideProps) {
  const t = useTranslations('common.carousel');
  const { slidesInView } = useCarousel();
  // Cards scrolled out of view are skipped by the keyboard and screen readers until paged to.
  // Before the carousel has measured itself (and without JavaScript) every card stays reachable.
  const hidden = slidesInView !== '' && !slidesInView.split(',').includes(String(index));

  return (
    <CarouselItem
      aria-label={t('slideOf', { current: index + 1, total })}
      inert={hidden}
      className={carouselSlide(layout)}
    >
      {children}
    </CarouselItem>
  );
}

/** Page counter with previous / next buttons; invisible (but still taking its space) on a single page. */
function CarouselControls() {
  const t = useTranslations('common.carousel');
  const { selectedIndex, snapCount } = useCarousel();
  const scrollable = snapCount > 1;

  return (
    <div
      className={cn(
        'flex items-center gap-2 transition-[opacity,visibility] duration-200',
        scrollable ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <span className="min-w-10 text-center text-sm text-muted-foreground tabular-nums">
        {selectedIndex + 1} / {Math.max(snapCount, 1)}
      </span>
      <CarouselPrevious label={t('previous')} className="size-10 sm:size-9" />
      <CarouselNext label={t('next')} className="size-10 sm:size-9" />
    </div>
  );
}
