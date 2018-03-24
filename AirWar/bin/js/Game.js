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
        this.hero.shootType = 1;
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
                if (role.y > 1000 || !role.visible || (role.isBullet && role.y < -20)) {
                    role.removeSelf();
                    role.isBullet = false;
                    role.visible = true;
                    Laya.Pool.recover("role", role);
                }
            }
            //处理发射子弹的逻辑
            if (role.shootType > 0) {
                //获取当前时间
                var time = Laya.Browser.now();
                //如果当前时间大于下次射击的时间
                if (time > role.shootTime) {
                    role.shootTime = time + role.shootInterval;
                    //从对象池中创建一个子弹
                    var bullet = Laya.Pool.getItemByClass("role", Role);
                    //初始化子弹信息
                    bullet.init("bullet1", role.camp, 1, -5, 1);
                    //设置角色类型为子弹
                    bullet.isBullet = true;
                    //设置子弹的位置
                    bullet.pos(role.x, role.y - role.hitRadius - 10);
                    //添加到舞台上
                    Laya.stage.addChild(bullet);
                }
            }
        }
        //检测碰撞
        for (var i = Laya.stage.numChildren - 1; i > 0; i--) {
            var role1 = Laya.stage.getChildAt(i);
            if (role1.hp < 1)
                continue;
            for (var j = i - 1; j > 0; j--) {
                if (!role.visible)
                    continue;
                var role2 = Laya.stage.getChildAt(j);
                //如果角色未死亡，并且他们的阵营不同才能进行碰撞
                if (role2.hp > 0 && role1.camp != role2.camp) {
                    //计算碰撞区域
                    var hitRadius = role1.hitRadius + role2.hitRadius;
                    //根据距离判断
                    if (Math.abs(role1.x - role2.x) < hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {
                        //碰撞后掉血
                        this.lostHp(role1, 1);
                        this.lostHp(role2, 1);
                    }
                }
            }
        }
        //如果主角死亡，则停止游戏循环
        if (this.hero.hp < 1) {
            Laya.timer.clear(this, this.onLoop);
        }
        //每隔30帧创建新的飞机
        if (Laya.timer.currFrame % 60 === 0) {
            this.createEnemy(2);
        }
    };
    Game.prototype.lostHp = function (role, lostHp) {
        //减血
        role.hp -= lostHp;
        if (role.hp > 0) {
            role.playAction("hit");
        }
        else {
            if (role.isBullet) {
                role.visible = false;
            }
            else {
                role.playAction("down");
            }
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