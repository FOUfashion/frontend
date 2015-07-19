import webpack from 'webpack';
import path from 'path';

const DEBUG = !process.argv.includes('--release');
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

const CSS_LOADER_MODULES = `css?modules&${DEBUG ? 'localIdentName=[name]__[local]___[hash:base64:5]' : 'minimize'}`;

//
// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.BannerPlugin('require("babel-runtime/core-js/promise").default = require("bluebird");', { raw: true })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint'
    }],

    loaders: [{
      test: /\.css$/,
      loader: `style!css?${DEBUG ? '' : 'minimize&'}importLoaders=1!autoprefixer`
    }, {
      test: /\.scss$/,
      loader: `style!${CSS_LOADER_MODULES}!autoprefixer!sass?includePaths[]=` + path.resolve(__dirname, 'node_modules')
    }, {
      test: /\.hbs$/,
      loader: 'handlebars'
    }, {
      test: /\.gif$/,
      loader: 'url?limit=10000&mimetype=image/gif'
    }, {
      test: /\.jpe?g$/,
      loader: 'url?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png$/,
      loader: 'url?limit=10000&mimetype=image/png'
    }, {
      test: /\.svg$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        stage: 0,
        optional: ['runtime', 'optimisation'],
        cacheDirectory: true
      }
    }]
  }
};

//
// Configuration for the client-side bundle (app.js)
// -----------------------------------------------------------------------------

const appConfig = Object.assign({}, config, {
  entry: './src/app.js',
  output: {
    publicPath: './',
    sourcePrefix: '  ',
    path: './dist/public',
    filename: 'app.js'
  },
  devtool: DEBUG ? 'source-map' : false,
  plugins: config.plugins.concat([
    new webpack.DefinePlugin(Object.assign({}, GLOBALS, { '__SERVER__': false }))
  ].concat(DEBUG ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]))
});

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = Object.assign({}, config, {
  entry: './src/server.js',
  output: {
    publicPath: './',
    sourcePrefix: '  ',
    path: './dist',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: /^[a-z][a-z\.\-0-9]*$/,
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  devtool: DEBUG ? 'source-map' : 'cheap-module-source-map',
  plugins: config.plugins.concat(
    new webpack.DefinePlugin(Object.assign({}, GLOBALS, { '__SERVER__': true })),
    new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })
  ),
  module: {
    loaders: config.module.loaders.map(function(loader) {
      // Remove style-loader
      return Object.assign({}, loader, {
        loader: loader.loader.replace('style!', '')
      });
    })
  }
});

export default [appConfig, serverConfig];
