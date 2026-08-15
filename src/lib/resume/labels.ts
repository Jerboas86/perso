import type { Locale } from './schema.ts';

/**
 * UI chrome (section headings, download labels). Kept as a plain module rather
 * than in the i18n runtime because the export scripts render the very same
 * headings into Markdown/DOCX/PDF from node — one source, both pipelines.
 */
export type Labels = {
	htmlTitle: string;
	/** Page description and og:description — kept short enough not to be truncated. */
	metaDescription: string;
	contact: string;
	experiences: string;
	formations: string;
	publications: string;
	media: string;
	associations: string;
	skills: string;
	programming: string;
	languages: string;
	downloads: string;
	/** Accessible name for the locale picker, which has no visible label. */
	languageSelect: string;
};

export const labels: Record<Locale, Labels> = {
	fr: {
		htmlTitle: 'CV',
		metaDescription:
			'Audioprothésiste D.E. et développeur. Je conçois et développe seul Astrone, plateforme d’audiométrie avancée à moteur audio temps réel.',
		contact: 'Coordonnées',
		experiences: 'EXPÉRIENCES',
		formations: 'FORMATIONS',
		publications: 'PUBLICATIONS & RÉCOMPENSES',
		media: 'PRESSE',
		associations: 'PROJETS & ASSOCIATIONS',
		skills: 'COMPÉTENCES',
		programming: 'LANGAGES',
		languages: 'LANGUES',
		downloads: 'Télécharger',
		languageSelect: 'Langue'
	},
	en: {
		htmlTitle: 'Resume',
		metaDescription:
			'Audiologist and developer. I design and build Astrone single-handedly — an advanced audiometry platform with a real-time audio engine.',
		contact: 'Contact',
		experiences: 'EXPERIENCE',
		formations: 'EDUCATION',
		publications: 'PUBLICATIONS & AWARDS',
		media: 'PRESS',
		associations: 'PROJECTS & ASSOCIATIONS',
		skills: 'SKILLS',
		programming: 'PROGRAMMING',
		languages: 'LANGUAGES',
		downloads: 'Download',
		languageSelect: 'Language'
	}
};
