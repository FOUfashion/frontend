import NyanProgressPlugin from 'nyan-progress-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

const DEBUG = !process.argv.includes('--release');
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

const CSS_LOADER = DEBUG ? 'css' : 'css?minimize';
const CSS_LOADER_PARAMS = `modules&localIdentName=${DEBUG ? '[dir]--[local]--[sourceHash:5]' : '[sourceHash]&minimize'}`;
const SASS_LOADER = `sass?sourceMap&includePaths[]=${__dirname}/node_modules`;

const extractVendorStyles = new ExtractTextPlugin('vendor.css');
const extractAppStyles = new ExtractTextPlugin('styles.css');

// Common configuration for both client-side and server-side bundles
const config = {
  output: {
    publicPath: './'
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new NyanProgressPlugin(),
    extractVendorStyles,
    extractAppStyles
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
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel?cacheDirectory'
    }, {
      test: /\.jpg$/,
      loader: 'url?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png$/,
      loader: 'url?limit=10000&mimetype=image/png'
    }, {
      test: /\.svg$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.hbs$/,
      loader: 'handlebars'
    }]
  }
};

// Configuration for the client-side bundle (app.js)
const appConfig = Object.assign({}, config, {
  entry: {
    app: './src/client.js',
    vendor: [
      'classnames',
      'debug',
      'fluxible',
      'fluxible-addons-react',
      'react',
      'react-router',
      'serialize-javascript',
      'superagent'
    ]
  },

  output: Object.assign({}, config.output, {
    path: './dist/public',
    filename: 'app.js'
  }),

  devtool: DEBUG ? 'source-map' : false,

  plugins: config.plugins.concat([
    new webpack.DefinePlugin(Object.assign({}, GLOBALS, { '__SERVER__': false })),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity)
  ].concat(DEBUG ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ])),

  module: Object.assign({}, config.module, {
    loaders: config.module.loaders.concat([{
      test: /\.css$/,
      loader: extractVendorStyles.extract('style', CSS_LOADER)
    }, {
      test: /\.scss$/,
      loader: extractAppStyles.extract('style', `css?${CSS_LOADER_PARAMS}&sourceMap!autoprefixer!${SASS_LOADER}`)
    }])
  })
});

// Configuration for the server-side bundle (server.js)
const serverConfig = Object.assign({}, config, {
  entry: './src/server.js',

  output: Object.assign({}, config.output, {
    path: './dist',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  }),

  target: 'node',
  externals: /^[a-z][a-z\.\-0-9]*$/,
  devtool: 'source-map',

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

  module: Object.assign({}, config.module, {
    loaders: config.module.loaders.concat([{
      test: /\.css$/,
      loader: CSS_LOADER
    }, {
      test: /\.scss$/,
      loader: `css/locals?${CSS_LOADER_PARAMS}!autoprefixer!${SASS_LOADER}`
    }])
  })
});

export default [appConfig, serverConfig];
