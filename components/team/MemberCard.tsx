import Image from 'next/image';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SHIMMER_PLACEHOLDER } from '@/lib/shimmer';
import type { TeamMember } from '@/lib/types';

/**
 * Box of a member card, shared with its skeleton. The height is fixed (photo, two lines of name and
 * the lines of roles the clamps below allow), so every card and every team row is the same size.
 */
export const memberCardBox = 'h-64 w-full items-center gap-3 px-3 py-6 text-center sm:px-4';
/** Photo size; slightly smaller on phones, where two cards share the row and roles need a fourth line. */
export const memberAvatarSize = 'size-20 sm:size-24';

/** Wrapped in a span: a bare `<img>` as a card's first child would pick up the card's cover-image styles. */
function Avatar({ member, className }: { member: TeamMember; className: string }) {
  return (
    <span className={`shrink-0 overflow-hidden rounded-full bg-muted ${className}`}>
      <Image
        src={member.image}
        alt=""
        width={96}
        height={96}
        placeholder={SHIMMER_PLACEHOLDER}
        className="size-full object-cover"
      />
    </span>
  );
}

function MemberSummary({ member }: { member: TeamMember }) {
  return (
    <>
      <Avatar member={member} className={memberAvatarSize} />
      <span className="flex flex-col gap-1">
        <span className="line-clamp-2 text-base font-medium text-balance">{member.name}</span>
        <span className="line-clamp-4 text-xs text-balance text-cosmo-magenta-light sm:line-clamp-3">
          {member.roles.join(' · ')}
        </span>
      </span>
    </>
  );
}

/** Photo, name and roles; members with a bio open it in a dialog. */
export function MemberCard({ member }: { member: TeamMember }) {
  if (member.description.length === 0) {
    return (
      <Card className={memberCardBox}>
        <MemberSummary member={member} />
      </Card>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          asChild
          className={`${memberCardBox} transition-shadow outline-none hover:shadow-lg focus-visible:ring-3 focus-visible:ring-ring/50`}
        >
          <button type="button">
            <MemberSummary member={member} />
          </button>
        </Card>
      </DialogTrigger>
      <DialogContent className="gap-6 p-6 sm:max-w-lg">
        <DialogHeader className="flex-row items-center gap-4 pr-8 text-left">
          <Avatar member={member} className="size-16" />
          <div className="flex flex-col gap-1">
            <DialogTitle className="leading-snug">{member.name}</DialogTitle>
            <DialogDescription className="text-cosmo-magenta-light">{member.roles.join(' · ')}</DialogDescription>
          </div>
        </DialogHeader>
        <p className="max-h-[60dvh] overflow-y-auto leading-relaxed">{member.description}</p>
      </DialogContent>
    </Dialog>
  );
}
