<?php
defined( 'ABSPATH' ) || exit;
$f = conti_fields();
get_template_part( 'template-parts/page-head', null, array( 'title' => $f['heading'] ?? '', 'lead' => $f['lead'] ?? '' ) );
?>
<section class="section">
	<div class="container">
		<div class="grid grid-3">
			<?php foreach ( conti_family_keys() as $key ) { get_template_part( 'template-parts/family-card', null, array( 'key' => $key, 'intro' => true ) ); } ?>
		</div>
	</div>
</section>

<section class="section section--mist">
	<div class="container split">
		<div>
			<h2><?php conti_e( $f['materialsHeading'] ?? '' ); ?></h2>
			<p class="lead"><?php conti_e( $f['materialsText'] ?? '' ); ?></p>
		</div>
		<div class="btn-row">
			<a class="btn btn--primary" href="<?php echo esc_url( conti_page_url( 'custom' ) ); ?>"><?php conti_e( conti_t( 'nav.custom' ) ); ?></a>
			<a class="btn btn--ghost" href="<?php echo esc_url( conti_page_url( 'alubronze' ) ); ?>"><?php conti_e( conti_t( 'nav.alubronze' ) ); ?></a>
			<a class="btn btn--ghost" href="<?php echo esc_url( conti_page_url( 'literature' ) ); ?>"><?php conti_e( conti_t( 'nav.literature' ) ); ?></a>
		</div>
	</div>
</section>

<?php get_template_part( 'template-parts/cta-band' ); ?>
