
class Role extends Laya.Sprite{

    //定义飞机的身体
    private body:Laya.Animation;

    constructor(){
        super();
        this.init();
    }

    init():void{
        
        //缓存飞行动画
        Laya.Animation.createFrames(["war/hero_fly1.png","war/hero_fly2.png"],"hero_fly");
        Laya.Animation.createFrames(["war/hero_down1.png","war/hero_down2.png","war/hero_down3.png","war/hero_down4.png"],"hero_down");
        //创建一个动画
        this.body = new Laya.Animation();
        this.addChild(this.body);
        this.playAction("hero_down");
    }

    playAction(action):void{

        this.body.play(0,true,action);
        var bound:Laya.Rectangle = this.body.getBounds();
        this.body.pos(-bound.width/2,-bound.height/2);

    }


}