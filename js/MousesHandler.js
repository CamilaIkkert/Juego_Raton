class MouseHandler{
    
    constructor(numberOfMouses, mouseMovesNumber){
        this.mouseMovesNumber = mouseMovesNumber;
        this.initialMousesNumber = numberOfMouses;
        this.numberOfMouses = 0;
        this.mouses = new Array();
        this.mousesKilledInRound = 0;
        this.createMouses();
    }

    startMousesRun(){
        this.mousesKilledInRound = 0;
        this.mouses.forEach(mouse => {
            mouse.startRun();
        });
    }

    removeRemainingMouses(){
        this.mouses.forEach(mouse => {
            if (mouse.isAlive) {
                mouse.runOut();
            }
        });
    }

    checkAllMousesAreShot(){
        if (this.mousesKilledInRound == this.numberOfMouses) {
            return true;
        }
        return false;
    }

    countPrecentOfMousesKilled(){
        let percent = Math.round(this.mousesKilledInRound/this.numberOfMouses*100);
        return percent;
    }

    createNewMouse(){
        this.numberOfMouses ++;
        let id = this.mouses.length;
        this.mouses.push(new Mouse(id, this.mouseMovesNumber));
        $("#background").append(`<div id="${id}" class="mouse"></div>`);
    }

    createMouses(){
        for (let i = 0; i < this.initialMousesNumber; i++) {
            this.createNewMouse();
        }
    }
}