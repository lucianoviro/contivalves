<?php
/**
 * Product catalogue API used by the theme.
 *
 * Technical data (code, rating, dimensions, materials, versions, images) lives on the
 * default-language product (English) and is shared by its translations; each translation
 * only carries its own title (the product description in that language).
 */

defined( 'ABSPATH' ) || exit;

/* ── Families ──────────────────────────────────────────────────────────── */

/** Family keys in display order. */
function conti_family_keys(): array {
	$order = array_column( conti_data( 'catalog' )['families'] ?? array(), 'key' );
	$map   = (array) get_option( 'conti_families', array() );
	$keys  = array_values( array_filter( $order, fn( $k ) => isset( $map[ $k ] ) ) );
	foreach ( array_keys( $map ) as $k ) { // families added later in the admin
		if ( ! in_array( $k, $keys, true ) ) {
			$keys[] = $k;
		}
	}
	return $keys;
}

function conti_family_term( string $key, ?string $lang = null ): ?WP_Term {
	$map = (array) get_option( 'conti_families', array() ) + (array) get_option( 'conti_subcats', array() );
	if ( empty( $map[ $key ] ) ) {
		return null;
	}
	$term = get_term( conti_translate_term( (int) $map[ $key ], $lang ), 'conti_family' );
	return $term instanceof WP_Term ? $term : null;
}

function conti_term_key( $term ): string {
	$term_id = $term instanceof WP_Term ? $term->term_id : (int) $term;
	$key     = get_term_meta( $term_id, 'conti_key', true );
	if ( $key ) {
		return $key;
	}
	// translations share the key of the default-language term
	$source = conti_translate_term( $term_id, conti_default_lang() );
	return $source !== $term_id ? (string) get_term_meta( $source, 'conti_key', true ) : '';
}

function conti_family_name( string $key, ?string $lang = null ): string {
	$t = conti_family_term( $key, $lang );
	return $t ? $t->name : $key;
}

function conti_family_meta( string $key, string $field, ?string $lang = null ) {
	$t = conti_family_term( $key, $lang );
	return $t ? get_term_meta( $t->term_id, 'conti_' . $field, true ) : '';
}

/** Family key from a URL slug in a language (top-level terms only). */
function conti_family_by_slug( string $slug, string $lang ): string {
	foreach ( conti_family_keys() as $key ) {
		$t = conti_family_term( $key, $lang );
		if ( $t && $t->slug === $slug && conti_term_lang( $t->term_id ) === $lang ) {
			return $key;
		}
	}
	return '';
}

function conti_family_url( string $key, ?string $lang = null ): string {
	$lang = $lang ?: conti_lang();
	$t    = conti_family_term( $key, $lang );
	return $t ? trailingslashit( conti_page_url( 'products', $lang ) ) . $t->slug . '/' : conti_page_url( 'products', $lang );
}

/* ── Products ──────────────────────────────────────────────────────────── */

/** Code → {id (default language), family, sub, order, slug}. Cached; rebuilt after edits. */
function conti_catalog_index(): array {
	$index = get_option( 'conti_catalog_index' );
	if ( is_array( $index ) ) {
		return $index;
	}
	$index = array();
	$ids   = get_posts(
		array(
			'post_type'        => 'conti_product',
			'post_status'      => 'publish',
			'posts_per_page'   => -1,
			'fields'           => 'ids',
			'lang'             => conti_default_lang(),
			'suppress_filters' => false,
		)
	);
	foreach ( $ids as $id ) {
		if ( conti_post_lang( $id ) !== conti_default_lang() ) {
			continue;
		}
		$code = (string) get_post_meta( $id, '_conti_code', true );
		if ( '' === $code ) {
			continue;
		}
		$family = '';
		$sub    = '';
		foreach ( wp_get_object_terms( $id, 'conti_family' ) as $term ) {
			if ( $term->parent ) {
				$sub    = conti_term_key( $term );
				$family = $family ?: conti_term_key( $term->parent );
			} else {
				$family = conti_term_key( $term );
			}
		}
		$index[ $code ] = array(
			'id'     => $id,
			'family' => $family,
			'sub'    => $sub,
			'order'  => (int) get_post_meta( $id, '_conti_order', true ),
			'slug'   => conti_code_slug( $code ),
		);
	}
	update_option( 'conti_catalog_index', $index, false );
	return $index;
}

function conti_catalog_flush(): void {
	delete_option( 'conti_catalog_index' );
}
add_action( 'save_post_conti_product', 'conti_catalog_flush' );
add_action( 'deleted_post', 'conti_catalog_flush' );
add_action( 'edited_conti_family', 'conti_catalog_flush' );
add_action( 'set_object_terms', 'conti_catalog_flush' );

function conti_code_slug( string $code ): string {
	return sanitize_title( $code );
}

function conti_product_source( int $post_id ): int {
	return conti_translate_post( $post_id, conti_default_lang() );
}

function conti_json_meta( int $post_id, string $key ): array {
	$raw  = get_post_meta( $post_id, $key, true );
	$data = is_string( $raw ) ? json_decode( $raw, true ) : $raw;
	return is_array( $data ) ? $data : array();
}

/** All data of a product, as seen from one of its translations. */
function conti_product( int $post_id ): array {
	static $cache = array();
	if ( isset( $cache[ $post_id ] ) ) {
		return $cache[ $post_id ];
	}
	$src   = conti_product_source( $post_id );
	$code  = (string) get_post_meta( $src, '_conti_code', true );
	$entry = conti_catalog_index()[ $code ] ?? array();
	return $cache[ $post_id ] = array(
		'id'          => $post_id,
		'source'      => $src,
		'code'        => $code,
		'description' => get_the_title( $post_id ),
		'rating'      => (string) get_post_meta( $src, '_conti_rating', true ),
		'order'       => (int) get_post_meta( $src, '_conti_order', true ),
		'family'      => $entry['family'] ?? '',
		'subcategory' => $entry['sub'] ?? '',
		'image'       => (int) get_post_meta( $src, '_conti_image', true ),
		'drawing'     => (int) get_post_meta( $src, '_conti_drawing', true ),
		'datasheet'   => (int) get_post_meta( $src, '_conti_datasheet', true ),
		'materials'   => conti_json_meta( $src, '_conti_materials' ),
		'dimensions'  => conti_json_meta( $src, '_conti_dimensions' ),
		'variants'    => conti_json_meta( $src, '_conti_variants' ),
	);
}

function conti_product_url( int $post_id ): string {
	$p    = conti_product( $post_id );
	$lang = conti_post_lang( $post_id );
	return $p['family'] ? conti_family_url( $p['family'], $lang ) . conti_code_slug( $p['code'] ) . '/' : home_url( '/' );
}

/** Translated product ID from its URL slug. */
function conti_product_by_slug( string $slug, string $lang ): int {
	foreach ( conti_catalog_index() as $entry ) {
		if ( $entry['slug'] === $slug ) {
			return conti_translate_post( $entry['id'], $lang );
		}
	}
	return 0;
}

/** Product IDs of a family in $lang, ordered by sub-category then catalogue order. */
function conti_products_of( string $family, ?string $lang = null ): array {
	return array_merge( ...array_column( conti_grouped_products( $family, $lang ), 'ids' ) ?: array( array() ) );
}

function conti_grouped_products( string $family, ?string $lang = null ): array {
	$lang      = $lang ?: conti_lang();
	$sub_order = array_column( conti_data( 'catalog' )['subcategories'] ?? array(), 'key' );
	$groups    = array();
	foreach ( conti_catalog_index() as $entry ) {
		if ( $entry['family'] !== $family ) {
			continue;
		}
		$groups[ $entry['sub'] ][] = $entry;
	}
	uksort(
		$groups,
		function ( $a, $b ) use ( $sub_order ) {
			$ia = array_search( $a, $sub_order, true );
			$ib = array_search( $b, $sub_order, true );
			return ( false === $ia ? 999 : $ia ) <=> ( false === $ib ? 999 : $ib );
		}
	);
	$out = array();
	foreach ( $groups as $sub => $entries ) {
		usort( $entries, fn( $a, $b ) => $a['order'] <=> $b['order'] );
		$ids = array();
		foreach ( $entries as $e ) {
			$t = conti_translate_post( $e['id'], $lang );
			if ( $t && 'publish' === get_post_status( $t ) ) {
				$ids[] = $t;
			}
		}
		if ( $ids ) {
			$out[] = array( 'key' => (string) $sub, 'ids' => $ids );
		}
	}
	return $out;
}

/* ── Formatting ────────────────────────────────────────────────────────── */

/** "PN25" from "PN25/B 150WSP 300WOG". */
function conti_pn( string $rating ): string {
	return preg_match( '/PN\s?\d+(-\d+)?/', $rating, $m ) ? str_replace( ' ', '', $m[0] ) : '';
}

function conti_size_range( array $dimensions ): string {
	$sizes = array_values( array_filter( $dimensions[0]['sizes'] ?? array() ) );
	if ( ! $sizes ) {
		return '';
	}
	return 1 === count( $sizes ) ? $sizes[0] : $sizes[0] . ' – ' . end( $sizes );
}

function conti_material_name( array $m, ?string $lang = null ): string {
	return trim( conti_gloss( 'materialNames', $m['name'] ?? '', $lang ) . ' ' . ( $m['grade'] ?? '' ) );
}

function conti_body_material( array $materials, ?string $lang = null ): string {
	foreach ( $materials as $m ) {
		if ( 'BODY' === ( $m['part'] ?? '' ) ) {
			return conti_material_name( $m, $lang ) . ( ! empty( $m['standard'] ) ? ' (' . $m['standard'] . ')' : '' );
		}
	}
	return '';
}

function conti_body_alloy( array $materials ): string {
	foreach ( $materials as $m ) {
		if ( 'BODY' === ( $m['part'] ?? '' ) ) {
			return (string) $m['name'];
		}
	}
	return '';
}

function conti_row_label( array $row, ?string $lang = null ): string {
	return ! empty( $row['key'] ) ? conti_gloss( 'rowLabels', $row['key'], $lang ) : (string) ( $row['label'] ?? '' );
}
