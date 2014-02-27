angular = require 'angular'
attachFastclick = require 'fastclick'
_ = require 'underscore'

require 'angular-animate'
require 'angular-bootstrap'
require 'angular-route'
require './underscoreExt'

unless inBrowser
	attachFastclick document.body

m = angular.module 'app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'],
	($routeProvider, $httpProvider) ->
		require('./setupRoutes')($routeProvider)
		# require('./setupHttpProvider')($httpProvider)

require('./controllers/mainCtrl')(m)
require('./controllers/selectPlayersCtrl')(m)
require('./controllers/scoreListCtrl')(m)
require('./controllers/scoreHandCtrl')(m)
require('./controllers/scoresSubmittedCtrl')(m)

require('./services/scoreKeeperService')(m)
require('./services/screenService')(m)
require('./services/webService')(m)

window.testData =
	setup: ->
		localStorage.setItem 'scoreKeeperService', require('fs').readFileSync('test.json')
	teardown: ->
		localStorage.removeItem 'scoreKeeperService'
	selectPlayers: ->
		scope = angular.element(document).scope().$$childHead.$$childHead
		scope.$apply ->
			scope.players = ['Jacob Buysse','Blake Adams','Ben Dixon','Greg Smith','Ezra McNichols','Anne Sechtig'].map (name) -> {name}

window._ = _

document.addEventListener "deviceready", ->
	angular.bootstrap document, ['app']