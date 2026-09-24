<?php
/**
 * Content model: "Prodotti" (conti_product) and "Famiglie prodotto" (conti_family,
 * hierarchical: family → sub-category). URLs are built in routing.php, not by WordPress rewrites.
 */

defined( 'ABSPATH' ) || exit;

function conti_register_model(): void {
	register_post_type(
		'conti_product',
		array(
			'labels'        => array(
				'name'          => 'Prodotti',
				'singular_name' => 'Prodotto',
				'add_new_item'  => 'Aggiungi prodotto',
				'edit_item'     => 'Modifica prodotto',
				'search_items'  => 'Cerca prodotti',
				'all_items'     => 'Tutti i prodotti',
			),
			'public'        => true,
			'show_in_rest'  => false,
			'has_archive'   => false,
			'rewrite'       => false,
			'query_var'     => false,
			'menu_icon'     => 'dashicons-admin-tools',
			'menu_position' => 20,
			'supports'      => array( 'title' ),
		)
	);

	register_taxonomy(
		'conti_family',
		'conti_product',
		array(
			'labels'            => array(
				'name'          => 'Famiglie prodotto',
				'singular_name' => 'Famiglia',
				'parent_item'   => 'Famiglia principale',
				'edit_item'     => 'Modifica famiglia',
				'add_new_item'  => 'Aggiungi famiglia o sottocategoria',
			),
			'hierarchical'      => true,
			'public'            => true,
			'show_admin_column' => true,
			'show_in_rest'      => false,
			'rewrite'           => false,
			'query_var'         => 'conti_family',
		)
	);
}
add_action( 'init', 'conti_register_model' );

// Polylang: products and families are translatable.
add_filter( 'pll_get_post_types', fn( $types ) => $types + array( 'conti_product' => 'conti_product' ) );
add_filter( 'pll_get_taxonomies', fn( $taxes ) => $taxes + array( 'conti_family' => 'conti_family' ) );

// Generated image sizes in WebP (the originals stay as uploaded).
add_filter(
	'image_editor_output_format',
	function ( $formats ) {
		$formats['image/jpeg'] = 'image/webp';
		$formats['image/png']  = 'image/webp';
		return $formats;
	}
);

// Sizes used by the theme (square product shots, 4:3 cards, wide headers).
add_action(
	'after_setup_theme',
	function () {
		add_image_size( 'conti-card', 480, 480, false );
		add_image_size( 'conti-wide', 1280, 960, false );
	}
);
