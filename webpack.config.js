const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
    worker: './src/simple.worker.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/build/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // {
      //   test: /worker\.js$/,
      //   exclude: /node_modules/,
      //   use: [
      //     { loader: 'file-loader' },
      //     { loader: 'babel-loader' },
      //   ],
      // },
    ],
  },

  target: 'web',

  devServer: {
    contentBase: './',
  },
};
