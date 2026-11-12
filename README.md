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
  layout.tsx             header, footer, locale, NextIntlClientProvider
  page.tsx               homepage
  projects/              list (tabs) + [id] details
  news/                  events: list (?tab=upcoming|past&page=N&size=3|6|12) + [slug] details
  team/                  team members
  achievements/          placeholder page, development only
components/
  ui/                    shadcn/ui primitives (generated, themed) — button, card, tabs, dialog…
  common/                Cosmo building blocks on top of ui/ (see below)
  layout/                Header, Footer, LanguagePicker, PageShell
  home/ news/ projects/ team/ achievements/
lib/
  events.ts              event access layer (filtering, sorting, pagination, URL params)
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

Add primitives with `pnpm dlx shadcn@latest add <name>`. Always import `cn` from `@/lib/utils`
(enforced by ESLint): it knows the custom `text-cosmo-*` / `shadow-elevation-*` tokens, which the
stock merger would otherwise mis-merge (e.g. silently dropping `text-white`).

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
