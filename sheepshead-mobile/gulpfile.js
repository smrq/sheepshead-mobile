var concat = require('gulp-concat');
var connectLivereload = require('connect-livereload');
var exec = require('gulp-exec');
var express = require('express');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var httpProxy = require('http-proxy');
var jade = require('gulp-jade');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var open = require('gulp-open');
var path = require('path');
var typescript = require('gulp-tsc');
var watch = require('gulp-watch');

var BUILD_FOLDER = './phonegap-build/www/';
var EXPRESS_PORT = 4000;
var CONTENT_GLOB = 'src/res/**/*';
var STYLES_GLOB = 'src/styles/**/*.less';
var MARKUP_GLOB = 'src/markup/**/*.jade';
var VENDOR_GLOB = [
	'bower_components/angular/angular.js',
	'bower_components/angular-animate/angular-animate.js',
	'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
	'bower_components/angular-route/angular-route.js',
	'bower_components/fastclick/lib/fastclick.js',
	'bower_components/underscore/underscore.js'
];
var MAIN_SCRIPT = 'src/scripts/index.ts';
var SCRIPTS_GLOB = [
	'src/scripts/index.ts',
	'src/scripts/controllers/mainCtrl.ts',
	'src/scripts/**/*.ts'
];

var startExpress = function() {
	var proxy = httpProxy.createProxyServer({});
	var app = express();
	app.use(connectLivereload());
	app.get('/phonegap.js', function(req, res) {
		res.sendfile('./bower_components/phonegap-desktop/js/phonegap-desktop.js');
	});
	app.get('/debugdata.json', function(req, res) {
		res.sendfile('./bower_components/phonegap-desktop/debugdata.json');
	});
	app.get('/remote.js', function(req, res) {
		res.sendfile('./proxyRemote.js');
	});
	app.all('/sheepshead.cgi', function(req, res) {
		proxy.web(req, res, { target: 'http://sheepshead.overmangroup.com:80' });
	});
	app.use(express["static"](path.join(__dirname, BUILD_FOLDER)));
	app.listen(EXPRESS_PORT);
};

var content = function() {
	return gulp
		.src(CONTENT_GLOB)
		.pipe(gulp.dest(BUILD_FOLDER));
};

var styles = function() {
	return gulp
		.src(STYLES_GLOB)
		.pipe(less().on('error', gutil.log))
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(BUILD_FOLDER));
};

var vendor = function () {
	return gulp
		.src(VENDOR_GLOB)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(BUILD_FOLDER))
}

var scripts = function() {
	var tscOptions = {
		noImplicitAny: true,
		outDir: BUILD_FOLDER
	};
	return gulp
		.src(SCRIPTS_GLOB)
		.pipe(typescript(tscOptions).on('error', gutil.log))
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest(BUILD_FOLDER));
};

var markup = function() {
	return gulp.src(MARKUP_GLOB)
		.pipe(jade({ pretty: true }).on('error', gutil.log))
		.pipe(gulp.dest(BUILD_FOLDER));
};

gulp.task('content', content);
gulp.task('styles', styles);
gulp.task('vendor', vendor);
gulp.task('scripts', scripts);
gulp.task('markup', markup);
gulp.task('build', ['content', 'styles', 'vendor', 'scripts', 'markup']);

gulp.task('watch', ['build'], function() {
	livereload();
	gulp.watch(CONTENT_GLOB, function() {
		content().pipe(livereload());
	});
	gulp.watch(STYLES_GLOB, function() {
		styles().pipe(livereload());
	});
	gulp.watch(VENDOR_GLOB, function() {
		vendor().pipe(livereload());
	});
	gulp.watch(SCRIPTS_GLOB, function() {
		scripts().pipe(livereload());
	});
	gulp.watch(MARKUP_GLOB, function() {
		markup().pipe(livereload());
	});
});

gulp.task('browse', ['watch'], function() {
	startExpress();
	gulp.src(MAIN_SCRIPT).pipe(open('', {
		url: "http://localhost:" + EXPRESS_PORT + "/"
	}));
});

var phonegapCommand = function(cmd) {
	return exec("pushd phonegap-build && phonegap " + cmd + " && popd");
};

gulp.task('build-android', ['build'], function() {
	gulp.src(MAIN_SCRIPT).pipe(phonegapCommand('build android'));
});

gulp.task('run-android', ['build'], function() {
	gulp.src(MAIN_SCRIPT).pipe(phonegapCommand('run android'));
});

gulp.task('build-ios', ['build'], function() {
	gulp.src(MAIN_SCRIPT).pipe(phonegapCommand('build ios'));
});

gulp.task('run-ios', ['build'], function() {
	gulp.src(MAIN_SCRIPT).pipe(phonegapCommand('run ios'));
});

gulp.task('default', ['build']);
