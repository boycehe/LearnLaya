var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.moleNum = 9;
        //    this.mole = new Mole(this.normal,this.hit,21)
        //    this.mole.show();
        _this.timeBar.value = 1;
        _this.moles = new Array();
        _this.score = 0;
        var hitCallBackHd = Laya.Handler.create(_this, _this.setScore, null, false);
        for (var i = 0; i < _this.moleNum; i++) {
            var box = _this.getChildByName("item" + i);
            var mole = new Mole(box.getChildByName("normal"), box.getChildByName("hit"), box.getChildByName("scoreimg"), 21, hitCallBackHd);
            _this.moles.push(mole);
        }
        _this.hammer = new Hammer();
        _this.addChild(_this.hammer);
        _this.hammer.start();
        Laya.timer.loop(1000, _this, _this.onLoop);
        return _this;
    }
    GameView.prototype.onLoop = function () {
        //  this.mole.show()
        this.timeBar.value -= (1 / 90);
        if (this.timeBar.value <= 0) {
            this.gameOver();
            return;
        }
        var index = Math.floor(Math.random() * this.moleNum);
        this.moles[index].show();
    };
    GameView.prototype.gameOver = function () {
        Laya.timer.clear(this, this.onLoop);
        this.hammer.visible = false;
        this.hammer.end();
        console.log("游戏结束！");
    };
    GameView.prototype.setScore = function (type) {
        this.score += (type == 1 ? -100 : 100);
        if (this.score < 0) {
            this.score = 0;
        }
        console.log("分数");
        console.log(this.score);
        this.updateScoreUI();
    };
    GameView.prototype.updateScoreUI = function () {
        var data = {};
        var temp = this.score;
        for (var i = 9; i >= 0; i--) {
            data["item" + i] = { index: Math.floor(temp % 10) };
            temp /= 10;
        }
        this.scoreNums.dataSource = data;
    };
    return GameView;
}(ui.GameUI));
//# sourceMappingURL=GameView.js.map