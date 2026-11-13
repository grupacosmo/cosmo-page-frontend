import { Container, Section } from '@/components/common/Container';
import {
  CardCarouselSkeleton,
  CardSkeleton,
  LoadingRegion,
  SectionHeaderSkeleton,
  SKELETON_ON_DARK,
  SkeletonText,
} from '@/components/common/Skeleton';
import { PageSheet } from '@/components/layout/PageShell';
import { NewsSummarySkeleton } from '@/components/news/NewsSkeletons';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { heroLayout, heroTitle } from './Hero';

/** Mirrors `Hero`; the brand name is not translated, so it renders for real. */
function HeroSkeleton() {
  return (
    <section className="pt-16 text-white">
      <Container className={heroLayout}>
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <h1 className={heroTitle}>COSMO PK</h1>
          <Skeleton className={cn('h-7 w-80 max-w-full', SKELETON_ON_DARK)} />
        </div>
        <div className="flex gap-3">
          <Skeleton className={cn('h-10 w-32 rounded-lg', SKELETON_ON_DARK)} />
          <Skeleton className={cn('h-10 w-32 rounded-lg', SKELETON_ON_DARK)} />
        </div>
        <Skeleton className={cn('h-9 w-40 rounded-lg', SKELETON_ON_DARK)} />
      </Container>
    </section>
  );
}

/** Mirrors the homepage: hero, about us + slider, news, projects, join us, partners. */
export function HomeSkeleton() {
  return (
    <div className="flex grow flex-col bg-[url('/images/home-sky.jpg')] bg-cover bg-fixed bg-center">
      <HeroSkeleton />
      <PageSheet>
        <LoadingRegion className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-48" />
            <SkeletonText lines={6} />
            <Skeleton className="h-9 w-40 rounded-lg" />
          </div>
          <Skeleton className="aspect-[4/3] w-full rounded-xl sm:aspect-video lg:aspect-[4/3]" />
        </LoadingRegion>
        <Separator />
        <NewsSummarySkeleton />
        <Separator />
        <CardCarouselSkeleton layout="cards" action>
          {Array.from({ length: 3 }, (_, i) => (
            <CardSkeleton key={i} />
          ))}
        </CardCarouselSkeleton>
        <Skeleton className="h-44 rounded-xl" />
        <Section>
          <SectionHeaderSkeleton />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl sm:h-28" />
            ))}
          </div>
        </Section>
      </PageSheet>
    </div>
  );
}
