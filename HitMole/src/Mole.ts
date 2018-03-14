/*
* name;
*/
class Mole{

    private normalState:Laya.Image;
    private hitState:Laya.Image;
    private downY:number;
    private upY:number;
    private isActive:boolean;
    private isShow:boolean;
    private isHit:boolean;
    private type:number;

    constructor(normalState:Laya.Image,hitState:Laya.Image,downY:number){

        this.normalState = normalState;
        this.hitState = hitState;
        this.downY = downY;
        this.upY = this.normalState.y;
        this.normalState.on(Laya.Event.MOUSE_DOWN,this,this.hit)
        this.normalState.visible = false;
        this.hitState.visible = false;

    }

    //重置
    reset():void{
        this.normalState.visible = false;
        this.hitState.visible = false;
        this.isActive = false;
        this.isShow = false;
        this.isHit = false;

    }

    //显示
    show():void{
        if(this.isActive) return;
        this.isActive = true;
        this.isShow   = true;
        this.type     = Math.random() < 0.3 ?1:2;
        this.normalState.skin = "ui/mouse_normal_"+this.type+".png"
        this.hitState.skin    = "ui/mouse_hit_"+this.type+".png"
        this.normalState.y = this.downY;
        this.normalState.visible = true;
        this.hitState.visible = false;

        Laya.Tween.to(this.normalState,{y:this.upY},500,Laya.Ease.backInOut,Laya.Handler.create(this,this.showComplete));
        
    }

    //停留
    showComplete():void{

        if(this.isShow && !this.isHit){
            Laya.timer.once(2000,this,this.hide);
        }

    }

    hide():void{

    if(this.isShow && !this.isHit){
        this.isShow = false;
        Laya.Tween.to(this.normalState,{y:this.downY},300,Laya.Ease.backIn,Laya.Handler.create(this,this.reset));

    }
 } 

    hideComplete():void{

       
    }

//被打
    hit():void{

        if(this.isShow && !this.isHit){
            this.isHit = true;
            this.isShow = false;
            Laya.timer.clear(this,this.hide)
            this.normalState.visible = false;
            this.hitState.visible = true;
            Laya.timer.once(500,this,this.reset)
        }

}





}