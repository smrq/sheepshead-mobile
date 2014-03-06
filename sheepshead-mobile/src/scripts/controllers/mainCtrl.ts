/// <reference path="../references.ts" />
module app {
	angular.module('app').controller('mainCtrl', MainCtrl);

	export var Event = {
		selectPlayers: {
			startGame: "selectPlayers.startGame"
		},
		scoreList: {
			addScore: "scoreList.addScore",
			editScore: "scoreList.editScore",
			submitFinalScores: "scoreList.submitFinalScores"
		},
		scoreHand: {
			submitScore: "scoreHand.submitScore"
		},
		scoresSubmitted: {
			startNewGame: "scoresSubmitted.startNewGame"
		}
	};

	enum ScoreHandAction {
		add,
		edit
	}
	var scoreHandAction: ScoreHandAction = null;
	var editHandIndex: number = null;

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
			scoreHandAction = ScoreHandAction.add;
			screenService.push('scoreHand', parameters);
		});

		$scope.$on(Event.scoreList.editScore, function (event: ng.IAngularEvent, hand: IHand, index: number) {
			scoreHandAction = ScoreHandAction.edit;
			editHandIndex = index;
			screenService.push('scoreHand', hand);
		});

		$scope.$on(Event.scoreHand.submitScore, function (event: ng.IAngularEvent, hand: IHand) {
			switch (scoreHandAction) {
				case ScoreHandAction.add:
					scoreKeeperService.scoreHand(hand);
					break;
				case ScoreHandAction.edit:
					scoreKeeperService.updateHand(editHandIndex, hand);
					break;
			}
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