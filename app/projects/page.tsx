import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { BANNERS } from '@/lib/routes';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { CosmoTabs } from '@/components/common/Tabs';
import { getProjectsByStatus } from '@/lib/data/projects';
import { getTranslations } from 'next-intl/server';
import type { Translate } from '@/lib/i18n/server';
import type { ProjectStatus } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
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
  const t = await getTranslations();

  return (
    <PageShell
      title={t('navigation.projects')}
      {...BANNERS.projects}
      cardClassName="w-full overflow-hidden p-0"
      fullHeight
    >
      <CosmoTabs
        tabs={[
          { value: 'current', label: t('common.current'), content: <ProjectList t={t} status="current" /> },
          { value: 'completed', label: t('common.completed'), content: <ProjectList t={t} status="completed" /> },
        ]}
      />
    </PageShell>
  );
}
