var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    jshint = require('gulp-jshint'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    inject = require("gulp-inject"),
    html2js = require("gulp-ng-html2js"),
    print = require("gulp-print"),
    pkg = require('./package.json'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

/*
 * Cleaning tasks
 */
gulp.task('clean-dev', function (callback) {
    del(['./public'], {
        force: true
    }, callback);
});

gulp.task('clean-prod', function (callback) {
    del(['./prod'], {
        force: true
    }, callback);
});

/*
 * Copying tasks
 */
gulp.task('copy-bower-components-dev', function (callback) {
    gulp.src('./bower_components/**/*.min.*')
        .pipe(gulp.dest('./public/vendor'))
        .on('end', callback);
});

gulp.task('copy-img-dev', function () {
    gulp.src('src/images/*')
        //.pipe(print())
        .pipe(gulp.dest('public/images'))
});

gulp.task('copy-ngapp-js-dev', function () {
    return gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./public'));
})

gulp.task('copy-bower-components-prod', function (callback) {
    gulp.src('./bower_components/**/*.min.*')
        .pipe(gulp.dest('./prod/vendor'))
        .on('end', callback);
});

gulp.task('copy-img-prod', function () {
    gulp.src('src/images/*')
        .pipe(gulp.dest('prod/images'))
});

/*
 * Testing tasks
 */
gulp.task('jshint', function () {
    gulp.src('./src/ngapp/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
})

/*
 * Just testing glob patterns
 */
gulp.task('glob', function () {
    var sources = gulp.src([
//        'src/ngapp/**/*.tmpl.html',
        //'./prod/**/*.js'
        'public/vendor/**/*.js',
        'public/ngapp/**/*.js'
        //    'public/vendor/**/*.js',
        //    'public/ngapp/**/*.js',
        //    'public/vendor/**/*.css',
        //    'src/styles/**/*.scss',
        //    'public/css/**/*.css'
        ])
        .pipe(print());
});

/*
 * Complete prod build task
 */
gulp.task('prod', function (callback) {
    return runSequence(
        'dev',
        'clean-prod',
        'copy-bower-components-prod',
        'copy-img-prod',
        'css-prod',
        'concat-js-prod',
        'uglify-prod',
        'index-prod',
        callback
    )
});


gulp.task('concat-js-prod', function () {
    return gulp.src(['gulp/iife.prefix', 'public/ngapp/**/*.js', 'gulp/iife.suffix'])
        .pipe(concat('ngapp.min.js'))
        .pipe(gulp.dest('./prod/js'))
});

gulp.task('uglify-prod', function () {
    return gulp.src('prod/js/*.min.js')
        .pipe(uglify());
});

/*
 * CSS preprocessor tasks
 */
gulp.task('css-dev', function () {
    return gulp.src('./src/styles/*')
        .pipe(sourcemaps.init())
        .pipe(sass())
        //        .pipe(cachebust.resources())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('css-prod', function () {
    gulp.src('public/css/*')
        .pipe(gulp.dest('prod/css'))
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
 * Inject the ngapp vendor js and css files
 * in the public vendor dir into index.html
 */
gulp.task('index-dev', function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src([
            'public/vendor/**/*.js',
            'public/ngapp/**/*.js',
            'public/vendor/**/*.css',
            'public/css/**/*.css'
        ], {
            read: false
        })
        //.pipe(print())
        .pipe(order([
            'public/vendor/jquery/dist/jquery.min.js',
            'public/vendor/bootstrap/dist/js/bootstrap.min.js',
            'public/vendor/angular/angular.min.js',
            'public/vendor/angular-ui-router/release/angular-ui-router.min.js',
            'public/vendor/**/*.min.js',
            'public/ngapp/recipejs-app.module.js',
            'public/ngapp/**/*.js',
            'public/vendor/**/*.min.css'
        ], {
            // order docs recommend this for order to work
            base: '.'
        }));
    return target.pipe(inject(sources, {
            ignorePath: 'public'
        }))
        .pipe(gulp.dest("public"));
});

gulp.task('index-prod', function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src([
            'prod/vendor/**/*.min.css',
            'prod/css/**/*.css',
            'prod/vendor/**/*.js',
            'prod/js/*.min.js'
        ], {
            read: false
        })
        //.pipe(print())
        .pipe(order([
            'prod/vendor/bootstrap/dist/css/bootstrap.min.css',
            'prod/vendor/bootstrap/dist/css/bootstrap-theme.min.css',
            'prod/css/*.css',
            'prod/vendor/jquery/dist/jquery.min.js',
            'prod/vendor/bootstrap/dist/js/bootstrap.min.js',
            'prod/vendor/angular/angular.min.js',
            'prod/vendor/angular-ui-router/release/angular-ui-router.min.js',
            'prod/vendor/**/*.min.js',
            'prod/js/*.min.js'
        ], {
            // order docs recommend this for order to work
            base: '.'
        }));
    return target.pipe(inject(sources, {
            ignorePath: 'prod'
        }))
        .pipe(gulp.dest("prod"));
});

/*
 * Complete dev build task
 */
gulp.task('dev', function (callback) {
    return runSequence('clean-dev',
        'copy-bower-components-dev',
        'copy-img-dev',
        'css-dev',
        'jshint',
        'copy-ngapp-js-dev',
        'build-templates',
        'index-dev',
        callback
    )
});

// watch list
gulp.task('watch', function () {
    gulp.watch('bower_componente/**/*', ['copy-bower-components-dev', 'index-dev']).on('change', browserSync.reload);
    gulp.watch(['src/ngapp/**/*.js', '!src/**/ngapp/**/*.spec.js'], ['jshint', 'copy-ngapp-js-dev', 'index-dev']).on('change', browserSync.reload);
    gulp.watch('src/ngapp/**/*.tmpl.html', ['build-templates', 'index-dev']).on('change', browserSync.reload);
    gulp.watch('src/**/*.html', ['index-dev']).on('change', browserSync.reload);
    gulp.watch('src/styles/**/*.scss', ['css-dev']).on('change', browserSync.reload);
    gulp.watch('server.js', ['dev']).on('change', browserSync.reload);
});

gulp.task('browser-sync', function () {
    browserSync({
        proxy: "localhost:3000",
        port: 8080
    });
});

gulp.task('serve', function (callback) {
    var called = false;
    nodemon({
            script: 'server.js',
            watch: 'server.js'
        })
        .on('start', function () {
            if (!called) {
                callback();
            }
            called = true;
        })
        .on('restart', function () {
            console.log('restarted!')
        })
});

/*
 * call dev, watch and serve!
 */
gulp.task('dev-watch', function (callback) {
    runSequence('dev',
        'watch',
        'serve',
        'browser-sync',
        callback);
});
