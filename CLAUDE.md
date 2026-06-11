# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Static export → out/
npm run lint     # ESLint (Next.js flat config)
```

No test framework is configured.

## Architecture

**Static single-page site** built with Next.js App Router (`output: "export"`), deployed to GitHub Pages.

- `app/page.tsx` — Root page; imports and composes all section components
- `app/layout.tsx` — Root layout (fonts, global metadata)
- `components/hero/` — Hero section with interactive `ChipMindMap` SVG
- `components/sections/` — One file per page section (Research, Members, Projects, Publications, Community)
- `lib/asset.ts` — **Always use `asset(path)` for `public/` image paths**, not bare strings. It prepends `NEXT_PUBLIC_BASE_PATH` for correct GitHub Pages subpath routing.

## Data Pattern

There is no CMS or API. All content lives as typed `const` arrays at the top of each section component:

| Section | File | Key arrays |
|---|---|---|
| Members | `MembersSection.tsx` | `RESEARCHERS`, `ALUMNI`, `CAREER` |
| Research | `ResearchSection.tsx` | `SECTIONS`, `PHOTOS_BY_NO` |
| Projects | `ProjectsSection.tsx` | `PROJECTS`, `CHIPS` |
| Publications | `PublicationsSection.tsx` | `PUBLICATIONS` (auto-sorted by `date`) |
| Community | `CommunitySection.tsx` | `GALLERY` |

To add content: edit the array + add image to the appropriate `public/` subdirectory.

## Key Config

- **`next.config.ts`**: `output: "export"`, `images.unoptimized: true`, basePath via `NEXT_PUBLIC_BASE_PATH` env
- **`tsconfig.json`**: strict mode, path alias `@/*` → `./*`
- **`eslint.config.mjs`**: ESM flat config (not `.eslintrc`)

## Deployment

Push to `main` → GitHub Actions (`deploy.yml`) runs `npm ci → npm run build → deploy to GitHub Pages` (~2 min).

## Scroll Animations

`components/useFadeOnScroll.ts` — custom hook used in every section for scroll-triggered opacity fades. No animation library is used.

## Image Processing Scripts

`scripts/` contains one-off Node scripts (using `sharp`) for background removal from chip/hero/logo images. Run manually when adding new assets that need processing.
