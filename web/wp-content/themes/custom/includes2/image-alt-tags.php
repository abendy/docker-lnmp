<?php

function get_image_alt_text( $image_url ) {
  if (! $image_url) {
    return '';
  }

  if ('/' === $image_url[0]) {
    $post_id = attachment_url_to_postid(home_url() . $image_url);
  } else {
    $post_id = attachment_url_to_postid($image_url);
  }

  $alt_text = get_post_meta($post_id, '_wp_attachment_image_alt', true);

  if ( '' === $alt_text ) {
		$alt_text = get_the_title($post_id);
  }

	return $alt_text;
}

function update_module_alt_text( $attrs, $unprocessed_attrs, $slug ) {
	if ( ( 'et_pb_image' === $slug || 'et_pb_fullwidth_image' === $slug ) && '' === $attrs['alt'] ) {
		$attrs['alt'] = get_image_alt_text($attrs['src']);
  } elseif ( 'et_pb_blurb' === $slug && 'off' === $attrs['use_icon'] && '' === $attrs['alt'] ) {
		$attrs['alt'] = get_image_alt_text($attrs['image']);
  } elseif ( 'et_pb_slide' === $slug && '' !== $attrs['image'] && '' === $attrs['image_alt'] ) {
		$attrs['image_alt'] = get_image_alt_text($attrs['image']);
  } elseif ( 'et_pb_fullwidth_header' === $slug ) {
		if ( '' !== $attrs['logo_image_url'] && '' === $attrs['logo_alt_text'] ) {
			$attrs['logo_alt_text'] = get_image_alt_text($attrs['logo_image_url']);
    }
		if ( '' !== $attrs['header_image_url'] && '' === $attrs['image_alt_text'] ) {
			$attrs['image_alt_text'] = get_image_alt_text($attrs['header_image_url']);
    }
	}

	return $attrs;
}

add_filter( 'et_pb_module_shortcode_attributes', 'update_module_alt_text', 20, 3 );
