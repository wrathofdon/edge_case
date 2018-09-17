/*jshint esversion: 6 */
/* global splitStringByTags bbCodeRenderText */

// these are objects that the user can store variables into to prevent collissions
// Later on, these variables could also be saved in local storage
var globalVar = {};
var cardVar = {};
var tempVar = {};

// the input variable
var rawScript = '';

// a dictionary mapping card title to card object
var globalCardDict = {};
var globalButtons = {};
// A stack containing previously visited cards so you can go back
var cardHistoryStack = [];

// A global dictionary of block ids to block.
// Necessary in preprocess to keep track of excerpts in case you want a copy
var globalExcerpts = {};

// A list of all the tags that the parser can recognized
// In the pre-process stage, these will be converted to lowercase
var globalTagList = ['card', 'html', 'b', 'i', 'u', 'br', 'p', 'preformatted', 'hr'];

/*
* you can now use [-1] as an array index to quickly retrieve the last element
*/
Object.defineProperty(Array.prototype, '-1', {
  get() { return this[this.length - 1] ;}
});

/*
* you can now use [-1] as an string index to quickly retrieve the last element
*/
Object.defineProperty(String.prototype, '-1', {
  get() { return this[this.length - 1] ;}
});

/*
* Replaces all occurances of a substring within a string
*/
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

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
  for (let i in Object.keys(dict)) {
    let key = Object.keys(dict)[i];
    globalTagList.push(key.substring(1));
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
  delete cardHistoryStack[cardHistoryStack.length - 1];
  cardHistoryStack.length -= 1;
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
