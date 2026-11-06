import Link from 'next/link';
import { LinkButton } from '@/components/ui/CustomButton';
import { cssUrl } from '@/lib/format';
import type { Translate } from '@/lib/i18n/server';
import type { Project } from '@/lib/types';

interface ProjectsHomeProps {
  t: Translate;
  projects: Project[];
}

// Slanted "torn" tiles: the first and last are cut on one side, the middle one on both.
const TILE_SHAPES = [
  { clip: 'xs:[clip-path:polygon(0_0,75%_0,100%_100%,0%_100%)]', offset: '', title: '' },
  { clip: 'xs:[clip-path:polygon(0_0,75%_0,100%_100%,25%_100%)]', offset: 'xs:-ml-[8%]', title: 'xs:ml-[20%]' },
  { clip: 'xs:[clip-path:polygon(0_0,100%_0,100%_100%,25%_100%)]', offset: 'xs:-ml-[8%]', title: 'xs:ml-[20%]' },
] as const;

export function ProjectsHome({ t, projects }: ProjectsHomeProps) {
  const featured = projects.slice(0, TILE_SHAPES.length);

  return (
    <div className="flex flex-col justify-center">
      <header className="flex justify-between gap-[4em] p-[15px]">
        <h2 className="m-0">{t('navigation.projects')}</h2>
        <LinkButton href="/projects" text={t('projects.allProjects')} secondary />
      </header>
      <section className="flex flex-col items-center justify-center gap-[0.5em] xs:flex-row xs:gap-0">
        {featured.map((project, index) => {
          const { clip, offset, title } = TILE_SHAPES[index]!;
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              style={{ backgroundImage: cssUrl(project.mainPhoto.src) }}
              className={`relative flex h-[200px] min-h-[200px] w-full flex-1 cursor-pointer items-end justify-center bg-cover bg-center text-cosmo-s font-bold text-white transition duration-500 select-none [text-shadow:3px_4px_10px_black] before:absolute before:inset-0 before:-z-[1] before:[background:inherit] before:transition-[filter] before:duration-400 hover:scale-105 hover:shadow-elevation-3 md:text-cosmo-m md:before:blur-[2px] md:hover:before:blur-none xl:text-cosmo-xl ${clip} ${offset}`}
            >
              <h3 className={`text-center ${title}`}>{t(project.shortTitle)}</h3>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
