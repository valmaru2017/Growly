Hola Soy Vale

## Agents

- **web-designer**: Expert in high-end website design (UI/UX). Use for landing pages, design systems, and visual polish. Uses the Magic (21st.dev) MCP tools to generate, find inspiration for, and refine UI components.

## Design & UI/UX Guidelines (ui-ux-pro-max-skill)

Installed at `.claude/skills/` (7 skills: `ui-ux-pro-max`, `design`, `design-system`, `brand`, `banner-design`, `slides`, `ui-styling`). These auto-invoke for design/UI work — see each `SKILL.md` for full detail and `--domain`/`--stack` search commands (require Python; not currently installed on this machine, so run `winget install Python.Python.3.12` before using `search.py`).

Baseline rules to apply to all UI/UX work on this project, in priority order:

1. **Accessibility (CRITICAL)** — 4.5:1 text contrast (3:1 large text), visible focus rings, alt text, aria-labels on icon-only buttons, keyboard nav matching visual order, labeled form fields, never convey meaning by color alone, respect `prefers-reduced-motion`.
2. **Touch & Interaction (CRITICAL)** — min 44×44px targets with 8px+ spacing, no hover-only interactions, loading feedback on async actions, `cursor-pointer` on clickables.
3. **Performance (HIGH)** — WebP/AVIF + lazy loading, reserve space for images (avoid CLS), code-split by route, debounce/throttle high-frequency events, skeleton screens over blocking spinners.
4. **Style Selection (HIGH)** — match style to product type, stay consistent across pages, SVG icons only (no emoji as icons), consistent elevation/shadow scale, design light/dark together.
5. **Layout & Responsive (HIGH)** — mobile-first, systematic breakpoints (375/768/1024/1440), no horizontal scroll, 4/8px spacing scale, `min-h-dvh` over `100vh` on mobile.
6. **Typography & Color (MEDIUM)** — 16px+ base body text, 1.5–1.75 line-height, 65–75 char line length, semantic color tokens (not raw hex in components), dark mode uses desaturated tones not inverted colors.
7. **Animation (MEDIUM)** — 150–300ms micro-interactions, transform/opacity only (never animate width/height), ease-out entering / ease-in exiting, animate 1–2 elements per view max.
8. **Forms & Feedback (MEDIUM)** — visible labels (not placeholder-only), errors shown near the field with a recovery path, confirm before destructive actions, inline validation on blur not keystroke.
9. **Navigation Patterns (HIGH)** — predictable back behavior, bottom nav ≤5 items, current location visually highlighted, deep-linkable key screens.
10. **Charts & Data (LOW)** — match chart type to data (trend→line, comparison→bar, proportion→pie), always show legend + tooltips, provide a table alternative for accessibility, avoid red/green-only pairs.

Before delivering UI code: check contrast in both light/dark mode, verify touch targets ≥44px, test at 375px width, and confirm no layout shift.

@AGENTS.md
