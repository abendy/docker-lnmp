<?php
/**
 * Fires after the main content, before the footer is output.
 *
 * @since 3.10
 */
do_action( 'et_after_main_content' );

if ( 'on' === et_get_option( 'divi_back_to_top', 'false' ) ) : ?>

	<span class="et_pb_scroll_top et-pb-icon"></span>

	<?php
endif;

if ( ! is_page_template( 'page-template-blank.php' ) ) :
	?>

			<footer id="main-footer">
				<?php get_sidebar( 'footer' ); ?>


		<?php
		if ( has_nav_menu( 'footer-menu' ) ) :
			?>

				<div id="et-footer-nav">
					<div class="container">
						<?php
						wp_nav_menu(
							array(
								'theme_location' => 'footer-menu',
								'depth'          => '1',
								'menu_class'     => 'bottom-nav',
								'container'      => '',
								'fallback_cb'    => '',
							)
						);
						?>
					</div>
				</div> <!-- #et-footer-nav -->

			<?php endif; ?>

				<div id="footer-bottom">
					<div class="container clearfix">
				<?php
				if ( false !== et_get_option( 'show_footer_social_icons', true ) ) {
					get_template_part( 'includes/social_icons', 'footer' );
				}

					// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
					echo et_core_fix_unclosed_html_tags( et_core_esc_previously( et_get_footer_credits() ) );
					// phpcs:enable
				?>
					</div>	<!-- .container -->
				</div>
			</footer> <!-- #main-footer -->
		</div> <!-- #et-main-area -->

<?php endif; // ! is_page_template( 'page-template-blank.php' ) ?>

	</div> <!-- #page-container -->

	<?php wp_footer(); ?>
	<div id="fb-root"></div>





<!-- Start of Async HubSpot Analytics Code -->
  <script type="text/javascript">
	(function(d,s,i,r) {
	  if (d.getElementById(i)){return;}
	  var n=d.createElement(s),e=d.getElementsByTagName(s)[0];
	  n.id=i;n.src='//js.hs-analytics.net/analytics/'+(Math.ceil(new Date()/r)*r)+'/2670073.js';
	  e.parentNode.insertBefore(n, e);
	})(document,"script","hs-analytics",300000);
  </script>
<!-- End of Async HubSpot Analytics Code -->


<!-- LinkedIn Insights -->
<script type="text/javascript">
  _linkedin_partner_id = "153876";
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>

<script type="text/javascript">
  (function(){var s = document.getElementsByTagName("script")[0];
  var b = document.createElement("script");
  b.type = "text/javascript";b.async = true;
  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  s.parentNode.insertBefore(b, s);})();
</script>

<noscript>
  <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=153876&fmt=gif" />
</noscript>
<!-- LinkedIn Insights -->


<!--Gtag--->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-54477269-1', 'auto');	
  ga('send', 'pageview');

</script>
<!--End Gtag--->


<!--- Pathfactory --->
<script type="text/javascript">
	(function(j,u,k,e,b,o,x){j[b]=j[b]||function(){
	(j[b].q=j[b].q||[]).push(arguments)},j[b].l=1*new Date();o=u.createElement(k),
	x=u.getElementsByTagName(k)[0];o.async=1;o.src=e;x.parentNode.insertBefore(o,x)
	})(window,document,'script','https://app.cdn.lookbookhq.com/production/jukebox/current/jukebox.js','lbhq');
	  lbhq('create', 'LB-2E7F5CD9-10551');
	  
  </script>
<!-- End Pathfactory -->

</body>
</html>
