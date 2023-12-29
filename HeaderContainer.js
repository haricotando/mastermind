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
        // ===== title =====
        this.mmHolder = this.addChild(new PIXI.Container());
        this.master = this.mmHolder.addChild(new PIXI.Text('MASTER', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 55, fontWeight: 300, letterSpacing: 20})));
        this.mind = this.mmHolder.addChild(new PIXI.Text('MIND', Utils.cloneTextStyle(this.master.style, {fontWeight: 200})));
        this.mind.x = this.master.width + 15;
        Utils.pivotCenter(this.mmHolder);
        this.mmHolder.alpha = 0;
        
        // ===== attempt =====
        this.attempt = this.addChild(new PIXI.Text('ATTEMPT: 0/10', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 37, fontWeight: 400, letterSpacing: 5})));
        this.attempt.anchor.set(0.5);
        this.attempt.y = 168
        this.attempt.alpha = 0;
    }
    
    intro(){
        const introDelay = 0.3;
        gsap.timeline()
            .set(this.mmHolder, {y:200})
            .to(this.mmHolder, {alpha:1, y:70, duration:0.4, ease:'back.out(2)', delay:introDelay});
        gsap.timeline()
            .set(this.attempt, {y:168*2, delay:0.1})
            .to(this.attempt, {alpha:1, y:168, duration:0.4, ease:'back.out(2)', delay:introDelay})
        
    }

    updateAttempt(){
        dataProvider.data.currentAttempt ++;
        this.attempt.text = 'ATTEMPT: ' + dataProvider.data.currentAttempt + '/10';
    }


    suicide(){
    }
}