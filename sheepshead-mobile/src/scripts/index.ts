/// <reference path="references.ts" />
module app {
	FastClick.attach(document.body);
	angular.module('app',
		['ngRoute', 'ngAnimate', 'ui.bootstrap'],
		function ($routeProvider: ng.route.IRouteProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'selectPlayers.html',
					controller: 'selectPlayersCtrl'
				}).when('/scoreList', {
					templateUrl: 'scoreList.html',
					controller: 'scoreListCtrl'
				}).when('/scoreHand', {
					templateUrl: 'scoreHand.html',
					controller: 'scoreHandCtrl'
				}).when('/scoresSubmitted', {
					templateUrl: 'scoresSubmitted.html',
					controller: 'scoresSubmittedCtrl'
				}).otherwise({
					redirectTo: '/'
				});
		});

	document.addEventListener('deviceready', function () {
		angular.bootstrap(document, ['app']);
	});
}