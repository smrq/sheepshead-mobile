module.exports = (m) ->
	m.factory 'webService', ($http) ->
		getNames: (value) ->
			$http.get remote('sheepshead.cgi'), params: { action: 'name-lookup', query: value }
				.then (result) -> result.data.names
		postScores: (players, hands) ->
			params =
				action: 'submit-hands'
			data =
				playerNames: players.map (p) -> p.name
				hands: hands
			$http.post remote('sheepshead.cgi'), data, { params }
