var gulp = require('gulp');
var babel = require("gulp-babel");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var plugin = require('webpack');

// Default task, full build process
gulp.task('default', ['bundle', 'sass', 'copy-static']);

// SASS build
gulp.task('sass', function() {
	return gulp.src('src/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sourcemaps.write())

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
gulp.task('copy-static', function() {
    gulp.src('./index.html')
    .pipe(gulp.dest('./bin'));

	gulp.src('./src/img/*.*')
    .pipe(gulp.dest('./bin'));
});