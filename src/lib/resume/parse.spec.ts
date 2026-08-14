import { describe, expect, it } from 'vitest';
import { parseResume } from './parse.ts';
import { loadAllResumes, loadResume, locales } from './fs.ts';
import { toMarkdown } from './markdown.ts';
import { labels } from './labels.ts';

describe('parseResume', () => {
	it('accepts every content file', () => {
		const resumes = loadAllResumes();
		expect(resumes.map((r) => r.locale)).toEqual(locales);
		for (const resume of resumes) {
			expect(resume.basics.name).toBeTruthy();
			expect(resume.experiences.length).toBeGreaterThan(0);
		}
	});

	it('rejects content without frontmatter', () => {
		expect(() => parseResume('# just a heading')).toThrow(/frontmatter/);
	});

	it('reports the offending field', () => {
		const raw = ['---', 'locale: fr', 'basics:', '  name: x', '---', ''].join('\n');
		expect(() => parseResume(raw, 'bad.md')).toThrow(/basics\.titles/);
	});
});

describe('toMarkdown', () => {
	it.each(locales)('renders the %s resume with every section', (locale) => {
		const resume = loadResume(locale);
		const markdown = toMarkdown(resume);
		const t = labels[locale];

		expect(markdown.startsWith(`# ${resume.basics.name}`)).toBe(true);
		for (const heading of [t.experiences, t.formations, t.publications, t.associations, t.skills]) {
			expect(markdown).toContain(`## ${heading}`);
		}
		// Grouped experiences are flattened into individual entries.
		expect(markdown).toContain(resume.formations[0].title);
		expect(markdown).toContain(resume.publications[0].url);
		expect(markdown.split('\n').filter((l) => l.startsWith('- ')).length).toBeGreaterThan(10);
	});
});
