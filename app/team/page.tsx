import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/common/Container';
import { ScrollLink } from '@/components/common/ScrollLink';
import { PageShell } from '@/components/layout/PageShell';
import { MemberCard, memberGrid } from '@/components/team/MemberCard';
import { Button } from '@/components/ui/button';
import { teams } from '@/lib/data/team';
import { BANNERS } from '@/lib/routes';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: `${t('common.team')} | Cosmo PK` };
}

export default async function TeamPage() {
  const t = await getTranslations();

  return (
    <PageShell title={t('common.team')} {...BANNERS.team}>
      <nav aria-label={t('common.team')} className="flex flex-wrap gap-2">
        {teams.map(({ team }) => (
          <Button key={team} asChild variant="outline">
            <ScrollLink targetId={team}>{team}</ScrollLink>
          </Button>
        ))}
      </nav>

      {teams.map(({ team, members }) => (
        <Section key={team} id={team}>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{team}</h2>
          <ul className={memberGrid}>
            {members.map((member) => (
              <li key={member.name}>
                <MemberCard member={member} />
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </PageShell>
  );
}
