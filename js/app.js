 /*
 * Create a list that holds all of your cards
 */
var gamesPlayed = 0;
var dashboardPositions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
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

		var cardOptionosi = '<i class="fa '+cardOptions[i+gamesPlayed]+'></i>';
		console.log('innerHtml: '+cardOptionosi);
		console.log($('li.card li.fa').eq(dashboardPositions[i]).attr('class'));
		$('li.card i.fa').eq(dashboardPositions[i]).attr('class', 'fa '+cardOptions[j+gamesPlayed]);
		$('li.card i.fa').eq(dashboardPositions[i+1]).attr('class', 'fa '+cardOptions[j+gamesPlayed]);
		j++;
	}

	gamesPlayed++;
}

// FUNCTION newgGame
function newGame () {

	// shuffle(dashboardPositions);
	setDashboardCards();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




 /* LAUNCH APP.JS
 */
 $(function (){
 	// Shuffle Cards at the very beginning
 	shuffle(cardOptions);
 	// Launch a starting game
 	newGame();
 	$('li.card').attr('class', 'card open show');
 });
