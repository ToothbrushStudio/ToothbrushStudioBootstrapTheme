# Changelog

All notable changes to `@toothbrushstudio/bootstrap-theme` are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

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
