import { Divider } from '@/components/common/Divider';
import { LoadingRegion, Skeleton, SkeletonCta, SkeletonTabBar, SkeletonText } from '@/components/common/Skeleton';
import { PageShell } from '@/components/layout/PageShell';
import { DEFAULT_PAGE_SIZE } from '@/lib/eventsQuery';
import { BANNERS } from '@/lib/routes';

/** Same flush sheet as `app/news/layout.tsx`. */
const NEWS_CARD = 'overflow-hidden p-0';

/** Mirrors `EventCard`: 4:3 image tile with a date badge and a title at the bottom. */
export function EventCardSkeleton() {
  return (
    <Skeleton className="relative aspect-[4/3] min-h-[120px] w-full">
      <span className="absolute top-4 left-4 h-7 w-28 rounded-[8px] bg-white/60" />
      <span className="absolute right-5 bottom-5 left-5 flex flex-col gap-2">
        <span className="h-3.5 w-24 rounded bg-white/50" />
        <span className="h-5 w-[70%] rounded bg-white/60" />
      </span>
    </Skeleton>
  );
}

export function EventsGridSkeleton({ count = DEFAULT_PAGE_SIZE }: { count?: number }) {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(min(350px,100%),1fr))] justify-center gap-[30px]">
      {Array.from({ length: count }, (_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </section>
  );
}

/** Content of `/news` while it loads: tab bar, event grid, page-size picker and pagination. */
export function EventsSkeleton() {
  return (
    <LoadingRegion>
      <SkeletonTabBar />
      <div className="p-5">
        <EventsGridSkeleton />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Skeleton shape="line" className="mr-1 w-16" />
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} shape="circle" className="size-9" />
            ))}
          </div>
          <Skeleton shape="pill" className="h-10 w-52" />
        </div>
      </div>
    </LoadingRegion>
  );
}

const TILE_AREAS = ['[grid-area:news-1]', '[grid-area:news-2]', '[grid-area:news-3]', '[grid-area:news-4]'];

/** Mirrors `NewsSummary`: section header with CTA and the four-tile mosaic. */
export function NewsSummarySkeleton() {
  return (
    <LoadingRegion>
      <div className="flex items-center justify-between p-[15px]">
        <Skeleton shape="line" className="h-8 w-48" />
        <SkeletonCta />
      </div>
      <div className="news-grid">
        {TILE_AREAS.map((area) => (
          <Skeleton key={area} className={`min-h-[120px] ${area}`} />
        ))}
      </div>
    </LoadingRegion>
  );
}

/** Mirrors the event detail article (back link, title, meta, photo, text) plus the news teaser. */
export function EventDetailSkeleton() {
  return (
    <div className="p-5 xl:px-[70px]">
      <LoadingRegion className="flex flex-col justify-center gap-[1em] py-5 lg:px-10">
        <SkeletonCta />
        <Skeleton shape="line" className="my-2.5 h-9 w-[60%]" />
        <div className="flex flex-col gap-2.5 text-cosmo-m md:flex-row md:gap-[3em]">
          <Skeleton shape="line" className="w-64" />
          <Skeleton shape="line" className="w-48" />
        </div>
        <Skeleton className="my-5 h-[300px] w-full rounded-[15px] md:h-[500px]" />
        <SkeletonText lines={6} className="text-cosmo-m" />
      </LoadingRegion>
      <Divider />
      <NewsSummarySkeleton />
    </div>
  );
}

/** Whole `/news` page (banner included), for use outside the news layout. */
export function NewsPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.news} cardClassName={NEWS_CARD}>
      <EventsSkeleton />
    </PageShell>
  );
}

/** Whole `/news/[slug]` page (banner included), for use outside the news layout. */
export function EventDetailPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.news} cardClassName={NEWS_CARD}>
      <EventDetailSkeleton />
    </PageShell>
  );
}
