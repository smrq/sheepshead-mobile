_ = require 'underscore'

module.exports = (m) ->
	m.controller 'ScoreListCtrl', ($scope, screenService, scoreKeeperService) ->
		$scope.players = ->
			scoreKeeperService.players()
		$scope.hands = ->
			scoreKeeperService.hands()
		$scope.addScore = ->
			screenService.push 'scoreHand', { out: $scope.nextOut() }

		$scope.nextOut = ->
			hands = $scope.hands()
			return null if hands.length is 0
			lastHand = hands.slice(-1)[0]
			scores = _.pairs lastHand.scores
			lastOut = _.find scores, ([name, score]) -> score.wasOut
			return null unless lastOut?
			players = $scope.players()
			indexOfLastOut = _.indexOf _.map(players, (p) -> p.name), lastOut[0]
			indexOfNextOut = (indexOfLastOut + 1) % players.length
			return players[indexOfNextOut].name