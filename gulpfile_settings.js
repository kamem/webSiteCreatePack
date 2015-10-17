var dest = 'root';
var watch = 'src';

var settings = {
	dest: {
		name: dest,
		html: {dir: dest + '/'},
		css: {dir: dest + '/css/'},
		img: {dir: dest + '/img/'},
		js: {dir: dest + '/js/'},
		font: {dir: dest + '/font/'}
	},
	watch: {
		name: watch,
		html: {dir: watch + '/'},
		css: {dir: watch + '/css/'},
		img: {dir: watch + '/img/'},
		js: {dir: watch + '/js/'},
		es6: {dir: watch + '/js/'},
		font: {dir: watch + '/font/'}
	}
};
settings.dest.css.files = settings.dest.css.dir + '**/*.css';
settings.dest.js.files = settings.dest.js.dir + '**/*.js';

settings.watch.html.files = [
	settings.watch.html.dir + '**/*.html',
	'!' + settings.watch.css.dir + '**/*.html',
	'!' + settings.watch.font.dir + '**/*.html'];
settings.watch.css.files = settings.watch.css.dir + '**/*.scss';
settings.watch.js.files =  settings.watch.js.dir + '**/*.js';
settings.watch.es6.files =  settings.watch.es6.dir + '**/*.jsx';
settings.watch.img.files =  settings.watch.img.dir + '**/*.png';
settings.watch.font.files =  settings.watch.font.dir + '**/*.{eot,ttf,woff}';

module.exports = settings;