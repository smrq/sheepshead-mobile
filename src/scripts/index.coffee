angular = require 'angular'
attachFastclick = require('fastclick');

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

require('./selectPlayersCtrl')(m)
require('./scoreListCtrl')(m)
require('./scoreHandCtrl')(m)
require('./scoresSubmittedCtrl')(m)

require('./localStorageService')(m)
require('./scoreKeeperService')(m)
require('./screenService')(m)
require('./webService')(m)

if window.location.hash isnt '#/'
	m.run (localStorageService, scoreKeeperService) ->
		scoreKeeperServiceData = JSON.parse require('fs').readFileSync('2014-02-20.json')
		localStorageService.setObject 'scoreKeeperService', scoreKeeperServiceData
		scoreKeeperService.loadState()

document.addEventListener "deviceready", ->
	angular.bootstrap document, ['app']