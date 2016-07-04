/*jshint unused:true*/
'use strict';

var path = require('path'),
    gulp = require('gulp'),
    compass = require('gulp-compass'),
    browserSync=require("browser-sync"),
    noop = function () {};

gulp.task('compass', function () {
    gulp.src('./assets/sass/*.scss')
        .pipe(compass({
            config_file: './assets/config.rb',
            css: './assets/css',
            sass: './assets/sass'
        }));
});

gulp.task("browser-sync",function(){
	var files=[
	"./assets/css/*.css",
	"./assets/js/*.js"
	]
    browserSync.init(files, {
       proxy: "localhost:8080"
   });
});

gulp.task("watch",function(){
	gulp.watch("./assets/sass/*",["compass"])
})
gulp.task('default', ['watch', 'browser-sync'], noop);
