/// <reference path="../references.ts" />
module app {
	angular.module('app').controller('mainCtrl', MainCtrl);

	export var Event = {
		selectPlayers: {
			startGame: "selectPlayers.startGame"
		},
		scoreList: {
			addScore: "scoreList.addScore",
			submitFinalScores: "scoreList.submitFinalScores"
		},
		scoreHand: {
			submitScore: "scoreHand.submitScore"
		},
		scoresSubmitted: {
			startNewGame: "scoresSubmitted.startNewGame"
		}
	};

	export function MainCtrl(
		$scope: ng.IScope,
		scoreKeeperService: IScoreKeeperService,
		screenService: IScreenService) {

		if (scoreKeeperService.hasSavedState()) {
			scoreKeeperService.loadState();
			screenService.replace('scoreList');
		}

		$scope.$on(Event.selectPlayers.startGame, function (event: ng.IAngularEvent, names: string[]) {
			scoreKeeperService.startGame(names);
			screenService.replace('scoreList');
		});

		$scope.$on(Event.scoreList.addScore, function (event: ng.IAngularEvent, parameters: any) {
			screenService.push('scoreHand', parameters);
		});

		$scope.$on(Event.scoreHand.submitScore, function (event: ng.IAngularEvent, hand: IHand) {
			scoreKeeperService.scoreHand(hand);
			screenService.pop();
		});

		$scope.$on(Event.scoreList.submitFinalScores, function (event: ng.IAngularEvent) {
			scoreKeeperService.submitScores();
			screenService.replace('scoresSubmitted');
		});

		$scope.$on(Event.scoresSubmitted.startNewGame, function (event: ng.IAngularEvent) {
			screenService.replace('');
		});
	}
}