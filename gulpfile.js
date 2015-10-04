var gulp = require('gulp');
var plumber = require('gulp-plumber');

var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');

var webpack = require('gulp-webpack');
var named = require('vinyl-named');

var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

var webpack = require('gulp-webpack');
var named = require('vinyl-named');

var fs = require('fs');
var path = require('path');

var settings = require('./gulpfile_settings');

var getFolders = function (dir) {
	return fs.readdirSync(dir).filter(function (file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
};

gulp.task('compass', function(){
	gulp.src([settings.ui.css.files])
	.pipe(plumber())
	.pipe(compass({
		bundle_exec: true,
		config_file : 'config.rb',
		comments : false,
		css : settings.dest.css.dir,
		sass: settings.ui.css.dir
	}))
	.pipe(autoprefixer({
		browsers: ["> 0%"],
		cascade: false
	}))
	.pipe(gulp.dest(settings.dest.css.dir));
});

gulp.task('sprites', function () {
	// set target folders
	var folders = getFolders(settings.ui.img.dir + 'sprite');
	var timestamp = Date.now();

	// generate image & css files
	folders.map(function (folder) {
		var spriteData = gulp.src('sprite/' + folder + '/*.png', {cwd: settings.ui.img.dir})
			.pipe(spritesmith({
				imgName: 'sprite-' + folder + '.png',
				imgPath: '../' + settings.ui.img.dir + 'sprite/sprite-' + folder + '.png?' + timestamp,
				cssName: '_'+ folder + '.scss',
				algorithm: 'binary-tree',
				padding: 4,
				cssFormat: 'scss'
			}));

		spriteData.img.pipe(gulp.dest(settings.ui.img.dir + 'sprite'));
		spriteData.css.pipe(gulp.dest(settings.ui.css.dir + 'sprite/'));
	});
});

gulp.task('cssmin', function(){
	gulp.src(settings.dest.css.files)
	.pipe(plumber())
	.pipe(minify())
	.pipe(gulp.dest(settings.dest.css.dir));
});

gulp.task('jsmin', function(){
	gulp.src(settings.dest.js.files)
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest(settings.dest.js.dir));
});

gulp.task('webpack', function(){
	gulp.src(settings.ui.js.files)
	.pipe(named(function(file) {
		return file.relative.replace(/\.[^\.]+$/, '');
	}))
	.pipe(webpack({
		resolve: {
			modulesDirectories: ['node_modules', 'bower_components']
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader'
				}
			]
		}
	}))
	.pipe(gulp.dest(settings.dest.js.dir));
});

gulp.task('imgCopy', function(){
	gulp.src(settings.ui.img.files)
	.pipe(gulp.dest(settings.dest.img.dir));
});

gulp.task('watch', ['compass', 'webpack', 'imgCopy'], function(){
	gulp.watch(settings.ui.css.files, ['compass']);
	gulp.watch(settings.ui.js.files, ['webpack']);
	gulp.watch(settings.ui.img.files, ['imgCopy']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['compass', 'webpack', 'imgCopy', 'cssmin','jsmin']);