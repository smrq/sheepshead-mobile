module.exports = (m) ->
	m.controller 'MainCtrl', (scoreKeeperService, screenService) ->
		if scoreKeeperService.hasSavedState()
			scoreKeeperService.loadState()
			screenService.replace 'scoreList'
