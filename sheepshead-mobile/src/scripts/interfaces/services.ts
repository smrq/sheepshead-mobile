/// <reference path="../references.ts" />
module app {
	export interface IWebService {
		getNames(value: string): ng.IPromise<string[]>;
		postScores(players: IPlayer[], hands: IHand[]): ng.IHttpPromise<any>;
	}

	export interface IScoreKeeperService {
		players: IPlayer[];
		hands: IHand[];
		startGame(names: string[]): void;
		scoreHand(hand: IHand): void;
		removeLastHand(): void;
		scoreTable(): IScoreTableRow[];
		finalScores(): IFinalScores;
		saveState(): void;
		loadState(): void;
		clearState(): void;
		hasSavedState(): boolean;
		submitScores(): void;
	}

	export interface IScreenService {
		push(screen: string, params?: any): void;
		replace(screen: string, params?: any): void;
		pop(): void;
		data(): any;
	}
}