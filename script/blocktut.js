rawScript += `
  [card:'Blocks-Intro']

    [b][u]Introduction to Blocks[/u][/b]

    Edge Case is a markup language, which means everything happens by marking plain text with "tags".  We refer to the marked data as "blocks."  Everything in Edge Case can be broken down into blocks.  Even the cards and buttons are constructed this way.

    [b][u]Anatomy of a block[/u][/b]

    Here is an example of the most common type of block:

    [bq][b]~[tag][/b] content [b][/tag][/b][/bq]

    Here, you are wrapping the contents with open tag on the left, and a matching close tag on the right.  The closing tag is marked with a "/" symbol.  If you've edited HTML before, this should already be familiar.  The main difference is that we're using square brackets instead of angled brackets.

    Different tag names will tell the software to do things.  For instance, wrapping content in the 'b' tags will make [b]content[/b] bold.  Wrapping content in the 'u' tag will make [u]content[/u] underlined.  Wrapping content in the [i]tag[/i] will make it [i]italicized.[/i]

    All blocks must contain an opening tag with the tag name.  The contents, and therefore the closing tag, is optional.

    [bq]
    [button]
      [label]For instance, 'br' is a tag that will create a line break.[/label]
      [toggle]
          Script:[br]
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur interdum purus vitae ligula hendrerit consectetur.[b]~[br]~[br][/b] Quisque fermentum efficitur accumsan. Morbi quis vulputate tortor.

          Output:[br]
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur interdum purus vitae ligula hendrerit consectetur.[br][br] Quisque fermentum efficitur accumsan. Morbi quis vulputate tortor.
        [/toggle]
      [/button]
    [/bq]

    [b][u]Block Properties[/u][/b]

    In addition to the content, many blocks also allow or require the user to specify certain properties, which are key-value pairs.

    [bq]
      Script: [b]~[url:'website.com'][/b]This is a link[b]~[/url][/b]

      Output: [url:'website.com']This is a link[/url]
    [/bq]

    The URL tag asks the software to create a link, which requires two pieces of information:  The text for the user to read, and the url to visit.  The first is stored in the contents, while the latter is stored as a property with a key of 'url' and a value of 'website.com'.

    In this case, the name of the tag is also the name of the property.  But sometimes, the tag name is not a key name.  When that happens, you separate them with a space.  For example:

    [bq]
      Script: [b]~[span style:'color:blue'][/b]Text to turn blue[b]~[/span][/b]

      Output: [span style:'color:blue']Text to turn blue[/span]
    [/bq]

    The 'span' tag will convert most properties directly to HTML/CSS, which is useful if you want more formatting options.  The same is true for the "div" tag.

    Property formatting follows JavaScript conventions, rather than HTML.  If you have multiple properties, then you should separate them with a comma.


    [b][u]Putting it all together[/u][/b]

    In summary:

    [ul]
      [*]All tags require an opening tag ang a tag name.
      [*]Most blocks will have contents/closing tag, but not properties
      [*]Some blocks will have properties, but no contents/closing tag
      [*]Some blocks will have both properties and contents/closing tag
      [*]Some blocks will have neither properties nor contents/closing tag
    [/ul]

    Each tag name is mapped to a specific function.  When it's time to render the block, the function is called.  This function can then make use of the contents (if available) and the properties (if available) in order to generate the final output.

    If a block contains other blocks in it's contents, then the inner blocks are rendered first as a recursive function.

    When reading up documentation on blocks types, they will usually make a note if there are any sort of special requirements or options regarding the properties and contents.


    [button cardlink:'Card-Intro']Introduction to Cards[/button]
    [button cardlink:'Buttons-Intro']Introduction to Buttons[/button]
    [button cardlink:'Blocks-Basic']Basic Blocks[/button]
    [button cardlink:'Blocks-Programmatic']Programmatic Blocks[/button]
  [/card]

  [card:'Blocks-Basic']

    [b][u]Basic Block Types[/u][/b]

    Here are a list of "basic" block types, which are blocks with direct HTML equivalents, and should be fairly straight forward for anyone who's ever done any web design.  If not, Codecademy offers a free [url:'https://www.codecademy.com/learn/learn-html']interactive course on HTML[/url] that should take about 3 hours to complete.

    Here are the blocks that are converted directly into HTML during a pre-processing stage before the script is every broken down into cards through simple string replacement:

    [ul]
      [*][b]~[B][/b] content [b]~[/B][/b] : Makes content bold[br][br]
      [*][b]~[I][/b] content [b]~[/I][/b] : Makes content italicized[br][br]
      [*][b]~[U][/b] content [b]~[/U][/b] : Makes content underlined[br][br]
      [*][b]~[CODE][/b] content [b]~[/CODE][/b] : Converts contents to preformatted text[br][br]
      [*][b]~[BR][/b] : Adds a line break[br][br]
      [*][b]~[P][/b] : Adds a paragraph break[br][br]
      [*][b]~[HR][/b] : Creates horizontal rule[br][br]
      [*][b]~[BQ][/b] content [b]~[/BQ][/b] : Puts text in blockquotes (indentation)
    [/ul]

    Here are the blocks that require actually processing, usually to parse the contents and/or properties:

    [bq]
    [button]
    [label]The 'url' tag for creating links to outside websites[/label]
    [toggle]
      [bq]Script:[br]
      [b]~[url:'website.com'][/b]link text[b]~[/url][/b]

      Output:[br]
      [url:'website.com']link text[/url][/bq]

      [b]Contents:[/b]  The contents is whatever you want to represent the link in the user interface.  Usually it's text, but it could also be a picture or something else.

      [b]Required Properties:[/b]
      url: the address you want to link to

      [b]Optional Properties:[/b]
      This block is converted into an <a></a> html tag.  Additional properties will be be embeded directly into the html attribute for the tag.
    [/toggle]
    [/button]

    [button]
    [label]The 'ol' and 'ul' tags can be used for orders/unordered lists[/label]
    [toggle]
      [bq]Script:[br]
      [b]~[ul][*][/b]Apples[b][*][/b]Oranges[b][*][/b]Pears[b]~[/ul][br][/b]
      [b]~[ol][*][/b]First[b][*][/b]Second[b][*][/b]Third[b]~[/ol][/b]

      Output:[br]
      [ul][*]Apples[*]Oranges[*]Pears[/ul]
      [ol][*]First[*]Second[*]Third[/ol][/bq]

      [b]Contents:[/b]  The contents represent the list items.  Each list item should start with a "[*]" (asterix) symbol.
    [/toggle]
    [/button]

    [button]
    [label]The 'img' tag can be used to embed images[/label]
    [toggle]
      [bq]Script:[br]
      [b]~[img][/b]https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png[b]~[/img][/b]

      Output:[br]
      [img]https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png[/img][/bq]

      [b]Contents:[/b]  The contents are the url of the image you would like to embed.

      [b]Optional Properties:[/b] This block is converted into an <a></a> html tag.  Additional properties will be be embeded directly into the html attribute for the tag.
    [/toggle]
    [/button]

    [button]
    [label]The 'div' and 'span' tags can be create divs and spans[/label]
    [toggle]
      Better description pending.  If you're already familiar with HTML/CSS, then you should already understand how divs/spans works.  If not, don't worry.

      Any properties you add to the div/span block will be added directly to the HTML object, which means that you can use the properties as a means of formatting.

      Divs and spans with IDs can also be used as "placeholder."  i.e., if you want a box to keep score of a game, you can create a div with an ID of "score," and then create functions to update the score when it is appropriate.
    [/toggle]
    [/button]
    [/bq]

  [/card]

  [card:'Blocks-Programmatic']
    [b][u]Programmatic Blocks[/u][/b]

    Programmatic Blocks are blocks which require a basic understanding of programming logic in order to use.

    [bq]
    [button]
    [label]The 'js' and 'return' tags can run native javascript[/label]
      [toggle]
      The 'js' and 'return' tags are two way to insert native JavaScript directly into your script.  The [b]block contents[/b] of these code blocks will run automatically via the JS "eval()" method at the time these blocks are rendered by the card loader.  If you place these these tags inside a button, then they will only activate when the button is clicked, or when the button is toggled.

      The difference is that 'return' treats the contents as a function which can return output text directly to the view, whereas the regular 'js' tag simply operates in the background.  Here is an example:

      [bq]Script:[br]
      [b]~[js][/b][br]var d12 = Math.floor(Math.random() * 12) + 1;[br]
      if (d12 % 2 == 0) console.log('Your d12 rolled a ' + d12 + ', which is even.');[br]
      else console.log('Your d12 rolled a ' + d12 + ', which is odd.');[b][br]~[/js][/b]

      Output: [br]
      [js]var d12 = Math.floor(Math.random() * 12) + 1;
      if (d12 % 2 == 0) console.log('Your d12 rolled a ' + d12 + ', which is even.');
      else console.log('Your d12 rolled a ' + d12 + ', which is odd.');[/js]
      [/bq]

      As you can see, it doesn't generate an output, and will crash if you try.

      [bq]Script:[br]
      [b]~[return][/b][br]var d8 = Math.floor(Math.random() * 8) + 1;[br]
      if (d8 % 2 == 0) return ('Your d8 rolled a ' + d8 + ', which is even.');[br]
      else return ('Your d8 rolled a ' + d8 + ', which is odd.');[b][br]~[/return][/b]

      Output: [br]
      [return]var d8 = Math.floor(Math.random() * 8) + 1;
      if (d8 % 2 == 0) return ('Your d8 rolled a ' + d8 + ', which is even.');
      else return ('Your d8 rolled a ' + d8 + ', which is odd.');[/return]
      [/bq]

      Keep in mind that any variables created in either of these functions will no longer exist outside of the block.  We will cover this issue in the future.

      [$]TODO:  Create card covering topic of variable scope[/$]
      [/toggle]
    [/button]

    [button]
    [label]The 'copy' tag can be used to import blocks from other cards[/label]
      [toggle]
      Example pending, but here's the gist of how this works.  Suppose you want to reuse the same block in multiple cards, but you're worried that it will bog down the size of your script.  More importantly, you want to set it up so that when you want to make a change the content of the block, you only need to change it once, rather than having to go through every reference.

      The 'copy' tag can copy any other block found anywhere in Edge Case, as long as you have the card title and the block ID you would like to copy.  It is a self-closing tag. This is what it what it would look like:

      [bq]~[copy:'CardTitle-BlockID'][/bq]

      When the parser reaches the 'copy' block, it replaces the 'copy' block with a deep copy of whatever the 'copy' block is linking to.

      This could come in especially handy if you want to create a glossary, because you can give each each glossary item a separate ID, and then embed the glossary text on other cards rather than having to retype it every time.
      [/toggle]
    [/button]


    [button]
    [label]Programmatic Block Property:  'update'[/label]
    [toggle]
      Example pending, and this feature is still in development, but here's the gist of how this works.  When using a block with programmatic content (i.e., content that varies based on variables), how often do you want to check for updates to see if the results have changed?

      By default, results are updated every time the card is reloaded.  However, you can override the default by adding an 'update' property, with a value of 'always' or 'never.'

      Setting 'update' to 'always' means that the contents will be refreshed every time a button is clicked.  Setting 'update' to never means that the content persists even if the card is reloaded later on and the underlying variables have changed.

      To keep things simple, 'update' should only be used with the 'div', 'span', and 'button' tag.  If you want your 'return' block to update automatically, then you place it inside a span or a div.  This might change in the future, since Edge Case is still a work in progress.
    [/toggle]
    [/button]

    [button]
    [label]Programmatic Block Property:  'condition'[/label]
    [toggle]
      Example pending, and this feature is still in development, but here's the gist of how this works.  The condition property is a string that is parsed as a JavaScript boolean.  If the condition evaluates as true, then the block is shown to the user.  Otherwise, the block is hidden.  It would look like this:

      [bq]~[div condition:'bossHP <= 0']Congratulations, you beat the boss!~[/div][/bq]

      When the 'condition' property is combined with the 'update' property, it changes how often we perform this check.
    [/toggle]
    [/button]
    [/bq]
  [/card]
`
