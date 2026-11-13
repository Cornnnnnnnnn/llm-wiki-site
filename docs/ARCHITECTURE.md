# Architecture and UI specification

## Target stack

The implementation and its limitations are recorded in `IMPLEMENTATION.md`; check results are recorded in `VALIDATION.md`.

- Astro + Starlight static site, deployable through GitHub Pages.
- Markdown/MDX content source; math rendering via a compatible KaTeX-based integration.
- Static full-text search, e.g. Pagefind, with a public-only document index.
- A graph view, e.g. Cytoscape.js, whose nodes and edges are derived from human-approved relations and the public-only registry.
- PDF and image viewing for approved public originals; local originals require a distinct, local-only viewer that does not place files into the public bundle.

The exact dependencies and implementation must be reviewed for compatibility before installation or execution, requiring user consent.

## Pages and components

- Card-based home: latest/featured approved notes, search, subject/type/tag filters.
- Article reader: sidebar navigation, title and citation metadata, per-article table of contents, math display, copyable LaTeX source, review-aware original/processed tabs, references and related notes.
- Graph page: interactive notes/relations visualization with accessible textual equivalent.
- Locales: `zh-Hant` and `en` interface strings. Article body remains in its original language.
- Appearance: grayscale accessible design tokens, light and dark theme, responsive/mobile layouts.

## Data flow

Source PDF/image -> local private draft -> user verifies transcript + metadata -> user approves article addition -> optional separately approved publication + allowlist -> approved-only static build -> user manually publishes.

## Empty states

A fresh repository has no publishable articles. Its eventual website should show a clear empty-state message rather than invented example scholarship, and must not display local/private drafts.
