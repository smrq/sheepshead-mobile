_ = require 'underscore'

module.exports = (m) ->
	m.controller 'SelectPlayersCtrl', ($scope, $location, $http, scoreKeeperService) ->
		$scope.players = ({name: ''} for i in [1..6])

		$scope.getNames = (value) ->
			$http.get 'sheepshead.cgi', params: { action: 'name-lookup', query: value }
				.then (result) -> result.data.names

		$scope.canSubmit = ->
			_.all $scope.players, (p) -> p.name.length > 0

		$scope.startGame = ->
			names = (player.name for player in $scope.players)
			scoreKeeperService.startGame names
			$location.path '/scoreList'
