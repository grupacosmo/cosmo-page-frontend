'use client';

import { usePathname } from 'next/navigation';
import { AchievementsPageSkeleton } from '@/components/achievements/AchievementsSkeleton';
import { HomeSkeleton } from '@/components/home/HomeSkeleton';
import { EventDetailPageSkeleton, NewsPageSkeleton } from '@/components/news/NewsSkeletons';
import { ProjectDetailPageSkeleton, ProjectsPageSkeleton } from '@/components/projects/ProjectSkeletons';
import { TeamPageSkeleton } from '@/components/team/TeamSkeleton';

/**
 * Skeleton of the page at the current URL. Used while the language switches, when the whole page
 * re-renders on the server; titles are shimmer bars too, since they are about to change language.
 * Route-level loading (navigation) uses the same skeletons through each route's `loading.tsx`.
 */
export function RouteSkeleton() {
  const [section, detail] = usePathname().split('/').filter(Boolean);

  switch (section) {
    case undefined:
      return <HomeSkeleton />;
    case 'projects':
      return detail ? <ProjectDetailPageSkeleton /> : <ProjectsPageSkeleton />;
    case 'news':
      return detail ? <EventDetailPageSkeleton /> : <NewsPageSkeleton />;
    case 'team':
      return <TeamPageSkeleton />;
    case 'achievements':
      return <AchievementsPageSkeleton />;
    default:
      return <HomeSkeleton />;
  }
}
