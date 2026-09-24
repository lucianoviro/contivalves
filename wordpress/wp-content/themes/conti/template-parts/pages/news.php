<?php
defined( 'ABSPATH' ) || exit;
$f    = conti_fields();
$lang = conti_lang();
get_template_part( 'template-parts/page-head', null, array( 'title' => $f['heading'] ?? '' ) );
$fmt = class_exists( 'IntlDateFormatter' ) ? new IntlDateFormatter( $lang, IntlDateFormatter::LONG, IntlDateFormatter::NONE ) : null;
?>
<section class="section">
	<div class="container narrow">
		<?php foreach ( (array) ( $f['items'] ?? array() ) as $i => $n ) : $ts = strtotime( $n['date'] ?? '' ); ?>
		<article class="news" id="news-<?php echo (int) $i + 1; ?>">
			<div class="news__media"><?php echo conti_image( $n['image'] ?? 0, $n['title'] ?? '', 'medium_large', array( 'loading' => 'lazy', 'sizes' => '(min-width: 700px) 260px, 100vw' ) ); // phpcs:ignore ?></div>
			<div>
				<time datetime="<?php echo esc_attr( $n['date'] ?? '' ); ?>" class="small muted"><?php echo esc_html( $ts ? ( $fmt ? $fmt->format( $ts ) : wp_date( 'j F Y', $ts ) ) : '' ); ?></time>
				<h2><?php conti_e( $n['title'] ?? '' ); ?></h2>
				<p><?php conti_e( $n['text'] ?? '' ); ?></p>
			</div>
		</article>
		<?php endforeach; ?>
	</div>
</section>
