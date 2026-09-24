<?php
defined( 'ABSPATH' ) || exit;
$f = conti_fields();
get_template_part( 'template-parts/page-head', null, array( 'eyebrow' => 'Cu-Al', 'title' => $f['heading'] ?? '', 'lead' => $f['lead'] ?? '' ) );
?>
<section class="section">
	<div class="container split">
		<div class="prose"><?php foreach ( (array) ( $f['paragraphs'] ?? array() ) as $p ) : ?><p><?php conti_e( $p ); ?></p><?php endforeach; ?></div>
		<div>
			<div class="frame frame--wide"><?php echo conti_image( $f['image'] ?? 0, $f['heading'] ?? '', 'conti-wide', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 45vw, 100vw' ) ); // phpcs:ignore ?></div>
			<h2 class="props-title"><?php conti_e( $f['propertiesHeading'] ?? '' ); ?></h2>
			<ul class="check-list"><?php foreach ( (array) ( $f['properties'] ?? array() ) as $o ) : ?><li><?php conti_e( $o ); ?></li><?php endforeach; ?></ul>
		</div>
	</div>
</section>
<section class="section section--mist">
	<div class="container">
		<h2><?php conti_e( $f['rangeHeading'] ?? '' ); ?></h2>
		<div class="grid grid-4"><?php foreach ( conti_alubronze_products() as $id ) { get_template_part( 'template-parts/product-card', null, array( 'id' => $id ) ); } ?></div>
	</div>
</section>
<?php get_template_part( 'template-parts/cta-band' ); ?>
