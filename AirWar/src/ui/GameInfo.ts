/*
* name;
*/
class GameInfo extends ui.GameInfoUI{
    constructor(){
        super()
        this.pauseBtn.on(Laya.Event.CLICK,this,this.onPauseBtnClick);
        this.reset();
    }

    public reset():void{
        this.infoLabel.text = ""
        this.hp(5);
        this.level(0)
        this.score(0)
    }

    onPauseBtnClick(e:Laya.Event):void{
        e.stopPropagation();
        this.infoLabel.text = "游戏已暂停，点击任意地方恢复游戏"
        gameInstance.pause();
        Laya.stage.once(Laya.Event.CLICK,this,this.onStatgeClick)

    }

    onStatgeClick(e:Laya.Event):void{
        this.infoLabel.text = "";
        gameInstance.resume();
    }

    public hp(value:number):void{

        this.hpLabel.text = "HP:"+value;

    }

    public level(value:number):void{
        this.levelLabel.text = "Level:"+value;
    }

    public score(value:number):void{
        this.scoreLabel.text = "Score:"+value;
    }
}