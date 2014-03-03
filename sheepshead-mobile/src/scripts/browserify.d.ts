/// <reference path="references.ts" />

declare function require(module: string);

// brfs
declare module "fs" {
	export function readFileSync(filename: string): string;
}