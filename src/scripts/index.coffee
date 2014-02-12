angular = require 'angular'
attachFastclick = require('fastclick');

require 'angular-animate'
require 'angular-bootstrap'
require 'angular-route'

attachFastclick document.body

m = angular.module 'app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'],
	($routeProvider, $locationProvider) ->
		$routeProvider
			.when '/',
				templateUrl: 'scoreList.html'
				controller: 'ScoreListCtrl'
			.when '/scoreHand',
				templateUrl: 'scoreHand.html'
				controller: 'ScoreHandCtrl'
			.otherwise
				redirectTo: '/'

require('./scoreListCtrl')(m)
require('./scoreHandCtrl')(m)

document.addEventListener "deviceready", ->
	angular.bootstrap document, ['app']