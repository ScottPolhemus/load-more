var gulp = require('gulp');
var livereload = require('gulp-livereload');

require('./tasks/browserify');

/**
 * Defines the "build" task for Gulp.
 */
gulp.task('build', ['browserify']);

/**
 * Defines the default (development) task for Gulp.
 */
gulp.task('default', ['watchify'], function() {
  livereload.listen();

  gulp.watch([
    './dist/*.js',
    './example/*.html',
  ], function(event) {
    livereload.changed(event.path);
  });
});
