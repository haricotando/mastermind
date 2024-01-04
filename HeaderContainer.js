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
        // this.moreHard();
        
        // gsap.delayedCall(2, ()=>{
        //     this.moreHard();
        // })
        // gsap.delayedCall(4, ()=>{
        //     this.moreHard();
        // })

        // gsap.delayedCall(6, ()=>{
        //     this.moreHard();
        // })
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
            .to(this.mmHolder, {alpha:1, y:70+50, duration:0.4, ease:'back.out(2)', delay:introDelay});
        gsap.timeline()
            .set(this.attempt, {y:168*2, delay:0.1})
            .to(this.attempt, {alpha:1, y:168+50, duration:0.4, ease:'back.out(2)', delay:introDelay})
            .call(()=>{
                this.bg.visible = true;
            })
        
    }

    updateAttempt(isHardMode){
        let fxDelay = 0.3;
        let fxInterval = 0.05;

        if(isHardMode){
            gsap.delayedCall(fxDelay + fxInterval * 1, ()=>{
                this.attempt.text = 'ATTEMPT: ' + dataProvider.data.currentAttempt + '/' + dataProvider.data.attemptMax;
                this.attempt.style.fill = dataProvider.data.colorEmph3;
                this.attempt.scale.set(4.2, 0.8)
            });
            gsap.delayedCall(fxDelay + fxInterval * 2, ()=>{
                this.attempt.style.fill = dataProvider.data.colorEmph2;
                this.attempt.scale.set(0.9, 4.2)
            });
            gsap.delayedCall(fxDelay + fxInterval * 3, ()=>{
                this.attempt.style.fill = dataProvider.data.colorEmph3;
                this.attempt.scale.set(1.5, 1.5)
            });
            gsap.delayedCall(fxDelay + fxInterval * 4, ()=>{
                this.attempt.style.fill = dataProvider.data.colorLight;
                gsap.to(this.attempt.scale, {x:1, y:1, duration:0.4, ease:'expo'})
            });
        }else{

            gsap.delayedCall(fxDelay + fxInterval * 1, ()=>{
                this.attempt.text = 'ATTEMPT: ' + dataProvider.data.currentAttempt + '/' + dataProvider.data.attemptMax;
                this.attempt.style.fill = dataProvider.data.currentAttempt > 5 ? dataProvider.data.colorEmph3 : dataProvider.data.colorEmph1;
                this.attempt.scale.set(1.2, 0.8)
            });
            gsap.delayedCall(fxDelay + fxInterval * 2, ()=>{
                this.attempt.style.fill = dataProvider.data.colorEmph2;
                this.attempt.scale.set(0.9, 1.2)
            });
            gsap.delayedCall(fxDelay + fxInterval * 3, ()=>{
                this.attempt.style.fill = dataProvider.data.currentAttempt == dataProvider.data.attemptMax ? dataProvider.data.colorEmph3 :
                dataProvider.data.currentAttempt > dataProvider.data.attemptMax-3 && dataProvider.data.currentAttempt<dataProvider.data.attemptMax ? dataProvider.data.colorEmph2 : dataProvider.data.colorLight;
                gsap.to(this.attempt.scale, {x:1, y:1, duration:0.3, ease:'expo'})
            });
        }
    }

    moreHard(){
        
        dataProvider.data.attemptMax--;
        dataProvider.data.hardMode++;

        if(!this.hardLabel){
            this.hardLabel = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 45, fontWeight: 700, letterSpacing: 5, fill:dataProvider.data.colorEmph3})));
            // this.hardLabel.anchor.y = 0.5;
            // this.hardLabel.x = -60;
            this.hardLabel.anchor.set(0.5);
            this.hardLabel.y = 50;
            this.hardLabel.alpha = 0;
        }
        
        
        gsap.timeline({delay:0.5})
        .set(this.hardLabel.style, {letterSpacing:-100})
        .to(this.hardLabel.style, {letterSpacing:5, duration:0.4, ease:'back.out(1)'})
        .to(this.hardLabel, {alpha:1, duration:0.4, ease:'expo'}, '-=0.4')
        
        this.hardFx = this.addChild(GraphicsHelper.exDrawCircle(0, 0, 1800, {width:100, color:dataProvider.data.colorEmph3}, {color:dataProvider.data.colorEmph3, alpha:0.5}));
        this.hardFx.alpha = 0;
        gsap.timeline({delay:0.3})
            .set(this.hardFx, {alpha:1})
            .to(this.hardFx.scale, {x:0.01, y:0.01, duration:0.2, ease:'power1.out'})
            .call(()=>{
                this.hardLabel.text = 'HARD' + ('+'.repeat(Math.max(0, dataProvider.data.hardMode)));
            })
            .to(this.hardFx, {alpha:0, duration:0.2, ease:'none'}, '-=0.1')
        this.hardFx.y = 50;

        gsap.delayedCall(0.2, ()=>{
            this.updateAttempt(true);
        });
    }

    resetHard(){
        this.removeChild(this.hardLabel);
        this.hardLabel = undefined;
        this.updateAttempt();
    }

    reset(){
        this.updateAttempt();
    }

    suicide(){
    }
}