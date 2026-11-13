/**
 * Banner settings per subpage. Pages and their loading skeletons both read them from here, so a
 * skeleton always shows the same banner as the page it stands in for.
 */
export const BANNERS = {
  projects: { image: '/images/satellite.jpg', imagePositionY: '50%' },
  team: { image: '/images/night-sky.jpeg', imagePositionY: '70%' },
  news: { image: '/images/night-sky.jpeg', imagePositionY: '70%' },
  achievements: { image: '/images/rocket.jpg', imagePositionY: '50%' },
} as const;

export type BannerKey = keyof typeof BANNERS;
