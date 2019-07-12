module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'inline-source-map',
  module: {
    rules: [
      {
      {
        // JS
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
          },
        },
      },
    ],
  },
};
