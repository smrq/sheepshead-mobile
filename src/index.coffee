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

m.controller 'ScoreListCtrl', ($scope) ->
	$scope.addScore = ->
		console.log 'addScore()'

	$scope.players = [
		player: "Rebecca Vance"
		playerAbbreviation: "RV"
	,
		player: "Jacob Buysse"
		playerAbbreviation: "JB"
	,
		player: "Ben Dixon"
		playerAbbreviation: "BD"
	,
		player: "Jeremy Stangel"
		playerAbbreviation: "JS"
	,
		player: "Ezra McNichols"
		playerAbbreviation: "EM"
	,
		player: "Tracy Mueller"
		playerAbbreviation: "TM"
	]
	$scope.hands = [
		wasNotSet: true
		wasSet: false
		wasDoubler: false
		scores: [
			{ value:  1, wasPicker: false, wasPartner: true,  wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value:  2, wasPicker: true,  wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -1, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -1, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value:  0, wasPicker: false, wasPartner: false, wasOut: true,  wasLeaster: false, wasMisplay: false }
			{ value: -1, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
		]
		pointSpread: 2
	,
		wasNotSet: false
		wasSet: true
		wasDoubler: true
		scores: [
			{ value:  5, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value:  6, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -9, wasPicker: true,  wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value:  3, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -4, wasPicker: false, wasPartner: true,  wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -1, wasPicker: false, wasPartner: false, wasOut: true , wasLeaster: false, wasMisplay: false }
		]
		pointSpread: 2
	,
		wasNotSet: true
		wasSet: false
		wasDoubler: false
		scores: [
			{ value:  5, wasPicker: false, wasPartner: false, wasOut: true,  wasLeaster: false, wasMisplay: false }
			{ value:  6, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -9, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value:  3, wasPicker: true,  wasPartner: true,  wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -4, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -1, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
		]
		pointSpread: 2
	,
		wasNotSet: false
		wasSet: false
		wasDoubler: false
		scores: [
			{ value:  5, wasPicker: false, wasPartner: false, wasOut: true,  wasLeaster: false, wasMisplay: false }
			{ value:  6, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -9, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: true  }
			{ value:  3, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -4, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -1, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
		]
		pointSpread: 2
	,
		wasNotSet: false
		wasSet: false
		wasDoubler: false
		scores: [
			{ value:  5, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value:  6, wasPicker: false, wasPartner: false, wasOut: true,  wasLeaster: false, wasMisplay: false }
			{ value: -9, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value:  3, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: true,  wasMisplay: false }
			{ value: -4, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -1, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
		]
		pointSpread: 2
	,
		wasNotSet: false
		wasSet: false
		wasDoubler: false
		scores: [
			{ value:  50, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value:  60, wasPicker: false, wasPartner: false, wasOut: true,  wasLeaster: false, wasMisplay: false }
			{ value: -90, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value:  30, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: true,  wasMisplay: false }
			{ value: -40, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
			{ value: -10, wasPicker: false, wasPartner: false, wasOut: false, wasLeaster: false, wasMisplay: false }
		]
		pointSpread: 2
	]
	for h in $scope.hands
		$scope.hands.push _.extend {}, h
	for h in $scope.hands
		$scope.hands.push _.extend {}, h