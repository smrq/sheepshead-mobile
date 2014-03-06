/// <reference path="../references.ts" />
module app {
	export interface ISelectPlayersScope extends ng.IScope {
		players: { name: string }[];
		getNames(value: string): ng.IPromise<string[]>;
		canSubmit(): boolean;
		startGame(): void;
	}

	export interface IScoreListScope extends ng.IScope {
		scoreKeeperService: IScoreKeeperService;
		players: IPlayer[];
		hands: IScoreTableRow[];
		isWin(hand: IScoreTableRow): boolean;
		isSet(hand: IScoreTableRow): boolean;
		isPicker(hand: IScoreTableRow, index: number): boolean;
		isPartner(hand: IScoreTableRow, index: number): boolean;
		isOut(hand: IScoreTableRow, index: number): boolean;
		isNotableLead(hand: IScoreTableRow, index: number): boolean;
		isLeasterPrimary(hand: IScoreTableRow, index: number): boolean;
		isLeasterSecondary(hand: IScoreTableRow, index: number): boolean;
		isMisplayLoser(hand: IScoreTableRow, index: number): boolean;
		addScore(): void;
		undoScore(): void;
		hasAnyHands(): boolean;
		submitFinalScores(): void;
		nextOutAndLead(): { outPlayers: number[]; leadPlayerIndex: number; };
	}

	export interface IScoreHandScope extends ng.IScope {
		players: IPlayer[];
		isNormalGame(): boolean;
		isDoubler(): boolean;
		toggleDoubler(): void;
		isLeaster(): boolean;
		toggleLeaster(): void;
		isMisplay(): boolean;
		toggleMisplay(): void;
		isPicker(index: number): boolean;
		togglePicker(index: number): void;
		isPartner(index: number): boolean;
		togglePartner(index: number): void;
		isLeasterPrimary(index: number): boolean;
		toggleLeasterPrimary(index: number): void;
		isLeasterSecondary(index: number): boolean;
		toggleLeasterSecondary(index: number): void;
		isMisplayLoser(index: number): boolean;
		toggleMisplayLoser(index: number): void;
		isOut(index: number): boolean;
		toggleOut(index: number): void;
		isInLead(index: number): boolean;
		toggleInLead(index: number): void;
		isWin(): boolean;
		toggleWin(): void;
		isNoTricker(): boolean;
		toggleNoTricker(): void;
		isNoSchneider(): boolean;
		toggleNoSchneider(): void;
		isSchneider(): boolean;
		toggleSchneider(): void;
		canSubmitNormalGame(): boolean;
		canSubmitLeaster(): boolean;
		canSubmitMisplay(): boolean;
		canSubmit(): boolean;
		submitScore(): void;
	}

	export interface IScoresSubmittedScope extends ng.IScope {
		finalScores: { name: string; score: number }[];
		startNewGame(): void;
	}
}