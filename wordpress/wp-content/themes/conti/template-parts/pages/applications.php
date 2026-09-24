<?php
defined( 'ABSPATH' ) || exit;
$f = conti_fields();
get_template_part( 'template-parts/page-head', null, array( 'eyebrow' => conti_t( 'nav.applications' ), 'title' => $f['heading'] ?? '', 'lead' => $f['lead'] ?? '' ) );
?>
<section class="section">
	<div class="container">
		<p class="intro"><?php conti_e( $f['text'] ?? '' ); ?></p>
		<h2 class="visually-hidden"><?php conti_e( $f['industriesHeading'] ?? '' ); ?></h2>
		<ul class="grid grid-4 industries">
			<?php foreach ( (array) ( $f['industries'] ?? array() ) as $i ) : ?>
			<li class="card">
				<div class="card__media card__media--cover"><?php echo conti_image( $i['image'] ?? 0, $i['name'] ?? '', 'conti-card', array( 'loading' => 'lazy', 'sizes' => '(min-width: 1100px) 300px, 50vw' ) ); // phpcs:ignore ?></div>
				<div class="card__body"><h3 class="card__title"><?php conti_e( $i['name'] ?? '' ); ?></h3></div>
			</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
<section class="section section--mist">
	<div class="container grid grid-2">
		<a class="teaser" href="<?php echo esc_url( conti_page_url( 'custom' ) ); ?>"><span class="eyebrow">2006</span><h2><?php conti_e( conti_t( 'nav.custom' ) ); ?></h2><span class="link-arrow"><?php conti_e( conti_t( 'cta.discover' ) ); ?></span></a>
		<a class="teaser teaser--bronze" href="<?php echo esc_url( conti_page_url( 'alubronze' ) ); ?>"><span class="eyebrow">Cu-Al</span><h2><?php conti_e( conti_t( 'nav.alubronze' ) ); ?></h2><span class="link-arrow"><?php conti_e( conti_t( 'cta.discover' ) ); ?></span></a>
	</div>
</section>
<?php get_template_part( 'template-parts/cta-band' ); ?>
