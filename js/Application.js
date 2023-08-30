var startScreen = new StartScreen();

function launchApplication() {
    let gameParameters = startScreen.getGameParametersFromUserSelect();
    let selectedModeName = gameParameters.modeName;
    let selectedMode;

    if (selectedModeName == "Difícl") {
        selectedMode = new DificilGame(gameParameters);
    }
    else if(selectedModeName == "Intemedio"){
        selectedMode = new IntermedioGame(gameParameters);
    }
    else{
        selectedMode = new FacilGame(gameParameters);
    }

    startScreen.hideStartScreen();
    selectedMode.startGame();
}