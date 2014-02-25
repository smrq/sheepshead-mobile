module.exports = (m) ->
	m.factory 'localStorageService', ($window) ->
		setObject: (key, value) ->
			$window.localStorage.setItem key, JSON.stringify value
		getObject: (key) ->
			JSON.parse $window.localStorage.getItem key