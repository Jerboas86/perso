import type { Locale } from './schema.ts';

/**
 * UI chrome (section headings, download labels). Kept as a plain module rather
 * than in the i18n runtime because the export scripts render the very same
 * headings into Markdown/DOCX/PDF from node — one source, both pipelines.
 */
export type Labels = {
	htmlTitle: string;
	personalInfos: string;
	experiences: string;
	formations: string;
	publications: string;
	associations: string;
	skills: string;
	programming: string;
	languages: string;
	downloads: string;
	otherLocale: string;
};

export const labels: Record<Locale, Labels> = {
	fr: {
		htmlTitle: 'CV',
		personalInfos: 'Infos Personelles',
		experiences: 'EXPERIENCES',
		formations: 'FORMATIONS',
		publications: 'PUBLICATIONS & RECOMPENSES',
		associations: 'ASSOCIATION & PROJET',
		skills: 'COMPETENCES',
		programming: 'LANGUAGES',
		languages: 'LANGUES',
		downloads: 'Télécharger',
		otherLocale: 'English'
	},
	en: {
		htmlTitle: 'Resume',
		personalInfos: 'Personal Info',
		experiences: 'EXPERIENCE',
		formations: 'EDUCATION',
		publications: 'PUBLICATIONS & AWARDS',
		associations: 'ASSOCIATION & PROJECT',
		skills: 'SKILLS',
		programming: 'LANGUAGES',
		languages: 'SPOKEN LANGUAGES',
		downloads: 'Download',
		otherLocale: 'Français'
	}
};
