var root = 'root';
var srcFiles = ['sass', 'es6', 'js', 'img' , 'css'];

var settings = (function(){
	var i  = {};
	srcFiles.forEach(function(name) {
		i[name] = {};
		i[name].name = name;
		i[name].dir = root + '/' + name + '/';
	});

	return i;
})();

settings.dest = {};
settings.dest.name = 'fix';
settings.dest.dir = root + '/' + settings.dest.name + '/';

settings.es6.files = settings.es6.dir + '**/*.js';
settings.js.files = settings.js.dir + '**/*.js';
settings.sass.files = settings.sass.dir + '**/*.scss';
settings.css.files = settings.css.dir + '**/*.css';

module.exports = settings;