var dest = 'root';
var watch = 'src';

var settings = {
	dest: dest,
	watch: watch,
	html: {
		dest: dest + '/',
		watch: watch + '/',

	},
	css: {
		dest: dest + '/css/',
		watch: watch + '/css/'
	},
	img: {
		dest: dest + '/img/',
		watch: watch + '/img/'
	},
	js: {
		dest: dest + '/js/',
		watch: watch + '/js/'
	},
	font: {
		dest: dest + '/font/',
		watch: watch + '/font/'
	}
};

settings.html.files = [
	settings.html.watch + '**/*.html',
	'!' + settings.css.watch + '**/*.html',
	'!' + settings.font.watch + '**/*.html'];
settings.css.files = settings.css.watch + '**/*.css';
settings.js.files =  settings.js.watch + '**/*.js';
settings.img.files =  settings.img.watch + '**/*.{jpg,gif,png}';
settings.font.files =  settings.font.watch + '**/*.{eot,ttf,woff}';

module.exports = settings;