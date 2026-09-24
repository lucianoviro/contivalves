<?php
/** Conti pages are rendered by template-parts/pages/<key>.php; other pages show their content. */
defined( 'ABSPATH' ) || exit;
get_header();
$key = conti_page_key( get_queried_object_id() );
if ( $key && locate_template( "template-parts/pages/{$key}.php" ) ) {
	get_template_part( "template-parts/pages/{$key}" );
} else {
	while ( have_posts() ) {
		the_post();
		get_template_part( 'template-parts/page-head', null, array( 'title' => get_the_title() ) );
		echo '<section class="section"><div class="container prose">';
		the_content();
		echo '</div></section>';
	}
}
get_footer();
