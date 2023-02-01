<script>
	import Github from '../lib/Github.svelte';
	import LinkedIn from '../lib/LinkedIn.svelte';
	import Mail from '../lib/Mail.svelte';
</script>

<div class="body">
	<header>
		<h1>Benoit Delemps</h1>
		<div>
			<h2>Opticien /</h2>
			<h2>Audioprothésiste /</h2>
			<h2>Développeur</h2>
		</div>
		<div class="personalInfos">
			<h3>Infos Personelles</h3>
			<div class="infos">
				<a href="mailto:benoitdelemps@protonmail.com">
					<Mail />
					<p>benoitdelemps@protonmail.com</p>
				</a>
				<a href="www.linkedin.com/in/benoit-delemps/">
					<LinkedIn />
					<p>www.linkedin.com/in/benoit-delemps/</p>
				</a>
				<a href="github.com/Jerboas86">
					<Github />
					<p>github.com/Jerboas86</p>
				</a>
			</div>
		</div>
	</header>

	<main>
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum sed sint doloribus eum rerum
		tempora? Deleniti aliquam totam excepturi minus, eligendi quas magnam, delectus dicta magni
		praesentium, culpa architecto vero? Ex nemo eum dicta. Tempora, voluptas laboriosam quis totam
		quisquam odit enim, nihil modi iste provident natus dolore, eos commodi beatae quia impedit
		incidunt similique voluptate deleniti omnis architecto hic. Nihil voluptatibus fugit cum ipsa!
		Veritatis nemo repudiandae et tempora minima voluptates pariatur, eligendi quasi temporibus
		ducimus suscipit ea praesentium voluptatum in porro dolorem rem! Temporibus aliquam quis cumque
		magnam! Odio iusto aliquam error dicta fuga, amet, quos sint asperiores eveniet eligendi
		pariatur sunt labore modi alias earum culpa, repudiandae cumque quae mollitia at quaerat neque
		adipisci voluptate? Iusto, fugiat. Officiis deserunt perferendis, magni natus consequatur rerum
		vitae blanditiis alias! Animi ipsa magni nihil a in doloremque beatae assumenda repudiandae,
		incidunt consequuntur minus. Laboriosam sed eaque nulla. Asperiores, natus quaerat? Quae nostrum
		aliquid quo corporis, ducimus libero amet expedita alias dolores facilis repudiandae
		perferendis, nesciunt obcaecati ipsam harum reprehenderit sint accusamus provident assumenda
		beatae, at error? Impedit dicta commodi porro. Quod, maxime nisi? Ex reiciendis error totam sint
		esse, exercitationem sunt commodi provident. Ad veritatis distinctio explicabo reprehenderit
		quibusdam ducimus, ullam fugiat nostrum, maxime architecto suscipit consequatur eaque quidem
		animi. Iusto vitae aspernatur laudantium repudiandae iure, dolor eligendi? Molestias veniam
		impedit ducimus facere nisi doloribus, culpa qui, distinctio laboriosam voluptatum aliquid quam,
		aut itaque totam dolor iste deserunt odit autem. Itaque ratione excepturi suscipit atque
		doloremque reprehenderit. Dolores, impedit! Officiis, doloribus aperiam? Quos odio illum
		architecto! Aut asperiores cumque dicta ipsam consequatur facere, laborum a unde saepe mollitia
		laudantium architecto. Maxime earum id ipsa molestiae quibusdam corrupti quidem fugit cumque
		sint neque! Omnis ratione assumenda eligendi explicabo, quo dolore accusantium possimus sapiente
		blanditiis! Praesentium sequi, assumenda odio placeat aut numquam? Quaerat distinctio suscipit
		facilis maxime quia in doloribus pariatur, asperiores dolore expedita. Temporibus suscipit,
		veniam nesciunt tempora cum beatae odit unde voluptatum, odio aspernatur ipsam rerum doloribus
		architecto ex? Porro! Culpa dignissimos officiis eos voluptates nisi impedit, consequuntur quos?
		Voluptates hic modi fugiat mollitia. Quos adipisci voluptatem sit laboriosam, illum alias
		explicabo dignissimos commodi nemo incidunt quaerat suscipit reprehenderit perspiciatis? Beatae
		nostrum atque similique ipsam possimus perferendis ipsa quia reprehenderit necessitatibus modi
		ut consectetur veritatis inventore, enim vero dolores voluptatem maiores rem dolor ex odio, eum
		optio nobis natus! Officiis. Eligendi distinctio rerum ad sunt eos quia tempore, enim dolorem a
		recusandae expedita dignissimos corrupti optio, laborum veniam illum quidem culpa sint,
		laboriosam ab nam dicta dolorum asperiores. Rerum, optio! Veniam atque exercitationem natus
		necessitatibus aperiam commodi in, id culpa expedita incidunt corporis deleniti placeat cumque
		dolor totam fugit eligendi rerum impedit, velit repellendus ipsa? Mollitia consequatur dolorum
		tempora sapiente! Iste obcaecati corporis earum nulla! Rem voluptate facilis at molestiae vero
		qui veniam, soluta nesciunt rerum ullam maxime dicta voluptates minima culpa repellat incidunt
		suscipit, a temporibus placeat modi porro. Harum enim quos distinctio, aliquid repudiandae
		dolorem atque. Modi temporibus ipsa ad cupiditate quam laborum error nostrum sequi impedit unde
		ab veritatis quod, libero porro? Deleniti alias voluptas modi harum. Deleniti, doloremque eos.
		Ut est debitis nemo veritatis eos mollitia et ex! Obcaecati, delectus nihil dolor nemo corrupti
		velit impedit sint repellendus soluta asperiores laboriosam amet iusto rem in cum. Fugiat
		eligendi explicabo molestiae quae deserunt aspernatur necessitatibus ipsa sed id deleniti
		blanditiis repellendus voluptatibus alias asperiores, at laudantium numquam quo facilis voluptas
		distinctio quisquam architecto! Cumque explicabo a minus. Soluta quis enim ducimus esse
		quibusdam consequatur veniam autem in et corporis molestiae commodi ut eaque dolore ab hic
		laboriosam neque libero amet velit, blanditiis aliquid. Atque suscipit provident dignissimos?
	</main>
</div>

<style>
	.body {
		display: flex;
		gap: 3rem;
		height: 100%;
	}

	header,
	main {
		padding: 2rem 1rem;
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
		color: white;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.infos {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
