import { useTranslations } from 'next-intl';
import { AchievementsPageSkeleton } from '@/components/achievements/AchievementsSkeleton';

export default function Loading() {
  const t = useTranslations();
  return <AchievementsPageSkeleton title={t('navigation.achievements')} />;
}
