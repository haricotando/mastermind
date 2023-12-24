import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';

export class StartScreen extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.initElements();
        this.initBtn();
        this.introA();
        // this.introB();
        // this.introC();
    }

    /* ------------------------------------------------------------
        init
    ------------------------------------------------------------ */
    initElements(){
        this.baseStyle = new PIXI.TextStyle({
            fontFamily: 'Inter', fontSize: 100, fontWeight: 100, fill: dataProvider.data.colorLight,
        });

        this.introContainer = this.addChild(new PIXI.Container());

        // ===== M =====
        this.titleM = this.introContainer.addChild(new PIXI.Text('M', Utils.cloneTextStyle(this.baseStyle, {fontSize: 110})));
        this.titleM.anchor.set(0.5);
        
        // ===== MM =====
        this.titleMM = this.introContainer.addChild(new PIXI.Container());
        let mmHolder = this.titleMM.addChild(new PIXI.Container());
        let m1 = mmHolder.addChild(new PIXI.Text('M', Utils.cloneTextStyle(this.baseStyle, {fontSize: 110, fontWeight: 200})));
        let m2 = mmHolder.addChild(new PIXI.Text('M', Utils.cloneTextStyle(this.baseStyle, {fontSize: 110})));
        m2.y += m1.height;
        Utils.pivotCenter(mmHolder);
        
        // ===== MASTERMIND 縦 =====
        this.titleMastermindV = this.introContainer.addChild(new PIXI.Container());
        this.masterV = new PIXI.Text('MASTER', Utils.cloneTextStyle(this.baseStyle, {fontWeight:200, align: 'center', breakWords: true, wordWrap: true, wordWrapWidth:100, leading:5}))
        this.titleMastermindV.addChild(this.masterV);
        this.mindV = new PIXI.Text('MIND', Utils.cloneTextStyle(this.masterV.style, {fontWeight: 100}));
        this.titleMastermindV.addChild(this.mindV);
        this.mindV.y += this.masterV.height;

        Utils.pivotCenter(this.titleMastermindV);

        // ===== Line left =====
        this.lineLeft = this.introContainer.addChild(new PIXI.Graphics());
        this.lineLeft.lineStyle(2, dataProvider.data.colorLight);
        this.lineLeft.moveTo(0, 0);
        this.lineLeft.lineTo(0, this.titleMastermindV.height*1.05);
        Utils.pivotY(this.lineLeft);
        // animate先
        // this.lineLeft.x = 415;
        // this.lineLeft.height = 680;
        // this.lineLeft.y = 35;
        
        // ===== Line right =====
        this.lineRight = this.introContainer.addChild(new PIXI.Graphics());
        this.lineRight.lineStyle(2, dataProvider.data.colorLight);
        this.lineRight.moveTo(0, 0);
        this.lineRight.lineTo(0, this.titleMastermindV.height*1.05);
        Utils.pivotY(this.lineRight);
        // animate先
        // this.lineRight.x = -415;
        // this.lineRight.height = 680;
        // this.lineRight.y = 35;


        // ===== MASTER MIND =====
        this.titlesContainer = this.introContainer.addChild(new PIXI.Container());
        this.titleMaster = this.titlesContainer.addChild(new PIXI.Text('MASTER', Utils.cloneTextStyle(this.baseStyle, {fontSize: 105, fontWeight: 200})));
        this.titleMaster.anchor.x = 0.5;
        this.titleMind = this.titlesContainer.addChild(new PIXI.Text('MIND', Utils.cloneTextStyle(this.baseStyle, {fontSize: 105, letterSpacing: 48})));
        this.titleMind.anchor.x = 0.5;
        this.titleMind.y = 135;
        
        // ===== descripton =====        
        const desc1 = this.titlesContainer.addChild(new PIXI.Text('Guess the 4-digit secret code.', Utils.cloneTextStyle(this.baseStyle, {fontSize: 41, fontWeight: 300, letterSpacing: 2.5})));
        desc1.anchor.x = 0.5;
        desc1.y = 300;
        const desc2 = this.titlesContainer.addChild(new PIXI.Text('no duplicates.', Utils.cloneTextStyle(desc1.style)));
        desc2.anchor.x = 0.5;
        desc2.y = 350;

        // ===== instruction =====
        const inst1Holder = this.titlesContainer.addChild(new PIXI.Container());
        const inst1Left = inst1Holder.addChild(new PIXI.Text('Hit', Utils.cloneTextStyle(this.baseStyle, {fontSize: 36, fontWeight: 700, letterSpacing: 2})));
        const inst1Right = inst1Holder.addChild(new PIXI.Text('means right digit, right place.', Utils.cloneTextStyle(inst1Left.style, {fontWeight: 300})));
        inst1Right.x = inst1Left.width + 15;
        Utils.pivotX(inst1Holder);
        inst1Holder.y = 490;
        
        const inst2Holder = this.titlesContainer.addChild(new PIXI.Container());
        const inst2Left = inst2Holder.addChild(new PIXI.Text('Blow', Utils.cloneTextStyle(inst1Left.style)));
        const inst2Right = inst2Holder.addChild(new PIXI.Text('means right digit, wrong place.', Utils.cloneTextStyle(inst1Right.style)));
        inst2Right.x = inst2Left.width + 15;
        Utils.pivotX(inst2Holder);
        inst2Holder.y = 540;

        Utils.pivotY(this.titlesContainer);
        
        // ===== titlesMask =====
        
        this.titlesMask = this.introContainer.addChild(GraphicsHelper.exDrawRect(0, 0, 415*2, this.titlesContainer.height, false, {color:0xFFFFFF}));
        Utils.pivotCenter(this.titlesMask);
        this.titlesContainer.mask = this.titlesMask;

        //
        this.introContainer.y -= dataProvider.app.renderer.height / 20;
        //
        this.titleM.visible = false;
        this.titleMM.visible = false;
        this.titleMastermindV.visible = false;
        this.lineLeft.visible = false;
        this.lineRight.visible = false;
        this.titlesContainer.visible = false;
    }

    /* ------------------------------------------------------------
        Btn / events
    ------------------------------------------------------------ */
    initBtn(){
        this.startBtn = new PIXI.Sprite();
        this.addChild(this.startBtn);

        this.startBtn.y = dataProvider.app.renderer.height/2 - dataProvider.app.renderer.height/6;
        
        // ===== Circle =====
        let radius = 165;
        
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
        this.startBtn.visible = false;
    }

    /* ------------------------------------------------------------
        outro
    ------------------------------------------------------------ */
    outro(){
        this.circleFill.visible = true;
        this.circleFill.alpha = 1;
        let scaleDest = 11;
        gsap.timeline().to(this.circleLine.scale, {x:scaleDest, y:scaleDest, duration:0.5})
        gsap.timeline().to(this.circleFill.scale, {x:scaleDest, y:scaleDest, duration:0.5}, '+=0.05')
            .call(() => {
                this.titlesContainer.visible = false;
                this.lineLeft.visible = false;
                this.lineRight.visible = false;
            })
            .to(this.circleFill, {alpha:0, duration:0.3})
            .call(() =>{
                this.parent.initHeader();
                this.suicide();
            });
            
        // titles
        gsap.to(this.titlesContainer, {y:this.titlesContainer.y - 400, duration:0.3});
        gsap.timeline().to(this.titlesContainer.scale, {x:0.8, y:0.8, duration:0.8});
        gsap.timeline().to(this.titlesContainer, {alpha:0.7, duration:0.8});
        //
        this.styleLabel.fill = dataProvider.data.colorDark;
        gsap.to(this.btnLabel.scale, {x:0.6, y:0.6, duration:0.5});

    }
    /* ------------------------------------------------------------
        intro
    ------------------------------------------------------------ */
    introA(){
        this.titleM.alpha = 0;
        this.titleM.visible = true;

        this.titleMM.alpha = 0;
        this.titleMM.visible = true;

        this.titleMastermindV.alpha = 0;
        this.titleMastermindV.visible = true;

        gsap.timeline()
            .to(this.titleM, {alpha:0, duration:1})
            .to(this.titleM, {alpha:1, duration:0.1, repeat:1})
            .to(this.titleM, {alpha:0, duration:0.01})
            .to(this.titleMM, {alpha:0.5, duration:0.3})
            .to(this.titleMM, {alpha:0, duration:0.2})
            .to(this.titleMastermindV, {alpha:1, duration:0.1}, '-=0.2')
            
            .call(()=>{
               this.introB(); 
            });

    }

    introB(){
        gsap.to(this.titleMastermindV, {alpha:0, duration:0.4})
        //
        const openingDuration = 1.5;

        const linePosX = 415;
        const lineHeight = 680;
        const linePosY = 35;

        this.lineLeft.alpha = 0;
        this.lineLeft.visible = true;
        gsap.to(this.lineLeft, {alpha:1, duration:1});
        gsap.to(this.lineLeft, {y:linePosY, duration:openingDuration, ease:'power3.inOut'});
        gsap.to(this.lineLeft, {x:0-linePosX, duration:openingDuration, ease:'power3.inOut'});
        gsap.to(this.lineLeft, {height:lineHeight, duration:openingDuration, ease:'power3.inOut'});
        
        this.lineRight.alpha = 0;
        this.lineRight.visible = true;
        gsap.to(this.lineRight, {alpha:1, duration:1});
        gsap.to(this.lineRight, {y:linePosY, duration:openingDuration, ease:'power3.inOut'});
        gsap.to(this.lineRight, {x:linePosX, duration:openingDuration, ease:'power3.inOut'});
        gsap.to(this.lineRight, {height:lineHeight, duration:openingDuration, ease:'power3.inOut'});
        //
        this.titlesContainer.visible = true;
        this.titlesMask.width = 1;
        gsap.to(this.titlesMask.scale, {x:1, duration:openingDuration, ease:'power3.inOut'});
        //
        // this.mastermindVCover.visible = true;
        // this.mastermindVCover.width = 1;
        // gsap.to(this.mastermindVCover.scale, {x:1, duration:openingDuration, ease:'power3.inOut'});

        //
        // this.titlesContainer.alpha = 0;
        // this.titlesContainer.visible = true;
        this.titlesContainer.scale.set(0.7);
        gsap.to(this.titlesContainer, {alpha:1, duration:openingDuration, ease:'power1.in'});
        gsap.timeline().to(this.titlesContainer.scale, {x:1, y:1, duration:openingDuration, ease:'power3.out'})
            .call(() =>{
                this.introC();
            });
    }

    introC(){
        this.titlesMask.visible = false;
        this.titlesContainer.mask = null;
        //
        this.startBtn.visible = true;
        this.circleLine.alpha = 0;
        this.circleLine.scale.set(0.6);
        gsap.to(this.circleLine, {alpha:1, duration:0.5, ease:'power3.out'});
        gsap.to(this.circleLine.scale, {x:1, y:1, duration:0.7, ease:'power3.out'});
        //
        this.btnLabel.alpha = 0;
        this.btnLabel.y = -40;
        gsap.timeline().to(this.btnLabel, {y:0, duration:0.4}, '+=0.2');
        gsap.timeline().to(this.btnLabel, {alpha:1, duration:0.3}, '+=0.2')
            .call(() => {
                this.startBtn.interactive = true;
            });
    }
    /* ------------------------------------------------------------
    readyToDie
    ------------------------------------------------------------ */
    readyToDie(){
        // remove前のdisplay要素アニメーションなどなど
    }
    suicide(){
        this.parent.removeChild(this)
    }
}