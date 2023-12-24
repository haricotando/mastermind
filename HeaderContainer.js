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
    }

    initTitle(){
        // ===== title =====
        this.mmHolder = this.addChild(new PIXI.Container());
        this.master = this.mmHolder.addChild(new PIXI.Text('MASTER', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 55, fontWeight: 300, letterSpacing: 20})));
        this.mind = this.mmHolder.addChild(new PIXI.Text('MIND', Utils.cloneTextStyle(this.master.style, {fontWeight: 200})));
        this.mind.x = this.master.width + 15;
        Utils.pivotCenter(this.mmHolder);
        this.mmHolder.y = 300;
        this.mmHolder.alpha = 0;
        this.mmHolder.scale.set(1.3);
        gsap.to(this.mmHolder, {alpha:1, y:70, duration:1, ease:'power3.out'})
        gsap.to(this.mmHolder.scale, {x:1, y:1, duration:0.8, ease:'power1.out'})
        
        // ===== attempt =====
        this.attempt = this.addChild(new PIXI.Text('ATTEMPT: 0/10', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 37, fontWeight: 400, letterSpacing: 5})));
        this.attempt.anchor.set(0.5);
        // Utils.pivotCenter(this.attempt);
        this.attempt.y = 168
        // this.attempt.x = -100;
        this.attempt.alpha = 0;
        gsap.timeline()
            .to(this.attempt, {alpha:1, duration:0.1}, '+=0.2')
        // gsap.timeline()
            // .to(this.attempt, {x:200, duration:0.1}, '+=0.2')
            // .to(this.attempt, {x:-200, duration:0.1})
            // .to(this.attempt, {x:-0, duration:0.1})
        // gsap.timeline()
            // .to(this.attempt.style, {letterSpacing:20, duration:0.2}, '+=0.2')
            // .to(this.attempt.style, {letterSpacing:5, duration:0.2, ease:'bounce'});
        // gsap.timeline()
            // .to(this.attempt.style, {fill:dataProvider.data.colorEmph1, duration:0.1}, '+=0.2')
            // .to(this.attempt.style, {fill:dataProvider.data.colorEmph2, duration:0.1})
            // .to(this.attempt.style, {fill:dataProvider.data.colorLight, duration:0.1})



    }

    suicide(){
        this.parent.removeChild(this);
    }
}