import { dataProvider } from './dataProvider.js';
import Utils from './helper/Utils.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { StartScreen } from './StartScreen.js';
import { HeaderContainer } from './HeaderContainer.js';
import { InputContainer } from './InputContainer.js';
import { AttemptContainer } from './AttemptContainer.js';
import { GuessMatchScreen } from './GuessMatchScreen.js';
import { GameOverScreen } from './GameOverScreen.js';



export class ApplicationRoot extends PIXI.Container {

    /* ============================================================
        constructor
    ============================================================ */
    constructor(appScreen) {
        super();
        this.init();
    }

    init(){
        this.generateSecretCode();

        // PRESET作る
        dataProvider.baseStyle = new PIXI.TextStyle({
            fontFamily: 'Inter', fontSize: 100, fontWeight: 100, fill: dataProvider.data.colorLight,
        });
        
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
        const grid = this.addChild(GraphicsHelper.drawGrid());
        grid.alpha = 0;
        Utils.initTrace(this);
        
        if(dataProvider.data.skipIntro){
            // this.initStartScreen();
            this.initAttempt();
            this.initHeader();
            this.initInput();
            return false;
        }
        // const guide = this.addChild(Utils.loadDesignGuide('./guides/guide_gameover.png', 'bottom'));
        // guide.alpha = 0.25;
        gsap.delayedCall(1.5, ()=>{
            // this.gameOver();
            // dataProvider.data.lastGuess = 1234;
            // this.guessMatch();
        });
        /* 
            DEBUG ends
        */

        this.initStartScreen();
        
        
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
    }

    initHeader(){
        this.headerContainer = this.addChild(new HeaderContainer());
        AlignHelper.xCenterWindow(this.headerContainer);
    }
    
    initInput(){
        this.inputContainer = this.addChild(new InputContainer());
        this.inputContainer.x = window.innerWidth/2;
    }

    initAttempt(){
        this.attemptContainer = this.addChild(new AttemptContainer());
        AlignHelper.xCenterWindow(this.attemptContainer);
    }
    
    guessMatch(){
        this.endScreen =  this.addChild(new GuessMatchScreen());
        AlignHelper.centerWindow(this.endScreen);
    }

    gameOver(){
        this.endScreen = this.addChild(new GameOverScreen());
        AlignHelper.centerWindow(this.endScreen);
    }

    restart(){
        this.removeChild(this.headerContainer);
        this.removeChild(this.attemptContainer);
        this.removeChild(this.inputContainer);
        this.generateSecretCode();
        this.initAttempt();
        this.initHeader();
        this.initInput();
    }

    updateAttempt(){
        this.attemptContainer.visible = false;
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
        console.log(`SECRET: ${secretCode}`)
    }
}