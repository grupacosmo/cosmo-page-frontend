import { ScrollLink } from '@/components/common/ScrollLink';
import { Button } from '@/components/ui/button';
import type { TeamGroup } from '@/lib/types';

/** Layout of the chip row and the box of one chip, shared with the page skeleton. */
export const teamNav = 'flex flex-wrap gap-2';
/** Chips are 40px tall on phones (comfortable to tap) and 36px from tablets up. */
export const teamNavItem = 'inline-flex h-10 items-center px-4 text-sm sm:h-9';

/** Chips that jump to a team's row. */
export function TeamNav({ teams, label }: { teams: TeamGroup[]; label: string }) {
  return (
    <nav aria-label={label} className={teamNav}>
      {teams.map(({ team }) => (
        <Button key={team} asChild variant="outline" className={teamNavItem}>
          <ScrollLink targetId={team}>{team}</ScrollLink>
        </Button>
      ))}
    </nav>
  );
}
