var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    inject = require("gulp-inject"),
    html2js = require("gulp-ng-html2js"),
    pkg = require('./package.json'),
    nodemon = require('gulp-nodemon');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

/*
 * cleaning tasks
 */
gulp.task('clean-dev', function (cb) {
    del(['./public'], cb);
});

gulp.task('clean-prod', function (cb) {
    del(['./dist'], cb);
});

/*
 * copying tasks
 */
gulp.task('copy-bower-components-dev', function () {
    gulp.src('./bower_components/**/*.min.*')
        .pipe(gulp.dest('./public/vendor'))
});

gulp.task('copy-img-dev', function () {
    gulp.src('./src/images')
    .pipe(gulp.dest('./public'))
});
