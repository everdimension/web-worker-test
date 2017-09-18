const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV;
const production = env === 'production';

console.log('env is', env, production);

const config = {
  entry: {
    app: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: production ? '[name].[hash].bundle.js' : '[name].bundle.js',
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
        use: [{ loader: 'worker-loader' }, { loader: 'babel-loader' }],
      },
    ],
  },

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
        'app.bundle.js',
        `app.${stats.hash}.bundle.js`
      );
      fs.writeFileSync(htmlPath, html);
    });
  });
}

module.exports = config;
