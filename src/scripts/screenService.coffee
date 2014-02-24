module.exports = (m) ->
	m.factory 'screenService', ($location, $window) ->
		push: (screen, params) ->
			$location.path("/#{screen}")
			$location.search(params) if params?

		replace: (screen, params) ->
			$location.path("/#{screen}").replace()
			$location.search(params).replace() if params?

		pop: ->
			$window.history.back()

		data: ->
			$location.search()