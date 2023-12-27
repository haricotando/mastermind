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
        this.guessTextBaseY = 0;


        this.initKeyPads();
        this.initGuess();

        this.intro();

        // gsap.delayedCall(0.2, ()=>{
        //    this.submitAndReset(true);
        // });
    }

    intro(){
        this.keyPadContainer.visible = true;
        gsap.from(this.keyPadContainer, {alpha:0, duration:0.4, ease:'sine.out'});
        gsap.from(this.keyPadContainer.scale, {x:0.6, y:0.6, duration:0.45, ease:'back.out(1)', delay:0.1})
        gsap.from(this.keyPadContainer, {y:window.innerHeight + this.keyPadContainer.height, duration:0.5, ease:'back.out(1)'});

        this.guessText.visible = true;
        gsap.timeline()
            .set(this.guessText, {alpha:0})
            .set(this.guessText.scale, {x:0.5, y:0.5})
            .to(this.guessText, {alpha:1, duration:0.3, delay:0.1})
            .to(this.guessText.scale, {x:1, y:1, duration:0.3, ease:'back.out(3)'}, '-=0.1')
        gsap.timeline()
            .set(this.guessText.style, {letterSpacing:-50})
            .to(this.guessText.style, {letterSpacing: 0, duration:0.3, delay:0.1});
    }
    /* ------------------------------------------------------------
        Keypad
    ------------------------------------------------------------ */
    initKeyPads(){

        this.keyPadContainer = new PIXI.Container();
        this.addChild(this.keyPadContainer);

        this.rect = this.addChild(GraphicsHelper.exDrawRect(0, 0,window.innerWidth, (this.padSize+this.padMargin)*2, false, 0xFF0000));
        Utils.pivotX(this.rect);
        this.rect.visible = false;
        this.rect.y = window.innerHeight - this.rect.height;
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
        this.keyPadContainer.y = window.innerHeight - this.keyPadContainer.height-(window.innerHeight/20)
        this.keyPadContainer.visible = false;
    }

    /* ------------------------------------------------------------
        Guess / Submit / Delete
    ------------------------------------------------------------ */
    initGuess(){
        this.guessText = this.addChild(new PIXI.Text('****', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 160, fontWeight: 200, letterSpacing: 0, fill:dataProvider.data.colorLight})));
        // this.guess.tint = dataProvider.data.colorLight;
        this.guessText.anchor.set(0.5);
        this.guessTextBaseY = this.keyPadContainer.y - window.innerHeight / 11;
        this.guessText.y = this.guessTextBaseY;
        this.guessText.visible = false;

        // ===== submit =====
        this.submitBtn = this.addChild(new PIXI.Sprite());
        //
        let submitCircleFill = this.submitBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 160, false, true));
        submitCircleFill.tint = dataProvider.data.colorDark;
        let submitCircleLine = this.submitBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 160, {width:2}));
        //
        this.submitLabel = this.submitBtn.addChild(new PIXI.Text('↑', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 160, fontWeight: 300, letterSpacing: 0, fill:dataProvider.data.colorLight})));
        this.submitLabel.anchor.set(0.5);
        
        this.submitBtn.y = this.rect.y + this.rect.height/2.8;
        this.submitBtn.x = window.innerWidth/4.1;
        
        this.submitBtn.interactive = true;
        this.submitBtn.visible = false;
        
        // ===== delete =====
        this.deleteBtn = this.addChild(new PIXI.Sprite());
        //
        let deleteCircleFill = this.deleteBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 160, false, true));
        deleteCircleFill.tint = dataProvider.data.colorDark;
        let deleteCircleLine = this.deleteBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 160, {width:2}));
        deleteCircleLine.tint = dataProvider.data.colorLight;
        //
        this.deleteLabel = this.deleteBtn.addChild(new PIXI.Text('X', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 160, fontWeight: 300, letterSpacing: 0, fill:dataProvider.data.colorLight})));
        this.deleteLabel.anchor.set(0.5);
        
        this.deleteBtn.y = this.rect.y + this.rect.height/2.8;
        this.deleteBtn.x = 0 - window.innerWidth/4.1;
        
        this.deleteBtn.interactive = true;
        this.deleteBtn.visible = false;

        // // ===== Submit touch event =====
        this.submitBtn.on('touchstart', (event) => {
            this.submitBtn.interactive = false;
            this.subDelHander(true);
            dataProvider.data.currentAttempt ++;
            this.parent.headerContainer.updateAttempt();
        });
        
        // // ===== Delete touch event =====
        this.deleteBtn.on('touchstart', (event) => {
            this.deleteBtn.interactive = false;
            this.subDelHander(false);
        });
    }

    /* ------------------------------------------------------------
        0-9 Keypads
    ------------------------------------------------------------ */
    onKeyPadHandler(number){
        if(this.currentGuess.length < 4){
            this.currentGuess += number;
            if(this.currentGuess.length == 4){
                for(let i=0; i<10; i++){
                    this.keyPadList[i].mute();
                }
                gsap.to(this.keyPadContainer, {alpha:0, duration:0.2});
                gsap.to(this.keyPadContainer.scale, {x:0.9, y:0.9, duration:0.2});
                this.activateSubDelBtn(this.deleteBtn, false);
                this.activateSubDelBtn(this.submitBtn, true);
                // this.activateSubDelBtn(this.submitBtn, 300, true);
            }
        }
        let output = '';
        for(let i=0; i<4; i++){
            output += this.currentGuess[i] === undefined ? '*' : this.currentGuess[i];
        }

        this.guessText.text = output;

        // let animation = gsap.getById("guessText");
        // if (animation) {
        //   animation.kill();
        // }

        gsap.timeline()
            .set(this.guessText, {y: this.guessTextBaseY+75, duration:1})
            .to(this.guessText, {y: this.guessTextBaseY, duration:1, ease: 'elastic.out(1,0.3)'})

        gsap.timeline()
            .set(this.guessText.style, {letterSpacing: -50})
            .to(this.guessText.style, {letterSpacing: 0, duration:0.75, ease: 'elastic.out(1,0.3)'})
    }

    /* ------------------------------------------------------------
        Show Submit / Delete
    ------------------------------------------------------------ */
    activateSubDelBtn(target, withDelay){
        target.interactive = false;
        target.visible = true;
        target.alpha = 1;
        target.scale.set(1);
        const delayTime = withDelay ? 0.1 : 0;
        gsap.from(target.scale, {x:0.1, y:0.1, duration:0.6, ease:'expo', delay:delayTime});
        gsap.timeline().from(target, {y:target.y + 600, duration:0.3, ease:'back.out(1)', delay:delayTime})
            .call(()=>{
                target.interactive = true;
            });
    }

   /* ------------------------------------------------------------
        Submit / Delete
    ------------------------------------------------------------ */
    subDelHander(isSubmit){
        let target1 = isSubmit ? this.submitBtn : this.deleteBtn;
        let target2 = isSubmit ? this.deleteBtn : this.submitBtn;
        // target1.scale.set(1.3);
        gsap.to(target1.scale, {x:0.8, y:0.8, duration:0.2, ease:'back.in(3)'});
        gsap.to(target2, {alpha:0, duration:0.1, ease:'none'});
        gsap.timeline().to(target1, {alpha:0, duration:0.2})
            .call(() =>{
                target1.visible = false;
                target2.visible = false;
                if(!isSubmit){
                    this.resetKeyPads();
                }
            });

        if(isSubmit){
        //     // if submit
            dataProvider.data.lastGuess = this.currentGuess;
            let result = this.validGuess();
            // console.log(result);
        //     console.log('attemp: ' + dataProvider.data.currentAttempt + ' / ' + dataProvider.data.attemptMax);
            switch (result) {
                case 'Match':
                    this.submitAndReset(true);
        //             this.parent.attemptContainer.addAttempt(this.currentGuess, 'Match!', 2);
        //             this.parent.endGame(true);
        //             this.submitAndReset(true);
                    break;
                case 'No match':
                    gsap.delayedCall(0.2, ()=>{
                        this.parent.attemptContainer.addAttempt(this.currentGuess, result, 1);
                    });
        //             this.parent.attemptContainer.addAttempt(this.currentGuess, result, 1);
        //             if(dataProvider.data.currentAttempt >= dataProvider.data.attemptMax){
        //                 this.parent.endGame(false);
        //                 this.submitAndReset(true);
        //                 return false;
        //             }
                    this.submitAndReset();
                    break;
                default:
                    gsap.delayedCall(0.2, ()=>{
                        this.parent.attemptContainer.addAttempt(this.currentGuess, result, 0);
                    });
        //             if(dataProvider.data.currentAttempt >= dataProvider.data.attemptMax){
        // //                 this.parent.endGame(false);
        //                     // this.visible = false;
        //             }
                    // this.submitAndReset(true);
                    this.submitAndReset();
                    break;
            }

            if(dataProvider.data.currentAttempt >= dataProvider.data.attemptMax){
                this.parent.gameOver();
            }
                        
        }else{
        //     // if delete
            gsap.timeline()
                .to(this.guessText, {x:-50, duration:0.05})
                .call(()=> { this.guessText.text = '****'; })
                .to(this.guessText, {x:50, duration:0.05})
                .to(this.guessText, {x:0, duration:0.05})
            this.guessText.style.letterSpacing = 100;
            gsap.timeline().to(this.guessText.style, {letterSpacing:0, duration:0.2});
        //     this.currentGuess = '';
        }
    }

    /* ------------------------------------------------------------
        Submit guess
    ------------------------------------------------------------ */
    submitAndReset(isMatch){
        gsap.killTweensOf(this.guessText);
        gsap.to(this.guessText.scale, {x:0.85, y:0.85, duration:0.2});

        if(isMatch){
            gsap.timeline()
                .to(this.guessText, {alpha:0, y:this.guessTextBaseY - 400, duration:0.2, ease:'back.in(1)'})
                this.parent.guessMatch();
        }else{
            gsap.timeline()
                .to(this.guessText, {alpha:0, y:this.guessTextBaseY - 400, duration:0.2, ease:'back.in(1)'})
                .call(() => {
                    this.guessText.text= '****';
                    gsap.set(this.guessText.style, {letterSpacing:-50})
                    gsap.to(this.guessText.style, {letterSpacing:0, duration:0, ease:'back.out(3)'})
                    
                    gsap.set(this.guessText, {alpha:1});
                    this.guessText.y = this.guessTextBaseY + 400;
                })
                .to(this.guessText, {y: this.guessTextBaseY, duration:0.2, ease:'back.out(3)'})
                .call(()=> {
                    this.resetKeyPads();
                });
        }

    }

    validGuess(){
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
        KeyPadsの再活性
    ------------------------------------------------------------ */
    resetKeyPads(){
        for(let i=0; i<10; i++){
            this.keyPadList[i].revibe();
        }
        this.keyPadContainer.visible = true;
        gsap.to(this.keyPadContainer, {alpha:1, duration:0.2});
        // gsap.to(this.keyPadContainer, {y:this.keyPadContainerBasePosY, duration:0.2, ease:'back'});
        // gsap.to(this.keyPadContainer.scale, {x:1, y:1, duration:0.25, ease:'back'});
        this.currentGuess = '';
    }

    suicide(){
        this.parent.removeChild(this);
    }
}