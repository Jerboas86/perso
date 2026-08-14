import { parse as parseYaml } from 'yaml';
import { resumeSchema, type Resume } from './schema.ts';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

const stripBom = (value: string) => (value.charCodeAt(0) === 0xfeff ? value.slice(1) : value);

/**
 * Parse one `content/cv.<locale>.md` file. Pure on purpose: the Vite build and
 * the node export scripts must agree on exactly one parser.
 *
 * Throws with a readable message when the frontmatter is missing or invalid, so
 * a typo in the CV fails the build instead of silently dropping a section.
 */
export function parseResume(raw: string, source = '<inline>'): Resume {
	const match = FRONTMATTER.exec(stripBom(raw));
	if (!match) {
		throw new Error(`${source}: missing YAML frontmatter (expected a leading '---' block)`);
	}

	const [, frontmatter, body] = match;
	const result = resumeSchema.safeParse({
		...parseYaml(frontmatter),
		summary: body.trim()
	});

	if (!result.success) {
		const issues = result.error.issues
			.map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
			.join('\n');
		throw new Error(`${source}: invalid resume content\n${issues}`);
	}

	return result.data;
}
