/// <reference path="../references.ts" />
module app {
	export class WebService implements IWebService {
		constructor(private $http: ng.IHttpService) { }

		getNames(value: string) {
			return this.$http.get(remote('sheepshead.cgi'), {
				params: { action: 'name-lookup', query: value }
			}).then(function (result: ng.IHttpPromiseCallbackArg<{ names: string[] }>) {
				return result.data.names;
			});
		}

		postScores(players: IPlayer[], hands: IHand[]) {
			var data = {
				playerNames: players.map(p => p.name),
				hands: hands
			};
			return this.$http.post(remote('sheepshead.cgi'), data, {
				params: { action: 'submit-hands' }
			});
		}
	}

	angular.module('app').service('webService', WebService);
}