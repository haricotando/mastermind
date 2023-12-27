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
        this.initBtn()

        // gsap.timeline()
        //     .from(this.bg, {y:window.innerHeight, duration:0.8, ease:'expo'})
        // gsap.timeline()
        //     .to(this.bg, {pixi:{tint:dataProvider.data.colorDark}, duration:0.6, delay:0.2, ease:'power1.out'})
            // .set(this.bg, {y})
    }

    init(){
        this.bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight - dataProvider.data.headerOffset, false, true));
        Utils.pivotX(this.bg);
        // this.bg.alpha = 0;
        this.bg.tint = dataProvider.data.colorDark;
        // this.bg.tint = dataProvider.data.colorEmph1;
        this.bg.y = 0 - window.innerHeight/2 + dataProvider.data.headerOffset;

        // dataProvider.data.lastGuess = 3512;
        this.yourGuess = this.addChild(new PIXI.Text(dataProvider.data.lastGuess, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 340, fontWeight: 700, letterSpacing: 0})));
        this.yourGuess.anchor.set(0.5);
        // this.yourGuess.x = window.innerWidth/2;
        this.yourGuess.y = 0 - window.innerHeight/6.5;

        this.guessMatchHolder = this.addChild(new PIXI.Container());
        this.guessText = this.guessMatchHolder.addChild(new PIXI.Text('Guess ', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 105, fontWeight: 700, letterSpacing: 0})));
        this.guessMatches = this.guessMatchHolder.addChild(new PIXI.Text('matches!', Utils.cloneTextStyle(this.guessText.style, {fontWeight: 200, letterSpacing: 0})));
        this.guessMatches.x = this.guessText.width;
        Utils.pivotCenter(this.guessMatchHolder);
        // AlignHelper.xCenterWindow(this.guessMatchHolder);
        this.guessMatchHolder.y = this.yourGuess.y + 250;
    }

    initBtn(){
        let radius = 165;

        this.startBtn = new PIXI.Sprite();
        this.addChild(this.startBtn);
        this.startBtn.y = window.innerHeight/4;

        // this.startBtn.y = dataProvider.app.renderer.height/2 - dataProvider.app.renderer.height/6;
        
        // ===== Circle =====
        
        this.circleFill = GraphicsHelper.exDrawCircle(0, 0, radius, false, {color:dataProvider.data.colorLight, alpha:1});
        this.circleFill.alpha = 0;
        this.startBtn.addChild(this.circleFill);

        this.circleLine = GraphicsHelper.exDrawCircle(0, 0, radius, {width:2, color:dataProvider.data.colorLight, alpha:1});
        this.startBtn.addChild(this.circleLine);

        // ===== Label =====
        this.styleLabel = new PIXI.TextStyle({
            fontFamily:     'Inter',
            fontSize:       180,
            fontWeight:     200,
            fill:           dataProvider.data.colorLight,
        });
        this.btnLabel = new PIXI.Text('↓', this.styleLabel);
        this.btnLabel.anchor.set(0.5);
        this.startBtn.addChild(this.btnLabel);

        this.startBtn.on('touchstart', (event) => {
            this.startBtn.interactive = false;
            this.outro();
        });
        //
        // this.startBtn.visible = false;
    }

    suicide(){
    }
}