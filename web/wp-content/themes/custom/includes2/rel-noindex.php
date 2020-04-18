<?php

// Remove rel=noindex from paginated pages

function rel_noindex() {
  global $paged;

  $page = $paged || ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : ( ( get_query_var( 'page' ) ) ? get_query_var( 'page' ) : 0 );

  if ( ! isset( $page ) || ! $page ) {
    return;
  }

  $id = get_queried_object_id();

  if ( 0 === $id ) {
    return;
  }

  $url = wp_get_canonical_url( $id );

  if ( ! empty( $url ) ) {
    echo '<link rel="noindex" href="' . esc_url( $url ) . '" />' . "\n";
  }
}
add_action( 'wp_head', 'rel_noindex' );
