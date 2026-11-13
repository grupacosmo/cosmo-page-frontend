import { useTranslations } from 'next-intl';
import { ProjectsPageSkeleton } from '@/components/projects/ProjectSkeletons';

export default function Loading() {
  const t = useTranslations();
  return <ProjectsPageSkeleton title={t('navigation.projects')} />;
}
