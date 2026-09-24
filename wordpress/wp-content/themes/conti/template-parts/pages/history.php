<?php
defined( 'ABSPATH' ) || exit;
$f = conti_fields();
get_template_part( 'template-parts/page-head', null, array( 'eyebrow' => '1919 – 2019', 'title' => $f['heading'] ?? '', 'lead' => $f['lead'] ?? '', 'after' => '<p class="intro">' . esc_html( $f['text'] ?? '' ) . '</p>' ) );
?>
<section class="section">
	<div class="container">
		<ol class="timeline">
			<?php foreach ( (array) ( $f['milestones'] ?? array() ) as $m ) : ?>
			<li class="milestone">
				<div class="milestone__year"><?php conti_e( $m['year'] ?? '' ); ?></div>
				<div class="milestone__body"><p><?php conti_e( $m['text'] ?? '' ); ?></p></div>
				<?php if ( ! empty( $m['image'] ) ) : ?><div class="milestone__media"><?php echo conti_image( $m['image'], ( $m['year'] ?? '' ) . ' – ' . ( $m['text'] ?? '' ), 'medium_large', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 280px, 90vw' ) ); // phpcs:ignore ?></div><?php endif; ?>
			</li>
			<?php endforeach; ?>
		</ol>
	</div>
</section>
<?php get_template_part( 'template-parts/cta-band' ); ?>
