angular = require 'angular'
attachFastclick = require('fastclick');

require 'angular-animate'
require 'angular-bootstrap'
require 'angular-route'

require 'underscore'
require './underscoreExt'

unless inBrowser
	attachFastclick document.body

initData = {}
if window.location.hash isnt '#/'
	initData = JSON.parse require('fs').readFileSync('2014-02-20.json')

m = angular.module 'app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'],
	($routeProvider, $httpProvider) ->
		require('./setupRoutes')($routeProvider)
		require('./setupHttpProvider')($httpProvider)

require('./selectPlayersCtrl')(m)
require('./scoreListCtrl')(m)
require('./scoreHandCtrl')(m)
require('./scoresSubmittedCtrl')(m)

require('./scoreKeeperService')(m, initData)
require('./screenService')(m)
require('./webService')(m)

document.addEventListener "deviceready", ->
	angular.bootstrap document, ['app']