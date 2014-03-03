/// <reference path="../references.ts" />
export = MainCtrl;
class MainCtrl {
	constructor(
		private scoreKeeperService: app.IScoreKeeperService,
		private screenService: app.IScreenService) {

		if (scoreKeeperService.hasSavedState()) {
			scoreKeeperService.loadState();
			screenService.replace('scoreList');
		}
	}
}