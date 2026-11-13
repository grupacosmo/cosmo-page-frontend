import { CardGrid } from '@/components/common/Container';
import { LoadingRegion } from '@/components/common/Skeleton';
import { PageShell } from '@/components/layout/PageShell';
import { Skeleton } from '@/components/ui/skeleton';
import { BANNERS } from '@/lib/routes';

export function AchievementsPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.achievements}>
      <LoadingRegion>
        <CardGrid>
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </CardGrid>
      </LoadingRegion>
    </PageShell>
  );
}
