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
  ['.btn-success text is gum-red, not black',
    /\.btn-success,?\s*[\s\S]{0,80}?\{[^}]*--bs-btn-color:\s*#b23446/i.test(css)],
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
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) failed++;
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
process.exit(failed ? 1 : 0);
