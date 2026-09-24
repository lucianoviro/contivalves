<?php
defined( 'ABSPATH' ) || exit;
$f = conti_fields();
get_template_part( 'template-parts/page-head', null, array( 'eyebrow' => conti_t( 'nav.companyOverview' ), 'title' => $f['heading'] ?? '', 'lead' => $f['lead'] ?? '' ) );
$explore = array( 'history', 'production', 'certifications', 'environment' );
?>
<section class="section">
	<div class="container split">
		<div>
			<blockquote class="quote"><p>“<?php conti_e( $f['quote'] ?? '' ); ?>”</p><footer>— <?php conti_e( $f['quoteBy'] ?? '' ); ?></footer></blockquote>
			<p class="lead"><?php conti_e( $f['mission'] ?? '' ); ?></p>
		</div>
		<div class="map"><?php echo conti_image( $f['image'] ?? 0, $f['facts'][6][1] ?? '', 'large', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 45vw, 100vw' ) ); // phpcs:ignore ?></div>
	</div>
</section>
<section class="section section--mist">
	<div class="container narrow">
		<h2><?php conti_e( $f['factsHeading'] ?? '' ); ?></h2>
		<dl class="facts">
			<?php foreach ( (array) ( $f['facts'] ?? array() ) as $fact ) : ?><dt><?php conti_e( $fact[0] ?? '' ); ?></dt><dd><?php conti_e( $fact[1] ?? '' ); ?></dd><?php endforeach; ?>
		</dl>
	</div>
</section>
<section class="section">
	<div class="container">
		<h2><?php conti_e( $f['exploreHeading'] ?? '' ); ?></h2>
		<div class="grid grid-4">
			<?php foreach ( $explore as $key ) : ?>
			<article class="card">
				<div class="card__media card__media--cover"><?php echo conti_image( $f['exploreImages'][ $key ] ?? 0, conti_t( CONTI_PAGE_NAV[ $key ] ), 'conti-card', array( 'loading' => 'lazy', 'sizes' => '(min-width: 1100px) 300px, 50vw' ) ); // phpcs:ignore ?></div>
				<div class="card__body"><h3 class="card__title"><a class="stretched" href="<?php echo esc_url( conti_page_url( $key ) ); ?>"><?php conti_e( conti_t( CONTI_PAGE_NAV[ $key ] ) ); ?></a></h3></div>
			</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>
<?php get_template_part( 'template-parts/cta-band' ); ?>
