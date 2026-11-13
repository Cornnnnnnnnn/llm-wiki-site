# LLM Wiki

An academic personal knowledge base, designed for Markdown/LaTeX documents and carefully reviewed notes derived from handwritten PDFs, photos, and papers.

## Project status

The Astro + Starlight static website is implemented. It includes a bilingual library, theme switching, filters, article reader, mathematics rendering, full-text search and a graph of confirmed public relations. The user has approved three reading summaries (HLM18, HLY15 and the Hele-Shaw presentation notes) for public release. Original PDFs and personal annotations are excluded. The publication allowlist names only those three articles.

See `docs/IMPLEMENTATION.md` for setup, local commands, privacy boundaries and GitHub Pages configuration, and `docs/VALIDATION.md` for observed check results. Git and deployment remain manual.

## Read first

- `AGENTS.md`: mandatory agent policies, workflows and permissions.
- `docs/CONTENT_SCHEMA.md`: common article metadata and templates.
- `docs/PUBLISHING.md`: privacy boundary, required approvals, public-only builds.
- `docs/ARCHITECTURE.md`: intended site architecture and features.
- `templates/`: handwritten notes, paper notes and digital notes templates.
- `config/publications.yml`: explicit allowlist (empty by default).

## Repository boundary

This folder alone can be prepared as a public repository after inspection and manual Git action. The sibling `llm-wiki-private/` folder is strictly local and not part of this repository. There is **no automatic publishing**.
