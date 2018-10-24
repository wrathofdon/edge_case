// a stack of all the cards visited in the path from start to current
var cardHistoryStack = [];


function getPreviousCardTitle() {
  if (cardHistoryStack.length < 2) return null;
  return cardHistoryStack[cardHistoryStack.length - 2];
}

function gotoPreviousCard() {
  if (cardHistoryStack.length === 1) {
    return;
  }
  // console.log(cardHistoryStack);
  removeLastCardAttachment();
  // console.log(cardHistoryStack);
  // console.log(globalCardDict[cardHistoryStack[-1]]);
  projectState.backwardsNavigation = true;
  globalCardDict[cardHistoryStack[-1]].loadCard();
  // console.log(globalCardDict[cardHistoryStack[-1]])
  projectState.backwardsNavigation = false;
}

function removeLastCardAttachment(instant = false) {
  if (cardHistoryStack.length < 2) return;
  let lastTitle = cardHistoryStack.pop();
  let lastCard = globalCardDict[lastTitle];
  let lastNode = document.getElementById(lastCard.getDivTitle(0, cardHistoryStack.length));

  if (instant) {
    lastNode.parentNode.removeChild(lastNode);
  } else {
    $(`#${lastCard.getDivTitle()}`).slideUp(500)
    setTimeout(function(){
      if (lastNode && lastNode.parentNode) lastNode.parentNode.removeChild(lastNode);
    }, 500);
  }
}

function convertHtmlIdToInt(id) {
  return parseInt(id.substring(1, 4));
}

function convertHtmlIdToCard(id) {
  return globalCardDict[cardHistoryStack[convertHtmlIdToInt(id)]];
}

function convertHtmlIdToButton(id) {
  let card = convertHtmlIdToCard(id);
  if (!card || !card.buttonBlocks) return null;
  let block = card.buttonBlocks[id.substring(5)];
  if (block) return block.button;
  return null;
}

function getCardHistoryPrefix(modifier=0, prefix=null) {
  if (prefix !== null && prefix >= 0) prefix = prefix + '';
  else if (projectState.loadingCardNum !== null) prefix = projectState.loadingCardNum + '';
  else if (projectState.currentButtonCardNum !== null)
    prefix = '' + projectState.currentButtonCardNum;
  else prefix = '' + (cardHistoryStack.length + modifier);
  return 'c000'.substring(0, 4 - prefix.length) + prefix;
}

// activates non-button interactive elements of the slide
function activateEventListeners() {
  $('.cardlink').off('click');
  $('.cardlink').click(function(){
    let id = this.getAttribute('cardlink');
    let card = globalCardDict[id];
    if (card) {
      card.loadCard();
    } else {
      console.log(`${id} not found`);
    }
  });
  $('.button').off('click');
  $('.button').click(function(){
    let id = this.getAttribute('id');
    let button = convertHtmlIdToButton(id);
    if (!button) {
      console.log(`error loading button: ${id}`);
      return;
    }
    button.clickButton(convertHtmlIdToInt(id));
  });
}

function hideLocalElement(element, time=500) {
  $(`#${getCardHistoryPrefix()}-${element}`).slideUp(time);
}

function showLocalElement(element, time=500) {
  $(`#${getCardHistoryPrefix()}-${element}`).slideDown(time);
}

function getTimesLoaded(title) {
  return globalCardDict[title].cardVar.timesLoaded;
}
