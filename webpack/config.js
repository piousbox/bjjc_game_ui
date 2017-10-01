var path = require('path');
var util = require('util');
var autoprefixer = require('autoprefixer-core');
var pkg = require('../package.json');

var loaders = require('./loaders');
var plugins = require('./plugins');

var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));

var entry = {
  app: ['./app.jsx']
};

if (DEBUG) {
  entry.app.push(
    util.format(
      'webpack-dev-server/client?http://%s:%d',
      pkg.config.devHost,
      pkg.config.devPort[process.env.NODE_ENV]
    )
  );
  entry.app.push('webpack/hot/dev-server');
}

var config = {
  context: path.join(__dirname, '../app'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG || TEST ? 'inline-source-map' : false,
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir[process.env.NODE_ENV]),
    publicPath: '/',
    filename: jsBundle,
    pathinfo: false
  },
  module: {
    loaders: loaders
  },
  postcss: [
    autoprefixer
  ],
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['node_modules', 'config/' + process.env.NODE_ENV ]
  },
  devServer: {
    contentBase: path.resolve(pkg.config.buildDir[process.env.NODE_ENV]),
    hot: true,
    noInfo: false,
    inline: true,
    historyApiFallback: true,
    stats: { colors: true }
  },
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true,
  }
};

module.exports = config;
