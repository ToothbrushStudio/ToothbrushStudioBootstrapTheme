# Changelog

All notable changes to `@toothbrushstudio/bootstrap-theme` are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

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

[0.1.0]: https://github.com/ToothbrushStudio/ToothbrushStudioBootstrapTheme/releases/tag/v0.1.0
