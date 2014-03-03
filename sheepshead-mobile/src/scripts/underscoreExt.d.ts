/// <reference path="references.ts" />
interface UnderscoreStatic {
	findObj(
		obj: any,
		pred: (value: any) => boolean): string;
	scan<TList, TResult>(
		list: _.Collection<TList>,
		iter: (memo: TResult, item: TList) => TResult,
		initial: TResult): TResult[];
	repeat<T>(
		item: T,
		times: number): T[];
	sum(list: _.Collection<number>): number;
	zipWith<TResult>(iter: (...items: any[]) => TResult, ...arrays: any[][]): TResult[];
	range(from: number, to: number): number[];
}