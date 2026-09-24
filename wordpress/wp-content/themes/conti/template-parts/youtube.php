<?php
/** Click-to-load YouTube (privacy-enhanced domain). $args: id, title. */
defined( 'ABSPATH' ) || exit;
if ( empty( $args['id'] ) ) {
	return;
}
?>
<div class="yt" data-id="<?php echo esc_attr( $args['id'] ); ?>" data-title="<?php echo esc_attr( $args['title'] ?? '' ); ?>">
	<button type="button" class="yt__btn" aria-label="<?php echo esc_attr( '▶ ' . ( $args['title'] ?? '' ) ); ?>">
		<span class="yt__play" aria-hidden="true"><svg viewBox="0 0 68 48"><path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2.3 34 .3 34 .3s-21.2 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.8 47.7 34 47.7 34 47.7s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#c8702a"/><path d="M45 24 27 14v20z" fill="#fff"/></svg></span>
		<span class="yt__title"><?php conti_e( $args['title'] ?? '' ); ?></span>
	</button>
</div>
