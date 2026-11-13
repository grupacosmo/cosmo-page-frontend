import { LoadingRegion, Skeleton } from '@/components/common/Skeleton';
import { PageShell } from '@/components/layout/PageShell';
import { BANNERS } from '@/lib/routes';

export function AchievementsPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.achievements} cardClassName="p-0">
      <LoadingRegion className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-center gap-[30px] px-[50px] py-[50px] xl:px-[100px]">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-[360px] w-full rounded-[15px]" />
        ))}
      </LoadingRegion>
    </PageShell>
  );
}
