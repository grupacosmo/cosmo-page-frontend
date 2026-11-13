import { Divider } from '@/components/common/Divider';
import { Skeleton } from '@/components/common/Skeleton';

function ColumnSkeleton({ rows }: { rows: number }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[0.5em]">
      <Skeleton tone="dark" shape="line" className="h-5 w-32" />
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} tone="dark" shape="line" className="w-24" />
      ))}
    </div>
  );
}

/** Footer placeholder shown while the language is switching; same box as `Footer`. */
export function FooterSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mt-auto flex w-full flex-col gap-[1em] bg-cosmo-dark-blue py-[1em] text-cosmo-xs md:pt-[3em] md:pb-[0.5em] md:pl-[4em] md:text-cosmo-s"
    >
      <div className="flex flex-col gap-[2em] text-cosmo-s md:flex-row md:gap-[8em] xl:text-cosmo-m">
        <ColumnSkeleton rows={4} />
        <ColumnSkeleton rows={3} />
        <ColumnSkeleton rows={2} />
      </div>
      <Divider weight="thin" className="md:-ml-[2em]" />
      <Skeleton tone="dark" shape="line" className="w-64 max-md:mx-auto" />
    </div>
  );
}
