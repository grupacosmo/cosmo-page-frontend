import { createCn } from 'cn/config';

/**
 * Class-name merger (clsx + tailwind-merge semantics) that knows the Cosmo theme tokens from
 * `app/globals.css`. Without this, `text-cosmo-m` is mistaken for a text colour (dropping e.g.
 * `text-white`) and `shadow-elevation-*` doesn't override shadcn's default shadows.
 *
 * Always import `cn` from here, never from the `cn` package directly (enforced by ESLint).
 */
export const cn = createCn({
  extend: {
    classGroups: {
      'font-size': [{ text: ['cosmo-xs', 'cosmo-s', 'cosmo-m', 'cosmo-l', 'cosmo-xl'] }],
      shadow: [{ shadow: ['elevation-2', 'elevation-3', 'elevation-5', 'elevation-6', 'content'] }],
    },
  },
});
