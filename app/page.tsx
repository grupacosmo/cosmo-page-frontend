import { AboutUs } from '@/components/home/AboutUs';
import { Hero } from '@/components/home/Hero';
import { JoinUs } from '@/components/home/JoinUs';
import { Partners } from '@/components/home/Partners';
import { ProjectsHome } from '@/components/home/ProjectsHome';
import { MainCard } from '@/components/layout/PageShell';
import { NewsSummary } from '@/components/news/NewsSummary';
import { Divider } from '@/components/ui/Divider';
import { projects } from '@/lib/data/projects';
import { getTranslator } from '@/lib/i18n/server';

const JOIN_US_ID = 'join-us';

export default async function HomePage() {
  const t = await getTranslator();

  return (
    <div className="grow bg-[url('/images/home-sky.jpg')] bg-cover bg-fixed bg-center bg-no-repeat pt-[70px] xl:grid xl:grid-rows-[400px_1fr]">
      <Hero subtitle={t('home.name')} joinUsLabel={t('home.joinUs')} joinUsTargetId={JOIN_US_ID} />
      <div>
        <MainCard>
          <section className="my-[2em]">
            <AboutUs title={t('home.aboutUs')} description={t('home.aboutUsDescription')} emptySliderText={t('common.noImages')} />
          </section>
          <Divider />
          <section className="my-[2em]">
            <NewsSummary t={t} />
          </section>
          <Divider />
          <section className="my-[2em]">
            <ProjectsHome t={t} projects={projects} />
          </section>
          <Divider />
          <section id={JOIN_US_ID} className="my-[2em]">
            <JoinUs t={t} />
          </section>
          <Divider />
          <section className="my-[2em]">
            <Partners title={t('common.partners')} />
          </section>
        </MainCard>
      </div>
    </div>
  );
}
