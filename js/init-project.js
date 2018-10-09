/*
* PROJECT VARIABLES
*/

// the main input string that the program takes in
var rawScript = '';
// dictionary that maps card titles to card objects
var globalCardDict = {};
// maps block conversion dictionaries to a trie structure
var globalTagTrie = {};
var mainHTMLnode = document.getElementById('mainWindow');

// An object for storing all global variables that are shared between cards
var globalVar = {}
// An object for storing variables that are specific to the current card, and
// which will persist for that character afterwards
var cardVar = {};
// An object for variables that are only stored until a new card is loaded
var tempVar = {};

// placeholder for the most recent card being displayed
var currentCard = null;
// placeholder for the most recent button that was clicked
var currentButton = null;
// list of all current buttons for current card
var currentButtons = {};

// A counter to ensure that ids are unqiue for elements that need one
var sUniqueIdCounter = 0;

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
  text = preprocessRemoveComments(text);
  text = preprocessConvertAngledBrackets(text);
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

// Converts any angled bracket that is not inside of an [htmk]text[/html] into
// a version that will not be mistaken for HTML
function preprocessConvertAngledBrackets(text) {
  let array = splitTextIntoBlocks (text, {'2html': null});
  for (let i = 0; i < array.length; i++) {
    if (typeof(array[i]) === 'string') {
      array[i] = array[i].replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    } else {
      array[i] = array[i].rawContent;
    }
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
