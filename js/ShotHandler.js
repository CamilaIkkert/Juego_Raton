class ShotHandler{

    constructor(initialAmmo){
        this.initialAmmo = initialAmmo;
        this.ammo = initialAmmo;
    }

    getAmmoNumber(){
        return this.ammo;
    }

    resetAmmo(){
        this.ammo = this.initialAmmo;
        this.changeShootBoxImage();
    }

    checkIsNoAmmoLeft(){
        if (this.ammo == 0) {
            return true;
        }
        return false;
    }

    checkIfHitSuccessful(mouses, mouseX, mouseY){
        if (mouseX == undefined || mouseY == undefined) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        }
        let numberOfSuccessfulHits = 0;

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


    isShotOnMouse(mouseX,mouseY,mousePosition) {
        let mousesX = mousePosition.left;
        let mousesY = mousePosition.top;
        let mouseWidth = 78;
        let mouseHeight = 73;
    
        if ((mouseX>=mousesX) && (mouseX <= mousesX+mouseHeight) && 
            (mouseY >= mousesY) && (mouseY <= mousesY+mouseWidth)){
            return true;
        }
        return false;
    }

    changeShootBoxImage() {
        $("#ammunitionAmmount").html(this.ammo)
    }

    enableShooting(){
        $("#shootBlocker").hide();
    }

    disablehooting(){
        $("#shootBlocker").show();
    }
}


