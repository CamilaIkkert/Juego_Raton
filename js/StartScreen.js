class StartScreen{

    constructor(){
        this.availableModes = new Array();
        this.currentModeIndex = 0;
        this.initializeModes();
        this.initializeButtons();
        this.displaySettingsForCurrentMode();
    }

    initializeModes(){
        this.availableModes.push(
            {name:"Facil", moves:7, ammunition:3, mouses:2},
            {name:"Intermedio", moves:6, ammunition:5, mouses:3},
            {name:"Dificil", moves:7, ammunition:50, mouses:1}
        )
    }

    initializeButtons(){
        $("#prevMode").click(()=>this.changeMode("prev"));
        $("#nextMode").click(()=>this.changeMode("next"));
    }

    changeMode(togle){
        if (togle == "next") {
            if (this.currentModeIndex<2) {
                this.currentModeIndex++;
            }else{
                this.currentModeIndex = 0;
            }
        } else {
            if (this.currentModeIndex >0) {
                this.currentModeIndex--;
            }else{
                this.currentModeIndex = 2;
            }
        }
        this.displaySettingsForCurrentMode();
    }

    displaySettingsForCurrentMode(){
        let selectedMode = this.availableModes[this.currentModeIndex];
        $("#modeSelect .selection").html(selectedMode.name);
    }

    getGameParametersFromUserSelect(){
        let selectedMode = this.availableModes[this.currentModeIndex];
        let gameParameters = {modeName:selectedMode.name, mousesNumber:selectedMode.mouses, movesNumber:selectedMode.moves, initialAmmo:selectedMode.ammunition};
        return gameParameters;
    }

    hideStartScreen(){
        document.getElementById("startScreen").style.display = "none";
    }
}