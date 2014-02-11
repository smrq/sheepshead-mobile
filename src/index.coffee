angular = require 'angular'
_ = require 'underscore'
require 'angular-animate'
require 'angular-bootstrap'
require 'angular-route'

m = angular.module 'app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'],
	($routeProvider, $locationProvider) ->
		$routeProvider.when '/',
			templateUrl: 'scoreList.html'
			controller: 'ScoreListCtrl'
		$locationProvider.html5Mode true

require('scoreListCtrl')(m)