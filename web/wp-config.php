<?php
/*
 * Don't show deprecations
 */
error_reporting( E_ALL ^ E_DEPRECATED );

/**
 * Set root path
 */
$rootPath = realpath( __DIR__ . '/..' );

/**
 * Include the Composer autoload
 */
require_once( $rootPath . '/vendor/autoload.php' );

/*
 * Fetch .env
 */
if ( ! isset( $_ENV['PANTHEON_ENVIRONMENT'] ) && file_exists( $rootPath . '/.env' ) ) {
	$dotenv = Dotenv\Dotenv::create($rootPath);
	$dotenv->load();
	$dotenv->required( array(
		'DB_NAME',
		'DB_USER',
		'DB_HOST',
	) )->notEmpty();
}

/**
 * Disallow on server file edits
 */
define( 'DISALLOW_FILE_EDIT', true );
define( 'DISALLOW_FILE_MODS', true );

/**
 * Force SSL
 */
define( 'FORCE_SSL_ADMIN', true );

/**
 * Limit post revisions
 */
define( 'WP_POST_REVISIONS', 3 );

/*
 * If NOT on Pantheon
 */
if ( ! isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ):
	/**
	 * Define site and home URLs
	 */
	// HTTP is still the default scheme for now.
	$scheme = 'http';
	// If we have detected that the end use is HTTPS, make sure we pass that
	// through here, so <img> tags and the like don't generate mixed-mode
	// content warnings.
	if ( isset( $_SERVER['HTTP_USER_AGENT_HTTPS'] ) && $_SERVER['HTTP_USER_AGENT_HTTPS'] == 'ON' ) {
		$scheme = 'https';
	}
	$site_url = getenv( 'WP_HOME' ) !== false ? getenv( 'WP_HOME' ) : $scheme . '://' . $_SERVER['HTTP_HOST'] . '/';
	define( 'WP_HOME', $site_url );
	define( 'WP_SITEURL', $site_url . '/wp/' );

	/**
	 * Set Database Details
	 */
	define( 'DB_NAME', getenv( 'DB_NAME' ) );
	define( 'DB_USER', getenv( 'DB_USER' ) );
	define( 'DB_PASSWORD', getenv( 'DB_PASSWORD' ) !== false ? getenv( 'DB_PASSWORD' ) : '' );
	define( 'DB_HOST', getenv( 'DB_HOST' ) );
	define( 'DB_CHARSET', getenv( 'DB_CHARSET' ) );

  /**
   * Set Redis cache details
   */
  define( 'CACHE_HOST', getenv( 'REDIS_HOST' ) );
  define( 'CACHE_PORT', getenv( 'REDIS_PORT' ) );
  define( 'CACHE_PASSWORD', getenv( 'REDIS_PASSWORD' ) );

	/**
	 * Set debug modes
	 */
	// Enable debug mode
	define( 'WP_DEBUG', getenv( 'WP_DEBUG' ) === 'true' ? true : false );

	// Enable debug logging
	define( 'WP_DEBUG_LOG', getenv( 'WP_DEBUG_LOG' ) === 'true' ? '../logs/wp/debug.log' : false );

	// Disable display of errors and warnings
	define( 'WP_DEBUG_DISPLAY', getenv( 'WP_DEBUG_DISPLAY' ) === 'true' ? true : false );
	ini_set( 'display_errors', getenv( 'WP_DEBUG_DISPLAY' ) === 'true' ? 1 : 0 );

	define( 'WP_DISABLE_FATAL_ERROR_HANDLER', getenv( 'WP_DISABLE_FATAL_ERROR_HANDLER' ) === 'true' ? true : false );
	define( 'SAVEQUERIES', getenv( 'SAVEQUERIES' ) === 'true' ? true : false );

	define( 'AUTOMATIC_UPDATER_DISABLED', true );
	define( 'DISABLE_WP_CRON', true );
	define( 'SCRIPT_DEBUG', true );

	/**#@+
	 * Authentication Unique Keys and Salts.
	 *
	 * Change these to different unique phrases!
	 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
	 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
	 *
	 * @since 2.6.0
	 */
	define( 'AUTH_KEY', getenv('AUTH_KEY') );
	define( 'SECURE_AUTH_KEY', getenv('SECURE_AUTH_KEY') );
	define( 'LOGGED_IN_KEY', getenv('LOGGED_IN_KEY') );
	define( 'NONCE_KEY', getenv('NONCE_KEY') );
	define( 'AUTH_SALT', getenv('AUTH_SALT') );
	define( 'SECURE_AUTH_SALT', getenv('SECURE_AUTH_SALT') );
	define( 'LOGGED_IN_SALT', getenv('LOGGED_IN_SALT') );
	define( 'NONCE_SALT', getenv('NONCE_SALT') );

endif;

/*
 * If on Pantheon
 */
if ( isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ):

  // Ensure the site is being served from the primary domain.
  // and securely with HTTPS!
  // https://pantheon.io/docs/redirects#redirect-with-php
  if ( 'cli' !== php_sapi_name() ) {

    if ( 'dev' === $_ENV['PANTHEON_ENVIRONMENT'] ) {
      $primary_domain = getenv( 'DEV_URL' );
    }

    if ( 'test' === $_ENV['PANTHEON_ENVIRONMENT'] ) {
      $primary_domain = getenv( 'TEST_URL' );
    }

    if ( 'live' === $_ENV['PANTHEON_ENVIRONMENT'] ) {
      $primary_domain = getenv( 'PROD_URL' );
    }

    if ( ! empty( $primary_domain ) && $primary_domain !== $_SERVER['HTTP_HOST'] ) {
      // Name transaction "redirect" in New Relic for improved reporting (optional).
      if ( extension_loaded( 'newrelic' ) ) {
        newrelic_name_transaction( 'redirect' );
      }

      $request_uri = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '';
      header( 'HTTP/1.0 301 Moved Permanently' );
      header( 'Location: https://' . $primary_domain . $request_uri );
      exit();
    }
  }

	// ** MySQL settings - included in the Pantheon Environment ** //
	/** The name of the database for WordPress */
	define( 'DB_NAME', $_ENV['DB_NAME'] );

	/** MySQL database username */
	define( 'DB_USER', $_ENV['DB_USER'] );

	/** MySQL database password */
	define( 'DB_PASSWORD', $_ENV['DB_PASSWORD'] );

	/** MySQL hostname; on Pantheon this includes a specific port number. */
	define( 'DB_HOST', $_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT'] );

	/** Database Charset to use in creating database tables. */
	define( 'DB_CHARSET', 'utf8' );

	/** The Database Collate type. Don't change this if in doubt. */
	define( 'DB_COLLATE', '' );

	/**#@+
	 * Authentication Unique Keys and Salts.
	 *
	 * Change these to different unique phrases!
	 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
	 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
	 *
	 * Pantheon sets these values for you also. If you want to shuffle them you
	 * can do so via your dashboard.
	 *
	 * @since 2.6.0
	 */
	define( 'AUTH_KEY', $_ENV['AUTH_KEY'] );
	define( 'SECURE_AUTH_KEY', $_ENV['SECURE_AUTH_KEY'] );
	define( 'LOGGED_IN_KEY', $_ENV['LOGGED_IN_KEY'] );
	define( 'NONCE_KEY', $_ENV['NONCE_KEY'] );
	define( 'AUTH_SALT', $_ENV['AUTH_SALT'] );
	define( 'SECURE_AUTH_SALT', $_ENV['SECURE_AUTH_SALT'] );
	define( 'LOGGED_IN_SALT', $_ENV['LOGGED_IN_SALT'] );
	define( 'NONCE_SALT', $_ENV['NONCE_SALT'] );
	/**#@-*/

	/** A couple extra tweaks to help things run well on Pantheon. **/
	if ( isset( $_SERVER['HTTP_HOST'] ) ) {
		// HTTP is still the default scheme for now.
		$scheme = 'http';
		// If we have detected that the end use is HTTPS, make sure we pass that
		// through here, so <img> tags and the like don't generate mixed-mode
		// content warnings.
		if ( isset( $_SERVER['HTTP_USER_AGENT_HTTPS'] ) && $_SERVER['HTTP_USER_AGENT_HTTPS'] == 'ON' ) {
			$scheme = 'https';
		}
		define( 'WP_HOME', $scheme . '://' . $_SERVER['HTTP_HOST'] );
		define( 'WP_SITEURL', $scheme . '://' . $_SERVER['HTTP_HOST'] . '/wp' );
	}

	// Don't show deprecations; useful under PHP 5.5
	error_reporting( E_ALL ^ E_DEPRECATED );
	// Force the use of a safe temp directory when in a container
	if ( defined( 'PANTHEON_BINDING' ) ):
		define( 'WP_TEMP_DIR', sprintf( '/srv/bindings/%s/tmp', PANTHEON_BINDING ) );
	endif;

	// FS writes aren't permitted in test or live, so we should let WordPress know to disable relevant UI
	if ( in_array( $_ENV['PANTHEON_ENVIRONMENT'], array( 'test', 'live' ) ) && ! defined( 'DISALLOW_FILE_MODS' ) ) :
		define( 'DISALLOW_FILE_MODS', true );
	endif;

endif;

/*
 * Define wp-content directory outside of WordPress core directory
 */
define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/wp-content' );
define( 'WP_CONTENT_URL', WP_HOME . '/wp-content' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = getenv( 'DB_PREFIX' ) !== false ? getenv( 'DB_PREFIX' ) : 'wp_';

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}
/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
