_ = require 'underscore'

module.exports = (m) ->
	m.factory 'scoreKeeperService', ($window, webService) ->
		abbreviate = (name) ->
			name.split ' '
				.map (w) -> w[0]
				.join ''
				.toUpperCase()

		calculatePointSpread = (scores) ->
			positivePointSpread = _.sum _.filter scores, (s) -> s > 0
			negativePointSpread = _.sum _.filter scores, (s) -> s < 0
			if positivePointSpread + negativePointSpread isnt 0
				throw 'Point spread did not match'
			positivePointSpread

		calculateHandScore = (previousScores, hand) ->
			winningShares = null
			losingShares = null
			pointsPaid = 1

			switch hand.handType
				when 'normal'
					offenseShares =
						if hand.score.pickerPlayerIndex is hand.score.partnerPlayerIndex
							_.repeat hand.score.pickerPlayerIndex, 4
						else
							_.repeat hand.score.pickerPlayerIndex, 2
								.concat hand.score.partnerPlayerIndex
					defenseShares = _.without hand.playerIndices, hand.score.pickerPlayerIndex, hand.score.partnerPlayerIndex

					if hand.score.win
						winningShares = offenseShares
						losingShares = defenseShares
					else
						winningShares = defenseShares
						losingShares = offenseShares
						pointsPaid *= 2

					switch hand.score.scoreTier
						when 'noSchneider' then pointsPaid *= 2
						when 'noTricker' then pointsPaid *= 3

				when 'leaster'
					winningShares =
						unless hand.score.secondaryPlayerIndex?
							_.repeat hand.score.primaryPlayerIndex, 4
						else
							_.repeat hand.score.primaryPlayerIndex, 2
								.concat hand.score.secondaryPlayerIndex
					losingShares = _.without hand.playerIndices, hand.score.primaryPlayerIndex, hand.score.secondaryPlayerIndex

				when 'misplay'
					losingShares = _.repeat hand.score.loserPlayerIndex, 4
					winningShares = _.without hand.playerIndices, hand.score.loserPlayerIndex

				else throw 'Unexpected hand type'

			if hand.doubler
				pointsPaid *= 2

			if winningShares.length isnt losingShares.length
				throw 'Payment count did not match'

			currentScores = (n for n in previousScores)
			for share in winningShares
				currentScores[share] += pointsPaid
			for share in losingShares
				currentScores[share] -= pointsPaid

			return currentScores

		return {
			players: []
			hands: []

			startGame: (names) ->
				@players = for name in names
					{ name: name, abbreviation: abbreviate name }
				@hands = []
				@saveState()

			scoreHand: (hand) ->
				@hands.push hand
				@saveState()

			removeLastHand: ->
				@hands.pop()
				@saveState()

			scoreTable: ->
				cumulativeScoresList = _.scan @hands, calculateHandScore, _.repeat 0, @players.length
				_.zipWith @hands, cumulativeScoresList, (hand, cumulativeScores) ->
					_.extend {}, hand, { cumulativeScores, pointSpread: calculatePointSpread cumulativeScores }

			finalScores: ->
				cumulativeScores = _.reduce @hands, calculateHandScore, _.repeat 0, @players.length
				{ cumulativeScores, pointSpread: calculatePointSpread cumulativeScores }

			saveState: ->
				$window.localStorage.setItem 'scoreKeeperService', JSON.stringify { @players, @hands }

			loadState: ->
				data = $window.localStorage.getItem 'scoreKeeperService'
				{ @players, @hands } = JSON.parse data if data?

			clearState: ->
				$window.localStorage.removeItem 'scoreKeeperService'

			hasSavedState: ->
				$window.localStorage.getItem('scoreKeeperService')?

			submitScores: ->
				webService.postScores @players, @hands
				@clearState()
		}
