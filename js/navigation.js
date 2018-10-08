// var cardHistoryStack = [];
// var cardHistoryStack = JSON.parse(localStorage.cardHistoryStack) || ['main'];
var cardHistoryStack = [];
/*
* Enables the back button to work
*/
function gotoPreviousCard() {
  if (cardHistoryStack.length === 1) {
    return;
  }
  removeLastCardAttachment();
  removeLastCardAttachment().loadCard();
}


function rewindToPreviousCard(title) {
  if (cardHistoryStack.includes(title)) {
    let lastCard;
    do {
      lastCard = removeLastCardAttachment()
    } while (lastCard.title !== title)
  }
}


function getCardHistoryPrefix(modifier=0) {
  let prefix = '' + (cardHistoryStack.length + modifier);
  return 'c000'.substring(0, 4 - prefix.length) + prefix;
}

function removeLastCardAttachment() {
  let lastTitle = cardHistoryStack.pop();
  let lastCard = globalCardDict[lastTitle];
  let lastNode = document.getElementById(lastCard.getDivTitle(1));
  if (lastNode) lastNode.parentNode.removeChild(lastNode);
  return lastCard;
}
