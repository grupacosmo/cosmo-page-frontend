import { Section } from '@/components/common/Container';
import { Divider } from '@/components/common/Divider';
import { LoadingRegion, Skeleton, SkeletonCta, SkeletonTabBar, SkeletonText } from '@/components/common/Skeleton';
import { PageShell } from '@/components/layout/PageShell';
import { BANNERS } from '@/lib/routes';

/** Mirrors `ProjectCard`: slanted photo, title, description, meta row and "more" button. */
export function ProjectCardSkeleton() {
  return (
    <div className="flex w-full items-center justify-center text-cosmo-m">
      <div className="flex w-[70%] flex-col overflow-hidden rounded-br-[15px] shadow-elevation-5 md:w-[90%] md:flex-row md:gap-[1em] lg:gap-[2em]">
        <Skeleton
          shape="none"
          className="min-h-[250px] w-full md:w-1/2 md:[clip-path:polygon(0_0,70%_0,100%_100%,0%_100%)] lg:w-[35%]"
        />
        <div className="flex w-full flex-col justify-between gap-[1em] p-[1em] md:my-[1em] md:w-[40%] md:p-0 lg:w-[55%] lg:text-cosmo-l">
          <div className="flex flex-col gap-[0.8em]">
            <Skeleton shape="line" className="h-7 w-[55%] lg:h-8" />
            <SkeletonText lines={3} />
          </div>
          <div className="flex gap-[1em] max-xs:flex-col lg:gap-[3em]">
            <Skeleton shape="line" className="w-28" />
            <Skeleton shape="line" className="w-24" />
          </div>
        </div>
        <div className="m-[1em] flex items-start justify-center">
          <Skeleton shape="circle" className="size-10 max-md:hidden" />
          <SkeletonCta className="md:hidden" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.projects} cardClassName="w-full overflow-hidden p-0" fullHeight>
      <LoadingRegion>
        <SkeletonTabBar />
        <section className="my-[2em] flex w-full flex-col items-center justify-center gap-[3em]">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </section>
      </LoadingRegion>
    </PageShell>
  );
}

const column = 'max-md:mx-auto max-md:flex max-md:flex-col max-md:items-center';

/** Mirrors the project detail page: overview with photo, experiment, team. */
export function ProjectDetailPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.projects} cardClassName="overflow-hidden px-5 py-5 lg:px-[60px]" fullHeight>
      <LoadingRegion>
        <Section>
          <SkeletonCta />
        </Section>

        <Section>
          <div className="flex flex-col gap-[1em] md:flex-row md:gap-[3em]">
            <div className="flex w-full flex-col gap-[1em] md:w-[35%] lg:w-[45%]">
              <Skeleton shape="line" className="h-8 w-[70%] lg:h-9" />
              <SkeletonText lines={3} className="mb-[2em] text-cosmo-l" />
              <SkeletonText lines={3} lineClassName="w-40" />
            </div>
            <div className={`w-[90%] md:w-[65%] lg:w-1/2 ${column}`}>
              <Skeleton className="aspect-[3/2] w-full" />
            </div>
          </div>
          <div className="mt-[1em] flex flex-col gap-2.5">
            <Skeleton shape="line" className="h-7 w-56" />
            <SkeletonText lines={5} />
          </div>
        </Section>

        <Divider />

        <Section>
          <div className="flex flex-col gap-[1em] md:flex-row md:gap-[3em]">
            <div className="flex w-full flex-col gap-2.5 md:w-[60%] lg:w-[70%]">
              <Skeleton shape="line" className="h-7 w-40" />
              <SkeletonText lines={5} />
            </div>
            <div className={`w-[60%] md:w-[40%] lg:w-[30%] ${column}`}>
              <Skeleton className="aspect-[3/2] w-full" />
            </div>
          </div>
        </Section>
      </LoadingRegion>
    </PageShell>
  );
}
