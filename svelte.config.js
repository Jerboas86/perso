import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter(),
		prerender: {
			// The PDF exports are generated from the built site, so they cannot
			// exist while the crawler is walking it. Every other 404 still fails.
			handleHttpError: ({ path, message }) => {
				if (path.startsWith('/exports/')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
