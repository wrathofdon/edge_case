/*jshint esversion: 6 */

// var glob = {}; // for creating global variables.
var slides = {}; // a dictionary of slides, indexed by id
// var slideHistory = []; // an array of slide ids the user has visited, order
var recentSlide = null;

class Button {
  constructor(source, position, obj) {
    this.source = source; // id of the slide this button belongs to
    this.position = position; // a number which is the button position within the slide
    this.display = obj.display; // display text of the button
    this.addedText = obj.addedText; // optional: additional text which appears without leaving current slide
    this.conditional = obj.conditional; // optional: conditional to determine if button appears
    this.script = obj.script; // optional: javascript that will run upon being clicked
    this.finalOutpout = obj.finalOutpout; // optional: extra text that will be added to final summary
    this.check = false;

    // TODO: Create button
  }

  buttonId() {
    return this.source + '-Button' + this.position; // unique html id of the button
  }

  createButton() {
    var slideMenuDiv = document.getElementById(this.source + '-menu');
    slideMenuDiv.innerHTML += '<div id="' + this.buttonId()
      + '" class="button">' + this.display + '</div>';
  }

  checkState() {
    var button = document.getElementById(this.buttonId());
    if (!this.check) button.setAttribute('display', 'block');
    else if (eval(this.check)) button.setAttribute('display', 'block');
    else button.setAttribute('display', 'none');
  }
}

class Slide {
  constructor(id) {
    this.id = id;
    this.local = {};
    this.buttons = [];
    this.description = '';
    this.script = undefined;
  }

  createSlide() {
    var main = document.getElementById('main');
    // if (this.script !== undefined) eval(this.script);
    main.innerHTML += `<div id="${this.id}" class="slide"></div>`;
    main.innerHTML += `<div id="${this.id}-menu" class="menu"></div>`;
    document.getElementById(this.id).innerHTML = convertText(this.description);
    var menu = document.getElementById(`${this.id}-menu`);
    for (var i = 0; i < this.buttons.length; i++) {
      var button = this.buttons[i];
      button.createButton();
      button.checkState();
    }
  }

  addButton(obj) {
    this.buttons.push(new Button(this.id, this.buttons.length, obj));
  }

  checkButtons() {
    for (var i = 0; i < this.buttons.length(); i++) {
      this.buttons[i].checkState();
    }
  }
}

function addSlide (id) {
  slides[id] = new Slide(id);
  recentSlide = slides[id];
}


function convertText (text) {
  while (text.toLowerCase().indexOf('[br]') > -1) {
    var position = text.toLowerCase().indexOf('[br]');
    text = text.substring(0, position) + '<br>' + text.substring(position + 4);
  }
  var bbCode = findTags(text);
  while (bbCode) {
    // TODO: Process tag
    if (bbCode.tag === 'img') {
      text = bbCode.textBefore + '<img src="' + bbCode.content + '>' + bbCode.textAfter;
    } else if (bbCode.tag === 'b') {
      text = bbCode.textBefore + '<strong>' + bbCode.content + '</strong>' + bbCode.textAfter;
    } else if (bbCode.tag === 'i') {
      text = bbCode.textBefore + '<em>' + bbCode.content + '</em>' + bbCode.textAfter;
    } else if (bbCode.tag === 'u') {
      text = bbCode.textBefore + '<u>' + bbCode.content + '</u>' + bbCode.textAfter;
    } else if (bbCode.tag === 'url') {
      text = bbCode.textBefore + '<a href="' + bbCode.attribute + '" target="blank">' + bbCode.content + bbCode.textAfter;
    } else if (bbCode.tag === 'js') {
      text = bbCode.textBefore + eval(bbCode.content) + bbCode.textAfter;
    } else {
      text = bbCode.textBefore + bbCode.content + bbCode.textAfter;
    }
    bbCode = findTags(text);
  }
  return text;
}

function findTags(text) {

  var lower = text.toLowerCase();
  var closeStart = lower.indexOf('[/');
  if (closeStart === -1) return false;
  var closeEnd = lower.substring(closeStart).indexOf(']') + closeStart;
  if (closeEnd === -1) return false;
  var tagLength = closeEnd - closeStart - 2;
  var tag = lower.substring(closeStart + 2, closeStart + 2 + tagLength);
  var openStart = lower.lastIndexOf('[' + tag);
  if (openStart === -1) return false;
  var openEnd = findClosingBracket(lower, openStart, closeStart);
  if (openEnd === -1) return false;
  var assignmentPosition = text.substring(openStart).indexOf('=') + openStart;
  var hasAttribute = assignmentPosition > -1;
  var content = text.substring(openEnd + 1, closeStart);
  var attribute;
  if (!hasAttribute) attribute = null;
  else attribute = text.substring(assignmentPosition + 1, openEnd);
  return {
    textBefore : text.substring(0, openStart),
    textAfter : text.substring(closeEnd + 1),
    tag : tag,
    attribute : attribute,
    content : content
  }
}

function findClosingBracket(text, start, end) {
  var position = start;
  var count = 1;
  while (count !== 0 && position < end) {
    position++;
    if (text[position] === '[') count++;
    if (text[position] === ']') count--;
  }
  return position;
}


addSlide('START') // Replace this string with the title of your slide
recentSlide.description = 'add [u][i][b]description[/b][/i][/u] here';
recentSlide.script = 'add javascript here' // this is optional, feel free to leave blank
recentSlide.addButton({
  display : 'button text',
  // optional: additional text which will appear within current slide
  addedText : 'you just added more text!',
  // option: javascript conditionals to determine whether or not button will appear
  conditional : '4 + 4 == 8', // if 4 + 4 = 8, then this button will appear.
  // optional.  Javascript code for advanced programmers
  // script: 'goto("TheNextSlide")'
});
