<?php

/*
 * Force WordPress to use GD Library instead of Imagick
 * https://pantheon.io/docs/wordpress-known-issues#force-wordpress-to-use-gd-library-instead-of-imagick
 */
function force_use_gdlib( $editors ) {
  $default_editor = 'WP_Image_Editor_GD';
  $editors        = array_diff( $editors, array( $default_editor ) );
  array_unshift( $editors, $default_editor );
  return $editors;
}
add_filter( 'wp_image_editors', 'force_use_gdlib' );
