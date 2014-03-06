/// <reference path="../references.ts" />
module app {
	angular.module('app').controller('selectPlayersCtrl', SelectPlayersCtrl);
	export function SelectPlayersCtrl(
		$scope: ISelectPlayersScope,
		webService: IWebService) {

		$scope.players = [];
		$scope.addPlayer = function () {
			$scope.players.push({name: ''});
		}
		$scope.enteredPlayers = function () {
			return _.filter($scope.players, (p: { name: string }) => p.name.length > 0);
		};
		$scope.getNames = function (value: string) {
			return webService.getNames(value);
		};
		$scope.canSubmit = function () {
			return $scope.enteredPlayers().length >= 5;
		};
		$scope.startGame = function () {
			var names = $scope.enteredPlayers().map((p) => p.name);
			$scope.$emit(Event.selectPlayers.startGame, names);
		};

		for (var i=0; i<6; i++) {
			$scope.addPlayer();
		}
	}
}