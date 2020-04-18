<?php

function myprefix_redirect_attachment_page() {
  if ( is_attachment() ) {
    global $post;
    if ( $post && $post->post_parent ) {
      wp_redirect( esc_url( get_permalink( $post->post_parent ) ), 301 );
      exit;
    } else {
      wp_redirect( esc_url( home_url( '/' ) ), 301 );
      exit;
    }
  }
}
add_action( 'template_redirect', 'myprefix_redirect_attachment_page' );

function attachmentpages_noindex() {
  if ( is_attachment() ) {
    echo '<meta name="robots" content="noindex" />';
  }

  if ( get_post_type() == 'divi_overlay' ) {
    echo '<meta name="robots" content="noindex" />';
    wp_redirect( esc_url( home_url( '/' ) ), 301 );
  }
}
add_action( 'wp_head', 'attachmentpages_noindex' );
