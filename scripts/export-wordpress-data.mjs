#!/usr/bin/env node
// Bundles scripts/wp-export-entry.ts with esbuild and writes the JSON data used by the WordPress plugin.
import { build } from 'esbuild';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(new URL('..', import.meta.url).pathname);
const tmp = mkdtempSync(join(tmpdir(), 'conti-export-'));
const outfile = join(tmp, 'export.mjs');
await build({ entryPoints: [join(root, 'scripts/wp-export-entry.ts')], bundle: true, platform: 'node', format: 'esm', outfile, logLevel: 'error' });
process.argv[2] = join(root, 'wordpress/wp-content/plugins/conti-core/data');
await import(pathToFileURL(outfile).href);
rmSync(tmp, { recursive: true, force: true });
