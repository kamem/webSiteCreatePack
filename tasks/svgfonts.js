var gulp = require('gulp');
var rename = require("gulp-rename");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

var config = require('../config');

var fs = require('fs');
var path = require('path');
var getFolders = (dir) => {
	return fs.readdirSync(dir).filter(function (file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
};

gulp.task('svgfonts', () => {
	var folders = getFolders(config.font.watch);

	folders.map((folder) => {
		gulp.src(config.font.watch + folder + '/*.svg')
				.pipe(iconfont({
					fontName: folder
				}))
				.on('glyphs', (glyphs) => {
					var options = {
						glyphs: glyphs,
						fontName: folder,
						fontPath: '/font/',
						className: folder
					};
					gulp.src(config.font.watch + 'templates/css.css')
							.pipe(consolidate('lodash', options))
							.pipe(rename({basename: '_' + folder}))
							.pipe(gulp.dest(config.css.watch + '/font/'));
					gulp.src(config.font.watch + 'templates/fontlist.html')
							.pipe(consolidate('lodash', options))
							.pipe(rename({basename: folder + '_fontlist'}))
							.pipe(gulp.dest(config.css.watch + '/font/'));
				})
				.pipe(gulp.dest(config.font.watch))
				.pipe(gulp.dest(config.font.dest));
	});
});