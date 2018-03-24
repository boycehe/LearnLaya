/*
* name;程序入口类
*/
class Game {

    private hero:Role;
    //子弹发射的偏移位置
    private bulletPos:Array<Array<number>> = [[0],[-15,15],[-30,0,30],[-45,-15,15,45]];
    private level:number = 0;
    private score:number = 0;  
    private levelUpScore:number = 10
    private bulletLevel:number = 0;
     //敌机血量
    private hps:Array<any> = [1,2,2]
    private speeds:Array<any> = [3,2,1]
    private radius:Array<any> = [15,30,70]

    private roleBox:Laya.Sprite;
    private gameInfo:GameInfo;


    constructor(){
        //初始化引擎，设置游戏的宽高
        Laya.init(400,852,Laya.WebGL);
        Laya.stage.scaleMode = "showall";
        Laya.stage.alignH = "center"
        Laya.stage.screenMode = "vertical";


        Laya.loader.load("res/atlas/war.atlas",Laya.Handler.create(this,this.onLoaded),null,Laya.Loader.ATLAS);

    }

    onLoaded():void{

        //创建循环
        var bg:BackGround = new BackGround();
        //把背景添加到舞台上
        Laya.stage.addChild(bg);

        this.roleBox = new Laya.Sprite()
        Laya.stage.addChild(this.roleBox)


        this.gameInfo = new GameInfo()
        Laya.stage.addChild(this.gameInfo)

        //创建一个主角
        this.hero = new Role();
      
        this.roleBox.addChild(this.hero);
 
       // Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);

       // this.createEnemy(10);
       Laya.timer.frameLoop(1,this,this.onLoop);

       this.restart()
         

    }

    onLoop():void{

        //遍历舞台上所有的飞机，更改飞机的状态
        for(var i:number = this.roleBox.numChildren-1;i>-1;i--){
            var role:Role = this.roleBox.getChildAt(i) as Role;
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
                        this.roleBox.addChild(bullet)

                     }
                     Laya.SoundManager.playSound("res/sound/bullet.mp3")

                 }
             }
        }

        //检测碰撞
        for(var i:number = this.roleBox.numChildren-1;i>0;i--){
            var role1:Role = this.roleBox.getChildAt(i) as Role;
            if(role1.hp <1) continue;
            for(var j:number = i-1;j>0;j--){

                if(!role.visible)continue;
                var role2:Role = this.roleBox.getChildAt(j) as Role;
                //如果角色未死亡，并且他们的阵营不同才能进行碰撞
                if(role2.hp>0 && role1.camp != role2.camp){
                    //计算碰撞区域
                    var hitRadius:number = role1.hitRadius + role2.hitRadius;
                    //根据距离判断
                    if(Math.abs(role1.x - role2.x)<hitRadius && Math.abs(role1.y - role2.y) < hitRadius){
                        console.log("abc")
                        //碰撞后掉血
                        this.lostHp(role1,1);
                        this.lostHp(role2,1);
                        this.score++;
                        this.gameInfo.score(this.score)
                        if(this.score > this.levelUpScore){
                            this.level++;
                            this.levelUpScore+=this.level*5;
                             this.gameInfo.level(this.level)
                        }
                    }
                }

            }
        }

        //如果主角死亡，则停止游戏循环
        
        if(this.hero.hp < 1){

            Laya.timer.clear(this,this.onLoop);
            this.gameInfo.infoLabel.text = "GameOver,分数"+this.score+"\n 点击这里重新开始游戏"
            this.gameInfo.infoLabel.once(Laya.Event.CLICK,this,this.restart)
            Laya.SoundManager.playSound("res/sound/game_over.mp3")
        }

        //每隔30帧创建新的飞机
        // if(Laya.timer.currFrame%60 === 0){
        //     this.createEnemy(2);
        // }

        var cutTime:number = this.level < 30?this.level*2:60;
        var speedUp:number = Math.floor(this.level/6);
        var hpUp:number = Math.floor(this.level/8);
        var numUp:number = Math.floor(this.level/10);
        if(Laya.timer.currFrame %(80 - cutTime*4) === 0){
           this.createEnemy(0,2+numUp,3+speedUp,1);
        }

        if(Laya.timer.currFrame %(150 - cutTime*4) === 0){
            this.createEnemy(0,1+numUp,2+speedUp,2+hpUp*2);
        }

        if(Laya.timer.currFrame %(900 - cutTime*4) === 0){
            this.createEnemy(2,1,1+speedUp,10+hpUp);
            Laya.SoundManager.playSound("res/sound/enemy3_out.mp3")
        }


    }

    restart():void{

        this.score = 0;
        this.level = 0;
        this.levelUpScore = 10;
        this.bulletLevel = 0;
        this.gameInfo.reset();
        this.hero.init("hero",0,5,0,30);
        this.hero.shootType =1;  
        this.hero.pos(200,500);

        this.hero.shootInterval = 500;
        this.hero.visible       = true;
        this.resume()
        for(var i:number = this.roleBox.numChildren - 1;i>-1;i--){
            var role:Role = this.roleBox.getChildAt(i) as Role;
            if(role != this.hero){
                role.removeSelf();
                role.visible = true;
                Laya.Pool.recover("role",role);
            }
        }

    }

    lostHp(role:Role,lostHp:number){
        //减血
        role.hp -= lostHp;
        if(role.heroType == 2 ){
            //每次吃一个子弹升级道具，子弹升级+1
            this.bulletLevel++;
            //子弹每升2级，子弹数量增加1，最大数量是4
            this.hero.shootType = Math.min(Math.floor(this.bulletLevel/2)+1,4);
            this.hero.shootInterval = 500 - 20*(this.bulletLevel>20?20:this.bulletLevel);
            //隐藏道具
            role.visible = false;
             Laya.SoundManager.playSound("res/sound/enemy3_out.mp3")

        }else if(role.heroType === 3 && this.hero.hp < 10){
            //每吃一个血瓶，血量增加1
         this.hero.hp++;
         this.gameInfo.hp(this.hero.hp)

         role.visible = false;
          
        }else if( role.hp>0 ){
            role.playAction("hit");
            console.log("hittt")
            this.hero.hp--;
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
                    this.roleBox.addChild(item);
                }
            }
        }


        if(role == this.hero){
            this.gameInfo.hp(this.hero.hp)
        }
       

    }
   

    createEnemy(type:number,num:number,speed:number,hp:number):void{

        for(var i:number = 0;i<num;i++){
            //随机出现敌人
           
            //初始角色
            var enemy:Role = Laya.Pool.getItemByClass("role",Role)

            enemy.init("enemy"+(type+1),1,hp,speed,this.radius[type]);
            //随机位置
            enemy.pos(Math.random()*400,Math.random()*200);
            //添加到舞台
            this.roleBox.addChild(enemy)
        }


    }

    onMouseMove():void{
        this.hero.pos(Laya.stage.mouseX,Laya.stage.mouseY);
    }

   public pause():void{

        Laya.timer.clear(this,this.onLoop);
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
        
    }

    public resume():void{
        Laya.timer.frameLoop(1,this,this.onLoop);
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);

    }


}

var gameInstance :Game = new Game()
