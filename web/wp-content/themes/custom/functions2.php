<?php

/**
 * @author Divi Space
 * @copyright 2017
 */

if ( ! defined( 'ABSPATH' ) ) {
  die();
}

// Enqueue Scripts
require_once 'includes/enqueue-scripts.php';

// Image sizes
require_once 'includes/image-sizes.php';

// Use Media lib alt tags in Divi modules
require_once 'includes/image-alt-tags.php';

// Attachment pages
require_once 'includes/attachment-pages.php';

// Login editor
require_once 'includes/login-editor.php';

// Body classes
require_once 'includes/body-classes.php';

// Remove rel=noindex from paginated pages
require_once 'includes/rel-noindex.php';

// Custom Post Types
require_once 'includes/custom-post-types.php';

// Force WordPress to use GD Library instead of Imagick
require_once 'includes/gd-library.php';

// Analytics Events
require_once 'includes/analytics-events.php';

// Disable oEmbed
require_once 'includes/disable-oembed.php';

// Blog
require_once 'includes/blog.php';

// Security Encyclopedia
require_once 'includes/class-hypr-security-encyclopedia-widget.php';
require_once 'includes/class-hypr-related-terms-widget.php';
