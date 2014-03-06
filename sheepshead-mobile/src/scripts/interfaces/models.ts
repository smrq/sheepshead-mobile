/// <reference path="../references.ts" />
module app {
	function shortName(name: string): string {
		var words = name.split(' ');
		return _.first(words) + ' ' +
			_.rest(words).map(word => word[0])
				.join('.')
				.toUpperCase() +
			'.';
	}
	function shorterName(name: string): string {
		return name.split(' ')
			.map(word => word[0])
			.join('')
			.toUpperCase();
	}

	export class Player implements IPlayer {
		shortName: string;
		shorterName: string;
		constructor(public name: string) {
			this.shortName = shortName(name);
			this.shorterName = shorterName(name);
		}
	}

	export interface IPlayer {
		name: string;
		shortName: string;
		shorterName: string;
	}

	export enum HandType {
		normal = <any>'normal',
		leaster = <any>'leaster',
		misplay = <any>'misplay'
	}

	export enum ScoreTier {
		schneider = <any>'schneider',
		noSchneider = <any>'noSchneider',
		noTricker = <any>'noTricker'
	}

	export interface IHand {
		playerIndices: number[];
		leadPlayerIndex: number;
		doubler: boolean;
		handType: HandType;
		score: IHandScore;
	}

	export interface IHandScore { }
	export interface IHandScoreNormal extends IHandScore {
		pickerPlayerIndex: number;
		partnerPlayerIndex: number;
		win: boolean;
		scoreTier: ScoreTier;
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