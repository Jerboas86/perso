import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Cv from '$lib/Cv.svelte';
import { getResume } from '$lib/resume/app.ts';

describe('Cv', () => {
	it('renders content from the source of truth', async () => {
		const resume = getResume('fr');
		const page = await render(Cv, { resume });

		await expect
			.element(page.getByRole('heading', { level: 1 }))
			.toHaveTextContent(resume.basics.name);
		const firstJob = resume.experiences[0];
		if ('org' in firstJob) {
			await expect.element(page.getByText(firstJob.role, { exact: true }).first()).toBeVisible();
		}
	});
});
