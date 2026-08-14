import type { Handle } from '@sveltejs/kit';

/** `/en` is the English resume, everything else is the French one. */
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', event.url.pathname.startsWith('/en') ? 'en' : 'fr')
	});
