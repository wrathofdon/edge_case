var script2 = rawText.split('\n');
var script = [];
var limit = script.length;

for (let i=0; i < limit; i++) {
  if (script2[i].indexOf('// ') > -1) script2[i] = script2[i].substring(0, script2[i].indexOf('// '));
  if (script[2][i]) script.push(script2[i].trim());
}

function processText() {
  let line = 0;
  while (line < limit) {
    while ((!script[line] || script[line].trim().substring(0, 3) !== '===')
      && line < limit) line++;
    if (script[line] && script[line].substring(0, 3).trim() === '===')
      line = constructSlide(script[line].trim().substring(3).trim(), line + 1);
  }
}

function constructSlide (title, line) {
  addSlide(title);
  let descr = '';
  while ((!script[line] || script[line][0].trim() !== '+')
      && script[line].trim().substring(0,3) !== '===' && line < limit) {
    if (script[line] && script[line].trim().substring(0, 2) !== '//') {
      descr += '<br>' + convertText(script[line]).trim() + '<br>';
    }
    line++;
  }
  recentSlide.description = descr;
  if (line >= limit) return line;
  else if (script[line].substring(0, 3).trim() === '===')
    return constructSlide(script[line].trim().substring(3).trim(), line + 1);
  while (script[line].trim()[0] === '+') {
    line = constructButton(line);
  }
  return line;
}

function constructButton(line) {
  var buttonText = script[line].trim().substring(1).trim();
  while (script[line + 1].trim() && script[line + 1].trim()[0] !== '+') {
    line++;
    if (script[line].trim().substring(0, 2) !== '//')
      buttonText = buttonText + ' ' + script[line].trim();
  }
  var obj = {};
  var tempArray = buttonText.split('$$');
  if (tempArray.length > 1) obj.finalOutput = tempArray.pop().trim();
  tempArray = tempArray[0].trim().split('??');
  if (tempArray.length > 1) obj.conditional = tempArray.pop().trim();
  tempArray = tempArray[0].trim().split('->');
  if (tempArray.length > 1) obj.script = `goTo("${tempArray.pop().trim()}");`;
  obj.display = tempArray[0].trim();
  recentSlide.addButton(obj);
  return(line + 1);
}

processText();
