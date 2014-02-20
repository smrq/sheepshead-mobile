_ = require 'underscore'

module.exports = (m) ->
	m.controller 'ScoreHandCtrl', ($scope, $location, scoreKeeperService) ->
		$scope.handInfo =
			whoWasOut: null
			wasMisplay: false
			whoMisplayed: null
			wasLeaster: false
			whoWonLeaster: null
			wasDoubler: false
			picker: null
			partner: null
			wasSet: false
			wasNoTrick: false
			wasNoSchneider: false

		$scope.players = -> scoreKeeperService.players()

		$scope.toggleWasDoubler = ->
			$scope.handInfo.wasDoubler = not $scope.handInfo.wasDoubler

		$scope.toggleWasLeaster = ->
			$scope.handInfo.wasLeaster = not $scope.handInfo.wasLeaster
			if $scope.handInfo.wasLeaster
				$scope.handInfo.wasMisplay = false

		$scope.toggleWasMisplay = ->
			$scope.handInfo.wasMisplay = not $scope.handInfo.wasMisplay
			if $scope.handInfo.wasMisplay
				$scope.handInfo.wasLeaster = false

		$scope.togglePicker = (name) ->
			if $scope.handInfo.picker is name
				$scope.handInfo.picker = null
			else
				$scope.handInfo.picker = name
				$scope.handInfo.whoWasOut = null if $scope.handInfo.whoWasOut is name

		$scope.togglePartner = (name) ->
			if $scope.handInfo.partner is name
				$scope.handInfo.partner = null
			else
				$scope.handInfo.partner = name
				$scope.handInfo.whoWasOut = null if $scope.handInfo.whoWasOut is name

		$scope.toggleLeasterWinner = (name) ->
			if $scope.handInfo.whoWonLeaster is name
				$scope.handInfo.whoWonLeaster = null
			else
				$scope.handInfo.whoWonLeaster = name
				$scope.handInfo.whoWasOut = null if $scope.handInfo.whoWasOut is name

		$scope.toggleMisplayer = (name) ->
			if $scope.handInfo.whoMisplayed is name
				$scope.handInfo.whoMisplayed = null
			else
				$scope.handInfo.whoMisplayed = name
				$scope.handInfo.whoWasOut = null if $scope.handInfo.whoWasOut is name

		$scope.toggleOut = (name) ->
			if $scope.handInfo.whoWasOut is name
				$scope.handInfo.whoWasOut = null
			else
				$scope.handInfo.whoWasOut = name
				$scope.handInfo.picker = null if $scope.handInfo.picker is name
				$scope.handInfo.partner = null if $scope.handInfo.partner is name
				$scope.handInfo.whoWonLeaster = null if $scope.handInfo.whoWonLeaster is name
				$scope.handInfo.whoMisplayed = null if $scope.handInfo.whoMisplayed is name

		$scope.toggleSet = ->
			$scope.handInfo.wasSet = not $scope.handInfo.wasSet

		$scope.setNoTrick = ->
			$scope.handInfo.wasNoTrick = true
			$scope.handInfo.wasNoSchneider = false

		$scope.setNoSchneider = ->
			$scope.handInfo.wasNoSchneider = true
			$scope.handInfo.wasNoTrick = false

		$scope.setSchneider = ->
			$scope.handInfo.wasNoTrick = false
			$scope.handInfo.wasNoSchneider = false

		$scope.wasNormalGame = ->
			not $scope.handInfo.wasLeaster and not $scope.handInfo.wasMisplay

		$scope.wasSchneider = ->
			not $scope.handInfo.wasNoSchneider and not $scope.handInfo.wasNoTrick

		$scope.canSubmitNormalGame = ->
			$scope.handInfo.picker? and
			$scope.handInfo.partner? and
			$scope.handInfo.whoWasOut? and
			$scope.handInfo.whoWasOut isnt $scope.handInfo.picker and
			$scope.handInfo.whoWasOut isnt $scope.handInfo.partner

		$scope.canSubmitLeaster = ->
			$scope.handInfo.whoWonLeaster? and
			$scope.handInfo.whoWasOut? and
			$scope.handInfo.whoWasOut isnt $scope.handInfo.whoWonLeaster

		$scope.canSubmitMisplay = ->
			$scope.handInfo.whoMisplayed? and
			$scope.handInfo.whoWasOut? and
			$scope.handInfo.whoWasOut isnt $scope.handInfo.whoMisplayed

		$scope.canSubmit = ->
			$scope.wasNormalGame() and $scope.canSubmitNormalGame() or
			$scope.handInfo.wasLeaster and $scope.canSubmitLeaster() or
			$scope.handInfo.wasMisplay and $scope.canSubmitMisplay()

		$scope.submitScore = ->
			finalize $scope.handInfo
			scoreKeeperService.scoreHand $scope.handInfo
			$location.path '/scoreList'

		finalize = (handInfo) ->
			if handInfo.wasLeaster or handInfo.wasMisplay
				handInfo.picker = null
				handInfo.partner = null
				handInfo.wasSet = false
				handInfo.wasNotSet = false
				handInfo.wasNoTrick = false
				handInfo.wasNoSchneider = false
			unless handInfo.wasLeaster
				handInfo.whoWonLeaster = null
			unless handInfo.wasMisplay
				handInfo.whoMisplayed = null
