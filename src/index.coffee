angular = require 'angular'
require 'angular-animate'
require 'angular-bootstrap'
require 'angular-route'

m = angular.module 'app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'],
	($routeProvider, $locationProvider) ->
		$routeProvider.when '/',
			templateUrl: 'scoreList.html'
			controller: 'ScoreListCtrl'
		$locationProvider.html5Mode true

m.controller 'ScoreListCtrl', ($scope) ->
	$scope.scores = {}

#document.addEventListener 'deviceready', ->
#	angular.bootstrap document, ['app']