/** CSS `url()` value with the URL safely quoted. */
export function cssUrl(src: string): string {
  return `url(${JSON.stringify(src)})`;
}

export function truncate(value: string, limit: number, trail = '...'): string {
  return value.length > limit ? value.substring(0, limit) + trail : value;
}
