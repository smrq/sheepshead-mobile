module.exports = (m) ->
	m.factory 'scoreKeeperService', (localStorageService) ->
		players = []
		hands = []

		abbreviate = (name) ->
			name.split ' '
				.map (w) -> w[0]
				.join ''
				.toUpperCase()

		scoreForPlayer = (name, handInfo) ->
			score = scoreForPlayer_ name, handInfo
			if handInfo.wasDoubler
				score.dValue *= 2
			value = if hands.length is 0 then 0 else hands[hands.length-1].scores[name].value
			score.value = value + score.dValue
			return score

		scoreForPlayer_ = (name, handInfo) ->
			score = { dValue: 0, wasPicker: false, wasPartner: false, wasOut: false, wonLeaster: false, misplayed: false }

			if handInfo.whoWasOut is name
				score.wasOut = true
				return score

			if handInfo.wasMisplay
				if handInfo.whoMisplayed is name
					score.dValue = -4
					score.misplayed = true
				else
					score.dValue = 1
				return score

			if handInfo.wasLeaster
				if handInfo.whoWonLeaster is name
					score.dValue = 4
					score.wonLeaster = true
				else
					score.dValue = -1
				return score

			score.wasPicker = true if handInfo.picker is name
			score.wasPartner = true if handInfo.partner is name

			if handInfo.wasSet
				if handInfo.wasNoTrick
					if score.wasPicker and score.wasPartner
						score.dValue = -24
					else if score.wasPicker
						score.dValue = -12
					else if score.wasPartner
						score.dValue = -6
					else
						score.dValue = 6
				else if handInfo.wasNoSchneider
					if score.wasPicker and score.wasPartner
						score.dValue = -16
					else if score.wasPicker
						score.dValue = -8
					else if score.wasPartner
						score.dValue = -4
					else
						score.dValue = 4
				else
					if score.wasPicker and score.wasPartner
						score.dValue = -8
					else if score.wasPicker
						score.dValue = -4
					else if score.wasPartner
						score.dValue = -2
					else
						score.dValue = 2
			else
				if handInfo.wasNoTrick
					if score.wasPicker and score.wasPartner
						score.dValue = 12
					else if score.wasPicker
						score.dValue = 6
					else if score.wasPartner
						score.dValue = 3
					else
						score.dValue = -3
				else if handInfo.wasNoSchneider
					if score.wasPicker and score.wasPartner
						score.dValue = 8
					else if score.wasPicker
						score.dValue = 4
					else if score.wasPartner
						score.dValue = 2
					else
						score.dValue = -2
				else
					if score.wasPicker and score.wasPartner
						score.dValue = 4
					else if score.wasPicker
						score.dValue = 2
					else if score.wasPartner
						score.dValue = 1
					else
						score.dValue = -1

			return score

		calculatePointSpread = (scores) ->
			negative = 0
			positive = 0
			for name, score of scores
				if score.value > 0 then positive += score.value
				else negative -= score.value
			return positive if positive is negative
			throw 'ERROR: Point spread did not match up.'

		startGame: (names) ->
			players = for name in names
				{ name: name, abbreviation: abbreviate name }
			hands = []

		scoreHand: (handInfo) ->
			scores = {}
			for player in players
				scores[player.name] = scoreForPlayer player.name, handInfo
			hands.push
				scores: scores
				pointSpread: calculatePointSpread scores
				wasSet: handInfo.wasSet
				wasNotSet: not (handInfo.wasSet or handInfo.wasLeaster or handInfo.wasMisplay)
				wasDoubler: handInfo.wasDoubler

		removeLastHand: -> hands.pop()
		players: -> players
		hands: -> hands

		saveState: ->
			localStorageService.setObject 'scoreKeeperService', { players, hands }

		loadState: ->
			data = localStorageService.getObject 'scoreKeeperService'
			{ players, hands } = data if data?
