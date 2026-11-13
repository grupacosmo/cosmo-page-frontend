import { LoadingRegion } from '@/components/common/Skeleton';
import { PageShell } from '@/components/layout/PageShell';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BANNERS } from '@/lib/routes';
import { memberGrid } from './MemberCard';

function TeamGroupSkeleton({ members }: { members: number }) {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-8 w-40" />
      <div className={memberGrid}>
        {Array.from({ length: members }, (_, i) => (
          <Card key={i} className="items-center gap-3 px-4 py-6">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </Card>
        ))}
      </div>
    </div>
  );
}

export function TeamPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.team}>
      <LoadingRegion className="flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-lg" />
          ))}
        </div>
        <TeamGroupSkeleton members={5} />
        <TeamGroupSkeleton members={5} />
      </LoadingRegion>
    </PageShell>
  );
}
