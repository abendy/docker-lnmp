const webpack = require('webpack');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin-next');

const { MODE = 'development' } = process.env; // defaults to 'development'

const base = {
  entry: {
    main: [
      './web/wp-content/themes/custom/src/styles/main.scss',
      './web/wp-content/themes/custom/src2/scripts/main.js',
    ],
  },
  output: {
    path: path.join(__dirname, './build/assets/scripts/'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: MODE === 'production', // true in production MODE
    minimizer: [
      new TerserJSPlugin({
        test: /\.js$/,
        exclude: /node_modules/,
        sourceMap: MODE === 'development', // true in development MODE
        extractComments: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new WebpackNotifierPlugin({
      alwaysNotify: true,
      excludeWarnings: false,
    }),
    new MiniCssExtractPlugin({
      filename: '../styles/[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: MODE === 'production', // true in production MODE
      debug: MODE === 'development', // true in development MODE
    }),
    new CopyPlugin([
      { from: './src/images', to: '../images' },
    ]),
    new BrowserSyncPlugin({
      host: process.env.WP_HOME, // WP_HOST
      // port: process.env.WP_PORT,
    }),
  ],
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js(x)*$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        'no-debugger': MODE === 'production' ? 2 : 0, // true in production MODE
      },
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          '@babel/preset-env',
        ],
      },
    },
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          '@babel/preset-react',
        ],
      },
    },
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: MODE === 'development', // true in development MODE
          },
        },
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.(png|jp(e*)g|gif)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8000, // Convert images < 8kb to base64 strings
          name: '../images/[name].[ext]',
        },
      }],
    },
    {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: '../fonts/[name].[ext]',
      },
    }],
  },
  node: {
    fs: 'empty', // avoids error messages
  },
};

const development = {
  ...base,
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  module: {
    ...base.module,
  },
  plugins: [
    new CleanTerminalPlugin(),
    ...base.plugins,
    new WebpackShellPlugin({
      onBuildEnd: {
        scripts: ['rsync -r --checksum --size-only ./src/images/. ./build/assets/images/.'],
        blocking: false,
        parallel: true,
      },
    }),
  ],
};

const production = {
  ...base,
  mode: 'production',
  devtool: false,
  module: {
    ...base.module,
  },
  plugins: [
    ...base.plugins,
    new WebpackShellPlugin({
      onBeforeBuild: {
        scripts: ['rm -f ./build/assets/**/*'],
        blocking: true,
      },
    }),
  ],
};

module.exports = (MODE === 'development' ? development : production);
