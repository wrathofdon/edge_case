class Block
{
  constructor(tag, properties, rawText, dict, recursive = false, card = null) {
    this.tag = tag;
    this.properties = properties || {};
    this.rawText = rawText;
    this.dict = dict;
    if (this.tag === '2js') this.rawText = this.rawText.replaceAll('\n', ' ');
    this.innerBlocks = (recursive && rawText) ?
      splitTextIntoBlocks(rawText, dict, recursive, card) : null;
    this.card = card;
    this.button = null;
    this.htmlId = null;
    this.classes = [];
    this.lockedContent = null;
    this.condition = null;
    this.enabled = true;
    this.initializeProperties();
  }

  initializeProperties() {
    // moves properties from properties object to block properties
    if (this.properties.update)
      this.properties.update = (this.properties.update).toLowerCase().trim();
    if (this.properties.condition)
      this.condition = this.properties.condition;
    if (this.properties.id)
      this.htmlId = this.properties.id;
    else if (this.properties.update === 'always' || (['2button', '2toggle', '2reveal'].includes(this.tag))) {
      this.htmlId = `uid${getUniqueId()}`;
    }
    if (this.properties.class)
      this.classes = this.properties.class
        .replace(/^\s+/,'').replace(/\s+$/,'').split(/\s+/);
    if (this.properties.cardlink) this.classes.push('cardlink');
    if (this.tag === '2button') {
      this.button = new Button(this, this.card);
      this.button.persist = this.properties.persist;
    } else if (this.tag === '2toggle' || this.tag === '2reveal') {
      this.classes.push('toggleOff');
    } else if (this.properties.url) {
      this.properties.target = this.properties.target || 'blank';
    } else if (this.tag === '2img') {
      this.properties['src'] = this.rawText;
    } else if (this.tag === '2eccode') {
      this.classes.push('eccodebq');
    }
  }

  // generates unique ID based on block ID and current card number
  getHtmlId(modifier=0, prefix=null) {
    return `${getCardHistoryPrefix(modifier, prefix)}-${this.htmlId}`;
  }

  // returns node for block if node is present
  getNode(modifier=0, prefix=null) {
    return document.getElementById(this.getHtmlId(modifier, prefix));
  }

  // removes node associated with block from DOM
  removeNode(modifier=0, prefix=null) {
    $(`#${this.getHtmlId(modifier, prefix)}`).slideUp(250);
    let currentNode = this.getNode(modifier, prefix);
    if (currentNode) {
      setTimeout(function(){
        currentNode.parentNode.removeChild(currentNode);
      }, 250)
    }
  }

  // returns a deep copy of current block assigned to a different card
  makeCopy(card) {
    return new Block(this.tag, this.properties, this.rawText, this.dict, true, card);
  }

  // parses the internal contents of the block prior to being processed by tag
  getContents() {
    if (this.tag === null || this.innerBlocks === null) return this.rawText;
    this.checkCondition();
    if (!this.enabled) {
      return '';
    }
    if (this.lockedContent) {
      if (this.tag === '2jsreturn') {
        return eval(this.lockedContent)
      }
      return this.lockedContent;
    }
    let contents = joinBlockArray(this.innerBlocks);
    if (this.properties.update === 'never') this.lockedContent = contents;
    if (this.tag === '2jsreturn') {
      this.lockedContent = `(function () {${contents}})();`;
      return eval(this.lockedContent);
    }
    return contents;
  }

  // updates contents of node if node exists
  updateContents(modifier=0, prefix=null) {
    if (!this.htmlId) return;
    let node = this.getNode(modifier, prefix);
    if (!node) return;
    this.checkCondition();
    if (this.enabled) {
      if (node) {
        node.innerHTML = this.getContents();
      }
    }
  }

  // checks if block requires condition, and if condition is met
  // sets enabled boolean accordingly
  checkCondition() {
    if (this.button) {
      if (!this.button.enabled) {
        return;
      }
    }
    if (!this.condition || !this.card) return;
    if (typeof(this.lockedContent) === 'string') return;
    this.enabled = eval(this.condition);
    if (this.enabled) {
      this.removeClassProperty('hidden');
    } else {
      this.addClassProperty('hidden');
    }
    return;
  }

  // parses block based on block data and tag behavior
  parseContents() {
    return this.dict[this.tag](this);
  }

  // outputs a string of properties for html
  getPropertiesOutput() {
    let output = [];
    if (this.htmlId) {
      output.push(`id="${this.getHtmlId()}"`);
    }
    if (this.classes.length) {
      output.push(`class="${this.classes.join(' ')}"`);
    }
    for (let property in this.properties) {
      output.push(`${property}="${this.properties[property]}"`);
    }
    return output.join(' ');
  }

  // adds class property from block, adds to node if node is present
  addClassProperty(str) {
    if (!this.classes.includes(str)) {
      this.classes.push(str);
      $(`#${this.getHtmlId()}`).addClass(str);
    }
  }

  // removes class property from block, removes from node if node is present
  removeClassProperty(str) {
    if (this.classes.includes(str)) {
      delete this.classes[this.classes.indexOf(str)];
      $(`#${this.getHtmlId()}`).removeClass(str);
    }
  }
}
