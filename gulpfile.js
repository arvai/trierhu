var gulp = require('gulp');
var babel = require("gulp-babel");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var plugin = require('webpack');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var rev = require('gulp-rev');
var revdel = require('gulp-rev-delete-original');

var ENV   = argv.dev ? 'dev' : 'prod';
var isDev = (ENV === 'dev');
var isProd = (ENV === 'prod');

// Default task, full build process
gulp.task('default', ['bundle', 'sass', 'copy']);

// SASS build
gulp.task('sass', function() {
	return gulp.src('static/scss/*.scss')
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulpif(isDev, sourcemaps.write()))

		.pipe(concat('site.css'))
		.pipe(gulpif(isProd, rev()))
		.pipe(gulpif(isProd, revdel()))
		.pipe(gulp.dest('bin'))
});

// ES6 - JS build process
gulp.task("es6", function () {
  return gulp.src("static/js/*.js")
    .pipe(babel({
			presets: ['es2015'],
			plugins: ["transform-runtime","syntax-async-functions","transform-regenerator"]
		}))
	.pipe(gulp.dest("bin"));
});

// CREATE WEBPACK PLUGINS ARRAY
var webpackPugins = [];
// Set variable for the app
webpackPugins.push(new plugin.DefinePlugin({'process.env.NODE_ENV': '"'+ENV+'"'}));
// Uglify bundle on prod
webpackPugins.push(new plugin.optimize.UglifyJsPlugin());
// No duplicated dependencies
webpackPugins.push(new plugin.optimize.DedupePlugin());
// Only english locale for MomentJS
webpackPugins.push(new plugin.ContextReplacementPlugin(/moment[\/\\]locale$/, /(en-gb|hu|ru|hi)/));
// Provide fetch and promise polyfill from es6-promise and whatwg-fetch package
webpackPugins.push(new plugin.ProvidePlugin({
					'Promise': 'exports?global.Promise!es6-promise',
					'fetch': 'exports?self.fetch!whatwg-fetch'
				}));

// Create bundle - webpack
gulp.task('bundle', ['es6'], function() {
	return gulp.src('bin/index.js')
		.pipe(webpack({
			output: {
        		filename: "bundle.js"
			},
			plugins: webpackPugins
		}))
		.pipe(gulpif(isProd, rev()))
		.pipe(gulpif(isProd, revdel()))
		.pipe(gulp.dest('bin/'));
});

// Watcher task for css and js
gulp.task('watch', function() {
	gulp.watch('static/scss/*.scss', ['sass']);
	gulp.watch('static/js/*.js', ['bundle']);
});

// Copy static files to bin directory
gulp.task('copy', function() {
	gulp.src('./static/img/*.*')
    .pipe(gulp.dest('./bin'));
});