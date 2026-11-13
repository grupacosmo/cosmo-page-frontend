import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CardCarousel } from '@/components/common/CardCarousel';
import { PageShell } from '@/components/layout/PageShell';
import { MemberCard } from '@/components/team/MemberCard';
import { TeamNav } from '@/components/team/TeamNav';
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
      <TeamNav teams={teams} label={t('common.team')} />

      {/* One fixed-height row per team: larger teams page sideways instead of growing the page. */}
      {teams.map(({ team, members }) => (
        <CardCarousel key={team} id={team} title={team} layout="people">
          {members.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </CardCarousel>
      ))}
    </PageShell>
  );
}
