/// <reference path="../references.ts" />
module app {
	export class ScreenService implements IScreenService {
		constructor(
			private $location: ng.ILocationService,
			private $window: ng.IWindowService) { }

		push(screen: string, params?: any): void {
			this.$location.path("/" + screen);
			if (params != null)
				this.$location.search(params);
		}
		replace(screen: string, params?: any): void {
			this.$location.path("/" + screen).replace();
			if (params != null)
				this.$location.search(params).replace();
		}
		pop(): void {
			this.$window.history.back();
		}
		data(): any {
			return this.$location.search();
		}
	}

	angular.module('app').service('screenService', ScreenService);
}