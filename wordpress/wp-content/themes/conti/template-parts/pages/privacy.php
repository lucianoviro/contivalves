<?php
defined( 'ABSPATH' ) || exit;
$f    = conti_fields();
$ts   = strtotime( $f['updatedDate'] ?? '' );
$date = $ts ? ( class_exists( 'IntlDateFormatter' ) ? ( new IntlDateFormatter( conti_lang(), IntlDateFormatter::LONG, IntlDateFormatter::NONE ) )->format( $ts ) : wp_date( 'j F Y', $ts ) ) : '';
get_template_part( 'template-parts/page-head', null, array( 'title' => $f['heading'] ?? '', 'lead' => trim( ( $f['updated'] ?? '' ) . ': ' . $date, ': ' ) ) );
?>
<section class="section">
	<div class="container prose">
		<?php foreach ( (array) ( $f['sections'] ?? array() ) as $s ) : ?>
		<h2><?php conti_e( $s['h'] ?? '' ); ?></h2>
		<?php foreach ( (array) ( $s['p'] ?? array() ) as $p ) : ?><p><?php conti_e( $p ); ?></p><?php endforeach; ?>
		<?php endforeach; ?>
	</div>
</section>
