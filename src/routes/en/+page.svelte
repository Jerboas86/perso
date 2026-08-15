<script lang="ts">
	import Cv from '$lib/Cv.svelte';
	import { labels } from '$lib/resume/labels.ts';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.resume.basics.name} — {labels[data.resume.locale].htmlTitle}</title>
</svelte:head>

<Cv resume={data.resume} contacts={data.contacts} />
