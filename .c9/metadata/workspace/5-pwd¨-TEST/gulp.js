{"filter":false,"title":"gulp.js","tooltip":"/5-pwd¨-TEST/gulp.js","undoManager":{"mark":1,"position":1,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":40,"column":59},"action":"insert","lines":["var gulp = require('gulp'); ","","// Include Our Plugins","var jshint = require('gulp-jshint');","var sass = require('gulp-sass');","var concat = require('gulp-concat');","var uglify = require('gulp-uglify');","var rename = require('gulp-rename');","","// Lint Task","gulp.task('lint', function() {","    return gulp.src('js/*.js')","        .pipe(jshint())","        .pipe(jshint.reporter('default'));","});","","// Compile Our Sass","gulp.task('sass', function() {","    return gulp.src('scss/*.scss')","        .pipe(sass())","        .pipe(gulp.dest('css'));","});","","// Concatenate & Minify JS","gulp.task('scripts', function() {","    return gulp.src('js/*.js')","        .pipe(concat('all.js'))","        .pipe(gulp.dest('dist'))","        .pipe(rename('all.min.js'))","        .pipe(uglify())","        .pipe(gulp.dest('dist'));","});","","// Watch Files For Changes","gulp.task('watch', function() {","    gulp.watch('js/*.js', ['lint', 'scripts']);","    gulp.watch('scss/*.scss', ['sass']);","});","","// Default Task","gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":40,"column":59},"action":"remove","lines":["var gulp = require('gulp'); ","","// Include Our Plugins","var jshint = require('gulp-jshint');","var sass = require('gulp-sass');","var concat = require('gulp-concat');","var uglify = require('gulp-uglify');","var rename = require('gulp-rename');","","// Lint Task","gulp.task('lint', function() {","    return gulp.src('js/*.js')","        .pipe(jshint())","        .pipe(jshint.reporter('default'));","});","","// Compile Our Sass","gulp.task('sass', function() {","    return gulp.src('scss/*.scss')","        .pipe(sass())","        .pipe(gulp.dest('css'));","});","","// Concatenate & Minify JS","gulp.task('scripts', function() {","    return gulp.src('js/*.js')","        .pipe(concat('all.js'))","        .pipe(gulp.dest('dist'))","        .pipe(rename('all.min.js'))","        .pipe(uglify())","        .pipe(gulp.dest('dist'));","});","","// Watch Files For Changes","gulp.task('watch', function() {","    gulp.watch('js/*.js', ['lint', 'scripts']);","    gulp.watch('scss/*.scss', ['sass']);","});","","// Default Task","gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);"]},{"start":{"row":0,"column":0},"end":{"row":14,"column":3},"action":"insert","lines":["var gulp = require('gulp'),","    uglify = require('gulp-uglify'),","    concat = require('gulp-concat-util');","","","gulp.task('Concat lib', function() {","    gulp.src(['js/lib/*.js', 'js/lib/**/*.js', 'js/main.js'])","        .pipe(concat('script.min.js'))","        .pipe(concat.header('\\\"use strict\\\";\\n'))","        .pipe(uglify())","        .pipe(gulp.dest('js/'));","    gulp.src(['js/lib/*.js', 'js/lib/**/*.js', 'js/main.js'])","        .pipe(concat('script.js'))","        .pipe(gulp.dest('js/'));","});"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":11,"column":24},"end":{"row":11,"column":26},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1418746448477,"hash":"d02cb882ecd9275ae603680c103b16e07da66a91"}