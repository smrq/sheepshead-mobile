module.exports = (m) ->
	m.factory 'screenService', ($location, $window) ->
		push: (screen, params) ->
			$location.path "/#{screen}"
				.search params

		replace: (screen, params) ->
			$location.path "/#{screen}"
				.search params
				.replace()

		pop: ->
			$window.history.back()

		data: ->
			$location.search()