_ = require 'underscore'

module.exports = (m) ->
	m.controller 'ScoreListCtrl', ($scope, $location, scoreKeeperService) ->
		$scope.addScore = ->
			$location.path '/scoreHand'
		$scope.players = -> scoreKeeperService.players()
		$scope.hands = -> scoreKeeperService.hands()