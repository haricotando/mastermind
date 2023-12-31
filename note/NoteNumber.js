import { dataProvider } from '../dataProvider.js';
import GraphicsHelper from '../helper/GraphicsHelper.js';
import Utils from '../helper/Utils.js';


export class NoteNumber extends PIXI.Container {
    /* ============================================================
    Constructor
    ============================================================ */
    constructor(num) {
        super();

        this.container = this.addChild(new PIXI.Container());
        this.label = this.container.addChild(new PIXI.Text(`　${num}　`, Utils.cloneTextStyle(dataProvider.baseStyle, {fontStyle:'italic', fontSize: 85, fontWeight: 200, fill:dataProvider.data.colorDark})));
        this.label.anchor.set(0.6, 0.5);
        this.label.x = this.label.width/2;
        this.label.y = this.label.height/2;

        const style = new PIXI.TextStyle({
            fontFamily: 'Material Icons',
            fontSize: 120,
            fill: dataProvider.data.colorEmph3,
            });        

        this.xMark = new PIXI.Text('\ue15b ', style);
        this.container.addChild(this.xMark);
        this.xMark.anchor.set(0.5);
        this.xMark.x = this.label.x;
        this.xMark.y = this.label.y;
        this.xMark.visible = false;

        this.container.interactive = true;
        this.container.on('touchstart', (event) => {
            if(this.xMark.visible){
                this.xMark.visible = false;
                gsap.to(this.label, {alpha:1, duration:0.1, ease:'none'})
            }else{
                this.xMark.visible = true;
                gsap.to(this.label, {alpha:0.3, duration:0.1, ease:'none'})
            }
        });
    }

    reset(){
        this.xMark.visible = false;
        this.label.alpha = 1;
    }

    /* ------------------------------------------------------------
        削除準備〜削除まで
    ------------------------------------------------------------ */
    readyToDie(){
    }
}