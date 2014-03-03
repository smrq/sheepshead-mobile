/// <reference path="../references.ts" />
module app {
	export interface IPlayer {
		name: string;
		abbreviation: string;
	}

	export interface IHand {
		playerIndices: number[];
		leadPlayerIndex: number;
		doubler: boolean;
		handType: string;
		score: IHandScore;
	}

	export interface IHandScore { }
	export interface IHandScoreNormal extends IHandScore {
		pickerPlayerIndex: number;
		partnerPlayerIndex: number;
		win: boolean;
		scoreTier: string; // TODO: can this be an enum?
	}
	export interface IHandScoreLeaster extends IHandScore {
		primaryPlayerIndex: number;
		secondaryPlayerIndex: number;
	}
	export interface IHandScoreMisplay extends IHandScore {
		loserPlayerIndex: number;
	}

	export interface IScoreTableRow extends IHand {
		cumulativeScores: number[];
		pointSpread: number;
	}

	export interface IFinalScores {
		cumulativeScores: number[];
		pointSpread: number;
	}
}