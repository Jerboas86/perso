/**
 * Renders every non-PDF export straight from `content/cv.<locale>.md`.
 *
 * Markdown and JSON are written directly; docx/odt/rtf/txt are produced by
 * pandoc from the generated Markdown. Runs before `vite build` so the files are
 * picked up as static assets.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadAllResumes } from '../src/lib/resume/fs.ts';
import { toMarkdown } from '../src/lib/resume/markdown.ts';
import { EXPORT_FORMATS, exportBasename } from '../src/lib/resume/exports.ts';
import { EXPORT_OUT_DIR } from './paths.ts';

const outDir = fileURLToPath(EXPORT_OUT_DIR);
mkdirSync(outDir, { recursive: true });

function pandoc(args: string[]) {
	try {
		execFileSync('pandoc', args, { stdio: ['ignore', 'ignore', 'pipe'] });
	} catch (error) {
		const stderr = (error as { stderr?: Buffer }).stderr?.toString().trim();
		throw new Error(`pandoc ${args.join(' ')} failed${stderr ? `:\n${stderr}` : ''}`, {
			cause: error
		});
	}
}

for (const resume of loadAllResumes()) {
	const base = `${outDir}/${exportBasename(resume.locale)}`;
	const markdown = toMarkdown(resume);

	writeFileSync(`${base}.md`, markdown);
	writeFileSync(`${base}.json`, JSON.stringify(resume, null, 2) + '\n');
	console.log(`✓ ${base}.md`);
	console.log(`✓ ${base}.json`);

	for (const format of EXPORT_FORMATS) {
		if (!format.pandoc) continue;
		pandoc([
			`${base}.md`,
			'--from=markdown',
			`--to=${format.pandoc}`,
			'--standalone',
			`--metadata=title:${resume.basics.name}`,
			`--metadata=lang:${resume.locale}`,
			`--output=${base}.${format.extension}`
		]);
		console.log(`✓ ${base}.${format.extension}`);
	}
}
