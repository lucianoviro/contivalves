<?php
/**
 * Settings → Conti: company data used in footer, contact page and schema.org.
 */

defined( 'ABSPATH' ) || exit;

const CONTI_SITE_FIELDS = array(
	'legalName'           => 'Ragione sociale',
	'vatNumber'           => 'Partita IVA',
	'phone'               => 'Telefono (visualizzato)',
	'phoneHref'           => 'Telefono (link, es. tel:+390163487704)',
	'emails.general'      => 'Email generale',
	'emails.sales'        => 'Email ufficio commerciale',
	'emails.technical'    => 'Email ufficio tecnico',
	'emails.accounting'   => 'Email amministrazione e spedizioni',
	'address.street'      => 'Indirizzo',
	'address.postalCode'  => 'CAP',
	'address.city'        => 'Città',
	'address.province'    => 'Provincia',
	'mapsUrl'             => 'Link Google Maps',
	'youtubeVideo'        => 'ID video YouTube (pagina Produzione)',
	'sameAs'              => 'Profili online (LinkedIn, YouTube…), uno per riga',
);

add_action(
	'admin_menu',
	function () {
		add_options_page( 'Conti – dati aziendali', 'Conti', 'manage_options', 'conti-settings', 'conti_settings_page' );
	}
);

function conti_array_get( array $a, string $path ) {
	foreach ( explode( '.', $path ) as $k ) {
		if ( ! is_array( $a ) || ! array_key_exists( $k, $a ) ) {
			return '';
		}
		$a = $a[ $k ];
	}
	return $a;
}

function conti_settings_page(): void {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	if ( isset( $_POST['conti_site'] ) && check_admin_referer( 'conti_settings' ) ) {
		$in   = wp_unslash( $_POST['conti_site'] );
		$save = array();
		foreach ( CONTI_SITE_FIELDS as $path => $label ) {
			$value = (string) ( $in[ $path ] ?? '' );
			if ( 'sameAs' === $path ) {
				$value = array_values( array_filter( array_map( 'esc_url_raw', array_map( 'trim', explode( "\n", $value ) ) ) ) );
			} else {
				$value = sanitize_text_field( $value );
			}
			$ref  = &$save;
			$keys = explode( '.', $path );
			foreach ( $keys as $i => $k ) {
				if ( $i === count( $keys ) - 1 ) {
					$ref[ $k ] = $value;
				} else {
					$ref[ $k ] = $ref[ $k ] ?? array();
					$ref       = &$ref[ $k ];
				}
			}
			unset( $ref );
		}
		update_option( 'conti_site', $save );
		echo '<div class="notice notice-success"><p>Dati salvati.</p></div>';
	}
	$site = array_replace_recursive( conti_data( 'site' ), (array) get_option( 'conti_site', array() ) );
	?>
	<div class="wrap">
		<h1>Conti – dati aziendali</h1>
		<p>Usati nel footer, nella pagina contatti e nei dati strutturati per Google e gli assistenti AI. La <strong>Partita IVA</strong> è obbligatoria sul sito di un’azienda italiana.</p>
		<form method="post">
			<?php wp_nonce_field( 'conti_settings' ); ?>
			<table class="form-table">
				<?php foreach ( CONTI_SITE_FIELDS as $path => $label ) : $value = conti_array_get( $site, $path ); ?>
				<tr>
					<th><label for="cs-<?php echo esc_attr( $path ); ?>"><?php echo esc_html( $label ); ?></label></th>
					<td>
						<?php if ( 'sameAs' === $path ) : ?>
							<textarea id="cs-<?php echo esc_attr( $path ); ?>" name="conti_site[<?php echo esc_attr( $path ); ?>]" rows="4" class="large-text"><?php echo esc_textarea( implode( "\n", (array) $value ) ); ?></textarea>
						<?php else : ?>
							<input id="cs-<?php echo esc_attr( $path ); ?>" name="conti_site[<?php echo esc_attr( $path ); ?>]" type="text" class="regular-text" value="<?php echo esc_attr( (string) $value ); ?>">
						<?php endif; ?>
					</td>
				</tr>
				<?php endforeach; ?>
			</table>
			<?php submit_button( 'Salva' ); ?>
		</form>
	</div>
	<?php
}
