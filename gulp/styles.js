'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {

  var sassOptions = {
    style: 'expanded'
  };

  var injectFiles = gulp.src([
    paths.src + '/app/styles/**/*.scss',
    '!' + paths.src + '/app/styles/index.scss',
    '!' + paths.src + '/app/styles/vendor.scss',
    '!' + paths.src + '/app/styles/partials/**/*.scss'
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(paths.src + '/app/styles/', '');
      // filePath = filePath.replace(paths.src + '/components/', '../components/');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var indexFilter = $.filter('index.scss');

  return gulp.src([
    paths.src + '/app/styles/index.scss',
    paths.src + '/app/styles/vendor.scss'
  ])
    .pipe(indexFilter)
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(indexFilter.restore())
    .pipe($.rubySass(sassOptions))

  .pipe($.autoprefixer())
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(paths.tmp + '/serve/app/'));
});
