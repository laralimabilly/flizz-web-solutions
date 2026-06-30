# Portfolio case-study gallery images

Drop each project's gallery images into the folder matching its **slug**
(the same slug as in `src/data/projects.ts` and the URL `/portfolio/<slug>/`).

```
src/assets/portfolio/
  nsa-limousine/
    01-hero.webp     ← first (sorted) = full-width 16:9 banner
    02.webp          ← 4:3 tile
    03.webp          ← 4:3 tile
  line-ai/
    ...
```

## Rules

- **Sort order = filename.** Prefix with `01-`, `02-`, `03-` so they order
  predictably. The **first** image renders as the full-width banner; every image
  after it renders as a half-width tile. **All slots are 16:9**, so every image
  can be the same dimensions.
- **Any number of images** works — the gallery renders exactly what's in the
  folder. A project with an empty folder keeps showing the dashed placeholders.
- **Formats:** `.webp` (preferred), `.avif`, `.jpg`, `.jpeg`, or `.png`.

## Recommended source resolution

Astro (`astro:assets`) resizes, compresses, and generates a responsive
`srcset` + WebP at build time, so just provide a high-quality source — it will
never upscale beyond what you give it.

| Slot              | Aspect | Provide (min)   |
| ----------------- | ------ | --------------- |
| Banner (image 01) | 16:9   | 2560 × 1440     |
| Tiles (02, 03, …) | 16:9   | 2560 × 1440     |

All images share the same **16:9** aspect ratio, so you can export every file at
the same size (e.g. 2560 × 1440).

These are wired up in `src/components/ProjectDetail.astro` (the gallery section).
No code or data changes are needed to add images — only files in these folders.
