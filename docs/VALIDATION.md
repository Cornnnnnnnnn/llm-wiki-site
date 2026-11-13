# Validation record — 2026-11-13

## Public release preparation

The user explicitly approved public release of the three reading summaries and submission to their GitHub repository. `hlm18`, `hly15`, and `slice` now have public/reviewed copies and explicit allowlist entries. Original PDFs, personal annotations and private notes remain excluded. No relation edge has been approved.

The release preparation passed Astro diagnostics (zero errors, warnings or hints), all five publication-permission tests, and a production build configured for the GitHub Pages project base `/llm-wiki-site/`. Thirteen HTML pages were generated. Both UI language routes render all three approved articles with KaTeX; the full-text index contains exactly these three IDs. Built output was scanned for private source filenames, local paths, excluded article titles, original PDFs and source maps; none were found. The usage guide's literal `[UNCLEAR]` example is instructional text, not an unresolved article annotation.

Live publication must be verified separately against the GitHub workflow result and the resulting public URL. The record below describes the earlier local implementation stage, before this public release was approved.

## Initial local implementation record

The user authorized package installation, builds and functional checks for this implementation. No Git command, commit, push, upload or deployment was performed. The designated Desktop source tree and private sibling folder were not modified.

## Observed checks

- Astro diagnostics: zero errors, warnings or hints.
- Five permission tests: all passed (three publication gates, private graph endpoints and deduplication, invalid IDs/missing files/symlink escapes, unsafe rendered references, executable MDX imports).
- Static production build: successful with an empty publication allowlist. Home, graph and Starlight usage guides have both Traditional Chinese and English routes; the search index is an empty array. No synthetic scholarship is added to the real site.
- Isolated synthetic-content build: successful with `/llm-wiki/` as the deployment base. Both Markdown and restricted MDX render. KaTeX, heading anchors and related links appear in generated HTML. The search index contains precisely the two approved fixture IDs. Private/unlisted title and body sentinels and source-reference path sentinels are absent from all built files. Changing an allowlisted fixture to private/draft causes the build to fail.
- Headless Chrome checks: desktop and 390px mobile layouts, no horizontal overflow on the home page, keyboard `/` search focus, theme switching and persistence, both UI locales and guides, graph empty state, English full-text search from the Chinese UI, Chinese full-text search from the English UI, combined subject/tag filtering, no-results/reset, KaTeX source copy through the clipboard, article TOC, unchanged article text across UI switching, related articles, graph nodes/edges, zoom and reset. No browser page errors were observed.

## Scope and limits

This is a local implementation. The public allowlist is still empty. No real academic article was processed or approved, and no original PDF/image was published. Original preview stays unavailable. Executable MDX and local body-asset references remain blocked pending a separately reviewed public asset mechanism. Public static assets are a manual public-only trust boundary; do not place originals there.

GitHub Pages compatibility was checked with a subpath build and local browser navigation. No live GitHub Pages deployment was performed. Set the real `SITE_URL` and `BASE_PATH` before manual publication; the default site origin is a placeholder.

The in-app Node runtime could not load Rollup native modules due to macOS signature restrictions. The completed checks used a standalone Node 22.16.0 runtime in the working directory. Package versions are captured in `pnpm-lock.yaml`.
