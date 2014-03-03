/// <reference path="../references.ts" />
module app {
	angular.module('app').controller('scoreHandCtrl', ScoreHandCtrl);
	export function ScoreHandCtrl(
		$scope: app.IScoreHandScope,
		scoreKeeperService: app.IScoreKeeperService,
		screenService: app.IScreenService) {

		var handInfo = {
			outPlayers: <number[]>(screenService.data().outPlayers || []),
			doubler: false,
			handType: 'normal',
			normalScore: <app.IHandScoreNormal>{
				win: true,
				scoreTier: null,
				pickerPlayerIndex: null,
				partnerPlayerIndex: null
			},
			leasterScore: <app.IHandScoreLeaster>{
				primaryPlayerIndex: null,
				secondaryPlayerIndex: null
			},
			misplayScore: <app.IHandScoreMisplay>{
				loserPlayerIndex: null
			}
		}

		function setNotOut(index: number) {
			handInfo.outPlayers = _.without(handInfo.outPlayers, index);
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
		$scope.isNormalGame = function () {
			return handInfo.handType === 'normal';
		}
		$scope.isDoubler = function () {
			return handInfo.doubler;
		}
		$scope.toggleDoubler = function () {
			handInfo.doubler = !handInfo.doubler;
		}
		$scope.isLeaster = function () {
			return handInfo.handType === 'leaster';
		}
		$scope.toggleLeaster = function () {
			handInfo.handType = $scope.isLeaster() ? 'normal' : 'leaster';
		}
		$scope.isMisplay = function () {
			return handInfo.handType === 'misplay';
		}
		$scope.toggleMisplay = function () {
			handInfo.handType = $scope.isMisplay() ? 'normal' : 'misplay';
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
				if (playingPlayerCount() > 5)
					handInfo.outPlayers.shift();
				setNotPicker(index);
				setNotPartner(index);
				setNotLeasterPrimary(index);
				setNotLeasterSecondary(index);
				setNotMisplayLoser(index);
			}
		}
		$scope.isWin = function () {
			return handInfo.normalScore.win;
		}
		$scope.toggleWin = function () {
			handInfo.normalScore.win = !handInfo.normalScore.win;
		}
		$scope.isNoTricker = function () {
			return handInfo.normalScore.scoreTier === 'noTricker';
		}
		$scope.toggleNoTricker = function () {
			handInfo.normalScore.scoreTier = $scope.isNoTricker() ? null : 'noTricker';
		}
		$scope.isNoSchneider = function () {
			return handInfo.normalScore.scoreTier === 'noSchneider';
		}
		$scope.toggleNoSchneider = function () {
			handInfo.normalScore.scoreTier = $scope.isNoSchneider() ? null : 'noSchneider';
		}
		$scope.isSchneider = function () {
			return handInfo.normalScore.scoreTier === 'schneider';
		}
		$scope.toggleSchneider = function () {
			handInfo.normalScore.scoreTier = $scope.isSchneider() ? null : 'schneider';
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
			return playingPlayerCount() === 5 && (
				$scope.isNormalGame() && $scope.canSubmitNormalGame() ||
				$scope.isLeaster() && $scope.canSubmitLeaster() ||
				$scope.isMisplay() && $scope.canSubmitMisplay()
			);
		}
		$scope.submitScore = function () {
			scoreKeeperService.scoreHand({
				playerIndices: _.difference(_.range(0, $scope.players.length-1), handInfo.outPlayers),
				leadPlayerIndex: (handInfo.outPlayers[0] + 1) % $scope.players.length, // shit logic
				doubler: handInfo.doubler,
				handType: handInfo.handType,
				score: handInfo.handType === 'leaster' ? handInfo.leasterScore :
					handInfo.handType === 'misplay' ? handInfo.misplayScore :
					handInfo.normalScore
			});
			screenService.pop();
		}
	}
}