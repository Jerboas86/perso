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

/**
 * The page payload: same resume, minus the phone number and email address.
 *
 * Those two are stripped from the HTML entirely — they would otherwise sit in
 * the prerendered markup for any address harvester to scrape. They travel
 * instead as an opaque blob that only client-side JS decodes, and only the
 * print stylesheet reveals, so the generated PDF (rendered from this very page)
 * still carries them. The other exports read `content/` directly and are
 * unaffected.
 */
export function getPageData(locale: Locale): { resume: Resume; contacts: string } {
	const { basics, ...rest } = getResume(locale);
	const { phone, email, ...publicBasics } = basics;
	return {
		resume: { ...rest, basics: { ...publicBasics, phone: '', email: '' } },
		contacts: btoa(JSON.stringify({ phone, email }))
	};
}
