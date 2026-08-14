import { expect, test } from '@playwright/test';
import { EXPORT_FORMATS, exportPath } from '../src/lib/resume/exports.ts';

const pages = [
	{ path: '/', locale: 'fr' as const, heading: 'EXPERIENCES' },
	{ path: '/en', locale: 'en' as const, heading: 'EXPERIENCE' }
];

for (const { path, locale, heading } of pages) {
	test(`${locale} resume renders`, async ({ page }) => {
		await page.goto(path);
		await expect(page.locator('h1')).toHaveText('Benoit Delemps');
		await expect(page.locator('html')).toHaveAttribute('lang', locale);
		await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
	});

	test(`${locale} exports are downloadable`, async ({ request }) => {
		for (const format of EXPORT_FORMATS) {
			const url = exportPath(locale, format.extension);
			const response = await request.get(url);
			expect(response.status(), `${url} should exist — run \`pnpm export\` first`).toBe(200);
			expect((await response.body()).byteLength).toBeGreaterThan(0);
		}
	});
}

test('language switch links the two resumes', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'English' }).click();
	await expect(page).toHaveURL(/\/en$/);
	await page.getByRole('link', { name: 'Français' }).click();
	await expect(page).toHaveURL(/\/$/);
});
