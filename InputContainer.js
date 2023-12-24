import { KeyPad } from './KeyPad.js';
import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';

export class InputContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.currentGuess = '';
        this.keyPadList = [];
        this.padMargin = 25;

        this.initKeyPads();
        
    }

    initKeyPads(){
        this.keyPadContainer = new PIXI.Container();
        this.addChild(this.keyPadContainer);
        // this.keyPadContainer.visible = false;
        // // ===== KeyPadの生成と配置 =====
        let padSize = 170;
        let valueIndex = 0;
        for(let i=0; i<10; i++){
            let keyPad = this.keyPadContainer.addChild(new KeyPad(i==9?0:i+1));

            keyPad.x = i*(padSize + this.padMargin);
            if(i>4){
                keyPad.y = padSize + this.padMargin;
                keyPad.x = (i-5)*(padSize + this.padMargin);
            }
            this.keyPadList.push(keyPad);
        }

        Utils.pivotX(this.keyPadContainer);
        this.keyPadContainer.y = window.innerHeight - this.keyPadContainer.height-(window.innerHeight/20)

        // this.keyPadContainer.pivot.set(
        //     this.keyPadContainer.width/2, 
        //     this.keyPadContainer.height/2);
    }

    suicide(){
        this.parent.removeChild(this);
    }
}