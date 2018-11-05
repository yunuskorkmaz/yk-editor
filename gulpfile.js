const gulp = require("gulp");
const sass = require("gulp-sass");


gulp.task('css', function () {
    return gulp.src("lib/yk-editor/src/assets/scss/yk-editor.scss")
        .pipe(sass())
        .pipe(gulp.dest("lib/yk-editor/src/assets/css"));
})


gulp.task("run", function () {
    gulp.watch('lib/yk-editor/src/assets/scss/**/*.scss', ['css']);
})


gulp.task("copy-css",function(){
    return gulp.src("lib/yk-editor/src/assets/css/*")
    .pipe(gulp.dest("dist/assets/css"));
})

gulp.task("copy-fonts", function () {
    return gulp.src("lib/yk-editor/src/assets/fonts/*")
        .pipe(gulp.dest("dist/assets/fonts"));
})

gulp.task("default", ['css', 'run']);

gulp.task("build", ["css","copy-css", "copy-fonts"]);
