// rawScript += `
// [card:'main']tex[$]dfsfsdf[/$]t [b]hello[/b]  [html]<b>goodbye</b>[/html]
// [button cardlink:'card2']test[/button]
// [button]button2[/button][/card]
//
// [card:'card2']card 2[/card]
// `

rawScript += `

  [card:'main']
    [b][u]Welcome to Edge Case[/u][/b]

    Edge Case is a simple markup language for creating complicated non-linear scripts.  It can be used for non-linear tutorials, simple games, "choose your own adventure" style stories, modeling control flows, and more.

    Scripts can be written in any text editor and launched in any browser, without the need for any special software or server.  Edge Case is best suited for evolving "works-in-progress" and early prototyping, especially in a collaborative environment.  It's easy to edit, and more importantly, easy to track changes when using services like Git.  Software teams can include an Edge Case folder in existing private repositories, and update the documentation at the same time they update their products.

    One of the main goals of Edge Case is to create a tool for troubleshooting the learning process.  Different people get stuck at different points for different reasons.  A non-linear system makes it easier for people to find their own individual path towards education.  Whenever a person gets stuck in a way that the tutorial didn't cover, that needs to get treated as a bug.  And since the software is easy to use, students can be empowered to work together to fix these bugs on their own, rather than putting all the burden on the teacher.

    I will try my best to keep the current draft of this tutorial accessible to everyone.  However, it does help if you're at least moderately familiar with the basics of HTML, and hopefully JavaScript as well.  I assume that anyone who is reading this very preliminary version  on GitHub likely already is.  If not, stay tuned for future versions, which will simplify things even further.

    [button cardlink:'GettingStarted-Intro']Building your first project[/button]

  [/card]

  [card:'GettingStarted-Intro']
    [b][u]Building your first project[/u][/b]

    Let's walk through the process of creating a basic project.  Edge Case uses a markup language, similar to HTML and the popular bulletin board code format used on many popular message boards by millions of non-programmers every day.  Markup languages typically use "tags" for the in order to format text.  In Edge Case, we refer to these as "blocks."

    If you already used markup languages in the past, then this should all be fairly straight forward.  Edge Case projects are built one block at a time, so if you understand how tagging works, then you should have no trouble following along.

    [button cardlink:'GettingStarted-Markup']If you've never worked with a markup language before, click here.[/button]

    [button cardlink:'GettingStarted-Cards']Otherwise, we can skip to working on our first card.[/button]

  [/card]

  [card:'GettingStarted-Markup']
    [b][u]Introduction to Markup Languages[/u][/b]

    In a markup language, text is "marked" with specific tags that tell the computer what to do with them.  In Edge Case, we refer to this as a "block," which we assemble one at a time to build a project.

    Most blocks fall under the standard model:

    [bq][b] ~[tag][/b] Content [b]~[/tag][/b][/bq]

    In this example, you have an opening block at the start, a matching closing at the end.  Both the opening tag and closing must include the name of the tag, and they both must be in square brackets.  The closing tag is signified with the '/' symbol.

    [bq]
      Script:[/br]
      [b]~[b][/b] Bolded [b]~[/b] ~[/u][/b] Underlined [b]~[u] ~[i][/b] italicized [b]~[/i][/b]

      Output:[/br]
      [b] Bolded [/b] [u] Underlined [/u] [i] italicized [/i]
    [/bq]

    Different tags do different things, and thus, will require different types of content.  For instance, the 'img' tag will only work if you provide an image url.

    [button cardlink:'GettingStarted-Cards']Learn how to make cards.[/button]

  [/card]

  [card:'GettingStarted-Cards']
    [b][u]Understanding Cards[/u][/b]

    Cards are basically the equivalent of a PowerPoint slide, and are the main containers of content on a project.  When the software parses the script, one of the first steps is to break the raw text down into individual cards.  All navigation happens by moving from one card to the next.

    How do you create a card?  Well, if you're familiar with markup languages, then this should be pretty straight-forward:

    [bq]
      [b]~[card][/b][br]
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.[/br]
      [b]~[/card][/b]
    [/bq]

    And that's it.  Feel free to add as much or as little content as you want.

    Well...  almost.  Once the software finishes importing the cards, it needs a way to navigate between them.  And that means that every card must have a unique title, which is added as a property in the opening tag.

    [bq]
      [b]~[card:'InsertTitleHere'][/b][br]
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.[/br]
      [b]~[/card][/b]
    [/bq]

    Properties in Edge Case are key-value pairs.  In this case, [b]"card"[/b] is the key, and [b]"InsertTitleHere"[/b] is the value.  Formatting relies on the JavaScript convention of a colon, rather than the HTML convention of using an equal sign.

    [button cardlink:'GettingStarted-main']'Okay, that makes sense.  So how do I make a project?'[/button]

    [button cardlink:'main']'Go to main'[/button]

    [button card:'GettingStarted-Markup']You're going too fast!  I don't understand what those square brackets mean.[/button]

  [/card]

  [card:'GettingStarted-main']

    [b][u]The importance of "main"[/u][/b]

    By now, you should understand how to make a card, so let's create one with the title of "main".

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World"[/br]
      [b]~[/card][/b]
    [/bq]

    Why 'main'?  When Edge Case first launches, it needs to know where to start.  By default, it searches the index for a called titled "main", which should always be the name of the first card you have in mind.  It's basically like the first page in a "choose your own adventure" book.  The second and third page could be anywhere, but you need to put the first page at the beginning so that the reader has a clear starting place.

    [button cardlink:'example-main1']Click here to see the an example of the card we just made.[/button]

    Of course, there's a problem.  Right now, the card we created shows text, but it doesn't give us anywhere to go.

    [b]Note:  If you ever get stuck, remember you can use the "go back" button.[/b]

    [button cardlink:'GettingStarted-AddingOptions']Let's fix that by adding additional cards for it to visit.[/button]

  [/card]

  [card:'GettingStarted-AddingOptions']
    [b][u]Adding additional cards[/u][/b]

    By now, we have already started on our first script and written out our first card, 'main'.  Here's a recap of what 'main' looks like:

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World"[/br]
      [b]~[/card][/b]
    [/bq]

    Keep in mind that line breaks in this instance are optional.  Edge Case is relatively flexible when it comes to formatting.  Line breaks are recommended to help with readability, especially if you have multiple contributors on the same project, but you won't break the program if you don't include them.  Here's what that tag would look like without them:

      [bq]
        [b]~[card:'main'][/b]"Hello World"[b]~[/card][/b]
      [/bq]

    Anyway, after we set up our first card, we should start creating additional cards for what we want to do next.  Suppose after seeing "Hello World," the user has the option to reply with either "Hello Back" or "Thanks, and how are you?"

    Creating additional cards follows the same format as creating the first card:

    [bq]
      [b]~[card:'main'][/b]"Hello World"[b]~[/card][/b]

      [b]~[card:'reply-hello'][/b]You reply, "Hello Back."[b]~[/card][/b]

      [b]~[card:'reply-thanks'][/b]You reply, "Thanks, and how are you?[b]~[/card][/b]
    [/bq]

    You may have noticed that this example, unlike the previous one, is all one-line with no line breaks.

    See how simple that was?  Of course, there's one last problem.  We now have additional cards, but we have no way to link them.

    [button cardlink:'GettingStarted-Buttons']Click here to learn how to add buttons.[/button]

  [/card]

  [card:'GettingStarted-Buttons']
    [b][u]Adding buttons[/u][/b]

    By now, your project should have three cards:

    [bq]
      [b]~[card:'main'][/b]"Hello World"[b]~[/card][/b]

      [b]~[card:'reply-hello'][/b]You reply, "Hello Back."[b]~[/card][/b]

      [b]~[card:'reply-thanks'][/b]You reply, "Thanks, and how are you?[b]~[/card][/b]
    [/bq]

    The easiest way to add interaction is by adding buttons.  How do you do that in Edge Case?  Simple.  You just create another block:

    [bq][b]~[button][/b] Button label [b]~[/button][/b][/bq]

    The button label is the contents that you want the user to interact with.  This usually means text, but it could also be an image, or a combination of both.  Let's add two new buttons to the "main" card:

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World"[br]
      [b]~[button][/b] Reply with a statement [b]~[/button][/b][br]
      [b]~[button][/b] Reply with a question [b]~[/button][/b][br]
      [b]~[/card][/b]

      [b]~[card:'reply-hello'][/b]You reply, "Hello Back."[b]~[/card][/b]

      [b]~[card:'reply-thanks'][/b]You reply, "Thanks, and how are you?[b]~[/card][/b]
    [/bq]

    [button cardlink:'example-main2']Here's an example of our new main card in action.[/button]

    But once again, there's a problem.  We have buttons, but no links.

    [button cardlink:'GettingStarted-Cardlinks']Let's fix that by learning to add cardlinks.[/button]

  [/card]

  [card:'GettingStarted-Cardlinks']
    [b][u]Adding cardlinks[/u][/b]

    Right now, your script should look like this:

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World"[br]
      [b]~[button][/b] Reply with a statement [b]~[/button][/b][br]
      [b]~[button][/b] Reply with a question [b]~[/button][/b][br]
      [b]~[/card][/b]

      [b]~[card:'reply-hello'][/b]You reply, "Hello Back."[b]~[/card][/b]

      [b]~[card:'reply-thanks'][/b]You reply, "Thanks, and how are you?[b]~[/card][/b]
    [/bq]

    The problem is, the buttons don't actually do anything when you push them.  Let's fix that, by adding the [b]cardlink[/b] property.

    For those who need a refresh, a property is a key-value pair for storing information.  In Edge Case, properties are declared in the opening tag, follow JavaScript formatting, and act as additional modifiers.  To add a cardlink to a button, we simple to this:

    [bq]
    [b]~[button cardlink:'TitleOfCardToLinkTo'][/b][br]
    Button label[/br]
    [b]~[/button][/b]
    [/bq]

    In this case, "cardlink" is the key, and 'TitleOfCardToLinkTo' is the property.

    You may have noticed that the formatting for button properties is slightly different from the formatting for card properties.  That's because "card" is the name of the tag, and the tag supports a key with the same name, which means that property can have a value.  Whereas "button" is the name of a tag, but it does not support a "button" key, and so the word "button" is separated from the cardlink property with a space.

    It's okay if you don't understand this right away, just pay careful attention to the formatting when you see examples of other blocks later on.

    Anyway, with that out of the way, let's add cardlinks to the buttons:

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World"[br]
      [b]~[button cardlink:'reply-hello'][/b] Reply with a statement [b]~[/button][/b][br]
      [b]~[button cardlink:'reply-thanks'][/b] Reply with a question [b]~[/button][/b][br]
      [b]~[/card][/b]

      [b]~[card:'reply-hello'][/b]You reply, "Hello Back."[b]~[/card][/b]

      [b]~[card:'reply-thanks'][/b]You reply, "Thanks, and how are you?[b]~[/card][/b]
    [/bq]

    As you can see, the value of the cardlink properties corresponds with the title of the cards that the button should be linking to.

    [bq][button cardlink:'example-main3']Let's see this in action[/button][/bq]

    And there you go, a finish project in less than a dozen lines of text.  You can basically use this knowledge to create a "Choose Your Own Adventure" style story, simply by creating more cards with more buttons, and linking everything together.

  [/card]

  [card:'example-main1']"Hello World"[/card]

  [card:'example-main2']
    "Hello World"

    [button] Reply with a statement [/button]
    [button] Reply with a question [/button]
  [/card]

  [card:'example-main3']
    "Hello World"

    [button cardlink:'example-reply-hello'] Reply with a statement [/button]
    [button cardlink:'example-reply-thanks'] Reply with a question [/button]
  [/card]

  [card:'example-reply-hello']You reply, "Hello Back."[/card]

  [card:'example-reply-thanks']You reply, "Thanks, and how are you?[/card]

  [card:'GettingStarted-Recap']
    [b][u]Building your first project - Recap[/u][/b]

    Now that we've gone over the basics, let's recap what we've learned:

    1.
  [/card]



`
