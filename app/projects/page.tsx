import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CardGrid } from '@/components/common/Container';
import { ContentTabs } from '@/components/common/Tabs';
import { PageShell } from '@/components/layout/PageShell';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getProjectsByStatus } from '@/lib/data/projects';
import type { Translate } from '@/lib/i18n/server';
import { BANNERS } from '@/lib/routes';
import type { ProjectStatus } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: `${t('navigation.projects')} | Cosmo PK` };
}

function ProjectList({ t, status }: { t: Translate; status: ProjectStatus }) {
  return (
    <CardGrid>
      {getProjectsByStatus(status).map((project) => (
        <ProjectCard key={project.id} t={t} project={project} />
      ))}
    </CardGrid>
  );
}

export default async function ProjectsPage() {
  const t = await getTranslations();

  return (
    <PageShell title={t('navigation.projects')} {...BANNERS.projects}>
      <ContentTabs
        tabs={[
          { value: 'current', label: t('common.current'), content: <ProjectList t={t} status="current" /> },
          { value: 'completed', label: t('common.completed'), content: <ProjectList t={t} status="completed" /> },
        ]}
      />
    </PageShell>
  );
}
