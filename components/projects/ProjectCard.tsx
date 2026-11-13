import { CalendarDays, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Translate } from '@/lib/i18n/server';
import { SHIMMER_PLACEHOLDER } from '@/lib/shimmer';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  t: Translate;
  project: Project;
}

/** Project teaser: photo with the status, title, summary, team and date. The whole card is a link. */
export function ProjectCard({ t, project }: ProjectCardProps) {
  const team = project.teams[0];

  return (
    <Card className="group relative h-full pt-0 transition-shadow hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={project.mainPhoto.src}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder={SHIMMER_PLACEHOLDER}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge variant="secondary" className="absolute top-3 left-3">
          {t(`common.${project.status}`)}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle>
          <Link href={`/projects/${project.id}`} className="outline-none after:absolute after:inset-0">
            {t(project.title)}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-4">{t(project.cardDescription)}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
        {team && (
          <span className="flex items-center gap-1.5">
            <Users className="size-4 shrink-0" aria-hidden="true" />
            {t(team.name)}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
          {project.date}
        </span>
      </CardFooter>
    </Card>
  );
}
