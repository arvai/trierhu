var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev-all');
var revdel = require('gulp-rev-delete-original');
var gulpif = require('gulp-if');
var webpack = require('webpack-stream');
var plugin = require('webpack');
var argv = require('yargs').argv;
var flatten = require('gulp-flatten');
var clean      = require('gulp-clean');

var ENV = argv.dev ? 'dev' : 'prod';
var isDev = (ENV === 'dev');
var buildProcess = [];

if (ENV === 'dev') {
	buildProcess = ['sass', 'assets', 'bundle'];
}
else {
	buildProcess = ['revision'];
}

// Default task, full build process.
gulp.task('default', buildProcess);

gulp.task('clean-sass', function () {
	return gulp.src('web/dist/**/*.css', {read: false})
		.pipe(clean());
});

gulp.task('clean-image', function () {
	return gulp.src(['web/dist/**/*.png', 'web/dist/**/*.jpg', 'web/dist/**/*.svg'], {read: false})
		.pipe(clean());
});

gulp.task('clean-script', function () {
	return gulp.src(['web/dist/**/*.js', 'static/build'], {read: false})
		.pipe(clean());
});

// SASS build.
gulp.task('sass', ['clean-sass'], function () {
	return gulp.src('static/scss/**/*.scss')
		.pipe(gulpif(isDev, sourcemaps.init()))
			.pipe(sass({outputStyle: 'compressed'}))
			.pipe(concat('site.css'))
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulp.dest('web/dist'))
});


// COPY ASSETS TO DIST
gulp.task('assets', ['clean-image'], function () {
	// @TODO I hope node_modules' css files won't overwrite each other... :) Fix it later.
	return gulp.src(['static/img/**/*.*', 'node_modules/**/*.css'])
		.pipe(flatten())
		.pipe(gulp.dest('web/dist'))
});

// CREATE WEBPACK PLUGINS ARRAY
var webpackPugins = [];
// Set variable for the app
webpackPugins.push(new plugin.DefinePlugin({'process.env.NODE_ENV': '"' + ENV + '"'}));
// Uglify bundle on prod
!isDev && webpackPugins.push(new plugin.optimize.UglifyJsPlugin());
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
gulp.task("es6", ['clean-script'], function () {
	return gulp.src('static/js/*.js')
		.pipe(babel({
			presets: ['es2015'],
			plugins: ["transform-runtime", "syntax-async-functions", "transform-regenerator"]
		}))
		.pipe(gulp.dest('static/build/compile'));
});

// Generate static file revisions and rev-manifest.json file.
gulp.task('revision', ['sass', 'assets', 'bundle'], function () {
	return gulp.src(['web/dist/**', '!web/dist/favicons/**'])
		.pipe(
			rev.revision(
				{
					includeFilesInManifest: ['.css', '.js', '.png', '.svg'],
				}
			)
		)
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
	gulp.watch('static/img/**/*.*', ['assets']);
});