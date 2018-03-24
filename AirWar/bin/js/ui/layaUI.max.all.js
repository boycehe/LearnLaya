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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameInfoUI = /** @class */ (function (_super) {
        __extends(GameInfoUI, _super);
        function GameInfoUI() {
            return _super.call(this) || this;
        }
        GameInfoUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameInfoUI.uiView);
        };
        GameInfoUI.uiView = { "type": "View", "props": { "width": 400, "height": 852 }, "child": [{ "type": "Button", "props": { "y": 17, "x": 323, "width": 60, "var": "pauseBtn", "stateNum": 2, "skin": "war/btn_pause.png", "height": 43 } }, { "type": "Label", "props": { "y": 23, "x": 15, "width": 75, "var": "hpLabel", "text": "HP:5", "height": 32, "fontSize": 25, "color": "#8eb744" } }, { "type": "Label", "props": { "y": 24, "x": 105, "width": 83, "var": "levelLabel", "text": "Level:50", "height": 34, "fontSize": 22, "color": "#7aece7" } }, { "type": "Label", "props": { "y": 25, "x": 218, "width": 85, "var": "scoreLabel", "text": "Score:15", "height": 29, "fontSize": 20, "color": "#5c80c0" } }, { "type": "Label", "props": { "y": 425, "x": 57, "wordWrap": true, "width": 304, "var": "infoLabel", "text": "战斗结束", "height": 88, "fontSize": 20, "color": "#ece6e5", "align": "center" } }] };
        return GameInfoUI;
    }(View));
    ui.GameInfoUI = GameInfoUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map