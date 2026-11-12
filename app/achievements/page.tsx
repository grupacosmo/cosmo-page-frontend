import { notFound } from 'next/navigation';
import { AchievementGrid } from '@/components/achievements/AchievementGrid';
import { PageShell } from '@/components/layout/PageShell';
import { achievements } from '@/lib/data/achievements';
import { getTranslations } from 'next-intl/server';
import { ACHIEVEMENTS_ENABLED } from '@/lib/navigation';

export default async function AchievementsPage() {
  if (!ACHIEVEMENTS_ENABLED) notFound();
  const t = await getTranslations();

  return (
    <PageShell
      title={t('navigation.achievements')}
      image="/images/rocket.jpg"
      imagePositionY="50%"
      cardClassName="p-0"
    >
      <AchievementGrid achievements={achievements} />
    </PageShell>
  );
}
