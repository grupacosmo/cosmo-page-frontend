import { CardGrid } from '@/components/common/Container';
import { CardSkeleton, LoadingRegion, SkeletonText } from '@/components/common/Skeleton';
import { PageShell } from '@/components/layout/PageShell';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { BANNERS } from '@/lib/routes';

/** Mirrors the projects list: tabs and a grid of project cards. */
export function ProjectsPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.projects}>
      <LoadingRegion className="flex flex-col gap-6">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <CardGrid>
          {Array.from({ length: 3 }, (_, i) => (
            <CardSkeleton key={i} />
          ))}
        </CardGrid>
      </LoadingRegion>
    </PageShell>
  );
}

/** Mirrors the project detail page: back link, overview with photo, experiment. */
export function ProjectDetailPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.projects}>
      <LoadingRegion className="flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-col gap-8">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-9 w-2/3 sm:h-10" />
              <SkeletonText lines={3} />
              <SkeletonText lines={3} className="w-40" />
            </div>
            <Skeleton className="aspect-[3/2] w-full rounded-xl" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-7 w-56" />
            <SkeletonText lines={5} />
          </div>
        </div>
        <Separator />
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col gap-3 lg:col-span-2">
            <Skeleton className="h-7 w-40" />
            <SkeletonText lines={5} />
          </div>
          <Skeleton className="aspect-[3/2] w-full rounded-xl" />
        </div>
      </LoadingRegion>
    </PageShell>
  );
}
