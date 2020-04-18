<?php

// CSS

function hypr_default_styles() {
  $style_css = get_template_directory_uri() . '/style.css';

  $cache_buster = file_exists( $style_css ) ? date( 'YmdHi', filemtime( $style_css ) ) : null;

  wp_enqueue_style( 'parent-style', $style_css, array(), $cache_buster, 'all' );
}
add_action( 'wp_enqueue_scripts', 'hypr_default_styles' );

function hypr_main_styles() {
  $cache_buster = date( 'YmdHi', filemtime( get_stylesheet_directory() . '/build/assets/styles/main.css' ) );

  wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/build/assets/styles/main.css', array(), $cache_buster, 'all' );
}
add_action( 'wp_enqueue_scripts', 'hypr_main_styles', 10000 );

// JS

function hypr_plugins_scripts() {
  $plugins_js = get_stylesheet_directory_uri() . '/build/assets/scripts/vendors~main.js';

  $cache_buster = file_exists( $plugins_js ) ? date( 'YmdHi', filemtime( $plugins_js ) ) : null;

  wp_enqueue_script( 'plugin-scripts', $plugins_js, array( 'jquery' ), $cache_buster, 'all' );
}
add_action( 'wp_enqueue_scripts', 'hypr_plugins_scripts' );

function hypr_main_scripts() {
  $main_js = get_stylesheet_directory_uri() . '/build/assets/scripts/main.js';

  $cache_buster = file_exists( $main_js ) ? date( 'YmdHi', filemtime( $main_js ) ) : null;

  wp_enqueue_script( 'custom-scripts', $main_js, array( 'jquery' ), $cache_buster, 'all' );
}
add_action( 'wp_enqueue_scripts', 'hypr_main_scripts' );
