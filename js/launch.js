var mainHTMLnode = document.getElementById('mainWindow');
// activate the goback button
$('#GoBack').click(function(){
  gotoPreviousCard()
});

var globalSettings = {
  rewind: true,
  attach: true
}

parseCardsPreprocess(preprocessRaw(rawScript))
// cardHistoryStack = ['main'];
// globalCardDict[cardHistoryStack[-1]].loadCard();



globalCardDict['main'].loadCard();
