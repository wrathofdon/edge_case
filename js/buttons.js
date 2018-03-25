/*jshint esversion: 6 */

/* global parseJSCode */
class Button {
    constructor(source, position, rawText) {
        this.source = source;
        this.position = position;
        this.buttonId = source + '-Button-' + position;
        this.rawText = rawText;

        this.display = '';
        this.addBBCode = [];
        this.condition = null;
        this.link = null;
        this.limit = defaultButtonLimit; // the number of times the button can be clicked before disappearing.  For no limit, set to -1.
        this.count = defaultButtonLimit;

        this.parseButton();
    }

    // converts the rawText into button properties
    parseButton() {
        var arr = this.rawText.split('\n');
        this.display = arr[0].trim();
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].substring(0, 6).toLowerCase() === '+cond:')
                this.condition = arr[i].substring().trim();
            else if (arr[i].substring(0, 8).toLowerCase() === '+bbcode:')
                this.addBBCode.push(arr[i].substring(8).trim());
            else if (arr[i].substring(0, 7).toLowerCase() === '+limit:')
                this.limit = parseInt(arr[i].substring(6));
            else if (arr[i].substring(0, 2).toLowerCase() === '->')
                this.link = arr[i].substring(2).trim();
        }
    }

    getHTML() {
        return parseJSCode(this.display);
    }

    // makes button visible by default if no condition is specified
    // if condition exists, then button is only visible if the condition is true.
    checkState() {
        var button = document.getElementById(this.buttonId);
        if (button.count === 0) button.setAttribute('class', 'button-hidden');
        else if (!this.condition) button.setAttribute('class', 'button-visible');
        else if (eval(this.condition)) button.setAttribute('class', 'button-visible');
        else button.setAttribute('class', 'button-hidden');
    }
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