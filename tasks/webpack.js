var gulp = require('gulp');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var gulpif = require('gulp-if');
var minifyJs = require('gulp-uglify');
var plumber = require('gulp-plumber');
var rename = require("gulp-rename");

var config = require('../config');

var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

gulp.task('webpack', () => {
	gulp.src(config.js.watch + 'main.js')
			.pipe(plumber())
			.pipe(named((file) => {
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
							loader: 'babel',
							query: {
								presets: ['es2015', 'stage-0', 'react'],
								compact: false
							}
						},
						{
							test: /\app.css$/,
							loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
						}
					]
				},
				postcss: () => {
					return [
						require('autoprefixer'),
						require('precss')
					];
				},
				plugins: [
					new webpack.webpack.ResolverPlugin([
						new webpack.webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( "bower.json", ["main", ["main", "1"]] )
					])
				]
			}))
			.pipe(gulpif(args.minify === 'true', minifyJs()))
			.pipe(rename({basename: 'app'}))
			.pipe(gulp.dest(config.js.dest));
});