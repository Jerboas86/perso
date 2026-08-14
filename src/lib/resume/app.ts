import { parseResume } from './parse.ts';
import type { Locale, Resume } from './schema.ts';

/**
 * Vite inlines the content files as strings at build time, so nothing here ever
 * touches `node:fs` — important, since the site ships as a Cloudflare Worker.
 */
const files = import.meta.glob<string>('/content/cv.*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

const byLocale = new Map<Locale, Resume>();
for (const [path, raw] of Object.entries(files)) {
	const resume = parseResume(raw, path);
	byLocale.set(resume.locale, resume);
}

export function getResume(locale: Locale): Resume {
	const resume = byLocale.get(locale);
	if (!resume) throw new Error(`No content file found for locale '${locale}'`);
	return resume;
}
