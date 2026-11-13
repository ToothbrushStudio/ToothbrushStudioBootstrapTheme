// Build-output assertions for the Toothbrush Studio Bootstrap theme.
// Verifies the COMPILED CSS actually carries the brand — the executor's
// self-check that the Sass produced what the plan promised. Extended per phase.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const distPath = fileURLToPath(new URL('../dist/toothbrush.css', import.meta.url));

if (!existsSync(distPath)) {
  console.error('FAIL  dist/toothbrush.css not found — run `npm run build` first.');
  process.exit(1);
}

const css = readFileSync(distPath, 'utf8');

// Each check: [name, boolean]. Add to this list as the theme grows.
const checks = [
  // Phase 2 — palette applied to a generated component
  ['.btn-primary is themed pearl (#eae0c8)', /\.btn-primary\s*\{[^}]*#eae0c8/i.test(css)],
  // Phase 3.1 — studio brand tokens re-emitted as CSS custom properties
  ['--gum-red token exported (#b23446)', /--gum-red:\s*#b23446/i.test(css)],
  ['--toothpaste-mint token exported (#a1fbe9)', /--toothpaste-mint:\s*#a1fbe9/i.test(css)],
  // Phase 3.2 — signature focus ring uses brand tokens, not a generic blue/white ring
  ['signature focus ring uses pearl + toothpaste-mint (#eae0c8 / #a1fbe9)',
    /box-shadow:\s*0 0 0 [^,]+#eae0c8,\s*0 0 0 [^;]+#a1fbe9/i.test(css)],
  ['signature focus ring no longer hardcodes the old blue (#258cfb)', !/#258cfb/i.test(css)],

  // Phase 4 — $body-bg/$body-color drive card/input/select/table backgrounds+text (not
  // Bootstrap's stock white/near-black), so those components inherit the brand palette for free.
  ['--bs-body-bg resolves to pearl (#eae0c8)', /--bs-body-bg:\s*#eae0c8/i.test(css)],
  ['--bs-body-color resolves to gum-red (#b23446)', /--bs-body-color:\s*#b23446/i.test(css)],

  // Phase 4 — button text on light-background theme colors is gum-red, not Bootstrap's
  // literal color-contrast() default of black. Checked per-selector (not just
  // .btn-primary) since each is a separate grouped-selector match against the same
  // override rule.
  ['.btn-primary text is gum-red, not black',
    /\.btn-primary,?\s*[\s\S]{0,80}?\{[^}]*--bs-btn-color:\s*#b23446/i.test(css)],
  ['.btn-secondary text is gum-red, not black',
    /\.btn-secondary,?\s*[\s\S]{0,80}?\{[^}]*--bs-btn-color:\s*#b23446/i.test(css)],
  // Success is the exception: rotten-green is mid-tone, so its text is cavity-dark
  // (4.35:1); gum-red measured 1.55:1.
  ['.btn-success text is cavity-dark, not gum-red or black',
    /\.btn-success\s*\{[^}]*--bs-btn-color:\s*#241b12/i.test(css)],
  ['.btn-light text is gum-red, not black',
    /\.btn-light,?\s*[\s\S]{0,80}?\{[^}]*--bs-btn-color:\s*#b23446/i.test(css)],
  ['.btn-outline-light hover/active text is gum-red, not black',
    /\.btn-outline-light\s*\{[^}]*--bs-btn-hover-color:\s*#b23446[^}]*--bs-btn-active-color:\s*#b23446/i.test(css)],

  // Phase 4 — .table text color derives from --bs-emphasis-color, a separate token
  // $body-color doesn't reach; must be an explicit override or it silently regresses
  // to Bootstrap's default black (this is exactly what the site.css cleanup would have
  // broken without this override — see scss/_components.scss).
  ['.table text is gum-red, not black',
    /\.table\s*\{[^}]*--bs-table-color:\s*#b23446/i.test(css)],

  // Phase 4.2 (feat/rgb-channel-tokens) — RGB channel tokens for rgba() overlay expressions.
  // The consuming site uses rgba(var(--tooth-pearl-rgb), 0.15) etc., so the theme must
  // export these exact names with comma-separated R,G,B values derived from the palette.
  // tooth-pearl (#eae0c8) = 234, 224, 200 — gum-red (#b23446) = 178, 52, 70
  ['--tooth-pearl-rgb token exported (234, 224, 200)',
    /--tooth-pearl-rgb:\s*234,\s*224,\s*200/.test(css)],
  ['--gum-red-rgb token exported (178, 52, 70)',
    /--gum-red-rgb:\s*178,\s*52,\s*70/.test(css)],

  // Links default to pearl (legible on the gum-red page), but .card is a pearl surface where a
  // pearl link measures 1.04:1 (invisible). Cards re-point the link variables at gum-red for the
  // resting state and at a darker red for hover (Bootstrap's own hover is a darker pearl).
  ['.card links are gum-red (resting) with a red hover, not pearl',
    /\.card\s*\{[^}]*--bs-link-color-rgb:\s*178,\s*52,\s*70;\s*--bs-link-hover-color-rgb:\s*\d+,\s*\d+,\s*\d+/.test(css)],
  ['.card nav links and pagination are gum-red too (hex --bs-link-color)',
    /\.card\s*\{[^}]*--bs-link-color:\s*#b23446/i.test(css)],

  // Full color pass — nothing a component draws may fall back to Bootstrap's stock palette.
  // Stock grays (cool blue-gray), checked anywhere in the bundle:
  ...['f8f9fa', 'e9ecef', 'dee2e6', 'ced4da', 'adb5bd', '6c757d', '495057', '343a40', '212529']
    .map((h) => [`stock Bootstrap gray #${h} is gone`, !new RegExp(`#${h}\\b`, 'i').test(css)]),
  ['gray scale is warm: --bs-gray-500 is dead-tooth (#9c968b)', /--bs-gray-500:\s*#9c968b/i.test(css)],
  ['--bs-border-color is a warm gray, not stock #dee2e6', /--bs-border-color:\s*#c6bda7/i.test(css)],
  // <code> was Bootstrap's pink, 1.34:1 on the gum-red page.
  ['no stock pink code color (#d63384 / #e685b5) outside the unused --bs-pink',
    !/--bs-code-color:\s*#(d63384|e685b5)/i.test(css)],
  ['<code> follows the surrounding text color', /(^|\n)code\s*\{[^}]*color:\s*inherit/i.test(css)],
  ['<mark> is cavity-dark on a yellowed highlight',
    /--bs-highlight-color:\s*#241b12/i.test(css) && !/#fff3cd/i.test(css)],
  ['emphasis color is cavity-dark, not black', /--bs-emphasis-color:\s*#241b12/i.test(css)],
  ['active components are gum-red with pearl text, not pearl-on-pearl',
    /\.list-group\s*\{[^}]*--bs-list-group-active-color:\s*#eae0c8;[^}]*--bs-list-group-active-bg:\s*#b23446/i.test(css)],
  ['progress bar is gum-red with pearl text',
    /--bs-progress-bar-color:\s*#eae0c8;[^}]*--bs-progress-bar-bg:\s*#b23446/i.test(css)],
  ['striped/hover table rows follow body text (gum-red)',
    /--bs-table-striped-color:\s*#b23446/i.test(css) && /--bs-table-hover-color:\s*#b23446/i.test(css)],
  ['<kbd> is a cavity-dark key with pearl text',
    /kbd\s*\{[^}]*color:\s*#eae0c8;[^}]*background-color:\s*#241b12/i.test(css)],
  ['dark mode is off (no stock dark palette)', !/\[data-bs-theme=dark\]\s*,?\s*:root|:root\[data-bs-theme=dark\]|#2b3035/i.test(css)],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) failed++;
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
process.exit(failed ? 1 : 0);
