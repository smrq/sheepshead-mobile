/// <reference path="references.ts" />
module app {
	_.mixin({
		findObj: function (obj: any, pred: (value: any) => boolean): string {
			var kv = _.find(
				_.pairs(obj),
				(p) => pred(p[1]));
			return kv == null ? null : kv[0];
		},

		scan: function <TList, TResult>(list: _.Collection<TList>, iter: (memo: TResult, item: TList) => TResult, initial: TResult): TResult[] {
			var resultWithInitial = _.reduce(
				list,
				(acc: TResult[], cur: TList) => acc.concat([iter(_.last(acc), cur)]),
				[initial]);
			return _.tail(resultWithInitial);
		},

		repeat: function <T>(item: T, times: number): T[] {
			var result = [];
			for (var i = 0; i < times; ++i) {
				result.push(item);
			}
			return result;
		},

		sum: function (list: _.Collection<number>): number {
			return _.reduce(
				list,
				(a: number, b: number) => a + b,
				0);
		},

		zipWith: function <TResult>(iter: (...items: any[]) => TResult, ...arrays: any[][]): TResult[] {
			return _.map(
				_.zip.apply(null, arrays),
				(items: any[]) => iter.apply(null, items));
		},

		range: function (from: number, to: number): number[] {
			var result = [];
			if (from < to)
				for (var n = from; n <= to; ++n) {
					result.push(n);
				}
			else
				for (var n = from; n >= to; --n) {
					result.push(n);
				}
			return result;
		}
	});
}