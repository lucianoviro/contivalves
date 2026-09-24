<?php
/** Product family page: intro + products grouped by sub-category. */
defined( 'ABSPATH' ) || exit;
get_header();

$key    = conti_term_key( get_queried_object() );
$lang   = conti_lang();
$groups = conti_grouped_products( $key, $lang );
$count  = array_sum( array_map( fn( $g ) => count( $g['ids'] ), $groups ) );
$label  = array( 'en' => '%d items', 'it' => '%d articoli', 'fr' => '%d articles', 'es' => '%d artículos', 'de' => '%d Artikel' )[ $lang ] ?? '%d';

// chips: body alloys + PN range, same as the <title>
$alloys = array();
$pns    = array();
foreach ( $groups as $g ) {
	foreach ( $g['ids'] as $id ) {
		$p = conti_product( $id );
		if ( $a = conti_body_alloy( $p['materials'] ) ) {
			$alloys[ $a ] = conti_gloss( 'materialNames', $a );
		}
		if ( preg_match_all( '/\d+/', conti_pn( $p['rating'] ), $m ) ) {
			array_push( $pns, ...array_map( 'intval', $m[0] ) );
		}
	}
}
$range = $pns ? ( min( $pns ) === max( $pns ) ? 'PN' . min( $pns ) : 'PN' . min( $pns ) . '–PN' . max( $pns ) ) : '';

ob_start();
?>
<div class="chips">
	<?php foreach ( $alloys as $a ) : ?><span class="chip"><?php conti_e( $a ); ?></span><?php endforeach; ?>
	<?php if ( $range ) : ?><span class="chip chip--bronze"><?php conti_e( $range ); ?></span><?php endif; ?>
</div>
<?php if ( count( $groups ) > 1 ) : ?>
<nav class="subnav" aria-label="<?php echo esc_attr( conti_family_name( $key ) ); ?>">
	<?php foreach ( $groups as $g ) : if ( ! $g['key'] ) { continue; } $t = conti_family_term( $g['key'] ); ?>
	<a href="#<?php echo esc_attr( $g['key'] ); ?>"><?php conti_e( $t ? $t->name : $g['key'] ); ?> <span><?php echo (int) count( $g['ids'] ); ?></span></a>
	<?php endforeach; ?>
</nav>
<?php endif; ?>
<?php
$after = ob_get_clean();
get_template_part(
	'template-parts/page-head',
	null,
	array(
		'eyebrow' => sprintf( $label, $count ),
		'title'   => conti_family_name( $key ),
		'lead'    => (string) conti_family_meta( $key, 'intro' ),
		'after'   => $after,
	)
);

foreach ( $groups as $i => $g ) :
	$t = $g['key'] ? conti_family_term( $g['key'] ) : null;
	?>
	<section class="section--tight<?php echo 1 === $i % 2 ? ' section--mist' : ''; ?>" id="<?php echo esc_attr( $g['key'] ?: 'range' ); ?>">
		<div class="container">
			<?php if ( $t && count( $groups ) > 1 ) : ?><h2 class="group-title"><?php conti_e( $t->name ); ?></h2><?php endif; ?>
			<div class="grid grid-4">
				<?php foreach ( $g['ids'] as $id ) { get_template_part( 'template-parts/product-card', null, array( 'id' => $id ) ); } ?>
			</div>
		</div>
	</section>
<?php endforeach; ?>

<section class="section--tight other">
	<div class="container">
		<h2 class="group-title"><?php conti_e( conti_t( 'nav.allProducts' ) ); ?></h2>
		<ul class="other__list">
			<?php foreach ( conti_family_keys() as $k ) : if ( $k === $key ) { continue; } ?>
			<li><a href="<?php echo esc_url( conti_family_url( $k ) ); ?>"><?php conti_e( conti_family_name( $k ) ); ?></a></li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>

<?php
get_template_part( 'template-parts/cta-band', null, array( 'subject' => conti_t( 'product.quoteSubject' ) . ' – ' . conti_family_name( $key ) ) );
get_footer();
