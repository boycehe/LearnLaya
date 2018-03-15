
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameUI extends View {
		public timeBar:Laya.ProgressBar;
		public scoreNums:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":25,"x":25,"skin":"ui/back.png"}},{"type":"Box","props":{"y":195,"x":156,"name":"item0"},"child":[{"type":"Image","props":{"x":4,"skin":"ui/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":18,"x":2,"skin":"ui/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":90,"skin":"ui/mask-01.png"}},{"type":"Image","props":{"y":5,"x":15,"skin":"ui/score_2.png","name":"scoreimg"}}]},{"type":"Box","props":{"y":193,"x":342,"name":"item1"},"child":[{"type":"Image","props":{"x":4,"skin":"ui/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":18,"x":2,"skin":"ui/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":90,"skin":"ui/mask-02.png"}},{"type":"Image","props":{"y":9,"x":16,"skin":"ui/score_2.png","name":"scoreimg"}}]},{"type":"Box","props":{"y":198,"x":541,"name":"item2"},"child":[{"type":"Image","props":{"x":4,"skin":"ui/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":18,"x":2,"skin":"ui/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":90,"skin":"ui/mask-03.png"}},{"type":"Image","props":{"y":9,"x":14,"skin":"ui/score_2.png","name":"scoreimg"}}]},{"type":"Box","props":{"y":287,"x":130,"name":"item3"},"child":[{"type":"Image","props":{"x":4,"skin":"ui/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":18,"x":2,"skin":"ui/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":90,"skin":"ui/mask-04.png"}},{"type":"Image","props":{"y":6,"x":21,"skin":"ui/score_2.png","name":"scoreimg"}}]},{"type":"Box","props":{"y":286,"x":347,"name":"item4"},"child":[{"type":"Image","props":{"x":4,"skin":"ui/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":18,"x":2,"skin":"ui/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":90,"skin":"ui/mask-05.png"}},{"type":"Image","props":{"y":8,"x":16,"skin":"ui/score_2.png","name":"scoreimg"}}]},{"type":"Box","props":{"y":287,"x":549,"name":"item5"},"child":[{"type":"Image","props":{"x":4,"skin":"ui/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":18,"x":2,"skin":"ui/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":90,"skin":"ui/mask-06.png"}},{"type":"Image","props":{"y":7,"x":21,"skin":"ui/score_2.png","name":"scoreimg"}}]},{"type":"Box","props":{"y":383,"x":123,"name":"item6"},"child":[{"type":"Image","props":{"x":4,"skin":"ui/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":18,"x":2,"skin":"ui/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":90,"skin":"ui/mask-07.png"}},{"type":"Image","props":{"y":5,"x":19,"skin":"ui/score_2.png","name":"scoreimg"}}]},{"type":"Box","props":{"y":388,"x":348,"name":"item7"},"child":[{"type":"Image","props":{"x":4,"skin":"ui/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":18,"x":2,"skin":"ui/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":90,"skin":"ui/mask-08.png"}},{"type":"Image","props":{"y":6,"x":15,"skin":"ui/score_2.png","name":"scoreimg"}}]},{"type":"Box","props":{"y":391,"x":569,"name":"item8"},"child":[{"type":"Image","props":{"x":4,"skin":"ui/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":18,"x":2,"skin":"ui/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":90,"skin":"ui/mask-09.png"}},{"type":"Image","props":{"y":7,"x":16,"skin":"ui/score_2.png","name":"scoreimg"}}]},{"type":"ProgressBar","props":{"y":10,"x":13,"var":"timeBar","value":0.7,"skin":"ui/progress_time.png"}},{"type":"Box","props":{"y":45,"x":20,"var":"scoreNums"},"child":[{"type":"Clip","props":{"skin":"ui/clip_number.png","name":"item0","clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":18,"skin":"ui/clip_number.png","name":"item1","clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":36,"skin":"ui/clip_number.png","name":"item2","clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":54,"skin":"ui/clip_number.png","name":"item3","clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":72,"skin":"ui/clip_number.png","name":"item4","clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":90,"skin":"ui/clip_number.png","name":"item5","clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":108,"skin":"ui/clip_number.png","name":"item6","clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":126,"skin":"ui/clip_number.png","name":"item7","clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":144,"skin":"ui/clip_number.png","name":"item8","clipX":10,"autoPlay":false}},{"type":"Clip","props":{"x":162,"skin":"ui/clip_number.png","name":"item9","clipX":10,"autoPlay":false}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameUI.uiView);

        }

    }
}

module ui {
    export class HammerUI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":100,"height":100},"child":[{"type":"Image","props":{"y":59,"x":57,"width":98,"skin":"ui/hammer.png","skewY":0,"skewX":0,"rotation":20,"pivotY":48,"pivotX":56,"height":77},"compId":2}],"animations":[{"nodes":[{"target":2,"keyframes":{"y":[{"value":67,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":0},{"value":64,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":1},{"value":60,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":5}],"x":[{"value":40,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":0},{"value":60,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":1},{"value":64,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":5}],"rotation":[{"value":20,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":0},{"value":-20,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":1},{"value":20,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":5}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.HammerUI.uiView);

        }

    }
}
