/// <reference path="references.ts" />
declare function fastclick(element: HTMLElement): void;
declare module "fastclick" {
	export = fastclick;
}