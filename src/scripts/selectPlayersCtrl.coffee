_ = require 'underscore'

module.exports = (m) ->
	m.controller 'SelectPlayersCtrl', ($scope, $location, $http) ->
		$scope.players = []
		$scope.players.push { name: '' } for i in [1..6]

		$scope.canSubmit = ->
			_.all $scope.players, (p) -> p.name.length > 0

		$scope.startGame = ->
			$location.path '/scoreList'

		$scope.getNames = (value) ->
			$http.get('sheepshead.cgi', {params: { action: 'name-lookup', query: value }})
				.then (result) -> result.data.names
