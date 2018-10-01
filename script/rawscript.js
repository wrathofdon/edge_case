rawScript += `
[card:'main']

  [B][u]Introduction[/u][/B]

  Welcome to [b]Edge Case[/b], an engine for writing interactive scripts.  It can for building simple games, "choose your own adventure" stories, control flows, and learning tutorials.

  The key advantage of Edge Case is it's simplicity.  It's ideally suited for evolving "works-in-progress" which are constantly being updated, or for quick prototyping.  It's also very easy to track and merge changes, which is important for collaborative projects.  Software teams can include a folder for Edge Case in their existing private repositories so they can update the documentation with the software simultaneously, and review those changes on Git.

  Edge Case can also be used as a tool for troubleshooting and patching the learning process.  When a student gets stuck, the tutorial can help them narrow down the reason why.  If the tutorial doesn't have an answer, then that gets treated as a bug.  But since the software is easy to use, the student can work with peers to patch that bug directly, rather than putting all the burden on the teacher.

  If you've managed to find this GitHub repo, then I'm going to assume you're already familiar with basic programming and HTML.  If you understand terms like "variable", "return", and "key-value" pairs, then you should be ready to jump in right away.

  Future version will be even more user friendly for total beginners, and hopefully we'll be able to create tools to make it even easier.

  [button cardlink:'Introduction-GeneralOverview']General Overview[/button]
  [button cardlink:'Blocks-Intro']Introduction to Blocks[/button]
  [button cardlink:'Card-Intro']Introduction to Cards[/button]
  [button cardlink:'Buttons-Intro']Introduction to Buttons[/button]
  [button cardlink:'Blocks-Basic']Basic Blocks[/button]
  [button cardlink:'Blocks-Programmatic']Programmatic Blocks[/button]
  [button cardlink:'Intro-FormattingGuidelines']Formmating Guidelines[/button]
  [button cardlink:'Intro-FirstProject']Creating Your first Project[/button]

[/card]

[card:'Introduction-GeneralOverview']

  [b][u]What is Edge Case?[/u][/b]

  Edge Case is a markup language, similar to HTML and Bulletin Board code.  A markup language is where you tag excerpts of text in order to let the computer know what you would like to do with it.  In Edge Case, we refer to marked text as "blocks", and are marked with the use of square brackets (as opposed to the angled brackets used in HTML).

  [b][u]Importing the Script[/u][/b]

  The script in Edge Case is imported as a text [i]variable[/i].  When you're done writing your script, you append it into the variable.  You can put the entire project into a single file, or you can spread it out across many files.  How you choose to organize it is up to you, and the order in which these files are loaded doesn't actually matter.  Editing the script does not recommend any special editor.  Spacing and capitalization is relatively forgiving.

  Once the script is imported, it is broken down into individual cards, which is basically the equivalent of a PowerPoint slide.  Cards are a special type of block, which means that they are constructed in the markup language.  Navigation happens by moving from one card to the next.  The contents of each individual card is then broken down into individual blocks, and those blocks can be broken down recursively into smaller blocks.

  [b][u]Loading the Script[/u][/b]

  All blocks include instructions on how their properties and contents should be translated into html.  When a new card is loaded, the engine extract the HTML from  each block in order and then combines them into a final output.  If a block contains other blocks inside of it, then the inner blocks are processed first.

  [button cardlink:'Intro-FormattingGuidelines']Read up on formatting guidelines[/button]
  [button cardlink:'Blocks-Intro']Introduction to Blocks[/button]

[/card]

[card:'Intro-FormattingGuidelines']

  [b][/u]Formatting Guidelines[/u][/b]

  Edge Case is parsed directly in JavaScript, so understanding JavaScript will help a lot.  Most browsers do not allow JavaScript to import local text directly, for fear of malicious software, so the only way to add the script is by creating a JavaScript file to use a JavaScript command.

  [bq][button][label]Here is what it looks like to import text:[/label]
  [toggle]rawScript += \`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper molestie sem vel volutpat. Ut elit lectus, imperdiet eu quam convallis, tempor lacinia mauris. Nunc finibus, lectus a mattis ullamcorper, arcu nunc pulvinar tellus, nec efficitur ante dolor nec urna. Donec lacus tortor, pellentesque sed augue non, tincidunt cursus ligula.\`
  [/toggle][/button][/bq]

  Note the use of backticks (the other symbol on the tilda key, next to the '1').  In JavaScript, you can wrap strings in single quotes, double quotes, or backticks.  However, the backtick is less likely to show up in the script itself, and therefore, it is the least likely to result in errors.

  If you would like to use the backtick within the script itself, then you should use the [url:'https://en.wikipedia.org/wiki/Escape_character']escape character[/url].


  [b][u] Capitalization[/u][/b]

  Tag capitalization is case insensitive.


[b][u]Overriding the Default Formatting[/u][/b]

Sometimes, the parser will interpret your script the wrong way.  For instance, if you type "~[b]~[/b]" directly into your script, then the parser will try to format those brackets as code and make them invisible to the reader.  But what if that's not what you want?

[b][u]Parsing tags as text, rather than blocks[/u][/b]

Placing a tilda symbol (the ~ symbol next to the '1' on your keyboard) before the left square bracket will cause the parser to ignore the bracket.  You should also make should do this for both the opening and closing tag.

[bq]
  [button]
    [label]See example:[/label]
    [toggle]
      Script:[br]
      1. With tilda:  [b]~~[b]~~[/b][br][/b]
      2. Without tilda:  [b]~[b]~[/b][/b]

      Output:[br]
      1. With tilda:  ~[b]~[/b][br]
      2. Without tilda:  [b][/b]
    [/toggle]
  [/button]
[/bq]


[b][u]Parsing html as html, rather than as text[/u][/b]

HTML is the opposite way.  By default, angled brackets are converted into a form that the HTML reader won't recognize, in order to prevent accidental errors from the script.  If you want to embed HTML directly, then you should wrap text within the 'HTML' tag.

[bq]
  [button]
    [label]See example:[/label]
    [toggle]
      Script:[br]
      1. [b]<strong>[/b]text you want bolded[b]</strong>[br][/b]
      2. [b]~[HTML]<strong>[/b]text you want bolded[b]</strong>~[/HTML][/b]

      Output:[br]
      1. <strong>text you want bolded</strong>[br]
      2. [HTML]<strong>text you want bolded</strong>[/HTML]
    [/toggle]
  [/button]
[/bq]

[b][u]Writing Out Comments[/u][/b]

If you want to write comments that are only visible to people reading the code directly, then you do that with the [$][/$] tag.

[bq]
  [button]
    [label]See example:[/label]
    [toggle]
      Script:[br]
      I can't believe I ate the [b]~[$]whole~[/$][/b] thing

      Output:[br]
      I can't believe I ate the [$]whole[/$] thing
    [/toggle]
  [/button]
[/bq]
[/card]

[card:'Intro-FirstProject']

[b][u]Creating your first project[/u][/b]

To get started, open up your text editor, and create a card.  The first card in your project should be titled 'main'.  When the program launches, it searches through every card you created, and attempts to look for a card titled 'main' to launch.

[bq]
[b]~[card:'main'][/b][br]
What would I like to eat today? [br]
[b]~[/card][/b]
[/bq]

Okay, you have your first card.  Suppose we want to have the options be, "eat breakfast" or "or jogging."  Let's create two new cards, with those options.  Each card has a unique title.

[bq]
[b]~[card:'main'][/b][br]
What would I like to eat today? [br]
[b]~[/card][/b]

[b]~[card:'EatBreakfast'][/b][br]
You pour syrup on your pancakes and sit down to eat. [br]
[b]~[/card][/b]

[b]~[card:'GoJogging'][/b][br]
You put on your sweatsuit and jog for 20 miles. [br]
[b]~[/card][/b]
[/bq]

Finally, you need a way to link those options to your main card.  We do that by creating buttons with cardlinks, and inserting them into the main card.  Note that each button has a cardlink property, where the value is the title of the card you're trying to link to.

[bq]
[b]~[card:'main'][/b][br]
What would I like to eat today? [br][br]
[b]~[button cardlink:'EatBreakfast'][/b]Go eat breakfast[b]~[/button][/b][br]
[b]~[button cardlink:'GoJogging'][/b]Go jog[b]~[/button][/b][br]
[b]~[/card][/b]

[b]~[card:'EatBreakfast'][/b][br]
You pour syrup on your pancakes and sit down to eat. [br]
[b]~[/card][/b]

[b]~[card:'GoJogging'][/b][br]
You put on your sweatsuit and jog for 20 miles. [br]
[b]~[/card][/b]
[/bq]

And that's basically all you need to know to get started to write a script.

[button cardlink:'example-main']See this example in action[/button]
[button cardlink:'Blocks-Intro']Learn more about blocks[/button]
[button cardlink:'Cards-Intro']Learn more about cards[/button]
[button cardlink:'Buttons-Intro']Learn more about buttons[/button]

[/card]

[card:'example-main']What would I like to eat today?
  [button cardlink:'example-EatBreakfast']Go eat breakfast[/button]
  [button cardlink:'example-GoJogging']Go jog[/button][br]
[/card]

[card:'example-EatBreakfast']
  You pour syrup on your pancakes and sit down to eat.
[/card]

[card:'example-GoJogging']
  You put on your sweatsuit and jog for 20 miles.
[/card]
`
