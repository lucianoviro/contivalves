<?php
/**
 * 301 redirects from the old WordPress/qTranslate URLs (data/redirects.json) to the new pages.
 * Only runs when WordPress would otherwise answer 404, so it never hides a real page.
 */

defined( 'ABSPATH' ) || exit;

/** URL of a language-independent route (same shape as the static site's routes). */
function conti_route_url( array $route, string $lang ): string {
	if ( ! in_array( $lang, conti_langs(), true ) ) {
		$lang = conti_default_lang();
	}
	switch ( $route['page'] ?? '' ) {
		case 'home':
			return conti_home_url( $lang );
		case 'family':
			return conti_family_url( $route['family'], $lang );
		case 'product':
			$entry = conti_catalog_index()[ $route['code'] ] ?? null;
			return $entry ? (string) get_permalink( conti_translate_post( $entry['id'], $lang ) ) : conti_family_url( $route['family'], $lang );
		default:
			return conti_page_url( $route['page'], $lang );
	}
}

add_action(
	'template_redirect',
	function () {
		if ( ! is_404() ) {
			return;
		}
		$path = '/' . conti_request_path() . '/';
		$map  = wp_cache_get( 'conti_redirects', 'conti' );
		if ( false === $map ) {
			$map = array();
			foreach ( conti_data( 'redirects' ) as $r ) {
				$map[ $r['from'] ] = $r;
			}
			wp_cache_set( 'conti_redirects', $map, 'conti' );
		}
		if ( isset( $map[ $path ] ) ) {
			$r   = $map[ $path ];
			$url = conti_route_url( $r['route'], $r['lang'] ) . ( ! empty( $r['hash'] ) ? '#' . $r['hash'] : '' );
			wp_safe_redirect( $url, 301, 'Conti' );
			exit;
		}
		// Old uploads links (/wp-content/uploads/…) keep working if the files were copied over:
		// nothing to do here, the web server serves them directly.
	},
	1
);
