module.exports = (m) ->
	m.controller 'ScoresSubmittedCtrl', ($scope, screenService, scoreKeeperService) ->
		players = scoreKeeperService.players()
		lastHand = scoreKeeperService.hands().slice(-1)[0]

		$scope.finalScores = players.map (p) ->
			name: p.name
			score: lastHand.scores[p.name].value

		$scope.startNewGame = ->
			screenService.replace ''