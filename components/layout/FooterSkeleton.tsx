import { Container } from '@/components/common/Container';
import { SKELETON_ON_DARK } from '@/components/common/Skeleton';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

function ColumnSkeleton({ rows }: { rows: number }) {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className={cn('h-5 w-28', SKELETON_ON_DARK)} />
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className={cn('h-4 w-24', SKELETON_ON_DARK)} />
      ))}
    </div>
  );
}

/** Footer placeholder shown while the language is switching; same grid as `Footer`. */
export function FooterSkeleton() {
  return (
    <div aria-hidden="true" className="mt-auto bg-cosmo-dark-blue">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
        <ColumnSkeleton rows={2} />
        <ColumnSkeleton rows={4} />
        <ColumnSkeleton rows={4} />
        <ColumnSkeleton rows={2} />
      </Container>
      <Separator className="bg-white/10" />
      <Container className="py-6">
        <Skeleton className={cn('h-4 w-56 max-sm:mx-auto', SKELETON_ON_DARK)} />
      </Container>
    </div>
  );
}
