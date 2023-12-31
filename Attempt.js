import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';

export class Attempt extends PIXI.Sprite {
    /* ============================================================
        constructor
    ============================================================ */
    constructor(id) {
        super();

        this.id = id;
        // ===== box =====
        this.box = GraphicsHelper.exDrawRect(0, 0, 400, 100, false, true);
        this.addChild(this.box);
        this.box.tint = 0x000000;
        Utils.pivotCenter(this.box);

        this.label = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 55, fontWeight: 300, fill:dataProvider.data.colorLight})));
        this.label.anchor.set(0.5);

        this.boxMask = GraphicsHelper.exDrawRect(0, 0, 400, 100, false, {color:0xFF0000});
        this.addChild(this.boxMask);
        Utils.pivotCenter(this.boxMask);
        this.label.mask = this.boxMask;

        this.intro();
    }

    intro(){
        this.box.alpha = 0;
        const introDelay = 0.5;
        gsap.delayedCall(Math.random()*0.3 + introDelay, ()=>{
            // this.box.tint = dataProvider.data.colorEmph2;
            gsap.set(this.box, {alpha:0})
            gsap.timeline()
                .to(this.box, {alpha:0.2, duration:0.2, ease:'none', repeat:1})
        });
    }

    add(guess, result, isNoMatch){
        this.box.tint = dataProvider.data.colorLight;
        gsap.to(this.box, {pixi:{tint:false}, duration:0.4, ease:'expo'})

        this.label.text = guess;

        gsap.timeline()
            .set(this.label, {y:100})
            .to(this.label, {y:0, duration:0.2, ease:'back.out(3)'});
        gsap.timeline()
            .set(this.label.style, {letterSpacing:-50, delay:0.2})
            .set(this.label, {alpha:0.5})
            .call(()=>{
                this.label.style.fontSize = 42;
                this.label.style.fontWeight = 400;
                this.label.text = guess + ' -> ' + result;
            })
            .to(this.label.style, {letterSpacing:0, duration:0.1, ease:'back.out(3)'})
            .to(this.label, {alpha:1, duration:0.2});
        gsap.timeline()
            .set(this.label.style, {fill:dataProvider.data.colorEmph1, delay:0.2})
            .set(this.label.style, {fill:dataProvider.data.colorEmph2, delay:0.1})
            .set(this.label.style, {fill:isNoMatch ? dataProvider.data.colorEmph1 : dataProvider.data.colorLight, delay:0.1})
    }

    suicide(){
        this.parent.removeChild(this);
    }
}