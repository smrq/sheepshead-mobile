module.exports = (m) ->
	m.controller 'MainCtrl', (scoreKeeperService, screenService) ->
		screenService.replace 'scoreList' if scoreKeeperService.hasSavedState()
