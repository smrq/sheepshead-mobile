/// <reference path="../references.ts" />
import _ = require('underscore');

export = ScoresSubmittedCtrl;
class ScoresSubmittedCtrl {
	constructor(
		private $scope: app.IScoresSubmittedScope,
		private scoreKeeperService: app.IScoreKeeperService,
		private screenService: app.IScreenService) {

		var players = scoreKeeperService.players;
		var finalScores = scoreKeeperService.finalScores();

		$scope.finalScores = _.zipWith<{ name: string; score: number }>(
			(p, s) => ({ name: p.name, score: s }),
			players,
			finalScores.cumulativeScores);

		$scope.startNewGame = function () {
			screenService.replace('');
		};
	}
}