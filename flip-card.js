var authorNames = document.querySelectorAll('.bg-author-name');
var authorNamesArray = [].slice.call(authorNames);
var flipCards = document.querySelectorAll('.jr-flip-card-container--tn');
var activeCardIndex;

// add a handler to a group of buttons
function addHandlerToBtns() {
  for (var i = 0; i < authorNames.length; i++) {
    addShowCardHandler(authorNames[i]);
  }

  for (i = 0; i < flipCards.length; i++) {
    flipCards[i].addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
}

//
function addShowCardHandler(author) {
  var index = authorNamesArray.indexOf(author);

  author.addEventListener('click', function(e) {
    e.stopPropagation();
    if (activeCardIndex == index) return; // if try to open an opened card

    hideCard();  // hide already opened card if exists
    showCard(index);
    activeCardIndex = index;
  });
}

// show the flip card when author name is clicked
function showCard(index) {
  TweenLite.to(flipCards[index], 0, {visibility: 'visible'});
  TweenLite.to(flipCards[index], 0.35, {scale: 1, opacity: 1, ease: Back.easeOut.config(1.7)});
}

function hideCard() {
  if (activeCardIndex === undefined) return; // if no card is opened

  TweenLite.to(flipCards[activeCardIndex], 0.35, {scale: 0, opacity: 0, ease: Back.easeIn.config(1.7)});
  TweenLite.to(flipCards[activeCardIndex], 0, {visibility: 'hidden', delay: 0.35});
  activeCardIndex = undefined;
}

document.body.addEventListener('click', hideCard);

addHandlerToBtns();
