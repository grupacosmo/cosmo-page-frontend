import { EventsSkeleton } from '@/components/news/NewsSkeletons';

/** Rendered inside `app/news/layout.tsx`, so only the sheet content is a skeleton; the banner is real. */
export default function Loading() {
  return <EventsSkeleton />;
}
