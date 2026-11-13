import { useTranslations } from 'next-intl';
import { TeamPageSkeleton } from '@/components/team/TeamSkeleton';

export default function Loading() {
  const t = useTranslations();
  return <TeamPageSkeleton title={t('common.team')} />;
}
