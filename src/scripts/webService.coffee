module.exports = (m) ->
	m.factory 'webService', ($http) ->
		getNames: (value) ->
			$http.get remote('sheepshead.cgi'), params: { action: 'name-lookup', query: value }
				.then (result) -> result.data.names