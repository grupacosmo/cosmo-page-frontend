import type { Achievement } from '@/lib/types';

// Placeholder content; the page is only reachable in development (as in the legacy app).
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada justo sed, ' +
  'rhoncus cursus dui. In non luctus ante. Aliquam vitae arcu euismod, volutpat erat nec, pulvinar ligula.';

export const achievements: Achievement[] = [1, 2, 3, 4, 5].map((id) => ({
  id,
  title: `Achievment title ${id}`,
  description: LOREM,
  date: '2024/02/02',
}));
