angular = require 'angular'
attachFastclick = require('fastclick');

require 'angular-animate'
require 'angular-bootstrap'
require 'angular-route'

require 'underscore'
require './underscoreExt'

attachFastclick document.body

initData = {}
if window.location.hash isnt '#/'
	initData = JSON.parse require('fs').readFileSync('2014-02-20.json')

m = angular.module 'app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'],
	($routeProvider) ->
		$routeProvider
			.when '/',
				templateUrl: 'selectPlayers.html'
				controller: 'SelectPlayersCtrl'
			.when '/scoreList',
				templateUrl: 'scoreList.html'
				controller: 'ScoreListCtrl'
			.when '/scoreHand',
				templateUrl: 'scoreHand.html'
				controller: 'ScoreHandCtrl'
			.otherwise
				redirectTo: '/'

require('./selectPlayersCtrl')(m)
require('./scoreListCtrl')(m)
require('./scoreHandCtrl')(m)

require('./scoreKeeperService')(m, initData)
require('./screenService')(m)
require('./webService')(m)

document.addEventListener "deviceready", ->
	angular.bootstrap document, ['app']