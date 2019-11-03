const path = require('path');
const { NamedModulesPlugin, EnvironmentPlugin, ProgressPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const PROD = process.env.NODE_ENV === 'production';
const hash = PROD ? '.[contenthash:8]' : '';
const resolve = (...pathSegments) => path.resolve(__dirname, ...pathSegments);

module.exports = {
  // build mode
  mode: PROD ? 'production' : 'development',

  // base resolution path for files
  context: __dirname,

  // sourcemaps
  devtool: PROD ? 'none' : 'source-map',

  // server
  devServer: {
    contentBase: resolve('dist'),
    publicPath: '/',
    stats: 'minimal',
    port: 3000,
    hot: true,
    writeToDisk: true
  },

  // entry points
  entry: {
    promisePolyfill: 'core-js/features/promise',
    bootstrap: resolve('src/js/bootstrap.js'),
    styles: resolve('src/scss/styles.scss')
  },

  // output config
  output: {
    // base directory for output
    path: resolve('dist'),
    publicPath: '/',
    // filenames use content based hashing
    filename: `[name]${hash}.js`,
    chunkFilename: `[name]${hash}.js`,
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
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: { sourceMap: !PROD }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: !PROD }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: !PROD }
          }
        ]
      },
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
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
      chunks: ['bootstrap', 'styles'],
      excludeAssets: [/styles.*\.js/]
    }),

    // this is to exclude style.js or style.[chunkhash].js from html
    new HtmlWebpackExcludeAssetsPlugin(),

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

    // extract CSS to separate file
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `[name]${hash}.css`,
      chunkFilename: `[name]${hash}.css`
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
