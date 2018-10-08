/*
* Creates card objects and populates the main dictionary
* Parses text for any changes that only need to be done once
*/
function parseCardsPreprocess(text) {
  parseCardsLoadGlobalDict(text);
  for (let title in globalCardDict) {
    globalCardDict[title].excerpts = {};
    parseCardsExtractExcerpts(globalCardDict[title], globalCardDict[title].innerBlocks);
  }
  for (let title in globalCardDict) {
    parseCardsReplaceCopies(globalCardDict[title], globalCardDict[title].innerBlocks);
  }
  for (let title in globalCardDict) {
    globalCardDict[title].excerpts = {};
    parseCardsFinalize(globalCardDict[title], globalCardDict[title].innerBlocks);
  }
}

/*
* A method of generating unique numbers for unique html IDs
*/
var sUniqueIdCounter = 0;
function getUniqueId() {
  sUniqueIdCounter += 1;
  return sUniqueIdCounter;
}

function parseCardsLoadGlobalDict(text) {
  let array = splitTextIntoBlocks (text, {'2card':null});
  for (let i = 0; i < array.length; i++) {
    let cardBlock = array[i];
    if (typeof(cardBlock) === 'string') continue;
    let title = cardBlock.properties.card;
    let content = cardBlock.rawText.trim();
    if (!title) {
      console.log(`Error: Card missing title\n${content}`)
      continue;
    } else if (globalCardDict[title]) {
      console.log(`Error: Duplicate card title: ${title}`)
      continue;
    }
    globalCardDict[title] = new Card(title, content);
  }
}

function parseCardsExtractExcerpts(card, array) {
  for (let i in array) {
    if (typeof(array[i]) === 'string') continue;
    let block = array[i];
    if (block.htmlId) card.excerpts[block.htmlId] = block;
    if (block.innerBlocks) parseCardsExtractExcerpts(card, block.innerBlocks);
  }
}

function parseCardsReplaceCopies(card, array) {
  for (let i in array) {
    if (typeof(array[i]) === 'string') continue;
    if (array[i].tag === '2copy') {
      let source = globalCardDict[array[i].properties.card];
      if (!source) {
        let error = `Copy Error: card ${array[i].properties.card} not found`;
        console.log(error);
        array[i] = error;
        continue;
      } else if (!source.excerpts[array[i].properties.id]) {
        let error = (`Copy Error: ID ${array[i].properties.card} in card ${array[i].properties.card} not found`);
        console.log(error);
        array[i] = error;
        continue;
      } else array[i] = source.excerpts[array[i].properties.id].makeCopy(card);
    }
    if (array[i].innerBlocks) parseCardsReplaceCopies(card, array[i].innerBlocks);
  }
}

function parseCardsFinalize(card, array) {
  for (let i in array) {
    if (typeof(array[i]) === 'string') continue;
    let block = array[i];
    if (block.htmlId) {
      if (card.excerpts[block.htmlId]) block.htmlId = `uid${getUniqueId()}`;
      card.excerpts[block.htmlId] = block;
    }
    if (block.properties.update === 'always') card.alwaysUpdateBlocks.push(block);
    if (block.tag === '2button') card.buttonBlocks.push(block);
    else if (block.tag === '2js' && block.properties.trigger) {
      block.properties.trigger = block.properties.trigger.toLowerCase().trim();
      if (block.properties.trigger === 'initial') card.initJS.push(block);
      else if (block.properties.trigger === 'start') card.startJS.push(block);
      else if (block.properties.trigger === 'end') card.endJS.push(block);
      else if (block.properties.trigger === 'exit') card.exitJS.push(block);
      blockArray.blocks[i] = nullBlock;
      continue;
    }
    delete block.properties.id;
    delete block.properties.class;
    delete block.properties.condition;
    delete block.properties.buttonstyle;
    delete block.properties.trigger;
    if (block.innerBlocks) parseCardsFinalize(card, block.innerBlocks);
  }
}
