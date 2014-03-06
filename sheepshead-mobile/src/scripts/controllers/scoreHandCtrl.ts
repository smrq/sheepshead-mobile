/// <reference path="../references.ts" />
module app {
	angular.module('app').controller('scoreHandCtrl', ScoreHandCtrl);

	interface IHandInfo {
		outPlayers: number[];
		leadPlayerIndex: number;
		doubler: boolean;
		handType: HandType;
		normalScore: IHandScoreNormal;
		leasterScore: IHandScoreLeaster;
		misplayScore: IHandScoreMisplay;
	}

	function createHandInfo(data: any, playerCount: number): IHandInfo {
		var handInfo: IHandInfo = {
			outPlayers: [],
			leadPlayerIndex: null,
			doubler: false,
			handType: HandType.normal,
			normalScore: {
				win: true,
				scoreTier: null,
				pickerPlayerIndex: null,
				partnerPlayerIndex: null
			},
			leasterScore: {
				primaryPlayerIndex: null,
				secondaryPlayerIndex: null
			},
			misplayScore: {
				loserPlayerIndex: null
			}
		};

		if (data.playerIndices != null)
			handInfo.outPlayers = _.difference(_.range(0, playerCount-1), data.playerIndices);
		if (data.leadPlayerIndex != null)
			handInfo.leadPlayerIndex = data.leadPlayerIndex;
		if (data.doubler != null)
			handInfo.doubler = data.doubler;
		if (data.handType != null)
			handInfo.handType = data.handType;
		if (data.handType === HandType.normal && data.score != null) {
			if (data.score.win != null)
				handInfo.normalScore.win = data.score.win;
			if (data.score.scoreTier != null)
				handInfo.normalScore.scoreTier = data.score.scoreTier;
			if (data.score.pickerPlayerIndex != null)
				handInfo.normalScore.pickerPlayerIndex = data.score.pickerPlayerIndex;
			if (data.score.partnerPlayerIndex != null)
				handInfo.normalScore.partnerPlayerIndex = data.score.partnerPlayerIndex;
		}
		if (data.handType === HandType.leaster && data.score != null) {
			if (data.score.primaryPlayerIndex != null)
				handInfo.leasterScore.primaryPlayerIndex = data.score.primaryPlayerIndex;
			if (data.score.secondaryPlayerIndex != null)
				handInfo.leasterScore.secondaryPlayerIndex = data.score.secondaryPlayerIndex;
		}
		if (data.handType === HandType.misplay && data.score != null) {
			if (data.score.loserPlayerIndex != null)
				handInfo.misplayScore.loserPlayerIndex = data.score.loserPlayerIndex;
		}

		return handInfo;
	}

	export function ScoreHandCtrl(
		$scope: IScoreHandScope,
		scoreKeeperService: IScoreKeeperService,
		screenService: IScreenService) {

		var handInfo = createHandInfo(screenService.data(), scoreKeeperService.players.length);

		function setNotOut(index: number) {
			handInfo.outPlayers = _.without(handInfo.outPlayers, index);
		}
		function setNotInLead(index: number) {
			if (handInfo.leadPlayerIndex === index)
				handInfo.leadPlayerIndex = null;
		}
		function setNotPicker(index: number) {
			if (handInfo.normalScore.pickerPlayerIndex === index)
				handInfo.normalScore.pickerPlayerIndex = null;
		}
		function setNotPartner(index: number) {
			if (handInfo.normalScore.partnerPlayerIndex === index)
				handInfo.normalScore.partnerPlayerIndex = null;
		}
		function setNotLeasterPrimary(index: number) {
			if (handInfo.leasterScore.primaryPlayerIndex === index)
				handInfo.leasterScore.primaryPlayerIndex = null;
		}
		function setNotLeasterSecondary(index: number) {
			if (handInfo.leasterScore.secondaryPlayerIndex === index)
				handInfo.leasterScore.secondaryPlayerIndex = null;
		}
		function setNotMisplayLoser(index: number) {
			if (handInfo.misplayScore.loserPlayerIndex === index)
				handInfo.misplayScore.loserPlayerIndex = null;
		}
		function playingPlayerCount() {
			return $scope.players.length - handInfo.outPlayers.length;
		}

		$scope.players = scoreKeeperService.players;
		$scope.showOut = $scope.players.length > 5;
		$scope.isNormalGame = function () {
			return handInfo.handType === HandType.normal;
		}
		$scope.isDoubler = function () {
			return handInfo.doubler;
		}
		$scope.toggleDoubler = function () {
			handInfo.doubler = !handInfo.doubler;
		}
		$scope.isLeaster = function () {
			return handInfo.handType === HandType.leaster;
		}
		$scope.toggleLeaster = function () {
			handInfo.handType = $scope.isLeaster() ? HandType.normal : HandType.leaster;
		}
		$scope.isMisplay = function () {
			return handInfo.handType === HandType.misplay;
		}
		$scope.toggleMisplay = function () {
			handInfo.handType = $scope.isMisplay() ? HandType.normal : HandType.misplay;
		}
		$scope.isPicker = function (index: number) {
			return handInfo.normalScore.pickerPlayerIndex === index;
		}
		$scope.togglePicker = function (index: number) {
			if ($scope.isPicker(index)) {
				handInfo.normalScore.pickerPlayerIndex = null;
			} else {
				handInfo.normalScore.pickerPlayerIndex = index;
				setNotOut(index);
			}
		}
		$scope.isPartner = function (index: number) {
			return handInfo.normalScore.partnerPlayerIndex === index;
		}
		$scope.togglePartner = function (index: number) {
			if ($scope.isPartner(index)) {
				handInfo.normalScore.partnerPlayerIndex = null;
			} else {
				handInfo.normalScore.partnerPlayerIndex = index;
				setNotOut(index);
			}
		}
		$scope.isLeasterPrimary = function (index: number) {
			return handInfo.leasterScore.primaryPlayerIndex === index;
		}
		$scope.toggleLeasterPrimary = function (index: number) {
			if ($scope.isLeasterPrimary(index)) {
				handInfo.leasterScore.primaryPlayerIndex = null;
			} else {
				handInfo.leasterScore.primaryPlayerIndex = index;
				setNotOut(index);
			}
		}
		$scope.isLeasterSecondary = function (index: number) {
			return handInfo.leasterScore.secondaryPlayerIndex === index;
		}
		$scope.toggleLeasterSecondary = function (index: number) {
			if ($scope.isLeasterSecondary(index)) {
				handInfo.leasterScore.secondaryPlayerIndex = null;
			} else {
				handInfo.leasterScore.secondaryPlayerIndex = index;
				setNotOut(index);
			}
		}
		$scope.isMisplayLoser = function (index: number) {
			return handInfo.misplayScore.loserPlayerIndex === index;
		}
		$scope.toggleMisplayLoser = function (index: number) {
			if ($scope.isMisplayLoser(index)) {
				handInfo.misplayScore.loserPlayerIndex = null;
			} else {
				handInfo.misplayScore.loserPlayerIndex = index;
				setNotOut(index);
			}
		}
		$scope.isOut = function (index: number) {
			return handInfo.outPlayers.indexOf(index) >= 0;
		}
		$scope.toggleOut = function (index: number) {
			if ($scope.isOut(index)) {
				setNotOut(index);
			} else {
				handInfo.outPlayers.push(index);
				if (playingPlayerCount() < 5)
					handInfo.outPlayers.shift();
				setNotPicker(index);
				setNotPartner(index);
				setNotLeasterPrimary(index);
				setNotLeasterSecondary(index);
				setNotMisplayLoser(index);
				setNotInLead(index);
			}
		}
		$scope.isInLead = function (index: number) {
			return handInfo.leadPlayerIndex === index;
		}
		$scope.toggleInLead = function (index: number) {
			if ($scope.isInLead(index)) {
				handInfo.leadPlayerIndex = null
			}
			else {
				handInfo.leadPlayerIndex = index;
				setNotOut(index);
			}
		}
		$scope.isWin = function () {
			return handInfo.normalScore.win;
		}
		$scope.toggleWin = function () {
			handInfo.normalScore.win = !handInfo.normalScore.win;
		}
		$scope.isNoTricker = function () {
			return handInfo.normalScore.scoreTier === ScoreTier.noTricker;
		}
		$scope.toggleNoTricker = function () {
			handInfo.normalScore.scoreTier = $scope.isNoTricker() ? null : ScoreTier.noTricker;
		}
		$scope.isNoSchneider = function () {
			return handInfo.normalScore.scoreTier === ScoreTier.noSchneider;
		}
		$scope.toggleNoSchneider = function () {
			handInfo.normalScore.scoreTier = $scope.isNoSchneider() ? null : ScoreTier.noSchneider;
		}
		$scope.isSchneider = function () {
			return handInfo.normalScore.scoreTier === ScoreTier.schneider;
		}
		$scope.toggleSchneider = function () {
			handInfo.normalScore.scoreTier = $scope.isSchneider() ? null : ScoreTier.schneider;
		}
		$scope.canSubmitNormalGame = function () {
			return handInfo.normalScore.scoreTier != null &&
				handInfo.normalScore.pickerPlayerIndex != null &&
				handInfo.normalScore.partnerPlayerIndex != null &&
				handInfo.outPlayers.indexOf(handInfo.normalScore.pickerPlayerIndex) === -1 &&
				handInfo.outPlayers.indexOf(handInfo.normalScore.partnerPlayerIndex) === -1;
		}
		$scope.canSubmitLeaster = function () {
			return handInfo.leasterScore.primaryPlayerIndex != null &&
				handInfo.outPlayers.indexOf(handInfo.leasterScore.primaryPlayerIndex) === -1 &&
				handInfo.outPlayers.indexOf(handInfo.leasterScore.secondaryPlayerIndex) === -1;
		}
		$scope.canSubmitMisplay = function () {
			return handInfo.misplayScore.loserPlayerIndex != null &&
				handInfo.outPlayers.indexOf(handInfo.misplayScore.loserPlayerIndex) === -1;
		}
		$scope.canSubmit = function () {
			return playingPlayerCount() === 5 &&
				handInfo.leadPlayerIndex != null && (
				$scope.isNormalGame() && $scope.canSubmitNormalGame() ||
				$scope.isLeaster() && $scope.canSubmitLeaster() ||
				$scope.isMisplay() && $scope.canSubmitMisplay()
			);
		}
		$scope.submitScore = function () {
			var hand: IHand = {
				playerIndices: _.difference(_.range(0, $scope.players.length-1), handInfo.outPlayers),
				leadPlayerIndex: handInfo.leadPlayerIndex,
				doubler: handInfo.doubler,
				handType: handInfo.handType,
				score: handInfo.handType === HandType.leaster ? handInfo.leasterScore :
					handInfo.handType === HandType.misplay ? handInfo.misplayScore :
					handInfo.normalScore
			};
			$scope.$emit(Event.scoreHand.submitScore, hand);
		}
	}
}