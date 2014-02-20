_ = require 'underscore'

module.exports = (m) ->
	m.controller 'SelectPlayersCtrl', ($scope, $location, webService, scoreKeeperService) ->
		$scope.players = ({name: ''} for i in [1..6])

		$scope.getNames = (value) -> webService.getNames value

		$scope.canSubmit = ->
			_.all $scope.players, (p) -> p.name.length > 0

		$scope.startGame = ->
			names = (player.name for player in $scope.players)
			scoreKeeperService.startGame names
			$location.path '/scoreList'
