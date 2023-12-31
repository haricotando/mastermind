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
        this.init()
    }

    init(){
        this.circleBaseSize = 170;
        let container = this.addChild(new PIXI.Container());
        container.x = this.circleBaseSize/2;
        container.y = this.circleBaseSize/2;

        this.circleFill = container.addChild(GraphicsHelper.exDrawCircle(0, 0, this.circleBaseSize/2, false, true));
        this.circleFill.tint = dataProvider.data.colorDark;

        this.circleLine = container.addChild(GraphicsHelper.exDrawCircle(0, 0, this.circleBaseSize/2, {width:2}, false));
        this.circleLine.tint = dataProvider.data.colorLight;
        //
        this.label = container.addChild(new PIXI.Text(this.number, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize: 100, fontWeight: 100})));
        this.label.anchor.set(0.5);
        //
        this.interactive = true;
        this.on('touchstart', this.clickHandler);
    }

    /* ------------------------------------------------------------
        KeyPadContainer / KeyPads
    ------------------------------------------------------------ */
    clickHandler(event){
        this.interactive = false;
        this.parent.parent.onKeyPadHandler(this.number);
        this.label.style.fontWeight = 300;
        this.label.style.fill = dataProvider.data.colorDark;
        gsap.set(this.circleFill.scale, {x:1, y:1});
        gsap.timeline()
            .to(this.label.scale, {x:1.3, y:1.3, duration:0.1, ease:'back.out(1)'})
            .to(this.label.scale, {x:1, y:1, duration:0.2, ease:'back.out(1)'})

        gsap.set(this.circleFill.scale, {x:1, y:1});
        gsap.timeline()
            .to(this.circleFill.scale, {x:1.2, y:1.2, duration:0.1, ease:'back.out(1)'})
            .to(this.circleFill.scale, {x:1, y:1, duration:0.2, ease:'back.out(1)'})
        gsap.to(this.circleFill, {pixi:{tint:dataProvider.data.colorLight}, duration:0.1});

        gsap.to(this.circleLine.scale, {x:1.05, y:1.05, duration:0.2, ease:'back.out'});

        // this.circleLine.filters = [dataProvider.colorMatrixFilterEmph[0]]
        // gsap.to(this.circleLine, {alpha:0, duration:0.2, ease:'back.in', delay:0.1});
    }

    mute(){
        this.interactive = false;
    }

    revibe(){
        this.interactive = true;

        this.label.style.fill = dataProvider.data.colorLight;
        this.label.style.fontWeight = 100;
        gsap.set(this.label.scale, {x:1, y:1});

        gsap.set(this.circleLine, {alpha:1});
        gsap.set(this.circleLine.scale, {x:1, y:1});
        this.circleLine.filters = false;

        gsap.set(this.circleFill.scale, {x:1, y:1});
        gsap.set(this.circleFill, {pixi:{tint:dataProvider.data.colorDark}, duration:0.1});
        this.circleFill.filters = false;

    }
}