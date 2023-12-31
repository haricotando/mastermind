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
        this.bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, window.innerWidth, dataProvider.data.headerOffset, false, {color:dataProvider.data.colorDark}));
        this.bg.pivot.x = this.bg.width/2;
        this.bg.visible = false;
        
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
            .call(()=>{
                this.bg.visible = true;
            })
        
    }

    updateAttempt(){
        let fxDelay = 0.3;
        let fxInterval = 0.05;
        gsap.delayedCall(fxDelay + fxInterval * 1, ()=>{
            this.attempt.text = 'ATTEMPT: ' + dataProvider.data.currentAttempt + '/10';
            this.attempt.style.fill = dataProvider.data.colorEmph1;
            this.attempt.scale.set(1.2, 0.8)
        });
        gsap.delayedCall(fxDelay + fxInterval * 2, ()=>{
            this.attempt.style.fill = dataProvider.data.colorEmph2;
            this.attempt.scale.set(0.9, 1.2)
        });
        gsap.delayedCall(fxDelay + fxInterval * 3, ()=>{
            this.attempt.style.fill = dataProvider.data.colorLight;
            gsap.to(this.attempt.scale, {x:1, y:1, duration:0.3, ease:'expo'})
        });

    }

    reset(){
        this.updateAttempt();
    }

    suicide(){
    }
}