<?php
/**
 * Pages: composed in the block editor with the "Conti" blocks (plugin Conti Core).
 * A page without its own header block gets the standard one (title + breadcrumb).
 */
defined( 'ABSPATH' ) || exit;
get_header();
while ( have_posts() ) {
	the_post();
	if ( ! has_block( 'conti/page-head' ) && ! has_block( 'conti/hero' ) ) {
		get_template_part( 'template-parts/page-head', null, array( 'title' => get_the_title() ) );
	}
	if ( has_blocks() ) {
		the_content();
	} else {
		echo '<section class="section"><div class="container prose">';
		the_content();
		echo '</div></section>';
	}
}
get_footer();
