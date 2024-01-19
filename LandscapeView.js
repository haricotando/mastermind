import { dataProvider } from './dataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';

export class LandscapeView extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.visible = false;
        this.box = GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight, false, {color:dataProvider.data.colorDark});
        this.addChild(this.box);
        this.box.interactive = true;
        
        const style = new PIXI.TextStyle({
            fontFamily: 'Material Icons',
            fontSize: 150,
            fill: dataProvider.data.colorLight,
            align:'center'
        });
        
        this.label = new PIXI.Text('\n\ue1c1\n', style);
        this.addChild(this.label);
        this.label.anchor.set(0.5);

        this.fit();
    }

    fit(){
        this.box.width = window.innerWidth;
        this.box.height = window.innerHeight;
 
        this.label.x = window.innerWidth / 2;
        this.label.y = window.innerHeight / 2;
    }
}