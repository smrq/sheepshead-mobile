_ = require 'underscore'

module.exports = (m) ->
	m.controller 'ScoreListCtrl', ($scope, screenService, scoreKeeperService) ->

		$scope.scoreKeeperService = scoreKeeperService

		$scope.players = scoreKeeperService.players
		$scope.$watchCollection 'scoreKeeperService.hands', ->
			$scope.hands = scoreKeeperService.scoreTable()

		$scope.isWin = (hand) ->
			hand.handType is 'normal' and hand.score.win

		$scope.isSet = (hand) ->
			hand.handType is 'normal' and not hand.score.win

		$scope.isPicker = (hand, index) ->
			hand.handType is 'normal' and hand.score.pickerPlayerIndex is index

		$scope.isPartner = (hand, index) ->
			hand.handType is 'normal' and hand.score.partnerPlayerIndex is index

		$scope.isOut = (hand, index) ->
			index not in hand.playerIndices

		$scope.isLeasterPrimary = (hand, index) ->
			hand.handType is 'leaster' and hand.score.primaryPlayerIndex is index

		$scope.isLeasterSecondary = (hand, index) ->
			hand.handType is 'leaster' and hand.score.secondaryPlayerIndex is index

		$scope.isMisplayLoser = (hand, index) ->
			hand.handType is 'misplay' and hand.score.loserPlayerIndex is index

		$scope.addScore = ->
			screenService.push 'scoreHand', { outPlayers: $scope.nextOut() }

		$scope.undoScore = ->
			scoreKeeperService.removeLastHand()

		$scope.hasAnyHands = ->
			$scope.hands.length > 0

		$scope.submitFinalScores = ->
			navigator.notification.confirm 'Submit scores for this game?',
				submitFinalScoresCallback,
				'Submit scores',
				'Submit,Cancel'

		submitFinalScoresCallback = (button) ->
			return unless button is 1
			scoreKeeperService.submitScores()
			screenService.replace 'scoresSubmitted'

		$scope.nextOut = ->
			return null unless $scope.hasAnyHands()
			lastHand = $scope.hands.slice(-1)[0]
			lastOut = _.difference [0...$scope.players.length], lastHand.playerIndices
			return null unless lastOut.length is 1
			return [(lastOut[0] + 1) % $scope.players.length]
