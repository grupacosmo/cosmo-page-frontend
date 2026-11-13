import { CardCarouselSkeleton, LoadingRegion } from '@/components/common/Skeleton';
import { PageShell } from '@/components/layout/PageShell';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { teams } from '@/lib/data/team';
import { BANNERS } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { memberAvatarSize, memberCardBox } from './MemberCard';
import { teamNav, teamNavItem } from './TeamNav';

/** The widest carousel layout shows five members; more placeholders would only be clipped. */
const MAX_VISIBLE_MEMBERS = 5;

function MemberCardSkeleton() {
  return (
    <Card className={memberCardBox}>
      <Skeleton className={cn('shrink-0 rounded-full', memberAvatarSize)} />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </Card>
  );
}

/**
 * Mirrors the team page block for block. Team names and sizes are static data, so the skeleton has
 * exactly as many chips and rows as the page: nothing moves when the real content replaces it.
 */
export function TeamPageSkeleton({ title }: { title?: string }) {
  return (
    <PageShell title={title} {...BANNERS.team}>
      <LoadingRegion className="flex flex-col gap-10 sm:gap-12">
        <div className={teamNav}>
          {teams.map(({ team }) => (
            // The hidden label gives each placeholder the exact width of its chip.
            <Skeleton key={team} className={cn(teamNavItem, 'rounded-lg border border-transparent')}>
              <span className="invisible">{team}</span>
            </Skeleton>
          ))}
        </div>
        {teams.map(({ team, members }) => (
          <CardCarouselSkeleton key={team} layout="people">
            {Array.from({ length: Math.min(members.length, MAX_VISIBLE_MEMBERS) }, (_, i) => (
              <MemberCardSkeleton key={i} />
            ))}
          </CardCarouselSkeleton>
        ))}
      </LoadingRegion>
    </PageShell>
  );
}
