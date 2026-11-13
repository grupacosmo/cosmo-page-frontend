import { CardCarousel } from '@/components/common/CardCarousel';
import { ProjectCard } from '@/components/projects/ProjectCard';
import type { Translate } from '@/lib/i18n/server';
import type { Project } from '@/lib/types';

/** All projects in one swipeable row, with a link to the full list. */
export function ProjectsHome({ t, projects }: { t: Translate; projects: Project[] }) {
  return (
    <CardCarousel
      title={t('navigation.projects')}
      layout="cards"
      action={{ href: '/projects', label: t('projects.allProjects') }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} t={t} project={project} />
      ))}
    </CardCarousel>
  );
}
