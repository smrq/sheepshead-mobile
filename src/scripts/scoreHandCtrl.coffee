_ = require 'underscore'

module.exports = (m) ->
	m.controller 'ScoreHandCtrl', ($scope) ->
		$scope.wasDoubler = false
		$scope.wasLeaster = false
		$scope.wasMisplay = false
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

		$scope.wasNormalGame = ->
			not $scope.wasLeaster and not $scope.wasMisplay
		$scope.canSubmitNormalGame = ->
			_.filter($scope.players, (p) -> p.wasPicker).length is 1 and
			_.filter($scope.players, (p) -> p.wasPartner).length is 1 and
			_.filter($scope.players, (p) -> p.wasOut).length is 1
		$scope.canSubmitLeaster = ->
			_.filter($scope.players, (p) -> p.wasLeaster).length is 1
		$scope.canSubmitMisplay = ->
			_.filter($scope.players, (p) -> p.wasMisplay).length is 1
		$scope.canSubmit = ->
			$scope.wasNormalGame() and $scope.canSubmitNormalGame() or
			$scope.wasLeaster and $scope.canSubmitLeaster() or
			$scope.wasMisplay and $scope.canSubmitMisplay()