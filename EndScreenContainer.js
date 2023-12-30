import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';

export class EndScreenContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor(isMatch) {
        super();
        if(isMatch){
            this.initBackground(dataProvider.data.colorEmph1);
            this.initGuessMatch();
        }else{
            this.initBackground(dataProvider.data.colorEmph3);
            this.initGameOver();
        }
    }        

    /* ------------------------------------------------------------
        BG
    ------------------------------------------------------------ */
    initBackground(fxColor){
        this.bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight - dataProvider.data.headerOffset, false, true));
        Utils.pivotX(this.bg);
        this.bg.tint = dataProvider.data.colorDark;
        this.bg.orgY = 0 - window.innerHeight/2 + dataProvider.data.headerOffset;
        this.bg.y = this.bg.orgY;
        this.bg.visible = false;

        this.fxBox = this.addChild(GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight - dataProvider.data.headerOffset, false, true));
        Utils.pivotX(this.fxBox);
        this.fxBox.tint = fxColor;
        this.fxBox.orgY = 0 - window.innerHeight/2 + dataProvider.data.headerOffset;
        this.fxBox.y = this.fxBox.orgY;
        this.fxBox.alpha = 0.5;

        gsap.set(this.fxBox, {y:window.innerHeight});
        gsap.timeline()
            .to(this.fxBox, {y:this.fxBox.orgY, duration:0.2, ease:'power1.out'})
            .to(this.fxBox, {alpha:0.3, duration:0.3, ease:'none'})
            .to(this.fxBox, {alpha:0.8, duration:0.1, ease:'none'});
    }

    /* ------------------------------------------------------------
        正解時の演出
    ------------------------------------------------------------ */
    initGuessMatch(){
        this.yourGuess = this.addChild(new PIXI.Text(dataProvider.data.lastGuess, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 250, fontWeight: 200, letterSpacing: 0})));
        this.yourGuess.anchor.set(0.5);
        this.yourGuess.orgY = 0 - window.innerHeight/6.5;

        this.guessMatchHolder = this.addChild(new PIXI.Container());
        this.guessText = this.guessMatchHolder.addChild(new PIXI.Text('Guess ', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 105, fontWeight: 700, letterSpacing: 0})));
        this.guessMatches = this.guessMatchHolder.addChild(new PIXI.Text('matches!', Utils.cloneTextStyle(this.guessText.style, {fontWeight: 200, letterSpacing: 0})));
        this.guessMatches.x = this.guessText.width;
        Utils.pivotCenter(this.guessMatchHolder);
        this.guessMatchHolder.y = this.yourGuess.orgY + 250;

        gsap.set(this.yourGuess.scale, {x:0.6, y:0.6});
        gsap.set(this.yourGuess, {y:this.yourGuess.orgY+1000});
        gsap.set(this.yourGuess.style, {letterSpacing:20});
        this.bg.visible = true;
        this.yourGuess.visible = true;
        this.guessMatchHolder.alpha = 0;
        this.guessMatchHolder.visible =true;
        
        gsap.timeline()
            .to(this.yourGuess.scale, {x:1, y:1, duration:0.2, ease:'back.out(1)'})
        gsap.timeline()
            .to(this.yourGuess, {y:this.yourGuess.orgY, duration:0.3, ease:'back.out(1)'})
            .set(this.yourGuess.style, {fontWeight:700, fill:dataProvider.data.colorDark})
            .to(this.yourGuess.style, {fontSize:340, duration:0.3, ease:'expo'});
        gsap.set(this.yourGuess.style, {letterSpacing:100})
        gsap.to(this.yourGuess.style, {letterSpacing:0, duration:0.3, ease:'back.out(1)', delay:0.1})

        this.guessMatchHolder.filters = [dataProvider.colorMatrixFilterEmph[0]];
        gsap.timeline()
            .set(this.guessMatchHolder.scale, {x:1.5, y:0.5})
            .set(this.guessMatchHolder, {alpha:1, delay:0.5})
        
        let fxDelay = 0.5;
        let fxInterval = 0.05;
        gsap.delayedCall(fxDelay + fxInterval * 1, ()=>{
            this.guessMatchHolder.filters = [dataProvider.colorMatrixFilterEmph[1]];
            this.guessMatchHolder.scale.set(1.2, 0.7);
            this.initBtn();
        });
        gsap.delayedCall(fxDelay + fxInterval * 2, ()=>{
            this.guessMatchHolder.filters = [dataProvider.colorMatrixFilterBase[0]];
            this.guessMatchHolder.scale.set(0.9, 1.2);
        });
        gsap.delayedCall(fxDelay + fxInterval * 3, ()=>{
            this.guessMatchHolder.filters = [dataProvider.colorMatrixFilterBase[1]];
            gsap.to(this.guessMatchHolder.scale, {x:1, y:1, duration:0.1, ease:'back.out(1)'})
        });
    }

    /* ------------------------------------------------------------
        ゲームーオーバー時
    ------------------------------------------------------------ */
    initGameOver(){
        this.gameText = this.addChild(new PIXI.Text('GAME', Utils.cloneTextStyle(dataProvider.baseStyle, {align:'center', fontSize: 250, fontWeight: 700, letterSpacing: 0})));
        this.gameText.anchor.set(0.5);
        this.gameText.orgY = 0 - window.innerHeight/5.1;
        this.gameText.y = this.gameText.orgY;
        this.overText = this.addChild(new PIXI.Text('OVER', Utils.cloneTextStyle(dataProvider.baseStyle, {align:'center', fontSize: 250, fontWeight: 700, letterSpacing: 18})));
        this.overText.anchor.set(0.5);
        this.overText.y = this.gameText.orgY + 300;

        
        this.gameText.alpha = 0;
        this.gameText.style.fill = dataProvider.data.colorDark;
        this.gameText.scale.set(2);
        this.gameText.visible = true;
        
        this.overText.alpha = 0;
        this.overText.style.fill = dataProvider.data.colorDark;
        this.overText.scale.set(2);
        this.overText.visible = true;

        gsap.to(this.gameText, {alpha:1, duration:0.2, ease:'none', delay:0.2})
        gsap.timeline()
            .to(this.gameText.scale, {x:0.9, y:0.8, duration:0.2, ease:'back.out(2)', delay:0.3})
            .call(()=>{
                this.fxBox.alpha = 1;
                this.bg.visible = true;
                gsap.set(this.gameText, {x:-10})
                gsap.timeline({repeat:-1, repeatDelay:1})
                    .set(this.gameText, {alpha:0.5})
                    .to(this.gameText, {alpha:1, duration:1.2, ease:'bounce'})
            })

            gsap.to(this.overText, {alpha:1, duration:0.2, ease:'none', delay:0.4})
            gsap.timeline()
                .to(this.overText.scale, {x:0.9, y:0.8, duration:0.2, ease:'back.out(2)', delay:0.4})
                .call(()=>{
                    this.fxBox.alpha = 1;
                    this.bg.visible = true;
                    gsap.set(this.overText, {x:-10})
                    gsap.timeline({repeat:-1, repeatDelay:1})
                        .set(this.overText, {alpha:0.5})
                        .to(this.overText, {alpha:1, duration:1.2, ease:'bounce'})
                })

            .call(()=>{
                this.initBtn();
            })   
    }

    /* ------------------------------------------------------------
        リスタートボタン
    ------------------------------------------------------------ */
    initBtn(){
        let radius = 165;

        this.startBtn = new PIXI.Sprite();
        this.addChild(this.startBtn);
        this.startBtn.y = window.innerHeight/4;

        // ===== Circle =====
        this.circleFill = GraphicsHelper.exDrawCircle(0, 0, radius, false, {alpha:1});
        this.circleFill.visible = false;
        this.startBtn.addChild(this.circleFill);

        this.circleLine = GraphicsHelper.exDrawCircle(0, 0, radius, {width:2});
        this.circleLine.tint = dataProvider.data.colorDark;
        this.startBtn.addChild(this.circleLine);

        this.btnLabel = new PIXI.Text('↓', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 180, fontWeight:200}));
        this.btnLabel.tint = dataProvider.data.colorDark;
        this.btnLabel.anchor.set(0.5);
        this.startBtn.addChild(this.btnLabel);

        this.startBtn.on('touchstart', (event) => {
            this.startBtn.interactive = false;
            this.outro();
        });

        this.circleLine.scale.set(2);
        this.circleLine.alpha = 0;
        gsap.to(this.circleLine, {alpha:1, duration:0.5, ease:'power1.out'});
        gsap.timeline()
            .to(this.circleLine.scale, {x:1, y:1, duration:0.3, ease:'back.out(1)'})
            .call(()=>{
                this.startBtn.interactive = true;
            })

        this.btnLabel.scale.set(0.4);
        this.btnLabel.alpha = 0;
        gsap.to(this.btnLabel.scale, {x:1, y:1, duration  :0.3, ease:'back.out(3)', delay:0.1});
        gsap.to(this.btnLabel, {alpha:1, duration :0.3, ease:'none', delay:0.2});

    }

    /* ------------------------------------------------------------
        アウトロ
    ------------------------------------------------------------ */
    outro(){
        let scaleDest = 10;
        this.circleFill.tint = dataProvider.data.colorDark;
        this.circleFill.visible = true;
        this.circleFill.alpha = 1;
        this.btnLabel.tint = dataProvider.data.colorLight;
        gsap.timeline().to(this.circleLine.scale, {x:scaleDest, y:scaleDest, duration:0.3, ease:'power1.in'})
        gsap.timeline().to(this.circleFill.scale, {x:scaleDest, y:scaleDest, duration:0.3, ease:'power1.in'}, '+=0.05')
            .call(() =>{
                // this.yourGuess.visible = false;
                // this.guessMatchHolder.visible = false;
                this.fxBox.visible = false;
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