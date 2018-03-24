/*
* name;程序入口类
*/
var Game = /** @class */ (function () {
    function Game() {
        //初始化引擎，设置游戏的宽高
        Laya.init(400, 852, Laya.WebGL);
        //创建循环
        var bg = new BackGround();
        //把背景添加到舞台上
        Laya.stage.addChild(bg);
        Laya.loader.load("res/atlas/war.atlas", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        //创建一个主角
        var hero = new Role();
        hero.pos(200, 500);
        Laya.stage.addChild(hero);
    };
    return Game;
}());
new Game();
//# sourceMappingURL=Game.js.map