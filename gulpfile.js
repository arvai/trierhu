var gulp = require('gulp');
var babel = require("gulp-babel");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev-all');
var revdel = require('gulp-rev-delete-original');
var gulpif = require('gulp-if');
var webpack = require('webpack-stream');
var plugin = require('webpack');
var argv = require('yargs').argv;

var ENV = argv.dev ? 'dev' : 'prod';
var isDev = (ENV === 'dev');
var buildProcess = [];

if (ENV === 'dev') {
	buildProcess = ['sass', 'image', 'bundle'];
}
else {
	buildProcess = ['revision'];
}

// Default task, full build process.
gulp.task('default', buildProcess);

// SASS build.
gulp.task('sass', function () {
	return gulp.src('static/scss/**/*.scss')
		.pipe(gulpif(isDev, sourcemaps.init()))
			.pipe(sass({outputStyle: 'compressed'}))
			.pipe(concat('site.css'))
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulp.dest('web/dist'))
});

// SASS build with source map.
gulp.task('image', function () {
	return gulp.src('static/img/**/*.*')
		.pipe(gulp.dest('web/dist'))
});

// CREATE WEBPACK PLUGINS ARRAY
var webpackPugins = [];
// Set variable for the app
webpackPugins.push(new plugin.DefinePlugin({'process.env.NODE_ENV': '"' + ENV + '"'}));
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

// Create bundle - webpack.
gulp.task('bundle', ['es6'], function () {
	return gulp.src('static/build/compile/index.js')
		.pipe(webpack({
			output: {
				filename: "bundle.js"
			},
			plugins: webpackPugins
		}))
		.pipe(gulp.dest('web/dist'));
});

// ES6 - JS build process.
gulp.task("es6", function () {
	gulp.src('./static/js/vendor/*.js')
		.pipe(gulp.dest('web/dist'));

	return gulp.src('static/js/*.js')
		.pipe(babel({
			presets: ['es2015'],
			plugins: ["transform-runtime", "syntax-async-functions", "transform-regenerator"]
		}))
		.pipe(gulp.dest('static/build/compile'));
});

// Generate static file revisions and rev-manifest.json file.
gulp.task('revision', ['sass', 'image', 'bundle'], function () {
	return gulp.src('web/dist/**')
		.pipe(rev.revision({ includeFilesInManifest: ['.css', '.js', '.png', '.svg'] }))
		.pipe(revdel())
		.pipe(gulp.dest('web/dist'))
		.pipe(rev.versionFile())
		.pipe(gulp.dest('static/build'))
		.pipe(rev.manifestFile())
		.pipe(gulp.dest('static/build'))
});

// Watcher task for css and js.
gulp.task('watch', function () {
	gulp.watch('static/scss/**/*.scss', ['sass']);
	gulp.watch('static/js/**/*.js', ['bundle']);
	gulp.watch('static/img/**/*.*', ['image']);
});