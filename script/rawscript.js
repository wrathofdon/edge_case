rawScript += `
[card:'main']

  [B][u]Introduction[/u][/B]

  Welcome to [b]Edge Case[/b], an engine for writing interactive scripts.  It can for building simple games, "choose your own adventure" stories, control flows, and most importantly, learning tutorials.

  One of the biggest barriers in STEM education is the lack of effective documentation.  Critical thinking requires lateral thinking, while conventional instruction tends to be linear.  Different people get stuck at different points for different reasons, and document writers have to maintain a balance between too much and too little information.  I wanted to create a format that would make it easy for learners to navigate their own path to education.  When you get stuck, the tutorial should help you narrow down the reason why.  More importantly, I wanted it to be super easy to update, especially for collaborations.  This is a tool for troubleshooting and crowdsourcing the learning process.

  The key advantage to Edge Case is it's simplicity.  It's a markup language inspired by the popular bulletin board code format used by millions of non-programmers every day.  You can write a script in any text editor, and launch your project in any browser, without the need for any special software or server installation.  Software teams can easily integrate an interactive readme file in their existing private repositories, and since the format is text based, they can easily track changes in their version control.

  The current version of this tutorial assumes you're already somewhat familiar with rudimentary HTML/JavaScript.  Future versions will be more user friendly, but I'll do my best to keep things simple.

  [button cardlink:'Introduction-GeneralOverview']
    Getting Started
  [/button]
[/card]


------- Text between cards is simply ignored.  -----


[card:'Introduction-GeneralOverview'][B][u]General Overview[/u][/B]

  [b][u]The Learning Curve[/u][/b]

    It's entirely feasible to create a basic "choose your own adventure" style story in Edge Case without any prior programming experience.  You do need to have a basic understanding of how variables work in order to load the script, but that's a one-time task. Future versions will look for ways to make it easier.

    If you're familiar with HTML and JavaScript, then Edge Case should be fairly easy to learn, since it's basically a simplified form.  If you want to learn HTML and JavaScript for the first time, then I would recomend taking free online tutorials at Codecademy.  This will allow you to come up with custom functionality, such as building games.  If you know CSS, you can also customize the styles, because right now the styles are pretty ugly.


  [b][u]The Language Of Edge Case[/u][/b]

    Edge Case is a markup language, similar to HTML and [url:'https://en.wikipedia.org/wiki/BBCode']Bulletin Board Code.[/url]  Text is "marked" with tags, signified by the use of square brackets.  Usually, this happens in the form of "[tag]content[/tag]", where the content is surrounded by matching tags, the closing tag includes the "/" sign, and different tags do different things.  For instance, the "b" tag makes text bold:

    [bq]
      Script:  ~[B]text you want bold~[/B]

      Output:  [B]text you want bold[/B]
    [/bq]

    In addition to formatting text, the markup language of Edge Case can also be used to generate more advanced features, such as interactive buttons and live JS Code. Technically, you can edit an Edge Case script in any text editor without much trouble.  Since the language is designed to be user-friendly, it's [i]relatively[/i] forgiving for minor variations in spacing, capitalizations, etc.  However, I would recommend a linter if you're already familiar with them, because then you could tab excerpts of text as if it was an HTML or XML file, making it easier to read.

  [b][u]How it Works[/u][/b]

    Edge Case was designed to run entirely on client side JavaScript, without the need for special software.  This is to make it easier to crowdsource your documentation by making it as accessible as possible.

    [ul]
      [*] [b]The first step is to load the script of the text into a string variable.[/b]  You can save the script in a single file, or you can save the script in many different files.  Also, the order that you use to load the script has no bearing on the order that the user will see them.
      [*] [b]Once the string variable is loaded, the text is preprocessed for basic formatting, such as simple HTML transformation.[/b]
      [*] [b]After preprocessing, the text is then is then broken down into individual "cards", similar to slides in a PowerPoint presentation.[/b]  The cards are the main container of information.  Everything on this page right now is part of a card, in this case, one titled 'Introduction-GeneralOverview'.  Every card must have a unique title, and an error will trigger if that's not the case.
      [*][b]The contents of the cards are broken down into individual "blocks", which contain information about formatting and functionality.[/b]  Blocks can also be a container for other blocks (or many blocks), but a card cannot be a container for another card.
      [*][b]All blocks output to HTML.[/b]  The output vary based on the type of tag, the contents, and other things we'll discuss later on.  If the block is a container for other blocks, then those other blocks will be rendered first.
      [*][b]Buttons will have event handlers activated which allows for interaction.[/b]  They perform functions upon being clicked, usually in the form of navigating to other cards.
    [/ul]

    [button cardlink:'Introduction-Blocks']Click here to learn more about how blocks work[/button]
  [/card]


  [card:'Introduction-Blocks']

    [b][u]Understanding Blocks[/u][/b]

      Edge Case is a markup language, and a block is how we described a piece of marked up data.  Everything in Edge Case can be broken down into blocks.  Even cards and buttons can be considered a special [i]kind[/i] of block.


      [b][u]Block Creation[/u][/b]

      Here's an example of what When creating a block:

      [bq]~[tag key1:'value1', key2:'value2']content~[/tag][/bq]

      There are four main components to consider, two of which are optional:

      [ol]
      [*][b]Tag name[/b]
      [*][b]Opening tag[/b]
      [*][b]Properties[/b]
      [*][b]Contents / Matching closing tag[/b]
      [/ol]

    [b][u]Block Properties[/u][/b]

      The tag name, opening tag, and contents are pretty self-explanatory.  And obviously, you wouldn't need a closing tag if you don't have any contents.  Properties are additional modifiers, which are entered as key-value pairs.  For instance:

      [bq]
        Script: ~[url:'http://website.com']this is a link~[/url]


        Output: [url:'http://website.com']this is a link[/url]
      [/bq]

      In this case, the tag name 'url' is also the key to the value of 'http://website.com'.  However, not all tags use the tag name as one of the keys, so it's important to pay attention to documentation.  When that happens, as in the above example with the generic tag, simply separate the tag name from the rest of the keys with a space.

      Properties in Edge Case should be formatted the same way you would format them in JavaScript.

    [b][u]The Parsing Engine[/u][/b]

      Blocks inside a card are arranged in an array.  The parsing engine goes through those blocks one by one.  Different blocks have different tags, and those tags will be mapped to different function calls that rely on different pieces of data.  Some will need data from the contents, some will need data from the properties, and some will need data from both.

      For instance, when you use the 'url' tag, you call a function that tries to create a link.  This requires two things:  The display text, and the address text.  The display text is stored in the contents, while the address text is stored as a property under the key of "url."

      The parsing of blocks is a recursive function.  Remember that blocks can also be nested within other blocks.  In order to convert a block to HTML, you may need to process the contents inside of it, which means converting the inside blocks first.

      Sometimes, a block may simply output an empty string.  This is usually because it's performing another action in the background, which is activated at the time of render.

  [/card]

  [card:'Introduction-Cards']










  [/card]

`



//   [b][u]How it Works[/u][/b]
//
//     Edge Case was designed to run entirely on client side JavaScript, without the need for special software.  This is to make it easier to crowdsource your documentation by making it as accessible as possible.
//
//
//
//   The script for Edge Case is loaded as text, and can be written in any text editor.  You can put everything in a single file, or spread it out across many of them, depending on how you prefer to organize it.
//
//   After the text is loaded, it is first broken down into individual cards, which are each broken down into individual blocks.  The blocks are the content, and the cards are the main containers of that content.
//
//   [b][u]Tags and Blocks[/u][/b]
//
//   Edge Case uses a custom markup language similar to bulletin board code and HTML.  Markup languages are a way of adding "tags" to ordinary text, in order to tell the computer to do something special with it.  In Edge Case, these tags are signified by the use of square brackets, and referred to as "blocks."
//
//   Most blocks fall under the model of "~[tag]content[/tag]".  For instance, here is a block of bold text:
//
//   [bq]
//     Script:
//     ~[b]Text to be bolded~[/b]
//
//     Output:
//     [b]Text to be bolded[/b]
//   [/bq]
//
//   The tag name is for this block is the letter "b", short for bold.  The "~[b]" at the beginning represents the opening tag.  Most tags will contain contents that will be formatted.  In that case, there also needs to be a matching closing tag, signified with the "/" symbol.  Tags that do not contain contents will not require a closing tag.
//
//   Most blocks can also be nested within other blocks.  [i]For instance, I can wrap "~[i]" and "~[/i]" around an entire sentence to make it italicize, and then wrap "~[b]" and "~[/b]" around a [b]smaller excerpt of that sentence[/b] to make it bold.[/i]
//
//   [b][u]Cards[/u][/b]
//
//   Cards in Edge Case are the equivalent to a PowerPoint slide, and are heavily inspired by Apple's "Hypercard" program from the 1980s.  A card is basically a container for content, and navigation occurs by moving from one card to the next.  It is a special type of container which stores all the other containers.  You can put a block within a block, or a block within a card, but you cannot put a card within a card or a card within a block.
//
//   [b][u]Buttons[/u][/b]
//
//   Buttons are a special type of block that allows for interaction when you push them.  Usually, this happens in the form of navigating the user to other cards.  But they can also be use used to toggle text, reveal text, and execute custom JavaScript commands.
//
//   [button cardlink:'Introduction-Buttons']Learn more about buttons[/button]
//
// [/card]
//
//
// [card:'Introduction-Loading']
// [b][u]Loading the Script[/u][/b]
//
// Everything in Edge Case is rendered client side.  This means you can get started right away, without having to setup a backend server like PHP or Node.
//
// However, there is a catch:  Most browsers won't allow JavaScript to import locally stored text files, mainly for security reasons.  They don't want malicious websites  to read your data and send that data over the internet.  The way around this is by converting your script into a JavaScript file, by running JavaScript code.
//
// When Edge Case first loads, it creates an empty string called "rawScript."  To load your script, you simply append your text to the string variable.  Here's an example of what that looks like:
//
// [bq][code]rawScript += \`~[card:'main']"Contents of the card"~[/card]\`[/code][/bq]
//
// Note the use of the backtick (\`) symbol, rather than a standard quotation mark.  In JavaScript, the use of a single quotation mark ('), double quoatation mark ("), or backtick symbol (\`) are all considered valid for wrapping a string.  However, I recommend using the backtick symbol.  In the above example, if you used single or double quotes, then the program would try to end early and stop working.[/card]
//
// [card:'Introduction-Blocks']
//
// [b][u]Block Properties[/u][/b]
//
// In some cases, you'll want a block to have additional modifiers.  For instance, if you're creating a link, you need text of the url, but you'll also need text to present to the user.  Here is an example:
//
// [bq][code]Script:
// ~[url:'http://www.bing.com']Let's search the web!~[/url]
//
// Output:
// [url:'http://www.bing.com']Let's search the web![/url][/code][/bq]
//
// Properties are key-value pairs.  In this case, there is only one property, with a key of "url" and a value of "http://www.bing.com".  You can have multiple key value pairs in a block, as long as they're separated by a comma.  Formatting is similar to JavaScript and Python, rather than HTML/BBCode, because it's parsed into JavaScript directly.  That means using colons instead of equal signs.
//
// In the above example, the name of the tag is also the name of a property.  Sometimes, it is not, in which case you separate it from the properties with a space (similar to HTML).[/card]
//
// [card:'Introduction-Cards']
//
// [b][u]Cards[/u][/b]
//
//   Creating cards is fairly straight forward.  You just create a block where 'card' is the tag name.
//
//   [bq][code]Script:
//   ~[card:'title']Content~[/card][/code][/bq]
//
//   Note that the title must have a title, and that title must be unique.  Otherwise, navigating to the card is impossible.  Also, the title of these cards is case sensitive.  If you're working on a large project, try to come up with a naming convention to help keep things easy to organize.
//
//   You should use "main" as the title of the first card to be loaded, since that is what the program will look for after it's done importing the script.
//
//   To link to a card, you can add the "cardlink" property to a block that supports it.  For instance:
//
//   [bq][code]Script:
//   ~[button cardlink:'title']Content~[/button][/code][/bq]
//
//   This creates a button that will take you to the "title" card upon being clicked.  You can also use the cardlink property when using the "div" tag and the "span" tag.
// [/card]
//
// [card:'Introduction-Buttons']
// [b][u]Guide to Buttons[/u][/b]
//
// Buttons are a way of adding interaction to your project.  The most common example of this is by creating buttons that take advantage of the "cardlink" property.  For example:
//
// [bq][code]Script:
// ~[button cardlink:'Introduction-Blocks']What do you mean by property?~[/button]
//
// Output:
// [button cardlink:'Introduction-Blocks']What do you mean by property?[/button]
// [/code][/bq]
//
// [b][u]Button contents[/u][/b]
//
// The contents of the button can be broken down further into blocks, to add additional functionality.  These include the following:
//
// [ul][*]~[label]~[/label]
// [*]~[toggle]~[/toggle]
// [*]~[reveal]~[/reveal]
// [*]~[togglelabel]~[/togglelabel]
// [*]~[js]~[/js][/ul]
//
// [b][u]Button Labels[/u][/b]
//
// The [b]label[/b] is the text of the button visible to the reader.  If there are no other tags within the content text, then the content of the button will automatically be used as the label.  Otherwise, you will need to declare the block explicitly.
//
// For example:
//
// [bq][code]Script:
// ~[button cardlink:'Introduction-Buttons2']This button is functionality
// identical to the below button.~[/button]
// ~[button cardlink:'Introduction-Buttons2']~[label]This button is functionality
// identical to the above button.~[/label]~[/button]
//
// Output:
// [button cardlink:'Introduction-Buttons2']This button is functionality identical to the below button[/button]
// [button cardlink:'Introduction-Buttons2'][label]This button is functionality identical to the above button[/label][/button]
// [/code][/bq]
//
//
// [b][u]Toggles[/u][/b]
//
// Toggles can give the end user the option to explore additional information without having to move to a different card.
//
// [bq][code]Script:
// ~[button]
// ~[label]Why would you want to use a toggle?~[/label]
// ~[toggle]~Toggles are generally useful for maintaining the balance between
// too much and too little information.  You can give the users the option
// to expand without having to break the current flow.~[/toggle]~[/button]
//
// Output:
// [button][label]Why would you want to use a toggle?[/label]
// [toggle]Toggles are generally useful for maintaining the balance between too much and too little information.  You can give the users the option to expand without having to break the current flow.[/toggle][/button][/code][/bq]
//
// When using toggles, you can also add an additional block, "toggle labels."
//
// [bq][code]Script:
// ~[button]
// ~[label]Why would you want to use a toggle label?~[/label]
// ~[togglelabel]Click again to hide the information below.~[/togglelabel]
// ~[toggle]~Toggle labels are for when you want the label to change when
//  the hidden text becomes revealed.~[/toggle]~[/button]
//
// Output:
// [button]
// [label]Why would you want to use a toggle label?[/label]
// [togglelabel]Click again to hide the information below.[/togglelabel]
// [toggle]~Toggle labels are for when you want the label to change when the hidden text becomes revealed.[/toggle][/button][/code][/bq]
//
// [b][u]Reveals[/u][/b]
//
// Finally, if you want the button to disappear upon being revealed, you can replace "button" with "reveal."  You cannot have a "toggle" block and a "reveal" block in the same button, because those are mutually exclusive.  You also cannot have a "togglelabel" block with a "reveal" block, because the label no longer exists if the button disappears.
//
// [bq][code]Script:
// ~[button]
// ~[label]Why would you want the button to disappear upon being clicked?~[/label]
// ~[reveal]Making the button disappear upon being clicked can be
// useful when writing interactive fiction, where you can only perform
// an action one time, but the action isn't significant enough to
// load another card.~[/reveal]~[/button][/code]
//
// Output:
// [button]
// [label]Why would you want the button to disappear upon being clicked?[/label]
// [reveal]Making the button disappear upon being clicked can be useful when writing interactive fiction, where you can only perform an action one time, but the action isn't significant enough to load another card.[/reveal][/button][/bq]
//
// [b][u]JS Code[/u][/b]
//
// If you're an experienced programmer, then you can embed JavaScript code directly into the button with the ~[JS]~[/JS] tag.  For instance:
//
// [bq][code]Script:
// ~[button]
// ~[label]Click this button to write stuff to the console~[/label]
// ~[js]~console.log('stuff to the console');.~[/js]~[/button]
//
// Output:
// [button]
// [label]Click this button to write stuff to the console[/label]
// [js]console.log('stuff to the console');[/js][/button][/code][/bq]
// [/card]
//
// [card:'Introduction-Buttons2']There is nothing here.  You should go back.[/card]
// `
