<?php
defined( 'ABSPATH' ) || exit;

$lang       = conti_lang();
$alternates = conti_alternates();
$current    = trailingslashit( (string) strtok( home_url( add_query_arg( array() ) ), '?' ) );
$is         = fn( $url ) => str_starts_with( $current, trailingslashit( $url ) );
$page_link  = fn( $key ) => array( 'label' => conti_t( CONTI_PAGE_NAV[ $key ] ?? 'nav.home' ), 'href' => conti_page_url( $key ) );

$products_url = conti_page_url( 'products' );
$families     = array_map( fn( $k ) => array( 'label' => conti_family_name( $k ), 'href' => conti_family_url( $k ) ), conti_family_keys() );
$company      = array( array( 'label' => conti_t( 'nav.companyOverview' ), 'href' => conti_page_url( 'company' ) ), $page_link( 'history' ), $page_link( 'production' ), $page_link( 'certifications' ), $page_link( 'environment' ) );
$apps         = array( array( 'label' => conti_t( 'nav.industries' ), 'href' => conti_page_url( 'applications' ) ), $page_link( 'custom' ), $page_link( 'alubronze' ) );

$menus  = array(
	array( 'label' => conti_t( 'nav.products' ), 'href' => $products_url, 'links' => $families, 'wide' => true, 'all' => array( 'label' => conti_t( 'nav.allProducts' ), 'href' => $products_url ) ),
	array( 'label' => conti_t( 'nav.company' ), 'href' => $company[0]['href'], 'links' => $company ),
	array( 'label' => conti_t( 'nav.applications' ), 'href' => $apps[0]['href'], 'links' => $apps ),
);
$simple = array( $page_link( 'literature' ), $page_link( 'news' ) );
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
	<a class="skip" href="#main"><?php conti_e( conti_t( 'nav.skip' ) ); ?></a>
	<div class="container bar">
		<a class="brand" href="<?php echo esc_url( conti_home_url() ); ?>" aria-label="Conti Valves – home">
			<img src="<?php echo esc_url( get_theme_file_uri( 'assets/img/logo-conti.png' ) ); ?>" width="114" height="40" alt="Conti – valve manufacturer since 1919">
		</a>

		<nav class="nav" aria-label="Main">
			<ul class="nav__list">
				<?php foreach ( $menus as $m ) : ?>
				<li class="nav__item has-menu<?php echo ! empty( $m['wide'] ) ? ' wide' : ''; ?>">
					<a href="<?php echo esc_url( $m['href'] ); ?>" class="nav__link<?php echo $is( $m['href'] ) ? ' active' : ''; ?>" aria-haspopup="true"><?php conti_e( $m['label'] ); ?> <?php echo conti_icon( 'chevron' ); // phpcs:ignore ?></a>
					<div class="menu">
						<ul>
							<?php foreach ( $m['links'] as $l ) : ?>
							<li><a href="<?php echo esc_url( $l['href'] ); ?>"<?php echo trailingslashit( $l['href'] ) === $current ? ' aria-current="page"' : ''; ?>><?php conti_e( $l['label'] ); ?></a></li>
							<?php endforeach; ?>
						</ul>
						<?php if ( ! empty( $m['all'] ) ) : ?>
						<a class="menu__all link-arrow" href="<?php echo esc_url( $m['all']['href'] ); ?>"><?php conti_e( $m['all']['label'] ); ?></a>
						<?php endif; ?>
					</div>
				</li>
				<?php endforeach; ?>
				<?php foreach ( $simple as $s ) : ?>
				<li class="nav__item"><a href="<?php echo esc_url( $s['href'] ); ?>" class="nav__link<?php echo $is( $s['href'] ) ? ' active' : ''; ?>"><?php conti_e( $s['label'] ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		</nav>

		<div class="tools">
			<?php if ( count( $alternates ) > 1 ) : ?>
			<div class="lang has-menu">
				<button class="lang__btn" type="button" aria-label="<?php echo esc_attr( conti_t( 'nav.language' ) ); ?>" aria-haspopup="true"><?php echo conti_icon( 'globe' ); // phpcs:ignore ?> <?php conti_e( conti_lang_meta( $lang, 'label' ) ); ?></button>
				<ul class="menu menu--lang">
					<?php foreach ( $alternates as $a ) : ?>
					<li><a href="<?php echo esc_url( $a['url'] ); ?>" hreflang="<?php echo esc_attr( $a['lang'] ); ?>" lang="<?php echo esc_attr( $a['lang'] ); ?>"<?php echo $a['current'] ? ' aria-current="true"' : ''; ?>><?php conti_e( $a['name'] ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</div>
			<?php endif; ?>
			<a class="btn btn--primary contact-btn" href="<?php echo esc_url( conti_page_url( 'contact' ) ); ?>"><?php conti_e( conti_t( 'nav.contact' ) ); ?></a>
			<button class="burger" type="button" aria-expanded="false" aria-controls="mobile-nav"><span class="visually-hidden"><?php conti_e( conti_t( 'nav.menu' ) ); ?></span><span class="burger__lines" aria-hidden="true"></span></button>
		</div>
	</div>

	<div id="mobile-nav" class="mobile" hidden>
		<div class="container">
			<?php foreach ( $menus as $m ) : ?>
			<details class="mobile__group">
				<summary><?php conti_e( $m['label'] ); ?></summary>
				<ul>
					<?php if ( ! empty( $m['all'] ) ) : ?><li><a href="<?php echo esc_url( $m['all']['href'] ); ?>"><strong><?php conti_e( $m['all']['label'] ); ?></strong></a></li><?php endif; ?>
					<?php foreach ( $m['links'] as $l ) : ?><li><a href="<?php echo esc_url( $l['href'] ); ?>"><?php conti_e( $l['label'] ); ?></a></li><?php endforeach; ?>
				</ul>
			</details>
			<?php endforeach; ?>
			<?php foreach ( $simple as $s ) : ?><a class="mobile__link" href="<?php echo esc_url( $s['href'] ); ?>"><?php conti_e( $s['label'] ); ?></a><?php endforeach; ?>
			<a class="mobile__link" href="<?php echo esc_url( conti_page_url( 'contact' ) ); ?>"><?php conti_e( conti_t( 'nav.contact' ) ); ?></a>
			<?php if ( count( $alternates ) > 1 ) : ?>
			<div class="mobile__langs" aria-label="<?php echo esc_attr( conti_t( 'nav.language' ) ); ?>">
				<?php foreach ( $alternates as $a ) : ?><a href="<?php echo esc_url( $a['url'] ); ?>" hreflang="<?php echo esc_attr( $a['lang'] ); ?>"<?php echo $a['current'] ? ' aria-current="true"' : ''; ?>><?php conti_e( $a['label'] ); ?></a><?php endforeach; ?>
			</div>
			<?php endif; ?>
		</div>
	</div>
</header>
<main id="main">
