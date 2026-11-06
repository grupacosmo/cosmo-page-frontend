import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { MemberCard } from '@/components/team/MemberCard';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { teams } from '@/lib/data/team';
import { getTranslator } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  return { title: `${t('common.team')} | Cosmo PK` };
}

export default async function TeamPage() {
  const t = await getTranslator();

  return (
    <PageShell
      title={t('common.team')}
      image="/images/night-sky.jpeg"
      imagePositionY="70%"
      cardClassName="flex flex-col p-5"
    >
      <nav className="mb-[30px] flex w-full flex-wrap justify-center gap-5 self-center p-5 text-[24px] font-bold">
        {teams.map(({ team }) => (
          <ScrollLink
            key={team}
            targetId={team}
            className="flex basis-0 cursor-pointer items-center justify-center px-[25px] py-[5px] text-cosmo-magenta-light transition-colors duration-200 hover:text-cosmo-magenta max-md:grow"
          >
            {team}
          </ScrollLink>
        ))}
      </nav>

      {teams.map(({ team, members }) => (
        <div key={team}>
          <h1 id={team} className="text-center">
            {team}
          </h1>
          <section className="my-[2em] flex flex-wrap content-center justify-center gap-6">
            {members.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </section>
        </div>
      ))}
    </PageShell>
  );
}
