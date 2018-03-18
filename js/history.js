/*jshint esversion: 6 */

class History {
    constructor() {
        // this is a history of all the slides that the user has visited in.  It is an array of arrays.  The second level arrays represent individual "chapters", which is signified any time the current screen is cleared out.  The chapters contain a list of strings, which are the titles of the slides.
        this.historicalLogs = [];
    }

     // returns the HTML ID of the current chapter
    currentChapterID() {
        return 'main-chapter-' + this.historicalLogs.length;
    }

    // hides current slides from screen before loading the next one
    goto(title) {
        let main = document.getElementById('main');
        if (this.historicalLogs.length > 0) {
            let previousChapter = document.getElementById(this.currentChapterID());
            previousChapter.setAttribute('class', 'chapter-hidden');
        }
        this.historicalLogs.push([title]);
        main.innerHTML += `<div id="${this.currentChapterID()}" class="chapter-visible">`;
        this.attach(title, true);
    }

    // attaches the next slide onto the current one
    attach(title, alreadyAddedToHistory = false) {
        if (currentSlideName != null) {
            currentSlide().clearButtonMenu();
            title = addNameSpace(title, currentSlide().project, currentSlide().namespace);
        }
        slides[title].renderSlide();
        if (!alreadyAddedToHistory) this.historicalLogs[-1].push(title);
    }

    // deletes the latest slide, and returns an object containing information
    deleteLatestSlide() {
        if (currentSlideName == null) return {name: 'START'};
        let newChapter = false; // boolean on whether or no the slide being deleted was the start of a new chapter
        if (this.historicalLogs[-1].length == 1) {
            let currentChapter = document.getElementById(this.currentChapterID());
            currentChapter.parentNode.removeChild(currentChapter);
            this.historicalLogs.pop();
            newChapter = true;
        } else {
            let slideText = document.getElementById(currentSlide().displayId());
            let slideMenu = document.getElementById(currentSlide().menuId());
            slideText.parentNode.removeChild(slideText);
            slideMenu.parentNode.removeChild(slideMenu);
            this.historicalLogs[-1].pop();
        }
        currentSlide().existingCopies -= 1;
        if (this.historicalLogs.length == 0) currentSlideName = null;
        else currentSlideName = this.historicalLogs[-1][-1];
        return {name: currentSlideName, newChapter: newChapter};
    }

    // deletes the current slide, and then reloads the slide tha came before
    goBack() {
        var previousSlideName = this.deleteLatestSlide().name; // the first delete will provide us with name of the second delete
        let newChapter = this.deleteLatestSlide().newChapter; // the second delete will tell us whether or not we need to start a 
        if (this.historicalLogs.length == 0) {
            this.goto('START');
            return;
        }
        console.log(66);
        if (newChapter) this.goto(previousSlideName);
        else this.attach(previousSlideName);
    }
}

// creates a global history object
globalHistory = new History();

function attach(title) {
    globalHistory.attach(title);
}

function goto(title) {
    globalHistory.goto(title);
}

function goBack() {
    globalHistory.goBack();
    $('.button-visible').click(runButton);
}

function startSlideShow() {
    goto('START');
    $('.button-visible').click(runButton);
    $('#GoBack').click(function() {
    goBack();
  });
}

// the user can specify the default link type, which is no associated with the appropriate function
if (defaultLinkType == 'attach') defaultLinkType = attach;
else defaultLinkType = goto;