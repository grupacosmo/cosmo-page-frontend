const PLACEHOLDER_IMAGE = '/images/cosmo-logo-placeholder.png';

export function postImage(src?: string): string {
  return src || PLACEHOLDER_IMAGE;
}

/** CSS `url()` value with the URL safely quoted. */
export function cssUrl(src: string): string {
  return `url(${JSON.stringify(src)})`;
}

export function truncate(value: string, limit: number, trail = '...'): string {
  return value.length > limit ? value.substring(0, limit) + trail : value;
}

/** Formats an API date like Angular's `medium` / `mediumDate` pipes (en-US). */
export function formatDate(value: string | undefined, withTime: boolean): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    ...(withTime ? { timeStyle: 'medium' } : {}),
  }).format(date);
}
