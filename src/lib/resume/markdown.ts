import { labels } from './labels.ts';
import { isGroup, type Job, type Resume } from './schema.ts';

const escapePipes = (value: string) => value.replace(/\|/g, '\\|');

function jobLine(job: Job): string {
	const org = [job.org, job.city].filter(Boolean).join(', ');
	const head = job.note ? `${org} (${job.note})` : org;
	const lines = [`- **${head}** — ${job.role}  \n  *${job.date}*`];
	for (const highlight of job.highlights ?? []) lines.push(`  - ${highlight}`);
	return lines.join('\n');
}

/**
 * Renders the resume as plain CommonMark. This is both a deliverable on its own
 * (`cv-<locale>.md`) and the input pandoc converts to docx/odt/rtf/txt, so it
 * deliberately sticks to constructs pandoc maps cleanly into word processors.
 */
export function toMarkdown(resume: Resume): string {
	const t = labels[resume.locale];
	const { basics } = resume;
	const out: string[] = [];

	out.push(`# ${basics.name}`, '');
	out.push(basics.titles.join(' / '), '');

	const contacts = [
		basics.phone,
		`[${basics.email}](mailto:${basics.email})`,
		...basics.profiles.map((p) => `[${p.label}](${p.url})`)
	];
	out.push(contacts.join(' · '), '');

	if (resume.summary) out.push(resume.summary, '');

	out.push(`## ${t.experiences}`, '');
	for (const entry of resume.experiences) {
		const jobs = isGroup(entry) ? entry.group : [entry];
		for (const job of jobs) out.push(jobLine(job));
	}
	out.push('');

	out.push(`## ${t.formations}`, '');
	for (const f of resume.formations) out.push(`- **${f.title}**  \n  *${f.date}*`);
	out.push('');

	out.push(`## ${t.publications}`, '');
	for (const p of resume.publications) out.push(`- [${p.title}](${p.url}) — *${p.source}*`);
	out.push('');

	if (resume.media.length) {
		out.push(`## ${t.media}`, '');
		for (const m of resume.media) out.push(`- [${m.title}](${m.url}) — *${m.source}*`);
		out.push('');
	}

	out.push(`## ${t.projects}`, '');
	for (const p of resume.projects) {
		out.push(`- **${p.name}** — ${p.role} — <${p.url}>`);
		if (p.description) out.push(`  - ${p.description}`);
	}
	out.push('');

	out.push(`## ${t.associations}`, '');
	for (const a of resume.associations) {
		out.push(`- **${a.name}** — ${a.role} — <${a.url}>`);
		if (a.description) out.push(`  - ${a.description}`);
	}
	out.push('');

	out.push(`## ${t.skills}`, '');
	for (const s of resume.skills) out.push(`- ${escapePipes(s)}`);
	out.push('');

	out.push(`## ${t.programming}`, '', resume.programming.join(' · '), '');
	out.push(`## ${t.languages}`, '', resume.languages.join(' · '), '');

	return (
		out
			.join('\n')
			.replace(/\n{3,}/g, '\n\n')
			.trimEnd() + '\n'
	);
}
