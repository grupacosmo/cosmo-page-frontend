import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { AboutUs } from '@/components/home/AboutUs';
import { Hero } from '@/components/home/Hero';
import { JoinUs } from '@/components/home/JoinUs';
import { Partners } from '@/components/home/Partners';
import { ProjectsHome } from '@/components/home/ProjectsHome';
import { PageSheet } from '@/components/layout/PageShell';
import { NewsSummarySkeleton } from '@/components/news/NewsSkeletons';
import { NewsSummary } from '@/components/news/NewsSummary';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/lib/data/projects';

const JOIN_US_ID = 'join-us';

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <div className="flex grow flex-col bg-[url('/images/home-sky.jpg')] bg-cover bg-fixed bg-center">
      <Hero
        subtitle={t('home.name')}
        joinUsLabel={t('home.joinUs')}
        joinUsTargetId={JOIN_US_ID}
        projectsLabel={t('navigation.projects')}
      />
      <PageSheet>
        <AboutUs
          title={t('home.aboutUs')}
          description={t('home.aboutUsDescription')}
          teamLabel={t('home.meetOurTeam')}
          emptySliderText={t('common.noImages')}
        />
        <Separator />
        {/* Async (events source): streams in behind a skeleton without holding up the page. */}
        <Suspense fallback={<NewsSummarySkeleton />}>
          <NewsSummary t={t} />
        </Suspense>
        <Separator />
        <ProjectsHome t={t} projects={projects} />
        <JoinUs id={JOIN_US_ID} t={t} />
        <Partners title={t('common.partners')} />
      </PageSheet>
    </div>
  );
}
