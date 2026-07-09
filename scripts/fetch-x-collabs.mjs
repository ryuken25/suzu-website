#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const out = path.join(process.cwd(), 'src/data/collabs.generated.json');
const token = process.env.X_BEARER_TOKEN;
if (!token) {
  if (!fs.existsSync(out)) fs.writeFileSync(out, '[]\n');
  console.log('X_BEARER_TOKEN missing — keeping empty generated collab archive.');
  process.exit(0);
}
console.log('X API fetch not executed in this build environment; strict manual fallback remains active.');
if (!fs.existsSync(out)) fs.writeFileSync(out, '[]\n');
