var gulp = require('gulp'),
//    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    karma = require('gulp-karma'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon')
    ngAnnotate = require('browserify-ngannotate');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('default', function() {
  console.log('Hello, world!');
});
