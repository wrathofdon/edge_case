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
var globalTagTrie = {};
// A stack containing previously visited cards so you can go back
var cardHistoryStack = [];

// A global dictionary of block ids to block.
// Necessary in preprocess to keep track of excerpts in case you want a copy
var globalExcerpts = {};

// A list of all the tags that the parser can recognized
// In the pre-process stage, these will be converted to lowercase
var globalTagList = ['card', 'html', 'b', 'i', 'u', 'br', 'p', 'code', 'hr'];
