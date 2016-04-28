var gulp = require('gulp');
var babel = require("gulp-babel");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var plugin = require('webpack');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;

var ENV = argv.dev ? 'dev' : 'prod';

// Default task, full build process
gulp.task('default', ['bundle', 'sass', 'copy']);

// SASS build
gulp.task('sass', function() {
	return gulp.src('src/scss/*.scss')
		.pipe(gulpif( argv.dev, sourcemaps.init()))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulpif(argv.dev, sourcemaps.write()))

		.pipe(concat('site.css'))
		.pipe(gulp.dest('bin'))
});

// ES6 - JS build process
gulp.task("es6", function () {
  return gulp.src("src/js/*.js")
    .pipe(babel({
			presets: ['es2015']
		}))
    .pipe(concat('es6.js'))
    .pipe(gulp.dest("bin"));
});

// Create bundle - webpack
gulp.task('bundle', ['es6'], function() {
	return gulp.src('bin/es6.js')
		.pipe(webpack({
			output: {
        		filename: "bundle.js"
			},
			plugins: [
				// Provide fetch and promise polyfill from es6-promise and whatwg-fetch package
				new plugin.ProvidePlugin({
					'Promise': 'es6-promise',
					'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
				}),
				// Set variable for the app
				new plugin.DefinePlugin({'process.env.NODE_ENV': '"'+ENV+'"'}),
				// Uglify bundle
				new plugin.optimize.UglifyJsPlugin(),
				// Only english locale for MomentJS
				new plugin.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/)
			]
		}))
		.pipe(gulp.dest('bin/'));
});

// Watcher task for css and js
gulp.task('watch', function() {
	gulp.watch('src/scss/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['bundle']);
});

// Copy static files to bin directory
gulp.task('copy', function() {
    gulp.src('./index.html')
    .pipe(gulp.dest('./bin'));

	gulp.src('./src/img/*.*')
    .pipe(gulp.dest('./bin'));

	gulp.src('./mobiliteit/*.*')
    .pipe(gulp.dest('./mobiliteit'));
});