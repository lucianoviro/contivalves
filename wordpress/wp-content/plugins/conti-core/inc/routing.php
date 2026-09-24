<?php
/**
 * Localised catalogue URLs, identical to the static site:
 *   /products/ball-valves/                  family (EN, default language without prefix)
 *   /it/prodotti/valvole-a-sfera/04352/     product (IT)
 * The first segment is the slug of the translated "Products" page, the second the slug of the
 * family term in that language, the third the product code.
 */

defined( 'ABSPATH' ) || exit;

/** Request path relative to the WordPress home, without slashes. */
function conti_request_path(): string {
	$path = (string) parse_url( $_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH );
	$base = trim( (string) parse_url( home_url(), PHP_URL_PATH ), '/' );
	$path = trim( rawurldecode( $path ), '/' );
	if ( $base && str_starts_with( $path, $base ) ) {
		$path = trim( substr( $path, strlen( $base ) ), '/' );
	}
	return $path;
}

/** [lang, segments] of the current request. */
function conti_split_request(): array {
	$segs = array_values( array_filter( explode( '/', conti_request_path() ), 'strlen' ) );
	$lang = conti_default_lang();
	if ( $segs && in_array( $segs[0], conti_langs(), true ) && $segs[0] !== $lang ) {
		$lang = array_shift( $segs );
	}
	return array( $lang, $segs );
}

// Runs after WordPress has parsed the URL (which found nothing: these paths have no rewrite rule)
// and replaces the query with the family archive or the product.
add_filter(
	'request',
	function ( $query_vars ) {
		if ( is_admin() ) {
			return $query_vars;
		}
		[ $lang, $segs ] = conti_split_request();
		if ( count( $segs ) < 2 || count( $segs ) > 3 ) {
			return $query_vars;
		}
		$products_page = conti_page_id( 'products', $lang );
		if ( ! $products_page || get_post_field( 'post_name', $products_page ) !== $segs[0] ) {
			return $query_vars;
		}
		$family = conti_family_by_slug( $segs[1], $lang );
		if ( ! $family ) {
			return $query_vars;
		}
		$lang_var = conti_has_polylang() ? array( 'lang' => $lang ) : array();
		if ( 2 === count( $segs ) ) {
			return array( 'conti_family' => conti_family_term( $family, $lang )->slug ) + $lang_var;
		}
		$id = conti_product_by_slug( $segs[2], $lang );
		if ( ! $id || conti_product( $id )['family'] !== $family || conti_post_lang( $id ) !== $lang ) {
			return $query_vars;
		}
		return array( 'p' => $id, 'post_type' => 'conti_product' ) + $lang_var;
	},
	10
);

add_filter(
	'post_type_link',
	fn( $url, $post ) => 'conti_product' === $post->post_type && 'publish' === $post->post_status ? conti_product_url( $post->ID ) : $url,
	20,
	2
);

add_filter(
	'term_link',
	function ( $url, $term, $taxonomy ) {
		if ( 'conti_family' !== $taxonomy ) {
			return $url;
		}
		$lang = conti_term_lang( $term->term_id );
		if ( $term->parent ) { // sub-category → anchor on the family page
			return conti_family_url( conti_term_key( $term->parent ), $lang ) . '#' . conti_term_key( $term );
		}
		return conti_family_url( conti_term_key( $term ), $lang );
	},
	20,
	3
);

// Family and product URLs are final: no canonical guessing on them.
add_filter(
	'redirect_canonical',
	fn( $redirect ) => ( is_tax( 'conti_family' ) || is_singular( 'conti_product' ) ) ? false : $redirect
);
