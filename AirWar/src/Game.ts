/*
* name;程序入口类
*/
class Game {

    constructor(){
        //初始化引擎，设置游戏的宽高
        Laya.init(400,852,Laya.WebGL);
        //创建循环
        var bg:BackGround = new BackGround();
        //把背景添加到舞台上
        Laya.stage.addChild(bg);

        Laya.loader.load("res/atlas/war.atlas",Laya.Handler.create(this,this.onLoaded),null,Laya.Loader.ATLAS);

    }

    onLoaded():void{

        //创建一个主角
        var hero:Role = new Role();
        hero.pos(200,500);
        Laya.stage.addChild(hero);

    }

}

new Game()
