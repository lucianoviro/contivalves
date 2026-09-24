<?php
/** Product page: printable as a datasheet. */
defined( 'ABSPATH' ) || exit;
get_header();

$p     = conti_product( get_queried_object_id() );
$lang  = conti_lang();
$fam   = $p['family'];
$size  = conti_size_range( $p['dimensions'] );
$body  = conti_body_material( $p['materials'] );
$sub   = $p['subcategory'] ? conti_family_term( $p['subcategory'] ) : null;
$specs = array_filter(
	array(
		array( conti_t( 'product.code' ), $p['code'], '' ),
		array( conti_t( 'product.family' ), conti_family_name( $fam ), conti_family_url( $fam ) ),
		$sub ? array( conti_t( 'product.type' ), $sub->name, '' ) : null,
		$p['rating'] ? array( conti_t( 'product.rating' ), $p['rating'], '' ) : null,
		$size ? array( conti_t( 'product.sizes' ), $size, '' ) : null,
		$body ? array( conti_t( 'product.bodyMaterial' ), $body, '' ) : null,
	)
);
$subject   = conti_t( 'product.quoteSubject' ) . ' – ' . conti_t( 'product.code' ) . ' ' . $p['code'];
$datasheet = conti_file_url( $p['datasheet'] );
$singular  = (string) conti_family_meta( $fam, 'singular' );

// related: same sub-category first, then same family
$all     = conti_products_of( $fam, $lang );
$same    = array_filter( $all, fn( $id ) => $id !== $p['id'] && conti_product( $id )['subcategory'] === $p['subcategory'] );
$related = array_slice( array_values( array_unique( array_merge( $same, array_filter( $all, fn( $id ) => $id !== $p['id'] ) ) ) ), 0, 4 );
?>
<section class="product-head">
	<div class="container">
		<?php get_template_part( 'template-parts/breadcrumb', null, array( 'crumbs' => conti_breadcrumbs() ) ); ?>
		<div class="product-grid">
			<div class="product-media"><?php echo conti_image( $p['image'], trim( $singular . ' Conti ' . $p['code'] ), 'large', array( 'loading' => 'eager', 'fetchpriority' => 'high', 'sizes' => '(min-width: 900px) 45vw, 100vw' ) ); // phpcs:ignore ?></div>
			<div class="product-info">
				<p class="code code--big"><?php conti_e( conti_t( 'product.code' ) . ' ' . $p['code'] ); ?></p>
				<h1><?php conti_e( $p['description'] ); ?></h1>
				<dl class="facts">
					<?php foreach ( $specs as [ $k, $v, $link ] ) : ?>
					<dt><?php conti_e( $k ); ?></dt><dd><?php if ( $link ) : ?><a href="<?php echo esc_url( $link ); ?>"><?php conti_e( $v ); ?></a><?php else : ?><?php conti_e( $v ); ?><?php endif; ?></dd>
					<?php endforeach; ?>
				</dl>
				<div class="btn-row no-print">
					<a class="btn btn--primary" href="<?php echo esc_url( conti_quote_mailto( $subject ) ); ?>"><?php conti_e( conti_t( 'cta.quote' ) ); ?></a>
					<?php if ( $datasheet ) : ?><a class="btn btn--ghost" href="<?php echo esc_url( $datasheet ); ?>" download><?php conti_e( conti_t( 'cta.datasheet' ) ); ?></a><?php endif; ?>
					<button class="btn btn--ghost" type="button" data-print><?php conti_e( conti_t( 'cta.print' ) ); ?></button>
				</div>
				<p class="made small muted"><?php conti_e( conti_t( 'product.madeIn' ) ); ?></p>
			</div>
		</div>
	</div>
</section>

<?php if ( $p['dimensions'] ) : ?>
<section class="section--tight" id="dimensions">
	<div class="container">
		<h2><?php conti_e( conti_t( 'product.dimensions' ) ); ?></h2>
		<p class="muted small"><?php conti_e( conti_t( 'product.dimensionsNote' ) ); ?></p>
		<div class="dims">
			<div class="dims__tables">
				<?php foreach ( $p['dimensions'] as $d ) : ?>
				<div class="table-wrap">
					<table class="table-dims">
						<?php if ( ! empty( $d['head'] ) ) : ?><caption><?php conti_e( conti_gloss( 'tableHeads', $d['head'] ) ); ?></caption><?php endif; ?>
						<thead><tr><th scope="col"><?php conti_e( conti_t( 'product.size' ) ); ?></th><?php foreach ( $d['rows'] as $r ) : ?><th scope="col"><?php conti_e( conti_row_label( $r ) ); ?></th><?php endforeach; ?></tr></thead>
						<tbody>
							<?php foreach ( $d['sizes'] as $i => $s ) : ?>
							<tr><th scope="row"><?php conti_e( $s ); ?></th><?php foreach ( $d['rows'] as $r ) : ?><td><?php conti_e( ( $r['values'][ $i ] ?? '' ) ?: '–' ); ?></td><?php endforeach; ?></tr>
							<?php endforeach; ?>
						</tbody>
					</table>
				</div>
				<?php endforeach; ?>
			</div>
			<?php if ( $p['drawing'] ) : ?>
			<figure class="drawing">
				<?php echo conti_image( $p['drawing'], conti_t( 'product.drawing' ) . ' – ' . $p['code'], 'large', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 40vw, 100vw' ) ); // phpcs:ignore ?>
				<figcaption class="small muted"><?php conti_e( conti_t( 'product.drawing' ) . ' – ' . $p['code'] ); ?></figcaption>
			</figure>
			<?php endif; ?>
		</div>
	</div>
</section>
<?php endif; ?>

<?php if ( $p['materials'] || $p['variants'] ) : ?>
<section class="section--tight section--mist">
	<div class="container two-col">
		<?php if ( $p['materials'] ) : ?>
		<div>
			<h2><?php conti_e( conti_t( 'product.materials' ) ); ?></h2>
			<div class="table-wrap">
				<table class="table-text">
					<thead><tr><th scope="col"><?php conti_e( conti_t( 'product.part' ) ); ?></th><th scope="col"><?php conti_e( conti_t( 'product.material' ) ); ?></th><th scope="col">Standard</th></tr></thead>
					<tbody>
						<?php foreach ( $p['materials'] as $m ) : ?>
						<tr><th scope="row"><?php conti_e( conti_gloss( 'parts', $m['part'] ?? '' ) ); ?></th><td><?php conti_e( conti_material_name( $m ) ); ?></td><td><?php conti_e( $m['standard'] ?? '' ); ?></td></tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>
		</div>
		<?php endif; ?>
		<?php if ( $p['variants'] ) : ?>
		<div>
			<h2><?php conti_e( conti_t( 'product.variants' ) ); ?></h2>
			<div class="table-wrap">
				<table class="table-text">
					<thead><tr><th scope="col"><?php conti_e( conti_t( 'product.code' ) ); ?></th><th scope="col"><?php conti_e( conti_t( 'product.variant' ) ); ?></th><th scope="col"><?php conti_e( conti_t( 'product.rating' ) ); ?></th></tr></thead>
					<tbody>
						<?php foreach ( $p['variants'] as $v ) : ?>
						<tr><th scope="row" class="code"><?php conti_e( $v['code'] ?? '' ); ?></th><td><?php conti_e( conti_gloss( 'variantTexts', $v['text'] ?? '' ) ); ?></td><td><?php conti_e( $v['rating'] ?? '' ); ?></td></tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>
		</div>
		<?php endif; ?>
	</div>
</section>
<?php endif; ?>

<?php if ( $related ) : ?>
<section class="section--tight related">
	<div class="container">
		<div class="section-head">
			<h2><?php conti_e( conti_t( 'product.related' ) ); ?></h2>
			<a class="link-arrow" href="<?php echo esc_url( conti_family_url( $fam ) ); ?>"><?php conti_e( conti_family_name( $fam ) ); ?></a>
		</div>
		<div class="grid grid-4">
			<?php foreach ( $related as $id ) { get_template_part( 'template-parts/product-card', null, array( 'id' => $id ) ); } ?>
		</div>
	</div>
</section>
<?php endif; ?>

<?php
get_template_part( 'template-parts/cta-band', null, array( 'subject' => $subject ) );
get_footer();
