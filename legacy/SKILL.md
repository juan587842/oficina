---
name: fabio-mecanica-diesel-design
description: Use this skill to generate well-branded interfaces and assets for Fabio Mecânica Diesel (oficina diesel especializada em caminhões, Brazil), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Key files:
- `README.md` — brand context, voice & content rules, visual foundations, iconography.
- `colors_and_type.css` — all CSS variables (colors, type, spacing, shadows). Import this in any HTML artifact.
- `assets/` — logos (primary, mark, stencil), hazard-stripe + diamond-plate patterns, diesel-specific icons.
- `ui_kits/website/` — recreation of the marketing website with React components (Nav, Hero, ServicesGrid, TrustBar, HoursMap, ContactModal, Footer).
- `preview/*.html` — design-system specimens (colors, type, spacing, components, voice).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Always import `colors_and_type.css` for tokens — do NOT re-invent the palette. Use Oswald for display/uppercase, Inter for body, JetBrains Mono for part numbers / placa. Use hard-offset shadows (no blur), sharp corners (0–4px radii), and the laranja oficina (#FF6A1A) + preto diesel (#0E0E10) anchors.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need. Portuguese-first copy, direct voice, no corporate fluff — "a gente resolve", not "somos referência".
