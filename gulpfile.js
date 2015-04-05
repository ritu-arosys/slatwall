var gulp = require('gulp'),
    traceur = require('gulp-traceur'),
    to5 = require('gulp-6to5'),
    plumber = require('gulp-plumber'),
    es6Path = 'admin/client/ts/**/*.ts',
    compilePath = 'admin/client/js/',
    rename = require('gulp-rename');;

gulp.task('traceur', function () {
  gulp.src([es6Path])
      .pipe(rename(function (path) {
          path.dirname = path.dirname.replace('/ts/','/js/'),
          path.extname = '.js'
      }))
      .pipe(plumber())
      .pipe(traceur({ blockBinding: true }))
      
      .pipe(gulp.dest('./' + compilePath + '/es6'));
});

gulp.task('6to5', function () {
    gulp.src([es6Path])
        .pipe(plumber())
        .pipe(to5())
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace('/ts/','/js/'),
            path.extname = '.js'
        }))
        .pipe(gulp.dest('./' + compilePath));
});

gulp.task('watch', function() {

    gulp.watch([es6Path], ['traceur', '6to5']);

});

gulp.task('default', ['traceur', '6to5', 'watch']);