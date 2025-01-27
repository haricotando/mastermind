import { dataProvider } from './dataProvider.js';
import Utils from './helper/Utils.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { StartScreen } from './StartScreen.js';
import { EndScreenContainer } from './EndScreenContainer.js';
import { HeaderContainer } from './HeaderContainer.js';
import { QRContainer } from './QRContainer.js';
import { AttemptContainer } from './AttemptContainer.js';
import { InputContainer } from './InputContainer.js';
import { NoteContainer } from './note/NoteContainer.js';



export class ApplicationRoot extends PIXI.Container {

    /* ============================================================
        constructor
    ============================================================ */
    constructor(appScreen) {
        super();
        this.init();
    }

    init(){
        this.sortableChildren = true;
        this.generateSecretCode();
        dataProvider.data.standalone = navigator.standalone;

        // PRESET作る
        dataProvider.baseStyle = new PIXI.TextStyle({
            fontFamily: 'Inter', fontSize: 100, fontWeight: 100, fill: dataProvider.data.colorLight,
        });
        
        const colorMtxLight = new PIXI.ColorMatrixFilter();
        colorMtxLight.tint(dataProvider.data.colorLight);
        dataProvider.colorMatrixFilterBase.push(colorMtxLight);

        const colorMtxDark = new PIXI.ColorMatrixFilter();
        colorMtxDark.tint(dataProvider.data.colorDark);
        dataProvider.colorMatrixFilterBase.push(colorMtxDark);

        const colorMtxEmph1 = new PIXI.ColorMatrixFilter();
        colorMtxEmph1.tint(dataProvider.data.colorEmph1);
        dataProvider.colorMatrixFilterEmph.push(colorMtxEmph1);
        
        const colorMtxEmph2 = new PIXI.ColorMatrixFilter();
        colorMtxEmph2.tint(dataProvider.data.colorEmph2);
        dataProvider.colorMatrixFilterEmph.push(colorMtxEmph2);
        
        const colorMtxEmph3 = new PIXI.ColorMatrixFilter();
        colorMtxEmph3.tint(dataProvider.data.colorEmph3);
        dataProvider.colorMatrixFilterEmph.push(colorMtxEmph3);
        

        /* 
            DEBUG starts
        */
    //    Utils.initTrace(this);

    
    // const guide = this.addChild(Utils.loadDesignGuide('./guides/guide_note.png', 'bottom'));
    // guide.alpha = 0.25;
    
    // dataProvider.data.answerLock = true;
    // dataProvider.data.skipIntro = true;
    // dataProvider.data.currentAttempt = 9;
    
    /* 
    DEBUG ends
    */
   
   if(dataProvider.data.skipIntro){
       this.initAttempt();
       this.initHeader();
       this.initInput();
       this.initQRBtn();
       this.initNoteBtn();
    }else{
        this.initStartScreen();
    }
}

    /* ------------------------------------------------------------
        イントロ
    ------------------------------------------------------------ */
    initStartScreen(){
        let startScreen = new StartScreen();
        this.addChild(startScreen);
        AlignHelper.centerWindow(startScreen);
        
        startScreen.y += dataProvider.data.standalone ? dataProvider.data.standaloneFooterOffset : 0
    }

    afterIntro(){
        this.initAttempt();
        this.initHeader();
        this.initInput();
        this.initQRBtn();
        this.initNoteBtn();
    }

    initHeader(){
        this.headerContainer = this.addChild(new HeaderContainer());
        AlignHelper.xCenterWindow(this.headerContainer);
        this.headerContainer.zIndex = 1000;
    }
    
    initInput(){
        this.inputContainer = this.addChild(new InputContainer());
        AlignHelper.xCenterWindow(this.inputContainer);
        this.inputContainer.y += dataProvider.data.standalone ? dataProvider.data.standaloneFooterOffset : 0;
    }
    
    initAttempt(){
        this.attemptContainer = this.addChild(new AttemptContainer());
        AlignHelper.xCenterWindow(this.attemptContainer);
        this.attemptContainer.y = 50;
    }
    
    guessMatch(){
        this.endScreen = this.addChild(new EndScreenContainer(true));
        AlignHelper.centerWindow(this.endScreen);
    }

    gameOver(){
        this.endScreen = this.addChild(new EndScreenContainer(false));
        AlignHelper.centerWindow(this.endScreen);
    }

    /* ------------------------------------------------------------
        Note, QR
    ------------------------------------------------------------ */
    initNoteBtn(){
        const style = new PIXI.TextStyle({
            fontFamily: 'Material Icons',
            fontSize: 60,
            fill: dataProvider.data.colorLight,
            });

        this.noteBtn = this.addChild(new PIXI.Container());
        this.noteBtn.zIndex = 1002;

        this.noteBtnBG = this.noteBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 80, false, true));
        this.noteBtnBG.tint =dataProvider.data.colorDark;
        this.noteBtnBG.alpha = 0;

        this.noteBtnLabel = new PIXI.Text('\ue745', style);
        this.noteBtnLabel.anchor.set(0.5);
        this.noteBtnLabel.alpha = 0;
        this.noteBtnLabel.scale.set(1.5);
        this.noteBtn.addChild(this.noteBtnLabel);
        this.noteBtn.x = 74;
        this.noteBtn.y = 73 + 50;
        
        gsap.to(this.noteBtnLabel.scale, {x:1, y:1, ease:'expo', delay:0.7})
        gsap.timeline()
            .to(this.noteBtnLabel, {alpha:1, duration:0.2, ease:'none', delay:0.7})
            .call(() => {
                this.noteBtn.interactive = true;
            })

        this.noteContainer = new NoteContainer();
        this.addChild(this.noteContainer);
        AlignHelper.xCenterWindow(this.noteContainer);
        
        this.noteBtn.on('touchstart', (event) => {
            this.noteBtnHandler();
        });
    }
    
    noteBtnHandler(){
        this.noteBtn.interactive = false;
        this.noteContainer.show();

        gsap.timeline()
            .set(this.noteBtnLabel.scale, {x:2, y:2})
            .to(this.noteBtnLabel.scale, {x:1, y:1, duration:0.5, ease:'back.out(1)'})

        this.noteContainer.zIndex = 2000;
    }

    initQRBtn(){
        const style = new PIXI.TextStyle({
            fontFamily: 'Material Icons',
            fontSize: 60,
            fill: dataProvider.data.colorLight,
            });

        // this.qrBtnLabel
        this.qrBtn = this.addChild(new PIXI.Container());
        this.qrBtn.zIndex = 1001;

        this.qrBtnBG = this.qrBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 80, false, true));
        this.qrBtnBG.tint =dataProvider.data.colorDark;
        this.qrBtnBG.alpha = 0;

        this.qrBtnLabel = new PIXI.Text('\uef6b', style);
        this.qrBtn.addChild(this.qrBtnLabel);
        this.qrBtnLabel.anchor.set(0.5);
        this.qrBtnLabel.alpha = 0;
        this.qrBtnLabel.scale.set(1.5);
        this.qrBtn.x = dataProvider.wWidth - 74;
        this.qrBtn.y = 73 + 50;
        
        gsap.to(this.qrBtnLabel.scale, {x:1, y:1, ease:'expo', delay:0.7})
        gsap.timeline()
            .to(this.qrBtnLabel, {alpha:1, duration:0.2, ease:'none', delay:0.7})
            .call(() => {
                this.qrBtn.interactive = true;
            })

        
        this.qrBtn.on('touchstart', (event) => {
            this.qrBtn.interactive = false;
            this.qrContainer = new QRContainer();
            this.addChild(this.qrContainer);

            gsap.timeline()
                .set(this.qrBtnLabel.scale, {x:2, y:2})
                .to(this.qrBtnLabel.scale, {x:1, y:1, duration:0.5, ease:'back.out(1)'})

            this.qrContainer.zIndex = 2000;
        });
    }

    restart(isNextGame){
        if(isNextGame){
            this.headerContainer.moreHard();
            this.removeChild(this.attemptContainer);
            this.removeChild(this.inputContainer);
            this.generateSecretCode();
            this.noteContainer.reset();
            gsap.delayedCall(0.5, ()=>{
                this.initAttempt(true);
                this.initInput();
            });
            
        }else{
            dataProvider.data.attemptMax = 10;
            dataProvider.data.hardMode = 0;
            this.headerContainer.resetHard();
            this.removeChild(this.attemptContainer);
            this.removeChild(this.inputContainer);
            this.generateSecretCode();
            this.initAttempt();
            this.initInput();
            this.noteContainer.reset();

        }
    }

    /* ==================================================
    ロジック
    ================================================== */
    generateSecretCode() {
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let secretCode = '';
        while (secretCode.length < 4) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            const digit = digits.splice(randomIndex, 1)[0];
            secretCode += digit;
        }
        dataProvider.data.secret = secretCode;
        dataProvider.data.currentAttempt = 0;
        dataProvider.data.lastGuess = '';
    }
}