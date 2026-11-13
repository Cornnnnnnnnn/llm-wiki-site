# Implemented website

Astro 5 + Starlight provide static pages and bilingual usage guides. The home page, article reader and graph share `src/lib/catalog.ts`. The graph uses SVG with zoom, pan, linked nodes and an accessible HTML relations list. No inferred or tag-generated edges are created.

## Content loading

`config/publications.yml` contains three explicitly approved reading-summary IDs: `hlm18`, `hly15`, and `slice`. Only exact allowlisted filenames are loaded from `content/approved/`. Invalid IDs, duplicates, missing files, ambiguous extensions and symlink escapes fail the build. Schema validation requires public/reviewed metadata; the filename must match the stable article ID. Navigation, cards, filters, related notes and graph all derive from the same catalog.

Both interface routes render the original article language. No article translations are generated. The article reader provides a heading TOC, source page references, citation metadata and copy-LaTeX buttons using KaTeX annotations. Source reference paths are never rendered or serialized to a public catalog. Original file previews are deliberately unavailable until a separately reviewed asset publication mechanism exists.

Markdown and MDX filenames are accepted, but executable MDX, imports, JSX and expressions are rejected. Local asset references, relative links and raw HTML are rejected before rendering. This prevents accidentally bundling private source imports. Use HTTPS references and heading fragments. Cross-article relationships use confirmed IDs. No metadata migration is required.

## Search

Astro generates `search-index.json` from the shared approved-only catalog. It contains stable IDs and normalized searchable text from titles, summaries, subjects, tags and article bodies. Source-reference metadata and relation IDs are never serialized into it. There are no third-party search services. The browser fetches this index only when a nonempty query is entered and articles exist. Unicode normalization and literal substring matching support mixed Chinese/English; whitespace-separated search terms are combined with AND. Results intersect with all three filters. UI language does not change the catalog being searched. A failed index request explicitly reports fallback to titles, summaries and tags and can be retried on a subsequent query. Empty catalogs generate an empty JSON array. New static builds replace old output, preventing stale indexes.

## Local commands (authorization required)

Use Node 22.12+ or a supported newer release, and Corepack/pnpm. This environment has a bundled Node runtime; ordinary installations can use their own Node and pnpm.

```sh
pnpm install
pnpm check
pnpm test
pnpm build
pnpm preview
```

Set `ASTRO_TELEMETRY_DISABLED=1` when running Astro. No analytics, remote fonts, backend, paid APIs or cloud synchronization are included.

## GitHub Pages

The manual `.github/workflows/deploy.yml` workflow checks and builds the website, then publishes `dist/` only when the user runs it from GitHub Actions. It has no push trigger. Astro detects GitHub repository metadata for the Pages origin/base. Explicit `SITE_URL` and `BASE_PATH` can override those defaults. Internal navigation and the full-text JSON index respect Astro's base. Review `dist/` before publishing. See `GITHUB_PAGES.md` for setup. No Git command or deployment has been performed locally merely by adding this workflow.

## Public assets

`public/` is a public-only trust boundary. It contains only the project favicon and scaffold README. Never put private files there: Astro copies public assets directly. Original asset preview support is deferred until explicit asset approvals exist.

## Verification

Permission tests cover all three gates, private endpoint removal, edge deduplication, path traversal, symlink escape and unsafe rendered links. Build and browser checks are recorded in `docs/VALIDATION.md` after they are actually run. Fixture-only test articles are synthetic and kept outside the canonical knowledge base.

The JSON search index downloads approved article bodies to the visitor, as the article pages themselves do. This is intentional for public content and makes the publication gates essential. It is not suitable for access-controlled private drafts.

## Framework references

- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro glob loader](https://v5.docs.astro.build/en/reference/content-loader-reference/)
- [Starlight setup](https://starlight.astro.build/manual-setup/)
