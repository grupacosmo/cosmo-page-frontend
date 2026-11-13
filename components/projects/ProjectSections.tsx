import Image from 'next/image';
import type { ReactNode } from 'react';
import { Section } from '@/components/common/Container';
import { Divider } from '@/components/common/Divider';
import { Icon } from '@/components/common/Icon';
import type { Translate } from '@/lib/i18n/server';
import { SHIMMER_PLACEHOLDER } from '@/lib/shimmer';
import type { Project, ProjectPhoto } from '@/lib/types';

/** Sections of the project detail page; each one takes the project and the translator. */
interface SectionProps {
  t: Translate;
  project: Project;
}

const column = 'max-md:mx-auto max-md:flex max-md:flex-col max-md:items-center';

function Photo({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={600}
      height={400}
      sizes="(max-width: 768px) 90vw, 50vw"
      priority={priority}
      placeholder={SHIMMER_PLACEHOLDER}
      className="h-auto w-full rounded-[10px]"
    />
  );
}

function CaptionedPhoto({ photo, caption, priority }: { photo: ProjectPhoto; caption: string; priority?: boolean }) {
  return (
    <>
      <Photo src={photo.src} alt={caption} priority={priority} />
      <p className="text-left text-cosmo-xs">{caption}</p>
    </>
  );
}

function MetaItem({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <span className="flex items-center gap-[0.5em] text-black max-xs:text-cosmo-xs">
      <Image src={icon} alt="" width={24} height={24} />
      {children}
    </span>
  );
}

function teamNames(t: Translate, project: Project): string {
  return project.teams.map((team) => t(team.name)).join(', ');
}

/** Title, summary, meta (teams, date, status, repo), main photo and full description. */
export function ProjectOverview({ t, project }: SectionProps) {
  return (
    <Section>
      <div className="flex flex-col gap-[1em] md:flex-row md:gap-[3em]">
        <div className="w-full md:w-[35%] lg:w-[45%]">
          <h1 className="my-0 text-cosmo-l text-cosmo-magenta lg:text-cosmo-xl">{t(project.title)}</h1>
          <p className="mb-[2em] text-left text-cosmo-l">{t(project.shortDescription)}</p>
          <div className="flex flex-col">
            <MetaItem icon="/images/icons/team.svg">{teamNames(t, project)}</MetaItem>
            <MetaItem icon="/images/icons/date.svg">{project.date}</MetaItem>
            <MetaItem icon="/images/icons/project-status.svg">{t(`common.${project.status}`)}</MetaItem>
            {project.repository && (
              <a href={project.repository.url} target="_blank" rel="noopener noreferrer">
                <MetaItem icon="/images/icons/site.svg">{project.repository.label}</MetaItem>
              </a>
            )}
          </div>
        </div>
        <div className={`w-[90%] md:w-[65%] lg:w-1/2 ${column}`}>
          <CaptionedPhoto photo={project.mainPhoto} caption={t(project.mainPhoto.description)} priority />
        </div>
      </div>
      <div>
        <h2 className="mb-2.5">{t('projects.projectDescription')}</h2>
        <p className="text-left">{t(project.description)}</p>
      </div>
    </Section>
  );
}

export function ProjectExperiment({ t, project }: SectionProps) {
  return (
    <Section>
      <div className="flex flex-col gap-[1em] md:flex-row md:gap-[3em]">
        <div className="w-full md:w-[60%] lg:w-[70%]">
          <h2 className="mb-2.5">{t('common.experiment')}</h2>
          <p className="text-left">{t(project.experimentDescription)}</p>
        </div>
        <div className={`w-[60%] md:w-[40%] lg:w-[30%] ${column}`}>
          <CaptionedPhoto photo={project.experimentPhoto} caption={t(project.experimentPhoto.description)} />
        </div>
      </div>
    </Section>
  );
}

export function ProjectTeam({ t, project }: SectionProps) {
  return (
    <Section>
      <h2 className="mb-2.5">{t('common.team')}</h2>
      <div className="flex flex-col gap-[1em] md:flex-row md:gap-[3em]">
        <div className={`w-[90%] md:w-[60%] lg:w-1/2 ${column}`}>
          <Photo src={project.teamPhoto} alt={teamNames(t, project)} />
        </div>
        <div className="w-full md:w-[40%] lg:w-1/2">
          {project.teams.map((team) => (
            <div key={team.name}>
              <h3>{t(team.name)}</h3>
              <Divider tone="current" weight="thin" className="my-[1em]" />
              <ul className="grid grid-cols-1 justify-start gap-2.5 lg:grid-cols-2">
                {team.members.map((member) => (
                  <li key={member} className="flex items-center gap-2.5 text-left">
                    <Icon name="person" />
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
