const path = require('path');
const { NamedModulesPlugin, EnvironmentPlugin, ProgressPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const PROD = process.env.NODE_ENV === 'production';
const filename = `[name]${PROD ? '.[contenthash:8]' : ''}.js`;
const resolve = (...pathSegments) => path.resolve(__dirname, ...pathSegments);

module.exports = {
  // build mode
  mode: PROD ? 'production' : 'development',

  // base resolution path for files
  context: __dirname,

  // sourcemaps
  devtool: PROD ? 'none' : 'cheap-module-eval-source-map',

  // server
  devServer: {
    contentBase: resolve('dist'),
    publicPath: '/',
    stats: 'minimal',
    port: 3000,
    hot: true,
    writeToDisk: true
  },

  // entry point
  entry: {
    promisePolyfill: 'core-js/features/promise',
    bootstrap: resolve('src/bootstrap.js'),
  },

  // output config
  output: {
    // base directory for output
    path: resolve('dist'),
    publicPath: '/',
    // filenames use content based hashing
    filename,
    chunkFilename: filename
  },

  resolve: {

  },

  // build rules
  module: {
    rules: [
      // CSS
      {
        test: /\.scss$/,
        use: [
          PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // images
    ]
  },

  plugins: [
    // environment variables (available in code)
    // this plugin will provide the actual values defined in the build environment
    // configuration below is to set default values
    new EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),

    // clean up dist/ before (and during) build
    new CleanWebpackPlugin(),

    // copy static assets - fonts, images, etc.
    new CopyWebpackPlugin(
      [
        {
          from: resolve('src/assets/'),
          to: resolve('dist/')
        }
      ],
      {
        cache: true
      }
    ),

    // asset manifest
    // for builds that don't rely on webpack generated html,
    // you should generate a manifest of hashed filenames
    new ManifestPlugin({ writeToFileEmit: true }),

    // base HTML file
    // will be compiled with handlebars
    // variables can be passed with the options
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      chunks: ['bootstrap']
    }),

    // this is an extension of the html plugin and will enhance script loading
    new ScriptExtHtmlWebpackPlugin({
      // defer all scripts
      defer: /\.js$/,
      // add <link rel="preload"> to the document head for critical scripts
      preload: {
        test: /^main.*\.js$/,
        chunks: 'all'
      }
    }),

    // extract CSS to separate file in production
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.[contenthash:8].css',
      chunkFilename: '[id].css'
    }),

    // make the cli output nicer
    new ProgressPlugin({
      activeModules: false,
      modules: false,
      entries: true
    }),
    new NamedModulesPlugin(),

    // cache builds for much dev speed
    new HardSourceWebpackPlugin(),

    // analyze build
    // https://www.npmjs.com/package/webpack-bundle-analyzer
    // use this to inspect bundle contents and identify duplicate or extraneous code
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      defaultSizes: 'gzip',
      openAnalyzer: false
    })
  ]
};
