import { dataProvider } from '../dataProvider.js';
import GraphicsHelper from '../helper/GraphicsHelper.js';
import Utils from '../helper/Utils.js';


export class NoteBuffer extends PIXI.Container {
    /* ============================================================
    Constructor
    ============================================================ */
    constructor() {
        super();

        this.letterIndex = 0 ;
        this.letters = ['?', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

        this.dialog = new PIXI.Graphics();
        this.dialog.lineStyle(2, dataProvider.data.colorDark)
        this.dialog.beginFill(dataProvider.data.colorLight);

        this.dialog.drawRoundedRect(0, 0, 170, 220, 10);
        this.dialog.endFill();
        this.dialog.alpha = 0.2;
        this.addChild(this.dialog);
        this.interactive = true;

        this.on('touchstart', (event) => {
            this.update();
        });

        this.label = this.addChild(new PIXI.Text(' ? ', Utils.cloneTextStyle(dataProvider.baseStyle, {fontStyle:'italic', fontSize: 110, fontWeight: 300, fill:dataProvider.data.colorDark})));
        this.label.anchor.set(0.6, 0.5);
        this.label.x = 170/2;
        this.label.y = 220/2;
        this.update();
    }

    update(){
        this.label.text = ` ${this.letters[this.letterIndex]} `;
        this.letterIndex++;
        if(this.letterIndex >= this.letters.length){
            this.letterIndex = 0;
        }
    }

    reset(){
        this.letterIndex = 0;
        this.update();
    }

    /* ------------------------------------------------------------
        削除準備〜削除まで
    ------------------------------------------------------------ */
    readyToDie(){
    }
}