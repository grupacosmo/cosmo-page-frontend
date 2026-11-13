import { useTranslations } from 'next-intl';
import { ProjectDetailPageSkeleton } from '@/components/projects/ProjectSkeletons';

export default function Loading() {
  const t = useTranslations();
  return <ProjectDetailPageSkeleton title={t('navigation.projects')} />;
}
