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
        // const grid = this.addChild(Utils.drawGrid(40));
        // grid.alpha = 0.5;
        // Utils.initTrace(this);

        // const guide = this.addChild(Utils.loadDesignGuide('./guides/guide_note.png', 'bottom'));
        // guide.alpha = 0.25;
        
        // dataProvider.data.lastGuess = 4092;
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

    initNoteBtn(){
        const style = new PIXI.TextStyle({
            fontFamily: 'Material Icons',
            fontSize: 60,
            fill: dataProvider.data.colorLight,
            });

        this.noteBtn = new PIXI.Text('\ue745', style);
        this.noteBtn.zIndex = 1002;
        this.noteBtn.anchor.set(0.5);
        this.noteBtn.alpha = 0;
        this.noteBtn.scale.set(1.5);
        this.addChild(this.noteBtn);
        this.noteBtn.x = 74;
        this.noteBtn.y = 73;
        
        gsap.to(this.noteBtn.scale, {x:1, y:1, ease:'expo', delay:0.3})
        gsap.timeline()
            .to(this.noteBtn, {alpha:1, duration:0.2, ease:'none', delay:0.3})
            .call(() => {
                this.noteBtn.interactive = true;
            })

        this.noteContainer = new NoteContainer();
        this.addChild(this.noteContainer);
        AlignHelper.xCenterWindow(this.noteContainer);
        
        this.noteBtn.on('touchstart', (event) => {
            this.noteBtn.interactive = false;
            this.noteContainer.show();
            this.noteContainer.zIndex = 2000;
        });
    }

    /* ------------------------------------------------------------
        イントロ
    ------------------------------------------------------------ */
    initStartScreen(){
        let startScreen = new StartScreen();
        this.addChild(startScreen);
        AlignHelper.centerWindow(startScreen);
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
    }
    
    initAttempt(){
        this.attemptContainer = this.addChild(new AttemptContainer());
        AlignHelper.xCenterWindow(this.attemptContainer);
    }
    
    guessMatch(){
        this.endScreen = this.addChild(new EndScreenContainer(true));
        AlignHelper.centerWindow(this.endScreen);
    }

    gameOver(){
        this.endScreen = this.addChild(new EndScreenContainer(false));
        AlignHelper.centerWindow(this.endScreen);
    }

    initQRBtn(){
        const style = new PIXI.TextStyle({
            fontFamily: 'Material Icons',
            fontSize: 60,
            fill: dataProvider.data.colorLight,
            });

        this.qrBtn = new PIXI.Text('\uef6b', style);
        this.qrBtn.zIndex = 1001;
        this.qrBtn.anchor.set(0.5);
        this.qrBtn.alpha = 0;
        this.qrBtn.scale.set(1.5);
        this.addChild(this.qrBtn);
        this.qrBtn.x = window.innerWidth - 74;
        this.qrBtn.y = 73;
        
        gsap.to(this.qrBtn.scale, {x:1, y:1, ease:'expo', delay:0.3})
        gsap.timeline()
            .to(this.qrBtn, {alpha:1, duration:0.2, ease:'none', delay:0.3})
            .call(() => {
                this.qrBtn.interactive = true;
            })

        
        this.qrBtn.on('touchstart', (event) => {
            this.qrBtn.interactive = false;
            this.qrContainer = new QRContainer();
            this.addChild(this.qrContainer);
            this.qrContainer.zIndex = 2000;
        });
    }

    restart(){
        this.removeChild(this.attemptContainer);
        this.removeChild(this.inputContainer);
        this.generateSecretCode();
        this.initAttempt();
        this.headerContainer.reset();
        this.initInput();
        this.noteContainer.reset();
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
        // console.log(`SECRET: ${secretCode}`)
    }
}