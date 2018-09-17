rawScript += `[card:'TODO']
Nothing here yet.  This is still a work in progress.[/card]`

addCard(`main`,`[b][u]Introduction[/u][/b]

Welcome to [b]Edge Case[/b], a scripting engine for creating interactive works-in-progress, especially for the sake of learning.  By adopting a "choose your own adventure" style experience, students are encouraged to discover their own path towards education.

Scripts can be written in any text editor and launched in any web browser, with no special software or setup required.  It is easy to update and easy to track changes, which makes this an ideal tool for collaborations.

You don't have to be an experienced coder to learn to use Edge Case.  The language is based on the user friendly bulletin board code designed for laypersons, but it's also flexible enough for more advanced functionality.

[button cardlink:'GettingStarted']How does Edge Case Work?[/button]`);

addCard(`GettingStarted`, `[b][u]Getting Started with Edge Case[/u][/b]

All of the data for Edge Case is stored as plain text, which can be loaded from one or many files.  This is convenient for more complex projects, since you can it down by section.  From there, the plain text is broken into individual cards, and the individual cards are broken down into blocks.

Cards are basically the equivalent of a PowerPoint slide, or a page view on a website or mobile app.  Edge Case currently loads only one card at a time, and the user will navigate from one card to the next.  As the author, you must give each card a unique title, and these titles will serve as destination IDs when linking cards together.

Blocks are the equivalent of HTML nodes.  When the author creates text, they can wrap portions of that text into blocks for additional formatting options.  Different blocks have different tags, and different tags have different features.  For instance, the "~[b]" tag makes text bold, the "~[i]" tag makes text italicized, and the "~[u]" tag makes text underlined.  The following example are three different blocks in the same line:

[bq]Input: [code]~[b]Bolded text~[/b] ~[i]italicized text~[/i] ~[u]underlined text~[/u][/code]

Output:[br] [b]Bolded text[/b] [i]italicized text[/i] [u]underlined text[/u][/bq]

Blocks can be nested within other blocks.  [b]For instance, you can set an entire sentence to bold, [i]and then italicize a smaller portion of it.[/i][/b]  Some tags actually require additional internal blocks in order to work.

However, the usefulness of blocks goes beyond simple formatting.  You can also use them to handle variables, create buttons, run JavaScript functions, etc.`)
//
// addCard(`IntroductionToCards`, `[b][u]Getting Started with Edge Case[/u][/b]
//
// All data in Edge Case is stored in a global string variable called "rawScript."  To add a card to rawScript, you simply type one of the following this into your code:
//
// [bq]Option 1: [code]rawScript += \`~[card:'Title']Content~[/card]\`[/code]
// Option 2: [code]addCard(\`main\`, \`content\`);[/code][/bq]
//
// The title of the card should be unique and clear.  If two cards try to have the same title, it will result in in an error.
//
// Option 1 allow would allow you to add multiple cards in the same command, one after another.  Option 2 means you have to input one card at a time.  It's up to you to decide which one you are more comfortable with.
//
// Each card needs to have a unique title in order to avoid potential conflicts.[/card]`)

// addCard(`IntroductionToCards`, `[b][u]Getting Started with Edge Case[/u][/b]
//
// All[/card]`)
//
// addCard(`IntroductionToCards`, `[b][u]Getting Started with Edge Case[/u][/b]
//
// All[/card]`)
//
// addCard(`IntroductionToCards`, `[b][u]Getting Started with Edge Case[/u][/b]
//
// All[/card]`)
//
// addCard(`IntroductionToCards`, `[b][u]Getting Started with Edge Case[/u][/b]
//
// All[/card]`)
