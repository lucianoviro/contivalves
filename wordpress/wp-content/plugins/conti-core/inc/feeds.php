<?php
/**
 * /sitemap.xml (with hreflang alternates), /robots.txt, /llms.txt and /llms-full.txt.
 */

defined( 'ABSPATH' ) || exit;

/** Every public URL grouped by translation: [ ['en' => url, 'it' => url, …], … ]. */
function conti_url_groups(): array {
	$groups = array();
	$langs  = conti_langs();
	$by     = fn( callable $fn ) => array_filter( array_combine( $langs, array_map( $fn, $langs ) ) );

	foreach ( array_keys( conti_page_map() ) as $key ) {
		$groups[] = $by(
			function ( $l ) use ( $key ) {
				$id = conti_page_id( $key, $l );
				return $id && conti_post_lang( $id ) === $l && 'publish' === get_post_status( $id ) ? conti_page_url( $key, $l ) : '';
			}
		);
	}
	foreach ( conti_family_keys() as $key ) {
		$groups[] = $by( fn( $l ) => conti_family_term( $key, $l ) && conti_term_lang( conti_family_term( $key, $l )->term_id ) === $l ? conti_family_url( $key, $l ) : '' );
	}
	foreach ( conti_catalog_index() as $entry ) {
		$groups[] = $by(
			function ( $l ) use ( $entry ) {
				$id = conti_translate_post( $entry['id'], $l );
				return conti_post_lang( $id ) === $l && 'publish' === get_post_status( $id ) ? get_permalink( $id ) : '';
			}
		);
	}
	return array_values( array_filter( $groups ) );
}

function conti_send_text( string $body, string $type = 'text/plain' ): void {
	status_header( 200 );
	header( "Content-Type: {$type}; charset=utf-8" );
	header( 'X-Robots-Tag: noindex', false );
	echo $body; // phpcs:ignore WordPress.Security.EscapeOutput
	exit;
}

add_filter(
	'do_parse_request',
	function ( $do ) {
		switch ( conti_request_path() ) {
			case 'sitemap.xml':
				conti_send_text( conti_sitemap(), 'application/xml' );
			case 'llms.txt':
				conti_send_text( conti_llms() );
			case 'llms-full.txt':
				conti_send_text( conti_llms_full() );
		}
		return $do;
	},
	1
);

function conti_sitemap(): string {
	$default = conti_default_lang();
	$out     = array();
	foreach ( conti_url_groups() as $group ) {
		$links = '';
		foreach ( $group as $l => $url ) {
			$links .= sprintf( '<xhtml:link rel="alternate" hreflang="%s" href="%s"/>', esc_attr( $l ), esc_url( $url ) );
		}
		if ( isset( $group[ $default ] ) ) {
			$links .= sprintf( '<xhtml:link rel="alternate" hreflang="x-default" href="%s"/>', esc_url( $group[ $default ] ) );
		}
		foreach ( $group as $url ) {
			$out[] = '<url><loc>' . esc_url( $url ) . '</loc>' . $links . '</url>';
		}
	}
	return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">\n" . implode( "\n", $out ) . "\n</urlset>\n";
}

// Search engines and AI assistants are welcome: being quoted correctly is part of the GEO strategy.
add_filter(
	'robots_txt',
	function ( $output, $public ) {
		if ( ! $public ) {
			return $output;
		}
		return "User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\n\nSitemap: " . home_url( '/sitemap.xml' ) . "\n";
	},
	20,
	2
);

function conti_llms(): string {
	$en   = conti_default_lang();
	$site = conti_site();
	$home = conti_page_id( 'home', $en );
	$lines = array(
		"# {$site['name']} ({$site['brand']})",
		'',
		'> ' . ( conti_seo( $home )['description'] ?? '' ),
		'',
	);
	foreach ( conti_block_items( conti_page_id( 'company', $en ), 'conti/facts' ) as $fact ) {
		$lines[] = '- ' . conti_plain( $fact['term'] ?? '' ) . ': ' . conti_plain( $fact['value'] ?? '' );
	}
	$lines[] = "- Phone: {$site['phone']}";
	$lines[] = "- Sales: {$site['emails']['sales']} · Technical department: {$site['emails']['technical']} · General: {$site['emails']['general']}";
	$lines[] = '- Languages: ' . implode( ', ', array_map( fn( $l ) => conti_lang_meta( $l, 'name' ), conti_langs() ) );
	array_push( $lines, '', '## Product families', '' );
	foreach ( conti_family_keys() as $key ) {
		$n       = count( conti_products_of( $key, $en ) );
		$lines[] = sprintf( '- [%s](%s) (%d %s): %s', conti_family_name( $key, $en ), conti_family_url( $key, $en ), $n, 1 === $n ? 'item' : 'items', conti_family_meta( $key, 'intro', $en ) );
	}
	array_push( $lines, '', '## Company', '' );
	foreach ( array( 'company', 'history', 'production', 'certifications', 'environment', 'applications', 'custom', 'alubronze', 'contact' ) as $key ) {
		$lines[] = sprintf( '- [%s](%s)', conti_t( CONTI_PAGE_NAV[ $key ], $en ), conti_page_url( $key, $en ) );
	}
	$faq = conti_block_items( $home, 'conti/faq' );
	if ( $faq ) {
		array_push( $lines, '', '## FAQ', '' );
		foreach ( $faq as $f ) {
			array_push( $lines, '### ' . conti_plain( $f['q'] ?? '' ), '', conti_plain( $f['a'] ?? '' ), '' );
		}
	}
	array_push( $lines, '## Optional', '', '- [Full product catalogue in plain text](' . home_url( '/llms-full.txt' ) . '): every item with pressure rating, sizes, materials and versions.', '' );
	return implode( "\n", $lines );
}

function conti_llms_full(): string {
	$en   = conti_default_lang();
	$site = conti_site();
	$out  = array(
		"# {$site['name']} – product catalogue",
		'',
		"All valves are designed, cast, machined, assembled and 100% pressure-tested by {$site['legalName']} in {$site['address']['city']} ({$site['address']['province']}), Italy. Dimensions in mm, weights in kg.",
		'',
	);
	foreach ( conti_family_keys() as $key ) {
		array_push( $out, '## ' . conti_family_name( $key, $en ), '', (string) conti_family_meta( $key, 'intro', $en ), '' );
		foreach ( conti_grouped_products( $key, $en ) as $group ) {
			if ( $group['key'] ) {
				$t = conti_family_term( $group['key'], $en );
				array_push( $out, '### ' . ( $t ? $t->name : $group['key'] ), '' );
			}
			foreach ( $group['ids'] as $id ) {
				$p     = conti_product( $id );
				$out[] = "#### {$p['code']} – {$p['description']}";
				$out[] = '';
				$out[] = '- URL: ' . get_permalink( $id );
				if ( $p['rating'] ) {
					$out[] = "- Pressure rating: {$p['rating']}";
				}
				if ( $s = conti_size_range( $p['dimensions'] ) ) {
					$out[] = "- Sizes: {$s}";
				}
				if ( $b = conti_body_material( $p['materials'], $en ) ) {
					$out[] = "- Body: {$b}";
				}
				if ( $p['materials'] ) {
					$out[] = '- Materials: ' . implode( '; ', array_map( fn( $m ) => conti_gloss( 'parts', $m['part'], $en ) . ' ' . conti_material_name( $m, $en ) . ( ! empty( $m['standard'] ) ? " ({$m['standard']})" : '' ), $p['materials'] ) );
				}
				if ( $p['variants'] ) {
					$out[] = '- Versions: ' . implode( '; ', array_map( fn( $v ) => $v['code'] . ' ' . conti_gloss( 'variantTexts', $v['text'], $en ) . ( ! empty( $v['rating'] ) ? " ({$v['rating']})" : '' ), $p['variants'] ) );
				}
				foreach ( $p['dimensions'] as $d ) {
					$out[] = '';
					$out[] = '| Size | ' . implode( ' | ', array_map( fn( $r ) => conti_row_label( $r, $en ), $d['rows'] ) ) . ' |';
					$out[] = '|' . str_repeat( '---|', count( $d['rows'] ) + 1 );
					foreach ( $d['sizes'] as $i => $size ) {
						$out[] = "| {$size} | " . implode( ' | ', array_map( fn( $r ) => ( $r['values'][ $i ] ?? '' ) ?: '–', $d['rows'] ) ) . ' |';
					}
				}
				$out[] = '';
			}
		}
	}
	return implode( "\n", $out );
}
