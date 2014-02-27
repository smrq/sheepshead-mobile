module.exports = (m) ->
	m.controller 'ScoresSubmittedCtrl', ($scope, screenService, scoreKeeperService) ->
		players = scoreKeeperService.players
		finalScores = scoreKeeperService.finalScores()

		$scope.finalScores = _.zipWith players, finalScores.cumulativeScores, (p, s) ->
			name: p.name
			score: s

		$scope.startNewGame = ->
			screenService.replace ''