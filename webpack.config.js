const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'inline-source-map',
  module: {
    rules: [
      {
      {
        // CSS
        test: /\.scss$/,
        use: [
          PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        // JS
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
          },
        },
  plugins: [
    ],
    // extract CSS to separate file in production
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.[contenthash:8].css',
      chunkFilename: '[id].css'
    }),
  ]
};
