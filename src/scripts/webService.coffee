module.exports = (m) ->
	m.factory 'webService', ($http) ->
		getNames: (value) ->
			$http.get remote('sheepshead.cgi'), params: { action: 'name-lookup', query: value }
				.then (result) -> result.data.names
		postScores: (players, hands) ->
			params = { playerCount: players.length }
			lastHand = hands.slice(-1)[0]
			for player, i in players
				params["player#{i}Name"] = player.name
				params["player#{i}Score"] = lastHand.scores[player.name].value
			$http.post remote('sheepshead.cgi'), params
