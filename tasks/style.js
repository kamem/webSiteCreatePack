var gulp = require('gulp');
var plumber = require('gulp-plumber');

var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var cleanCSS = require('gulp-clean-css');

var postcss = require('gulp-postcss');

var config = require('../config');

var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

gulp.task('postcss', () => {
	gulp.src([config.css.watch + '/app.css'])
			.pipe(plumber())
			.pipe(postcss([
				require('precss'),
				require('postcss-assets')({
					loadPaths: ['img'],
					basePath: 'src/',
					cachebuster: true
				})
			]))
			.pipe(autoprefixer({
				browsers: ["> 0%"],
				cascade: false
			}))
			.pipe(gulpif(args.minify === 'true', cleanCSS({advanced: false})))
			.pipe(gulp.dest(config.css.dest));
});