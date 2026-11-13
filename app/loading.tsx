import { HomeSkeleton } from '@/components/home/HomeSkeleton';

/** Shown while the homepage (and any route without its own `loading.tsx`) streams in. */
export default function Loading() {
  return <HomeSkeleton />;
}
