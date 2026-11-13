import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CardGrid, Section, SectionHeader } from '@/components/common/Container';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import type { Translate } from '@/lib/i18n/server';
import type { Project } from '@/lib/types';

const FEATURED_COUNT = 3;

/** Teaser of the first few projects with a link to the full list. */
export function ProjectsHome({ t, projects }: { t: Translate; projects: Project[] }) {
  return (
    <Section>
      <SectionHeader
        title={t('navigation.projects')}
        action={
          <Button asChild variant="ghost">
            <Link href="/projects">
              {t('projects.allProjects')}
              <ArrowRight />
            </Link>
          </Button>
        }
      />
      <CardGrid>
        {projects.slice(0, FEATURED_COUNT).map((project) => (
          <ProjectCard key={project.id} t={t} project={project} />
        ))}
      </CardGrid>
    </Section>
  );
}
