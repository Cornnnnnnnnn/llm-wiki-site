# Website source

Astro + Starlight source lives in reusable components, static pages, styles, content guards and localization. `content.config.ts` loads exact allowlisted articles; all public views use `lib/catalog.ts`. Build only with command authorization. Never use private data in website code. See `docs/IMPLEMENTATION.md` and `docs/VALIDATION.md`.
