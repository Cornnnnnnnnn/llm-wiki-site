# Project scripts

`integration-check.mjs` creates a separate temporary site with synthetic fixtures and checks subpath builds, public-only output, the full-text JSON index, math, TOC and fail-closed metadata validation. Fixtures never enter the canonical article directory. Search-index generation is handled by Astro's `src/pages/search-index.json.ts` route. Request permission before executing scripts, tests, builds, linters or servers. See `docs/VALIDATION.md` for observed results.
