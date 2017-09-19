const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV;
const production = env === 'production';

console.log('env is', env, production);

const fileNamePattern = production
  ? '[name].bundle.[hash].js'
  : '[name].bundle.js';

const config = {
  entry: {
    app: './src/app.js',
    view: './src/view.js',
    // appUntouched: './src/app.untouched-by-webpack.js',
    performancePolyfill: 'performance-polyfill',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: fileNamePattern,
    publicPath: 'build/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: './src/app.untouched-by-webpack.js', to: fileNamePattern },
    ]),
  ],
  target: 'web',

  devServer: {
    contentBase: './',
  },
};

if (production) {
  // a very simple way to pass hash to index.html without html-webpack-plugin
  config.plugins = config.plugins || [];
  config.plugins.push(function replaceHashPlugin() {
    this.plugin('done', function replaceHash(stats) {
      // eslint-disable-line prefer-arrow-callback
      const htmlPath = path.join(__dirname, 'index.html');
      const fileContents = fs.readFileSync(htmlPath, 'utf8');
      const html = fileContents.replace(
        /bundle\.js/g,
        `bundle.${stats.hash}.js`
      );
      fs.writeFileSync(htmlPath, html);
    });
  });
}

module.exports = config;
