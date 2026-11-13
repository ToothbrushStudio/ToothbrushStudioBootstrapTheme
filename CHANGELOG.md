# Changelog

All notable changes to `@toothbrushstudio/bootstrap-theme` are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

## [0.4.0] — 2026-11-13

A full pass so that no component falls back to Bootstrap's stock colours.
`test/kitchen-sink.html` shows every coloured component on both surfaces (the gum-red
page and pearl cards); open it after `npm run build` to check a change by eye.

### Changed
- **Gray scale is warm.** `$gray-100`…`$gray-900` run from pearl toward cavity-dark,
  anchored on the dead-tooth greys, replacing Bootstrap's cool blue-gray. Borders, table
  lines, disabled inputs and secondary/tertiary backgrounds follow.
- **`<code>` follows the surrounding text colour** with a thin outline in that colour,
  replacing Bootstrap's pink (1.34:1 on the gum-red page).
- **`<mark>`** is cavity-dark text on a yellowed highlight; **`<kbd>`** is a cavity-dark key
  with pearl text, which reads on both surfaces.
- Emphasis text and the close button's X are cavity-dark instead of black.
- `.btn-success` text is cavity-dark (4.35:1); gum-red on rotten-green measured 1.55:1.
- **Dark mode is off** (`$enable-dark-mode: false`). It applied Bootstrap's stock dark palette.

### Fixed
- Active list-group items, the active page in pagination, nav-pills, dropdown active items
  and the progress bar were pearl text on pearl. They are now gum-red with pearl text.
- Tab links and pagination links inside `.card` were pearl on pearl; cards now re-point the
  hex `--bs-link-color` too, not only the `-rgb` pair.
- Striped, hovered and active table rows used cavity-dark/black text while other rows were
  gum-red; `$table-color` is now body text, so all rows match.

[0.4.0]: https://github.com/ToothbrushStudio/ToothbrushStudioBootstrapTheme/releases/tag/v0.4.0

## [0.3.1] — 2026-09-26

### Fixed
- Links inside `.card` were pearl on a pearl surface (1.04:1, invisible), and Bootstrap's hover
  color (a darker pearl) was just as invisible. `.card` now re-points `--bs-link-color-rgb` at
  gum-red and `--bs-link-hover-color-rgb` at a darker red, both derived from the palette variables.

[0.3.1]: https://github.com/ToothbrushStudio/ToothbrushStudioBootstrapTheme/releases/tag/v0.3.1

## [0.3.0] — 2026-09-25

### Added
- `--tooth-pearl-rgb` and `--gum-red-rgb` CSS custom properties: comma-separated R,G,B
  channel lists derived from `$ts-pearl` / `$ts-gum-red` via Sass `color.red/green/blue()`.
  Consuming sites can now write `rgba(var(--tooth-pearl-rgb), 0.15)` without re-declaring
  the channel values locally.

[0.3.0]: https://github.com/ToothbrushStudio/ToothbrushStudioBootstrapTheme/releases/tag/v0.3.0

## [0.2.0] — 2026-09-19

### Fixed
- `$body-bg`/`$body-color` were never set, so `.card`, `.form-control`, `.form-select`, and
  `.table` (all of which derive from Bootstrap's body-bg/body-color) fell back to stock
  white background / near-black text instead of the studio palette. Now set to pearl/gum-red.
- `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-light`, and `.btn-outline-light`'s
  hover/active state rendered illegible black text — Bootstrap's `color-contrast()` default
  against our light theme colors. Fixed with explicit per-color `--bs-btn-*-color` overrides.
- Focus ring now sources from `$ts-pearl`/`$ts-toothpaste-mint` instead of a hardcoded
  `#fff`/`#258cfb`, so there's one definition instead of two (this theme + a website-side
  override that existed only to compensate for the two bugs above).

## [0.1.0] — 2026-06-19

Initial release. Pre-1.0: the Sass variable surface is not yet API-stable.

### Added
- Bootswatch-style Bootstrap 5 theme compiled to `dist/toothbrush.css` + `dist/toothbrush.min.css`.
- Studio palette mapped onto `$theme-colors`: pearl (`$primary`/`$light`), toothpaste mint
  (`$secondary`), mouthwash blue (`$info`), rotten-tooth green (`$success`), yellowed-tooth yellow
  (`$warning`), blood red (`$danger`), cavity brown-black (`$dark`).
- Nunito typeface via Google Fonts `@import`; `$border-radius` token.
- Signature focus ring and Nunito-semibold buttons (`scss/_components.scss` — the growth seam).
- Brand tokens re-emitted as CSS custom properties (`--gum-red`, `--tooth-pearl`, `--toothpaste-mint`,
  `--dead-tooth`, `--dead-tooth-border`).
- Sass source shipped alongside `dist/` for the recompile path.
- Built against Bootstrap `5.3.3` (peer dependency `^5.3.3`).

[0.2.0]: https://github.com/ToothbrushStudio/ToothbrushStudioBootstrapTheme/releases/tag/v0.2.0
[0.1.0]: https://github.com/ToothbrushStudio/ToothbrushStudioBootstrapTheme/releases/tag/v0.1.0
