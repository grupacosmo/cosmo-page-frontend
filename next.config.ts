import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

/**
 * How long the browser keeps a page it has already loaded or prefetched (Next.js client cache).
 *
 * Every route is rendered per request (the language comes from a cookie), and by default Next.js
 * does not cache such pages on the client: each navigation went back to the server and flashed the
 * route's `loading.tsx` skeleton, even for a page seen seconds ago. With this window, a page that is
 * already in the cache renders instantly with no skeleton; the skeleton only shows on a real first
 * fetch. Switching the language sets a cookie in a Server Action, which clears the cache, so pages
 * are never served in the old language.
 *
 * Trade-off: an open tab can show content up to this old. Fine while content only changes with a
 * deploy; lower it once pages show frequently changing backend data.
 */
const CLIENT_CACHE_SECONDS = 30 * 60;

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  // Automatic memoization of client components (replaces hand-written useMemo/useCallback/memo).
  reactCompiler: true,
  experimental: {
    staleTimes: { dynamic: CLIENT_CACHE_SECONDS, static: CLIENT_CACHE_SECONDS },
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
