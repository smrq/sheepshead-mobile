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
ANY_GLOB =     'src/*'
CONTENT_GLOB = 'src/**/*.png'
STYLES_GLOB =  'src/*.less'
SCRIPTS_GLOB = 'src/*.coffee'
MARKUP_GLOB =  'src/*.jade'
MAIN_SCRIPT =  'src/index.coffee'

startExpress = ->
	app = express()
	app.use connectLivereload()
	app.get '/phonegap.js', (req, res) -> res.sendfile './bower_components/phonegap-desktop/js/phonegap-desktop.js'
	app.get '/debugdata.json', (req, res) -> res.sendfile './bower_components/phonegap-desktop/debugdata.json'
	app.use express.static path.join __dirname, BUILD_FOLDER
	app.listen EXPRESS_PORT

content = ->
	gulp.src CONTENT_GLOB
		.pipe gulp.dest BUILD_FOLDER

styles = ->
	gulp.src STYLES_GLOB
		.pipe less()
		.pipe concat 'bundle.css'
		.pipe gulp.dest BUILD_FOLDER

scripts = ->
	browserifyOpts =
		debug: true
		transform: ['coffeeify']
		extensions: ['.coffee']
		shim:
			'angular':
				path: 'bower_components/angular/angular.js'
				exports: 'angular'
			'angular-animate':
				path: 'bower_components/angular-animate/angular-animate.js'
				exports: 'angular'
			'angular-bootstrap':
				path: 'bower_components/angular-bootstrap/ui-bootstrap.js'
				exports: 'angular'
			'angular-route':
				path: 'bower_components/angular-route/angular-route.js'
				exports: 'angular'

	gulp.src MAIN_SCRIPT, read: false
		.pipe browserify(browserifyOpts).on 'error', gutil.log
		.pipe rename 'bundle.js'
		.pipe fixSourceMaps()
		.pipe gulp.dest BUILD_FOLDER

markup = ->
	gulp.src MARKUP_GLOB
		.pipe jade pretty: true
		.pipe htmlreplace
			styles: 'bundle.css'
			scripts: 'bundle.js'
		.pipe gulp.dest BUILD_FOLDER

gulp.task 'content', content
gulp.task 'styles', styles
gulp.task 'scripts', scripts
gulp.task 'markup', markup
gulp.task 'build', ['content', 'styles', 'scripts', 'markup']

gulp.task 'watch', ['build'], ->
	livereload()
	gulp.watch CONTENT_GLOB, -> content().pipe livereload()
	gulp.watch STYLES_GLOB,  -> styles().pipe  livereload()
	gulp.watch SCRIPTS_GLOB, -> scripts().pipe livereload()
	gulp.watch MARKUP_GLOB,  -> markup().pipe  livereload()

gulp.task 'browse', ['watch'], ->
	startExpress()
	gulp.src ANY_GLOB
		.pipe open '', url: "http://localhost:#{EXPRESS_PORT}/"

gulp.task 'run-android', ['build'], ->
	gulp.src ANY_GLOB
		.pipe exec 'pushd phonegap-build && phonegap run android && popd'

gulp.task 'run-ios', ['build'], ->
	gulp.src ANY_GLOB
		.pipe exec 'pushd phonegap-build && phonegap run ios && popd'

gulp.task 'default', ['build']
