_ = require 'underscore'
_.mixin
	findObj: (obj, pred) ->
		_.find(_.pairs(obj), (p) -> pred(p[1]))?[0]

	scan: (list, iter, initial) ->
		_.chain(list)
			.reduce ((acc, cur) -> acc.concat [iter _.last(acc), cur]), [initial]
			.tail()
			.value()

	repeat: (item, times) -> item for n in [0...times]

	sum: (list) -> _.reduce list, ((a,b) -> a + b), 0

	zipWith: (arrays..., iter) ->
		_.map _.zip(arrays...), (items) -> iter items...
