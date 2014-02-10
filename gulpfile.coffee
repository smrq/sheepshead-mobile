browserify = require 'gulp-browserify'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
connectLivereload = require 'connect-livereload'
exec = require 'gulp-exec'
express = require 'express'
fixSourceMaps = require 'gulp-fix-windows-source-maps'
gulp = require 'gulp'
gutil = require 'gulp-util'
htmlreplace = require 'gulp-html-replace'
jade = require 'gulp-jade'
less = require 'gulp-less'
livereload = require 'gulp-livereload'
open = require 'gulp-open'
path = require 'path'
rename = require 'gulp-rename'
watch = require 'gulp-watch'

BUILD_FOLDER = './phonegap-build/www/'
EXPRESS_PORT = 4000

startExpress = ->
	app = express()
	app.use connectLivereload()
	app.use express.static path.join __dirname, BUILD_FOLDER
	app.listen EXPRESS_PORT

styles = ->
	gulp.src 'src/*.less'
		.pipe less()
		.pipe concat 'bundle.css'
		.pipe gulp.dest BUILD_FOLDER

scripts = ->
	browserifyOpts =
		debug: true
		transform: ['coffeeify']
		extensions: ['.coffee']
		#shim:
		#	angular:
		#		path: 'bower_components/angular/angular.js'
		#		exports: 'angular'

	gulp.src './src/index.coffee', read: false
		.pipe browserify(browserifyOpts).on 'error', gutil.log
		.pipe rename 'bundle.js'
		.pipe fixSourceMaps()
		.pipe gulp.dest BUILD_FOLDER

markup = ->
	gulp.src './src/*.jade'
		.pipe jade pretty: true
		.pipe htmlreplace
			styles: 'bundle.css'
			scripts: 'bundle.js'
		.pipe gulp.dest BUILD_FOLDER

gulp.task 'styles', styles
gulp.task 'scripts', scripts
gulp.task 'markup', markup
gulp.task 'build', ['styles', 'scripts', 'markup']

gulp.task 'watch', ['build'], ->
	livereload()
	gulp.watch './src/*.less', -> styles().pipe livereload()
	gulp.watch './src/*.coffee', -> scripts().pipe livereload()
	gulp.watch './src/*.jade', -> markup().pipe livereload()

gulp.task 'browse', ['watch'], ->
	startExpress()
	gulp.src './src/index.jade'
		.pipe open '', url: "http://localhost:#{EXPRESS_PORT}/index.html"

gulp.task 'run-android', ['build'], ->
	gulp.src './src/index.jade'
		.pipe exec 'pushd phonegap-build && phonegap run android && popd'

gulp.task 'run-ios', ['build'], ->
	gulp.src './src/index.jade'
		.pipe exec 'pushd phonegap-build && phonegap run ios && popd'

gulp.task 'default', ['build']
