# Fabio Mecânica Diesel — Design System

> Oficina Diesel especializada em caminhões.
> Heavy-duty truck & diesel mechanic workshop, Brazil.

---

## Context

**Fabio Mecânica Diesel** is a specialized diesel mechanic workshop serving heavy trucks (caminhões). The audience is:

- **Owner-operators** (caminhoneiros autônomos) — often on the road, need fast, trustworthy turnaround.
- **Fleet managers** (gestores de frota) — care about scheduling, invoicing, uptime, preventative maintenance contracts.
- **Walk-in emergency service** — a truck broke down, needs help now.

The brand must feel: **trustworthy, technical, heavy-duty, no-bullshit, Brazilian, warm-blooded.** Not corporate, not cute. A real oficina — grease under the fingernails — but proud and organized.

## Sources provided

None. No codebase, Figma, slide deck, or existing brand assets were attached. This design system was synthesized from the company description:

> "Somos uma oficina Diesel especializada em caminhões."

All visual decisions here are **proposals** — please review and tell me what to keep, change, or align with any existing signage/uniforms/social media you already have. If you have **a real logo, shop photos, uniform colors, or social media handles**, attach them and I'll rework the system to match.

---

## Products in scope

Since no existing product was provided, this system supports one surface:

1. **Marketing website** (`ui_kits/website/`) — a simple, conversion-focused one-pager that lets a fleet manager or driver find the shop, see services, see hours, and request service via WhatsApp or phone.

Future surfaces the system is designed to accommodate:
- Service intake / ordem de serviço (OS) printouts
- WhatsApp quick-reply templates
- Vehicle-side signage & uniform prints
- Invoice / nota fiscal layouts

---

## File index

```
README.md                    — this file
SKILL.md                     — skill manifest for Claude Code compatibility
colors_and_type.css          — CSS variables for colors, typography, spacing, shadows

assets/
  logo-primary.svg           — primary horizontal lockup
  logo-mark.svg              — standalone mark (piston + wrench)
  logo-stencil.svg           — monochrome stencil variant
  pattern-diamond-plate.svg  — diamond plate texture
  pattern-stripes.svg        — hazard stripe texture
  icon-*.svg                 — service icons (truck, wrench, oil, etc)

fonts/
  (Google Fonts linked via CSS — see substitution notes)

preview/
  *.html                     — design-system preview cards

ui_kits/
  website/
    index.html               — interactive marketing site mock
    *.jsx                    — React components

slides/                      — (not generated; no deck requested)
```

---

## Content Fundamentals

### Language
**Portuguese (Brazil) first.** English not used in product surfaces. Keep regional truck-driver vernacular readable but professional.

### Voice
- **Direto ao ponto.** Short sentences. No corporate fluff.
- **Confiante, não arrogante.** "A gente resolve" — not "somos os melhores".
- **Caloroso, respeitoso.** "Bom dia, chefe." not "Prezado cliente".
- **Técnico quando precisa ser.** Use real part names (bico injetor, turbo, bomba injetora) — the audience knows them.

### Person
- **Nós / a gente** for the shop. ("A gente cuida do seu caminhão.")
- **Você** for the customer. Never "o senhor" (too formal) unless on printed invoices.

### Casing
- **Títulos em CAIXA ALTA** for section headers and key CTAs — reinforces the industrial, stenciled feel. ("ORÇAMENTO GRÁTIS", "FALE COM A GENTE")
- **Sentence case** for body copy.
- Never Title Case Like This — it looks gringo.

### Emoji
- **Sparingly, and only in WhatsApp-style contexts.** 📞 🔧 🚛 ✅ are fine in social posts or WhatsApp quick replies.
- **Never in headers, invoices, or signage.** The brand is stenciled metal, not a sticker sheet.

### Examples

✅ Good:
- "Caminhão parado é prejuízo. A gente resolve hoje."
- "ORÇAMENTO GRÁTIS — chama no WhatsApp."
- "Manutenção preventiva a cada 20 mil km."
- "Bico injetor, turbo, bomba injetora — a gente faz tudo."

❌ Avoid:
- "Prezado cliente, gostaríamos de oferecer..."
- "Soluções inovadoras em manutenção automotiva de excelência"
- "Nossa empresa é referência no segmento"

### CTAs — Portuguese patterns
- **FALA COM A GENTE** (primary)
- **CHAMA NO ZAP** (WhatsApp)
- **PEDIR ORÇAMENTO**
- **VER SERVIÇOS**
- **COMO CHEGAR** (maps)

---

## Visual Foundations

### Palette
A two-color system anchors everything: **safety orange** (the work) + **steel black** (the iron). Everything else is a supporting neutral or a warning-light accent.

- **Laranja Oficina `#FF6A1A`** — primary. Safety-vest orange. Used for CTAs, key headlines, hazard stripes, logo.
- **Preto Diesel `#0E0E10`** — primary dark. Almost-black. Backgrounds, type on light, headers.
- **Aço `#2A2D33`** — steel gray. Body surfaces on dark mode, secondary backgrounds.
- **Graxa `#55585F`** — grease gray. Borders, dividers, muted text.
- **Concreto `#C9C8C3`** — concrete warm gray. Light surface.
- **Papel `#F5F2EC`** — warm off-white. Main light background — warmer than pure white, feels like a garage wall under sodium light.
- **Amarelo Alerta `#FFC400`** — hazard yellow. Warnings, highlights.
- **Vermelho Freio `#D7263D`** — brake-light red. Errors, urgent. Used very sparingly.
- **Verde Painel `#4CB944`** — dashboard green. Success / WhatsApp CTA.

### Typography
Two families, both free on Google Fonts:

- **Oswald** — condensed industrial sans. Used for all display, headlines, section heads, buttons, and logotype. All-caps by default.
- **Inter** — neutral humanist sans for body, long-form, UI text. Regular 400 and 600.
- **JetBrains Mono** — used rarely, for part numbers, VIN/placa displays, invoice data.

**Substitution note:** No brand-owned font was provided. Oswald is a defensible, free choice for the industrial display voice; Inter is the modern neutral default. If the shop already has a signage or uniform font, attach a sample and I'll swap.

### Type scale (display-heavy — headlines bigger than typical web)
- `--display-xl` — 88px / Oswald 700 / -0.02em / uppercase
- `--display-lg` — 64px / Oswald 700 / -0.01em / uppercase
- `--display-md` — 44px / Oswald 600 / uppercase
- `--h1` — 32px / Oswald 600 / uppercase
- `--h2` — 24px / Oswald 600 / uppercase
- `--h3` — 18px / Oswald 600 / uppercase / tracked +0.04em (eyebrow style)
- `--body-lg` — 18px / Inter 400 / 1.55
- `--body` — 16px / Inter 400 / 1.55
- `--body-sm` — 14px / Inter 400 / 1.5
- `--mono` — 14px / JetBrains Mono 500 / tabular

### Spacing
8px base grid. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Favor generous vertical rhythm — sections breathe; never feel cramped.

### Corner radii
Sharp and industrial.
- `--r-0` **0** — the default. Boxes are boxes.
- `--r-sm` **2px** — slight softening on inputs.
- `--r-md` **4px** — cards.
- `--r-pill` **999px** — only on status pills.

Do **not** use 12px+ radii. This brand does not round.

### Borders
- 1px solid in Graxa for neutral dividers.
- 2px solid black on cards in light mode — deliberate, a little heavy, feels like stenciled signage.
- 4px-wide colored top-stripes on feature cards to echo hazard-stripe semantics.

### Shadows
Minimal, hard-edged. No soft blurry drop shadows.
- `--shadow-sm` — `2px 2px 0 0 rgba(14,14,16,1)` — hard offset block shadow (signage feel).
- `--shadow-md` — `4px 4px 0 0 rgba(14,14,16,1)` — hero CTA.
- No inner shadows except on inputs (1px inset top, for depth).

### Backgrounds & textures
- **Primary surface:** warm Papel (`#F5F2EC`) or dark Preto Diesel. No gradients.
- **Hero sections:** may use a dark Preto Diesel background with a subtle `pattern-diamond-plate.svg` overlay at 6% opacity.
- **Accent bars:** 45° hazard stripes (`pattern-stripes.svg`) — orange + black — used as section dividers or as a border-top on critical CTAs.
- **No photos of stock-photo people.** If imagery is used, it must be of **real trucks, real parts, real shop** — warm, honest, slightly grainy. Until real photos are provided, we use placeholder blocks with a "foto — substituir" note.

### Imagery vibe
When real photos arrive: **warm, sodium-lit, slightly contrasty, slight film grain OK.** No cool-blue corporate photography. No glossy stock imagery of men in clean white shirts pointing at laptops.

### Animation
- **Very little motion.** This is a workshop brand, not a fintech.
- Hover and click states only. No scroll-triggered animations, no parallax, no fade-ins on load.
- Easing: `cubic-bezier(0.2, 0, 0, 1)` — snappy, brief (120ms).

### Hover states
- **Primary button (orange):** background darkens one step to `#E55A0E`. No scale, no shadow change.
- **Secondary / ghost button:** fill flips to black, text to Papel.
- **Link:** underline appears. Color unchanged.
- **Card:** border stays; shadow offset grows from 2px to 4px.

### Press states
- Buttons: translate `2px 2px` (into the shadow), shadow collapses to `0 0`. Feels like a real stamped button. 80ms.

### Disabled
- 40% opacity, cursor not-allowed. No other treatment.

### Transparency & blur
- **Rarely.** No frosted glass. Solid colors by default.
- Overlays (modals): Preto Diesel at 80% opacity over content. No blur.

### Layout rules
- Max content width: **1200px**.
- Gutters: 24px mobile, 48px desktop.
- Fixed top nav on desktop only, 72px tall, solid Preto Diesel.
- Mobile nav is a stacked drawer — no hamburger-into-fullscreen-overlay nonsense.
- WhatsApp float button is fixed bottom-right on all pages, always visible.

### Cards
- 2px solid Preto Diesel border.
- Preto Diesel hard shadow `4px 4px 0 0`.
- Radius: 4px.
- White or Papel fill.
- Optional 4px-tall hazard stripe on top edge.

### Imagery & iconography crop style
- Icons: stroked, 2px, 24px viewport, square-cap, sharp-cornered. Industrial, not friendly.
- No filled/bubbly icon styles.

---

## Iconography

No existing icon set was provided. The system uses **Lucide** (via CDN) as the default icon family — 2px stroke, square-cap — because it matches the industrial, technical tone and is license-friendly.

**CDN:** `https://unpkg.com/lucide-static@latest/icons/`

Preferred icons for this brand:
- `truck`, `wrench`, `cog`, `gauge`, `fuel`, `battery-charging`, `timer`, `phone`, `message-circle` (for WhatsApp), `map-pin`, `clock`, `check-circle-2`, `alert-triangle`, `calendar`, `receipt`.

**Custom/brand SVGs** (in `assets/`):
- `icon-piston.svg`, `icon-turbo.svg`, `icon-injector.svg` — for specialized diesel parts where Lucide has no equivalent.

**Emoji usage:** only in WhatsApp quick-reply context. Never in marketing headers or printed surfaces.

**Unicode decorative:** `›` used as CTA arrow indicator after button labels (e.g. "FALA COM A GENTE ›"). Sparingly, `/` and `·` as separators in metadata rows.

---

## UI kits

- **`ui_kits/website/`** — marketing website for the oficina. One-pager structure: hero, services grid, about/trust block, location+hours, WhatsApp contact. Interactive mock with a working WhatsApp-style contact modal and a services filter.

---

## SKILL.md

This project is compatible with Claude Code's Agent Skills system — see `SKILL.md` at the root. Download the whole folder and drop it into any Claude Code project's `.claude/skills/` directory to have this brand available as an invocable skill.

## Notes & open questions

See the **CAVEATS** at the end of the handoff message. Key things to confirm:
1. Is there an existing logo? What are the existing uniform / signage colors?
2. Social handles & WhatsApp number?
3. Address and hours?
4. Services offered (beyond general "caminhões diesel")?
5. Is there an existing website or Google Business listing I should align with?
# oficina
