const gulp = require("gulp");
const sass = require("gulp-sass");
var rename = require("gulp-rename");
var gulpSequence = require('gulp-sequence')

gulp.task('css',["scss"], function () {
  return gulp.src("lib/yk-editor/src/assets/scss/yk-editor.scss")
    .pipe(sass())
    .pipe(gulp.dest("lib/yk-editor/src/assets/css"))

})

gulp.task('scss', function () {
  return gulp.src("lib/yk-editor/src/assets/scss/yk-editor.scss")
    .pipe(sass())
    .pipe(rename(function (path) {
      path.extname = ".scss";
    }))
    .pipe(gulp.dest("lib/yk-editor/src/assets/css"))
})


gulp.task("run", function () {
  gulp.watch('lib/yk-editor/src/assets/scss/**/*.scss', ['css']);
})


gulp.task("copy-css", function () {
  return gulp.src("lib/yk-editor/src/assets/css/*")
    .pipe(gulp.dest("dist/assets/css"));
})



gulp.task("default", ["css","run"]);

gulp.task("pre-copy", ["css"]);

gulp.task("build", ["pre-copy","copy-css"]);
