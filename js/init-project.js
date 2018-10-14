/*
* PROJECT VARIABLES
*/

var rawScript = ''; // the main input string that the program takes in
var globalCardDict = {}; // maps card titles to card objects
var globalTagTrie = {}; // maps dictionaries to trie data structures
var mainHTMLnode = document.getElementById('mainWindow');

var globalVar = {} // shared object for storing variables among all cards
var cardVar = {}; // placeholder for current card persistant variables
var tempVar = {}; // object for storing data that will disappear when card is exited

// presents information if the program is in the process of doing something
var projectState = {
  loadingCardNum: null,
  currentButtonCardNum: null
}

var currentCard = null; // placeholder for current active card
var currentButton = null; // placeholder for current button clicked
var sUniqueIdCounter = 0; // used for generating new IDs for html nodes

/*
* PROTOTYPES
*/

//Allows quick access to last element to array, similar to Python
Object.defineProperty(Array.prototype, '-1', {
  get() { return this[this.length - 1] ;}
});
//Allows quick access to last character in string, similar to Python
Object.defineProperty(String.prototype, '-1', {
  get() { return this[this.length - 1] ;}
});
//returns a version of the string with all instances of substring replaced
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};


/*
* PREPROCESS SCRIPT
*/

function preprocessRaw(text) {
  // uses "~" as escape character to ignore blocks that should be parsed as text
  text = text.replaceAll('~[', '&lsqb;');
  text = text.replaceAll('~<', '&lt;').replaceAll('~>', '&gt;');
  text = preprocessRemoveComments(text);
  text = preprocessBasicHTML(text);
  return text;
}

// Removes comments that are surrounded by [$]comment[/$] tags
function preprocessRemoveComments(text) {
  let array = splitTextIntoBlocks (text, {'2$': null});
  for (let i = 0; i < array.length; i++) {
    if (typeof(array[i]) !== 'string') array[i] = '';
  }
  return array.join('');
}

// Does string substitution for common and simple html symbols
function preprocessBasicHTML(text) {
  let htmlConversions = {
    'b': 'strong',
    'i': 'em',
    'u': 'u',
    'br': 'br',
    'p': 'p',
    'code': 'pre',
    'hr': 'hr',
    'bq': 'blockquote'
  }
  for (let tag in htmlConversions) {
    text = text.replace(new RegExp(`\\[${tag}\\]`, 'ig'), `<${htmlConversions[tag]}>`);
    text = text.replace(new RegExp(`\\[/${tag}\\]`, 'ig'), `</${htmlConversions[tag]}>`);
  }
  return text;
}
