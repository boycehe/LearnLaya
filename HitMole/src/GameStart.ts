/*
* name;
*/
class GameStart extends ui.GameStartUI{

    constructor(){
        super();
        this.startBtn.on(Laya.Event.CLICK,this,this.startGame);
    }

    startGame():void{

        this.removeSelf();
        if(!GameMain.gameView){
            GameMain.gameView = new GameView();
        }
        GameMain.gameView.gameStart();
        Laya.stage.addChild(GameMain.gameView);
    }

}