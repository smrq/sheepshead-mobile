module.exports = ($routeProvider) ->
	$routeProvider
		.when '/',
			templateUrl: 'selectPlayers.html'
			controller: 'SelectPlayersCtrl'
		.when '/scoreList',
			templateUrl: 'scoreList.html'
			controller: 'ScoreListCtrl'
		.when '/scoreHand',
			templateUrl: 'scoreHand.html'
			controller: 'ScoreHandCtrl'
		.when '/scoresSubmitted',
			templateUrl: 'scoresSubmitted.html'
			controller: 'ScoresSubmittedCtrl'
		.otherwise
			redirectTo: '/'