import { AboutUs } from '@/components/home/AboutUs';
import { Hero } from '@/components/home/Hero';
import { JoinUs } from '@/components/home/JoinUs';
import { Partners } from '@/components/home/Partners';
import { ProjectsHome } from '@/components/home/ProjectsHome';
import { MainCard } from '@/components/layout/PageShell';
import { NewsSummary } from '@/components/news/NewsSummary';
import { NewsSummarySkeleton } from '@/components/news/NewsSkeletons';
import { Section } from '@/components/common/Container';
import { Divider } from '@/components/common/Divider';
import { projects } from '@/lib/data/projects';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

const JOIN_US_ID = 'join-us';

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <div className="grow bg-[url('/images/home-sky.jpg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[70px] xl:grid xl:grid-rows-[400px_1fr]">
      <Hero subtitle={t('home.name')} joinUsLabel={t('home.joinUs')} joinUsTargetId={JOIN_US_ID} />
      <div>
        <MainCard>
          <Section>
            <AboutUs title={t('home.aboutUs')} description={t('home.aboutUsDescription')} emptySliderText={t('common.noImages')} />
          </Section>
          <Divider />
          <Section>
            {/* Async (events source): streams in behind a skeleton without holding up the page. */}
            <Suspense fallback={<NewsSummarySkeleton />}>
              <NewsSummary t={t} />
            </Suspense>
          </Section>
          <Divider />
          <Section>
            <ProjectsHome t={t} projects={projects} />
          </Section>
          <Divider />
          <Section id={JOIN_US_ID}>
            <JoinUs t={t} />
          </Section>
          <Divider />
          <Section>
            <Partners title={t('common.partners')} />
          </Section>
        </MainCard>
      </div>
    </div>
  );
}
