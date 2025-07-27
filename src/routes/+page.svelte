<script>
	import Phone from '$lib/Phone.svelte';
	import Github from '../lib/Github.svelte';
	import LinkedIn from '../lib/LinkedIn.svelte';
	import Mail from '../lib/Mail.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		await import('@google/model-viewer');
	});
</script>

<div class="body">
	<header>
		<div class="name">
			<model-viewer
				alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
				src="/NeilArmstrong.glb"
				poster="/NeilArmstrong.webp"
				ar
				shadow-intensity="1"
				camera-controls
				touch-action="pan-y"
			></model-viewer>
			<h1>Benoit Delemps</h1>
		</div>

		<div class="jobList">
			<h2 class="slash">Opticien</h2>
			<h2 class="slash">Audioprothésiste</h2>
			<h2>Développeur</h2>
		</div>
		<div class="personalInfos">
			<h3>Infos Personelles</h3>
			<div class="infos">
				<div class="info">
					<Phone />
					<p>06-65-50-72-46</p>
				</div>
				<a class="info" href="mailto:benoitdelemps@protonmail.com">
					<Mail />
					<p>benoitdelemps@protonmail.com</p>
				</a>
				<a class="info" href="https://www.linkedin.com/in/benoit-delemps/">
					<LinkedIn />
					<p>Profil</p>
				</a>
				<a class="info" href="https://www.linkedin.com/company/astrone-app/">
					<LinkedIn />
					<p>Page Astrone</p>
				</a>
				<a class="info" href="https://github.com/Jerboas86">
					<Github />
					<p>github.com/Jerboas86</p>
				</a>
			</div>
		</div>
	</header>

	<main>
		<div class="experiences">
			<h2>EXPERIENCES</h2>
			<div class="job">
				<h3>Astrone, Lyon</h3>
				<p>CEO</p>
				<p class="date">janvier 2023</p>
			</div>
			<div class="job">
				<h3>Audika, Lyon (remplacement)</h3>
				<p>Audioprothésiste D.E</p>
				<p class="date">septembre 2022- décembre 2022</p>
			</div>
			<div class="job">
				<h3>Audika, Bourg En Bresse (remplacement)</h3>
				<p>Audioprothésiste D.E</p>
				<p class="date">mars 2022- août 2022</p>
			</div>
			<div class="epoch">
				<div class="job">
					<h3>Audika, Dijon</h3>
					<p>Audioprothésiste D.E / Membre du comité scientifique</p>
					<p class="date">2013-2018</p>
				</div>
				<div class="job">
					<h3>CHU service ORL, Dijon</h3>
					<p>Assitant recherche clinique</p>
					<p class="date">2015-2018</p>
				</div>
			</div>

			<div class="job">
				<h3>Alain Afflelou, Vénisseux</h3>
				<p>opticien optométriste</p>
				<p class="date">2009-2010</p>
			</div>
		</div>

		<div class="formations">
			<h2>FORMATIONS</h2>
			<div class="certif">
				<h3>Audiophonologie et Otologie de l’enfant, Paris - D.U</h3>
				<p class="date">2017-2018</p>
			</div>
			<div class="certif">
				<h3>Audiologie avancée, Lyon - D.U</h3>
				<p class="date">2015-2016</p>
			</div>
			<div class="certif">
				<h3>Audioprothèse, Lyon - D.E</h3>
				<p class="date">2010-2013</p>
			</div>
			<div class="certif">
				<h3>Optométrie-Contactologie, Saint-Etienne - License</h3>
				<p class="date">2009-2010</p>
			</div>
			<div class="certif">
				<h3>Opticien-lunetier - B.T.S</h3>
				<p class="date">2007-2009</p>
			</div>
		</div>

		<div class="publications">
			<h2>PUBLICATIONS & RECOMPENSES</h2>
			<div class="pub">
				<h3>
					<a
						href="https://web.archive.org/web/20240616085413mp_/https://wca2024paris.com/innovation-prize/"
						>Participation au WCA innovation prize</a
					>
				</h3>
				<a
					href="https://web.archive.org/web/20240616085413mp_/https://wca2024paris.com/innovation-prize/"
					>WCA, sept 2025</a
				>
			</div>
			<div class="pub">
				<h3>
					<a
						href="https://audiologie-demain.com/astrone-la-nouvelle-plateforme-daudiometrie-avancee-2294"
						>Astrone, la nouvelle plateforme d’audiométrie avancée</a
					>
				</h3>
				<a
					href="https://audiologie-demain.com/astrone-la-nouvelle-plateforme-daudiometrie-avancee-2294"
					>Audiologie demain, 2024</a
				>
			</div>
			<div class="pub">
				<h3>
					<a href="https://www.ouiemagazine.net/2024/04/18/astrone-coeur-reacteur-audiometrique/"
						>Astrone, dans le cœur du réacteur audiométrique</a
					>
				</h3>
				<a href="https://www.ouiemagazine.net/2024/04/18/astrone-coeur-reacteur-audiometrique/"
					>Ouie magazine, 2024</a
				>
			</div>
			<div class="pub">
				<h3>
					<a href="https://pubmed.ncbi.nlm.nih.gov/30505289/"
						>Effect of rotating auditory scene on postural [...] or bilateral cochlear implants.</a
					>
				</h3>
				<a href="https://pubmed.ncbi.nlm.nih.gov/30505289/">Front. Neurol., 2018</a>
			</div>
			<div class="pub">
				<h3>
					<a
						href="https://www.ouiemagazine.net/2014/04/07/congres-des-audioprothesistes-yaniv-zini-prix-du-college-national-daudioprothese/"
						>Prix de la meilleur présentation, 2014 (C.N.A)</a
					>
				</h3>
				<a
					href="https://www.ouiemagazine.net/2014/04/07/congres-des-audioprothesistes-yaniv-zini-prix-du-college-national-daudioprothese/"
					>Ouie magazine, 2014</a
				>
			</div>
		</div>

		<div class="associations">
			<h2>ASSOCIATION & PROJET</h2>
			<div class="asso">
				<h3>F.N.E.A</h3>
				<p>Cofondateur et membre honoraire</p>
				<a href="https://www.fnea.org">www.fnea.org</a>
			</div>
			<div class="asso">
				<h3>Astrone</h3>
				<p>Système audiométrique avancé</p>
				<a href="https://www.astrone.app">www.astrone.app</a>
			</div>
		</div>

		<div class="skills">
			<h2>COMPETENCES</h2>
			<div class="skill">
				<p>Appareillage de l'adulte & de l'enfant</p>
			</div>
			<div class="skill">
				<p>Prise en charge des patients acouphèniques</p>
			</div>
			<div class="skill">
				<p>Développement web</p>
			</div>
			<div class="skill">
				<p>Programmation audio</p>
			</div>
			<div class="skill">
				<p>Data visualisation</p>
			</div>
			<div class="skill">
				<p>Biostatistiques</p>
			</div>
		</div>

		<div class="progs">
			<h2>LANGUAGES</h2>
			<div class="prog">
				<p>Typescript - Javascript - Rust - Python</p>
			</div>
		</div>

		<div class="langs">
			<h2>LANGUES</h2>
			<div class="lang">
				<p>Anglais courant</p>
			</div>
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

	.body {
		display: flex;
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
		min-width: 450px;
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
		.body {
			flex-direction: column;
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
		header {
			display: none;
		}

		.associations {
			margin-top: 100px;
		}
	}
</style>
