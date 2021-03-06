
/* VARIABLES */
var gamesPlayed = 0;
var dashboardPositions = [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var compareCard = [];
var matchedCards = 0;
// Multiple icons to allow few repetitions in nwew games.
// TODO when improving the game so user can select a level, this multiple icons help in that matter.
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

// Assign the (8 * gamesPlayed) first cards from cardOptions array to $('li.card i.fa') elements.
// Increase gamesPlayed by 1
function setDashboardCards () {
	var htmlCards = $('li.card');
	var htmlCardsIndex = 0;

	console.log('dashboardPositions.length: '+dashboardPositions.length);
	console.log('dashboardPositions: '+dashboardPositions);
	var j = 0;
	for (var i = 0; i < dashboardPositions.length; i += 2) {
		$('li.card i.fa').eq(dashboardPositions[i]).attr('class', 'fa '+cardOptions[j+gamesPlayed]);
		$('li.card i.fa').eq(dashboardPositions[i+1]).attr('class', 'fa '+cardOptions[j+gamesPlayed]);
		j++;
	}
}
// Hide all cards
function hideAllCards (){}

/** Deling with 'starts' logic **/
/* 1-attemp is 2-moves
 * at 12 attemps (24-moves) - lose first start
 * at 17 attemps (34-moves) - lose second start
 * at 20 attemps (40-moves) - lose third start
*/
// totalMoves count
function totalMoves () {
	// increase moves counter
	moves++;
	// print total moves to page
	if (moves%2 === 0) {
		$('.moves').text(moves/2);
	}
	// check if moves reach one of the threshold values
	console.log('Decrease star ='+ attemp.indexOf(moves)>-1 );
	if (attemp.indexOf(moves)>=0){
		switch (stars) {
			case 1:
				console.log('Decreasing from 1 to 0 stars');
				stars -= 1;
				$('.score-panel li.star1').attr('class', 'star1 hidden');
				break;
			case 2:
				console.log('Decreasing from 2 to 1 stars');
				stars -= 1;
				$('.score-panel li.star2').attr('class', 'star2 hidden');
				break;
			case 3:
				console.log('Decreasing from 3 to 2 stars');
				stars -= 1;
				$('.score-panel li.star3').attr('class', 'star3 hidden');
				break;
		}
	}
}
var resetStars = function (){
	stars = 3;
	for (var i = 1; i <= 3; ++i){
			$('.score-panel li.star'+i).attr('class', 'star'+i);
	}
};
/** END Deling with 'starts' logic **/

/*** TIMER:Cunt seconds and minutes ***/
// Start Timer
var countSecondsAndMinutes = function () {
	// console.log('countSeconds on');
	seconds++;
	minutes = Math.floor(seconds/60);
};
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
};
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
};
/* End TIMER: Count seconds and minutes */


// START GAME
var startGame = function () {
	$('#welcome-pane').off('click');
	$('#welcome-pane').toggle('noVisible');
	$('.deck').fadeTo('slow', '1');
	newGame();
};
// newGame
function newGame () {
	clearInterval(timer);
	shuffle(dashboardPositions);
	setDashboardCards();
	$('li.card').attr('class', 'card match');
	setTimeout(function(){ $('li.card').attr('class', 'card');}, 450);
	startTimer();
	setStartingValues();
	$('.moves').text(moves);
	cardOnClick();
	gamesPlayed++;
}
// Restart game
var restartGame = function () {
	$('.card').off('click');
	$('#result-pane').attr('class', 'container noVisible')
	$('.deck').fadeTo('slow', '1');
	newGame();
	console.log('matchedCards = '+matchedCards);
};

// Set starting values for a new game to variables
var setStartingValues = function (){
	matchedCards = 0;
	moves = 0;
	resetStars();
	compareCard = [];
	seconds = 0;

};
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
var youWin = function(){
	if ( matchedCards === gameLevel ){
		clearInterval(timer);
		$('.card').off('click');
		$('.deck').fadeTo('slow', '0.5');
		$('#result-pane').toggleClass('noVisible');
		// $('.youWin').toggleClass('noVisible');
		$('.message-win-lose').html('<h1>Fantastic! you win.</h1>');
	}
};
var youLose = function(){
			clearInterval(timer);
			$('.card').off('click');
			$('.deck').fadeTo('slow', '0.5');
			$('#result-pane').toggleClass('noVisible');
			// $('.youLose').toggleClass('noVisible');
			$('.message-win-lose').html('<h1>You can do it better! try again.</h1>');
};
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
	console.log('matchedCards ='+matchedCards);
	youWin();
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
	console.log('moves ='+moves);
	// Logic when 2 cards have been cliked.
	if( compareCard.length == 2 ){
		console.log(compareCard[1][1]);
		console.log(compareCard[0][1]);
		console.log("cartas son iguales? "+ (compareCard[0][1] === compareCard[1][1]));
		if ( compareCard[0][1] === compareCard[1][1] ) {
			console.log("Cartas son iguales");
			console.log(compareCard);
			cardsMatch();
		} else if (stars===0){
					youLose();
		} else {
			console.log("cartas no son iguales");
			console.log(compareCard);
			// toggle to open and DELAY this action.
			setTimeout(hideCard,300);
		} // end if-else

	} //end if (compareCard.length == 2)
};

// Logic when clicking a card
function	cardOnClick() {
	 // $('.card').on('click', function (e){})
	 $('.card').on('click', actionOnClic);
} // end cardOnClick()


/* END FUNCTIONS */
/* END GAME LOGIC */

/* LAUNCH APP.JS */
$(function (){
	/* Launch event handlers */
	$('.restart').on('click', restartGame);
	// Shuffle Cards at the very beginning
	shuffle(cardOptions);
	// Set sample dashboard for the welcome-pane
	setDashboardCards();
	// show smaple dashboard for the welcome-pane
	$('li.card').attr('class', 'card open show');
	$('.deck').fadeTo('slow', '0.2');
	// WELCOME-PANE: event listener to Play button
	$('#welcome-pane .play-button').on('click', startGame);


});

/* TESTING LOCAL STORAGE */
// Function from @MDN
// Here is a function that detects whether localStorage is both supported and available:
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

console.log('localStorage available: '+storageAvailable("localStorage"));
console.log('sessionStorage available: '+storageAvailable("sessionStorage"));
// alert('localStorage available: '+storageAvailable('localStorage')+'\n'+'sessionStorage available: '+storageAvailable('sessionStorage'));
if (storageAvailable("localStorage")){

} else {

}

/* END TESTING LOCAL STORAGE */
