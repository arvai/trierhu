var gulp = require('gulp');
var babel = require("gulp-babel");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var plugin = require('webpack');

gulp.task('default', ['bundle', 'sass']);

gulp.task('sass', function() {
	return gulp.src('src/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sourcemaps.write())
		.pipe(concat('site.css'))
		.pipe(gulp.dest('bin'))
});

gulp.task("es6", function () {
  return gulp.src("src/js/*.js")
    .pipe(babel({
			presets: ['es2015']
		}))
    .pipe(concat('es6.js'))
    .pipe(gulp.dest("bin"));
});


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
				new plugin.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
			]
		}))
		.pipe(gulp.dest('bin/'));
});