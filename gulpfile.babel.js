import cp from 'child_process';
import browserSync from 'browser-sync';

import gulp from 'gulp';
import gutil from 'gulp-util';

import webpack from 'webpack';
import config from './webpack.config.js';

const bs = browserSync.create();
const VERBOSE = process.argv.includes('--verbose');

// Keeps sass-loader from hanging jtangelder/sass-loader/issues/49
process.env.UV_THREADPOOL_SIZE = 100;

// The default task
gulp.task('default', ['sync']);

// Static files
gulp.task('assets', function() {
  return gulp.src('src/public/**')
    .pipe(gulp.dest('dist/public'));
});

// Bundle
gulp.task('bundle', ['assets'], function(done) {
  const watch = !process.argv.includes('--nowatch');
  const bundler = webpack(config);
  const allStats = [];

  function bundle(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    allStats.push(stats);

    if (allStats.length === (watch ? config.length : 1)) {
      allStats.forEach(stat => {
        console.log(stat.toString({
          colors: gutil.colors.supportsColor,
          hash: VERBOSE,
          version: VERBOSE,
          timings: VERBOSE,
          chunks: VERBOSE,
          chunkModules: VERBOSE,
          cached: VERBOSE,
          cachedAssets: VERBOSE,
          errorDetails: VERBOSE
        }));
      });

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
            gutil.log('Restarting development server...');
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
  browserSync.init({
    logPrefix: 'BS',
    proxy: 'localhost:5000',
    notify: false
  }, done);

  gulp.watch([
    'dist/public/**',
    '!dist/public/**/*.map.*'
  ], function(file) {
    setTimeout(() => browserSync.reload(file.path), 3000);
  });
});
