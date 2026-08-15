<script lang="ts">
	import Cv from '$lib/Cv.svelte';
	import Head from '$lib/Head.svelte';

	let { data } = $props();
</script>

<Head resume={data.resume} />

<Cv resume={data.resume} contacts={data.contacts} />
