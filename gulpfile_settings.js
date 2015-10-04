var settings = {
	dest: {
		css: {dir: 'root/css/'},
		img: {dir: 'root/img/'},
		js: {dir: 'root/js/'}
	},
	ui: {
		css: {dir: 'ui/css/'},
		img: {dir: 'ui/img/'},
		js: {dir: 'ui/js/'}
	}
}

settings.dest.css.files = settings.dest.css.dir + '**/*.css';
settings.dest.js.files = settings.dest.js.dir + '**/*.js';

settings.ui.css.files = settings.ui.css.dir + '**/*.css';
settings.ui.js.files =  settings.ui.js.dir + 'main.js';
settings.ui.img.files =  settings.ui.img.dir + '**/*.png';

module.exports = settings;