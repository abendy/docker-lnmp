<?php

// Security Encyclopedia

// Creating the widget
class Hypr_Security_Encyclopedia_Widget extends WP_Widget {
  public function __construct() {
    parent::__construct(
      'hypr_security_encyclopedia_widget',
      __( 'Security Encyclopedia Widget', 'hypr_domain' ),
      array( 'description' => __( 'Security Encyclopedia Wiki widget', 'hypr_domain' ) )
    );
  }

	public function taxonomy_query() {
		// Prepare the category cloud query
		global $wpdb;

		$sql = <<<SQL
  SELECT t.name AS name, t.slug AS slug, t.term_id AS term_id, COUNT(p.ID) AS count
  FROM wp_terms t
  INNER JOIN wp_term_taxonomy tt ON t.term_id = tt.term_taxonomy_id
  INNER JOIN wp_term_relationships tr ON tt.term_taxonomy_id = tr.term_taxonomy_id
  LEFT OUTER JOIN wp_posts p ON tr.object_id = p.ID
  WHERE p.post_type = 'page'
  AND tt.taxonomy = 'category'
  AND tt.parent = 576
  GROUP BY t.term_id
  ORDER BY t.name
SQL;

		return $wpdb->get_results( $sql ); // WPCS: unprepared SQL OK.
	}

	public function content_query( $tid ) {
		// Prepare the content query
		global $wpdb;

		$sql = <<<SQL
  SELECT p.ID, p.post_title
  FROM wp_posts p
  INNER JOIN wp_term_relationships tr ON p.ID = tr.object_id
  INNER JOIN wp_terms t ON tr.term_taxonomy_id = t.term_id
  WHERE (p.post_status = 'publish' OR p.post_status = 'private')
  AND p.post_type = 'page'
  AND t.term_id = $tid
  ORDER BY p.post_title
SQL;

		return $wpdb->get_results( $sql ); // WPCS: unprepared SQL OK.
	}

	public function widget( $args, $instance ) {
		$title = isset( $instance['title'] ) ? apply_filters( 'widget_title', $instance['title'] ) : '';

		echo $args['before_widget']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		if ( ! empty( $title ) ) {
			echo esc_html( $args['before_title'] ) . esc_html( $title ) . esc_html( $args['after_title'] );
		}

		// Run the category cloud query
    $taxonomy_results = self::taxonomy_query();

    $sorted = array();
		foreach ( $taxonomy_results as $termObj ) {
      $sorted[ $termObj->name ] = $termObj;
    }

    asort( $sorted );

    echo '<div>';
    echo "<a class='et_pb_button et_pb_bg_layout_dark' href='/security-encyclopedia'>Explore Encyclopedia</a>";
    echo '</div>';

		foreach ( $sorted as $term ) {
			echo "<div data-tid='" . esc_attr( $term->term_id ) . "'>";

			echo "<span class='header'>";
			echo esc_html( $term->name );
			echo ' (' . esc_attr( $term->count ) . ')';
			// echo "<span class='caret'></span>";
			echo '</span>'; // end .header

			echo "<div class='content'><ul>";

			$content_results = self::content_query( $term->term_id );

			foreach ( $content_results as $post ) {
				echo '<li>';
				echo "<a href='" . esc_url( get_permalink( $post->ID ) ) . "'>" . esc_html( get_the_title( $post->ID ) ) . '</a>';
				echo '</li>';
			}

			echo '</ul></div>';
			echo '</div>'; // end div[data-tid]
		}

		echo $args['after_widget']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

// Register and load the widget
function hypr_load_security_encyclopedia_widget() {
	register_widget( 'Hypr_Security_Encyclopedia_Widget' );
}
add_action( 'widgets_init', 'hypr_load_security_encyclopedia_widget' );
