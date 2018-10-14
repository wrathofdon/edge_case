// takes an array of blocks/strings and returns a text output
function joinBlockArray(array) {
  let outputArray = [];
  for (let i in array) {
    let block = array[i]
    if (block) {
      if (typeof(block) === 'string') outputArray.push(block);
      else outputArray.push(block.parseContents());
    }
  }
  return outputArray.join('');
}

// maps tag names for processing cards to functions
var bbCodeProcessCard = {
  '2ol': bbCodeHTMLConvertLists,
  '2ul': bbCodeHTMLConvertLists,
  '2img': bbCodeHTMLConvertIMG,
  '2url': bbCodeHTMLConvertURL,
  '2span': bbCodeHTMLSpan,
  '2div': bbCodeHTMLDiv,
  '1copy': bbCodeHTMLCopyExcerpt,
  '2button': bbCodeHTMLButton,
  '2js': bbCodeJSBackground,
  '2jsreturn': bbCodeJSReturn,
  '1jseval': bbCodeJSEval,
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

// creates a list
function bbCodeHTMLConvertLists(block) {
  // TODO: this can break if the user forgets to input [*] at the beginning
  return `<${block.tag.substring(1)}>${block.getContents().trim().replaceAll('[*]',
    '</li><li>').substring(5)}</li></${block.tag.substring(1)}>`
}
// creates a link
function bbCodeHTMLConvertURL(block) {
  return `<a href="${removeQuotes(block.properties.url)}"
    target="blank">${block.getContents()}</a>`;
}

// displays an image
function bbCodeHTMLConvertIMG(block) {
  return `<img ${block.getPropertiesOutput()}>`;
}

// copies over excerpt from other cards
function bbCodeHTMLCopyExcerpt(block) {
  return `\nError: Could not find ${block.properties.copy}\n`;
}

// generates a span tag.
function bbCodeHTMLSpan(block) {
  return `<span ${block.getPropertiesOutput()}>${block.getContents()}</span>`;
}

// generates a div block
function bbCodeHTMLDiv(block) {
  return `<div ${block.getPropertiesOutput()}>${block.getContents()}</div>`;
}

// generates a button
function bbCodeHTMLButton(block) {
  if (!block.button) return '';
  return block.button.getButtonHtml();
}

// runs js code as an anonymous and outputs return text
function bbCodeJSReturn(block) {
  let jsOutputText = '';
  try {
    jsOutputText = block.getContents();
  } catch(err) {
    jsOutputText = `Error: ${err.message}`;
  }
  return `<span ${block.getPropertiesOutput()}>${jsOutputText}</span>`;
}

// evaluates js code and returns the result
function bbCodeJSEval(block) {
  let jsOutputText = '';
  try {
    jsOutputText = eval(`${block.properties.jseval}`);
  } catch(err) {
    jsOutputText = `Error: ${err.message}`;
  }
  return `<span ${block.getPropertiesOutput()}>${jsOutputText}</span>`;
}

// runs js code.  does not return anything.
function bbCodeJSBackground(block) {
  try {
    eval(block.getContents());
  } catch(err) {
    console.log(`Error: ${err.message}`);
  }
  return '';
}

// getters for variables
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

// setters for variables
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

// creates a placeholder
function bbCodeReturnContents(block) {
  return `<span ${block.getPropertiesOutput()}>${block.getContents()}</span>`;
}
