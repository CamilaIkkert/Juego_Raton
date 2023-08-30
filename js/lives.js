class ShotHandler{

    constructor(initialTry){
        this.initialTry = initialTry;
        this.try = initialTry;
    }

    getTryNumber(){
        return this.try;
    }

    resetTry(){
        this.try = this.initialTry;
    }

    checkIsNoTryLeft(){
        if (this.try == 0) {
            return true;
        }
        return false;
    }

    checkIfHitSuccessful(mouses, mouseX, mouseY){
        if (mouseX == undefined || mouseY == undefined) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
        let numberOfSuccessfulHits = 0;
        this.subtractTries();

        for (let index = 0; index < mouses.length; index++) {
            let mouse = mouses[index];
            let mousePosition = $(mouse.mouseId).offset();

            if(this.isShotOnMouse(mouseX,mouseY,mousePosition) && mouse.isAlive){
                mouse.fallDown();
                numberOfSuccessfulHits++;
            }   
        }
        if (numberOfSuccessfulHits>1) {
            showComboMessage(mouseX,mouseY, numberOfSuccessfulHits);
        }
        return numberOfSuccessfulHits;
    }

    subtractTries(){
        this.shoot.currentTime = 0;
        this.shoot.play();
        this.try--;
        this.changeShootBoxImage();
    }

    isShotOnMouse(mouseX,mouseY,mousePosition) {
        let mouseX = mousePosition.left;
        let mouseY = mousePosition.top;
        let mouseWidth = 78;
        let mouseHeight = 73;
    
        if ((mouseX>=mouseX) && (mouseX <= mouseX+mouseHeight) && 
            (mouseY >= mouseY) && (mouseY <= mouseY+mouseWidth)){
            return true;
        }
        return false;
    }
}