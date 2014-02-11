angular = require 'angular'
require 'angular-animate'
require 'angular-bootstrap'
require 'angular-route'

m = angular.module 'app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'],
	($routeProvider, $locationProvider) ->
		$routeProvider.when '/',
			templateUrl: 'scoreList.html'
			controller: 'ScoreListCtrl'

require('./scoreListCtrl')(m)