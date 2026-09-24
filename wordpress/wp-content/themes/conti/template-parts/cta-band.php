<?php
/** Dark call-to-action band. $args: title, text, subject. */
defined( 'ABSPATH' ) || exit;
?>
<section class="cta no-print">
	<div class="container cta__inner">
		<div>
			<h2><?php conti_e( $args['title'] ?? conti_t( 'cta.quote' ) ); ?></h2>
			<p><?php conti_e( $args['text'] ?? conti_t( 'product.custom' ) ); ?></p>
		</div>
		<div class="btn-row">
			<a class="btn btn--light" href="<?php echo esc_url( conti_quote_mailto( $args['subject'] ?? '' ) ); ?>"><?php conti_e( conti_t( 'cta.quote' ) ); ?></a>
			<a class="btn cta__ghost" href="<?php echo esc_url( conti_page_url( 'contact' ) ); ?>"><?php conti_e( conti_t( 'nav.contact' ) ); ?></a>
		</div>
	</div>
</section>
