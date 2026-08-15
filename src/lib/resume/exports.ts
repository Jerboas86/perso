import type { Locale } from './schema.ts';

export type ExportFormat = {
	extension: string;
	/** pandoc `-t` writer; absent for formats produced without pandoc. */
	pandoc?: string;
	mime: string;
};

/**
 * Single registry of the downloadable formats — consumed by the site (download
 * links), the export scripts (what to generate) and the e2e tests.
 */
export const EXPORT_FORMATS: ExportFormat[] = [
	{ extension: 'pdf', mime: 'application/pdf' },
	{
		extension: 'docx',
		pandoc: 'docx',
		mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
	},
	{ extension: 'odt', pandoc: 'odt', mime: 'application/vnd.oasis.opendocument.text' },
	{ extension: 'rtf', pandoc: 'rtf', mime: 'application/rtf' },
	{ extension: 'md', mime: 'text/markdown' },
	{ extension: 'txt', pandoc: 'plain', mime: 'text/plain' },
	{ extension: 'json', mime: 'application/json' }
];

export const EXPORT_DIR = 'exports';

export function exportBasename(locale: Locale): string {
	return `benoit_delemps_cv_${locale}`;
}

export function exportPath(locale: Locale, extension: string): string {
	return `/${EXPORT_DIR}/${exportBasename(locale)}.${extension}`;
}
