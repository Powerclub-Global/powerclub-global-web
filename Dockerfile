# syntax=docker/dockerfile:1
#
# Self-hosted production image for the Powerclub Global marketing site.
# Multi-stage: deps -> builder -> slim runtime running Next's standalone server.
#
#   docker compose -p pcg-website up -d --build
#
# No secrets are baked in: everything is read from the environment at runtime
# (see SELF_HOSTING.md). The build therefore runs with placeholder-free env and
# every route that needs a credential is dynamic.

ARG NODE_VERSION=22-alpine

# ---------------------------------------------------------------- deps -----
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
# libc6-compat keeps some prebuilt native binaries happy on musl.
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# ------------------------------------------------------------- builder -----
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# `output: "standalone"` in next.config.ts produces .next/standalone.
RUN npm run build

# ------------------------------------------------------------- runtime -----
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs \
 && adduser -u 1001 -S nextjs -G nodejs

# next/image optimisation needs sharp at runtime; the standalone bundle does
# not include it.
RUN npm install --no-save --omit=dev sharp@0.34.4 \
 && npm cache clean --force \
 && chown -R nextjs:nodejs /app/node_modules

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# Plain-node healthcheck: no curl/wget dependency in the image.
HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
