class Button {
  constructor(block, card) {
    this.card = card;
    this.block = block;
    this.block.addClassProperty('button');
    this.displayBlock = null;
    this.toggleDisplayBlock = null;
    this.actionBlock = null;
    this.toggleBlock = null;
    this.toggleOn = false;
    this.cardlink = null;
    this.parseInnerContents(block);
  }

  clickButton() {
    if (this.actionBlock) {
      eval(this.actionBlock.content)
    }
    if (this.toggleBlock && typeof(this.block.lockedContent) !== 'string') {
      let toggle = this.toggleBlock;
      let node = document.getElementById(toggle.htmlId);
      if (this.toggleOn) {
        this.toggleOn = false;
        toggle.removeClassProperty('toggleOn');
        toggle.addClassProperty('toggleOff');
        if (this.toggleDisplayBlock) {
          $(`#${this.block.getHtmlId()}`).html(this.displayBlock.getContents());
        }
      } else {
        this.toggleOn = true;
        toggle.removeClassProperty('toggleOff');
        toggle.addClassProperty('toggleOn');
        if (this.toggleDisplayBlock) {
          $(`#${this.block.getHtmlId()}`).html(this.toggleDisplayBlock.getContents());
        }
      }
      this.toggleBlock.updateContents();
      if (this.toggleBlock.tag === '2reveal') {
        this.block.addClassProperty('hidden');
      }
    }
    this.card.updateBlocks();
    if (this.cardlink) {
      let cardlink = globalCardDict[this.cardlink];
      if (cardlink) {
        cardlink.loadCard();
      } else {
        console.log(`error finding card: ${this.cardlink}`);
      }
    }
    activateEventListeners();
  }

  /*
  * Checks to see is button is disabled by toggling revealed text
  */
  buttonDisabled() {
    if (this.toggleBlock && this.toggleBlock.tag === '2reveal' && this.toggleOn) {
      return true;
    }
    return false;
  }

  /*
  * Outputs for html.  Creates placeholder for toggled text if necessary
  */
  getHtml() {
    this.block.checkCondition();
    let displayText = (this.block.disabled) ?
      '' : this.displayBlock.getContents();
    displayText = `<div ${this.block.getPropertiesOutput()}>${displayText}</div>`;
    let toggleText = '';
    if (this.toggleBlock) {
      if (this.toggleOn) {
        toggleText = this.toggleBlock.getContents();
      }
      toggleText = `<div ${this.toggleBlock.getPropertiesOutput()}>${toggleText}</div>`;
    }
    return displayText + toggleText;
  }

  /*
  * Parses inner button components upon initialization
  */
  parseInnerContents() {
    let array = this.block.blockArray.array;
    // if there are no tags, treat the unformatted text as the display block
    if (this.block.properties.cardlink) {
      this.cardlink = this.block.properties.cardlink;
      delete this.block.properties['cardlink'];
      this.block.removeClassProperty('cardlink');
    }
    if (array.length === 1 && array[0].tag === null) {
      this.displayBlock = array[0];
      return;
    }
    for (let i in array) {
      let block = array[i];
      if (block.tag) {
        block.properties.source = this.block.htmlId;
        switch(block.tag) {
        case '2js': this.actionBlock = block; break;
        case '2label': this.displayBlock = block; break;
        case '2toggle': this.toggleBlock = block; break;
        case '2togglelabel': this.toggleDisplayBlock = block; break;
        case '2reveal': this.toggleBlock = block; this.hideOnToggle = true; break;
        default: break;
        }
      }
      if (block.tag === '2toggle' || block.tag === '2reveal') {
        block.addClassProperty('toggleOff');
      }
    }
  }

  getDisplayContent() {
    return this.displayBlock.getContents(this.card);
  }

  getToggleContent() {
    return this.toggleBlock.getContents(this.card);
  }

}
