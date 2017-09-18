const path = require('path');

const env = process.env.NODE_ENV;
const production = env === 'production';

console.log('env is', env, production);

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: 'build/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.worker\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'worker-loader' },
          { loader: 'babel-loader' }
        ],
      },
    ],
  },

  target: 'web',

  devServer: {
    contentBase: './',
  },
};
