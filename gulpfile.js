var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var plumberNotifier = require('gulp-plumber-notifier');
var gulpif = require('gulp-if');
var sassGlob = require('gulp-sass-glob');
var sass = require('gulp-sass');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');
var htmlmin = require('gulp-htmlmin');
var config = require('./gulp/config');
var notify = require('gulp-notify');
var newer = require('gulp-newer');
var del = require('del');
var runSequence = require('run-sequence');
var purify = require('gulp-purifycss');

var isDist = false;
var reload = browserSync.reload;

gulp.task('scripts', () => {

    var dest = isDist ? config.js.distDest : config.js.dest;

    return gulp.src(config.js.src)
        .pipe(gulpif(!isDist, sourcemaps.init()))
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(gulpif(isDist, uglify()))
        .pipe(size({
            title: 'scripts',
            showFiles: true
        }))
        .pipe(gulpif(!isDist, sourcemaps.write()))
        .pipe(gulp.dest(dest));
});

gulp.task('sass', () => {

    var dest = isDist ? config.sass.distDest : config.sass.dest;

    return gulp.src(config.sass.src)
        .pipe(plumber())
        .pipe(plumberNotifier())
        .pipe(gulpif(!isDist, sourcemaps.init()))
        .pipe(sassGlob())
        .pipe(gulpif(isDist,
            sass({ outputStyle: 'compressed' }).on('error', sass.logError),
            sass.sync().on('error', sass.logError))
        )
        .pipe(gulpif(isDist,
            purify(config.purifyCss.target, config.purifyCss.options))
        )
        .pipe(size({
            title: 'sass',
            showFiles: true
        }))
        .pipe(gulpif(!isDist, sourcemaps.write()))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
});

gulp.task('pug-index', () => {

    var dest = isDist ? config.pug.distDestIndex : config.pug.destIndex;

    return gulp.src(config.pug.srcIndex)
        .pipe(plumber())
        .pipe(plumberNotifier())
        .pipe(pug({}))
        .pipe(gulpif(isDist, htmlmin(config.htmlmin)))
        .pipe(size({
            title: 'pug',
            showFiles: true
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('pug', () => {

    var dest = isDist ? config.pug.distDest : config.pug.dest;

    return gulp.src(config.pug.src)
        .pipe(plumber())
        .pipe(plumberNotifier())
        .pipe(newer({
            dest: dest,
            ext: '.html'
        }))
        .pipe(pug({
            locals: {}
        }))
        .on('error', notify.onError((err) => 'Error de pug:' + err))
        .pipe(gulpif(isDist, htmlmin(config.htmlmin)))
        .pipe(size({
            title: 'pug',
            showFiles: true
        }))
        .pipe(gulp.dest(dest))
});

// Delete the .tmp folder:
gulp.task('clean:tmp', function () {
    return del(['.tmp']);
});

// Delete the dist folder:
gulp.task('clean:dist', function () {
    return del(['dist']);
});

gulp.task('default', ['clean:tmp'], () => {
    isDist = false;

    return runSequence([ // Async
        'scripts',
        'sass',
        'pug-index',
        'pug'
    ],
        'sync');

});

gulp.task('build', ['clean:dist'], () => {
    isDist = true;

    return runSequence([ // Async
        'pug-index',
        'pug',
        'scripts',
        'sass'
    ]);

});

gulp.task('launch', () => {
    return runSequence('build', 'sync');
});

gulp.task('sync', () => {

    browserSync.init({
        server: {
            baseDir: isDist ? 'dist' : '.tmp',
            index: 'index.html',
        }
    });

    gulp.watch(['app/**/*.js'], ['scripts', reload]);
    gulp.watch(['app/**/*.scss'], ['sass', reload]);
    gulp.watch(['app/**/*.pug'], ['pug', reload]);
    gulp.watch(['app/index.pug'], ['pug-index', reload]);

});