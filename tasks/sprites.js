var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var config = require('../config');
var fs = require('fs');
var path = require('path');
var getFolders = (dir) => {
	return fs.readdirSync(dir).filter(function (file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
};

gulp.task('sprites', () => {
	// set target folders
	const folders = getFolders(config.img.watch + 'sprite');
	const timestamp = Date.now();

	// generate image & css files
	folders.map((folder) => {
		const spriteData = gulp.src('sprite/' + folder + '/*.png', {cwd: config.img.watch})
			.pipe(spritesmith({
				imgName: 'sprite-' + folder + '.png',
				imgPath: '/img/' + 'sprite/sprite-' + folder + '.png?' + timestamp,
				cssName: '_'+ folder + '.css',
				algorithm: 'binary-tree',
				padding: 4,
				cssFormat: 'css',
				cssTemplate: 'src/css/sprite/sprites_css.template.handlerbars'
			}));

		spriteData.img.pipe(gulp.dest(config.img.watch + 'sprite/'));
		spriteData.css.pipe(gulp.dest(config.css.watch + 'sprite/'));
		spriteData.img.pipe(gulp.dest(config.img.dest + 'sprite/'));
	});
});