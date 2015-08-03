/* import gulp-module */
var gulp       = require('gulp'),
	webserver  = require('gulp-webserver'),
	concat     = require('gulp-concat'),
	concatcss  = require('gulp-concat-css');
	jshint     = require('gulp-jshint'),
	rename     = require('gulp-rename'),
	uglify     = require('gulp-uglify'),
	uglifycss  = require('gulp-uglifycss'),
	minifyhtml = require('gulp-minify-html'),
	imagemin   = require('gulp-imagemin'),
	pngquant   = require('imagemin-pngquant'),
	gulpif     = require('gulp-if'),
	livereload = require('gulp-livereload'),
	del        = require('del'),
	config     = require('./config.json');

/* default [ clean, script, style, watch ] */
gulp.task('default',['server', 'html', 'styles', 'scripts', 'watch']);

/* server */
gulp.task('server',function(){
	gulp.src(config.path.dist) 
		.pipe(webserver(config.path.dist));
});

/* clean [ html, js, css, images ] */
gulp.task('clean',function(){
	del([
		config.path.html.dest+'*',
		config.path.css.dest+'*',
		config.path.js.dest.libs+'*',
		config.path.js.dest.plugin+'*',
		config.path.js.dest.app+'*',
		//config.path.images.dest+'*'
	]);
});

/* html [ minify, rename ] */
gulp.task('html',function(){
	gulp.src(config.path.html.src)
		.pipe(gulpif(config.uglify.html, minifyhtml()))
		.pipe(gulpif(config.rename.html, rename(config.rename_option)))
		.pipe(gulp.dest(config.path.html.dest));
});

/* style [ concat, uglify, rename ] */
gulp.task('styles',function(){
	gulp.src(config.path.css.src)
		.pipe(gulpif(config.concat.styles, concatcss(config.path.css.result)))
		.pipe(gulpif(config.uglify.styles, uglifycss()))
		.pipe(gulpif(config.rename.styles, rename(config.rename_option)))
		.pipe(gulp.dest(config.path.css.dest));
});

/* scripts */
gulp.task('scripts',['js:libs','js:plugin','js:app']);

/* js:libs [ jshint, concat, uglify, rename ] */
gulp.task('js:libs',function(){
	gulp.src(config.path.js.src.libs)
		.pipe(gulpif(config.lint.scripts.libs, jshint()))
		.pipe(gulpif(config.lint.scripts.libs, jshint.reporter('jshint-stylish')))
		.pipe(gulpif(config.concat.scripts.libs,concat(config.path.js.result)))
		.pipe(gulpif(config.uglify.scripts.libs, uglify(config.uglify_option)))
		.pipe(gulpif(config.rename.scripts.libs, rename(config.rename_option)))
		.pipe(gulp.dest(config.path.js.dest.libs));
});

/* js:plugin [ jshint, concat, uglify, rename ] */
gulp.task('js:plugin',function(){
	gulp.src(config.path.js.src.plugin)
		.pipe(gulpif(config.lint.scripts.plugin, jshint()))
		.pipe(gulpif(config.lint.scripts.plugin, jshint.reporter('jshint-stylish')))
		.pipe(gulpif(config.concat.scripts.plugin,concat(config.path.js.result)))
		.pipe(gulpif(config.uglify.scripts.plugin, uglify(config.uglify_option)))
		.pipe(gulpif(config.rename.scripts.plugin, rename(config.rename_option)))
		.pipe(gulp.dest(config.path.js.dest.plugin));
});

/* js:app [ jshint, concat, uglify, rename ] */
gulp.task('js:app',function(){
	gulp.src([
			config.path.js.src.app+'app.js',
			config.path.js.src.app+'**/*.js',
		])
		.pipe(gulpif(config.lint.scripts.app, jshint()))
		.pipe(gulpif(config.lint.scripts.app, jshint.reporter('jshint-stylish')))
		.pipe(gulpif(config.concat.scripts.app,concat(config.path.js.result)))
		.pipe(gulpif(config.uglify.scripts.app, uglify(config.uglify_option)))
		.pipe(gulpif(config.rename.scripts.app, rename(config.rename_option)))
		.pipe(gulp.dest(config.path.js.dest.app));
});

/* images 
gulp.task('images',function(){
	gulp.src(config.path.images.src)
		.pipe(imagemin({
			progressive:true,
			svgoPlugins:[{removeViewBox:false}],
			use:[pngquant()]
		}))
		.pipe(gulp.dest(config.path.images.dest));
});
*/

/* livereload */
gulp.task('watch',function(){
	livereload.listen();
	gulp.watch(config.path.js.src.app+'**/*.js',['scripts']);
	gulp.watch(config.path.css.src,['styles']);
	gulp.watch(config.path.html.src,['html']);
	//gulp.watch(config.path.images.src,['images']);
	gulp.watch(config.path.dist+'**').on('change',livereload.changed);
});