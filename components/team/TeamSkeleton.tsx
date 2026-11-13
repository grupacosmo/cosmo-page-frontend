import { LoadingRegion, Skeleton } from '@/components/common/Skeleton';
import { PageShell } from '@/components/layout/PageShell';
import { BANNERS } from '@/lib/routes';

/** Mirrors `MemberCard`: round photo, name and role. */
export function MemberCardSkeleton() {
  return (
    <div className="flex h-[330px] w-[min(calc(100vw-200px),250px)] flex-col items-center gap-2.5 p-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
      <Skeleton shape="circle" className="size-[180px]" />
      <Skeleton shape="line" className="mt-2 h-6 w-[70%]" />
      <Skeleton shape="line" className="w-[50%]" />
    </div>
  );
}

function TeamGroupSkeleton({ members }: { members: number }) {
  return (
    <div>
      <Skeleton shape="line" className="mx-auto h-8 w-48" />
      <section className="my-[2em] flex flex-wrap content-center justify-center gap-6">
        {Array.from({ length: members }, (_, i) => (
          <MemberCardSkeleton key={i} />
        ))}
      </section>
    </div>
  );
}

export function TeamPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.team} cardClassName="flex flex-col p-5">
      <LoadingRegion>
        <div className="mb-[30px] flex w-full flex-wrap justify-center gap-5 p-5">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} shape="pill" className="h-9 w-[140px]" />
          ))}
        </div>
        <TeamGroupSkeleton members={4} />
        <TeamGroupSkeleton members={3} />
      </LoadingRegion>
    </PageShell>
  );
}
