var gulp = require('gulp');
var minifyJs = require('gulp-uglify');
var minimist = require('minimist');
var gulpif = require('gulp-if');

var config = require('../config');

var args = minimist(process.argv.slice(2));

gulp.task('jsCopy', () => {
	gulp.src(config.js.files)
			.pipe(gulpif(args.minify === 'true', minifyJs()))
			.pipe(gulp.dest(config.js.dest));
});

gulp.task('imgCopy', () => {
	gulp.src(config.img.files)
			.pipe(gulp.dest(config.img.dest));
});

gulp.task('fontCopy', () => {
	gulp.src(config.font.files)
			.pipe(gulp.dest(config.font.dest));
});