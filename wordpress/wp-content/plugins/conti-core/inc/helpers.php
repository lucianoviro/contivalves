<?php
/**
 * Language, data and URL helpers. Every Polylang call is wrapped so the site degrades to
 * a single language (the default) if Polylang is deactivated.
 */

defined( 'ABSPATH' ) || exit;

const CONTI_LANG_ORDER = array( 'en', 'it', 'fr', 'es', 'de' );
const CONTI_LANG_META  = array(
	'en' => array( 'label' => 'EN', 'name' => 'English', 'locale' => 'en_GB', 'og' => 'en_GB' ),
	'it' => array( 'label' => 'IT', 'name' => 'Italiano', 'locale' => 'it_IT', 'og' => 'it_IT' ),
	'fr' => array( 'label' => 'FR', 'name' => 'Français', 'locale' => 'fr_FR', 'og' => 'fr_FR' ),
	'es' => array( 'label' => 'ES', 'name' => 'Español', 'locale' => 'es_ES', 'og' => 'es_ES' ),
	'de' => array( 'label' => 'DE', 'name' => 'Deutsch', 'locale' => 'de_DE', 'og' => 'de_DE' ),
);

/* ── Languages ─────────────────────────────────────────────────────────── */

function conti_has_polylang(): bool {
	return function_exists( 'pll_languages_list' ) && function_exists( 'pll_get_post' );
}

/** Active languages in display order (en, it, fr, es, de). */
function conti_langs(): array {
	$list = conti_has_polylang() ? (array) pll_languages_list( array( 'fields' => 'slug' ) ) : array();
	if ( ! $list ) {
		return array( conti_default_lang() );
	}
	usort( $list, fn( $a, $b ) => array_search( $a, CONTI_LANG_ORDER, true ) <=> array_search( $b, CONTI_LANG_ORDER, true ) );
	return $list;
}

function conti_default_lang(): string {
	$l = function_exists( 'pll_default_language' ) ? pll_default_language() : '';
	return $l ?: 'en';
}

function conti_lang(): string {
	// Block previews in the editor: the language of the page being edited.
	if ( conti_is_block_preview() ) {
		return conti_post_lang( (int) $_GET['post_id'] ); // phpcs:ignore WordPress.Security.NonceVerification
	}
	$l = function_exists( 'pll_current_language' ) ? pll_current_language() : '';
	return $l ?: conti_default_lang();
}

/** True while the block editor asks the server for a block preview (REST block renderer). */
function conti_is_block_preview(): bool {
	return defined( 'REST_REQUEST' ) && REST_REQUEST && ! empty( $_GET['post_id'] ) && str_contains( (string) ( $_SERVER['REQUEST_URI'] ?? '' ), 'block-renderer' ); // phpcs:ignore
}

function conti_post_lang( $post_id ): string {
	$l = function_exists( 'pll_get_post_language' ) ? pll_get_post_language( $post_id ) : '';
	return $l ?: conti_default_lang();
}

function conti_term_lang( $term_id ): string {
	$l = function_exists( 'pll_get_term_language' ) ? pll_get_term_language( $term_id ) : '';
	return $l ?: conti_default_lang();
}

/** Translation of a post in $lang (falls back to the post itself). */
function conti_translate_post( $post_id, ?string $lang = null ): int {
	if ( ! $post_id ) {
		return 0;
	}
	$lang = $lang ?: conti_lang();
	if ( conti_has_polylang() ) {
		$t = pll_get_post( $post_id, $lang );
		if ( $t ) {
			return (int) $t;
		}
	}
	return (int) $post_id;
}

function conti_translate_term( $term_id, ?string $lang = null ): int {
	if ( ! $term_id ) {
		return 0;
	}
	$lang = $lang ?: conti_lang();
	if ( function_exists( 'pll_get_term' ) ) {
		$t = pll_get_term( $term_id, $lang );
		if ( $t ) {
			return (int) $t;
		}
	}
	return (int) $term_id;
}

function conti_lang_meta( string $lang, string $key ) {
	return CONTI_LANG_META[ $lang ][ $key ] ?? ( 'label' === $key ? strtoupper( $lang ) : $lang );
}

/* ── Bundled data (plugin/data/*.json, generated from the design sources) ─ */

function conti_data( string $name ) {
	static $cache = array();
	if ( ! isset( $cache[ $name ] ) ) {
		$file           = CONTI_CORE_DIR . "/data/{$name}.json";
		$cache[ $name ] = file_exists( $file ) ? json_decode( (string) file_get_contents( $file ), true ) : array();
	}
	return $cache[ $name ];
}

/** Interface string in the current (or given) language. */
function conti_t( string $key, ?string $lang = null ): string {
	$ui   = conti_data( 'ui' );
	$lang = $lang ?: conti_lang();
	return $ui[ $key ][ $lang ] ?? $ui[ $key ]['en'] ?? $key;
}

/** Glossary lookup (parts, materialNames, rowLabels, tableHeads, variantTexts). */
function conti_gloss( string $dict, string $key, ?string $lang = null ): string {
	$g = conti_data( 'glossary' );
	return $g[ $dict ][ $key ][ $lang ?: conti_lang() ] ?? $key;
}

/** Company data: bundled defaults + values edited in Settings → Conti. */
function conti_site(): array {
	static $site = null;
	if ( null === $site ) {
		$site = array_replace_recursive( conti_data( 'site' ), conti_filter_empty( (array) get_option( 'conti_site', array() ) ) );
		$site['url'] = untrailingslashit( home_url() );
	}
	return $site;
}

/** Drops empty strings/arrays recursively (empty settings keep the bundled defaults). */
function conti_filter_empty( array $a ): array {
	foreach ( $a as $k => $v ) {
		if ( is_array( $v ) && ! array_is_list( $v ) ) {
			$v = conti_filter_empty( $v );
		}
		if ( '' === $v || array() === $v || null === $v ) {
			unset( $a[ $k ] );
		} else {
			$a[ $k ] = $v;
		}
	}
	return $a;
}

/* ── Pages ─────────────────────────────────────────────────────────────── */

/** Page key (home, products, company, …) → post ID in the default language. Filled by the importer. */
function conti_page_map(): array {
	return (array) get_option( 'conti_pages', array() );
}

function conti_page_id( string $key, ?string $lang = null ): int {
	$map = conti_page_map();
	return isset( $map[ $key ] ) ? conti_translate_post( (int) $map[ $key ], $lang ) : 0;
}

function conti_page_key( $post_id ): string {
	return (string) get_post_meta( $post_id, '_conti_page', true );
}

function conti_home_url( ?string $lang = null ): string {
	$lang = $lang ?: conti_lang();
	if ( function_exists( 'pll_home_url' ) ) {
		return pll_home_url( $lang );
	}
	return home_url( '/' );
}

function conti_page_url( string $key, ?string $lang = null ): string {
	if ( 'home' === $key ) {
		return conti_home_url( $lang );
	}
	$id = conti_page_id( $key, $lang );
	return $id ? get_permalink( $id ) : conti_home_url( $lang );
}

/** SEO title/description of a post. */
function conti_seo( $post_id ): array {
	$raw  = get_post_meta( $post_id, '_conti_seo', true );
	$data = is_string( $raw ) ? json_decode( $raw, true ) : $raw;
	return is_array( $data ) ? $data : array();
}

/* ── Media ─────────────────────────────────────────────────────────────── */

/** Attachment ID from an ID or an old "yyyy/mm/file.jpg" path (matched on import). */
function conti_attachment_id( $value ): int {
	if ( is_numeric( $value ) ) {
		return (int) $value;
	}
	if ( ! is_string( $value ) || '' === $value ) {
		return 0;
	}
	$map = (array) get_option( 'conti_media', array() );
	return (int) ( $map[ $value ] ?? 0 );
}

/** Responsive <img> (srcset/sizes/lazy) or a neutral placeholder when the image is missing. */
function conti_image( $value, string $alt = '', string $size = 'large', array $attr = array() ): string {
	$id = conti_attachment_id( $value );
	if ( $id && wp_attachment_is_image( $id ) ) {
		$attr = array_merge( array( 'alt' => $alt, 'decoding' => 'async' ), $attr );
		return wp_get_attachment_image( $id, $size, false, $attr );
	}
	$class = trim( 'ph ' . ( $attr['class'] ?? '' ) );
	return '<div class="' . esc_attr( $class ) . '" role="img" aria-label="' . esc_attr( $alt ) . '"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="26" width="10" height="16" rx="1"/><rect x="50" y="26" width="10" height="16" rx="1"/><path d="M14 30h8l4-6h12l4 6h8M14 38h8l4 6h12l4-6h8"/><path d="M32 24V12M24 12h16"/></svg></div>';
}

function conti_image_url( $value, string $size = 'full' ): string {
	$id = conti_attachment_id( $value );
	if ( ! $id ) {
		return '';
	}
	$src = wp_get_attachment_image_url( $id, $size );
	return $src ?: (string) wp_get_attachment_url( $id );
}

function conti_file_url( $value ): string {
	$id = conti_attachment_id( $value );
	return $id ? (string) wp_get_attachment_url( $id ) : '';
}

/* ── Output helpers ─────────────────────────────────────────────────────── */

function conti_e( $text ): void {
	echo esc_html( (string) $text );
}

/** Inline SVG icons used by the theme. */
function conti_icon( string $name ): string {
	$paths = array(
		'chevron' => '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
		'globe'   => '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2.5 10h15M10 2.5c2.2 2.3 2.2 12.7 0 15M10 2.5c-2.2 2.3-2.2 12.7 0 15" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
		'sun'     => '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66 1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14-1.41-1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		'water'   => '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5s-6.5 7.2-6.5 12a6.5 6.5 0 0 0 13 0c0-4.8-6.5-12-6.5-12z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		'air'     => '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
	);
	return $paths[ $name ] ?? '';
}
