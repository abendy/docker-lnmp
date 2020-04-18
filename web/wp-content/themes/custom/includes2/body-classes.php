<?php

function my_body_class_filter( $classes ) {
  global $post;

  if ( $post ) {
    $classes[] = 'page-' . $post->post_name;
  }

  return $classes;
}

add_filter( 'body_class', 'my_body_class_filter' );
