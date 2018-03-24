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
/*
* name;
*/
var GameInfo = /** @class */ (function (_super) {
    __extends(GameInfo, _super);
    function GameInfo() {
        var _this = _super.call(this) || this;
        _this.pauseBtn.on(Laya.Event.CLICK, _this, _this.onPauseBtnClick);
        _this.reset();
        return _this;
    }
    GameInfo.prototype.reset = function () {
        this.infoLabel.text = "";
        this.hp(5);
        this.level(0);
        this.score(0);
    };
    GameInfo.prototype.onPauseBtnClick = function (e) {
        e.stopPropagation();
        this.infoLabel.text = "游戏已暂停，点击任意地方恢复游戏";
        gameInstance.pause();
        Laya.stage.once(Laya.Event.CLICK, this, this.onStatgeClick);
    };
    GameInfo.prototype.onStatgeClick = function (e) {
        this.infoLabel.text = "";
        gameInstance.resume();
    };
    GameInfo.prototype.hp = function (value) {
        this.hpLabel.text = "HP:" + value;
    };
    GameInfo.prototype.level = function (value) {
        this.levelLabel.text = "Level:" + value;
    };
    GameInfo.prototype.score = function (value) {
        this.scoreLabel.text = "Score:" + value;
    };
    return GameInfo;
}(ui.GameInfoUI));
//# sourceMappingURL=GameInfo.js.map