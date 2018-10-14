var mainHTMLnode = document.getElementById('mainWindow');
// activate the goback button
$('#GoBack').click(function(){
  gotoPreviousCard()
});

parseCardsPreprocess(preprocessRaw(rawScript))
rawScript = '';

globalCardDict['main'].loadCard();
