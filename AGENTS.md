# AGENTS.md — LLM Wiki

## 1. Project mission and operating principles

LLM Wiki is an extensible academic knowledge base for handwritten notes (PDF/JPG/PNG), research papers (PDF), and digital Markdown/LaTeX notes. AI agents may help transcribe, summarize, classify, cross-reference, and maintain the website. The system must prioritize mathematical fidelity, source traceability, user review, and privacy.

This file is the primary instruction set for agents working on this project. When a requested change conflicts with these standards, explain the conflict and request an explicit decision; do not silently bypass rules. Do not present planned features as implemented.

## 2. Technology and target architecture

- Target: Astro + Starlight, Markdown/MDX, static site deployable to GitHub Pages.
- Math: a verified KaTeX/remark/rehype integration (choose exact compatible packages only with user approval to install).
- Search: a static search index such as Pagefind; **only approved public pages** may be indexed in public builds.
- Graph: a client-side visualization such as Cytoscape.js using **only confirmed relations** and the same visibility-filtered content catalog.
- PDF/image preview: browser PDF/image viewer for files explicitly approved for publication; local-only original previews need a separate local-only mechanism and must never be bundled in public static output.
- UI: black/white/gray, accessible contrast, responsive layout, a card-based landing page and documentation-style reading pages.
- Appearance: light/dark manual toggle; UI locale toggle Traditional Chinese/English; article body remains in its source language unless the user specifically requests a translation.
- Do not add a backend, paid API, tracking, telemetry, analytics, or cloud synchronization unless the user explicitly authorizes it.

## 3. Workspace boundaries and directory conventions

Two sibling folders must remain separate:

- `llm-wiki-private/` (outside this repository): original PDFs, scanned photos, private notes, pending OCR/transcriptions, and review drafts.
- `llm-wiki-site/` (this repository): `AGENTS.md`, reusable templates, website source, and **explicitly approved** public content only.

Within this repository:

- `templates/`: document templates.
- `content/approved/`: reviewed Markdown/MDX eligible for publication; only after approval and allowlist registration.
- `config/publications.yml`: explicit publication allowlist (initially empty).
- `src/components/`: reusable UI components, including search, cards, TOC, formulas, original/processed tabs, and graph.
- `src/pages/`: home, article routes and graph page.
- `src/styles/`: design tokens and global styling.
- `src/i18n/`: Chinese and English UI strings.
- `src/lib/`: data validation, filtering and graph generation.
- `public/`: **approved public-only static assets**. Never store private source PDFs or photographs here.
- `scripts/`: future build and validation scripts; running them requires advance permission.
- `docs/`: project specifications, content schema and publishing policies.

Keep stable, lowercase `kebab-case` slugs and filenames, with unchanging unique article `id` values. Never rename an existing published slug without approval and redirect planning. Keep metadata keys in English; retain article text in the source language.

## 4. Content metadata and status

Every article follows the documented schema in `docs/CONTENT_SCHEMA.md` and a type-specific template. Required fields: `id`, `title`, `type`, `subject`, `tags`, `language`, `visibility`, `status`, `summary`, `source`, `related`. Optional fields differ by type: e.g. author/year/DOI for papers, page references/course/date for handwritten notes.

- `visibility: private` by default. `public` is an eligibility tag, **not** publication authorization.
- `status: draft` by default. `reviewed` requires explicit human content approval.
- Publication requires ALL of: `visibility: public`, `status: reviewed`, and a matching entry in `config/publications.yml` created after explicit user permission. Keep the allowlist empty until approvals are received.
- The site build must fail closed: omit anything not passing this triple check. Never publish draft text, even indirectly through search records, graph nodes/edges, back-links, tag counts, previews, sitemap or exposed JSON.
- Changing metadata must not auto-trigger a commit, push, publishing action or externally hosted sync.

## 5. Handwritten-note transcription

1. Read only the original files the user has explicitly provided or designated.
2. Transcribe faithfully into Markdown; encode mathematics as LaTeX using `$...$` for inline and `$$...$$` for display equations, following the renderer's documented syntax.
3. Preserve original meaning, notation, hypotheses, equation signs, proof steps and ordering. Do not silently correct mistakes or complete missing proofs.
4. Record source page references for important claims, formulas, lemmas and proof steps. For images, provide an image filename/page reference.
5. On ambiguous writing, use `[UNCLEAR: short reason; source p.N]` at the point of uncertainty and list it in a review section. Do not invent a confident replacement. Hypotheses, if helpful, go into a clearly labeled *AI suggestion (unverified)* section, never into the transcript.
6. Put summaries in a separate section clearly differentiated from the faithful transcription. If there are unresolved uncertainties, keep the article as a private draft until user review.
7. Never modify or overwrite the original source document.

## 6. Academic paper notes

Produce structured notes, not an automatic full-text republication. Use `templates/paper.md`: citation metadata, summary, research question, assumptions, methods, definitions and theorems, key equations (with page references), main results, limitations, personal notes, and related items. Distinguish:

- claims made by the paper, with source pages;
- agent explanations or inferences, explicitly labeled as such;
- user-authored notes, which must not be invented.

Do not fabricate DOI, authors, publication year, experimental results, quotations or theorem hypotheses. If a fact is missing, use `unknown`/`not recorded` and flag for review. Respect copyright: publish original summaries and only appropriately licensed source assets or short, necessary quotations with attribution; never republish an entire third-party paper without permission.

## 7. Digital notes

Preserve the submitted Markdown/LaTeX semantics while standardizing metadata and presentation. Do not rewrite mathematical assertions merely for style. Keep code blocks, equations and references intact. Clarify ambiguous content instead of guessing.

## 8. Cross-references and knowledge graph

- Suggest relations based on real shared concepts, explicit citations or user-provided links; include a brief reason.
- A relation becomes authoritative only after explicit user confirmation. Do not create edges just because two articles share a tag.
- Store confirmed relations as stable article IDs in `related`; ensure backlinks, graph edges and related-article cards agree.
- Public rendering must remove references to private/non-published IDs. Do not expose private titles or existence through graph data, search, counts, tag lists or broken-link placeholders.

## 9. UI and accessibility rules

- Home: search entry, subject/type/tag filters and responsive article cards.
- Article: clear heading hierarchy, optional left navigation, generated table of contents, math support, citation/page links, related articles, and copy-LaTeX actions.
- Original/processed tabs: show the original only when the viewer is authorized and its asset is actually accessible. For public pages without approved originals, hide or disable original preview with a neutral explanation; do not link local file paths.
- Graph: dedicated graph view, keyboard-accessible alternative list of relations, labels and empty states.
- Support keyboard navigation, semantic markup, sufficient contrast and small screens.
- Dark/light and zh-Hant/en UI controls; only UI chrome is translated, never automatically translate article body.
- Avoid decorative color proliferation: neutral monochrome palette with restrained states.

## 10. Agent workflow for adding an article

1. Read this file and `docs/CONTENT_SCHEMA.md`.
2. Identify source type and relevant template; check access authorization and source availability.
3. Draft only in the local private workspace (`llm-wiki-private/drafts/`), keeping raw files untouched. If private workspace is unavailable, ask for an authorized private location; NEVER place provisional drafts in the public repository.
4. Create a faithful transcription or paper note, metadata, separate summary, source-page references and `[UNCLEAR]` review list.
5. Suggest subjects, tags, cross-links and public/private classification; **private by default**.
6. Show the proposed result and uncertainties. Wait for explicit user approval before moving the item into the canonical knowledge base.
7. If user explicitly approves publication, separately verify rights for original assets, reviewed status, and a specific public ID allowlist entry. Prepare but do not automatically deploy.
8. Ensure the cards, TOC, search, category filters, backlinks and graph derive from the same public-only catalog. Do not manually insert inconsistent duplicate lists.
9. Report which files would change and which checks remain unrun. Do not claim tests passed if they were not run.

## 11. Strict permission model

Within the scope of a user-authorized edit, agents may read and edit the specifically authorized project files. Before EACH category of action below, obtain explicit prior permission:

- **Any Git operation**, including `git status`, `git add`, `git diff`, `git commit`, `git push`, `git pull`, `git fetch`, branch/tag creation, repository initialization, or opening/modifying a PR.
- Any file upload, publication, deployment, synchronization or sending project content to an external service.
- Any network access, API calls, downloads, package installations or dependency changes requiring commands.
- Running any tests, scripts, builds, linters, preview servers, development servers or other commands to execute the project.
- Deleting, overwriting original sources, destructive changes, or modifying files outside the explicit task scope.

Do not treat an instruction to *create a file* as consent for installation, testing, Git or publishing. Never use credentials unless the user has explicitly authorized a specific use; never put keys or secrets in the repository. If unsure, stop and ask for approval. The user's previously stated preference is to manually perform Commit/Push, so never perform them as a convenience or infer consent.

## 12. Publication and privacy controls

The public repository must contain only non-sensitive project code, templates, documentation and explicitly approved content. Keep `llm-wiki-private/` outside the repository entirely; `.gitignore` is an additional safeguard, not the boundary. Keep a publication allowlist in `config/publications.yml` and enforce deny-by-default filtering at content loading/build time. Prevent direct asset copying, accidental static-path inclusion, stale search indexes and source maps leaking private material. Any export must be reviewed for metadata and filenames revealing private information. Refer to `docs/PUBLISHING.md`.

## 13. Validation and acceptance (do not execute without permission)

Static review of source text may identify missing fields or broken references without running a program. Before executing any validation script or build, ask for approval. When authorized, validate:

1. frontmatter schema, slug uniqueness and content templates;
2. math syntax and formula source copy behavior;
3. rendered TOC, cards, search, filters and responsive navigation;
4. bilingual UI and light/dark switching;
5. cross-references and knowledge graph consistency;
6. original/processed tabs and source-file access controls;
7. **no private content** in HTML, assets, JSON, search indexes, graph, previews, RSS/sitemap or other public output;
8. GitHub Pages path/base compatibility.

Record failures faithfully; do not silently adjust source mathematics, privacy flags or approvals to make validation pass. Only report successful tests if executed with consent and observed results.

## 14. Extension and maintenance

For any new page or feature: reuse existing design tokens, metadata conventions, localization keys and reusable components. Document new metadata fields, migration impact, privacy effects and template changes before adoption. Prefer a single content registry over hard-coded duplicate routes. Keep documentation current with actual implementation, and preserve backward compatibility unless the user authorizes a breaking change.
