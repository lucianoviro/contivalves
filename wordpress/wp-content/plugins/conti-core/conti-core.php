<?php
/**
 * Plugin Name:       Conti Core
 * Description:       Catalogo prodotti, blocchi "Conti" per l'editor, pagine multilingua, SEO/GEO (schema.org, sitemap con hreflang, llms.txt), redirect dal vecchio sito e importatore dei contenuti per contivalves.com. Richiede Polylang.
 * Version:           1.1.1
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:            Conti Rubinetterie
 * Text Domain:       conti
 */

defined( 'ABSPATH' ) || exit;

define( 'CONTI_CORE_VERSION', '1.1.1' );
define( 'CONTI_CORE_DIR', __DIR__ );
define( 'CONTI_CORE_URL', plugin_dir_url( __FILE__ ) );

require_once __DIR__ . '/inc/helpers.php';
require_once __DIR__ . '/inc/model.php';
require_once __DIR__ . '/inc/catalog.php';
require_once __DIR__ . '/inc/routing.php';
require_once __DIR__ . '/inc/seo.php';
require_once __DIR__ . '/inc/feeds.php';
require_once __DIR__ . '/inc/redirects.php';
require_once __DIR__ . '/inc/blocks.php';

if ( is_admin() ) {
	require_once __DIR__ . '/inc/admin-fields.php';
	require_once __DIR__ . '/inc/admin-settings.php';
}
require_once __DIR__ . '/inc/importer.php';

register_activation_hook( __FILE__, function () {
	conti_register_model();
	flush_rewrite_rules();
} );
