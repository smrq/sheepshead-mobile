/// <reference path="../references.ts" />
import _ = require('underscore');

export = ScoreKeeperService;
class ScoreKeeperService implements app.IScoreKeeperService {
	constructor(
		private $window: ng.IWindowService,
		private webService: app.IWebService) { }

	players: app.IPlayer[] = [];
	hands: app.IHand[] = [];

	startGame(names: string[]): void {
		this.players = names.map(n => ({ name: n, abbreviation: abbreviate(n) }));
		this.hands = []
		this.saveState();
	}

	scoreHand(hand: app.IHand): void {
		this.hands.push(hand);
		this.saveState();
	}

	removeLastHand(): void {
		this.hands.pop();
		this.saveState();
	}

	scoreTable(): app.IScoreTableRow[] {
		var cumulativeScoresList = _.scan(
			this.hands,
			calculateHandScore,
			_.repeat(0, this.players.length));
		return _.zipWith<app.IScoreTableRow>(
			(hand: app.IHand, cumulativeScores: number[]): app.IScoreTableRow =>
				_.extend({}, hand, {
					cumulativeScores: cumulativeScores,
					pointSpread: calculatePointSpread(cumulativeScores)
				}),
			this.hands,
			cumulativeScoresList);
	}

	finalScores(): app.IFinalScores {
		var finalScoreTableRow = _.last(this.scoreTable());
		return {
			cumulativeScores: finalScoreTableRow.cumulativeScores,
			pointSpread: finalScoreTableRow.pointSpread
		};
	}

	saveState(): void {
		this.$window.localStorage.setItem(
			'scoreKeeperService',
			JSON.stringify({ players: this.players, hands: this.hands }));
	}

	loadState(): void {
		var data = this.$window.localStorage.getItem('scoreKeeperService');
		if (data != null) {
			var parsed = JSON.parse(data);
			this.players = parsed.players;
			this.hands = parsed.hands;
		}
	}

	clearState(): void {
		this.$window.localStorage.removeItem('scoreKeeperService');
	}

	hasSavedState(): boolean {
		return this.$window.localStorage.getItem('scoreKeeperService') != null;
	}

	submitScores(): void {
		this.webService.postScores(this.players, this.hands);
		this.clearState();
	}
}

function abbreviate(name: string): string {
	return name.split(' ')
		.map(word => word[0])
		.join('')
		.toUpperCase();
}

function calculatePointSpread(scores: number[]): number {
	var positivePointSpread = _.sum(_.filter(scores, (s) => s > 0));
	var negativePointSpread = _.sum(_.filter(scores, (s) => s < 0));
	if (positivePointSpread + negativePointSpread !== 0)
		throw 'Point spread did not match';
	return positivePointSpread;
}

function calculateHandScore(previousScores: number[], hand: app.IHand): number[] {
	var winningShares: number[] = null;
	var losingShares: number[] = null;
	var pointsPaid = 1;

	switch (hand.handType) {
		case 'normal':
			var normalScore = <app.IHandScoreNormal>hand.score;
			var offenseShares = normalScore.pickerPlayerIndex === normalScore.partnerPlayerIndex
				? _.repeat(normalScore.pickerPlayerIndex, 4)
				: _.repeat(normalScore.pickerPlayerIndex, 2).concat(normalScore.partnerPlayerIndex);
			var defenseShares = _.without(
				hand.playerIndices,
				normalScore.pickerPlayerIndex,
				normalScore.partnerPlayerIndex);

			if (normalScore.win) {
				winningShares = offenseShares;
				losingShares = defenseShares;
			} else {
				winningShares = defenseShares;
				losingShares = offenseShares;
				pointsPaid *= 2;
			}

			switch (normalScore.scoreTier) {
				case 'noSchneider':
					pointsPaid *= 2;
					break;
				case 'noTricker':
					pointsPaid *= 3;
					break;
			}
			break;

		case 'leaster':
			var leasterScore = <app.IHandScoreLeaster>hand.score;
			winningShares = leasterScore.secondaryPlayerIndex == null
				? _.repeat(leasterScore.primaryPlayerIndex, 4)
				: _.repeat(leasterScore.primaryPlayerIndex, 2).concat(leasterScore.secondaryPlayerIndex);
			losingShares = _.without(
				hand.playerIndices,
				leasterScore.primaryPlayerIndex,
				leasterScore.secondaryPlayerIndex);
			break;

		case 'misplay':
			var misplayScore = <app.IHandScoreMisplay>hand.score;
			losingShares = _.repeat(misplayScore.loserPlayerIndex, 4);
			winningShares = _.without(
				hand.playerIndices,
				misplayScore.loserPlayerIndex);
			break;

		default:
			throw 'Unexpected hand type';
	}

	if (hand.doubler)
		pointsPaid *= 2;

	if (winningShares.length !== losingShares.length)
		throw 'Payment count did not match';

	var currentScores = previousScores.slice(0);
	winningShares.forEach((share) => currentScores[share] += pointsPaid);
	losingShares.forEach((share) => currentScores[share] -= pointsPaid);
	return currentScores;
}