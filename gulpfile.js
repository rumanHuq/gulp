var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify');

gulp.task ('pug' , function () {
    return gulp.src('./source/templates/index.pug')
        .pipe (pug())
        .pipe(gulp.dest('./www/')) ;
}) ; 

gulp.task ('js', function (){
    browserify ('./source/js/index')
        .bundle()
        .pipe(source('./www/js/index.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('.'));
}) ;

gulp.task('sass', function(){
    return gulp.src('./source/style/index.sass')
    	.pipe(sass({sourceComments: 'map'}))
    	.pipe(gulp.dest('./www/css/')) ; 
})

gulp.task ('watch', function (){
    gulp.watch('./source/templates/**/*.pug', ['pug']);
    gulp.watch('./source/js/**/*.js', ['js']);
    gulp.watch('./source/style/**/*.sass',['sass']);
});



gulp.task ('default', ['pug','js','sass', 'watch']);