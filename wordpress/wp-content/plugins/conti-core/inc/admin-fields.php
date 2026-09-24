<?php
/**
 * Admin editing: page texts (structured editor on a JSON field), product technical data,
 * family descriptions. The layout stays in the theme; editors only change content.
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'admin_enqueue_scripts',
	function ( $hook ) {
		$screen = get_current_screen();
		if ( ! $screen || ! in_array( $screen->base, array( 'post', 'term', 'edit-tags' ), true ) ) {
			return;
		}
		wp_enqueue_media();
		wp_enqueue_style( 'conti-admin', CONTI_CORE_URL . 'assets/admin.css', array(), CONTI_CORE_VERSION );
		wp_enqueue_script( 'conti-admin', CONTI_CORE_URL . 'assets/admin.js', array( 'jquery' ), CONTI_CORE_VERSION, true );
	}
);

/* ── Pages ──────────────────────────────────────────────────────────────── */

add_action(
	'add_meta_boxes_page',
	function ( $post ) {
		if ( ! conti_page_key( $post->ID ) ) {
			return;
		}
		remove_post_type_support( 'page', 'editor' );
		add_meta_box( 'conti-fields', 'Contenuti della pagina', 'conti_box_page_fields', 'page', 'normal', 'high' );
		add_meta_box( 'conti-seo', 'SEO (Google e condivisioni)', 'conti_box_seo', 'page', 'normal', 'default' );
	}
);

// The layout of Conti pages is fixed: hide the block editor for them.
add_filter(
	'use_block_editor_for_post',
	fn( $use, $post ) => ( $post && ( 'conti_product' === $post->post_type || conti_page_key( $post->ID ) ) ) ? false : $use,
	10,
	2
);
add_action(
	'current_screen',
	function ( $screen ) {
		if ( 'post' === $screen->base && 'page' === $screen->post_type && isset( $_GET['post'] ) && conti_page_key( (int) $_GET['post'] ) ) {
			remove_post_type_support( 'page', 'editor' );
		}
	}
);

function conti_box_page_fields( $post ): void {
	wp_nonce_field( 'conti_save_' . $post->ID, 'conti_nonce' );
	$json = wp_json_encode( conti_fields( $post->ID ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
	echo '<p class="description">Modifica i testi e le immagini della pagina. L’impaginazione è fissa nel tema, quindi l’aspetto resta coerente. Pagina: <code>' . esc_html( conti_page_key( $post->ID ) ) . '</code> · lingua: <strong>' . esc_html( strtoupper( conti_post_lang( $post->ID ) ) ) . '</strong></p>';
	echo '<div class="conti-json" data-root="page"><textarea name="conti_fields" class="conti-json__data" hidden>' . esc_textarea( $json ) . '</textarea><div class="conti-json__ui"></div></div>';
}

function conti_box_seo( $post ): void {
	$seo = conti_seo( $post->ID );
	?>
	<p><label><strong>Titolo per Google</strong> <span class="conti-count" data-for="conti_seo_title"></span><br>
	<input type="text" class="widefat" id="conti_seo_title" name="conti_seo[title]" value="<?php echo esc_attr( $seo['title'] ?? '' ); ?>"></label></p>
	<p><label><strong>Descrizione per Google</strong> <span class="conti-count" data-for="conti_seo_description"></span><br>
	<textarea class="widefat" rows="3" id="conti_seo_description" name="conti_seo[description]"><?php echo esc_textarea( $seo['description'] ?? '' ); ?></textarea></label></p>
	<p class="description">Consigliato: titolo fino a ~60 caratteri, descrizione 120–160.</p>
	<?php
}

add_action(
	'save_post_page',
	function ( $post_id ) {
		if ( ! conti_can_save( $post_id ) ) {
			return;
		}
		if ( isset( $_POST['conti_fields'] ) ) {
			$data = json_decode( wp_unslash( $_POST['conti_fields'] ), true );
			if ( is_array( $data ) ) {
				update_post_meta( $post_id, '_conti_fields', wp_slash( wp_json_encode( conti_clean_tree( $data ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) ) );
			}
		}
		if ( isset( $_POST['conti_seo'] ) && is_array( $_POST['conti_seo'] ) ) {
			$seo = array_map( 'sanitize_text_field', wp_unslash( $_POST['conti_seo'] ) );
			update_post_meta( $post_id, '_conti_seo', wp_slash( wp_json_encode( $seo, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) ) );
		}
	}
);

function conti_can_save( $post_id ): bool {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return false;
	}
	$nonce = $_POST['conti_nonce'] ?? '';
	return $nonce && wp_verify_nonce( $nonce, 'conti_save_' . $post_id ) && current_user_can( 'edit_post', $post_id );
}

/** Sanitise every string of an edited tree (plain text, no HTML). */
function conti_clean_tree( $value ) {
	if ( is_array( $value ) ) {
		return array_map( 'conti_clean_tree', $value );
	}
	if ( is_string( $value ) ) {
		return sanitize_textarea_field( $value );
	}
	return is_int( $value ) || is_float( $value ) || is_bool( $value ) ? $value : '';
}

/* ── Products ──────────────────────────────────────────────────────────── */

add_action(
	'add_meta_boxes_conti_product',
	function ( $post ) {
		add_meta_box( 'conti-product', 'Dati tecnici', 'conti_box_product', 'conti_product', 'normal', 'high' );
	}
);

function conti_box_product( $post ): void {
	$src = conti_product_source( $post->ID );
	if ( $src && $src !== $post->ID ) {
		$p = conti_product( $post->ID );
		echo '<p><strong>Articolo ' . esc_html( $p['code'] ) . '</strong>. In questa lingua modifichi solo la descrizione (il titolo qui sopra).</p>';
		echo '<p>Codice, dimensioni, materiali, versioni e immagini sono condivisi da tutte le lingue: <a class="button" href="' . esc_url( get_edit_post_link( $src ) ) . '">Modifica i dati tecnici (versione inglese)</a></p>';
		return;
	}
	wp_nonce_field( 'conti_save_' . $post->ID, 'conti_nonce' );
	$m    = fn( $k ) => get_post_meta( $post->ID, $k, true );
	$dims = conti_json_meta( $post->ID, '_conti_dimensions' );
	?>
	<p class="description">Il titolo qui sopra è la descrizione del prodotto (es. “Bronze globe valve PN32, screwed bonnet…”). Le traduzioni si modificano nelle versioni delle altre lingue.</p>
	<table class="form-table conti-form">
		<tr><th><label for="conti_code">Codice articolo</label></th><td><input id="conti_code" name="conti_product[code]" type="text" value="<?php echo esc_attr( $m( '_conti_code' ) ); ?>" required> <span class="description">Diventa anche l’indirizzo della pagina, es. /products/ball-valves/<em>04352</em>/</span></td></tr>
		<tr><th><label for="conti_rating">Pressione nominale</label></th><td><input id="conti_rating" name="conti_product[rating]" type="text" class="regular-text" value="<?php echo esc_attr( $m( '_conti_rating' ) ); ?>" placeholder="PN25/B 150WSP 300WOG"></td></tr>
		<tr><th><label for="conti_order">Ordine nella famiglia</label></th><td><input id="conti_order" name="conti_product[order]" type="number" value="<?php echo esc_attr( $m( '_conti_order' ) ); ?>" class="small-text"></td></tr>
		<tr><th>Foto</th><td><?php conti_media_input( 'conti_product[image]', (int) $m( '_conti_image' ) ); ?></td></tr>
		<tr><th>Disegno tecnico</th><td><?php conti_media_input( 'conti_product[drawing]', (int) $m( '_conti_drawing' ) ); ?></td></tr>
		<tr><th>Scheda tecnica PDF</th><td><?php conti_media_input( 'conti_product[datasheet]', (int) $m( '_conti_datasheet' ), 'application/pdf' ); ?></td></tr>
	</table>

	<h3>Dimensioni e pesi</h3>
	<p class="description">Incolla la tabella da Excel: prima riga = intestazioni (<code>Size</code>, <code>L mm</code>, <code>H mm</code>, <code>Weight (kg)</code>…), poi una riga per misura. Colonne separate da tabulazione. Una riga che inizia con <code>#</code> è la didascalia. Per più tabelle, separale con una riga vuota.</p>
	<textarea name="conti_product[dimensions]" class="large-text code conti-tsv" rows="14"><?php echo esc_textarea( conti_dims_to_tsv( $dims ) ); ?></textarea>

	<h3>Materiali</h3>
	<p class="description">Componente (BODY, BONNET, DISC, STEM, SEAT, WEDGE, BALL…), materiale (BRONZE, BRASS, DZR BRASS, STAINLESS STEEL, PTFE…), grado e norma. Componenti e materiali in inglese vengono tradotti automaticamente.</p>
	<div class="conti-json" data-root="materials"><textarea name="conti_product[materials]" class="conti-json__data" hidden><?php echo esc_textarea( wp_json_encode( conti_json_meta( $post->ID, '_conti_materials' ) ?: array( array( 'part' => '', 'name' => '', 'grade' => '', 'standard' => '' ) ), JSON_UNESCAPED_UNICODE ) ); ?></textarea><div class="conti-json__ui"></div></div>

	<h3>Versioni disponibili</h3>
	<p class="description">Codice, descrizione in inglese (le diciture standard come “All bronze” o “PTFE disc” vengono tradotte automaticamente) e pressione.</p>
	<div class="conti-json" data-root="variants"><textarea name="conti_product[variants]" class="conti-json__data" hidden><?php echo esc_textarea( wp_json_encode( conti_json_meta( $post->ID, '_conti_variants' ) ?: array( array( 'code' => '', 'text' => '', 'rating' => '' ) ), JSON_UNESCAPED_UNICODE ) ); ?></textarea><div class="conti-json__ui"></div></div>
	<?php
}

function conti_media_input( string $name, int $id, string $type = 'image' ): void {
	$preview = $id ? ( wp_attachment_is_image( $id ) ? wp_get_attachment_image( $id, 'thumbnail' ) : '<span class="dashicons dashicons-media-document"></span> ' . esc_html( basename( (string) get_attached_file( $id ) ) ) ) : '';
	printf(
		'<div class="conti-media" data-type="%s"><input type="hidden" name="%s" value="%s"><span class="conti-media__preview">%s</span> <button type="button" class="button conti-media__pick">Scegli…</button> <button type="button" class="button-link conti-media__clear"%s>Rimuovi</button></div>',
		esc_attr( $type ),
		esc_attr( $name ),
		esc_attr( $id ?: '' ),
		$preview, // phpcs:ignore WordPress.Security.EscapeOutput -- built from WP functions
		$id ? '' : ' hidden'
	);
}

add_action(
	'save_post_conti_product',
	function ( $post_id ) {
		if ( ! conti_can_save( $post_id ) || empty( $_POST['conti_product'] ) ) {
			return;
		}
		$in = wp_unslash( $_POST['conti_product'] );
		update_post_meta( $post_id, '_conti_code', sanitize_text_field( $in['code'] ?? '' ) );
		update_post_meta( $post_id, '_conti_rating', sanitize_text_field( $in['rating'] ?? '' ) );
		update_post_meta( $post_id, '_conti_order', (int) ( $in['order'] ?? 0 ) );
		foreach ( array( 'image', 'drawing', 'datasheet' ) as $k ) {
			update_post_meta( $post_id, "_conti_{$k}", absint( $in[ $k ] ?? 0 ) );
		}
		update_post_meta( $post_id, '_conti_dimensions', wp_slash( wp_json_encode( conti_tsv_to_dims( (string) ( $in['dimensions'] ?? '' ) ), JSON_UNESCAPED_UNICODE ) ) );
		foreach ( array( 'materials', 'variants' ) as $k ) {
			$rows = json_decode( (string) ( $in[ $k ] ?? '[]' ), true );
			$rows = array_values( array_filter( is_array( $rows ) ? conti_clean_tree( $rows ) : array(), fn( $r ) => is_array( $r ) && implode( '', $r ) !== '' ) );
			update_post_meta( $post_id, "_conti_{$k}", wp_slash( wp_json_encode( $rows, JSON_UNESCAPED_UNICODE ) ) );
		}
		$map                                        = (array) get_option( 'conti_products', array() );
		$map[ sanitize_text_field( $in['code'] ?? '' ) ] = $post_id;
		update_option( 'conti_products', array_filter( $map ), false );
		conti_catalog_flush();
	}
);

/** Dimension tables ⇄ tab-separated text (paste from Excel). */
function conti_dims_to_tsv( array $tables ): string {
	$blocks = array();
	foreach ( $tables as $t ) {
		$lines = array();
		if ( ! empty( $t['head'] ) ) {
			$lines[] = '# ' . $t['head'];
		}
		$lines[] = implode( "\t", array_merge( array( 'Size' ), array_map( fn( $r ) => conti_row_label( $r, 'en' ), $t['rows'] ) ) );
		foreach ( $t['sizes'] as $i => $size ) {
			$lines[] = implode( "\t", array_merge( array( $size ), array_map( fn( $r ) => $r['values'][ $i ] ?? '', $t['rows'] ) ) );
		}
		$blocks[] = implode( "\n", $lines );
	}
	return implode( "\n\n", $blocks );
}

function conti_tsv_to_dims( string $tsv ): array {
	$labels = array();
	foreach ( conti_data( 'glossary' )['rowLabels'] ?? array() as $key => $l10n ) {
		foreach ( $l10n as $label ) {
			$labels[ mb_strtolower( $label ) ] = $key;
		}
	}
	$tables = array();
	foreach ( preg_split( "/\R\s*\R/", trim( str_replace( "\r", '', $tsv ) ) ) as $block ) {
		$lines = array_values( array_filter( explode( "\n", $block ), fn( $l ) => '' !== trim( $l ) ) );
		if ( ! $lines ) {
			continue;
		}
		$head = null;
		if ( str_starts_with( $lines[0], '#' ) ) {
			$head = trim( substr( array_shift( $lines ), 1 ) );
		}
		if ( count( $lines ) < 2 ) {
			continue;
		}
		$header = array_map( 'trim', explode( "\t", array_shift( $lines ) ) );
		$rows   = array();
		foreach ( array_slice( $header, 1 ) as $label ) {
			$key    = $labels[ mb_strtolower( $label ) ] ?? null;
			$rows[] = $key ? array( 'key' => $key, 'values' => array() ) : array( 'label' => sanitize_text_field( $label ), 'values' => array() );
		}
		$sizes = array();
		foreach ( $lines as $line ) {
			$cells   = array_map( 'trim', explode( "\t", $line ) );
			$sizes[] = sanitize_text_field( $cells[0] );
			foreach ( $rows as $c => &$row ) {
				$row['values'][] = sanitize_text_field( $cells[ $c + 1 ] ?? '' );
			}
			unset( $row );
		}
		$tables[] = array( 'head' => $head, 'sizes' => $sizes, 'rows' => $rows );
	}
	return $tables;
}

/* ── Families ──────────────────────────────────────────────────────────── */

add_action(
	'conti_family_edit_form_fields',
	function ( $term ) {
		wp_nonce_field( 'conti_term_' . $term->term_id, 'conti_term_nonce' );
		$get = fn( $k ) => get_term_meta( $term->term_id, 'conti_' . $k, true );
		?>
		<tr class="form-field"><th>Chiave interna</th><td><code><?php echo esc_html( conti_term_key( $term ) ?: '—' ); ?></code><p class="description">Collega le traduzioni e i vecchi URL: non cambiarla.</p></td></tr>
		<?php if ( ! $term->parent ) : ?>
		<tr class="form-field"><th><label for="conti_singular">Nome al singolare</label></th><td><input id="conti_singular" name="conti_term[singular]" type="text" value="<?php echo esc_attr( $get( 'singular' ) ); ?>"></td></tr>
		<tr class="form-field"><th><label for="conti_intro">Introduzione</label></th><td><textarea id="conti_intro" name="conti_term[intro]" rows="5"><?php echo esc_textarea( $get( 'intro' ) ); ?></textarea><p class="description">Testo in testa alla pagina della famiglia; la prima frase è anche la descrizione per Google.</p></td></tr>
		<tr class="form-field"><th>Immagine</th><td><?php conti_media_input( 'conti_term[image]', (int) $get( 'image' ) ); ?></td></tr>
		<?php endif; ?>
		<?php
	}
);

add_action(
	'edited_conti_family',
	function ( $term_id ) {
		if ( empty( $_POST['conti_term'] ) || ! wp_verify_nonce( $_POST['conti_term_nonce'] ?? '', 'conti_term_' . $term_id ) || ! current_user_can( 'manage_categories' ) ) {
			return;
		}
		$in = wp_unslash( $_POST['conti_term'] );
		update_term_meta( $term_id, 'conti_singular', sanitize_text_field( $in['singular'] ?? '' ) );
		update_term_meta( $term_id, 'conti_intro', sanitize_textarea_field( $in['intro'] ?? '' ) );
		update_term_meta( $term_id, 'conti_image', absint( $in['image'] ?? 0 ) );
	}
);

/* ── Admin list: show code column for products ─────────────────────────── */

add_filter( 'manage_conti_product_posts_columns', fn( $cols ) => array_slice( $cols, 0, 1, true ) + array( 'conti_code' => 'Codice' ) + array_slice( $cols, 1, null, true ) );
add_action(
	'manage_conti_product_posts_custom_column',
	function ( $col, $post_id ) {
		if ( 'conti_code' === $col ) {
			echo '<strong>' . esc_html( conti_product( $post_id )['code'] ) . '</strong>';
		}
	},
	10,
	2
);
