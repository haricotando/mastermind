import Utils from '../utils/helper/Utils.js';
import AlignHelper from '../utils/helper/AlignHelper.js';
import GraphicsHelper from '../utils/helper/GraphicsHelper.js';
import { HeaderContainer } from '../components/HeaderContainer.js';
import { QRContainer } from '../components/QRContainer.js';
import { AttemptContainer } from '../components/AttemptContainer.js';
import { InputContainer } from '../components/InputContainer.js';
import { NoteContainer } from '../components/note/NoteContainer.js';
import { design } from '../constants/design.js';

export class GameScene extends PIXI.Container {

    /* ============================================================
        constructor
    ============================================================ */
    constructor(gameState) {
        super();
        this.gameState = gameState;
        this.init();
    }

    init(){
        this.sortableChildren = true;
        // this.generateSecretCode(); // GameStateに移動
        const isStandalone = navigator.standalone;

        
        

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
        this.inputContainer.y += navigator.standalone ? LAYOUT.STANDALONE_FOOTER_OFFSET : 0;
    }
    
    initAttempt(){
        this.attemptContainer = this.addChild(new AttemptContainer());
        AlignHelper.xCenterWindow(this.attemptContainer);
        this.attemptContainer.y = 50;
    }
    
    guessMatch(){
        this.emit('win');
    }

    gameOver(){
        this.emit('game-over');
    }

    /* ------------------------------------------------------------
        Note, QR
    ------------------------------------------------------------ */
    initNoteBtn(){
        const style = new PIXI.TextStyle({
            fontFamily: 'Material Icons',
            fontSize: 60,
            fill: design.colors.LIGHT,
            });

        this.noteBtn = this.addChild(new PIXI.Container());
        this.noteBtn.zIndex = 1002;

        this.noteBtnBG = this.noteBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 80, false, true));
        this.noteBtnBG.tint = design.colors.DARK;
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
            fill: design.colors.LIGHT,
            });

        // this.qrBtnLabel
        this.qrBtn = this.addChild(new PIXI.Container());
        this.qrBtn.zIndex = 1001;

        this.qrBtnBG = this.qrBtn.addChild(GraphicsHelper.exDrawCircle(0, 0, 80, false, true));
        this.qrBtnBG.tint =design.colors.DARK;
        this.qrBtnBG.alpha = 0;

        this.qrBtnLabel = new PIXI.Text('\uef6b', style);
        this.qrBtn.addChild(this.qrBtnLabel);
        this.qrBtnLabel.anchor.set(0.5);
        this.qrBtnLabel.alpha = 0;
        this.qrBtnLabel.scale.set(1.5);
        this.qrBtn.x = window.innerWidth - 74;
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

    

    
}