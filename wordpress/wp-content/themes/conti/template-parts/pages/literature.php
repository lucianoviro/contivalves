<?php
defined( 'ABSPATH' ) || exit;
$f = conti_fields();
get_template_part( 'template-parts/page-head', null, array( 'title' => $f['heading'] ?? '', 'lead' => $f['lead'] ?? '' ) );
$doc = function ( array $d ) {
	$url = conti_file_url( $d['file'] ?? 0 );
	?>
	<li class="doc">
		<span class="doc__icon" aria-hidden="true"><?php conti_e( strtok( (string) ( $d['meta'] ?? 'PDF' ), ' ' ) ); ?></span>
		<span class="doc__name"><?php conti_e( $d['name'] ?? '' ); ?><?php if ( ! empty( $d['meta'] ) ) : ?><small><?php conti_e( $d['meta'] ); ?></small><?php endif; ?></span>
		<?php if ( $url ) : ?><a class="btn btn--ghost" href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener"><?php conti_e( conti_t( 'cta.download' ) ); ?></a><?php else : ?><span class="muted small">—</span><?php endif; ?>
	</li>
	<?php
};
?>
<section class="section--tight">
	<div class="container">
		<h2><?php conti_e( $f['catalogues'] ?? '' ); ?></h2>
		<ul class="docs"><?php foreach ( (array) ( $f['catalogueFiles'] ?? array() ) as $d ) { $doc( $d ); } ?></ul>
	</div>
</section>
<section class="section--tight section--mist">
	<div class="container">
		<h2><?php conti_e( $f['manuals'] ?? '' ); ?></h2>
		<div class="grid grid-3 manuals">
			<?php foreach ( (array) ( $f['manualFiles'] ?? array() ) as $m ) : $name = conti_family_name( $m['family'] ?? '' ); $full = conti_image_url( $m['image'] ?? 0 ); ?>
			<figure class="card">
				<a class="card__media manual"<?php echo $full ? ' href="' . esc_url( $full ) . '" target="_blank" rel="noopener"' : ''; ?>><?php echo conti_image( $m['image'] ?? 0, ( $f['manuals'] ?? '' ) . ' – ' . $name, 'medium_large', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 30vw, 90vw' ) ); // phpcs:ignore ?></a>
				<figcaption class="card__body"><a class="card__title" href="<?php echo esc_url( conti_family_url( $m['family'] ?? '' ) ); ?>"><?php conti_e( $name ); ?></a></figcaption>
			</figure>
			<?php endforeach; ?>
		</div>
	</div>
</section>
<section class="section--tight">
	<div class="container">
		<h2><?php conti_e( $f['certificates'] ?? '' ); ?></h2>
		<ul class="docs"><?php foreach ( (array) ( $f['certificateFiles'] ?? array() ) as $d ) { $doc( $d ); } ?></ul>
	</div>
</section>
<?php get_template_part( 'template-parts/cta-band' ); ?>
