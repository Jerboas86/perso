import { EXPORT_DIR } from '../src/lib/resume/exports.ts';

const root = new URL('../', import.meta.url);

/** Non-PDF exports land in `static/` so `vite build` copies them into the site. */
export const EXPORT_OUT_DIR = new URL(`static/${EXPORT_DIR}/`, root);

/** Where adapter-cloudflare writes the site (see `wrangler.jsonc` assets). */
export const BUILD_DIR = new URL('.svelte-kit/cloudflare/', root);

export const BUILD_EXPORT_DIR = new URL(`${EXPORT_DIR}/`, BUILD_DIR);
