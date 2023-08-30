class Mouse{

    constructor(id, mouseMovesNumber){
        this.mouseMovesNumber = mouseMovesNumber;
        this.mouseId = `#${id}`;
        this.isAlive = true;
        this.moveCount = 0;
        this.mouseRun;
        this.currentWidth = 48;
        this.currentHeight = 20;
    }


    startRun(){
        this.resurrect();
        this.mouseRun = setInterval(() => this.run(), 1000);
    }


    resurrect(){
        this.isAlive = true;
        this.moveCount = 0;
        this.currentWidth = 48;
        this.currentHeight = 20;
        this.moveToInitialPosition();
    }


    stopRunAnimation(){
        clearInterval(this.mouseRun);
        $(this.mouseId).stop(true);
    }


    moveToInitialPosition(){
        $(this.mouseId).css("bottom", "20%");
    }


    runOut(){
        this.stopRunAnimation();
        let destWidth = this.getRandomWidth(10,85);
        this.changeMouseBackground(destWidth, 100);
        $(this.mouseId).animate({bottom: `100%`, left: `${destWidth}%`}, 500 ,function(){})
    }


    fallDown(){
            this.isAlive = false;
            let this_ = this;
            this.stopRunAnimation();
            $(this.mouseId).css("background-image", "url(/img/mouseDead.png)")

            setTimeout(function(){
                $(this_.mouseId)
                    .css("background-image", "url(/img/mouseDead.png)")
                    .animate({bottom: `10%`,}, 650);
            },150);
    }
    

    run(){
        this.moveCount++;
        let destWidth = this.getRandomWidth(10,85);
        let destHeight = this.getRandomHeight(35,85);
        this.changeMouseBackground(destWidth, destHeight);
        $(this.mouseId).animate({bottom: `${destHeight}%`, left: `${destWidth}%`}, 1000)
        this.currentWidth = destWidth;
        this.currentHeight = destHeight;
    }


    changeMouseBackground(destWidth, destHeight){
        if (destWidth > this.currentWidth) {
            $(this.mouseId)
            .css("background-image", "url(/img/mouseAliveRight.png)");
            if(destHeight - this.currentHeight > 20){
                $(this.mouseId)
                .css("background-image", "url(/img/mouseAliveLeft.png)");}
            if(destHeight - this.currentHeight < -20){
                $(this.mouseId)
                .css("background-image", "url(/img/mouseAliveRight.png)");
            
            }
        } else {
            $(this.mouseId)
            .css("background-image", "url(/img/mouseAliveLeft.png)");

            if(destHeight - this.currentHeight > 20){
                $(this.mouseId)
                .css("background-image", "url(/img/mouseAliveRight.png)");}
            if(destHeight - this.currentHeight < -20){
                $(this.mouseIdId)
                .css("background-image", "url(/img/mouseAliveLeft.png)");
            }
        }
    }


    getRandomWidth(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    
    getRandomHeight(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;   
    }
}