/*jshint esversion: 6 */

// var glob = {}; // for creating global variables.
var slides = {}; // a dictionary of slides, indexed by id
var slideHistory = ['START']; // an array of slide ids the user has visited, order
var recentSlide = null;
var outputLog = [];


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
    this.addHTML('<hr>' + convertText(this.description));
    var menu = document.getElementById(`${this.id}-menu`);
    for (var i = 0; i < this.buttons.length; i++) {
      var button = this.buttons[i];
      button.createButton();
      button.checkState();
    }
    if (this.script) {
      eval(this.script);
    }
  }

  addHTML(text) {
    document.getElementById(this.id).innerHTML += convertText(text);
  }

  addButton(obj) {
    this.buttons.push(new Button(this.id, this.buttons.length, obj));
  }

  checkButtons() {
    for (var i = 0; i < this.buttons.length(); i++) {
      this.buttons[i].checkState();
    }
  }

  hideButtons() {
    document.getElementById(`${this.id}-menu`).setAttribute('class', 'menu-hidden');
  }
}

function addSlide (id) {
  slides[id] = new Slide(id);
  recentSlide = slides[id];
}

function goTo (title) {
  if (slideHistory.length > 0) slides[slideHistory[slideHistory.length - 1]].hideButtons();
  slides[title].createSlide();
  slideHistory.push(title);
}

function clearSlide(title) {
  let parent = document.getElementById('main');
  outputLog.pop();
  parent.removeChild(document.getElementById(title));
  parent.removeChild(document.getElementById(title + '-menu'));
}

function printSummary(){
  var end = document.getElementById('END');
  console.log(outputLog);
  for (var i = 0; i < outputLog.length; i++) {
    if (outputLog[i]) {
      slides['END'].addHTML('<br>' + outputLog[i] + '<br>')
    }
  }
}

addSlide('END');
recentSlide.description = '[u][i][b]In Summary:[/b][/i][/u][br][br]';
recentSlide.script = 'printSummary();';

function startSlideShow() {
  slides['START'].createSlide();
  $('.button').click(runButtonScript);

  $('#GoBack').click(function() {
    if (slideHistory.length > 1) {
      let title = slideHistory.pop();
      clearSlide(title);
      title = slideHistory.pop();
      clearSlide(title);
      goTo(title);
      $('.button').click(runButtonScript);
    }
  });
}
