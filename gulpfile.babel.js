import path from 'path';
import cp from 'child_process';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import webpack from 'webpack';

const $ = gulpLoadPlugins();
const src = Object.create(null);

let watch = false;
let browserSync;

// The default task
gulp.task('default', ['sync']);

// Static files
gulp.task('assets', () => {
  src.assets = 'src/public/**';
  return gulp.src(src.assets)
    .pipe($.changed('dist/public'))
    .pipe(gulp.dest('dist/public'))
    .pipe($.size({title: 'assets'}));
});

// Resource files
gulp.task('resources', () => {
  src.resources = [
    'package.json',
    'src/content*/**',
    'src/templates*/**'
  ];

  return gulp.src(src.resources)
    .pipe($.changed('dist'))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'resources'}));
});

// Bundle
gulp.task('bundle', done => {
  const config = require('./webpack.config.js');
  const bundler = webpack(config);
  const verbose = process.argv.includes('--verbose');
  let bundlerRunCount = 0;

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    console.log(stats.toString({
      colors: $.util.colors.supportsColor,
      hash: verbose,
      version: verbose,
      timings: verbose,
      chunks: verbose,
      chunkModules: verbose,
      cached: verbose,
      cachedAssets: verbose
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

// Build the app from source code
gulp.task('dist', done => {
  runSequence(['assets', 'resources'], ['bundle'], done);
});

// Build and start watching for modifications
gulp.task('dist:watch', done => {
  watch = true;
  runSequence('dist', () => {
    gulp.watch(src.assets, ['assets']);
    gulp.watch(src.resources, ['resources']);
    done();
  });
});

// Launch a Node.js/Express server
gulp.task('serve', ['dist:watch'], done => {
  src.server = [
    'dist/server.js',
    'dist/content/**/*',
    'dist/templates/**/*'
  ];

  let started = false;
  let server = (function startup() {
    const child = cp.fork('dist/server.js', {
      env: Object.assign({ NODE_ENV: 'development' }, process.env)
    });

    child.once('message', message => {
      if (message.match(/^online$/)) {
        if (browserSync) {
          browserSync.reload();
        }

        if (!started) {
          started = true;

          gulp.watch(src.server, function() {
            $.util.log('Restarting development server.');
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
gulp.task('sync', ['serve'], done => {
  browserSync = require('browser-sync');

  browserSync({
    logPrefix: 'RSK',
    notify: false,
    https: false,
    proxy: 'localhost:5000'
  }, done);

  process.on('exit', () => browserSync.exit());

  gulp.watch(['dist/**/*.*'].concat(src.server.map(file => '!' + file)), file => {
    browserSync.reload(path.relative(__dirname, file.path));
  });
});
