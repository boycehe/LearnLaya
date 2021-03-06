/*
* name;
*/
var Mole = /** @class */ (function () {
    function Mole(normalState, hitState, scoreImg, downY, hitCallBackHd) {
        this.normalState = normalState;
        this.hitState = hitState;
        this.scoreImg = scoreImg;
        this.downY = downY;
        this.upY = this.normalState.y;
        this.scoreY = this.scoreImg.y;
        this.normalState.on(Laya.Event.MOUSE_DOWN, this, this.hit);
        this.normalState.visible = false;
        this.hitState.visible = false;
        this.hitCallBackHd = hitCallBackHd;
        this.reset();
    }
    //重置
    Mole.prototype.reset = function () {
        this.normalState.visible = false;
        this.hitState.visible = false;
        this.scoreImg.visible = false;
        this.isActive = false;
        this.isShow = false;
        this.isHit = false;
    };
    //显示
    Mole.prototype.show = function () {
        if (this.isActive)
            return;
        this.isActive = true;
        this.isShow = true;
        this.type = Math.random() < 0.3 ? 1 : 2;
        this.normalState.skin = "ui/mouse_normal_" + this.type + ".png";
        this.hitState.skin = "ui/mouse_hit_" + this.type + ".png";
        this.scoreImg.skin = "ui/score_" + this.type + ".png";
        console.log(this.scoreImg.skin);
        this.normalState.y = this.downY;
        this.normalState.visible = true;
        this.hitState.visible = false;
        Laya.Tween.to(this.normalState, { y: this.upY }, 500, Laya.Ease.backInOut, Laya.Handler.create(this, this.showComplete));
    };
    //停留
    Mole.prototype.showComplete = function () {
        if (this.isShow && !this.isHit) {
            Laya.timer.once(2000, this, this.hide);
        }
    };
    Mole.prototype.hide = function () {
        if (this.isShow && !this.isHit) {
            this.isShow = false;
            Laya.Tween.to(this.normalState, { y: this.downY }, 300, Laya.Ease.backIn, Laya.Handler.create(this, this.reset));
        }
    };
    Mole.prototype.hideComplete = function () {
    };
    //被打
    Mole.prototype.hit = function () {
        if (this.isShow && !this.isHit) {
            this.isHit = true;
            this.isShow = false;
            Laya.timer.clear(this, this.hide);
            this.normalState.visible = false;
            this.hitState.visible = true;
            this.hitCallBackHd.runWith(this.type);
            Laya.timer.once(500, this, this.reset);
            this.showScore();
        }
    };
    Mole.prototype.showScore = function () {
        this.scoreImg.y = this.scoreY + 30;
        this.scoreImg.scale(0, 0);
        this.scoreImg.visible = true;
        Laya.Tween.to(this.scoreImg, { y: this.scoreY, scaleX: 1, scaleY: 1 }, 300, Laya.Ease.backInOut);
        //Laya.Tween.to(this.scoreImg,{y:this.scoreY,scaleX:1,scaleY:1},300,Laya.Ease.backInOut);
    };
    return Mole;
}());
//# sourceMappingURL=Mole.js.map