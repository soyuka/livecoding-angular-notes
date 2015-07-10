var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var minify = require('gulp-minify-css')
var rename = require('gulp-rename')
var bower = require('main-bower-files')
var ngannotate = require('gulp-ng-annotate')
var uglify = require('gulp-uglify')
var haml = require('gulp-ruby-haml')
var filter = require('gulp-filter')

var paths = {
  scripts: [
    'client/js/*.js', 
    'client/js/**/*.js',
  ],
  //maybe some angular templates
  haml: [
    'client/haml/*.haml',
    'client/haml/**/*.haml'
  ]
}

gulp.task('styles', function() {
  return gulp.src('./client/scss/*.scss')
  .pipe(sass({
    includePaths: ['bower_components/foundation/scss']
  }))
  .pipe(concat('app.css'))
  .pipe(gulp.dest('./client/css'))
  // .pipe(minify())
  // .pipe(rename('app.min.css'))
  // .pipe(gulp.dest('./client/css'))
})

gulp.task('bower', function() {
  return gulp.src(bower())
  .pipe(filter('**/*.js'))
  .pipe(concat('vendor.js'))
  // .pipe(uglify())
  .pipe(gulp.dest('./build'))
})

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
  .pipe(ngannotate())
  .pipe(concat('main.js'))
  .pipe(gulp.dest('./build'))
  .pipe(uglify({mangle: false})) //this can hurt if true with angular \o/
  .pipe(rename('main.min.js'))
  .pipe(gulp.dest('./build'))
})

gulp.task('haml', function() {
  return gulp.src('client/haml/index.haml')
  .pipe(haml())
  .pipe(gulp.dest('./'))
})

gulp.task('default', ['styles', 'bower', 'scripts', 'haml'])

gulp.task('watch', ['default'], function() {
  gulp.watch('./client/scss/*.scss', ['styles'])
  gulp.watch(paths.scripts, ['scripts'])
  gulp.watch(paths.haml, ['haml'])
})

