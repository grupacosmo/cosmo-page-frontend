import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/PageShell';
import { ProjectExperiment, ProjectOverview, ProjectTeam } from '@/components/projects/ProjectSections';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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

  return (
    <PageShell title={t('navigation.projects')} {...BANNERS.projects}>
      <div className="flex flex-col gap-6">
        <Button asChild variant="ghost" className="-ml-2.5 self-start">
          <Link href="/projects">
            <ArrowLeft />
            {t('projects.allProjects')}
          </Link>
        </Button>
        {project ? (
          <ProjectOverview t={t} project={project} />
        ) : (
          <p role="alert">{t('common.unexpectedErrorOccured')}</p>
        )}
      </div>
      {project && (
        <>
          <Separator />
          <ProjectExperiment t={t} project={project} />
          <Separator />
          <ProjectTeam t={t} project={project} />
        </>
      )}
    </PageShell>
  );
}
