import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';

export class HeaderContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.initTitle();
    }

    initTitle(){
        let styleMaster = new PIXI.TextStyle({
            fontFamily: 'Inter', fontSize: 110, fontWeight: 200, 
            fill: dataProvider.data.colorLight,
        });
        
        let styleMind = new PIXI.TextStyle({
            fontFamily: 'Inter', fontSize: 110, fontWeight: 100,
            fill: dataProvider.data.colorLight,
            letterSpacing: 50,
        });

        this.titleMaster = new PIXI.Text('MASTER', styleMaster);
        this.addChild(this.titleMaster);
    }

    suicide(){
        this.parent.removeChild(this)
    }
}