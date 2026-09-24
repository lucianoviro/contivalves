<?php
defined( 'ABSPATH' ) || exit;
$f   = conti_fields();
$env = $f['environment'] ?? array();
$pillars = array(
	array( 'icon' => 'sun', 'title' => $env['sun'] ?? '', 'text' => $env['sunText'] ?? '' ),
	array( 'icon' => 'water', 'title' => $env['water'] ?? '', 'text' => $env['waterText'] ?? '' ),
	array( 'icon' => 'air', 'title' => $env['air'] ?? '', 'text' => $env['airText'] ?? '' ),
);
?>
<section class="hero">
	<div class="container hero__grid">
		<div class="hero__text">
			<p class="eyebrow"><?php conti_e( $f['eyebrow'] ?? '' ); ?></p>
			<h1><?php conti_e( $f['heading'] ?? '' ); ?></h1>
			<p class="lead"><?php conti_e( $f['lead'] ?? '' ); ?></p>
			<div class="btn-row">
				<a class="btn btn--primary" href="<?php echo esc_url( conti_page_url( 'products' ) ); ?>"><?php conti_e( conti_t( 'cta.viewRange' ) ); ?></a>
				<a class="btn btn--ghost" href="<?php echo esc_url( conti_page_url( 'contact' ) ); ?>"><?php conti_e( conti_t( 'cta.contact' ) ); ?></a>
			</div>
		</div>
		<div class="hero__media">
			<?php echo conti_image( $f['images']['hero'] ?? 0, $f['heading'] ?? '', 'conti-wide', array( 'loading' => 'eager', 'fetchpriority' => 'high', 'sizes' => '(min-width: 900px) 50vw, 100vw' ) ); // phpcs:ignore ?>
			<span class="hero__badge"><strong>1919</strong><span>Valduggia · Italy</span></span>
		</div>
	</div>
</section>

<section class="section--tight">
	<div class="container">
		<div class="stats">
			<?php foreach ( (array) ( $f['facts'] ?? array() ) as $fact ) : ?>
			<div class="stat"><div class="stat__value"><?php conti_e( $fact['value'] ); ?></div><div class="stat__label"><?php conti_e( $fact['label'] ); ?></div></div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="section-head">
			<div>
				<p class="eyebrow"><?php conti_e( conti_t( 'nav.products' ) ); ?></p>
				<h2><?php conti_e( $f['productsHeading'] ?? '' ); ?></h2>
				<p><?php conti_e( $f['productsText'] ?? '' ); ?></p>
			</div>
			<a class="link-arrow" href="<?php echo esc_url( conti_page_url( 'products' ) ); ?>"><?php conti_e( conti_t( 'nav.allProducts' ) ); ?></a>
		</div>
		<div class="grid grid-4">
			<?php foreach ( conti_family_keys() as $key ) { get_template_part( 'template-parts/family-card', null, array( 'key' => $key ) ); } ?>
		</div>
	</div>
</section>

<section class="section section--mist">
	<div class="container split">
		<div>
			<p class="eyebrow"><?php conti_e( conti_t( 'nav.certifications' ) ); ?></p>
			<h2><?php conti_e( $f['quality']['heading'] ?? '' ); ?></h2>
			<p class="lead"><?php conti_e( $f['quality']['text'] ?? '' ); ?></p>
			<div class="btn-row">
				<a class="link-arrow" href="<?php echo esc_url( conti_page_url( 'production' ) ); ?>"><?php conti_e( conti_t( 'nav.production' ) ); ?></a>
				<a class="link-arrow" href="<?php echo esc_url( conti_page_url( 'certifications' ) ); ?>"><?php conti_e( conti_t( 'nav.certifications' ) ); ?></a>
			</div>
		</div>
		<div class="frame"><?php echo conti_image( $f['images']['quality'] ?? 0, $f['quality']['heading'] ?? '', 'conti-wide', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 45vw, 100vw' ) ); // phpcs:ignore ?></div>
	</div>
</section>

<section class="section">
	<div class="container split split--reverse">
		<div>
			<p class="eyebrow"><?php conti_e( conti_t( 'nav.applications' ) ); ?></p>
			<h2><?php conti_e( $f['custom']['heading'] ?? '' ); ?></h2>
			<p class="lead"><?php conti_e( $f['custom']['text'] ?? '' ); ?></p>
			<div class="btn-row">
				<a class="link-arrow" href="<?php echo esc_url( conti_page_url( 'custom' ) ); ?>"><?php conti_e( conti_t( 'cta.discover' ) ); ?></a>
				<a class="link-arrow" href="<?php echo esc_url( conti_page_url( 'alubronze' ) ); ?>"><?php conti_e( conti_t( 'nav.alubronze' ) ); ?></a>
			</div>
		</div>
		<div class="frame"><?php echo conti_image( $f['images']['custom'] ?? 0, $f['custom']['heading'] ?? '', 'conti-wide', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 45vw, 100vw' ) ); // phpcs:ignore ?></div>
	</div>
</section>

<section class="section section--night env">
	<div class="container">
		<div class="section-head">
			<div>
				<p class="eyebrow eyebrow--night"><?php conti_e( conti_t( 'nav.environment' ) ); ?></p>
				<h2><?php conti_e( $env['heading'] ?? '' ); ?></h2>
				<p><?php conti_e( $env['text'] ?? '' ); ?></p>
			</div>
			<a class="link-arrow link-arrow--night" href="<?php echo esc_url( conti_page_url( 'environment' ) ); ?>"><?php conti_e( conti_t( 'cta.discover' ) ); ?></a>
		</div>
		<div class="grid grid-3">
			<?php foreach ( $pillars as $p ) : ?>
			<div class="pillar"><?php echo conti_icon( $p['icon'] ); // phpcs:ignore ?><h3><?php conti_e( $p['title'] ); ?></h3><p><?php conti_e( $p['text'] ); ?></p></div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php if ( ! empty( $f['faq'] ) ) : ?>
<section class="section">
	<div class="container narrow">
		<p class="eyebrow">FAQ</p>
		<h2><?php conti_e( $f['faqHeading'] ?? '' ); ?></h2>
		<div class="faq">
			<?php foreach ( $f['faq'] as $q ) : ?>
			<details><summary><?php conti_e( $q['q'] ); ?></summary><p><?php conti_e( $q['a'] ); ?></p></details>
			<?php endforeach; ?>
		</div>
	</div>
</section>
<?php endif; ?>

<?php get_template_part( 'template-parts/cta-band' ); ?>
