/// <reference path="../references.ts" />
module app {
	angular.module('app').controller('scoreListCtrl', ScoreListCtrl);
	export function ScoreListCtrl(
		$scope: app.IScoreListScope,
		scoreKeeperService: app.IScoreKeeperService,
		screenService: app.IScreenService) {

		$scope.players = scoreKeeperService.players;

		$scope.scoreKeeperService = scoreKeeperService;
		$scope.$watchCollection('scoreKeeperService.hands', function () {
			$scope.hands = scoreKeeperService.scoreTable()
		});

		$scope.isWin = function (hand: app.IScoreTableRow): boolean {
			return hand.handType === 'normal' &&
				(<app.IHandScoreNormal>hand.score).win;
		};
		$scope.isSet = function (hand: app.IScoreTableRow): boolean {
			return hand.handType === 'normal' &&
				!(<app.IHandScoreNormal>hand.score).win;
		};
		$scope.isPicker = function (hand: app.IScoreTableRow, index: number): boolean {
			return hand.handType === 'normal' &&
				(<app.IHandScoreNormal>hand.score).pickerPlayerIndex === index;
		};
		$scope.isPartner = function (hand: app.IScoreTableRow, index: number): boolean {
			return hand.handType === 'normal' &&
				(<app.IHandScoreNormal>hand.score).partnerPlayerIndex === index;
		};
		$scope.isOut = function (hand: app.IScoreTableRow, index: number): boolean {
			return hand.playerIndices.indexOf(index) === -1;
		};
		$scope.isLeasterPrimary = function (hand: app.IScoreTableRow, index: number): boolean {
			return hand.handType === 'leaster' &&
				(<app.IHandScoreLeaster>hand.score).primaryPlayerIndex === index;
		};
		$scope.isLeasterSecondary = function (hand: app.IScoreTableRow, index: number): boolean {
			return hand.handType === 'leaster' &&
				(<app.IHandScoreLeaster>hand.score).secondaryPlayerIndex === index;
		};
		$scope.isMisplayLoser = function (hand: app.IScoreTableRow, index: number): boolean {
			return hand.handType === 'misplay' &&
				(<app.IHandScoreMisplay>hand.score).loserPlayerIndex === index;
		};
		$scope.addScore = function (): void {
			screenService.push('scoreHand', { outPlayers: $scope.nextOut() });
		};
		$scope.undoScore = function (): void {
			scoreKeeperService.removeLastHand();
		};
		$scope.hasAnyHands = function (): boolean {
			return $scope.hands.length > 0;
		};
		$scope.submitFinalScores = function (): void {
			navigator.notification.confirm('Submit scores for this game?',
				submitFinalScoresCallback,
				'Submit scores',
				['Submit', 'Cancel']);
		};
		function submitFinalScoresCallback(button: number) {
			if (button !== 1) return;
			scoreKeeperService.submitScores();
			screenService.replace('scoresSubmitted');
		}
		$scope.nextOut = function (): number[]{
			if (!$scope.hasAnyHands()) return null;
			var lastHand = _.last($scope.hands);
			var lastOut = _.difference(_.range(0, $scope.players.length - 1), lastHand.playerIndices);
			if (lastOut.length !== 1) return null;
			return [(lastOut[0] + 1) % $scope.players.length];
		};
	}
}
