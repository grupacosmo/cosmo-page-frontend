import Image from 'next/image';
import type { TeamMember } from '@/lib/types';

/** Shows photo, name and roles; flips to the bio on hover when one exists. */
export function MemberCard({ member }: { member: TeamMember }) {
  const hasBio = member.description.length > 0;

  return (
    <div
      tabIndex={hasBio ? 0 : undefined}
      className="group relative flex h-[330px] w-[min(calc(100vw-200px),250px)] flex-col p-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] outline-none"
    >
      <div
        className={`absolute inset-[15px] flex flex-col items-center gap-2.5 transition-opacity duration-300 ease-in-out ${
          hasBio ? 'group-hover:opacity-0 group-focus-visible:opacity-0' : ''
        }`}
      >
        <Image
          src={member.image}
          alt={member.name}
          width={180}
          height={180}
          className="size-[180px] rounded-full object-cover"
        />
        <h3 className="text-center text-[20px] font-bold">{member.name}</h3>
        <div>
          {member.roles.map((role) => (
            <p key={role} className="text-center text-cosmo-m font-bold text-cosmo-magenta-light">
              {role}
            </p>
          ))}
        </div>
      </div>
      {hasBio && (
        <p className="z-[1] overflow-x-hidden overflow-y-auto text-center text-cosmo-m opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100">
          {member.description}
        </p>
      )}
    </div>
  );
}
