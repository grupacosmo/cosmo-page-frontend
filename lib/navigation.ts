import type { NavItem } from '@/components/layout/Header';
import type { Translate } from '@/lib/i18n/server';

/** The achievements page holds placeholder content and is only enabled in development. */
export const ACHIEVEMENTS_ENABLED = process.env.NODE_ENV === 'development';

export function getHeaderItems(t: Translate): NavItem[] {
  return [
    { href: '/', label: t('navigation.home') },
    { href: '/projects', label: t('navigation.projects') },
    { href: '/team', label: t('common.team') },
    { href: '/news', label: t('navigation.news') },
    ...(ACHIEVEMENTS_ENABLED ? [{ href: '/achievements', label: t('navigation.achievements') }] : []),
  ];
}

export function getFooterItems(t: Translate): NavItem[] {
  return [
    { href: '/', label: t('navigation.home') },
    { href: '/news', label: t('navigation.news') },
    { href: '/team', label: t('navigation.team') },
    { href: '/projects', label: t('navigation.projects') },
  ];
}
