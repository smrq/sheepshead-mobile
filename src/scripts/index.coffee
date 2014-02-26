angular = require 'angular'
attachFastclick = require 'fastclick'

require 'angular-animate'
require 'angular-bootstrap'
require 'angular-route'

require 'underscore'
require './underscoreExt'

unless inBrowser
	attachFastclick document.body

m = angular.module 'app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'],
	($routeProvider, $httpProvider) ->
		require('./setupRoutes')($routeProvider)
		require('./setupHttpProvider')($httpProvider)

require('./mainCtrl')(m)
require('./selectPlayersCtrl')(m)
require('./scoreListCtrl')(m)
require('./scoreHandCtrl')(m)
require('./scoresSubmittedCtrl')(m)

require('./scoreKeeperService')(m)
require('./screenService')(m)
require('./webService')(m)

window.testData =
	setup: ->
		localStorage.setItem 'scoreKeeperService', require('fs').readFileSync('2014-02-20.json')
	teardown: ->
		localStorage.removeItem 'scoreKeeperService'
	selectPlayers: ->
		scope = angular.element(document).scope().$$childHead
		scope.$apply ->
			scope.players = ['Jacob Buysse','Blake Adams','Ben Dixon','Greg Smith','Ezra McNichols','Anne Sechtig'].map (name) -> {name}

document.addEventListener "deviceready", ->
	angular.bootstrap document, ['app']