/// <reference path="../references.ts" />
module app {
	angular.module('app').controller('scoreListCtrl', ScoreListCtrl);
	export function ScoreListCtrl(
		$scope: IScoreListScope,
		scoreKeeperService: IScoreKeeperService) {

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
			$scope.$emit(Event.scoreList.addScore, parametersForNewHand($scope.hands, $scope.players.length));
		};
		$scope.editScore = function (index) {
			$scope.$emit(Event.scoreList.editScore, $scope.hands[index], index);
		}
		$scope.undoScore = function () {
			scoreKeeperService.removeLastHand();
		};
		$scope.hasAnyHands = function () {
			return $scope.hands.length > 0;
		};
		$scope.submitFinalScores = function () {
			navigator.notification.confirm('Submit scores for this game?',
				$scope.submitFinalScoresCallback,
				'Submit scores',
				['Submit', 'Cancel']);
		};
		$scope.submitFinalScoresCallback = function (button) {
			if (button !== 1) return;
			$scope.$emit(Event.scoreList.submitFinalScores);
		}
	}

	function parametersForNewHand(hands: IHand[], playerCount: number): IHand {
		var playerIndices = calculateNextPlayers(hands, playerCount);
		var leadPlayerIndex = calculateNextLead(playerIndices, hands, playerCount);
		return {
			playerIndices: playerIndices,
			leadPlayerIndex: leadPlayerIndex,
			doubler: null,
			handType: null,
			score: null
		};
	}

	function calculateNextPlayers(hands: IHand[], playerCount: number): number[] {
		if (hands.length === 0)
			return null;

		if (hands.length === 1)
			return shiftIndices(hands[0].playerIndices, playerCount);

		var lastTwoHands = _.last(hands, 2);
		if (_.isEqual(lastTwoHands[0].playerIndices, lastTwoHands[1].playerIndices))
			return lastTwoHands[1].playerIndices;

		return shiftIndices(lastTwoHands[1].playerIndices, playerCount);
	}

	function calculateNextLead(playerIndices: number[], hands: IHand[], playerCount: number): number {
		if (hands.length === 0)
			return null;
			
		var lastLead = _.last(hands).leadPlayerIndex;
		for (
			var i = (lastLead + 1) % playerCount;
			i !== lastLead;
			i = (i + 1) % playerCount) {
			if (playerIndices == null || playerIndices.indexOf(i) !== -1)
				return i;
		}
		return null;
	}

	function automaticallyCalculatedLead(hand: IScoreTableRow, playerCount: number): number {
		if (playerCount < 6)
			return null;
		var firstIndices = findIndicesMissingCyclicPredecessor(hand.playerIndices, playerCount);
		if (firstIndices.length !== 1)
			return null;
		return firstIndices[0];
	}

	function shiftIndices(indices: number[], indexBound: number): number[] {
		if (indices.length === indexBound)
			return indices;
		var firstIndices = findIndicesMissingCyclicPredecessor(indices, indexBound);
		if (firstIndices.length !== 1)
			return null;
		return indices.map(i => (i+1) % indexBound);
	}

	function findIndicesMissingCyclicPredecessor(indices: number[], indexBound: number): number[] {
		return indices.filter(i => indices.indexOf((i-1+indexBound) % indexBound) === -1);
	}
}
