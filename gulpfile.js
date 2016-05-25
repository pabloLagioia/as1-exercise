'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var riot = require('gulp-riot');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('clean', function() {
    return del(['.temp', 'public/js', 'public/stylesheets']);
});
 
var tempDir = ".temp";

gulp.task('riotjs', ["clean"], function() {
  return gulp.src('src/tags/*.tag')
    .pipe( riot() )
    .pipe(gulp.dest(tempDir+'/js/'));
});

gulp.task('concat', ['riotjs'], function() {
  return gulp.src([tempDir+'/js/*.js', 'src/js/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('compress', ['concat'], function() {
  return gulp.src(tempDir+'/all.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('sass', function () {
  return gulp.src('src/stylesheets/site.scss')
    .pipe(sass( {outputStyle: 'compressed'} ).on('error', sass.logError))
    .pipe(gulp.dest('public/css/'));
});
 
gulp.task('build', ['concat', 'sass']);

gulp.task('watch', function() {
  gulp.watch([
      'src/js/*.js',
      'src/tags/*.tag'
  ], 
  ['build']);
});