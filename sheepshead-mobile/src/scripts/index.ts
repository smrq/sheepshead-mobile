/// <reference path="references.ts" />
import fs = require('fs');
import angular = require('angular');
import attachFastclick = require('fastclick');
import _ = require('underscore');

import mainCtrl = require('./controllers/mainCtrl');
import scoreHandCtrl = require('./controllers/scoreHandCtrl');
import scoreListCtrl = require('./controllers/scoreListCtrl');
import scoresSubmittedCtrl = require('./controllers/scoresSubmittedCtrl');
import selectPlayersCtrl = require('./controllers/selectPlayersCtrl');

import scoreKeeperService = require('./services/scoreKeeperService');
import screenService = require('./services/screenService');
import webService = require('./services/webService');

declare function require(module: string);
require('angular-animate');
require('angular-bootstrap');
require('angular-route');
require('./underscoreExt');

attachFastclick(document.body);

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
	})
	.controller('mainCtrl', mainCtrl)
	.controller('scoreHandCtrl', scoreHandCtrl)
	.controller('scoreListCtrl', scoreListCtrl)
	.controller('scoresSubmittedCtrl', scoresSubmittedCtrl)
	.controller('selectPlayersCtrl', selectPlayersCtrl)
	.service('scoreKeeperService', scoreKeeperService)
	.service('screenService', screenService)
	.service('webService', webService);

interface WindowExt extends Window {
	testData: {
		setup: () => void;
		teardown: () => void;
		selectPlayers: () => void;
	};
	_: UnderscoreStatic;
}
declare var window: WindowExt;
window.testData = {
	setup: function () {
		localStorage.setItem('scoreKeeperService', fs.readFileSync('test.json'));
	},

	teardown: function () {
		localStorage.removeItem('scoreKeeperService');
	},

	selectPlayers: function () {
		var rootScope = <any>angular.element(document).scope();
		var scope = rootScope.$$childHead.$$childHead;
		scope.$apply(function () {
			scope.players = ['Jacob Buysse', 'Blake Adams', 'Ben Dixon', 'Greg Smith', 'Ezra McNichols', 'Anne Sechtig'].map(function (name) { return { name: name }; });
		});
	}
}
window._ = _;

document.addEventListener('deviceready', function () {
	angular.bootstrap(document, ['app']);
});