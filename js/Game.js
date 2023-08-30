class Game{

    constructor(gameParameters){
        this.mouseMovesNumber = gameParameters.movesNumber;
        this.shotHandler = new ShotHandler(gameParameters.initialAmmo);
        this.pointsHandler = new PointsHandler(gameParameters.mousesNumber);
        this.mousesHandler = new MouseHandler(gameParameters.mousesNumber, gameParameters.movesNumber);
        this.roundEndCountdown;
        this.percentProgress = 0;
        this.lives = 3;
        this.newRoundTimeout;
        this.totalSuccessfulHits = 0;
        this.totalShotsNumber = 0;
    }

    startGame(){
        setTimeout(() => this.startNewRound(), 7300);
    }

    shoot(){
        this.totalShotsNumber ++;
        let successfulHits = this.shotHandler.checkIfHitSuccessful(this.mousesHandler.mouses);
        this.mousesHandler.mousesKilledInRound += successfulHits;

        if (successfulHits > 0) {
            this.totalSuccessfulHits += successfulHits;
            this.pointsHandler.addPoints(successfulHits);
            this.percentProgress = this.mousesHandler.countPrecentOfMousesKilled();
            displayProgressOnProgressBar(this.percentProgress);
        }
        this.checkIfRoundIsFinished();
    }

    checkIfRoundIsFinished(){
        if (this.mousesHandler.checkAllMousesAreShot() || this.shotHandler.checkIsNoAmmoLeft()) {
            this.finishRound();
        }
    }

    finishRound(){
        this.stopCountdownToRoundEnd();
        this.shotHandler.disablehooting();
        this.mousesHandler.removeRemainingMouses();
        this.newRoundTimeout = setTimeout(() => this.startNewRound(), 2000);        
        this.checkIfRoundIsPassed();
    }

    checkIfRoundIsPassed(){
        if (this.percentProgress < 90) {
            this.subtractLives();
        }
    }

    subtractLives(){
        disableLifeIcon(this.lives);
        this.lives--;
        if (this.lives < 1) {this.finishGame();}
    }
    
    finishGame(){
        window.clearTimeout(this.newRoundTimeout);
        let accuracy = Math.round(this.totalSuccessfulHits/this.totalShotsNumber*100);
        displayEndScreen(this.pointsHandler, this.totalSuccessfulHits, accuracy);
    }
    
    startNewRound(){
        displayProgressOnProgressBar(0);
        this.percentProgress = 0;
        this.pointsHandler.addLevel();
        this.setCountdownToRoundEnd();
        this.mousesHandler.startMousesRun();
        this.shotHandler.enableShooting();
        this.shotHandler.resetAmmo();
    }

    stopCountdownToRoundEnd(){
        window.clearTimeout(this.roundEndCountdown);
    }

    setCountdownToRoundEnd(){
        let timeToRoundEnd = this.mouseMovesNumber*1000;
        this.roundEndCountdown = setTimeout(() => this.finishRound(), timeToRoundEnd);
    }
}


class DificlGame extends Game{

    constructor(gameParameters){
        super(gameParameters);
        this.initializeCurrentModeSettings();
        this.shooting;
        this.mouseX;
        this.mouseY;
    }

    initializeCurrentModeSettings(){
        $(".background").mousedown(()=>this.startAutoShooting(e));
        $(".background").mouseup(()=>this.stopAutoShooting(e));
    }

    saveCurrentCoordinates(){
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }

    startAutoShooting(event){
        $(".background").on("mousemove", ()=>this.saveCurrentCoordinates());
        this.shooting = setInterval(()=>this.shoot(),100);
    }

    stopAutoShooting(){
        $(".background").off("mousemove");
        clearInterval(this.shooting);
    }

    shoot(){
        this.totalShotsNumber ++;
        let successfulHits = this.shotHandler.checkIfHitSuccessful(this.mousesHandler.mouses, this.mouseX, this.mouseY);
        this.mousesHandler.mousesKilledInRound += successfulHits;
        if (successfulHits > 0) {
            this.totalSuccessfulHits += successfulHits;
            this.pointsHandler.addPoints(successfulHits);
            this.percentProgress = this.mousesHandler.countPrecentOfMousesKilled();
            displayProgressOnProgressBar(this.percentProgress);
        }
        this.checkIfRoundIsFinished();
    }

    finishRound(){
        this.stopAutoShooting();
        this.stopCountdownToRoundEnd();
        this.shotHandler.disablehooting();
        this.mousesHandler.removeRemainingMouses();
        this.newRoundTimeout = setTimeout(() => this.startNewRound(), 2000);   
        this.checkIfRoundIsPassed();
        this.addNewMouse();
    }

    addNewMouse(){
        if (this.mousesHandler.numberOfMouses < 20) {
            this.mousesHandler.createNewMouse();
        }
    }
}


class IntermedioGame extends Game{
    
    constructor(gameParameters){
        super(gameParameters);
        this.changeBackgroudsForCurrentMode();
    }

    changeBackgroudsForCurrentMode(){
        $("#background").click(this.shoot.bind(this));
    }
}


class FacilGame extends Game{
    constructor(gameParameters){
        super(gameParameters);
        this.changeBackgroudsForCurrentMode();
    }

    changeBackgroudsForCurrentMode(){
        $("#background").click(this.shoot.bind(this));
    }
}