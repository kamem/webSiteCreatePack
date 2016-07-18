var gulp = require('gulp');
var gulpif = require('gulp-if');
var usemin = require('gulp-usemin');
var minifyJs = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var config = require('../config');

var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

gulp.task('usemin', () => {
	gulp.src(config.html.files)
			.pipe(usemin({
				js: [gulpif(args.minify === 'true', minifyJs()), 'concat'],
				css: [gulpif(args.minify === 'true', cleanCSS()), 'concat']
			}))
			.pipe(gulp.dest(config.html.dest));
});
