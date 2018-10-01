/*
* Creates card objects and populates the main dictionary
* Parses text for any changes that only need to be done once
*/
function preprocessCards(rawText) {
  let cardBlocks = new BlockArray({'2card': null}, rawText);
  for (let i = 0; i < (cardBlocks.array.length); i++) {
    let block = cardBlocks.array[i];
    if (block.tag !== '2card') {
      continue;
    }
    if (!block.properties.card) {
      console.log(`Error: Card missing title\n${block.content.trim()}`)
      continue;
    }
    addCard(block.properties.card, block.content.trim(), true)
  }
  for (let title in globalCardDict) {
    globalCardDict[title].replaceCopies();
  }
}

function addCard(title, content, preprocessed = false) {
  if (globalCardDict[title]) {
    console.log(`Error:  Card titled ${title} already exists`);
  } else {
    if (!preprocessed) {
      content = preprocessRaw(content)
    }
    globalCardDict[title] = new Card(title, content);
  }
}

// TODO: We should probably rename this because it covers a lot more than HTML now
var bbCodeHTMLConversions = {
  '2ol': bbCodeHTMLConvertLists,
  '2ul': bbCodeHTMLConvertLists,
  '2img': bbCodeHTMLConvertIMG,
  '2url': bbCodeHTMLConvertURL,
  '2span': bbCodeHTMLSpan,
  '2div': bbCodeHTMLDiv,
  '1copy': bbCodeHTMLCopyExcerpt,
  '2ifelse': bbCodeHTMLConditional,
  '2if': bbCodeHTMLIfConditional,
  '2else': bbCodeHTMLElseConditional,
  '2button': bbCodeHTMLButton,
  '2js': bbCodeJSBackground,
  '2return': bbCodeJSReturn,
  '2label': bbCodeReturnContents,
  '2toggle': bbCodeReturnContents,
  '2togglelabel': bbCodeReturnContents,
  '2reveal': bbCodeReturnContents,
  '1get': bbCodeGetTempVariable,
  '1set': bbCodeSetTempVariables,
  '1getcard': bbCodeGetCardVariable,
  '1setcard': bbCodeSetCardVariables,
  '1getglobal': bbCodeGetGlobalVariable,
  '1setglobal': bbCodeSetGlobalVariables,
};

// add dictionary keys to the global tag list so they can be converted to
// lower case in pre-processing
addToGlobalTagList(bbCodeHTMLConversions)

/*
* Parses bbCode into lists.  Lists are created with [ul][/ul] or [ol][/ol]
* List atoms are signified with [*], no closing tag
*/
function bbCodeHTMLConvertLists(block) {
  // TODO: this can break if the user forgets to input [*] at the beginning
  return `<${block.tag.substring(1)}>${block.getContents().trim().replaceAll('[*]',
    '</li><li>').substring(5)}</li></${block.tag.substring(1)}>`
}
/*
* Parses a link using the format [url:"http://site.com"]My website[/url]
* Other properties can also be specified
*/
function bbCodeHTMLConvertURL(block) {
  return `<a href="${removeQuotes(block.properties.url)}"
    target="blank">${block.getContents()}</a>`;
}
/*
* Inserts an image with [img]http://imageurl.com[/url].
* Other properties can also be specified
*/
function bbCodeHTMLConvertIMG(block) {
  return `<img ${block.getPropertiesOutput()}>"`;
}
/*
* Placeholder, which can be used to import a block from somewhere else.
* Use the ID of the other block as the property, [copy:"card title"]
}
*/
function bbCodeHTMLCopyExcerpt(block) {
  return `\nError: Could not find ${block.properties.cite}\n`;
}
/*
* Generates a span tag.  Can be combined with custom properties
*/
function bbCodeHTMLSpan(block) {
  return `<span ${block.getPropertiesOutput()}>${block.getContents()}</span>`;
}
/*
* Generates a DIV tag.  Can be combined with custom properties
*/
function bbCodeHTMLDiv(block) {
  return `<div ${block.getPropertiesOutput()}>${block.getContents()}</div>`;
}
/*
* Launches a conditional.  Formatted as [conditional][if="boolean"]do stuff[/if]
* [else="boolean"]do different stuff.[/else][else]I activate if nothing else
* does.[/else][conditional]
*/
function bbCodeHTMLConditional(block) {
  let ifStatementFound = false;
  for (let i = 0; i < block.blockArray.array.length; i++) {
    let subBlock = block.blockArray.array[i];
    if (!ifStatementFound && subBlock.tag === '2else') {
      return `You need to have an 'if' block before you can have an 'else' block: ${block.content}\n`;
    } else if (ifStatementFound && subBlock.tag === '2if') {
      return `You should not have multiple 'if' blocks in a single condition: ${block.content}\n`;
    } else if (subBlock.tag === '2if') {
      ifStatementFound = true;
      let result = subBlock.parseContents();
      if (result === false) {
        continue;
      }
      if (result.trim()) {
        return(result);
      }
      return '';
    } else if (subBlock.tag === '2else') {
      let result = subBlock.parseContents();
      if (result === false) {
        continue;
      }
      if (result.trim()) {
        return(result);
      }
      return '';
    }
  }
}

function bbCodeHTMLIfConditional(block) {
  let condition = false;
  if (block.properties.if) {
    try {
      eval(block.properties.if);
      eval(`condition = ${block.properties.if}`);
    } catch(err) {
      return err.message;
    }
    if (condition) {
      return block.getContents();
    }
  }
  return false;
}

function bbCodeHTMLElseConditional(block) {
  let condition = false;
  if (block.properties.else) {
    try {
      eval(block.properties.else);
      eval(`condition = ${block.properties.else}`);
    } catch(err) {
      return err.message;
    }
    if (condition) {
      return block.getContents();
    }
    return false;
  }
  return block.getContents();
}
/*
* Generates html for button
*/
function bbCodeHTMLButton(block) {
  if (!block.button) return '';
  return block.button.getHtml();
}
/*
* Runs JS code in the background inside an IIFE and returns the result as text
*/
function bbCodeJSReturn(block) {
  try {
    return eval(`(function () {${block.getContents()}})();`);
  } catch(err) {
    return `Error: ${err.message}`;
  }
}

/*
* Runs JS code in the background as code, does not return unless there's an error
*/
function bbCodeJSBackground(block) {
  try {
    eval(block.getContents());
  } catch(err) {
    console.log(`Error: ${err.message}`);
  }
  return '';
}

/*
* Getters for variable
*/
function genericGetVariable(str) {
  try {
    return eval(str);
  } catch(err) {
    return `${err.message}, problem loading ${str}`;
  }
}

function bbCodeGetTempVariable(block) {
  return genericGetVariable(`tempVar['${block.properties.get}']`);
}

function bbCodeGetCardVariable(block) {
  return genericGetVariable(`cardVar['${block.properties.get}']`);
}

function bbCodeGetGlobalVariable(block) {
  return genericGetVariable(`globalVar['${block.properties.get}']`);
}

function genericSetVariables(name, value, error) {
  try {
    eval(`${name} = ${value}`)
  } catch(err) {
    return error + `${err.message}, [${name} = ${value}]\n`;
  }
  return error;
}

/*
* Setters for variables
*/
function bbCodeSetTempVariables(block) {
  let error = '';
  for (let name in block.properties) {
    error = genericSetVariables(`tempVar['${name}']`, block.properties[name], error);
  }
  return error;
}

function bbCodeSetCardVariables(block) {
  let error = '';
  for (let name in block.properties) {
    error = genericSetVariables(`cardVar['${name}']`, block.properties[name], error);
  }
  return error;
}

function bbCodeSetGlobalVariables(block) {
  let error = '';
  for (let name in block.properties) {
    error = genericSetVariables(`globalVar['${name}']`, block.properties[name], error);
  }
  return error;
}

/*
* For tags that do nothing on their own
*/
function bbCodeReturnContents(block) {
  return block.getContents();
}
