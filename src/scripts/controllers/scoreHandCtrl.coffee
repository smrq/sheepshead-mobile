_ = require 'underscore'

module.exports = (m) ->
	m.controller 'ScoreHandCtrl', ($scope, screenService, scoreKeeperService) ->

		handInfo =
			outPlayers: screenService.data().outPlayers ? []
			doubler: false
			handType: 'normal'
			normalScore:
				win: true
				scoreTier: null
				pickerPlayerIndex: null
				partnerPlayerIndex: null
			leasterScore:
				primaryPlayerIndex: null
				secondaryPlayerIndex: null
			misplayScore:
				loserPlayerIndex: null

		setNotOut = (index) ->
			handInfo.outPlayers = _.without handInfo.outPlayers, index
		setNotPicker = (index) ->
			if handInfo.normalScore.pickerPlayerIndex is index
				handInfo.normalScore.pickerPlayerIndex = null
		setNotPartner = (index) ->
			if handInfo.normalScore.partnerPlayerIndex is index
				handInfo.normalScore.partnerPlayerIndex = null
		setNotLeasterPrimary = (index) ->
			if handInfo.leasterScore.primaryPlayerIndex is index
				handInfo.leasterScore.primaryPlayerIndex = null
		setNotLeasterSecondary = (index) ->				
			if handInfo.leasterScore.secondaryPlayerIndex is index
				handInfo.leasterScore.secondaryPlayerIndex = null
		setNotMisplayLoser = (index) ->
			if handInfo.misplayScore.loserPlayerIndex is index
				handInfo.misplayScore.loserPlayerIndex = null
		playerCountIsCorrect = ->
			$scope.players.length - handInfo.outPlayers.length is 5
		

		$scope.players = scoreKeeperService.players

		$scope.isNormalGame = ->
			handInfo.handType is 'normal'

		$scope.isDoubler = ->
			handInfo.doubler
		$scope.toggleDoubler = ->
			handInfo.doubler = not handInfo.doubler

		$scope.isLeaster = ->
			handInfo.handType is 'leaster'
		$scope.toggleLeaster = ->
			handInfo.handType =
				if $scope.isLeaster() then 'normal' else 'leaster'

		$scope.isMisplay = ->
			handInfo.handType is 'misplay'
		$scope.toggleMisplay = ->
			handInfo.handType =
				if $scope.isMisplay() then 'normal' else 'misplay'

		$scope.isPicker = (index) ->
			handInfo.normalScore.pickerPlayerIndex is index
		$scope.togglePicker = (index) ->
			if $scope.isPicker index
				handInfo.normalScore.pickerPlayerIndex = null
			else
				handInfo.normalScore.pickerPlayerIndex = index
				setNotOut index

		$scope.isPartner = (index) ->
			handInfo.normalScore.partnerPlayerIndex is index
		$scope.togglePartner = (index) ->
			if $scope.isPartner index
				handInfo.normalScore.partnerPlayerIndex = null
			else
				handInfo.normalScore.partnerPlayerIndex = index
				setNotOut index

		$scope.isLeasterPrimary = (index) ->
			handInfo.leasterScore.primaryPlayerIndex is index
		$scope.toggleLeasterPrimary = (index) ->
			if $scope.isLeasterPrimary index
				handInfo.leasterScore.primaryPlayerIndex = null
			else
				handInfo.leasterScore.primaryPlayerIndex = index
				setNotLeasterSecondary index
				setNotOut index

		$scope.isLeasterSecondary = (index) ->
			handInfo.leasterScore.secondaryPlayerIndex is index
		$scope.toggleLeasterSecondary = (index) ->
			if $scope.isLeasterSecondary index
				handInfo.leasterScore.secondaryPlayerIndex = null
			else
				handInfo.leasterScore.secondaryPlayerIndex = index
				setNotLeasterPrimary index
				setNotOut index

		$scope.isMisplayLoser = (index) ->
			handInfo.misplayScore.loserPlayerIndex is index
		$scope.toggleMisplayLoser = (index) ->
			if $scope.isMisplayLoser index
				handInfo.misplayScore.loserPlayerIndex = null
			else
				handInfo.misplayScore.loserPlayerIndex = index
				setNotOut index

		$scope.isOut = (index) ->
			index in handInfo.outPlayers
		$scope.toggleOut = (index) ->
			if $scope.isOut index
				setNotOut index
			else
				handInfo.outPlayers.push index
				setNotPicker index
				setNotPartner index
				setNotLeasterPrimary index
				setNotLeasterSecondary index
				setNotMisplayLoser index

		$scope.isWin = ->
			handInfo.normalScore.win
		$scope.toggleWin = ->
			handInfo.normalScore.win = not handInfo.normalScore.win

		$scope.isNoTricker = ->
			handInfo.normalScore.scoreTier is 'noTricker'
		$scope.toggleNoTricker = ->
			handInfo.normalScore.scoreTier =
				if $scope.isNoTricker() then null else 'noTricker'

		$scope.isNoSchneider = ->
			handInfo.normalScore.scoreTier is 'noSchneider'
		$scope.toggleNoSchneider = ->
			handInfo.normalScore.scoreTier =
				if $scope.isNoSchneider() then null else 'noSchneider'

		$scope.isSchneider = ->
			handInfo.normalScore.scoreTier is 'schneider'
		$scope.toggleSchneider = ->
			handInfo.normalScore.scoreTier =
				if $scope.isSchneider() then null else 'schneider'

		$scope.canSubmitNormalGame = ->
			handInfo.normalScore.scoreTier? and
			handInfo.normalScore.pickerPlayerIndex? and
			handInfo.normalScore.partnerPlayerIndex? and
			handInfo.normalScore.pickerPlayerIndex not in handInfo.outPlayers and
			handInfo.normalScore.partnerPlayerIndex not in handInfo.outPlayers

		$scope.canSubmitLeaster = ->
			handInfo.leasterScore.primaryPlayerIndex? and
			handInfo.leasterScore.primaryPlayerIndex not in handInfo.outPlayers and
			handInfo.leasterScore.secondaryPlayerIndex not in handInfo.outPlayers

		$scope.canSubmitMisplay = ->
			handInfo.misplayScore.loserPlayerIndex? and
			handInfo.misplayScore.loserPlayerIndex not in handInfo.outPlayers

		$scope.canSubmit = ->
			playerCountIsCorrect() and (
				$scope.isNormalGame() and $scope.canSubmitNormalGame() or
				$scope.isLeaster() and $scope.canSubmitLeaster() or
				$scope.isMisplay() and $scope.canSubmitMisplay()
			)

		$scope.submitScore = ->
			scoreKeeperService.scoreHand
				playerIndices: _.difference [0...$scope.players.length], handInfo.outPlayers
				leadPlayerIndex: (handInfo.outPlayers[0] + 1) % $scope.players.length # TODO: this is shit logic, revisit once lead player UI exists
				doubler: handInfo.doubler
				handType: handInfo.handType
				score: switch handInfo.handType
					when 'normal' then handInfo.normalScore
					when 'leaster' then handInfo.leasterScore
					when 'misplay' then handInfo.misplayScore
			screenService.pop()
