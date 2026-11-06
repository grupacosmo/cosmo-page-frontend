import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Tabs } from '@/components/ui/Tabs';
import { getProjectsByStatus } from '@/lib/data/projects';
import { getTranslator, type Translate } from '@/lib/i18n/server';
import type { ProjectStatus } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  return { title: `${t('navigation.projects')} | Cosmo PK` };
}

function ProjectList({ t, status }: { t: Translate; status: ProjectStatus }) {
  return (
    <section className="my-[2em] flex w-full flex-col items-center justify-center gap-[3em]">
      {getProjectsByStatus(status).map((project) => (
        <ProjectCard key={project.id} t={t} project={project} />
      ))}
    </section>
  );
}

export default async function ProjectsPage() {
  const t = await getTranslator();

  return (
    <PageShell
      title={t('navigation.projects')}
      image="/images/satellite.jpg"
      imagePositionY="50%"
      cardClassName="w-full overflow-hidden p-0"
      fullHeight
    >
      <Tabs
        tabs={[
          { label: t('common.current'), content: <ProjectList t={t} status="current" /> },
          { label: t('common.completed'), content: <ProjectList t={t} status="completed" /> },
        ]}
      />
    </PageShell>
  );
}
