<?php
defined( 'ABSPATH' ) || exit;
$f = conti_fields();
get_template_part( 'template-parts/page-head', null, array( 'eyebrow' => conti_t( 'nav.production' ), 'title' => $f['heading'] ?? '', 'lead' => $f['lead'] ?? '' ) );
?>
<section class="section">
	<div class="container split">
		<div><p class="lead"><?php conti_e( $f['text'] ?? '' ); ?></p></div>
		<div class="frame frame--wide"><?php echo conti_image( $f['image'] ?? 0, $f['heading'] ?? '', 'conti-wide', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 45vw, 100vw' ) ); // phpcs:ignore ?></div>
	</div>
</section>
<section class="section section--mist">
	<div class="container">
		<ol class="steps">
			<?php foreach ( (array) ( $f['steps'] ?? array() ) as $i => $s ) : ?>
			<li class="step"><span class="step__n"><?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span><h2 class="step__title"><?php conti_e( $s['title'] ?? '' ); ?></h2><p><?php conti_e( $s['text'] ?? '' ); ?></p></li>
			<?php endforeach; ?>
		</ol>
	</div>
</section>
<section class="section">
	<div class="container narrow"><?php get_template_part( 'template-parts/youtube', null, array( 'id' => $f['youtube'] ?? '', 'title' => $f['videoTitle'] ?? '' ) ); ?></div>
</section>
<?php get_template_part( 'template-parts/cta-band' ); ?>
