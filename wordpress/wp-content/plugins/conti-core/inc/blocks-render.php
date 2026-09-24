<?php
/**
 * HTML of the Conti blocks. Same markup and CSS classes as the static site.
 */

defined( 'ABSPATH' ) || exit;

/** Rich text from the editor: inline formatting only. */
function conti_rt( $html ): string {
	return wp_kses(
		(string) $html,
		array(
			'a'      => array( 'href' => true, 'target' => true, 'rel' => true ),
			'strong' => array(),
			'em'     => array(),
			'b'      => array(),
			'i'      => array(),
			'br'     => array(),
			'span'   => array( 'class' => true ),
			'sub'    => array(),
			'sup'    => array(),
		)
	);
}

/** Plain text of a rich-text value (for alt texts, schema.org, e-mail subjects). */
function conti_plain( $html ): string {
	return trim( html_entity_decode( wp_strip_all_tags( (string) $html ), ENT_QUOTES, 'UTF-8' ) );
}

/**
 * Link targets: "page:products", "family:ball-valves", "product:04352" are resolved in the
 * current language at render time, "email:technical?subject=…" becomes a mailto link to that
 * office (Settings → Conti); anything else is used as a normal URL.
 */
function conti_link( $url ): string {
	$url = trim( (string) $url );
	if ( preg_match( '/^email:(\w+)(?:\?subject=(.*))?$/', $url, $m ) ) {
		$email = conti_site()['emails'][ $m[1] ] ?? conti_site()['emails']['sales'];
		return 'mailto:' . $email . ( ! empty( $m[2] ) ? '?subject=' . rawurlencode( rawurldecode( $m[2] ) ) : '' );
	}
	if ( preg_match( '/^(page|family|product):(.+)$/', $url, $m ) ) {
		switch ( $m[1] ) {
			case 'page':
				return conti_page_url( $m[2] );
			case 'family':
				return conti_family_url( $m[2] );
			case 'product':
				$entry = conti_catalog_index()[ $m[2] ] ?? null;
				return $entry ? (string) get_permalink( conti_translate_post( $entry['id'] ) ) : '';
		}
	}
	return $url;
}

function conti_render_block( string $slug, array $a, string $content, $block ): string {
	$fn = 'conti_block_' . str_replace( '-', '_', $slug );
	if ( ! function_exists( $fn ) ) {
		return '';
	}
	$html = (string) $fn( $a, $content, $block );
	// A component placed directly in the page (outside a "Sezione") gets a plain section around it.
	$def = conti_block_definitions()[ $slug ] ?? array();
	if ( $html && in_array( 'conti/inSection', $def['usesContext'] ?? array(), true ) && empty( $block->context['conti/inSection'] ) && ! conti_is_block_preview() ) {
		$html = '<section class="section"><div class="container">' . $html . '</div></section>';
	}
	return $html;
}

/** Non-empty repeater rows. */
function conti_items( array $a ): array {
	return array_values(
		array_filter(
			(array) ( $a['items'] ?? array() ),
			fn( $i ) => is_array( $i ) ? (bool) array_filter( $i, fn( $v ) => '' !== $v && 0 !== $v && null !== $v ) : '' !== trim( (string) $i )
		)
	);
}

function conti_render_part( string $slug, array $args = array() ): string {
	ob_start();
	get_template_part( $slug, null, $args );
	return (string) ob_get_clean();
}

/* ── Page-level blocks ────────────────────────────────────────────────── */

function conti_block_page_head( array $a ): string {
	$html  = conti_render_part( 'template-parts/breadcrumb', array( 'crumbs' => conti_breadcrumbs() ) );
	$html .= ! empty( $a['eyebrow'] ) ? '<p class="eyebrow">' . conti_rt( $a['eyebrow'] ) . '</p>' : '';
	$html .= '<h1>' . conti_rt( $a['heading'] ?? '' ) . '</h1>';
	$html .= ! empty( $a['lead'] ) ? '<p class="lead">' . conti_rt( $a['lead'] ) . '</p>' : '';
	$html .= ! empty( $a['intro'] ) ? '<p class="intro">' . conti_rt( $a['intro'] ) . '</p>' : '';
	return '<section class="page-head"><div class="container">' . $html . '</div></section>';
}

function conti_block_hero( array $a ): string {
	$text  = ! empty( $a['eyebrow'] ) ? '<p class="eyebrow">' . conti_rt( $a['eyebrow'] ) . '</p>' : '';
	$text .= '<h1>' . conti_rt( $a['heading'] ?? '' ) . '</h1>';
	$text .= ! empty( $a['lead'] ) ? '<p class="lead">' . conti_rt( $a['lead'] ) . '</p>' : '';
	$text .= conti_buttons( (array) ( $a['buttons'] ?? array() ) );
	$media = conti_image( $a['image'] ?? 0, conti_plain( $a['heading'] ?? '' ), 'conti-wide', array( 'loading' => 'eager', 'fetchpriority' => 'high', 'sizes' => '(min-width: 900px) 50vw, 100vw' ) );
	if ( ! empty( $a['badgeTitle'] ) ) {
		$media .= '<span class="hero__badge"><strong>' . conti_rt( $a['badgeTitle'] ) . '</strong><span>' . conti_rt( $a['badgeText'] ?? '' ) . '</span></span>';
	}
	return '<section class="hero"><div class="container hero__grid"><div class="hero__text">' . $text . '</div><div class="hero__media">' . $media . '</div></div></section>';
}

function conti_block_section( array $a, string $content ): string {
	$class  = 'tight' === ( $a['padding'] ?? '' ) ? 'section--tight' : 'section';
	$class .= array( 'mist' => ' section--mist', 'night' => ' section--night' )[ $a['background'] ?? '' ] ?? '';
	$class .= ! empty( $a['className'] ) ? ' ' . $a['className'] : '';
	$inner  = 'container' . ( array( 'narrow' => ' narrow', 'text' => ' prose' )[ $a['width'] ?? '' ] ?? '' );
	$anchor = ! empty( $a['anchor'] ) ? ' id="' . esc_attr( $a['anchor'] ) . '"' : '';
	return '<section class="' . esc_attr( $class ) . '"' . $anchor . '><div class="' . $inner . '">' . $content . '</div></section>';
}

function conti_block_cta( array $a ): string {
	$args = array_filter(
		array(
			'title'   => conti_plain( $a['title'] ?? '' ),
			'text'    => conti_plain( $a['text'] ?? '' ),
			'subject' => (string) ( $a['subject'] ?? '' ),
		)
	);
	return conti_render_part( 'template-parts/cta-band', $args );
}

/* ── Layout ──────────────────────────────────────────────────────────── */

function conti_block_split( array $a, string $content ): string {
	$class = 'split' . ( ! empty( $a['reverse'] ) ? ' split--reverse' : '' ) . ( 'start' === ( $a['align'] ?? '' ) ? ' split--start' : '' );
	return '<div class="' . $class . '">' . $content . '</div>';
}

function conti_block_column( array $a, string $content ): string {
	return '<div>' . $content . '</div>';
}

function conti_block_section_head( array $a ): string {
	$text  = ! empty( $a['eyebrow'] ) ? '<p class="eyebrow">' . conti_rt( $a['eyebrow'] ) . '</p>' : '';
	$text .= ! empty( $a['heading'] ) ? '<h2>' . conti_rt( $a['heading'] ) . '</h2>' : '';
	$text .= ! empty( $a['text'] ) ? '<p>' . conti_rt( $a['text'] ) . '</p>' : '';
	$link  = ! empty( $a['linkLabel'] ) && ! empty( $a['linkUrl'] ) ? '<a class="link-arrow" href="' . esc_url( conti_link( $a['linkUrl'] ) ) . '">' . conti_rt( $a['linkLabel'] ) . '</a>' : '';
	return '<div class="section-head"><div>' . $text . '</div>' . $link . '</div>';
}

function conti_block_image( array $a ): string {
	$ratio = array( '16/10' => ' frame--wide', '4/3' => ' frame--43', '1/1' => ' frame--square', 'auto' => ' frame--auto' )[ $a['ratio'] ?? '' ] ?? '';
	$fit   = 'contain' === ( $a['fit'] ?? '' ) ? ' frame--contain' : '';
	$img   = conti_image( $a['image'] ?? 0, conti_plain( $a['alt'] ?? '' ), 'auto' === ( $a['ratio'] ?? '' ) ? 'large' : 'conti-wide', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 45vw, 100vw' ) );
	$html  = '<div class="frame' . $ratio . $fit . '">' . $img . '</div>';
	return empty( $a['caption'] ) ? $html : '<figure class="figure">' . $html . '<figcaption class="small muted">' . conti_rt( $a['caption'] ) . '</figcaption></figure>';
}

/** Buttons and arrow links: [{label, url, file, style: primary|ghost|arrow}]. */
function conti_buttons( array $items ): string {
	$out = '';
	foreach ( $items as $it ) {
		$url = ! empty( $it['file'] ) ? conti_file_url( $it['file'] ) : conti_link( $it['url'] ?? '' );
		if ( ! $url || empty( $it['label'] ) ) {
			continue;
		}
		$class = array( 'primary' => 'btn btn--primary', 'ghost' => 'btn btn--ghost' )[ $it['style'] ?? '' ] ?? 'link-arrow';
		$new   = ! empty( $it['file'] ) || ( preg_match( '#^https?://#', $url ) && ! str_starts_with( $url, home_url() ) );
		$out  .= '<a class="' . $class . '" href="' . esc_url( $url ) . '"' . ( $new ? ' target="_blank" rel="noopener"' : '' ) . '>' . conti_rt( $it['label'] ) . '</a>';
	}
	return $out ? '<div class="btn-row">' . $out . '</div>' : '';
}

function conti_block_links( array $a ): string {
	return conti_buttons( conti_items( $a ) );
}

/* ── Components ──────────────────────────────────────────────────────── */

function conti_block_stats( array $a ): string {
	$value = 'stat__value' . ( 'patina' === ( $a['color'] ?? '' ) ? ' stat__value--patina' : '' );
	$out   = '';
	foreach ( conti_items( $a ) as $it ) {
		$out .= '<div class="stat"><div class="' . $value . '">' . conti_rt( $it['value'] ?? '' ) . '</div><div class="stat__label">' . conti_rt( $it['label'] ?? '' ) . '</div></div>';
	}
	return '<div class="stats">' . $out . '</div>';
}

function conti_block_family_grid( array $a ): string {
	$out = '';
	foreach ( conti_family_keys() as $key ) {
		$out .= conti_render_part( 'template-parts/family-card', array( 'key' => $key, 'intro' => ! empty( $a['showIntro'] ) ) );
	}
	return '<div class="grid ' . ( 3 === (int) ( $a['columns'] ?? 4 ) ? 'grid-3' : 'grid-4' ) . '">' . $out . '</div>';
}

/** Product posts (current language) shown by a "Griglia prodotti" block. */
function conti_product_grid_ids( array $a ): array {
	switch ( $a['source'] ?? 'family' ) {
		case 'alubronze':
			return conti_alubronze_products();
		case 'codes':
			$ids = array();
			foreach ( preg_split( '/[\s,;]+/', (string) ( $a['codes'] ?? '' ), -1, PREG_SPLIT_NO_EMPTY ) as $code ) {
				$entry = conti_catalog_index()[ $code ] ?? null;
				if ( $entry ) {
					$ids[] = conti_translate_post( $entry['id'] );
				}
			}
			return $ids;
		default:
			return conti_products_of( (string) ( $a['family'] ?? '' ) );
	}
}

function conti_block_product_grid( array $a ): string {
	$out = '';
	foreach ( conti_product_grid_ids( $a ) as $id ) {
		$out .= conti_render_part( 'template-parts/product-card', array( 'id' => $id ) );
	}
	return $out ? '<div class="grid grid-4">' . $out . '</div>' : '';
}

function conti_grid_class( array $a ): string {
	return array( 2 => 'grid-2', 3 => 'grid-3' )[ (int) ( $a['columns'] ?? 4 ) ] ?? 'grid-4';
}

function conti_block_cards( array $a ): string {
	$style = $a['style'] ?? 'cover';
	$out   = '';
	foreach ( conti_items( $a ) as $i => $it ) {
		$url   = ! empty( $it['url'] ) ? conti_link( $it['url'] ) : '';
		$title = conti_rt( $it['title'] ?? '' );
		$text  = ! empty( $it['text'] ) ? conti_rt( $it['text'] ) : '';
		if ( 'teaser' === $style ) {
			$tag  = $url ? 'a' : 'div';
			$out .= '<' . $tag . ' class="teaser' . ( $i % 2 ? ' teaser--bronze' : '' ) . '"' . ( $url ? ' href="' . esc_url( $url ) . '"' : '' ) . '>'
				. ( ! empty( $it['eyebrow'] ) ? '<span class="eyebrow">' . conti_rt( $it['eyebrow'] ) . '</span>' : '' )
				. '<h2>' . $title . '</h2>' . ( $text ? '<p>' . $text . '</p>' : '' )
				. ( ! empty( $it['linkLabel'] ) ? '<span class="link-arrow">' . conti_rt( $it['linkLabel'] ) . '</span>' : '' )
				. '</' . $tag . '>';
			continue;
		}
		$media = 'plain' === $style ? '' : '<div class="card__media card__media--cover">' . conti_image( $it['image'] ?? 0, conti_plain( $it['title'] ?? '' ), 'conti-card', array( 'loading' => 'lazy', 'sizes' => '(min-width: 1100px) 300px, 50vw' ) ) . '</div>';
		$head  = $url ? '<a class="stretched" href="' . esc_url( $url ) . '">' . $title . '</a>' : $title;
		$out  .= '<li class="card">' . $media . '<div class="card__body"><h3 class="card__title">' . $head . '</h3>' . ( $text ? '<p class="card__text">' . $text . '</p>' : '' ) . '</div></li>';
	}
	if ( 'teaser' === $style ) {
		return '<div class="grid grid-2">' . $out . '</div>';
	}
	return '<ul class="grid ' . conti_grid_class( $a ) . ' cards">' . $out . '</ul>';
}

function conti_block_pillars( array $a ): string {
	$out = '';
	foreach ( conti_items( $a ) as $it ) {
		$out .= '<article class="pillar">' . conti_icon( (string) ( $it['icon'] ?? '' ) ) . '<h3>' . conti_rt( $it['title'] ?? '' ) . '</h3><p>' . conti_rt( $it['text'] ?? '' ) . '</p></article>';
	}
	return '<div class="grid grid-3 pillars pillars--' . ( 'patina' === ( $a['style'] ?? '' ) ? 'patina' : 'dark' ) . '">' . $out . '</div>';
}

function conti_block_faq( array $a ): string {
	$out = '';
	foreach ( conti_items( $a ) as $it ) {
		$out .= '<details><summary>' . conti_rt( $it['q'] ?? '' ) . '</summary><p>' . conti_rt( $it['a'] ?? '' ) . '</p></details>';
	}
	return '<div class="faq">' . $out . '</div>';
}

function conti_block_timeline( array $a ): string {
	$out = '';
	foreach ( conti_items( $a ) as $it ) {
		$media = ! empty( $it['image'] )
			? '<div class="milestone__media">' . conti_image( $it['image'], conti_plain( ( $it['year'] ?? '' ) . ' – ' . ( $it['text'] ?? '' ) ), 'medium_large', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 280px, 90vw' ) ) . '</div>'
			: '';
		$out  .= '<li class="milestone"><div class="milestone__year">' . conti_rt( $it['year'] ?? '' ) . '</div><div class="milestone__body"><p>' . conti_rt( $it['text'] ?? '' ) . '</p></div>' . $media . '</li>';
	}
	return '<ol class="timeline">' . $out . '</ol>';
}

function conti_block_steps( array $a ): string {
	$blocks = 'blocks' === ( $a['style'] ?? '' );
	$out    = '';
	foreach ( conti_items( $a ) as $i => $it ) {
		$n     = str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT );
		$title = conti_rt( $it['title'] ?? '' );
		$text  = conti_rt( $it['text'] ?? '' );
		$out  .= $blocks
			? '<article class="block"><span class="block__n">' . $n . '</span><h2>' . $title . '</h2><p>' . $text . '</p></article>'
			: '<li class="step"><span class="step__n">' . $n . '</span><h2 class="step__title">' . $title . '</h2><p>' . $text . '</p></li>';
	}
	return $blocks ? '<div class="grid grid-2">' . $out . '</div>' : '<ol class="steps">' . $out . '</ol>';
}

function conti_block_gallery( array $a ): string {
	$style = $a['style'] ?? 'certificate';
	$out   = '';
	foreach ( conti_items( $a ) as $it ) {
		$label = conti_plain( $it['label'] ?? '' );
		if ( 'photo' === $style ) {
			$out .= '<div class="photo">' . conti_image( $it['image'] ?? 0, $label, 'conti-card', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 25vw, 50vw' ) ) . '</div>';
			continue;
		}
		if ( 'plain' === $style ) {
			$out .= conti_image( $it['image'] ?? 0, $label, 'medium_large', array( 'loading' => 'lazy', 'sizes' => '(min-width: 900px) 22vw, 45vw' ) );
			continue;
		}
		$full  = conti_image_url( $it['image'] ?? 0 );
		$media = '<a class="card__media ' . ( 'manual' === $style ? 'manual' : 'card__media--cert' ) . '"' . ( $full ? ' href="' . esc_url( $full ) . '" target="_blank" rel="noopener"' : '' ) . '>'
			. conti_image( $it['image'] ?? 0, $label, 'medium_large', array( 'loading' => 'lazy', 'sizes' => 'manual' === $style ? '(min-width: 900px) 30vw, 90vw' : '(min-width: 1100px) 280px, 45vw' ) ) . '</a>';
		$cap   = ! empty( $it['url'] )
			? '<figcaption class="card__body"><a class="card__title" href="' . esc_url( conti_link( $it['url'] ) ) . '">' . conti_rt( $it['label'] ?? '' ) . '</a></figcaption>'
			: '<figcaption class="card__body small">' . conti_rt( $it['label'] ?? '' ) . '</figcaption>';
		$out  .= '<figure class="card">' . $media . $cap . '</figure>';
	}
	switch ( $style ) {
		case 'photo':
			return '<div class="photos">' . $out . '</div>';
		case 'plain':
			return '<div class="certs">' . $out . '</div>';
		case 'manual':
			return '<div class="grid ' . conti_grid_class( $a ) . ' manuals">' . $out . '</div>';
		default:
			return '<div class="grid ' . conti_grid_class( $a ) . ' gallery">' . $out . '</div>';
	}
}

function conti_block_documents( array $a ): string {
	$out = '';
	foreach ( conti_items( $a ) as $it ) {
		$url  = ! empty( $it['file'] ) ? conti_file_url( $it['file'] ) : conti_link( $it['url'] ?? '' );
		$meta = conti_plain( $it['meta'] ?? '' );
		$out .= '<li class="doc"><span class="doc__icon" aria-hidden="true">' . esc_html( (string) strtok( $meta ?: 'PDF', ' ' ) ) . '</span>'
			. '<span class="doc__name">' . conti_rt( $it['name'] ?? '' ) . ( $meta ? '<small>' . esc_html( $meta ) . '</small>' : '' ) . '</span>'
			. ( $url ? '<a class="btn btn--ghost" href="' . esc_url( $url ) . '" target="_blank" rel="noopener">' . esc_html( conti_t( 'cta.download' ) ) . '</a>' : '<span class="muted small">—</span>' )
			. '</li>';
	}
	return '<ul class="docs">' . $out . '</ul>';
}

function conti_block_facts( array $a ): string {
	$out = '';
	foreach ( conti_items( $a ) as $it ) {
		$out .= '<dt>' . conti_rt( $it['term'] ?? '' ) . '</dt><dd>' . conti_rt( $it['value'] ?? '' ) . '</dd>';
	}
	return '<dl class="facts">' . $out . '</dl>';
}

function conti_block_checklist( array $a ): string {
	$box  = 'box' === ( $a['style'] ?? '' );
	$html = ! empty( $a['heading'] ) ? '<h2' . ( $box ? '' : ' class="props-title"' ) . '>' . conti_rt( $a['heading'] ) . '</h2>' : '';
	$li   = '';
	foreach ( conti_items( $a ) as $it ) {
		$li .= '<li>' . conti_rt( is_array( $it ) ? ( $it['text'] ?? '' ) : $it ) . '</li>';
	}
	$html .= '<ul class="check-list">' . $li . '</ul>';
	if ( ! empty( $a['buttonLabel'] ) && ! empty( $a['buttonUrl'] ) ) {
		$html .= '<a class="btn btn--primary" href="' . esc_url( conti_link( $a['buttonUrl'] ) ) . '">' . conti_rt( $a['buttonLabel'] ) . '</a>';
	}
	return '<div class="' . ( $box ? 'options' : 'checklist' ) . '">' . $html . '</div>';
}

function conti_block_quote( array $a ): string {
	return '<blockquote class="quote"><p>“' . conti_rt( $a['text'] ?? '' ) . '”</p>' . ( ! empty( $a['author'] ) ? '<footer>— ' . conti_rt( $a['author'] ) . '</footer>' : '' ) . '</blockquote>';
}

function conti_block_video( array $a ): string {
	return conti_render_part( 'template-parts/youtube', array( 'id' => sanitize_text_field( (string) ( $a['youtube'] ?? '' ) ), 'title' => conti_plain( $a['title'] ?? '' ) ) );
}

/** Long date in the page language ("12 marzo 2024"). */
function conti_long_date( string $date ): string {
	$ts = strtotime( $date );
	if ( ! $ts ) {
		return '';
	}
	return class_exists( 'IntlDateFormatter' ) ? (string) ( new IntlDateFormatter( conti_lang(), IntlDateFormatter::LONG, IntlDateFormatter::NONE ) )->format( $ts ) : wp_date( 'j F Y', $ts );
}

function conti_block_news( array $a ): string {
	$out = '';
	foreach ( conti_items( $a ) as $i => $n ) {
		$out .= '<article class="news" id="news-' . ( $i + 1 ) . '"><div class="news__media">'
			. conti_image( $n['image'] ?? 0, conti_plain( $n['title'] ?? '' ), 'medium_large', array( 'loading' => 'lazy', 'sizes' => '(min-width: 700px) 260px, 100vw' ) )
			. '</div><div><time datetime="' . esc_attr( $n['date'] ?? '' ) . '" class="small muted">' . esc_html( conti_long_date( (string) ( $n['date'] ?? '' ) ) ) . '</time>'
			. '<h2>' . conti_rt( $n['title'] ?? '' ) . '</h2><p>' . conti_rt( $n['text'] ?? '' ) . '</p></div></article>';
	}
	return '<div class="news-list">' . $out . '</div>';
}

function conti_block_contact( array $a ): string {
	$site  = conti_site();
	$depts = '';
	foreach ( array( 'sales', 'technical', 'accounting', 'general' ) as $key ) {
		$email  = $site['emails'][ $key ];
		$depts .= '<li><span class="muted small">' . esc_html( conti_t( "contact.{$key}" ) ) . '</span><a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a></li>';
	}
	$depts .= '<li><span class="muted small">' . esc_html( conti_t( 'contact.phone' ) ) . '</span><a href="' . esc_url( $site['phoneHref'] ) . '">' . esc_html( $site['phone'] ) . '</a></li>';
	$ad     = $site['address'];
	$visit  = ! empty( $a['visitHeading'] ) ? '<h2>' . conti_rt( $a['visitHeading'] ) . '</h2>' : '';
	$visit .= '<address><strong>' . esc_html( $site['name'] ) . '</strong><br>' . esc_html( $ad['street'] ) . '<br>'
		. esc_html( "{$ad['postalCode']} {$ad['city']} ({$ad['province']})" ) . '<br>' . esc_html( "{$ad['region']}, {$ad['countryName']}" ) . '</address>';
	$visit .= '<a class="btn btn--primary" href="' . esc_url( $site['mapsUrl'] ) . '" target="_blank" rel="noopener">' . esc_html( conti_t( 'contact.map' ) ) . '</a>';
	$head   = ! empty( $a['departmentsHeading'] ) ? '<h2>' . conti_rt( $a['departmentsHeading'] ) . '</h2>' : '';
	return '<div class="contact"><div>' . $head . '<ul class="depts">' . $depts . '</ul></div><div class="visit">' . $visit . '</div></div>';
}
