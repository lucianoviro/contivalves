<?php
defined( 'ABSPATH' ) || exit;
$f   = conti_fields();
$pdf = conti_file_url( $f['certificateFile'] ?? 0 );
get_template_part( 'template-parts/page-head', null, array( 'eyebrow' => 'ISO 14001', 'title' => $f['heading'] ?? '', 'lead' => $f['lead'] ?? '' ) );
?>
<section class="section--tight">
	<div class="container">
		<div class="stats">
			<?php foreach ( (array) ( $f['stats'] ?? array() ) as $s ) : ?><div class="stat"><div class="stat__value stat__value--patina"><?php conti_e( $s['value'] ?? '' ); ?></div><div class="stat__label"><?php conti_e( $s['label'] ?? '' ); ?></div></div><?php endforeach; ?>
		</div>
	</div>
</section>
<section class="section">
	<div class="container split">
		<div><h2><?php conti_e( $f['sun']['title'] ?? '' ); ?></h2><p class="lead"><?php conti_e( $f['sun']['text'] ?? '' ); ?></p></div>
		<div class="frame frame--43"><?php echo conti_image( $f['image'] ?? 0, $f['sun']['title'] ?? '', 'conti-wide', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 45vw, 100vw' ) ); // phpcs:ignore ?></div>
	</div>
</section>
<section class="section section--mist">
	<div class="container split split--reverse">
		<div>
			<h2><?php conti_e( $f['iso']['title'] ?? '' ); ?></h2>
			<p><?php conti_e( $f['iso']['text'] ?? '' ); ?></p>
			<?php if ( $pdf ) : ?><a class="link-arrow" href="<?php echo esc_url( $pdf ); ?>"><?php conti_e( ( $f['certificate'] ?? '' ) . ' (PDF)' ); ?></a><?php endif; ?>
		</div>
		<div class="certs">
			<?php foreach ( (array) ( $f['certificates'] ?? array() ) as $c ) { echo conti_image( $c['image'] ?? 0, $f['certificate'] ?? '', 'medium_large', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 22vw, 45vw' ) ); } // phpcs:ignore ?>
		</div>
	</div>
</section>
<section class="section">
	<div class="container">
		<h2><?php conti_e( $f['pillarsHeading'] ?? '' ); ?></h2>
		<div class="grid grid-3">
			<?php foreach ( (array) ( $f['pillars'] ?? array() ) as $p ) : ?><article class="pillar"><h3><?php conti_e( $p['title'] ?? '' ); ?></h3><p><?php conti_e( $p['text'] ?? '' ); ?></p></article><?php endforeach; ?>
		</div>
	</div>
</section>
<?php get_template_part( 'template-parts/cta-band' ); ?>
