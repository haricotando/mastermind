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
        this.isMatch = isMatch;
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
        gsap.timeline()
        
        gsap.set(this.bg, {y:window.innerHeight});
        gsap.timeline()
            .to(this.bg, {y:this.fxBox.orgY, duration:0.2, ease:'power1.out'})
    }

    /* ------------------------------------------------------------
        正解時の演出
    ------------------------------------------------------------ */
    initGuessMatch(){
        this.fxContainer = this.addChild(new PIXI.Container());
        this.yourGuess = this.addChild(new PIXI.Text(dataProvider.data.lastGuess, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 250, fontWeight: 200, letterSpacing: 0})));
        this.yourGuess.anchor.set(0.5);
        this.yourGuess.orgY = 0 - window.innerHeight/6.5;
        this.fxContainer.y = this.yourGuess.orgY;
        

        this.subText = this.addChild(new PIXI.Text('Correct!', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 180, fontWeight: 200, letterSpacing: 10})));
        this.subText.anchor.set(0.5);
        this.subText.y = this.yourGuess.orgY + 300;

        gsap.set(this.yourGuess.scale, {x:0.6, y:0.6});
        gsap.set(this.yourGuess, {y:this.yourGuess.orgY+1000});
        gsap.set(this.yourGuess.style, {letterSpacing:20});
        this.bg.visible = true;
        this.yourGuess.visible = true;
        this.subText.alpha = 0;
        this.subText.visible =true;
        
        gsap.timeline()
            .to(this.yourGuess.scale, {x:1, y:1, duration:0.3, ease:'back.out(1)'})
        gsap.timeline()
            .to(this.yourGuess, {y:this.yourGuess.orgY, duration:0.3, ease:'back.out(1)'})
            .set(this.yourGuess.style, {fontWeight:700, fill:dataProvider.data.colorDark})
            .to(this.yourGuess.style, {fontSize:340, duration:0.2, ease:'expo'});
        gsap.set(this.yourGuess.style, {letterSpacing:100})
        gsap.to(this.yourGuess.style, {letterSpacing:0, duration:0.3, ease:'back.out(1)', delay:0.1})

        this.subText.filters = [dataProvider.colorMatrixFilterEmph[0]];
        this.subText.scale.set(1.5, 0.3);
            
        let fxDelay = 0.6;
        let fxInterval = 0.05;
        gsap.delayedCall(fxDelay + fxInterval * 1, ()=>{
            this.subText.alpha = 1;
            this.subText.filters = [dataProvider.colorMatrixFilterEmph[1]];
            this.subText.scale.set(1.2, 0.7);
            this.initFX();
        });
        gsap.delayedCall(fxDelay + fxInterval * 2, ()=>{
            this.subText.filters = [dataProvider.colorMatrixFilterBase[0]];
            this.subText.scale.set(0.8, 1.2);
        });
        gsap.delayedCall(fxDelay + fxInterval * 3, ()=>{
            this.subText.filters = [dataProvider.colorMatrixFilterBase[1]];
            gsap.to(this.subText.scale, {x:1, y:1, duration:0.1, ease:'back.out(1)'})
            this.initBtn();
        });

        const fxCircle = this.fxContainer.addChild(GraphicsHelper.exDrawCircle(0, 0, 1500, false, true));
        fxCircle.alpha = 0;
        fxCircle.scale.set(0.1);
        gsap.timeline()
            .set(fxCircle, {alpha:1, delay:0.4})
            .to(fxCircle.scale, {x:1, y:1, duration:0.5, ease:'power3.out'})
        gsap.to(fxCircle, {alpha:0, duration:0.9, ease:'none', delay:0.4})

    }

    initFX(){
        for(let i=0; i<20; i++){
            const fx = this.fxContainer.addChild(this.makeFx());
            const sec = Math.random()*10+5;
            fx.alpha = 0;
            gsap.timeline({repeat:-1})
                .to(fx, {alpha:1, duration:0.5, ease:'none'})
                .to(fx, {rotation:Math.random()*1, duration:sec, ease:'none'}, '-=0.5')
                .to(fx.scale, {x:2, y:2, duration:sec, ease:'none'}, '-='+(0.2+sec))
                .to(fx, {alpha:0, duration:0.5, ease:'none'}, '-=1')
        }
    }

    makeFx(){
        const fxContainer = new PIXI.Container();
        const num = Math.round(Math.random()*1*5+5);
        for(let i=0; i<num; i++){
            fxContainer.addChild(this.drawLine());
        }
        return fxContainer;

    }

    drawLine(){
        let line = new PIXI.Graphics();
        line.lineStyle(2, Math.random()>0.5 ? dataProvider.data.colorEmph1 : 0xFFFFFF);
        line.moveTo(0, 0);
        line.lineTo((500+Math.random()*100)*Math.random()*2, 0);
        line.rotation = Math.random()*6;
        line.alpha = Math.random()+0.1;

        return line;
    }

    /* ------------------------------------------------------------
        ゲームーオーバー時
    ------------------------------------------------------------ */
    initGameOver(){
        this.gameText = this.addChild(new PIXI.Text('GAME', Utils.cloneTextStyle(dataProvider.baseStyle, {align:'center', fontSize: 340, fontWeight: 700, letterSpacing: 0})));
        this.gameText.anchor.set(0.5);
        this.gameText.orgY = 0 - window.innerHeight/5.1;
        this.gameText.y = this.gameText.orgY;
        this.overText = this.addChild(new PIXI.Text('OVER', Utils.cloneTextStyle(dataProvider.baseStyle, {align:'center', fontSize: 340, fontWeight: 700, letterSpacing: 25})));
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

        // this.startBtn.visible = true;
        this.circleLine.alpha = 0;
        this.circleLine.scale.set(2);
        gsap.to(this.circleLine, {alpha:1, duration:0.4, ease:'power1.out'});
        gsap.to(this.circleLine.scale, {x:1, y:1, duration:0.4, ease:'back.out(3)'});
        //
        this.circleFill.visible = true;
        this.circleFill.tint = dataProvider.data.colorDark;
        this.circleFill.alpha = 1;
        this.circleFill.scale.set(0.1);
        gsap.timeline()
            .to(this.circleFill.scale, {x:1, y:1, duration:0.3, ease:'ease.back(1)'})
        gsap.timeline()
            .to(this.circleFill, {alpha:0, duration:0.1, ease:'none', delay:0.2})
            .call(()=>{
                this.circleFill.tint = dataProvider.data.colorLight;
            });

        this.btnLabel.alpha = 0;
        this.btnLabel.y = -40;
        gsap.timeline().to(this.btnLabel, {y:0, duration:0.4}, '+=0.2');
        gsap.timeline().to(this.btnLabel, {alpha:1, duration:0.3}, '+=0.2')
            .call(() => {
                // this.circleLine.tint = dataProvider.data.colorLight;
                this.startBtn.interactive = true;
            });
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
                this.fxBox.visible = false;
                if(this.isMatch){
                    this.yourGuess.visible = false;
                    this.subText.visible = false;
                    this.fxContainer.visible = false;
                }else{
                    this.gameText.visible = false;
                    this.overText.visible = false;
                }
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