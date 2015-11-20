'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    util = require('gulp-util'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync');

var destination = 'public/assets';

var styles = {};

styles['lib.css'] = [
    'node_modules/foundation-sites/css/foundation.min.css'
];

styles['app.css'] = [
    'src/themes/*/styles/*.less'
];

gulp.task('styles', function () {
    // loop over file configuration
    for (var destinationFile in styles) {
        if (styles.hasOwnProperty(destinationFile)) {
            gulp.src(styles[destinationFile])
                .pipe(less())
                .pipe(concat(destinationFile))
                .pipe(minifyCss({compatibility: 'ie8'}))
                .pipe(gulp.dest(destination + '/styles'));
        }
    }
});

var scripts = {};

scripts['lib.js'] = [
    'node_modules/foundation-sites/js/vendor/modernizr.js',
    'node_modules/foundation-sites/js/vendor/jquery.js',
    'node_modules/foundation-sites/js/foundation.min.js',
    'node_modules/foundation-sites/js/foundation/*.js'
];


scripts['app.js'] = [
    'src/scripts/*.js'
];

gulp.task('scripts', function () {
    'use strict'
    var destinationFile;

    // loop over file configuration
    for (destinationFile in scripts) {
        if (scripts.hasOwnProperty(destinationFile)) {
            gulp.src(scripts[destinationFile])
                .pipe(concat(destinationFile))
                .pipe(uglify())
                .pipe(gulp.dest(destination + '/scripts'));
        }
    }
});

var images = [
    'src/themes/**/images/*'
];
// Moves all fonts to the public folder
gulp.task('images', function () {
    return gulp.src(images)
        .pipe(gulp.dest(destination + '/images'));
});

var fonts = [
    'src/themes/**/fonts/*'
];
// Moves all fonts to the public folder
gulp.task('fonts', function () {
    return gulp.src(fonts)
        .pipe(gulp.dest(destination + '/fonts'));
});

gulp.task('watch', function () {
    gulp.watch('src/themes/**/*.less', ['styles']); // run styles task if any less file change in themes
    gulp.watch('src/scripts/**/*.js', ['scripts']); // run scripts task if any js files change in the packages
});

gulp.task('default', ['styles', 'scripts', 'watch'], function () {
    browserSync({
        server: {
            baseDir: 'public'
        },
        notify: false,
        open: false
    });
});

gulp.task('deploy', ['styles', 'scripts']);
