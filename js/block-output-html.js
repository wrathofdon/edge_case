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
  return `<img ${block.getPropertiesOutput()}>`;
}
/*
* Placeholder, which can be used to import a block from somewhere else.
* Use the ID of the other block as the property, [copy:"card title"]
}
*/
function bbCodeHTMLCopyExcerpt(block) {
  return `\nError: Could not find ${block.properties.copy}\n`;
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
* Generates html for button
*/
function bbCodeHTMLButton(block) {
  if (!block.button) return '';
  return block.button.getButtonHtml();
}
/*
* Runs JS code in the background inside an IIFE and returns the result as text
*/
function bbCodeJSReturn(block) {
  let jsOutputText = '';
  try {
    jsOutputText = block.getContents();
  } catch(err) {
    jsOutputText = `Error: ${err.message}`;
  }
  return `<span ${block.getPropertiesOutput()}>${jsOutputText}</span>`;
}

function bbCodeJSEval(block) {
  let jsOutputText = '';
  try {
    jsOutputText = eval(`${block.properties.jseval}`);
  } catch(err) {
    jsOutputText = `Error: ${err.message}`;
  }
  return `<span ${block.getPropertiesOutput()}>${jsOutputText}</span>`;
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
  return `<span ${block.getPropertiesOutput()}>${block.getContents()}</span>`;
}
