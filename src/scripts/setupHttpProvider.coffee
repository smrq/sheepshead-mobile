# http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/

angular = require 'angular'

module.exports = ($httpProvider) ->
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
	$httpProvider.defaults.transformRequest = [(data) ->
		param = (obj) ->
			query = ''
			for name, value of obj
				if value instanceof Array
					for subValue, i in value
						fullSubName = name + '[' + i + ']'
						innerObj = {}
						innerObj[fullSubName] = subValue
						query += param(innerObj) + '&'
				else if value instanceof Object
					for subName, subValue of value
						fullSubName = name + '[' + subName + ']'
						innerObj = {}
						innerObj[fullSubName] = subValue
						query += param(innerObj) + '&'
				else if value?
					query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'
			if query.length
				query.substr(0, query.length - 1)
			else
				query
		if angular.isObject(data) and String(data) isnt '[object File]'
			param data
		else
			data
	]