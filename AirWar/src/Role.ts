
class Role extends Laya.Sprite{

    //定义飞机的身体
    private body:Laya.Animation;

    private static ccached:boolean = false;
    public type:string;
    public camp:number;
    public hp:number;
    public speed:number;
    public hitRadius:number;
    private htiRadius:number;

    public shootType:number = 0;
    public shootInterval:number = 500;
    public shootTime:number = Laya.Browser.now()+2000;
    public action:string = "";
    public isBullet:boolean = false
    public heroType:number = 0;


    constructor(){
        super();
       // this.init();
    }

   public init(_type:string,_camp:number,_hp:number,_speed:number,_hitRadius:number,_heroType = 0):void{
        this.type = _type;
        this.camp = _camp;
        this.hp = _hp;
        this.speed = _speed;
        this.hitRadius = _hitRadius;
        this.heroType = _heroType;
         
        if(!Role.ccached){
            //缓存飞行动画
            Role.ccached = true
            
        Laya.Animation.createFrames(["war/hero_fly1.png","war/hero_fly2.png"],"hero_fly");
        Laya.Animation.createFrames(["war/hero_down1.png","war/hero_down2.png","war/hero_down3.png","war/hero_down4.png"],"hero_down");

        Laya.Animation.createFrames(["war/enemy1_down1.png","war/enemy1_down2.png","war/enemy1_down3.png","war/enemy1_down4.png"],"enemy1_down");
        Laya.Animation.createFrames(["war/enemy1_fly1.png"],"enemy1_fly");

        Laya.Animation.createFrames(["war/enemy2_down1.png","war/enemy2_down2.png","war/enemy2_down3.png","war/enemy2_down4.png"],"enemy2_down");
        Laya.Animation.createFrames(["war/enemy2_fly1.png"],"enemy2_fly");
        Laya.Animation.createFrames(["war/enemy2_hit.png"],"enemy2_hit");

        Laya.Animation.createFrames(["war/enemy3_down1.png","war/enemy3_down2.png","war/enemy3_down3.png","war/enemy3_down4.png","war/enemy3_down5.png","war/enemy3_down6.png"],"enemy3_down");
        Laya.Animation.createFrames(["war/enemy3_fly1.png","war/enemy3_fly2.png"],"enemy3_fly");
        Laya.Animation.createFrames(["war/enemy3_hit.png"],"enemy3_hit");

        //缓存子弹
         Laya.Animation.createFrames(["war/bullet1.png"],"bullet1_fly");

         //缓存强化包
         Laya.Animation.createFrames(["war/ufo1.png"],"ufo1_fly");

          //缓存
         Laya.Animation.createFrames(["war/ufo2.png"],"ufo2_fly");
        
       
    }
    
    if(!this.body){
        this.body = new Laya.Animation();
        this.addChild(this.body);

        //添加动画播放完成事件
        this.body.on(Laya.Event.COMPLETE,this,this.onPlayComplete)
    }

       this.playAction("fly");
    }

    onPlayComplete():void{

        //如果是击毁动画
        if(this.action === "down"){
            this.body.stop();
            this.visible = false;
        }else if(this.action === "hit"){
            this.playAction("fly");
        }


    }

    playAction(action:string):void{

        this.action = action;
        this.body.play(0,true,this.type+"_"+action);
        var bound:Laya.Rectangle = this.body.getBounds();
        this.body.pos(-bound.width/2,-bound.height/2);

    }


}