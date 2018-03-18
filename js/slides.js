/*jshint esversion: 6 */
class Slide {
    constructor (title, project, namespace, text, buttons) {
        this.title = title; // user assigned title
        this.project = project; // name of the overal project
        this.namespace = namespace; // the current subsection of the project
        this.timesVisited = 0; // the number of times this slide has already been loaded.
        this.existingCopies = 0; // the number of copies already rendered.  This is necessary to prevent duplicate IDs.  This number will count down if the goBack() method is called, useful if you want to re-initialize certain variable.

        this.excerpts = {'all': []};
        this.generateExcerpts(text);
        
        this.buttons = buttons;
        slides[title] = this;
    }

    // ensures that a unique ID is created if the same slide is displayed more than once
    displayId() {
        return this.title + '(' + this.existingCopies + ')';
    }

    menuId() {
        return this.displayId() + '-menu';
    }

    // splits text into excerpts, which can be cited by other slides
    generateExcerpts(textRaw){
        let lines = textRaw.split('\n');
        let currentExcerpt = null;
        for (let i = 0; i < lines.length; i++) {
            // detects if the script wants to signify a new excerpt
            if (lines[i].substring(0,3) == '==@') {
                currentExcerpt = lines[i].substring(3, lines[i].lastIndexOf('==')).trim();
                if (!(currentExcerpt in this.excerpts)) this.excerpts[currentExcerpt] = [];
            } else {
                let line = lines[i].trim();
                this.excerpts.all.push(line);
                if (currentExcerpt) this.excerpts[currentExcerpt].push(line);
    }}}

    // renders slide into HTML
    renderSlide() {
        this.existingCopies += 1;
        this.timesVisited += 1;
        currentSlideName = this.title;
        if (document.getElementById(globalHistory.currentChapterID()) == null) {
            document.getElementById('main').innerHTML += `<div id="${this.currentChapterID()}" class="chapter-visible">`;
        }
        var chapter = document.getElementById(globalHistory.currentChapterID());
        chapter.innerHTML += `<div id="${this.displayId()}" class="slide"></div>`;
        chapter.innerHTML += `<div id="${this.menuId()}" class="menu"></div>`;

        for (let i = 0; i < this.excerpts.all.length; i++) {
            this.addLine(this.excerpts.all[i]);
        }
        
        this.renderButtonMenu();
        $(".toggle-button").click(function(){
            var id = this.getAttribute('toggleId');
            $('#' + id).toggle();
        });
    }

    renderButtonMenu() {
        var slideMenu = document.getElementById(this.menuId());
        slideMenu.innerHTML = '';
        currentButtonsDictionary = {};
        currentButtonsArray = [];
        for (let i = 0; i < this.buttons.length; i++) {
            let button = new Button(this.title, i, this.buttons[i]);
            button.count = button.limit;
            slideMenu.innerHTML += ('<div id="' + button.buttonId +
            '" class="button-hidden">' + button.getHTML() + '</div>');
            button.checkState();
            currentButtonsArray.push(button.buttonId);
            currentButtonsDictionary[button.buttonId] = button;
        }
    }

    updateButtons() {
        for (let i = 0; i < currentButtonsArray.length; i++) {
            let button = currentButtonsDictionary[currentButtonsArray[i]];
            let buttonElement = document.getElementById(button.buttonId);
            if (buttonElement.innerHTML != button.getHTML())
                buttonElement.innerHTML = button.getHTML();
            button.checkState();
        }
    }

    clearButtonMenu() {
        var slideMenu = document.getElementById(this.menuId());
        slideMenu.innerHTML = '<hr>';
    }
    
    // adds individual lines of HTML
    addLine(text) {
        text = parseJSCode(text).trim();
        if (text && text.toLowerCase() != 'blank') {
            document.getElementById(this.displayId()).innerHTML += ('<br>' + text + '<br>');
        }
        return !!text;
    }
}
