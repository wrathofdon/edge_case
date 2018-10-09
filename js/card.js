class Card {
  constructor(title, rawText) {
    this.title = title;
    this.rawText = rawText;
    this.cardVar = {timesLoaded: 0};[];
    this.innerBlocks = splitTextIntoBlocks (rawText, bbCodeProcessCard, true, this);
    this.alwaysUpdateBlocks = [];
    this.excerpts = {};
    this.buttonBlocks = [];
    this.startJS = [];
    this.initJS = [];
    this.endJS = [];
    this.exitJS = []
  }

  getDivTitle(modifier=0) {
    return `${getCardHistoryPrefix(modifier)}-${this.title}`
  }
  /*
  * Loads card to html
  */
  loadCard(backtrack=false) {
    if (currentButton) currentButton.disable();
    for (let id in currentButtons) currentButtons[id].onExit();
    if (globalSettings.rewindAttachment && cardHistoryStack.includes(this.title)) {
      rewindToPreviousCard(this.title);
      backtrack = true;
    }
    cardHistoryStack.push(this.title);
    tempVar = {};
    cardVar = this.cardVar;
    cardVar.timesLoaded += 1;
    for (let i in this.buttonBlocks) {
      let block = this.buttonBlocks[i];
      if (block.properties.update !== 'never') {
        block.button.toggleOn = false;
        block.button.enable();
      }
      currentButtons[block.getHtmlId()] = block.button;
    }
    // clears temporary variables and updates pointer to card variables
    if (cardVar.timesLoaded === 1) {
      for (let i in this.initJS) this.initJS[i].parseContents();
    }
    for (let i in this.startJS) this.startJS[i].parseContents();
    let contents = joinBlockArray(this.innerBlocks);
    contents = `<a name="${this.getDivTitle()}"></a>` + contents;
    let html = `<div id='${this.getDivTitle()}' class='cardwindow'>${contents}<hr></div>`;
    if (globalSettings.loadAttachDefault) mainHTMLnode.innerHTML = null;
    mainHTMLnode.innerHTML += html;
    for (let i in this.endJS) this.endJS[i].parseContents();
    activateEventListeners();
    currentCard = this;
    if (!backtrack) {
      window.location.href = `#${this.getDivTitle()}`;
      window.scrollBy(0,-30);
    }
  }

  /*
  * Checks blocks with ids and updates them if necessary
  */
  updateBlocks() {
    for (let i in this.alwaysUpdateBlocks) {
      this.alwaysUpdateBlocks[i].updateContents();
    }
  }
}
