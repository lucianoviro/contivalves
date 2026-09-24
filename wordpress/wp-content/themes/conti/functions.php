<?php
/**
 * Conti theme. Layout only: content, catalogue, SEO and URLs come from the "Conti Core" plugin.
 */

defined( 'ABSPATH' ) || exit;

define( 'CONTI_THEME_VERSION', '1.0.0' );

add_action(
	'after_setup_theme',
	function () {
		add_theme_support( 'title-tag' );
		add_theme_support( 'html5', array( 'script', 'style', 'search-form', 'gallery', 'caption' ) );
		add_theme_support( 'responsive-embeds' );
	}
);

add_action(
	'wp_enqueue_scripts',
	function () {
		wp_enqueue_style( 'conti', get_theme_file_uri( 'assets/css/site.css' ), array(), CONTI_THEME_VERSION );
		wp_enqueue_script( 'conti', get_theme_file_uri( 'assets/js/site.js' ), array(), CONTI_THEME_VERSION, array( 'strategy' => 'defer', 'in_footer' => true ) );
		// No block editor on the front end: drop its CSS.
		wp_dequeue_style( 'wp-block-library' );
		wp_dequeue_style( 'wp-block-library-theme' );
		wp_dequeue_style( 'global-styles' );
		wp_dequeue_style( 'classic-theme-styles' );
	},
	20
);

// Preload the two main font files (Latin).
add_action(
	'wp_head',
	function () {
		foreach ( array( 'inter-latin-wght-normal.woff2', 'barlow-condensed-latin-600-normal.woff2' ) as $font ) {
			printf( "<link rel=\"preload\" href=\"%s\" as=\"font\" type=\"font/woff2\" crossorigin>\n", esc_url( get_theme_file_uri( "assets/fonts/{$font}" ) ) );
		}
		printf( "<link rel=\"icon\" href=\"%s\" type=\"image/svg+xml\">\n", esc_url( get_theme_file_uri( 'assets/img/favicon.svg' ) ) );
		echo "<meta name=\"theme-color\" content=\"#ffffff\">\n";
	},
	2
);

// One body class per template, used to scope page styles (tpl-home, tpl-product, …).
add_filter(
	'body_class',
	function ( $classes ) {
		if ( function_exists( 'conti_context' ) ) {
			$ctx       = conti_context();
			$classes[] = 'tpl-' . ( in_array( $ctx['type'], array( 'page', 'home' ), true ) ? $ctx['key'] : $ctx['type'] );
		}
		return $classes;
	}
);

// Without the plugin the theme cannot work: say so instead of printing errors.
add_action(
	'template_redirect',
	function () {
		if ( ! function_exists( 'conti_context' ) && ! is_admin() ) {
			wp_die( 'Il tema Conti richiede il plugin “Conti Core”: attivalo in Plugin.', 'Conti', array( 'response' => 503 ) );
		}
	}
);

/** Page key of the page being rendered, or ''. */
function conti_current_key(): string {
	return function_exists( 'conti_context' ) ? (string) conti_context()['key'] : '';
}

/** Mailto link to the sales office with a subject. */
function conti_quote_mailto( string $subject = '' ): string {
	$email = conti_site()['emails']['sales'];
	return 'mailto:' . $email . ( $subject ? '?subject=' . rawurlencode( $subject ) : '' );
}

/** Language alternates of the current page: [['lang','url','name','label','current']]. */
function conti_alternates(): array {
	$out = array();
	if ( function_exists( 'pll_the_languages' ) ) {
		$raw = pll_the_languages( array( 'raw' => 1, 'hide_if_no_translation' => 0, 'hide_current' => 0 ) );
		foreach ( (array) $raw as $l ) {
			$out[ $l['slug'] ] = array(
				'lang'    => $l['slug'],
				'url'     => $l['url'],
				'current' => ! empty( $l['current_lang'] ),
			);
		}
	}
	if ( ! $out ) {
		$out[ conti_lang() ] = array( 'lang' => conti_lang(), 'url' => home_url( '/' ), 'current' => true );
	}
	// Family pages are rendered by the plugin router: build their alternates directly.
	$ctx = conti_context();
	if ( 'family' === $ctx['type'] ) {
		foreach ( $out as $lang => &$a ) {
			$a['url'] = conti_family_url( $ctx['key'], $lang );
		}
		unset( $a );
	}
	$sorted = array();
	foreach ( conti_langs() as $lang ) {
		if ( isset( $out[ $lang ] ) ) {
			$sorted[] = $out[ $lang ] + array( 'name' => conti_lang_meta( $lang, 'name' ), 'label' => conti_lang_meta( $lang, 'label' ) );
		}
	}
	return $sorted;
}
