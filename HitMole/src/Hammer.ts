/*
* name;
*/
class Hammer extends ui.HammerUI{
    constructor(){
        super();

    }


//开始使用锤子
start():void{
    Laya.Mouse.hide()
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown)
    Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove)
}
//结束使用锤子

end():void{
    Laya.Mouse.show();
     Laya.stage.off(Laya.Event.MOUSE_DOWN,this,this.onMouseDown)
    Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.onMouseMove)
}

onMouseDown():void{
    this.ani1.play(0,false);
}

onMouseMove():void{
    this.pos(Laya.stage.mouseX-this.width/2,Laya.stage.mouseY-this.height/3);
}



}