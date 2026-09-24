#!/usr/bin/env node
// Creates dist-wp/conti-theme.zip and dist-wp/conti-core.zip, ready for "Upload" in the WordPress admin.
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const out = resolve(root, 'dist-wp');
rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const [dir, name, zipName] of [['themes', 'conti', 'conti-theme.zip'], ['plugins', 'conti-core', 'conti-core.zip']]) {
  execFileSync('zip', ['-rq', resolve(out, zipName), name, '-x', '*.DS_Store'], { cwd: resolve(root, 'wordpress/wp-content', dir) });
  console.log(`dist-wp/${zipName}`);
}
