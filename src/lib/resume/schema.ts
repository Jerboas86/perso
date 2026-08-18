import { z } from 'zod';

export const localeSchema = z.enum(['fr', 'en']);
export type Locale = z.infer<typeof localeSchema>;

const profileSchema = z.object({
	network: z.enum(['linkedin', 'github', 'website']),
	label: z.string().min(1),
	url: z.url()
});

const basicsSchema = z.object({
	name: z.string().min(1),
	titles: z.array(z.string().min(1)).min(1),
	phone: z.string().min(1),
	email: z.email(),
	profiles: z.array(profileSchema)
});

const jobSchema = z.object({
	org: z.string().min(1),
	city: z.string().optional(),
	note: z.string().optional(),
	role: z.string().min(1),
	date: z.string().min(1),
	/** What was actually done there — one bullet per line. */
	highlights: z.array(z.string().min(1)).optional()
});

/**
 * An experience entry is either a single job, or a `group` of jobs held over
 * the same period — those are laid out side by side (the `.epoch` block).
 */
const experienceSchema = z.union([jobSchema, z.object({ group: z.array(jobSchema).min(2) })]);

const formationSchema = z.object({
	title: z.string().min(1),
	date: z.string().min(1)
});

const publicationSchema = z.object({
	title: z.string().min(1),
	source: z.string().min(1),
	url: z.url()
});

const associationSchema = z.object({
	name: z.string().min(1),
	role: z.string().min(1),
	description: z.string().min(1).optional(),
	url: z.url()
});

const projectSchema = associationSchema;

export const resumeSchema = z.object({
	locale: localeSchema,
	basics: basicsSchema,
	experiences: z.array(experienceSchema).min(1),
	formations: z.array(formationSchema),
	/** Peer-reviewed work and awards — kept apart from press coverage. */
	publications: z.array(publicationSchema),
	/** Press coverage. Same shape, but it is not a scientific record. */
	media: z.array(publicationSchema).default([]),
	projects: z.array(projectSchema),
	associations: z.array(associationSchema),
	skills: z.array(z.string().min(1)),
	programming: z.array(z.string().min(1)),
	languages: z.array(z.string().min(1)),
	/** Free prose taken from the markdown body, may be empty. */
	summary: z.string()
});

export type Resume = z.infer<typeof resumeSchema>;
export type Job = z.infer<typeof jobSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Profile = z.infer<typeof profileSchema>;

export function isGroup(entry: Experience): entry is { group: Job[] } {
	return 'group' in entry;
}
