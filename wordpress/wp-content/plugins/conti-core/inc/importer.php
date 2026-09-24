<?php
/**
 * One-click import of the whole site from data/*.json:
 * languages (Polylang) → media → product families → pages → products → datasheets → final settings.
 * Runs in small AJAX batches (Tools → Importa contenuti Conti) or with WP-CLI: `wp conti import`.
 * Idempotent: running it again updates what exists and adds what is missing.
 */

defined( 'ABSPATH' ) || exit;

const CONTI_IMPORT_STEPS = array( 'languages', 'media', 'terms', 'pages', 'products', 'datasheets', 'finish' );
const CONTI_MEDIA_RE     = '#^\d{4}/\d{2}/[^/]+\.(jpe?g|png|gif|webp|pdf)$#i';

function conti_import_source(): string {
	return trailingslashit( (string) get_option( 'conti_import_source', 'https://www.contivalves.com/wp-content/uploads/' ) );
}

/* ── Admin page ─────────────────────────────────────────────────────────── */

add_action(
	'admin_menu',
	function () {
		add_management_page( 'Importa contenuti Conti', 'Importa contenuti Conti', 'manage_options', 'conti-import', 'conti_import_page' );
	}
);

function conti_import_page(): void {
	if ( isset( $_POST['conti_import_source'] ) && check_admin_referer( 'conti_import_source' ) ) {
		update_option( 'conti_import_source', esc_url_raw( wp_unslash( $_POST['conti_import_source'] ) ) );
	}
	$ready = conti_has_polylang();
	?>
	<div class="wrap">
		<h1>Importa contenuti Conti</h1>
		<p>Crea (o aggiorna) in un colpo: lingue, immagini, famiglie di prodotto, le 14 pagine e i 123 prodotti in 5 lingue, con i testi del nuovo sito.</p>
		<ol>
			<li>Polylang deve essere attivo<?php echo $ready ? ' ✅' : ' ❌ <strong>(attivalo prima di procedere)</strong>'; ?>. Le lingue EN (predefinita), IT, FR, ES, DE vengono create se mancano.</li>
			<li>Immagini e PDF vengono presi, in quest’ordine, da <code>wp-content/uploads/</code> di questo sito (se hai copiato la cartella uploads del vecchio sito) oppure scaricati dall’indirizzo qui sotto.</li>
			<li>L’operazione può richiedere alcuni minuti: lascia aperta la pagina fino a “Completato”.</li>
			<li><strong>Attenzione:</strong> rilanciarla riporta testi e dati tecnici alla versione originale, sovrascrivendo le modifiche fatte dal pannello. Serve per il primo caricamento o per ripristinare.</li>
		</ol>
		<form method="post" style="margin:1em 0">
			<?php wp_nonce_field( 'conti_import_source' ); ?>
			<label>Indirizzo uploads del vecchio sito: <input type="url" name="conti_import_source" class="regular-text" value="<?php echo esc_attr( conti_import_source() ); ?>"></label>
			<?php submit_button( 'Salva indirizzo', 'secondary', 'submit', false ); ?>
		</form>
		<p><button class="button button-primary button-hero" id="conti-import-start" <?php disabled( ! $ready ); ?>>Avvia importazione</button></p>
		<pre id="conti-import-log" style="background:#fff;border:1px solid #dcdcde;padding:12px;max-height:420px;overflow:auto;white-space:pre-wrap"></pre>
	</div>
	<script>
	(function () {
		const btn = document.getElementById('conti-import-start');
		const log = document.getElementById('conti-import-log');
		const steps = <?php echo wp_json_encode( CONTI_IMPORT_STEPS ); ?>;
		const nonce = <?php echo wp_json_encode( wp_create_nonce( 'conti_import' ) ); ?>;
		const write = (t) => { log.textContent += t + '\n'; log.scrollTop = log.scrollHeight; };
		async function call(step, offset) {
			const body = new URLSearchParams({ action: 'conti_import', step, offset, _ajax_nonce: nonce });
			const res = await fetch(ajaxurl, { method: 'POST', body });
			const json = await res.json().catch(() => ({ success: false, data: 'Risposta non valida (timeout?). Riprova: l’importazione riprende da dove era arrivata.' }));
			if (!json.success) throw new Error(json.data || 'Errore');
			return json.data;
		}
		btn.addEventListener('click', async () => {
			if (!confirm('Avviare l’importazione? I testi e i dati tecnici modificati dal pannello verranno riportati alla versione originale.')) return;
			btn.disabled = true;
			try {
				for (const step of steps) {
					let offset = 0;
					for (;;) {
						const r = await call(step, offset);
						(r.log || []).forEach(write);
						if (r.done) break;
						offset = r.next;
					}
				}
				write('\n✅ Completato. Apri il sito per controllare.');
			} catch (e) { write('\n❌ ' + e.message); btn.disabled = false; }
		});
	})();
	</script>
	<?php
}

add_action(
	'wp_ajax_conti_import',
	function () {
		check_ajax_referer( 'conti_import' );
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( 'Permessi insufficienti' );
		}
		@set_time_limit( 300 ); // phpcs:ignore
		try {
			wp_send_json_success( conti_import_step( sanitize_key( $_POST['step'] ?? '' ), (int) ( $_POST['offset'] ?? 0 ) ) );
		} catch ( Throwable $e ) {
			wp_send_json_error( $e->getMessage() );
		}
	}
);

/** Runs one batch of a step. Returns ['done' => bool, 'next' => int, 'log' => string[]]. */
function conti_import_step( string $step, int $offset ): array {
	switch ( $step ) {
		case 'languages':
			return array( 'done' => true, 'next' => 0, 'log' => conti_import_languages() );
		case 'media':
			return conti_import_media( $offset, 6 );
		case 'terms':
			return array( 'done' => true, 'next' => 0, 'log' => conti_import_terms() );
		case 'pages':
			return array( 'done' => true, 'next' => 0, 'log' => conti_import_pages() );
		case 'products':
			return conti_import_products( $offset, 10 );
		case 'datasheets':
			return conti_import_datasheets( $offset, 8 );
		case 'finish':
			return array( 'done' => true, 'next' => 0, 'log' => conti_import_finish() );
	}
	throw new Exception( "Passo sconosciuto: {$step}" );
}

/* ── Languages ─────────────────────────────────────────────────────────── */

function conti_import_languages(): array {
	if ( ! conti_has_polylang() ) {
		throw new Exception( 'Polylang non è attivo.' );
	}
	$log      = array();
	$existing = (array) pll_languages_list( array( 'fields' => 'slug' ) );
	foreach ( CONTI_LANG_ORDER as $i => $slug ) {
		if ( in_array( $slug, $existing, true ) ) {
			continue;
		}
		$args  = array(
			'name'       => CONTI_LANG_META[ $slug ]['name'],
			'slug'       => $slug,
			'locale'     => CONTI_LANG_META[ $slug ]['locale'],
			'rtl'        => false,
			'term_group' => $i,
			'flag'       => 'en' === $slug ? 'gb' : $slug,
		);
		$model = PLL()->model;
		$res   = isset( $model->languages ) && method_exists( $model->languages, 'add' ) ? $model->languages->add( $args ) : ( method_exists( $model, 'add_language' ) ? $model->add_language( $args ) : new WP_Error( 'pll', 'API non disponibile' ) );
		if ( is_wp_error( $res ) ) {
			throw new Exception( "Impossibile creare la lingua {$slug}: " . $res->get_error_message() . ' — creala a mano in Lingue → Lingue e riprova.' );
		}
		$log[] = "Lingua creata: {$slug}";
	}
	// URL model: /it/…, default language (EN) without prefix, no browser redirect, media not translated.
	$opts                  = (array) get_option( 'polylang', array() );
	$opts['default_lang']  = 'en';
	$opts['force_lang']    = 1;
	$opts['hide_default']  = 1;
	$opts['rewrite']       = 1;
	$opts['browser']       = 0;
	$opts['redirect_lang'] = 0;
	$opts['media_support'] = 0;
	$opts['post_types']    = array_values( array_unique( array_merge( (array) ( $opts['post_types'] ?? array() ), array( 'conti_product' ) ) ) );
	$opts['taxonomies']    = array_values( array_unique( array_merge( (array) ( $opts['taxonomies'] ?? array() ), array( 'conti_family' ) ) ) );
	update_option( 'polylang', $opts );
	$log[] = 'Lingue pronte: ' . implode( ', ', CONTI_LANG_ORDER ) . ' (EN senza prefisso).';
	return $log;
}

/* ── Media ─────────────────────────────────────────────────────────────── */

/** Every "yyyy/mm/file.ext" path referenced in the data. */
function conti_import_media_paths(): array {
	$paths = array();
	$walk  = function ( $v ) use ( &$walk, &$paths ) {
		if ( is_array( $v ) ) {
			array_walk( $v, $walk );
		} elseif ( is_string( $v ) && preg_match( CONTI_MEDIA_RE, $v ) ) {
			$paths[ $v ] = true;
		}
	};
	$walk( conti_data( 'catalog' ) );
	$walk( conti_data( 'pages' ) );
	return array_keys( $paths );
}

function conti_import_media( int $offset, int $batch ): array {
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';

	$paths = conti_import_media_paths();
	$map   = (array) get_option( 'conti_media', array() );
	$log   = array();
	foreach ( array_slice( $paths, $offset, $batch ) as $path ) {
		if ( ! empty( $map[ $path ] ) && get_post( $map[ $path ] ) ) {
			continue;
		}
		$id = conti_import_one_media( $path );
		if ( is_wp_error( $id ) ) {
			$log[] = "⚠ {$path}: " . $id->get_error_message();
			continue;
		}
		$map[ $path ] = $id;
		update_option( 'conti_media', $map, false );
	}
	$next  = $offset + $batch;
	$log[] = sprintf( 'Media %d/%d', min( $next, count( $paths ) ), count( $paths ) );
	return array( 'done' => $next >= count( $paths ), 'next' => $next, 'log' => $log );
}

/** Registers a file already in uploads/ or downloads it from the old site. */
function conti_import_one_media( string $path ) {
	$uploads = wp_get_upload_dir();
	$local   = trailingslashit( $uploads['basedir'] ) . $path;
	if ( file_exists( $local ) ) {
		$type = wp_check_filetype( $local );
		$id   = wp_insert_attachment(
			array(
				'post_mime_type' => $type['type'],
				'post_title'     => sanitize_text_field( pathinfo( $path, PATHINFO_FILENAME ) ),
				'post_status'    => 'inherit',
				'guid'           => trailingslashit( $uploads['baseurl'] ) . $path,
			),
			$local,
			0,
			true
		);
		if ( ! is_wp_error( $id ) ) {
			wp_update_attachment_metadata( $id, wp_generate_attachment_metadata( $id, $local ) );
		}
	} else {
		$tmp = download_url( conti_import_source() . $path, 60 );
		if ( is_wp_error( $tmp ) ) {
			return $tmp;
		}
		$id = media_handle_sideload( array( 'name' => basename( $path ), 'tmp_name' => $tmp ), 0, pathinfo( $path, PATHINFO_FILENAME ) );
		if ( is_wp_error( $id ) ) {
			@unlink( $tmp ); // phpcs:ignore
			return $id;
		}
	}
	if ( ! is_wp_error( $id ) ) {
		update_post_meta( $id, '_conti_source_path', $path );
	}
	return $id;
}

/** Replaces media paths with attachment IDs inside a data tree (unknown paths are kept). */
function conti_import_media_ids( $value ) {
	if ( is_array( $value ) ) {
		return array_map( 'conti_import_media_ids', $value );
	}
	if ( is_string( $value ) && preg_match( CONTI_MEDIA_RE, $value ) ) {
		$id = conti_attachment_id( $value );
		return $id ?: $value;
	}
	return $value;
}

/* ── Product families ──────────────────────────────────────────────────── */

function conti_import_upsert_term( string $name, string $slug, int $parent, ?int $existing ): int {
	if ( $existing && get_term( $existing, 'conti_family' ) ) {
		wp_update_term( $existing, 'conti_family', array( 'name' => $name, 'slug' => $slug, 'parent' => $parent ) );
		return $existing;
	}
	// 'lang' => '' : search in every language, whatever language the admin is filtered on.
	$found = get_terms( array( 'taxonomy' => 'conti_family', 'slug' => $slug, 'hide_empty' => false, 'lang' => '', 'number' => 1 ) );
	$found = is_array( $found ) && $found ? $found[0] : null;
	if ( $found ) {
		wp_update_term( $found->term_id, 'conti_family', array( 'name' => $name, 'parent' => $parent ) );
		return (int) $found->term_id;
	}
	$res = wp_insert_term( $name, 'conti_family', array( 'slug' => $slug, 'parent' => $parent ) );
	if ( is_wp_error( $res ) ) {
		throw new Exception( "Termine {$slug}: " . $res->get_error_message() );
	}
	return (int) $res['term_id'];
}

function conti_import_terms(): array {
	$catalog  = conti_data( 'catalog' );
	$families = (array) get_option( 'conti_families', array() );
	$subcats  = (array) get_option( 'conti_subcats', array() );
	$default  = conti_default_lang();

	foreach ( $catalog['families'] as $f ) {
		$ids = array();
		foreach ( conti_langs() as $lang ) {
			$existing = isset( $families[ $f['key'] ] ) ? conti_translate_term( $families[ $f['key'] ], $lang ) : null;
			if ( $existing && conti_term_lang( $existing ) !== $lang ) {
				$existing = null;
			}
			$id = conti_import_upsert_term( $f['name'][ $lang ], $f['slug'][ $lang ], 0, $existing );
			if ( function_exists( 'pll_set_term_language' ) ) {
				pll_set_term_language( $id, $lang );
			}
			update_term_meta( $id, 'conti_key', $f['key'] );
			update_term_meta( $id, 'conti_singular', $f['singular'][ $lang ] );
			update_term_meta( $id, 'conti_intro', $f['intro'][ $lang ] );
			update_term_meta( $id, 'conti_image', conti_attachment_id( $f['image'] ) );
			$ids[ $lang ] = $id;
		}
		if ( function_exists( 'pll_save_term_translations' ) ) {
			pll_save_term_translations( $ids );
		}
		$families[ $f['key'] ] = $ids[ $default ];
	}
	update_option( 'conti_families', $families, false );

	foreach ( $catalog['subcategories'] as $s ) {
		$ids = array();
		foreach ( conti_langs() as $lang ) {
			$existing = isset( $subcats[ $s['key'] ] ) ? conti_translate_term( $subcats[ $s['key'] ], $lang ) : null;
			if ( $existing && conti_term_lang( $existing ) !== $lang ) {
				$existing = null;
			}
			$parent = conti_translate_term( $families[ $s['family'] ], $lang );
			$slug   = $lang === $default ? $s['key'] : $s['key'] . '-' . $lang;
			$id     = conti_import_upsert_term( $s['name'][ $lang ], $slug, $parent, $existing );
			if ( function_exists( 'pll_set_term_language' ) ) {
				pll_set_term_language( $id, $lang );
			}
			update_term_meta( $id, 'conti_key', $s['key'] );
			$ids[ $lang ] = $id;
		}
		if ( function_exists( 'pll_save_term_translations' ) ) {
			pll_save_term_translations( $ids );
		}
		$subcats[ $s['key'] ] = $ids[ $default ];
	}
	update_option( 'conti_subcats', $subcats, false );
	return array( sprintf( 'Famiglie: %d, sottocategorie: %d, in %d lingue.', count( $catalog['families'] ), count( $catalog['subcategories'] ), count( conti_langs() ) ) );
}

/* ── Pages ─────────────────────────────────────────────────────────────── */

function conti_import_pages(): array {
	$pages   = conti_data( 'pages' );
	$map     = conti_page_map();
	$default = conti_default_lang();
	foreach ( $pages as $key => $def ) {
		$ids = array();
		foreach ( conti_langs() as $lang ) {
			$existing = isset( $map[ $key ] ) ? conti_translate_post( $map[ $key ], $lang ) : 0;
			if ( $existing && conti_post_lang( $existing ) !== $lang ) {
				$existing = 0;
			}
			$parent = $def['parent'] ? conti_page_id( $def['parent'], $lang ) : 0;
			$slug   = $def['slug'][ $lang ] ?? ( 'home' . ( $lang === $default ? '' : '-' . $lang ) );
			$title  = isset( CONTI_PAGE_NAV[ $key ] ) ? conti_t( CONTI_PAGE_NAV[ $key ], $lang ) : 'Home';
			// A page that is not ours may already use the slug (e.g. WordPress's default "privacy-policy"): move it aside.
			$clash = get_page_by_path( ( $parent ? get_page_uri( $parent ) . '/' : '' ) . $slug );
			if ( $clash && (int) $clash->ID !== (int) $existing && ! conti_page_key( $clash->ID ) ) {
				wp_update_post( array( 'ID' => $clash->ID, 'post_name' => $slug . '-old', 'post_status' => 'draft' ) );
			}
			$postarr = array(
				'ID'           => $existing,
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => $title,
				'post_name'    => $slug,
				'post_parent'  => $parent,
				'post_content' => '',
			);
			$id = wp_insert_post( wp_slash( $postarr ), true );
			if ( is_wp_error( $id ) ) {
				throw new Exception( "Pagina {$key}/{$lang}: " . $id->get_error_message() );
			}
			if ( function_exists( 'pll_set_post_language' ) ) {
				pll_set_post_language( $id, $lang );
			}
			update_post_meta( $id, '_conti_page', $key );
			update_post_meta( $id, '_conti_fields', wp_slash( wp_json_encode( conti_import_media_ids( $def['fields'][ $lang ] ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) ) );
			update_post_meta( $id, '_conti_seo', wp_slash( wp_json_encode( $def['seo'][ $lang ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) ) );
			$ids[ $lang ] = $id;
			if ( $lang === $default ) {
				$map[ $key ] = $id;
				update_option( 'conti_pages', $map, false ); // children look their parent up in this map
			}
		}
		if ( function_exists( 'pll_save_post_translations' ) ) {
			pll_save_post_translations( $ids );
		}
	}
	update_option( 'conti_pages', $map, false );
	return array( sprintf( 'Pagine: %d × %d lingue.', count( $pages ), count( conti_langs() ) ) );
}

/* ── Products ──────────────────────────────────────────────────────────── */

function conti_import_products( int $offset, int $batch ): array {
	$products = conti_data( 'catalog' )['products'];
	$map      = (array) get_option( 'conti_products', array() );
	$default  = conti_default_lang();
	foreach ( array_slice( $products, $offset, $batch ) as $p ) {
		$ids = array();
		foreach ( array_merge( array( $default ), array_diff( conti_langs(), array( $default ) ) ) as $lang ) {
			$existing = isset( $map[ $p['code'] ] ) ? conti_translate_post( $map[ $p['code'] ], $lang ) : 0;
			if ( $existing && conti_post_lang( $existing ) !== $lang ) {
				$existing = 0;
			}
			$id = wp_insert_post(
				wp_slash(
					array(
						'ID'          => $existing,
						'post_type'   => 'conti_product',
						'post_status' => 'publish',
						'post_title'  => $p['description'][ $lang ],
						'post_name'   => conti_code_slug( $p['code'] ) . ( $lang === $default ? '' : '-' . $lang ),
						'menu_order'  => (int) $p['order'],
					)
				),
				true
			);
			if ( is_wp_error( $id ) ) {
				throw new Exception( "Prodotto {$p['code']}/{$lang}: " . $id->get_error_message() );
			}
			if ( function_exists( 'pll_set_post_language' ) ) {
				pll_set_post_language( $id, $lang );
			}
			$terms = array( conti_translate_term( (int) get_option( 'conti_families' )[ $p['family'] ], $lang ) );
			if ( $p['subcategory'] && isset( get_option( 'conti_subcats' )[ $p['subcategory'] ] ) ) {
				$terms[] = conti_translate_term( (int) get_option( 'conti_subcats' )[ $p['subcategory'] ], $lang );
			}
			wp_set_object_terms( $id, $terms, 'conti_family' );
			if ( $lang === $default ) {
				update_post_meta( $id, '_conti_code', $p['code'] );
				update_post_meta( $id, '_conti_rating', (string) $p['rating'] );
				update_post_meta( $id, '_conti_order', (int) $p['order'] );
				update_post_meta( $id, '_conti_image', conti_attachment_id( $p['image'] ) );
				update_post_meta( $id, '_conti_drawing', conti_attachment_id( $p['drawing'] ) );
				foreach ( array( 'materials', 'dimensions', 'variants' ) as $k ) {
					update_post_meta( $id, "_conti_{$k}", wp_slash( wp_json_encode( $p[ $k ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) ) );
				}
				$map[ $p['code'] ] = $id;
			}
			$ids[ $lang ] = $id;
		}
		if ( function_exists( 'pll_save_post_translations' ) ) {
			pll_save_post_translations( $ids );
		}
	}
	update_option( 'conti_products', $map, false );
	conti_catalog_flush();
	$next = $offset + $batch;
	return array( 'done' => $next >= count( $products ), 'next' => $next, 'log' => array( sprintf( 'Prodotti %d/%d', min( $next, count( $products ) ), count( $products ) ) ) );
}

/* ── Datasheets (PDF linked only from the old product pages) ──────────── */

function conti_import_datasheets( int $offset, int $batch ): array {
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	$map   = (array) get_option( 'conti_products', array() );
	$codes = array_keys( $map );
	$site  = preg_replace( '#/wp-content/uploads/?$#', '', untrailingslashit( conti_import_source() ) );
	$found = 0;
	foreach ( array_slice( $codes, $offset, $batch ) as $code ) {
		$id = (int) $map[ $code ];
		if ( get_post_meta( $id, '_conti_datasheet', true ) ) {
			continue;
		}
		foreach ( array( conti_code_slug( $code ), 'conti-valves-art-' . conti_code_slug( $code ) ) as $slug ) {
			$res = wp_remote_get( "{$site}/prodotti/{$slug}/", array( 'timeout' => 20 ) );
			if ( is_wp_error( $res ) || 200 !== wp_remote_retrieve_response_code( $res ) ) {
				continue;
			}
			if ( ! preg_match( '#href="([^"]+/wp-content/uploads/[^"]+\.pdf)"#i', wp_remote_retrieve_body( $res ), $m ) ) {
				continue;
			}
			$tmp = download_url( $m[1], 60 );
			if ( is_wp_error( $tmp ) ) {
				continue;
			}
			$att = media_handle_sideload( array( 'name' => sanitize_file_name( $code ) . '.pdf', 'tmp_name' => $tmp ), 0, "Datasheet {$code}" );
			if ( ! is_wp_error( $att ) ) {
				update_post_meta( $id, '_conti_datasheet', $att );
				++$found;
				break;
			}
		}
	}
	$next = $offset + $batch;
	return array( 'done' => $next >= count( $codes ), 'next' => $next, 'log' => array( sprintf( 'Schede tecniche PDF: controllati %d/%d (+%d trovate)', min( $next, count( $codes ) ), count( $codes ), $found ) ) );
}

/* ── Final settings ────────────────────────────────────────────────────── */

function conti_import_finish(): array {
	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', conti_page_id( 'home', conti_default_lang() ) );
	global $wp_rewrite;
	$wp_rewrite->set_permalink_structure( '/%postname%/' );
	update_option( 'wp_page_for_privacy_policy', conti_page_id( 'privacy', conti_default_lang() ) );
	update_option( 'blogdescription', conti_t( 'footer.tagline', 'en' ) );
	update_option( 'blogname', 'Conti Valves' );
	conti_catalog_flush();
	conti_catalog_index();
	flush_rewrite_rules();
	return array( 'Home, permalink e cache aggiornati.' );
}

/* ── WP-CLI ────────────────────────────────────────────────────────────── */

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command(
		'conti import',
		function ( $args, $assoc ) {
			$skip = array_filter( explode( ',', (string) ( $assoc['skip'] ?? '' ) ) );
			foreach ( CONTI_IMPORT_STEPS as $step ) {
				if ( in_array( $step, $skip, true ) ) {
					continue;
				}
				$offset = 0;
				do {
					$r = conti_import_step( $step, $offset );
					foreach ( $r['log'] as $line ) {
						WP_CLI::log( $line );
					}
					$offset = $r['next'];
				} while ( ! $r['done'] );
			}
			WP_CLI::success( 'Import completato.' );
		},
		array( 'shortdesc' => 'Importa pagine, prodotti e immagini Conti. Opzione --skip=media,datasheets' )
	);
}
