import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CtaLink } from '@/components/common/CtaButton';
import { Section } from '@/components/common/Container';
import { Divider } from '@/components/common/Divider';
import { PageShell } from '@/components/layout/PageShell';
import { ProjectExperiment, ProjectOverview, ProjectTeam } from '@/components/projects/ProjectSections';
import { getProject } from '@/lib/data/projects';
import { BANNERS } from '@/lib/routes';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const [{ id }, t] = await Promise.all([params, getTranslations()]);
  const project = getProject(id);
  return { title: project ? `${t(project.title)} | Cosmo PK` : 'Cosmo PK' };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const [{ id }, t] = await Promise.all([params, getTranslations()]);
  const project = getProject(id);

  if (!project) {
    return (
      <PageShell title={t('navigation.projects')} {...BANNERS.projects} fullHeight>
        <Section>{t('common.unexpectedErrorOccured')}</Section>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={t('navigation.projects')}
      {...BANNERS.projects}
      cardClassName="overflow-hidden px-5 py-5 lg:px-[60px]"
      fullHeight
    >
      <Section>
        <CtaLink href="/projects" text={t('projects.allProjects')} secondary back />
      </Section>
      <ProjectOverview t={t} project={project} />
      <Divider />
      <ProjectExperiment t={t} project={project} />
      <Divider />
      <ProjectTeam t={t} project={project} />
    </PageShell>
  );
}
