/*
* name;程序入口类
*/
class Game {

    private hero:Role;
    //子弹发射的偏移位置
    private bulletPos:Array<Array<number>> = [[0],[-15,15],[-30,0,30],[-45,-15,15,45]];
    private level:number = 0;
    private score:number = 0;  
    private levelUpScore:number = 0
    private bulletLevel:number = 0;
     //敌机血量
    private hps:Array<any> = [1,2,2]
    private speeds:Array<any> = [3,2,1]
    private radius:Array<any> = [15,30,70]

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
        this.hero = new Role();
        this.hero.init("hero",0,1,0,30);
        this.hero.shootType =1;  
        this.hero.pos(200,500);
        Laya.stage.addChild(this.hero);
 
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);

       // this.createEnemy(10);
       Laya.timer.frameLoop(1,this,this.onLoop);
         

    }

    onLoop():void{

        //遍历舞台上所有的飞机，更改飞机的状态
        for(var i:number = Laya.stage.numChildren-1;i>0;i--){
            var role:Role = Laya.stage.getChildAt(i) as Role;
            if(role && role.speed){
                role.y+=role.speed;
                //如果敌机移动到显示区域外则移除
                if(role.y > 1000 || !role.visible ||(role.isBullet && role.y < -20)){
                    role.removeSelf();
                    role.isBullet= false;
                    role.visible = true;
                    Laya.Pool.recover("role",role);
                }
            }
             //处理发射子弹的逻辑
             if(role.shootType > 0){
                 //获取当前时间
                 var time:number = Laya.Browser.now();
                 //如果当前时间大于下次射击的时间
                 if(time>role.shootTime){

                     role.shootTime = time + role.shootInterval;
                     //根据子弹的类型，设置不同的数量及位置
                     var pos:Array<number> = this.bulletPos[role.shootType -1];

                     for(var index:number = 0;index<pos.length;index++){

                        //从对象池中创建一个子弹
                        var bullet:Role = Laya.Pool.getItemByClass("role",Role);
                        //初始化子弹信息
                        bullet.init("bullet1",role.camp,1,-4-role.shootType-Math.floor(this.level/15),1,role.shootType)
                        //设置角色类型为子弹
                       // bullet.isBullet = true
                        //设置子弹的位置
                        bullet.pos(role.x + pos[index],role.y-role.hitRadius-10) 
                        //添加到舞台上
                        Laya.stage.addChild(bullet)

                     }
                     

                 }
             }
        }

        //检测碰撞
        for(var i:number = Laya.stage.numChildren-1;i>0;i--){
            var role1:Role = Laya.stage.getChildAt(i) as Role;
            if(role1.hp <1) continue;
            for(var j:number = i-1;j>0;j--){

                if(!role.visible)continue;
                var role2:Role = Laya.stage.getChildAt(j) as Role;
                //如果角色未死亡，并且他们的阵营不同才能进行碰撞
                if(role2.hp>0 && role1.camp != role2.camp){
                    //计算碰撞区域
                    var hitRadius:number = role1.hitRadius + role2.hitRadius;
                    //根据距离判断
                    if(Math.abs(role1.x - role2.x)<hitRadius && Math.abs(role1.y - role2.y) < hitRadius){
                        //碰撞后掉血
                        this.lostHp(role1,1);
                        this.lostHp(role2,1);
                    }
                }

            }
        }

        //如果主角死亡，则停止游戏循环
        
        if(this.hero.hp<1){
            Laya.timer.clear(this,this.onLoop);
        }



        //每隔30帧创建新的飞机
        if(Laya.timer.currFrame%60 === 0){
            this.createEnemy(2);
        }

    }

    lostHp(role:Role,lostHp:number){
        //减血
        role.hp -= lostHp;
        if(role.heroType ==2 ){
            //每次吃一个子弹升级道具，子弹升级+1
            this.bulletLevel++;
            //子弹每升2级，子弹数量增加1，最大数量是4
            this.hero.shootType = Math.min(Math.floor(this.bulletLevel/2)+1,4);
            this.hero.shootInterval = 500 - 20*(this.bulletLevel>20?20:this.bulletLevel);
            //隐藏道具
            role.visible = false;

        }else if(role.heroType === 3 && this.hero.hp < 10){
            //每吃一个血瓶，血量增加1
            this.hero.hp++;
         role.visible = false;
          
        }

        if(role.hp>0){
            role.playAction("hit");
        }else{
            if(role.isBullet){
                role.visible = false;
            }else{
                role.playAction("down");
                //击中boss掉落血瓶或子弹升级道具
                if(role.type == "enemy3"){
                    //随机是子弹还是血瓶
                    console.log("逼格booss")
                    var type:number = Math.random()<0.7?2:3;
                    var item:Role = Laya.Pool.getItemByClass("role",Role);
                    item.init("ufo"+(type-1),role.camp,1,1,15,type);
                    item.pos(role.x,role.y);
                    Laya.stage.addChild(item);
                }
            }
        }




    }
   

    createEnemy(num:number):void{

        for(var i:number = 0;i<num;i++){
            //随机出现敌人
            var r:number = Math.random();
            //根据随机数，随机敌人
            var type:number = r<0.7?0:r<0.95?1:2
            //初始角色
            var enemy:Role = Laya.Pool.getItemByClass("role",Role)
            enemy.init("enemy"+(type+1),1,this.hps[type],this.speeds[type],this.radius[type]);
            //随机位置
            enemy.pos(Math.random()*400,Math.random()*200);
            //添加到舞台
            Laya.stage.addChild(enemy)
        }


    }

    onMouseMove():void{
        this.hero.pos(Laya.stage.mouseX,Laya.stage.mouseY);
    }

}

new Game()
