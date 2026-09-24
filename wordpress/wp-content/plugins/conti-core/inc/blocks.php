<?php
/**
 * "Conti" blocks for the block editor (Gutenberg).
 *
 * Every block is dynamic: the post content stores only the block comment with its attributes,
 * the HTML is produced here at render time. So the design can evolve in code without ever
 * breaking the saved pages ("This block contains unexpected content" cannot happen).
 * Editing UI: assets/blocks.js. Styles: the theme's assets/css/site.css.
 */

defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/blocks-render.php';

/** Block definitions: attributes and editor metadata (the JS reads them from the server). */
function conti_block_definitions(): array {
	$s     = fn( $default = '' ) => array( 'type' => 'string', 'default' => $default );
	$n     = fn( $default = 0 ) => array( 'type' => 'number', 'default' => $default );
	$b     = fn( $default = false ) => array( 'type' => 'boolean', 'default' => $default );
	$items = array( 'type' => 'array', 'default' => array() );
	$media = array( 'type' => array( 'number', 'string' ), 'default' => 0 );
	$in    = array( 'conti/inSection' );

	return array(
		'page-head'    => array( 'title' => 'Intestazione pagina', 'icon' => 'heading', 'attributes' => array( 'eyebrow' => $s(), 'heading' => $s(), 'lead' => $s(), 'intro' => $s() ) ),
		'hero'         => array( 'title' => 'Hero (apertura home)', 'icon' => 'cover-image', 'attributes' => array( 'eyebrow' => $s(), 'heading' => $s(), 'lead' => $s(), 'buttons' => $items, 'image' => $media, 'badgeTitle' => $s(), 'badgeText' => $s() ) ),
		'section'      => array(
			'title'           => 'Sezione',
			'icon'            => 'align-wide',
			'description'     => 'Fascia a tutta larghezza (sfondo bianco, grigio o scuro) che contiene gli altri blocchi.',
			'attributes'      => array( 'background' => $s( 'white' ), 'padding' => $s( 'normal' ), 'width' => $s( 'wide' ), 'inSection' => $b( true ) ),
			'providesContext' => array( 'conti/inSection' => 'inSection' ),
			'supports'        => array( 'anchor' => true, 'html' => false ),
		),
		'section-head' => array( 'title' => 'Titolo di sezione', 'icon' => 'editor-textcolor', 'attributes' => array( 'eyebrow' => $s(), 'heading' => $s(), 'text' => $s(), 'linkLabel' => $s(), 'linkUrl' => $s() ), 'usesContext' => $in ),
		'split'        => array( 'title' => 'Due colonne', 'icon' => 'columns', 'attributes' => array( 'reverse' => $b(), 'align' => $s( 'center' ) ), 'usesContext' => $in ),
		'column'       => array( 'title' => 'Colonna', 'icon' => 'align-left', 'parent' => array( 'conti/split' ), 'attributes' => array() ),
		'image'        => array( 'title' => 'Immagine incorniciata', 'icon' => 'format-image', 'attributes' => array( 'image' => $media, 'alt' => $s(), 'ratio' => $s( '6/5' ), 'fit' => $s( 'cover' ), 'caption' => $s() ), 'usesContext' => $in ),
		'stats'        => array( 'title' => 'Numeri in evidenza', 'icon' => 'chart-bar', 'attributes' => array( 'items' => $items, 'color' => $s( 'bronze' ) ), 'usesContext' => $in ),
		'family-grid'  => array( 'title' => 'Griglia famiglie prodotto', 'icon' => 'grid-view', 'attributes' => array( 'columns' => $n( 4 ), 'showIntro' => $b() ), 'usesContext' => $in ),
		'product-grid' => array( 'title' => 'Griglia prodotti', 'icon' => 'screenoptions', 'attributes' => array( 'source' => $s( 'family' ), 'family' => $s( 'ball-valves' ), 'codes' => $s() ), 'usesContext' => $in ),
		'cards'        => array( 'title' => 'Schede (card)', 'icon' => 'index-card', 'attributes' => array( 'items' => $items, 'columns' => $n( 4 ), 'style' => $s( 'cover' ) ), 'usesContext' => $in ),
		'pillars'      => array( 'title' => 'Punti con icona', 'icon' => 'star-empty', 'attributes' => array( 'items' => $items, 'style' => $s( 'dark' ) ), 'usesContext' => $in ),
		'faq'          => array( 'title' => 'Domande frequenti', 'icon' => 'editor-help', 'attributes' => array( 'items' => $items ), 'usesContext' => $in ),
		'timeline'     => array( 'title' => 'Timeline', 'icon' => 'backup', 'attributes' => array( 'items' => $items ), 'usesContext' => $in ),
		'steps'        => array( 'title' => 'Fasi numerate', 'icon' => 'editor-ol', 'attributes' => array( 'items' => $items, 'style' => $s( 'cards' ), 'howTo' => $b() ), 'usesContext' => $in ),
		'gallery'      => array( 'title' => 'Galleria', 'icon' => 'format-gallery', 'attributes' => array( 'items' => $items, 'style' => $s( 'certificate' ), 'columns' => $n( 4 ) ), 'usesContext' => $in ),
		'documents'    => array( 'title' => 'Documenti da scaricare', 'icon' => 'media-document', 'attributes' => array( 'items' => $items ), 'usesContext' => $in ),
		'facts'        => array( 'title' => 'Scheda dati (voce: valore)', 'icon' => 'editor-table', 'attributes' => array( 'items' => $items ), 'usesContext' => $in ),
		'checklist'    => array( 'title' => 'Elenco con spunte', 'icon' => 'yes-alt', 'attributes' => array( 'items' => $items, 'style' => $s( 'plain' ), 'heading' => $s(), 'buttonLabel' => $s(), 'buttonUrl' => $s() ), 'usesContext' => $in ),
		'links'        => array( 'title' => 'Pulsanti e link', 'icon' => 'button', 'attributes' => array( 'items' => $items ), 'usesContext' => $in ),
		'quote'        => array( 'title' => 'Citazione', 'icon' => 'format-quote', 'attributes' => array( 'text' => $s(), 'author' => $s() ), 'usesContext' => $in ),
		'contact'      => array( 'title' => 'Contatti (uffici e indirizzo)', 'icon' => 'email', 'attributes' => array( 'departmentsHeading' => $s(), 'visitHeading' => $s() ), 'usesContext' => $in ),
		'video'        => array( 'title' => 'Video YouTube', 'icon' => 'video-alt3', 'attributes' => array( 'youtube' => $s(), 'title' => $s() ), 'usesContext' => $in ),
		'news'         => array( 'title' => 'Notizie', 'icon' => 'megaphone', 'attributes' => array( 'items' => $items ), 'usesContext' => $in ),
		'cta'          => array( 'title' => 'Invito al contatto (fascia scura)', 'icon' => 'email-alt', 'attributes' => array( 'title' => $s(), 'text' => $s(), 'subject' => $s() ) ),
	);
}

add_action(
	'init',
	function () {
		wp_register_script(
			'conti-blocks',
			CONTI_CORE_URL . 'assets/blocks.js',
			array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-data', 'wp-core-data', 'wp-server-side-render' ),
			CONTI_CORE_VERSION,
			true
		);
		wp_register_style( 'conti-blocks-editor', CONTI_CORE_URL . 'assets/blocks-editor.css', array(), CONTI_CORE_VERSION );

		foreach ( conti_block_definitions() as $slug => $def ) {
			// register_block_type() takes snake_case keys (camelCase is for block.json).
			foreach ( array( 'usesContext' => 'uses_context', 'providesContext' => 'provides_context' ) as $from => $to ) {
				if ( isset( $def[ $from ] ) ) {
					$def[ $to ] = $def[ $from ];
					unset( $def[ $from ] );
				}
			}
			register_block_type(
				"conti/{$slug}",
				array_merge(
					array(
						'api_version'     => 3,
						'category'        => 'conti',
						'editor_script'   => 'conti-blocks',
						'editor_style'    => 'conti-blocks-editor',
						'supports'        => array( 'html' => false ),
						'render_callback' => fn( $attrs, $content, $block ) => conti_render_block( $slug, $attrs, $content, $block ),
					),
					$def
				)
			);
		}
	}
);

add_filter(
	'block_categories_all',
	fn( $cats ) => array_merge( array( array( 'slug' => 'conti', 'title' => 'Conti', 'icon' => null ) ), $cats )
);

/** Data the editor needs: link targets, families, icons, default texts. */
add_action(
	'enqueue_block_editor_assets',
	function () {
		$families = array();
		$links    = array( array( 'value' => 'page:home', 'label' => 'Pagina: Home' ) );
		foreach ( CONTI_PAGE_NAV as $key => $ui ) {
			$links[] = array( 'value' => "page:{$key}", 'label' => 'Pagina: ' . conti_t( $ui, 'it' ) );
		}
		foreach ( conti_family_keys() as $key ) {
			$name       = conti_family_name( $key, conti_default_lang() );
			$families[] = array( 'value' => $key, 'label' => $name );
			$links[]    = array( 'value' => "family:{$key}", 'label' => 'Famiglia: ' . conti_family_name( $key, 'it' ) );
		}
		foreach ( array( 'sales' => 'ufficio commerciale', 'technical' => 'ufficio tecnico', 'accounting' => 'amministrazione', 'general' => 'informazioni' ) as $key => $label ) {
			$links[] = array( 'value' => "email:{$key}", 'label' => "Email: {$label}" );
		}
		wp_localize_script(
			'conti-blocks',
			'contiBlocks',
			array(
				'families'   => $families,
				'links'      => $links,
				'icons'      => array_map( 'conti_icon', array( 'sun' => 'sun', 'water' => 'water', 'air' => 'air' ) ),
				'play'       => '<svg viewBox="0 0 68 48"><path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2.3 34 .3 34 .3s-21.2 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.8 47.7 34 47.7 34 47.7s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#c8702a"/><path d="M45 24 27 14v20z" fill="#fff"/></svg>',
				'ctaTitle'   => conti_t( 'cta.quote', 'it' ),
				'ctaText'    => conti_t( 'product.custom', 'it' ),
				'ctaQuote'   => conti_t( 'cta.quote', 'it' ),
				'ctaContact' => conti_t( 'nav.contact', 'it' ),
			)
		);
	}
);

/* ── Ready-made sections (block patterns) ─────────────────────────────── */

add_action(
	'init',
	function () {
		register_block_pattern_category( 'conti', array( 'label' => 'Conti – sezioni pronte' ) );
		foreach ( conti_block_patterns() as $slug => $pattern ) {
			register_block_pattern(
				"conti/{$slug}",
				array_merge(
					array(
						'categories' => array( 'conti' ),
						'postTypes'  => array( 'page' ),
					),
					$pattern,
					array( 'content' => conti_serialize_blocks( $pattern['content'] ) )
				)
			);
		}
	}
);

/** Sections used on the site, with sample texts to overwrite. */
function conti_block_patterns(): array {
	$b    = fn( string $name, array $attrs = array(), ?array $inner = null ) => array_filter( array( 'name' => "conti/{$name}", 'attrs' => $attrs, 'inner' => $inner ), fn( $v ) => null !== $v );
	$p    = fn( string $text, string $style = '' ) => array( 'name' => 'core/paragraph', 'attrs' => $style ? array( 'className' => "is-style-{$style}" ) : array(), 'html' => '<p' . ( $style ? " class=\"is-style-{$style}\"" : '' ) . '>' . esc_html( $text ) . '</p>' );
	$h2   = fn( string $text ) => array( 'name' => 'core/heading', 'attrs' => array(), 'html' => '<h2 class="wp-block-heading">' . esc_html( $text ) . '</h2>' );
	$cols = fn( array $left, array $right, array $attrs = array() ) => $b( 'split', $attrs, array( $b( 'column', array(), $left ), $b( 'column', array(), $right ) ) );
	$lead = 'Un testo introduttivo breve e chiaro: cosa offre questa sezione e perché interessa al cliente.';

	return array(
		'text-image'  => array(
			'title'       => 'Testo e immagine',
			'description' => 'Occhiello, titolo, testo e link a sinistra, immagine a destra.',
			'content'     => array( $b( 'section', array(), array( $cols( array( $p( 'Occhiello', 'eyebrow' ), $h2( 'Titolo della sezione' ), $p( $lead, 'lead' ), $b( 'links', array( 'items' => array( array( 'label' => 'Scopri di più', 'url' => 'page:contact', 'style' => 'arrow' ) ) ) ) ), array( $b( 'image' ) ) ) ) ) ),
		),
		'image-text'  => array(
			'title'       => 'Immagine e testo (sfondo grigio)',
			'description' => 'Immagine a sinistra, testo a destra, su sfondo grigio chiaro.',
			'content'     => array( $b( 'section', array( 'background' => 'mist' ), array( $cols( array( $p( 'Occhiello', 'eyebrow' ), $h2( 'Titolo della sezione' ), $p( $lead, 'lead' ) ), array( $b( 'image' ) ), array( 'reverse' => true ) ) ) ) ),
		),
		'cards'       => array(
			'title'       => 'Titolo e schede con foto',
			'description' => 'Titolo di sezione con link, poi 3 schede con immagine.',
			'content'     => array(
				$b(
					'section',
					array(),
					array(
						$b( 'section-head', array( 'eyebrow' => 'Occhiello', 'heading' => 'Titolo della sezione', 'text' => 'Una riga di presentazione.', 'linkLabel' => 'Vedi tutto', 'linkUrl' => 'page:products' ) ),
						$b( 'cards', array( 'columns' => 3, 'items' => array( array( 'title' => 'Prima scheda', 'text' => 'Breve descrizione.' ), array( 'title' => 'Seconda scheda', 'text' => 'Breve descrizione.' ), array( 'title' => 'Terza scheda', 'text' => 'Breve descrizione.' ) ) ) ),
					)
				),
			),
		),
		'stats'       => array(
			'title'       => 'Numeri in evidenza',
			'description' => 'Fascia con 4 numeri e la loro descrizione.',
			'content'     => array( $b( 'section', array( 'padding' => 'tight' ), array( $b( 'stats', array( 'items' => array( array( 'value' => '1919', 'label' => 'Anno di fondazione' ), array( 'value' => '100%', 'label' => 'Valvole collaudate' ), array( 'value' => '50+', 'label' => 'Paesi serviti' ), array( 'value' => '40%', 'label' => 'Energia dal sole' ) ) ) ) ) ) ),
		),
		'dark-points' => array(
			'title'       => 'Fascia scura con tre punti',
			'description' => 'Sezione scura: titolo con link e tre riquadri con icona.',
			'content'     => array(
				$b(
					'section',
					array( 'background' => 'night' ),
					array(
						$b( 'section-head', array( 'eyebrow' => 'Occhiello', 'heading' => 'Titolo della sezione', 'text' => 'Una riga di presentazione.', 'linkLabel' => 'Scopri di più', 'linkUrl' => 'page:environment' ) ),
						$b( 'pillars', array( 'items' => array( array( 'icon' => 'sun', 'title' => 'Primo punto', 'text' => 'Breve spiegazione.' ), array( 'icon' => 'water', 'title' => 'Secondo punto', 'text' => 'Breve spiegazione.' ), array( 'icon' => 'air', 'title' => 'Terzo punto', 'text' => 'Breve spiegazione.' ) ) ) ),
					)
				),
			),
		),
		'faq'         => array(
			'title'       => 'Domande frequenti',
			'description' => 'Titolo e domande con risposta (Google le riconosce come FAQ).',
			'content'     => array( $b( 'section', array( 'width' => 'narrow' ), array( $p( 'FAQ', 'eyebrow' ), $h2( 'Domande frequenti' ), $b( 'faq', array( 'items' => array( array( 'q' => 'Prima domanda?', 'a' => 'Risposta chiara e completa.' ), array( 'q' => 'Seconda domanda?', 'a' => 'Risposta chiara e completa.' ) ) ) ) ) ) ),
		),
		'gallery'     => array(
			'title'       => 'Galleria di certificati o documenti',
			'description' => 'Titolo e immagini con didascalia, cliccabili per l’ingrandimento.',
			'content'     => array( $b( 'section', array( 'background' => 'mist' ), array( $h2( 'Certificati' ), $b( 'gallery', array( 'items' => array( array( 'label' => 'Didascalia' ), array( 'label' => 'Didascalia' ), array( 'label' => 'Didascalia' ), array( 'label' => 'Didascalia' ) ) ) ) ) ) ),
		),
		'text'        => array(
			'title'       => 'Testo semplice',
			'description' => 'Titoli e paragrafi in una colonna di lettura.',
			'content'     => array( $b( 'section', array( 'width' => 'text' ), array( $h2( 'Titolo' ), $p( 'Scrivi qui il testo. Per un nuovo paragrafo premi Invio.' ) ) ) ),
		),
		'new-page'    => array(
			'title'       => 'Nuova pagina Conti',
			'description' => 'Intestazione, testo e invito al contatto: il punto di partenza per una nuova pagina.',
			'blockTypes'  => array( 'core/post-content' ),
			'content'     => array(
				$b( 'page-head', array( 'heading' => 'Titolo della pagina', 'lead' => $lead ) ),
				$b( 'section', array(), array( $cols( array( $h2( 'Titolo della sezione' ), $p( 'Scrivi qui il testo.' ) ), array( $b( 'image' ) ) ) ) ),
				$b( 'cta' ),
			),
		),
	);
}

/* ── Block editor scope ────────────────────────────────────────────────── */

// Pages use a curated set of blocks: Conti blocks + basic text blocks, so the design stays coherent.
add_filter(
	'allowed_block_types_all',
	function ( $allowed, $context ) {
		$post = $context->post ?? null;
		if ( ! $post || 'page' !== $post->post_type ) {
			return $allowed;
		}
		$conti = array_map( fn( $s ) => "conti/{$s}", array_keys( conti_block_definitions() ) );
		return array_merge( $conti, array( 'core/paragraph', 'core/heading', 'core/list', 'core/list-item', 'core/buttons', 'core/button', 'core/image', 'core/table', 'core/separator', 'core/block' ) );
	},
	10,
	2
);

// Paragraph and list styles matching the design.
add_action(
	'init',
	function () {
		register_block_style( 'core/paragraph', array( 'name' => 'lead', 'label' => 'Testo introduttivo' ) );
		register_block_style( 'core/paragraph', array( 'name' => 'eyebrow', 'label' => 'Occhiello' ) );
		register_block_style( 'core/list', array( 'name' => 'check', 'label' => 'Con spunte' ) );
		register_block_style( 'core/button', array( 'name' => 'ghost', 'label' => 'Bordo' ) );
	}
);

/*
 * Text blocks placed directly in a page (outside a "Sezione") are grouped into a section with
 * a readable text width, so a page written with plain paragraphs still looks right.
 */
add_filter(
	'the_content',
	function ( $content ) {
		if ( 'page' !== get_post_type() || ! has_blocks( $content ) ) {
			return $content;
		}
		$out   = array();
		$run   = array();
		$flush = function () use ( &$out, &$run ) {
			$inner = array_values( array_filter( $run, fn( $b ) => $b['blockName'] || '' !== trim( $b['innerHTML'] ) ) );
			if ( $inner ) {
				$out[] = array(
					'blockName'    => 'conti/section',
					'attrs'        => array( 'width' => 'text' ),
					'innerBlocks'  => $inner,
					'innerHTML'    => '',
					'innerContent' => array_fill( 0, count( $inner ), null ),
				);
			}
			$run = array();
		};
		foreach ( parse_blocks( $content ) as $b ) {
			if ( $b['blockName'] && str_starts_with( $b['blockName'], 'conti/' ) ) {
				$flush();
				$out[] = $b;
			} else {
				$run[] = $b;
			}
		}
		$flush();
		return serialize_blocks( $out );
	},
	8
);

/* ── Helpers used by SEO and feeds ─────────────────────────────────────── */

/** Parsed blocks of a post, cached per request. */
function conti_post_blocks( int $post_id ): array {
	static $cache = array();
	if ( ! isset( $cache[ $post_id ] ) ) {
		$cache[ $post_id ] = parse_blocks( (string) get_post_field( 'post_content', $post_id ) );
	}
	return $cache[ $post_id ];
}

/** Attributes of every block named $name in a post, nested blocks included ('__html' = saved HTML). */
function conti_blocks_of( int $post_id, string $name ): array {
	$found = array();
	$walk  = function ( array $blocks ) use ( &$walk, &$found, $name ) {
		foreach ( $blocks as $b ) {
			if ( $b['blockName'] === $name ) {
				$found[] = $b['attrs'] + array( '__html' => $b['innerHTML'] );
			}
			if ( ! empty( $b['innerBlocks'] ) ) {
				$walk( $b['innerBlocks'] );
			}
		}
	};
	$walk( conti_post_blocks( $post_id ) );
	return $found;
}

/** Items of all the blocks named $name in a post (e.g. every FAQ of the page). */
function conti_block_items( int $post_id, string $name, ?callable $filter = null ): array {
	$items = array();
	foreach ( conti_blocks_of( $post_id, $name ) as $attrs ) {
		if ( ! $filter || $filter( $attrs ) ) {
			array_push( $items, ...conti_items( $attrs ) );
		}
	}
	return $items;
}

/** Main heading of a page: its "Intestazione pagina" or "Hero" block, else the title. */
function conti_page_heading( int $post_id ): string {
	foreach ( array( 'conti/page-head', 'conti/hero' ) as $name ) {
		$head = conti_blocks_of( $post_id, $name );
		if ( ! empty( $head[0]['heading'] ) ) {
			return conti_plain( $head[0]['heading'] );
		}
	}
	return get_the_title( $post_id );
}

/** Short summary of a page (fallback meta description): intro text or first paragraph. */
function conti_page_summary( int $post_id ): string {
	foreach ( array( 'conti/page-head', 'conti/hero' ) as $name ) {
		$head = conti_blocks_of( $post_id, $name );
		if ( ! empty( $head[0]['lead'] ) ) {
			return conti_plain( $head[0]['lead'] );
		}
	}
	foreach ( conti_blocks_of( $post_id, 'core/paragraph' ) as $p ) {
		$text = conti_plain( $p['__html'] );
		if ( strlen( $text ) > 40 ) {
			return wp_html_excerpt( $text, 160, '…' );
		}
	}
	return '';
}

/** First image used in a post's blocks (for sharing previews). */
function conti_first_block_image( int $post_id ): int {
	$first = 0;
	$walk  = function ( array $blocks ) use ( &$walk, &$first ) {
		foreach ( $blocks as $b ) {
			if ( $first ) {
				return;
			}
			$first = conti_attachment_id( $b['attrs']['image'] ?? ( $b['attrs']['id'] ?? 0 ) );
			if ( ! $first ) {
				$walk( $b['innerBlocks'] ?? array() );
			}
		}
	};
	$walk( conti_post_blocks( $post_id ) );
	return (int) $first;
}

/**
 * Serialises a block tree ([name, attrs, inner[], html]) into post content.
 * Used by the importer and the block patterns.
 */
function conti_serialize_blocks( array $blocks ): string {
	$out = '';
	foreach ( $blocks as $b ) {
		$name  = str_starts_with( $b['name'], 'core/' ) ? substr( $b['name'], 5 ) : $b['name'];
		$attrs = $b['attrs'] ?? array();
		$json  = $attrs ? ' ' . serialize_block_attributes( $attrs ) . ' ' : ' ';
		if ( ! isset( $b['inner'] ) && ! isset( $b['html'] ) ) {
			$out .= "<!-- wp:{$name}{$json}/-->\n";
			continue;
		}
		$inner = isset( $b['inner'] ) ? conti_serialize_blocks( $b['inner'] ) : '';
		$out  .= "<!-- wp:{$name}{$json}-->\n" . $inner . ( $b['html'] ?? '' ) . "\n<!-- /wp:{$name} -->\n";
	}
	return $out;
}
