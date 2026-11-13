import Image from 'next/image';
import Link from 'next/link';
import { CtaLink } from '@/components/common/CtaButton';
import { Surface } from '@/components/common/Surface';
import { SHIMMER_PLACEHOLDER } from '@/lib/shimmer';
import type { Translate } from '@/lib/i18n/server';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  t: Translate;
  project: Project;
}

export function ProjectCard({ t, project }: ProjectCardProps) {
  const href = `/projects/${project.id}`;

  return (
    <div className="flex w-full items-center justify-center text-cosmo-m">
      <Surface
        asChild
        radius="corner"
        elevation="raised"
        interactive="lift"
        className="relative flex w-[70%] flex-col md:w-[90%] md:flex-row md:gap-[1em] lg:gap-[2em]"
      >
        <article>
          {/* On tablet/desktop the whole card is clickable; on mobile only the button navigates. */}
          <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0 hidden md:block" />

          <div className="relative min-h-[250px] w-full md:w-1/2 md:scale-[1.03] md:[clip-path:polygon(0_0,70%_0,100%_100%,0%_100%)] lg:w-[35%]">
            <Image
              src={project.mainPhoto.src}
              alt=""
              fill
              sizes="(max-width: 768px) 70vw, (max-width: 1024px) 45vw, 30vw"
              placeholder={SHIMMER_PLACEHOLDER}
              className="object-cover"
            />
          </div>

          <div className="flex w-full flex-col justify-between gap-[1em] p-[1em] md:my-[1em] md:w-[40%] md:p-0 md:text-cosmo-m lg:w-[55%] lg:text-cosmo-l">
            <div>
              <h3 className="m-0 text-cosmo-l text-cosmo-magenta max-xs:text-center lg:text-cosmo-xl">{t(project.title)}</h3>
              <p className="max-h-[150px] overflow-auto text-left max-xs:text-center">{t(project.cardDescription)}</p>
            </div>
            <div className="flex flex-row gap-[1em] max-xs:flex-col max-xs:text-cosmo-s lg:gap-[3em]">
              <div className="flex items-center gap-[0.5em]">
                <Image src="/images/icons/team.svg" alt="" width={24} height={24} />
                {t(project.teams[0]?.name ?? '')}
              </div>
              <div className="flex items-center gap-[0.5em]">
                <Image src="/images/icons/date.svg" alt="" width={24} height={24} />
                {project.date}
              </div>
            </div>
          </div>

          <div className="relative m-[1em] flex items-start justify-center">
            <Link href={href} aria-label={t(project.title)} className="hidden md:block">
              <Image
                src="/images/icons/more.svg"
                alt=""
                width={40}
                height={40}
                className="transition duration-300 hover:scale-150 hover:rotate-180"
              />
            </Link>
            <CtaLink href={href} text={t('common.readMore')} secondary className="md:hidden" />
          </div>
        </article>
      </Surface>
    </div>
  );
}
