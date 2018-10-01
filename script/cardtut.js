rawScript += `
[card:'Card-Intro']
  [b][u]Introduction to Card[/u][/b]

  Cards are the main containers of information in an Edge Case project, and are basically the equivalent of a PowerPoint slide.  Creating a card is fairly straight forward:

  [bq][b]~[card:'CardTitle'][/b] Card contents [b]~[/card][/b][/bq]

  That's it.  The "contents" can be as short or as long as you like.


  [b][u]Card Titles[/u][/b]

  Cards only have one property, which is the title (in the above example, the title is simply 'CardTitle').  This title must be unique, and it's recommended that you come up with a naming convention to help with organization.  The card title is what you use to link to other cards.

  When you create a block with it's own ID, the card title gets added to the ID name, in order to prevent a conflict if two different cards have a block with the same ID.

  [b][u]The "main" card[/u][/b]

   When the script is loaded, Edge Case creates a map of every title that for every card.  It doesn't matter what order you load them.  This makes it easy to make your project modular.  Once the cards are done loading, the software looks for a card titled 'main' and loads that card first.  So always name the first card in your project 'main

   [button cardlink:'Cards-cardlink']Click here to learn about card links[/button]

[/card]

[card:'Cards-cardlink']
  [b][u]How to link to a card[/u][/b]

  The following types of blocks support linking to other cards:

  [ul]
    [*]button
    [*]div
    [*]span
    [*]img
  [/ul]

  This is achieved by adding the optional 'cardlink' property to the opening tag.  The value for cardlink should be the title of the card you would like to visit.  For instance:

  [bq]Script:[br]
  [b]~[button cardlink:'NothingHere'][br][/b]
    This button will take you to a page with nothing interesting.[br]
  [b]~[/button][/b]

  Output:
  [button cardlink:'NothingHere']
    This button will take you to a page with nothing interesting.
  [/button][/bq]

  When the button is loaded into the HTML, Edge Case will add an event handler.


  [button cardlink:'Blocks-Intro']
    To learn about how block properties work, click here.
  [/button][/bq]

  [/card]

  [card:'NothingHere']
    There's nothing here.  You should probably head back.
  [/card]
`
