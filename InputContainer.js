import { KeyPad } from './KeyPad.js';
import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';

export class InputContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.currentGuess = '';
        this.keyPadList = [];
        this.padMargin = 25;
        this.padSize = 170;

        this.initKeyPads();
        this.initBuffer();
        this.intro();

        // debug
        // gsap.delayedCall(0.3, ()=>{
        //     this.onKeyPadHandler(0)
        // });
        // gsap.delayedCall(0.6, ()=>{
        //     this.onKeyPadHandler(2)
        // });
        // gsap.delayedCall(0.9, ()=>{
        //     this.onKeyPadHandler(3)
        // });
        // gsap.delayedCall(1.2, ()=>{
        //     this.onKeyPadHandler(4)
        // });
    }

    /* ------------------------------------------------------------
        intro
    ------------------------------------------------------------ */
    intro(){
        this.keyPadContainer.visible = true;
        gsap.set(this.keyPadContainer, {alpha:0, y:dataProvider.wHeight + this.keyPadContainer.height});
        gsap.set(this.keyPadContainer.scale, {x:0.5, y:0.5});
        gsap.to(this.keyPadContainer, {alpha:1, duration:0.5, ease:'none'});
        gsap.to(this.keyPadContainer, {y:this.keyPadContainer.orgY, duration:0.5, ease:'back.out(1)'});
        gsap.to(this.keyPadContainer.scale, {x:1, y:1, duration:0.4, ease:'back.out(1)', delay:0.1});

        // const guess
        const bufferIntroDelay = 0.3;
        this.buffer.visible = true;
        gsap.set(this.buffer, {alpha:0, y:this.buffer.orgY+100});
        gsap.set(this.buffer.scale, {x:0.5, y:0.5})

        gsap.to(this.buffer, {alpha:1, duration:0.5, ease:'none', delay:bufferIntroDelay})
        gsap.to(this.buffer, {y:this.buffer.orgY, duration:0.35, ease:'back.out(3)', delay:bufferIntroDelay})
        gsap.to(this.buffer.scale, {x:1, y:1, duration:0.3, ease:'back.out(3)', delay:bufferIntroDelay})
        gsap.set(this.buffer.style, {letterSpacing:-50})
        gsap.to(this.buffer.style, {letterSpacing: 0, duration:0.3, delay:0.1});
    }
    /* ------------------------------------------------------------
        Keypad
    ------------------------------------------------------------ */
    initKeyPads(){
        this.keyPadContainer = new PIXI.Container();
        this.addChild(this.keyPadContainer);

        this.rect = this.addChild(GraphicsHelper.exDrawRect(0, 0,dataProvider.wWidth, (this.padSize+this.padMargin)*2, false, 0xFF0000));
        Utils.pivotX(this.rect);
        this.rect.visible = false;
        this.rect.y = dataProvider.wHeight - this.rect.height;
        // // ===== KeyPadの生成と配置 =====
        let valueIndex = 0;
        for(let i=0; i<10; i++){
            let keyPad = this.keyPadContainer.addChild(new KeyPad(i==9?0:i+1));

            keyPad.x = i*(this.padSize + this.padMargin);
            if(i>4){
                keyPad.y = this.padSize + this.padMargin;
                keyPad.x = (i-5)*(this.padSize + this.padMargin);
            }
            this.keyPadList.push(keyPad);
        }

        Utils.pivotX(this.keyPadContainer);
        this.keyPadContainer.orgY = dataProvider.wHeight - this.keyPadContainer.height-(dataProvider.wHeight/20);
        this.keyPadContainer.y = this.keyPadContainer.orgY;
        this.keyPadContainer.visible = false;
    }

    /* ------------------------------------------------------------
        Buffer / Submit / Delete
    ------------------------------------------------------------ */
    initBuffer(){
        this.buffer = this.addChild(new PIXI.Text('****', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 160, fontWeight: 200, letterSpacing: 0, fill:dataProvider.data.colorLight})));
        // this.guess.tint = dataProvider.data.colorLight;
        this.buffer.anchor.set(0.5);
        this.buffer.orgY = dataProvider.wHeight/2 + dataProvider.wHeight/8 + this.buffer.height/4;
        // this.buffer.orgY = this.keyPadContainer.y - dataProvider.wHeight / 13;
        this.buffer.y = this.buffer.orgY;
        this.buffer.visible = false;

        // ===== submit =====
        this.submitBtn = this.addChild(new PIXI.Sprite());
        //
        this.submitCircleFill = this.submitBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 160, false, true));
        this.submitCircleFill.tint = dataProvider.data.colorDark;
        this.submitCircleLine = this.submitBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 160, {width:3}));
        //
        this.submitLabel = this.submitBtn.addChild(new PIXI.Text('↑', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 160, fontWeight: 300, letterSpacing: 0, fill:dataProvider.data.colorLight})));
        this.submitLabel.anchor.set(0.5);
        
        this.submitBtn.orgY = this.keyPadContainer.y + this.rect.height/2 - 10;
        this.submitBtn.y = this.submitBtn.orgY;
        this.submitBtn.x = dataProvider.wWidth/4.1;
        
        this.submitBtn.visible = false;
        
        // ===== delete =====
        this.deleteBtn = this.addChild(new PIXI.Sprite());
        //
        this.deleteCircleFill = this.deleteBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 160, false, true));
        this.deleteCircleFill.tint = dataProvider.data.colorDark;
        this.deleteCircleLine = this.deleteBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 160, {width:2}));
        this.deleteCircleLine.tint = dataProvider.data.colorLight;
        //
        this.deleteLabel = this.deleteBtn.addChild(new PIXI.Text('X', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 160, fontWeight: 300, letterSpacing: 0, fill:dataProvider.data.colorLight})));
        this.deleteLabel.anchor.set(0.5);
        
        this.deleteBtn.orgY = this.submitBtn.orgY;
        this.deleteBtn.y = this.deleteBtn.orgY;
        this.deleteBtn.x = 0 - dataProvider.wWidth/4.1;
        
        this.deleteBtn.visible = false;

        this.buffer.interactive = true;
        this.buffer.on('touchstart', (event) => {
            this.parent.noteBtnHandler();
        });


        /*
            ===== Submit touch event =====
        */
        this.submitBtn.on('touchstart', (event) => {
            dataProvider.data.currentAttempt ++;
            this.parent.headerContainer.updateAttempt();
            this.subDelOutro('submit', 'delete');
            
            let result = this.validGuess();
            gsap.delayedCall(0.2, ()=>{
                this.parent.attemptContainer.addAttempt(this.currentGuess, result, result == 'No match' ? 1 : 0);
            })
            if(result == 'Match'){
                this.submitAndReset(true);
                gsap.delayedCall(0.1, ()=>{
                    this.parent.guessMatch();
                    return false;
                });
            }else{
                if(dataProvider.data.currentAttempt >= dataProvider.data.attemptMax){
                    this.submitAndReset(true);
                    gsap.delayedCall(0.6, ()=>{
                        this.parent.gameOver();
                        return false;
                    });
                }else{
                    this.submitAndReset();
                }
            }
        });
        
        // // ===== Delete touch event =====
        this.deleteBtn.on('touchstart', (event) => {
            this.subDelOutro('delete', 'submit');
            gsap.timeline()
                .set(this.buffer.style, {fill:dataProvider.data.colorEmph3})
                .to(this.buffer, {x:-50, duration:0.05})
                .call(()=> {
                    this.buffer.text = '****';
                })
                .set(this.buffer.style, {fill:dataProvider.data.colorEmph2})
                .to(this.buffer, {x:50, duration:0.05})
                .to(this.buffer, {x:0, duration:0.05})
                .set(this.buffer.style, {fill:dataProvider.data.colorLight})
            gsap.timeline()
                .set(this.buffer.style, {letterSpacing: 100})
                .to(this.buffer.style, {letterSpacing:0, duration:0.2})
                .call(this.resetKeyPads.bind(this), null, 0.4);
        });
    }

    /* ------------------------------------------------------------
        Show Submit / Delete
    ------------------------------------------------------------ */
    activateSubDelBtn(targetPrefix, withDelay){
        const targetBtn = this[targetPrefix + 'Btn'];
        const targetCircleFill = this[targetPrefix + 'CircleFill'];
        const targetCircleLine = this[targetPrefix + 'CircleLine'];
        const targetLabel = this[targetPrefix + 'Label'];
        
        targetBtn.interactive = false;
        targetBtn.visible = true;

        targetCircleLine.alpha = 1;
        targetCircleLine.tint = dataProvider.data.colorLight;
        targetCircleLine.scale.set(1);
        targetCircleFill.tint = dataProvider.data.colorDark;
        targetCircleFill.scale.set(1);
        targetLabel.tint = dataProvider.data.colorLight;

        targetLabel.scale.set(1);
        const baseDelay = 0.2;
        const delayTime = withDelay ? baseDelay+0.1 : baseDelay+0;
        gsap.timeline()
            .set(targetBtn, {alpha:0})
            .to(targetBtn, {alpha:1, duration:0.4, ease:'nine', delay:delayTime})
        gsap.timeline()
            .set(targetBtn.scale, {x:0.1, y:0.1})
            .to(targetBtn.scale, {x:1, y:1, duration:0.3, ease:'back.out(1)', delay:delayTime})
            .call(()=>{
                targetBtn.interactive = true;
            });
    }

   /* ------------------------------------------------------------
        Submit / Delete
    ------------------------------------------------------------ */
    subDelOutro(targetPrefix1, targetPrefix2){
        const targetBtn1 = this[targetPrefix1 + 'Btn'];
        const targetCircleFill1 = this[targetPrefix1 + 'CircleFill'];
        const targetCircleLine1 = this[targetPrefix1 + 'CircleLine'];
        const targetLabel1 = this[targetPrefix1 + 'Label'];

        const targetBtn2 = this[targetPrefix2 + 'Btn'];
        const targetCircleFill2 = this[targetPrefix2 + 'CircleFill'];
        const targetCircleLine2 = this[targetPrefix2 + 'CircleLine'];
        const targetLabel2 = this[targetPrefix2 + 'Label'];

        targetBtn1.interactive = false;
        targetBtn2.interactive = false;

        targetCircleFill1.tint = dataProvider.data.colorLight;
        targetLabel1.tint = dataProvider.data.colorDark;
        targetCircleLine1.tint = targetPrefix1 == 'submit' ? dataProvider.data.colorEmph1 : dataProvider.data.colorEmph3;

        gsap.to(targetBtn1, {alpha:0, duration:0.2, ease:'none', delay:0.2});

        gsap.set(targetCircleFill1.scale, {x:1, y:1});
        gsap.timeline()
            .to(targetCircleFill1.scale, {x:1.2, y:1.2, duration:0.2, ease:'expo'})
            .to(targetCircleFill1.scale, {x:0.6, y:0.6, duration:0.3, ease:'back.out(1)'});
        
        gsap.to(targetCircleLine1.scale, {x:1.3, y:1.3, duration:0.3, ease:'back.out(1)'});
        gsap.to(targetCircleLine1, {alpha:0, duration:0.2, ease:'none', delay:0.1});

        gsap.set(targetLabel1.scale, {x:0.9, y:0.9});
        gsap.to(targetLabel1.scale, {x:1.2, y:1.2, duration:0.3, ease:'back.out(3)'})

        gsap.set(targetBtn2, {alpha:1})
        gsap.to(targetBtn2.scale, {x:0.8, y:0.8, duration:0.3, ease:'none'})
        gsap.to(targetBtn2, {alpha:0, duration:0.3, ease:'none'})

    }

    /* ------------------------------------------------------------
        Submit guess
    ------------------------------------------------------------ */
    submitAndReset(withoutReset){
        gsap.killTweensOf(this.buffer);
        gsap.to(this.buffer.scale, {x:0.85, y:0.85, duration:0.2});

        if(withoutReset){
            gsap.timeline()
            .to(this.buffer, {alpha:0, y:this.buffer.orgY - 400, duration:0.2, ease:'back.in(1)'})
        }else{
            gsap.timeline()
                .to(this.buffer, {alpha:0, y:this.buffer.orgY - 400, duration:0.2, ease:'back.in(1)'})
                .call(() => {
                    this.buffer.text= '****';
                    gsap.set(this.buffer.style, {letterSpacing:-50})
                    gsap.to(this.buffer.style, {letterSpacing:0, duration:0, ease:'back.out(3)'})
                    
                    gsap.set(this.buffer, {alpha:1});
                    this.buffer.y = this.buffer.orgY + 400;
                })
                .to(this.buffer, {y: this.buffer.orgY, duration:0.2, ease:'back.out(3)'})
                .call(()=> {
                    this.resetKeyPads();
                });
        }

    }

    /* ------------------------------------------------------------
        Valid
    ------------------------------------------------------------ */
    validGuess(){
        dataProvider.data.lastGuess = this.currentGuess;

        if(dataProvider.data.answerLock){
            dataProvider.data.secret = '1234';
        }

        if(this.currentGuess == dataProvider.data.secret){
            return 'Match';
        }else{
            let isMatch = 0;
            let isIncluded = 0;
            for(let i = 0; i< 4; i++){
                if(this.currentGuess[i] === dataProvider.data.secret[i]){
                    isMatch ++;
                }else if(dataProvider.data.secret.includes(this.currentGuess[i])){
                    isIncluded ++;
                }
            }

            let feedback = '';
            if(isMatch > 0 && isIncluded > 0){
                feedback = `${isMatch}H / ${isIncluded}B`;
            }else{
                if(isMatch == 0 && isIncluded == 0){
                    feedback = 'No match';
                }else{
                    feedback = isMatch > 0 ? `${isMatch}H` : feedback;
                    feedback = isIncluded > 0 ? `${isIncluded}B` : feedback;
                }
            }
            return feedback;
        }
    }

   /* ------------------------------------------------------------
        0-9 Keypads
    ------------------------------------------------------------ */
    onKeyPadHandler(number){
        if(this.currentGuess.length < 4){
            this.currentGuess += number;
        }
        let output = '';
        for(let i=0; i<4; i++){
            output += this.currentGuess[i] === undefined ? '*' : this.currentGuess[i];
        }
        this.buffer.text = output;

        gsap.timeline()
            .set(this.buffer, {y: this.buffer.orgY+75})
            .to(this.buffer, {y: this.buffer.orgY, duration:0.6, ease: 'elastic.out(1, 0.3)'})

        gsap.timeline()
            .set(this.buffer.style, {letterSpacing: -50})
            .to(this.buffer.style, {letterSpacing: 0, duration:0.5, ease: 'elastic.out(1,0.3)'})

        if(this.currentGuess.length == 4){
            for(let i=0; i<10; i++){
                this.keyPadList[i].mute();
            }
            gsap.timeline()
            .to(this.keyPadContainer, {alpha:0, duration:0.2})
            gsap.to(this.keyPadContainer.scale, {x:0.9, y:0.9, duration:0.2});

            this.buffer.tint = dataProvider.data.colorEmph1;
            gsap.delayedCall(0.1, ()=>{
                this.buffer.tint = dataProvider.data.colorLight;
            });

            this.activateSubDelBtn('delete', false);
            this.activateSubDelBtn('submit', 300, true);
        }
    }

  /* ------------------------------------------------------------
        KeyPadsの再活性
    ------------------------------------------------------------ */
    resetKeyPads(){
        for(let i=0; i<10; i++){
            this.keyPadList[i].revibe();
        }
        this.keyPadContainer.visible = true;
        gsap.to(this.keyPadContainer, {alpha:1, duration:0.2});
        gsap.to(this.keyPadContainer, {y:this.keyPadContainer.orgY, duration:0.2, ease:'back'});
        gsap.to(this.keyPadContainer.scale, {x:1, y:1, duration:0.25, ease:'back'});
        this.currentGuess = '';
    }

    suicide(){
        this.parent.removeChild(this);
    }
}