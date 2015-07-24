import cp from 'child_process';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

import webpack from 'webpack';
import config from './webpack.config.js';

const $ = gulpLoadPlugins();
const bs = browserSync.create();
const VERBOSE = process.argv.includes('--verbose');

// Keeps sass-loader from hanging jtangelder/sass-loader/issues/49
process.env.UV_THREADPOOL_SIZE = 100;

// The default task
gulp.task('default', ['sync']);

// Static files
gulp.task('assets', function() {
  return gulp.src('src/public/**')
    .pipe($.changed('dist/public'))
    .pipe(gulp.dest('dist/public'));
});

// Bundle
gulp.task('bundle', ['assets'], function(done) {
  const watch = !process.argv.includes('--nowatch');
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

// Build and start watching for modifications
gulp.task('watch', ['bundle'], function() {
  gulp.watch('src/public/**', ['assets']);
});

// Start the server to serve the app
gulp.task('serve', ['watch'], function(done) {
  let started = false;
  let server = (function startup() {
    const child = cp.fork('dist/server.js', {
      env: Object.assign({ NODE_ENV: 'development' }, process.env)
    });

    child.once('message', function(message) {
      if (message === 'online') {
        if (bs.active) {
          bs.reload();
        }

        if (!started) {
          started = true;

          gulp.watch('dist/server.js', function() {
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
});

// Launch BrowserSync development server
gulp.task('sync', ['serve'], function(done) {
  browserSync.init({
    logPrefix: 'BS',
    proxy: 'localhost:5000',
    notify: false
  }, done);

  gulp.watch('dist/public/**', function(file) {
    setTimeout(() => browserSync.reload(file.path), 1000);
  });
});
