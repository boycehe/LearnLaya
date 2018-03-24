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

    }

}

new Game()
