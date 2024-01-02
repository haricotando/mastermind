import { dataProvider } from '../dataProvider.js';
import GraphicsHelper from '../helper/GraphicsHelper.js';
import Utils from '../helper/Utils.js';


export class NoteNumber extends PIXI.Container {
    /* ============================================================
    Constructor
    ============================================================ */
    constructor(num) {
        super();
        this.index = 0 ;
        this.icons = ['', '\ue15b ', '\ue1b7 '];
        this.iconsColor = [0, dataProvider.data.colorEmph3, dataProvider.data.colorEmph2];

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

        this.xMark = new PIXI.Text('', style);
        // this.xMark = new PIXI.Text('\ue15b ', style);
        this.container.addChild(this.xMark);
        this.xMark.anchor.set(0.5);
        this.xMark.x = this.label.x;
        this.xMark.y = this.label.y;
        this.update()

        this.container.interactive = true;
        this.container.on('touchstart', (event) => {
            this.update();
        });
    }

    update(){
        this.xMark.text = ` ${this.icons[this.index]} `;
        this.xMark.style.fill = this.iconsColor[this.index];
        this.label.alpha = this.index == 1 ? 0.4 : 1;
        this.index++;
        if(this.index >= this.icons.length){
            this.index = 0;
        }
    }

    reset(){
        this.index = 0;
        this.update();
        // this.xMark.visible = false;
    }

    /* ------------------------------------------------------------
        削除準備〜削除まで
    ------------------------------------------------------------ */
    readyToDie(){
    }
}