_ = require 'underscore'
_.mixin
	findObj: (obj, pred) ->
		_.find(_.pairs(obj), (p) -> pred(p[1]))?[0]