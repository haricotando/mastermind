import GraphicsHelper from './helper/GraphicsHelper.js';
import { dataProvider } from './dataProvider.js';
import Utils from './helper/Utils.js';

export class KeyPad extends PIXI.Container {
    /* ============================================================
        Constructor
    ============================================================ */
    constructor(number) {
        super();
        
        this.number = number;
        this.circleBaseSize = 170;
        let container = this.addChild(new PIXI.Container());
        container.x = this.circleBaseSize/2;
        container.y = this.circleBaseSize/2;
        this.circleFill = container.addChild(GraphicsHelper.exDrawCircle(0, 0, this.circleBaseSize/2, false, true));
        this.circleFill.tint = dataProvider.data.colorDark;
        this.circleLine = container.addChild(GraphicsHelper.exDrawCircle(0, 0, this.circleBaseSize/2, true, false));
        this.circleLine.tint = dataProvider.data.colorLight;
        //
        this.label = container.addChild(new PIXI.Text(this.number, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 100, fontWeight: 100})));
        this.label.anchor.set(0.5);
        //
        this.interactive = true;
        this.on('touchstart', (event) => {
            console.log('logogo')
            this.clickHandler(event);
        });
    }

    /* ------------------------------------------------------------
        KeyPadContainer / KeyPads
    ------------------------------------------------------------ */
    clickHandler(event){
        this.label.style.fontWeight = 200;
        this.label.style.fill = dataProvider.data.colorDark;
        gsap.from(this.label.scale, {x:1.4, y:1.4, duration:0.25, ease:'back1.out'});

        gsap.to(this.circleFill, {pixi:{tint:dataProvider.data.colorLight}, duration:0.1});
        
        // gsap.from(this.circleLine.scale, {x:1.4, y:1.4, duration:0.2});

        // gsap.timeline().to(this.circleFill, {pixi:{tint:dataProvider.data.colorEmph1}, duration:0.4})
        // gsap.timeline().to(this.circleFill, {pixi:{tint:dataProvider.data.colorEmph1}, duration:0.5});
        // this.parent.parent.onGuessHandler(this.number);
        this.interactive = false;
    }

    mute(){
        this.interactive = false;
        // gsap.killTweensOf(this.pad);
        // gsap.killTweensOf(this.bg);
    }

    revibe(){
        this.interactive = true;
        // gsap.killTweensOf(this.pad);
        // gsap.killTweensOf(this.bg);
    }
}