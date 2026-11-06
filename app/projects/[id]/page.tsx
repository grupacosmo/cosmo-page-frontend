import type { Metadata } from 'next';
import Image from 'next/image';
import { PageShell } from '@/components/layout/PageShell';
import { LinkButton } from '@/components/ui/CustomButton';
import { Divider } from '@/components/ui/Divider';
import { Icon } from '@/components/ui/Icon';
import { getProject } from '@/lib/data/projects';
import { getTranslator } from '@/lib/i18n/server';
import type { ProjectPhoto } from '@/lib/types';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const [{ id }, t] = await Promise.all([params, getTranslator()]);
  const project = getProject(id);
  return { title: project ? `${t(project.title)} | Cosmo PK` : 'Cosmo PK' };
}

function Photo({ photo, caption }: { photo: ProjectPhoto; caption: string }) {
  return (
    <>
      <Image
        src={photo.src}
        alt={caption}
        width={600}
        height={400}
        sizes="(max-width: 768px) 90vw, 50vw"
        className="h-auto w-full rounded-[10px]"
      />
      <p className="text-left text-cosmo-xs">{caption}</p>
    </>
  );
}

function MetaItem({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-[0.5em] text-black max-xs:text-cosmo-xs">
      <Image src={icon} alt="" width={24} height={24} />
      {children}
    </span>
  );
}

const column = 'max-md:mx-auto max-md:flex max-md:flex-col max-md:items-center';

export default async function ProjectPage({ params }: ProjectPageProps) {
  const [{ id }, t] = await Promise.all([params, getTranslator()]);
  const project = getProject(id);

  if (!project) {
    return (
      <PageShell title={t('navigation.projects')} image="/images/satellite.jpg" imagePositionY="50%" fullHeight>
        <section className="my-[2em]">{t('common.unexpectedErrorOccured')}</section>
      </PageShell>
    );
  }

  const teamNames = project.teams.map((team) => t(team.name)).join(', ');

  return (
    <PageShell
      title={t('navigation.projects')}
      image="/images/satellite.jpg"
      imagePositionY="50%"
      cardClassName="overflow-hidden px-5 py-5 lg:px-[60px]"
      fullHeight
    >
      <section className="my-[2em]">
        <LinkButton href="/projects" text={t('projects.allProjects')} secondary back />
      </section>

      <section className="my-[2em]">
        <div className="flex flex-col gap-[1em] md:flex-row md:gap-[3em]">
          <div className="w-full md:w-[35%] lg:w-[45%]">
            <h1 className="my-0 text-cosmo-l text-cosmo-magenta lg:text-cosmo-xl">{t(project.title)}</h1>
            <p className="mb-[2em] text-left text-cosmo-l">{t(project.shortDescription)}</p>
            <div className="flex flex-col">
              <MetaItem icon="/images/icons/team.svg">{teamNames}</MetaItem>
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
            <Photo photo={project.mainPhoto} caption={t(project.mainPhoto.description)} />
          </div>
        </div>
        <div>
          <h2 className="mb-2.5">{t('projects.projectDescription')}</h2>
          <p className="text-left">{t(project.description)}</p>
        </div>
      </section>

      <Divider />

      <section className="my-[2em]">
        <div className="flex flex-col gap-[1em] md:flex-row md:gap-[3em]">
          <div className="w-full md:w-[60%] lg:w-[70%]">
            <h2 className="mb-2.5">{t('common.experiment')}</h2>
            <p className="text-left">{t(project.experimentDescription)}</p>
          </div>
          <div className={`w-[60%] md:w-[40%] lg:w-[30%] ${column}`}>
            <Photo photo={project.experimentPhoto} caption={t(project.experimentPhoto.description)} />
          </div>
        </div>
      </section>

      <Divider />

      <section className="my-[2em]">
        <h2 className="mb-2.5">{t('common.team')}</h2>
        <div className="flex flex-col gap-[1em] md:flex-row md:gap-[3em]">
          <div className={`w-[90%] md:w-[60%] lg:w-1/2 ${column}`}>
            <Image
              src={project.teamPhoto}
              alt={teamNames}
              width={600}
              height={400}
              sizes="(max-width: 768px) 90vw, 50vw"
              className="h-auto w-full rounded-[10px]"
            />
          </div>
          <div className="w-full md:w-[40%] lg:w-1/2">
            {project.teams.map((team) => (
              <div key={team.name}>
                <h3>{t(team.name)}</h3>
                <hr className="my-[1em]" />
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
      </section>
    </PageShell>
  );
}
