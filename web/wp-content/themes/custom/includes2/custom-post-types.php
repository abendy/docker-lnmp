<?php

function register_post_types() {
  // Press type
  $labels = array(
    'name'                  => _x( 'Press', 'Post Type General Name', 'text_domain' ),
    'singular_name'         => _x( 'Press', 'Post Type Singular Name', 'text_domain' ),
    'menu_name'             => __( 'Press', 'text_domain' ),
    'name_admin_bar'        => __( 'Press', 'text_domain' ),
    'archives'              => __( 'Item Archives', 'text_domain' ),
    'attributes'            => __( 'Item Attributes', 'text_domain' ),
    'parent_item_colon'     => __( 'Parent Item:', 'text_domain' ),
    'all_items'             => __( 'All Items', 'text_domain' ),
    'add_new_item'          => __( 'Add New Item', 'text_domain' ),
    'add_new'               => __( 'Add New', 'text_domain' ),
    'new_item'              => __( 'New Item', 'text_domain' ),
    'edit_item'             => __( 'Edit Item', 'text_domain' ),
    'update_item'           => __( 'Update Item', 'text_domain' ),
    'view_item'             => __( 'View Item', 'text_domain' ),
    'view_items'            => __( 'View Items', 'text_domain' ),
    'search_items'          => __( 'Search Item', 'text_domain' ),
    'not_found'             => __( 'Not found', 'text_domain' ),
    'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
    'featured_image'        => __( 'Featured Image', 'text_domain' ),
    'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
    'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
    'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
    'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
    'uploaded_to_this_item' => __( 'Uploaded to this item', 'text_domain' ),
    'items_list'            => __( 'Items list', 'text_domain' ),
    'items_list_navigation' => __( 'Items list navigation', 'text_domain' ),
    'filter_items_list'     => __( 'Filter items list', 'text_domain' ),
  );

  $args = array(
    'label'               => __( 'Press', 'text_domain' ),
    // 'description'           => __( '', 'text_domain' ),
    'labels'              => $labels,
    'supports'            => array( 'title', 'editor', 'author', 'thumbnail', 'revisions' ),
    'taxonomies'          => array( 'category' ),
    'hierarchical'        => false,
    'public'              => false,
    'show_ui'             => true,
    'show_in_menu'        => true,
    'menu_position'       => 53,
    'menu_icon'           => 'dashicons-media-document',
    'show_in_admin_bar'   => true,
    'show_in_nav_menus'   => true,
    'can_export'          => true,
    'has_archive'         => false,
    'exclude_from_search' => false,
    'publicly_queryable'  => false,
    'capability_type'     => 'post',
    'rewrite'             => array( 'slug' => 'press_articles' ),
    'query_var'           => true,
  );
  register_post_type( 'press_articles', $args );

  // Fixes pagination issue when custom post type slug is the same as the page's slug
  // e.g. if we have a /news/ landing page and each news page has a url prefix of /news/...
  add_rewrite_rule(
    '^([^/]+)/page/([^/]+)',
    'index.php?pagename=$matches[1]&paged=$matches[2]',
    'top'
  );
}
add_action( 'init', 'register_post_types', 0 );
