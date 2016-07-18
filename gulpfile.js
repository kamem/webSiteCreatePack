var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./tasks', {recurse: true});

gulp.task('default', ['watch', 'webserver', 'livereload']);
gulp.task('build', ['webpack', 'postcss', 'imgCopy', 'fontCopy', 'usemin']);