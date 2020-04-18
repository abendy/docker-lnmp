<?php

// Analytics Events

if ( function_exists( 'acf_add_local_field_group' ) ) :

  acf_add_local_field_group(
    array(
      'key'                   => 'group_5db33a8c32037',
      'title'                 => 'Menu fields',
      'fields'                => array(
        array(
          'key'               => 'field_5db33ad1e54a2',
          'label'             => 'Analytics',
          'name'              => 'event_listener',
          'type'              => 'checkbox',
          'instructions'      => '',
          'required'          => 0,
          'conditional_logic' => 0,
          'wrapper'           => array(
            'width' => '',
            'class' => '',
            'id'    => '',
          ),
          'choices'           => array(
            'on' => 'Track clicks on this menu item in Google Analytics\' Event Measurement',
          ),
          'allow_custom'      => 0,
          'default_value'     => array(),
          'layout'            => 'vertical',
          'toggle'            => 0,
          'return_format'     => 'value',
          'save_custom'       => 0,
        ),
      ),
      'location'              => array(
        array(
          array(
            'param'    => 'nav_menu_item',
            'operator' => '==',
            'value'    => 'all',
          ),
        ),
      ),
      'menu_order'            => 0,
      'position'              => 'normal',
      'style'                 => 'default',
      'label_placement'       => 'top',
      'instruction_placement' => 'label',
      'hide_on_screen'        => '',
      'active'                => true,
      'description'           => '',
    )
  );

endif;

add_filter( 'nav_menu_link_attributes', 'hypr_nav_menu_link_attributes', 10, 3 );

function hypr_nav_menu_link_attributes( $atts, $item, $args ) {
  $eventListener = get_field( 'event_listener', $item );

  if ( $eventListener ) {
    $atts['data-event-listener'] = $eventListener[0];
  }

  return $atts;
}
