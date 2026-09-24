<?php
/** $args: id (product post in the current language). */
defined( 'ABSPATH' ) || exit;
$p    = conti_product( (int) $args['id'] );
$pn   = conti_pn( $p['rating'] );
$size = conti_size_range( $p['dimensions'] );
?>
<article class="card product-card">
	<div class="card__media"><?php echo conti_image( $p['image'], conti_t( 'product.code' ) . ' ' . $p['code'] . ' – ' . $p['description'], 'conti-card', array( 'loading' => 'lazy', 'sizes' => '(min-width: 1100px) 280px, (min-width: 640px) 45vw, 50vw' ) ); // phpcs:ignore ?></div>
	<div class="card__body">
		<span class="code"><?php conti_e( conti_t( 'product.code' ) . ' ' . $p['code'] ); ?></span>
		<h3 class="product-card__title"><a class="stretched" href="<?php echo esc_url( get_permalink( $p['id'] ) ); ?>"><?php conti_e( $p['description'] ); ?></a></h3>
		<div class="card__meta">
			<?php if ( $pn ) : ?><span class="chip chip--bronze"><?php conti_e( $pn ); ?></span><?php endif; ?>
			<?php if ( $size ) : ?><span class="chip"><?php conti_e( $size ); ?></span><?php endif; ?>
			<?php if ( $p['variants'] ) : ?><span class="chip chip--patina">+<?php echo (int) count( $p['variants'] ); ?></span><?php endif; ?>
		</div>
	</div>
</article>
