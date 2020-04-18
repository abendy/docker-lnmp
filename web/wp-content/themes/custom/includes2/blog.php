<?php

// Prepends sticky posts to the queried output for the blog page

add_action( 'pre_get_posts', function ( $q ) {
  remove_action( current_action(), __FUNCTION__ );

  if (true !== $q->get('wpse_is_home')) {
    return;
  }

  // Set is_home to true
  $q->is_home = true;
});
