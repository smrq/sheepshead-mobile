module.exports = (m) ->
	m.factory 'screenService', ($location, $window) ->
		push: (screen) ->
			$location.path "/#{screen}"

		replace: (screen) ->
			$location.path "/#{screen}"
				.replace()

		pop: ->
			$window.history.back()