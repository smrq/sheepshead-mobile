_ = require 'underscore'

module.exports = (m) ->
	m.controller 'ScoreListCtrl', ($scope, screenService, scoreKeeperService) ->
		$scope.addScore = -> screenService.push 'scoreHand'
		$scope.players = -> scoreKeeperService.players()
		$scope.hands = -> scoreKeeperService.hands()