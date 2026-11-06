import type { Partner, SlideImage, SocialLink } from '@/lib/types';

export const JOIN_FORM_URL = 'https://forms.gle/TvgdyiFCgxRbrSQ48';
export const CONTACT_EMAIL = 'kolocosmopk@gmail.com';
export const CONTACT_ADDRESS = 'Warszawska 24, Kraków';

const SOCIAL = '/images/social-media';

export const socialLinks: SocialLink[] = [
  { name: 'Facebook', url: 'https://www.facebook.com/cosmopk.kn', icon: `${SOCIAL}/fb.png` },
  { name: 'X', url: 'https://x.com/pkcosmopk', icon: `${SOCIAL}/x.png` },
  { name: 'GitHub', url: 'https://github.com/grupacosmo', icon: `${SOCIAL}/gh.png` },
  { name: 'Instagram', url: 'https://www.instagram.com/cosmopk_kn/', icon: `${SOCIAL}/ig.png` },
];

export const partners: Partner[] = [
  {
    name: 'Wydział Informatyki i Matematyki PK',
    logo: { src: '/images/wiim-partner.png', width: 1259, height: 426 },
    url: 'https://it.pk.edu.pl/',
  },
  {
    name: 'Luxonis',
    logo: { src: '/images/lux-on-js-logo.jpeg', width: 1200, height: 404 },
    url: 'https://www.luxonis.com/',
  },
  {
    name: 'FutureLab PK',
    logo: { src: '/images/future-lab-logo.png', width: 1920, height: 685 },
    url: 'https://futurelab.pk.edu.pl/',
  },
  {
    name: 'Politechnika Krakowska',
    logo: { src: '/images/pk-logo.jpg', width: 472, height: 107 },
    url: 'https://www.pk.edu.pl/index.php?lang=pl',
  },
  {
    name: 'Botland',
    logo: { src: '/images/botland-logo.png', width: 1711, height: 391 },
    url: 'https://botland.com.pl/',
  },
];

export const aboutUsSlides: SlideImage[] = Array.from({ length: 4 }, (_, index) => ({
  src: '/images/about-us-photo.jpg',
  alt: `Cosmo PK ${index + 1}`,
  width: 2048,
  height: 1536,
}));
