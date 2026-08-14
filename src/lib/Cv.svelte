<script lang="ts">
	import Phone from '$lib/Phone.svelte';
	import Github from '$lib/Github.svelte';
	import LinkedIn from '$lib/LinkedIn.svelte';
	import Mail from '$lib/Mail.svelte';
	import { labels } from '$lib/resume/labels.ts';
	import { EXPORT_FORMATS, exportPath } from '$lib/resume/exports.ts';
	import { isGroup, type Resume } from '$lib/resume/schema.ts';
	import { onMount } from 'svelte';

	let { resume }: { resume: Resume } = $props();

	const t = $derived(labels[resume.locale]);
	const otherLocale = $derived(resume.locale === 'fr' ? 'en' : 'fr');
	const otherLocaleHref = $derived(resume.locale === 'fr' ? '/en' : '/');

	const icons = { linkedin: LinkedIn, github: Github, website: Mail };

	onMount(async () => {
		await import('@google/model-viewer');
	});
</script>

<div class="main-container">
	<header>
		<div class="name">
			<model-viewer
				alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
				src="/NeilArmstrong.glb"
				poster="/NeilArmstrong.webp"
				ar
				shadow-intensity="1"
				camera-controls
				disable-zoom
				touch-action="pan-y"
			></model-viewer>
			<h1>{resume.basics.name}</h1>
		</div>

		<div class="jobList">
			{#each resume.basics.titles as title, i (title)}
				<h2 class:slash={i < resume.basics.titles.length - 1}>{title}</h2>
			{/each}
		</div>

		<div class="personalInfos">
			<h3>{t.personalInfos}</h3>
			<div class="infos">
				<div class="info">
					<Phone />
					<p>{resume.basics.phone}</p>
				</div>
				<a class="info" href="mailto:{resume.basics.email}">
					<Mail />
					<p>{resume.basics.email}</p>
				</a>
				{#each resume.basics.profiles as profile (profile.url)}
					{@const Icon = icons[profile.network]}
					<a class="info" href={profile.url}>
						<Icon />
						<p>{profile.label}</p>
					</a>
				{/each}
			</div>
		</div>

		<div class="downloads">
			<h3>{t.downloads}</h3>
			<div class="formats">
				{#each EXPORT_FORMATS as format (format.extension)}
					<a href={exportPath(resume.locale, format.extension)} download
						>{format.extension.toUpperCase()}</a
					>
				{/each}
			</div>
			<a class="localeSwitch" href={otherLocaleHref} hreflang={otherLocale}>{t.otherLocale}</a>
		</div>
	</header>

	<main>
		{#if resume.summary}
			<p class="summary">{resume.summary}</p>
		{/if}

		<div class="experiences">
			<h2>{t.experiences}</h2>
			{#each resume.experiences as entry, i (i)}
				{#if isGroup(entry)}
					<div class="epoch">
						{#each entry.group as job (job.org + job.date)}
							<div class="job">
								<h3>
									{job.org}{job.city ? `, ${job.city}` : ''}{job.note ? ` (${job.note})` : ''}
								</h3>
								<p>{job.role}</p>
								<p class="date">{job.date}</p>
							</div>
						{/each}
					</div>
				{:else}
					<div class="job">
						<h3>
							{entry.org}{entry.city ? `, ${entry.city}` : ''}{entry.note ? ` (${entry.note})` : ''}
						</h3>
						<p>{entry.role}</p>
						<p class="date">{entry.date}</p>
					</div>
				{/if}
			{/each}
		</div>

		<div class="formations">
			<h2>{t.formations}</h2>
			{#each resume.formations as formation (formation.title)}
				<div class="certif">
					<h3>{formation.title}</h3>
					<p class="date">{formation.date}</p>
				</div>
			{/each}
		</div>

		<div class="publications">
			<h2>{t.publications}</h2>
			{#each resume.publications as publication (publication.url)}
				<div class="pub">
					<h3><a href={publication.url}>{publication.title}</a></h3>
					<a href={publication.url}>{publication.source}</a>
				</div>
			{/each}
		</div>

		<div class="associations">
			<h2>{t.associations}</h2>
			{#each resume.associations as association (association.name)}
				<div class="asso">
					<h3>{association.name}</h3>
					<p>{association.role}</p>
					<a href={association.url}>{association.url.replace(/^https?:\/\//, '')}</a>
				</div>
			{/each}
		</div>

		<div class="skills">
			<h2>{t.skills}</h2>
			{#each resume.skills as skill (skill)}
				<div class="skill">
					<p>{skill}</p>
				</div>
			{/each}
		</div>

		<div class="progs">
			<h2>{t.programming}</h2>
			<div class="prog">
				<p>{resume.programming.join(' - ')}</p>
			</div>
		</div>

		<div class="langs">
			<h2>{t.languages}</h2>
			{#each resume.languages as language (language)}
				<div class="lang">
					<p>{language}</p>
				</div>
			{/each}
		</div>
	</main>
</div>

<style>
	:root {
		--accent-100: #c60c30;
		--accent-200: #012e3e;
		--bg: #f9f9f9;
		--light-text: white;
	}

	.name {
		display: flex;
		align-items: end;
	}

	.name > h1 {
		margin-bottom: 0.05em;
	}

	model-viewer {
		width: 100px;
	}

	.main-container {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 3rem;
		height: 100%;
		background-color: var(--bg);
	}

	header,
	main {
		padding: 2rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.summary {
		max-width: 60ch;
	}

	.experiences,
	.formations,
	.publications,
	.associations,
	.progs,
	.skills,
	.langs {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.skills {
		gap: 0rem;
	}

	.skills p {
		margin: 0.75em 0;
	}

	.publications a {
		color: var(--accent-200);
	}

	.experiences > h2,
	.formations > h2,
	.publications > h2,
	.associations > h2,
	.progs > h2,
	.skills > h2,
	.langs > h2 {
		font-weight: 800;
		color: var(--accent-100);
		margin-bottom: 1rem;
	}

	.jobList {
		display: flex;
		flex-direction: column;
	}

	.jobList > h2 {
		margin: 0.5rem;
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: var(--accent-100);
		color: var(--light-text);
	}

	.personalInfos {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.personalInfos > h3 {
		font-weight: 800;
	}

	.downloads {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.downloads > h3 {
		font-weight: 800;
	}

	.formats {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.formats > a {
		color: var(--light-text);
		border: 1px solid var(--light-text);
		border-radius: 4px;
		padding: 0.15rem 0.5rem;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		transition: background-color 200ms ease-in-out;
	}

	.formats > a:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.localeSwitch {
		color: var(--light-text);
		font-size: 0.9rem;
		text-decoration: underline;
	}

	a {
		text-decoration: none;
	}

	.info {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.infos > a {
		color: var(--light-text);
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.infos p {
		margin: 0.75em;
	}

	.job > h3,
	.certif > h3 {
		margin-bottom: 0.25em;
	}

	a > p {
		transition: transform 200ms ease-in-out;
	}

	.date {
		color: grey;
		font-style: italic;
		font-size: 0.8em;
		margin-top: 0.25em;
	}

	a:hover > p {
		transform: scale(1.05);
	}

	.infos {
		display: flex;
		flex-direction: column;
	}

	.epoch {
		display: flex;
		gap: 2rem;
	}

	.asso > a,
	.pub > a {
		color: var(--accent-200);
	}

	@media screen and (max-width: 1000px) {
		.main-container {
			display: grid;
			grid-template-columns: 1fr;
			background-color: white;
		}

		main {
			padding-top: 0;
		}

		.jobList {
			flex-direction: row;
		}

		.jobList > h2 {
			font-size: 18px;
			margin: 0;
		}

		.personalInfos {
			margin-top: 0.5rem;
		}

		.personalInfos > h3 {
			display: none;
		}

		.infos {
			flex-direction: row;
			gap: 1rem;
		}

		.info > p {
			display: none;
		}

		.slash::after {
			content: '/';
		}
	}

	@media screen and (max-width: 400px) {
		.jobList > h2 {
			font-size: 16px;
		}
	}

	@media print {
		.main-container {
			display: grid;
			grid-template-columns: 1fr;
			background-color: white;
		}

		/* Backgrounds are printed, so the header keeps its red banner and the
		   text on it stays white — forcing it black made it unreadable. */

		/* Contact details must survive into the PDF/print export — only the
		   download links, the language switch and the 3D widget are screen-only.
		   Hiding model-viewer also keeps the PDF deterministic in size: whether
		   its canvas had painted yet used to change the output by ~500 kB. */
		.downloads,
		model-viewer {
			display: none;
		}

		.personalInfos {
			margin-top: 0.5rem;
		}

		.jobList {
			flex-direction: row;
		}

		.jobList > h2 {
			font-size: 18px;
			margin: 0;
		}

		.slash::after {
			content: '/';
		}

		/* Compact the layout so the resume lands on two pages instead of four. */
		:global(html) {
			font-size: 13px;
		}

		header {
			padding: 0.75rem 1rem;
			gap: 0.5rem;
		}

		main {
			padding: 0.75rem 0;
			gap: 0.9rem;
		}

		.experiences,
		.formations,
		.publications,
		.associations,
		.progs,
		.skills,
		.langs {
			gap: 0.4rem;
		}

		.experiences > h2,
		.formations > h2,
		.publications > h2,
		.associations > h2,
		.progs > h2,
		.skills > h2,
		.langs > h2 {
			margin-bottom: 0.3rem;
		}

		.skills p {
			margin: 0.2em 0;
		}

		.personalInfos {
			gap: 0.25rem;
		}

		.infos p {
			margin: 0.2em;
		}

		.job,
		.certif,
		.pub,
		.asso {
			break-inside: avoid;
		}
	}
</style>
