import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';

export class GuessMatchScreen extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();
        this.init();
        // this.initBtn();
        this.intro();
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
        this.fxBox.tint = dataProvider.data.colorLight;
        this.fxBox.orgY = 0 - window.innerHeight/2 + dataProvider.data.headerOffset;
        this.fxBox.y = this.fxBox.orgY;

        this.yourGuess = this.addChild(new PIXI.Text(dataProvider.data.lastGuess, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 200, fontWeight: 200, letterSpacing: 0})));
        // this.yourGuess = this.addChild(new PIXI.Text(dataProvider.data.lastGuess, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 340, fontWeight: 700, letterSpacing: 0})));
        this.yourGuess.anchor.set(0.5);
        this.yourGuess.orgY = 0 - window.innerHeight/6.5;
        this.yourGuess.visible = false;

        this.guessMatchHolder = this.addChild(new PIXI.Container());
        this.guessText = this.guessMatchHolder.addChild(new PIXI.Text('Guess ', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 105, fontWeight: 700, letterSpacing: 0})));
        this.guessMatches = this.guessMatchHolder.addChild(new PIXI.Text('matches!', Utils.cloneTextStyle(this.guessText.style, {fontWeight: 200, letterSpacing: 0})));
        this.guessMatches.x = this.guessText.width;
        Utils.pivotCenter(this.guessMatchHolder);
        this.guessMatchHolder.y = this.yourGuess.orgY + 250;
        this.guessMatchHolder.visible = false;
    }

    intro(){
        gsap.set(this.fxBox, {y:window.innerHeight})

        gsap.to(this.fxBox, {y:this.fxBox.orgY, duration:0.2, ease:'power1.out'})

        gsap.set(this.yourGuess.scale, {x:0.6, y:0.6});
        gsap.set(this.yourGuess, {y:this.yourGuess.orgY+1000});
        gsap.set(this.yourGuess.style, {letterSpacing:20});
        this.bg.visible = true;
        this.yourGuess.visible = true;
        this.guessMatchHolder.alpha = 0;
        this.guessMatchHolder.visible =true;
        
        gsap.timeline()
            .to(this.yourGuess.scale, {x:1, y:1, duration:0.2, ease:'back.out(1)', delay:0.1})
        gsap.timeline()
            .to(this.yourGuess, {y:this.yourGuess.orgY, duration:0.3, ease:'back.out(1)', delay:0.1})
            .set(this.yourGuess.style, {fontWeight:700, fill:dataProvider.data.colorEmph1})
            .to(this.yourGuess.style, {fontSize:340, duration:0.2, ease:'back.out(2)'});
        gsap.set(this.yourGuess.style, {letterSpacing:100})
        gsap.to(this.yourGuess.style, {letterSpacing:0, duration:0.3, ease:'back.out(1)', delay:0.2})
        gsap.timeline()
            .to(this.fxBox, {alpha:0, duration:0.5, ease:'none'})    
            .set(this.yourGuess.style, {fill:dataProvider.data.colorLight})
            .to(this.guessMatchHolder, {alpha:1, duration:0.2, ease:'none'})
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
                this.yourGuess.visible = false;
                this.guessMatchHolder.visible = false;
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