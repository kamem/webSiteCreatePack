var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

var config = require('../config');

gulp.task('webserver', () => {
	connect.server({
		root: config.dest,
		livereload: true,
		port: 8888
	});
});

gulp.task('livereload', () => {
	gulp.src(config.dest + '/**/*.*')
			.pipe(watch(config.dest + '/**/*.*'))
			.pipe(connect.reload());
});