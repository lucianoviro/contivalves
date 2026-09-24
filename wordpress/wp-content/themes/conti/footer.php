<?php
defined( 'ABSPATH' ) || exit;

$site = conti_site();
$nav  = fn( $key, $label = null ) => sprintf( '<li><a href="%s">%s</a></li>', esc_url( conti_page_url( $key ) ), esc_html( $label ?? conti_t( CONTI_PAGE_NAV[ $key ] ) ) );
?>
</main>
<footer class="site-footer">
	<div class="container">
		<div class="top">
			<div class="brand">
				<p class="wordmark">CONTI</p>
				<p class="tagline"><?php conti_e( conti_t( 'footer.tagline' ) ); ?></p>
				<address>
					<?php conti_e( $site['name'] ); ?><br>
					<?php conti_e( $site['address']['street'] ); ?><br>
					<?php conti_e( "{$site['address']['postalCode']} {$site['address']['city']} ({$site['address']['province']}), {$site['address']['countryName']}" ); ?>
				</address>
				<p class="contacts">
					<a href="<?php echo esc_url( $site['phoneHref'] ); ?>"><?php conti_e( $site['phone'] ); ?></a><br>
					<a href="mailto:<?php echo esc_attr( $site['emails']['general'] ); ?>"><?php conti_e( $site['emails']['general'] ); ?></a>
				</p>
			</div>
			<nav aria-label="<?php echo esc_attr( conti_t( 'nav.products' ) ); ?>">
				<h2><?php conti_e( conti_t( 'nav.products' ) ); ?></h2>
				<ul class="cols">
					<?php foreach ( conti_family_keys() as $key ) : ?>
					<li><a href="<?php echo esc_url( conti_family_url( $key ) ); ?>"><?php conti_e( conti_family_name( $key ) ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</nav>
			<nav aria-label="<?php echo esc_attr( conti_t( 'nav.company' ) ); ?>">
				<h2><?php conti_e( conti_t( 'nav.company' ) ); ?></h2>
				<ul>
					<?php
					echo $nav( 'company', conti_t( 'nav.companyOverview' ) ) . $nav( 'history' ) . $nav( 'production' ) . $nav( 'certifications' ) . $nav( 'environment' ) // phpcs:ignore
						. $nav( 'applications', conti_t( 'nav.industries' ) ) . $nav( 'custom' ) . $nav( 'literature' ) . $nav( 'news' ) . $nav( 'contact' );
					?>
				</ul>
			</nav>
		</div>
		<div class="bottom">
			<p>© <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php conti_e( $site['legalName'] ); ?><?php if ( ! empty( $site['vatNumber'] ) ) : ?> · <?php conti_e( conti_t( 'footer.vat' ) . ' ' . $site['vatNumber'] ); ?><?php endif; ?> · <?php conti_e( conti_t( 'footer.rights' ) ); ?></p>
			<p class="links">
				<a href="<?php echo esc_url( conti_page_url( 'privacy' ) ); ?>"><?php conti_e( conti_t( 'nav.privacy' ) ); ?></a>
				<span class="langs" aria-label="<?php echo esc_attr( conti_t( 'nav.language' ) ); ?>">
					<?php foreach ( conti_alternates() as $a ) : ?>
					<a href="<?php echo esc_url( $a['url'] ); ?>" hreflang="<?php echo esc_attr( $a['lang'] ); ?>" lang="<?php echo esc_attr( $a['lang'] ); ?>" title="<?php echo esc_attr( $a['name'] ); ?>"<?php echo $a['current'] ? ' aria-current="true"' : ''; ?>><?php conti_e( $a['label'] ); ?></a>
					<?php endforeach; ?>
				</span>
			</p>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
