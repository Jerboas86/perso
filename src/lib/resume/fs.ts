import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseResume } from './parse.ts';
import { localeSchema, type Locale, type Resume } from './schema.ts';

export const locales: Locale[] = [...localeSchema.options];

const contentDir = new URL('../../../content/', import.meta.url);

/** Node-side counterpart of `app.ts`, used by the export scripts. */
export function loadResume(locale: Locale): Resume {
	const file = new URL(`cv.${locale}.md`, contentDir);
	return parseResume(readFileSync(file, 'utf8'), fileURLToPath(file));
}

export function loadAllResumes(): Resume[] {
	return locales.map(loadResume);
}
