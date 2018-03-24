/*
* name;
*/
class BackGround  extends Laya.Sprite {

    private bg1:Laya.Sprite;
    private bg2:Laya.Sprite;
    constructor(){
        super();
        this.init()

    }

    init():void{
        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage("background.png");
        this.addChild(this.bg1);
        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage("background.png");
        //更改背景2的位置，让背景2放在背景1的上边
        this.bg2.pos(0,-852);
        this.addChild(this.bg2);

        Laya.timer.frameLoop(1,this,this.onLoop);
    }

    onLoop():void{

        //背景容器每帧向下移动一像素
        this.y+=1;
        if(this.bg1.y+this.y >= 852){
            this.bg1.y -=852*2;
        }

        if(this.bg2.y+this.y >= 852){
            this.bg2.y -=852*2;
        }
    }

}