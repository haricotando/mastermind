import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';

export class GameOverScreen extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.init();
        this.intro();
        // this.initBtn()

    }

    init(){
        this.bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight - dataProvider.data.headerOffset, false, true));
        Utils.pivotX(this.bg);
        this.bg.tint = dataProvider.data.colorDark;
        this.bg.orgY = 0 - window.innerHeight/2 + dataProvider.data.headerOffset;
        this.bg.y = this.bg.orgY;
        this.bg.visible = false;

        this.fxBox = this.addChild(GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight - dataProvider.data.headerOffset, false, true));
        Utils.pivotX(this.fxBox);
        this.fxBox.tint = dataProvider.data.colorEmph3;
        this.fxBox.orgY = 0 - window.innerHeight/2 + dataProvider.data.headerOffset;
        this.fxBox.y = this.fxBox.orgY;

        this.gameover = this.addChild(new PIXI.Text('GAME\nOVER', Utils.cloneTextStyle(dataProvider.baseStyle, {align:'center', fontSize: 250, fontWeight: 700, letterSpacing: 0})));
        this.gameover.anchor.set(0.5);
        this.gameover.orgY = 0 - window.innerHeight/11;;
        this.gameover.y = this.gameover.orgY;
    }

    intro(){
        gsap.set(this.fxBox, {y:0-window.innerHeight})

        gsap.to(this.fxBox, {y:this.fxBox.orgY, duration:0.2, ease:'power1.out'})

        gsap.set(this.gameover.scale, {x:1.2, y:1.2});
        // gsap.set(this.gameover, {y:this.gameover.orgY+1000});
        gsap.set(this.gameover.style, {letterSpacing:20});
        this.bg.visible = true;
        this.gameover.visible = true;
        
        gsap.timeline()
            .to(this.gameover.scale, {x:1, y:1, duration:0.2, ease:'back.out(1)', delay:0.1})
        // gsap.timeline()
            // .to(this.gameover, {y:this.gameover.orgY, duration:0.3, ease:'back.out(1)', delay:0.1})
        gsap.timeline()
            .to(this.fxBox, {alpha:0, duration:0.5, ease:'none'})    
            .set(this.gameover.style, {fill:dataProvider.data.colorLight})
            .call(()=>{
                this.initBtn();
            })        
    }

    initBtn(){
        let radius = 165;

        this.startBtn = new PIXI.Sprite();
        this.addChild(this.startBtn);
        this.startBtn.y = window.innerHeight/4;

        // ===== Circle =====
        this.circleFill = GraphicsHelper.exDrawCircle(0, 0, radius, false, {color:dataProvider.data.colorLight, alpha:1});
        this.circleFill.alpha = 0;
        this.startBtn.addChild(this.circleFill);

        this.circleLine = GraphicsHelper.exDrawCircle(0, 0, radius, {width:2, color:dataProvider.data.colorLight, alpha:1});
        this.startBtn.addChild(this.circleLine);

        this.btnLabel = new PIXI.Text('↓', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 180, fontWeight:200}));
        this.btnLabel.anchor.set(0.5);
        this.startBtn.addChild(this.btnLabel);

        this.startBtn.on('touchstart', (event) => {
            this.startBtn.interactive = false;
            this.outro();
        });
        //

        this.circleLine.scale.set(0.6);
        this.circleLine.alpha = 0;
        gsap.to(this.circleLine, {alpha:1, duration:0.5, ease:'power1.out'});
        gsap.timeline()
            .to(this.circleLine.scale, {x:1, y:1, duration:0.5, ease:'back.out(3)'})
            .call(()=>{
                this.startBtn.interactive = true;
            })

        this.btnLabel.scale.set(0.4);
        this.btnLabel.alpha = 0;
        gsap.to(this.btnLabel.scale, {x:1, y:1, duration  :0.3, ease:'back.out(3)', delay:0.1});
        gsap.to(this.btnLabel, {alpha:1, duration :0.3, ease:'none', delay:0.2});
    }

    outro(){

        this.circleFill.visible = true;
        this.circleFill.alpha = 1;
        let scaleDest = 10;

        gsap.timeline().to(this.circleLine.scale, {x:scaleDest, y:scaleDest, duration:0.3, ease:'power1.in'})
        gsap.timeline().to(this.circleFill.scale, {x:scaleDest, y:scaleDest, duration:0.3, ease:'power1.in'}, '+=0.05')
            .call(() =>{
                this.gameover.visible = false;
                this.parent.restart();
            })
            .to(this.circleFill, {y:0-this.circleFill.height*10, duration:0.3})
            .call(() =>{
                this.suicide();
            })
            
        gsap.timeline()
            .to(this.btnLabel.scale, {x:0.6, y:0.6, duration:0.5})
        gsap.timeline()
            .to(this.btnLabel, {alpha:0, duration:0.4});
    }


    suicide(){
        this.parent.removeChild(this);
    }

}