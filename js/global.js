/*
* Removes quotation marks.  You can also request an alternative symbol
*/
function removeQuotes(text, symbol='\'"') {
  if (!text || !text.trim()) {
    return false;
  }
  text = text.trim();
  if (text[0] === text[-1] && (symbol.includes(text[0]))) {
    text = text.substring(1, text.length - 1);
  }
  return text;
}

/*
* Imports a parser dictionary and collects all the keys
* During preprocessing, all known keys will be converted to lowercase
*/
function addToGlobalTagList(dict) {
  globalTagTrie[dict] = {}
  for (let i in Object.keys(dict)) {
    let key = Object.keys(dict)[i];
    globalTagList.push(key.substring(1));
    let currentDict = globalTagTrie[dict];
    for (let j = 1; j < key.length; j++) {
      if (!currentDict[key[j]]) {
        currentDict[key[j]] = {};
      }
      currentDict = currentDict[key[j]];
    }
    currentDict[' '] = key;
    currentDict[':'] = key;
    currentDict[']'] = key;
  }
}

/*
* A method of generating unique numbers for unique html IDs
*/
var sUniqueIdCounter = 0;
function getUniqueId() {
  sUniqueIdCounter += 1;
  return sUniqueIdCounter;
}

/*
* Enables the back button to work
*/
function gotoPreviousCard() {
  if (cardHistoryStack.length === 1) {
    return;
  }
  cardHistoryStack.pop();
  cardHistoryStack[- 1].loadCard(true);
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
    let buttonBlock = globalButtons[id];
    if (!buttonBlock) {
      console.log(`error loadeding button: ${id}`);
      return;
    }
    buttonBlock.button.clickButton();
  });
}
