<script lang="ts">
	import { labels } from '$lib/resume/labels.ts';
	import type { Resume } from '$lib/resume/schema.ts';

	/**
	 * Page metadata for both locales. Shared rather than repeated in the two
	 * `+page.svelte` files, so the link preview can never drift between them.
	 */
	let { resume }: { resume: Resume } = $props();

	const t = $derived(labels[resume.locale]);
	const title = $derived(`${resume.basics.name} — ${t.htmlTitle}`);
	/* The English copy is written in British spelling — `en_GB`, not `en_US`. */
	const ogLocale = $derived(resume.locale === 'fr' ? 'fr_FR' : 'en_GB');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={t.metaDescription} />
	<meta property="og:type" content="profile" />
	<meta property="og:locale" content={ogLocale} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={t.metaDescription} />
	<meta name="twitter:card" content="summary" />
</svelte:head>
