var buttons = {};

class Button {
  constructor(source, position, obj) {
    this.source = source; // id of the slide this button belongs to
    this.position = position; // a number which is the button position within the slide
    this.display = convertText(obj.display); // display text of the button
    this.addedText = obj.addedText; // optional: additional text which appears without leaving current slide
    this.conditional = obj.conditional; // optional: conditional to determine if button appears
    this.script = obj.script; // optional: javascript that will run upon being clicked
    this.finalOutput = obj.finalOutput; // optional: extra text that will be added to final summary

    this.check = false;
    buttons[this.buttonId()] = this;
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
    if (!this.check) button.setAttribute('class', 'button');
    else if (eval(this.check)) button.setAttribute('class', 'button');
    else button.setAttribute('class', 'hidden');
  }
}

function runButtonScript () {
  var id = this.getAttribute('id');
  outputLog.push(buttons[id].finalOutput);
  eval(buttons[id].script);
  $('.button').click(runButtonScript);
  window.scrollTo(0,document.body.scrollHeight);
}
