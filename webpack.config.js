const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /worker\.js$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
    ],
  },

  target: 'web',

  devServer: {
    contentBase: './build',
  },
};
