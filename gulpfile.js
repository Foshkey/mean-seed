var gulp = require('gulp');

var gulpTypescript = require('gulp-typescript');
var gulpSourcemaps = require('gulp-sourcemaps');

var del = require('del');

var appDev = 'assets/app';
var appProd = 'public/js/app';
var vendorJs = 'public/js/vendor';
var vendorCss = 'public/stylesheets/vendor';

var tsProject = gulpTypescript.createProject('tsconfig.json');

gulp.task('build-ts', function () {
  return tsProject.src(appDev + '/**/*.ts')
    .pipe(gulpSourcemaps.init())
    .pipe(tsProject())
    .pipe(gulpSourcemaps.write())
    .pipe(gulp.dest(appProd));
});

gulp.task('build-copy', function () {
  return gulp.src(appDev + '/**/*.{html,htm,css}')
    .pipe(gulp.dest(appProd));
});

gulp.task('clean', function () {
  del(appProd + '/**/*');
})

gulp.task('vendor', function () {
  gulp.src('node_modules/@angular/**')
    .pipe(gulp.dest(vendorJs + '/@angular'));
  gulp.src('node_modules/core-js/**')
    .pipe(gulp.dest(vendorJs + '/core-js'));
  gulp.src('node_modules/reflect-metadata/**')
    .pipe(gulp.dest(vendorJs + '/reflect-metadata'));
  gulp.src('node_modules/rxjs/**')
    .pipe(gulp.dest(vendorJs + '/rxjs'));
  gulp.src('node_modules/systemjs/**')
    .pipe(gulp.dest(vendorJs + '/systemjs'));
  gulp.src('node_modules/bootstrap/**')
    .pipe(gulp.dest(vendorCss + '/bootstrap'));
  gulp.src('node_modules/ng2-bootstrap/**')
    .pipe(gulp.dest(vendorJs + '/ng2-bootstrap'));
  gulp.src('node_modules/moment/**')
    .pipe(gulp.dest(vendorJs + '/moment'));
  gulp.src('node_modules/zone.js/**')
    .pipe(gulp.dest(vendorJs + '/zone.js'));
  return gulp;
});

gulp.task('watch', function () {
  gulp.watch(appDev + '/**/*.ts', ['build-ts']);
  gulp.watch(appDev + '/**/*.{html,htm,css}', ['build-copy']);
});

gulp.task('build', ['build-ts', 'build-copy', 'vendor']);
gulp.task('default', ['build', 'watch']);