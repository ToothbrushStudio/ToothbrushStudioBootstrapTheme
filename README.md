# ToothbrushStudioBootstrapTheme

The Bootstrap theme used by Toothbrush Studio, and the official companion theme for
**Chomponents** — a wacky UI component library by Toothbrush Studio.

It's a [Bootswatch](https://bootswatch.com/)-style theme for **Bootstrap 5**: a playful-dental
palette (gum red, pearl, toothpaste mint), the Nunito typeface, and a couple of signature touches —
compiled into a single drop-in stylesheet, with the Sass source shipped so you can recolor or extend it.

— npm package: **`@toothbrushstudio/bootstrap-theme`**

## Install

```bash
npm install @toothbrushstudio/bootstrap-theme bootstrap
```

Or grab `dist/toothbrush.min.css` straight from this repo.

## Usage

You can consume the theme two ways — **drop-in** (use the compiled CSS as-is) or **source**
(recompile it into your own Bootstrap build to recolor/extend).

### 1. Drop-in (compiled bundle)

`dist/toothbrush.min.css` is a **complete, self-contained** stylesheet — it includes Bootstrap, so it
*replaces* `bootstrap.css`. Don't link both.

```html
<!-- Theme CSS (replaces bootstrap.css) -->
<link rel="stylesheet" href="node_modules/@toothbrushstudio/bootstrap-theme/dist/toothbrush.min.css">

<!-- Bootstrap's JavaScript is still required for interactive components -->
<script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
```

This theme is **CSS-only** — it does not bundle Bootstrap's JS. Add `bootstrap.bundle.min.js` yourself.

### 2. Source (recompile with your own Bootstrap)

Import the partials around your own Bootstrap build to recolor or extend:

```scss
@import "@toothbrushstudio/bootstrap-theme/scss/variables";   // before Bootstrap
@import "bootstrap/scss/bootstrap";
@import "@toothbrushstudio/bootstrap-theme/scss/components";   // after Bootstrap
@import "@toothbrushstudio/bootstrap-theme/scss/tokens-export";
```

### CDN

Once published, the theme is servable from jsDelivr (npm or GitHub-tag forms):

```
https://cdn.jsdelivr.net/npm/@toothbrushstudio/bootstrap-theme@0.1.0/dist/toothbrush.min.css
```

> CDN requires the package to be published to npm (or the repo to be public for the `gh` form).

## Palette

| Bootstrap role | Color | Hex |
|---|---|---|
| `$primary` | Pearl | `#EAE0C8` |
| `$secondary` | Toothpaste mint | `#A1FBE9` |
| `$info` | Mouthwash blue | `#1CA9E0` |
| `$success` | Rotten-tooth green | `#79883B` |
| `$warning` | Yellowed-tooth yellow | `#D9BD5E` |
| `$danger` | Blood red | `#9A1B1B` |
| `$light` | Pearl | `#EAE0C8` |
| `$dark` | Cavity brown-black | `#241B12` |

The theme also re-emits the studio brand tokens as CSS custom properties for app-level use:
`--gum-red`, `--tooth-pearl`, `--toothpaste-mint`, `--dead-tooth`, `--dead-tooth-border`.

> **Note on contrast:** `$primary` and `$light` are both Pearl (near-white) by brand design. On a dark
> background this reads beautifully (light-on-dark); on a **white** background, primary buttons/links
> will be low-contrast. Pair primary elements with a dark surface, or override `$primary` if you need
> it to pop on white.

## Build

```bash
npm install
npm run build      # compiles scss/ → dist/toothbrush.css + dist/toothbrush.min.css (autoprefixed)
npm test           # asserts the compiled CSS carries the brand
npm run watch      # recompile on change
```

## License

[MIT](LICENSE) © Toothbrush Studio, LLC. Built on [Bootstrap](https://getbootstrap.com/) (MIT) —
Bootstrap's copyright notice is retained in the LICENSE and the compiled output.
