import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import path from 'path';

const DEBUG = !process.argv.includes('--release');
const CSS_LOADER_MODULES = `css/locals?modules&${DEBUG ? 'localIdentName=[path]--[local]---[hash:base64:5]' : 'minimize'}`;
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

// Common configuration chunk to be used for both client-side (app.js) and server-side (server.js) bundles
const config = {
  cache: DEBUG,
  debug: DEBUG,

  context: path.join(__dirname, 'src'),

  stats: {
    colors: true,
    reasons: DEBUG
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  }
};

// Configuration for the client-side bundle (app.js)
const appConfig = Object.assign({}, config, {
  entry: './app.js',

  output: {
    publicPath: './',
    sourcePrefix: '  ',
    path: '../dist/public',
    filename: 'app.js'
  },

  devtool: DEBUG ? 'source-map' : false,

  plugins: config.plugins.concat([
    new webpack.DefinePlugin(Object.assign({}, GLOBALS, { '__SERVER__': false })),
    new ExtractTextPlugin('styles.css')
  ].concat(DEBUG ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ])),

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint'
    }],

    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel?cacheDirectory'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', `css?${DEBUG ? '-minimize' : 'minimize'}!autoprefixer`)
      // loader: `style!css?${DEBUG ? '-minimize' : 'minimize'}!autoprefixer`
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', `${CSS_LOADER_MODULES}!autoprefixer!sass?includePaths[]=` + path.resolve(__dirname, 'node_modules'))
      //loader: `style!${CSS_LOADER_MODULES}!autoprefixer!sass?includePaths[]=` + path.resolve(__dirname, 'node_modules')
    }, {
      test: /\.jpg$/,
      loader: 'url?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png$/,
      loader: 'url?limit=10000&mimetype=image/png'
    }, {
      test: /\.svg$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }]
  }
});

// Configuration for the server-side bundle (server.js)
const serverConfig = Object.assign({}, config, {
  entry: './server.js',

  output: {
    publicPath: './',
    sourcePrefix: '  ',
    path: '../dist',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },

  target: 'node',
  externals: /^[a-z][a-z\.\-0-9]*$/,
  devtool: DEBUG ? 'source-map' : 'cheap-module-source-map',

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  plugins: config.plugins.concat(
    new webpack.DefinePlugin(Object.assign({}, GLOBALS, { '__SERVER__': true })),
    new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })
  ),

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint'
    }],

    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel?cacheDirectory'
    }, {
      test: /\.hbs$/,
      loader: 'handlebars'
    }]
  }
});

export default [appConfig, serverConfig];
