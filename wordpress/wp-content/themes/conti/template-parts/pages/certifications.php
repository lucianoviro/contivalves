<?php
defined( 'ABSPATH' ) || exit;
$f = conti_fields();
get_template_part( 'template-parts/page-head', null, array( 'eyebrow' => conti_t( 'nav.certifications' ), 'title' => $f['heading'] ?? '', 'lead' => $f['lead'] ?? '' ) );
?>
<section class="section">
	<div class="container grid grid-2">
		<?php foreach ( (array) ( $f['blocks'] ?? array() ) as $i => $b ) : ?>
		<article class="block"><span class="block__n"><?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span><h2><?php conti_e( $b['title'] ?? '' ); ?></h2><p><?php conti_e( $b['text'] ?? '' ); ?></p></article>
		<?php endforeach; ?>
	</div>
</section>
<section class="section section--mist">
	<div class="container">
		<h2><?php conti_e( $f['galleryHeading'] ?? '' ); ?></h2>
		<div class="grid grid-4 gallery">
			<?php foreach ( (array) ( $f['gallery'] ?? array() ) as $g ) : $full = conti_image_url( $g['image'] ?? 0 ); ?>
			<figure class="card">
				<a class="card__media card__media--cert"<?php echo $full ? ' href="' . esc_url( $full ) . '" target="_blank" rel="noopener"' : ''; ?>><?php echo conti_image( $g['image'] ?? 0, $g['label'] ?? '', 'medium_large', array( 'loading' => 'lazy', 'sizes' => '(min-width: 1100px) 280px, 45vw' ) ); // phpcs:ignore ?></a>
				<figcaption class="card__body small"><?php conti_e( $g['label'] ?? '' ); ?></figcaption>
			</figure>
			<?php endforeach; ?>
		</div>
	</div>
</section>
<?php get_template_part( 'template-parts/cta-band' ); ?>
