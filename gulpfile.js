const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () => gulp.src('server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('server/build')));

gulp.task('automart', ['build', 'testServerJS'], function () {
    process.exit(0);
});
