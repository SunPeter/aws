/*jshint unused:true*/
'use strict';

var path = require('path'),
	gulp = require('gulp'),
	compass = require('gulp-compass'),
	browserSync = require("browser-sync"),
	spawn = require('child_process').spawn,
	node,
	noop = function() {};

gulp.task('server', function() {
	if (node) node.kill()
	node = spawn('node', ['index.js'], {
		stdio: 'inherit'
	}, function (err, res) {
	    console.log(err || res);
	})
	node.on('close', function(code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
})

gulp.task('compass', function() {
	gulp.src('./assets/sass/*.scss')
		.pipe(compass({
			config_file: './assets/config.rb',
			css: './assets/css',
			sass: './assets/sass'
		}))
		.on('error', function(error) {
	      console.error(error);
		  if (node) node.kill();
	    });
});

gulp.task("browser-sync", function() {
	var files = [
		"./assets/css/*.css",
		"./assets/js/*.js"
	]
	browserSync.init(files, {
		proxy: "localhost:8080"
	});
});

gulp.task("watch", function() {
	gulp.watch("./assets/sass/*", ["compass"])
    gulp.watch("./views/*", ["server"])
})
gulp.task('default', ['server', 'watch', 'browser-sync'], noop);
