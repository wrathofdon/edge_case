class Card {
  constructor(title, rawText) {
    this.title = title;
    this.rawText = rawText;
    this.cardVar = {timesLoaded: 0};[];
    this.innerBlocks = splitTextIntoBlocks (rawText, bbCodeProcessCard, true, this);
    this.alwaysUpdateBlocks = [];
    this.excerpts = {};
    this.buttonBlocks = {};
    this.startJS = [];
    this.initJS = [];
    this.endJS = [];
    this.exitJS = []
  }

  getDivTitle(modifier=0, prefix=null) {
    return `${getCardHistoryPrefix(modifier, prefix)}-${this.title}`
  }

  // loads card to DOM
  loadCard(backtrack=false) {
    if (currentButton) currentButton.disable();
    this.removeUnusedButtons();
    // if card was already loaded in the past, we can return to that card
    if (globalSettings.rewindAttachment && cardHistoryStack.includes(this.title)) {
      while (cardHistoryStack[-1] !== this.title) {
        removeLastCardAttachment();
      }
      this.loadCardNode();
    } else if (projectState.backwardsNavigation && cardHistoryStack[-1] === this.title) {
      projectState.loadingCardNum = cardHistoryStack.length - 1;
      this.loadCardNode();
    } else {
      cardHistoryStack.push(this.title);
      projectState.loadingCardNum = cardHistoryStack.length - 1;
      this.appendCardNode();
    }

    // clears temporary variables and updates pointer to card variables
    currentCard = this;
    projectState.loadingCardNum = null;
  }

  // add div for the card to the DOM
  appendCardNode() {
    $('#mainWindow').append(`<div id='${this.getDivTitle()}' class='cardwindow'></div>`);
    let cardNode = $(`#${this.getDivTitle()}`);
    cardNode.hide();
    this.loadCardNode()
    cardNode.slideDown(500);
  }

  // loads contents of card into node, can also be used to update
  loadCardNode() {
    tempVar = {};
    cardVar = this.cardVar;
    cardVar.timesLoaded += 1;
    if (cardVar.timesLoaded === 1) {
      for (let i in this.initJS) this.initJS[i].parseContents();
    }
    for (let i in this.buttonBlocks) {
      let block = this.buttonBlocks[i];
      if (block.properties.update !== 'never') {
        block.button.toggleOn = false;
        block.button.enable();
      }
    }
    for (let i in this.startJS) this.startJS[i].parseContents();
    let contents = joinBlockArray(this.innerBlocks);
    let divTitle = this.getDivTitle(0, cardHistoryStack.lastIndexOf(this.title));
    contents = `<a name="${divTitle}"></a>` + contents;
    let cardNode = $(`#${divTitle}`);
    cardNode.html(contents);
    // console.log(cardNode)
    for (let i in this.endJS) this.endJS[i].parseContents();
    activateEventListeners();
  }

  // removes buttons that should no longer be active
  removeUnusedButtons() {
    if (!currentCard) return;
    for (let id in currentCard.buttonBlocks) {
      let block = currentCard.buttonBlocks[id];
      if (block && block.button && block.button.enabled && !block.button.persist) {
        block.removeNode(0, projectState.currentButtonCardNum);
        if (block.button.toggleBlock) block.button.toggleBlock.removeNode();
      }
    }
  }

  // checks blocks within the card for new content
  updateBlocks() {
    for (let i in this.alwaysUpdateBlocks) {
      this.alwaysUpdateBlocks[i].updateContents();
    }
  }
}
