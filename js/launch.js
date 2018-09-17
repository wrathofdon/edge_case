var mainHTMLnode = document.getElementById('mainWindow');
// activate the goback button
$('#GoBack').click(function(){
  gotoPreviousCard()
});

preprocessCards(preprocessRaw(rawScript))


globalCardDict['main'].loadCard();
