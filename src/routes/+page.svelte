<script>
	import Github from '../lib/Github.svelte';
	import LinkedIn from '../lib/LinkedIn.svelte';
	import Mail from '../lib/Mail.svelte';
</script>

<div class="body">
	<header>
		<h1>Benoit Delemps</h1>
		<div class="jobList">
			<h2>Opticien /</h2>
			<h2>Audioprothésiste /</h2>
			<h2>Développeur</h2>
		</div>
		<div class="personalInfos">
			<h3>Infos Personelles</h3>
			<div class="infos">
				<a class="info" href="mailto:benoitdelemps@protonmail.com">
					<Mail />
					<p>benoitdelemps@protonmail.com</p>
				</a>
				<a class="info" href="https://www.linkedin.com/in/benoit-delemps/">
					<LinkedIn />
					<p>www.linkedin.com/in/benoit-delemps/</p>
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
			<h2>MISSIONS</h2>
			<div class="job">
				<h3>Audika, Lyon</h3>
				<p>Audioprothésiste D.E</p>
				<p class="date">septembre 2022- décembre 2022</p>
			</div>
			<div class="job">
				<h3>Audika, Bourg En Bresse</h3>
				<p>Audioprothésiste D.E</p>
				<p class="date">mars 2022- août 2022</p>
			</div>
			<div class="epoch">
				<div class="job">
					<h3>Audika, Dijon</h3>
					<p>Audioprothésiste D.E</p>
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
				<h3>Effect of rotating auditory scene on postural [...] or bilateral cochlear implants.</h3>
				<a href="https://pubmed.ncbi.nlm.nih.gov/30505289/">Front. Neurol., 2018</a>
			</div>
			<div class="pub">
				<h3>Prix de la meilleur présentation, 2014 (C.N.A)</h3>
				<a
					href="https://www.ouiemagazine.net/2014/04/07/congres-des-audioprothesistes-yaniv-zini-prix-du-college-national-daudioprothese/"
					>Ouie magazine</a
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
				<a href="https://www.gimmick.app">www.astrone.app</a>
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
				<p>Web full stack</p>
			</div>
			<div class="skill">
				<p>Architecture AWS</p>
			</div>
			<div class="skill">
				<p>Data visualisation</p>
			</div>
			<div class="skill">
				<p>Biostatistiques</p>
			</div>
			<div class="skill">
				<p>Programmation audio</p>
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
	.body {
		display: flex;
		gap: 3rem;
		height: 100%;
		background-color: #f9f9f9;
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

	.experiences > h2,
	.formations > h2,
	.publications > h2,
	.associations > h2,
	.progs > h2,
	.skills > h2,
	.langs > h2 {
		font-weight: 800;
		color: #c5003e;
		margin-bottom: 1rem;
	}

	.jobList {
		display: flex;
		flex-direction: column;
	}

	header {
		min-width: 450px;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #c5003e;
		color: white;
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

	.infos > a {
		color: white;
		display: flex;
		align-items: center;
		gap: 1rem;
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
		gap: 0.5rem;
	}

	.epoch {
		display: flex;
		gap: 2rem;
	}

	.asso > a,
	.pub > a {
		color: #6f0325;
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
	}

	@media screen and (max-width: 400px) {
		.jobList > h2 {
			font-size: 16px;
		}
	}
</style>
