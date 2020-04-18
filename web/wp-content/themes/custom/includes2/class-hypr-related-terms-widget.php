<?php

// Security Encyclopedia Related Terms

// Creating the widget
class Hypr_Related_Terms_Widget extends WP_Widget {
  public function __construct() {
    parent::__construct(
      'hypr_related_terms_widget',
      __( 'Related Terms Widget', 'hypr_domain' ),
      array( 'description' => __( 'Security Encyclopedia Related Terms widget', 'hypr_domain' ) )
    );
  }

	public function taxonomy_query( $id ) {
		// Prepare the content query
		global $wpdb;

		$sql = <<<SQL
  SELECT t.name AS name, t.slug AS slug, t.term_id AS term_id
  FROM wp_terms t
  INNER JOIN wp_term_taxonomy tt ON t.term_id = tt.term_taxonomy_id
  INNER JOIN wp_term_relationships tr ON tt.term_taxonomy_id = tr.term_taxonomy_id
  LEFT OUTER JOIN wp_posts p ON tr.object_id = p.ID
  WHERE p.ID = $id
  AND tt.taxonomy = 'post_tag'
  GROUP BY t.term_id
  ORDER BY t.name
SQL;

		return $wpdb->get_results( $sql ); // WPCS: unprepared SQL OK.
	}

	public function widget( $args, $instance ) {
		$title = isset( $instance['title'] ) ? apply_filters( 'widget_title', $instance['title'] ) : '';

		echo $args['before_widget']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		if ( ! empty( $title ) ) {
			echo esc_html( $args['before_title'] ) . esc_html( $title ) . esc_html( $args['after_title'] );
		}

    // Run the related terms query
    $id = get_the_ID();
    $terms = self::taxonomy_query( $id );

    echo '<div id="related-terms">';
    if (count($terms)) {
      echo '<h3>Related Terms</h3>';
    }
    echo '<p>';

		foreach ( $terms as $term ) {
      echo '<span>' . esc_html( $term->name ) . '</span>,&nbsp;';
    }

    echo '</p></div>'; // end #related-terms

		echo $args['after_widget']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

// Register and load the widget
function hypr_load_related_terms_widget() {
	register_widget( 'Hypr_Related_Terms_Widget' );
}
add_action( 'widgets_init', 'hypr_load_related_terms_widget' );
