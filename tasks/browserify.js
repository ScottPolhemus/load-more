var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var fs = require('fs');
var path = require('path');

/** Defines the "browserify" task for Gulp. */
gulp.task('browserify', function(callback) {
  return browserifyTask(false, callback);
});

/** Defines the "watchify" task for Gulp. */
gulp.task('watchify', function() {
  return browserifyTask(true);
});

/** 
 * Runs the Browserify or Watchify bundler.
 * @param {boolean} dev - "True" to configure the task for development.
 * @param {function} cb - Async callback function.
 */
function browserifyTask(dev, cb) {
  var bundleOpts = {
    entries: './src/load-more.js',
    output: './dist/load-more.min.js',
    standalone: 'LoadMore',
    debug: true
  };

  var b = browserify(bundleOpts);

  var outputFile = path.basename(bundleOpts.output);

  // Add minify plugin w/ source map options
  b.plugin('minifyify', {
    map: outputFile+'.map',
    output: bundleOpts.output+'.map',
    compressPath: function(p) {
      // Start relative paths from root
      return path.join('../', p);
    }
  });

  function bundle() {
    bundleLogger.start(outputFile);

    var bundle = b.bundle()
      .on('error', function (err) { console.error(err.message); })
      .on('end', function() {
        bundleLogger.end(outputFile);

        if(typeof cb !== 'undefined') {
          cb();
        }
      })
      .pipe(fs.createWriteStream(bundleOpts.output));
  }

  if(dev) {
    b = watchify(b);
    b.on('update', bundle);
  }

  return bundle();
}

var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime;

/** Logging functions for Browserify, originally from gulp-starter. */
var bundleLogger = {
  start: function(filepath) {
    startTime = process.hrtime();
    gutil.log('Bundling', gutil.colors.green(filepath));
  },

  end: function(filepath) {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('Bundled', gutil.colors.green(filepath), 'in', gutil.colors.magenta(prettyTime));
  }
};
