# Content schema

## Common frontmatter

Each canonical article is Markdown/MDX with a unique, stable lowercase kebab-case `id`.

```yaml
---
id: example-title
title: Example Title
type: handwritten-note # handwritten-note | paper | digital-note
subject: PDE
tags: [elliptic-equations]
language: en # en | zh-Hant | other BCP 47 tag
visibility: private # private | public
status: draft # draft | reviewed
summary: A concise, accurate overview.
source:
  kind: local-file # local-file | doi | url | citation
  reference: original.pdf
  pages: [1, 2]
related: [] # only user-confirmed article IDs
---
```

The source path/reference is local metadata, not an authorization to embed, copy or publish the underlying file. Public output must strip private paths and any inaccessible assets.

## Type-specific fields

- `handwritten-note`: optional `course`, `recorded_date`, `source.pages`, `uncertainties`.
- `paper`: `authors`, `year`, optional `doi`, `venue`, `source_url`; never invent a value.
- `digital-note`: optional `origin`, `updated_date`.

## State and exposure

`visibility: private` + `status: draft` is the default. Public rendering eligibility requires `visibility: public` AND `status: reviewed` AND `id` present in `config/publications.yml`, all after explicit user approval. Even if an article meets those metadata checks, do not expose an original file without its own separate publication permission.

## Mathematics and provenance

Use `$...$` and `$$...$$` (renderer must support this), cite source page(s) near important theorem statements and equations, mark ambiguity as `[UNCLEAR: reason; source p.N]`, and keep AI explanations separate from transcription. Related IDs must be approved before being considered authoritative.
