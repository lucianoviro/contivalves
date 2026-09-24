<?php
/**
 * SEO/GEO without plugins: <title>, meta description, canonical, Open Graph and a schema.org
 * JSON-LD graph on every page. hreflang links are printed by Polylang.
 */

defined( 'ABSPATH' ) || exit;

/* ── Context ───────────────────────────────────────────────────────────── */

/** What is being viewed: ['type' => home|page|family|product|404, 'key' => page key, 'id' => …] */
function conti_context(): array {
	static $ctx = null;
	if ( null !== $ctx ) {
		return $ctx;
	}
	if ( is_singular( 'conti_product' ) ) {
		return $ctx = array( 'type' => 'product', 'id' => get_queried_object_id(), 'key' => '' );
	}
	if ( is_tax( 'conti_family' ) ) {
		$term = get_queried_object();
		return $ctx = array( 'type' => 'family', 'id' => $term->term_id, 'key' => conti_term_key( $term ) );
	}
	if ( is_front_page() || ( is_page() && 'home' === conti_page_key( get_queried_object_id() ) ) ) {
		return $ctx = array( 'type' => 'home', 'id' => get_queried_object_id(), 'key' => 'home' );
	}
	if ( is_page() ) {
		$id = get_queried_object_id();
		return $ctx = array( 'type' => 'page', 'id' => $id, 'key' => conti_page_key( $id ) );
	}
	return $ctx = array( 'type' => is_404() ? '404' : 'other', 'id' => get_queried_object_id(), 'key' => '' );
}

const CONTI_PAGE_NAV = array(
	'products'       => 'nav.products',
	'company'        => 'nav.company',
	'history'        => 'nav.history',
	'production'     => 'nav.production',
	'certifications' => 'nav.certifications',
	'environment'    => 'nav.environment',
	'applications'   => 'nav.applications',
	'custom'         => 'nav.custom',
	'alubronze'      => 'nav.alubronze',
	'literature'     => 'nav.literature',
	'news'           => 'nav.news',
	'contact'        => 'nav.contact',
	'privacy'        => 'nav.privacy',
);
const CONTI_PAGE_PARENT = array(
	'history'        => 'company',
	'production'     => 'company',
	'certifications' => 'company',
	'environment'    => 'company',
	'custom'         => 'applications',
	'alubronze'      => 'applications',
);

/** Breadcrumb trail [['name','url'], …] for the current page (empty on the home page). */
function conti_breadcrumbs(): array {
	$ctx   = conti_context();
	$lang  = conti_lang();
	$trail = array( array( 'name' => conti_t( 'nav.home' ), 'url' => conti_home_url( $lang ) ) );
	switch ( $ctx['type'] ) {
		case 'page':
			$key = $ctx['key'];
			if ( isset( CONTI_PAGE_PARENT[ $key ] ) ) {
				$parent  = CONTI_PAGE_PARENT[ $key ];
				$trail[] = array( 'name' => conti_t( CONTI_PAGE_NAV[ $parent ] ), 'url' => conti_page_url( $parent, $lang ) );
			}
			$trail[] = array( 'name' => isset( CONTI_PAGE_NAV[ $key ] ) ? conti_t( CONTI_PAGE_NAV[ $key ] ) : get_the_title( $ctx['id'] ), 'url' => get_permalink( $ctx['id'] ) );
			break;
		case 'family':
			$trail[] = array( 'name' => conti_t( 'nav.products' ), 'url' => conti_page_url( 'products', $lang ) );
			$trail[] = array( 'name' => conti_family_name( $ctx['key'], $lang ), 'url' => conti_family_url( $ctx['key'], $lang ) );
			break;
		case 'product':
			$p       = conti_product( $ctx['id'] );
			$trail[] = array( 'name' => conti_t( 'nav.products' ), 'url' => conti_page_url( 'products', $lang ) );
			$trail[] = array( 'name' => conti_family_name( $p['family'], $lang ), 'url' => conti_family_url( $p['family'], $lang ) );
			$trail[] = array( 'name' => conti_t( 'product.code' ) . ' ' . $p['code'], 'url' => get_permalink( $ctx['id'] ) );
			break;
		default:
			return array();
	}
	return $trail;
}

/* ── Title, description, canonical ─────────────────────────────────────── */

function conti_family_title( string $key, ?string $lang = null ): string {
	$lang   = $lang ?: conti_lang();
	$alloys = array();
	$pns    = array();
	foreach ( conti_products_of( $key, conti_default_lang() ) as $id ) {
		$p = conti_product( $id );
		if ( $a = conti_body_alloy( $p['materials'] ) ) {
			$alloys[ $a ] = conti_gloss( 'materialNames', $a, $lang );
		}
		if ( preg_match_all( '/\d+/', conti_pn( $p['rating'] ), $m ) ) {
			array_push( $pns, ...array_map( 'intval', $m[0] ) );
		}
	}
	$range = $pns ? ( min( $pns ) === max( $pns ) ? 'PN' . min( $pns ) : 'PN' . min( $pns ) . '–PN' . max( $pns ) ) : '';
	return conti_family_name( $key, $lang ) . ' – ' . implode( ', ', $alloys ) . ( $range ? ' · ' . $range : '' ) . ' | Conti Valves';
}

function conti_first_sentence( string $text ): string {
	$parts = explode( '. ', $text, 2 );
	return rtrim( $parts[0], '.' ) . '.';
}

function conti_meta(): array {
	$ctx = conti_context();
	switch ( $ctx['type'] ) {
		case 'home':
		case 'page':
			$seo = conti_seo( $ctx['id'] );
			return array(
				'title'       => $seo['title'] ?? get_the_title( $ctx['id'] ) . ' | Conti Valves',
				'description' => $seo['description'] ?? '',
			);
		case 'product':
			$p = conti_product( $ctx['id'] );
			return array(
				'title'       => $p['code'] . ' – ' . $p['description'] . ' | Conti Valves',
				'description' => $p['description'] . '. ' . conti_t( 'product.madeIn' ),
			);
		case 'family':
			return array(
				'title'       => conti_family_title( $ctx['key'] ),
				'description' => conti_first_sentence( (string) conti_family_meta( $ctx['key'], 'intro' ) ),
			);
		case '404':
			return array( 'title' => conti_t( 'notFound.title' ) . ' | Conti Valves', 'description' => conti_t( 'notFound.text' ) );
	}
	return array( 'title' => '', 'description' => '' );
}

function conti_canonical(): string {
	$ctx = conti_context();
	switch ( $ctx['type'] ) {
		case 'home':
			return conti_home_url();
		case 'page':
		case 'product':
			return (string) get_permalink( $ctx['id'] );
		case 'family':
			return conti_family_url( $ctx['key'] );
	}
	return '';
}

add_filter(
	'pre_get_document_title',
	function ( $title ) {
		$t = conti_meta()['title'] ?? '';
		return $t ?: $title;
	},
	20
);

/* ── <head> ─────────────────────────────────────────────────────────────── */

remove_action( 'wp_head', 'rel_canonical' );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
add_filter( 'wp_sitemaps_enabled', '__return_false' );

add_action(
	'wp_head',
	function () {
		$ctx  = conti_context();
		$meta = conti_meta();
		$can  = conti_canonical();
		$lang = conti_lang();
		$site = conti_site();

		if ( $meta['description'] ) {
			printf( "<meta name=\"description\" content=\"%s\">\n", esc_attr( $meta['description'] ) );
		}
		if ( '404' === $ctx['type'] ) {
			echo "<meta name=\"robots\" content=\"noindex\">\n";
		}
		if ( $can ) {
			printf( "<link rel=\"canonical\" href=\"%s\">\n", esc_url( $can ) );
		}

		// Open Graph
		$image = conti_share_image();
		$og    = array(
			'og:type'        => 'product' === $ctx['type'] ? 'product' : 'website',
			'og:site_name'   => $site['brand'] ?? 'Conti Valves',
			'og:title'       => $meta['title'],
			'og:description' => $meta['description'],
			'og:url'         => $can,
			'og:locale'      => conti_lang_meta( $lang, 'og' ),
			'og:image'       => $image,
		);
		foreach ( $og as $prop => $value ) {
			if ( $value ) {
				printf( "<meta property=\"%s\" content=\"%s\">\n", esc_attr( $prop ), esc_attr( $value ) );
			}
		}
		foreach ( conti_langs() as $l ) {
			if ( $l !== $lang ) {
				printf( "<meta property=\"og:locale:alternate\" content=\"%s\">\n", esc_attr( conti_lang_meta( $l, 'og' ) ) );
			}
		}
		echo "<meta name=\"twitter:card\" content=\"summary_large_image\">\n";
		echo "<meta name=\"format-detection\" content=\"telephone=no\">\n";

		$graph = array( '@context' => 'https://schema.org', '@graph' => array_values( array_filter( conti_schema_graph() ) ) );
		echo '<script type="application/ld+json">' . wp_json_encode( $graph, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP ) . "</script>\n";
	},
	5
);

function conti_share_image(): string {
	$ctx   = conti_context();
	$value = 0;
	if ( 'product' === $ctx['type'] ) {
		$value = conti_product( $ctx['id'] )['image'];
	} elseif ( 'family' === $ctx['type'] ) {
		$value = conti_family_meta( $ctx['key'], 'image' );
	} elseif ( in_array( $ctx['type'], array( 'home', 'page' ), true ) ) {
		$f     = conti_fields( $ctx['id'] );
		$value = $f['images']['hero'] ?? $f['image'] ?? 0;
	}
	if ( ! conti_attachment_id( $value ) ) {
		$home  = conti_fields( conti_page_id( 'home', conti_default_lang() ) );
		$value = $home['images']['hero'] ?? 0;
	}
	return conti_image_url( $value, 'conti-wide' );
}

/* ── schema.org ─────────────────────────────────────────────────────────── */

function conti_org_id(): string {
	return trailingslashit( conti_site()['url'] ) . '#organization';
}

function conti_schema_graph(): array {
	$ctx  = conti_context();
	$lang = conti_lang();
	$meta = conti_meta();
	$site = conti_site();

	$graph = array( conti_schema_organization(), array(
		'@type'      => 'WebSite',
		'@id'        => trailingslashit( $site['url'] ) . '#website',
		'url'        => $site['url'],
		'name'       => $site['brand'] ?? 'Conti Valves',
		'inLanguage' => $lang,
		'publisher'  => array( '@id' => conti_org_id() ),
	) );

	$crumbs = conti_breadcrumbs();
	if ( $crumbs ) {
		$graph[] = array(
			'@type'           => 'BreadcrumbList',
			'itemListElement' => array_map(
				fn( $c, $i ) => array( '@type' => 'ListItem', 'position' => $i + 1, 'name' => $c['name'], 'item' => $c['url'] ),
				$crumbs,
				array_keys( $crumbs )
			),
		);
	}

	$web_page = fn( $type ) => array(
		'@type'       => $type,
		'name'        => $crumbs ? end( $crumbs )['name'] : $meta['title'],
		'description' => $meta['description'],
		'url'         => conti_canonical(),
		'inLanguage'  => $lang,
		'isPartOf'    => array( '@id' => trailingslashit( $site['url'] ) . '#website' ),
		'about'       => array( '@id' => conti_org_id() ),
	);

	switch ( $ctx['type'] ) {
		case 'home':
			$f       = conti_fields( $ctx['id'] );
			$graph[] = conti_schema_family_list( $lang );
			if ( ! empty( $f['faq'] ) ) {
				$graph[] = array(
					'@type'      => 'FAQPage',
					'mainEntity' => array_map( fn( $q ) => array( '@type' => 'Question', 'name' => $q['q'], 'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $q['a'] ) ), $f['faq'] ),
				);
			}
			break;
		case 'family':
			$graph[] = $web_page( 'CollectionPage' );
			$graph[] = conti_schema_product_list( conti_products_of( $ctx['key'], $lang ) );
			break;
		case 'product':
			$graph[] = conti_schema_product( $ctx['id'] );
			break;
		case 'page':
			$key = $ctx['key'];
			$f   = conti_fields( $ctx['id'] );
			$map = array( 'products' => 'CollectionPage', 'literature' => 'CollectionPage', 'company' => 'AboutPage', 'history' => 'AboutPage', 'contact' => 'ContactPage' );
			if ( 'privacy' !== $key && 'news' !== $key ) {
				$graph[] = $web_page( $map[ $key ] ?? 'WebPage' );
			}
			if ( 'products' === $key ) {
				$graph[] = conti_schema_family_list( $lang );
			}
			if ( 'production' === $key && ! empty( $f['steps'] ) ) {
				$graph[] = array(
					'@type'       => 'HowTo',
					'name'        => $f['heading'] ?? '',
					'description' => $f['lead'] ?? '',
					'step'        => array_map( fn( $s, $i ) => array( '@type' => 'HowToStep', 'position' => $i + 1, 'name' => $s['title'], 'text' => $s['text'] ), $f['steps'], array_keys( $f['steps'] ) ),
				);
			}
			if ( 'custom' === $key ) {
				$graph[] = array( '@type' => 'Service', 'name' => $f['heading'] ?? '', 'description' => $meta['description'], 'provider' => array( '@id' => conti_org_id() ), 'serviceType' => 'Custom valve engineering', 'areaServed' => 'Worldwide' );
			}
			if ( 'alubronze' === $key ) {
				$graph[] = conti_schema_product_list( conti_alubronze_products( $lang ) );
			}
			if ( 'news' === $key ) {
				foreach ( (array) ( $f['items'] ?? array() ) as $i => $n ) {
					$graph[] = array(
						'@type'         => 'NewsArticle',
						'headline'      => $n['title'],
						'datePublished' => $n['date'],
						'articleBody'   => $n['text'],
						'inLanguage'    => $lang,
						'author'        => array( '@id' => conti_org_id() ),
						'publisher'     => array( '@id' => conti_org_id() ),
						'url'           => conti_canonical() . '#news-' . ( $i + 1 ),
					);
				}
			}
			break;
	}
	return $graph;
}

function conti_schema_organization(): array {
	$s = conti_site();
	return array_filter(
		array(
			'@type'         => 'Organization',
			'@id'           => conti_org_id(),
			'name'          => $s['name'],
			'legalName'     => $s['legalName'],
			'alternateName' => array( $s['brand'], 'Conti', 'Rubinetterie F.lli Conti' ),
			'url'           => $s['url'],
			'logo'          => get_theme_file_uri( 'assets/img/logo-conti.png' ),
			'foundingDate'  => (string) $s['foundingYear'],
			'founder'       => array( '@type' => 'Person', 'name' => $s['founder'] ),
			'description'   => 'Italian manufacturer of bronze and brass industrial valves since 1919: ball, gate, globe, check and plug valves, Y strainers, safety valves, fire valves and pressure reducing valves.',
			'address'       => array(
				'@type'           => 'PostalAddress',
				'streetAddress'   => $s['address']['street'],
				'postalCode'      => $s['address']['postalCode'],
				'addressLocality' => $s['address']['city'],
				'addressRegion'   => $s['address']['province'],
				'addressCountry'  => $s['address']['country'],
			),
			'telephone'     => $s['phone'],
			'email'         => $s['emails']['general'],
			'vatID'         => $s['vatNumber'] ?? '',
			'contactPoint'  => array(
				array( '@type' => 'ContactPoint', 'contactType' => 'sales', 'email' => $s['emails']['sales'], 'telephone' => $s['phone'], 'availableLanguage' => array( 'en', 'it', 'fr', 'es', 'de' ) ),
				array( '@type' => 'ContactPoint', 'contactType' => 'technical support', 'email' => $s['emails']['technical'], 'telephone' => $s['phone'] ),
				array( '@type' => 'ContactPoint', 'contactType' => 'billing support', 'email' => $s['emails']['accounting'] ),
			),
			'areaServed'    => 'Worldwide',
			'knowsAbout'    => array( 'Industrial valves', 'Bronze valves', 'Aluminium bronze valves', 'Brass valves', 'DZR brass', 'Bronze foundry', 'Marine valves', 'Pressure Equipment Directive' ),
			'hasCredential' => array(
				array( '@type' => 'EducationalOccupationalCredential', 'credentialCategory' => 'certification', 'name' => 'UNI EN ISO 9001:2015' ),
				array( '@type' => 'EducationalOccupationalCredential', 'credentialCategory' => 'certification', 'name' => 'ISO 14001:2015' ),
			),
			'sameAs'        => array_values( array_filter( (array) ( $s['sameAs'] ?? array() ) ) ),
		)
	);
}

function conti_schema_family_list( string $lang ): array {
	$items = array();
	foreach ( conti_family_keys() as $i => $key ) {
		$items[] = array( '@type' => 'ListItem', 'position' => $i + 1, 'name' => conti_family_name( $key, $lang ), 'url' => conti_family_url( $key, $lang ) );
	}
	return array( '@type' => 'ItemList', 'itemListElement' => $items );
}

function conti_schema_product_list( array $ids ): array {
	$items = array();
	foreach ( array_values( $ids ) as $i => $id ) {
		$p       = conti_product( $id );
		$items[] = array( '@type' => 'ListItem', 'position' => $i + 1, 'name' => $p['code'] . ' – ' . $p['description'], 'url' => get_permalink( $id ) );
	}
	return array( '@type' => 'ItemList', 'numberOfItems' => count( $items ), 'itemListElement' => $items );
}

function conti_schema_product( int $id ): array {
	$p     = conti_product( $id );
	$lang  = conti_post_lang( $id );
	$props = array();
	if ( $p['rating'] ) {
		$props[] = array( 'name' => 'Pressure rating', 'value' => $p['rating'] );
	}
	if ( $size = conti_size_range( $p['dimensions'] ) ) {
		$props[] = array( 'name' => 'Sizes', 'value' => $size );
	}
	$body = conti_body_material( $p['materials'], 'en' );
	if ( $body ) {
		$props[] = array( 'name' => 'Body material', 'value' => $body );
	}
	foreach ( $p['materials'] as $m ) {
		$props[] = array( 'name' => 'Material – ' . strtolower( $m['part'] ), 'value' => trim( implode( ' ', array_filter( array( $m['name'] ?? '', $m['grade'] ?? '', $m['standard'] ?? '' ) ) ) ) );
	}
	$images = array_values( array_filter( array( conti_image_url( $p['image'], 'conti-wide' ), conti_image_url( $p['drawing'], 'conti-wide' ) ) ) );
	return array_filter(
		array(
			'@type'              => 'Product',
			'@id'                => get_permalink( $id ) . '#product',
			'name'               => $p['code'] . ' – ' . $p['description'],
			'description'        => $p['description'],
			'sku'                => $p['code'],
			'mpn'                => $p['code'],
			'category'           => (string) conti_family_meta( $p['family'], 'singular', $lang ),
			'brand'              => array( '@type' => 'Brand', 'name' => 'Conti' ),
			'manufacturer'       => array( '@id' => conti_org_id() ),
			'countryOfOrigin'    => 'IT',
			'image'              => $images,
			'material'           => $body,
			'additionalProperty' => array_map( fn( $x ) => array( '@type' => 'PropertyValue' ) + $x, $props ),
			'isRelatedTo'        => array_map(
				fn( $v ) => array_filter( array( '@type' => 'Product', 'sku' => $v['code'], 'name' => $v['code'] . ' – ' . $v['text'], 'description' => $v['rating'] ?? '' ) ),
				$p['variants']
			),
		)
	);
}

/** Products with an aluminium-bronze version (for the aluminium bronze page). */
function conti_alubronze_products( ?string $lang = null ): array {
	$ids = array();
	foreach ( conti_family_keys() as $key ) {
		foreach ( conti_products_of( $key, $lang ) as $id ) {
			foreach ( conti_product( $id )['variants'] as $v ) {
				if ( stripos( $v['text'] ?? '', 'aluminium bronze' ) !== false ) {
					$ids[] = $id;
					break;
				}
			}
		}
	}
	return $ids;
}
