<?php
/** $args: key, intro (bool). */
defined( 'ABSPATH' ) || exit;
$key   = $args['key'];
$count = count( conti_products_of( $key ) );
$intro = ! empty( $args['intro'] ) ? conti_first_sentence( (string) conti_family_meta( $key, 'intro' ) ) : '';
$n     = conti_lang();
$label = array( 'en' => '%d items', 'it' => '%d articoli', 'fr' => '%d articles', 'es' => '%d artículos', 'de' => '%d Artikel' )[ $n ] ?? '%d';
?>
<article class="card family-card">
	<div class="card__media"><?php echo conti_image( conti_family_meta( $key, 'image' ), conti_family_name( $key ), 'conti-card', array( 'loading' => 'lazy', 'sizes' => '(min-width: 1100px) 300px, (min-width: 640px) 45vw, 50vw' ) ); // phpcs:ignore ?></div>
	<div class="card__body">
		<h3 class="card__title"><a class="stretched" href="<?php echo esc_url( conti_family_url( $key ) ); ?>"><?php conti_e( conti_family_name( $key ) ); ?></a></h3>
		<?php if ( $intro ) : ?><p class="card__text"><?php conti_e( $intro ); ?></p><?php endif; ?>
		<div class="card__meta"><span class="chip"><?php conti_e( sprintf( $label, $count ) ); ?></span></div>
	</div>
</article>
