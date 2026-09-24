<?php
defined( 'ABSPATH' ) || exit;
$f    = conti_fields();
$site = conti_site();
get_template_part( 'template-parts/page-head', null, array( 'title' => $f['heading'] ?? '', 'lead' => $f['lead'] ?? '' ) );
$depts = array(
	array( conti_t( 'contact.sales' ), $site['emails']['sales'] ),
	array( conti_t( 'contact.technical' ), $site['emails']['technical'] ),
	array( conti_t( 'contact.accounting' ), $site['emails']['accounting'] ),
	array( conti_t( 'contact.general' ), $site['emails']['general'] ),
);
?>
<section class="section">
	<div class="container contact">
		<div>
			<h2><?php conti_e( $f['departments'] ?? '' ); ?></h2>
			<ul class="depts">
				<?php foreach ( $depts as [ $label, $email ] ) : ?><li><span class="muted small"><?php conti_e( $label ); ?></span><a href="mailto:<?php echo esc_attr( $email ); ?>"><?php conti_e( $email ); ?></a></li><?php endforeach; ?>
				<li><span class="muted small"><?php conti_e( conti_t( 'contact.phone' ) ); ?></span><a href="<?php echo esc_url( $site['phoneHref'] ); ?>"><?php conti_e( $site['phone'] ); ?></a></li>
			</ul>
		</div>
		<div class="visit">
			<h2><?php conti_e( $f['visit'] ?? '' ); ?></h2>
			<address>
				<strong><?php conti_e( $site['name'] ); ?></strong><br>
				<?php conti_e( $site['address']['street'] ); ?><br>
				<?php conti_e( "{$site['address']['postalCode']} {$site['address']['city']} ({$site['address']['province']})" ); ?><br>
				<?php conti_e( "{$site['address']['region']}, {$site['address']['countryName']}" ); ?>
			</address>
			<a class="btn btn--primary" href="<?php echo esc_url( $site['mapsUrl'] ); ?>" target="_blank" rel="noopener"><?php conti_e( conti_t( 'contact.map' ) ); ?></a>
		</div>
	</div>
</section>
