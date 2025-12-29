# Next.js + OpenNext + Cloudflare Workers Instructions

This project is a **Next.js 15** application adapted for **Cloudflare Workers** using **OpenNext**.

## Tech Stack & Architecture
- **Framework**: Next.js 15 (App Router)
- **Runtime**: Cloudflare Workers (via `@opennextjs/cloudflare`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Infrastructure**: Defined in `wrangler.jsonc`

## Core Workflows
- **Development**: `npm run dev` - Standard Next.js local dev server.
- **Preview**: `npm run preview` - **CRITICAL**: Builds with OpenNext and runs the worker locally. Use this to verify Cloudflare compatibility before deploying.
- **Deploy**: `npm run deploy` - Builds and deploys to Cloudflare.
- **Type Gen**: `npm run cf-typegen` - Updates `env.d.ts` with Cloudflare bindings.

## Project-Specific Patterns

### OpenNext & Cloudflare Compatibility
- This project does **NOT** deploy to Vercel. It compiles to a Cloudflare Worker.
- **Edge Compatibility**: While `nodejs_compat` is enabled in `wrangler.jsonc`, prefer standard Web APIs (Fetch, Request, Response) over Node.js specifics where possible.
- **Configuration**:
  - `open-next.config.ts`: Controls the OpenNext adapter settings (e.g., incremental cache).
  - `wrangler.jsonc`: Cloudflare Worker settings (bindings, compatibility flags).

### Cloudflare Bindings (KV, R2, D1)
- Access Cloudflare bindings (KV, R2, D1) through the `CloudflareEnv` interface in `env.d.ts`.
- When adding new bindings:
  1. Update `wrangler.jsonc`.
  2. Run `npm run cf-typegen` to update TypeScript definitions.
  3. Access via `process.env` or context depending on the OpenNext configuration.

### Styling
- Tailwind CSS 4 is configured.
- Global styles are in `src/app/globals.css`.

## Key Files
- `wrangler.jsonc`: Main infrastructure config.
- `open-next.config.ts`: Adapter config.
- `src/app/`: Next.js App Router routes.
