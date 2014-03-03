/// <reference path="../references.ts" />
import _ = require('underscore');

export = SelectPlayersCtrl;
class SelectPlayersCtrl {
	constructor(
		private $scope: app.ISelectPlayersScope,
		private scoreKeeperService: app.IScoreKeeperService,
		private screenService: app.IScreenService,
		private webService: app.IWebService) {

		$scope.players = _.repeat(() => ({ name: '' }), 6).map(f => f());
		$scope.getNames = function (value: string) {
			return webService.getNames(value);
		};
		$scope.canSubmit = function () {
			return _.all($scope.players, (p: { name: string }) => p.name.length > 0);
		};
		$scope.startGame = function () {
			var names = $scope.players.map((p) => p.name);
			scoreKeeperService.startGame(names);
			screenService.replace('scoreList');
		};
	}
}