/*
* name;
*/
class GameOver extends ui.GameOverUI{
    constructor(){
        super()
        this.reStartBtn.on(Laya.Event.CLICK,this,this.restartGame);
    }

    restartGame():void{
        this.removeSelf();
        GameMain.gameView.removeSelf();
        GameMain.gameView.gameStart();
        Laya.stage.addChild(GameMain.gameView);
    }

    setScoreUI(score:number):void{
         var data:any = {};
        var temp:number = score;

        for(var i:number = 9;i>=0;i--){
            data["item"+i] = {index:Math.floor(temp%10)};
            temp/=10;
        }  

        this.scoreNums.dataSource = data;
    }
}