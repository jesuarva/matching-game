 /* VARIABLES */
var gamesPlayed = 0;
var dashboardPositions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var compareCard = [];
var matchedCards = 0;
// Multiple icons to allow few repetitions in nwew games.
// TODO: when improving the game so user can select a level, this multiple icons help in that matter.
var cardOptions = ["fa-address-book-o",
									 "fa-address-card",
									 "fa-address-card-o",
									 "fa-bandcamp",
									 "fa-bath",
									 "fa-bathtub",
									 "fa-drivers-license",
									 "fa-drivers-license-o",
									 "fa-eercast",
									 "fa-envelope-open",
									 "fa-envelope-open-o",
									 "fa-etsy",
									 "fa-free-code-camp",
									 "fa-grav",
									 "fa-handshake-o",
									 "fa-id-badge",
									 "fa-id-card",
									 "fa-id-card-o",
									 "fa-imdb",
									 "fa-linode",
									 "fa-meetup",
									 "fa-microchip",
									 "fa-podcast",
									 "fa-quora",
									 "fa-ravelry",
									 "fa-reddit-alien",
									 "fa-shower",
									 "fa-snowflake-o",
									 "fa-superpowers",
									 "fa-telegram",
									 "fa-thermometer-empty",
									 "fa-thermometer-full",
									 "fa-thermometer-half",
									 "fa-thermometer-quarter",
									 "fa-thermometer-three-quarters",
									 "fa-times-rectangle",
									 "fa-times-rectangle-o",
									 "fa-user-circle",
									 "fa-user-circle-o",
									 "fa-plug"
								 ];
var moves = 0;
var gameLevel = 8; // TODO Add game levels. posible values { small: 8; medium: 12; large: 16 }
var timer,
		seconds = 0,
		minutes;
var stars = 3, attemp = [24,34,40];
/* END VARIABLES */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/* At game start:
 *	1 - Shufle cardOptions array.
 * 	2 - Shuffle dashboardPositions array.
 *	3 - Assign the (4 * gamesPlayed) first cards from cardOptions array to $('li.card i.fa') elements.
 *		3.1 Increase gamesPlayed by 1
 */

 /*GAME LOGIC*/

/* FUNCTIONS */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// 3 - Assign the (8 * gamesPlayed) first cards from cardOptions array to $('li.card i.fa') elements.
// 	3.1 Increase gamesPlayed by 1
function setDashboardCards () {
	var htmlCards = $('li.card');
	var htmlCardsIndex = 0;

	console.log('dashboardPositions.length: '+dashboardPositions.length);
	console.log('dashboardPositions: '+dashboardPositions);
	var j = 0;
	for (var i = 0; i < dashboardPositions.length; i += 2) {
		/* THIS DIDN'T WORK
		console.log(dashboardPositions[i]);
		console.log(dashboardPositions[i+1]);
		console.log('cardOptions[i+gamesPlayed]: '+cardOptions[i+gamesPlayed]);
		var innerHtml = '<i class="fa '+cardOptions[i+gamesPlayed]+'></i>';
		console.log('innerHtml: '+innerHtml);
		console.log($('li.card').eq(dashboardPositions[i]).html("<p>Hola Caracola</p>"));
		console.log($('li.card').eq(dashboardPositions[i]).html());
		console.log($('li.card').eq(dashboardPositions[i+1]).html(innerHtml));
		console.log($('li.card').eq(dashboardPositions[i+1]).html());

		$('li.card').eq(dashboardPositions[i]).html(innerHtml);
		$('li.card').eq(dashboardPositions[i+1]).html(innerHtml);
		*/

		// var cardOptionosi = '<i class="fa '+cardOptions[i+gamesPlayed]+'></i>';
		// console.log('innerHtml: '+cardOptionosi);
		// console.log($('li.card li.fa').eq(dashboardPositions[i]).attr('class'));
		$('li.card i.fa').eq(dashboardPositions[i]).attr('class', 'fa '+cardOptions[j+gamesPlayed]);
		$('li.card i.fa').eq(dashboardPositions[i+1]).attr('class', 'fa '+cardOptions[j+gamesPlayed]);
		j++;
	}

	gamesPlayed++;
}
// Hide all cards
function hideAllCards (){}

/** Deling with 'starts' logic **/
/* 1-attemp is 2-moves
 * at 12 attemps (24-moves) - lose first start
 * at 17 attemps (34-moves) - lose second start
 * at 20 attemps (40-moves) - lose second start
*/
// totalMoves count
function totalMoves () {
	moves++;
	$('.moves').text(moves);
	console.log(attemp.indexOf(moves)>-1);
	if (attemp.indexOf(moves)>=0){
		switch (stars) {
			case 1:
				console.log('case 1');
				stars -= 1;
				$('.score-panel li.star1').attr('class', 'star1 hidden');
				break;
			case 2:
				console.log('case 2');
				stars -= 1;
				$('.score-panel li.star2').attr('class', 'star2 hidden');
				break;
			case 3:
				console.log('case 3');
				stars -= 1;
				$('.score-panel li.star3').attr('class', 'star3 hidden');
				break;
		}
	}
}
/** END Deling with 'starts' logic **/

/*** TIMER:Cunt seconds and minutes ***/
// Start Timer
var countSecondsAndMinutes = function () {
	// console.log('countSeconds on');
	seconds++;
	minutes = Math.floor(seconds/60);
}
var printElapsedTime = function () {
	// console.log('printElapsedTime on');
	var secUnits = seconds%10;
	var secTen = Math.floor((seconds%60)/10);
	var minUnits = minutes%10;
	// console.log(minutes);
	var minTen = Math.floor((minutes%60)/10);

	$('.secondsUnits').text(secUnits);
	$('.secondsTen').text(secTen);
	$('.minutesUnits').text(minUnits);
	$('.minutesTen').text(minTen);
}
// startTimer has a setInterval=(function, 1000)
var startTimer = function(){
	console.log('startTimer on');
	$('.secondsUnits').text('0');
	$('.secondsTen').text('0');
	$('.minutesUnits').text('0');
	$('.minutesTen').text('0');
	timer = setInterval( function (){
		countSecondsAndMinutes();
		printElapsedTime();
	}, 1000);
}
/* End TIMER: Count seconds and minutes */
// newGame

function newGame () {
	clearInterval(timer);
	shuffle(dashboardPositions);
	setDashboardCards();
	startTimer();
	matchedCards = 0;
	moves = 0;
	$('.moves').text(moves);
	cardOnClick();
}
// Restart game
var restartGame = function () {
	$('.card').off('click');
	$('#result-pane').attr('class', 'container noVisible')
	$('li.card').attr('class', 'card match');
	$('.deck').fadeTo('slow', '1');
	newGame();
	setTimeout(function(){ $('li.card').attr('class', 'card');}, 450);
	console.log(matchedCards);
}

// If cards are no equals then hide cards.
function hideCard () {
 	for (var i = 0; i < 2; i++){
 		$(compareCard[i][0]).attr('class', 'card');
		$(compareCard[i][0]).on('click', actionOnClic);
 		// $(compareCard[i][0]).toggleClass('show');
 	}
 	compareCard = [];
 }
// Game is finished?
//               var win = function () { if(matchedCards === gameLevel){return true;} else { return false;} };
var youWinYouLose = function(){
	if ( matchedCards === gameLevel ){
		clearInterval(timer);
		$('.card').off('click');
		$('.deck').fadeTo('slow', '0.5');
		$('#result-pane').toggleClass('noVisible');
		$('.youWin').toggleClass('noVisible');
	} else {
		switch (stars) {
			case 0:
				clearInterval(timer);
				$('.card').off('click');
				$('.deck').fadeTo('slow', '0.5');
				$('#result-pane').toggleClass('noVisible');
				$('.youLose').toggleClass('noVisible');
				break;
		}
	}
}
// If cards are equals remove on.click event and disallow on.click functionality.
function cardsMatch () {
	for (var i = 0; i < 2; i++){
		$(compareCard[i][0]).off('click');
		$(compareCard[i][0]).toggleClass('match');
		$(compareCard[i][0]).toggleClass('open');
		$(compareCard[i][0]).toggleClass('show');
	}
	compareCard = [];
	matchedCards++;
	console.log(matchedCards);
	youWinYouLose();
}
// Set on.click event for cards.
var actionOnClic = function(){
	// toggle to open
	$(this).toggleClass('open');
	// toggle to visible
	$(this).toggleClass('show');
	$(this).off('click');

	// ADD clicked card to comparedCard array
	// [element.clicked, element.html()]
	compareCard.push([$(this),$(this).html()]);

	totalMoves();
	// Logic whne 2 cards have been cliked.
	if( compareCard.length == 2 ){
		/* DIDN'T WORK
			// // toggle to open
			// $(this).toggleClass('open');
			// // toggle to visible
			// $(this).toggleClass('show');
		*/
		console.log(compareCard[1][1]);
		console.log(compareCard[0][1]);
		console.log(compareCard[0][1] === compareCard[1][1]);
		if ( compareCard[0][1] === compareCard[1][1] ) {
			console.log("Cartas son iguales");
			console.log(compareCard);
			cardsMatch();
		} else {
			switch (stars) {
				case 0:
					youWinYouLose();
					break;
				default:
				console.log("cartas no son iguales");
				console.log(compareCard);
				// toggle to open and DELAY this action.
				setTimeout(hideCard,300);
			}

		} // end if-else
	} //end if (cmapareCard.length == 2)

}
function	cardOnClick() {
	 // $('.card').on('click', function (e){
	 $('.card').on('click', actionOnClic);
} // end cardOnClick()

/* END FUNCTIONS */
/* END GAME LOGIC */

/* LAUNCH APP.JS */
$(function (){
	/* Launch event handlers */
	// card.on.click
	// cardOnClick();
	$('.restart').on('click', restartGame);
	// Shuffle Cards at the very beginning
	shuffle(cardOptions);
	// Launch a starting game
	newGame();
	$('li.card').attr('class', 'card');
});
/* LAUNCH: DOMENT.ONLOAD(render JS) */
