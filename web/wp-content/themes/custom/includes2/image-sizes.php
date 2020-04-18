<?php

// Add custom image sizes

function hypr_setup_image_sizes() {
  // Resources, Blog, Press
  add_image_size( 'hypr_blog_desktop', 260, 146, true );
  add_image_size( 'hypr_blog_tablet', 350, 196, true );

  function hypr_blog_images( $sizes ) {
    return array_merge(
      $sizes,
      array(
        'hypr_blog_desktop' => __( 'Blog Image (Desktop)' ),
        'hypr_blog_tablet' => __( 'Blog Image (Tablet)' ),
      )
    );
  }
  add_filter( 'image_size_names_choose', 'hypr_blog_images' );
}
add_action( 'after_setup_theme', 'hypr_setup_image_sizes' );
