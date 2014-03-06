/// <reference path="../references.ts" />
module app {
	angular.module('app').controller('scoreListCtrl', ScoreListCtrl);
	export function ScoreListCtrl(
		$scope: IScoreListScope,
		scoreKeeperService: IScoreKeeperService,
		screenService: IScreenService) {

		$scope.players = scoreKeeperService.players;

		$scope.scoreKeeperService = scoreKeeperService;
		$scope.$watchCollection('scoreKeeperService.hands', function () {
			$scope.hands = scoreKeeperService.scoreTable()
		});

		$scope.isWin = function (hand) {
			return hand.handType === HandType.normal &&
				(<IHandScoreNormal>hand.score).win;
		};
		$scope.isSet = function (hand) {
			return hand.handType === HandType.normal &&
				!(<IHandScoreNormal>hand.score).win;
		};
		$scope.isPicker = function (hand, index) {
			return hand.handType === HandType.normal &&
				(<IHandScoreNormal>hand.score).pickerPlayerIndex === index;
		};
		$scope.isPartner = function (hand, index) {
			return hand.handType === HandType.normal &&
				(<IHandScoreNormal>hand.score).partnerPlayerIndex === index;
		};
		$scope.isOut = function (hand, index) {
			return hand.playerIndices.indexOf(index) === -1;
		};
		$scope.isNotableLead = function (hand, index) {
			return hand.leadPlayerIndex === index &&
				index !== automaticallyCalculatedLead(hand, $scope.players.length);
		}
		$scope.isLeasterPrimary = function (hand, index) {
			return hand.handType === HandType.leaster &&
				(<IHandScoreLeaster>hand.score).primaryPlayerIndex === index;
		};
		$scope.isLeasterSecondary = function (hand, index) {
			return hand.handType === HandType.leaster &&
				(<IHandScoreLeaster>hand.score).secondaryPlayerIndex === index;
		};
		$scope.isMisplayLoser = function (hand, index) {
			return hand.handType === HandType.misplay &&
				(<IHandScoreMisplay>hand.score).loserPlayerIndex === index;
		};
		$scope.addScore = function () {
			screenService.push('scoreHand', $scope.nextOutAndLead());
		};
		$scope.undoScore = function () {
			scoreKeeperService.removeLastHand();
		};
		$scope.hasAnyHands = function () {
			return $scope.hands.length > 0;
		};
		$scope.submitFinalScores = function () {
			navigator.notification.confirm('Submit scores for this game?',
				submitFinalScoresCallback,
				'Submit scores',
				['Submit', 'Cancel']);
		};
		$scope.nextOutAndLead = function () {
			var nextOut = calculateNextOut($scope.hands, $scope.players.length);
			var nextLead = calculateNextLead(nextOut, $scope.hands, $scope.players.length);

			return {
				outPlayers: nextOut,
				leadPlayerIndex: nextLead
			};
		}

		function submitFinalScoresCallback(button: number): void {
			if (button !== 1) return;
			scoreKeeperService.submitScores();
			screenService.replace('scoresSubmitted');
		}
	}
	function calculateNextOut(hands: IHand[], playerCount: number): number[] {
		if (hands.length === 0)
			return null;

		var playersOut = _.last(hands, 2).map(hand => missingIndices(hand.playerIndices, playerCount))

		if (playersOut.length === 1)
			return shiftIndices(playersOut[0], playerCount);

		if (_.isEqual(playersOut[1], playersOut[0]))
			return playersOut[1];

		return shiftIndices(playersOut[1], playerCount);
	}

	function calculateNextLead(nextOut: number[], hands: IHand[], playerCount: number): number {
		var lastLead = _.last(hands).leadPlayerIndex;
		for (
			var i = (lastLead + 1) % playerCount;
			i !== lastLead;
			i = (i + 1) % playerCount) {
			if (nextOut == null || nextOut.indexOf(i) === -1)
				return i;
		}
		return null;
	}

	function automaticallyCalculatedLead(hand: IScoreTableRow, playerCount: number): number {
		if (playerCount < 6)
			return null;
		var playersOut = missingIndices(hand.playerIndices, playerCount);
		if (!areIndicesCyclicallyContiguous(playersOut, playerCount))
			return null;
		var lastPlayerOut = playersOut.filter(i => playersOut.indexOf((i+1) % playerCount) === -1)[0];
		return (lastPlayerOut+1) % playerCount;
	}

	function missingIndices(indices: number[], indexBound: number): number[] {
		return _.difference(_.range(0, indexBound - 1), indices);
	}

	function shiftIndices(indices: number[], indexBound: number): number[] {
		if (!areIndicesCyclicallyContiguous(indices, indexBound))
			return null;
		return indices.map(i => (i+1) % indexBound);
	}

	function areIndicesCyclicallyContiguous(indices: number[], indexBound: number): boolean {
		var indicesWithoutPredecessorInList = indices.filter(i => indices.indexOf((i-1+indexBound) % indexBound) === -1);
		var indicesWithoutSuccessorInList = indices.filter(i => indices.indexOf((i+1) % indexBound) === -1);
		return indicesWithoutPredecessorInList.length === 1 &&
			indicesWithoutSuccessorInList.length === 1;
	}
}
