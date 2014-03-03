/// <reference path="references.ts" />
declare module "fs" {
	export function readFileSync(filename: string): string;
}