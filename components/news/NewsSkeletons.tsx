import { CardGrid, Section } from '@/components/common/Container';
import { CardSkeleton, LoadingRegion, SectionHeaderSkeleton, SkeletonText } from '@/components/common/Skeleton';
import { PageShell } from '@/components/layout/PageShell';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT_PAGE_SIZE } from '@/lib/eventsQuery';
import { BANNERS } from '@/lib/routes';

/** Content of `/news` while it loads: tabs, event grid, page-size picker and pagination. */
export function EventsSkeleton() {
  return (
    <LoadingRegion className="flex flex-col gap-6">
      <Skeleton className="h-8 w-44 rounded-lg" />
      <CardGrid>
        {Array.from({ length: DEFAULT_PAGE_SIZE }, (_, i) => (
          <CardSkeleton key={i} />
        ))}
      </CardGrid>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Skeleton className="h-8 w-40 rounded-lg" />
        <Skeleton className="h-8 w-44 rounded-lg" />
      </div>
    </LoadingRegion>
  );
}

/** Mirrors `NewsSummary`: section header with its action and a row of cards. */
export function NewsSummarySkeleton() {
  return (
    <LoadingRegion>
      <Section>
        <SectionHeaderSkeleton action />
        <CardGrid columns={4}>
          {Array.from({ length: 4 }, (_, i) => (
            <CardSkeleton key={i} />
          ))}
        </CardGrid>
      </Section>
    </LoadingRegion>
  );
}

/** Mirrors the event detail article (back link, title, meta, photo, text) plus the news teaser. */
export function EventDetailSkeleton() {
  return (
    <>
      <LoadingRegion className="flex flex-col gap-6">
        <Skeleton className="h-8 w-28 rounded-lg" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-9 w-3/5 sm:h-10" />
          <Skeleton className="h-5 w-72 max-w-full" />
        </div>
        <Skeleton className="aspect-video w-full rounded-xl md:aspect-[21/9]" />
        <SkeletonText lines={6} className="max-w-3xl" />
      </LoadingRegion>
      <Separator />
      <NewsSummarySkeleton />
    </>
  );
}

/** Whole `/news` page (banner included), for use outside the news layout. */
export function NewsPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.news}>
      <EventsSkeleton />
    </PageShell>
  );
}

/** Whole `/news/[slug]` page (banner included), for use outside the news layout. */
export function EventDetailPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.news}>
      <EventDetailSkeleton />
    </PageShell>
  );
}
