import path from 'path';
import cp from 'child_process';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

import webpack from 'webpack';
import config from './webpack.config.js';

const $ = gulpLoadPlugins();
const VERBOSE = process.argv.includes('--verbose');
const src = {};

// Keeps sass-loader from hanging https://github.com/jtangelder/sass-loader/issues/49
process.env.UV_THREADPOOL_SIZE = 100;

let watch = false;
let browserSync;

// The default task
gulp.task('default', ['sync']);

// Static files
gulp.task('assets', function() {
  src.assets = [
    'src/public/**'
  ];

  return gulp.src(src.assets)
    .pipe($.changed('dist/public'))
    .pipe(gulp.dest('dist/public'));
});

// Build the app from source code
gulp.task('dist', ['bundle']);

// Build and start watching for modifications
gulp.task('dist:watch', ['dist'], function() {
  gulp.watch(src.assets, ['assets']);
});

// Bundle
gulp.task('bundle', ['assets'], function(done) {
  const bundler = webpack(config);
  let bundlerRunCount = 0;

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    console.log(stats.toString({
      colors: $.util.colors.supportsColor,
      hash: VERBOSE,
      version: VERBOSE,
      timings: VERBOSE,
      chunks: VERBOSE,
      chunkModules: VERBOSE,
      cached: VERBOSE,
      cachedAssets: VERBOSE,
      errorDetails: VERBOSE
    }));

    if (++bundlerRunCount === (watch ? config.length : 1)) {
      return done();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

// Start the server to serve the app
gulp.task('serve', ['dist:watch'], function(done) {
  src.server = [
    'dist/server.js',
    'dist/views/**'
  ];

  let started = false;
  let server = (function startup() {
    const child = cp.fork('dist/server.js', {
      env: Object.assign({ NODE_ENV: 'development' }, process.env)
    });

    child.once('message', function(message) {
      if (message.match(/^online$/)) {
        if (browserSync) {
          browserSync.reload();
        }

        if (!started) {
          started = true;

          gulp.watch(src.server, function() {
            $.util.log('Restarting development server...');
            server.kill('SIGTERM');
            server = startup();
          });

          done();
        }
      }
    });

    return child;
  })();

  process.on('exit', () => server.kill('SIGTERM'));
});

// Launch BrowserSync development server
gulp.task('sync', ['serve'], function(done) {
  browserSync = require('browser-sync');
  process.on('exit', () => browserSync.exit());

  browserSync({
    logPrefix: 'WP',
    notify: false,
    https: false,
    proxy: 'localhost:5000'
  }, done);

  gulp.watch(['dist/**'].concat(src.server.map(file => '!' + file)), file => {
    browserSync.reload(path.relative(__dirname, file.path));
  });
});
