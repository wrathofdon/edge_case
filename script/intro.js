rawScript += `

  [card:'placeholder']
    This is a placeholder for future content.
  [/card]

  [card:'main']
    [b][u]Welcome to Edge Case[/u][/b]

    Edge Case is a custom markup language for creating non-linear scripts.  It can be used for interactive tutorials, simple games, "choose your own adventure" style stories, modeling control flows, and more.

    These scripts can be written in any text editor and launched client-side in any browser, without the need for any special software or server.  It is best suited for evolving "works-in-progress" and rapid prototyping.  Software teams can include an Edge Case folder in existing private repositories for documentation, and track changes in their existing git workflows.

    I will try my best to keep the current draft of this tutorial accessible to everyone, but it does help if you're at least moderately familiar with the basics of HTML and JavaScript.  I assume that anyone who stumbled upon this project already has that background.  If not, stay tuned for future versions, which will simplify things even further.

    [button cardlink:'GettingStarted-Intro']Building your first project[/button]

  [/card]

  [card:'GettingStarted-Intro']
    [b][u]Building your first project[/u][/b]

    Let's walk through the process of creating a basic project.

    Edge Case is a markup language, similar to HTML and BBCode.  If you're familiar with either of those, then you might already be able to follow along.  Markup languages use "tags" in order to format text.  In Edge Case, we refer to these as "blocks," and we can use blocks to represent more complex data structures, like cards and butons.

    [bq]
      [button persist:'true']
        [label]Click here to see a sample of the scripting language.[/label]
        [toggle]
          [b]~[card:'main'][/b][br]
          "Hello World!  Why don't you pick a door?"[br]
          [b]~[button cardlink:'door1'][/b] Pick door #1 [b]~[/button][/b][br]
          [b]~[button cardlink:'door2'][/b] Pick door #1 [b]~[/button][/b][br]
          [b]~[/card][/b]

          [b]~[card:'door1'][/b]You open door #1 and you win a prize.[b]~[/card][/b]

          [b]~[card:'door2'][/b]You open door #2 and win nothing.[b]~[/card][/b]
        [/toggle]
      [/button]
    [/bq]

    Don't worry if that doesn't make any sense yet, we're about to cover that right now.

    [button cardlink:'GettingStarted-Markup']If you've never worked with a markup language before, click here for an introduction.[/button]

    [button cardlink:'GettingStarted-Cards']Otherwise, we can skip to working on our first card.[/button]

  [/card]

  [card:'GettingStarted-Markup']
    [b][u]Introduction to Markup Languages[/u][/b]

    In a markup language, text is "marked" with specific tags that tell the computer what to do with them.  In Edge Case, we refer to this as a "block," which we assemble one at a time to build a project.

    Most blocks will wrap content between an opening tag, and a matching closing tag.  The closing tag is signified by the use of the "/" symbol before the tag name.  Here is an example of what this looks like:

    [bq][b] ~[tag][/b] Content [b]~[/tag][/b][/bq]

    Different tags do different things.  For instance, the [b]"~[b]"[/b] tag makes text bold, the [b]"~[u]"[/b] makes text underlined, and the [b]"~[i]"[/b] tag makes text italicized.

    [bq]
      Script:[/br]
      [b]~[b][/b] Bolded [b]~[/b] ~[u][/b] Underlined [b]~[/u] ~[i][/b] italicized [b]~[/i][/b]

      Output:[/br]
      [b] Bolded [/b] [u] Underlined [/u] [i] italicized [/i]
    [/bq]

    Other blocks are [b]self-closing[/b], meaning that they only have one tag, with no contents.  For instance, to add a line break, simply use the the [b]"~[br]"[/b] tag.

    [bq]
      Script:[/br]
      Hello [b]~[br][/b] World!

      Output:[/br]
      Hello [br] World!
    [/bq]

    [button cardlink:'GettingStarted-Cards']Learn how to make cards.[/button]

  [/card]

  [card:'GettingStarted-Cards']
    [b][u]Understanding Cards[/u][/b]

    When the Edge Case script is interpreted by the software, it is first broken down into individual cards, which are basically equivalent to pages in a book, or nodes in a flowchart.

    Cards are the main containers of content.  All other blocks are stored within cards, and cards cannot be stored within any other type of block.  Navigation occurs by loading one card after another.  Cards can either be displayed one at a time like a PowerPoint presentation, or you can attach multiple cards in a chain.

    How do you create a card?  Well, since Edge Case is a markup language, you create as a block with the "card" tag, and then add as much or as little content as you would like:

    [bq]
      [b]~[card][/b][br]
      "Hello World!"[/br]
      [b]~[/card][/b]
    [/bq]

    But this is incomplete.  If you have multiple cards, and you likely will, then how do you navigate between them?  How do you let the software know the specific card you would like to visit?  To handle this, each card must be assigned it's own title, which is handled by adding a property.

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World!"[/br]
      [b]~[/card][/b]
    [/bq]

    In programming, a property is a key-value pair.  Just like with HTML and BBCode, properties are specified in the opening tag.  However, since Edge Case is parsed entirely in JavaScript, the actual formatting is in JavaScript style.  Assignment happens via ":" rather than "=", and multiple properties must be separated by commas.

    [button cardlink:'placeholder']"You're going too fast.  What's a property and a key-value pair?"[/button]

    [button cardlink:'placeholder']"Can you explain what you mean by JavaScript formatting?"[/button]

    [button cardlink:'GettingStarted-main']"I'm following along okay so far.  So how do I make a project?"[/button]

  [/card]

  [card:'GettingStarted-main']

    [b][u]Creating your first card[/u][/b]

    By now, you should understand how to make a card, so let's create one with the title of "main".

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World!"[/br]
      [b]~[/card][/b]
    [/bq]

    Why did we choose "main" for the title?  Well, when Edge Case first launches, it has many cards to choose from, and doesn't know where to start.  By default, it searches the project for a card called "main", and uses that as the starting point.  So that's where we should start.  The card titled "main" will always be treated as the first page, and from there, you should present options to branch off into other cards.

    [button cardlink:'example-main1']
    [label]Click here to see the an example of the card we just made.[/label]
    [reveal]Below is the "Hello World" card that we just created.  Of course, there's a problem.  The card we created has text, but it doesn't give us anywhere to go or anything to do.  The next step is to add some buttons.

    [b]Note:  If you ever get stuck on a card with no active buttons, remember you can use the "go back" link at the bottom.[/b][/reveal]
    [/button]

    [button cardlink:'GettingStarted-AddingOptions', condition:'globalCardDict["example-main1"].cardVar.timesLoaded > 0']Let's fix that by adding additional cards to navigate to.[/button]

  [/card]

  [card:'GettingStarted-AddingOptions']
    [b][u]Adding additional cards[/u][/b]

    By now, we have already started on our first script and written out our first card, 'main'.  Here's a recap of what 'main' looks like:

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World"[/br]
      [b]~[/card][/b]
    [/bq]

    Now, let's present the user with two different choices, which are linked to two different cards.  One cards opens door #1, and the other card opens door #2:

    [bq]
      [b]~[card:'main'][/b]"Hello World!  Why don't you pick a door?"[br]

      [b]~[card:'door1'][/b]You open door #1 and you win a prize.[b]~[/card][/b]

      [b]~[card:'door2'][/b]You open door #2 and win nothing.[b]~[/card][/b]
    [/bq]

    See how simple that was?  Note how in this version, we're not bothering to add line breaks.  In an Edge Case script, line breaks are usually considered optional for the sake of making things easier to read.  Two consecutive line breaks in the same block will be recognized as a separate paragraph.  But a single line break, or line breaks in separate blocks, will simply be ignored.  Choose whatever format you think will make things more readable and easier to understand.

    [button cardlink:'example-main2']
    [label]Click here to see the an example of the card we just made.[/label]
    [reveal]Now we have new cards to visit, but we still don't have any way to reach them.  Let's fix that by learning to add some buttons.

    [b]Note:  If you ever get stuck on a card with no active buttons, remember you can use the "go back" link at the bottom.[/b][/reveal]
    [/button]

    [button cardlink:'GettingStarted-Buttons']Click here to learn how to add buttons.[/button]

  [/card]

  [card:'GettingStarted-Buttons']
    [b][u]Adding buttons[/u][/b]

    The easiest way to add interaction is by adding buttons.  How do you do that in Edge Case?  Simple.  You just create another block:

    [bq][b]~[button][/b] Button label [b]~[/button][/b][/bq]

    The button label is the contents that you want the user to interact with.  This usually means text, but it could also be an image, or a combination of both.  Let's add two new buttons to the "main" card:

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World!  Why don't you pick a door?"[br]
      [b]~[button cardlink:'door1'][/b] Pick door #1 [b]~[/button][/b][br]
      [b]~[button cardlink:'door2'][/b] Pick door #1 [b]~[/button][/b][br]
      [b]~[/card][/b]

      [b]~[card:'door1'][/b]You open door #1 and you win a prize.[b]~[/card][/b]

      [b]~[card:'door2'][/b]You open door #2 and win nothing.[b]~[/card][/b]
    [/bq]

    [button cardlink:'example-main3']
    [label]Click here to see the an example of the card we just made.[/label]
    [reveal]Now we have a card with buttons.  But... the buttons don't actually do anything when you click them.  To make those buttons functional, we need to add cardlinks.

    [b]Note:  If you ever get stuck on a card with no active buttons, remember you can use the "go back" link at the bottom.[/b][/reveal]
    [/button]

    [button cardlink:'GettingStarted-Cardlinks']Click here to learn how to add cardlinks to a button.[/button]
  [/card]

  [card:'GettingStarted-Cardlinks']
    [b][u]Adding cardlinks[/u][/b]

    In order to link a button to another card, you need to add a cardlink.  A cardlink is an optional property that you can add to the button tag, which adds an additional modifier.  They take on the following format:

    [bq]
      [b]~[button cardlink:'TitleOfCardToLinkTo'][/b][br]
      Button label[/br]
      [b]~[/button][/b]
    [/bq]

    The cardlink property of the button block should match to the card property of the card block.  You might have noticed that in the earlier example with cards, the word "card" is followed by a colon, but the word "button" is not.  Property names will end with a colon, including properties that are also a tag name.  Tag names that are not being used as a property do not end with a colon.

    [ul]
      [*][b]"card"[/b] is both the name of a tag, and the name of a property.  It ends with a colon.
      [*][b]"button"[/b] is the name of a tag, but not the name of a property.  It does not end with a colon.
      [*][*]"cardlink"[/b] is the name of a property, but not the name of a tag.  It ends with a colon.
    [/ul]

    With that in mind, let's create the updated code, with the proper cardlinks attached:

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World!  Why don't you pick a door?"[br]
      [b]~[button cardlink:'door1'][/b] Pick door #1 [b]~[/button][/b][br]
      [b]~[button cardlink:'door2'][/b] Pick door #1 [b]~[/button][/b][br]
      [b]~[/card][/b]

      [b]~[card:'door1'][/b]You open door #1 and you win a prize.[b]~[/card][/b]

      [b]~[card:'door2'][/b]You open door #2 and win nothing.[b]~[/card][/b]
    [/bq]

    This is the same code that you saw at the introduction.  If it didn't make any sense to you back then, then hopefully it should make sense now.

    And there you have it.  That's all you need in order to create a card which can link to other cards.  There's a lot more you can do with Edge Case which we can cover later on, but for now, this should be enough to get you started.  You already have enough information to create a basic "Choose Your Own Adventure" style storyline.

    [button cardlink:'example-main4']Let's see this in action[/button]
    [button cardlink:'GettingStarted-Recap']Recap of what you learned[/button]
    [button cardlink:'placeholder']Learn how to setup files[/button]
    [button cardlink:'main']Return to main menu[/button]
  [/card]

  [card:'example-main1']"Hello World"[/card]

  [card:'example-main2']"Hello World!  Why don't you pick a door?"[/card]

  [card:'example-main3']
  "Hello World!  Why don't you pick a door?"

  [button] Pick door #1 [/button]
  [button] Pick door #2 [/button]
  [/card]

  [card:'example-main4']
    "Hello World!  Why don't you pick a door?"

    [button cardlink:'example-door1'] Pick door #1 [/button]
    [button cardlink:'example-door2'] Pick door #2 [/button]
  [/card]

  [card:'example-door1']You open door #1 and you win a prize.[/card]

  [card:'example-door2']You open door #2 and win nothing.[/card]

  [card:'GettingStarted-Recap']
    [b][u]Building your first project - Recap[/u][/b]

    Now that we've gone over the basics, let's recap what we've learned:

    1.  Edge Case is a markup language, which uses tags wrapped in square brackets.  A markup language is a language that can be written in any ordinary word processor, where sections of the text are "tagged" to let the computer know that you would like to do something special with it.

    2.  The use of tags are referred to as "blocks" in Edge Case.  Projects are made up of blocks, which can be broken down into smaller blocks.  Most (but not all) blocks take the following form:  [b]~[tag] content ~[/tag].[/b]

    3.  Blocks aren't simply used for formatting text.  They can also be used to create cards, buttons, and executing JavaScript modules.

    4.  Blocks can include additional modifiers, known as properties, which are key-value pairs specified in the opening tag.  We've seen examples of how properties are used when creating cards and buttons, and we'll see more examples as we delve deeper.

    5.  Cards are a special type of block which are the main containers of information, and are basically equivalent to a PowerPoint slide.  When the script first loads, the software breaks it down into individual "cards."  You cannot hold a card inside of any other block, including another card.

    6.  Buttons are another special type of block, which allows for interaction upon being clicked.  The most common form of interaction, and the only one we covered so far, is linking to another card.  But there's a lot more they can do, which will be covered later.

    [button cardlink:'main']Return to main menu[/button]
  [/card]



`
