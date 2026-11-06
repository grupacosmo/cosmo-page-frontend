# syntax=docker/dockerfile:1

# Node.js LTS. Keep in sync with .nvmrc and "engines" in package.json.
ARG NODE_VERSION=26.13.0

FROM node:${NODE_VERSION}-alpine AS base
# Corepack is no longer bundled with Node.js (>= 25), so install it explicitly.
# It then provides the exact pnpm version pinned in package.json#packageManager.
RUN npm install --global corepack@latest && corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:3000/ || exit 1
# COSMO_API_URL and COSMO_API_KEY are provided at runtime (never baked into the image).
CMD ["node", "server.js"]
