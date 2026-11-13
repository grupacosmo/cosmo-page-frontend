import { Container, Section } from '@/components/common/Container';
import { Divider } from '@/components/common/Divider';
import { LoadingRegion, Skeleton, SkeletonCta, SkeletonText } from '@/components/common/Skeleton';
import { MainCard } from '@/components/layout/PageShell';
import { NewsSummarySkeleton } from '@/components/news/NewsSkeletons';
import { socialLinks } from '@/lib/data/site';

/** Mirrors `Hero`; the brand name is not translated, so it renders for real. */
function HeroSkeleton() {
  return (
    <section className="py-[100px] text-white">
      <Container gutter="page" className="flex flex-col max-xs:items-center max-xs:gap-2.5 max-xs:text-center">
        <h1 className="m-0 text-[50px] font-normal xs:text-[60px]">COSMO PK</h1>
        <div className="mb-2.5 flex h-[30px] items-center xs:h-[45px]">
          <Skeleton tone="dark" shape="line" className="h-[22px] w-[min(420px,80vw)] xs:h-[30px]" />
        </div>
        <div className="flex gap-5 max-xs:justify-center">
          {socialLinks.map((link) => (
            <Skeleton key={link.name} tone="dark" shape="circle" className="size-5" />
          ))}
        </div>
        <Skeleton tone="dark" shape="pill" className="mt-5 h-10 w-[160px] xl:h-12" />
      </Container>
    </section>
  );
}

function SectionTitleSkeleton({ className }: { className?: string }) {
  return <Skeleton shape="line" className={`h-8 w-48 ${className ?? ''}`} />;
}

/** Mirrors the homepage: hero, about us + slider, news, projects, join us, partners. */
export function HomeSkeleton() {
  return (
    <div className="grow bg-[url('/images/home-sky.jpg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[70px] xl:grid xl:grid-rows-[400px_1fr]">
      <HeroSkeleton />
      <div>
        <MainCard>
          <LoadingRegion>
            <Section>
              <div className="flex justify-between gap-[2em] p-[15px] max-xl:flex-col">
                <div className="flex w-full flex-col gap-[1em] xl:w-1/2">
                  <SectionTitleSkeleton />
                  <SkeletonText lines={7} className="text-cosmo-xs xs:text-cosmo-s xl:text-cosmo-m" />
                </div>
                <Skeleton className="h-[400px] w-full rounded-lg xl:w-[45%]" />
              </div>
            </Section>
            <Divider />
            <Section>
              <NewsSummarySkeleton />
            </Section>
            <Divider />
            <Section>
              <div className="flex items-center justify-between p-[15px]">
                <SectionTitleSkeleton />
                <SkeletonCta />
              </div>
              <div className="flex flex-col gap-[0.5em] xs:flex-row">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} shape="none" className="h-[200px] flex-1" />
                ))}
              </div>
            </Section>
            <Divider />
            <Section>
              <Container width="narrow" className="my-[60px] flex items-start justify-center gap-5">
                <Skeleton className="size-[100px] md:size-[150px]" />
                <div className="flex flex-1 flex-col gap-3">
                  <Skeleton shape="line" className="h-8 w-[70%]" />
                  <SkeletonText lines={2} />
                  <SkeletonCta />
                </div>
              </Container>
            </Section>
            <Divider />
            <Section>
              <div className="flex flex-col gap-[1em] p-[15px]">
                <SectionTitleSkeleton />
                <div className="grid grid-cols-1 gap-[2em] xs:grid-cols-2 md:grid-cols-4">
                  {[0, 1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[100px]" />
                  ))}
                </div>
              </div>
            </Section>
          </LoadingRegion>
        </MainCard>
      </div>
    </div>
  );
}
