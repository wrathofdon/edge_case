rawText += `

===START_IMMIGRATION

// Add some awesome graphics!!

   Opponents of illegal immigration are fond of telling foreigners to "get in line" before coming to work in America. But what does that line actually look like, and how many years (or decades) does it take to get through? Try it yourself!

   [img]https://thumbnails-visually.netdna-ssl.com/what-part-of-legal-immigration-dont-you-understand_50290c8272a8d.jpg[/img]

Do you have family in the USA?

+ Yes -> FamilyInUS $$ Family in the US
+ No -> NoFamily $$ No Family in the US


===FamilyInUS
   Is your relative a U.S. citizen or lawful permanent resident?
+ United States Citizen -> FamilyIsCitizen $$ Relative is US Citizen
+ Lawful Permanent Resident -> FamilyIsResident $$ Relative is Permanent Resident

===FamilyIsCitizen
   United States Citizen:
   Are you that relative's parent, spouse, or minor child?
+ Yes -> FamilyIsCitizen.EasyPath $$ Client is close relative
+ No -> FamilyIsCitizen.HarderPath $$ Client is distance relative


===FamilyIsCitizen.EasyPath
   Congratulations! You've found one of the easiest ways to become an American. There is no annual cap on the number of spouses, minor children, or parents of U.S. citizens who can enter, and they generally can receive green cards.
   After five years (three if you're a spouse), a green card holder is eligible to become a citizen.
   After you file your naturalization papers and endure six to 12 months of processing delays, you can take a language and civics test. Pass it, and you're a citizen.
   Total time to immigrate and become a citizen: BEST CASE: SIX TO SEVEN YEARS
+ Summary -> END $$ SIX TO SEVEN YEARS


===FamilyIsCitizen.HarderPath
   Adult children and siblings of U.S. citizens can apply for a green card.
   Wait time depends on home country and marital status.
   Single adult children: six-to- 14-year wait.
   Married adult children: seven- to-15-year wait.
   Siblings of US. citizens: 11-to-22-year wait.
   With a green card, you likely can become a citizen after six years.
   Total time to immigrate and become a citizen: 12 To 28 YEARS
+ Summary -> END $$  12 To 28 YEARS


===FamilyIsResident
   Are you the spouse or child of a lawful permanent resident?
+ Yes -> FamilyIsResident.SpouseOrChild $$ Close relative of resident
+ No -> OutOfLuck $$ Distant relative of resident


===FamilyIsResident.SpouseOrChild
   If you're the child, are you a minor?
+ Yes -> FamilyIsResident.SpouseOrMinor $$ Client is spouse or minor
+ No -> FamilyIsResident.ChildNotMinor $$ Client is child, but not a minor

===FamilyIsResident.SpouseOrMinor
   Spouses and minor children of lawful permanent residents can apply.
   Wait time depends on home country. Wait time: five to seven years.
   With a green card, you likely can become a citizen after six years.
   Total time to immigrate and become a citizen: 11 To 13 YEARS
+ Summary -> END $$ 11 To 13 YEARS


===FamilyIsResident.ChildNotMinor
   Are you single?
+ Yes -> FamilyIsResident.ChildNotMinor.Single $$ Client is single
+ No -> OutOfLuck $$ Client is not single


===FamilyIsResident.ChildNotMinor.Single
   Wait times depend on home country.
   Wait time for a single adult child of a lawful permanent resident: nine to 14 years.
   Total time to immigrate and become a citizen: 14 To 20 YEARS
+ Summary -> END $$ 14 To 20 YEARS


===NoFamily
   Are you skilled?
+ Yes -> HasSkills $$ Client has skills
+ No -> NoFamily.NoSkills $$ Client has no skills


===HasSkills
   Can you prove that you are a genius? How about a star athlete? Or an investor with $1 million?
+ Yes -> HasSkills.IsGenius $$ Client is a genius
+ No -> HasSkills.NotGenius $$ Client is not a genius


===HasSkills.IsGenius
   Congratulations! You have found the quickest way to get a green card, taking 12 to 18 months. But you would have made it anywhere, Mr. Beckham.
   With your green card you can become a citizen in five to six years.
   Total time to immigrate and become a citizen: SIX TO SEVEN YEARS
+ Summary -> END $$  SIX TO SEVEN YEARS


===HasSkills.NotGenius
   Do you have a college degree in a specialty occupation?
+ Yes -> HasSkills.HasDegree $$ Client has degree for specialty occupation
+ No -> OutOfLuck $$ $$ Client has no specialty degree


===HasSkills.HasDegree
   OK. Then you have a shot… if you have a job offer.
+ I have one $$ Client has job offer
+ Nope! $$ $$ Client has no job offer

===JobOffer
Is your employer willing to file the paperwork for a labor certification? And conduct a new job search for your position? And pay up to $10,000 in legal and other fees?
+ Yes -> JobOffer.Paperwork $$ Employer will pay for paperwork
+ No -> OutOfLuck $$ Employer will not pay for paperwork

===JobOffer.Paperwork
   The wait time for a green card is typically six to 10 years.
   Will your employer wait for you to be able to work?
+ Yes -> JobOffer.EmployerWillWait $$ Employer will wait for green card
+ No -> JobOffer.EmployerWontWait $$ Employer will not wait for green card

===JobOffer.EmployerWillWait
   After your green card, count on another five to six years for citizenship.
   Total time to immigrate and become a citizen: 11 To 16 YEARS
+ Summary -> END $$ 11 To 16 YEARS

===JobOffer.EmployerWontWait
If an employer can't wait six to 10 years for you to start work... is he willing to apply for your temporary work visa (H-1B)?
+ Yes -> H1BVisa $$ Employer will apply for H-1B
+ No -> OutOfLuck $$ Employer will not apply for H-1B

===H1BVisa
   Then you have a 50/50 chance of getting your H-1B, because these visas are capped at 85,000 per year, well below the total demand. They run out on the first day they become available. If you are lucky enough to get one, you can start working in fl the country and your employer can apply for your labor certification and green card.
+ Summary -> END $$ 50/50 Chance.

===NoFamily.NoSkills
   Sorry! There is virtually no process for unskilled immigrants without relations in the U.S. to apply for permanent legal residence. Only 10,000 green cards are allotted every year, and the wait time approaches infinity. (Those who receive H-2A or H-2B temporary visas for seasonal work cannot transition to a green card.)
+ Summary -> END $$ Almost impossible

===OutOfLuck
   Sorry, you're out of luck.
+ Summary -> END $$ Out of luck.
`
