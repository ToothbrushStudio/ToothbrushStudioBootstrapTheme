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
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) failed++;
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
process.exit(failed ? 1 : 0);
