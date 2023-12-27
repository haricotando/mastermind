import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';

export class HeaderContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();
        
        this.initTitle();
        this.intro();

    }

    initTitle(){
        // let bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, 200, 200, false, {color:0xFF0000}));

        
        // ===== title =====
        this.mmHolder = this.addChild(new PIXI.Container());
        this.master = this.mmHolder.addChild(new PIXI.Text('MASTER', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 55, fontWeight: 300, letterSpacing: 20})));
        this.mind = this.mmHolder.addChild(new PIXI.Text('MIND', Utils.cloneTextStyle(this.master.style, {fontWeight: 200})));
        this.mind.x = this.master.width + 15;
        Utils.pivotCenter(this.mmHolder);
        this.mmHolder.y = 200;
        this.mmHolder.alpha = 0;
        
        // ===== attempt =====
        this.attempt = this.addChild(new PIXI.Text('ATTEMPT: 0/10', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 37, fontWeight: 400, letterSpacing: 5})));
        this.attempt.anchor.set(0.5);
        this.attempt.y = 168
        this.attempt.alpha = 0;


        // bg.height = dataProvider.data.headerOffset;
    }
    
    intro(){
        gsap.to(this.mmHolder, {alpha:1, y:70, duration:1, ease:'power3.out'})
        gsap.to(this.attempt, {alpha:1, duration:1, delay:0.5})
        gsap.from(this.attempt, {y:2000, duration:1, delay:0.5})
        
    }

    updateAttempt(){
        this.attempt.text = 'ATTEMPT: ' + dataProvider.data.currentAttempt + '/10';
    }


    suicide(){
    }
}