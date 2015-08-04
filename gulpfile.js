var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
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
 * Cleaning tasks
 */
gulp.task('clean-dev', function (cb) {
    del(['./public'], cb);
});

gulp.task('clean-prod', function (cb) {
    del(['./dist'], cb);
});

/*
 * Copying tasks
 */
gulp.task('copy-bower-components-dev', function () {
    gulp.src('./bower_components/**/*.min.*')
        .pipe(gulp.dest('./public/vendor'))
});

gulp.task('copy-img-dev', function () {
    gulp.src('./src/images')
        .pipe(gulp.dest('./public'))
});

gulp.task('copy-ngapp-js-dev', function () {
    return gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./public'));
})

/*
 * Testing tasks
 */
 gulp.task('jshint', function() {
     gulp.src('./src/ngapp/**/*.js')
         .pipe(jshint())
         .pipe(jshint.reporter('default'));
 })

/*
 * CSS preprocessor tasks
 */
gulp.task('css-dev', function () {
    return gulp.src('./src/styles/*')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css'));
});

/*
 * Build templates
 */
 gulp.task('build-templates', function () {
     return gulp.src('./src/ngapp/**/*.tmpl.html')
         .pipe(html2js({
             moduleName: "templates-app"
         }))
         .pipe(concat('templates-app.js'))
         .pipe(gulp.dest("./public/ngapp"));
 })

 /*
  * Inject the ngapp js sources in the public npapp dire
  * into the index.html
  */
 gulp.task('index-dev', function () {
     return gulp.src('./src/index.html')
         .pipe(inject(
             gulp.src(['./public/ngapp/**/*.js', './public/css/**/*.css']), {
                 ignorePath: 'public'
             }))
         .pipe(gulp.dest("./public"));
 });

/*
 * Complete dev build task
 */
 gulp.task('build', function(callback) {
   return runSequence( 'clean-dev',
     'copy-bower-components-dev',
     'copy-img-dev',
     'css-dev',
     'jshint',
     'build-js',
     'index',
     callback
   )
 });
