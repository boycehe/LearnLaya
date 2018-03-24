/*
* name;程序入口类
*/
var Game = /** @class */ (function () {
    function Game() {
        //敌机血量
        this.hps = [1, 2, 10];
        this.speeds = [3, 2, 1];
        this.radius = [15, 30, 70];
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
        this.hero = new Role();
        this.hero.init("hero", 0, 1, 0, 30);
        this.hero.pos(200, 500);
        Laya.stage.addChild(this.hero);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        // this.createEnemy(10);
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Game.prototype.onLoop = function () {
        //遍历舞台上所有的飞机，更改飞机的状态
        for (var i = Laya.stage.numChildren - 1; i > 0; i--) {
            var role = Laya.stage.getChildAt(i);
            if (role && role.speed) {
                role.y += role.speed;
                //如果敌机移动到显示区域外则移除
                if (role.y > 1000) {
                    role.removeSelf();
                    Laya.Pool.recover("role", role);
                }
            }
        }
        //每隔30帧创建新的飞机
        if (Laya.timer.currFrame % 60 === 0) {
            this.createEnemy(2);
        }
    };
    Game.prototype.createEnemy = function (num) {
        for (var i = 0; i < num; i++) {
            //随机出现敌人
            var r = Math.random();
            //根据随机数，随机敌人
            var type = r < 0.7 ? 0 : r < 0.95 ? 1 : 2;
            //初始角色
            var enemy = Laya.Pool.getItemByClass("role", Role);
            enemy.init("enemy" + (type + 1), 1, this.hps[type], this.speeds[type], this.radius[type]);
            //随机位置
            enemy.pos(Math.random() * 400, Math.random() * 200);
            //添加到舞台
            Laya.stage.addChild(enemy);
        }
    };
    Game.prototype.onMouseMove = function () {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    return Game;
}());
new Game();
//# sourceMappingURL=Game.js.map