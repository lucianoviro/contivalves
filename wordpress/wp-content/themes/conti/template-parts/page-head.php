<?php
/** Page header with breadcrumb. $args: eyebrow, title, lead, after (HTML). */
defined( 'ABSPATH' ) || exit;
$crumbs = conti_breadcrumbs();
?>
<section class="page-head">
	<div class="container">
		<?php get_template_part( 'template-parts/breadcrumb', null, array( 'crumbs' => $crumbs ) ); ?>
		<?php if ( ! empty( $args['eyebrow'] ) ) : ?><p class="eyebrow"><?php conti_e( $args['eyebrow'] ); ?></p><?php endif; ?>
		<h1><?php conti_e( $args['title'] ?? '' ); ?></h1>
		<?php if ( ! empty( $args['lead'] ) ) : ?><p class="lead"><?php conti_e( $args['lead'] ); ?></p><?php endif; ?>
		<?php echo $args['after'] ?? ''; // phpcs:ignore -- HTML built by the template ?>
	</div>
</section>
