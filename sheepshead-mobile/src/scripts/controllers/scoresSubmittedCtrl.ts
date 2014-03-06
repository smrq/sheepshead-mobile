/// <reference path="../references.ts" />
module app {
	angular.module('app').controller('scoresSubmittedCtrl', ScoresSubmittedCtrl);
	export function ScoresSubmittedCtrl(
		$scope: app.IScoresSubmittedScope,
		scoreKeeperService: app.IScoreKeeperService) {

		var players = scoreKeeperService.players;
		var finalScores = scoreKeeperService.finalScores();

		$scope.finalScores = _.zipWith<{ name: string; score: number }>(
			(p, s) => ({ name: p.name, score: s }),
			players,
			finalScores.cumulativeScores);

		$scope.startNewGame = function () {
			$scope.$emit(Event.scoresSubmitted.startNewGame);
		};
	}
}