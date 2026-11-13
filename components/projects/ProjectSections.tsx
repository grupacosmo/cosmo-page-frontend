import { Activity, CalendarDays, ExternalLink, User, Users } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { Section } from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import type { Translate } from '@/lib/i18n/server';
import { SHIMMER_PLACEHOLDER } from '@/lib/shimmer';
import type { Project } from '@/lib/types';

/** Sections of the project detail page; each one takes the project and the translator. */
interface SectionProps {
  t: Translate;
  project: Project;
}

const heading = 'text-xl font-semibold tracking-tight sm:text-2xl';
const prose = 'leading-relaxed text-muted-foreground';

function Photo({ src, alt, caption, eager }: { src: string; alt: string; caption?: string; eager?: boolean }) {
  return (
    <figure className="flex flex-col gap-2">
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        sizes="(max-width: 1024px) 100vw, 50vw"
        loading={eager ? 'eager' : 'lazy'}
        placeholder={SHIMMER_PLACEHOLDER}
        className="h-auto w-full rounded-xl"
      />
      {caption && <figcaption className="text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

function MetaItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-cosmo-magenta">
      {icon}
      {children}
    </li>
  );
}

function teamNames(t: Translate, project: Project): string {
  return project.teams.map((team) => t(team.name)).join(', ');
}

/** Title, summary, meta (teams, date, status, repo), main photo and full description. */
export function ProjectOverview({ t, project }: SectionProps) {
  const caption = t(project.mainPhoto.description);

  return (
    <Section className="gap-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-cosmo-magenta sm:text-4xl">{t(project.title)}</h2>
          <p className="text-lg leading-relaxed">{t(project.shortDescription)}</p>
          <ul className="flex flex-col gap-2 text-sm">
            <MetaItem icon={<Users aria-hidden="true" />}>{teamNames(t, project)}</MetaItem>
            <MetaItem icon={<CalendarDays aria-hidden="true" />}>{project.date}</MetaItem>
            <MetaItem icon={<Activity aria-hidden="true" />}>{t(`common.${project.status}`)}</MetaItem>
            {project.repository && (
              <MetaItem icon={<ExternalLink aria-hidden="true" />}>
                <a
                  href={project.repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  {project.repository.label}
                </a>
              </MetaItem>
            )}
          </ul>
        </div>
        <Photo src={project.mainPhoto.src} alt={caption} caption={caption} eager />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className={heading}>{t('projects.projectDescription')}</h3>
        <p className={prose}>{t(project.description)}</p>
      </div>
    </Section>
  );
}

export function ProjectExperiment({ t, project }: SectionProps) {
  const caption = t(project.experimentPhoto.description);

  return (
    <Section className="grid gap-8 lg:grid-cols-3 lg:gap-12">
      <div className="flex flex-col gap-3 lg:col-span-2">
        <h3 className={heading}>{t('common.experiment')}</h3>
        <p className={prose}>{t(project.experimentDescription)}</p>
      </div>
      <Photo src={project.experimentPhoto.src} alt={caption} caption={caption} />
    </Section>
  );
}

export function ProjectTeam({ t, project }: SectionProps) {
  return (
    <Section>
      <h3 className={heading}>{t('common.team')}</h3>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Photo src={project.teamPhoto} alt={teamNames(t, project)} />
        <div className="flex flex-col gap-8">
          {project.teams.map((team) => (
            <div key={team.name} className="flex flex-col gap-3">
              <h4 className="font-semibold">{t(team.name)}</h4>
              <Separator />
              <ul className="grid gap-2 text-sm sm:grid-cols-2">
                {team.members.map((member) => (
                  <li key={member} className="flex items-center gap-2">
                    <User className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
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
