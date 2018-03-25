/*jshint esversion: 6 */

var rawText = '';
var slides = {}; // maps slide titles to slide objects
var globalHistory = null; // this is a record of the current file path to allow for backtracking
var toggleCounter = 0; // the number of active toggles, so that each one can have a unique ID

var currentSlideName = null; // whenever a new slide is loaded, it will set this variable to itself

var selectedButton = null; // any time a button is clicked, it will set this variable to itself
var currentButtonsDictionary = {}; // maps button IDs to button objects
var currentButtonsArray = []; // lists button IDs for current slide


var defaultLinkType = 'attach'; // the default method for loading new slides.  'attach' means the next slide will be attached to the current, while 'goto' will result in clearing the current slide from the screen
var defaultButtonLimit = 1; // the default number of times a button can be clicked before disappearing.  Set to -1 for no limit.

// retrieves the current slide object
function currentSlide() {
    return slides[currentSlideName];
}


function runButton () {
    var id = this.getAttribute('id');
    selectedButton = currentButtonsDictionary[id];
    if (selectedButton === null) return;
    if (selectedButton.count > 1) selectedButton.count -= 1; // button no longer shows when this count reaches 0
    let addedText = false; // boolean to determine whether or not additional display text has been added by the BB Code.
    for (let i = 0; i < selectedButton.addBBCode.length; i++) {
        addedText = addedText | currentSlide().addLine(selectedButton.addBBCode[i]);
    }
    if (!addedText) {
        currentSlide().addLine('You selected: ' + selectedButton.display); // if no BB Code text has been added, add the button text to the slide
    }
    if (selectedButton.link) defaultLinkType(selectedButton.link);
    currentSlide().updateButtons();
    $('.button-visible').click(runButton);
}

// allows for negative indexing of arrays.  arr[-1] returns the last item of the array
Object.defineProperty(Array.prototype, '-1', {
    get() { return this[this.length - 1] ;}
});


// makes it so that any toggles that have been added to the slide will now work
function activateToggles() {
    $('.toggle-button').click(function(){
        var id = this.getAttribute('toggleId');
        $('#' + id).toggle();
    });
}


// makes it so that any toggles that have been added to the slide will now work
function activateGoto() {
    $('goto').click(function(){
        globalHistory.goto(this.getAttribute('slide'));
    });
}

// activates non-button interactive elements of the slide
function activateInteraction() {
    activateToggles();
    activateGoto();
}