var gulp = require('gulp');
var plumber = require('gulp-plumber');

var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');

var webpack = require('gulp-webpack');
var named = require('vinyl-named');

var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

var fs = require('fs');
var path = require('path');

var settings = require('./settings');

var getFolders = function (dir) {
	return fs.readdirSync(dir).filter(function (file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
};


//Compass
gulp.task('compass', function(){
	gulp.src([settings.sass.files])
	.pipe(plumber())
	.pipe(compass({
		bundle_exec: true,
		config_file : 'config.rb',
		comments : false,
		css : settings.css.dir,
		sass: settings.sass.dir
	}))
	.pipe(autoprefixer({
		browsers: ["> 0%"],
		cascade: false
	}))
	.pipe(gulp.dest(settings.css.dir));
});


// sprites
gulp.task('sprites', function () {
	// set target folders
	var folders = getFolders(settings.img.dir + 'sprite');
	var timestamp = Date.now();

	// generate image & css files
	folders.map(function (folder) {
		var spriteData = gulp.src('sprite/' + folder + '/*.png', {cwd: settings.img.dir})
			.pipe(spritesmith({
				imgName: 'sprite-' + folder + '.png',
				imgPath: '../' + settings.img.dir + 'sprite/sprite-' + folder + '.png?' + timestamp,
				cssName: '_'+ folder + '.scss',
				algorithm: 'binary-tree',
				padding: 4,
				cssFormat: 'scss'
			}));

		spriteData.img.pipe(gulp.dest(settings.img.dir + 'sprite'));
		spriteData.css.pipe(gulp.dest(settings.sass.dir + 'sprite/'));
	});
});

//CSS min
gulp.task('cssmin', function(){
	gulp.src(settings.css.files)
	.pipe(plumber())
	.pipe(minify())
	.pipe(gulp.dest(settings.dest.dir));
});

//JS min
gulp.task('jsmin', function(){
	gulp.src([settings.js.files, '!' + settings.js.dir + 'components/**/*.js'])
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest(settings.dest.dir));
});

//watch
gulp.task('watch', ['compass'], function(){
	gulp.watch(settings.sass.files, ['compass']);
});

//default
gulp.task('default', ['watch']);
//min
gulp.task('min', ['cssmin','jsmin']);