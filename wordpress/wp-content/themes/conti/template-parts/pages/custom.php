<?php
defined( 'ABSPATH' ) || exit;
$f = conti_fields();
get_template_part( 'template-parts/page-head', null, array( 'eyebrow' => 'Custom Engineered Solutions · 2006', 'title' => $f['heading'] ?? '', 'lead' => $f['lead'] ?? '' ) );
$mail = 'mailto:' . conti_site()['emails']['technical'] . '?subject=' . rawurlencode( $f['heading'] ?? '' );
?>
<section class="section">
	<div class="container split">
		<div class="prose"><?php foreach ( (array) ( $f['paragraphs'] ?? array() ) as $p ) : ?><p><?php conti_e( $p ); ?></p><?php endforeach; ?></div>
		<div class="options">
			<h2><?php conti_e( $f['optionsHeading'] ?? '' ); ?></h2>
			<ul class="check-list"><?php foreach ( (array) ( $f['options'] ?? array() ) as $o ) : ?><li><?php conti_e( $o ); ?></li><?php endforeach; ?></ul>
			<a class="btn btn--primary" href="<?php echo esc_url( $mail ); ?>"><?php conti_e( $f['cta'] ?? '' ); ?></a>
		</div>
	</div>
</section>
<section class="section--tight section--mist">
	<div class="container photos">
		<?php foreach ( (array) ( $f['photos'] ?? array() ) as $ph ) : ?><div class="photo"><?php echo conti_image( $ph['image'] ?? 0, $f['heading'] ?? '', 'conti-card', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 25vw, 50vw' ) ); // phpcs:ignore ?></div><?php endforeach; ?>
	</div>
</section>
<?php get_template_part( 'template-parts/cta-band' ); ?>
