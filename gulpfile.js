var gulp = require('gulp');
var plumber = require('gulp-plumber');

var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');

var postcss = require('gulp-postcss');

var webpack = require('gulp-webpack');
var named = require('vinyl-named');

var usemin = require('gulp-usemin');
var minifyJs = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var watch = require('gulp-watch');
var connect = require('gulp-connect');

var minimist = require('minimist');
var gulpif = require('gulp-if');

var rename = require("gulp-rename");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

var fs = require('fs');
var path = require('path');

var settings = require('./gulpfile_settings');

var args = minimist(process.argv.slice(2));

var isSscs = settings.watch.css.files.indexOf('scss') >= 0;

var getFolders = function (dir) {
	return fs.readdirSync(dir).filter(function (file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
};

gulp.task('compass', function(){
	if(!isSscs) return;
	gulp.src([settings.watch.css.files])
	.pipe(plumber())
	.pipe(compass({
		bundle_exec: true,
		config_file : 'config.rb',
		comments : false,
		css : settings.dest.css.dir,
		sass: settings.watch.css.dir
	}))
	.pipe(autoprefixer({
		browsers: ["> 0%"],
		cascade: false
	}))
	.pipe(gulpif(args.minify === 'true', minifyCss()))
	.pipe(gulp.dest(settings.dest.css.dir));
});

gulp.task('postcss', function () {
	if(isSscs) return;
	gulp.src([settings.watch.css.files])
	.pipe(plumber())
	.pipe(postcss([
		require('precss')
	]))
	.pipe(autoprefixer({
		browsers: ["> 0%"],
		cascade: false
	}))
	.pipe(gulp.dest(settings.dest.css.dir));
});

gulp.task('sprites', function () {
	// set target folders
	var folders = getFolders(settings.watch.img.dir + 'sprite');
	var timestamp = Date.now();

	// generate image & css files
	folders.map(function (folder) {
		var spriteData = gulp.src('sprite/' + folder + '/*.png', {cwd: settings.watch.img.dir})
			.pipe(spritesmith({
				imgName: 'sprite-' + folder + '.png',
				imgPath: '../' + settings.watch.img.dir + 'sprite/sprite-' + folder + '.png?' + timestamp,
				cssName: '_'+ folder + '.scss',
				algorithm: 'binary-tree',
				padding: 4,
				cssFormat: 'scss'
			}));

		spriteData.img.pipe(gulp.dest(settings.watch.img.dir + 'sprite'));
		spriteData.css.pipe(gulp.dest(settings.watch.css.dir + 'sprite/'));
		spriteData.img.pipe(gulp.dest(settings.dest.img.dir + 'sprite'));
	});
});


gulp.task('svgfonts', function(){
	var folders = getFolders(settings.watch.font.dir);
	var timestamp = Date.now();

	folders.map(function (folder) {
		gulp.src(settings.watch.font.dir + folder + '/*.svg')
		.pipe(iconfont({
			fontName: folder
		}))
		.on('glyphs', function(glyphs) {
			var options = {
				glyphs: glyphs,
				fontName: folder,
				fontPath: '../font/',
				className: folder
			};
			gulp.src(settings.watch.font.dir + 'templates/css.scss')
			.pipe(consolidate('lodash', options))
			.pipe(rename({basename: '_' + folder}))
			.pipe(gulp.dest(settings.watch.css.dir + '/font/'));
			gulp.src(settings.watch.font.dir + 'templates/fontlist.html')
			.pipe(consolidate('lodash', options))
			.pipe(rename({basename: folder + '_fontlist'}))
			.pipe(gulp.dest(settings.watch.css.dir + '/font/'));
		})
		.pipe(gulp.dest(settings.watch.font.dir))
		.pipe(gulp.dest(settings.dest.font.dir));
	});
});


gulp.task('webpack', function(){
	gulp.src(settings.watch.es6.files)
	.pipe(plumber())
	.pipe(named(function(file) {
		return file.relative.replace(/\.[^\.]+$/, '');
	}))
	.pipe(webpack({
		resolve: {
			modulesDirectories: ['node_modules', 'bower_components'],
			extensions: ['', '.js', '.jsx']
		},
		module: {
			loaders: [
				{
					test: /\.js||.jsx$/,
					loader: 'babel-loader'
				}
			]
		},
		plugins: [
			new webpack.webpack.ResolverPlugin([
				new webpack.webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( "bower.json", ["main", ["main", "1"]] )
			])
		]
	}))
	.pipe(gulpif(args.minify === 'true', minifyJs()))
	.pipe(gulp.dest(settings.dest.js.dir));
});

gulp.task('jsCopy', function(){
	gulp.src(settings.watch.js.files)
	.pipe(gulpif(args.minify === 'true', minifyJs()))
	.pipe(gulp.dest(settings.dest.js.dir));
});

gulp.task('imgCopy', function(){
	gulp.src(settings.watch.img.files)
	.pipe(gulp.dest(settings.dest.img.dir));
});

gulp.task('fontCopy', function(){
	gulp.src(settings.watch.font.files)
	.pipe(gulp.dest(settings.dest.font.dir));
});

gulp.task('usemin', function() {
	gulp.src(settings.watch.html.files)
	.pipe(usemin({
		js: [gulpif(args.minify === 'true', minifyJs()), 'concat'],
		css: [gulpif(args.minify === 'true', minifyJs()), 'concat']
	}))
	.pipe(gulp.dest(settings.dest.html.dir));
});



gulp.task('watch', ['compass', 'webpack', 'postcss',  'jsCopy', 'imgCopy', 'fontCopy', 'usemin'], function(){
	if(isSscs) gulp.watch(settings.watch.css.files, ['compass']);
	if(!isSscs) gulp.watch(settings.watch.css.files, ['postcss'])
	gulp.watch(settings.watch.es6.files, ['webpack']);
	gulp.watch(settings.watch.html.files, ['usemin']);
	gulp.watch(settings.watch.js.files, ['jsCopy']);
	gulp.watch(settings.watch.img.files, ['imgCopy']);
	gulp.watch(settings.watch.font.files, ['fontCopy']);
});

gulp.task('webserver', function() {
	connect.server({
		root: settings.dest.name,
		livereload: true,
		port: 8888
	});
});

gulp.task('livereload', function() {
	gulp.src(settings.dest.name + '/**/*.*')
	.pipe(watch(settings.dest.name + '/**/*.*'))
	.pipe(connect.reload());
});

gulp.task('default', ['watch', 'webserver', 'livereload']);
gulp.task('build', ['compass', 'webpack', 'postcss', 'jsCopy', 'imgCopy', 'fontCopy', 'usemin']);