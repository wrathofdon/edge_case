var immigration = ['===START\n', '   Opponents of illegal immigration are fond of telling foreigners to "get in line" before coming to work in America. But what does that line actually look like, and how many years (or decades) does it take to get through? Try it yourself!\n', '   [img]https://thumbnails-visually.netdna-ssl.com/what-part-of-legal-immigration-dont-you-understand_50290c8272a8d.jpg[/img]\n', '   Do you have family in the USA?\n', '+ Yes -> FamilyInUS $$ Family in the US\n', '+ No -> NoFamily $$ No Family in the US\n', '\n', '\n', '===FamilyInUS\n', '   Is your relative a U.S. citizen or lawful permanent resident?\n', '+ United States Citizen -> FamilyIsCitizen $$ Relative is US Citizen\n', '+ Lawful Permanent Resident -> FamilyIsResident $$ Relative is Permanent Resident\n', '\n', '===FamilyIsCitizen\n', '   United States Citizen:\n', "   Are you that relative\'s parent, spouse, or minor child?\n", '+ Yes -> FamilyIsCitizen.EasyPath $$ Client is close relative\n', '+ No -> FamilyIsCitizen.HarderPath $$ Client is distance relative\n', '\n', '\n', '===FamilyIsCitizen.EasyPath\n', "   Congratulations! You\'ve found one of the easiest ways to become an American. There is no annual cap on the number of spouses, minor children, or parents of U.S. citizens who can enter, and they generally can receive green cards.\n", "   After five years (three if you\'re a spouse), a green card holder is eligible to become a citizen.\n", "   After you file your naturalization papers and endure six to 12 months of processing delays, you can take a language and civics test. Pass it, and you\'re a citizen. \n", '   Total time to immigrate and become a citizen: BEST CASE: SIX TO SEVEN YEARS \n', '+ Summary -> END $$ SIX TO SEVEN YEARS \n', '\n', '\n', '===FamilyIsCitizen.HarderPath\n', '   Adult children and siblings of U.S. citizens can apply for a green card.\n', '   Wait time depends on home country and marital status.\n', '   Single adult children: six-to- 14-year wait.\n', '   Married adult children: seven- to-15-year wait.\n', '   Siblings of US. citizens: 11-to-22-year wait.\n', '   With a green card, you likely can become a citizen after six years.\n', '   Total time to immigrate and become a citizen: 12 To 28 YEARS \n', '+ Summary -> END $$  12 To 28 YEARS \n', '\n', '\n', '===FamilyIsResident\n', '   Are you the spouse or child of a lawful permanent resident?\n', '+ Yes -> FamilyIsResident.SpouseOrChild $$ Close relative of resident\n', '+ No -> OutOfLuck $$ Distant relative of resident\n', '\n', '\n', '===FamilyIsResident.SpouseOrChild\n', "   If you\'re the child, are you a minor?\n", '+ Yes -> FamilyIsResident.SpouseOrMinor $$ Client is spouse or minor\n', '+ No -> FamilyIsResident.ChildNotMinor $$ Client is child, but not a minor\n', '\n', '===FamilyIsResident.SpouseOrMinor\n', '   Spouses and minor children of lawful permanent residents can apply.\n', '   Wait time depends on home country. Wait time: five to seven years.\n', '   With a green card, you likely can become a citizen after six years. \n', '   Total time to immigrate and become a citizen: 11 To 13 YEARS\n', '+ Summary -> END $$ 11 To 13 YEARS\n', '\n', '\n', '===FamilyIsResident.ChildNotMinor\n', '   Are you single?\n', '+ Yes -> FamilyIsResident.ChildNotMinor.Single $$ Client is single\n', '+ No -> OutOfLuck $$ Client is not single\n', '\n', '\n', '===FamilyIsResident.ChildNotMinor.Single\n', '   Wait times depend on home country.\n', '   Wait time for a single adult child of a lawful permanent resident: nine to 14 years.\n', '   Total time to immigrate and become a citizen: 14 To 20 YEARS \n', '+ Summary -> END $$ 14 To 20 YEARS \n', '\n', '\n', '===NoFamily\n', '   Are you skilled?\n', '+ Yes -> HasSkills $$ Client has skills\n', '+ No -> NoFamily.NoSkills $$ Client has no skills\n', '\n', '\n', '===HasSkills\n', '   Can you prove that you are a genius? How about a star athlete? Or an investor with $1 million?\n', '+ Yes -> HasSkills.IsGenius $$ Client is a genius\n', '+ No -> HasSkills.NotGenius $$ Client is not a genius\n', '\n', '\n', '===HasSkills.IsGenius\n', '   Congratulations! You have found the quickest way to get a green card, taking 12 to 18 months. But you would have made it anywhere, Mr. Beckham.\n', '   With your green card you can become a citizen in five to six years. \n', '   Total time to immigrate and become a citizen: SIX TO SEVEN YEARS\n', '+ Summary -> END $$  SIX TO SEVEN YEARS\n', '\n', '\n', '===HasSkills.NotGenius\n', '   Do you have a college degree in a specialty occupation?\n', '+ Yes -> HasSkills.HasDegree $$ Client has degree for specialty occupation\n', '+ No -> OutOfLuck $$ $$ Client has no specialty degree\n', '\n', '\n', '===HasSkills.HasDegree\n', '   OK. Then you have a shot… if you have a job offer.\n', '+ I have one $$ Client has job offer\n', '+ Nope! $$ $$ Client has no job offer\n', '\n', '===JobOffer\n', 'Is your employer willing to file the paperwork for a labor certification? And conduct a new job search for your position? And pay up to $10,000 in legal and other fees?\n', '+ Yes -> JobOffer.Paperwork $$ Employer will pay for paperwork\n', '+ No -> OutOfLuck $$ Employer will not pay for paperwork\n', '\n', '===JobOffer.Paperwork\n', '   The wait time for a green card is typically six to 10 years.\n', '   Will your employer wait for you to be able to work?\n', '+ Yes -> JobOffer.EmployerWillWait $$ Employer will wait for green card\n', '+ No -> JobOffer.EmployerWontWait $$ Employer will not wait for green card\n', '\n', '===JobOffer.EmployerWillWait\n', '   After your green card, count on another five to six years for citizenship.\n', '   Total time to immigrate and become a citizen: 11 To 16 YEARS\n', '+ Summary -> END $$ 11 To 16 YEARS\n', '\n', '===JobOffer.EmployerWontWait\n', "If an employer can\'t wait six to 10 years for you to start work... is he willing to apply for your temporary work visa (H-1B)?\n", '+ Yes -> H1BVisa $$ Employer will apply for H-1B\n', '+ No -> OutOfLuck $$ Employer will not apply for H-1B\n', '\n', '===H1BVisa\n', '   Then you have a 50/50 chance of getting your H-1B, because these visas are capped at 85,000 per year, well below the total demand. They run out on the first day they become available. If you are lucky enough to get one, you can start working in fl the country and your employer can apply for your labor certification and green card. \n', '+ Summary -> END $$ 50/50 Chance.\n', '\n', '===NoFamily.NoSkills\n', '   Sorry! There is virtually no process for unskilled immigrants without relations in the U.S. to apply for permanent legal residence. Only 10,000 green cards are allotted every year, and the wait time approaches infinity. (Those who receive H-2A or H-2B temporary visas for seasonal work cannot transition to a green card.)\n', '+ Summary -> END $$ Almost impossible\n', '\n', '===OutOfLuck\n', "   Sorry, you\'re out of luck.\n", '+ Summary -> END $$ Out of luck.'];

function findSlide (immigration, line) {
  while (immigration[line].substring(0,3) !== '===') line++;
  let slideName = immigration[line].substring(3).trim();
  // console.log('\n' + slideName);
  line++;
  addSlide(slideName);
  var slideDescription = '';
  while (immigration[line][0] !== '+') {
    slideDescription = slideDescription + '[br]' + immigration[line].trim() + '[br]';
    line++
  }
  slides[slideName].description = slideDescription;
  while ( line < immigration.length && immigration[line][0] === '+') {
    let lineText = immigration[line].substring(1);
    // this code is for the future so that the button code can take up multiple lines
    // while (line + 1 < immigration.length && immigration[line + 1][0] != '+') {
    //   line++
    //   lineText = lineText + ' ' + immigration[line].trim();
    // }
    var obj = {};
    var array = lineText.trim().split('$$');
    if (array.length > 1) obj.finalOutput = array.pop().trim();
    array = array[0].trim().split('??');
    if (array.length > 1) obj.conditional = array.pop().trim();
    array = array[0].trim().split('->');
    if (array.length > 1) obj.script = 'goTo("' + array.pop().trim() + '");';
    obj.display = array[0].trim();
    // console.log(obj.display);
    slides[slideName].addButton(obj);
    line++
  }
  return line;
}

var lineNo = 0
while (lineNo < immigration.length) {
  lineNo = findSlide(immigration, lineNo);
}
