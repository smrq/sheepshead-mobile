_ = require 'underscore'

module.exports = (m) ->
	m.controller 'ScoreListCtrl', ($scope, screenService, scoreKeeperService) ->

		$scope.players = ->
			scoreKeeperService.players()
		$scope.hands = ->
			scoreKeeperService.hands()
		$scope.addScore = ->
			screenService.push 'scoreHand', { whoWasOut: $scope.nextOut() }
		$scope.undoScore = ->
			scoreKeeperService.removeLastHand()
		$scope.showUndo = ->
			$scope.hands().length > 0

		$scope.nextOut = ->
			hands = $scope.hands()
			return null if hands.length is 0
			lastHand = hands.slice(-1)[0]
			lastOut = _.findObj lastHand.scores, (score) -> score.wasOut
			return null unless lastOut?
			players = $scope.players()
			indexOfLastOut = _.indexOf _.map(players, (p) -> p.name), lastOut
			indexOfNextOut = (indexOfLastOut + 1) % players.length
			return players[indexOfNextOut].name