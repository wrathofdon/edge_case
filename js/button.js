class Button {
  constructor(block, card) {
    this.card = card;
    this.block = block;
    this.block.addClassProperty('button');
    this.displayLabel = null;
    this.toggleDisplayBlock = null;
    this.actionBlock = null;
    this.toggleBlock = null;
    this.toggleOn = false;
    this.cardlink = null;
    this.cardattach = null;
    this.enabled = true;
    this.parseInnerContents();
  }

  // what to do when button is clicked
  clickButton() {
    if (!this.enabled) {
      activateEventListeners();
      return;
    }
    currentButton = this;
    if (this.actionBlock) {
      eval(this.actionBlock.getContents())
    }
    this.toggleButton();
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


  disable() {
    this.enabled = false;
    this.block.removeClassProperty('buttonDefaultStyle');
    this.block.addClassProperty('buttonGrayedOut');
  }
  enable() {
    this.enabled = true;
    this.block.addClassProperty('buttonDefaultStyle');
    this.block.removeClassProperty('buttonGrayedOut');
  }

  /*
  * Outputs for html.  Creates placeholder for toggled text if necessary
  */
  getButtonHtml() {
    this.block.checkCondition();
    if (!this.block.enabled) {
      let output = `<div ${this.block.getPropertiesOutput()}></div>`;
      if (this.toggleBlock)
        output += `<div ${this.toggleBlock.getPropertiesOutput()}></div>`;
      return output;
    }
    if (!this.toggleBlock) {
      return `<div ${this.block.getPropertiesOutput()}>${this.getDisplayContent()}</div>`
    }
    return `<div ${this.block.getPropertiesOutput()}>${this.getDisplayContent()}</div>
      <div ${this.toggleBlock.getPropertiesOutput()}>${this.getToggleContent()}</div>`;
  }

  toggleButton() {
    if (!this.toggleBlock) return;
    if (this.toggleOn) this.toggleOnToOff();
    else this.toggleOffToOn();
  }

  toggleOnToOff() {
    this.toggleOn = false;
    if (this.toggleDisplayBlock) {
      document.getElementById(this.block.getHtmlId()).innerHTML = this.getDisplayContent();
    }
    this.toggleBlock.removeClassProperty('toggleOn');
    this.toggleBlock.addClassProperty('toggleOff');
  }

  toggleOffToOn() {
    this.toggleOn = true;
    if (this.toggleBlock.tag === '2reveal') {
      this.disable();
    }
    if (this.toggleDisplayBlock) {
      document.getElementById(this.block.getHtmlId()).innerHTML = this.getDisplayContent();
    }
    this.toggleBlock.addClassProperty('toggleOn');
    this.toggleBlock.removeClassProperty('toggleOff');
    document.getElementById(this.toggleBlock.getHtmlId()).innerHTML = this.getToggleContent();
  }

  /*
  * Parses inner button components upon initialization
  */
  parseInnerContents() {
    let innerBlocks = this.block.innerBlocks;
    // if there are no tags, treat the unformatted text as the display block
    if (this.block.properties.cardlink) {
      this.cardlink = this.block.properties.cardlink;
      delete this.block.properties['cardlink'];
      this.block.removeClassProperty('cardlink');
    }
    if (innerBlocks.length === 1 && typeof(innerBlocks[0]) === 'string') {
      this.displayLabel = innerBlocks[0];
      return;
    }
    for (let i in innerBlocks) {
      let block = innerBlocks[i];
      if (typeof(block) === 'string') continue;
      block.properties.source = this.block.htmlId;
      switch(block.tag) {
        case '2js': this.actionBlock = block; break;
        case '2label': this.displayLabel = block; break;
        case '2toggle': this.toggleBlock = block; break;
        case '2togglelabel': this.toggleDisplayBlock = block; break;
        case '2reveal': this.toggleBlock = block; this.hideOnToggle = true; break;
        default: break;
      }
      if (block.tag === '2toggle' || block.tag === '2reveal') {
        block.addClassProperty('toggleOff');
      }
    }
    if (!this.displayLabel) {
      this.displayLabel = new Block('2label', null, this.block.content, this.block.dict, true, this.card)
    }
  }

  getDisplayContent() {
    if (typeof(this.displayLabel) === 'string') return this.displayLabel;
    if (this.toggleOn && this.toggleDisplayBlock) {
      return this.toggleDisplayBlock.getContents();
    }
    return this.displayLabel.getContents();
  }

  getToggleContent() {
    if (this.toggleOn && this.toggleBlock)
      return this.toggleBlock.getContents();
    return '';
  }

  onExit() {
    if (this.enabled) {
      this.block.removeNode();
      if (this.toggleBlock) {
        this.toggleBlock.removeNode()
      }
    }
  }
}
