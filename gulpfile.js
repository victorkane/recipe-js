var gulp = require('gulp'),
//    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    karma = require('gulp-karma'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    flatten = require('gulp-flatten'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    ngAnnotate = require('browserify-ngannotate');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function (cb) {
    del(['./public'], cb);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs bower to install frontend dependencies
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('bower', function() {

    var install = require("gulp-install");

    return gulp.src(['./bower.json'])
        .pipe(install());
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs main bower files to install frontend dependencies in vendor dir
//
/////////////////////////////////////////////////////////////////////////////////////

/*
gulp.task('build-bower-files', function() {
  return gulp.src(mainBowerFiles, {base: './bower_components'})
    .pipe(gulp.dest('./public/vendor'));
})
*/
gulp.task('copy-bower-components', function() {
  gulp.src('./bower_components/**/*.min.js')
  .pipe(flatten())
  .pipe(gulp.dest('./public/vendor'))
});


/////////////////////////////////////////////////////////////////////////////////////
//
// runs sass, creates css source maps
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-css', ['clean'], function() {
    return gulp.src('./src/styles/*')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs jshint
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('jshint', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
})

/////////////////////////////////////////////////////////////////////////////////////
//
// Build a minified Javascript bundle - the order of the js files is determined
// by browserify
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-js', ['clean'], function() {
    var b = browserify({
        entries: './src/js/recipejs-app.js',
        debug: true,
        paths: ['./js/controllers', './js/services', './js/directives'],
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js/'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// Generates a sprite png and the corresponding sass sprite map.
// This is not included in the recurring development build and needs to be run separately
// Task copy-images should be removed from task dev and build
// if this task is to be used.
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('sprite', function () {

    var spriteData = gulp.src('./src/images/*.png')
        .pipe(spritesmith({
            imgName: 'todo-sprite.png',
            cssName: '_todo-sprite.scss',
            algorithm: 'top-down',
            padding: 5
        }));

    spriteData.css.pipe(gulp.dest('./dist'));
    spriteData.img.pipe(gulp.dest('./dist'))
});

/////////////////////////////////////////////////////////////////////////////////////
//
// simply copies images
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('copy-images', function() {
  gulp.src('./src/images/**/*')
  .pipe(gulp.dest('./public/images'))
});

/////////////////////////////////////////////////////////////////////////////////////
//
// Copies and cachebusts index.html
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('index', function() {
  gulp.src('./src/index.html')
  .pipe(cachebust.references())
  .pipe(gulp.dest('public'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// full build (except sprites but including copy-images), applies cache busting to the main page css and js bundles
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build', function(cb) {
  return runSequence( 'clean',
    // 'bower',
    'build-css',
    // 'build-template-cache',
    'jshint',
    'build-js',
    'copy-bower-components',
    'copy-images',
    'index',
    cb
  )
});
