<?php
defined( 'ABSPATH' ) || exit;
get_header();
get_template_part( 'template-parts/page-head', null, array( 'title' => wp_get_document_title() ) );
echo '<section class="section"><div class="container prose">';
while ( have_posts() ) {
	the_post();
	echo '<h2><a href="' . esc_url( get_permalink() ) . '">' . esc_html( get_the_title() ) . '</a></h2>';
}
echo '</div></section>';
get_footer();
