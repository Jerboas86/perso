/**
 * Renders the PDF from the built site itself: the print stylesheet in
 * `src/lib/Cv.svelte` is the PDF layout, so there is only one design to keep up.
 *
 * Runs after `vite build`. Output goes to the build directory (so this build
 * deploys it) and to `static/` (so a local `pnpm dev` can serve it too).
 */
import { createReadStream, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { locales } from '../src/lib/resume/fs.ts';
import { exportBasename } from '../src/lib/resume/exports.ts';
import { BUILD_DIR, BUILD_EXPORT_DIR, EXPORT_OUT_DIR } from './paths.ts';

const buildDir = fileURLToPath(BUILD_DIR);
if (!existsSync(buildDir)) {
	throw new Error(`${buildDir} not found — run \`vite build\` first`);
}

const MIME: Record<string, string> = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.svg': 'image/svg+xml',
	'.webp': 'image/webp',
	'.glb': 'model/gltf-binary'
};

/** Resolves a prerendered URL to a file: `/en` → `en.html` or `en/index.html`. */
function resolveFile(pathname: string): string | null {
	const rel = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
	const candidates = [rel, `${rel}.html`, join(rel, 'index.html')];
	for (const candidate of candidates) {
		const file = join(buildDir, candidate);
		if (!file.startsWith(buildDir)) continue;
		if (existsSync(file) && statSync(file).isFile()) return file;
	}
	return null;
}

const server = createServer((req, res) => {
	const file = resolveFile(new URL(req.url ?? '/', 'http://localhost').pathname);
	if (!file) {
		res.writeHead(404).end('not found');
		return;
	}
	res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
	createReadStream(file).pipe(res);
});

await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address() as { port: number };

const outDirs = [fileURLToPath(BUILD_EXPORT_DIR), fileURLToPath(EXPORT_OUT_DIR)];
for (const dir of outDirs) mkdirSync(dir, { recursive: true });

const browser = await chromium.launch();
try {
	for (const locale of locales) {
		const page = await browser.newPage();
		const path = locale === 'fr' ? '/' : `/${locale}`;
		const response = await page.goto(`http://127.0.0.1:${port}${path}`, {
			waitUntil: 'networkidle'
		});
		if (!response?.ok()) throw new Error(`${path} returned ${response?.status()}`);

		await page.emulateMedia({ media: 'print' });
		const pdf = await page.pdf({
			format: 'A4',
			printBackground: true,
			margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
		});
		await page.close();

		for (const dir of outDirs) {
			const file = join(dir, `${exportBasename(locale)}.pdf`);
			writeFileSync(file, pdf);
			console.log(`✓ ${file}`);
		}
	}
} finally {
	await browser.close();
	server.close();
}
