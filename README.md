# Cosmo PK – website

Website of the Cosmo PK student scientific club (Kraków University of Technology).

**Stack:** Next.js (App Router) · React · TypeScript (strict) · Tailwind CSS v4 · pnpm · Node.js 26 LTS

## Quick start (Docker)

Requires only Docker with Compose v2.

```bash
docker compose up --build    # http://localhost:3000
```

Optional: `cp .env.example .env` and set `COSMO_API_KEY` / `COSMO_API_URL` / `FRONTEND_PORT`.
By default the container talks to a backend on your host at `http://host.docker.internal:8080`.
Stop with `docker compose down`. New services (e.g. the backend) go in `compose.yaml`.

## Local development

Requires Node.js 26.13.0+ (see `.nvmrc`, e.g. `nvm use`). Node 25+ no longer ships Corepack, so
install it once with `npm i -g corepack && corepack enable` (or install pnpm 10 directly).

```bash
cp .env.example .env.local   # fill in the API key
pnpm install
pnpm dev                     # http://localhost:3000
```

| Script           | Purpose                       |
| ---------------- | ----------------------------- |
| `pnpm dev`       | Development server            |
| `pnpm build`     | Production build (standalone) |
| `pnpm start`     | Serve the production build    |
| `pnpm lint`      | ESLint                        |
| `pnpm typecheck` | TypeScript check              |
| `pnpm i18n:check`| Translation coverage report   |

## Configuration

| Variable        | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `COSMO_API_URL` | Base URL of the Cosmo backend (default `http://localhost:8080`) |
| `COSMO_API_KEY` | Key sent in the `apiKey` header to the backend                |

Both are **server-only**: news is fetched in Server Components (`lib/api.ts`), so the key never
reaches the browser. Do not prefix them with `NEXT_PUBLIC_`. In Docker they are passed at runtime
(`.env` via `compose.yaml`, or `--env-file`), never as build arguments.

## Project structure

```
app/                     routes (App Router)
  layout.tsx             header, footer, locale, NextIntlClientProvider, language-switch skeletons
  page.tsx               homepage
  **/loading.tsx         per-route shimmer skeletons, shown while a route streams in
  projects/              list (tabs) + [id] details
  news/                  events: list (?tab=upcoming|past&page=N&size=3|6|12) + [slug] details
  team/                  team members
  achievements/          placeholder page, development only
components/
  ui/                    shadcn/ui primitives (generated, themed) — button, card, tabs, dialog…
  common/                Cosmo building blocks on top of ui/ (see below)
  layout/                Header, Footer, LanguagePicker, PageShell, LocaleTransition, RouteSkeleton
  home/ news/ projects/ team/ achievements/   feature components + their *Skeleton(s).tsx
lib/
  events.ts              server-only event access layer (cached per request with React.cache)
  eventsQuery.ts         tabs, page sizes, pagination and URL params (client-safe)
  routes.ts              banner image per subpage (shared by pages and their skeletons)
  shimmer.ts             SVG shimmer used as the placeholder of lazily loaded photos
  hooks/                 useScrolled (sticky header), useSwipe (slider)
  data/                  static content (events, projects, team, partners…)
  i18n/                  next-intl request config, locales, setLocale action
  api.ts                 server-only backend client (for the future backend)
  utils.ts               theme-aware `cn()` class merger
messages/<locale>/       translations, one JSON file per namespace
scripts/i18n-check.mjs   translation coverage report
public/images/           static assets
```

## UI components

All core UI is built on [shadcn/ui](https://ui.shadcn.com) (Radix) in `components/ui/`, themed to
the Cosmo look (palette in `app/globals.css`, Cosmo variants such as `cosmo` / `cosmo-outline` /
`cta` in `button.tsx`). Pages don't style those primitives directly — they use the shared blocks in
`components/common/`, which differ only by variant props:

| Component        | Built on          | Used for                                                     |
| ---------------- | ----------------- | ------------------------------------------------------------ |
| `Surface`        | `Card`            | every card-like block: page sheet, project/member cards, image tiles |
| `Container`, `Section`, `SectionHeader` | — | page-width columns, section spacing, section titles  |
| `CtaLink`, `CtaButton`, `CtaSlot` | `Button` | gradient call-to-action buttons                     |
| `IconButton`     | `Button`          | round icon buttons (slider, close, pagination, menu)         |
| `CosmoTabs`, `CosmoTabLinks` | `Tabs` | trapezoid tabs (state- or URL-driven)                       |
| `ModalContent`   | `Dialog`          | achievement panel, image lightbox                            |
| `Divider`        | `Separator`       | section rules                                                |
| `Skeleton`, `SkeletonText`, `SkeletonCta`, `SkeletonTabBar`, `LoadingRegion` | — | shimmer loading placeholders |

Add primitives with `pnpm dlx shadcn@latest add <name>`. Always import `cn` from `@/lib/utils`
(enforced by ESLint): it knows the custom `text-cosmo-*` / `shadow-elevation-*` tokens, which the
stock merger would otherwise mis-merge (e.g. silently dropping `text-white`).

## Loading states and performance

- **Shimmer skeletons:** every page has a skeleton that matches its layout box for box (in the
  feature folders, e.g. `components/news/NewsSkeletons.tsx`). They're shown by each route's
  `loading.tsx` during navigation, by `<Suspense>` around async sections (the news teaser streams
  in on its own), and while the **language switches**: `LocaleTransitionProvider` tracks the switch,
  the nav labels shimmer in place and the page content and footer swap to their skeletons
  (`LocalePendingSwap` + `RouteSkeleton`). The skeleton stays up at least 350 ms so it never just
  flashes.
- **Images:** photos use `next/image` (lazy, responsive sizes) with an animated shimmer placeholder
  until they load. The slider's fullscreen lightbox is code-split and only fetched on first open.
- **Re-renders:** the [React Compiler](https://react.dev/learn/react-compiler) (`reactCompiler` in
  `next.config.ts`) memoizes client components, values and callbacks automatically, so there's no
  hand-written `useMemo`/`useCallback`/`memo`. Most of the UI is Server Components with no client JS;
  client islands are kept small (Header → `DesktopNav`/`MobileMenu`, Slider → `SlideTrack`/
  `SliderControls`/`SliderLightbox`), and the sticky header's scroll hook only re-renders when the
  scroll threshold is crossed.
- **Sticky header:** fixed to the top; transparent over the banner, solid blurred backdrop once you
  scroll. The language menu is positioned with CSS under its button (popper libraries mis-place it
  because of the site's `zoom: 0.8` on wide screens).

## Translations

Built on [next-intl](https://next-intl.dev). The language is stored in the `language` cookie
(`pl` default, `en`); URLs have no locale prefix.

- Messages live in `messages/<locale>/<namespace>.json` (`common`, `navigation`, `home`, `news`,
  `events`, `projects`, `footer`). Polish (`pl`) is the source of truth.
- **Fallback:** any key missing in a locale — or a whole missing file — falls back to Polish.
- **Development:** fallback strings are prefixed with `⚠ [pl]`, keys missing even in Polish render
  as `⚠ MISSING: ns.key`, and the server console lists every missing key per locale. Production
  shows the plain Polish text.
- `pnpm i18n:check` reports translation coverage per locale.
- **Adding a language:** add it to `LOCALES` and `LANGUAGES` in `lib/i18n/config.ts` (plus a flag in
  `public/images/flags/`) and create `messages/<locale>/` — partial translations are fine.

## Events

Events are hardcoded in `lib/data/events.ts` (placeholder content), each with its own text per
locale. An event is listed only in locales it is translated into; a locale without any shows
"Brak aktualnych wydarzeń" (in that language, or Polish as fallback). Pages read events only
through `lib/events.ts`, so moving them to the backend later is a change in that one file.
