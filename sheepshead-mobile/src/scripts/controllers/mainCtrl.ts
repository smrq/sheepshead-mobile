/// <reference path="../references.ts" />
module app {
	angular.module('app').controller('mainCtrl', MainCtrl);
	export function MainCtrl(
		scoreKeeperService: app.IScoreKeeperService,
		screenService: app.IScreenService) {

		if (scoreKeeperService.hasSavedState()) {
			scoreKeeperService.loadState();
			screenService.replace('scoreList');
		}
	}
}