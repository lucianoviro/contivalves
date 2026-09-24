<?php
defined( 'ABSPATH' ) || exit;
$crumbs = $args['crumbs'] ?? array();
if ( ! $crumbs ) {
	return;
}
?>
<nav class="breadcrumb" aria-label="<?php echo esc_attr( conti_t( 'nav.breadcrumb' ) ); ?>">
	<ol>
		<?php foreach ( $crumbs as $i => $c ) : ?>
		<li><?php if ( $i < count( $crumbs ) - 1 ) : ?><a href="<?php echo esc_url( $c['url'] ); ?>"><?php conti_e( $c['name'] ); ?></a><?php else : ?><span aria-current="page"><?php conti_e( $c['name'] ); ?></span><?php endif; ?></li>
		<?php endforeach; ?>
	</ol>
</nav>
