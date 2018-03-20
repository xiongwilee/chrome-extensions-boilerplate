/* jshint -W015 */
const gulp = require('gulp');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const runSequence = require('run-sequence');
const fs = require('fs');

const paths = {
  dev: {
    js: './static/js/**/*.js',
    css: './static/css/**/*.less',
    copy: [
      './static/images/**/*',
      './libs/**/*',
      './views/**/*',
      './icons/**/*',
      './_locales/**/*',
      './manifest.json'
    ]
  },
  dist: {
    default: './dist/',
    js: './dist/static/js/',
    css: './dist/static/css/'
  }
};

/** 
 * clean
 */
gulp.task('clean', function() {
  return gulp.src(paths.dist.default)
    .pipe(clean());
});

/** 
 * JSHint
 */
gulp.task('jshint', function() {
  return gulp.src(paths.dev.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

/** 
 * uglify
 */
gulp.task('uglify', function() {
  return gulp.src(paths.dev.js)
    .pipe(uglify({
      output: {
        beautify: false,
        indent_level: 0,
        ascii_only: true
      }
    }))
    .pipe(gulp.dest(paths.dist.js))
});

/** 
 * less
 */
gulp.task('less', function() {
  return gulp.src(paths.dev.css)
    .pipe(less({
      compress: true
    }))
    .pipe(gulp.dest(paths.dist.css));
});

/** 
 * copy
 */
gulp.task('copy', function() {
  return gulp.src(paths.dev.copy, { base: './' })
    .pipe(gulp.dest(paths.dist.default));
});

/** 
 * copy
 */
gulp.task('watch', ['default'], function() {
  gulp.watch(paths.dev.js, [ 'jshint', 'uglify']);
  gulp.watch(paths.dev.css, ['less']);
  gulp.watch(paths.dev.copy, ['copy']);
});

/** 
 * copy
 */
gulp.task('default', ['clean'], function(cb) {
  runSequence([
      'jshint',
      'uglify',
      'less',
      'copy'
    ],
    cb);
});