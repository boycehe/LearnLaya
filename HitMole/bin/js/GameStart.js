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
var GameStart = /** @class */ (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        _this.startBtn.on(Laya.Event.CLICK, _this, _this.startGame);
        return _this;
    }
    GameStart.prototype.startGame = function () {
        this.removeSelf();
        if (!GameMain.gameView) {
            GameMain.gameView = new GameView();
        }
        GameMain.gameView.gameStart();
        Laya.stage.addChild(GameMain.gameView);
    };
    return GameStart;
}(ui.GameStartUI));
//# sourceMappingURL=GameStart.js.map