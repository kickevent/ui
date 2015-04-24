var gulp    = require('gulp');
var concat  = require('gulp-concat');
var connect = require('gulp-connect');
var less    = require('gulp-less');
var templateCache = require('gulp-angular-templatecache');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var del = require('del');

var PATH = {
  INDEX: './src/index.html',
  JS: './src/**/*.js',
  LESS: './src/less/demo.less',
  LESS_FILES: './src/**/*.less',
  TEMPLATES: 'src/templates/**/*.html',
  FONTS: [
    '../node_modules/bootstrap/fonts/*'
  ],
  IMAGES: [
    '../src/logo/**'
  ],

  APP: 'app.js',

  OUTPUT: './public',
  OUTPUTJS: './public/js',
  OUTPUTCSS: './public/css',
  OUTPUTFONT: './public/fonts',
  OUTPUTIMAGES: './public/images',
};

gulp.task('clean', function(done){
  del(PATH.OUTPUT, done);
});

gulp.task('build/index', function() {
  gulp.src(PATH.INDEX)
    .pipe(gulp.dest(PATH.OUTPUT));
});

gulp.task('build/app', function() {
  gulp.src(PATH.JS)
    .pipe(concat(PATH.APP))
    .pipe(gulp.dest(PATH.OUTPUTJS));
});

gulp.task('build/less', function () {
  gulp.src(PATH.LESS)
    .pipe(less())
    .pipe(gulp.dest(PATH.OUTPUTCSS));
});

gulp.task('build/templates', function () {
  gulp.src(PATH.TEMPLATES)
    .pipe(rename(function(filepath) {
      filepath.dirname = filepath.dirname.replace('/templates', '');
    }))
    .pipe(templateCache({module: 'kickevent.ui.demo.templates'}))
    .pipe(gulp.dest(PATH.OUTPUTJS));
});

gulp.task('build/fonts', function() {
  gulp.src(PATH.FONTS)
    .pipe(flatten())
    .pipe(gulp.dest(PATH.OUTPUTFONT));
});

gulp.task('build/images', function() {
  gulp.src(PATH.IMAGES)
    .pipe(gulp.dest(PATH.OUTPUTIMAGES));
});

gulp.task('build', ['build/index', 'build/app', 'build/less', 'build/templates', 'build/fonts', 'build/images']);

// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
  gulp.watch(PATH.JS, ['build/app']);
  gulp.watch(PATH.INDEX, ['build/index']);
  gulp.watch(PATH.LESS_FILES, ['build/less']);
  gulp.watch(PATH.TEMPLATES, ['build/templates']);
  gulp.watch(PATH.FONTS, ['build/fonts']);
  gulp.watch(PATH.IMAGES, ['build/images']);
  gulp.watch('gulpfile.js', ['build']);
});

// WEB SERVER
gulp.task('serve', function() {
  connect.server({
    root: [PATH.OUTPUT],
    port: 8000,
    livereload: false
  });
});

gulp.task('default', ['serve', 'watch']);
