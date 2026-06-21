<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# CLAUDE.md

This file gives Claude Code (or any AI agent working in this repo) persistent
context about the project, so it doesn't need to be re-explained every session.

## Project

ChadWallet landing page — a Solana memecoin trading app's marketing site,
fomo.family-style. This is a take-home / screening deliverable for a Founding
Engineer role. Scope for now is **landing page only**. The trading page is
explicitly out of scope — it gets a stub route, not a real build.

Live preview deploys automatically to Vercel on push to `main`.

## Stack

- Next.js 14, App Router, TypeScript
- Tailwind CSS for styling
- Privy (`@privy-io/react-auth`) for Google/Apple sign-in + embedded Solana wallets
- BirdEye API for live Solana token data (price, 24h change, trending list)
- Supabase — provisioned but not required for the landing page; don't wire it
  up unless asked
- Deployed on Vercel

## Brand

- All brand assets (logo, wordmark, token icons, any provided colors/fonts)
  live in `/public/brand/`. Always check there before inventing a color,
  font, or icon — derive the Tailwind theme from what's actually provided,
  don't guess a generic crypto-site palette.
- Tone: energetic, "degen," confident — not corporate SaaS. Bold gradients,
  motion, big type are appropriate. Avoid generic Bootstrap-y card grids.
- Mobile app links (use official store badge assets, not custom buttons):
  - Android: https://play.google.com/store/apps/details?id=xyz.chadwallet.www
  - iOS: https://apps.apple.com/us/app/chadwallet/id6757367474

## Current scope boundary — READ BEFORE BUILDING

✅ In scope:

- Hero, rotating token banners (top + bottom), Privy sign-in, feature
  sections, footer, mobile responsiveness, perf/polish.

🚫 Out of scope (do not build, just stub):

- `/trade/[tokenAddress]` route should exist and be linked from token banners,
  but should render a simple "Trading UI coming soon" placeholder. Do not
  build charts, order books, or position panels yet — confirm with me first
  if asked to expand scope.
- TradingView charting library and Alchemy RPC wiring are NOT needed yet.
  Don't install or configure them until the trading page is actually
  greenlit.

If a task description implies building the trading page, stop and ask rather
than assuming scope has expanded.

## Environment variables

All secrets via env vars, never hardcoded. Keep `.env.example` in sync with
whatever `.env.local` actually needs. Required for landing page:

```
NEXT_PUBLIC_PRIVY_APP_ID=
BIRDEYE_API_KEY=          # server-side only unless BirdEye confirms free-tier key is safe client-side
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Never commit real keys. Never print env var values to logs or commit
messages.

## Data fetching rules

- BirdEye free tier has tight rate limits. Any BirdEye call must go through
  a Next.js API route (not direct client fetch) with caching
  (`revalidate` 30–60s minimum). Don't call BirdEye on every render or on a
  tight client-side polling interval.
- Token banner must degrade gracefully on fetch failure — skeleton/fallback
  state, never a broken or blank banner.

## Code conventions

- TypeScript strict mode, no `any` unless truly unavoidable (and comment why).
- Components: PascalCase, one component per file, colocate in `/components`.
- Prefer server components by default; mark `"use client"` only where
  interactivity (Privy hooks, animation state, etc.) requires it.
- Run `npm run build` before considering any task complete — a task isn't
  "done" if the build doesn't pass.
- Small, frequent commits with descriptive messages. After each major section
  (hero, banners, auth, footer), stop and summarize what changed.

## Things to ask me before doing

- Expanding scope beyond the landing page
- Adding new paid services or anything outside BirdEye/Privy/Supabase/Vercel
  free tiers
- Changing the brand palette/fonts from what's in `/public/brand/`
- Any change to the Privy auth config (login methods, embedded wallet chain)
<!-- END:nextjs-agent-rules -->
