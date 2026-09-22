# Heron

A personal CV / portfolio site, built to keep **content** (your CV data) and
**design** (visual presentation) strictly separate, so either can change
without touching the other.

> The name is a nod to Heron of Alexandria — engineer, inventor, mechanism
> builder. The site itself is a plain, professional, modern CV; no ancient
> theming.

## Architecture

```
CV content (src/content/*.ts)
        ↓ typed against
Shared types (src/types/cv.ts)
        ↓ consumed by
Active design (src/designs/<name>/)
        ↓ selected by
src/designs/index.ts → activeDesign
        ↓ rendered by
src/pages/index.astro
        ↓ built by
astro build → dist/
        ↓ deployed by
GitHub Actions → GitHub Pages (main) / Cloudflare Pages (stage)
```

```
src/
├── content/            ← YOU edit this. Your CV data, nothing else.
│   ├── profile.ts
│   ├── experience.ts
│   ├── education.ts
│   ├── projects.ts
│   ├── skills.ts
│   ├── certifications.ts
│   └── index.ts         (aggregates the above into one `cv` object)
│
├── types/
│   └── cv.ts             The contract: every content file and every design
│                          must conform to these interfaces.
│
├── designs/
│   ├── index.ts           `activeDesign` — the one line that picks a design
│   └── minimal/            The first design (currently the only one)
│       ├── layout.astro
│       ├── tokens.css      Design-scoped CSS variables (colors, type, spacing)
│       └── sections/       Hero, Experience, Projects, Education, ...
│
├── components/            Design-agnostic primitives (currently: SEO.astro)
├── styles/reset.css        Minimal, shared, non-visual reset
├── utils/                  Shared helpers (date formatting, base-URL joining)
└── pages/
    └── index.astro         Wires activeDesign + content together. No visual
                             logic lives here — if you're editing markup or
                             CSS in this file, it belongs in a design instead.
```

### The core rule

**`src/content/*` never imports from `src/designs/*`, and a design never
hardcodes CV data.** Content files only import types from `src/types/cv.ts`.
Designs only receive data as props. If you find yourself breaking this rule,
stop — that's the one thing this architecture exists to prevent.

## Updating your CV

Edit the files in `src/content/`. Each one has an `EDIT ME` comment block at
the top. That's it — no other files need to change. Run `pnpm run dev` to
preview locally, then commit and push (see **Branches & deployment** below).

## Switching or adding a design

- **Switch**: change `activeDesign` in [`src/designs/index.ts`](src/designs/index.ts)
  to another key, then wire that key in the `designLayouts` map in
  [`src/pages/index.astro`](src/pages/index.astro).
- **Add a new design**: create `src/designs/<name>/` with its own
  `layout.astro` (accepting a single `cv: CvData` prop) and its own section
  components + `tokens.css`. Do not import from another design's folder.
  Add `<name>` to `availableDesigns` in `src/designs/index.ts` and to the
  `designLayouts` map in `src/pages/index.astro`.

## Tech stack, and why

- **[Astro](https://astro.build)** — ships zero client-side JS by default and
  renders to static HTML at build time. This site is read, not interacted
  with, so a full SPA framework (React/Vue app shell, hydration, client
  router) would add complexity and runtime weight for no benefit. Astro also
  has first-class multi-layout support, which maps directly onto "swappable
  designs," and native GitHub Pages tooling.
- **TypeScript** everywhere — content, types, components, config.
- **pnpm** — see [Security & supply chain](#security--supply-chain) below for
  why, specifically, pnpm over npm/Yarn/Deno.
- Plain CSS with custom properties per design — no Tailwind/CSS-in-JS by
  default, to keep dependencies minimal and designs fully isolated from one
  another. Add a CSS framework inside a specific design's folder later if you
  want one there.

## Getting started

Requires Node ≥ 20 and [pnpm](https://pnpm.io) ≥ 9 (`corepack enable` will
install the pinned version automatically).

```bash
pnpm install
pnpm run dev        # http://localhost:4321/Heron/
```

## Scripts

| Command                 | What it does                                            |
| ----------------------- | ------------------------------------------------------- |
| `pnpm run dev`          | Local dev server with hot reload                        |
| `pnpm run build`        | Production build to `dist/`                             |
| `pnpm run preview`      | Serve the built `dist/` locally                         |
| `pnpm run check`        | Astro/TypeScript type checking                          |
| `pnpm run lint`         | ESLint (`--fix` variant available)                      |
| `pnpm run format`       | Prettier, writes changes                                |
| `pnpm run format:check` | Prettier, check only (used in CI)                       |
| `pnpm run verify`       | Runs check + lint + format:check + build, in that order |

## Branches & deployment

```
development ──PR──▶ stage ──PR──▶ main
     │                 │              │
     │                 │              └─▶ push triggers .github/workflows/deploy.yml
     │                 │                  → builds with pnpm → deploys to GitHub Pages
     │                 │                  → live at https://phisuidara.github.io/Heron/
     │                 │
     │                 └─▶ push triggers .github/workflows/stage-deploy.yml
     │                     → builds with pnpm (base path "/") → deploys to Cloudflare Pages
     │                     → preview at https://heron-stage.pages.dev
     │
     └─▶ push triggers .github/workflows/ci.yml only (typecheck/lint/format/build,
         no deploy) — this is your experimentation branch
```

- **`development`** — experiment freely here (new designs, content
  restructuring). CI runs on every push but nothing is deployed.
- **`stage`** — open a PR from `development` when something is ready to
  review as a real, deployed preview. Pushing to `stage` deploys to
  **Cloudflare Pages** (free tier: unlimited requests/bandwidth, no monthly
  build-minute ceiling like some competitors — see note below), independent
  of the production GitHub Pages deploy, since GitHub Pages only serves one
  live site per repository.
- **`main`** — open a PR from `stage` once it's verified on the stage
  preview. Pushing to `main` deploys to the real GitHub Pages site.

### One-time setup

1. **GitHub Pages**: repo Settings → Pages → Build and deployment source =
   "GitHub Actions". No further config needed; `deploy.yml` handles the rest.
2. **Cloudflare Pages** (for the `stage` preview):
   - Create a free Cloudflare account and a Pages project named
     `heron-stage` (Workers & Pages → Create → Pages → "Connect to Git" is
     optional — this repo deploys via the API instead, so a blank/direct
     upload project works too).
   - Create an API token (Cloudflare dashboard → My Profile → API Tokens →
     "Edit Cloudflare Pages" template) and note your Account ID (dashboard
     sidebar).
   - In this repo: Settings → Secrets and variables → Actions, add
     `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
3. **Branch protection** (recommended): Settings → Branches → protect `main`
   and `stage` to require PRs and passing CI before merge.

Cloudflare Pages' free tier (as of this writing) has no bandwidth/request cap
and a generous monthly build limit, which comfortably covers an
infrequently-updated personal site. Since free-tier terms change, it's worth
a quick check at [pages.cloudflare.com](https://pages.cloudflare.com) if this
sits unused for a long time before you rely on it again.

## Security & supply chain

This project takes a deliberately cautious stance on dependencies, given how
common typosquatting/compromised-package/npm-worm incidents have become:

- **pnpm, not npm/Yarn or Deno.** pnpm's strict `node_modules` layout means a
  package can only require what it explicitly declares as a dependency — it
  can't silently reach into another package's transitive deps the way npm/
  Yarn's flat layout allows (a real vector in several recent supply-chain
  incidents). Deno was considered but the Astro ecosystem assumes Node-style
  resolution, so Deno support is second-class there.
- **`.npmrc` → `minimum-release-age=1440`**: pnpm refuses to install a
  package version published less than 24 hours ago. This defeats the
  "publish a compromised version, it spreads within hours" pattern behind
  several 2025 npm incidents. (Direct, exact-pinned versions you choose
  yourself in `package.json` are exempt by design — the gate targets
  _automatic_ range resolution, not a deliberate choice you already made
  with the version in hand.)
- **`.npmrc` → `save-exact=true`**: every dependency is pinned to an exact
  version (no `^`/`~`), committed in `pnpm-lock.yaml`. Nothing upgrades
  itself silently.
- **CI runs `pnpm install --frozen-lockfile`**: if the lockfile doesn't
  exactly match `package.json`, CI fails instead of silently resolving new
  versions.
- **No secrets in this project at all.** There's no backend, no API keys, no
  `.env` — one whole class of leak is architecturally impossible here. The
  only secrets that exist are the two Cloudflare deploy tokens, stored as
  GitHub Actions secrets, never in the repo.
- **Minimal dependency count by design** — every added package is added
  attack surface; this project intentionally stays small (Astro + two small
  integrations + TypeScript + lint/format tooling).
- **GitHub Actions**: workflows pin action versions explicitly (e.g.
  `actions/checkout@v5`) rather than trusting `@master`/`@main`. For higher
  assurance later, pin to a specific commit SHA instead of a version tag —
  version tags on third-party actions can be moved (this was the mechanism
  behind the 2025 `tj-actions/changed-files` compromise); the actions used
  here are first-party (`actions/*`) or from well-known publishers
  (`pnpm/action-setup`, `cloudflare/pages-action`), which lowers but doesn't
  eliminate that risk.
- **`esbuild`'s install script** (a transitive dependency of Astro's Vite
  layer) is explicitly approved via `pnpm approve-builds` and recorded in
  `pnpm-workspace.yaml` — pnpm blocks all other install scripts by default.
  If a future dependency update introduces a new install script, pnpm will
  block it and CI/local installs will surface that for review before it runs.

When adding a new dependency: prefer none if you can avoid it, pin the exact
version, and give it a few days of existing on the registry before you pin
it (the `minimum-release-age` setting enforces this for anything resolved
via a range, but you're on your own for a version you type in yourself).

## Accessibility & SEO

- Semantic landmarks (`header`, `main`, `section`, `footer`), one `h1` per
  page, ordered heading hierarchy within each design's sections.
- Skip-to-content link, visible focus states, `prefers-reduced-motion`
  respected in the shared reset.
- `Person` JSON-LD structured data, Open Graph + Twitter card meta, canonical
  URL, and a generated `sitemap-index.xml` (via `@astrojs/sitemap`) — all in
  `src/components/SEO.astro`, shared across every design.
- **You still need to add a real `public/og-image.png`** (1200×630
  recommended) — the SEO component references it but no placeholder image is
  committed. `public/favicon.svg` is a placeholder; replace it with your own
  mark.

## Project status / what's placeholder

Everything under `src/content/` is placeholder data clearly marked with
`EDIT ME` comments — replace it with your real CV before treating this as
"launched." `astro.config.mjs` assumes the GitHub Pages URL
`https://phisuidara.github.io/Heron/`; update `site`/`base` there if the repo
is ever renamed or moved, or if you switch to a custom domain (add a
`public/CNAME` file and drop `base` entirely in that case).
