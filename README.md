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
  layout.tsx             header, footer, locale
  page.tsx               homepage
  projects/              list (tabs) + [id] details
  news/                  list (?page=N) + [slug] article; shared banner layout
  team/                  team members
  achievements/          placeholder page, development only
components/
  layout/                Header, Footer, LanguagePicker, PageShell
  home/                  homepage sections
  news/ projects/ team/ achievements/
  ui/                    Button, Slider, Tabs, Icon, ScrollLink, Divider
lib/
  api.ts                 server-only backend client
  data/                  static content (projects, team, partners…)
  i18n/                  locale cookie, dictionaries lookup, setLocale action
  types.ts               shared types
locales/                 pl.json / en.json translations
public/images/           static assets
```

## Translations

The language is stored in the `language` cookie (`pl` default, `en`). Add strings to both
`locales/pl.json` and `locales/en.json`; the compiler fails if their keys diverge.
