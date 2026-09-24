<?php
defined( 'ABSPATH' ) || exit;
get_header();
$lang = conti_lang();
?>
<section class="section">
	<div class="container narrow">
		<p class="eyebrow">404</p>
		<h1><?php conti_e( conti_t( 'notFound.title' ) ); ?></h1>
		<p class="lead"><?php conti_e( conti_t( 'notFound.text' ) ); ?></p>
		<div class="btn-row">
			<a class="btn btn--primary" href="<?php echo esc_url( conti_page_url( 'products' ) ); ?>"><?php conti_e( conti_t( 'nav.products' ) ); ?></a>
			<a class="btn btn--ghost" href="<?php echo esc_url( conti_home_url() ); ?>"><?php conti_e( conti_t( 'nav.home' ) ); ?></a>
		</div>
		<ul class="others">
			<?php foreach ( conti_langs() as $l ) : if ( $l === $lang ) { continue; } ?>
			<li lang="<?php echo esc_attr( $l ); ?>"><a href="<?php echo esc_url( conti_home_url( $l ) ); ?>"><?php conti_e( conti_lang_meta( $l, 'name' ) ); ?></a> – <?php conti_e( conti_t( 'notFound.title', $l ) ); ?></li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
<?php
get_footer();
