import { useTranslations } from 'next-intl';
import { Children, type ComponentProps, type ReactNode } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  carouselHeader,
  carouselSlide,
  carouselTrack,
  carouselViewport,
  type CarouselLayout,
} from './carouselLayout';

/**
 * Loading placeholders composed from the shadcn `Skeleton`. Every loading state in the app (route
 * `loading.tsx`, Suspense fallbacks, language switching) is built from these, so they share one look.
 */

/** Skeleton colour on dark surfaces (banners, header, footer). */
export const SKELETON_ON_DARK = 'bg-white/15';

const LINE_WIDTHS = ['w-full', 'w-[96%]', 'w-[92%]', 'w-[98%]', 'w-[88%]'];

/** A paragraph of placeholder lines; the last line is shorter, like real text. */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 && lines > 1 ? 'w-3/5' : LINE_WIDTHS[i % LINE_WIDTHS.length])}
        />
      ))}
    </div>
  );
}

/** Placeholder for a section header: title and, optionally, its action button. */
export function SectionHeaderSkeleton({ action }: { action?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Skeleton className="h-8 w-48" />
      {action && <Skeleton className="h-8 w-28 rounded-lg" />}
    </div>
  );
}

/** Mirrors the image-topped cards (`EventCard`, `ProjectCard`). */
export function CardSkeleton() {
  return (
    <Card className="h-full pt-0">
      <Skeleton className="aspect-video rounded-none" />
      <CardHeader>
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </CardHeader>
      <CardContent>
        <SkeletonText lines={2} />
      </CardContent>
    </Card>
  );
}

interface CardCarouselSkeletonProps {
  layout: CarouselLayout;
  /** Whether the real carousel has a "see all" link. */
  action?: boolean;
  /** One placeholder card per child. */
  children: ReactNode;
}

/** Mirrors `CardCarousel` box for box: header row, one clipped row of cards and the phone-only link. */
export function CardCarouselSkeleton({ layout, action, children }: CardCarouselSkeletonProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className={carouselHeader}>
        <Skeleton className="h-8 w-48 max-w-1/2" />
        {action && <Skeleton className="hidden h-8 w-36 rounded-lg sm:block" />}
      </div>
      <div className={cn('overflow-hidden', carouselViewport)}>
        <div className={cn('flex', carouselTrack)}>
          {Children.map(children, (child) => (
            <div className={carouselSlide(layout)}>{child}</div>
          ))}
        </div>
      </div>
      {action && <Skeleton className="h-10 w-full rounded-lg sm:hidden" />}
    </div>
  );
}

/**
 * Wraps a loading layout: announces "Loading…" to screen readers once and marks the region busy.
 */
export function LoadingRegion({ children, ...props }: ComponentProps<'div'>) {
  const t = useTranslations('common');
  return (
    <div aria-busy="true" {...props}>
      <span role="status" className="sr-only">
        {t('loading')}
      </span>
      {children}
    </div>
  );
}
