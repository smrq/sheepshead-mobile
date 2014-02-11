module.exports = (m) ->
	m.controller 'ScoreHandCtrl', ($scope) ->
		$scope.players = [
			player: "Rebecca Vance"
			playerAbbreviation: "RV"
			wasPicker: false
			wasPartner: false
			wasOut: false
		,
			player: "Jacob Buysse"
			playerAbbreviation: "JB"
			wasPicker: false
			wasPartner: false
			wasOut: false
		,
			player: "Ben Dixon"
			playerAbbreviation: "BD"
			wasPicker: false
			wasPartner: false
			wasOut: false
		,
			player: "Jeremy Stangel"
			playerAbbreviation: "JS"
			wasPicker: false
			wasPartner: false
			wasOut: false
		,
			player: "Ezra McNichols"
			playerAbbreviation: "EM"
			wasPicker: false
			wasPartner: false
			wasOut: false
		,
			player: "Tracy Mueller"
			playerAbbreviation: "TM"
			wasPicker: false
			wasPartner: false
			wasOut: false
		]