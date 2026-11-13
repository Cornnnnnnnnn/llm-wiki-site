# Private/public separation and publishing

## Hard boundary

`../llm-wiki-private/` is local-only and must not be placed inside or uploaded with `llm-wiki-site/`. Never copy raw PDFs, handwritten photos, credentials, research notes or drafts into `public/`, the static site's source tree, or a public Git repository without specific permission.

## Three independent gates for every published article

1. Article frontmatter has `visibility: public`.
2. Article frontmatter has `status: reviewed` following explicit user review.
3. Article ID is in `config/publications.yml` after explicit publication approval.

Public content builds must read only explicitly approved files and fail closed when metadata is missing or inconsistent. Search, graph, categories, counts, backlinks, sitemaps and generated data must all use the same approved-only subset. Never include local private paths or hidden article titles in output.

## Original documents

Original PDFs, scans and photographs remain private by default, **even if their derived article is public**. An article's public status does not grant permission to upload the original. Use external publisher links when appropriate rather than distributing copyrighted PDFs.

## Deployment

The user performs all Git and deployment operations manually. Agents must request prior explicit permission for ANY Git command, test/build command, package install, network access or external sync. No automatic commits, pushes, deployments or uploads.

## Safety review before manual publication

After receiving permission to run checks, inspect built files (HTML, CSS, JS, JSON, search index, graph data, asset paths, source maps, sitemap) for private material; verify rights/attribution for each public asset and ensure public links do not lead to private files. Never claim a review occurred unless it actually did.
