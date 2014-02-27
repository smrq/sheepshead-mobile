_ = require 'underscore'

module.exports = (m) ->
	m.factory 'webService', ($http) ->

		fixLeasterSchema = (hand) ->
			return hand unless hand.handType is 'leaster'
			hand = _.extend {}, hand
			hand.score = _.extend {}, hand.score
			hand.score.secondaryPlayerIndex ?= hand.score.primaryPlayerIndex
			return hand

		getNames: (value) ->
			$http.get remote('sheepshead.cgi'), params: { action: 'name-lookup', query: value }
				.then (result) -> result.data.names
		postScores: (players, hands) ->
			params =
				action: 'submit-hands'
			data =
				playerNames: players.map (p) -> p.name
				hands: (fixLeasterSchema hand for hand in hands) #stupid server schema design
			$http.post remote('sheepshead.cgi'), data, { params }
