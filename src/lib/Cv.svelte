<script lang="ts">
	import Phone from '$lib/Phone.svelte';
	import Github from '$lib/Github.svelte';
	import LinkedIn from '$lib/LinkedIn.svelte';
	import Mail from '$lib/Mail.svelte';
	import Cochlea from '$lib/Cochlea.svelte';
	import { reveal } from '$lib/reveal.ts';
	import { labels } from '$lib/resume/labels.ts';
	import { EXPORT_FORMATS, exportPath } from '$lib/resume/exports.ts';
	import { isGroup, type Job, type Resume } from '$lib/resume/schema.ts';
	import type { Locale } from '$lib/resume/schema.ts';

	let { resume, contacts }: { resume: Resume; contacts?: string } = $props();

	const t = $derived(labels[resume.locale]);

	/**
	 * Phone and email are kept out of the server payload (see `getPageData`) and
	 * decoded here, in the browser only. They stay hidden on screen and surface
	 * in the print stylesheet, which is what the PDF export renders.
	 */
	let contact = $state<{ phone: string; email: string } | null>(null);
	$effect(() => {
		if (contacts) contact = JSON.parse(atob(contacts));
	});

	const icons = { linkedin: LinkedIn, github: Github, website: Mail };

	const localeHrefs: Record<Locale, string> = { fr: '/', en: '/en' };

	function onLocaleChange(event: Event & { currentTarget: HTMLSelectElement }) {
		const locale = event.currentTarget.value as Locale;
		window.location.href = localeHrefs[locale];
	}
</script>

{#snippet jobEntry(job: Job)}
	<div class="job">
		<h3>
			{job.org}{job.city ? `, ${job.city}` : ''}{job.note ? ` (${job.note})` : ''}
		</h3>
		<p>{job.role}</p>
		<p class="date">{job.date}</p>
		{#if job.highlights?.length}
			<ul class="highlights">
				{#each job.highlights as highlight (highlight)}
					<li>{highlight}</li>
				{/each}
			</ul>
		{/if}
	</div>
{/snippet}

<div class="page">
	<header>
		<div class="identity">
			<div class="name">
				<div class="nameRow">
					<Cochlea />
					<h1>{resume.basics.name}</h1>
				</div>
				<div class="jobList">
					{#each resume.basics.titles as title, i (title)}
						<h2 class:slash={i < resume.basics.titles.length - 1}>{title}</h2>
					{/each}
				</div>
			</div>
			<select
				class="localeSelect"
				aria-label={t.languageSelect}
				value={resume.locale}
				onchange={onLocaleChange}
			>
				<option value="fr">Français</option>
				<option value="en">English</option>
			</select>
		</div>

		<div class="meta">
			<div class="contact">
				<h3>{t.contact}</h3>
				<div class="infos">
					{#if contact}
						<div class="info private">
							<Phone />
							<p>{contact.phone}</p>
						</div>
						<div class="info private">
							<Mail />
							<p>{contact.email}</p>
						</div>
					{/if}
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
			</div>
		</div>
	</header>

	<main>
		{#if resume.summary}
			<p class="summary">{resume.summary}</p>
		{/if}

		<section class="experiences" use:reveal>
			<h2>{t.experiences}</h2>
			<div class="entries">
				{#each resume.experiences as entry, i (i)}
					{#if isGroup(entry)}
						<div class="epoch">
							{#each entry.group as job (job.org + job.date)}
								{@render jobEntry(job)}
							{/each}
						</div>
					{:else}
						{@render jobEntry(entry)}
					{/if}
				{/each}
			</div>
		</section>

		<section class="formations" use:reveal>
			<h2>{t.formations}</h2>
			<div class="entries">
				{#each resume.formations as formation (formation.title)}
					<div class="certif">
						<h3>{formation.title}</h3>
						<p class="date">{formation.date}</p>
					</div>
				{/each}
			</div>
		</section>

		<section class="publications" use:reveal>
			<h2>{t.publications}</h2>
			<div class="entries">
				{#each resume.publications as publication (publication.url)}
					<div class="pub">
						<h3><a href={publication.url}>{publication.title}</a></h3>
						<a class="source" href={publication.url}>{publication.source}</a>
					</div>
				{/each}
			</div>
		</section>

		{#if resume.media.length}
			<section class="publications" use:reveal>
				<h2>{t.media}</h2>
				<div class="entries">
					{#each resume.media as item (item.url)}
						<div class="pub">
							<h3><a href={item.url}>{item.title}</a></h3>
							<a class="source" href={item.url}>{item.source}</a>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<section class="associations" use:reveal>
			<h2>{t.projects}</h2>
			<div class="entries">
				{#each resume.projects as project (project.name)}
					<div class="asso">
						<h3>{project.name}</h3>
						<p>{project.role}</p>
						{#if project.description}
							<p class="detail">{project.description}</p>
						{/if}
						<a class="source" href={project.url}>{project.url.replace(/^https?:\/\//, '')}</a>
					</div>
				{/each}
			</div>
		</section>

		<section class="associations" use:reveal>
			<h2>{t.associations}</h2>
			<div class="entries">
				{#each resume.associations as association (association.name)}
					<div class="asso">
						<h3>{association.name}</h3>
						<p>{association.role}</p>
						{#if association.description}
							<p class="detail">{association.description}</p>
						{/if}
						<a class="source" href={association.url}
							>{association.url.replace(/^https?:\/\//, '')}</a
						>
					</div>
				{/each}
			</div>
		</section>

		<section class="skills" use:reveal>
			<h2>{t.skills}</h2>
			<div class="entries">
				{#each resume.skills as skill (skill)}
					<p class="skill">{skill}</p>
				{/each}
			</div>
		</section>

		<section class="progs" use:reveal>
			<h2>{t.programming}</h2>
			<div class="entries">
				<p class="prog">{resume.programming.join('  ·  ')}</p>
			</div>
		</section>

		<section class="langs" use:reveal>
			<h2>{t.languages}</h2>
			<div class="entries">
				{#each resume.languages as language (language)}
					<p class="lang">{language}</p>
				{/each}
			</div>
		</section>
	</main>
</div>

<style>
	/* StudioBlank — monochrome, flat, zero radius, whitespace as the design. */
	:root {
		--ink: #0a0a0a;
		--paper: #fafafa;
		--surface: #ffffff;
		--rule: #d4d4d8;
		--hairline: #e5e5e5;
		--muted: #71717a;

		--space-1: 4px;
		--space-2: 8px;
		--space-3: 16px;
		--space-4: 32px;
		--space-5: 48px;
		--space-6: 64px;
		--space-8: 96px;
		--space-10: 128px;

		--font: Inter, system-ui, -apple-system, 'Segoe UI', sans-serif;
		--mono: 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
	}

	/* static/global.css is not linked from app.html, so the page-level reset
	   lives here with the rest of the design. */
	:global(body) {
		margin: 0;
		background-color: var(--paper);
	}

	:global(h1),
	:global(h2),
	:global(h3),
	:global(p) {
		margin: 0;
		font-weight: inherit;
	}

	.page {
		font-family: var(--font);
		font-weight: 300;
		font-size: 16px;
		line-height: 1.65;
		color: var(--ink);
		background-color: var(--paper);
		min-height: 100%;
		padding: var(--space-8) var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	/* ---------- header ---------- */

	header {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		max-width: 1120px;
		width: 100%;
		margin: 0 auto;
	}

	.identity {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-4);
	}

	.nameRow {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.nameRow :global(svg) {
		flex: none;
		width: 48px;
		height: 48px;
		color: var(--ink);
	}

	h1 {
		font-size: 64px;
		font-weight: 700;
		line-height: 1.05;
		letter-spacing: -0.02em;
	}

	.jobList {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-top: var(--space-3);
	}

	.jobList > h2 {
		font-size: 20px;
		font-weight: 300;
		line-height: 1.3;
		color: var(--muted);
	}

	.slash::after {
		content: '/';
		margin-left: var(--space-3);
		color: var(--rule);
	}

	.localeSelect {
		flex: none;
		align-self: flex-end;
		height: 32px;
		padding: 0 var(--space-2);
		border: 1px solid var(--ink);
		background-color: var(--paper);
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.05em;
		color: var(--ink);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-6);
		padding-top: var(--space-4);
		border-top: 1px solid var(--rule);
	}

	.contact,
	.downloads {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.meta h3 {
		font-family: var(--mono);
		font-size: 12px;
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--muted);
	}

	.infos {
		display: flex;
		flex-wrap: wrap;
		column-gap: var(--space-4);
		row-gap: var(--space-2);
	}

	.info {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--ink);
	}

	.info p {
		font-size: 14px;
	}

	a.info:hover p {
		text-decoration: underline;
	}

	.formats {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	/* Secondary button: 1px ink border, inverts on hover. No radius, no shadow. */
	.formats > a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 64px;
		height: 32px;
		padding: 0 var(--space-3);
		border: 1px solid var(--ink);
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.05em;
		color: var(--ink);
		transition:
			background-color 150ms linear,
			color 150ms linear;
	}

	.formats > a:hover {
		background-color: var(--ink);
		color: var(--paper);
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	:global(a:focus-visible),
	:global(button:focus-visible) {
		outline: 2px solid var(--ink);
		outline-offset: 2px;
	}

	/* ---------- body ---------- */

	main {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		max-width: 1120px;
		width: 100%;
		margin: 0 auto;
	}

	.summary {
		max-width: 60ch;
		font-size: 16px;
		font-weight: 300;
	}

	/* Editorial two-column rhythm: the section label sits in the left margin,
	   the content column stays a comfortable measure wide. */
	section {
		display: grid;
		grid-template-columns: 200px minmax(0, 1fr);
		gap: var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--hairline);
		opacity: 0;
		transform: translateX(24px);
		transition:
			opacity 350ms ease-out,
			transform 350ms ease-out;
	}

	section:global(.is-visible) {
		opacity: 1;
		transform: translateX(0);
	}

	section > h2 {
		font-family: var(--mono);
		font-size: 13px;
		font-weight: 400;
		line-height: 1.5;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--muted);
	}

	.entries {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		max-width: 72ch;
	}

	h3 {
		font-size: 20px;
		font-weight: 600;
		line-height: 1.3;
	}

	.job p,
	.certif p,
	.asso p {
		font-size: 16px;
		font-weight: 300;
	}

	.date {
		font-family: var(--mono);
		font-size: 13px;
		color: var(--muted);
		margin-top: var(--space-1);
	}

	/* Screen readers of the page never get the phone/email; the print stylesheet
	   below reveals them, which is how they reach the PDF. */
	.private {
		display: none;
	}

	.highlights {
		margin: var(--space-2) 0 0;
		padding-left: 1.1em;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.highlights li {
		font-size: 15px;
		font-weight: 300;
	}

	.highlights li::marker {
		color: var(--rule);
	}

	.detail {
		color: var(--muted);
		font-size: 15px;
		margin-top: var(--space-1);
	}

	.epoch {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4) var(--space-6);
	}

	/* Side-by-side only holds while the descriptions have room; below that the
	   two parallel jobs stack. */
	.epoch > .job {
		flex: 1 1 300px;
	}

	.source {
		font-size: 14px;
		color: var(--muted);
		border-bottom: 1px solid var(--rule);
		align-self: flex-start;
	}

	.source:hover,
	.pub h3 a:hover {
		color: var(--ink);
		border-bottom-color: var(--ink);
	}

	.pub h3 a {
		border-bottom: 1px solid transparent;
	}

	/* The full article title is long; on a phone it must wrap rather than push
	   the page sideways. */
	.pub h3 {
		font-size: 17px;
		overflow-wrap: anywhere;
	}

	.skills .entries,
	.langs .entries {
		gap: var(--space-2);
	}

	.skill,
	.lang,
	.prog {
		font-size: 16px;
		font-weight: 300;
	}

	/* ---------- responsive ---------- */

	@media screen and (max-width: 1000px) {
		.page {
			padding: var(--space-5) var(--space-4);
			gap: var(--space-6);
		}

		.identity {
			align-items: flex-start;
		}

		.localeSelect {
			align-self: flex-start;
		}

		h1 {
			font-size: 40px;
			line-height: 1.1;
		}

		.nameRow :global(svg) {
			width: 32px;
			height: 32px;
		}

		.jobList > h2 {
			font-size: 16px;
		}

		section {
			grid-template-columns: 1fr;
			gap: var(--space-3);
		}

		/* Full width now, so contact labels stay readable instead of collapsing
		   to bare icons the way the old narrow sidebar needed. */
		.infos {
			flex-direction: column;
			row-gap: var(--space-2);
		}
	}

	@media screen and (max-width: 400px) {
		h1 {
			font-size: 32px;
		}

		.nameRow :global(svg) {
			width: 26px;
			height: 26px;
		}

		.jobList > h2 {
			font-size: 14px;
		}
	}

	/* ---------- print / PDF ---------- */

	@media print {
		/* Compact the layout so the resume stays within three pages. */
		:global(html) {
			font-size: 11.5px;
		}

		/* The scroll-reveal animation is screen-only; print (and the PDF
		   export that renders it) must show every section immediately. */
		section {
			opacity: 1;
			transform: none;
			transition: none;
		}

		/* printBackground paints the body too, which would band the short last
		   page in grey below where the content ends. */
		:global(body) {
			background-color: var(--surface);
		}

		.page {
			background-color: var(--surface);
			padding: 0;
			gap: var(--space-4);
			font-size: 11.5px;
			line-height: 1.45;
		}

		/* Screen-only chrome. */
		.downloads,
		.localeSelect {
			display: none;
		}

		header {
			gap: var(--space-3);
			max-width: none;
		}

		h1 {
			font-size: 32px;
		}

		.nameRow :global(svg) {
			width: 26px;
			height: 26px;
		}

		.jobList {
			margin-top: var(--space-1);
			gap: var(--space-2);
		}

		.jobList > h2 {
			font-size: 14px;
		}

		.slash::after {
			margin-left: var(--space-2);
		}

		.meta {
			padding-top: var(--space-2);
			gap: var(--space-3);
		}

		.infos {
			column-gap: var(--space-4);
			row-gap: var(--space-1);
		}

		.info p {
			font-size: 11px;
		}

		main {
			gap: var(--space-3);
			max-width: none;
		}

		section {
			grid-template-columns: 150px minmax(0, 1fr);
			gap: var(--space-3);
			padding-top: var(--space-3);
		}

		section > h2 {
			font-size: 11px;
		}

		.entries {
			gap: var(--space-3);
			max-width: none;
		}

		h3 {
			font-size: 13px;
			line-height: 1.35;
		}

		.job p,
		.certif p,
		.asso p,
		.skill,
		.lang,
		.prog,
		.summary,
		.highlights li,
		.detail {
			font-size: 11.5px;
			line-height: 1.45;
		}

		.private {
			display: flex;
		}

		.highlights {
			margin-top: var(--space-1);
		}

		.date {
			font-size: 10px;
			margin-top: var(--space-1);
		}

		.epoch {
			gap: var(--space-2) var(--space-4);
		}

		/* The skill list is short lines; one per row wastes a third of a page. */
		.skills .entries {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: var(--space-4);
			row-gap: 0;
		}

		.job,
		.certif,
		.pub,
		.asso {
			break-inside: avoid;
		}
	}
</style>
